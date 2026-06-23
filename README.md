# 激光冲击论文周报 · Laser Shock Peening Weekly

## 概述
一个自动搜索、排序、展示激光冲击强化领域论文的静态网站系统。
布局参考 SCP基金会 的简洁素雅风格，内容参考 Rolling Papers Weekly 的功能结构。
覆盖 **SCI / 核心 / 预印本** 多源文献，按 **创新点** 与 **研究方向** 自动排序。

## 功能特性
- **多源搜索**：arXiv（预印本）+ Crossref（SCI/核心期刊）
- **创新评分**：按引用影响力、主题相关性、时效性、摘要丰富度、来源权威性、标题创新性综合评分
- **Top 30 精选**：创新评分最高的30篇论文
- **每周更新**：自动搜索新论文（排除前30篇已选论文）
- **8个研究方向**：工艺、应力、微观组织、有限元、疲劳、复合、纳米、表面改性
- **交互式界面**：搜索、筛选、排序、方向导航
- **SCP风格布局**：简洁白色背景、侧边栏导航、顶部导航栏、面板化设计

## 文件结构
```
laser_shock_papers/
├── index.html            # 主页面（SCP风格布局）
├── style.css             # 样式表（简洁素雅风格）
├── app.js                # 交互逻辑（搜索/筛选/排序/渲染）
├── papers.js             # 论文数据库（JS格式）
├── search_papers.py      # 搜索脚本（arXiv + Crossref）
├── gen_papers.py         # 生成papers.js的脚本
├── weekly_update.py      # 每周更新脚本（排除前30篇）
├── setup_schedule.py     # Windows定时任务设置
├── papers_data.json      # 原始搜索结果缓存
├── excluded_ids.json     # 前30篇论文ID（排除列表）
└── README.md             # 说明文档
```

## 使用方法

### 初始搜索（Top 30）
```bash
python search_papers.py     # 搜索论文
python gen_papers.py        # 生成papers.js
```

### 每周更新（新论文）
```bash
python weekly_update.py     # 搜索新论文，排除前30篇
```

### 设置自动每周更新（Windows）
```bash
python setup_schedule.py   # 按提示操作
```

## 研究方向
| 方向 | ID | 说明 |
|------|-----|------|
| ⚙ 激光冲击强化工艺 | process | LSP工艺参数、约束层、冲击波 |
| 📐 残余应力与变形 | stress | 残余应力、塑性变形、应变 |
| 🔬 微观组织演变 | micro | 相变、纳米晶、位错 |
| 💻 有限元与多尺度模拟 | fem | FEM、分子动力学、数值模拟 |
| ⏱ 疲劳与磨损性能 | fatigue | 疲劳寿命、磨损、摩擦 |
| 🔀 复合/特种激光冲击 | hybrid | 增材制造复合、涂层、原位 |
| ⚡ 纳米/超快激光冲击 | nano | 纳秒/飞秒、2D材料、纳米线 |
| 🛠 表面改性工程 | surface | 腐蚀、润湿性、生物医用 |

## 评分标准（0-100→映射到1-10星）
| 维度 | 满分 | 说明 |
|------|------|------|
| 引用影响力 | 25 | 被引次数 |
| 主题相关性 | 20 | 激光冲击关键词匹配 |
| 时效性 | 20 | 越新分越高 |
| 摘要丰富度 | 15 | 摘要长度+方法关键词 |
| 来源权威性 | 10 | 期刊级别 |
| 标题创新性 | 10 | 标题中的创新关键词 |

## 数据来源
- **arXiv API**: http://export.arxiv.org/api/query
- **Crossref API**: https://api.crossref.org/works