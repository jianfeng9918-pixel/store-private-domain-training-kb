const rawContent = window.TRAINING_KB_CONTENT || {};

const NEED_BUCKETS = ["引流", "拉新", "留存", "复购"];
const STAGE_BUCKET_MAP = {
  认知: NEED_BUCKETS,
  引流: ["引流", "拉新"],
  朋友圈: ["留存", "复购"],
  社群: ["拉新", "留存", "复购"],
  私聊转化: ["拉新", "复购"],
  活动策划: NEED_BUCKETS,
  数据考核: NEED_BUCKETS,
  培训验收: NEED_BUCKETS,
  复购: ["复购"]
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
  bundle: "打包资料",
  external: "外部资料"
};

const TYPE_PRIORITY = {
  deepread: 92,
  chapter: 82,
  sop: 74,
  tool: 68,
  script: 62,
  case: 58,
  rawTable: 42,
  manual: 34,
  bundle: 30,
  external: 22
};

const HOME_ARSENAL_PLAN = ["core", "sop", "tool", "tool", "script", "case"];

const HOME_FLOW_CARDS = [
  {
    title: "先选角色和需求",
    text: "先把“谁在看”和“现在最想解决什么”选出来，系统再给你排优先级。"
  },
  {
    title: "直接进入工作台",
    text: "进入后默认先看正文，再看行动指令、SOP、工具、话术和案例，不需要自己找。"
  },
  {
    title: "需要时切完整原文",
    text: "如果你想系统读透，也可以直接切到完整阅读模式，打开手册全文和原始资料。"
  }
];

const NEED_GUIDES = {
  引流: {
    headline: "先把门店触点、活动入口和线上入口都做成可承接的引流口。",
    summary: "这一板块先解决流量从哪里来、为什么愿意停留、员工怎么把线索接到后续动作里。",
    focus: [
      "先统一门头、收银台、物料袋和线上海报的引流口。",
      "先把引流动作写进营业流程，再考虑放大投放。",
      "先盯扫码率、加粉率和进群率，再看活动爆发。"
    ]
  },
  拉新: {
    headline: "把进来的顾客稳定沉淀为新客资产，并在首周把顾客接住。",
    summary: "这一板块重点不是只看加粉，而是让新客完成欢迎、备注、分层和首次转化。",
    focus: [
      "先统一欢迎语、备注规则和首周跟进节奏。",
      "先把新客接住，再扩更多入口。",
      "先盯新增、欢迎触达率和 7 日首单率。"
    ]
  },
  留存: {
    headline: "让顾客持续看到门店、记得门店，并愿意继续回应。",
    summary: "这一板块重点是朋友圈、社群、会员内容和服务提醒的固定节奏，而不是只靠促销刷存在感。",
    focus: [
      "先固定朋友圈、社群和会员日节奏。",
      "先把到货提醒、售后回访和服务提醒标准化。",
      "先盯互动率、活跃率和沉默客户占比。"
    ]
  },
  复购: {
    headline: "把老客经营成稳定营业额，让复购变成被管理的结果。",
    summary: "这一板块重点是会员权益、私聊回访、唤醒动作和活动复盘，让顾客愿意再次下单和转介绍。",
    focus: [
      "先盘清老客、沉默客和高价值客。",
      "先把会员日、回访和加购推荐固定下来。",
      "先盯复购率、老客贡献占比和唤醒成功率。"
    ]
  }
};

const HOME_SECTION_LABELS = {
  selectorCard: "选择区",
  homeArsenalSection: "工具武器库",
  homeOriginalsSection: "完整阅读",
  capabilitySection: "了解系统能力",
  continueCard: "继续阅读"
};

const WORKSPACE_SECTION_LABELS = {
  "core-section": "正文",
  "action-section": "行动指令",
  "sops-section": "SOP",
  "tools-section": "工具",
  "scripts-section": "话术",
  "cases-section": "案例",
  "downloads-section": "下载",
  "recommend-section": "推荐"
};

const ORIGINALS_SECTION_LABELS = {
  "originals-manuals-section": "完整手册",
  "originals-external-section": "外部资料",
  "originals-downloads-section": "原表下载"
};

const DETAIL_SECTION_LABELS = {
  "detail-overview-section": "概览",
  detailBodySection: "正文",
  "detail-action-section": "行动",
  detailRecommendationsSection: "继续推荐"
};

const storageKeys = {
  selection: "training-kb-v5:selection",
  ui: "training-kb-v5:ui",
  recent: "training-kb-v5:recent",
  completed: "training-kb-v5:completed"
};

const defaults = {
  roles: (rawContent.filters && rawContent.filters.roles) || ["老板", "店长", "店员"],
  industries: (rawContent.filters && rawContent.filters.industries) || ["零售", "餐饮", "美业", "母婴", "服务型门店"]
};

const FILTER_GROUPS = [
  {
    key: "role",
    label: "角色",
    hint: "先明确是谁来读、谁来执行。",
    options: defaults.roles
  },
  {
    key: "need",
    label: "当前需求",
    hint: "先明确你现在最想解决什么。",
    options: NEED_BUCKETS
  },
  {
    key: "industry",
    label: "行业",
    hint: "行业常驻可见，方便系统做更贴近门店场景的排序。",
    options: defaults.industries
  }
];

const model = buildModel(rawContent);

const state = {
  view: "home",
  role: "",
  need: "",
  industry: "",
  search: "",
  currentSection: "selectorCard",
  lastWorkspaceAnchor: "core-section",
  lastWorkspaceScroll: 0,
  detailId: "",
  detailSourceSection: "core-section",
  originalSourceView: "home",
  recentIds: [],
  completedDetailIds: new Set()
};

const runtime = {
  bundle: null,
  originals: null,
  detailItem: null,
  visibleSections: [],
  pendingFocusItem: "",
  toastTimer: 0
};

const els = {
  topbarHomeBtn: document.getElementById("topbarHomeBtn"),
  homeView: document.getElementById("homeView"),
  selectorCard: document.getElementById("selectorCard"),
  homeFilterPanel: document.getElementById("homeFilterPanel"),
  homeIndustryPanel: document.getElementById("homeIndustryPanel"),
  homeStartButton: document.getElementById("homeStartButton"),
  homeOriginalsButton: document.getElementById("homeOriginalsButton"),
  homeSelectionSummary: document.getElementById("homeSelectionSummary"),
  homeArsenalSection: document.getElementById("homeArsenalSection"),
  homeArsenalGrid: document.getElementById("homeArsenalGrid"),
  homeOriginalsSection: document.getElementById("homeOriginalsSection"),
  homeOriginalsEntryButton: document.getElementById("homeOriginalsEntryButton"),
  homeOriginalsPreviewGrid: document.getElementById("homeOriginalsPreviewGrid"),
  capabilityToggle: document.getElementById("capabilityToggle"),
  capabilityPanel: document.getElementById("capabilityPanel"),
  homeCounts: document.getElementById("homeCounts"),
  homeFlowGrid: document.getElementById("homeFlowGrid"),
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
  searchInput: document.getElementById("searchInput"),
  searchState: document.getElementById("searchState"),
  searchAssistSection: document.getElementById("searchAssistSection"),
  searchResults: document.getElementById("searchResults"),
  workspaceProgressBar: document.getElementById("workspaceProgressBar"),
  workspaceProgressMeta: document.getElementById("workspaceProgressMeta"),
  workspaceCurrentLabel: document.getElementById("workspaceCurrentLabel"),
  workspaceNextLabel: document.getElementById("workspaceNextLabel"),
  workspaceQuickTabs: document.getElementById("workspaceQuickTabs"),
  coreNote: document.getElementById("coreNote"),
  coreCount: document.getElementById("coreCount"),
  coreCards: document.getElementById("coreCards"),
  actionNote: document.getElementById("actionNote"),
  actionGrid: document.getElementById("actionGrid"),
  sopNote: document.getElementById("sopNote"),
  sopCount: document.getElementById("sopCount"),
  sopCards: document.getElementById("sopCards"),
  toolNote: document.getElementById("toolNote"),
  toolCount: document.getElementById("toolCount"),
  toolCards: document.getElementById("toolCards"),
  scriptNote: document.getElementById("scriptNote"),
  scriptCount: document.getElementById("scriptCount"),
  scriptCards: document.getElementById("scriptCards"),
  caseNote: document.getElementById("caseNote"),
  caseCount: document.getElementById("caseCount"),
  caseCards: document.getElementById("caseCards"),
  downloadNote: document.getElementById("downloadNote"),
  downloadCount: document.getElementById("downloadCount"),
  downloadCards: document.getElementById("downloadCards"),
  recommendNote: document.getElementById("recommendNote"),
  recommendCards: document.getElementById("recommendCards"),
  originalsView: document.getElementById("originalsView"),
  originalsTitle: document.getElementById("originalsTitle"),
  originalsSummary: document.getElementById("originalsSummary"),
  originalsBackHomeButton: document.getElementById("originalsBackHomeButton"),
  originalsBackWorkspaceButton: document.getElementById("originalsBackWorkspaceButton"),
  originalsManualsNote: document.getElementById("originalsManualsNote"),
  originalsManualsCount: document.getElementById("originalsManualsCount"),
  originalsManualsGrid: document.getElementById("originalsManualsGrid"),
  originalsExternalNote: document.getElementById("originalsExternalNote"),
  originalsExternalCount: document.getElementById("originalsExternalCount"),
  originalsExternalGrid: document.getElementById("originalsExternalGrid"),
  originalsDownloadsNote: document.getElementById("originalsDownloadsNote"),
  originalsDownloadsCount: document.getElementById("originalsDownloadsCount"),
  originalsDownloadsGrid: document.getElementById("originalsDownloadsGrid"),
  detailView: document.getElementById("detailView"),
  detailTitle: document.getElementById("detailTitle"),
  detailSummary: document.getElementById("detailSummary"),
  detailMeta: document.getElementById("detailMeta"),
  detailBackButton: document.getElementById("detailBackButton"),
  detailHomeButton: document.getElementById("detailHomeButton"),
  detailProgressBar: document.getElementById("detailProgressBar"),
  detailProgressMeta: document.getElementById("detailProgressMeta"),
  detailCurrentLabel: document.getElementById("detailCurrentLabel"),
  detailNextLabel: document.getElementById("detailNextLabel"),
  detailToolbarTitle: document.getElementById("detailToolbarTitle"),
  detailToolbarText: document.getElementById("detailToolbarText"),
  detailPrimaryActions: document.getElementById("detailPrimaryActions"),
  detailAnchorTabs: document.getElementById("detailAnchorTabs"),
  detailBody: document.getElementById("detailBody"),
  detailActionNote: document.getElementById("detailActionNote"),
  detailActionCards: document.getElementById("detailActionCards"),
  detailRecommendationNote: document.getElementById("detailRecommendationNote"),
  detailRecommendations: document.getElementById("detailRecommendations"),
  floatingNav: document.getElementById("floatingNav"),
  floatingPrimaryBtn: document.getElementById("floatingPrimaryBtn"),
  floatingDirectoryBtn: document.getElementById("floatingDirectoryBtn"),
  directoryBackdrop: document.getElementById("directoryBackdrop"),
  directorySheet: document.getElementById("directorySheet"),
  directoryCloseBtn: document.getElementById("directoryCloseBtn"),
  directoryCurrent: document.getElementById("directoryCurrent"),
  directoryList: document.getElementById("directoryList"),
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
  const savedUi = parseJson(localStorage.getItem(storageKeys.ui), {});

  state.role = savedSelection.role || "";
  state.need = savedSelection.need || savedSelection.stage || "";
  state.industry = savedSelection.industry || "";
  state.view = savedUi.view || "home";
  state.search = savedUi.search || "";
  state.currentSection = savedUi.currentSection || "selectorCard";
  state.lastWorkspaceAnchor = savedUi.lastWorkspaceAnchor || "core-section";
  state.lastWorkspaceScroll = Number(savedUi.lastWorkspaceScroll || 0);
  state.detailId = savedUi.detailId || "";
  state.detailSourceSection = savedUi.detailSourceSection || "core-section";
  state.originalSourceView = savedUi.originalSourceView || "home";
  state.recentIds = parseJson(localStorage.getItem(storageKeys.recent), []);
  state.completedDetailIds = new Set(parseJson(localStorage.getItem(storageKeys.completed), []));

  if (!defaults.roles.includes(state.role)) state.role = "";
  if (!NEED_BUCKETS.includes(state.need)) state.need = "";
  if (state.industry && !defaults.industries.includes(state.industry)) state.industry = "";
  if (!model.lookup.has(state.detailId)) state.detailId = "";
  if (!isSelectionComplete()) {
    state.view = "home";
    state.detailId = "";
  }
}

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });

  els.homeStartButton.addEventListener("click", () => {
    if (!isSelectionComplete()) {
      focusSelectionPrompt("请先选择角色和当前需求");
      return;
    }
    openWorkspace("core-section");
  });

  els.homeOriginalsButton.addEventListener("click", () => openOriginals("home"));
  els.homeOriginalsEntryButton.addEventListener("click", () => openOriginals("home"));

  els.capabilityToggle.addEventListener("click", () => {
    const expanded = els.capabilityToggle.getAttribute("aria-expanded") === "true";
    els.capabilityToggle.setAttribute("aria-expanded", String(!expanded));
    els.capabilityPanel.classList.toggle("hidden", expanded);
  });

  els.continueButton.addEventListener("click", () => {
    if (!isSelectionComplete()) {
      focusSelectionPrompt("请先选择角色和当前需求");
      return;
    }
    openWorkspace(state.lastWorkspaceAnchor || "core-section");
  });

  els.workspaceBackButton.addEventListener("click", () => {
    state.view = "home";
    state.detailId = "";
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

  els.originalsBackHomeButton.addEventListener("click", () => {
    state.view = "home";
    persistState();
    renderApp();
  });

  els.originalsBackWorkspaceButton.addEventListener("click", () => {
    if (!isSelectionComplete()) {
      state.view = "home";
      persistState();
      renderApp();
      return;
    }
    openWorkspace(state.lastWorkspaceAnchor || "core-section");
  });

  els.detailBackButton.addEventListener("click", () => {
    if (!isSelectionComplete()) {
      state.view = "home";
      persistState();
      renderApp();
      return;
    }
    openWorkspace(state.detailSourceSection || state.lastWorkspaceAnchor || "core-section", {
      restoreScroll: true
    });
  });

  els.detailHomeButton.addEventListener("click", () => {
    state.view = "home";
    persistState();
    renderApp();
  });

  els.topbarHomeBtn.addEventListener("click", () => {
    state.view = "home";
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

  els.floatingPrimaryBtn.addEventListener("click", () => {
    if (state.view === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    state.view = "home";
    persistState();
    renderApp();
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  });

  els.floatingDirectoryBtn.addEventListener("click", () => {
    renderDirectory();
    els.directoryBackdrop.classList.remove("hidden");
    els.directorySheet.classList.remove("hidden");
  });

  els.directoryCloseBtn.addEventListener("click", closeDirectory);
  els.directoryBackdrop.addEventListener("click", closeDirectory);
  els.copyFallbackClose.addEventListener("click", () => {
    els.copyFallback.classList.add("hidden");
    els.copyFallbackText.value = "";
  });
}

function handleDocumentClick(event) {
  const target = event.target;

  const filterButton = target.closest("[data-filter-key]");
  if (filterButton) {
    toggleSelection(filterButton.dataset.filterKey, filterButton.dataset.filterValue);
    if (state.view === "workspace") {
      state.search = "";
      renderWorkspace();
    } else {
      renderHome();
    }
    return;
  }

  const openWorkspaceButton = target.closest("[data-open-workspace]");
  if (openWorkspaceButton) {
    if (!isSelectionComplete()) {
      focusSelectionPrompt("请先选择角色和当前需求");
      return;
    }
    openWorkspace(openWorkspaceButton.dataset.openWorkspace, {
      focusItem: openWorkspaceButton.dataset.focusItem || ""
    });
    return;
  }

  const detailButton = target.closest("[data-open-detail]");
  if (detailButton) {
    openDetail(detailButton.dataset.openDetail, detailButton.dataset.sourceSection || "");
    return;
  }

  const focusButton = target.closest("[data-focus-item]");
  if (focusButton) {
    focusItemCard(focusButton.dataset.focusItem, focusButton.dataset.section || "");
    return;
  }

  const copyButton = target.closest("[data-copy-item]");
  if (copyButton) {
    handleCopy(copyButton.dataset.copyItem);
    return;
  }

  const jumpButton = target.closest("[data-jump]");
  if (jumpButton) {
    jumpTo(jumpButton.dataset.jump);
    closeDirectory();
    return;
  }

  const originalsButton = target.closest("[data-open-originals]");
  if (originalsButton) {
    openOriginals(originalsButton.dataset.fromView || state.view || "home");
    return;
  }
}

function handleScroll() {
  updateCurrentSectionFromScroll();
  renderFloatingNav();
  maybeMarkCurrentDetailComplete();
}

function renderApp() {
  if (state.view === "detail" && state.detailId) {
    renderDetail();
    return;
  }
  if (state.view === "workspace" && isSelectionComplete()) {
    renderWorkspace();
    return;
  }
  if (state.view === "originals") {
    renderOriginals();
    return;
  }
  renderHome();
}

function showView(nextView) {
  state.view = nextView;
  els.homeView.classList.toggle("hidden", nextView !== "home");
  els.workspaceView.classList.toggle("hidden", nextView !== "workspace");
  els.originalsView.classList.toggle("hidden", nextView !== "originals");
  els.detailView.classList.toggle("hidden", nextView !== "detail");
  els.topbarHomeBtn.classList.toggle("hidden", nextView === "home");
  persistState();
  renderFloatingNav();
}

function renderHome() {
  showView("home");
  runtime.bundle = null;
  runtime.originals = null;
  runtime.detailItem = null;

  renderHomeFilters();
  renderHomeSummary();
  renderHomeCapability();
  renderHomeArsenal(buildHomeArsenal(getCurrentSelection()));
  renderHomeOriginalsPreview(buildOriginalsBundle(getCurrentSelection()));
  renderContinueCard();

  runtime.visibleSections = getVisibleHomeSections();
  renderFloatingNav();
  window.requestAnimationFrame(updateCurrentSectionFromScroll);
}

function renderHomeFilters() {
  els.homeFilterPanel.innerHTML = [
    renderFilterGroup(FILTER_GROUPS[0], state.role),
    renderFilterGroup(FILTER_GROUPS[1], state.need)
  ].join("");
  els.homeIndustryPanel.innerHTML = renderFilterGroup(FILTER_GROUPS[2], state.industry);
}

function renderHomeSummary() {
  const parts = [];
  if (state.role) parts.push(`角色：${state.role}`);
  if (state.need) parts.push(`当前需求：${state.need}`);
  if (state.industry) parts.push(`行业：${state.industry}`);
  els.homeSelectionSummary.textContent = parts.length
    ? `当前将按 ${parts.join(" / ")} 排序内容。`
    : "先选角色和当前需求，行业可作为高级匹配常驻补充。";
  els.homeStartButton.disabled = !isSelectionComplete();
  els.homeStartButton.classList.toggle("is-disabled", !isSelectionComplete());
}

function renderHomeCapability() {
  const counts = [
    { label: "正文与专题", value: model.totals.core },
    { label: "SOP / 工具 / 话术", value: model.totals.sops + model.totals.tools + model.totals.scripts },
    { label: "案例与下载资料", value: model.totals.cases + model.totals.downloads }
  ];
  els.homeCounts.innerHTML = counts.map((item) => `
    <article class="hero-stat-card">
      <span class="meta-pill">${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(String(item.value))}</strong>
      <p>内容都已按角色、需求和行业可直接调用。</p>
    </article>
  `).join("");
  els.homeFlowGrid.innerHTML = HOME_FLOW_CARDS.map((card, index) => `
    <article class="support-card">
      <span class="module-index">0${index + 1}</span>
      <h4>${escapeHtml(card.title)}</h4>
      <p>${escapeHtml(card.text)}</p>
    </article>
  `).join("");
}

function renderHomeArsenal(items) {
  els.homeArsenalGrid.innerHTML = items.map((item, index) => {
    const section = getSectionForType(item.contentType);
    const action = isSelectionComplete()
      ? `<button class="btn btn-primary" type="button" data-open-workspace="${section}" data-focus-item="${escapeAttr(item.id)}">进入工作台</button>`
      : `<button class="btn btn-ghost" type="button" data-jump="selectorCard">先完成选择</button>`;

    return `
      <article class="preview-card preview-card-open${index === 0 ? " preview-card-recommended" : ""}" id="item-${escapeAttr(item.id)}">
        <div class="preview-card-head">
          <div class="preview-card-copy">
            <div class="module-meta">
              <span class="chip chip-soft">${escapeHtml(TYPE_LABELS[item.contentType] || "内容")}</span>
              ${index === 0 ? `<span class="chip chip-highlight">建议先看</span>` : ""}
            </div>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(getItemBenefit(item))}</p>
          </div>
        </div>
        <div class="card-actions">
          ${action}
        </div>
      </article>
    `;
  }).join("");
}

function renderHomeOriginalsPreview(bundle) {
  const previewItems = [bundle.manuals[0], bundle.external[0], bundle.downloads[0]].filter(Boolean);
  els.homeOriginalsPreviewGrid.innerHTML = previewItems.map((item) => renderDownloadCard(item)).join("");
}

function renderContinueCard() {
  const canContinue = isSelectionComplete() && Boolean(state.lastWorkspaceAnchor || state.detailId || state.recentIds.length);
  els.continueCard.classList.toggle("hidden", !canContinue);
  if (!canContinue) return;
  els.continueTitle.textContent = state.detailId ? "继续上次阅读" : "继续上次工作台进度";
  els.continueText.textContent = state.detailId
    ? `上次停在 ${getTitleById(state.detailId)}，也可以直接回到工作台继续看。`
    : `系统会回到你上次看到的模块：${getCurrentSectionLabels()[state.lastWorkspaceAnchor] || "正文"}`;
}

function renderWorkspace(target = "", options = {}) {
  if (!isSelectionComplete()) {
    renderHome();
    return;
  }

  showView("workspace");

  const bundle = buildBundle(getCurrentSelection());
  const guide = NEED_GUIDES[state.need];
  runtime.bundle = bundle;
  runtime.originals = null;
  runtime.detailItem = null;

  els.workspaceTitle.textContent = [state.role, state.need, state.industry].filter(Boolean).join(" / ");
  els.workspaceSummary.textContent = buildWorkspaceSummary(bundle, guide);
  renderFallbackNote(bundle.note);
  renderWorkspaceFilters();
  els.searchInput.value = state.search;
  renderSearch(bundle);
  renderQuickTabs(getVisibleWorkspaceSections(bundle));
  renderCore(bundle.core);
  renderActionPlan(bundle, guide);
  renderSops(bundle.sops);
  renderTools(bundle.tools);
  renderScripts(bundle.scripts);
  renderCases(bundle.cases);
  renderDownloads(bundle.downloads);
  renderRecommendations(bundle);

  runtime.visibleSections = getVisibleWorkspaceSections(bundle);
  renderReadingProgress("workspace");
  renderFloatingNav();

  const jumpTarget = target || state.lastWorkspaceAnchor || "core-section";
  window.requestAnimationFrame(() => {
    if (options.restoreScroll && state.lastWorkspaceScroll > 0) {
      window.scrollTo({ top: state.lastWorkspaceScroll, behavior: "auto" });
    } else {
      jumpTo(jumpTarget, false);
    }
    if (options.focusItem || runtime.pendingFocusItem) {
      const itemId = options.focusItem || runtime.pendingFocusItem;
      runtime.pendingFocusItem = "";
      highlightCard(itemId);
    }
    updateCurrentSectionFromScroll();
  });
}

function renderWorkspaceFilters() {
  els.workspaceFilterPanel.innerHTML = FILTER_GROUPS.map((group) => renderFilterGroup(group, state[group.key])).join("");
}

function renderFallbackNote(message) {
  els.fallbackNote.classList.toggle("hidden", !message);
  els.fallbackNote.textContent = message || "";
}

function renderSearch(bundle) {
  const groups = buildSearchGroups(bundle, state.search);
  const hasQuery = Boolean(state.search);
  els.searchAssistSection.classList.toggle("hidden", !hasQuery);
  if (!hasQuery) {
    els.searchState.textContent = "当前显示的是该组合下的完整内容。";
    els.searchResults.innerHTML = "";
    return;
  }

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  els.searchState.textContent = total
    ? `关键词“${state.search}”命中 ${total} 条结果。`
    : `关键词“${state.search}”未命中当前组合，页面仍保持完整内容。`;
  els.searchResults.innerHTML = groups.map((group) => `
    <section class="search-group">
      <h4 class="search-group-title">${escapeHtml(group.label)}</h4>
      <div class="resource-grid">
        ${group.items.map((item) => renderSearchResult(item)).join("")}
      </div>
    </section>
  `).join("");
}

function renderQuickTabs(sections) {
  els.workspaceQuickTabs.innerHTML = sections.map((section) => `
    <button class="chip${state.currentSection === section.id ? " chip-highlight" : ""}" type="button" data-jump="${section.id}">
      ${escapeHtml(section.label)}
    </button>
  `).join("");
}

function renderCore(items) {
  toggleSection("core-section", items.length > 0);
  if (!items.length) return;
  els.coreNote.textContent = NEED_GUIDES[state.need].headline;
  els.coreCount.textContent = `${items.length} 条`;
  els.coreCards.innerHTML = items.map((item, index) => {
    const preview = renderInlinePreviewContent(item);
    return renderPreviewCard({
      item,
      recommended: index === 0,
      callout: index === 0 ? buildEntryCallout("长文深读入口", "这张卡先给你重点摘要，点蓝色按钮进入完整阅读。") : "",
      body: preview,
      actions: [
        `<button class="btn btn-primary btn-deepread" type="button" data-open-detail="${escapeAttr(item.id)}" data-source-section="core-section">进入完整阅读</button>`,
        item.manualFile && isRelativeAsset(item.manualFile) ? renderLinkButton(item.manualFile, "打开手册", { secondary: true }) : ""
      ].join("")
    });
  }).join("");
}

function renderActionPlan(bundle, guide) {
  const cards = [];
  if (guide) {
    guide.focus.slice(0, 2).forEach((text, index) => {
      cards.push(renderActionShortcutCard({
        title: `动作 ${index + 1}`,
        text,
        buttonLabel: "先看正文",
        jump: "core-section"
      }));
    });
  }
  const firstSop = bundle.sops[0];
  if (firstSop) {
    cards.push(renderActionShortcutCard({
      title: "先跑 SOP",
      text: `优先按《${firstSop.title}》拆出执行顺序和验收标准。`,
      buttonLabel: "看 SOP",
      jump: "sops-section"
    }));
  }
  const firstTool = bundle.tools[0];
  if (firstTool) {
    cards.push(renderActionShortcutCard({
      title: "顺手拿工具",
      text: `把《${firstTool.title}》拿出来，边看边落动作。`,
      buttonLabel: "看工具",
      jump: "tools-section"
    }));
  }

  toggleSection("action-section", cards.length > 0);
  els.actionNote.textContent = `当前按 ${state.role} / ${state.need}${state.industry ? ` / ${state.industry}` : ""} 给你排了优先动作。`;
  els.actionGrid.innerHTML = cards.slice(0, 4).join("");
}

function renderSops(items) {
  toggleSection("sops-section", items.length > 0);
  if (!items.length) return;
  els.sopNote.textContent = "上面先看关键步骤，带训或交付时再看完整流程版。";
  els.sopCount.textContent = `${items.length} 条`;
  els.sopCards.innerHTML = items.map((item) => renderPreviewCard({
    item,
    body: renderInlinePreviewContent(item),
    callout: buildEntryCallout("完整 SOP 入口", "上面先看关键步骤，点按钮进入完整流程版。"),
    actions: `
      <button class="btn btn-primary" type="button" data-open-detail="${escapeAttr(item.id)}" data-source-section="sops-section">查看完整 SOP</button>
      <button class="btn btn-ghost" type="button" data-copy-item="${escapeAttr(item.id)}">复制 SOP</button>
    `
  })).join("");
}

function renderTools(items) {
  toggleSection("tools-section", items.length > 0);
  if (!items.length) return;
  els.toolNote.textContent = "工具、表格和检查表都留在当前页直接看，能复制就复制，能下载就下载。";
  els.toolCount.textContent = `${items.length} 份`;
  els.toolCards.innerHTML = items.map((item) => renderPreviewCard({
    item,
    open: true,
    body: renderInlinePreviewContent(item),
    actions: buildPreviewActions(item)
  })).join("");
}

function renderScripts(items) {
  toggleSection("scripts-section", items.length > 0);
  if (!items.length) return;
  els.scriptNote.textContent = "话术直接展开，不再跳去子页找上下文。";
  els.scriptCount.textContent = `${items.length} 组`;
  els.scriptCards.innerHTML = items.map((item) => renderPreviewCard({
    item,
    open: true,
    body: renderInlinePreviewContent(item),
    actions: buildPreviewActions(item)
  })).join("");
}

function renderCases(items) {
  toggleSection("cases-section", items.length > 0);
  if (!items.length) return;
  els.caseNote.textContent = "案例直接在当前页展开做法、结果和可复用点。";
  els.caseCount.textContent = `${items.length} 个`;
  els.caseCards.innerHTML = items.map((item) => renderPreviewCard({
    item,
    open: true,
    body: renderInlinePreviewContent(item),
    actions: buildPreviewActions(item)
  })).join("");
}

function renderDownloads(items) {
  toggleSection("downloads-section", items.length > 0);
  if (!items.length) return;
  els.downloadNote.textContent = "只显示确认有文件或真实外链的资料入口。";
  els.downloadCount.textContent = `${items.length} 份`;
  els.downloadCards.innerHTML = items.map((item) => renderDownloadCard(item)).join("");
}

function renderRecommendations(bundle) {
  const items = buildWorkspaceRecommendations(bundle);
  toggleSection("recommend-section", items.length > 0);
  if (!items.length) return;
  els.recommendNote.textContent = "看完当前板块后，建议按这个顺序继续往下读。";
  els.recommendCards.innerHTML = items.map((item) => {
    const target = resolveActionTarget(item);
    return `
      <article class="preview-card">
        <div class="preview-card-copy">
          <div class="module-meta">
            <span class="chip chip-soft">${escapeHtml(TYPE_LABELS[item.contentType] || "内容")}</span>
          </div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(getItemBenefit(item))}</p>
        </div>
        <div class="card-actions">
          ${target}
        </div>
      </article>
    `;
  }).join("");
}

function renderOriginals() {
  showView("originals");
  const bundle = buildOriginalsBundle(getCurrentSelection());
  runtime.originals = bundle;
  runtime.bundle = null;
  runtime.detailItem = null;

  els.originalsTitle.textContent = "原文资料库";
  els.originalsSummary.textContent = isSelectionComplete()
    ? `当前会优先展示更接近 ${state.role} / ${state.need}${state.industry ? ` / ${state.industry}` : ""} 的完整资料。`
    : "这里集中展示完整手册、外部资料和原表下载。";
  els.originalsBackWorkspaceButton.classList.toggle("hidden", state.originalSourceView !== "workspace" || !isSelectionComplete());

  toggleSection("originals-manuals-section", bundle.manuals.length > 0);
  toggleSection("originals-external-section", bundle.external.length > 0);
  toggleSection("originals-downloads-section", bundle.downloads.length > 0);

  els.originalsManualsNote.textContent = "完整手册适合系统阅读和培训前后通读。";
  els.originalsManualsCount.textContent = `${bundle.manuals.length} 份`;
  els.originalsManualsGrid.innerHTML = bundle.manuals.map((item) => renderDownloadCard(item)).join("");

  els.originalsExternalNote.textContent = "优先保留可直接打开的官方 PDF、网页资料和说明文档。";
  els.originalsExternalCount.textContent = `${bundle.external.length} 份`;
  els.originalsExternalGrid.innerHTML = bundle.external.map((item) => renderDownloadCard(item)).join("");

  els.originalsDownloadsNote.textContent = "原表打包下载和当前组合命中的可下载工具都集中在这里。";
  els.originalsDownloadsCount.textContent = `${bundle.downloads.length} 份`;
  els.originalsDownloadsGrid.innerHTML = bundle.downloads.map((item) => renderDownloadCard(item)).join("");

  runtime.visibleSections = getVisibleOriginalsSections(bundle);
  renderFloatingNav();
  window.requestAnimationFrame(updateCurrentSectionFromScroll);
}

function renderDetail() {
  const item = model.lookup.get(state.detailId);
  if (!item) {
    renderWorkspace();
    return;
  }
  if (!hasDetailResources(item)) {
    focusItemCard(item.id, getSectionForType(item.contentType));
    return;
  }

  showView("detail");
  runtime.detailItem = item;
  runtime.bundle = buildBundle(getCurrentSelection());
  runtime.originals = null;

  const siblings = getSiblingItems(item);
  const currentIndex = Math.max(siblings.findIndex((entry) => entry.id === item.id), 0);
  const nextItem = siblings[currentIndex + 1] || null;

  els.detailTitle.textContent = item.title;
  els.detailSummary.textContent = item.summary || item.overview || "";
  els.detailMeta.innerHTML = renderContextBadges(item);
  els.detailCurrentLabel.textContent = `你正在看：${TYPE_LABELS[item.contentType] || "正文"}`;
  els.detailProgressMeta.textContent = `已看完 ${state.completedDetailIds.size} / ${siblings.length || 1}`;
  els.detailProgressBar.style.width = `${Math.max(16, Math.round(((currentIndex + 1) / Math.max(siblings.length, 1)) * 100))}%`;
  els.detailNextLabel.textContent = nextItem ? `下一篇：${nextItem.title}` : "当前已经是这一组的最后一篇。";
  els.detailToolbarTitle.textContent = item.title;
  els.detailToolbarText.textContent = buildDetailToolbarText(item);
  els.detailPrimaryActions.innerHTML = buildDetailPrimaryActions(item);
  els.detailAnchorTabs.innerHTML = buildDetailAnchorTabs(item);
  els.detailBody.innerHTML = buildDetailBody(item);
  els.detailActionNote.textContent = "读完后，直接顺着这里的动作去拿工具、话术或案例。";
  els.detailActionCards.innerHTML = buildDetailActionCards(item).map(renderActionCard).join("");
  els.detailRecommendationNote.textContent = nextItem ? `建议下一篇直接看《${nextItem.title}》` : "你也可以回到工作台继续读其他模块。";
  els.detailRecommendations.innerHTML = buildDetailRecommendations(item).map((entry) => `
    <article class="preview-card">
      <div class="preview-card-copy">
        <div class="module-meta">
          <span class="chip chip-soft">${escapeHtml(TYPE_LABELS[entry.contentType] || "内容")}</span>
        </div>
        <h4>${escapeHtml(entry.title)}</h4>
        <p>${escapeHtml(getItemBenefit(entry))}</p>
      </div>
      <div class="card-actions">
        ${resolveActionTarget(entry)}
      </div>
    </article>
  `).join("");

  runtime.visibleSections = getVisibleDetailSections();
  renderReadingProgress("detail");
  renderFloatingNav();
  window.requestAnimationFrame(updateCurrentSectionFromScroll);
}

function renderReadingProgress(view) {
  const labels = getCurrentSectionLabels();
  const sections = runtime.visibleSections;
  const currentIndex = Math.max(sections.findIndex((section) => section.id === state.currentSection), 0);
  const total = Math.max(sections.length, 1);
  const progress = Math.max(16, Math.round(((currentIndex + 1) / total) * 100));
  const currentLabel = labels[state.currentSection] || sections[0]?.label || "正文";
  const nextLabel = sections[currentIndex + 1]?.label || "已经看到当前页最后一块";
  const meta = `已看 ${Math.min(currentIndex + 1, total)} / ${total}`;

  if (view === "workspace") {
    els.workspaceCurrentLabel.textContent = `你正在看：${currentLabel}`;
    els.workspaceProgressMeta.textContent = meta;
    els.workspaceProgressBar.style.width = `${progress}%`;
    els.workspaceNextLabel.textContent = nextLabel === "已经看到当前页最后一块" ? nextLabel : `下一块：${nextLabel}`;
    return;
  }

  els.detailCurrentLabel.textContent = `你正在看：${currentLabel}`;
  els.detailProgressMeta.textContent = meta;
  els.detailProgressBar.style.width = `${progress}%`;
  els.detailNextLabel.textContent = nextLabel === "已经看到当前页最后一块" ? nextLabel : `下一块：${nextLabel}`;
}

function renderFloatingNav() {
  const shouldShow = shouldShowFloatingNav(state.view, window.scrollY);
  els.floatingNav.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  if (state.view === "home") {
    els.floatingPrimaryBtn.textContent = "回顶部";
    els.floatingDirectoryBtn.textContent = "首页目录";
  } else {
    els.floatingPrimaryBtn.textContent = "回首页";
    els.floatingDirectoryBtn.textContent = "当前目录";
  }
}

function renderDirectory() {
  const labels = getCurrentSectionLabels();
  const sections = runtime.visibleSections.filter((entry) => document.getElementById(entry.id));
  const currentLabel = labels[state.currentSection] || sections[0]?.label || "当前页";
  els.directoryCurrent.textContent = `你正在看：${currentLabel}`;
  els.directoryList.innerHTML = sections.map((section) => `
    <button class="search-result-btn${state.currentSection === section.id ? " is-active" : ""}" type="button" data-jump="${section.id}">
      <strong>${escapeHtml(section.label)}</strong>
      <span>${escapeHtml(section.summary || "点击后直接定位到这一块。")}</span>
    </button>
  `).join("");
}

function closeDirectory() {
  els.directoryBackdrop.classList.add("hidden");
  els.directorySheet.classList.add("hidden");
}

function buildHomeArsenal(selection) {
  const bucket = buildGlobalBucket(selection);
  const picked = [];
  const seen = new Set();
  HOME_ARSENAL_PLAN.forEach((slot) => {
    const item = bucket[slot].find((entry) => !seen.has(entry.id));
    if (!item) return;
    seen.add(item.id);
    picked.push(item);
  });
  return picked;
}

function buildGlobalBucket(selection) {
  const partial = {
    role: selection.role || "",
    need: selection.need || "",
    industry: selection.industry || ""
  };

  return {
    core: queryItems([...model.itemsByType.deepread, ...model.itemsByType.chapter], partial),
    sop: queryItems(model.itemsByType.sop, partial),
    tool: queryItems(model.itemsByType.tool, partial),
    script: queryItems(model.itemsByType.script, partial),
    case: queryItems(model.itemsByType.case, partial)
  };
}

function buildBundle(selection) {
  const scenarios = [
    { role: selection.role, need: selection.need, industry: selection.industry, note: "" },
    { role: "", need: selection.need, industry: selection.industry, note: "已补充当前需求的同业态通用内容。" },
    { role: selection.role, need: selection.need, industry: "", note: "已补充当前需求的同角色通用内容。" },
    { role: "", need: selection.need, industry: "", note: "已补充当前需求的通用内容。" }
  ];

  for (const scenario of scenarios) {
    const bundle = collectBundle(scenario);
    if (isUsableBundle(bundle)) {
      return { ...bundle, note: scenario.note };
    }
  }

  return { ...collectBundle({ role: "", need: selection.need, industry: "" }), note: "已补充当前需求的通用内容。" };
}

function collectBundle(selection) {
  const core = queryItems([...model.itemsByType.deepread, ...model.itemsByType.chapter], selection);
  const sops = queryItems(model.itemsByType.sop, selection);
  const tools = queryItems(model.itemsByType.tool, selection);
  const scripts = queryItems(model.itemsByType.script, selection);
  const cases = queryItems(model.itemsByType.case, selection);
  const rawTables = queryItems(model.itemsByType.rawTable, selection);
  const downloads = buildDownloads(selection, tools, rawTables);

  return { core, sops, tools, scripts, cases, rawTables, downloads };
}

function buildDownloads(selection, tools, rawTables) {
  const items = [];
  const seen = new Set();

  const push = (item) => {
    const target = item.downloadUrl || item.url;
    if (!target || seen.has(target)) return;
    seen.add(target);
    items.push(item);
  };

  if (model.bundleDownload) push(model.bundleDownload);

  model.manuals
    .filter((item) => !selection.need || item.stageBuckets.includes(selection.need))
    .forEach(push);

  tools.filter((item) => item.downloadMode === "download" && hasDownloadTarget(item)).forEach((item) => {
    push({
      id: `download-${item.id}`,
      title: item.title,
      summary: item.summary,
      contentType: "tool",
      downloadUrl: item.downloadUrl,
      previewUrl: item.previewUrl,
      actionLabel: "下载源表",
      roles: item.roles,
      industries: item.industries,
      stageBuckets: item.stageBuckets,
      priority: item.priority
    });
  });

  rawTables.filter(hasDownloadTarget).forEach(push);
  return sortItems(items, selection);
}

function buildOriginalsBundle(selection) {
  const bundle = isSelectionComplete()
    ? buildBundle(selection)
    : buildBundle({ role: "", need: NEED_BUCKETS[0], industry: "" });

  const manuals = sortItems(model.manuals.slice(), selection);
  const external = sortItems(model.externalSources.slice(), selection);
  const downloads = sortItems(dedupeById([
    ...(model.bundleDownload ? [model.bundleDownload] : []),
    ...bundle.downloads,
    ...model.rawDownloadPool
  ]), selection).filter(hasDownloadTarget);

  return { manuals, external, downloads };
}

function buildWorkspaceSummary(bundle, guide) {
  const parts = [`当前为 ${state.role} / ${state.need}${state.industry ? ` / ${state.industry}` : ""} 排序。`];
  if (guide) parts.push(guide.summary);
  if (bundle.note) parts.push(bundle.note);
  return parts.join(" ");
}

function buildWorkspaceRecommendations(bundle) {
  const list = [];
  const push = (item) => {
    if (!item || list.some((entry) => entry.id === item.id)) return;
    list.push(item);
  };

  push(bundle.core[1]);
  push(bundle.sops[0]);
  push(bundle.tools[0]);
  push(bundle.cases[0]);
  push(bundle.scripts[0]);
  return list.filter(Boolean).slice(0, 4);
}

function buildDetailToolbarText(item) {
  if (item.contentType === "deepread" || item.contentType === "chapter") {
    return "这一页适合完整读透，再回到工作台拿工具、话术和案例直接执行。";
  }
  return "这一页适合带训和交付时逐步执行，看完就顺手去拿对应工具或案例。";
}

function buildDetailPrimaryActions(item) {
  const actions = [];
  actions.push(`<button class="btn btn-secondary" type="button" data-jump="detailBodySection">直接看正文</button>`);
  actions.push(`<button class="btn btn-ghost" type="button" data-copy-item="${escapeAttr(item.id)}">复制内容</button>`);
  if (item.manualFile && isRelativeAsset(item.manualFile)) {
    actions.push(renderLinkButton(item.manualFile, "打开手册", { secondary: true }));
  }
  return actions.join("");
}

function buildDetailAnchorTabs(item) {
  const tabs = [
    { id: "detail-overview-section", label: "概览" },
    { id: "detailBodySection", label: item.contentType === "sop" ? "完整 SOP" : "正文" },
    { id: "detail-action-section", label: "下一步动作" },
    { id: "detailRecommendationsSection", label: "继续推荐" }
  ];
  return tabs.map((tab) => `
    <button class="chip${state.currentSection === tab.id ? " chip-highlight" : ""}" type="button" data-jump="${tab.id}">
      ${escapeHtml(tab.label)}
    </button>
  `).join("");
}

function buildDetailBody(item) {
  if (item.contentType === "sop") {
    return `
      <div class="detail-stack">
        ${item.trigger ? `<div class="preview-support"><strong>何时启动</strong><p>${escapeHtml(item.trigger)}</p></div>` : ""}
        ${item.owner ? `<div class="preview-support"><strong>谁负责</strong><p>${escapeHtml(item.owner)}</p></div>` : ""}
        ${(item.steps || []).map((step) => `
          <section class="chapter-block">
            <h3>${escapeHtml(step.title)}</h3>
            <ul class="plain-list">${(step.items || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
          </section>
        `).join("")}
        ${item.deliverables && item.deliverables.length ? `
          <section class="preview-support">
            <strong>输出物</strong>
            <ul class="plain-list">${item.deliverables.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
          </section>
        ` : ""}
        ${item.acceptance && item.acceptance.length ? `
          <section class="preview-support">
            <strong>验收标准</strong>
            <ul class="plain-list">${item.acceptance.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
          </section>
        ` : ""}
      </div>
    `;
  }

  return `
    <div class="detail-stack">
      ${(item.sections || []).map((section) => `
        <section class="chapter-block">
          <h3>${escapeHtml(section.title)}</h3>
          ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          ${(section.bullets || []).length ? `<ul class="plain-list">${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}
        </section>
      `).join("")}
      ${item.actionChecklist && item.actionChecklist.length ? `
        <section class="preview-support">
          <strong>建议先做的动作</strong>
          <ul class="plain-list">${item.actionChecklist.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
        </section>
      ` : ""}
      ${item.managerChecklist && item.managerChecklist.length ? `
        <section class="preview-support">
          <strong>店长检查表</strong>
          <ul class="plain-list">${item.managerChecklist.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
        </section>
      ` : ""}
    </div>
  `;
}

function buildDetailActionCards(item) {
  return getRelatedCandidates(item).slice(0, 3).map((entry) => ({
    title: entry.title,
    text: getItemBenefit(entry),
    buttonHtml: resolveActionTarget(entry)
  }));
}

function buildDetailRecommendations(item) {
  const siblings = getSiblingItems(item).filter((entry) => entry.id !== item.id);
  const extra = getRelatedCandidates(item).filter((entry) => entry.id !== item.id);
  return dedupeById([...siblings, ...extra]).slice(0, 4);
}

function getRelatedCandidates(item) {
  const direct = (item.relatedResources || [])
    .map((id) => model.lookup.get(id) || model.downloadLookup.get(id))
    .filter(Boolean);
  const fallback = [
    ...queryItems(model.itemsByType.tool, getCurrentSelection()),
    ...queryItems(model.itemsByType.script, getCurrentSelection()),
    ...queryItems(model.itemsByType.case, getCurrentSelection())
  ];
  return dedupeById([...direct, ...fallback]).filter((entry) => entry.id !== item.id);
}

function getSiblingItems(item) {
  const bundle = runtime.bundle || buildBundle(getCurrentSelection());
  return item.contentType === "sop"
    ? bundle.sops
    : bundle.core.filter(hasDetailResources);
}

function openWorkspace(target = "core-section", options = {}) {
  state.view = "workspace";
  state.detailId = "";
  if (target) state.lastWorkspaceAnchor = target;
  if (options.focusItem) runtime.pendingFocusItem = options.focusItem;
  persistState();
  renderWorkspace(target, options);
}

function openOriginals(sourceView = "home") {
  state.originalSourceView = sourceView;
  state.view = "originals";
  persistState();
  renderOriginals();
}

function openDetail(id, sourceSection = "") {
  const item = model.lookup.get(id);
  if (!item) return;
  if (!hasDetailResources(item)) {
    focusItemCard(item.id, getSectionForType(item.contentType));
    return;
  }

  state.lastWorkspaceScroll = window.scrollY;
  state.detailId = id;
  state.detailSourceSection = sourceSection || getSectionForType(item.contentType);
  state.view = "detail";
  pushRecent(id);
  persistState();
  renderDetail();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function jumpTo(id, smooth = true) {
  if (!id) return;
  const element = document.getElementById(id);
  if (!element) return;
  state.currentSection = id;
  if (state.view === "workspace") {
    state.lastWorkspaceAnchor = id;
    state.lastWorkspaceScroll = window.scrollY;
  }
  persistState();
  element.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

function focusSelectionPrompt(message) {
  if (message) showToast(message);
  els.selectorCard.classList.remove("needs-attention");
  void els.selectorCard.offsetWidth;
  els.selectorCard.classList.add("needs-attention");
  els.selectorCard.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => els.selectorCard.classList.remove("needs-attention"), 1400);
}

function focusItemCard(itemId, sectionId = "") {
  if (!itemId) return;
  const item = model.lookup.get(itemId);
  const targetSection = sectionId || getSectionForType(item?.contentType || "");
  state.detailId = "";
  openWorkspace(targetSection, { focusItem: itemId });
}

function highlightCard(itemId) {
  const element = document.getElementById(`item-${itemId}`);
  if (!element) return;
  element.classList.remove("needs-attention");
  void element.offsetWidth;
  element.classList.add("needs-attention");
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => element.classList.remove("needs-attention"), 1400);
}

function renderFilterGroup(group, activeValue) {
  return `
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
            class="filter-chip${activeValue === option ? " is-active" : ""}"
            type="button"
            data-filter-key="${escapeAttr(group.key)}"
            data-filter-value="${escapeAttr(option)}"
          >${escapeHtml(option)}</button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPreviewCard({ item, body = "", actions = "", callout = "", recommended = false, open = true }) {
  return `
    <article class="preview-card${open ? " preview-card-open" : ""}${recommended ? " preview-card-recommended" : ""}" id="item-${escapeAttr(item.id)}">
      <div class="preview-card-head">
        <div class="preview-card-copy">
          <div class="module-meta">
            <span class="chip chip-soft">${escapeHtml(TYPE_LABELS[item.contentType] || "内容")}</span>
            ${recommended ? `<span class="chip chip-highlight">建议先读</span>` : ""}
            ${item.sourceTag ? `<span class="chip chip-match">${escapeHtml(item.sourceTag)}</span>` : ""}
          </div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(getItemBenefit(item))}</p>
        </div>
      </div>
      ${callout}
      ${body ? `<div class="preview-card-body">${body}</div>` : ""}
      ${actions ? `<div class="card-actions">${actions}</div>` : ""}
    </article>
  `;
}

function buildPreviewActions(item) {
  const actions = [];
  if (item.contentType === "tool" || item.contentType === "script" || item.contentType === "case") {
    actions.push(`<button class="btn btn-secondary" type="button" data-copy-item="${escapeAttr(item.id)}">复制内容</button>`);
  }
  if (item.contentType === "tool" && item.downloadMode === "download" && hasDownloadTarget(item)) {
    actions.push(renderLinkButton(item.downloadUrl, "下载源表"));
  }
  if (item.contentType === "case" && item.source && item.source.url && (isExternalUrl(item.source.url) || isRelativeAsset(item.source.url))) {
    actions.push(renderLinkButton(item.source.url, "查看来源", { secondary: true, external: isExternalUrl(item.source.url) }));
  }
  if (item.previewUrl && isRelativeAsset(item.previewUrl)) {
    actions.push(renderLinkButton(item.previewUrl, "打开预览", { secondary: true }));
  }
  return actions.join("");
}

function renderInlinePreviewContent(item) {
  if (item.contentType === "tool") {
    return `
      ${item.table ? renderCompactTable(item.table.columns, item.table.rows) : ""}
      ${(item.notes || []).length ? `<div class="preview-support"><strong>使用提醒</strong><ul class="plain-list">${item.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul></div>` : ""}
    `;
  }

  if (item.contentType === "script") {
    return `
      <div class="preview-support">
        <strong>适用场景</strong>
        <p>${escapeHtml(item.scenario || item.summary || "")}</p>
        <ul class="plain-list">${(item.lines || []).slice(0, 4).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </div>
      ${(item.tips || []).length ? `<div class="preview-support"><strong>使用提醒</strong><ul class="plain-list">${item.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul></div>` : ""}
    `;
  }

  if (item.contentType === "case") {
    return `
      <div class="preview-support">
        <strong>案例场景</strong>
        <p>${escapeHtml(item.scenario || "")}</p>
        ${(item.approach || []).length ? `<ul class="plain-list">${item.approach.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>` : ""}
      </div>
      ${(item.results || []).length ? `<div class="preview-support"><strong>结果</strong><ul class="plain-list">${item.results.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul></div>` : ""}
      ${(item.reusable || []).length ? `<div class="preview-support"><strong>可复用点</strong><ul class="plain-list">${item.reusable.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul></div>` : ""}
    `;
  }

  if (item.contentType === "sop") {
    return `
      <div class="preview-support">
        ${item.timeCost ? `<strong>${escapeHtml(item.timeCost)}</strong>` : ""}
        ${(item.steps || []).slice(0, 2).map((step) => `
          <div class="preview-inline-step">
            <strong>${escapeHtml(step.title)}</strong>
            <ul class="plain-list">${(step.items || []).slice(0, 3).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
          </div>
        `).join("")}
      </div>
    `;
  }

  const section = (item.sections || [])[0];
  const paragraphs = (section && section.paragraphs) ? section.paragraphs.slice(0, 2) : [];
  const bullets = (section && section.bullets) ? section.bullets.slice(0, 4) : [];
  return `
    ${section ? `<div class="preview-support"><strong>${escapeHtml(section.title)}</strong>${paragraphs.map((entry) => `<p>${escapeHtml(entry)}</p>`).join("")}${bullets.length ? `<ul class="plain-list">${bullets.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>` : ""}</div>` : ""}
    ${item.actionChecklist && item.actionChecklist.length ? `<div class="preview-support"><strong>看完先做</strong><ul class="plain-list">${item.actionChecklist.slice(0, 3).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul></div>` : ""}
  `;
}

function buildEntryCallout(title, text) {
  return `
    <div class="preview-entry-callout">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(text)}</span>
    </div>
  `;
}

function renderCompactTable(columns, rows) {
  return renderTable(columns.slice(0, 4), rows.slice(0, 4));
}

function renderActionShortcutCard({ title, text, buttonLabel, jump }) {
  return `
    <article class="action-card">
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
      <div class="card-actions">
        <button class="btn btn-secondary" type="button" data-jump="${escapeAttr(jump)}">${escapeHtml(buttonLabel)}</button>
      </div>
    </article>
  `;
}

function renderActionCard(action) {
  return `
    <article class="preview-card">
      <div class="preview-card-copy">
        <h4>${escapeHtml(action.title)}</h4>
        <p>${escapeHtml(action.text)}</p>
      </div>
      <div class="card-actions">${action.buttonHtml}</div>
    </article>
  `;
}

function renderDownloadCard(item) {
  const target = item.downloadUrl || item.url;
  const buttonHtml = hasDownloadTarget(item)
    ? renderLinkButton(target, item.actionLabel || (item.contentType === "manual" ? "打开手册" : "打开资料"), {
        external: isExternalUrl(target),
        download: isRelativeAsset(target) && !/\.docx$/i.test(target)
      })
    : item.downloadMode === "copy"
      ? `<button class="btn btn-secondary" type="button" data-copy-item="${escapeAttr(item.id)}">复制内容</button>`
      : "";

  return `
    <article class="preview-card">
      <div class="preview-card-copy">
        <div class="module-meta">
          <span class="chip chip-soft">${escapeHtml(TYPE_LABELS[item.contentType] || "资料")}</span>
          ${item.sourceTag ? `<span class="chip chip-match">${escapeHtml(item.sourceTag)}</span>` : ""}
        </div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.summary || getItemBenefit(item))}</p>
      </div>
      ${buttonHtml ? `<div class="card-actions">${buttonHtml}</div>` : ""}
    </article>
  `;
}

function renderSearchResult(item) {
  if (item.contentType === "tool" || item.contentType === "script" || item.contentType === "case") {
    return `
      <button class="search-result-btn" type="button" data-focus-item="${escapeAttr(item.id)}" data-section="${escapeAttr(getSectionForType(item.contentType))}">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(getItemBenefit(item))}</span>
      </button>
    `;
  }

  if (item.contentType === "manual" || item.contentType === "bundle" || item.contentType === "external" || item.contentType === "rawTable") {
    return renderLinkButton(item.downloadUrl || item.url, item.actionLabel || "打开资料", {
      block: true,
      external: isExternalUrl(item.downloadUrl || item.url),
      download: isRelativeAsset(item.downloadUrl || item.url)
    });
  }

  return `
    <button class="search-result-btn" type="button" data-open-detail="${escapeAttr(item.id)}" data-source-section="${escapeAttr(getSectionForType(item.contentType))}">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(getItemBenefit(item))}</span>
    </button>
  `;
}

function renderLinkButton(url, label, options = {}) {
  if (!url) return "";
  const attrs = [];
  if (options.external) {
    attrs.push('target="_blank"', 'rel="noreferrer noopener"');
  }
  if (options.download) {
    attrs.push("download");
  }
  const cls = options.block ? "search-result-link" : `btn ${options.secondary ? "btn-secondary" : "btn-primary"}`;
  return `<a class="${cls}" href="${escapeAttr(url)}" ${attrs.join(" ")}>${escapeHtml(label)}</a>`;
}

function renderContextBadges(item) {
  const badges = [];
  if (item.roles && item.roles.length) badges.push(`适合${item.roles.join(" / ")}`);
  if (item.industries && item.industries.length && item.industries.length < defaults.industries.length) badges.push(item.industries.join(" / "));
  if (item.stageBuckets && item.stageBuckets.length) badges.push(item.stageBuckets.join(" / "));
  return badges.slice(0, 3).map((label) => `<span class="chip chip-match">${escapeHtml(label)}</span>`).join("");
}

function getSectionForType(type) {
  if (type === "deepread" || type === "chapter") return "core-section";
  if (type === "sop") return "sops-section";
  if (type === "tool") return "tools-section";
  if (type === "script") return "scripts-section";
  if (type === "case") return "cases-section";
  return "downloads-section";
}

function getVisibleHomeSections() {
  return [
    { id: "selectorCard", label: HOME_SECTION_LABELS.selectorCard, summary: "返回选择角色、需求和行业。" },
    { id: "homeArsenalSection", label: HOME_SECTION_LABELS.homeArsenalSection, summary: "直接看 6 张具体内容卡。" },
    { id: "homeOriginalsSection", label: HOME_SECTION_LABELS.homeOriginalsSection, summary: "进入完整手册、资料和原表下载。" },
    { id: "capabilitySection", label: HOME_SECTION_LABELS.capabilitySection, summary: "查看系统能力和工作路径。" },
    !els.continueCard.classList.contains("hidden") ? { id: "continueCard", label: HOME_SECTION_LABELS.continueCard, summary: "继续上次浏览进度。" } : null
  ].filter(Boolean);
}

function getVisibleWorkspaceSections(bundle = runtime.bundle) {
  const sections = [];
  if (bundle?.core.length) sections.push({ id: "core-section", label: "正文", summary: "优先看主线内容和深读入口。" });
  if (!document.getElementById("action-section")?.classList.contains("hidden")) sections.push({ id: "action-section", label: "行动指令", summary: "看完后先做什么。" });
  if (bundle?.sops.length) sections.push({ id: "sops-section", label: "SOP", summary: "完整流程怎么带着跑。" });
  if (bundle?.tools.length) sections.push({ id: "tools-section", label: "工具", summary: "表格、检查表和模板。" });
  if (bundle?.scripts.length) sections.push({ id: "scripts-section", label: "话术", summary: "现场能直接改写使用。" });
  if (bundle?.cases.length) sections.push({ id: "cases-section", label: "案例", summary: "直接看做法、结果和可复用点。" });
  if (bundle?.downloads.length) sections.push({ id: "downloads-section", label: "下载", summary: "可直接打开或下载的资料。" });
  if (!document.getElementById("recommend-section")?.classList.contains("hidden")) sections.push({ id: "recommend-section", label: "推荐", summary: "下一步建议看什么。" });
  return sections;
}

function getVisibleOriginalsSections(bundle = runtime.originals) {
  const sections = [];
  if (bundle?.manuals.length) sections.push({ id: "originals-manuals-section", label: "完整手册", summary: "打开整本手册全文。" });
  if (bundle?.external.length) sections.push({ id: "originals-external-section", label: "外部资料", summary: "官方 PDF 和网页资料入口。" });
  if (bundle?.downloads.length) sections.push({ id: "originals-downloads-section", label: "原表下载", summary: "下载打包资料和真实源表。" });
  return sections;
}

function getVisibleDetailSections() {
  return [
    { id: "detail-overview-section", label: "概览", summary: "当前这篇的定位和入口。" },
    { id: "detailBodySection", label: "正文", summary: "完整正文或完整 SOP。" },
    { id: "detail-action-section", label: "行动", summary: "读完后直接可做的动作。" },
    { id: "detailRecommendationsSection", label: "继续推荐", summary: "顺着继续读什么。" }
  ];
}

function getCurrentSectionLabels() {
  if (state.view === "workspace") return WORKSPACE_SECTION_LABELS;
  if (state.view === "originals") return ORIGINALS_SECTION_LABELS;
  if (state.view === "detail") return DETAIL_SECTION_LABELS;
  return HOME_SECTION_LABELS;
}

function shouldShowFloatingNav(view, scrollY) {
  return view === "home" ? scrollY > 220 : scrollY > 160;
}

function updateCurrentSectionFromScroll() {
  const sections = runtime.visibleSections || [];
  if (!sections.length) return;
  const offset = 160;
  let current = sections[0].id;
  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    if (!element) return;
    if (element.getBoundingClientRect().top <= offset) current = section.id;
  });
  state.currentSection = current;
  if (state.view === "workspace") {
    state.lastWorkspaceAnchor = current;
    state.lastWorkspaceScroll = window.scrollY;
  }
  persistState();
}

function maybeMarkCurrentDetailComplete() {
  if (state.view !== "detail" || !state.detailId) return;
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
  if (nearBottom && !state.completedDetailIds.has(state.detailId)) {
    state.completedDetailIds.add(state.detailId);
    persistState();
  }
}

function buildSearchGroups(bundle, query) {
  if (!query) return [];
  const keyword = normalizeText(query);
  const items = [...bundle.core, ...bundle.sops, ...bundle.tools, ...bundle.scripts, ...bundle.cases, ...bundle.downloads];
  const filtered = items
    .map((item) => ({ item, score: searchScore(item, keyword) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 18)
    .map((entry) => entry.item);

  const groups = new Map();
  filtered.forEach((item) => {
    const key = item.contentType === "deepread" || item.contentType === "chapter" ? "正文"
      : item.contentType === "sop" ? "SOP"
      : item.contentType === "tool" ? "工具"
      : item.contentType === "script" ? "话术"
      : item.contentType === "case" ? "案例"
      : "下载资料";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return [...groups.entries()].map(([label, itemsInGroup]) => ({ label, items: itemsInGroup }));
}

function searchScore(item, keyword) {
  const text = normalizeText(item.searchText || "");
  if (!text.includes(keyword)) return 0;
  let score = item.priority || 0;
  if (normalizeText(item.title).includes(keyword)) score += 24;
  if (normalizeText(item.summary).includes(keyword)) score += 12;
  if (state.need && item.stageBuckets.includes(state.need)) score += 12;
  if (state.industry && item.industries.includes(state.industry)) score += 8;
  return score;
}

function toggleSection(id, visible) {
  const element = document.getElementById(id);
  if (element) element.classList.toggle("hidden", !visible);
}

function toggleSelection(key, value) {
  state[key] = state[key] === value ? "" : value;
  state.search = "";
  persistState();
}

function clearSelection() {
  state.role = "";
  state.need = "";
  state.industry = "";
  state.search = "";
  state.detailId = "";
  state.lastWorkspaceAnchor = "core-section";
  state.lastWorkspaceScroll = 0;
}

function getCurrentSelection() {
  return { role: state.role, need: state.need, industry: state.industry };
}

function isSelectionComplete() {
  return Boolean(state.role && state.need);
}

async function handleCopy(id) {
  const item = model.lookup.get(id) || model.downloadLookup.get(id);
  if (!item) return;
  const serializer = {
    chapter: serializeChapter,
    deepread: serializeDeepRead,
    sop: serializeSop,
    tool: serializeTool,
    script: serializeScript,
    case: serializeCase,
    rawTable: serializeTool
  }[item.contentType];
  const text = serializer ? serializer(item) : `${item.title}\n${item.summary || ""}`.trim();
  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制到剪贴板");
  } catch (error) {
    els.copyFallbackText.value = text;
    els.copyFallback.classList.remove("hidden");
  }
}

function pushRecent(id) {
  state.recentIds = [id, ...state.recentIds.filter((entry) => entry !== id)].slice(0, 8);
}

function resolveActionTarget(item) {
  if (item.contentType === "deepread" || item.contentType === "chapter" || item.contentType === "sop") {
    return `<button class="btn btn-primary" type="button" data-open-detail="${escapeAttr(item.id)}" data-source-section="${escapeAttr(getSectionForType(item.contentType))}">继续阅读</button>`;
  }
  if (item.contentType === "tool" || item.contentType === "script" || item.contentType === "case") {
    return `<button class="btn btn-secondary" type="button" data-focus-item="${escapeAttr(item.id)}" data-section="${escapeAttr(getSectionForType(item.contentType))}">定位到这一板块</button>`;
  }
  return renderLinkButton(item.downloadUrl || item.url, item.actionLabel || "打开资料", { external: isExternalUrl(item.downloadUrl || item.url), download: isRelativeAsset(item.downloadUrl || item.url) });
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
    title: "全部原始表格打包",
    summary: "完整打包下载，适合离线修改、内部培训和二次交付。",
    contentType: "bundle",
    downloadUrl: content.rawTableBundle,
    actionLabel: "下载原表包",
    priority: TYPE_PRIORITY.bundle,
    stageBuckets: NEED_BUCKETS.slice(),
    roles: defaults.roles.slice(),
    industries: defaults.industries.slice()
  } : null;

  const externalSources = (content.sources || [])
    .filter((source) => isExternalUrl(source.url))
    .map((source) => ({
      id: source.id || `external-${slugify(source.title)}`,
      title: source.title,
      summary: source.description || source.type || "外部资料",
      contentType: "external",
      url: source.url,
      actionLabel: source.buttonLabel || "打开资料",
      priority: TYPE_PRIORITY.external,
      roles: defaults.roles.slice(),
      industries: defaults.industries.slice(),
      stageBuckets: NEED_BUCKETS.slice(),
      searchText: [source.title, source.description, source.type].filter(Boolean).join(" ")
    }));

  const rawDownloadPool = itemsByType.rawTable.filter(hasDownloadTarget).map((item) => ({
    ...item,
    actionLabel: "下载源表"
  }));

  const downloadLookup = new Map();
  [...manuals, ...externalSources, ...rawDownloadPool, ...(bundleDownload ? [bundleDownload] : [])].forEach((item) => downloadLookup.set(item.id, item));

  return {
    itemsByType,
    lookup,
    manuals,
    externalSources,
    bundleDownload,
    rawDownloadPool,
    downloadLookup,
    totals: {
      core: itemsByType.chapter.length + itemsByType.deepread.length,
      sops: itemsByType.sop.length,
      tools: itemsByType.tool.length,
      scripts: itemsByType.script.length,
      cases: itemsByType.case.length,
      downloads: manuals.length + externalSources.length + rawDownloadPool.length + (bundleDownload ? 1 : 0)
    }
  };
}

function normalizeCollection(items, type) {
  return items.map((item) => normalizeItem(item, type));
}

function normalizeItem(item, type) {
  const stages = [...new Set((item.stages || (item.stage ? [item.stage] : [])).filter(Boolean))];
  return {
    ...item,
    contentType: type,
    roles: item.roles && item.roles.length ? item.roles.slice() : defaults.roles.slice(),
    industries: item.industries && item.industries.length ? item.industries.slice() : defaults.industries.slice(),
    stageBuckets: buildStageBuckets(stages, item.needs || []),
    summary: item.summary || item.overview || item.scenario || "",
    previewUrl: item.preview || "",
    downloadUrl: item.download || "",
    downloadMode: getDownloadMode(type, item),
    sourceTag: getSourceTag(type, item),
    priority: TYPE_PRIORITY[type] || 0,
    searchText: buildSearchText(item)
  };
}

function buildStageBuckets(stages, needs) {
  const values = [];
  stages.forEach((stage) => values.push(...(STAGE_BUCKET_MAP[stage] || [])));
  needs.forEach((need) => { if (NEED_BUCKETS.includes(need)) values.push(need); });
  return [...new Set(values.length ? values : NEED_BUCKETS)];
}

function getDownloadMode(type, item) {
  if (type === "tool" || type === "rawTable") {
    if (item.download) return "download";
    if (item.table || item.notes || item.summary) return "copy";
    return "read-only";
  }
  if (["chapter", "deepread", "sop", "script", "case"].includes(type)) return "copy";
  return "read-only";
}

function getSourceTag(type, item) {
  if (item.sourceManual) return item.sourceManual;
  if (type === "case" && item.source && isExternalUrl(item.source.url)) return "外部补充";
  if (type === "rawTable") return "原始表格";
  return "";
}

function buildManualDownloads(content, deepReads) {
  const manualMap = new Map();
  deepReads.forEach((item) => {
    if (!item.manualFile || !isRelativeAsset(item.manualFile)) return;
    if (!manualMap.has(item.manualFile)) {
      manualMap.set(item.manualFile, {
        id: `manual-${slugify(item.manualFile)}`,
        title: prettyFileName(item.manualFile),
        summary: item.sourceManual ? `${item.sourceManual}完整原文，可直接打开。` : "完整原文，可直接打开。",
        contentType: "manual",
        downloadUrl: item.manualFile,
        actionLabel: "打开手册",
        stageBuckets: [],
        roles: [],
        industries: [],
        priority: TYPE_PRIORITY.manual
      });
    }
    const manual = manualMap.get(item.manualFile);
    manual.stageBuckets.push(...item.stageBuckets);
    manual.roles.push(...item.roles);
    manual.industries.push(...item.industries);
  });

  (content.sources || []).forEach((source) => {
    if (!source.url || !isRelativeAsset(source.url) || !/\.docx$/i.test(source.url)) return;
    if (manualMap.has(source.url)) return;
    manualMap.set(source.url, {
      id: `manual-${slugify(source.url)}`,
      title: prettyFileName(source.url),
      summary: source.description || "完整手册，可直接打开。",
      contentType: "manual",
      downloadUrl: source.url,
      actionLabel: source.buttonLabel || "打开手册",
      stageBuckets: NEED_BUCKETS.slice(),
      roles: defaults.roles.slice(),
      industries: defaults.industries.slice(),
      priority: TYPE_PRIORITY.manual
    });
  });

  return [...manualMap.values()].map((item) => ({
    ...item,
    stageBuckets: [...new Set(item.stageBuckets.length ? item.stageBuckets : NEED_BUCKETS)],
    roles: [...new Set(item.roles.length ? item.roles : defaults.roles)],
    industries: [...new Set(item.industries.length ? item.industries : defaults.industries)],
    searchText: [item.title, item.summary].join(" ")
  }));
}

function buildSearchText(item) {
  const values = [item.title, item.summary, item.overview, item.scenario, item.sourceManual, item.industry];
  (item.sections || []).forEach((section) => {
    values.push(section.title);
    (section.paragraphs || []).forEach((entry) => values.push(entry));
    (section.bullets || []).forEach((entry) => values.push(entry));
  });
  (item.actionChecklist || []).forEach((entry) => values.push(entry));
  (item.managerChecklist || []).forEach((entry) => values.push(entry));
  (item.deliverables || []).forEach((entry) => values.push(entry));
  (item.acceptance || []).forEach((entry) => values.push(entry));
  (item.notes || []).forEach((entry) => values.push(entry));
  (item.lines || []).forEach((entry) => values.push(entry));
  (item.tips || []).forEach((entry) => values.push(entry));
  (item.results || []).forEach((entry) => values.push(entry));
  (item.approach || []).forEach((entry) => values.push(entry));
  (item.reusable || []).forEach((entry) => values.push(entry));
  if (item.table) {
    item.table.columns.forEach((entry) => values.push(entry));
    item.table.rows.forEach((row) => row.forEach((entry) => values.push(entry)));
  }
  if (item.steps) {
    item.steps.forEach((step) => {
      values.push(step.title);
      step.items.forEach((entry) => values.push(entry));
    });
  }
  return values.filter(Boolean).join(" ");
}

function getItemBenefit(item) {
  return truncateText(item.summary || item.overview || item.scenario || "直接进入这块内容。", 68);
}

function hasDetailResources(item) {
  return item && (item.contentType === "deepread" || item.contentType === "chapter" || item.contentType === "sop");
}

function serializeChapter(item) {
  const lines = [item.title, item.overview || item.summary || "", ""];
  (item.sections || []).forEach((section) => {
    lines.push(section.title);
    (section.paragraphs || []).forEach((entry) => lines.push(entry));
    (section.bullets || []).forEach((entry) => lines.push(`- ${entry}`));
    lines.push("");
  });
  (item.actionChecklist || []).forEach((entry) => lines.push(`- ${entry}`));
  return lines.join("\n");
}

function serializeDeepRead(item) {
  return serializeChapter(item);
}

function serializeSop(item) {
  const lines = [item.title, item.summary || "", item.timeCost ? `时间：${item.timeCost}` : "", ""].filter(Boolean);
  (item.steps || []).forEach((step) => {
    lines.push(step.title);
    (step.items || []).forEach((entry) => lines.push(`- ${entry}`));
    lines.push("");
  });
  (item.deliverables || []).forEach((entry) => lines.push(`- ${entry}`));
  (item.acceptance || []).forEach((entry) => lines.push(`- ${entry}`));
  return lines.join("\n");
}

function serializeTool(item) {
  const lines = [item.title, item.summary || "", ""];
  if (item.table) {
    lines.push(item.table.columns.join(" | "));
    item.table.rows.forEach((row) => lines.push(row.join(" | ")));
    lines.push("");
  }
  (item.notes || []).forEach((entry) => lines.push(`- ${entry}`));
  return lines.join("\n");
}

function serializeScript(item) {
  const lines = [item.title, item.summary || "", item.scenario ? `适用场景：${item.scenario}` : "", ""].filter(Boolean);
  (item.lines || []).forEach((entry) => lines.push(`- ${entry}`));
  (item.tips || []).forEach((entry) => lines.push(`- ${entry}`));
  return lines.join("\n");
}

function serializeCase(item) {
  const lines = [item.title, item.scenario || "", ""];
  lines.push("做法");
  (item.approach || []).forEach((entry) => lines.push(`- ${entry}`));
  lines.push("");
  lines.push("结果");
  (item.results || []).forEach((entry) => lines.push(`- ${entry}`));
  lines.push("");
  lines.push("可复用点");
  (item.reusable || []).forEach((entry) => lines.push(`- ${entry}`));
  return lines.join("\n");
}

function queryItems(items, selection) {
  return items
    .filter((item) => matchesSelection(item, selection))
    .sort((a, b) => scoreItem(b, selection) - scoreItem(a, selection));
}

function matchesSelection(item, selection) {
  if (selection.need && !item.stageBuckets.includes(selection.need)) return false;
  if (selection.role && item.roles && !item.roles.includes(selection.role)) return false;
  if (selection.industry && item.industries && !item.industries.includes(selection.industry)) return false;
  return true;
}

function scoreItem(item, selection) {
  let score = item.priority || 0;
  if (selection.need && item.stageBuckets.includes(selection.need)) score += 30;
  if (selection.role && item.roles.includes(selection.role)) score += 18;
  if (selection.industry && item.industries.includes(selection.industry)) score += 18;
  if (item.contentType === "deepread") score += 6;
  if (item.contentType === "chapter") score += 4;
  return score;
}

function isUsableBundle(bundle) {
  const actionable = bundle.sops.length + bundle.tools.length + bundle.scripts.length + bundle.cases.length + bundle.downloads.length;
  return bundle.core.length > 0 && actionable > 0;
}

function sortItems(items, selection = {}) {
  return items.slice().sort((a, b) => scoreItem(b, selection) - scoreItem(a, selection) || a.title.localeCompare(b.title, "zh-CN"));
}

function dedupeById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function hasDownloadTarget(item) {
  const target = item?.downloadUrl || item?.url || "";
  return isRelativeAsset(target) || isExternalUrl(target);
}

function prettyFileName(url) {
  return decodeURIComponent(String(url).replaceAll("\\", "/").split("/").pop() || url).replace(/^\.\//, "");
}

function slugify(value) {
  return String(value).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function getTitleById(id) {
  return model.lookup.get(id)?.title || model.downloadLookup.get(id)?.title || "相关内容";
}

function renderTable(columns, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  window.clearTimeout(runtime.toastTimer);
  runtime.toastTimer = window.setTimeout(() => els.toast.classList.add("hidden"), 1800);
}

function persistState() {
  localStorage.setItem(storageKeys.selection, JSON.stringify({
    role: state.role,
    need: state.need,
    industry: state.industry
  }));
  localStorage.setItem(storageKeys.ui, JSON.stringify({
    view: state.view,
    search: state.search,
    currentSection: state.currentSection,
    lastWorkspaceAnchor: state.lastWorkspaceAnchor,
    lastWorkspaceScroll: state.lastWorkspaceScroll,
    detailId: state.detailId,
    detailSourceSection: state.detailSourceSection,
    originalSourceView: state.originalSourceView
  }));
  localStorage.setItem(storageKeys.recent, JSON.stringify(state.recentIds));
  localStorage.setItem(storageKeys.completed, JSON.stringify([...state.completedDetailIds]));
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function truncateText(value, max = 72) {
  const text = String(value || "");
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function isRelativeAsset(value) {
  return /^\.\/.+/i.test(String(value || ""));
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(String(value || ""));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
