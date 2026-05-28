(function () {
  "use strict";

  const TOKENS = {
    appName: "剑琅管家",
    appLogo: "assets/LOGO2.png",
    platform: "pc",
    version: "1.0.0",
    designCanvas: { width: 1440, height: 900, minWidth: 1280 },
    brandTheme: {
      color: {
        brand6: "#F32F41",
        primary: "#F32F41",
        bgPage: "#F2F3F5",
        bgContainer: "#FFFFFF",
        border: "#E5E6EB",
        textPrimary: "#1D2129",
        textSecondary: "#4E5969",
        success: "#00B42A",
        warning: "#FF7D00",
        error: "#F53F3F",
        info: "#165DFF",
      },
      layout: {
        siderWidth: 220,
        siderCollapsedWidth: 48,
        headerHeight: 60,
        contentPadding: 24,
        tableRowHeight: 40,
        buttonHeight: 32,
      },
    },
  };

  const AI_PROMPT = `请按《剑琅管家 PC 端设计规范 v1.0》设计 [页面名称]：
- 画布 1440×900，最小宽 1280；布局：侧栏 220 + 顶栏 60 + 内容区
- 参考 Arco Design Pro 2.0 组件与密度；品牌主色 #F32F41（非 Arco 蓝）
- 字体 PingFang SC；金额数字 TCloudNumber-Bold；¥ 与数字间距 4px
- 背景 #F2F3F5 / 卡片 #FFFFFF；边框 #E5E6EB；文字 #1D2129 / #4E5969
- 主按钮 32px 高 brand-6 底白字；表格行 40px；圆角 4/8px；轻阴影
- 图表：ECharts 风格；序列色 brand #F32F41 + info #165DFF；浅灰虚线网格；Tooltip 白底
- 禁止 emoji、大面积渐变背景、整页红底
- 业务：[字段与操作说明]`;

  const GLOBAL_RULES = [
    { title: "画布", text: "默认 1440×900；最小内容宽度 1280" },
    { title: "品牌主色", text: "#F32F41（替代 Arco 默认蓝）" },
    { title: "页面背景", text: "内容区 #F2F3F5；卡片 #FFFFFF" },
    { title: "字体", text: "PingFang SC；金额 TCloudNumber Bold" },
    { title: "圆角", text: "组件 2/4/8px；业务卡片 8px；大面板 12px" },
    { title: "阴影", text: "PC 启用 Arco 轻阴影；禁止渐变背景" },
    { title: "间距", text: "4px 模数：4/8/12/16/20/24/32/40" },
    { title: "禁止", text: "Emoji、自创图标、整页红底铺色" },
  ];

  const BRAND_COLORS = [
    ["brand-1", "#FEF0F1", "浅色背景"],
    ["brand-2", "#FDD9DC", "悬浮背景"],
    ["brand-3", "#FCBDC3", "弱选中"],
    ["brand-4", "#FB9BA3", "禁用边框"],
    ["brand-5", "#F97883", "悬浮态"],
    ["brand-6 ★", "#F32F41", "主色"],
    ["brand-7", "#D92939", "点击态"],
    ["brand-8", "#BF2432", "强调"],
    ["brand-9", "#991D28", "深色"],
    ["brand-10", "#73161E", "最深"],
    ["brand-aux-1", "#FFD5D9", "标签底"],
    ["brand-aux-2", "#FFF2F2", "业绩浅底"],
  ];

  const NEUTRAL_COLORS = [
    ["gray-1", "#F2F3F5", "页面背景"],
    ["gray-2", "#F7F8FA", "表头"],
    ["gray-3", "#E5E6EB", "边框"],
    ["gray-6", "#86909C", "次要"],
    ["gray-8", "#4E5969", "正文次要"],
    ["gray-10", "#1D2129", "标题"],
  ];

  const FUNC_COLORS = [
    { name: "Success", light: "#E8FFEA", main: "#00B42A", dark: "#009A29" },
    { name: "Warning", light: "#FFF7E8", main: "#FF7D00", dark: "#D25F00" },
    { name: "Error", light: "#FFECE8", main: "#F53F3F", dark: "#CB2634" },
    { name: "Info", light: "#E8F3FF", main: "#165DFF", dark: "#0E42D2" },
  ];

  const LAYOUT_TOKENS = [
    ["220px", "侧栏展开"],
    ["48px", "侧栏折叠"],
    ["60px", "顶栏高度"],
    ["24px", "内容区内边距"],
    ["40px", "表格行高"],
    ["32px", "按钮/输入框"],
  ];

  const SPACERS = [
    [4, "size-1"],
    [8, "size-2"],
    [12, "size-3"],
    [16, "size-4"],
    [20, "size-5"],
    [24, "size-6"],
    [32, "size-8"],
    [40, "size-10"],
  ];

  const RADIUS = [
    [2, "sm"],
    [4, "md"],
    [8, "lg"],
    [12, "xl"],
  ];

  const SHADOWS = [
    ["shadow-1", "0 1px 2px rgba(0,0,0,.06)", "卡片"],
    ["shadow-2", "0 4px 10px rgba(0,0,0,.08)", "下拉"],
    ["shadow-3", "0 8px 24px rgba(0,0,0,.12)", "弹窗"],
  ];

  const TABLE_DATA = [
    { id: "JL001", customer: "张女士", amount: "¥1,286.00", status: "待收银", statusClass: "tag--brand" },
    { id: "JL002", customer: "李先生", amount: "¥580.00", status: "已完成", statusClass: "tag--success" },
    { id: "JL003", customer: "王女士", amount: "¥2,040.50", status: "待审批", statusClass: "tag--brand" },
    { id: "JL004", customer: "赵先生", amount: "¥320.00", status: "已驳回", statusClass: "tag--error" },
    { id: "JL005", customer: "陈女士", amount: "¥890.00", status: "已完成", statusClass: "tag--success" },
  ];

  const TEMPLATES = {
    list: {
      title: "列表页",
      body: "<h4>列表页</h4><p>结构：顶栏面包屑 → 筛选区（Form 行内布局）→ 操作栏（新建/导出/批量）→ Table Card → Pagination。</p><ul><li>筛选默认收起次要条件</li><li>表格支持排序、多选、固定操作列</li><li>空状态居中 + 新建按钮</li></ul>",
    },
    detail: {
      title: "详情页",
      body: "<h4>详情页</h4><p>结构：顶栏标题 + 操作（编辑/作废）→ Descriptions 概览 → Tabs（订单明细/操作日志）。</p><ul><li>只读字段用 Cell 样式</li><li>子表嵌套在 Tab 内</li></ul>",
    },
    form: {
      title: "表单页",
      body: "<h4>表单页</h4><p>结构：Steps 或左侧 Anchor → 分组 Card（基础信息/业务信息/附件）→ 底栏固定提交。</p><ul><li>标签宽 100px 右对齐</li><li>长表单分步保存草稿</li></ul>",
    },
    dashboard: {
      title: "工作台",
      body: "<h4>工作台</h4><p>结构：Statistic KPI 行 → 快捷入口 Grid → 折线/柱状图表区 → 待办 Table。</p><ul><li>核心金额 TCloudNumber 24px</li><li>图表见「数据可视化」章节：营业额趋势、门店对比、目标 Gauge</li><li>支持时间粒度切换（7日/30日/季度）</li></ul>",
    },
  };

  let toastTimer;
  let currentPage = 1;
  const pageSize = 3;

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function showToast(msg, type = "") {
    const el = $("#toast");
    el.textContent = msg;
    el.className = "toast" + (type ? " toast--" + type : "");
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 2200);
  }

  window.showChartToast = showToast;

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("已复制：" + (text.length > 40 ? text.slice(0, 40) + "…" : text));
    } catch {
      showToast("复制失败，请手动选择", "error");
    }
  }

  function renderGlobalRules() {
    const box = $("#globalRules");
    box.innerHTML = GLOBAL_RULES.map(
      (r) =>
        `<div class="rule-item"><strong>${r.title}</strong><span>${r.text}</span></div>`
    ).join("");
  }

  function renderPalette(containerId, colors, darkTextFrom = 5) {
    const box = $(containerId);
    box.innerHTML = colors
      .map(([name, hex, desc], i) => {
        const dark = i >= darkTextFrom && !name.includes("gray");
        return `<div class="color-swatch" data-hex="${hex}" title="点击复制">
          <div class="color-swatch__block" style="background:${hex}"></div>
          <div class="color-swatch__meta">
            <strong>${name}</strong>
            <code>${hex}</code>
            <span style="color:var(--text-tertiary)">${desc}</span>
          </div>
        </div>`;
      })
      .join("");
    box.querySelectorAll(".color-swatch").forEach((el) => {
      el.addEventListener("click", () => copyText(el.dataset.hex));
    });
  }

  function renderFuncColors() {
    const box = $("#funcColors");
    box.innerHTML = FUNC_COLORS.map(
      (f) => `<div class="func-card" data-copy="${f.main}">
        <h4>${f.name}</h4>
        <div class="func-card__row">
          <div class="func-card__chip" style="background:${f.light}">浅</div>
          <div class="func-card__chip" style="background:${f.main};color:#fff">常规</div>
          <div class="func-card__chip" style="background:${f.dark};color:#fff">深</div>
        </div>
        <code style="font-size:11px;margin-top:8px;display:block">${f.main}</code>
      </div>`
    ).join("");
    box.querySelectorAll(".func-card").forEach((el) => {
      el.addEventListener("click", () => copyText(el.dataset.copy));
    });
  }

  function renderLayoutTokens() {
    $("#layoutTokens").innerHTML = LAYOUT_TOKENS.map(
      ([v, l]) => `<div class="layout-token"><strong>${v}</strong><span>${l}</span></div>`
    ).join("");
  }

  function renderSpacing() {
    const max = SPACERS[SPACERS.length - 1][0];
    $("#spacingRuler").innerHTML = SPACERS.map(
      ([px, token]) =>
        `<div class="space-bar">
          <span style="width:72px">${token}</span>
          <div class="space-bar__block" style="width:${(px / max) * 100}%"></div>
          <span>${px}px</span>
        </div>`
    ).join("");
  }

  function renderRadius() {
    $("#radiusDemo").innerHTML = RADIUS.map(
      ([px, name]) =>
        `<div class="radius-box" style="border-radius:${px}px"><strong>${px}px</strong><span>${name}</span></div>`
    ).join("");
  }

  function renderShadows() {
    $("#shadowDemo").innerHTML = SHADOWS.map(
      ([name, val, use]) =>
        `<div class="shadow-box" style="box-shadow:${val}"><strong>${name}</strong><span>${use}</span></div>`
    ).join("");
  }

  function renderTable() {
    const start = (currentPage - 1) * pageSize;
    const rows = TABLE_DATA.slice(start, start + pageSize);
    $("#demoTableBody").innerHTML = rows
      .map(
        (r) =>
          `<tr>
            <td><input type="checkbox" class="row-check" /></td>
            <td>${r.id}</td>
            <td>${r.customer}</td>
            <td class="amount-sm">${r.amount}</td>
            <td><span class="tag ${r.statusClass}">${r.status}</span></td>
            <td><button type="button" class="btn btn--text btn--sm">详情</button></td>
          </tr>`
      )
      .join("");

    const totalPages = Math.ceil(TABLE_DATA.length / pageSize);
    const pag = $("#demoPagination");
    let html = `<button type="button" data-p="prev" ${currentPage === 1 ? "disabled" : ""}>‹</button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button type="button" data-p="${i}" class="${i === currentPage ? "active" : ""}">${i}</button>`;
    }
    html += `<button type="button" data-p="next" ${currentPage === totalPages ? "disabled" : ""}>›</button>`;
    pag.innerHTML = html;
    pag.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = btn.dataset.p;
        if (p === "prev" && currentPage > 1) currentPage--;
        else if (p === "next" && currentPage < totalPages) currentPage++;
        else if (!isNaN(+p)) currentPage = +p;
        renderTable();
      });
    });
  }

  function initNav() {
    const links = document.querySelectorAll(".doc-nav a");
    const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => s && observer.observe(s));

    $("#navSearch")?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      links.forEach((a) => {
        const text = a.textContent.toLowerCase();
        a.classList.toggle("hidden", q && !text.includes(q));
      });
    });

    $("#mobileNavBtn")?.addEventListener("click", () => {
      $("#docSider").classList.toggle("is-open");
    });

    links.forEach((a) => {
      a.addEventListener("click", () => $("#docSider").classList.remove("is-open"));
    });
  }

  function initSiderDemo() {
    let collapsed = false;
    $("#toggleSiderDemo")?.addEventListener("click", () => {
      collapsed = !collapsed;
      $("#docSider").classList.toggle("is-collapsed", collapsed);
      const mini = document.querySelector(".mini-app");
      if (mini) mini.dataset.collapsed = collapsed ? "true" : "false";
      showToast(collapsed ? "侧栏已折叠（48px）" : "侧栏已展开（220px）");
    });
  }

  function initTabs() {
    const labels = { all: "全部", pending: "待处理", done: "已完成" };
    $("#demoTabs")?.querySelectorAll(".tabs__item").forEach((btn) => {
      btn.addEventListener("click", () => {
        $("#demoTabs").querySelectorAll(".tabs__item").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.dataset.tab;
        $("#tabsPanel").innerHTML = `当前筛选：<strong>${labels[key]}</strong> 订单`;
      });
    });
  }

  function initModalDrawer() {
    const modal = $("#modalOverlay");
    const drawer = $("#drawerOverlay");
    $("#openModal")?.addEventListener("click", () => {
      modal.hidden = false;
    });
    $("#closeModal")?.addEventListener("click", () => {
      modal.hidden = true;
    });
    $("#confirmModal")?.addEventListener("click", () => {
      modal.hidden = true;
      showToast("订单已作废", "error");
    });
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) modal.hidden = true;
    });

    $("#openDrawer")?.addEventListener("click", () => {
      drawer.hidden = false;
    });
    $("#closeDrawer")?.addEventListener("click", () => {
      drawer.hidden = true;
    });
    drawer?.addEventListener("click", (e) => {
      if (e.target === drawer) drawer.hidden = true;
    });
  }

  function initMessages() {
    document.querySelectorAll("[data-msg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.msg;
        const texts = {
          success: "操作成功",
          warning: "请完善必填项",
          error: "提交失败，请重试",
          info: "系统将在今晚 2:00 维护",
        };
        showToast(texts[type], type);
      });
    });
  }

  function initTemplates() {
    document.querySelectorAll("[data-template]").forEach((card) => {
      card.addEventListener("click", () => {
        document.querySelectorAll("[data-template]").forEach((c) => c.classList.remove("is-selected"));
        card.classList.add("is-selected");
        const t = TEMPLATES[card.dataset.template];
        $("#templateDetail").innerHTML = t.body;
      });
    });
  }

  const TOKEN_JSON_FALLBACK = `{
  "appName": "剑琅管家",
  "platform": "pc",
  "version": "1.0.0",
  "designCanvas": { "width": 1440, "height": 900, "minWidth": 1280 },
  "references": {
    "figmaArcoPro": "https://www.figma.com/design/YKaA4EkQ9bcVjeqvKY3tsA/",
    "mobileSpec": "https://xdean-designer.github.io/jianlang-design-spec/"
  },
  "brandTheme": {
    "color": {
      "brand6": "#F32F41",
      "primary": "#F32F41",
      "bgPage": "#F2F3F5",
      "bgContainer": "#FFFFFF",
      "border": "#E5E6EB",
      "textPrimary": "#1D2129",
      "textSecondary": "#4E5969",
      "success": "#00B42A",
      "warning": "#FF7D00",
      "error": "#F53F3F",
      "info": "#165DFF"
    },
    "layout": {
      "siderWidth": 220,
      "siderCollapsedWidth": 48,
      "headerHeight": 60,
      "contentPadding": 24,
      "tableRowHeight": 40,
      "buttonHeight": 32
    }
  }
}`;

  async function loadTokenJson() {
    const el = $("#tokenJson");
    try {
      const res = await fetch("tokens/design-tokens.json");
      if (res.ok) el.textContent = await res.text();
      else el.textContent = TOKEN_JSON_FALLBACK;
    } catch {
      el.textContent = TOKEN_JSON_FALLBACK;
    }
  }

  function initCopy() {
    loadTokenJson();

    $("#aiPrompt").textContent = AI_PROMPT;

    $("#copyAllTokens")?.addEventListener("click", () => {
      const text = $("#tokenJson").textContent;
      copyText(text);
    });
    $("#copyTokenBlock")?.addEventListener("click", () => copyText($("#tokenJson").textContent));
    $("#copyAiPrompt")?.addEventListener("click", () => copyText(AI_PROMPT));
  }

  function initCheckAll() {
    $("#checkAll")?.addEventListener("change", (e) => {
      document.querySelectorAll(".row-check").forEach((c) => {
        c.checked = e.target.checked;
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $("#modalOverlay").hidden = true;
      $("#drawerOverlay").hidden = true;
    }
  });

  renderGlobalRules();
  renderPalette("#brandPalette", BRAND_COLORS, 6);
  renderPalette("#neutralPalette", NEUTRAL_COLORS, 99);
  renderFuncColors();
  renderLayoutTokens();
  renderSpacing();
  renderRadius();
  renderShadows();
  renderTable();
  initNav();
  initSiderDemo();
  initTabs();
  initModalDrawer();
  initMessages();
  initTemplates();
  initCopy();
  initCheckAll();
})();
