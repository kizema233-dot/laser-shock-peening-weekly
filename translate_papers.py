# -*- coding: utf-8 -*-
"""
Translate all paper titles and innovation descriptions to Chinese
using Google Translate API (free, no key required)
"""
import json, os, time, re, requests

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
PAPERS_JS = os.path.join(DATA_DIR, "papers_data.json")
OUTPUT_JS = os.path.join(DATA_DIR, "papers.js")
CACHE_FILE = os.path.join(DATA_DIR, "translation_cache.json")


def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def translate_en_to_cn(text, cache):
    if not text or len(text) < 5:
        return text
    # Check cache
    cache_key = text[:200]
    if cache_key in cache:
        return cache[cache_key]

    url = "https://translate.googleapis.com/translate_a/single"
    params = {
        "client": "gtx",
        "sl": "en",
        "tl": "zh-CN",
        "dt": "t",
        "q": text[:500]
    }
    for attempt in range(3):
        try:
            resp = requests.get(url, params=params, timeout=20)
            if resp.status_code == 429:
                print("    Rate limited, waiting 10s...")
                time.sleep(10)
                continue
            data = resp.json()
            translated = "".join(s[0] for s in data[0] if s[0])
            cache[cache_key] = translated
            return translated
        except Exception as e:
            print(f"    Attempt {attempt+1} error: {type(e).__name__}")
            time.sleep(3)
    return text


def gen_innovation_formula(paper):
    text = (paper.get("title", "") + " " + paper.get("abstract", "")).lower()
    methods = []
    result = "性能提升"
    if "molecular dynamics" in text: methods.append("分子动力学")
    if "finite element" in text or "simulation" in text or "numerical" in text:
        methods.append("有限元模拟")
    if "laser shock peening" in text or "laser shock processing" in text:
        methods.append("激光冲击")
    if "cryogenic" in text: methods.append("深冷处理")
    if "warm" in text: methods.append("温冲击")
    if "additive" in text: methods.append("增材制造")
    if "in-situ" in text or "in situ" in text: methods.append("原位监测")
    if "ultrafast" in text or "femtosecond" in text: methods.append("超快激光")
    if "2d material" in text or "nanowire" in text: methods.append("纳米材料")
    if "residual stress" in text: result = "残余应力调控"
    elif "fatigue" in text: result = "疲劳寿命提升"
    elif "wear" in text or "tribolog" in text: result = "耐磨性提升"
    elif "corrosion" in text: result = "耐腐蚀性提升"
    elif "microstructure" in text or "nanotwin" in text: result = "微观组织优化"
    elif "deformation" in text: result = "变形行为预测"
    elif "phase" in text: result = "相变调控"
    if not methods: methods = ["激光冲击"]
    if len(methods) > 3: methods = methods[:3]
    return " + ".join(methods) + " = " + result


DIRECTIONS = [
    {"id": "process", "name": "激光冲击强化工艺", "icon": "⚙", "color": "#8B0000"},
    {"id": "stress", "name": "残余应力与变形", "icon": "📐", "color": "#4B0082"},
    {"id": "micro", "name": "微观组织演变", "icon": "🔬", "color": "#006400"},
    {"id": "fem", "name": "有限元与多尺度模拟", "icon": "💻", "color": "#000080"},
    {"id": "fatigue", "name": "疲劳与磨损性能", "icon": "⏱", "color": "#8B4513"},
    {"id": "hybrid", "name": "复合/特种激光冲击", "icon": "🔀", "color": "#483D8B"},
    {"id": "nano", "name": "纳米/超快激光冲击", "icon": "⚡", "color": "#B8860B"},
    {"id": "surface", "name": "表面改性工程", "icon": "🛠", "color": "#2F4F4F"},
]

PROCESS_TYPES = [
    {"id": "conventional", "name": "常规LSP"},
    {"id": "warm", "name": "温激光冲击"},
    {"id": "cryogenic", "name": "深冷激光冲击"},
    {"id": "hybrid_am", "name": "复合/增材制造"},
    {"id": "coating", "name": "涂层/表面改性"},
    {"id": "simulation", "name": "数值模拟"},
    {"id": "nano_lsp", "name": "纳米/超快LSP"},
    {"id": "general", "name": "通用/其他"},
]

DIRECTION_SUMMARIES = {
    "process": {
        "trend": "工艺参数优化与约束层创新",
        "summary": "激光冲击强化工艺研究聚焦于：(1) 约束层和吸收层对冲击波特性的影响机制；(2) 多次冲击对纳米级微观组织的累积效应；(3) 悬浮水滴约束的高温激光冲击新工艺；(4) 脉冲时间结构对残余应力的调控。趋势是向高温、多次、精密控制方向发展。",
        "hotspots": ["约束层优化", "多次冲击累积效应", "悬浮水滴约束", "脉冲结构调控"]
    },
    "stress": {
        "trend": "残余应力预测与变形控制",
        "summary": "残余应力与变形方向是最活跃的研究领域，涵盖：(1) 激光冲击诱导塑性变形的数值预测；(2) Ti-6Al-4V等合金的变形过程与残余应力分布；(3) 激光冲击胀形的解析模型；(4) 弯曲角散射的预处理控制。趋势是从经验公式向多物理场耦合精确预测发展。",
        "hotspots": ["残余应力预测", "Ti-6Al-4V变形", "胀形成形", "弯曲角控制"]
    },
    "micro": {
        "trend": "相变与纳米结构调控",
        "summary": "微观组织演变研究集中在：(1) 激光冲击诱导马氏体纳米晶化与碳化物变形；(2) SS 304钢的相变与纳米孪晶形成；(3) 深冷激光冲击下微观组织演化。趋势是组织调控从微米尺度向纳米尺度深化。",
        "hotspots": ["马氏体纳米晶化", "纳米孪晶", "深冷激光冲击", "碳化物变形"]
    },
    "fem": {
        "trend": "多尺度模拟与分子动力学",
        "summary": "有限元与多尺度模拟是核心工具：(1) 三维FEM结合位错密度本构模型模拟纯铝LSP；(2) 分子动力学模拟TiAl界面激光冲击行为；(3) H13钢塑性变形响应的仿真与实验对照；(4) FGH95合金表面残余应力数值模拟。趋势是向原子尺度-宏观跨尺度耦合发展。",
        "hotspots": ["三维FEM建模", "分子动力学", "位错密度本构", "跨尺度模拟"]
    },
    "fatigue": {
        "trend": "滚动接触疲劳与磨损抑制",
        "summary": "疲劳与磨损性能方向关注：(1) 25CrNi2Mo钢的塑性变形与滚动接触疲劳抗力提升；(2) 激光冲击对耐磨性的改善机制。趋势是将残余应力场与微观组织演化统一纳入寿命预测模型。",
        "hotspots": ["滚动接触疲劳", "磨损性能提升", "应力-组织耦合"]
    },
    "hybrid": {
        "trend": "增材制造与原位复合冲击",
        "summary": "复合/特种激光冲击方向新兴活跃：(1) 激光冲击-振动辅助混合选择性激光烧结；(2) 原位激光冲击辅助激光熔覆微观组织调控；(3) CFRP复合材料界面结合强度的动态建模与检测。趋势是多能场耦合与工艺复合化。",
        "hotspots": ["激光冲击-振动辅助", "原位熔覆冲击", "CFRP界面检测"]
    },
    "nano": {
        "trend": "2D材料与纳米线冲击变形",
        "summary": "纳米/超快激光冲击方向前沿活跃：(1) 超快激光冲击在手性链2D材料中实现模具拓扑控制的各向异性变形；(2) 银纳米线结的激光冲击变形对比研究；(3) 声学特征识别激光诱导击穿。趋势是从宏观金属向纳米尺度功能材料延伸。",
        "hotspots": ["2D材料冲击变形", "银纳米线结", "超快激光冲击", "声学特征检测"]
    },
    "surface": {
        "trend": "腐蚀抗力与生物医用表面改性",
        "summary": "表面改性工程方向聚焦：(1) 激光冲击波增强Ti6Al4V合金热腐蚀抗力；(2) 生物医用钛合金的激光冲击处理；(3) 摩擦行为与润湿性改善。趋势是面向极端环境和生物医用的高端表面功能化。",
        "hotspots": ["热腐蚀抗力", "生物医用钛合金", "润湿性调控"]
    }
}


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


def classify_process(paper):
    text = (paper.get("title", "") + " " + paper.get("abstract", "")).lower()
    if any(kw in text for kw in ["cryogenic", "deep cold"]):
        return "cryogenic"
    if any(kw in text for kw in ["warm"]):
        return "warm"
    if any(kw in text for kw in ["additive", "sintering", "hybrid"]):
        return "hybrid_am"
    if any(kw in text for kw in ["coating", "cladding", "surface mod"]):
        return "coating"
    if any(kw in text for kw in ["molecular dynamics", "simulation", "numerical", "finite element"]):
        return "simulation"
    if any(kw in text for kw in ["nano", "ultrafast", "femtosecond", "2d material", "nanowire"]):
        return "nano_lsp"
    return "general"


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


def gen_innovation_text(abstract, title_cn, cache):
    """Generate innovation description: translate key sentences from abstract"""
    if not abstract or len(abstract) < 30:
        return title_cn + "。该论文研究了激光冲击强化相关工艺与性能。"
    # Extract key sentences
    sentences = re.split(r'(?<=[.!?])\s+', abstract)
    key_sentences = []
    for s in sentences:
        s_lower = s.lower()
        if any(kw in s_lower for kw in ["novel", "new", "first", "propose",
            "develop", "demonstrate", "reveal", "improve", "enhance",
            "result", "show", "find", "achieve", "obtain", "indicate",
            "suggest", "confirm", "establish"]):
            key_sentences.append(s.strip())
    if not key_sentences and sentences:
        key_sentences = [sentences[0].strip()]
        if len(sentences) > 2:
            key_sentences.append(sentences[-1].strip())
    en_text = " ".join(key_sentences[:3])
    if not en_text:
        en_text = abstract[:200]
    if len(en_text) > 500:
        en_text = en_text[:500]
    # Translate to Chinese
    cn_text = translate_en_to_cn(en_text, cache)
    return cn_text


def main():
    print("=" * 60)
    print("  Translating papers to Chinese...")
    print("=" * 60)

    with open(PAPERS_JS, "r", encoding="utf-8") as f:
        data = json.load(f)

    top_30 = data["top_30"]
    weekly = data.get("all_scored", [])[30:50]
    all_papers = top_30 + weekly[:20]

    cache = load_cache()
    print(f"Loaded {len(cache)} cached translations")

    papers = []
    total = len(all_papers)
    for i, p in enumerate(all_papers):
        prefix = "p" if i < 30 else "w"
        idx = (i + 1) if i < 30 else (i - 30 + 1)

        title = p.get("title", "")
        abstract = p.get("abstract", "")

        print(f"[{i+1}/{total}] Translating: {title[:50]}...")

        # Translate title
        title_cn = translate_en_to_cn(title, cache)

        # Translate innovation description
        innovation_cn = gen_innovation_text(abstract, title_cn, cache)

        # Save cache periodically
        if (i + 1) % 5 == 0:
            save_cache(cache)

        date_str = p.get("date", "")
        year, month = 2024, 1
        if len(date_str) >= 4:
            try: year = int(date_str[:4])
            except: pass
        if len(date_str) >= 7:
            try: month = int(date_str[5:7])
            except: pass

        score = min(10, max(1, int(p.get("innovation_score", 30) / 6)))

        papers.append({
            "id": f"{prefix}-{idx:03d}",
            "title": title,
            "titleCn": title_cn,
            "authors": p.get("authors", ""),
            "journal": p.get("journal", ""),
            "sourceType": get_source_type(p),
            "year": year,
            "month": month,
            "innovationScore": score,
            "field": classify_paper(p),
            "processType": classify_process(p),
            "innovationTags": gen_tags(p),
            "abstract": abstract[:500] if abstract else "",
            "doi": p.get("doi", ""),
            "innovationCn": innovation_cn,
            "innovationFormula": gen_innovation_formula(p),
            "subCategory": "",
            "citationCount": p.get("citation_count", 0),
            "link": p.get("link", ""),
        })
        time.sleep(0.5)

    save_cache(cache)

    # Generate papers.js
    js_content = "/**\n"
    js_content += " * 激光冲击领域论文数据库\n"
    js_content += " * 数据来源：arXiv + Crossref\n"
    js_content += " * 检索日期：2026-06-22\n"
    js_content += " * 覆盖 SCI / 核心 / 预印本 多源文献\n"
    js_content += " * 标题与创新点翻译：Google Translate API\n"
    js_content += " */\n\n"
    js_content += "const DIRECTIONS = " + json.dumps(DIRECTIONS, ensure_ascii=False, indent=2) + ";\n\n"
    js_content += "const PROCESS_TYPES = " + json.dumps(PROCESS_TYPES, ensure_ascii=False, indent=2) + ";\n\n"
    js_content += "const DIRECTION_SUMMARIES = " + json.dumps(DIRECTION_SUMMARIES, ensure_ascii=False, indent=2) + ";\n\n"
    js_content += "const PAPERS = " + json.dumps(papers, ensure_ascii=False, indent=2) + ";\n"

    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"\nDone! papers.js created with {len(papers)} papers")
    print(f"File size: {os.path.getsize(OUTPUT_JS)} bytes")
    print(f"Cached translations: {len(cache)}")


if __name__ == "__main__":
    main()