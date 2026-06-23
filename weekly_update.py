# -*- coding: utf-8 -*-
"""
Weekly Update Script for Laser Shock Peening Papers
Searches for NEW papers excluding the Top 30 already selected.
Regenerates papers.js and index.html with new findings.
"""
import json, os, sys, subprocess, re, hashlib
from datetime import datetime, timedelta

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_FILE = os.path.join(DATA_DIR, "papers_data.json")
EXCLUDE_FILE = os.path.join(DATA_DIR, "excluded_ids.json")
WEEKLY_FILE = os.path.join(DATA_DIR, "weekly_papers.json")
LOG_FILE = os.path.join(DATA_DIR, "update_log.txt")

# Add parent dir to path for imports
sys.path.insert(0, DATA_DIR)
from search_papers import search_arxiv, search_crossref, deduplicate, score_innovation


def load_excluded_ids():
    """Load the IDs of the top 30 papers to exclude"""
    if os.path.exists(EXCLUDE_FILE):
        with open(EXCLUDE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def load_previous_weekly():
    """Load previously found weekly papers to avoid duplicates"""
    if os.path.exists(WEEKLY_FILE):
        with open(WEEKLY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"papers": [], "last_update": ""}


def search_new_papers(exclude_ids, days_back=7):
    """Search for new papers from the last N days, excluding top 30"""
    print("=" * 60)
    print("  Weekly Update: Searching for New Papers")
    print(f"  Excluding {len(exclude_ids)} previously selected papers")
    print(f"  Looking for papers from the last {days_back} days")
    print("=" * 60)
    print()

    # Search arXiv (recent preprints)
    arxiv_papers = search_arxiv(max_results=100)

    # Search Crossref (recent publications)
    crossref_papers = search_crossref(max_results=100)

    all_papers = arxiv_papers + crossref_papers
    all_papers = deduplicate(all_papers)

    # Filter: only papers from the last N days
    cutoff_date = datetime.now() - timedelta(days=days_back)
    recent_papers = []
    for p in all_papers:
        date_str = p.get("date", "")
        if len(date_str) >= 4:
            try:
                year = int(date_str[:4])
                if year >= 2016:
                    # Check if within the last N days
                    if len(date_str) >= 10:
                        paper_date = datetime.strptime(date_str[:10], "%Y-%m-%d")
                        if paper_date >= cutoff_date:
                            recent_papers.append(p)
                    else:
                        # Only year-month or year, include if recent
                        if year >= datetime.now().year:
                            recent_papers.append(p)
            except:
                pass

    # Exclude the top 30
    new_papers = [p for p in recent_papers if p["id"] not in exclude_ids]

    print(f"\nNew papers found (last {days_back} days): {len(new_papers)}")

    # Also include older papers not in top 30 that weren't found before
    # (broader search for additional discoveries)
    all_new = [p for p in all_papers if p["id"] not in exclude_ids]
    print(f"Total new papers (all dates, excluding top 30): {len(all_new)}")

    # Score innovation
    for p in all_new:
        p["innovation_score"] = score_innovation(p)

    # Sort by score
    all_new.sort(key=lambda x: (
        -x["innovation_score"],
        -x.get("citation_count", 0),
        x.get("date", "")))

    return all_new


def update_html(new_papers):
    """Regenerate papers.js with new weekly papers, then rebuild HTML"""

    # Save weekly papers data
    weekly_data = {
        "papers": new_papers[:50],
        "last_update": datetime.now().isoformat(),
        "count": len(new_papers)
    }
    with open(WEEKLY_FILE, "w", encoding="utf-8") as f:
        json.dump(weekly_data, f, ensure_ascii=False, indent=2)

    # Merge new papers into the all_scored list in papers_data.json
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Add new papers to all_scored (avoiding duplicates by ID)
    existing_ids = set(p["id"] for p in data.get("all_scored", []))
    for p in new_papers:
        if p["id"] not in existing_ids:
            data["all_scored"].append(p)
            existing_ids.add(p["id"])

    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Regenerate papers.js
    subprocess.run([sys.executable,
                    os.path.join(DATA_DIR, "gen_papers.py")],
                   cwd=DATA_DIR)

    print(f"papers.js regenerated with {len(new_papers)} new papers")


def log_update(message):
    """Append to update log"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")


def main():
    print()
    print("=" * 60)
    print("  Laser Shock Peening - Weekly Paper Update")
    print(f"  Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 60)
    print()

    # Load excluded IDs (top 30)
    exclude_ids = load_excluded_ids()

    # Search for new papers
    new_papers = search_new_papers(exclude_ids, days_back=7)

    # Update HTML
    if new_papers:
        update_html(new_papers)
        log_update(f"Found {len(new_papers)} new papers. Top: {new_papers[0]['title'][:50]}")
    else:
        log_update("No new papers found in this update cycle.")
        print("No new papers found.")

    print()
    print("=" * 60)
    print("  Weekly update complete!")
    print(f"  New papers: {len(new_papers)}")
    print(f"  HTML page: {os.path.join(DATA_DIR, 'index.html')}")
    print("=" * 60)


if __name__ == "__main__":
    main()