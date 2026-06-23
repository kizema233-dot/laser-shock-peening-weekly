# -*- coding: utf-8 -*-
"""
Scrape abstracts from original paper websites (DOI redirects, publisher pages).
Tries multiple strategies: meta tags, JSON-LD, structured HTML.
"""
import json, os, time, re, requests
from urllib.parse import quote

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
PAPERS_JSON = os.path.join(DATA_DIR, "papers_data.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def extract_abstract_from_html(html_text):
    """Try multiple strategies to extract abstract from HTML"""
    # Strategy 1: meta name="description" or "citation_abstract"
    for pattern in [
        r'<meta\s+name=["\']citation_abstract["\']\s+content=["\']([^"\']+)["\']',
        r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']',
        r'<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']+)["\']',
        r'<meta\s+name=["\']dc.Description["\']\s+content=["\']([^"\']+)["\']',
        r'<meta\s+name=["\']abstract["\']\s+content=["\']([^"\']+)["\']',
    ]:
        m = re.search(pattern, html_text, re.IGNORECASE)
        if m:
            abstract = m.group(1)
            # Clean up HTML entities and tags
            abstract = re.sub(r'<[^>]+>', '', abstract)
            abstract = abstract.replace('&amp;', '&').replace('&lt;', '<')
            abstract = abstract.replace('&gt;', '>').replace('&quot;', '"')
            abstract = abstract.replace('&#39;', "'").replace('&nbsp;', ' ')
            if len(abstract) > 50:
                return abstract.strip()

    # Strategy 2: JSON-LD structured data
    for m in re.finditer(r'<script\s+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
                         html_text, re.DOTALL):
        try:
            data = json.loads(m.group(1))
            if isinstance(data, dict):
                desc = data.get("description") or data.get("abstract")
                if desc and len(desc) > 50:
                    desc = re.sub(r'<[^>]+>', '', desc)
                    return desc.strip()
            elif isinstance(data, list):
                for item in data:
                    if isinstance(item, dict):
                        desc = item.get("description") or item.get("abstract")
                        if desc and len(desc) > 50:
                            desc = re.sub(r'<[^>]+>', '', desc)
                            return desc.strip()
        except:
            pass

    # Strategy 3: Common HTML patterns for abstract sections
    for pattern in [
        r'<div[^>]*class=["\'][^"\']*abstract[^"\']*["\'][^>]*>(.*?)</div>',
        r'<section[^>]*class=["\'][^"\']*abstract[^"\']*["\'][^>]*>(.*?)</section>',
        r'<p[^>]*class=["\'][^"\']*abstract[^"\']*["\'][^>]*>(.*?)</p>',
        r'<div[^>]*id=["\']abstract["\'][^>]*>(.*?)</div>',
        r'<div[^>]*class=["\'][^"\']*Abstract[^"\']*["\'][^>]*>(.*?)</div>',
    ]:
        m = re.search(pattern, html_text, re.DOTALL | re.IGNORECASE)
        if m:
            abstract = m.group(1)
            abstract = re.sub(r'<[^>]+>', '', abstract)
            abstract = abstract.strip()
            if len(abstract) > 50:
                return abstract

    # Strategy 4: Look for "Abstract" heading followed by text
    m = re.search(r'(?:Abstract|ABSTRACT|Summary)\s*[:.]?\s*</[^>]+>\s*<[^>]+>([^<]{100,})',
                  html_text, re.IGNORECASE)
    if m:
        abstract = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        if len(abstract) > 50:
            return abstract

    return ""


def fetch_abstract_from_url(url):
    """Fetch abstract from a paper URL"""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
        if resp.status_code == 200:
            return extract_abstract_from_html(resp.text)
    except:
        pass
    return ""


def fetch_abstract_crossref(doi):
    """Fetch abstract from Crossref individual DOI endpoint"""
    if not doi:
        return ""
    try:
        url = f"https://api.crossref.org/works/{doi}"
        resp = requests.get(url, headers={
            "User-Agent": "PaperSearch/1.0 (mailto:research@example.com)"
        }, timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            abstract = data.get("message", {}).get("abstract", "")
            if abstract:
                abstract = re.sub(r'<[^>]+>', '', abstract)
                abstract = re.sub(r'\s+', ' ', abstract).strip()
                if len(abstract) > 50:
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
    print("  Scraping abstracts from original paper websites...")
    print("=" * 60)

    for i, p in enumerate(all_papers):
        abstract = p.get("abstract", "")
        if abstract and len(abstract) > 30:
            continue

        title = p.get("title", "")
        doi = p.get("doi", "")
        link = p.get("link", "")

        print(f"[{i+1}/{total}] {title[:50]}...")

        # Strategy 1: Try Crossref individual DOI
        if doi:
            abstract = fetch_abstract_crossref(doi)
            if abstract:
                p["abstract"] = abstract
                found += 1
                print(f"  -> Crossref ({len(abstract)} chars)")
                continue
            time.sleep(0.5)

        # Strategy 2: Try the paper's URL / DOI redirect
        url_to_try = link or (f"https://doi.org/{doi}" if doi else "")
        if url_to_try:
            abstract = fetch_abstract_from_url(url_to_try)
            if abstract:
                p["abstract"] = abstract
                found += 1
                print(f"  -> Website ({len(abstract)} chars)")
                continue
            time.sleep(1)

        # Strategy 3: Try Google Scholar snippet (via search)
        try:
            search_url = f"https://scholar.google.com/scholar?q={quote(title[:80])}"
            resp = requests.get(search_url, headers=HEADERS, timeout=15)
            if resp.status_code == 200:
                # Try to extract snippet from Google Scholar results
                m = re.search(r'<div class="gs_rs">(.*?)</div>', resp.text, re.DOTALL)
                if m:
                    snippet = re.sub(r'<[^>]+>', '', m.group(1)).strip()
                    if len(snippet) > 50:
                        p["abstract"] = snippet
                        found += 1
                        print(f"  -> Scholar ({len(snippet)} chars)")
                        continue
        except:
            pass
        time.sleep(1)

        still_empty += 1
        print(f"  -> Not found")

    with open(PAPERS_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print()
    print(f"Abstracts found: {found}")
    print(f"Still empty: {still_empty}")
    print(f"Data saved to: {PAPERS_JSON}")


if __name__ == "__main__":
    main()