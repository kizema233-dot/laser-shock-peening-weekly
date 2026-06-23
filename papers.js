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

const DIRECTION_SUMMARIES = {
  "process": {
    "trend": "激光冲击强化工艺方向收录 11 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 11 篇论文，平均创新评分 3.8/10。",
    "hotspots": [
      "激光冲击"
    ]
  },
  "stress": {
    "trend": "残余应力与变形方向收录 16 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 16 篇论文，平均创新评分 4.4/10。",
    "hotspots": [
      "激光冲击",
      "铝合金",
      "钛合金",
      "相变",
      "不锈钢"
    ]
  },
  "micro": {
    "trend": "微观组织演变方向收录 3 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 3 篇论文，平均创新评分 3.3/10。",
    "hotspots": [
      "微观组织",
      "相变"
    ]
  },
  "fem": {
    "trend": "有限元与多尺度模拟方向收录 11 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 11 篇论文，平均创新评分 5.5/10。",
    "hotspots": [
      "有限元模拟",
      "激光冲击",
      "铝合金",
      "增材制造",
      "钛合金"
    ]
  },
  "fatigue": {
    "trend": "疲劳与磨损性能方向收录 1 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 1 篇论文，平均创新评分 7.0/10。",
    "hotspots": [
      "疲劳性能"
    ]
  },
  "hybrid": {
    "trend": "复合/特种激光冲击方向收录 0 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 0 篇论文，平均创新评分 0.0/10。",
    "hotspots": []
  },
  "nano": {
    "trend": "纳米/超快激光冲击方向收录 6 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 6 篇论文，平均创新评分 7.2/10。",
    "hotspots": [
      "分子动力学",
      "激光冲击",
      "有限元模拟",
      "深冷激光冲击",
      "相变"
    ]
  },
  "surface": {
    "trend": "表面改性工程方向收录 2 篇论文",
    "summary": "该方向涵盖激光冲击强化领域的相关研究，共收录 2 篇论文，平均创新评分 3.5/10。",
    "hotspots": [
      "钛合金",
      "激光冲击",
      "腐蚀性能"
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
    "innovationTags": [
      "有限元模拟",
      "残余应力",
      "微观组织"
    ],
    "abstract": "Laser shock peening (LSP) is an innovative and promising surface strengthening technique of metallic materials. The LSP-induced plastic deformation, the compressive residual stresses and the microstructure evolution are essentially attributed to the laser plasma-induced shock wave. A three-dimensional finite element model in conjunction with the dislocation density-based constitutive model was developed to simulate the LSP of pure Al correlating with the LSP-induced shock wave, and the predicted",
    "doi": "10.3390/ma15207051",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Abstract Tellurene, a chiral chain semiconductor with a narrow bandgap and exceptional strain sensitivity, emerges as a pivotal material for tailoring electronic and optoelectronic properties via strain engineering. This study elucidates the fundamental mechanisms of ultrafast laser shock imprinting (LSI) in two-dimensional tellurium (Te), establishing a direct relationship between strain field orientation, mold topology, and anisotropic structural evolution. This is the first demonstration of u",
    "doi": "10.1007/s40820-025-01925-8",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "纳米结构",
      "不锈钢"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijplas.2021.103191",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "残余应力",
      "钛合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2024.110643",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "纳米结构",
      "相变",
      "不锈钢",
      "深冷激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.jmrt.2022.06.005",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2024.112184",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "疲劳性能"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2025.114234",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "分子动力学",
      "有限元模拟"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.vacuum.2025.114737",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "分子动力学"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/s00339-024-07780-5",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "有限元模拟",
      "残余应力"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-97-0665-5_57",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.2961/jlmn.2025.02.2007",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1134/s1052618825701432",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2025.113172",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.matchar.2021.111620",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2019.105608",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2026.115005",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "A striking phenomenon is found that local plastic deformations, with an opposite direction to the external force, applied on metallic target surface under a given laser shock condition. Laser shock treatment is carried out on a number of metallic materials, and the surface topographies after laser shock treatment are observed via White Light Interferometer (WLI) measurement. The results show that many surface relief structures with irregular shapes and random distributions appear on target surfa",
    "doi": "10.1002/adem.201600672",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1109/aisomt64170.2024.10992045",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "有限元模拟"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.matlet.2025.139638",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "约束层"
    ],
    "abstract": "Abstract Laser shock forming (LSF) is a novel plastic forming process which utilizes a laser-induced shock wave to deform sheet metals to 3D configurations. Quantitative evaluation of the deformation in LSF is of great importance to understand the forming mechanism and achieve the high precision. In this paper, considering parameters of material, geometry and processing, an analytical model was proposed to predict the deformation of plate in laser shock bulging. Models showed that the deformatio",
    "doi": "10.21203/rs.3.rs-3944115/v1",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "腐蚀性能",
      "钛合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-97-8351-9_8",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "相变",
      "不锈钢"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijmecsci.2016.03.022",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "残余应力",
      "铝合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijleo.2021.167446",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "有限元模拟",
      "增材制造",
      "不锈钢"
    ],
    "abstract": "The collapse of the keyhole and subsequent gas entrapment remain critical bottlenecks in achieving defect-free and reliable laser powder bed fusion (LPBF). This paper studies a novel defect-suppression strategy utilizing a synchronous coaxial pulsed laser to stabilize the keyhole and evaluates the robustness of the strategy. Micro-CT porosity analysis reveals that the pulsed shock reduces porosity in 3D printed stainless steel samples by 85.03%. Simulation results demonstrate that the high-frequ",
    "doi": "10.2139/ssrn.6293594",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "Laser shock peening is a surface enhancement technique for metallic materials. However, it can induce large deformation or even spallation in thin-walled structures under high-energy impacts. This study develops a large deformation phase field model to investigate this phenomenon. The model incorporates the Mie--Gruneisen equation of state and a hypoelasto-plastic constitutive relation, implemented via a fully explicit integration scheme with adaptive time stepping. The model is verified by ener",
    "doi": "10.2139/ssrn.6429812",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "腐蚀性能",
      "铝合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijleo.2020.165045",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "残余应力"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1088/1757-899x/493/1/012001",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.epsl.2022.117727",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_1",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_4",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.21495/51-2-253",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "不锈钢"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2022.108201",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2019.105785",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "微观组织"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1080/14786435.2023.2246019",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_7",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_3",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_8",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_6",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_5",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "有限元模拟",
      "钛合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.ijleo.2020.164280",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2016.07.009",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1134/s0021364020230095",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2020.106205",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1016/j.optlastec.2020.106074",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1007/978-981-99-1117-2_2",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1063/1.4940537",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "铝合金"
    ],
    "abstract": "Simulated and experimental laser treatment of aluminum foils produces practical, comprehensive material characterization.",
    "doi": "10.1063/10.0009746",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.1063/1.5031630",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "激光冲击"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.2139/ssrn.4424906",
    "innovationCn": "",
    "innovationFormula": "",
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
    "innovationTags": [
      "相变"
    ],
    "abstract": "（摘要待补充）",
    "doi": "10.2139/ssrn.5163378",
    "innovationCn": "",
    "innovationFormula": "",
    "subCategory": "",
    "citationCount": 0,
    "link": "https://doi.org/10.2139/ssrn.5163378"
  }
];
