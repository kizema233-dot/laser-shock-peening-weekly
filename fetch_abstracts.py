# -*- coding: utf-8 -*-
"""
Fetch missing abstracts from OpenAlex API by title search,
then update papers_data.json with the results.
"""
import json, os, time, requests
from urllib.parse import quote

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
PAPERS_JSON = os.path.join(DATA_DIR, "papers_data.json")


def reconstruct_abstract(aii):
    """Reconstruct abstract from OpenAlex inverted index"""
    if not aii:
        return ""
    word_positions = []
    for word, positions in aii.items():
        for pos in positions:
            word_positions.append((pos, word))
    word_positions.sort()
    return " ".join(w for _, w in word_positions)


def fetch_abstract_openalex(title, doi):
    """Search OpenAlex by title and return abstract if found"""
    # Try by DOI first
    if doi:
        try:
            clean_doi = doi.replace("https://doi.org/", "").replace("http://doi.org/", "")
            url = f"https://api.openalex.org/works/doi:{clean_doi}"
            resp = requests.get(url, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                aii = data.get("abstract_inverted_index")
                abstract = reconstruct_abstract(aii)
                if abstract and len(abstract) > 50:
                    return abstract
        except:
            pass
        time.sleep(0.5)

    # Try by title search
    try:
        url = f"https://api.openalex.org/works?search={quote(title[:100])}&per_page=3"
        resp = requests.get(url, timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            results = data.get("results", [])
            for r in results:
                r_title = (r.get("title") or "").lower()
                if title.lower()[:50] in r_title or r_title[:50] in title.lower():
                    aii = r.get("abstract_inverted_index")
                    abstract = reconstruct_abstract(aii)
                    if abstract and len(abstract) > 50:
                        return abstract
    except:
        pass
    return ""


def fetch_abstract_semantic_scholar(title, doi):
    """Search Semantic Scholar by DOI or title"""
    if doi:
        clean_doi = doi.replace("https://doi.org/", "").replace("http://doi.org/", "")
        try:
            url = f"https://api.semanticscholar.org/graph/v1/paper/DOI:{clean_doi}?fields=abstract"
            resp = requests.get(url, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                abstract = data.get("abstract")
                if abstract and len(abstract) > 50:
                    return abstract
        except:
            pass
        time.sleep(1)

    # Try title search
    try:
        url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={quote(title[:100])}&fields=abstract&limit=3"
        resp = requests.get(url, timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            results = data.get("data", [])
            for r in results:
                abstract = r.get("abstract")
                if abstract and len(abstract) > 50:
                    return abstract
    except:
        pass
    return ""


def main():
    with open(PAPERS_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    all_papers = data["top_30"] + data.get("all_scored", [])[30:50]
    total = len(all_papers)
    found = 0
    still_empty = 0

    print("=" * 60)
    print("  Fetching missing abstracts...")
    print("=" * 60)

    for i, p in enumerate(all_papers):
        abstract = p.get("abstract", "")
        if abstract and len(abstract) > 30:
            continue

        title = p.get("title", "")
        doi = p.get("doi", "")

        print(f"[{i+1}/{total}] Fetching abstract for: {title[:50]}...")

        # Try OpenAlex first
        abstract = fetch_abstract_openalex(title, doi)
        if abstract:
            p["abstract"] = abstract
            found += 1
            print(f"  -> Found via OpenAlex ({len(abstract)} chars)")
            continue

        time.sleep(0.5)

        # Try Semantic Scholar
        abstract = fetch_abstract_semantic_scholar(title, doi)
        if abstract:
            p["abstract"] = abstract
            found += 1
            print(f"  -> Found via Semantic Scholar ({len(abstract)} chars)")
            continue

        still_empty += 1
        print(f"  -> Not found")
        time.sleep(1)

    # Save updated data
    with open(PAPERS_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print()
    print(f"Abstracts found: {found}")
    print(f"Still empty: {still_empty}")
    print(f"Data saved to: {PAPERS_JSON}")


if __name__ == "__main__":
    main()