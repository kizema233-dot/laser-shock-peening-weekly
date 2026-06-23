/**
 * 激光冲击领域论文数据库
 * 数据来源：Web of Science / Scopus / 中国知网核心库
 * 检索日期：2026-06-23
 * 覆盖 SCI / 核心 / 预印本 多源文献
 * 每个方向精选 Top 10
 * 标题与创新点翻译：Google Translate API
 */

const DIRECTIONS = [
  {
    "id": "process",
    "name": "激光冲击强化工艺",
    "icon": "⚙",
    "color": "#8B0000"
  },
  {
    "id": "stress",
    "name": "残余应力与变形",
    "icon": "📐",
    "color": "#4B0082"
  },
  {
    "id": "micro",
    "name": "微观组织演变",
    "icon": "🔬",
    "color": "#006400"
  },
  {
    "id": "fem",
    "name": "有限元与多尺度模拟",
    "icon": "💻",
    "color": "#000080"
  },
  {
    "id": "fatigue",
    "name": "疲劳与磨损性能",
    "icon": "⏱",
    "color": "#8B4513"
  },
  {
    "id": "hybrid",
    "name": "复合/特种激光冲击",
    "icon": "🔀",
    "color": "#483D8B"
  },
  {
    "id": "nano",
    "name": "纳米/超快激光冲击",
    "icon": "⚡",
    "color": "#B8860B"
  },
  {
    "id": "surface",
    "name": "表面改性工程",
    "icon": "🛠",
    "color": "#2F4F4F"
  }
];

const PROCESS_TYPES = [
  {
    "id": "conventional",
    "name": "常规LSP"
  },
  {
    "id": "warm",
    "name": "温激光冲击"
  },
  {
    "id": "cryogenic",
    "name": "深冷激光冲击"
  },
  {
    "id": "hybrid_am",
    "name": "复合/增材制造"
  },
  {
    "id": "coating",
    "name": "涂层/表面改性"
  },
  {
    "id": "simulation",
    "name": "数值模拟"
  },
  {
    "id": "nano_lsp",
    "name": "纳米/超快LSP"
  },
  {
    "id": "general",
    "name": "通用/其他"
  }
];

const DIRECTION_SUMMARIES = {
  "process": {
    "trend": "工艺参数优化与约束层创新",
    "summary": "激光冲击强化工艺研究聚焦于：(1) 约束层和吸收层对冲击波特性的影响机制；(2) 多次冲击对纳米级微观组织的累积效应；(3) 悬浮水滴约束的高温激光冲击新工艺；(4) 脉冲时间结构对残余应力的调控。趋势是向高温、多次、精密控制方向发展。",
    "hotspots": [
      "约束层优化",
      "多次冲击累积效应",
      "悬浮水滴约束",
      "脉冲结构调控"
    ]
  },
  "stress": {
    "trend": "残余应力预测与变形控制",
    "summary": "残余应力与变形方向是最活跃的研究领域，涵盖：(1) 激光冲击诱导塑性变形的数值预测；(2) Ti-6Al-4V等合金的变形过程与残余应力分布；(3) 激光冲击胀形的解析模型；(4) 弯曲角散射的预处理控制。趋势是从经验公式向多物理场耦合精确预测发展。",
    "hotspots": [
      "残余应力预测",
      "Ti-6Al-4V变形",
      "胀形成形",
      "弯曲角控制"
    ]
  },
  "micro": {
    "trend": "相变与纳米结构调控",
    "summary": "微观组织演变研究集中在：(1) 激光冲击诱导马氏体纳米晶化与碳化物变形；(2) SS 304钢的相变与纳米孪晶形成；(3) 深冷激光冲击下微观组织演化。趋势是组织调控从微米尺度向纳米尺度深化。",
    "hotspots": [
      "马氏体纳米晶化",
      "纳米孪晶",
      "深冷激光冲击",
      "碳化物变形"
    ]
  },
  "fem": {
    "trend": "多尺度模拟与分子动力学",
    "summary": "有限元与多尺度模拟是核心工具：(1) 三维FEM结合位错密度本构模型模拟纯铝LSP；(2) 分子动力学模拟TiAl界面激光冲击行为；(3) H13钢塑性变形响应的仿真与实验对照；(4) FGH95合金表面残余应力数值模拟。趋势是向原子尺度-宏观跨尺度耦合发展。",
    "hotspots": [
      "三维FEM建模",
      "分子动力学",
      "位错密度本构",
      "跨尺度模拟"
    ]
  },
  "fatigue": {
    "trend": "滚动接触疲劳与磨损抑制",
    "summary": "疲劳与磨损性能方向关注：(1) 25CrNi2Mo钢的塑性变形与滚动接触疲劳抗力提升；(2) 激光冲击对耐磨性的改善机制。趋势是将残余应力场与微观组织演化统一纳入寿命预测模型。",
    "hotspots": [
      "滚动接触疲劳",
      "磨损性能提升",
      "应力-组织耦合"
    ]
  },
  "hybrid": {
    "trend": "增材制造与原位复合冲击",
    "summary": "复合/特种激光冲击方向新兴活跃：(1) 激光冲击-振动辅助混合选择性激光烧结；(2) 原位激光冲击辅助激光熔覆微观组织调控；(3) CFRP复合材料界面结合强度的动态建模与检测。趋势是多能场耦合与工艺复合化。",
    "hotspots": [
      "激光冲击-振动辅助",
      "原位熔覆冲击",
      "CFRP界面检测"
    ]
  },
  "nano": {
    "trend": "2D材料与纳米线冲击变形",
    "summary": "纳米/超快激光冲击方向前沿活跃：(1) 超快激光冲击在手性链2D材料中实现模具拓扑控制的各向异性变形；(2) 银纳米线结的激光冲击变形对比研究；(3) 声学特征识别激光诱导击穿。趋势是从宏观金属向纳米尺度功能材料延伸。",
    "hotspots": [
      "2D材料冲击变形",
      "银纳米线结",
      "超快激光冲击",
      "声学特征检测"
    ]
  },
  "surface": {
    "trend": "腐蚀抗力与生物医用表面改性",
    "summary": "表面改性工程方向聚焦：(1) 激光冲击波增强Ti6Al4V合金热腐蚀抗力；(2) 生物医用钛合金的激光冲击处理；(3) 摩擦行为与润湿性改善。趋势是面向极端环境和生物医用的高端表面功能化。",
    "hotspots": [
      "热腐蚀抗力",
      "生物医用钛合金",
      "润湿性调控"
    ]
  }
};

const PAPERS = [
  {
    "id": "p-001",
    "title": "First-principles modeling of laser-matter interaction and plasma dynamics in nanosecond pulsed laser shock processing",
    "titleCn": "纳秒脉冲激光冲击加工中激光与物质相互作用和等离子体动力学的第一原理建模",
    "authors": "Zhongyang Zhang, Qiong Nian, Charalabos C. Doumanidis, Yiliang Liao",
    "journal": "Journal of Applied Physics",
    "sourceType": "SCI",
    "year": 2018,
    "month": 2,
    "innovationScore": 10,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Nanosecond pulsed laser shock processing (LSP) techniques, including laser shock peening, laser peen forming, and laser shock imprinting, have been employed for widespread industrial applications. In these processes, the main beneficial characteristic is the laser-induced shockwave with a high pressure (in the order of GPa), which leads to the plastic deformation with an ultrahigh strain rate (105–106/s) on the surface of target materials. Although LSP processes have been extensively studied by ",
    "doi": "10.1063/1.5021894",
    "innovationCn": "纳秒脉冲激光冲击加工（LSP）技术，包括激光冲击喷丸、激光喷丸成形和激光冲击压印，已广泛应用于工业领域。在这些过程中，主要的有益特征是高压（GPa量级）激光诱导冲击波，导致靶材料表面产生超高应变速率（105-106/s）的塑性变形。特别是，第一性原理模型的开发",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 28,
    "link": "https://doi.org/10.1063/1.5021894"
  },
  {
    "id": "p-002",
    "title": "Laser shock processing on the biomedical titanium alloys",
    "titleCn": "生物医用钛合金的激光冲击加工",
    "authors": "Qingqing Wang, Xiaodie Cao",
    "journal": "Journal of Physics: Conference Series",
    "sourceType": "SCI",
    "year": 2025,
    "month": 8,
    "innovationScore": 9,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能",
      "疲劳性能"
    ],
    "abstract": "Abstract The biomedical titanium alloys are widely applied as medical implant material due to its excellent mechanical performance and great biocompatibility. However, the disparities in elastic modulus and mass density between these materials and natural bone, as well as the binding force, the failure of fatigue, wear and corrosion will be existed. Laser shock processing (LSP) is an innovative surface enhancement technique capable of boosting mechanical performance via laser-driven stress waves",
    "doi": "10.1088/1742-6596/3061/1/012020",
    "innovationCn": "摘要 生物医用钛合金因其优异的力学性能和良好的生物相容性而被广泛用作医用植入材料。但这些材料与天然骨的弹性模量、质量密度以及结合力存在差异，会存在疲劳、磨损、腐蚀等失效问题。激光冲击加工 (LSP) 是一种创新的表面增强技术，能够通过激光驱动的应力波提高机械性能",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1088/1742-6596/3061/1/012020"
  },
  {
    "id": "p-003",
    "title": "Reducing scatter in bent angle by a laser shock peening pretreatment",
    "titleCn": "通过激光冲击喷丸预处理减少弯曲角度的分散",
    "authors": "Tobias Valentino, Andreas Stephen, Tim Radel",
    "journal": "Journal of Laser Applications",
    "sourceType": "SCI",
    "year": 2021,
    "month": 11,
    "innovationScore": 8,
    "field": "nano",
    "processType": "coating",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "Laser shock peening is a surface treatment technology, which modifies the residual stress state of metal parts. When forming thin sheet metal parts with thicknesses ≤1 mm, locally varying residual stress states are, according to the literature, the main reason for the scatter in the bent angle. Forming processes, such as bending, are often used to manufacture thin sheet metal. Thin sheets are formed in quantities of several hundreds of millions per year. Even scrap rates that are in the ppm rang",
    "doi": "10.2351/7.0000468",
    "innovationCn": "激光冲击强化是一种改变金属零件残余应力状态的表面处理技术。为了确保稳健的成形工艺，假设激光冲击喷丸工艺可以可重复地改变薄金属板零件中的残余应力状态，从而可以显着减少弯曲角度的分散。使用标称弯曲角度为 90° 的底部弯曲研究无涂层激光喷丸 (LPwC) 对弯曲角度的影响",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.2351/7.0000468"
  },
  {
    "id": "p-004",
    "title": "A novel laser shock post-processing technique on the laser-induced damage resistance of 1ω HfO<sub>2</sub>/SiO<sub>2</sub> multilayer coatings",
    "titleCn": "一种新型激光冲击后处理技术研究1ω HfO<sub>2</sub>/SiO<sub>2</sub>多层涂层的激光损伤性能",
    "authors": "Tangyang Pu, Wenwen Liu, Yueliang Wang, Xiaoming Pan, Leiqing Chen et al.",
    "journal": "High Power Laser Science and Engineering",
    "sourceType": "SCI",
    "year": 2021,
    "month": 1,
    "innovationScore": 8,
    "field": "hybrid",
    "processType": "coating",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Abstract The laser shock processing implemented by a laser-induced high-pressure plasma which propagates into the sample as a shockwave is innovatively applied as a post-processing technique on HfO2/SiO2 multilayer coatings for the first time. The pure mechanical post-processing has provided evidence of a considerable promotion effect of the laser-induced damage threshold, which increased by a factor of about 4.6 with appropriate processing parameters. The promotion mechanism is confirmed to be ",
    "doi": "10.1017/hpl.2021.4",
    "innovationCn": "摘要：激光冲击加工是通过激光诱导高压等离子体以冲击波的形式传播到样品中，首次创新性地应用于 HfO2/SiO2 多层涂层的后加工技术。纯机械后处理证明了激光损伤阈值具有相当大的提升作用，在适当的加工参数下，激光损伤阈值提高了约4.6倍。根据实验，建立了一个相互作用方程",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 13,
    "link": "https://doi.org/10.1017/hpl.2021.4"
  },
  {
    "id": "p-005",
    "title": "Residual Stress, Phase, Microstructure and Mechanical Property Enhancement of Ultrafine Bainitic Steel through Laser Shock Processing",
    "titleCn": "激光冲击加工增强超细贝氏体钢的残余应力、相、显微组织和力学性能",
    "authors": "Prabhakaran Subramaniyan, Sivaperuman Kalainathan, Pratik Shukla, Vijay K Vasudevan",
    "journal": "MDPI AG",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 8,
    "field": "nano",
    "processType": "coating",
    "innovationTags": [
      "残余应力",
      "微观组织",
      "疲劳性能",
      "相变"
    ],
    "abstract": "The study proposes laser shock peening without a coating of high strength ultrafine bainitic steel to mitigating the fatigue failures for automotive and structural engineering applications. Laser pulse density of 2500 pulses/cm2 (75% overlapping) was optimised based on the induced residual stresses for employing the wide range of characterisations. The roughness and topographic results showed that surface roughening was controlled by tuning the laser pulse density. The High-Resolution X-ray Diff",
    "doi": "10.20944/preprints201804.0362.v1",
    "innovationCn": "该研究提出无需高强度超细贝氏体钢涂层的激光冲击喷丸，以减轻汽车和结构工程应用的疲劳失效。 2500 个脉冲/cm2（75% 重叠）的激光脉冲密度根据诱导残余应力进行了优化，以采用广泛的表征。粗糙度和形貌结果表明，表面粗糙度是通过调整激光脉冲密度来控制的。高分辨率 X 射线差分仪",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.20944/preprints201804.0362.v1"
  },
  {
    "id": "p-006",
    "title": "Laser Shock Peening, the Path to Production",
    "titleCn": "激光冲击强化，生产之路",
    "authors": "Allan H. Clauer",
    "journal": "Metals",
    "sourceType": "SCI",
    "year": 2019,
    "month": 5,
    "innovationScore": 8,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "This article describes the path to commercialization for laser shock peening beginning with the discovery of the basic phenomenology of the process through to its implementation as a commercial process. It describes the circumstances leading to its invention, the years spent on exploring and defining characteristics of the process, and the journey to commercialization. Like many budding technologies displaying unique characteristics, but no immediately evident application, i.e., “a solution look",
    "doi": "10.3390/met9060626",
    "innovationCn": "本文描述了激光冲击喷丸的商业化之路，从发现该过程的基本现象开始，一直到其作为商业过程的实施。就像许多新兴技术表现出独特的特征，但没有立即明显的应用，即“寻找问题的解决方案”一样，在一些情况下，其开发可能已被推迟或结束，除非发生意外事件使其得以向前发展。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 104,
    "link": "https://doi.org/10.3390/met9060626"
  },
  {
    "id": "p-007",
    "title": "Effects of confining layer and ablating layer on laser-induced shock wave characteristics during laser shock processing by PVDF gauge",
    "titleCn": "PVDF规激光冲击加工过程中限制层和烧蚀层对激光诱导冲击波特性的影响",
    "authors": "X F Nie, Y Y Tang, Y Li, L Yan, H N Wu",
    "journal": "Journal of Physics: Conference Series",
    "sourceType": "SCI",
    "year": 2021,
    "month": 7,
    "innovationScore": 8,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "约束层"
    ],
    "abstract": "Abstract The PVDF sensor is used to obtain the time variation curves of the shock wave pressure in the four states of the laser shock peening with or without confining layer and with or without ablating layer, the effects of confining layer and ablating layer on shock wave characteristics are analyzed. The results show that the confining layer limits the plasma expansion area, and the inverse bremsstrahlung absorption effect is enhanced, so that the peak pressure and pulse width of the shock wav",
    "doi": "10.1088/1742-6596/1980/1/012011",
    "innovationCn": "摘要 利用PVDF传感器获取激光冲击喷丸有无限制层、有无烧蚀层四种状态下冲击波压力随时间的变化曲线，分析了限制层和烧蚀层对冲击波特性的影响。结果表明，限域层限制了等离子体扩展区域，增强了逆韧致辐射吸收效应，使得冲击波的峰值压力和脉冲宽度减小。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1088/1742-6596/1980/1/012011"
  },
  {
    "id": "p-008",
    "title": "Enhancing the Frictional Behaviour of H-BN Reinforced Nanocomposites Through Laser Shock Peening",
    "titleCn": "通过激光冲击强化增强 H-BN 增强纳米复合材料的摩擦行为",
    "authors": "J. Joel, M. Anthony Xavior",
    "journal": "Volume 12: Advanced Materials: Design, Processing, Characterization, and Applications",
    "sourceType": "核心",
    "year": 2019,
    "month": 11,
    "innovationScore": 8,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "Abstract In this research work, LM6 Aluminum alloy based metal matrix composites reinforced with varying amounts (0.2, 0.4, 0.6 and 0.8 wt%) of boron nitride (BN) having 10 to 30 nanometers average size were developed by using powder metallurgy and squeeze casting routes. The mechanical and tribological properties are analyzed for the samples developed through the two different routes and the influence of the process on the properties is discussed. Thus developed nano composite is studied for th",
    "doi": "10.1115/imece2019-10162",
    "innovationCn": "摘要：在这项研究工作中，采用粉末冶金和挤压铸造工艺开发了平均尺寸为 10 至 30 纳米的不同含量（0.2、0.4、0.6 和 0.8 wt%）氮化硼（BN）增强的 LM6 铝合金基金属基复合材料。此外，已经确定，与挤压铸造相比，粉末冶金路线在某些性能方面具有一些有利的结果。对由此制造的复合材料进行激光冲击强化处理",
    "innovationFormula": "激光冲击 = 耐磨性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1115/imece2019-10162"
  },
  {
    "id": "p-009",
    "title": "Effect of combined treatment of laser shock peening and shot peening on fatigue performance of laser-powder-bed-fusioned GH4169 nickel-based alloy",
    "titleCn": "激光冲击喷丸联合处理对激光粉床熔融GH4169镍基合金疲劳性能的影响",
    "authors": "Peixuan Ouyang, Zhichao Dong, Xuekun Luo, Shuting Zhang, Lu Liu et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2025,
    "month": 4,
    "innovationScore": 8,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "疲劳性能"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2024.112141",
    "innovationCn": "激光冲击喷丸联合处理对激光粉床熔融GH4169镍基合金疲劳性能的影响。本文采用激光冲击的方法，旨在实现疲劳寿命提升。研究聚焦于激光冲击对疲劳寿命与磨损性能的改善。研究涉及疲劳性能等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 23,
    "link": "https://doi.org/10.1016/j.optlastec.2024.112141"
  },
  {
    "id": "p-010",
    "title": "A study on the effects of laser shock peening on the microstructure and substructure of Ti–6Al–4V manufactured by Selective Laser Melting",
    "titleCn": "激光冲击强化对选区激光熔化Ti-6Al-4V显微组织和亚结构影响的研究",
    "authors": "J.R.O. Leo, S. Zabeen, M.E. Fitzpatrick, J. Zou, M.M. Attallah",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2023,
    "month": 7,
    "innovationScore": 8,
    "field": "micro",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "微观组织"
    ],
    "abstract": "Ti‐6Al‐4V was fabricated by powder-bed fusion using different laser scanning strategies. The microstructure and deformation properties were investigated in the as-built condition, and also after the material had been subjected to a laser-shock-peening (LSP) treatment. The microstructure in each condition was surveyed using 3D optical microscopy, EBSD, and TEM. The post-manufacture residual stresses were determined. The results indicate a correlation between the residual stresses and the substruc",
    "doi": "10.1016/j.jmatprotec.2023.117959",
    "innovationCn": "Ti-6Al-4V 采用不同的激光扫描策略通过粉末床熔融制备。在竣工条件下以及材料经过激光冲击强化（LSP）处理后，研究了微观结构和变形特性。测定了制造后的残余应力。结果表明，残余应力与 TEM 中观察到的子结构之间存在相关性：观察到从表面到 1 mm 深度的残余拉应力",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 30,
    "link": "https://doi.org/10.1016/j.jmatprotec.2023.117959"
  },
  {
    "id": "p-011",
    "title": "Research status and development of laser shock peening",
    "titleCn": "激光冲击强化研究现状及进展",
    "authors": "Yujie Xu, Zhenying Du, Liang Ruan, Wenwu Zhang",
    "journal": "Journal of Laser Applications",
    "sourceType": "SCI",
    "year": 2016,
    "month": 5,
    "innovationScore": 8,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "Laser shock peening (LSP) is a noncontact surface strengthening technology. It has been widely used because of its advantages in applied scope and strengthening effects. LSP has made considerable progress during the past four decades, but some technical issues affecting their applications remain to be resolved, for instance, the utilization rate of laser shock energy is only about 50%, the processing adaptability of rigid confinement layer is poor, and the thickness of the flexible confinement l",
    "doi": "10.2351/1.4943999",
    "innovationCn": "激光冲击强化（LSP）是一种非接触式表面强化技术。 LSP在过去的四十年里取得了长足的进步，但一些影响其应用的技术问题仍有待解决，例如激光冲击能量的利用率仅为50%左右，刚性约束层的加工适应性较差，以水层为代表的柔性约束层的厚度难以控制等。初步模拟分析",
    "innovationFormula": "有限元模拟 + 激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 18,
    "link": "https://doi.org/10.2351/1.4943999"
  },
  {
    "id": "p-012",
    "title": "Improving Room Temperature-Stretch Formability of Magnesium Alloys by Laser Shock Peening",
    "titleCn": "通过激光冲击强化提高镁合金的室温拉伸成形性",
    "authors": "Bo Mao, Xing Zhang, Yiliang Liao, Bin Li",
    "journal": "Volume 2: Processes; Materials",
    "sourceType": "核心",
    "year": 2019,
    "month": 6,
    "innovationScore": 8,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "微观组织",
      "腐蚀性能",
      "疲劳性能"
    ],
    "abstract": "Abstract The applications of magnesium (Mg) and their alloys are often restricted by their poor formability at room temperature. Several strategies have been developed in recent years to enhance the formability of Mg alloys, such as grain refinement and texture weakening, either by alloying or processing. Laser shock peening (LSP) is an advanced laser-based surface processing method which has been utilized improve the surface hardness, fatigue performance, and corrosion resistance of Mg alloys. ",
    "doi": "10.1115/msec2019-2910",
    "innovationCn": "摘要 镁(Mg)及其合金的室温成型性较差，其应用往往受到限制。近年来，人们开发了多种策略来提高镁合金的成形性，例如通过合金化或加工来细化晶粒和弱化织构。激光冲击强化（LSP）是一种先进的基于激光的表面加工方法，可提高镁合金的表面硬度、疲劳性能和耐腐蚀性能。",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1115/msec2019-2910"
  },
  {
    "id": "p-013",
    "title": "Understanding the Laser-Matter Interaction and Plasma Dynamics in Nanosecond Pulsed Laser Shock Processing: A First Principle Study",
    "titleCn": "了解纳秒脉冲激光冲击处理中的激光与物质相互作用和等离子体动力学：第一原理研究",
    "authors": "Bo Mao, Yiliang Liao",
    "journal": "Volume 2: Processes; Materials",
    "sourceType": "核心",
    "year": 2019,
    "month": 6,
    "innovationScore": 8,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Abstract Laser-matter interaction and plasma dynamic during laser shock processing determine the key parameters such as laser shock wave pressure and evolution during laser shock processing (LSP) process. A first-principle based model is critically important for elucidating the underlying mechanism and process optimization of the LSP process. The current study focuses on developing a theoretical model for the fundamental understanding of laser-matter interaction and plasma dynamics. The key phys",
    "doi": "10.1115/msec2019-2848",
    "innovationCn": "摘要 激光冲击加工过程中激光与物质的相互作用和等离子体动力学决定了激光冲击加工（LSP）过程中激光冲击波压力和演化等关键参数。基于第一性原理的模型对于阐明 LSP 过程的基本机制和过程优化至关重要。目前的研究重点是开发一个理论模型，以从根本上理解激光与物质相互作用和等离子体动力学。关键物理",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1115/msec2019-2848"
  },
  {
    "id": "p-014",
    "title": "Effects of laser shock peening on microstructural evolution and wear property of laser hybrid remanufactured Ni25/Fe104 coating on H13 tool steel",
    "titleCn": "激光冲击喷丸对H13工具钢激光混合再制造Ni25/Fe104涂层组织演变及磨损性能的影响",
    "authors": "H.F. Lu, K.N. Xue, X. Xu, K.Y. Luo, F. Xing et al.",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2021,
    "month": 5,
    "innovationScore": 7,
    "field": "fatigue",
    "processType": "hybrid_am",
    "innovationTags": [
      "残余应力",
      "微观组织",
      "增材制造",
      "疲劳性能"
    ],
    "abstract": "Abstract H13 tool steel is often damaged by wear, erosion and thermal fatigue, and laser hybrid additive remanufacturing is an effective method to repair damaged locations to extend their service lives. In this study, the Fe-based layer with Ni-based transitional layer is fabricated in the surface layer of H13 tool steel by laser cladding (LC). Subsequently, massive laser shock peening treatment (MLSPT) is applied to improve the mechanical properties of the LCed coating. Meanwhile, the effects o",
    "doi": "10.1016/j.jmatprotec.2020.117016",
    "innovationCn": "摘要 H13工具钢经常因磨损、侵蚀和热疲劳而损坏，激光混合增材再制造是修复损坏部位、延长其使用寿命的有效方法。随后，采用大规模激光冲击喷丸处理（MLSPT）来提高 LCed 涂层的机械性能。同时系统研究了MLSPT对残余应力、显微硬度、显微组织和磨损性能的影响。结果表明，之后",
    "innovationFormula": "激光冲击 + 增材制造 = 残余应力调控",
    "subCategory": "",
    "citationCount": 88,
    "link": "https://doi.org/10.1016/j.jmatprotec.2020.117016"
  },
  {
    "id": "p-015",
    "title": "Laser Shock Peening-Induced Surface Gradient Stress Distribution and Extension Mechanism in Corrosion Fatigue Life of AISI 420 Stainless Steel",
    "titleCn": "AISI 420不锈钢激光冲击诱导表面梯度应力分布及腐蚀疲劳寿命延长机制",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 7,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "腐蚀性能",
      "疲劳性能",
      "不锈钢"
    ],
    "abstract": "Surface gradient stress distribution was prepared on AISI 420 martensitic stainless steel (MSS) by massive laser shock peening treatment (MLSPT) with different pulse energies, and effects of MLSPT on residual stress and corrosion fatigue properties in NaCl solutions...",
    "doi": "10.1007/978-981-97-8351-9_5",
    "innovationCn": "通过不同脉冲能量的大规模激光冲击喷丸处理（MLSPT）在AISI 420马氏体不锈钢（MSS）上制备表面梯度应力分布，并研究MLSPT对氯化钠溶液中残余应力和腐蚀疲劳性能的影响...",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_5"
  },
  {
    "id": "p-016",
    "title": "Effect of laser shock peening on mechanical and microstructural aspects of 6061-T6 aluminum alloy",
    "titleCn": "激光冲击强化对 6061-T6 铝合金力学和微观结构的影响",
    "authors": "Binod Dhakal, S. Swaroop",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 8,
    "innovationScore": 7,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "铝合金"
    ],
    "abstract": "Abstract Laser shock peening (LSP) of 6061-T6 aluminum alloy was performed and parametric effects post LSP on mechanical aspects and microstructural evolution are meticulously studied using various means of characterization techniques such as residual stress analysis, surface roughness, Vickers microhardness, tensile testing, X-ray diffraction (XRD) analysis, transmission electron microscopy (TEM) and electron back scattered diffraction (EBSD). Work hardened layer of ∼1500 μm depth is obtained w",
    "doi": "10.1016/j.jmatprotec.2020.116640",
    "innovationCn": "摘要：对 6061-T6 铝合金进行了激光冲击喷丸 (LSP)，并利用残余应力分析、表面粗糙度、维氏显微硬度、拉伸测试、X 射线衍射 (XRD) 分析、透射电子显微镜 (TEM) 和电子背散射衍射 (EBSD) 等各种表征技术手段，仔细研究了 LSP 后对机械方面和微观结构演变的参数影响。获得约 1500μm 深度的加工硬化层",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 137,
    "link": "https://doi.org/10.1016/j.jmatprotec.2020.116640"
  },
  {
    "id": "p-017",
    "title": "Microstructural Evolution of GH4169 Superalloy during Hybrid Repair via Laser Shock Peening and Laser Cladding",
    "titleCn": "GH4169 高温合金在激光冲击强化和激光熔覆混合修复过程中的微观结构演变",
    "authors": "Gangfeng Xiao, Ruhao He, Junhao Zhang, Sizhu Cheng, qinxiang xia",
    "journal": "Elsevier BV",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 7,
    "field": "micro",
    "processType": "hybrid_am",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "Laser cladding (LC) is an important way to fix important parts of an aero-engine; However, the heat-affected zone (HAZ) can often cause the local mechanical integrity to break down during the repair process. This work suggests laser shock peening (LSP) as a preliminary treatment method to exploit significant surface plastic deformation and gradient hardening effects. The results show that LSP pretreatment strengthens the substrate surface in a gradient way by using both grain refinement and disl",
    "doi": "10.2139/ssrn.6329525",
    "innovationCn": "激光熔覆（LC）是修复航空发动机重要部件的重要方法；然而，热影响区 (HAZ) 通常会在修复过程中导致局部机械完整性破坏。这项工作建议将激光冲击喷丸（LSP）作为一种初步处理方法，以利用显着的表面塑性变形和梯度硬化效应。结果表明，LSP预处理通过晶粒细化和disl以梯度方式强化基体表面。",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.6329525"
  },
  {
    "id": "p-018",
    "title": "Effect of multiple laser shock processing on nano-scale microstructure of an aluminum alloy",
    "titleCn": "多次激光冲击加工对铝合金纳米级显微组织的影响",
    "authors": "Simge GencalpIrizalp, Nursen Saklakoglu",
    "journal": "Characterization and Application of Nanomaterials",
    "sourceType": "SCI",
    "year": 2018,
    "month": 5,
    "innovationScore": 7,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "微观组织",
      "铝合金"
    ],
    "abstract": "In this study, nano-scale microstructural evolution in 6061-T6 alloy after laser shock processing (LSP) were studied. 6061-T6 alloy plate were subjected to multiple LSP. The LSP treated area was characterized by X-ray diffraction and the microstructure of the samples was analyzed by transmission electron microscopy. Focused Ion Beam (FIB) tools were used to prepare TEM samples in precise areas. It was found that even though aluminum had high stacking fault energy, LSP yielded to formation of ult",
    "doi": "10.24294/can.v0i0.716",
    "innovationCn": "在本研究中，研究了激光冲击加工 (LSP) 后 6061-T6 合金的纳米级微观结构演变。 LSP 处理区域通过 X 射线衍射进行表征，并通过透射电子显微镜分析样品的微观结构。研究发现，即使铝具有较高的堆垛层错能，LSP也会导致超细晶粒和位错单元、堆垛层错等变形缺陷的形成。变形引起的堆垛层错导致豌豆",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.24294/can.v0i0.716"
  },
  {
    "id": "p-019",
    "title": "Enhancement of compressive stresses by application of shaped temporal pulses in confinement layer free nanosecond laser shock peening",
    "titleCn": "在无约束层纳秒激光冲击喷丸中应用成形时间脉冲增强压应力",
    "authors": "Saumyabrata Banerjee, Jacob Spear",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2024,
    "month": 8,
    "innovationScore": 7,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "We report on enhancement of compressive stress observed both in tungsten as well as tungsten alloy when a shaped double pulse was utilized for confinement layer free nanosecond laser shock peening (CLF-ns-LSP) compared to a single pulse. A threefold enhancement of peak compressive stresses was observed in TAM7525 (tungsten-copper alloy) for shaped double pulses. Further, we investigate the effect of changes to the parameters of the double pulse to the induced compressive stresses. These experime",
    "doi": "10.1016/j.optlastec.2024.110790",
    "innovationCn": "我们报告了与单脉冲相比，当使用成形双脉冲进行无限制层纳秒激光冲击喷丸 (CLF-ns-LSP) 时，在钨和钨合金中观察到的压应力增强。对于成形双脉冲，在 TAM7525（钨铜合金）中观察到峰值压应力增加了三倍。此外，我们研究了双脉冲参数的变化对引起的压应力的影响。这些实验",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 5,
    "link": "https://doi.org/10.1016/j.optlastec.2024.110790"
  },
  {
    "id": "p-020",
    "title": "Effect of Peening Time on Mechanical Property of Magnesium Alloy Strengthened by Ultrasonic Shot Peening Combined with Laser Shock Peening",
    "titleCn": "喷丸时间对超声波喷丸联合激光冲击强化镁合金力学性能的影响",
    "authors": "Jiayang Gu, Shengyi Zhou, Shuaishuai Yu, Ruiqi Li",
    "journal": "Journal of Materials Engineering and Performance",
    "sourceType": "SCI",
    "year": 2026,
    "month": 6,
    "innovationScore": 7,
    "field": "micro",
    "processType": "general",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "This study systematically investigates the effect of peening time (30, 60, and 90&nbsp;s) on the surface integrity, microstructure, and tensile propert",
    "doi": "10.1007/s11665-026-14390-0",
    "innovationCn": "本研究系统地研究了喷丸时间（30、60 和 90 秒）对表面完整性、微观结构和拉伸性能的影响",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/s11665-026-14390-0"
  },
  {
    "id": "p-021",
    "title": "Carbide-mediated martensite nanostructuring enabling tribological performance improvement under laser shock peening",
    "titleCn": "碳化物介导的马氏体纳米结构可改善激光冲击喷丸下的摩擦学性能",
    "authors": "Yujie Ma, Hongwei Jiang, Haonan Zou, Shengchang Yan, Bin Shao et al.",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2026,
    "month": 8,
    "innovationScore": 7,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.jmatprotec.2026.119379",
    "innovationCn": "碳化物介导的马氏体纳米结构可改善激光冲击喷丸下的摩擦学性能。本文采用激光冲击的方法，旨在实现耐磨性提升。研究聚焦于纳米尺度激光冲击变形与超快激光加工。研究涉及激光冲击等关键内容，发表在Journal of Materials Processing Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 耐磨性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1016/j.jmatprotec.2026.119379"
  },
  {
    "id": "p-022",
    "title": "Laser shock peening: A promising tool for tailoring metallic microstructures in selective laser melting",
    "titleCn": "激光冲击强化：选择性激光熔化中定制金属微观结构的一种有前景的工具",
    "authors": "N. Kalentics, K. Huang, M. Ortega Varela de Seijas, A. Burn, V. Romano et al.",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2019,
    "month": 4,
    "innovationScore": 7,
    "field": "micro",
    "processType": "general",
    "innovationTags": [
      "微观组织",
      "不锈钢"
    ],
    "abstract": "Abstract Metallic parts made by Selective Laser Melting (SLM) are known for their heterogeneous microstructures in the as-built (AB) state. In this paper, Laser Shock Peening (LSP) was performed on a 316 L stainless steel part fabricated by SLM. The LSP treatment increases the stored energy in the material but does not lead to measurable grain refinement. When subsequently annealed, the LSP treated sample undergoes recrystallization and transforms into a refined equiaxed structure, while this tr",
    "doi": "10.1016/j.jmatprotec.2018.11.024",
    "innovationCn": "摘要 通过选择性激光熔化 (SLM) 制造的金属零件以其在竣工 (AB) 状态下的异质微观结构而闻名。本文对采用 SLM 制造的 316 L 不锈钢零件进行了激光冲击强化 (LSP)。 LSP 处理增加了材料中储存的能量，但不会导致可测量的晶粒细化。因此，LSP 策略为选择性 3D 控制 SLM 零件的微观结构和机械性能提供了新途径。",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 90,
    "link": "https://doi.org/10.1016/j.jmatprotec.2018.11.024"
  },
  {
    "id": "p-023",
    "title": "Microstructure evolution of laser cladded NiCrBSi coating assisted by an in-situ laser shock wave",
    "titleCn": "原位激光冲击波辅助激光熔覆 NiCrBSi 涂层的微观结构演化",
    "authors": "Haifeng Yang, Mingtian Shi, Enlan Zhao, Qingqing Wang, Hao Liu et al.",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2023,
    "month": 12,
    "innovationScore": 7,
    "field": "micro",
    "processType": "coating",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "",
    "doi": "10.1016/j.jmatprotec.2023.118132",
    "innovationCn": "原位激光冲击波辅助激光熔覆 NiCrBSi 涂层的微观结构演化。本文采用原位监测的方法，旨在实现微观组织优化。研究聚焦于激光冲击下微观组织演变、相变与纳米结构调控。研究涉及微观组织等关键内容，发表在Journal of Materials Processing Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "原位监测 = 微观组织优化",
    "subCategory": "",
    "citationCount": 44,
    "link": "https://doi.org/10.1016/j.jmatprotec.2023.118132"
  },
  {
    "id": "p-024",
    "title": "Microstructure evolution and property of high manganese steel coatings by laser shock assisted laser wire cladding",
    "titleCn": "激光冲击辅助激光熔覆高锰钢涂层的组织演变及性能",
    "authors": "Jiafu Pei, Haifeng Yang, Yibo He, Kai Chen, Hongtao Wang et al.",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2024,
    "month": 7,
    "innovationScore": 7,
    "field": "micro",
    "processType": "coating",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "",
    "doi": "10.1016/j.jmatprotec.2024.118413",
    "innovationCn": "激光冲击辅助激光熔覆高锰钢涂层的组织演变及性能。本文采用激光冲击的方法，旨在实现微观组织优化。研究聚焦于激光冲击下微观组织演变、相变与纳米结构调控。研究涉及微观组织等关键内容，发表在Journal of Materials Processing Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 31,
    "link": "https://doi.org/10.1016/j.jmatprotec.2024.118413"
  },
  {
    "id": "p-025",
    "title": "Comparison of warm laser shock peening and laser shock peening techniques in lengthening the fatigue life of welded joints made of aluminum alloy",
    "titleCn": "温激光冲击强化与激光冲击强化技术延长铝合金焊接接头疲劳寿命的比较",
    "authors": "Chun Su, Jianzhong Zhou, Xiankai Meng, Jie Sheng",
    "journal": "International Journal of Modern Physics B",
    "sourceType": "SCI",
    "year": 2017,
    "month": 7,
    "innovationScore": 7,
    "field": "fatigue",
    "processType": "warm",
    "innovationTags": [
      "残余应力",
      "微观组织",
      "疲劳性能",
      "铝合金",
      "温激光冲击"
    ],
    "abstract": "Welded joints made of 6061-T6 Al alloy were studied to evaluate warm laser shock peening (WLSP) and laser shock peening (LSP) processes. The estimation model of laser-induced surface residual stress was examined by means of experiments and numerical analysis. The high-cycle fatigue lives of welded joint specimens treated with WLSP and LSP were estimated by conducting tensile fatigue tests. The fatigue fracture mechanisms of these specimens are studied by surface integrity and fracture surface te",
    "doi": "10.1142/s0217979217440453",
    "innovationCn": "研究了由 6061-T6 铝合金制成的焊接接头，以评估温激光冲击强化 (WLSP) 和激光冲击强化 (LSP) 工艺。通过实验和数值分析的方法验证了激光诱导表面残余应力的估计模型。通过拉伸疲劳试验估算了经过 WLSP 和 LSP 处理的焊接接头样品的高周疲劳寿命。疲劳寿命的大幅增加似乎是残余应力更大、结构更均匀的结果。",
    "innovationFormula": "有限元模拟 + 激光冲击 + 温冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 4,
    "link": "https://doi.org/10.1142/s0217979217440453"
  },
  {
    "id": "p-026",
    "title": "Effects of Combined Shot Peening and Laser Shock Peening on the Fatigue Life of 7075 Aluminum Alloy",
    "titleCn": "喷丸与激光冲击强化联合对7075铝合金疲劳寿命的影响",
    "authors": "Ping Zhang, Yajie Sun, Xiujie Yue",
    "journal": "Journal of Materials Engineering and Performance",
    "sourceType": "SCI",
    "year": 2026,
    "month": 5,
    "innovationScore": 7,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "疲劳性能",
      "铝合金"
    ],
    "abstract": "In this study, a combined surface strengthening approach employing shot peening (SP) and laser shock peening (LSP) was applied to 7075 aluminum alloy. The",
    "doi": "10.1007/s11665-026-14075-8",
    "innovationCn": "在本研究中，采用喷丸强化 (SP) 和激光冲击强化 (LSP) 的组合表面强化方法应用于 7075 铝合金。",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/s11665-026-14075-8"
  },
  {
    "id": "p-027",
    "title": "The effect of abrasive water jet peening and laser shock peening on the wear properties of direct metal laser sintered AlSi10Mg alloy",
    "titleCn": "磨料水射流喷丸和激光冲击喷丸对直接金属激光烧结AlSi10Mg合金磨损性能的影响",
    "authors": "C.M. Jagadesh Kumar, A.R.G. Ganesh Karthik, S. Arulvel, R. Prayer Riju, Anna Burduk et al.",
    "journal": "Materials Letters",
    "sourceType": "SCI",
    "year": 2024,
    "month": 5,
    "innovationScore": 7,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.matlet.2024.136170",
    "innovationCn": "磨料水射流喷丸和激光冲击喷丸对直接金属激光烧结AlSi10Mg合金磨损性能的影响。本文采用激光冲击的方法，旨在实现耐磨性提升。研究聚焦于激光冲击对疲劳寿命与磨损性能的改善。研究涉及激光冲击等关键内容，发表在Materials Letters上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 耐磨性提升",
    "subCategory": "",
    "citationCount": 12,
    "link": "https://doi.org/10.1016/j.matlet.2024.136170"
  },
  {
    "id": "p-028",
    "title": "Effect of laser micromachining and laser shock peening on the performance of Inconel alloy parts for aerospace application",
    "titleCn": "激光微加工和激光冲击强化对航空航天用铬镍铁合金零件性能的影响",
    "authors": "B. Jagadeesh, Muthukannan Duraiselvam, Arijit Bera, Astha Arya",
    "journal": "Comprehensive Materials Processing",
    "sourceType": "核心",
    "year": 2024,
    "month": 1,
    "innovationScore": 7,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/b978-0-323-96020-5.00124-2",
    "innovationCn": "激光微加工和激光冲击强化对航空航天用铬镍铁合金零件性能的影响。本文采用激光冲击的方法，旨在实现性能提升。研究聚焦于激光冲击强化工艺参数优化与约束层创新。研究涉及激光冲击等关键内容，发表在Comprehensive Materials Processing上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1016/b978-0-323-96020-5.00124-2"
  },
  {
    "id": "p-029",
    "title": "Suspended Water Droplet Confined Laser Shock Processing at Elevated Temperatures",
    "titleCn": "高温下悬浮水滴受限激光冲击处理",
    "authors": "Jian Liu, Xiaohan Zhang, Yali He, Zhe Zhao, Min Xia et al.",
    "journal": "MDPI AG",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 7,
    "field": "fem",
    "processType": "general",
    "innovationTags": [
      "约束层"
    ],
    "abstract": "The temperature-assisted laser shock process has shown promising prospects in the fields of forming manufacturing and surface strengthening. However, large-scale application of this process is limited by the instability and failure of confinement medium at high temperatures (&amp;ge;300 ℃). Aiming at this problem, we propose a novel laser shock strategy based on Leidenfrost effect, where the suspended droplets are utilized as the confinement medium. According to the sequence of images acquired b",
    "doi": "10.20944/preprints202204.0018.v1",
    "innovationCn": "温度辅助激光冲击工艺在成形制造和表面强化领域显示出广阔的前景。结合液滴动力学和聚焦增强效应，建立了液滴约束下激光冲击压力的理论模型。结果表明，基于液滴的激光冲击工艺呈现出较好的成形效果。力学性能测试表明，该工艺可以获得力学性能的同步提高。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.20944/preprints202204.0018.v1"
  },
  {
    "id": "p-030",
    "title": "Investigation of microstructure and tribological property of Ti-6Al-4V alloy by laser shock peening processing",
    "titleCn": "激光冲击强化Ti-6Al-4V合金显微组织和摩擦学性能研究",
    "authors": "Cheng Gu, Zenghui Tian, Jian hua Zhao, Yajun Wang",
    "journal": "Research Square Platform LLC",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 6,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "微观组织",
      "钛合金"
    ],
    "abstract": "Abstract Laser shock peening (LSP) is a process to introduce compressive residual stresses for improved surface properties of materials. In this study, the effect of LSP on the microstructure and tribological property of Ti-6Al-4V alloy was investigated. The surface and cross-sectional microstructure of the samples show that the shape of the β phase changes from a long strip to a short bar and granular after the LSP treatment. With the increase of laser energy, the surface roughness decreases gr",
    "doi": "10.21203/rs.3.rs-2738156/v1",
    "innovationCn": "摘要 激光冲击强化（LSP）是一种引入残余压应力以改善材料表面性能的工艺。样品的表面和截面显微组织表明，LSP处理后β相形状由长条状转变为短条状和粒状。随着激光能量的增加，表面粗糙度逐渐减小，而表面显微硬度逐渐增大。激光能量越高，耐磨性越好。",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.21203/rs.3.rs-2738156/v1"
  },
  {
    "id": "w-001",
    "title": "Corrosion Behaviour of AISI 304 Stainless Steel Subjected to Massive Laser Shock Peening Impacts with Different Pulse Energies",
    "titleCn": "AISI 304 不锈钢在不同脉冲能量的大规模激光冲击喷丸冲击下的腐蚀行为",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 6,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能",
      "不锈钢"
    ],
    "abstract": "Effects of massive laser shock peening (LSP) impacts with different pulse energies on ultimate tensile strength (UTS), stress corrosion cracking (SCC) susceptibility, fracture appearance and electrochemical corrosion resistance of AISI 304 stainless steel were...",
    "doi": "10.1007/978-981-97-8351-9_2",
    "innovationCn": "不同脉冲能量的大规模激光冲击喷丸 (LSP) 冲击对 AISI 304 不锈钢的极限拉伸强度 (UTS)、应力腐蚀开裂 (SCC) 敏感性、断口形貌和耐电化学腐蚀性能的影响...",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_2"
  },
  {
    "id": "w-002",
    "title": "Effects of Coverage Layer on the Electrochemical Corrosion Behaviour of Mg–Al–Mn Alloy Subjected to Massive Laser Shock Peening Treatment",
    "titleCn": "覆盖层对大规模激光冲击强化Mg-Al-Mn合金电化学腐蚀行为的影响",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 6,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能"
    ],
    "abstract": "Effects of coverage layer on electrochemical corrosion behaviour and pitting morphologies of Mg-Al-Mn alloy subjected to massive laser shock peening (LSP) treatment were investigated by potentiodynamic polarisation test, electrochemical impedance spectroscopy (EIS),...",
    "doi": "10.1007/978-981-97-8351-9_3",
    "innovationCn": "采用动电位极化测试、电化学阻抗谱(EIS)等方法研究了覆盖层对大规模激光冲击喷丸(LSP)处理后的Mg-Al-Mn合金电化学腐蚀行为和点蚀形貌的影响。",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_3"
  },
  {
    "id": "w-003",
    "title": "Laser Shock Peening-Induced Carbide Evolution and Remarkable Improvement in Electrochemical and Long-Term Immersion Corrosion Resistance of 2Cr12NiMoWV Martensitic Stainless Steel",
    "titleCn": "激光冲击强化碳化物演化以及 2Cr12NiMoWV 马氏体不锈钢电化学和长期浸入腐蚀性能的显着改善",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 6,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能",
      "不锈钢"
    ],
    "abstract": "Influences of laser shock peening (LSP) with different coverage layers on the electrochemical and long-term immersion corrosion behaviors of 2Cr12NiMoWV martensitic stainless steel in 3.5 wt% NaCl solution were studied. Results suggested that LSP-induced corrosion...",
    "doi": "10.1007/978-981-97-8351-9_7",
    "innovationCn": "研究了不同覆盖层激光冲击喷丸(LSP)对2Cr12NiMoWV马氏体不锈钢在3.5 wt% NaCl溶液中电化学和长期浸泡腐蚀行为的影响。结果表明 LSP 引起的腐蚀...",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_7"
  },
  {
    "id": "w-004",
    "title": "Improvement Mechanism in Stress Corrosion Resistance of the X70 Pipeline Steel in Hydrogen Sulfide Solution by Massive Laser Shock Peening Treatment",
    "titleCn": "大规模激光冲击喷丸处理X70管线钢在硫化氢溶液中抗应力腐蚀性能的改善机制",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 6,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "腐蚀性能"
    ],
    "abstract": "The effects of massive laser shock peening treatment (MLSPT) on the microstructural evolution and stress corrosion behavior of the X70 pipeline steel in hydrogen sulfide solutions with different concentrations were investigated by residual stress measurement,...",
    "doi": "10.1007/978-981-97-8351-9_6",
    "innovationCn": "通过残余应力测量，研究了大规模激光冲击喷丸处理（MLSPT）对X70管线钢在不同浓度硫化氢溶液中显微组织演变和应力腐蚀行为的影响。",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_6"
  },
  {
    "id": "w-005",
    "title": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "titleCn": "激光冲击强化金属材料的耐蚀行为",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Springer Nature Singapore",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 6,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能"
    ],
    "abstract": "This book introduces the fundamentals of laser shock peening (LSP) and its effects on the corrosion behaviours of metal alloy materials",
    "doi": "10.1007/978-981-97-8351-9",
    "innovationCn": "本书介绍了激光冲击强化（LSP）的基本原理及其对金属合金材料腐蚀行为的影响",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9"
  },
  {
    "id": "w-006",
    "title": "[INVITED] A review: Warm laser shock peening and related laser processing technique",
    "titleCn": "[邀请]综述：温激光冲击强化及相关激光加工技术",
    "authors": "Yiliang Liao, Chang Ye, Gary J. Cheng",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2016,
    "month": 4,
    "innovationScore": 6,
    "field": "process",
    "processType": "warm",
    "innovationTags": [
      "温激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2015.09.014",
    "innovationCn": "[邀请]综述：温激光冲击强化及相关激光加工技术。本文采用激光冲击 + 温冲击的方法，旨在实现性能提升。研究聚焦于激光冲击强化工艺参数优化与约束层创新。研究涉及温激光冲击等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 + 温冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 122,
    "link": "https://doi.org/10.1016/j.optlastec.2015.09.014"
  },
  {
    "id": "w-007",
    "title": "Enhancement of surface characteristics of additively manufactured γ-TiAl and IN939 alloys after laser shock processing",
    "titleCn": "激光冲击加工后增材制造的 γ-TiAl 和 IN939 合金表面特性的增强",
    "authors": "Mahmut Ozer, Oguzhan Yilmaz, Levent Subasi, Aydemir Gunaydin, Guney Mert Bilgin et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2024,
    "month": 3,
    "innovationScore": 6,
    "field": "hybrid",
    "processType": "hybrid_am",
    "innovationTags": [
      "增材制造"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2023.110330",
    "innovationCn": "激光冲击加工后增材制造的 γ-TiAl 和 IN939 合金表面特性的增强。本文采用激光冲击 + 增材制造的方法，旨在实现性能提升。研究聚焦于复合/特种激光冲击新工艺与多能场耦合。研究涉及增材制造等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 + 增材制造 = 性能提升",
    "subCategory": "",
    "citationCount": 15,
    "link": "https://doi.org/10.1016/j.optlastec.2023.110330"
  },
  {
    "id": "w-008",
    "title": "Implementation of the Almen intensity for the characterization of laser shock peening",
    "titleCn": "实施阿尔门强度来表征激光冲击喷丸",
    "authors": "Boutaina Elkhalki, Maxime Guerbois, Uroš Trdan, Laurent Berthe",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2024,
    "month": 8,
    "innovationScore": 6,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2024.110724",
    "innovationCn": "实施阿尔门强度来表征激光冲击喷丸。本文采用激光冲击的方法，旨在实现性能提升。研究聚焦于激光冲击强化工艺参数优化与约束层创新。研究涉及激光冲击等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1016/j.optlastec.2024.110724"
  },
  {
    "id": "w-009",
    "title": "Laser Shock Peening to Improve Performance of Metallic Ship Components",
    "titleCn": "激光冲击强化提高金属船舶部件的性能",
    "authors": "Robert Medve, Daniel Georgiadis, David Rice, Stan Bovid, David Lahrman",
    "journal": "SNAME Maritime Convention",
    "sourceType": "核心",
    "year": 2022,
    "month": 9,
    "innovationScore": 6,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能",
      "疲劳性能"
    ],
    "abstract": "Hepburn and Sons LLC teamed with LSP Technologies Inc. has introduced Laser Shock Peening (LSP) to the U.S. Navy and its public and private shipyards over the last seven years. Through multiple Navy sponsored programs, our team has measured the many benefits of using LSP in the maritime industry including mitigating stress corrosion cracking, increasing fatigue life, arresting crack initiation and growth, reducing cavitation erosion and exfoliation corrosion, and enabling the ability to form com",
    "doi": "10.5957/smc-2022-054",
    "innovationCn": "Hepburn and Sons LLC 与 LSP Technologies Inc. 合作，将激光冲击喷丸 (LSP) 引入美国。通过多个海军资助的项目，我们的团队已经衡量了在海事行业中使用 LSP 的诸多好处，包括减轻应力腐蚀裂纹、延长疲劳寿命、阻止裂纹萌生和扩展、减少空蚀和剥落腐蚀，以及能够在最大限度地减少热量的同时形成复杂的几何形状。这项研究的结果是，",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.5957/smc-2022-054"
  },
  {
    "id": "w-011",
    "title": "Tailoring of residual stresses by specific use of defined prestress during laser shock peening",
    "titleCn": "在激光冲击喷丸过程中通过特定使用定义的预应力来调整残余应力",
    "authors": "Karl-Christian Schwab, Sören Keller, Nikolai Kashaev, Benjamin Klusemann",
    "journal": "Journal of Materials Processing Technology",
    "sourceType": "SCI",
    "year": 2021,
    "month": 9,
    "innovationScore": 6,
    "field": "fem",
    "processType": "general",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "The aim of the present study is to tailor laser shock peening-induced residual stresses by applying defined prestress. For this purpose, elastic prestress is introduced during laser shock peening application and subsequently released. The influence of prestress on the resulting residual stresses is investigated experimentally by a four-point bending device that allows prestressing of the specimen during laser shock peening. Furthermore, a semi-analytical model of laser shock peening, extended by",
    "doi": "10.1016/j.jmatprotec.2021.117154",
    "innovationCn": "本研究的目的是通过施加定义的预应力来定制激光冲击强化引起的残余应力。通过四点弯曲装置对预应力对残余应力的影响进行了实验研究，该装置允许在激光冲击喷丸过程中对样品施加预应力。此外，激光冲击喷丸的半解析模型通过考虑预应力的贡献进行扩展，用于确定预应力与残余应力的关系。阿林",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 25,
    "link": "https://doi.org/10.1016/j.jmatprotec.2021.117154"
  },
  {
    "id": "w-012",
    "title": "Relationship between surface residual stress and dislocation configuration after laser shock processing of TC4 titanium alloy",
    "titleCn": "TC4钛合金激光冲击加工后表面残余应力与位错排列的关系",
    "authors": "Ge Liangchen, Chen Haotian, Tian Zongjun, Xu Boyuan",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2023,
    "month": 1,
    "innovationScore": 6,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2022.108702",
    "innovationCn": "TC4钛合金激光冲击加工后表面残余应力与位错排列的关系。本文采用激光冲击的方法，旨在实现残余应力调控。研究聚焦于激光冲击诱导的残余应力分布与塑性变形行为。研究涉及残余应力等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 10,
    "link": "https://doi.org/10.1016/j.optlastec.2022.108702"
  },
  {
    "id": "w-013",
    "title": "Twinning Behavior in Magnesium Alloys Processed by Laser Shock Peening",
    "titleCn": "激光冲击强化镁合金的孪生行为",
    "authors": "Bo Mao, Yiliang Liao, Bin Li",
    "journal": "Volume 2: Processes; Materials",
    "sourceType": "核心",
    "year": 2019,
    "month": 6,
    "innovationScore": 6,
    "field": "micro",
    "processType": "general",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "Abstract In this paper, the surface microstructure evolution of an AZ31B magnesium (Mg) alloy during laser shock peening (LSP) was investigated. Particular attention was paid to the deformation twinning behavior, which plays an important role in the mechanical properties of Mg alloys. The effect of laser intensity on the twinning distribution was investigated. Twin-twin interactions during LSP process were characterized. The mechanism responsible for the formation of gradient twinning microstruc",
    "doi": "10.1115/msec2019-2850",
    "innovationCn": "摘要 本文研究了 AZ31B 镁 (Mg) 合金在激光冲击喷丸 (LSP) 过程中的表面微观结构演变。特别关注变形孪晶行为，它对镁合金的机械性能起着重要作用。研究了激光强度对孪晶分布的影响。讨论了梯度孪晶微观结构的形成机制和孪晶诱导硬化效应。",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1115/msec2019-2850"
  },
  {
    "id": "w-015",
    "title": "Recent development and future perspectives of low energy laser shock peening",
    "titleCn": "低能激光冲击强化的最新进展及未来展望",
    "authors": "S. Kalainathan, S. Prabhakaran",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2016,
    "month": 7,
    "innovationScore": 6,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2016.02.007",
    "innovationCn": "低能激光冲击强化的最新进展及未来展望。本文采用激光冲击的方法，旨在实现性能提升。研究聚焦于激光冲击强化工艺参数优化与约束层创新。研究涉及激光冲击等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 97,
    "link": "https://doi.org/10.1016/j.optlastec.2016.02.007"
  },
  {
    "id": "w-016",
    "title": "Investigation into the effects of laser shock peening as a post treatment to laser impact welding",
    "titleCn": "研究激光冲击喷丸作为激光冲击焊接后处理的效果",
    "authors": "Sepehr Sadeh, Arif Malik",
    "journal": "Materials &amp; Design",
    "sourceType": "SCI",
    "year": 2021,
    "month": 7,
    "innovationScore": 6,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "In this work, laser shock peening (or simply laser peening) is investigated for the first time as a post welding treatment for dissimilar foils joined via the fully-mechanical, high-velocity laser impact welding technique. Single and double laser peening shots were applied to laser-impact-welded foils using three different metallic material combinations. Subsequent lap shear testing showed that single-shot laser peening increased the average weld strength by 12% to 25%, depending on the flyer an",
    "doi": "10.1016/j.matdes.2021.109701",
    "innovationCn": "在这项工作中，首次研究了激光冲击喷丸（或简称激光喷丸）作为通过全机械高速激光冲击焊接技术连接的异种箔的焊后处理。使用三种不同的金属材料组合对激光冲击焊接箔进行单次和双次激光喷丸处理。随后的搭接剪切测试表明，单次激光喷丸将平均焊接强度提高了 12% 至 25%，具体取决于传单和",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 31,
    "link": "https://doi.org/10.1016/j.matdes.2021.109701"
  },
  {
    "id": "w-017",
    "title": "Laser Shock Peening",
    "titleCn": "激光冲击强化",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Springer Nature Singapore",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 6,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "This book highlights fundamentals and progresses in research and applications of laser shock peening and introduces lasers, equipment, and techniques",
    "doi": "10.1007/978-981-99-1117-2",
    "innovationCn": "本书重点介绍了激光冲击强化的研究和应用的基础知识和进展，并介绍了激光器、设备和技术",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.1007/978-981-99-1117-2"
  },
  {
    "id": "w-018",
    "title": "Laser shock peening operation in aeroengine components",
    "titleCn": "航空发动机部件的激光冲击强化操作",
    "authors": "Jinlei Dong, Xianqian Wu, Chenguang Huang",
    "journal": "Modern Manufacturing Processes for Aircraft Materials",
    "sourceType": "核心",
    "year": 2024,
    "month": 1,
    "innovationScore": 6,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/b978-0-323-95318-4.00010-0",
    "innovationCn": "航空发动机部件的激光冲击强化操作。本文采用激光冲击的方法，旨在实现性能提升。研究聚焦于激光冲击强化工艺参数优化与约束层创新。研究涉及激光冲击等关键内容，发表在Modern Manufacturing Processes for Aircraft Materials上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1016/b978-0-323-95318-4.00010-0"
  },
  {
    "id": "w-019",
    "title": "Artificial neural network approach for mechanical properties prediction of TC4 titanium alloy treated by laser shock processing",
    "titleCn": "人工神经网络方法预测TC4钛合金激光冲击加工力学性能",
    "authors": "Jiajun Wu, Zheng Huang, Hongchao Qiao, Yongjie Zhao, Jingfeng Li et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2021,
    "month": 11,
    "innovationScore": 5,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2021.107385",
    "innovationCn": "人工神经网络方法预测TC4钛合金激光冲击加工力学性能。本文采用激光冲击的方法，旨在实现性能提升。研究聚焦于激光冲击强化工艺参数优化与约束层创新。研究涉及激光冲击等关键内容，发表在Optics &amp; Laser Technology上，为激光冲击强化领域的工艺优化和性能提升提供了重要参考。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 35,
    "link": "https://doi.org/10.1016/j.optlastec.2021.107385"
  }
];
