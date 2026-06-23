/* ============================================================
   激光冲击论文周报 - 交互逻辑
   功能：方向筛选 / 来源筛选 / 关键词搜索 / 排序 / 渲染
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
    html += '<div class="menu-item" id="aboutLink">关于本站</div>';
    html += '<div class="menu-item" id="updateGuide">更新方法</div>';
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
    var abstractHtml = "";
    if (p.abstract) {
      var absShort = p.abstract.substring(0, 150);
      if (p.abstract.length > 150) absShort += "...";
      abstractHtml = '<div class="abstract-box"><span class="abs-label">摘要</span>' +
        escapeHtml(absShort) + '</div>';
    }
    var citeHtml = "";
    if (p.citationCount) {
      citeHtml = '<span style="font-size:11px;color:#999;">被引 ' +
        p.citationCount + ' 次</span>';
    }
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
      abstractHtml +
      (tags ? '<div class="tags">' + tags + '</div>' : '') +
      '<div class="card-bottom">' +
        '<div class="innovation-meter">创新评分 ' + stars +
          ' <span style="color:#8B0000;font-weight:bold;">' + score + '/10</span>' +
          '<div class="meter-bar"><div class="meter-fill" style="width:' +
          (score * 10) + '%"></div></div></div>' +
        '<a class="doi-link" href="' + escapeHtml(doiUrl) +
          '" target="_blank" rel="noopener">查看 ↗</a>' +
      '</div>' +
      citeHtml +
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

  function renderTrendSummaries() {
    var wrap = document.getElementById("trendSummaries");
    if (!wrap) return;
    var html = "";
    DIRECTIONS.forEach(function (d) {
      var summary = DIRECTION_SUMMARIES[d.id];
      if (!summary) return;
      var dirPapers = PAPERS.filter(function (p) { return p.field === d.id; });
      if (dirPapers.length === 0) return;
      html += '<div class="trend-panel">';
      html += '<h4>' + d.icon + ' ' + escapeHtml(d.name) +
        ' <span style="font-size:12px;color:#999;font-weight:normal;">(' +
        dirPapers.length + '篇)</span></h4>';
      if (summary.trend) {
        html += '<div class="trend-summary"><strong>趋势：</strong>' +
          escapeHtml(summary.trend) + '</div>';
      }
      if (summary.hotspots && summary.hotspots.length > 0) {
        html += '<div class="hotspot-list">';
        summary.hotspots.forEach(function (h) {
          html += '<span class="hotspot">' + escapeHtml(h) + '</span>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    wrap.innerHTML = html;
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
    renderSourceFilter();
    renderDirectionNav();
    renderSidebar();
    renderTrendSummaries();
    renderPapers();
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.keyword = searchInput.value;
        renderPapers();
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