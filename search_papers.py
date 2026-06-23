# -*- coding: utf-8 -*-
"""
Laser Shock Peening Paper Search System
Sources: arXiv (preprints) + Crossref (SCI/journals)
Search keywords: laser shock peening, laser shock processing, laser shockwave
"""
import requests
import xml.etree.ElementTree as ET
import json, time, re, hashlib, os
from datetime import datetime
from urllib.parse import quote

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_FILE = os.path.join(DATA_DIR, "papers_data.json")
EXCLUDE_FILE = os.path.join(DATA_DIR, "excluded_ids.json")


def search_arxiv(max_results=200):
    """Search arXiv preprint repository"""
    print("=" * 60)
    print("[1/2] Searching arXiv preprints...")
    print("=" * 60)
    queries = ["laser shock peening", "laser shock processing",
               "laser shockwave material", "laser shock deformation"]
    papers = []
    ns = {"atom": "http://www.w3.org/2005/Atom",
          "arxiv": "http://arxiv.org/schemas/atom"}
    for q in queries:
        url = (f"http://export.arxiv.org/api/query?"
               f"search_query=all:{quote(q)}"
               f"&start=0&max_results={max_results//len(queries)+20}"
               f"&sortBy=submittedDate&sortOrder=descending")
        print(f"  Query: {q}")
        try:
            resp = requests.get(url, timeout=30)
            resp.raise_for_status()
            root = ET.fromstring(resp.text)
            entries = root.findall("atom:entry", ns)
            print(f"  -> Got {len(entries)} results")
            for entry in entries:
                title = entry.find("atom:title", ns)
                title_text = (title.text.strip().replace("\n", " ")
                              if title is not None else "")
                title_text = re.sub(r"\s+", " ", title_text)
                summary = entry.find("atom:summary", ns)
                # Relevance filter: must contain "laser shock" in title or abstract
                combined_check = (title_text + " " +
                    (summary.text if summary is not None else "")).lower()
                if not any(kw in combined_check for kw in
                          ["laser shock", "laser-shock",
                           "shock peening", "shock processing",
                           "laser peening", "laser peen"]):
                    continue
                abstract = (summary.text.strip().replace("\n", " ")
                           if summary is not None else "")
                abstract = re.sub(r"\s+", " ", abstract)
                published = entry.find("atom:published", ns)
                pub_date = (published.text[:10]
                           if published is not None else "")
                arxiv_id_elem = entry.find("atom:id", ns)
                arxiv_id = (arxiv_id_elem.text.split("/")[-1]
                           if arxiv_id_elem is not None else "")
                authors = []
                for author in entry.findall("atom:author", ns):
                    name = author.find("atom:name", ns)
                    if name is not None:
                        authors.append(name.text.strip())
                doi_elem = entry.find("arxiv:doi", ns)
                doi = doi_elem.text if doi_elem is not None else ""
                journal_elem = entry.find("arxiv:journal_ref", ns)
                journal = (journal_elem.text if journal_elem is not None
                           else "arXiv (Preprint)")
                link = f"https://arxiv.org/abs/{arxiv_id}"
                paper_id = hashlib.md5(
                    f"arxiv_{arxiv_id}".encode()).hexdigest()[:12]
                papers.append({
                    "id": paper_id, "title": title_text,
                    "authors": ", ".join(authors[:5]) +
                              (" et al." if len(authors) > 5 else ""),
                    "abstract": abstract, "date": pub_date,
                    "source": "arXiv (Preprint)", "journal": journal,
                    "doi": doi, "link": link, "search_query": q,
                    "citation_count": 0,
                })
            time.sleep(3)
        except Exception as e:
            print(f"  ERROR: {e}")
    print(f"  arXiv total: {len(papers)}")
    return papers


def search_crossref(max_results=200):
    """Search Crossref database (SCI/journals)"""
    print("=" * 60)
    print("[2/2] Searching Crossref (SCI/Journals)...")
    print("=" * 60)
    queries = ["laser shock peening", "laser shock processing",
               "laser shockwave", "laser shock deformation"]
    papers = []
    headers = {"User-Agent":
               "LaserShockPaperSearch/1.0 (mailto:research@example.com)"}
    for q in queries:
        rows = max_results // len(queries) + 20
        url = (f"https://api.crossref.org/works?"
               f"query={quote(q)}&rows={rows}"
               f"&filter=from-pub-date:2016-01-01,until-pub-date:2026-12-31"
               f"&sort=relevance&order=desc")
        print(f"  Query: {q}")
        try:
            resp = requests.get(url, headers=headers, timeout=30)
            resp.raise_for_status()
            data = resp.json()
            items = data.get("message", {}).get("items", [])
            print(f"  -> Got {len(items)} results")
            for item in items:
                title_list = item.get("title", [])
                title = title_list[0] if title_list else ""
                if not title:
                    continue
                title = re.sub(r"\s+", " ", title.strip())
                title_lower = title.lower()
                if not any(kw in title_lower for kw in
                          ["laser shock", "laser-shock",
                           "shock peening", "shock processing"]):
                    continue
                abstract = item.get("abstract", "")
                abstract = re.sub(r"<[^>]+>", "", abstract)
                abstract = re.sub(r"\s+", " ", abstract).strip()
                pub_date_parts = (item.get("published-print",
                    item.get("published-online", {}))
                    .get("date-parts", [[None]])[0])
                if pub_date_parts and pub_date_parts[0]:
                    pub_date = f"{pub_date_parts[0]:04d}"
                    if len(pub_date_parts) > 1:
                        pub_date += f"-{pub_date_parts[1]:02d}"
                    if len(pub_date_parts) > 2:
                        pub_date += f"-{pub_date_parts[2]:02d}"
                else:
                    pub_date = ""
                authors_list = item.get("author", [])
                authors = []
                for a in authors_list[:5]:
                    given = a.get("given", "")
                    family = a.get("family", "")
                    authors.append(f"{given} {family}".strip())
                authors_str = ", ".join(authors)
                if len(authors_list) > 5:
                    authors_str += " et al."
                doi = item.get("DOI", "")
                journal = (item.get("container-title", [""])[0]
                          if item.get("container-title")
                          else "")
                if not journal:
                    journal = item.get("publisher", "Unknown")
                link = item.get("URL", "")
                if not link and doi:
                    link = f"https://doi.org/{doi}"
                source_label = ("SCI/Journal"
                    if item.get("type", "") == "journal-article"
                    else item.get("type", "Journal"))
                citation_count = item.get("is-referenced-by-count", 0)
                paper_id = hashlib.md5(
                    f"crossref_{doi}".encode()).hexdigest()[:12]
                papers.append({
                    "id": paper_id, "title": title,
                    "authors": authors_str, "abstract": abstract,
                    "date": pub_date, "source": source_label,
                    "journal": journal, "doi": doi, "link": link,
                    "search_query": q, "citation_count": citation_count,
                })
            time.sleep(1)
        except Exception as e:
            print(f"  ERROR: {e}")
    print(f"  Crossref total: {len(papers)}")
    return papers


def deduplicate(papers):
    """Remove duplicate papers by title similarity"""
    print("Deduplicating...")
    seen = {}
    unique = []
    for p in papers:
        key = re.sub(r"[^a-z0-9]", "", p["title"].lower())
        if len(key) < 10:
            key = p["title"].lower().strip()
        if key not in seen:
            seen[key] = True
            unique.append(p)
        else:
            for i, u in enumerate(unique):
                u_key = re.sub(r"[^a-z0-9]", "", u["title"].lower())
                if (u_key == key and
                    p["citation_count"] > u["citation_count"]):
                    unique[i] = p
                    break
    print(f"Before: {len(papers)} -> After: {len(unique)}")
    return unique


def score_innovation(paper):
    """Score paper innovation (0-100) based on multiple criteria"""
    score = 0
    # (1) Citation impact (25 pts)
    cite = paper.get("citation_count", 0)
    if cite > 500: score += 25
    elif cite > 200: score += 22
    elif cite > 100: score += 18
    elif cite > 50: score += 14
    elif cite > 20: score += 10
    elif cite > 5: score += 6
    elif cite > 0: score += 3
    # (2) Topic relevance (20 pts)
    title_lower = paper["title"].lower()
    abstract_lower = paper.get("abstract", "").lower()
    combined = title_lower + " " + abstract_lower
    core_keywords = {
        "laser shock peening": 5, "laser shock processing": 5,
        "laser shockwave": 4, "laser shock": 3, "shock peening": 3,
        "residual stress": 2, "microstructure": 2, "fatigue life": 2,
        "wear resistance": 2, "corrosion": 2,
        "surface modification": 2, "mechanical properties": 2,
        "finite element": 2, "simulation": 2,
        "warm laser peening": 4, "cryogenic": 3,
        "additive manufacturing": 3, "3d printing": 3,
        "ultrafast": 2, "femtosecond": 3,
        "picosecond": 2, "nanosecond": 2,
    }
    keyword_score = 0
    for kw, pts in core_keywords.items():
        if kw in combined:
            keyword_score += pts
    score += min(keyword_score, 20)
    # (3) Recency (20 pts)
    date_str = paper.get("date", "")
    try:
        if len(date_str) >= 4:
            year = int(date_str[:4])
            current_year = datetime.now().year
            years_ago = current_year - year
            if years_ago <= 0: score += 20
            elif years_ago <= 1: score += 18
            elif years_ago <= 2: score += 15
            elif years_ago <= 3: score += 12
            elif years_ago <= 4: score += 8
            elif years_ago <= 5: score += 5
            elif years_ago <= 7: score += 3
            else: score += 1
    except:
        pass
    # (4) Abstract richness (15 pts)
    abstract = paper.get("abstract", "")
    abs_len = len(abstract)
    if abs_len > 1500: score += 15
    elif abs_len > 1000: score += 12
    elif abs_len > 500: score += 8
    elif abs_len > 200: score += 5
    elif abs_len > 50: score += 2
    method_keywords = ["novel", "new", "first", "propose", "develop",
        "demonstrate", "investigate", "reveal", "show", "result",
        "find", "improve", "enhance", "optimize", "compare",
        "analyze", "model"]
    method_count = sum(1 for mk in method_keywords if mk in abstract_lower)
    score += min(method_count * 2, 8)
    # (5) Source authority (10 pts)
    source = paper.get("source", "")
    journal = paper.get("journal", "").lower()
    top_journals = ["nature", "science", "acta materialia",
        "materials", "journal", "corrosion science", "surface",
        "engineering", "international", "applied", "physics",
        "mechanics", "optics", "manufacturing"]
    if any(j in journal for j in top_journals):
        score += 10
    elif "arxiv" in source.lower():
        score += 5
    else:
        score += 3
    # (6) Title innovation (10 pts)
    innovation_words = ["novel", "new", "first", "unique",
        "innovative", "advanced", "ultra", "nano", "micro",
        "multi-scale", "coupled", "hybrid", "in-situ",
        "real-time", "dynamic", "ultrahigh", "breakthrough",
        "synergistic", "gradient", "amorphous", "crystalline"]
    title_innovation = sum(1 for iw in innovation_words if iw in title_lower)
    score += min(title_innovation * 3, 10)
    return round(score, 1)


def main(exclude_ids=None):
    """Main search pipeline"""
    print()
    print("=" * 60)
    print("  Laser Shock Peening Paper Search System")
    print("  Sources: arXiv + Crossref (preprints + SCI/journals)")
    print("=" * 60)
    print()
    arxiv_papers = search_arxiv()
    crossref_papers = search_crossref()
    all_papers = arxiv_papers + crossref_papers
    all_papers = deduplicate(all_papers)
    # Filter: papers from 2016 onwards
    filtered = []
    for p in all_papers:
        date_str = p.get("date", "")
        if len(date_str) >= 4:
            try:
                year = int(date_str[:4])
                if year >= 2016:
                    filtered.append(p)
            except:
                filtered.append(p)
        else:
            filtered.append(p)
    print(f"Papers from 2016+: {len(filtered)}")
    # Exclude previously selected papers
    if exclude_ids:
        before = len(filtered)
        filtered = [p for p in filtered if p["id"] not in exclude_ids]
        print(f"Excluded previous top-30: {before} -> {len(filtered)}")
    # Score innovation
    print()
    print("Scoring innovation...")
    for p in filtered:
        p["innovation_score"] = score_innovation(p)
    # Sort by score
    filtered.sort(key=lambda x: (
        -x["innovation_score"],
        -x.get("citation_count", 0),
        x.get("date", "")))
    top_30 = filtered[:30]
    # Print results
    print()
    print("=" * 60)
    print("  Top 30 Papers (sorted by innovation score)")
    print("=" * 60)
    for i, p in enumerate(top_30, 1):
        print(f"[{i:2d}] Score:{p['innovation_score']} | "
              f"Cite:{p.get('citation_count',0)} | {p['date'][:7]}")
        print(f"     {p['title'][:80]}")
        print(f"     Source: {p['source']} | {p['journal'][:40]}")
    # Save data
    all_data = {
        "search_time": datetime.now().isoformat(),
        "total_found": len(all_papers),
        "total_after_filter": len(filtered),
        "top_30": top_30,
        "all_scored": filtered[:100],
    }
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    print()
    print(f"Data saved to: {CACHE_FILE}")
    print(f"Search time: {all_data['search_time']}")
    return top_30


if __name__ == "__main__":
    exclude_ids = None
    if os.path.exists(EXCLUDE_FILE):
        with open(EXCLUDE_FILE, "r", encoding="utf-8") as f:
            exclude_ids = json.load(f)
    main(exclude_ids)