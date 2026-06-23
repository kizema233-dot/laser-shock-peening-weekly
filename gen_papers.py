# -*- coding: utf-8 -*-
"""Generate papers.js from search results"""
import json, os

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(DATA_DIR, "papers_data.json"), "r", encoding="utf-8") as f:
    data = json.load(f)

top_30 = data["top_30"]
weekly = data.get("all_scored", [])[30:50]

directions = [
    {"id": "process", "name": "激光冲击强化工艺", "icon": "⚙", "color": "#8B0000"},
    {"id": "stress", "name": "残余应力与变形", "icon": "📐", "color": "#4B0082"},
    {"id": "micro", "name": "微观组织演变", "icon": "🔬", "color": "#006400"},
    {"id": "fem", "name": "有限元与多尺度模拟", "icon": "💻", "color": "#000080"},
    {"id": "fatigue", "name": "疲劳与磨损性能", "icon": "⏱", "color": "#8B4513"},
    {"id": "hybrid", "name": "复合/特种激光冲击", "icon": "🔀", "color": "#483D8B"},
    {"id": "nano", "name": "纳米/超快激光冲击", "icon": "⚡", "color": "#B8860B"},
    {"id": "surface", "name": "表面改性工程", "icon": "🛠", "color": "#2F4F4F"},
]


def classify_paper(paper):
    text = (paper.get("title", "") + " " + paper.get("abstract", "")).lower()
    if any(kw in text for kw in ["molecular dynamics", "nano", "ultrafast",
        "femtosecond", "picosecond", "2d material", "nanowire"]):
        return "nano"
    if any(kw in text for kw in ["fatigue", "wear", "tribolog", "friction",
        "rolling contact"]):
        return "fatigue"
    if any(kw in text for kw in ["finite element", "simulation", "numerical",
        "model", "fem"]):
        return "fem"
    if any(kw in text for kw in ["microstructure", "phase transition",
        "nanotwin", "grain", "crystal", "martensite", "nanocrystall"]):
        return "micro"
    if any(kw in text for kw in ["residual stress", "deformation", "plastic",
        "strain", "bending", "bulging"]):
        return "stress"
    if any(kw in text for kw in ["hybrid", "additive", "cladding", "coating",
        "composite", "in-situ", "laser sintering"]):
        return "hybrid"
    if any(kw in text for kw in ["surface", "corrosion", "wettability",
        "modification", "biomedical", "implant"]):
        return "surface"
    return "process"


def gen_tags(paper):
    text = (paper.get("title", "") + " " + paper.get("abstract", "")).lower()
    tags = []
    if "molecular dynamics" in text: tags.append("分子动力学")
    if "finite element" in text or "simulation" in text: tags.append("有限元模拟")
    if "residual stress" in text: tags.append("残余应力")
    if "microstructure" in text: tags.append("微观组织")
    if "nanotwin" in text or "nanocrystall" in text: tags.append("纳米结构")
    if "additive" in text: tags.append("增材制造")
    if "corrosion" in text: tags.append("腐蚀性能")
    if "fatigue" in text: tags.append("疲劳性能")
    if "phase" in text and ("transition" in text or "transformation" in text):
        tags.append("相变")
    if "ti-6al-4v" in text or "ti6al4v" in text: tags.append("钛合金")
    if "stainless" in text or "304" in text: tags.append("不锈钢")
    if "aluminum" in text or "aluminium" in text: tags.append("铝合金")
    if "cryogenic" in text: tags.append("深冷激光冲击")
    if "warm" in text: tags.append("温激光冲击")
    if "confined" in text or "confining" in text: tags.append("约束层")
    if not tags: tags.append("激光冲击")
    return tags[:5]


def get_source_type(p):
    src = p.get("source", "")
    if "arXiv" in src or "preprint" in src.lower():
        return "预印本"
    if "SCI" in src or "Journal" in src or "journal" in src:
        return "SCI"
    if "book" in src.lower() or "proceedings" in src.lower():
        return "核心"
    return "SCI"


def build_paper(p, idx, prefix="p"):
    field = classify_paper(p)
    date_str = p.get("date", "")
    year, month = 2024, 1
    if len(date_str) >= 4:
        try: year = int(date_str[:4])
        except: pass
    if len(date_str) >= 7:
        try: month = int(date_str[5:7])
        except: pass
    score = min(10, max(1, int(p.get("innovation_score", 30) / 6)))
    abstract = p.get("abstract", "")
    if not abstract: abstract = "（摘要待补充）"
    return {
        "id": f"{prefix}-{idx:03d}",
        "title": p.get("title", ""),
        "titleCn": "",
        "authors": p.get("authors", ""),
        "journal": p.get("journal", ""),
        "sourceType": get_source_type(p),
        "year": year,
        "month": month,
        "innovationScore": score,
        "field": field,
        "innovationTags": gen_tags(p),
        "abstract": abstract[:500],
        "doi": p.get("doi", ""),
        "innovationCn": "",
        "innovationFormula": "",
        "subCategory": "",
        "citationCount": p.get("citation_count", 0),
        "link": p.get("link", ""),
    }


papers = []
for i, p in enumerate(top_30):
    papers.append(build_paper(p, i + 1, "p"))
for i, p in enumerate(weekly[:20]):
    papers.append(build_paper(p, i + 1, "w"))

# Direction summaries
summaries = {}
for d in directions:
    dir_papers = [p for p in papers if p["field"] == d["id"]]
    summaries[d["id"]] = {
        "trend": f"{d['name']}方向收录 {len(dir_papers)} 篇论文",
        "summary": f"该方向涵盖激光冲击强化领域的相关研究，"
                    f"共收录 {len(dir_papers)} 篇论文，"
                    f"平均创新评分 {sum(p['innovationScore'] for p in dir_papers)/max(len(dir_papers),1):.1f}/10。",
        "hotspots": list(set(tag for p in dir_papers for tag in p["innovationTags"]))[:5],
    }

js_content = "/**\n"
js_content += " * 激光冲击领域论文数据库\n"
js_content += " * 数据来源：arXiv + Crossref\n"
js_content += " * 检索日期：2026-06-22\n"
js_content += " * 覆盖 SCI / 核心 / 预印本 多源文献\n"
js_content += " */\n\n"
js_content += "const DIRECTIONS = " + json.dumps(directions, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "const DIRECTION_SUMMARIES = " + json.dumps(summaries, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "const PAPERS = " + json.dumps(papers, ensure_ascii=False, indent=2) + ";\n"

with open(os.path.join(DATA_DIR, "papers.js"), "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"papers.js created with {len(papers)} papers")
print(f"File size: {os.path.getsize(os.path.join(DATA_DIR, 'papers.js'))} bytes")