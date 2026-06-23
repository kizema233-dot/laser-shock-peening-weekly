/**
 * 激光冲击领域论文数据库
 * 数据来源：arXiv + Crossref
 * 检索日期：2026-06-22
 * 覆盖 SCI / 核心 / 预印本 多源文献
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
    "title": "Numerical Study on Laser Shock Peening of Pure Al Correlating with Laser Shock Wave",
    "titleCn": "与激光冲击波相关的纯铝激光冲击喷丸数值研究",
    "authors": "Mingxiao Wang, Cheng Wang, Xinrong Tao, Yuhao Zhou",
    "journal": "Materials",
    "sourceType": "SCI",
    "year": 2022,
    "month": 10,
    "innovationScore": 9,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "残余应力",
      "微观组织"
    ],
    "abstract": "Laser shock peening (LSP) is an innovative and promising surface strengthening technique of metallic materials. The LSP-induced plastic deformation, the compressive residual stresses and the microstructure evolution are essentially attributed to the laser plasma-induced shock wave. A three-dimensional finite element model in conjunction with the dislocation density-based constitutive model was developed to simulate the LSP of pure Al correlating with the LSP-induced shock wave, and the predicted",
    "doi": "10.3390/ma15207051",
    "innovationCn": "激光冲击强化（LSP）是一种创新且有前景的金属材料表面强化技术。 LSP 引起的塑性变形、残余压应力和微观结构演化本质上归因于激光等离子体引起的冲击波。开发了一个与基于位错密度的本构模型相结合的三维有限元模型来模拟与 LSP 引起的冲击波相关的纯 Al 的 LSP，并预测了",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 14,
    "link": "https://doi.org/10.3390/ma15207051"
  },
  {
    "id": "p-002",
    "title": "Ultrafast Laser Shock Straining in Chiral Chain 2D Materials: Mold Topology-Controlled Anisotropic Deformation",
    "titleCn": "手性链二维材料中的超快激光冲击应变：模具拓扑控制的各向异性变形",
    "authors": "Xingtao Liu, Danilo de Camargo Branco, Licong An, Mingyi Wang, Haoqing Jiang et al.",
    "journal": "Nano-Micro Letters",
    "sourceType": "SCI",
    "year": 2026,
    "month": 12,
    "innovationScore": 8,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Abstract Tellurene, a chiral chain semiconductor with a narrow bandgap and exceptional strain sensitivity, emerges as a pivotal material for tailoring electronic and optoelectronic properties via strain engineering. This study elucidates the fundamental mechanisms of ultrafast laser shock imprinting (LSI) in two-dimensional tellurium (Te), establishing a direct relationship between strain field orientation, mold topology, and anisotropic structural evolution. This is the first demonstration of u",
    "doi": "10.1007/s40820-025-01925-8",
    "innovationCn": "摘要 碲烯是一种具有窄带隙和卓越应变敏感性的手性链半导体，成为通过应变工程定制电子和光电特性的关键材料。相比之下，横向应变驱动剪切介导的多模态变形——拉伸、压缩和弯曲——导致显着的晶格畸变和电子特性调制。我们发现模具拓扑对变形的关键作用：锋利的格栅",
    "innovationFormula": "超快激光 + 纳米材料 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/s40820-025-01925-8"
  },
  {
    "id": "p-003",
    "title": "Carbide-facilitated nanocrystallization of martensitic laths and carbide deformation in AISI 420 stainless steel during laser shock peening",
    "titleCn": "激光冲击强化过程中​​ AISI 420 不锈钢马氏体板条的碳化物促进纳米晶化和碳化物变形",
    "authors": "Changyu Wang, Kaiyu Luo, Jian Wang, Jinzhong Lu",
    "journal": "International Journal of Plasticity",
    "sourceType": "SCI",
    "year": 2022,
    "month": 3,
    "innovationScore": 8,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "纳米结构",
      "不锈钢"
    ],
    "abstract": "",
    "doi": "10.1016/j.ijplas.2021.103191",
    "innovationCn": "激光冲击强化过程中​​ AISI 420 不锈钢马氏体板条的碳化物促进纳米晶化和碳化物变形。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 173,
    "link": "https://doi.org/10.1016/j.ijplas.2021.103191"
  },
  {
    "id": "p-004",
    "title": "Investigation on the deformation progress and residual stress of Ti-6Al-4V alloy during laser shock peening",
    "titleCn": "Ti-6Al-4V合金激光冲击喷丸变形过程及残余应力研究",
    "authors": "Zhenhua Zhang, Xuesong Fu, Ziwen Cao, Wenlong Zhou",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2024,
    "month": 7,
    "innovationScore": 8,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "钛合金"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2024.110643",
    "innovationCn": "Ti-6Al-4V合金激光冲击喷丸变形过程及残余应力研究。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 21,
    "link": "https://doi.org/10.1016/j.optlastec.2024.110643"
  },
  {
    "id": "p-005",
    "title": "Deformation-induced phase transition and nanotwins in SS 304 steel during cryogenic laser shock peening without coating",
    "titleCn": "SS 304 钢在无涂层低温激光冲击喷丸过程中变形引起的相变和纳米孪晶",
    "authors": "M.V. Nataraj, S. Swaroop",
    "journal": "Journal of Materials Research and Technology",
    "sourceType": "SCI",
    "year": 2022,
    "month": 7,
    "innovationScore": 7,
    "field": "nano",
    "processType": "cryogenic",
    "innovationTags": [
      "残余应力",
      "纳米结构",
      "相变",
      "不锈钢",
      "深冷激光冲击"
    ],
    "abstract": "The influence of Laser shock peening without coating at a cryogenic temperature (CLPwC) on SS 304 alloy was investigated. Three different laser energies, such as 150 mJ, 300 mJ, and 450 mJ were chosen to investigate the effects of CLPwC in SS 304 steel. The impact of CLPwC on the residual stress, surface roughness, hardness, phase transformation and microstructural changes was studied. The XRD studies show the peak broadening and strain-induced martensite (γ→α′) of 36.3% after CLPwC at 9 GW cm−2",
    "doi": "10.1016/j.jmrt.2022.06.005",
    "innovationCn": "研究了低温无涂层激光冲击喷丸 (CLPwC) 对 SS 304 合金的影响。研究了CLPwC对残余应力、表面粗糙度、硬度、相变和微观结构变化的影响。低温下残余压应力的松弛现象明显，在距离表面50 μm处获得了-138 MPa的最大压应力。 TEM 研究揭示了形变孪晶（宽度为 6-70 nm），",
    "innovationFormula": "激光冲击 + 深冷处理 = 残余应力调控",
    "subCategory": "",
    "citationCount": 38,
    "link": "https://doi.org/10.1016/j.jmrt.2022.06.005"
  },
  {
    "id": "p-006",
    "title": "Dynamic modeling of the interfacial bonding strength of CFRP composites detected by laser shockwave",
    "titleCn": "激光冲击波检测CFRP复合材料界面结合强度的动态建模",
    "authors": "Hebin Wu, Mengyu Cao, Fuxaing Liu, Zhang Chong, Yongkang Zhang",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2025,
    "month": 4,
    "innovationScore": 7,
    "field": "fem",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2024.112184",
    "innovationCn": "激光冲击波检测CFRP复合材料界面结合强度的动态建模。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 7,
    "link": "https://doi.org/10.1016/j.optlastec.2024.112184"
  },
  {
    "id": "p-007",
    "title": "Influence of plastic deformation and rolling contact fatigue resistance on 25CrNi2MoV steel under laser shock peening",
    "titleCn": "激光冲击喷丸对25CrNi2MoV钢塑性变形和滚动接触疲劳性能的影响",
    "authors": "Yi Hou, Xiaoqiang Dou, Weihua Song, Pengfei Sun, Xiaoqiang Li et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2026,
    "month": 1,
    "innovationScore": 7,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "疲劳性能"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2025.114234",
    "innovationCn": "激光冲击喷丸对25CrNi2MoV钢塑性变形和滚动接触疲劳性能的影响。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1016/j.optlastec.2025.114234"
  },
  {
    "id": "p-008",
    "title": "Molecular dynamics simulation study on microscopic plastic deformation behavior of FCC AlCuMg alloy under laser shock peening",
    "titleCn": "激光冲击强化FCC AlCuMg合金微观塑性变形行为的分子动力学模拟研究",
    "authors": "H.T. Yang, W.N. Lu, J. Li",
    "journal": "Vacuum",
    "sourceType": "SCI",
    "year": 2025,
    "month": 12,
    "innovationScore": 7,
    "field": "nano",
    "processType": "simulation",
    "innovationTags": [
      "分子动力学",
      "有限元模拟"
    ],
    "abstract": "",
    "doi": "10.1016/j.vacuum.2025.114737",
    "innovationCn": "激光冲击强化FCC AlCuMg合金微观塑性变形行为的分子动力学模拟研究。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "分子动力学 + 有限元模拟 + 激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.1016/j.vacuum.2025.114737"
  },
  {
    "id": "p-009",
    "title": "Molecular dynamics for laser shock peening in the γ/α2 interface of lamellar TiAl alloy: the effect of shock velocity in plastic deformation",
    "titleCn": "层状 TiAl 合金 γ/α2 界面激光冲击喷丸的分子动力学：冲击速度对塑性变形的影响",
    "authors": "Wenzheng Lin, Hanjie Hu, Baocheng Zhou, Han Zhang, Shangyun Luo",
    "journal": "Applied Physics A",
    "sourceType": "SCI",
    "year": 2024,
    "month": 10,
    "innovationScore": 7,
    "field": "nano",
    "processType": "simulation",
    "innovationTags": [
      "分子动力学"
    ],
    "abstract": "",
    "doi": "10.1007/s00339-024-07780-5",
    "innovationCn": "层状 TiAl 合金 γ/α2 界面激光冲击喷丸的分子动力学：冲击速度对塑性变形的影响。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "分子动力学 + 激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1007/s00339-024-07780-5"
  },
  {
    "id": "p-010",
    "title": "Numerical Simulation of Surface Residual Stress and Deformation of FGH95 Alloy Under Multiple Laser Shock Peening with Square Spots",
    "titleCn": "FGH95合金方斑多次激光冲击喷丸表面残余应力与变形的数值模拟",
    "authors": "Bing Liu, YaFeng Liu, Ran Zhu",
    "journal": "Lecture Notes in Electrical Engineering",
    "sourceType": "核心",
    "year": 2024,
    "month": 1,
    "innovationScore": 6,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "残余应力"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-97-0665-5_57",
    "innovationCn": "FGH95合金方斑多次激光冲击喷丸表面残余应力与变形的数值模拟。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-0665-5_57"
  },
  {
    "id": "p-011",
    "title": "Acoustic Signature Measurement to Identify Laser-Induced Breakdown in Water during Laser Shock Peening",
    "titleCn": "声学特征测量可识别激光冲击喷丸过程中激光引起的水中击穿",
    "authors": "",
    "journal": "Journal of Laser Micro/Nanoengineering",
    "sourceType": "SCI",
    "year": 2025,
    "month": 8,
    "innovationScore": 6,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "A prevalent non-destructive evaluation method for identifying and analyzing the acoustic waves produced by material deformation and damage is acoustic emission monitoring.In this work, laser shock peening was used in conjunction with acoustic emission monitoring.To determine the acoustic event of laser-induced breakdown in water, the acoustic signals were analyzed.To attain the required compressive residual stresses and prevent undesirable damage, the acoustic emission signals can also be utiliz",
    "doi": "10.2961/jlmn.2025.02.2007",
    "innovationCn": "用于识别和分析材料变形和损伤产生的声波的一种流行的无损评估方法是声发射监测。在这项工作中，激光冲击喷丸与声发射监测结合使用。为了确定水中激光诱导击穿的声学事件，对声信号进行了分析。为了获得所需的压缩残余应力并防止不良损坏，还可以利用声发射信号",
    "innovationFormula": "激光冲击 + 原位监测 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2961/jlmn.2025.02.2007"
  },
  {
    "id": "p-012",
    "title": "Analytical Determination of Microdimple Depth and Surface Deformation under Laser Shock Processing of Visco-Elasto-Plastic Materials",
    "titleCn": "粘弹塑性材料激光冲击加工下微凹坑深度和表面变形的分析测定",
    "authors": "G. Zh. Sakhvadze",
    "journal": "Journal of Machinery Manufacture and Reliability",
    "sourceType": "SCI",
    "year": 2025,
    "month": 12,
    "innovationScore": 6,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "残余应力",
      "疲劳性能"
    ],
    "abstract": "Abstract Laser shock processing is an advanced modern technology for hardening the surfaces of metallic materials, using laser shock waves to produce strong plastic deformation, significant compressive residual stresses, and refinement of grains. These factors together increase the fatigue and strength characteristics of materials. In this paper, I derive an equation for the residual strain induced by laser shock processing technology in viscoelastoplastic materials. Particular attention is paid",
    "doi": "10.1134/s1052618825701432",
    "innovationCn": "摘要 激光冲击加工是一种先进的现代金属材料表面硬化技术，利用激光冲击波产生强烈的塑性变形、显着的残余压应力和细化晶粒。在本文中，我推导了激光冲击加工技术在粘弹塑性材料中引起的残余应变的方程。特别注意激光冲击波引起的表面微凹痕的形成，以及 ap",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1134/s1052618825701432"
  },
  {
    "id": "p-013",
    "title": "Deformation behaviour, microstructural evolution and mechanical property of the shaped parts fabricated by laser shock forming with different laser energy",
    "titleCn": "不同激光能量激光冲击成形成形件的变形行为、微观结构演变及力学性能",
    "authors": "Yan Zhang, Xingquan Zhang, Kankan Ji, Junsheng Qin, Lisheng Zuo et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2025,
    "month": 11,
    "innovationScore": 6,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2025.113172",
    "innovationCn": "不同激光能量激光冲击成形成形件的变形行为、微观结构演变及力学性能。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1016/j.optlastec.2025.113172"
  },
  {
    "id": "p-014",
    "title": "Mechanical properties and deformation dependent microstructural aspects of laser shock peened 7075-T6 aluminum alloy without coating",
    "titleCn": "无涂层激光冲击喷丸 7075-T6 铝合金的机械性能和变形相关的微观结构",
    "authors": "Binod Dhakal, S. Swaroop",
    "journal": "Materials Characterization",
    "sourceType": "SCI",
    "year": 2022,
    "month": 1,
    "innovationScore": 6,
    "field": "stress",
    "processType": "coating",
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "",
    "doi": "10.1016/j.matchar.2021.111620",
    "innovationCn": "无涂层激光冲击喷丸 7075-T6 铝合金的机械性能和变形相关的微观结构。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 40,
    "link": "https://doi.org/10.1016/j.matchar.2021.111620"
  },
  {
    "id": "p-015",
    "title": "Finite element analysis of laser shock peening induced near-surface deformation in engineering metals",
    "titleCn": "工程金属激光冲击强化近表面变形的有限元分析",
    "authors": "Wangfan Zhou, Xudong Ren, Yu Yang, Zhaopeng Tong, Enoch Asuako Larson",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2019,
    "month": 11,
    "innovationScore": 6,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "残余应力"
    ],
    "abstract": "Abstract This paper investigates near-surface residual stress and equivalent plastic strain distributions using finite element method for further understanding of laser shock peening induced plastic deformation. The results indicate that residual stress and equivalent plastic strain at the topmost surface are sensitive to mesh size while they can be well predicted in the subsurface layer. Increasing laser spot size or overlapping rate deepens the compressive residual stress layer while reducing ",
    "doi": "10.1016/j.optlastec.2019.105608",
    "innovationCn": "摘要 本文利用有限元方法研究了近表面残余应力和等效塑性应变分布，以进一步了解激光冲击强化引起的塑性变形。结果表明，最表面的残余应力和等效塑性应变对网格尺寸敏感，而在地下层可以很好地预测它们。增加激光光斑尺寸或重叠率会加深压缩残余应力层，同时减少",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 31,
    "link": "https://doi.org/10.1016/j.optlastec.2019.105608"
  },
  {
    "id": "p-016",
    "title": "A comparative study on laser shock deformation of silver nanowire junctions with different sizes for transparent conductors",
    "titleCn": "透明导体不同尺寸银纳米线结激光冲击变形对比研究",
    "authors": "Yizhong Hu, Yifan Yang, Yuhao Cheng, Zequn Zhang, Zihao Xu et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2026,
    "month": 7,
    "innovationScore": 6,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2026.115005",
    "innovationCn": "透明导体不同尺寸银纳米线结激光冲击变形对比研究。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "纳米材料 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1016/j.optlastec.2026.115005"
  },
  {
    "id": "p-017",
    "title": "The Local Microscale Reverse Deformation of Metallic Material under Laser Shock",
    "titleCn": "激光冲击下金属材料的局部微尺度反向变形",
    "authors": "Guoxin Lu, Jide Liu, Hongchao Qiao, Chuanyong Cui, Yizhou Zhou et al.",
    "journal": "Advanced Engineering Materials",
    "sourceType": "SCI",
    "year": 2017,
    "month": 2,
    "innovationScore": 5,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "A striking phenomenon is found that local plastic deformations, with an opposite direction to the external force, applied on metallic target surface under a given laser shock condition. Laser shock treatment is carried out on a number of metallic materials, and the surface topographies after laser shock treatment are observed via White Light Interferometer (WLI) measurement. The results show that many surface relief structures with irregular shapes and random distributions appear on target surfa",
    "doi": "10.1002/adem.201600672",
    "innovationCn": "发现了一个引人注目的现象：在给定的激光冲击条件下，金属目标表面会发生与外力方向相反的局部塑性变形。对多种金属材料进行激光冲击处理，通过白光干涉仪（WLI）测量观察激光冲击处理后的表面形貌。结果表明，目标表面出现许多形状不规则、随机分布的表面起伏结构。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 10,
    "link": "https://doi.org/10.1002/adem.201600672"
  },
  {
    "id": "p-018",
    "title": "Theoretical Analysis of the Effect of Pulse Time Structure on Residual Stress and Plastic Deformation During Laser Shock Processing",
    "titleCn": "激光冲击加工过程中脉冲时间结构对残余应力和塑性变形影响的理论分析",
    "authors": "Kang Shenghao, Yuan Hang, Zhu Chengyu, Dan Ziqiang, Li Yuxin",
    "journal": "2024 IEEE Academic International Symposium on Optoelectronics and Microelectronics Technology (AISOMT)",
    "sourceType": "核心",
    "year": 2024,
    "month": 11,
    "innovationScore": 5,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "残余应力"
    ],
    "abstract": "In laser shock peening (LSP) technology, pulsed lasers serve as the driving source and energy supply for generating shock loads. The temporal structure of the pulse directly influences the formation and dynamic evolution of plasma, which, in turn, affects the characteristics of the shock load and plays a decisive role in material strengthening. This study uses the one-dimensional radiation magnetohydrodynamics (RMHD) code HELIOS to obtain the temporal waveforms of shock waves under different pul",
    "doi": "10.1109/aisomt64170.2024.10992045",
    "innovationCn": "在激光冲击强化（LSP）技术中，脉冲激光作为产生冲击载荷的驱动源和能量来源。脉冲的时间结构直接影响等离子体的形成和动态演化，进而影响冲击载荷的特性，对材料强化起着决定性作用。本研究使用一维辐射磁流体动力学（RMHD）代码HELIOS来获得不同脉冲下冲击波的时间波形。",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1109/aisomt64170.2024.10992045"
  },
  {
    "id": "p-019",
    "title": "Simulation and experimental study on plastic deformation response of H13 steel under laser shock loading",
    "titleCn": "激光冲击载荷下H13钢塑性变形响应模拟与实验研究",
    "authors": "B.B. Zhang, Y. Chen, J. Li, Z. Zhang, M.J. Pu et al.",
    "journal": "Materials Letters",
    "sourceType": "SCI",
    "year": 2026,
    "month": 2,
    "innovationScore": 5,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "",
    "doi": "10.1016/j.matlet.2025.139638",
    "innovationCn": "激光冲击载荷下H13钢塑性变形响应模拟与实验研究。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "有限元模拟 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1016/j.matlet.2025.139638"
  },
  {
    "id": "p-020",
    "title": "Analytical Models for the Prediction of Deformation in Laser Shock Bulging",
    "titleCn": "激光冲击胀形变形预测的分析模型",
    "authors": "Guofang Zhang, Chao Zheng, Guoxin Lu, Zhong Ji",
    "journal": "Springer Science and Business Media LLC",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 5,
    "field": "fem",
    "processType": "general",
    "innovationTags": [
      "约束层"
    ],
    "abstract": "Abstract Laser shock forming (LSF) is a novel plastic forming process which utilizes a laser-induced shock wave to deform sheet metals to 3D configurations. Quantitative evaluation of the deformation in LSF is of great importance to understand the forming mechanism and achieve the high precision. In this paper, considering parameters of material, geometry and processing, an analytical model was proposed to predict the deformation of plate in laser shock bulging. Models showed that the deformatio",
    "doi": "10.21203/rs.3.rs-3944115/v1",
    "innovationCn": "摘要 激光冲击成型 (LSF) 是一种新型塑性成型工艺，利用激光诱导冲击波将金属板材变形为 3D 结构。本文综合考虑材料、几何形状和加工参数，提出了一种分析模型来预测激光冲击胀形中板材的变形。模型表明，变形与金属靶材和限制覆盖层的阻抗、材料的密度、屈服强度和厚度、",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.21203/rs.3.rs-3944115/v1"
  },
  {
    "id": "p-021",
    "title": "Laser Shock Wave-Induced Enhanced Thermal Corrosion Resistance of Ti6Al4V Alloy Fabricated by Laser Powder Bed Fusion",
    "titleCn": "激光粉末床熔融Ti6Al4V合金的激光冲击波诱导增强热腐蚀性能",
    "authors": "Kaiyu Luo, Changyu Wang, Jinzhong Lu",
    "journal": "Corrosion Resistance Behaviour of Metallic Materials Subjected to Laser Shock Peening",
    "sourceType": "核心",
    "year": 2025,
    "month": 1,
    "innovationScore": 5,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能",
      "钛合金"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-97-8351-9_8",
    "innovationCn": "激光粉末床熔融Ti6Al4V合金的激光冲击波诱导增强热腐蚀性能。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_8"
  },
  {
    "id": "p-022",
    "title": "Prediction of the residual state in 304 austenitic steel after laser shock peening – Effects of plastic deformation and martensitic phase transformation",
    "titleCn": "激光冲击喷丸后 304 奥氏体钢残余状态的预测 – 塑性变形和马氏体相变的影响",
    "authors": "Miroslav Halilovič, Sally Issa, Mathias Wallin, Håkan Hallberg, Matti Ristinmaa",
    "journal": "International Journal of Mechanical Sciences",
    "sourceType": "SCI",
    "year": 2016,
    "month": 6,
    "innovationScore": 5,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "相变",
      "不锈钢"
    ],
    "abstract": "",
    "doi": "10.1016/j.ijmecsci.2016.03.022",
    "innovationCn": "激光冲击喷丸后 304 奥氏体钢残余状态的预测 – 塑性变形和马氏体相变的影响。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 34,
    "link": "https://doi.org/10.1016/j.ijmecsci.2016.03.022"
  },
  {
    "id": "p-023",
    "title": "Numerical investigation of the effect of laser shock peening parameters on the residual stress and deformation response of 7075 aluminum alloy",
    "titleCn": "激光冲击喷丸参数对7075铝合金残余应力及变形响应影响的数值研究",
    "authors": "Y.F. Xiang, R.L. Mei, S.P. Wang, F. Azad, L.Z. Zhao et al.",
    "journal": "Optik",
    "sourceType": "SCI",
    "year": 2021,
    "month": 10,
    "innovationScore": 5,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "残余应力",
      "铝合金"
    ],
    "abstract": "",
    "doi": "10.1016/j.ijleo.2021.167446",
    "innovationCn": "激光冲击喷丸参数对7075铝合金残余应力及变形响应影响的数值研究。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 34,
    "link": "https://doi.org/10.1016/j.ijleo.2021.167446"
  },
  {
    "id": "p-024",
    "title": "Robust melt pool laser-shock-vibration assisted hybrid selective laser sintering and the mechanism",
    "titleCn": "鲁棒熔池激光冲击振动辅助混合选择性激光烧结及其机理",
    "authors": "Dingyi Guo, Yaowu Hu",
    "journal": "Elsevier BV",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 5,
    "field": "fem",
    "processType": "hybrid_am",
    "innovationTags": [
      "有限元模拟",
      "增材制造",
      "不锈钢"
    ],
    "abstract": "The collapse of the keyhole and subsequent gas entrapment remain critical bottlenecks in achieving defect-free and reliable laser powder bed fusion (LPBF). This paper studies a novel defect-suppression strategy utilizing a synchronous coaxial pulsed laser to stabilize the keyhole and evaluates the robustness of the strategy. Micro-CT porosity analysis reveals that the pulsed shock reduces porosity in 3D printed stainless steel samples by 85.03%. Simulation results demonstrate that the high-frequ",
    "doi": "10.2139/ssrn.6293594",
    "innovationCn": "小孔的塌陷和随后的气体截留仍然是实现无缺陷且可靠的激光粉末床熔合（LPBF）的关键瓶颈。本文研究了一种利用同步同轴脉冲激光稳定小孔的新型缺陷抑制策略，并评估了该策略的鲁棒性。仿真结果表明，同轴脉冲激光感应的高频压力场精确地作用在锁孔内，为",
    "innovationFormula": "有限元模拟 + 增材制造 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.6293594"
  },
  {
    "id": "p-025",
    "title": "Large deformation phase field modeling of spallation in metallic materials induced by laser shock peening",
    "titleCn": "激光冲击喷丸引起金属材料散裂的大变形相场建模",
    "authors": "Bing Lyu, Yongxing Shen, Oleg  B. Naimark",
    "journal": "Elsevier BV",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 5,
    "field": "fem",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Laser shock peening is a surface enhancement technique for metallic materials. However, it can induce large deformation or even spallation in thin-walled structures under high-energy impacts. This study develops a large deformation phase field model to investigate this phenomenon. The model incorporates the Mie--Gruneisen equation of state and a hypoelasto-plastic constitutive relation, implemented via a fully explicit integration scheme with adaptive time stepping. The model is verified by ener",
    "doi": "10.2139/ssrn.6429812",
    "innovationCn": "激光冲击强化是一种金属材料的表面强化技术。然而，在高能冲击下，它会引起薄壁结构的大变形甚至剥落。本研究开发了一个大变形相场模型来研究这种现象。该模型通过能量分析和实验结果进行验证，然后用于研究多次 LSP 冲击下的断裂行为，并确定可达到的最大变形和 PE",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.6429812"
  },
  {
    "id": "p-026",
    "title": "Effect of Low energy laser shock peening on plastic deformation, wettability and corrosion resistance of aluminum alloy 7075 T651",
    "titleCn": "低能激光冲击喷丸对7075 T651铝合金塑性变形、润湿性及耐蚀性的影响",
    "authors": "Abeens M., Muruganandhan R., Thirumavalavan K.",
    "journal": "Optik",
    "sourceType": "SCI",
    "year": 2020,
    "month": 10,
    "innovationScore": 4,
    "field": "fatigue",
    "processType": "coating",
    "innovationTags": [
      "微观组织",
      "腐蚀性能",
      "铝合金"
    ],
    "abstract": "Abstract AA 7075 T651 alloys are often used in a variety of applications such as gears, shafts, chassis in automobile industries, missiles and extension tubes of rifles in defense and marine components, where wear and corrosion resistance is indispensable. It entails the enhancement in surface characteristics such as hardness, wear resistance and resistance to the corrosion emanate from high concentration of chlorides. This article is devoted to analyze the corrosion behavior of AA 7075 T651 all",
    "doi": "10.1016/j.ijleo.2020.165045",
    "innovationCn": "摘要 AA 7075 T651 合金经常用于多种应用，如汽车工业中的齿轮、轴、底盘，国防和船舶部件中的导弹和步枪延长管，其中耐磨性和耐腐蚀性是必不可少的。它需要提高表面特性，例如硬度、耐磨性和对高浓度氯化物产生的腐蚀的抵抗力。本文致力于分析AA 7075 T651所有的腐蚀行为",
    "innovationFormula": "激光冲击 = 耐磨性提升",
    "subCategory": "",
    "citationCount": 25,
    "link": "https://doi.org/10.1016/j.ijleo.2020.165045"
  },
  {
    "id": "p-027",
    "title": "Deformation and Residual Stress Characteristics of TC17 Alloy Subjected to Laser Shock Peening with Single and Double Sides",
    "titleCn": "TC17合金单双面激光冲击强化变形及残余应力特性",
    "authors": "Minghuang Zhao, Chenghong Duan, Jiayi Li, Xiangpeng Luo",
    "journal": "IOP Conference Series: Materials Science and Engineering",
    "sourceType": "SCI",
    "year": 2019,
    "month": 3,
    "innovationScore": 4,
    "field": "fatigue",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "残余应力",
      "腐蚀性能",
      "疲劳性能"
    ],
    "abstract": "Laser shock peening is a new and high technology with application value and development prospect. It can effectively improve the fatigue resistance, wear resistance and corrosion resistance of metal materials. In this paper, two-phase titanium alloy TC17, which is widely used in aerospace field, is studied by finite element method. The effects of different laser shock paths on the deformation and residual stress distribution of materials are studied. The results show that the large-area complex ",
    "doi": "10.1088/1757-899x/493/1/012001",
    "innovationCn": "激光冲击强化是一项具有应用价值和发展前景的高新技术。能有效提高金属材料的抗疲劳、耐磨、耐腐蚀性能。研究了不同激光冲击路径对材料变形和残余应力分布的影响。结果表明，大面积复杂路径策略激光冲击强化对TC17的变形和残余应力有一定的影响。",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 4,
    "link": "https://doi.org/10.1088/1757-899x/493/1/012001"
  },
  {
    "id": "p-028",
    "title": "RETRACTED: Bridging the shocked monazite gap – Deformation microstructures in natural and laser shock-loaded samples",
    "titleCn": "撤回：弥合冲击独居石间隙 - 天然和激光冲击负载样品中的变形微观结构",
    "authors": "A.-M. Seydoux-Guillaume, T. de Resseguier, G. Montagnac, S. Reynaud, H. Leroux et al.",
    "journal": "Earth and Planetary Science Letters",
    "sourceType": "SCI",
    "year": 2022,
    "month": 10,
    "innovationScore": 4,
    "field": "micro",
    "processType": "general",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "",
    "doi": "10.1016/j.epsl.2022.117727",
    "innovationCn": "撤回：弥合冲击独居石间隙 - 天然和激光冲击负载样品中的变形微观结构。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1016/j.epsl.2022.117727"
  },
  {
    "id": "p-029",
    "title": "Characteristics and Development Status of Laser Shock Peening",
    "titleCn": "激光冲击强化的特点及发展现状",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-99-1117-2_1",
    "innovationCn": "激光冲击强化的特点及发展现状。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_1"
  },
  {
    "id": "p-030",
    "title": "Numerical Analysis of Mechanical Effects of Laser Shock Peening",
    "titleCn": "激光冲击强化机械效应的数值分析",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-99-1117-2_4",
    "innovationCn": "激光冲击强化机械效应的数值分析。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "有限元模拟 + 激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_4"
  },
  {
    "id": "w-001",
    "title": "Laser shock peening: Laser explosion and shear wave propagation",
    "titleCn": "激光冲击强化：激光爆炸和剪切波传播",
    "authors": "F. Maršík",
    "journal": "Engineering Mechanics",
    "sourceType": "核心",
    "year": 2022,
    "month": 1,
    "innovationScore": 4,
    "field": "fem",
    "processType": "general",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "The movement of dislocations can be characterized by the viscosity depending on the rate of deformation. In this way, the material strengthening is explained by overcoming atomic bonds, which coressponds to the hardening work. The movement of dislocations can be modeled by shear waves, which are strongly dispersive. In areas of high viscosity (before the shock wave) they precede the pressure shock wave. The concept of shear waves allows to describe with some accuracy the strengthening of the mat",
    "doi": "10.21495/51-2-253",
    "innovationCn": "位错的运动可以通过取决于变形速率的粘度来表征。位错的运动可以通过强色散的剪切波来模拟。所提出的分析表明，为了在相同的激光能量下获得更高的残余应力，使用较短长度的脉冲更有利。目前，总是需要进行实验来模拟激光冲击强化（LSP）。",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.21495/51-2-253"
  },
  {
    "id": "w-002",
    "title": "Plastic deformation behavior of 316 stainless steel subjected to multiple laser shock imprinting impacts",
    "titleCn": "多次激光冲击压印作用下316不锈钢的塑性变形行为",
    "authors": "Wei Cheng, Fengze Dai, Shu Huang, Xizhang Chen",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2022,
    "month": 9,
    "innovationScore": 4,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "不锈钢"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2022.108201",
    "innovationCn": "多次激光冲击压印作用下316不锈钢的塑性变形行为。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 6,
    "link": "https://doi.org/10.1016/j.optlastec.2022.108201"
  },
  {
    "id": "w-003",
    "title": "Laser shock induced incremental forming of pure copper foil and its deformation behavior",
    "titleCn": "纯铜箔激光冲击渐进成形及其变形行为",
    "authors": "Chao Zheng, Changdong Pan, Zhirui Tian, Xinhai Zhao, Guoqun Zhao et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 1,
    "innovationScore": 4,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "Abstract A novel method to fabricate micro-channel named laser shock incremental forming (LSIF) was proposed in the present study. A finite element model was established to capture the plastic deformation of metal foil during LSIF process. Formability of single straight-line channel on T2 pure copper foil by LSIF was explored through both numerical and experimental approaches. The deformation behavior of metal foil in LSIF was discussed in detail. The effect of laser power density on the bending",
    "doi": "10.1016/j.optlastec.2019.105785",
    "innovationCn": "摘要：本研究提出了一种制造微通道的新方法，即激光冲击增量成形（LSIF）。建立了有限元模型来捕获 LSIF 过程中金属箔的塑性变形。还研究了激光功率密度对成形零件的弯曲角度和显微硬度的影响。由于应变硬化效应增强，显微硬度值随着激光功率密度的提高而提高。",
    "innovationFormula": "有限元模拟 = 变形行为预测",
    "subCategory": "",
    "citationCount": 27,
    "link": "https://doi.org/10.1016/j.optlastec.2019.105785"
  },
  {
    "id": "w-004",
    "title": "Microstructure-crystallographic texture and substructure evolution in unpeened and laser shock peened HSLA steel upon ratcheting deformation",
    "titleCn": "未喷丸和激光喷丸 HSLA 钢在棘轮变形时的微观结构-晶体织构和亚结构演化",
    "authors": "Pushpendra Kumar Dwivedi, R. Vinjamuri, Krishna Dutta",
    "journal": "Philosophical Magazine",
    "sourceType": "SCI",
    "year": 2023,
    "month": 12,
    "innovationScore": 4,
    "field": "fatigue",
    "processType": "general",
    "innovationTags": [
      "微观组织",
      "疲劳性能"
    ],
    "abstract": "Uniaxial ratcheting behaviours associated with microstructural development of unpeened and laser shock peened ASTM A 588 Grade D High Strength Low Alloy (HSLA) steel were studied in this investigation. The mechanism of plastic deformation and crystallographic texture evolution during ratcheting was also studied. For this, the primary experimental works involved were stress-controlled ratcheting fatigue tests (on unpeened/laser-peened specimens) at room temperature. Followed by this, microstructu",
    "doi": "10.1080/14786435.2023.2246019",
    "innovationCn": "本次调查研究了与未喷丸和激光喷丸 ASTM A 588 D 级高强度低合金 (HSLA) 钢的微观结构发展相关的单轴棘轮行为。还研究了棘轮作用过程中的塑性变形和晶体织构演化机制。结果表明，所有未喷丸棘轮试样的平均晶粒尺寸在疲劳试验后略有减小。所研究的钢的塑性变形为",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1080/14786435.2023.2246019"
  },
  {
    "id": "w-005",
    "title": "Quality Control Technology of Structures with Laser Shock Peening",
    "titleCn": "激光冲击强化结构质量控制技术",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-99-1117-2_7",
    "innovationCn": "激光冲击强化结构质量控制技术。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_7"
  },
  {
    "id": "w-006",
    "title": "Stability Factors and Safety Protection of Laser Shock Peening",
    "titleCn": "激光冲击强化的稳定性因素及安全防护",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "This book highlights fundamentals and progresses in research and applications of laser shock peening and introduces lasers, equipment, and techniques",
    "doi": "10.1007/978-981-99-1117-2_3",
    "innovationCn": "本书重点介绍了激光冲击强化的研究和应用的基础知识和进展，并介绍了激光器、设备和技术",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_3"
  },
  {
    "id": "w-007",
    "title": "Strengthening Processes and Effect Evaluation of Welded Structures with Laser Shock Peening",
    "titleCn": "焊接结构激光冲击强化工艺及效果评价",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-99-1117-2_8",
    "innovationCn": "焊接结构激光冲击强化工艺及效果评价。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_8"
  },
  {
    "id": "w-008",
    "title": "Strengthening Processes and Effect Evaluations of Airplane Structures with Laser Shock Peening",
    "titleCn": "飞机结构激光冲击强化工艺及效果评价",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "This book highlights fundamentals and progresses in research and applications of laser shock peening and introduces lasers, equipment, and techniques",
    "doi": "10.1007/978-981-99-1117-2_6",
    "innovationCn": "本书重点介绍了激光冲击强化的研究和应用的基础知识和进展，并介绍了激光器、设备和技术",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_6"
  },
  {
    "id": "w-009",
    "title": "Evaluations of the Strengthening Effect of the Metals with Laser Shock Peening",
    "titleCn": "金属激光冲击强化强化效果评价",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-99-1117-2_5",
    "innovationCn": "金属激光冲击强化强化效果评价。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_5"
  },
  {
    "id": "w-010",
    "title": "FE simulation for stress distribution and surface deformation in Ti-6Al-4V induced by interaction of multi scale laser shock peening parameters",
    "titleCn": "多尺度激光冲击喷丸参数相互作用引起的 Ti-6Al-4V 应力分布和表面变形的有限元模拟",
    "authors": "Ranjith Kumar G, Rajyalakshmi G",
    "journal": "Optik",
    "sourceType": "SCI",
    "year": 2020,
    "month": 3,
    "innovationScore": 4,
    "field": "nano",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "残余应力",
      "钛合金"
    ],
    "abstract": "Abstract The article investigates the residual stress distribution and surface deformation induced with Laser Shock Peening (LSP) using Finite Element Method (FEM) model.LSP surface treatment is complex phenomenon with huge number of parameters interaction in nanosecond span of time to induce deep residual stress. ABAQUS Explicit Dynamic FEM is used with Johnson-Cook material model for analysing non linear constitutive behaviour of Ti6Al4V and compared with published experimental results. A fine",
    "doi": "10.1016/j.ijleo.2020.164280",
    "innovationCn": "摘要 本文利用有限元法 (FEM) 模型研究了激光冲击强化 (LSP) 引起的残余应力分布和表面变形。LSP 表面处理是一种复杂的现象，大量参数在纳秒级时间内相互作用，从而引起深层残余应力。基于 LSP 模拟的实验设计分析了激光光斑直径、激光光斑重叠率、激光功率密度、激光发射次数和激光束的影响。",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 12,
    "link": "https://doi.org/10.1016/j.ijleo.2020.164280"
  },
  {
    "id": "w-011",
    "title": "The size effect on deformation behavior in microscale laser shock flexible drawing",
    "titleCn": "微尺度激光冲击柔性拉伸变形行为的尺寸效应",
    "authors": "Huixia Liu, Xianqing Sun, Zongbao Shen, Cong Li, Chaofei Sha et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2016,
    "month": 12,
    "innovationScore": 3,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1016/j.optlastec.2016.07.009",
    "innovationCn": "微尺度激光冲击柔性拉伸变形行为的尺寸效应。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 14,
    "link": "https://doi.org/10.1016/j.optlastec.2016.07.009"
  },
  {
    "id": "w-012",
    "title": "Study of the Parameters of Laser-Induced Shock Waves for Laser Shock Peening of Silicon",
    "titleCn": "硅激光冲击强化激光激波参数研究",
    "authors": "E. I. Mareev, B. V. Rumiantsev, F. V. Potemkin",
    "journal": "JETP Letters",
    "sourceType": "SCI",
    "year": 2020,
    "month": 12,
    "innovationScore": 3,
    "field": "nano",
    "processType": "nano_lsp",
    "innovationTags": [
      "相变"
    ],
    "abstract": "The ranges of energies of femtosecond laser pulses and distances from the focusing point of intense (up to 1013 W/cm2) femtosecond laser radiation to a silicon sample in which phase transitions can be initiated have been determined using the time-resolved shadow photography technique. It has been found that the tight focusing (NA = 0.5) of femtosecond near infrared laser radiation provides a pressure of 15 GPa, which corresponds to a pressure of (40 ± 6) GPa in the case of laser shock peening of",
    "doi": "10.1134/s0021364020230095",
    "innovationCn": "飞秒激光脉冲的能量范围以及从强烈（高达 1013 W/cm2）飞秒激光辐射的聚焦点到可以引发相变的硅样品的距离已使用时间分辨阴影摄影技术确定。研究发现，飞秒近红外激光辐射的紧密聚焦（NA=0.5）可提供15 GPa的压力，相当于激光冲击喷丸情况下的（40±6）GPa的压力。",
    "innovationFormula": "激光冲击 + 超快激光 = 相变调控",
    "subCategory": "",
    "citationCount": 12,
    "link": "https://doi.org/10.1134/s0021364020230095"
  },
  {
    "id": "w-013",
    "title": "Effect of pulsed laser parameters on deformation inhomogeneity in laser shock incremental forming of pure copper foil",
    "titleCn": "脉冲激光参数对纯铜箔激光冲击渐进成形变形不均匀性的影响",
    "authors": "Chao Zheng, Zhirui Tian, Xinhai Zhao, Yongchao Tan, Guofang Zhang et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 7,
    "innovationScore": 3,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "Abstract The dependence of deformation inhomogeneity on the pulsed laser parameters in laser shock incremental forming (LSIF) of pure copper foil was studied based on finite element simulation. The formed depth, angle, profile and limiting fluctuation value were adopted to evaluate the forming deviation of parts. The digital microscope was employed to examine the bottom surface morphology of formed parts. The effect of pulsed laser energy, spot diameter and overlapping rate on the deformation in",
    "doi": "10.1016/j.optlastec.2020.106205",
    "innovationCn": "摘要 基于有限元模拟研究了纯铜箔激光冲击增量成形(LSIF)变形不均匀性对脉冲激光参数的依赖性。研究了脉冲激光能量、光斑直径和重叠率对LSIF变形不均匀性的影响。适当增强激光能量可以改善沿冲击方向和行进方向的变形不均匀性。在给定的工艺条件下，激光",
    "innovationFormula": "有限元模拟 = 变形行为预测",
    "subCategory": "",
    "citationCount": 14,
    "link": "https://doi.org/10.1016/j.optlastec.2020.106205"
  },
  {
    "id": "w-014",
    "title": "Surface dynamic deformation of LY2 aluminum alloy subjected to a laser shock wave planishing technique with different kinds of contacting foils",
    "titleCn": "不同类型接触箔激光冲击波整平处理LY2铝合金表面动态变形",
    "authors": "Fengze Dai, Zhipeng Pei, Xudong Ren, Shu Huang, Jianzhong Zhou et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 6,
    "innovationScore": 3,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "铝合金"
    ],
    "abstract": "Abstract In this paper, a laser shock wave planishing technique (LSWP) was used to treat the LY2 aluminum alloy surface with corrugated structures, and the influence of contacting film material on the planishing effect was studied. The dynamic response characteristics of surface micro-features under different physical parameters of contacting foils were simulated by finite element simulation (FEM), and experimental verification was carried out. A close match between the experimental results with",
    "doi": "10.1016/j.optlastec.2020.106074",
    "innovationCn": "摘要 采用激光冲击波整平技术（LSWP）对具有波纹结构的LY2铝合金表面进行处理，研究了接触膜材料对整平效果的影响。通过有限元仿真（FEM）模拟了不同物理参数下接触箔表面微观特征的动态响应特性，并进行了实验验证。实验结果与",
    "innovationFormula": "有限元模拟 = 变形行为预测",
    "subCategory": "",
    "citationCount": 4,
    "link": "https://doi.org/10.1016/j.optlastec.2020.106074"
  },
  {
    "id": "w-015",
    "title": "Laser Shock Hardening Industrial Application System",
    "titleCn": "激光冲击硬化工业应用系统",
    "authors": "Shikun Zou, Junfeng Wu, Ziwei Cao, Zhigang Che",
    "journal": "Laser Shock Peening",
    "sourceType": "核心",
    "year": 2023,
    "month": 1,
    "innovationScore": 3,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.1007/978-981-99-1117-2_2",
    "innovationCn": "激光冲击硬化工业应用系统。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_2"
  },
  {
    "id": "w-016",
    "title": "Use of the Hugoniot elastic limit in laser shockwave experiments to relate velocity measurements",
    "titleCn": "在激光冲击波实验中使用休格尼奥弹性极限来关联速度测量",
    "authors": "James A. Smith, Jeffrey M. Lacy, Daniel Lévesque, Jean-Pierre Monchalin, Martin Lord",
    "journal": "AIP Conference Proceedings",
    "sourceType": "核心",
    "year": 2016,
    "month": 1,
    "innovationScore": 2,
    "field": "hybrid",
    "processType": "coating",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "The US National Nuclear Security Agency has a Global Threat Reduction Initiative (GTRI) with the goal of reducing the worldwide use of high-enriched uranium (HEU). A salient component of that initiative is the conversion of research reactors from HEU to low enriched uranium (LEU) fuels. An innovative fuel is being developed to replace HEU in high-power research reactors. The new LEU fuel is a monolithic fuel made from a U-Mo alloy foil encapsulated in Al-6061 cladding. In order to support the fu",
    "doi": "10.1063/1.4940537",
    "innovationCn": "美国国家核安全局制定了一项全球减少威胁计划 (GTRI)，其目标是减少全球范围内高浓铀 (HEU) 的使用。为了支持燃料鉴定过程，正在开发激光冲击波技术（LST）来表征新鲜和辐照燃料板中的包层和燃料包层界面强度。该项目的关注点之一是激光冲击技术校准和标准化的难度。分析型",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 15,
    "link": "https://doi.org/10.1063/1.4940537"
  },
  {
    "id": "w-017",
    "title": "Laser shock experiments prove insightful in high strain rate deformation",
    "titleCn": "激光冲击实验证明对高应变率变形具有洞察力",
    "authors": "Leigh Ann Green",
    "journal": "Scilight",
    "sourceType": "SCI",
    "year": 2022,
    "month": 3,
    "innovationScore": 2,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "Simulated and experimental laser treatment of aluminum foils produces practical, comprehensive material characterization.",
    "doi": "10.1063/10.0009746",
    "innovationCn": "铝箔的模拟和实验激光处理可产生实用、全面的材料表征。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1063/10.0009746"
  },
  {
    "id": "w-018",
    "title": "Further investigation of surface velocity measurements for material characterization in laser shockwave experiments",
    "titleCn": "激光冲击波实验中材料表征的表面速度测量的进一步研究",
    "authors": "James A. Smith, Jeffrey M. Lacy, Clark L. Scott, Bradley C. Benefiel, Daniel Lévesque et al.",
    "journal": "AIP Conference Proceedings",
    "sourceType": "核心",
    "year": 2018,
    "month": 1,
    "innovationScore": 2,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "As part of the U.S. High Performance Research Reactor program, a laser shock test system is being developed by the Idaho National Laboratory (INL) to characterize interface strength in innovative plate fuel for research reactors around the world. The INL has been working with National Research Council Canada (NRC) on this project for the last five years. One of the concerns is the difficulty of calibrating and standardizing the laser shock technique. A recent analytical study and testing support",
    "doi": "10.1063/1.5031630",
    "innovationCn": "作为美国高性能研究堆计划的一部分，爱达荷国家实验室 (INL) 正在开发激光冲击测试系统，用于表征世界各地研究堆创新板燃料的界面强度。在这项工作中，NRC 系统的激光测速仪针对快速旋转的轮进行了测试，以验证准确性并确定最佳操作条件。两个激光冲击系统在不同铝合金板材上的循环测试正在进行中",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1063/1.5031630"
  },
  {
    "id": "w-019",
    "title": "Study of the Plastic Deformation Mechanisms of 42crmo4 Steels Under Laser Shock Peening Without Coatings and Subsequent Cyclic Stresses",
    "titleCn": "无涂层激光冲击喷丸及后续循环应力下42crmo4钢塑性变形机制研究",
    "authors": "Huitao Chen, Min Dou, Lei Li, Wei Huang, Wei Li et al.",
    "journal": "Elsevier BV",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 2,
    "field": "stress",
    "processType": "coating",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "",
    "doi": "10.2139/ssrn.4424906",
    "innovationCn": "无涂层激光冲击喷丸及后续循环应力下42crmo4钢塑性变形机制研究。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.4424906"
  },
  {
    "id": "w-020",
    "title": "Surface Morphology, Plastic Deformation and Phase Transformation in Single Crystal Superalloys Under Laser Shock Peening Without Coating",
    "titleCn": "无涂层激光冲击喷丸下单晶高温合金的表面形貌、塑性变形和相变",
    "authors": "shuang hu, mo lang, guangni zhou, huailin zhang, Xiaoqing Liang et al.",
    "journal": "Elsevier BV",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 2,
    "field": "micro",
    "processType": "coating",
    "innovationTags": [
      "相变"
    ],
    "abstract": "",
    "doi": "10.2139/ssrn.5163378",
    "innovationCn": "无涂层激光冲击喷丸下单晶高温合金的表面形貌、塑性变形和相变。该论文研究了激光冲击强化相关工艺与性能，为该领域提供了新的见解。",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.5163378"
  }
];
