/* ============================================================
   激光冲击论文周报 - 交互逻辑 (SCP风格)
   功能：仪表盘可视化 / 方向筛选 / 来源筛选 / 搜索 / 排序
   ============================================================ */

(function () {
  "use strict";

  var state = {
    activeDir: "all",
    activeSources: new Set(),
    keyword: "",
    sortBy: "innovation"
  };

  var SOURCE_TYPES = ["SCI", "EI", "核心", "预印本", "CSCD"];
  var MONTHS = ["", "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"];
  var SRC_COLORS = {
    SCI: "#3b82f6", EI: "#f59e0b", "核心": "#10b981",
    "预印本": "#ef4444", CSCD: "#8b5cf6"
  };

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function dirById(id) {
    return DIRECTIONS.find(function (d) { return d.id === id; }) || null;
  }

  function getWeekInfo() {
    var now = new Date();
    var y = now.getFullYear();
    var start = new Date(y, 0, 1);
    var days = Math.floor((now - start) / 86400000);
    var week = Math.ceil((days + start.getDay() + 1) / 7);
    return { year: y, week: week };
  }

  function computeStats() {
    var total = PAPERS.length;
    var bySource = {};
    SOURCE_TYPES.forEach(function (s) { bySource[s] = 0; });
    PAPERS.forEach(function (p) {
      if (bySource[p.sourceType] !== undefined) bySource[p.sourceType]++;
    });
    var avgScore = total ? (PAPERS.reduce(function (a, p) {
      return a + (p.innovationScore || 0);
    }, 0) / total).toFixed(1) : "0";
    return { total: total, bySource: bySource, avgScore: avgScore,
      dirs: DIRECTIONS.length };
  }

  function renderStats() {
    var s = computeStats();
    var wk = getWeekInfo();
    var el = document.getElementById("statsBar");
    if (!el) return;
    var pills = [
      { label: "收录论文", value: s.total },
      { label: "研究方向", value: s.dirs },
      { label: "平均创新分", value: s.avgScore },
      { label: "SCI论文", value: s.bySource.SCI || 0 },
      { label: "核心期刊", value: s.bySource["核心"] || 0 },
      { label: "预印本", value: s.bySource["预印本"] || 0 }
    ];
    el.innerHTML = pills.map(function (p) {
      return '<div class="stat-item"><span class="stat-value">' +
        p.value + '</span><span class="stat-label">' +
        escapeHtml(p.label) + '</span></div>';
    }).join("");
    var wkEl = document.getElementById("weekInfo");
    if (wkEl) wkEl.textContent = wk.year + "年 第" + wk.week + "周";
  }

  // ===== 仪表盘图表 =====

  function renderChartDirection() {
    var el = document.getElementById("chartDirection");
    if (!el) return;
    var data = DIRECTIONS.map(function (d) {
      return { dir: d, count: PAPERS.filter(function (p) {
        return p.field === d.id;
      }).length };
    }).sort(function (a, b) { return b.count - a.count; });
    var maxVal = Math.max.apply(null, data.map(function (d) {
      return d.count;
    })) || 1;
    var html = '<div class="bar-chart">';
    data.forEach(function (item) {
      var pct = (item.count / maxVal * 100).toFixed(0);
      html += '<div class="bar-row">' +
        '<span class="bar-label">' + item.dir.icon + " " +
        escapeHtml(item.dir.name) + '</span>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' +
        pct + '%;background:' + item.dir.color + ';"></div></div>' +
        '<span class="bar-value">' + item.count + '</span></div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderChartSource() {
    var el = document.getElementById("chartSource");
    if (!el) return;
    var counts = {};
    SOURCE_TYPES.forEach(function (s) { counts[s] = 0; });
    PAPERS.forEach(function (p) {
      if (counts[p.sourceType] !== undefined) counts[p.sourceType]++;
    });
    var total = PAPERS.length || 1;
    var active = SOURCE_TYPES.filter(function (s) {
      return counts[s] > 0;
    });
    var R = 56, r = 34, cx = 65, cy = 65;
    var html = '<div class="donut-wrap"><div style="position:relative;">';
    html += '<svg class="donut-svg" width="130" height="130" viewBox="0 0 130 130">';
    var offset = 0;
    active.forEach(function (s) {
      var val = counts[s];
      var pct = val / total;
      var circ = 2 * Math.PI * R;
      var dash = pct * circ;
      html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R +
        '" fill="none" stroke="' + SRC_COLORS[s] + '" stroke-width="' +
        (R - r) + '" stroke-dasharray="' + dash + ' ' + (circ - dash) +
        '" stroke-dashoffset="' + (-offset) + '" />';
      offset += dash;
    });
    html += '</svg>';
    html += '<div class="donut-center" style="top:50%;left:50%;transform:translate(-50%,-50%);"><b>' +
      total + '</b><span>篇</span></div>';
    html += '</div>';
    html += '<div class="donut-legend">';
    active.forEach(function (s) {
      html += '<div class="legend-item"><span class="legend-dot" style="background:' +
        SRC_COLORS[s] + ';"></span>' + escapeHtml(s) +
        '<span class="legend-val">' + counts[s] + ' (' +
        (counts[s] / total * 100).toFixed(0) + '%)</span></div>';
    });
    html += '</div></div>';
    el.innerHTML = html;
  }

  function renderChartYear() {
    var el = document.getElementById("chartYear");
    if (!el) return;
    var yearCounts = {};
    PAPERS.forEach(function (p) {
      var y = p.year;
      yearCounts[y] = (yearCounts[y] || 0) + 1;
    });
    var years = Object.keys(yearCounts).sort();
    var maxVal = Math.max.apply(null, Object.values(yearCounts)) || 1;
    var colors = ["#6366f1", "#818cf8", "#3b82f6", "#10b981",
      "#f59e0b", "#ef4444", "#8b5cf6"];
    var html = '<div class="year-chart">';
    years.forEach(function (y, i) {
      var pct = (yearCounts[y] / maxVal * 100).toFixed(0);
      html += '<div class="year-bar-col">' +
        '<div class="year-bar" style="height:' + pct + '%;background:' +
        colors[i % colors.length] + ';">' +
        '<span class="count">' + yearCounts[y] + '</span></div>' +
        '<span class="year-label">' + y + '</span></div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderChartInnovation() {
    var el = document.getElementById("chartInnovation");
    if (!el) return;
    var data = DIRECTIONS.map(function (d) {
      var list = PAPERS.filter(function (p) { return p.field === d.id; });
      var avg = list.length ? (list.reduce(function (a, p) {
        return a + (p.innovationScore || 0);
      }, 0) / list.length) : 0;
      return { dir: d, avg: avg };
    }).sort(function (a, b) { return b.avg - a.avg; });
    var html = '<div class="score-chart">';
    data.forEach(function (item) {
      var pct = (item.avg / 10 * 100).toFixed(0);
      html += '<div class="score-row">' +
        '<span class="bar-label" style="flex:0 0 100px;font-size:11px;">' +
        item.dir.icon + " " + escapeHtml(item.dir.name) + '</span>' +
        '<div class="score-track"><div class="score-fill" style="width:' +
        pct + '%;background:' + item.dir.color + ';"></div></div>' +
        '<span class="bar-value">' + item.avg.toFixed(1) + '</span></div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderChartMatrix() {
    var el = document.getElementById("chartMatrix");
    if (!el) return;
    var ptypes = typeof PROCESS_TYPES !== "undefined" ? PROCESS_TYPES : [];
    var matrix = {};
    var maxVal = 0;
    DIRECTIONS.forEach(function (d) {
      matrix[d.id] = {};
      ptypes.forEach(function (pt) { matrix[d.id][pt.id] = 0; });
    });
    PAPERS.forEach(function (p) {
      var mid = p.field;
      var pid = p.processType || "general";
      if (!matrix[mid]) matrix[mid] = {};
      if (matrix[mid][pid] === undefined) matrix[mid][pid] = 0;
      matrix[mid][pid]++;
      if (matrix[mid][pid] > maxVal) maxVal = matrix[mid][pid];
    });
    function cellColor(val, max) {
      if (val === 0) return "transparent";
      var intensity = 0.2 + (val / max) * 0.8;
      var r = Math.round(139 * intensity + 255 * (1 - intensity));
      var g = Math.round(0 * intensity + 250 * (1 - intensity));
      var b = Math.round(0 * intensity + 240 * (1 - intensity));
      return "rgba(" + r + "," + g + "," + b + "," + (0.3 + intensity * 0.7) + ")";
    }
    var html = '<div class="matrix-wrap"><table class="matrix-table"><thead><tr>';
    html += '<th class="row-h">研究方向 \\ 工艺类型</th>';
    ptypes.forEach(function (pt) {
      html += '<th>' + escapeHtml(pt.name) + '</th>';
    });
    html += '<th>合计</th></tr></thead><tbody>';
    var colTotals = {};
    ptypes.forEach(function (pt) { colTotals[pt.id] = 0; });
    DIRECTIONS.forEach(function (d) {
      var rowTotal = 0;
      html += '<tr><th class="row-h">' + d.icon + " " +
        escapeHtml(d.name) + '</th>';
      ptypes.forEach(function (pt) {
        var val = matrix[d.id][pt.id] || 0;
        rowTotal += val;
        colTotals[pt.id] += val;
        var bg = cellColor(val, maxVal);
        html += '<td><div class="matrix-cell ' + (val === 0 ? "zero" : "") +
          '" style="background:' + bg + ';" title="' +
          escapeHtml(d.name) + ' × ' + escapeHtml(pt.name) + ': ' + val + ' 篇">';
        if (val > 0) html += '<span class="num">' + val + '</span>';
        else html += '<span style="opacity:0.3;">·</span>';
        html += '</div></td>';
      });
      html += '<td><b style="color:' + d.color + ';">' + rowTotal + '</b></td></tr>';
    });
    html += '<tr><th class="row-h">合计</th>';
    var grandTotal = 0;
    ptypes.forEach(function (pt) {
      html += '<td><b>' + colTotals[pt.id] + '</b></td>';
      grandTotal += colTotals[pt.id];
    });
    html += '<td><b style="color:var(--accent);font-size:14px;">' + grandTotal + '</b></td></tr>';
    html += '</tbody></table></div>';
    html += '<div class="matrix-legend"><span>少</span><div class="scale"></div><span>多</span><span style="margin-left:auto;">悬停查看详情 · 颜色越深论文越多</span></div>';
    el.innerHTML = html;
  }

  function renderTrendSummaries() {
    var el = document.getElementById("trendSummaries");
    if (!el) return;
    var summaries = typeof DIRECTION_SUMMARIES !== "undefined" ? DIRECTION_SUMMARIES : {};
    var html = '<div class="trend-list">';
    DIRECTIONS.forEach(function (d) {
      var s = summaries[d.id];
      if (!s) return;
      var count = PAPERS.filter(function (p) { return p.field === d.id; }).length;
      if (count === 0) return;
      html += '<div class="trend-item" style="--dir-color:' + d.color + ';">' +
        '<div class="trend-head">' +
          '<span class="ico">' + d.icon + '</span>' +
          '<span class="name">' + escapeHtml(d.name) + '</span>' +
          '<span class="badge-trend" style="background:' + d.color + ';">' +
          escapeHtml(s.trend) + '</span>' +
        '</div>' +
        '<div class="trend-summary">' + escapeHtml(s.summary) + '</div>';
      if (s.hotspots && s.hotspots.length) {
        html += '<div class="trend-hotspots">';
        s.hotspots.forEach(function (h) {
          html += '<span class="hotspot-tag">' + escapeHtml(h) + '</span>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderDashboard() {
    renderChartDirection();
    renderChartSource();
    renderChartYear();
    renderChartInnovation();
    renderChartMatrix();
    renderTrendSummaries();
    var sub = document.getElementById("dashSub");
    if (sub) {
      var ptypes = typeof PROCESS_TYPES !== "undefined" ? PROCESS_TYPES.length : 0;
      sub.textContent = "共 " + PAPERS.length + " 篇 · " + DIRECTIONS.length +
        " 个研究方向 · " + ptypes + " 个工艺类型 · 2016-2026";
    }
  }

  // ===== 导航与筛选 =====

  function renderDirectionNav() {
    var wrap = document.getElementById("directionNav");
    if (!wrap) return;
    var html = '<button class="dir-btn ' +
      (state.activeDir === "all" ? "active" : "") +
      '" data-dir="all">全部方向 <span class="count">' +
      PAPERS.length + '</span></button>';
    DIRECTIONS.forEach(function (d) {
      var count = PAPERS.filter(function (p) {
        return p.field === d.id;
      }).length;
      var active = state.activeDir === d.id ? " active" : "";
      html += '<button class="dir-btn' + active + '" data-dir="' +
        d.id + '">' + d.icon + ' ' + escapeHtml(d.name) +
        ' <span class="count">' + count + '</span></button>';
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll(".dir-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.activeDir = btn.getAttribute("data-dir");
        renderDirectionNav();
        renderSidebar();
        renderPapers();
        var main = document.getElementById("mainContent");
        if (main) main.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderSidebar() {
    var wrap = document.getElementById("sideBarNav");
    if (!wrap) return;
    var html = "";
    html += '<div class="side-block">';
    html += '<div class="heading"><p>导航</p></div>';
    var allActive = state.activeDir === "all" ? " active" : "";
    html += '<div class="menu-item' + allActive + '" data-dir="all">全部论文<span class="count">' + PAPERS.length + '</span></div>';
    DIRECTIONS.forEach(function (d) {
      var count = PAPERS.filter(function (p) { return p.field === d.id; }).length;
      var active = state.activeDir === d.id ? " active" : "";
      html += '<div class="menu-item' + active + '" data-dir="' + d.id + '">' +
        d.icon + ' ' + escapeHtml(d.name) + '<span class="count">' + count + '</span></div>';
    });
    html += '</div>';
    html += '<div class="side-block">';
    html += '<div class="heading"><p>来源筛选</p></div>';
    SOURCE_TYPES.forEach(function (s) {
      var count = PAPERS.filter(function (p) { return p.sourceType === s; }).length;
      if (count > 0) {
        var active = state.activeSources.has(s) ? " active" : "";
        html += '<div class="menu-item' + active + '" data-src="' + s + '">' +
          escapeHtml(s) + '<span class="count">' + count + '</span></div>';
      }
    });
    html += '</div>';
    html += '<div class="side-block">';
    html += '<div class="heading"><p>关于</p></div>';
    html += '<div class="menu-item">关于本站</div>';
    html += '<div class="menu-item">更新方法</div>';
    html += '</div>';
    wrap.innerHTML = html;
    wrap.querySelectorAll("[data-dir]").forEach(function (item) {
      item.addEventListener("click", function () {
        state.activeDir = item.getAttribute("data-dir");
        renderDirectionNav();
        renderSidebar();
        renderPapers();
      });
    });
    wrap.querySelectorAll("[data-src]").forEach(function (item) {
      item.addEventListener("click", function () {
        var s = item.getAttribute("data-src");
        if (state.activeSources.has(s)) state.activeSources.delete(s);
        else state.activeSources.add(s);
        renderSidebar();
        renderSourceFilter();
        renderPapers();
      });
    });
  }

  function renderSourceFilter() {
    var wrap = document.getElementById("sourceFilter");
    if (!wrap) return;
    var html = "";
    SOURCE_TYPES.forEach(function (s) {
      var active = state.activeSources.has(s);
      html += '<span class="source-chip ' + (active ? "active" : "") +
        '" data-src="' + s + '">' + s + '</span>';
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll(".source-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var s = chip.getAttribute("data-src");
        if (state.activeSources.has(s)) state.activeSources.delete(s);
        else state.activeSources.add(s);
        renderSourceFilter();
        renderSidebar();
        renderPapers();
      });
    });
  }

  function getFilteredPapers() {
    var list = PAPERS.slice();
    if (state.activeDir !== "all") {
      list = list.filter(function (p) { return p.field === state.activeDir; });
    }
    if (state.activeSources.size > 0) {
      list = list.filter(function (p) {
        return state.activeSources.has(p.sourceType);
      });
    }
    if (state.keyword.trim()) {
      var kw = state.keyword.trim().toLowerCase();
      list = list.filter(function (p) {
        return (p.title && p.title.toLowerCase().indexOf(kw) >= 0) ||
          (p.authors && p.authors.toLowerCase().indexOf(kw) >= 0) ||
          (p.journal && p.journal.toLowerCase().indexOf(kw) >= 0) ||
          (p.abstract && p.abstract.toLowerCase().indexOf(kw) >= 0) ||
          (p.innovationCn && p.innovationCn.toLowerCase().indexOf(kw) >= 0) ||
          (p.innovationFormula && p.innovationFormula.indexOf(kw) >= 0) ||
          (p.innovationTags && p.innovationTags.some(function (t) {
            return t.toLowerCase().indexOf(kw) >= 0;
          }));
      });
    }
    if (state.sortBy === "innovation") {
      list.sort(function (a, b) {
        return (b.innovationScore || 0) - (a.innovationScore || 0);
      });
    } else if (state.sortBy === "date") {
      list.sort(function (a, b) {
        if (b.year !== a.year) return b.year - a.year;
        return b.month - a.month;
      });
    } else if (state.sortBy === "source") {
      var order = { "SCI": 0, "EI": 1, "核心": 2, "CSCD": 3, "预印本": 4 };
      list.sort(function (a, b) {
        return (order[a.sourceType] || 9) - (order[b.sourceType] || 9);
      });
    }
    return list;
  }

  function isRecentPaper(p) {
    var now = new Date();
    var y = p.year || now.getFullYear();
    var m = p.month || 1;
    var paperDate = new Date(y, m - 1, 1);
    var diff = (now - paperDate) / (1000 * 60 * 60 * 24);
    return diff <= 90;
  }

  // ===== 创新公式渲染 =====
  function renderFormula(p) {
    var f = p.innovationFormula || "";
    if (!f) return "";
    var parts = f.split(" = ");
    var inputs = parts[0] || "";
    var result = parts[1] || "";
    var tokens = inputs.split(" + ");
    var html = '<div class="formula-box">';
    html += '<span class="formula-label">🔑 创新公式</span>';
    html += '<span class="formula-body">';
    tokens.forEach(function (tok, i) {
      if (i > 0) html += ' <span class="op">+</span> ';
      html += '<span class="token">' + escapeHtml(tok) + '</span>';
    });
    html += ' <span class="op">=</span> ';
    html += '<span class="result">' + escapeHtml(result) + '</span>';
    html += '</span>';
    html += '</div>';
    return html;
  }

  // ===== 创新点摘要框 =====
  function renderAbstractBox(p) {
    var cn = p.innovationCn || p.abstract || "";
    var en = p.abstract || "";
    var hasEn = en && en !== "（摘要待补充）" && en.length > 20;
    var isLong = cn.length > 80;
    var id = (p.id || "p").replace(/[^a-zA-Z0-9]/g, "");
    var html = '<div class="abstract-box" id="abs-' + id + '">';
    html += '<span class="abs-label">💡 创新点</span>';
    if (isLong) {
      var short = cn.substring(0, 80);
      var lastPeriod = short.lastIndexOf(".");
      if (lastPeriod > 30) short = short.substring(0, lastPeriod + 1);
      else short = short + "...";
      html += '<span class="abs-short">' + escapeHtml(short) + '</span>';
      html += '<span class="abs-full" style="display:none;">' + escapeHtml(cn) + '</span>';
      html += ' <a class="abs-toggle" onclick="toggleAbstract(\'' + id + '\')" data-state="short">展开全部 ▼</a>';
    } else {
      html += escapeHtml(cn);
    }
    html += '</div>';
    if (hasEn && isLong) {
      html += '<div class="abstract-en" id="en-' + id + '" style="display:none;">';
      html += '<span class="abs-label-en">📄 English Abstract</span>';
      html += escapeHtml(en.substring(0, 300)) + (en.length > 300 ? "..." : "");
      html += '</div>';
    }
    return html;
  }

  // ===== 论文卡片渲染 =====
  function renderCard(p, index) {
    var d = dirById(p.field) || { icon: "📄", color: "#8B0000", name: "" };
    var score = p.innovationScore || 0;
    var stars = "";
    for (var i = 0; i < 10; i++) {
      stars += i < score ? "★" : "☆";
    }
    var tags = (p.innovationTags || []).map(function (t) {
      return '<span class="tag">#' + escapeHtml(t) + '</span>';
    }).join("");
    var doiUrl = p.link || (p.doi ? "https://doi.org/" + p.doi : "#");
    var sourceClass = "source-badge " + escapeHtml(p.sourceType);
    var citeHtml = p.citationCount ? '<span style="font-size:11px;color:#999;margin:0 12px;">被引 ' + p.citationCount + ' 次</span>' : '';
    return '<article class="paper-card">' +
      '<div class="card-top">' +
        '<span class="rank-badge"><span class="star">★</span>#' + (index + 1) +
          ' ' + escapeHtml(d.name) + '</span>' +
        '<span class="' + sourceClass + '">' + escapeHtml(p.sourceType) + '</span>' +
      '</div>' +
      '<h3><a href="' + escapeHtml(doiUrl) + '" target="_blank" rel="noopener">' +
        escapeHtml(p.title) + '</a></h3>' +
      '<div class="authors">👤 ' + escapeHtml(p.authors) + '</div>' +
      '<div class="journal-line">📖 ' + escapeHtml(p.journal) +
        ' <span class="year">' + p.year + '年' + MONTHS[p.month] + '</span></div>' +
      renderFormula(p) +
      renderAbstractBox(p) +
      (tags ? '<div class="tags">' + tags + '</div>' : '') +
      citeHtml +
      '<div class="card-bottom">' +
        '<div class="innovation-meter">创新评分 ' + stars +
          ' <span style="color:var(--accent);font-weight:bold;">' + score + '/10</span>' +
          '<div class="meter-bar"><div class="meter-fill" style="width:' +
          (score * 10) + '%"></div></div></div>' +
        '<a class="doi-link" href="' + escapeHtml(doiUrl) +
          '" target="_blank" rel="noopener">查看 ↗</a>' +
      '</div>' +
    '</article>';
  }

  function renderSubCategories(paperList) {
    var groups = {};
    var order = [];
    paperList.forEach(function (p) {
      var sc = p.subCategory || "全部";
      if (!groups[sc]) { groups[sc] = []; order.push(sc); }
      groups[sc].push(p);
    });
    var html = "";
    if (order.length <= 1) {
      var list = groups[order[0]] || paperList;
      html += '<div class="paper-grid">' +
        list.map(function (p, i) { return renderCard(p, i); }).join("") +
        '</div>';
      return html;
    }
    order.forEach(function (sc) {
      var list = groups[sc];
      html += '<div class="subcat-label"><span class="subcat-tag">' +
        escapeHtml(sc) + '</span><span class="subcat-count">' +
        list.length + ' 篇</span></div>';
      html += '<div class="paper-grid">' +
        list.map(function (p, i) { return renderCard(p, i); }).join("") +
        '</div>';
    });
    return html;
  }

  function renderSectionHeader(d, count) {
    return '<div class="subcat-label">' +
      '<span class="subcat-tag" style="border-left:4px solid ' + d.color + ';">' +
      d.icon + ' ' + escapeHtml(d.name) + '</span>' +
      '<span class="subcat-count">' + count + ' 篇</span></div>';
  }

  function renderPapers() {
    var root = document.getElementById("paperContainer");
    if (!root) return;
    var list = getFilteredPapers();
    var recent = list.filter(isRecentPaper);
    var archived = list.filter(function (p) { return !isRecentPaper(p); });
    var html = "";
    if (state.activeDir === "all") {
      if (recent.length > 0) {
        html += '<div class="epoch-header">' +
          '<span class="epoch-badge new">🔥 近期更新</span>' +
          '<span class="epoch-count">' + recent.length + ' 篇</span></div>';
        DIRECTIONS.forEach(function (d) {
          var sub = recent.filter(function (p) { return p.field === d.id; });
          if (sub.length === 0) return;
          html += renderSectionHeader(d, sub.length);
          html += renderSubCategories(sub);
        });
      }
      if (archived.length > 0) {
        html += '<div class="epoch-header">' +
          '<span class="epoch-badge archive">📚 精选归档</span>' +
          '<span class="epoch-count">' + archived.length + ' 篇</span></div>';
        DIRECTIONS.forEach(function (d) {
          var sub = archived.filter(function (p) { return p.field === d.id; });
          if (sub.length === 0) return;
          html += renderSectionHeader(d, sub.length);
          html += renderSubCategories(sub);
        });
      }
    } else {
      var d = dirById(state.activeDir);
      if (d) {
        html += '<div class="epoch-header">' +
          '<span class="subcat-tag" style="border-left:4px solid ' + d.color +
          ';font-size:14px;">' + d.icon + ' ' + escapeHtml(d.name) +
          '</span><span class="epoch-count">' + list.length + ' 篇</span></div>';
      }
      html += renderSubCategories(list);
    }
    if (list.length === 0) {
      html = '<div style="text-align:center;padding:40px;color:#999;">' +
        '没有找到符合条件的论文</div>';
    }
    root.innerHTML = html;
  }

  function init() {
    renderStats();
    renderDashboard();
    renderSourceFilter();
    renderDirectionNav();
    renderSidebar();
    renderPapers();
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
      var timer = null;
      searchInput.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.keyword = searchInput.value;
          renderPapers();
        }, 200);
      });
    }
    var sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sortBy = sortSelect.value;
        renderPapers();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ===== 全局：展开/收起创新点摘要 =====
function toggleAbstract(id) {
  var box = document.getElementById("abs-" + id);
  if (!box) return;
  var shortEl = box.querySelector(".abs-short");
  var fullEl = box.querySelector(".abs-full");
  var toggle = box.querySelector(".abs-toggle");
  var enEl = document.getElementById("en-" + id);
  if (!shortEl || !fullEl || !toggle) return;
  if (toggle.getAttribute("data-state") === "short") {
    shortEl.style.display = "none";
    fullEl.style.display = "inline";
    toggle.textContent = "收起 ▲";
    toggle.setAttribute("data-state", "full");
    if (enEl) enEl.style.display = "block";
  } else {
    shortEl.style.display = "inline";
    fullEl.style.display = "none";
    toggle.textContent = "展开全部 ▼";
    toggle.setAttribute("data-state", "short");
    if (enEl) enEl.style.display = "none";
  }
}