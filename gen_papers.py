# -*- coding: utf-8 -*-
"""Generate papers.js with innovation formulas, process types, and trend summaries"""
import json, os, re

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(DATA_DIR, "papers_data.json"), "r", encoding="utf-8") as f:
    data = json.load(f)

top_30 = data["top_30"]
weekly = data.get("all_scored", [])[30:50]

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
    if any(kw in text for kw in ["cryogenic", "deep cold", "液氮"]):
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
    if any(kw in text for kw in ["confining", "constrained", "water droplet", "absorb"]):
        return "conventional"
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


def gen_innovation_formula(paper):
    """Generate innovation formula like: 方法A + 方法B = 结果"""
    text = (paper.get("title", "") + " " + paper.get("abstract", "")).lower()
    methods = []
    result = "性能提升"

    if "molecular dynamics" in text:
        methods.append("分子动力学")
    if "finite element" in text or "simulation" in text or "numerical" in text:
        methods.append("有限元模拟")
    if "laser shock peening" in text or "laser shock processing" in text:
        methods.append("激光冲击")
    if "cryogenic" in text:
        methods.append("深冷处理")
    if "warm" in text:
        methods.append("温冲击")
    if "additive" in text:
        methods.append("增材制造")
    if "in-situ" in text or "in situ" in text:
        methods.append("原位监测")
    if "ultrafast" in text or "femtosecond" in text:
        methods.append("超快激光")
    if "2d material" in text or "nanowire" in text:
        methods.append("纳米材料")

    if "residual stress" in text:
        result = "残余应力调控"
    elif "fatigue" in text:
        result = "疲劳寿命提升"
    elif "wear" in text or "tribolog" in text:
        result = "耐磨性提升"
    elif "corrosion" in text:
        result = "耐腐蚀性提升"
    elif "microstructure" in text or "nanotwin" in text:
        result = "微观组织优化"
    elif "deformation" in text:
        result = "变形行为预测"
    elif "phase" in text:
        result = "相变调控"

    if not methods:
        methods = ["激光冲击"]
    if len(methods) > 3:
        methods = methods[:3]

    return " + ".join(methods) + " = " + result


def gen_title_cn(paper):
    """Generate Chinese title translation from English title"""
    title = paper.get("title", "")
    if not title:
        return ""
    # Common translation patterns
    cn = title
    replacements = [
        ("Laser Shock Peening", "激光冲击强化"),
        ("Laser Shock Processing", "激光冲击处理"),
        ("laser shock peening", "激光冲击强化"),
        ("laser shock processing", "激光冲击处理"),
        ("Laser Shock", "激光冲击"),
        ("laser shock", "激光冲击"),
        ("Laser-Induced", "激光诱导"),
        ("laser-induced", "激光诱导"),
        ("Residual Stress", "残余应力"),
        ("residual stress", "残余应力"),
        ("Microstructure", "微观组织"),
        ("microstructure", "微观组织"),
        ("Deformation", "变形"),
        ("deformation", "变形"),
        ("Numerical Study", "数值研究"),
        ("Numerical Simulation", "数值模拟"),
        ("Finite Element", "有限元"),
        ("finite element", "有限元"),
        ("Molecular Dynamics", "分子动力学"),
        ("molecular dynamics", "分子动力学"),
        ("Fatigue", "疲劳"),
        ("fatigue", "疲劳"),
        ("Wear", "磨损"),
        ("wear", "磨损"),
        ("Corrosion", "腐蚀"),
        ("corrosion", "腐蚀"),
        ("Surface", "表面"),
        ("surface", "表面"),
        ("Mechanical Properties", "力学性能"),
        ("mechanical properties", "力学性能"),
        ("Phase Transition", "相变"),
        ("phase transition", "相变"),
        ("Nanotwins", "纳米孪晶"),
        ("nanotwins", "纳米孪晶"),
        ("Nanocrystallization", "纳米晶化"),
        ("nanocrystallization", "纳米晶化"),
        ("Martensitic", "马氏体"),
        ("martensitic", "马氏体"),
        ("Titanium Alloy", "钛合金"),
        ("titanium alloy", "钛合金"),
        ("Ti-6Al-4V", "Ti-6Al-4V钛合金"),
        ("Stainless Steel", "不锈钢"),
        ("stainless steel", "不锈钢"),
        ("Aluminum", "铝"),
        ("aluminum", "铝"),
        ("Aluminium", "铝"),
        ("Additive Manufacturing", "增材制造"),
        ("additive manufacturing", "增材制造"),
        ("Cryogenic", "深冷"),
        ("cryogenic", "深冷"),
        ("Ultrafast", "超快"),
        ("ultrafast", "超快"),
        ("Femtosecond", "飞秒"),
        ("femtosecond", "飞秒"),
        ("Nanosecond", "纳秒"),
        ("nanosecond", "纳秒"),
        ("Simulation", "模拟"),
        ("simulation", "模拟"),
        ("Experimental Study", "实验研究"),
        ("experimental study", "实验研究"),
        ("Investigation", "研究"),
        ("investigation", "研究"),
        ("Analysis", "分析"),
        ("analysis", "分析"),
        ("Effect of", "......的影响"),
        ("Effect", "影响"),
        ("effect", "影响"),
        ("Enhancement", "增强"),
        ("enhancement", "增强"),
        ("Improvement", "改善"),
        ("improvement", "改善"),
        ("Prediction", "预测"),
        ("prediction", "预测"),
        ("Modeling", "建模"),
        ("modeling", "建模"),
        ("Model", "模型"),
        ("model", "模型"),
        ("Plastic", "塑性"),
        ("plastic", "塑性"),
        ("Strain", "应变"),
        ("strain", "应变"),
        ("Coating", "涂层"),
        ("coating", "涂层"),
        ("Composite", "复合"),
        ("composite", "复合"),
        ("Dynamic", "动态"),
        ("dynamic", "动态"),
        ("Thermal", "热"),
        ("thermal", "热"),
        ("Bonding", "结合"),
        ("bonding", "结合"),
        ("Interface", "界面"),
        ("interface", "界面"),
        ("Crack", "裂纹"),
        ("crack", "裂纹"),
        ("Fracture", "断裂"),
        ("fracture", "断裂"),
        ("Hardness", "硬度"),
        ("hardness", "硬度"),
        ("Strength", "强度"),
        ("strength", "强度"),
        ("Gradient", "梯度"),
        ("gradient", "梯度"),
        ("Optimization", "优化"),
        ("optimization", "优化"),
        ("Parameter", "参数"),
        ("parameter", "参数"),
        ("Temperature", "温度"),
        ("temperature", "温度"),
        ("Shock Wave", "冲击波"),
        ("shock wave", "冲击波"),
        ("Shockwave", "冲击波"),
        ("shockwave", "冲击波"),
        ("Plasma", "等离子体"),
        ("plasma", "等离子体"),
        ("Wave", "波"),
        ("wave", "波"),
        ("Pressure", "压力"),
        ("pressure", "压力"),
        ("Energy", "能量"),
        ("energy", "能量"),
        ("Power", "功率"),
        ("power", "功率"),
        ("Pulse", "脉冲"),
        ("pulse", "脉冲"),
        ("Density", "密度"),
        ("density", "密度"),
        ("Dislocation", "位错"),
        ("dislocation", "位错"),
        ("Grain", "晶粒"),
        ("grain", "晶粒"),
        ("Crystal", "晶体"),
        ("crystal", "晶体"),
        ("Texture", "织构"),
        ("texture", "织构"),
        ("Rolling", "轧制"),
        ("rolling", "轧制"),
        ("Bending", "弯曲"),
        ("bending", "弯曲"),
        ("Spallation", "层裂"),
        ("spallation", "层裂"),
        ("Acoustic", "声学"),
        ("acoustic", "声学"),
        ("Breakdown", "击穿"),
        ("breakdown", "击穿"),
        ("Melt Pool", "熔池"),
        ("melt pool", "熔池"),
        ("Selective Laser", "选择性激光"),
        ("selective laser", "选择性激光"),
        ("Sintering", "烧结"),
        ("sintering", "烧结"),
        ("Carbon Fiber", "碳纤维"),
        ("carbon fiber", "碳纤维"),
        ("Reinforced", "增强"),
        ("reinforced", "增强"),
        ("Polymer", "聚合物"),
        ("polymer", "聚合物"),
        ("Nanocomposite", "纳米复合"),
        ("nanocomposite", "纳米复合"),
        ("Biomedical", "生物医用"),
        ("biomedical", "生物医用"),
        ("Implant", "植入体"),
        ("implant", "植入体"),
        ("Wettability", "润湿性"),
        ("wettability", "润湿性"),
        ("Tribological", "摩擦学"),
        ("tribological", "摩擦学"),
        ("Friction", "摩擦"),
        ("friction", "摩擦"),
        ("Lubrication", "润滑"),
        ("lubrication", "润滑"),
        ("Residual", "残余"),
        ("residual", "残余"),
        ("Compressive", "压缩"),
        ("compressive", "压缩"),
        ("Tensile", "拉伸"),
        ("tensile", "拉伸"),
        ("Yield", "屈服"),
        ("yield", "屈服"),
        ("Stress", "应力"),
        ("stress", "应力"),
        ("Elastic", "弹性"),
        ("elastic", "弹性"),
        ("Coupled", "耦合"),
        ("coupled", "耦合"),
        ("Hybrid", "复合"),
        ("hybrid", "复合"),
        ("In-situ", "原位"),
        ("In situ", "原位"),
        ("in-situ", "原位"),
        ("in situ", "原位"),
        ("Real-time", "实时"),
        ("real-time", "实时"),
        ("Characterization", "表征"),
        ("characterization", "表征"),
        ("Measurement", "测量"),
        ("measurement", "测量"),
        ("Detection", "检测"),
        ("detection", "检测"),
        ("Application", "应用"),
        ("application", "应用"),
        ("Review", "综述"),
        ("review", "综述"),
        ("Study on", "......研究"),
        ("Study", "研究"),
        ("study", "研究"),
        ("Performance", "性能"),
        ("performance", "性能"),
        ("Property", "性能"),
        ("property", "性能"),
        ("Properties", "性能"),
        ("properties", "性能"),
        ("Behavior", "行为"),
        ("behavior", "行为"),
        ("Mechanism", "机制"),
        ("mechanism", "机制"),
        ("Evolution", "演化"),
        ("evolution", "演化"),
        ("Development", "发展"),
        ("development", "发展"),
        ("Progress", "进展"),
        ("progress", "进展"),
        ("Advanced", "先进"),
        ("advanced", "先进"),
        ("Novel", "新型"),
        ("novel", "新型"),
        ("Numerical", "数值"),
        ("numerical", "数值"),
        ("Analytical", "解析"),
        ("analytical", "解析"),
        ("Theoretical", "理论"),
        ("theoretical", "理论"),
        ("Experimental", "实验"),
        ("experimental", "实验"),
        ("Comparison", "对比"),
        ("comparison", "对比"),
        ("Comparative", "对比"),
        ("comparative", "对比"),
        ("Microdimple", "微凹坑"),
        ("microdimple", "微凹坑"),
        ("Depth", "深度"),
        ("depth", "深度"),
        ("Angle", "角"),
        ("angle", "角"),
        ("Scatter", "散射"),
        ("scatter", "散射"),
        ("Pretreatment", "预处理"),
        ("pretreatment", "预处理"),
        ("Post-processing", "后处理"),
        ("post-processing", "后处理"),
        ("Induced", "诱导"),
        ("induced", "诱导"),
        ("Resistance", "抗力"),
        ("resistance", "抗力"),
        ("Modification", "改性"),
        ("modification", "改性"),
        ("Treatment", "处理"),
        ("treatment", "处理"),
        ("Technique", "技术"),
        ("technique", "技术"),
        ("Method", "方法"),
        ("method", "方法"),
        ("Approach", "方法"),
        ("approach", "方法"),
        ("Process", "工艺"),
        ("process", "工艺"),
        ("Processing", "处理"),
        ("processing", "处理"),
        ("Material", "材料"),
        ("material", "材料"),
        ("Metallic", "金属"),
        ("metallic", "金属"),
        ("Alloy", "合金"),
        ("alloy", "合金"),
        ("Microscale", "微尺度"),
        ("microscale", "微尺度"),
        ("Nanoscale", "纳米尺度"),
        ("nanoscale", "纳米尺度"),
        ("Multiscale", "多尺度"),
        ("multiscale", "多尺度"),
        ("Multi-scale", "多尺度"),
        ("multi-scale", "多尺度"),
        ("2D Material", "二维材料"),
        ("2d material", "二维材料"),
        ("Chiral", "手性"),
        ("chiral", "手性"),
        ("Chain", "链"),
        ("chain", "链"),
        ("Nanowire", "纳米线"),
        ("nanowire", "纳米线"),
        ("Junction", "结"),
        ("junction", "结"),
        ("Silver", "银"),
        ("silver", "银"),
        ("Mold", "模具"),
        ("mold", "模具"),
        ("Topology", "拓扑"),
        ("topology", "拓扑"),
        ("Anisotropic", "各向异性"),
        ("anisotropic", "各向异性"),
        ("Carbide", "碳化物"),
        ("carbide", "碳化物"),
        ("Lath", "板条"),
        ("lath", "板条"),
        ("Austenitic", "奥氏体"),
        ("austenitic", "奥氏体"),
        ("Steel", "钢"),
        ("steel", "钢"),
        ("CFRP", "碳纤维增强复合材料"),
        ("Interfacial", "界面"),
        ("interfacial", "界面"),
        ("Vibration", "振动"),
        ("vibration", "振动"),
        ("Assisted", "辅助"),
        ("assisted", "辅助"),
        ("Robust", "鲁棒"),
        ("robust", "鲁棒"),
        ("Phase Field", "相场"),
        ("phase field", "相场"),
        ("Large Deformation", "大变形"),
        ("large deformation", "大变形"),
        ("Spallation", "层裂"),
        ("spallation", "层裂"),
        ("Metallic Materials", "金属材料"),
        ("metallic materials", "金属材料"),
        ("Bulging", "胀形"),
        ("bulging", "胀形"),
        ("Dynamics", "动力学"),
        ("dynamics", "动力学"),
        ("Thermal Corrosion", "热腐蚀"),
        ("thermal corrosion", "热腐蚀"),
        ("Contact", "接触"),
        ("contact", "接触"),
        ("Rolling Contact", "滚动接触"),
        ("rolling contact", "滚动接触"),
        ("Plastic Deformation", "塑性变形"),
        ("plastic deformation", "塑性变形"),
        ("Confining Layer", "约束层"),
        ("confining layer", "约束层"),
        ("Ablating Layer", "吸收层"),
        ("ablating layer", "吸收层"),
        ("Suspended Water Droplet", "悬浮水滴"),
        ("suspended water droplet", "悬浮水滴"),
        ("Elevated Temperature", "高温"),
        ("elevated temperature", "高温"),
        ("Pulse Time Structure", "脉冲时间结构"),
        ("pulse time structure", "脉冲时间结构"),
        ("H-BN", "六方氮化硼"),
        ("Frictional", "摩擦"),
        ("frictional", "摩擦"),
        ("Nanocomposites", "纳米复合材料"),
        ("nanocomposites", "纳米复合材料"),
        ("Reinforced", "增强"),
        ("reduced", "降低"),
        ("Reduced", "降低"),
        ("Bent", "弯曲"),
        ("bent", "弯曲"),
        ("Low Energy", "低能量"),
        ("low energy", "低能量"),
        ("First-principles", "第一性原理"),
        ("Plasma Dynamics", "等离子体动力学"),
        ("plasma dynamics", "等离子体动力学"),
        ("Matter Interaction", "物质相互作用"),
        ("matter interaction", "物质相互作用"),
        ("Laser-Matter", "激光-物质"),
        ("laser-matter", "激光-物质"),
        ("High Power", "高功率"),
        ("high power", "高功率"),
        ("Damage Resistance", "损伤抗力"),
        ("damage resistance", "损伤抗力"),
        ("Post-processing", "后处理"),
        ("Characteristics", "特性"),
        ("characteristics", "特性"),
        ("Development Status", "发展现状"),
        ("development status", "发展现状"),
        ("Mechanical Effects", "力学效应"),
        ("mechanical effects", "力学效应"),
        ("FGH95", "FGH95合金"),
        ("H13", "H13钢"),
        ("TC17", "TC17合金"),
        ("25CrNi2Mo", "25CrNi2Mo钢"),
        ("SS 304", "304不锈钢"),
        ("304 austenitic", "304奥氏体"),
        ("Pure Al", "纯铝"),
        ("pure al", "纯铝"),
    ]
    for en, cn_trans in replacements:
        cn = cn.replace(en, cn_trans)
    return cn


def gen_innovation_cn(paper):
    """Generate Chinese innovation description from abstract"""
    abstract = paper.get("abstract", "")
    title = paper.get("title", "")
    if not abstract or len(abstract) < 30:
        # Generate from title if no abstract
        if title:
            return gen_title_cn(paper) + "。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。"
        return "该论文研究了激光冲击强化相关工艺与性能。"

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

    result = " ".join(key_sentences[:3])
    if not result:
        result = abstract[:200]
    if len(result) > 300:
        result = result[:300] + "..."

    # Translate key terms in the result
    for en, cn_trans in [
        ("laser shock peening", "激光冲击强化"),
        ("Laser Shock Peening", "激光冲击强化"),
        ("laser shock processing", "激光冲击处理"),
        ("residual stress", "残余应力"),
        ("residual stresses", "残余应力"),
        ("microstructure", "微观组织"),
        ("microstructure evolution", "微观组织演化"),
        ("finite element", "有限元"),
        ("molecular dynamics", "分子动力学"),
        ("plastic deformation", "塑性变形"),
        ("compressive residual stress", "压缩残余应力"),
        ("fatigue life", "疲劳寿命"),
        ("wear resistance", "耐磨性"),
        ("corrosion resistance", "耐腐蚀性"),
        ("surface modification", "表面改性"),
        ("mechanical properties", "力学性能"),
        ("phase transformation", "相变"),
        ("phase transition", "相变"),
        ("nanotwins", "纳米孪晶"),
        ("nanocrystallization", "纳米晶化"),
        ("dislocation density", "位错密度"),
        ("shock wave", "冲击波"),
        ("Ti-6Al-4V", "Ti-6Al-4V钛合金"),
        ("stainless steel", "不锈钢"),
        ("additive manufacturing", "增材制造"),
        ("cryogenic", "深冷"),
        ("ultrafast", "超快"),
        ("in-situ", "原位"),
        ("hybrid", "复合"),
    ]:
        result = result.replace(en, cn_trans)

    return result


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
    process_type = classify_process(p)
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
    if not abstract: abstract = ""
    innovation_cn = gen_innovation_cn(p)
    return {
        "id": f"{prefix}-{idx:03d}",
        "title": p.get("title", ""),
        "titleCn": gen_title_cn(p),
        "authors": p.get("authors", ""),
        "journal": p.get("journal", ""),
        "sourceType": get_source_type(p),
        "year": year,
        "month": month,
        "innovationScore": score,
        "field": field,
        "processType": process_type,
        "innovationTags": gen_tags(p),
        "abstract": abstract[:500],
        "doi": p.get("doi", ""),
        "innovationCn": gen_innovation_cn(p),
        "innovationFormula": gen_innovation_formula(p),
        "subCategory": "",
        "citationCount": p.get("citation_count", 0),
        "link": p.get("link", ""),
    }


papers = []
for i, p in enumerate(top_30):
    papers.append(build_paper(p, i + 1, "p"))
for i, p in enumerate(weekly[:20]):
    papers.append(build_paper(p, i + 1, "w"))

js_content = "/**\n"
js_content += " * 激光冲击领域论文数据库\n"
js_content += " * 数据来源：arXiv + Crossref\n"
js_content += " * 检索日期：2026-06-22\n"
js_content += " * 覆盖 SCI / 核心 / 预印本 多源文献\n"
js_content += " */\n\n"
js_content += "const DIRECTIONS = " + json.dumps(DIRECTIONS, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "const PROCESS_TYPES = " + json.dumps(PROCESS_TYPES, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "const DIRECTION_SUMMARIES = " + json.dumps(DIRECTION_SUMMARIES, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "const PAPERS = " + json.dumps(papers, ensure_ascii=False, indent=2) + ";\n"

with open(os.path.join(DATA_DIR, "papers.js"), "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"papers.js created with {len(papers)} papers")
print(f"File size: {os.path.getsize(os.path.join(DATA_DIR, 'papers.js'))} bytes")