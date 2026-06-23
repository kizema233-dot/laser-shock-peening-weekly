/**
 * 激光冲击领域论文数据库
 * 数据来源：arXiv + Crossref
 * 检索日期：2026-06-22
 * 覆盖 SCI / 核心 / 预印本 多源文献
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
    "titleCn": "",
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
    "innovationCn": "A three-dimensional finite element model in conjunction with the dislocation density-based constitutive model was developed to simulate the LSP of pure Al correlating with the LSP-induced shock wave, and the predicted in-depth residual stresses are i...",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 14,
    "link": "https://doi.org/10.3390/ma15207051"
  },
  {
    "id": "p-002",
    "title": "Ultrafast Laser Shock Straining in Chiral Chain 2D Materials: Mold Topology-Controlled Anisotropic Deformation",
    "titleCn": "",
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
    "innovationCn": "This is the first demonstration of ultrafast LSI on chiral chain Te unveiling orientation-sensitive dislocation networks. In contrast, transverse strain drives shear-mediated multimodal deformations—tensile stretching, compression, and bending—result...",
    "innovationFormula": "超快激光 + 纳米材料 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/s40820-025-01925-8"
  },
  {
    "id": "p-003",
    "title": "Carbide-facilitated nanocrystallization of martensitic laths and carbide deformation in AISI 420 stainless steel during laser shock peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijplas.2021.103191",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 173,
    "link": "https://doi.org/10.1016/j.ijplas.2021.103191"
  },
  {
    "id": "p-004",
    "title": "Investigation on the deformation progress and residual stress of Ti-6Al-4V alloy during laser shock peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2024.110643",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 21,
    "link": "https://doi.org/10.1016/j.optlastec.2024.110643"
  },
  {
    "id": "p-005",
    "title": "Deformation-induced phase transition and nanotwins in SS 304 steel during cryogenic laser shock peening without coating",
    "titleCn": "",
    "authors": "M.V. Nataraj, S. Swaroop",
    "journal": "Journal of Materials Research and Technology",
    "sourceType": "SCI",
    "year": 2022,
    "month": 7,
    "innovationScore": 7,
    "field": "nano",
    "processType": "cryogenic",
    "innovationTags": [
      "纳米结构",
      "相变",
      "不锈钢",
      "深冷激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.jmrt.2022.06.005",
    "innovationCn": "",
    "innovationFormula": "激光冲击 + 深冷处理 = 微观组织优化",
    "subCategory": "",
    "citationCount": 38,
    "link": "https://doi.org/10.1016/j.jmrt.2022.06.005"
  },
  {
    "id": "p-006",
    "title": "Dynamic modeling of the interfacial bonding strength of CFRP composites detected by laser shockwave",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2024.112184",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 7,
    "link": "https://doi.org/10.1016/j.optlastec.2024.112184"
  },
  {
    "id": "p-007",
    "title": "Influence of plastic deformation and rolling contact fatigue resistance on 25CrNi2MoV steel under laser shock peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2025.114234",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 疲劳寿命提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1016/j.optlastec.2025.114234"
  },
  {
    "id": "p-008",
    "title": "Molecular dynamics simulation study on microscopic plastic deformation behavior of FCC AlCuMg alloy under laser shock peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.vacuum.2025.114737",
    "innovationCn": "",
    "innovationFormula": "分子动力学 + 有限元模拟 + 激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.1016/j.vacuum.2025.114737"
  },
  {
    "id": "p-009",
    "title": "Molecular dynamics for laser shock peening in the γ/α2 interface of lamellar TiAl alloy: the effect of shock velocity in plastic deformation",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/s00339-024-07780-5",
    "innovationCn": "",
    "innovationFormula": "分子动力学 + 激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1007/s00339-024-07780-5"
  },
  {
    "id": "p-010",
    "title": "Numerical Simulation of Surface Residual Stress and Deformation of FGH95 Alloy Under Multiple Laser Shock Peening with Square Spots",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-97-0665-5_57",
    "innovationCn": "",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-0665-5_57"
  },
  {
    "id": "p-011",
    "title": "Acoustic Signature Measurement to Identify Laser-Induced Breakdown in Water during Laser Shock Peening",
    "titleCn": "",
    "authors": "",
    "journal": "Journal of Laser Micro/Nanoengineering",
    "sourceType": "SCI",
    "year": 2025,
    "month": 8,
    "innovationScore": 6,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.2961/jlmn.2025.02.2007",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2961/jlmn.2025.02.2007"
  },
  {
    "id": "p-012",
    "title": "Analytical Determination of Microdimple Depth and Surface Deformation under Laser Shock Processing of Visco-Elasto-Plastic Materials",
    "titleCn": "",
    "authors": "G. Zh. Sakhvadze",
    "journal": "Journal of Machinery Manufacture and Reliability",
    "sourceType": "SCI",
    "year": 2025,
    "month": 12,
    "innovationScore": 6,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1134/s1052618825701432",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1134/s1052618825701432"
  },
  {
    "id": "p-013",
    "title": "Deformation behaviour, microstructural evolution and mechanical property of the shaped parts fabricated by laser shock forming with different laser energy",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2025.113172",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1016/j.optlastec.2025.113172"
  },
  {
    "id": "p-014",
    "title": "Mechanical properties and deformation dependent microstructural aspects of laser shock peened 7075-T6 aluminum alloy without coating",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.matchar.2021.111620",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 40,
    "link": "https://doi.org/10.1016/j.matchar.2021.111620"
  },
  {
    "id": "p-015",
    "title": "Finite element analysis of laser shock peening induced near-surface deformation in engineering metals",
    "titleCn": "",
    "authors": "Wangfan Zhou, Xudong Ren, Yu Yang, Zhaopeng Tong, Enoch Asuako Larson",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2019,
    "month": 11,
    "innovationScore": 6,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2019.105608",
    "innovationCn": "",
    "innovationFormula": "有限元模拟 + 激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 31,
    "link": "https://doi.org/10.1016/j.optlastec.2019.105608"
  },
  {
    "id": "p-016",
    "title": "A comparative study on laser shock deformation of silver nanowire junctions with different sizes for transparent conductors",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2026.115005",
    "innovationCn": "",
    "innovationFormula": "纳米材料 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1016/j.optlastec.2026.115005"
  },
  {
    "id": "p-017",
    "title": "The Local Microscale Reverse Deformation of Metallic Material under Laser Shock",
    "titleCn": "",
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
    "innovationCn": "The results show that many surface relief structures with irregular shapes and random distributions appear on target surfaces under the action of invisible shock waves.",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 10,
    "link": "https://doi.org/10.1002/adem.201600672"
  },
  {
    "id": "p-018",
    "title": "Theoretical Analysis of the Effect of Pulse Time Structure on Residual Stress and Plastic Deformation During Laser Shock Processing",
    "titleCn": "",
    "authors": "Kang Shenghao, Yuan Hang, Zhu Chengyu, Dan Ziqiang, Li Yuxin",
    "journal": "2024 IEEE Academic International Symposium on Optoelectronics and Microelectronics Technology (AISOMT)",
    "sourceType": "核心",
    "year": 2024,
    "month": 11,
    "innovationScore": 5,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1109/aisomt64170.2024.10992045",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1109/aisomt64170.2024.10992045"
  },
  {
    "id": "p-019",
    "title": "Simulation and experimental study on plastic deformation response of H13 steel under laser shock loading",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.matlet.2025.139638",
    "innovationCn": "",
    "innovationFormula": "有限元模拟 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1016/j.matlet.2025.139638"
  },
  {
    "id": "p-020",
    "title": "Analytical Models for the Prediction of Deformation in Laser Shock Bulging",
    "titleCn": "",
    "authors": "Guofang Zhang, Chao Zheng, Guoxin Lu, Zhong Ji",
    "journal": "Springer Science and Business Media LLC",
    "sourceType": "SCI",
    "year": 2024,
    "month": 1,
    "innovationScore": 5,
    "field": "fem",
    "processType": "conventional",
    "innovationTags": [
      "约束层"
    ],
    "abstract": "Abstract Laser shock forming (LSF) is a novel plastic forming process which utilizes a laser-induced shock wave to deform sheet metals to 3D configurations. Quantitative evaluation of the deformation in LSF is of great importance to understand the forming mechanism and achieve the high precision. In this paper, considering parameters of material, geometry and processing, an analytical model was proposed to predict the deformation of plate in laser shock bulging. Models showed that the deformatio",
    "doi": "10.21203/rs.3.rs-3944115/v1",
    "innovationCn": "Abstract Laser shock forming (LSF) is a novel plastic forming process which utilizes a laser-induced shock wave to deform sheet metals to 3D configurations. In this paper, considering parameters of material, geometry and processing, an analytical mod...",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.21203/rs.3.rs-3944115/v1"
  },
  {
    "id": "p-021",
    "title": "Laser Shock Wave-Induced Enhanced Thermal Corrosion Resistance of Ti6Al4V Alloy Fabricated by Laser Powder Bed Fusion",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-97-8351-9_8",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-97-8351-9_8"
  },
  {
    "id": "p-022",
    "title": "Prediction of the residual state in 304 austenitic steel after laser shock peening – Effects of plastic deformation and martensitic phase transformation",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijmecsci.2016.03.022",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 34,
    "link": "https://doi.org/10.1016/j.ijmecsci.2016.03.022"
  },
  {
    "id": "p-023",
    "title": "Numerical investigation of the effect of laser shock peening parameters on the residual stress and deformation response of 7075 aluminum alloy",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijleo.2021.167446",
    "innovationCn": "",
    "innovationFormula": "有限元模拟 + 激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 34,
    "link": "https://doi.org/10.1016/j.ijleo.2021.167446"
  },
  {
    "id": "p-024",
    "title": "Robust melt pool laser-shock-vibration assisted hybrid selective laser sintering and the mechanism",
    "titleCn": "",
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
    "innovationCn": "This paper studies a novel defect-suppression strategy utilizing a synchronous coaxial pulsed laser to stabilize the keyhole and evaluates the robustness of the strategy. Micro-CT porosity analysis reveals that the pulsed shock reduces porosity in 3D...",
    "innovationFormula": "有限元模拟 + 增材制造 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.6293594"
  },
  {
    "id": "p-025",
    "title": "Large deformation phase field modeling of spallation in metallic materials induced by laser shock peening",
    "titleCn": "",
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
    "innovationCn": "Laser shock peening is a surface enhancement technique for metallic materials. This study develops a large deformation phase field model to investigate this phenomenon.",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.6429812"
  },
  {
    "id": "p-026",
    "title": "Effect of Low energy laser shock peening on plastic deformation, wettability and corrosion resistance of aluminum alloy 7075 T651",
    "titleCn": "",
    "authors": "Abeens M., Muruganandhan R., Thirumavalavan K.",
    "journal": "Optik",
    "sourceType": "SCI",
    "year": 2020,
    "month": 10,
    "innovationScore": 4,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "腐蚀性能",
      "铝合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijleo.2020.165045",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 耐腐蚀性提升",
    "subCategory": "",
    "citationCount": 25,
    "link": "https://doi.org/10.1016/j.ijleo.2020.165045"
  },
  {
    "id": "p-027",
    "title": "Deformation and Residual Stress Characteristics of TC17 Alloy Subjected to Laser Shock Peening with Single and Double Sides",
    "titleCn": "",
    "authors": "Minghuang Zhao, Chenghong Duan, Jiayi Li, Xiangpeng Luo",
    "journal": "IOP Conference Series: Materials Science and Engineering",
    "sourceType": "SCI",
    "year": 2019,
    "month": 3,
    "innovationScore": 4,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1088/1757-899x/493/1/012001",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 残余应力调控",
    "subCategory": "",
    "citationCount": 4,
    "link": "https://doi.org/10.1088/1757-899x/493/1/012001"
  },
  {
    "id": "p-028",
    "title": "RETRACTED: Bridging the shocked monazite gap – Deformation microstructures in natural and laser shock-loaded samples",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.epsl.2022.117727",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1016/j.epsl.2022.117727"
  },
  {
    "id": "p-029",
    "title": "Characteristics and Development Status of Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_1",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_1"
  },
  {
    "id": "p-030",
    "title": "Numerical Analysis of Mechanical Effects of Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_4",
    "innovationCn": "",
    "innovationFormula": "有限元模拟 + 激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 1,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_4"
  },
  {
    "id": "w-001",
    "title": "Laser shock peening: Laser explosion and shear wave propagation",
    "titleCn": "",
    "authors": "F. Maršík",
    "journal": "Engineering Mechanics",
    "sourceType": "核心",
    "year": 2022,
    "month": 1,
    "innovationScore": 4,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.21495/51-2-253",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.21495/51-2-253"
  },
  {
    "id": "w-002",
    "title": "Plastic deformation behavior of 316 stainless steel subjected to multiple laser shock imprinting impacts",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2022.108201",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 6,
    "link": "https://doi.org/10.1016/j.optlastec.2022.108201"
  },
  {
    "id": "w-003",
    "title": "Laser shock induced incremental forming of pure copper foil and its deformation behavior",
    "titleCn": "",
    "authors": "Chao Zheng, Changdong Pan, Zhirui Tian, Xinhai Zhao, Guoqun Zhao et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 1,
    "innovationScore": 4,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2019.105785",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 27,
    "link": "https://doi.org/10.1016/j.optlastec.2019.105785"
  },
  {
    "id": "w-004",
    "title": "Microstructure-crystallographic texture and substructure evolution in unpeened and laser shock peened HSLA steel upon ratcheting deformation",
    "titleCn": "",
    "authors": "Pushpendra Kumar Dwivedi, R. Vinjamuri, Krishna Dutta",
    "journal": "Philosophical Magazine",
    "sourceType": "SCI",
    "year": 2023,
    "month": 12,
    "innovationScore": 4,
    "field": "micro",
    "processType": "general",
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1080/14786435.2023.2246019",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 微观组织优化",
    "subCategory": "",
    "citationCount": 3,
    "link": "https://doi.org/10.1080/14786435.2023.2246019"
  },
  {
    "id": "w-005",
    "title": "Quality Control Technology of Structures with Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_7",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_7"
  },
  {
    "id": "w-006",
    "title": "Stability Factors and Safety Protection of Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_3",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_3"
  },
  {
    "id": "w-007",
    "title": "Strengthening Processes and Effect Evaluation of Welded Structures with Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_8",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_8"
  },
  {
    "id": "w-008",
    "title": "Strengthening Processes and Effect Evaluations of Airplane Structures with Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_6",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_6"
  },
  {
    "id": "w-009",
    "title": "Evaluations of the Strengthening Effect of the Metals with Laser Shock Peening",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_5",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_5"
  },
  {
    "id": "w-010",
    "title": "FE simulation for stress distribution and surface deformation in Ti-6Al-4V induced by interaction of multi scale laser shock peening parameters",
    "titleCn": "",
    "authors": "Ranjith Kumar G, Rajyalakshmi G",
    "journal": "Optik",
    "sourceType": "SCI",
    "year": 2020,
    "month": 3,
    "innovationScore": 4,
    "field": "fem",
    "processType": "simulation",
    "innovationTags": [
      "有限元模拟",
      "钛合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijleo.2020.164280",
    "innovationCn": "",
    "innovationFormula": "有限元模拟 + 激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 12,
    "link": "https://doi.org/10.1016/j.ijleo.2020.164280"
  },
  {
    "id": "w-011",
    "title": "The size effect on deformation behavior in microscale laser shock flexible drawing",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2016.07.009",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 14,
    "link": "https://doi.org/10.1016/j.optlastec.2016.07.009"
  },
  {
    "id": "w-012",
    "title": "Study of the Parameters of Laser-Induced Shock Waves for Laser Shock Peening of Silicon",
    "titleCn": "",
    "authors": "E. I. Mareev, B. V. Rumiantsev, F. V. Potemkin",
    "journal": "JETP Letters",
    "sourceType": "SCI",
    "year": 2020,
    "month": 12,
    "innovationScore": 3,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1134/s0021364020230095",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 12,
    "link": "https://doi.org/10.1134/s0021364020230095"
  },
  {
    "id": "w-013",
    "title": "Effect of pulsed laser parameters on deformation inhomogeneity in laser shock incremental forming of pure copper foil",
    "titleCn": "",
    "authors": "Chao Zheng, Zhirui Tian, Xinhai Zhao, Yongchao Tan, Guofang Zhang et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 7,
    "innovationScore": 3,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2020.106205",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 14,
    "link": "https://doi.org/10.1016/j.optlastec.2020.106205"
  },
  {
    "id": "w-014",
    "title": "Surface dynamic deformation of LY2 aluminum alloy subjected to a laser shock wave planishing technique with different kinds of contacting foils",
    "titleCn": "",
    "authors": "Fengze Dai, Zhipeng Pei, Xudong Ren, Shu Huang, Jianzhong Zhou et al.",
    "journal": "Optics &amp; Laser Technology",
    "sourceType": "SCI",
    "year": 2020,
    "month": 6,
    "innovationScore": 3,
    "field": "stress",
    "processType": "general",
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2020.106074",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 4,
    "link": "https://doi.org/10.1016/j.optlastec.2020.106074"
  },
  {
    "id": "w-015",
    "title": "Laser Shock Hardening Industrial Application System",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_2",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1007/978-981-99-1117-2_2"
  },
  {
    "id": "w-016",
    "title": "Use of the Hugoniot elastic limit in laser shockwave experiments to relate velocity measurements",
    "titleCn": "",
    "authors": "James A. Smith, Jeffrey M. Lacy, Daniel Lévesque, Jean-Pierre Monchalin, Martin Lord",
    "journal": "AIP Conference Proceedings",
    "sourceType": "核心",
    "year": 2016,
    "month": 1,
    "innovationScore": 2,
    "field": "process",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1063/1.4940537",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 15,
    "link": "https://doi.org/10.1063/1.4940537"
  },
  {
    "id": "w-017",
    "title": "Laser shock experiments prove insightful in high strain rate deformation",
    "titleCn": "",
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
    "innovationCn": "Simulated and experimental laser treatment of aluminum foils produces practical, comprehensive material characterization.",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.1063/10.0009746"
  },
  {
    "id": "w-018",
    "title": "Further investigation of surface velocity measurements for material characterization in laser shockwave experiments",
    "titleCn": "",
    "authors": "James A. Smith, Jeffrey M. Lacy, Clark L. Scott, Bradley C. Benefiel, Daniel Lévesque et al.",
    "journal": "AIP Conference Proceedings",
    "sourceType": "核心",
    "year": 2018,
    "month": 1,
    "innovationScore": 2,
    "field": "surface",
    "processType": "general",
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1063/1.5031630",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 性能提升",
    "subCategory": "",
    "citationCount": 2,
    "link": "https://doi.org/10.1063/1.5031630"
  },
  {
    "id": "w-019",
    "title": "Study of the Plastic Deformation Mechanisms of 42crmo4 Steels Under Laser Shock Peening Without Coatings and Subsequent Cyclic Stresses",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.2139/ssrn.4424906",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.4424906"
  },
  {
    "id": "w-020",
    "title": "Surface Morphology, Plastic Deformation and Phase Transformation in Single Crystal Superalloys Under Laser Shock Peening Without Coating",
    "titleCn": "",
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
    "abstract": "（摘要待补充）",
    "doi": "10.2139/ssrn.5163378",
    "innovationCn": "",
    "innovationFormula": "激光冲击 = 变形行为预测",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.5163378"
  }
];
