const rawContent = window.TRAINING_KB_CONTENT || {};

const STAGE_BUCKETS = ["引流", "拉新", "留存", "复购"];
const STAGE_BUCKET_MAP = {
  认知: ["引流", "拉新", "留存", "复购"],
  引流: ["引流", "拉新"],
  朋友圈: ["留存", "复购"],
  社群: ["拉新", "留存", "复购"],
  私聊转化: ["拉新", "复购"],
  活动策划: ["引流", "拉新", "留存", "复购"],
  数据考核: ["引流", "拉新", "留存", "复购"],
  培训验收: ["引流", "拉新", "留存", "复购"],
  复购: ["复购"]
};

const TYPE_PRIORITY = {
  deepread: 90,
  chapter: 82,
  sop: 74,
  tool: 68,
  script: 62,
  case: 58,
  rawTable: 46,
  manual: 36,
  bundle: 34
};

const TYPE_LABELS = {
  deepread: "专题正文",
  chapter: "章节正文",
  sop: "实战 SOP",
  tool: "工具表",
  script: "话术",
  case: "案例",
  rawTable: "原始表格",
  manual: "完整手册",
  bundle: "打包资料"
};

const SEARCH_GROUP_LABELS = {
  core: "正文",
  sop: "SOP",
  tool: "工具",
  script: "话术",
  case: "案例",
  download: "下载资料"
};

const STAGE_GUIDES = {
  引流: {
    headline: "先把门店门口、人流触点、线上入口和活动入口都变成可承接的引流口。",
    summary: "这一板块先解决流量从哪里来、顾客为什么愿意停留、员工怎么把线索带入后续动作。重点不是做大活动，而是把高频引流点做成日常标准动作。",
    chain: ["门头触点", "收银触点", "线上入口", "福利设计", "导流承接", "日常记录"],
    order: ["先看板块总览和核心正文", "再按引流 SOP 布门头、收银台和活动入口", "再统一引流话术和工具表", "最后对照案例检查哪些触点还没跑通"],
    watchouts: ["门店有二维码，但顾客不知道为什么要扫。", "员工会喊关注，却不会把福利点说清楚。", "活动能带人，但没有进入后续承接链路。"],
    focus: ["先把门头、收银台、物料袋和朋友圈海报 4 个入口统一起来。", "先把引流动作写进店员晨会和收银流程。", "先盯扫码率、进群率、加好友率和活动到店率。", "先把自然流量吃透，再放大外部投放和异业合作。"]
  },
  拉新: {
    headline: "把进来的顾客稳定沉淀为新客资产，并完成首次触达和首次成交承接。",
    summary: "这一板块重点不是单纯加粉，而是让顾客从留资、加粉、入群、入会到首次下单形成连续动作。你要把新客接住，而不是只把新客拉进来。",
    chain: ["加粉动作", "欢迎承接", "标签备注", "新客分层", "首周触达", "首单转化"],
    order: ["先看新客承接正文", "再按新客 SOP 把欢迎语、备注和首周动作跑通", "再用工具和话术统一员工动作", "最后对照案例优化新客首单路径"],
    watchouts: ["只看新增数量，不看欢迎承接是否发出。", "新客进来后没有分层和后续触达。", "首单激励很多，但没有把服务和信任接上。"],
    focus: ["先统一 1 套欢迎语、1 套备注规则和 1 套首周跟进节奏。", "先让所有新客都能进入标签和分层。", "先盯新增人数、欢迎触达率、7 日首单率和新客流失率。", "先把新客路径跑顺，再扩更多入口。"]
  },
  留存: {
    headline: "让顾客留下来，持续看到门店、记得门店，并愿意继续互动。",
    summary: "这一板块重点是朋友圈、社群、会员内容和服务节奏，不是只靠促销刷存在感。你要让顾客持续看到价值、持续被提醒、持续愿意回应。",
    chain: ["朋友圈节奏", "社群互动", "会员内容", "服务提醒", "分层触达", "留存复盘"],
    order: ["先看留存正文，明确内容和服务节奏", "再按社群与朋友圈 SOP 排出每周节奏", "再用话术、题材表和检查表统一执行", "最后对照案例调整留存动作是否过硬"],
    watchouts: ["朋友圈只有促销，没有专业价值和生活感。", "群里只发优惠，不做互动和承接。", "顾客沉默后没有分层唤醒和售后提醒。"],
    focus: ["先固定每周朋友圈、社群和会员日节奏。", "先把到货提醒、售后回访、服务提醒标准化。", "先盯活跃率、打开率、互动率和沉默客户占比。", "先把留存做稳，再谈大规模复购放大。"]
  },
  复购: {
    headline: "把老客经营成稳定营业额，让客户愿意再次下单、加购和转介绍。",
    summary: "这一板块重点是围绕老客做节奏化经营，把活动、私聊、会员权益、售后回访和分层唤醒串起来，让复购成为可以被管理的结果。",
    chain: ["复购节点", "会员权益", "唤醒动作", "加购推荐", "服务回访", "复购复盘"],
    order: ["先看复购正文，明确老客经营链路", "再按会员日、唤醒和回访 SOP 执行", "再拿复购话术和工具表做动作追踪", "最后用案例校准复购节奏和力度"],
    watchouts: ["老客只有活动时才被想起来。", "复购动作只有打折，没有服务和关系设计。", "做了复购活动，但不记录周期和复购来源。"],
    focus: ["先盘清门店的老客、沉默客和高价值客。", "先把会员日、回访、加购推荐固定下来。", "先盯复购率、老客贡献占比、加购率和唤醒成功率。", "先把老客的节奏做稳，再扩大转介绍和裂变。"]
  }
};

const HOME_FLOW_CARDS = [
  {
    title: "先选组合",
    text: "先明确角色和当前需求，行业可选补充，系统再按你的情况给出最适合的内容，而不是把资料堆给你自己找。"
  },
  {
    title: "直接展开读",
    text: "进入后默认按总览、正文、行动指令、SOP、工具、话术、案例、下载资料的顺序展开，不用你再一层层点开。"
  },
  {
    title: "看完就执行",
    text: "每个板块都补动作指令、工具和案例，最后还会推荐你继续看哪些内容，方便边学边训边落地。"
  }
];

const HOME_HERO_CARDS = [
  {
    id: "hero-structure",
    title: "内容体系",
    getValue: (totals) => `${totals.core} 条核心正文`,
    detail: "章节正文与专题深读已经排好。"
  },
  {
    id: "hero-assets",
    title: "实操资料",
    getValue: (totals) => `${totals.sops + totals.tools + totals.scripts} 份 SOP / 工具 / 话术`,
    detail: "高频动作可直接落到 SOP、工具表和话术。"
  },
  {
    id: "hero-proof",
    title: "落地验证",
    getValue: (totals) => `${totals.cases} 个案例 · ${totals.downloads} 份下载资料`,
    detail: "案例、源表和资料可以直接对照。"
  }
];

const storageKeys = {
  selection: "training-kb-v2:selection",
  view: "training-kb-v2:view",
  search: "training-kb-v2:search",
  recent: "training-kb-v2:recent",
  lastJump: "training-kb-v2:last-jump"
};

const defaults = {
  roles: (rawContent.filters && rawContent.filters.roles) || ["老板", "店长", "店员"],
  industries: (rawContent.filters && rawContent.filters.industries) || ["零售", "餐饮", "美业", "母婴", "服务型门店"]
};

const model = buildModel(rawContent);

const FILTER_GROUPS = [
  {
    key: "role",
    label: "角色",
    hint: "先明确谁在看这套内容。",
    options: defaults.roles
  },
  {
    key: "stage",
    label: "当前需求",
    hint: "先选你现在最想解决的板块。",
    options: STAGE_BUCKETS
  },
  {
    key: "industry",
    label: "行业（可选）",
    hint: "不选也能进入，选了会更贴近你的门店。",
    options: defaults.industries
  }
];

const HOME_MODULES = [
  {
    id: "module-core",
    title: "章节学习",
    summary: "先系统读懂当前板块最该看的长篇正文和专题。",
    target: "core-section",
    countKey: "core",
    buttonLabel: "进入正文",
    scene: "适合先建立完整理解",
    points: ["先看当前板块里的主线方法。", "适合老板和店长系统读。"]
  },
  {
    id: "module-sop",
    title: "实战 SOP",
    summary: "按步骤执行，不靠店员临场发挥。",
    target: "sops-section",
    countKey: "sops",
    buttonLabel: "进入 SOP",
    scene: "适合直接带队执行",
    points: ["按顺序拆动作和验收。", "适合店长陪练与复盘。"]
  },
  {
    id: "module-tools",
    title: "工具表",
    summary: "表格、清单、排期表和追踪表直接拿去用。",
    target: "tools-section",
    countKey: "tools",
    buttonLabel: "进入工具",
    scene: "适合现场直接调用",
    points: ["能复制，也能下载源表。", "适合开会、培训、盯执行。"]
  },
  {
    id: "module-scripts",
    title: "话术库",
    summary: "把加粉、私聊、复购和活动表达直接讲清楚。",
    target: "scripts-section",
    countKey: "scripts",
    buttonLabel: "进入话术",
    scene: "适合统一门店表达",
    points: ["高频场景可直接改写。", "适合晨会和角色扮演训练。"]
  },
  {
    id: "module-cases",
    title: "案例库",
    summary: "用真实门店和品牌案例快速校准动作方向。",
    target: "cases-section",
    countKey: "cases",
    buttonLabel: "进入案例",
    scene: "适合借鉴和复盘",
    points: ["优先看同行业、同板块案例。", "适合老板快速判断打法。"]
  },
  {
    id: "module-downloads",
    title: "资料下载",
    summary: "源表、打包资料和完整手册都集中在一起。",
    target: "downloads-section",
    countKey: "downloads",
    buttonLabel: "进入下载",
    scene: "适合离线整理与交付",
    points: ["把高价值表格集中下载。", "适合培训前准备和二次修改。"]
  }
];

const state = {
  view: "home",
  role: "",
  stage: "",
  industry: "",
  search: "",
  lastJump: "",
  recentIds: [],
  openItems: new Set()
};

const els = {
  topbarHomeBtn: document.getElementById("topbarHomeBtn"),
  homeView: document.getElementById("homeView"),
  homeCounts: document.getElementById("homeCounts"),
  homeFilterPanel: document.getElementById("homeFilterPanel"),
  homeSelectionSummary: document.getElementById("homeSelectionSummary"),
  homeModuleGrid: document.getElementById("homeModuleGrid"),
  homeFlowGrid: document.getElementById("homeFlowGrid"),
  homeStartButton: document.getElementById("homeStartButton"),
  continueCard: document.getElementById("continueCard"),
  continueTitle: document.getElementById("continueTitle"),
  continueText: document.getElementById("continueText"),
  continueButton: document.getElementById("continueButton"),
  workspaceView: document.getElementById("workspaceView"),
  workspaceTitle: document.getElementById("workspaceTitle"),
  workspaceSummary: document.getElementById("workspaceSummary"),
  fallbackNote: document.getElementById("fallbackNote"),
  workspaceBackButton: document.getElementById("workspaceBackButton"),
  workspaceResetButton: document.getElementById("workspaceResetButton"),
  workspaceFilterPanel: document.getElementById("workspaceFilterPanel"),
  workspaceQuickTabs: document.getElementById("workspaceQuickTabs"),
  searchInput: document.getElementById("searchInput"),
  searchState: document.getElementById("searchState"),
  overviewGrid: document.getElementById("overviewGrid"),
  overviewNote: document.getElementById("overviewNote"),
  coreCards: document.getElementById("coreCards"),
  coreNote: document.getElementById("coreNote"),
  actionGrid: document.getElementById("actionGrid"),
  actionNote: document.getElementById("actionNote"),
  sopCards: document.getElementById("sopCards"),
  sopNote: document.getElementById("sopNote"),
  toolCards: document.getElementById("toolCards"),
  toolNote: document.getElementById("toolNote"),
  scriptCards: document.getElementById("scriptCards"),
  scriptNote: document.getElementById("scriptNote"),
  caseCards: document.getElementById("caseCards"),
  caseNote: document.getElementById("caseNote"),
  recommendCards: document.getElementById("recommendCards"),
  recommendNote: document.getElementById("recommendNote"),
  downloadCards: document.getElementById("downloadCards"),
  downloadNote: document.getElementById("downloadNote"),
  searchResults: document.getElementById("searchResults"),
  stageFocusList: document.getElementById("stageFocusList"),
  metricCards: document.getElementById("metricCards"),
  recentList: document.getElementById("recentList"),
  manualLinks: document.getElementById("manualLinks"),
  coreCount: document.getElementById("coreCount"),
  sopCount: document.getElementById("sopCount"),
  toolCount: document.getElementById("toolCount"),
  scriptCount: document.getElementById("scriptCount"),
  caseCount: document.getElementById("caseCount"),
  downloadCount: document.getElementById("downloadCount"),
  copyFallback: document.getElementById("copyFallback"),
  copyFallbackText: document.getElementById("copyFallbackText"),
  copyFallbackClose: document.getElementById("copyFallbackClose"),
  toast: document.getElementById("toast")
};

init();

function init() {
  hydrateState();
  bindEvents();
  renderApp();
}

function hydrateState() {
  const savedSelection = parseJson(localStorage.getItem(storageKeys.selection), {});
  state.role = savedSelection.role || "";
  state.stage = savedSelection.stage || "";
  state.industry = savedSelection.industry || "";
  state.view = localStorage.getItem(storageKeys.view) || "home";
  state.search = localStorage.getItem(storageKeys.search) || "";
  state.lastJump = localStorage.getItem(storageKeys.lastJump) || "";
  state.recentIds = parseJson(localStorage.getItem(storageKeys.recent), []);

  if (!defaults.roles.includes(state.role)) {
    state.role = "";
  }
  if (!STAGE_BUCKETS.includes(state.stage)) {
    state.stage = "";
  }
  if (state.industry && !defaults.industries.includes(state.industry)) {
    state.industry = "";
  }

  if (!isSelectionComplete()) {
    state.view = "home";
  }
}

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("toggle", handleAccordionToggle, true);

  els.homeStartButton.addEventListener("click", () => {
    if (!isSelectionComplete()) {
      showToast("请先完成角色和当前需求选择");
      return;
    }
    openWorkspace("overview-section");
  });

  els.continueButton.addEventListener("click", () => {
    if (!isSelectionComplete()) {
      return;
    }
    openWorkspace(state.lastJump || "overview-section");
  });

  els.workspaceBackButton.addEventListener("click", () => {
    state.view = "home";
    state.search = "";
    persistState();
    renderApp();
  });

  els.workspaceResetButton.addEventListener("click", () => {
    clearSelection();
    state.view = "home";
    state.search = "";
    persistState();
    renderApp();
  });

  els.topbarHomeBtn.addEventListener("click", () => {
    state.view = "home";
    state.search = "";
    persistState();
    renderApp();
  });

  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    persistState();
    if (state.view === "workspace") {
      renderWorkspace();
    }
  });

  els.copyFallbackClose.addEventListener("click", closeFallback);
}

function handleDocumentClick(event) {
  const homeFilter = event.target.closest("[data-home-filter-group]");
  if (homeFilter) {
    toggleSelection(homeFilter.dataset.homeFilterGroup, homeFilter.dataset.homeFilterValue);
    renderHome();
    return;
  }

  const workspaceFilter = event.target.closest("[data-filter-group]");
  if (workspaceFilter) {
    toggleSelection(workspaceFilter.dataset.filterGroup, workspaceFilter.dataset.filterValue);
    state.search = "";
    persistState();
    renderWorkspace();
    return;
  }

  const moduleButton = event.target.closest("[data-module-target]");
  if (moduleButton) {
    if (!isSelectionComplete()) {
      showToast("先完成角色和当前需求选择");
      return;
    }
    openWorkspace(moduleButton.dataset.moduleTarget);
    return;
  }

  const jumpButton = event.target.closest("[data-jump]");
  if (jumpButton) {
    jumpTo(jumpButton.dataset.jump);
    return;
  }

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    handleCopy(copyButton.dataset.copy, copyButton.dataset.id);
    return;
  }

  const recentButton = event.target.closest("[data-recent-id]");
  if (recentButton) {
    jumpTo(recentButton.dataset.recentId);
  }
}

function handleAccordionToggle(event) {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement) || !details.dataset.itemId) {
    return;
  }

  const itemId = details.dataset.itemId;
  if (details.open) {
    state.openItems.add(itemId);
  } else {
    state.openItems.delete(itemId);
  }
  persistState();
}

function renderApp() {
  if (state.view === "workspace" && isSelectionComplete()) {
    renderWorkspace();
    return;
  }
  renderHome();
}

function renderHome() {
  showView("home");
  els.homeCounts.innerHTML = HOME_HERO_CARDS.map((card) => `
    <article class="hero-stat-card">
      <span class="meta-pill">${escapeHtml(card.title)}</span>
      <strong>${escapeHtml(card.getValue(model.totals))}</strong>
      <p>${escapeHtml(card.detail)}</p>
    </article>
  `).join("");

  renderFilterPanel(els.homeFilterPanel, "home");

  const previewBundle = isSelectionComplete() ? buildBundle({
    role: state.role,
    stage: state.stage,
    industry: state.industry
  }) : null;

  els.homeSelectionSummary.textContent = buildHomeSelectionSummary(previewBundle);
  els.homeStartButton.disabled = !isSelectionComplete();
  els.homeStartButton.classList.toggle("is-disabled", !isSelectionComplete());
  els.homeStartButton.textContent = isSelectionComplete() ? "进入适合我的内容" : "先完成角色和需求";

  renderHomeModules(previewBundle);
  renderHomeFlow();
  renderContinueCard();
}

function renderWorkspace(target = "") {
  if (!isSelectionComplete()) {
    renderHome();
    return;
  }

  showView("workspace");
  els.searchInput.value = state.search;

  const bundle = buildBundle({
    role: state.role,
    stage: state.stage,
    industry: state.industry
  });

  const guide = STAGE_GUIDES[state.stage];
  const searchGroups = buildSearchGroups(bundle, state.search);
  const fallbackMessages = [bundle.note, buildSearchStateMessage(searchGroups)].filter(Boolean);

  els.workspaceTitle.textContent = [state.role, state.stage, state.industry].filter(Boolean).join(" · ");
  els.workspaceSummary.textContent = buildWorkspaceSummary(bundle, guide);
  renderFallbackNote(fallbackMessages);
  renderFilterPanel(els.workspaceFilterPanel, "workspace");
  renderQuickTabs(bundle);
  renderSectionNotes(bundle);
  renderOverview(bundle, guide);
  renderCore(bundle.core);
  renderActionPlan(bundle, guide);
  renderSops(bundle.sops);
  renderTools(bundle.tools);
  renderScripts(bundle.scripts);
  renderCases(bundle.cases);
  renderRecommendations(bundle);
  renderDownloads(bundle.downloads);
  renderSearchResults(searchGroups);
  renderStageFocus(guide);
  renderMetrics(guide);
  renderRecent();
  renderManualLinks();

  if (target) {
    window.requestAnimationFrame(() => jumpTo(target));
  }
}

function showView(nextView) {
  state.view = nextView;
  els.homeView.classList.toggle("hidden", nextView !== "home");
  els.workspaceView.classList.toggle("hidden", nextView !== "workspace");
  els.topbarHomeBtn.classList.toggle("hidden", nextView !== "workspace");
  persistState();
}

function renderFilterPanel(element, mode) {
  const attr = mode === "home" ? "data-home-filter-group" : "data-filter-group";
  const valueAttr = mode === "home" ? "data-home-filter-value" : "data-filter-value";

  element.innerHTML = FILTER_GROUPS.map((group) => `
    <section class="picker-card">
      <div class="picker-head">
        <div>
          <h4>${escapeHtml(group.label)}</h4>
          <p>${escapeHtml(group.hint)}</p>
        </div>
      </div>
      <div class="filter-chip-row">
        ${group.options.map((option) => `
          <button
            class="filter-chip${state[group.key] === option ? " is-active" : ""}"
            type="button"
            ${attr}="${group.key}"
            ${valueAttr}="${escapeAttr(option)}"
          >${escapeHtml(option)}</button>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function buildHomeSelectionSummary(bundle) {
  if (!isSelectionComplete()) {
    return "先完成角色和当前需求选择，系统就会先给你生成适合阅读的正文、行动指令、工具和案例。行业不选也能进入。";
  }

  const counts = [
    `${bundle.core.length} 条核心正文`,
    `${bundle.sops.length} 套 SOP`,
    `${bundle.tools.length} 个工具`,
    `${bundle.scripts.length} 组话术`,
    `${bundle.cases.length} 个案例`,
    `${bundle.downloads.length} 份下载资料`
  ];

  const parts = [state.role, state.stage, state.industry].filter(Boolean).join(" / ");
  const industryText = state.industry ? "" : " 当前未限定行业，会优先补充通用内容。";
  return `当前将为你生成 ${parts} 的专属阅读工作台，优先排出 ${counts.join("、")}。${industryText}`;
}

function renderHomeModules(bundle) {
  const counts = bundle ? {
    core: bundle.core.length,
    sops: bundle.sops.length,
    tools: bundle.tools.length,
    scripts: bundle.scripts.length,
    cases: bundle.cases.length,
    downloads: bundle.downloads.length
  } : model.totals;

  const items = HOME_MODULES.filter((module) => !bundle || counts[module.countKey] > 0);

  els.homeModuleGrid.innerHTML = items.map((module, index) => `
    <article class="module-card${isSelectionComplete() ? " is-clickable" : ""}">
      <div class="module-card-top">
        <span class="module-index">${String(index + 1).padStart(2, "0")}</span>
        <div class="module-meta">
          <span class="meta-pill">${escapeHtml(String(counts[module.countKey]))}</span>
          <span class="chip chip-soft">${escapeHtml(module.title)}</span>
        </div>
      </div>
      <h4>${escapeHtml(module.title)}</h4>
      <p>${escapeHtml(module.summary)}</p>
      <ul class="module-points">
        ${module.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
      </ul>
      <div class="module-footer">
        <p class="module-scene">${escapeHtml(module.scene)}</p>
        <button
          class="btn ${isSelectionComplete() ? "btn-secondary" : "btn-ghost"}"
          type="button"
          data-module-target="${module.target}"
        >${isSelectionComplete() ? `${escapeHtml(module.buttonLabel)} <span class="btn-inline-arrow">→</span>` : "先完成选择"}</button>
      </div>
    </article>
  `).join("");
}

function renderSectionNotes(bundle) {
  const industryLabel = state.industry ? `、${state.industry}` : "";
  els.overviewNote.textContent = `围绕 ${state.role} 在 ${state.stage}${industryLabel} 场景下最该先抓的目标、顺序和误区展开。`;
  els.coreNote.textContent = `${bundle.core.length} 条正文已按当前角色、需求和行业排序，进入后默认展开，方便连续阅读。`;
  els.actionNote.textContent = `这部分会把当前组合下最值得立刻执行的动作拆出来，方便你直接安排门店动作。`;
  els.sopNote.textContent = `${bundle.sops.length} 套 SOP 会优先展示更贴合当前需求的执行流程和验收动作。`;
  els.toolNote.textContent = `${bundle.tools.length} 个工具中会优先放出能直接复制和下载的高价值表格。`;
  els.scriptNote.textContent = `${bundle.scripts.length} 组话术已按当前需求筛过，适合直接拿去训练店员。`;
  els.caseNote.textContent = bundle.cases.length
    ? `${bundle.cases.length} 个案例会优先展示更贴近当前组合的做法与结果。`
    : "";
  els.recommendNote.textContent = "看完这一轮后，可以顺着这里继续补正文、工具或案例，不需要重新找。";
  els.downloadNote.textContent = `${bundle.downloads.length} 份资料已经集中到这里，方便培训前下载和离线整理。`;
}

function renderHomeFlow() {
  els.homeFlowGrid.innerHTML = HOME_FLOW_CARDS.map((card, index) => `
    <article class="flow-card">
      <span class="flow-step">${String(index + 1).padStart(2, "0")}</span>
      <h4>${escapeHtml(card.title)}</h4>
      <p>${escapeHtml(card.text)}</p>
    </article>
  `).join("");
}

function renderContinueCard() {
  if (!isSelectionComplete()) {
    els.continueCard.classList.add("hidden");
    return;
  }

  els.continueCard.classList.remove("hidden");
  els.continueTitle.textContent = `${state.role} · ${state.stage} · ${state.industry}`;
  els.continueText.textContent = state.lastJump
    ? `系统记住了你上次查看到 ${getTitleById(state.lastJump)}，也保留了最近使用过的工具和话术。`
    : "系统已保留你上次的选择组合，可继续进入当前需求的完整工作台。";
}

function buildWorkspaceSummary(bundle, guide) {
  const industryText = state.industry ? ` 已按 ${state.industry} 优先匹配相关案例和工具。` : " 当前未限定行业，已优先补充通用内容。";
  return `${guide.summary} 当前为你排出 ${bundle.core.length} 条核心正文、${bundle.sops.length} 套 SOP、${bundle.tools.length} 个工具、${bundle.scripts.length} 组话术、${bundle.cases.length} 个案例和 ${bundle.downloads.length} 份下载资料。${industryText}`;
}

function renderFallbackNote(messages) {
  if (!messages.length) {
    els.fallbackNote.classList.add("hidden");
    els.fallbackNote.textContent = "";
    return;
  }

  els.fallbackNote.classList.remove("hidden");
  els.fallbackNote.textContent = messages.join(" ");
}

function renderQuickTabs(bundle) {
  const tabs = [
    { id: "overview-section", label: "看总览", visible: true },
    { id: "core-section", label: "看正文", visible: bundle.core.length > 0 },
    { id: "action-section", label: "看动作", visible: true },
    { id: "sops-section", label: "看 SOP", visible: bundle.sops.length > 0 },
    { id: "tools-section", label: "看工具", visible: bundle.tools.length > 0 },
    { id: "scripts-section", label: "看话术", visible: bundle.scripts.length > 0 },
    { id: "cases-section", label: "看案例", visible: bundle.cases.length > 0 },
    { id: "recommend-section", label: "看延伸", visible: (bundle.core.length + bundle.tools.length + bundle.scripts.length + bundle.cases.length) > 2 },
    { id: "downloads-section", label: "看下载", visible: bundle.downloads.length > 0 }
  ].filter((item) => item.visible);

  els.workspaceQuickTabs.innerHTML = tabs.map((tab) => `
    <button class="quick-tab" type="button" data-jump="${tab.id}">${escapeHtml(tab.label)}</button>
  `).join("");
}

function renderOverview(bundle, guide) {
  els.overviewGrid.innerHTML = `
    <article class="overview-card">
      <span class="meta-pill">板块目标</span>
      <h4>${escapeHtml(guide.headline)}</h4>
      <p>${escapeHtml(guide.summary)}</p>
    </article>
    <article class="overview-card">
      <span class="meta-pill">动作主线</span>
      <ul class="plain-list">
        ${guide.chain.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
    <article class="overview-card">
      <span class="meta-pill">建议阅读顺序</span>
      <ul class="plain-list">
        ${guide.order.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
    <article class="overview-card">
      <span class="meta-pill">常见误区</span>
      <ul class="plain-list">
        ${guide.watchouts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderActionPlan(bundle, guide) {
  const stageMetrics = model.metrics.filter((metric) => metric.stageBuckets.includes(state.stage)).slice(0, 3);
  const primaryCore = bundle.core.find((item) => item.actionChecklist && item.actionChecklist.length) || bundle.core[0];
  const primarySop = bundle.sops[0];
  const primaryTool = bundle.tools[0];
  const primaryScript = bundle.scripts[0];
  const primaryCase = bundle.cases[0];
  const primaryDownload = bundle.downloads[0];

  const cards = [
    {
      title: "现在先做",
      label: "立即执行",
      items: (primaryCore && primaryCore.actionChecklist && primaryCore.actionChecklist.length
        ? primaryCore.actionChecklist
        : guide.focus
      ).slice(0, 4),
      links: primaryCore ? [{ id: primaryCore.id, label: "回到正文" }] : []
    },
    {
      title: "今天怎么带队做",
      label: "门店动作",
      items: primarySop
        ? primarySop.steps.slice(0, 3).map((step) => `${step.title}：${(step.items || [])[0] || "按 SOP 执行到位。"}`)
        : guide.order.slice(0, 3),
      links: primarySop ? [{ id: primarySop.id, label: "查看 SOP" }] : []
    },
    {
      title: "现场要拿什么工具",
      label: "工具配套",
      items: [
        primaryTool ? `先打开《${primaryTool.title}》，按今天门店情况先填一版。` : "",
        primaryScript ? `把《${primaryScript.title}》里的关键说法统一给团队。` : "",
        primaryDownload ? `需要培训或交付时，顺手下载《${primaryDownload.title}》备用。` : ""
      ].filter(Boolean),
      links: [
        primaryTool ? { id: primaryTool.id, label: "看工具" } : null,
        primaryScript ? { id: primaryScript.id, label: "看话术" } : null
      ].filter(Boolean)
    },
    {
      title: "验收与复盘",
      label: "结果检查",
      items: [
        ...stageMetrics.map((metric) => `${metric.title}：${metric.target || metric.detail || "作为当前板块结果盯盘。"}`),
        primaryCase ? `对照案例《${primaryCase.title}》，复盘本店还缺哪一步。` : ""
      ].filter(Boolean).slice(0, 4),
      links: primaryCase ? [{ id: primaryCase.id, label: "看案例" }] : []
    }
  ].filter((card) => card.items.length > 0);

  toggleSection("action-section", cards.length > 0);
  if (!cards.length) {
    return;
  }

  els.actionGrid.innerHTML = cards.map((card) => `
    <article class="action-card">
      <div class="module-meta">
        <span class="meta-pill">${escapeHtml(card.label)}</span>
      </div>
      <h4>${escapeHtml(card.title)}</h4>
      <ul class="plain-list">
        ${card.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      ${card.links.length ? `
        <div class="resource-pills">
          ${card.links.map((link) => `
            <button class="chip chip-soft" type="button" data-jump="${escapeAttr(link.id)}">${escapeHtml(link.label)}</button>
          `).join("")}
        </div>
      ` : ""}
    </article>
  `).join("");
}

function renderCore(items) {
  toggleSection("core-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.coreCount.textContent = `${items.length} 条`;
  els.coreCards.innerHTML = items.map((item, index) => renderCoreCard(item, index)).join("");
}

function renderSops(items) {
  toggleSection("sops-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.sopCount.textContent = `${items.length} 套`;
  els.sopCards.innerHTML = items.map((item, index) => renderSopCard(item, index)).join("");
}

function renderTools(items) {
  toggleSection("tools-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.toolCount.textContent = `${items.length} 个`;
  els.toolCards.innerHTML = items.map((item, index) => renderToolCard(item, index)).join("");
}

function renderScripts(items) {
  toggleSection("scripts-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.scriptCount.textContent = `${items.length} 组`;
  els.scriptCards.innerHTML = items.map((item, index) => renderScriptCard(item, index)).join("");
}

function renderCases(items) {
  toggleSection("cases-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.caseCount.textContent = `${items.length} 个`;
  els.caseCards.innerHTML = items.map((item, index) => renderCaseCard(item, index)).join("");
}

function renderRecommendations(bundle) {
  const picks = [
    ...bundle.core.slice(1, 4),
    ...bundle.tools.slice(0, 2),
    ...bundle.scripts.slice(0, 2),
    ...bundle.cases.slice(0, 2)
  ];

  const seen = new Set();
  const items = picks.filter((item) => {
    if (!item || seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  }).slice(0, 6);

  toggleSection("recommend-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.recommendCards.innerHTML = items.map((item) => `
    <article class="recommend-card">
      <div class="module-meta">
        <span class="meta-pill">${escapeHtml(TYPE_LABELS[item.contentType])}</span>
        ${renderContextBadges(item)}
      </div>
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.summary || item.overview || item.scenario || "")}</p>
      <button class="btn btn-secondary" type="button" data-jump="${escapeAttr(item.id)}">继续阅读</button>
    </article>
  `).join("");
}

function renderDownloads(items) {
  toggleSection("downloads-section", items.length > 0);
  if (!items.length) {
    return;
  }

  els.downloadCount.textContent = `${items.length} 份`;
  els.downloadCards.innerHTML = items.map((item) => `
    <article class="download-card" id="${item.id}">
      <div class="module-meta">
        <span class="meta-pill">${escapeHtml(TYPE_LABELS[item.contentType])}</span>
        ${item.sourceTag ? `<span class="chip chip-soft">${escapeHtml(item.sourceTag)}</span>` : ""}
      </div>
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.summary)}</p>
      ${item.previewUrl ? `
        <div class="preview-media">
          <img src="${escapeAttr(item.previewUrl)}" alt="${escapeAttr(item.title)} 预览图" loading="lazy">
        </div>
      ` : ""}
      <div class="card-actions">
        <a class="btn btn-secondary" href="${escapeAttr(encodeURI(item.downloadUrl))}" ${isExternalUrl(item.downloadUrl) ? 'target="_blank" rel="noreferrer"' : "download"}>${escapeHtml(item.actionLabel)}</a>
      </div>
    </article>
  `).join("");
}

function renderSearchResults(groups) {
  if (!state.search) {
    els.searchResults.innerHTML = `<p class="search-placeholder">输入关键词后，这里会按正文、SOP、工具、话术、案例、下载资料分组返回结果。</p>`;
    return;
  }

  if (!groups.length) {
    els.searchResults.innerHTML = `<p class="search-placeholder">当前组合里没有命中该关键词，页面仍保持完整内容。</p>`;
    return;
  }

  els.searchResults.innerHTML = groups.map((group) => `
    <section class="search-group">
      <p class="search-group-title">${escapeHtml(group.label)}</p>
      <div class="search-group-list">
        ${group.items.map((item) => `
          <button class="search-result-btn" type="button" data-jump="${item.id}">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.summary)}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function renderStageFocus(guide) {
  els.stageFocusList.innerHTML = `
    <ul class="plain-list">
      ${guide.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderMetrics(guide) {
  const metrics = model.metrics.filter((metric) => metric.stageBuckets.includes(state.stage)).slice(0, 4);
  const items = metrics.length ? metrics : [{
    title: "当前板块目标",
    target: guide.headline,
    detail: guide.summary
  }];

  els.metricCards.innerHTML = items.map((metric) => `
    <article class="metric-card">
      <strong>${escapeHtml(metric.title)}</strong>
      <p>${escapeHtml(metric.detail)}</p>
      <span class="chip chip-soft">${escapeHtml(metric.target)}</span>
    </article>
  `).join("");
}

function renderRecent() {
  if (!state.recentIds.length) {
    els.recentList.innerHTML = `<p class="search-placeholder">最近展开或复制过的工具、话术、SOP 会显示在这里。</p>`;
    return;
  }

  const items = state.recentIds
    .map((id) => model.lookup.get(id))
    .filter(Boolean)
    .slice(0, 6);

  els.recentList.innerHTML = items.map((item) => `
    <button class="search-result-btn" type="button" data-recent-id="${item.id}">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(TYPE_LABELS[item.contentType])} · ${escapeHtml(item.summary)}</span>
    </button>
  `).join("");
}

function renderManualLinks() {
  const items = [];
  if (model.bundleDownload) {
    items.push(model.bundleDownload);
  }
  items.push(...model.manuals);

  els.manualLinks.innerHTML = items.map((item) => `
    <article class="manual-card">
      <div class="module-meta">
        <span class="meta-pill">${escapeHtml(TYPE_LABELS[item.contentType])}</span>
      </div>
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.summary)}</p>
      <a class="btn btn-secondary" href="${escapeAttr(encodeURI(item.downloadUrl))}" ${isExternalUrl(item.downloadUrl) ? 'target="_blank" rel="noreferrer"' : "download"}>${escapeHtml(item.actionLabel)}</a>
    </article>
  `).join("");
}

function renderCoreCard(item, index) {
  const isOpen = true;
  const summary = item.contentType === "deepread" ? item.summary : item.overview;

  return `
    <details class="accordion" id="${item.id}" data-item-id="${item.id}" data-type="${item.contentType}" ${isOpen ? "open" : ""}>
      <summary>
        <div class="accordion-summary">
          <div class="accordion-title">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(summary)}</p>
          </div>
          <div class="summary-meta">
            <span class="meta-pill">${escapeHtml(TYPE_LABELS[item.contentType])}</span>
            ${item.sourceManual ? `<span class="chip chip-soft">${escapeHtml(item.sourceManual)}</span>` : ""}
            ${item.contentType === "chapter" ? `<span class="chip">${escapeHtml(item.legacyStages[0] || state.stage)}</span>` : ""}
            ${renderContextBadges(item)}
          </div>
        </div>
      </summary>
      <div class="accordion-body body-grid">
        ${item.sections.map((section) => `
          <article class="chapter-block">
            <h5>${escapeHtml(section.title)}</h5>
            ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
            ${(section.bullets && section.bullets.length) ? `
              <ul class="plain-list">
                ${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
              </ul>
            ` : ""}
          </article>
        `).join("")}
        ${(item.actionChecklist && item.actionChecklist.length) ? `
          <article class="support-card">
            <h5>建议先做的动作</h5>
            <ul class="plain-list">
              ${item.actionChecklist.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
            </ul>
          </article>
        ` : ""}
        ${(item.managerChecklist && item.managerChecklist.length) ? `
          <article class="support-card">
            <h5>店长检查表</h5>
            <ul class="plain-list">
              ${item.managerChecklist.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
            </ul>
          </article>
        ` : ""}
        ${renderRelatedResources(item)}
        <div class="card-actions">
          <button class="btn btn-ghost" type="button" data-copy="${item.contentType}" data-id="${item.id}">复制内容</button>
          ${item.manualFile ? `<a class="btn btn-secondary" href="${escapeAttr(encodeURI(item.manualFile))}" target="_blank" rel="noreferrer">打开原手册</a>` : ""}
        </div>
      </div>
    </details>
  `;
}

function renderSopCard(item, index) {
  const isOpen = true;
  return `
    <details class="accordion" id="${item.id}" data-item-id="${item.id}" data-type="${item.contentType}" ${isOpen ? "open" : ""}>
      <summary>
        <div class="accordion-summary">
          <div class="accordion-title">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.summary)}</p>
          </div>
          <div class="summary-meta">
            <span class="meta-pill">${escapeHtml(item.timeCost || "实战 SOP")}</span>
            ${item.legacyStages.map((stage) => `<span class="chip">${escapeHtml(stage)}</span>`).join("")}
            ${renderContextBadges(item)}
          </div>
        </div>
      </summary>
      <div class="accordion-body body-grid">
        <div class="support-grid">
          ${item.trigger ? `
            <article class="support-card">
              <h5>何时启动</h5>
              <p>${escapeHtml(item.trigger)}</p>
            </article>
          ` : ""}
          ${item.owner ? `
            <article class="support-card">
              <h5>谁负责</h5>
              <p>${escapeHtml(item.owner)}</p>
            </article>
          ` : ""}
          ${item.watchouts && item.watchouts.length ? `
            <article class="support-card">
              <h5>常见误区</h5>
              <ul class="plain-list">
                ${item.watchouts.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
              </ul>
            </article>
          ` : ""}
          ${item.successMetrics && item.successMetrics.length ? `
            <article class="support-card">
              <h5>要盯哪些数字</h5>
              <ul class="plain-list">
                ${item.successMetrics.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
              </ul>
            </article>
          ` : ""}
        </div>
        ${item.steps.map((step) => `
          <article class="chapter-block">
            <h5>${escapeHtml(step.title)}</h5>
            <ul class="plain-list">
              ${step.items.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
            </ul>
          </article>
        `).join("")}
        ${(item.deliverables && item.deliverables.length) ? `
          <article class="support-card">
            <h5>输出物</h5>
            <ul class="plain-list">
              ${item.deliverables.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
            </ul>
          </article>
        ` : ""}
        ${(item.acceptance && item.acceptance.length) ? `
          <article class="support-card">
            <h5>验收标准</h5>
            <ul class="plain-list">
              ${item.acceptance.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}
            </ul>
          </article>
        ` : ""}
        <div class="card-actions">
          <button class="btn btn-ghost" type="button" data-copy="sop" data-id="${item.id}">复制 SOP</button>
        </div>
      </div>
    </details>
  `;
}

function renderToolCard(item, index) {
  const isOpen = true;
  const relatedTitle = item.relatedChapter ? getTitleById(item.relatedChapter) : "";
  return `
    <details class="accordion" id="${item.id}" data-item-id="${item.id}" data-type="${item.contentType}" ${isOpen ? "open" : ""}>
      <summary>
        <div class="accordion-summary">
          <div class="accordion-title">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.summary)}</p>
          </div>
          <div class="summary-meta">
            <span class="meta-pill">${escapeHtml(getToolModeLabel(item.downloadMode))}</span>
            ${relatedTitle ? `<span class="chip chip-soft">${escapeHtml(relatedTitle)}</span>` : ""}
            ${renderContextBadges(item)}
          </div>
        </div>
      </summary>
      <div class="accordion-body body-grid">
        <article class="chapter-block">
          ${item.table ? renderTable(item.table.columns, item.table.rows) : ""}
          ${(item.notes && item.notes.length) ? `
            <ul class="plain-list">
              ${item.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
            </ul>
          ` : ""}
        </article>
        ${item.previewUrl ? `
          <div class="preview-media">
            <img src="${escapeAttr(item.previewUrl)}" alt="${escapeAttr(item.title)} 预览图" loading="lazy">
          </div>
        ` : ""}
        <div class="card-actions">
          ${item.downloadMode !== "read-only" ? `<button class="btn btn-ghost" type="button" data-copy="tool" data-id="${item.id}">复制内容</button>` : ""}
          ${item.downloadMode === "download" ? `<a class="btn btn-secondary" href="${escapeAttr(encodeURI(item.downloadUrl))}" download>下载源表</a>` : ""}
        </div>
      </div>
    </details>
  `;
}

function renderScriptCard(item, index) {
  const isOpen = true;
  const relatedTitle = item.relatedChapter ? getTitleById(item.relatedChapter) : "";
  return `
    <details class="accordion" id="${item.id}" data-item-id="${item.id}" data-type="${item.contentType}" ${isOpen ? "open" : ""}>
      <summary>
        <div class="accordion-summary">
          <div class="accordion-title">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.summary)}</p>
          </div>
          <div class="summary-meta">
            <span class="meta-pill">可复制话术</span>
            ${relatedTitle ? `<span class="chip chip-soft">${escapeHtml(relatedTitle)}</span>` : ""}
            ${renderContextBadges(item)}
          </div>
        </div>
      </summary>
      <div class="accordion-body body-grid">
        <article class="chapter-block">
          <h5>适用场景</h5>
          <p>${escapeHtml(item.scenario)}</p>
        </article>
        <article class="chapter-block">
          <h5>推荐说法</h5>
          <ul class="plain-list">
            ${(item.lines || []).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </article>
        ${(item.tips && item.tips.length) ? `
          <article class="support-card">
            <h5>使用提醒</h5>
            <ul class="plain-list">
              ${item.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
            </ul>
          </article>
        ` : ""}
        <div class="card-actions">
          <button class="btn btn-ghost" type="button" data-copy="script" data-id="${item.id}">复制话术</button>
        </div>
      </div>
    </details>
  `;
}

function renderCaseCard(item, index) {
  const isOpen = true;
  return `
    <details class="accordion" id="${item.id}" data-item-id="${item.id}" data-type="${item.contentType}" ${isOpen ? "open" : ""}>
      <summary>
        <div class="accordion-summary">
          <div class="accordion-title">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.scenario)}</p>
          </div>
          <div class="summary-meta">
            <span class="meta-pill">${escapeHtml(item.industry || item.industries[0] || state.industry)}</span>
            ${item.sourceTag ? `<span class="chip chip-soft">${escapeHtml(item.sourceTag)}</span>` : ""}
            ${renderContextBadges(item)}
          </div>
        </div>
      </summary>
      <div class="accordion-body body-grid">
        <article class="chapter-block">
          <h5>做法</h5>
          <ul class="plain-list">
            ${(item.approach || []).map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
          </ul>
        </article>
        <article class="chapter-block">
          <h5>结果</h5>
          <ul class="plain-list">
            ${(item.results || []).map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
          </ul>
        </article>
        <article class="chapter-block">
          <h5>可复用点</h5>
          <ul class="plain-list">
            ${(item.reusable || []).map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
          </ul>
        </article>
        <div class="card-actions">
          <button class="btn btn-ghost" type="button" data-copy="case" data-id="${item.id}">复制案例</button>
          ${item.source && isExternalUrl(item.source.url) ? `<a class="btn btn-secondary" href="${escapeAttr(item.source.url)}" target="_blank" rel="noreferrer">查看来源</a>` : ""}
        </div>
      </div>
    </details>
  `;
}

function renderRelatedResources(item) {
  const ids = [];
  if (item.relatedResources && item.relatedResources.length) {
    ids.push(...item.relatedResources);
  }
  if (item.recommendedTools && item.recommendedTools.length) {
    ids.push(...item.recommendedTools);
  }
  if (item.recommendedCases && item.recommendedCases.length) {
    ids.push(...item.recommendedCases);
  }

  if (!ids.length) {
    return "";
  }

  const uniqueIds = [...new Set(ids)].filter((id) => model.lookup.has(id));
  if (!uniqueIds.length) {
    return "";
  }

  return `
    <article class="support-card">
      <h5>相关资源</h5>
      <div class="resource-pills">
        ${uniqueIds.map((id) => `
          <button class="chip chip-soft" type="button" data-jump="${escapeAttr(id)}">
            ${escapeHtml(getTitleById(id))}
          </button>
        `).join("")}
      </div>
    </article>
  `;
}

function renderContextBadges(item) {
  const badges = [];

  if (item.roles && item.roles.includes(state.role)) {
    badges.push(`适合${state.role}`);
  }
  if (item.stageBuckets && item.stageBuckets.includes(state.stage)) {
    badges.push(`${state.stage}优先`);
  }
  if (item.industries && item.industries.includes(state.industry)) {
    badges.push(`${state.industry}匹配`);
  }

  return badges.slice(0, 2).map((label) => `<span class="chip chip-match">${escapeHtml(label)}</span>`).join("");
}

function buildBundle(selection) {
  const scenarios = [
    {
      role: selection.role,
      industry: selection.industry,
      note: ""
    },
    {
      role: "",
      industry: selection.industry,
      note: "已补充当前板块的同业态通用内容。"
    },
    {
      role: selection.role,
      industry: "",
      note: "已补充当前板块的同角色通用内容。"
    },
    {
      role: "",
      industry: "",
      note: "已补充当前板块通用内容。"
    }
  ];

  for (const scenario of scenarios) {
    const bundle = collectBundle({
      role: scenario.role,
      stage: selection.stage,
      industry: scenario.industry
    });
    if (isUsableBundle(bundle)) {
      return {
        ...bundle,
        note: scenario.note
      };
    }
  }

  return {
    ...collectBundle({
      role: "",
      stage: selection.stage,
      industry: ""
    }),
    note: "已补充当前板块通用内容。"
  };
}

function collectBundle(selection) {
  const deepReads = queryItems(model.itemsByType.deepread, selection);
  const chapters = queryItems(model.itemsByType.chapter, selection);
  const sops = queryItems(model.itemsByType.sop, selection);
  const tools = queryItems(model.itemsByType.tool, selection);
  const scripts = queryItems(model.itemsByType.script, selection);
  const cases = queryItems(model.itemsByType.case, selection);
  const rawTables = queryItems(model.itemsByType.rawTable, selection);
  const core = [...deepReads, ...chapters].sort((a, b) => scoreItem(b, selection) - scoreItem(a, selection));
  const downloads = buildDownloads(selection, tools, rawTables);

  return {
    deepReads,
    chapters,
    core,
    sops,
    tools,
    scripts,
    cases,
    rawTables,
    downloads
  };
}

function buildDownloads(selection, tools, rawTables) {
  const items = [];
  const seen = new Set();

  const push = (item) => {
    if (!item || !item.downloadUrl || seen.has(item.downloadUrl)) {
      return;
    }
    seen.add(item.downloadUrl);
    items.push(item);
  };

  if (model.bundleDownload) {
    push(model.bundleDownload);
  }

  model.manuals
    .filter((item) => item.stageBuckets.includes(selection.stage))
    .forEach(push);

  tools
    .filter((item) => item.downloadMode === "download")
    .forEach((item) => push({
      id: `download-${item.id}`,
      title: item.title,
      summary: item.summary,
      contentType: "tool",
      downloadUrl: item.downloadUrl,
      previewUrl: item.previewUrl,
      sourceTag: "源表可下载",
      actionLabel: "下载源表",
      priority: item.priority
    }));

  rawTables.forEach((item) => push({
    id: `download-${item.id}`,
    title: item.title,
    summary: item.summary,
    contentType: "rawTable",
    downloadUrl: item.downloadUrl,
    previewUrl: item.previewUrl,
    sourceTag: "原始表格",
    actionLabel: "下载表格",
    priority: item.priority
  }));

  return items.sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.title.localeCompare(b.title, "zh-CN"));
}

function queryItems(items, selection) {
  return items
    .filter((item) => matchesSelection(item, selection))
    .sort((a, b) => scoreItem(b, selection) - scoreItem(a, selection));
}

function matchesSelection(item, selection) {
  if (selection.stage && !item.stageBuckets.includes(selection.stage)) {
    return false;
  }
  if (selection.role && item.roles && !item.roles.includes(selection.role)) {
    return false;
  }
  if (selection.industry && item.industries && !item.industries.includes(selection.industry)) {
    return false;
  }
  return true;
}

function scoreItem(item, selection) {
  let score = item.priority || 0;
  if (selection.stage && item.stageBuckets.includes(selection.stage)) score += 28;
  if (selection.role && item.roles.includes(selection.role)) score += 18;
  if (selection.industry && item.industries.includes(selection.industry)) score += 18;
  if (item.contentType === "deepread") score += 8;
  if (item.contentType === "chapter") score += 4;
  return score;
}

function isUsableBundle(bundle) {
  const actionable = bundle.sops.length + bundle.tools.length + bundle.scripts.length + bundle.cases.length + bundle.downloads.length;
  return bundle.core.length > 0 && actionable > 0;
}

function buildSearchGroups(bundle, query) {
  if (!query) {
    return [];
  }

  const keyword = normalizeText(query);
  const items = [
    ...bundle.core.map((item) => ({ ...item, searchGroup: "core" })),
    ...bundle.sops.map((item) => ({ ...item, searchGroup: "sop" })),
    ...bundle.tools.map((item) => ({ ...item, searchGroup: "tool" })),
    ...bundle.scripts.map((item) => ({ ...item, searchGroup: "script" })),
    ...bundle.cases.map((item) => ({ ...item, searchGroup: "case" })),
    ...bundle.downloads.map((item) => ({ ...item, searchGroup: "download", searchText: buildSearchText(item) }))
  ]
    .filter((item) => normalizeText(item.searchText || "").includes(keyword))
    .sort((a, b) => searchScore(b, keyword) - searchScore(a, keyword))
    .slice(0, 16);

  const grouped = new Map();
  items.forEach((item) => {
    const key = item.searchGroup;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(item);
  });

  return [...grouped.entries()].map(([key, entries]) => ({
    key,
    label: SEARCH_GROUP_LABELS[key],
    items: entries
  }));
}

function searchScore(item, keyword) {
  let score = 0;
  const title = normalizeText(item.title);
  const summary = normalizeText(item.summary || item.overview || "");
  if (title.includes(keyword)) score += 24;
  if (summary.includes(keyword)) score += 10;
  if (normalizeText(item.searchText || "").includes(keyword)) score += 6;
  return score + (item.priority || 0);
}

function buildSearchStateMessage(groups) {
  if (!state.search) {
    els.searchState.textContent = "当前显示的是该组合下的完整内容。";
    return "";
  }

  if (!groups.length) {
    els.searchState.textContent = `关键词“${state.search}”未命中当前组合，页面仍保持完整内容。`;
    return "";
  }

  const count = groups.reduce((sum, group) => sum + group.items.length, 0);
  els.searchState.textContent = `关键词“${state.search}”命中 ${count} 条结果，可直接点右侧结果跳到对应模块。`;
  return "";
}

function toggleSection(id, visible) {
  const section = document.getElementById(id);
  if (!section) {
    return;
  }
  section.classList.toggle("hidden", !visible);
}

function toggleSelection(key, value) {
  state[key] = state[key] === value ? "" : value;
  persistState();
}

function isSelectionComplete() {
  return Boolean(state.role && state.stage);
}

function clearSelection() {
  state.role = "";
  state.stage = "";
  state.industry = "";
  state.lastJump = "";
  state.openItems = new Set();
}

function openWorkspace(target) {
  state.view = "workspace";
  persistState();
  renderWorkspace(target);
}

function jumpTo(id) {
  if (!id) {
    return;
  }

  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  if (element instanceof HTMLDetailsElement) {
    element.open = true;
    state.openItems.add(id);
  }

  state.lastJump = id;
  const item = model.lookup.get(id);
  if (item && shouldTrackRecent(item.contentType)) {
    pushRecent(id);
  } else {
    persistState();
  }
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function handleCopy(type, id) {
  const item = model.lookup.get(id);
  if (!item) {
    return;
  }

  const serializers = {
    chapter: serializeChapter,
    deepread: serializeDeepRead,
    sop: serializeSop,
    tool: serializeTool,
    script: serializeScript,
    case: serializeCase
  };

  const serializer = serializers[type];
  if (!serializer) {
    return;
  }

  const text = serializer(item);

  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制到剪贴板");
    if (shouldTrackRecent(type)) {
      pushRecent(id);
    }
  } catch (error) {
    els.copyFallbackText.value = text;
    els.copyFallback.classList.remove("hidden");
  }
}

function shouldTrackRecent(type) {
  return ["tool", "script", "sop", "deepread", "chapter"].includes(type);
}

function pushRecent(id) {
  state.recentIds = [id, ...state.recentIds.filter((item) => item !== id)].slice(0, 8);
  persistState();
  renderRecent();
}

function closeFallback() {
  els.copyFallback.classList.add("hidden");
  els.copyFallbackText.value = "";
}

function serializeChapter(item) {
  const lines = [item.title, item.overview, ""];
  item.sections.forEach((section) => {
    lines.push(section.title);
    (section.paragraphs || []).forEach((paragraph) => lines.push(paragraph));
    (section.bullets || []).forEach((bullet) => lines.push(`- ${bullet}`));
    lines.push("");
  });
  if (item.actionChecklist && item.actionChecklist.length) {
    lines.push("建议先做的动作");
    item.actionChecklist.forEach((value) => lines.push(`- ${value}`));
    lines.push("");
  }
  if (item.managerChecklist && item.managerChecklist.length) {
    lines.push("店长检查表");
    item.managerChecklist.forEach((value) => lines.push(`- ${value}`));
  }
  return lines.join("\n");
}

function serializeDeepRead(item) {
  const lines = [item.title, item.summary, item.sourceManual ? `来源：${item.sourceManual}` : "", ""].filter(Boolean);
  item.sections.forEach((section) => {
    lines.push(section.title);
    (section.paragraphs || []).forEach((paragraph) => lines.push(paragraph));
    (section.bullets || []).forEach((bullet) => lines.push(`- ${bullet}`));
    lines.push("");
  });
  if (item.actionChecklist && item.actionChecklist.length) {
    lines.push("建议先做的动作");
    item.actionChecklist.forEach((value) => lines.push(`- ${value}`));
  }
  return lines.join("\n");
}

function serializeSop(item) {
  const lines = [item.title, item.summary, item.timeCost ? `时间：${item.timeCost}` : "", ""].filter(Boolean);
  if (item.trigger) lines.push(`何时启动：${item.trigger}`);
  if (item.owner) lines.push(`谁负责：${item.owner}`);
  if (item.trigger || item.owner) lines.push("");
  item.steps.forEach((step) => {
    lines.push(step.title);
    step.items.forEach((entry) => lines.push(`- ${entry}`));
    lines.push("");
  });
  if (item.deliverables && item.deliverables.length) {
    lines.push("输出物");
    item.deliverables.forEach((entry) => lines.push(`- ${entry}`));
    lines.push("");
  }
  if (item.acceptance && item.acceptance.length) {
    lines.push("验收标准");
    item.acceptance.forEach((entry) => lines.push(`- ${entry}`));
  }
  return lines.join("\n");
}

function serializeTool(item) {
  const lines = [item.title, item.summary, ""];
  if (item.table) {
    lines.push(item.table.columns.join(" | "));
    item.table.rows.forEach((row) => lines.push(row.join(" | ")));
    lines.push("");
  }
  (item.notes || []).forEach((note) => lines.push(`- ${note}`));
  return lines.join("\n");
}

function serializeScript(item) {
  const lines = [item.title, item.summary, `适用场景：${item.scenario}`, ""];
  (item.lines || []).forEach((line) => lines.push(`- ${line}`));
  if (item.tips && item.tips.length) {
    lines.push("");
    lines.push("使用提醒");
    item.tips.forEach((tip) => lines.push(`- ${tip}`));
  }
  return lines.join("\n");
}

function serializeCase(item) {
  const lines = [item.title, item.scenario, ""];
  lines.push("做法");
  (item.approach || []).forEach((value) => lines.push(`- ${value}`));
  lines.push("");
  lines.push("结果");
  (item.results || []).forEach((value) => lines.push(`- ${value}`));
  lines.push("");
  lines.push("可复用点");
  (item.reusable || []).forEach((value) => lines.push(`- ${value}`));
  if (item.source) {
    lines.push("");
    lines.push(`来源：${item.source.label}`);
    lines.push(item.source.url);
  }
  return lines.join("\n");
}

function buildModel(content) {
  const itemsByType = {
    chapter: normalizeCollection(content.chapters || [], "chapter"),
    deepread: normalizeCollection(content.deepReads || [], "deepread"),
    sop: normalizeCollection(content.sops || [], "sop"),
    tool: normalizeCollection(content.tools || [], "tool"),
    script: normalizeCollection(content.scripts || [], "script"),
    case: normalizeCollection(content.cases || [], "case"),
    rawTable: normalizeCollection(content.rawTables || [], "rawTable")
  };

  const lookup = new Map();
  Object.values(itemsByType).flat().forEach((item) => lookup.set(item.id, item));

  const manuals = buildManualDownloads(content, itemsByType.deepread);
  const bundleDownload = content.rawTableBundle ? {
    id: "bundle-all-raw-tables",
    title: "原始表格打包资料",
    summary: "完整打包下载，适合离线修改、内部培训和二次交付。",
    contentType: "bundle",
    downloadUrl: content.rawTableBundle,
    actionLabel: "下载打包资料",
    stageBuckets: STAGE_BUCKETS.slice(),
    priority: TYPE_PRIORITY.bundle
  } : null;

  const totals = {
    core: itemsByType.chapter.length + itemsByType.deepread.length,
    sops: itemsByType.sop.length,
    tools: itemsByType.tool.length,
    scripts: itemsByType.script.length,
    cases: itemsByType.case.length,
    downloads: (bundleDownload ? 1 : 0) + manuals.length + itemsByType.rawTable.length + itemsByType.tool.filter((item) => item.downloadMode === "download").length
  };

  return {
    itemsByType,
    lookup,
    manuals,
    bundleDownload,
    totals,
    metrics: normalizeMetrics(content.metrics || [])
  };
}

function normalizeCollection(items, type) {
  return items.map((item) => normalizeItem(item, type));
}

function normalizeItem(item, type) {
  const legacyStages = [...new Set((item.stages || (item.stage ? [item.stage] : [])).filter(Boolean))];
  const stageBuckets = buildStageBuckets(legacyStages, item.needs || []);
  const summary = item.summary || item.overview || item.scenario || "";
  const downloadUrl = item.download || "";
  const previewUrl = item.preview || "";

  return {
    ...item,
    contentType: type,
    roles: item.roles && item.roles.length ? item.roles.slice() : defaults.roles.slice(),
    industries: item.industries && item.industries.length ? item.industries.slice() : defaults.industries.slice(),
    legacyStages,
    stageBuckets,
    summary,
    downloadUrl,
    previewUrl,
    downloadMode: getDownloadMode(type, item),
    sourceTag: getSourceTag(type, item),
    priority: TYPE_PRIORITY[type] || 0,
    searchText: buildSearchText(item)
  };
}

function normalizeMetrics(metrics) {
  return metrics.map((metric) => ({
    ...metric,
    stageBuckets: buildStageBuckets(metric.stage ? [metric.stage] : [], [])
  }));
}

function buildStageBuckets(stages, needs) {
  const values = [];
  stages.forEach((stage) => {
    values.push(...(STAGE_BUCKET_MAP[stage] || []));
  });
  needs.forEach((need) => {
    if (STAGE_BUCKETS.includes(need)) {
      values.push(need);
    }
  });
  return [...new Set(values.length ? values : STAGE_BUCKETS)];
}

function getDownloadMode(type, item) {
  if (type === "rawTable") return item.download ? "download" : "read-only";
  if (type === "tool") {
    if (item.download) return "download";
    if (item.table || (item.notes && item.notes.length) || item.summary) return "copy";
    return "read-only";
  }
  if (["chapter", "deepread", "sop", "script", "case"].includes(type)) {
    return "copy";
  }
  return "read-only";
}

function getSourceTag(type, item) {
  if (item.sourceManual) {
    return item.sourceManual;
  }
  if (type === "case" && item.source && isExternalUrl(item.source.url)) {
    return "外部补充";
  }
  if (type === "rawTable") {
    return "原始表格";
  }
  return "";
}

function getToolModeLabel(mode) {
  if (mode === "download") return "可下载";
  if (mode === "copy") return "可复制";
  return "仅阅读";
}

function buildManualDownloads(content, deepReads) {
  const items = [];
  const seen = new Set();

  const register = (url, summary) => {
    if (!url || !isRelativeAsset(url) || seen.has(url)) {
      return;
    }
    seen.add(url);
    items.push({
      id: `manual-${slugify(url)}`,
      title: prettyFileName(url),
      summary,
      contentType: "manual",
      downloadUrl: url,
      actionLabel: "打开手册",
      stageBuckets: STAGE_BUCKETS.slice(),
      priority: TYPE_PRIORITY.manual
    });
  };

  deepReads.forEach((item) => {
    register(item.manualFile, "完整原手册，可直接打开查看全文。");
  });

  (content.sources || []).forEach((source) => {
    if (source.url && isRelativeAsset(source.url) && /\.docx$/i.test(source.url)) {
      register(source.url, source.description || "完整原手册，可直接打开查看全文。");
    }
  });

  return items.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
}

function buildSearchText(item) {
  const values = [];
  const push = (value) => {
    if (value === undefined || value === null) return;
    values.push(String(value));
  };

  push(item.title);
  push(item.shortTitle);
  push(item.summary);
  push(item.overview);
  push(item.scenario);
  push(item.sourceManual);
  push(item.industry);

  (item.sections || []).forEach((section) => {
    push(section.title);
    (section.paragraphs || []).forEach(push);
    (section.bullets || []).forEach(push);
  });

  (item.actionChecklist || []).forEach(push);
  (item.managerChecklist || []).forEach(push);
  (item.deliverables || []).forEach(push);
  (item.acceptance || []).forEach(push);
  (item.notes || []).forEach(push);
  (item.lines || []).forEach(push);
  (item.tips || []).forEach(push);
  (item.results || []).forEach(push);
  (item.approach || []).forEach(push);
  (item.reusable || []).forEach(push);
  (item.watchouts || []).forEach(push);
  (item.successMetrics || []).forEach(push);

  if (item.table) {
    item.table.columns.forEach(push);
    item.table.rows.forEach((row) => row.forEach(push));
  }
  if (item.steps) {
    item.steps.forEach((step) => {
      push(step.title);
      step.items.forEach(push);
    });
  }
  if (item.source) {
    push(item.source.label);
  }

  return values.join(" ");
}

function prettyFileName(url) {
  const value = decodeURIComponent(String(url).replaceAll("\\", "/").split("/").pop() || url);
  return value.replace(/^\.\//, "").replace(/\.docx$/i, "");
}

function slugify(value) {
  return String(value).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function getTitleById(id) {
  const item = model.lookup.get(id);
  return item ? item.title : "相关资源";
}

function renderCountPills(items) {
  return `
    <div class="count-pill-row">
      ${items.map((item) => `<span class="summary-chip">${escapeHtml(item)}</span>`).join("")}
    </div>
  `;
}

function renderTable(columns, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 1800);
}

function persistState() {
  localStorage.setItem(storageKeys.selection, JSON.stringify({
    role: state.role,
    stage: state.stage,
    industry: state.industry
  }));
  localStorage.setItem(storageKeys.view, state.view);
  localStorage.setItem(storageKeys.search, state.search);
  localStorage.setItem(storageKeys.recent, JSON.stringify(state.recentIds));
  localStorage.setItem(storageKeys.lastJump, state.lastJump);
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function isRelativeAsset(value) {
  return /^\.\/.+/i.test(String(value || ""));
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(String(value || ""));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
