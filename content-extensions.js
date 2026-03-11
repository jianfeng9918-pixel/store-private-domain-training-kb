(() => {
  if (window.TRAINING_KB_EXTENDED) return;
  const kb = window.TRAINING_KB_CONTENT;
  if (!kb) return;

  window.TRAINING_KB_EXTENDED = true;

  const allRoles = ["老板", "店长", "店员"];
  const allIndustries = ["零售", "餐饮", "美业", "母婴", "服务型门店"];
  const leadManualFile = "./《门店私域引流手册》.docx";
  const conversionManualFile = "./门店增长-转化端✅ (2).docx";

  kb.title = "门店私域实战手册";
  kb.subtitle = "按角色、阶段、行业和需求直接读取内容的门店私域知识库";

  if (!kb.filters.needs.includes("话术")) {
    kb.filters.needs.push("话术");
  }

  kb.homeQuickStarts = [
    {
      id: "quick-boss",
      title: "老板先看",
      summary: "先看认知、链路和关键指标，适合老板快速抓全局。",
      kicker: "全局路线",
      entry: "principles",
      target: "deepreads-section",
      defaults: { role: "老板", stage: "认知", industry: "", need: "" }
    },
    {
      id: "quick-tools",
      title: "直接拿工具",
      summary: "排期表、检查表、模板和表格，适合现场直接用。",
      kicker: "工具模板",
      entry: "tools",
      target: "tools-section",
      defaults: { role: "", stage: "", industry: "", need: "工具" }
    },
    {
      id: "quick-script",
      title: "直接看话术",
      summary: "加粉、欢迎、追单、复购都能直接复制改写。",
      kicker: "高频话术",
      entry: "tools",
      target: "scripts-section",
      defaults: { role: "", stage: "", industry: "", need: "话术" }
    },
    {
      id: "quick-case",
      title: "直接看案例",
      summary: "想先借鉴别人怎么做，可以直接进案例库。",
      kicker: "案例拆解",
      entry: "learn",
      target: "cases-section",
      defaults: { role: "", stage: "", industry: "", need: "案例" }
    }
  ];

  kb.homeNeedShortcuts = [
    { id: "need-leads", label: "拉新", summary: "先看引流、加粉和承接。", entry: "learn", need: "拉新", target: "recommend-section" },
    { id: "need-conversion", label: "转化", summary: "先看私聊、活动和成交。", entry: "learn", need: "转化", target: "recommend-section" },
    { id: "need-repurchase", label: "复购", summary: "先看复购、唤醒和数据。", entry: "learn", need: "复购", target: "recommend-section" },
    { id: "need-scripts", label: "话术", summary: "直接进入可复制话术库。", entry: "tools", need: "话术", target: "scripts-section" },
    { id: "need-cases", label: "案例", summary: "先借鉴真实案例再落地。", entry: "learn", need: "案例", target: "cases-section" }
  ];

  kb.homeGuideCards = [
    {
      title: "章节正文",
      text: "12 个章节会把认知、引流、朋友圈、社群、私聊、活动、数据和培训落地系统讲清楚。"
    },
    {
      title: "专题深读",
      text: "新增的两本手册已经拆成连续专题，适合老板和店长系统读透某一个主题。"
    },
    {
      title: "工具、SOP 和话术",
      text: "工具库、培训 SOP 和话术库适合拿来直接培训、陪练和落地执行，不用再二次整理。"
    },
    {
      title: "案例和原始表格",
      text: "案例库适合对照借鉴，原始表格和预览图适合二次修改、交付和内部培训。"
    }
  ];

  kb.longReads = [
    {
      id: "longread-boss",
      title: "老板系统深读版",
      summary: "适合老板或咨询顾问一次性完整理解门店私域的经营逻辑、组织分工和验收机制。",
      duration: "建议阅读 45-60 分钟",
      entry: "learn",
      defaults: { role: "老板", stage: "", industry: "", need: "" },
      chapters: ["第一章认知篇", "第二章链路总览", "第九章数据与考核", "第十一章培训落地"],
      highlights: ["先统一方向", "再定机制", "最后看结果与验收"]
    },
    {
      id: "longread-manager",
      title: "店长带队深读版",
      summary: "适合店长做系统执行训练，从引流、发圈、社群到私聊、活动和复盘，形成带队动作。",
      duration: "建议阅读 60-90 分钟",
      entry: "learn",
      defaults: { role: "店长", stage: "", industry: "", need: "SOP" },
      chapters: ["第三章引流", "第五章朋友圈", "第六章社群", "第七章私聊转化", "第八章活动策划"],
      highlights: ["按执行顺序读", "每章配一套 SOP", "适合晨会和陪练"]
    },
    {
      id: "longread-launch",
      title: "30 天落地深读版",
      summary: "适合项目启动、加盟商赋能或老店重启，重点看诊断、训练营、活动和验收。",
      duration: "建议阅读 40-60 分钟",
      entry: "tools",
      defaults: { role: "店长", stage: "培训验收", industry: "", need: "SOP" },
      chapters: ["训前诊断", "14 天训练营", "活动排期", "培训验收"],
      highlights: ["先诊断", "再带练", "最后看验收与复盘"]
    }
  ];

  const section = (title, bullets) => ({ title, bullets });

  const chapterEnhancements = {
    "chapter-cognition": {
      trainingDuration: "建议讲解 35-45 分钟",
      trainingFocus: ["把私域讲成人话。", "先统一目标，再谈工具。", "让老板、店长、店员都知道自己为什么要做。"],
      trainerTips: ["少讲术语，多讲门店每天已经在做的动作。", "先处理老板顾虑，再讲执行动作。", "这一章的目标不是会用工具，而是愿意推进。"],
      practiceTasks: ["让老板用一句话讲清本店为什么做私域。", "让店长列出本店最依赖自然客流的 3 个风险点。", "让店员把“加微信”改写成“延续服务”的话术。"],
      recommendedTools: ["tool-value-map", "tool-reading-route", "tool-role-matrix"],
      recommendedCases: ["case-children-king", "case-watsons", "case-walmart"],
      extraSections: [section("培训设计：认知课讲透的标准", ["老板能说清目标，店长能拆出动作，店员知道明天先做什么。", "认知课要讲风险、机会和投入产出，不只是概念。", "讲完后必须立刻进入诊断或岗位分工。"])]
    },
    "chapter-map": {
      trainingDuration: "建议讲解 30-40 分钟",
      trainingFocus: ["看懂完整链路。", "知道每段链路谁负责。", "先找到本店最弱的一环。"],
      trainerTips: ["链路一定要画出来。", "不要平均用力，要先补短板。", "适合和岗位职责表一起讲。"],
      practiceTasks: ["画出本店顾客从进店到复购的真实路径。", "标出最弱 1 环和最容易提升的 1 环。", "给每个环节写负责人和指标。"],
      recommendedTools: ["tool-map", "tool-chain-task", "tool-role-matrix"],
      recommendedCases: ["case-tianhong", "case-laoxiangji", "case-belle"],
      extraSections: [section("链路图怎么讲更容易懂", ["把路径拆成到店前、到店中、离店后 3 段。", "讲链路时一定配岗位和数据，不然很容易空。", "先跑通一段链路，再逐步放大。"])]
    },
    "chapter-leads": {
      trainingDuration: "建议讲解 40-50 分钟",
      trainingFocus: ["掌握加粉原则。", "知道最有效的线下和线上触点。", "学会追踪加粉率和欢迎承接。"],
      trainerTips: ["不要只教话术，要连同物料点位一起讲。", "加粉不是求顾客帮忙，而是给顾客好处。", "培训现场最好直接做开口演练。"],
      practiceTasks: ["给收银台、门头、包裹卡各写一版加粉文案。", "每位店员演练 2 轮加粉开口。", "确定门店每天怎么记录加粉数据。"],
      recommendedTools: ["tool-materials", "tool-friend-tracker", "tool-hook-formula"],
      recommendedCases: ["case-children-king", "case-baidi", "case-duoxiai"],
      extraSections: [section("讲完这章当天就该做什么", ["检查门头、收银台、包裹卡有没有明确利益点。", "当天就开始记录加粉率和欢迎消息发送率。", "让店长带员工做一次真实营业演练。"])]
    },
    "chapter-acquire": {
      trainingDuration: "建议讲解 35-45 分钟",
      trainingFocus: ["把私域动作塞进营业流程。", "让店长学会排时段和排任务。", "把门店获客动作做成日任务。"],
      trainerTips: ["这一章重点是流程，不是创意。", "动作必须排进班次表。", "门店一忙就停，说明流程还没嵌进去。"],
      practiceTasks: ["按营业前、中、后拆出私域动作。", "明确谁负责加粉、回复、发圈和跟进。", "找出一天里最适合欢迎承接的 2 个时间窗。"],
      recommendedTools: ["tool-daily-rhythm", "tool-chain-task", "tool-coaching-log"],
      recommendedCases: ["case-tiantian", "case-boshiyuan", "case-vipcake"],
      extraSections: [section("店长带练要盯哪几个点", ["先盯动作完成率，再盯质量。", "最值得每天看的是加粉、回复、发圈和高意向跟进。", "动作先跑顺，再慢慢优化内容质量。"])]
    },
    "chapter-moments": {
      trainingDuration: "建议讲解 40-50 分钟",
      trainingFocus: ["让员工知道朋友圈不是广告墙。", "掌握内容配比和题材来源。", "学会让朋友圈自然引发私聊。"],
      trainerTips: ["不要讲成内容审美课。", "最好拿真实朋友圈现场改。", "先给题材库，再给模板。"],
      practiceTasks: ["按 4 类内容写 8 条题材。", "把 2 条硬广型朋友圈改写成顾问表达。", "排出 7 天朋友圈节奏。"],
      recommendedTools: ["tool-moments-ratio", "tool-moments-schedule", "tool-moments-check", "tool-moments-topic-bank"],
      recommendedCases: ["case-watsons", "case-bao-dao", "case-only"],
      extraSections: [section("朋友圈训练为什么一定要做 7 天周期", ["每天写 1 条比一次讲 30 条原则更有效。", "店长当天点评，员工第二天立刻改。", "朋友圈的目标是引发私聊，不是收集点赞。"])]
    },
    "chapter-groups": {
      trainingDuration: "建议讲解 45-55 分钟",
      trainingFocus: ["理解社群的真实用途。", "掌握启动、栏目和互动节奏。", "知道不同类型群的运营差异。"],
      trainerTips: ["不要把社群课讲成活动大全。", "先给固定栏目和固定时间。", "群里有人回、有人成交，才算真正活。"],
      practiceTasks: ["设计一个 7 天福利群启动节奏。", "给本店写 3 个固定栏目。", "写出群规和管理员回应标准。"],
      recommendedTools: ["tool-group-day", "tool-group-week", "tool-group-calendar-month"],
      recommendedCases: ["case-bai-guo", "case-ruixing", "case-hs-ayi"],
      extraSections: [section("社群课最该讲透的 3 个问题", ["这个群为什么存在。", "这个群每天发什么。", "群里成交后怎么接私聊和复购。"])]
    },
    "chapter-chat": {
      trainingDuration: "建议讲解 45-55 分钟",
      trainingFocus: ["掌握私聊的四段结构。", "让私聊建立在服务上。", "知道不同客户要用不同跟进方式。"],
      trainerTips: ["一定要做角色扮演。", "不要把私聊讲成万能金句。", "员工最需要的是识别客户阶段。"],
      practiceTasks: ["分别写新客、老客、高意向客户的开场。", "模拟价格、品质、时间三类顾虑。", "训练从朋友圈互动切到一对一。"],
      recommendedTools: ["tool-customer-grading", "tool-private-chat-script", "tool-coaching-log"],
      recommendedCases: ["case-zhou-da-fu", "case-bao-dao", "case-watsons"],
      extraSections: [section("店长检查私聊质量时要看什么", ["有没有先问需求。", "有没有记录标签和顾虑。", "有没有推进下一步，而不是只回复问题。"])]
    },
    "chapter-campaign": {
      trainingDuration: "建议讲解 40-50 分钟",
      trainingFocus: ["把活动拆成时间轴。", "知道会员日、储值、拼团和老带新怎么用。", "学会同时看引流、成交和复购目标。"],
      trainerTips: ["优先沉淀标准模板，不要每次从零想。", "活动一定配 D-14 到 D+7 的节奏。", "结束后要追单和复盘。"],
      practiceTasks: ["排出一场会员日活动时间表。", "写预热、爆发和收尾文案。", "列出一场活动至少要看的 5 个数据。"],
      recommendedTools: ["tool-campaign-plan", "tool-group-calendar-month", "tool-case-review-canvas"],
      recommendedCases: ["case-dicos", "case-tiantian", "case-siyu"],
      extraSections: [section("老板最该问的活动问题", ["这场活动沉淀了多少新客和会员。", "活动后 7 天有没有继续被接住。", "哪些动作是可复制的，哪些只是一次性透支。"])]
    },
    "chapter-data": {
      trainingDuration: "建议讲解 35-45 分钟",
      trainingFocus: ["让门店知道私域要看数据。", "区分结果指标和过程指标。", "建立周复盘和月考核节奏。"],
      trainerTips: ["先抓最关键的 5-8 个指标。", "数据一定和动作绑定。", "最适合和考核表、周报一起讲。"],
      practiceTasks: ["列出门店每周必看的 5 个指标。", "区分哪些指标归老板、店长、员工看。", "模拟一次周复盘并写出 3 个调整动作。"],
      recommendedTools: ["tool-data-dashboard", "tool-kpi-score", "tool-acceptance-scorecard"],
      recommendedCases: ["case-watsons", "case-boshiyuan", "case-laoxiangji"],
      extraSections: [section("周复盘会建议怎么开", ["先看加粉、触达、回复、成交、复购。", "每次只抓 2-3 个异常点。", "每次复盘必须落到下一周动作。"])]
    },
    "chapter-ai": {
      trainingDuration: "建议讲解 25-35 分钟",
      trainingFocus: ["知道 AI 最适合做提效，不是替代服务。", "掌握文案、排期、复盘 3 类高频用法。", "学会用 AI 先出初稿，再人工改成门店口吻。"],
      trainerTips: ["AI 课要讲得具体。", "强调 AI 出的是初稿。", "最适合先从朋友圈和活动复盘切入。"],
      practiceTasks: ["用 AI 生成一周朋友圈题材。", "把顾客咨询记录整理成跟进提纲。", "用 AI 提炼一次活动复盘。"],
      recommendedTools: ["tool-ai-stack", "tool-moments-topic-bank", "tool-case-review-canvas"],
      recommendedCases: ["case-laoxiangji", "case-belle", "case-only"],
      extraSections: [section("AI 工具导入原则", ["先解决重复工作。", "不替代真实服务表达。", "店长最适合先掌握，再向下带。"])]
    },
    "chapter-training": {
      trainingDuration: "建议讲解 45-60 分钟",
      trainingFocus: ["把培训从听课升级成学、练、带、考、验。", "明确老板、店长、总部和导购分工。", "知道训前、训中、训后分别交付什么。"],
      trainerTips: ["这一章一定要讲机制。", "强调店长带练，不要只靠讲师。", "最适合配训练营和验收表一起讲。"],
      practiceTasks: ["排一个 14 天训练营节奏。", "定义老板、店长、店员各自验收动作。", "写一次驻店陪跑后的复盘模板。"],
      recommendedTools: ["tool-training-agenda", "tool-coaching-log", "tool-acceptance-scorecard"],
      recommendedCases: ["case-children-king", "case-boshiyuan", "case-siyu"],
      extraSections: [section("培训项目落地节奏", ["训前做诊断。", "训中做演练和陪跑。", "训后做验收和复盘，三段缺一不可。"])]
    },
    "chapter-faq": {
      trainingDuration: "建议讲解 25-35 分钟",
      trainingFocus: ["把高频质疑一次讲透。", "减少培训现场的抗拒和误解。", "把 FAQ 做成店长的答疑库。"],
      trainerTips: ["FAQ 最好用真实问题来讲。", "它很适合拆进晨会答疑。", "不要把 FAQ 放成纯附录。"],
      practiceTasks: ["挑出本店最常见 5 个质疑。", "给每个质疑写统一回应。", "把其中 2 个问题改成店员可直接用的话术。"],
      recommendedTools: ["tool-growth-check", "tool-case-review-canvas", "tool-acceptance-scorecard"],
      recommendedCases: ["case-tiantian", "case-baidi", "case-zhouheiya"],
      extraSections: [section("FAQ 的正确用法", ["把 FAQ 当标准回答库。", "店长每周挑 1-2 个问题晨会演练。", "遇到新问题就补进 FAQ。"])]
    }
  };

  const extraTools = [
    {
      id: "tool-role-matrix",
      title: "岗位职责分工表",
      stages: ["认知", "培训验收"],
      roles: allRoles,
      industries: allIndustries,
      needs: ["工具", "SOP"],
      summary: "把老板、店长、店员和总部在私域里的职责一次讲清，适合培训开场。",
      relatedChapter: "chapter-map",
      table: {
        columns: ["岗位", "最重要职责", "日常动作", "验收方式"],
        rows: [
          ["老板", "定目标、定机制、定奖惩", "每周看核心数据", "看结果改善"],
          ["店长", "带练、排班、复盘、抽查", "每天盯动作、每周复盘", "看执行率和带练记录"],
          ["店员", "加粉、发圈、社群、私聊", "完成日任务和跟进", "看动作完成率和转化率"],
          ["总部/运营", "给素材、给机制、给工具", "支持门店和复制标杆", "看门店采纳率"]
        ]
      },
      notes: ["岗位越清楚，落地阻力越小。", "适合放在项目启动会第一页。"]
    },
    {
      id: "tool-training-agenda",
      title: "14 天门店训练营排程表",
      stages: ["培训验收"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "SOP"],
      summary: "把认知、演练、陪练和验收排进 14 天，适合第一次系统推进。",
      relatedChapter: "chapter-training",
      table: {
        columns: ["阶段", "重点", "当天动作", "输出"],
        rows: [
          ["Day 1-2", "认知统一", "讲目标、做诊断", "问题清单"],
          ["Day 3-5", "引流加粉", "练话术、改物料", "加粉追踪"],
          ["Day 6-8", "发圈和社群", "排期、发圈、启动社群", "7 天排期"],
          ["Day 9-11", "私聊转化", "角色扮演、追单", "私聊记录"],
          ["Day 12-14", "复盘验收", "看数据、补动作", "验收表"]
        ]
      },
      notes: ["训练营不是天天上课，而是天天有动作。", "最好由店长负责日跟踪。"]
    },
    {
      id: "tool-moments-topic-bank",
      title: "朋友圈内容题材库",
      stages: ["朋友圈"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["工具"],
      summary: "解决员工“今天不知道发什么”的问题，按题材直接开写。",
      relatedChapter: "chapter-moments",
      table: {
        columns: ["题材类型", "适合内容", "提醒"],
        rows: [
          ["顾客见证", "晒单、反馈、到店体验", "重真实，不要太像海报"],
          ["专业建议", "搭配、护理、选购建议", "先给价值，再谈产品"],
          ["门店日常", "到货、培训、服务现场", "突出真实感"],
          ["福利提醒", "会员日、限时券、赠品", "不要一整周都只发福利"]
        ]
      },
      notes: ["题材库适合和 7 天排期一起用。", "同一类内容连续发太多，互动会下滑。"]
    },
    {
      id: "tool-private-chat-script",
      title: "私聊四段式话术表",
      stages: ["私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["工具", "转化"],
      summary: "把私聊拆成开场、提问、方案、促动四段，适合一线直接带练。",
      relatedChapter: "chapter-chat",
      table: {
        columns: ["环节", "目标", "推荐表达"],
        rows: [
          ["开场", "自然切入", "我先把您刚刚关心的尺寸/使用建议发您。"],
          ["提问", "确认需求", "您更在意方便、效果还是预算？"],
          ["方案", "给出选择", "按您的情况，我更建议 A 方案，原因是……"],
          ["促动", "推进下一步", "如果方便，我可以先帮您留货/预约。"]
        ]
      },
      notes: ["四段式是固定结构，不是固定台词。", "最适合配合真实聊天记录训练。"]
    },
    {
      id: "tool-group-calendar-month",
      title: "社群活动月历",
      stages: ["社群", "活动策划"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "SOP"],
      summary: "把社群从临时发东西，升级成整月有节奏的经营动作。",
      relatedChapter: "chapter-groups",
      table: {
        columns: ["周次", "固定栏目", "活动主题", "目标"],
        rows: [
          ["第 1 周", "新品/到货提醒", "新客欢迎周", "入群和首单"],
          ["第 2 周", "知识分享", "会员日", "活跃和核销"],
          ["第 3 周", "晒单激励", "老带新", "裂变拉新"],
          ["第 4 周", "福利清仓", "复购提醒", "激活老客"]
        ]
      },
      notes: ["一张月历比十条创意更容易持续执行。", "适合和活动排期总表同步使用。"]
    },
    {
      id: "tool-acceptance-scorecard",
      title: "培训验收打分卡",
      stages: ["数据考核", "培训验收"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "SOP"],
      summary: "把培训效果从“感觉还行”变成一张可打分、可追踪的验收表。",
      relatedChapter: "chapter-training",
      table: {
        columns: ["维度", "观察点", "分值建议"],
        rows: [
          ["认知", "能否讲清私域目标和链路", "20"],
          ["动作", "是否按 SOP 完成动作", "30"],
          ["数据", "是否按周填报关键指标", "20"],
          ["结果", "是否出现加粉、回复、成交、复购改善", "30"]
        ]
      },
      notes: ["建议按老板、店长、店员分别验收。", "最好在培训后第 2 周和第 4 周各做一次。"]
    },
    {
      id: "tool-coaching-log",
      title: "店长陪练记录表",
      stages: ["私聊转化", "培训验收"],
      roles: ["店长"],
      industries: allIndustries,
      needs: ["工具", "SOP"],
      summary: "让店长带练有记录、有反馈、有追踪，不再停留在口头提醒。",
      relatedChapter: "chapter-training",
      table: {
        columns: ["员工", "陪练主题", "发现问题", "下次跟进"],
        rows: [
          ["示例：小王", "加粉开口", "利益点不明确", "改 2 版话术后再演练"],
          ["示例：小李", "朋友圈", "内容真实但缺互动切口", "补 3 条可私聊文案"],
          ["示例：小周", "私聊", "会回复但不会推进下一步", "训练预约和留货动作"]
        ]
      },
      notes: ["店长的核心不是替员工做，而是带员工做。", "一周至少做 1 次正式陪练记录。"]
    },
    {
      id: "tool-case-review-canvas",
      title: "标杆案例复盘画布",
      stages: ["认知", "活动策划", "培训验收"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "案例"],
      summary: "把看到的案例拆成可复用动作，避免只收藏不落地。",
      relatedChapter: "chapter-faq",
      table: {
        columns: ["复盘项", "要写什么"],
        rows: [
          ["适用行业/场景", "这个案例更像哪类门店"],
          ["关键动作", "对方到底做了哪几个动作"],
          ["结果指标", "案例里哪些数字最关键"],
          ["可复制部分", "你门店明天就能开始的动作"],
          ["不可照搬部分", "哪些条件你现在还没有"]
        ]
      },
      notes: ["案例最怕只看热闹，不拆动作。", "适合培训后做小组作业。"]
    }
  ];

  const extraSops = [
    {
      id: "sop-morning-meeting",
      title: "店长晨会带练 SOP",
      summary: "把私域动作放进每天 10-15 分钟晨会，适合长期巩固执行习惯。",
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["SOP", "工具"],
      stages: ["朋友圈", "私聊转化", "培训验收"],
      timeCost: "10-15 分钟/天",
      trigger: "每天开店前",
      owner: "店长",
      steps: [
        { title: "晨会回顾", items: ["看昨天加粉数、朋友圈完成率和重点客户跟进数。", "点名一个做得好的动作和一个需要改的动作。"] },
        { title: "当天任务", items: ["明确今天的主推内容和重点客户名单。", "分配谁负责发圈、群提醒和跟进。"] },
        { title: "现场演练", items: ["随机抽 1 名员工演练加粉开口或私聊。", "店长给 1 条具体改进建议。"] }
      ],
      deliverables: ["晨会任务清单", "陪练记录", "当天重点客户名单"],
      acceptance: ["晨会连续执行 7 天以上", "员工能复述当天任务", "店长有陪练记录"],
      coachNotes: ["晨会要短、要实、要能立刻执行。", "每天只抓 1-2 个重点动作。"],
      watchouts: ["不要把晨会开成长汇报。", "不要只讲业绩，不讲动作。"],
      successMetrics: ["晨会完成率", "当日任务完成率", "带练覆盖率"]
    },
    {
      id: "sop-silent-wakeup",
      title: "沉睡客户唤醒 SOP",
      summary: "针对长时间未下单或未互动客户，按批次做温和唤醒，不靠一刀切群发。",
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["SOP", "复购"],
      stages: ["私聊转化", "数据考核"],
      timeCost: "每周 30-45 分钟",
      trigger: "客户 30-90 天未消费或未互动",
      owner: "店长、店员",
      steps: [
        { title: "筛选名单", items: ["按未购买时长、品类偏好和客单价筛选客户。", "优先挑高价值客户，不要一次性全量触达。"] },
        { title: "设计理由", items: ["用新品、到货、权益、关怀提醒切入。", "避免上来就发大额优惠券。"] },
        { title: "分批触达", items: ["先从私聊开始，再决定是否进群或发券。", "有回应客户继续跟进，无回应客户记录标签。"] }
      ],
      deliverables: ["沉睡客户名单", "唤醒话术", "结果记录"],
      acceptance: ["每周至少完成 1 批唤醒", "有回应客户全部进入跟进流程", "动作有数据记录"],
      coachNotes: ["关键是理由自然，不是优惠更大。", "有回应后要立刻接私聊。"],
      watchouts: ["不要一天内群发大量同样内容。", "不要把沉睡客户和新客用同一话术。"],
      successMetrics: ["唤醒回复率", "唤醒后首单率", "30 天复购率"]
    },
    {
      id: "sop-member-day",
      title: "会员日活动 SOP",
      summary: "把会员日做成固定机制，适合门店每月稳定做一次的小促活。",
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      needs: ["SOP", "裂变", "复购"],
      stages: ["活动策划", "社群"],
      timeCost: "D-7 到 D+2",
      trigger: "每月固定会员日",
      owner: "店长、老板",
      steps: [
        { title: "提前预热", items: ["D-7 确定主题、福利和目标客户。", "D-3 开始通过朋友圈、私聊、社群预热。"] },
        { title: "活动当天", items: ["门店现场和私域统一口径。", "高意向客户优先一对一跟进。"] },
        { title: "活动后追单", items: ["D+1 做未成交客户追单。", "D+2 做复盘，沉淀物料和话术。"] }
      ],
      deliverables: ["会员日排期", "活动话术", "活动复盘表"],
      acceptance: ["活动前有预热", "活动后有追单", "活动有复盘"],
      coachNotes: ["固定节奏比单次爆发更有价值。", "活动后追单决定真实收益。"],
      watchouts: ["不要每次会员日都只打折。", "不要活动当天忙完就结束。"],
      successMetrics: ["会员日参与人数", "券核销率", "活动后 7 天复购率"]
    },
    {
      id: "sop-two-week-bootcamp",
      title: "14 天门店私域训练营 SOP",
      summary: "适合新项目启动或老店重启，按 14 天节奏把基本动作重新跑顺。",
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      needs: ["SOP", "工具"],
      stages: ["培训验收"],
      timeCost: "14 天",
      trigger: "项目启动、老店重启、培训后落地期",
      owner: "老板、店长",
      steps: [
        { title: "统一认知和诊断", items: ["明确目标和岗位职责。", "完成门店诊断和首轮任务排期。"] },
        { title: "连续带练动作", items: ["连续训练加粉、发圈、社群和私聊。", "店长每天晨会带练，晚上简单复盘。"] },
        { title: "验收和固化", items: ["检查核心指标变化和动作达标率。", "把有效动作固化成门店 SOP。"] }
      ],
      deliverables: ["14 天训练计划", "每日任务记录", "阶段复盘和验收表"],
      acceptance: ["连续执行 14 天", "关键动作形成日任务", "门店能独立继续执行"],
      coachNotes: ["训练营的目的不是做大活动，而是把基本功跑顺。", "要把大动作拆成每天都能完成的小任务。"],
      watchouts: ["不要把训练营安排成天天上大课。", "不要缺少店长跟进。"],
      successMetrics: ["训练营完成率", "动作达标率", "训练后 2 周核心指标变化"]
    }
  ];

  const extraCases = [
    {
      id: "case-walmart",
      title: "沃尔玛：把扫码购做成私域入口，上线半年用户超 2000 万",
      industry: "零售",
      stages: ["认知", "引流"],
      roles: ["老板", "店长"],
      industries: ["零售"],
      needs: ["案例", "拉新"],
      scenario: "商超门店如何把交易动作本身做成留资和后续经营入口。",
      approach: ["用扫码购打通购物、支付和会员沉淀。", "把购物流程里的关键节点变成数字触点。"],
      results: ["上线半年用户超过 2000 万。", "累计访问量超过 7.5 亿。"],
      reusable: ["高频门店优先考虑把交易入口线上化。", "支付和留资一体化，比单独求加微信更自然。"],
      source: { label: "腾讯 x CCFA《公私域运营手册》", url: "https://file.retail.tencent.com/files/default/2022/4/0db4cd808d384c469776e2d2d0bb18c4.pdf" }
    },
    {
      id: "case-only",
      title: "绫致/ONLY：单场直播观看 65 万，为小程序导流 100 万+人次",
      industry: "零售",
      stages: ["朋友圈", "活动策划"],
      roles: ["老板", "店长"],
      industries: ["零售"],
      needs: ["案例", "转化"],
      scenario: "服饰门店如何把直播、朋友圈、社群和导购体系联动起来。",
      approach: ["视频号直播、门店物料、导购朋友圈和社群统一联动。", "直播前预约，直播后继续靠门店承接。"],
      results: ["单场直播观看 65 万。", "为小程序导流 100 万以上人次，当日 GMV 增长 70%。"],
      reusable: ["直播不是孤立动作，必须和导购体系一起跑。", "服饰私域的内容种草和门店承接要同步。"],
      source: { label: "案例素材整理", url: "https://www.yudufei.com/2022/09/only.html" }
    },
    {
      id: "case-belle",
      title: "百丽：6 个月沉淀数千万企微好友，联动后销售增长超 200%",
      industry: "零售",
      stages: ["认知", "培训验收"],
      roles: ["老板", "店长"],
      industries: ["零售"],
      needs: ["案例", "复购"],
      scenario: "鞋服品牌如何把门店导购、商场流量和企微资产一起经营。",
      approach: ["全国门店导购全面上企微。", "和商场做联域经营，用活动合作带新会员。"],
      results: ["6 个月沉淀数千万企微好友。", "几百场合作带来销售同期增长超过 200%。"],
      reusable: ["商场门店的私域不只发生在店内。", "连锁品牌适合把导购资产化后再放大。"],
      source: { label: "腾讯增长指南整理", url: "https://file.retail.tencent.com/files/default/2025/1/7a65bf6309c4408eb45a7ce5bba8fc5e.pdf" }
    },
    {
      id: "case-zhouheiya",
      title: "周黑鸭：企微内客户数增长 16.5 倍，30 天复购率提升 479%",
      industry: "餐饮",
      stages: ["私聊转化", "数据考核"],
      roles: ["老板", "店长"],
      industries: ["餐饮"],
      needs: ["案例", "复购"],
      scenario: "高频食品零售如何用营销 SOP 把单次购买变成持续复购。",
      approach: ["多渠道沉淀潜客到企业微信。", "用营销 SOP 做周期性复购唤醒。"],
      results: ["企微内客户数增长 16.5 倍，92% 潜客成为好友。", "30 天复购率提升 479%，复购周期缩短三分之一。"],
      reusable: ["高频食品零售的重点在 SOP 驱动复购。", "复购率提升往往来自节奏化触达。"],
      source: { label: "有赞案例", url: "https://help.youzan.com/displaylist/detail_26_26-2-64371" }
    },
    {
      id: "case-duoxiai",
      title: "多喜爱：1 个月加好友 6 万+，导购业绩增长 400%",
      industry: "零售",
      stages: ["引流", "培训验收"],
      roles: ["老板", "店长"],
      industries: ["零售"],
      needs: ["案例", "拉新", "裂变"],
      scenario: "家居门店如何通过导购激励，把低频私域动作快速跑起来。",
      approach: ["客户进店加企微参与抽奖。", "用好友裂变和排行榜机制持续激励导购。"],
      results: ["1 个月加好友 6 万以上，单场裂变活动加好友 5 万。", "拉新成本约 1 元/人，导购业绩增长 400%。"],
      reusable: ["低频行业只要导购激励设计对，私域增长也能很快。", "抽奖和榜单机制适合启动期拉高执行意愿。"],
      source: { label: "案例素材池整理", url: "https://help.youzan.com/displaylist/detail_26_26-2-64371" }
    },
    {
      id: "case-siyu",
      title: "丝域养发：双 11 10 天做出 10 万+订单，成交 2300 万+",
      industry: "美业",
      stages: ["活动策划", "培训验收"],
      roles: ["老板", "店长"],
      industries: ["美业"],
      needs: ["案例", "裂变", "转化"],
      scenario: "加盟连锁门店如何靠总部统一策划和门店同步执行放大活动产出。",
      approach: ["总部统一策划大促，联动千家门店同步启动私域。", "把拼团裂变和大促机制结合。"],
      results: ["双 11 期间 10 天达成微信端全国 10 万以上订单。", "累计成交 2300 万元以上。"],
      reusable: ["加盟连锁做私域，先解决总部统一赋能。", "大促要统一动作、物料和时间线。"],
      source: { label: "有赞案例", url: "https://www.youzan.com/cms/article/8591.html" }
    },
    {
      id: "case-vipcake",
      title: "唯品客：企微好友下单人数增长 153%，复购率超过 60%",
      industry: "餐饮",
      stages: ["引流", "数据考核"],
      roles: ["老板", "店长"],
      industries: ["餐饮"],
      needs: ["案例", "复购"],
      scenario: "烘焙门店如何把多渠道流量统一沉淀到企微，再做自动化复购。",
      approach: ["用渠道活码把外卖、公众号、视频号、抖音和线下广告用户统一归集。", "再用自动营销和人群标签提升复购。"],
      results: ["全渠道用户接近 50 万。", "年度私域企微好友下单人数增长 153%，复购率超过 60%。"],
      reusable: ["烘焙行业特别适合围绕节日和复购周期做自动化运营。", "多渠道流量先统一，再运营，效率更高。"],
      source: { label: "有赞案例", url: "https://www.youzan.com/cms/article/26609.html" }
    },
    {
      id: "case-longbeilai",
      title: "龙贝莱商城：疫情后小程序商城月营收稳定在 200 万以上",
      industry: "零售",
      stages: ["活动策划", "私聊转化"],
      roles: ["老板", "店长"],
      industries: ["零售"],
      needs: ["案例", "转化", "复购"],
      scenario: "多品牌女装门店如何通过会员共享和导购机制做线上线下一体化经营。",
      approach: ["用线上线下一体化经营、多品牌会员打通和导购销售员机制提升效率。", "疫情期间持续靠线上小程序承接业绩。"],
      results: ["线下拥有 80 家门店，代理 12 个女装品牌。", "疫情后小程序商城营收稳定在每月 200 万元以上。"],
      reusable: ["多品牌代理型门店，最大的私域机会是会员共享和跨品牌推荐。", "服饰私域不只靠直播，还要靠会员打通和导购协同。"],
      source: { label: "有赞案例", url: "https://www.youzan.com/intro/anli/18106974.html" }
    }
  ];

  const extraScripts = [
    {
      id: "script-checkout-add",
      title: "收银后加粉开口话术",
      summary: "适合顾客刚付款的 10 秒内使用，先讲服务价值，再顺手完成加粉。",
      scenario: "顾客已经完成消费，情绪相对稳定，也最容易接受后续服务承接。",
      stages: ["引流"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "拉新"],
      relatedChapter: "chapter-leads",
      lines: [
        "您今天买的这类产品，后面有补货提醒和会员券我都可以第一时间发您，您加我一下，我现在就把今天的券发给您。",
        "我加您不是打扰，是方便后面到货、活动和售后直接通知您，省得您每次都要自己再问。",
        "您加我一下，我把今天适合您这个品类的使用建议和下次复购提醒一起发过去。"
      ],
      tips: [
        "先说顾客能得到什么，再说加好友。",
        "不要上来就问能不能加微信，直接给出服务理由更自然。",
        "开口最好发生在付款后、打包前。"
      ]
    },
    {
      id: "script-arrival-invite",
      title: "到店接待加企微话术",
      summary: "适合导购接待、试穿试用或咨询环节，把服务延续作为加粉理由。",
      scenario: "顾客还在挑选，适合用资料发送、搭配建议或库存通知做承接。",
      stages: ["引流"],
      roles: ["店长", "店员"],
      industries: ["零售", "美业", "母婴", "服务型门店"],
      needs: ["话术", "拉新"],
      relatedChapter: "chapter-acquire",
      lines: [
        "我先加您一下，等会儿把这个款的尺码、搭配图和到货信息直接发给您，您回去也方便慢慢看。",
        "您今天先不用急着定，我加您后把刚才说的方案和注意点整理给您，您对比起来会更清楚。",
        "如果您方便，我加您一下，后面这个系列有新色和活动我直接发您，不用您反复跑店里问。"
      ],
      tips: [
        "适合低频、高客单或需要顾问式推荐的行业。",
        "让顾客觉得是把线下讲过的服务延续到线上，而不是临时拉群发广告。"
      ]
    },
    {
      id: "script-new-friend-welcome",
      title: "新好友欢迎语",
      summary: "加好友后的第一条消息，目标不是成交，而是把关系接住并给出下一步。",
      scenario: "顾客刚刚加上好友，最需要感受到专业和不打扰。",
      stages: ["引流", "私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化"],
      relatedChapter: "chapter-chat",
      lines: [
        "您好，我是今天接待您的小李，刚才您看的那几款我已经帮您记下来了，我先把对应图片和建议发您，您有空慢慢看。",
        "欢迎您加我，我这边主要负责到货提醒、活动通知和售后跟进，不会频繁打扰您，有需要随时找我。",
        "已经给您备注好了，后面您想查库存、问搭配或约到店都可以直接发我，我会尽快回复。"
      ],
      tips: [
        "欢迎语里尽量出现今天的具体接待信息，避免像群发。",
        "第一条消息最好附带一份顾客刚刚需要的内容。"
      ]
    },
    {
      id: "script-moments-private-chat",
      title: "朋友圈互动转私聊话术",
      summary: "看到顾客点赞、评论或点开朋友圈后的自然跟进表达。",
      scenario: "顾客已经表现出兴趣，这时最适合轻量切到一对一沟通。",
      stages: ["朋友圈", "私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化"],
      relatedChapter: "chapter-moments",
      lines: [
        "刚看到您对这条内容有兴趣，我把更详细的款式/价格/使用建议单独发您，您看会更方便。",
        "这款最近问的人比较多，我把适合您的两个选择整理给您，您不用在朋友圈里翻来翻去。",
        "您刚才评论的那个问题挺典型，我直接一对一回您会更清楚，也方便给您更贴合的建议。"
      ],
      tips: [
        "切私聊时不要太快成交，先承接问题和兴趣点。",
        "一对一跟进比在评论区继续展开更容易推进下一步。"
      ]
    },
    {
      id: "script-group-welcome",
      title: "社群开场与群规话术",
      summary: "新群建立时的开场表达，重点是告诉大家这个群有什么价值、什么时候活跃。",
      scenario: "福利群、会员群、新客群启动当天最适合一次讲清楚。",
      stages: ["社群"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["话术", "裂变"],
      relatedChapter: "chapter-groups",
      lines: [
        "欢迎大家进群，这个群主要做三件事：第一时间发到货和会员福利，固定答疑，偶尔做老客专属活动，不会每天刷屏。",
        "群里建议大家把备注改成门店名或昵称，后面领券、活动和售后都更方便对接。",
        "我们每周会固定有 2 到 3 次内容更新，今天先进群的朋友我先发一份专属福利给大家。"
      ],
      tips: [
        "群规一定要讲价值，不要只讲禁止事项。",
        "开群当天最好立刻安排一条福利或互动，不能只有说明。"
      ]
    },
    {
      id: "script-activity-warmup",
      title: "活动预热邀约话术",
      summary: "用于会员日、拼团、储值或新品活动前的邀约提醒。",
      scenario: "适合 D-7 到 D-1 的预热阶段，目标是预约、锁定意向和提醒到店。",
      stages: ["活动策划", "私聊转化"],
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化", "裂变"],
      relatedChapter: "chapter-campaign",
      lines: [
        "这周我们店有一场老客专属活动，名额和福利都比平时更好，我先给您留一个名额，您方便的话我把详情发您。",
        "这次活动更适合像您之前买过/体验过这个品类的老客，我先提前告诉您，避免到时候临时错过。",
        "如果您这两天有时间，我建议您优先在活动期来，价格和赠品都比平时更划算，我可以先帮您预约。"
      ],
      tips: [
        "预热不要一上来发完整海报，先争取对话和意向。",
        "高频门店适合先推福利，低频门店更适合先推预约或专业服务。"
      ]
    },
    {
      id: "script-high-intent-followup",
      title: "高意向客户追单话术",
      summary: "顾客已经看过、问过、对比过，但还没有下决定时的跟进表达。",
      scenario: "适合看完产品、试过、问过价格后迟迟未成交的人群。",
      stages: ["私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化"],
      relatedChapter: "chapter-chat",
      lines: [
        "您上次主要在比较这两个方案，我按您的需求重新帮您梳理了一下差异，您更在意效果的话我还是更建议这一款。",
        "我这边先不催您下单，只是把您最关心的几个点再说明白，您做决定会更轻松一些。",
        "如果您现在还在犹豫，我可以先帮您留货/留档期，避免后面想定的时候没有了。"
      ],
      tips: [
        "追单不是催促，而是帮助顾客做决定。",
        "私聊里最好明确推进下一步，如留货、预约、到店或复看。"
      ]
    },
    {
      id: "script-price-objection",
      title: "价格顾虑回应话术",
      summary: "顾客说贵时，不直接硬压价格，而是回到需求、价值和选择。",
      scenario: "私聊或到店咨询时的高频异议处理。",
      stages: ["私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化"],
      relatedChapter: "chapter-chat",
      lines: [
        "我理解您会比较价格，关键还是看您更在意的是便宜、耐用还是效果，如果只看低价，可能不一定适合您现在的需求。",
        "这款不是最便宜的，但它更适合您刚才说的那个使用场景，所以后面省心很多。",
        "如果您想控制预算，我也可以给您两个不同档位的选择，您按自己的情况定，不一定非要选最贵的。"
      ],
      tips: [
        "先理解顾客顾虑，再给选择。",
        "不要一听到贵就立刻降价，否则会削弱信任。"
      ]
    },
    {
      id: "script-old-customer-reactivate",
      title: "沉睡老客唤醒话术",
      summary: "适合久未到店、久未互动、久未复购的老客重新激活。",
      scenario: "适用于月度唤醒、会员日预热或老客专项复购。",
      stages: ["数据考核", "活动策划"],
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "复购"],
      relatedChapter: "chapter-data",
      lines: [
        "很久没联系您了，最近我们把您之前常买/常做的这类服务做了升级，我第一时间想到您，就先给您发一下。",
        "这次我们专门给老客准备了一次回店福利，不是群发名单，我想先问问您最近有没有这方面的需要。",
        "您之前在我们这边的记录我还留着，所以这次活动我优先想到您，如果方便，我把适合您的部分单独发您。"
      ],
      tips: [
        "老客唤醒不要只发优惠，要带上记忆点和过去的服务关系。",
        "唤醒后的第一目标是恢复联系和互动，成交可以放第二步。"
      ]
    },
    {
      id: "script-repurchase-reminder",
      title: "复购提醒话术",
      summary: "围绕补货、使用周期、会员权益和售后提醒做自然复购。",
      scenario: "适合高频零售、餐饮、母婴、美业等有明显复购周期的行业。",
      stages: ["数据考核", "私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "复购"],
      relatedChapter: "chapter-data",
      lines: [
        "按您上次购买/体验的时间看，这两天差不多该补一次了，我先提醒您一下，免得临时要用时来不及。",
        "您上次选的那款最近正好在做老客福利，如果您准备补货，我现在给您安排会更划算。",
        "如果您最近使用感受还不错，我建议这周就把下一次先定掉，价格和库存都会更稳。"
      ],
      tips: [
        "复购提醒要结合顾客上次消费时间，越具体越像服务。",
        "补货、保养、复查、回店权益都可以成为复购触发点。"
      ]
    }
  ];

  const manualTools = [
    {
      id: "tool-lead-cost-budget",
      title: "单客引流成本测算表",
      stages: ["引流", "活动策划"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "拉新"],
      summary: "用客单价、毛利率和私域转化率，反推出单客最大引流成本，避免福利乱送。",
      relatedChapter: "chapter-leads",
      table: {
        columns: ["行业/门店", "客单价", "毛利率", "私域转化率", "单客引流成本上限"],
        rows: [
          ["社区水果店", "50", "40%", "20%", "2 元左右"],
          ["美容院", "500", "60%", "10%", "15 元左右"],
          ["快餐店", "30", "50%", "30%", "2.1 元左右"],
          ["你的门店", "", "", "", ""]
        ]
      },
      notes: [
        "先算上限，再决定送什么。",
        "成本价和顾客感知价值是两回事，低成本也能做高感知福利。"
      ]
    },
    {
      id: "tool-touchpoint-audit",
      title: "到店 10 触点引流排查表",
      stages: ["引流"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "SOP", "拉新"],
      summary: "把门店里每一个顾客停留超过 10 秒的地方都排一遍，确认是否有加微信的理由和动作。",
      relatedChapter: "chapter-acquire",
      table: {
        columns: ["触点", "现在有没有引流动作", "利益点是否清楚", "谁负责", "本周优化动作"],
        rows: [
          ["收银台/买单", "", "", "", ""],
          ["台卡/桌贴/立牌", "", "", "", ""],
          ["包装袋/小票/外卖袋", "", "", "", ""],
          ["等候区/WiFi/体验区", "", "", "", ""],
          ["店员一对一引导", "", "", "", ""]
        ]
      },
      notes: [
        "先抓收银台、台卡和离店包装三类高频触点。",
        "每个触点都要回答三个问题：顾客得到了什么、谁来承接、数据怎么记。"
      ]
    },
    {
      id: "tool-conversion-funnel-dashboard",
      title: "转化漏斗与关键指标看板",
      stages: ["数据考核", "私聊转化"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "转化"],
      summary: "把进店率、成交率、客单价、加项率和复购率放到一张表里看，快速定位漏水点。",
      relatedChapter: "chapter-data",
      table: {
        columns: ["板块", "指标", "公式/口径", "本周数据", "异常判断"],
        rows: [
          ["流量端", "进店率", "进店人数 / 门前有效客流", "", "低于上周先看门头和门口物料"],
          ["成交端", "成交率", "成交单数 / 进店人数", "", "低于上周先查接待、话术和信任建立"],
          ["价值端", "客单价", "销售额 / 成交单数", "", "偏低先查套餐、加购和连带"],
          ["附加端", "加项/连带率", "加项单数 / 成交单数", "", "偏低先查推荐时机和默认选项"],
          ["复购端", "复购率", "复购人数 / 成交人数", "", "偏低先查私域承接和触达节奏"]
        ]
      },
      notes: [
        "数据最好按日记录、按周复盘。",
        "不要只盯成交率，一个门店总收入是链路连乘结果。"
      ]
    },
    {
      id: "tool-ab-test-log",
      title: "门店 AB 测试记录表",
      stages: ["数据考核", "培训验收"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["工具", "SOP"],
      summary: "每次只改一个变量，连续观察，让优化从拍脑袋变成可验证。",
      relatedChapter: "chapter-training",
      table: {
        columns: ["测试主题", "只改哪个变量", "观察指标", "A 方案", "B 方案", "测试周期", "结论"],
        rows: [
          ["收银台引流文案", "利益点表述", "加粉率", "扫码领券", "今天已生成 30 元券，扫码激活", "7 天", ""],
          ["海报门头", "价格呈现方式", "进店率", "只写卖点", "卖点 + 价格区间", "7 天", ""],
          ["成交话术", "二选一 closing", "成交率", "您要不要", "您更偏向 A 还是 B", "5 天", ""]
        ]
      },
      notes: [
        "每次只测一个变量，否则结论会失真。",
        "先从文案、摆位、价格呈现、默认选项这类低成本变量开始。"
      ]
    },
    {
      id: "tool-trust-proof-checklist",
      title: "信任建立五来源排查表",
      stages: ["私聊转化", "数据考核"],
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      needs: ["工具", "转化"],
      summary: "按社会认同、权威背书、一致透明、熟悉感、体验验证五类信任信号排查门店。",
      relatedChapter: "chapter-chat",
      table: {
        columns: ["信任来源", "门店里是否看得见", "线上是否看得见", "当前缺口", "补强动作"],
        rows: [
          ["社会认同", "", "", "", "评价、销量、案例、老客见证"],
          ["权威背书", "", "", "", "证书、资质、媒体、专家"],
          ["一致透明", "", "", "", "价格、流程、售后说清楚"],
          ["熟悉感", "", "", "", "店员介绍、朋友圈、在场感"],
          ["体验验证", "", "", "", "试用、试吃、报告、前后对比"]
        ]
      },
      notes: [
        "首次顾客更吃社会认同和权威背书，老客更吃体验验证。",
        "信任不是一句‘我们很好’，而是顾客一眼能看到的证据。"
      ]
    }
  ];

  const manualSops = [
    {
      id: "sop-counter-golden3s",
      title: "收银台黄金 3 秒引流 SOP",
      summary: "把付款完成后的 3 秒做成固定动作，稳定提升加粉率。",
      stages: ["引流"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["SOP", "拉新"],
      timeCost: "每单 10-20 秒",
      trigger: "顾客支付完成、拿小票或等打包的瞬间",
      owner: "收银员 / 当班店员",
      steps: [
        { title: "动作一：先递交权益", items: ["先说顾客能得到什么，如券、提醒、预约或售后服务。", "不要先问‘能不能加个微信’。"] },
        { title: "动作二：同步完成扫码", items: ["二维码摆在顾客视线范围内。", "说完利益点后立刻用手势指向二维码。"] },
        { title: "动作三：完成欢迎承接", items: ["顾客加上后 1 分钟内发欢迎语和第一份权益。", "标签打上来源和消费场景。"] }
      ],
      deliverables: ["收银台标准话术", "统一立牌文案", "欢迎语模板"],
      acceptance: ["每单必说率达标", "加粉率连续 7 天可记录", "欢迎语发送率接近 100%"]
    },
    {
      id: "sop-platform-to-private-handoff",
      title: "平台核销转私域承接 SOP",
      summary: "抖音、美团、大众点评等平台用户到店核销时，顺手转进私域。",
      stages: ["引流", "私聊转化"],
      roles: ["店长", "店员"],
      industries: ["零售", "餐饮", "美业", "母婴", "服务型门店"],
      needs: ["SOP", "拉新", "转化"],
      timeCost: "单客 30 秒内",
      trigger: "团购核销、预约到店、平台咨询到店",
      owner: "前台 / 核销负责人",
      steps: [
        { title: "动作一：先确认来源", items: ["确认顾客来自抖音还是点评。", "根据渠道切换对应欢迎语和利益点。"] },
        { title: "动作二：现场转私域", items: ["明确告诉顾客：加微信后以后直接找你，效率更高。", "强调群内或私域价格/服务优于平台反复搜索。"] },
        { title: "动作三：核销后 24 小时跟进", items: ["发送感谢和使用/到店建议。", "把平台用户纳入后续复购或活动触达。"] }
      ],
      deliverables: ["渠道欢迎语", "核销承接话术", "平台来源标签"],
      acceptance: ["平台到店客户有可追踪的转私域率", "不同渠道欢迎语准确触发", "24 小时内有首轮跟进"]
    },
    {
      id: "sop-ab-test-weekly",
      title: "每周一个变量 AB 测试 SOP",
      summary: "每周只测一个变量，持续优化海报、话术、价格呈现和转化链路。",
      stages: ["数据考核", "培训验收"],
      roles: ["老板", "店长"],
      industries: allIndustries,
      needs: ["SOP", "工具"],
      timeCost: "每周 30 分钟准备 + 每天 5 分钟记录",
      trigger: "门店准备优化某个转化节点时",
      owner: "店长 / 运营负责人",
      steps: [
        { title: "动作一：定义变量", items: ["只改文案、摆位、价格呈现、默认选项中的一个。", "明确观察指标，比如加粉率、成交率、客单价。"] },
        { title: "动作二：连续记录", items: ["至少连续记录 5-7 天。", "避免同时改动多个动作。"] },
        { title: "动作三：固化优胜方案", items: ["优胜方案写进 SOP。", "复盘失败测试，记录为什么不成立。"] }
      ],
      deliverables: ["AB 测试记录表", "测试结论", "更新后的 SOP"],
      acceptance: ["每周至少 1 个小测试", "结论能指向下一步动作", "优胜动作已纳入执行标准"]
    }
  ];

  const manualCases = [
    {
      id: "case-bakery-doll-fission",
      title: "烘焙品牌：试吃 + 桃酥 + 公仔裂变，把日加粉从 80 提到 500+",
      industry: "餐饮",
      stages: ["引流", "活动策划"],
      roles: ["老板", "店长"],
      industries: ["餐饮"],
      needs: ["案例", "拉新", "裂变"],
      scenario: "在门店周边 500 米做地推试吃，如何把低成本福利做成高感知裂变。",
      approach: [
        "试吃后先送小袋招牌桃酥，引导扫码加企微。",
        "愿意转发指定海报到朋友圈并保留 2 小时，再送品牌公仔。",
        "用低成本、高感知价值的赠品放大裂变效果。"
      ],
      results: [
        "只做试吃 + 桃酥时，日均加粉约 80-120 人。",
        "加上公仔裂变后，日均加粉提升到 500-600 人。"
      ],
      reusable: [
        "赠品的感知价值足够大，裂变会自然发生。",
        "先算单客引流成本上限，再决定裂变赠品能不能送。"
      ],
      source: { label: "内部手册《门店私域引流手册》", url: leadManualFile }
    },
    {
      id: "case-apparel-douyin-burst",
      title: "服装店：抖音同城引流，单店单日进店 6000 人，3 个月复制 4 家店",
      industry: "零售",
      stages: ["引流", "活动策划"],
      roles: ["老板", "店长"],
      industries: ["零售"],
      needs: ["案例", "拉新", "转化"],
      scenario: "如何把抖音穿搭内容、到店试穿和企微承接串成一条闭环。",
      approach: [
        "持续发布穿搭类同城短视频。",
        "把到店试穿作为主要承接动作。",
        "买单或试穿结束时，再引导加企微做后续跟进。"
      ],
      results: [
        "单店最高一天进店约 6000 人。",
        "3 个月内复制落地 4 家门店。"
      ],
      reusable: [
        "公域视频先负责拉到店，私域再负责留存和复购。",
        "服饰行业的关键不是只卖券，而是把试穿和导购跟进串起来。"
      ],
      source: { label: "内部手册《门店私域引流手册》", url: leadManualFile }
    },
    {
      id: "case-hotpot-scarcity-launch",
      title: "火锅店：前 100 名进群锅底免费，当天加满 3 个 200 人群",
      industry: "餐饮",
      stages: ["活动策划", "引流"],
      roles: ["老板", "店长"],
      industries: ["餐饮"],
      needs: ["案例", "拉新", "裂变"],
      scenario: "用数量稀缺和限时稀缺，让开业引流从普通活动变成抢名额。",
      approach: [
        "把福利设计成前 100 名进群才有资格。",
        "明确告诉顾客‘送完即止’，制造可感知稀缺。",
        "开业当天集中释放名额和信息，形成爆发。"
      ],
      results: [
        "活动当天连续加满 3 个 200 人群。",
        "稀缺性让顾客从‘知道活动’变成‘立刻行动’。"
      ],
      reusable: [
        "稀缺性只对已经感兴趣的人有效，所以福利和人群要匹配。",
        "限量一定要真实，否则很快失效。"
      ],
      source: { label: "内部手册《门店增长-转化端✅》", url: conversionManualFile }
    }
  ];

  const manualScripts = [
    {
      id: "script-douyin-private-handoff",
      title: "抖音核销转私域话术",
      summary: "顾客拿抖音团购到店核销时，把平台流量顺手转进私域。",
      scenario: "适合抖音团购、直播团购、到店核销场景。",
      stages: ["引流", "私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "拉新", "转化"],
      relatedChapter: "chapter-leads",
      lines: [
        "您是抖音来的吧？加我一下，以后直接找我下单，群里的福利通常比平台上更省事。",
        "这次先按抖音给您核销，您加我之后，下次有老客专属价和到店提醒，我直接发您。",
        "平台适合第一次找店，后面您直接走我这边会更方便，也不用每次重新搜。"
      ],
      tips: [
        "先承认平台价值，再强调以后直接找你更方便。",
        "核销结束就是最顺手的承接点，不要等顾客离店后再追。"
      ]
    },
    {
      id: "script-meituan-private-handoff",
      title: "美团/点评顾客转私域话术",
      summary: "点评、美团顾客到店后，转成后续可直接联系的老客关系。",
      scenario: "适合团购核销、商家咨询到店、评价后跟进场景。",
      stages: ["引流", "私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "拉新", "转化"],
      relatedChapter: "chapter-chat",
      lines: [
        "您这次先按平台活动来，后面您直接加我，下次不用再翻平台找，我给您保留老客福利。",
        "美团上主要是第一次找到我们，后面直接找我会更省事，预约、到货和活动我都能第一时间通知您。",
        "以后您要来，提前微信说一声，我帮您安排，比平台上来回看评价和档期更快。"
      ],
      tips: [
        "不要直接否定平台，要给顾客一个更省事的理由。",
        "适合在顾客满意、刚核销结束或刚咨询完的节点使用。"
      ]
    },
    {
      id: "script-two-choice-close",
      title: "二选一成交推进话术",
      summary: "把‘要不要买’改成‘A 还是 B’，降低顾客决策阻力。",
      scenario: "顾客已经有兴趣，但卡在犹豫和选择困难上。",
      stages: ["私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化"],
      relatedChapter: "chapter-chat",
      lines: [
        "您更偏向先从标准版开始，还是直接一步到位选升级版？",
        "按您刚才说的情况，我建议就在这两个里面选一个，A 更稳，B 更省心，您偏哪边？",
        "如果今天定，我建议您就在这两个方案里定一个，不需要再回头重新看太多选项。"
      ],
      tips: [
        "二选一不是强迫成交，而是帮顾客减少选择过载。",
        "前提是顾客已经有明确兴趣，不适合用于完全陌生的顾客。"
      ]
    },
    {
      id: "script-cross-sell-upgrade",
      title: "连带加购与升档话术",
      summary: "顾客已经决定购买时，顺手做关联推荐和升档。",
      scenario: "收银前、确认订单时、主产品已选定时。",
      stages: ["私聊转化"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化", "复购"],
      relatedChapter: "chapter-chat",
      lines: [
        "您既然已经选了这个主款，我更建议顺手把这个搭配一起带上，使用感会完整很多。",
        "如果预算可以多一点，我更建议直接升到这个版本，差价不大，但后面会省心很多。",
        "这两个加在一起会比单买更划算，您现在一起配好，后面就不用再补一次。"
      ],
      tips: [
        "关联推荐最好发生在主决策完成之后。",
        "升档时要强调差价和价值，而不是重新报一个大总价。"
      ]
    },
    {
      id: "script-risk-reversal-close",
      title: "零风险承诺促成话术",
      summary: "顾客担心踩雷时，用可验证、可退、可调整来增强确定性。",
      scenario: "高客单、长决策或犹豫型客户的收口场景。",
      stages: ["私聊转化", "数据考核"],
      roles: ["店长", "店员"],
      industries: allIndustries,
      needs: ["话术", "转化"],
      relatedChapter: "chapter-chat",
      lines: [
        "您不用急着担心一步到位，我们先按这个方案走，如果不合适我再帮您调整。",
        "先把位置/档期给您留上，您今天先锁住权益，后面如果时间要改我们还能再协调。",
        "您现在最担心的是踩雷，所以我建议先用最稳的方案，我们把风险先降到最低。"
      ],
      tips: [
        "零风险承诺不是夸口，而是把售后、调整和保障说具体。",
        "越高客单、越长决策，越需要先给确定性。"
      ]
    }
  ];

  const extraDeepReads = [
    {
      id: "deepread-lead-architecture",
      title: "专题一：私域引流全景图与双路径打法",
      summary: "把《门店私域引流手册》的全景逻辑压成一张地图，先看四大板块，再看消费前与消费后两条路径。",
      duration: "建议阅读 12-15 分钟",
      sourceManual: "《门店私域引流手册》",
      manualFile: leadManualFile,
      roles: ["老板", "店长"],
      industries: allIndustries,
      stages: ["认知", "引流"],
      needs: ["拉新", "复购"],
      sections: [
        {
          title: "先建立地图，再选打法",
          paragraphs: [
            "门店私域引流不是零散招数堆砌，而是一个分层系统。新手最容易犯的错，是今天学一点地推、明天抄一点社群、后天又做一场抽奖，动作看起来很多，但没有一条完整路径。",
            "这本新手册给我们的第一层价值，不是再多几个招，而是先把所有主流引流方式收拢成可理解的四个板块，让老板和店长先知道自己在做哪一类事。"
          ],
          bullets: [
            "到店场景引流：把已经进店的人截住。",
            "线上公域引流：把平台流量洗进自己的池子。",
            "活动型引流：用事件集中爆发。",
            "内容型引流：用价值让客户主动来找你。"
          ]
        },
        {
          title: "先按消费频次选组合，而不是所有玩法都上",
          paragraphs: [
            "高频门店适合社群、小程序和会员日，因为顾客本来就会反复来，只要把触达和福利做好，就能持续转化。",
            "中频和低频门店则更依赖导购跟进、专业内容和预约制服务。也就是说，引流板块虽然共通，但组合方式一定要跟行业频次匹配。"
          ],
          bullets: [
            "高频门店：社群 + 小程序 + 固定会员日。",
            "中频门店：导购企微 + 内容种草 + 视频号或直播。",
            "低频高客单门店：顾问服务 + 预约到店 + 长期信任积累。"
          ]
        },
        {
          title: "两条路径：消费前拉新，消费后沉淀",
          paragraphs: [
            "很多门店把所有引流都理解成‘先把陌生人找来’，但真正稳定的私域增长，往往是消费后沉淀做得更扎实。顾客已经来过、买过、体验过，再被你加到私域里，关系会天然更近。",
            "所以这套手册特别值得保留的认知是：消费前路径和消费后路径要同时存在。前者负责扩池子，后者负责把高质量用户留下。"
          ],
          bullets: [
            "消费前路径：短视频、点评、小红书、地推、异业、活动海报。",
            "消费后路径：收银台、包装袋、台卡、售后提醒、会员和社群承接。"
          ]
        }
      ],
      actionChecklist: [
        "先判断你的门店属于高频、中频还是低频。",
        "只选 1-2 个主引流板块，不要全铺。",
        "分别写出消费前和消费后各 3 个高价值触点。",
        "让店长用一句话讲清楚本店当前的引流主路径。"
      ],
      relatedResources: ["tool-touchpoint-audit", "tool-lead-cost-budget", "case-bai-guo", "case-ruixing"]
    },
    {
      id: "deepread-lead-cost-psych",
      title: "专题二：引流成本上限、福利设计与 5 个心理开关",
      summary: "把引流这件事从‘拍脑袋送福利’变成‘先算账、再设计钩子、最后用心理机制放大’。",
      duration: "建议阅读 12-15 分钟",
      sourceManual: "《门店私域引流手册》",
      manualFile: leadManualFile,
      roles: ["老板", "店长"],
      industries: allIndustries,
      stages: ["引流", "活动策划"],
      needs: ["拉新", "转化"],
      sections: [
        {
          title: "先算单客引流成本上限",
          paragraphs: [
            "引流福利不是越大越好，而是必须在可承受范围内。新手册给出的公式非常实用：先用客单价、毛利率和私域转化率，反推出单客最大引流成本，再决定送什么。",
            "这一步的价值在于把‘感觉送得起’变成‘算得清、控得住’。水果店、美容院、快餐店的成本上限完全不同，不能拿别人的活动模板直接照抄。"
          ],
          bullets: [
            "先算单客引流成本上限，再选福利类型。",
            "高频刚需门店可以薄利多频，低频高客单门店要用服务型福利。",
            "不算账的福利，只会让引流人数上去、利润掉下来。"
          ]
        },
        {
          title: "低成本也能做高感知价值",
          paragraphs: [
            "手册里最值得吸收的一点是：成本价和感知价是两回事。一个成本几块钱的小礼品，只要包装、命名、领取方式设计得对，顾客感知到的价值可能是几十元。",
            "这意味着门店不用执着于真金白银的大让利，而要学会用赠品、资料、服务、专属权益和稀缺资格去放大感知价值。"
          ],
          bullets: [
            "实物型福利：试吃、小样、盲盒、小礼品。",
            "优惠型福利：立减、折扣、满减、抽免单。",
            "服务型福利：预约优先、专属顾问、免排队。",
            "内容型福利：攻略、报告、内部消息、专业建议。"
          ]
        },
        {
          title: "五个最常用的引流心理开关",
          paragraphs: [
            "这本手册没有堆太多抽象理论，而是把互惠、损失厌恶、从众、稀缺和即时满足五个原理，直接拉到门店场景里。对老板和店长来说，这五个原理几乎已经够用。",
            "真正高转化的引流设计，往往不是只用一个原理，而是把多个开关叠加：先给福利，再制造‘不领就亏’，同时告诉顾客很多人已经在领，并且好处现在就能到账。"
          ],
          bullets: [
            "互惠：先给，再要。",
            "损失厌恶：不扫码就作废。",
            "从众：已有多少人加入或领取。",
            "稀缺：限量、限时、限资格。",
            "即时满足：现在领、现在用、现在到账。"
          ]
        }
      ],
      actionChecklist: [
        "把本店单客最大引流成本先算出来。",
        "从 5 类福利里只选 1 种最适合自己行业的。",
        "把当前引流话术改成‘先给 + 不领就亏 + 现在到账’结构。",
        "每个福利都写清楚真实成本和顾客感知价值。"
      ],
      relatedResources: ["tool-lead-cost-budget", "script-checkout-add", "case-bakery-doll-fission", "script-two-choice-close"]
    },
    {
      id: "deepread-lead-touchpoints",
      title: "专题三：到店十触点与公域转私域承接",
      summary: "把‘进店的人截住、平台的人接住’讲成一条连续路径，适合店长直接带着门店排动作。",
      duration: "建议阅读 15-18 分钟",
      sourceManual: "《门店私域引流手册》",
      manualFile: leadManualFile,
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      stages: ["引流", "活动策划"],
      needs: ["拉新", "SOP", "话术"],
      sections: [
        {
          title: "店里每个停留超过 10 秒的地方，都该有加粉理由",
          paragraphs: [
            "新增手册把到店引流讲得很实操：顾客从进门到离店，不管是收银台、桌贴、台卡、包装袋、外卖袋、等候区、试用区，还是 WiFi 连接页，凡是顾客会停留和低头看的地方，都应该有一个明确的二维码和利益点。",
            "这套思想很适合门店排查，因为它不是让你凭感觉想创意，而是逐个触点去问：这里有没有二维码、有没有利益点、有没有人承接、有没有数据。"
          ],
          bullets: [
            "先抓收银台黄金 3 秒。",
            "再抓台卡、包装袋和等候区这三类无声触点。",
            "最后抓店员一对一引导和试用体验。"
          ]
        },
        {
          title: "平台不是终点，核销才是转私域的开始",
          paragraphs: [
            "抖音、美团、大众点评、小红书的价值不是只带来一次成交，而是帮门店找到第一次关系。真正值钱的是顾客到店核销或咨询完成后，能不能自然转进你的私域里。",
            "这也是为什么平台到店承接需要话术：先承认平台帮顾客找到了你，再告诉他以后直接找你更省事、更省钱、更有服务感。"
          ],
          bullets: [
            "抖音：内容拉到店，核销时转企微或社群。",
            "美团/点评：团购核销和评价后私信承接。",
            "外卖平台：包裹卡和售后卡是低成本导流位。"
          ]
        },
        {
          title: "把单点动作变成 SOP，门店才跑得稳",
          paragraphs: [
            "这两本手册叠在一起看，会很清楚地发现一个共性：好的门店不是知道很多方法，而是把高频触点做成标准动作。收银台怎么说、抖音核销怎么接、欢迎语怎么发、标签怎么打，全部都应该有 SOP。",
            "一旦把动作标准化，后面再用数据去看不同话术、不同福利、不同物料的效果，门店的引流才会越做越稳。"
          ],
          bullets: [
            "先把黄金触点 SOP 化，再做 AB 测试。",
            "渠道欢迎语和标签必须打通。",
            "没有后续承接的加粉，质量通常不会高。"
          ]
        }
      ],
      actionChecklist: [
        "本周先完成到店 10 触点排查。",
        "把抖音、美团、点评三类顾客的承接话术分开写。",
        "收银台和核销环节先固定标准话术。",
        "开始记录平台到店转私域率。"
      ],
      relatedResources: ["tool-touchpoint-audit", "sop-counter-golden3s", "sop-platform-to-private-handoff", "script-douyin-private-handoff", "script-meituan-private-handoff"]
    },
    {
      id: "deepread-conversion-core",
      title: "专题四：超级转化率与行为路径设计",
      summary: "把《门店增长-转化端✅》最核心的认知压成一篇：转化不是一个点，而是一条行为路径。",
      duration: "建议阅读 15-18 分钟",
      sourceManual: "《门店增长-转化端✅》",
      manualFile: conversionManualFile,
      roles: ["老板", "店长"],
      industries: allIndustries,
      stages: ["认知", "私聊转化"],
      needs: ["转化"],
      sections: [
        {
          title: "转化率不是成交率，而是赚钱效率",
          paragraphs: [
            "这份手册最强的一层，是把老板从‘客流不够’拉回到‘赚钱效率’。顾客来了但没买、买了但买得少、买完了不再来，这三个问题都属于转化端，而不是流量端。",
            "所以转化率不是一个单点成交数字，而是从路过、进店、浏览、试用、下单、加购到复购的整条行为链。链路上任何一步漏水，都会把前面的流量浪费掉。"
          ],
          bullets: [
            "顾客看到招牌，是一步。",
            "看懂价格和内容，是一步。",
            "决定下单，是一步。",
            "离店前被引导加会员或社群，又是一步。"
          ]
        },
        {
          title: "不要靠说服，而要降低决策成本和增强确定性",
          paragraphs: [
            "手册反复强调一个判断：顾客不买，通常不是你没说服他，而是他还不确定、还怕踩雷、还嫌麻烦、还不知道下一步怎么选。",
            "这意味着门店所有物料、话术和服务动作，都要服务于三件事：先激发需求，再建立信任，最后给出明确的行动指令。"
          ],
          bullets: [
            "需求挖掘：先搞清楚顾客到底要什么。",
            "信任建立：用证据而不是自夸。",
            "行动指令：让顾客知道现在就该怎么做。"
          ]
        },
        {
          title: "每多一个步骤，就多一次流失机会",
          paragraphs: [
            "线下门店也必须像互联网产品一样审视步骤数。菜单翻太多页、点单要扫很多码、注册要填很多信息、会员要下载 APP，这些都在消耗顾客耐心。",
            "转化率思维最实操的一点，就是不断问自己：这个步骤能不能少一个？这个信息能不能更清楚？这个动作能不能替顾客先做好？"
          ],
          bullets: [
            "物料、菜单、页面都要做 5 秒测试。",
            "顾客要一眼看懂卖什么、多少钱、下一步做什么。",
            "一切与转化无关的信息，都应该删掉或弱化。"
          ]
        }
      ],
      actionChecklist: [
        "把门店从路过到复购的路径完整画出来。",
        "找出链路里最容易流失的 3 个节点。",
        "删掉一个多余步骤，简化一个关键页面或物料。",
        "让店员学会用‘需求 - 信任 - 行动指令’结构说话。"
      ],
      relatedResources: ["tool-conversion-funnel-dashboard", "tool-trust-proof-checklist", "script-two-choice-close", "script-risk-reversal-close"]
    },
    {
      id: "deepread-conversion-growth",
      title: "专题五：信任建立、临门一脚与客单价提升",
      summary: "把转化后半程最容易掉单的三件事讲透：顾客为什么不信、为什么犹豫、为什么只买一点。",
      duration: "建议阅读 15-18 分钟",
      sourceManual: "《门店增长-转化端✅》",
      manualFile: conversionManualFile,
      roles: ["老板", "店长", "店员"],
      industries: allIndustries,
      stages: ["私聊转化", "数据考核"],
      needs: ["转化", "复购"],
      sections: [
        {
          title: "没有信任，技巧全是零",
          paragraphs: [
            "新增转化手册把信任讲得很清楚：顾客默认不是相信你，而是在不断判断你靠不靠谱、会不会踩雷、别人是不是来过。你说的话，在信任建立前都会被打折接收。",
            "所以门店要有五类信任来源：社会认同、权威背书、一致透明、熟悉感和体验验证。不同阶段、不同客单、不同业态，信任来源的优先级也不同。"
          ],
          bullets: [
            "首次顾客先看社会认同和权威信号。",
            "高客单行业更看重专业背书和风险说明。",
            "老客更相信自己已经体验过的结果。"
          ]
        },
        {
          title: "临门一脚不是逼单，而是帮助顾客跨过犹豫",
          paragraphs: [
            "很多顾客已经想买了，但还卡在拖延、选择困难、风险恐惧和社交压力上。这时候不是再讲一遍卖点，而是用合适的触发机制，让顾客更容易做决定。",
            "这本手册总结得很完整：稀缺、默认选项、零风险承诺、即时满足、社交催化和清晰指令，都是促成最后成交的关键。"
          ],
          bullets: [
            "要不要买，容易说不要；A 还是 B，更容易做选择。",
            "高意向顾客更吃‘今天锁名额、先留档期’。",
            "低风险承诺能显著降低高客单犹豫。"
          ]
        },
        {
          title: "提升客单价，是最省力的增长方式",
          paragraphs: [
            "这本手册给老板一个很现实的提醒：要把进店人数翻倍很难，把转化率翻倍也很难，但把客单价抬高 20%-50%，往往只需要陈列、组合、话术和默认推荐做对。",
            "关联推荐、升档销售、套餐设计、加购引导、储值锁客和会员等级，都不是额外负担，而是建立在主决策已经完成的基础上顺手做价值扩展。"
          ],
          bullets: [
            "关联推荐要有逻辑关联，且价格不要过高。",
            "升档要强调差价和新增价值，而不是重新报大总价。",
            "套餐结构要包含引流品、利润品和高感知低成本品。"
          ]
        }
      ],
      actionChecklist: [
        "把门店里的信任证据按五类逐一排查。",
        "给高意向顾客准备 2 版二选一 closing 话术。",
        "本周只设计 1 个新的加购或升档动作。",
        "复盘最近 10 单成交，看看丢单主要卡在哪种犹豫上。"
      ],
      relatedResources: ["tool-trust-proof-checklist", "script-two-choice-close", "script-cross-sell-upgrade", "script-risk-reversal-close", "case-hotpot-scarcity-launch"]
    },
    {
      id: "deepread-data-sop",
      title: "专题六：数据驱动、AB 测试与 SOP 化运营",
      summary: "把新转化手册里最适合老板和店长落地的部分抽出来：用数据定位问题，再把优胜动作写进 SOP。",
      duration: "建议阅读 12-15 分钟",
      sourceManual: "《门店增长-转化端✅》",
      manualFile: conversionManualFile,
      roles: ["老板", "店长"],
      industries: allIndustries,
      stages: ["数据考核", "培训验收"],
      needs: ["工具", "SOP"],
      sections: [
        {
          title: "没有数据，所有优化都只是盲猜",
          paragraphs: [
            "门店老板最常见的陷阱就是‘我觉得’。我觉得这个海报好、我觉得这个套餐行、我觉得顾客应该喜欢。转化手册提醒得很直接：你不是顾客，只有数据能告诉你真相。",
            "实体门店其实并不缺数据，门前客流、进店人数、成交率、客单价、加项率、复购率、平台曝光、核销量，全都是可以采集和对比的。"
          ],
          bullets: [
            "先分流量端、店内端、复购端三层看数据。",
            "简单 Excel 和手工记录，也足够启动数据化。",
            "先找漏水最多的节点，再谈全面优化。"
          ]
        },
        {
          title: "AB 测试让门店从经验主义走向实验主义",
          paragraphs: [
            "AB 测试最重要的不是高级，而是克制：每次只改一个变量，然后连续观察差异。门店完全可以测文案、门头、价格呈现、推荐话术、默认选项和引流福利。",
            "一旦把测试节奏跑起来，店长就不会再靠感觉拍板，而是开始用真实顾客反馈做微调，这对复制门店尤其重要。"
          ],
          bullets: [
            "一次只测一个变量。",
            "至少连续 5-7 天，避免偶然波动。",
            "优胜动作直接固化进 SOP。"
          ]
        },
        {
          title: "SOP 的作用，是让团队下限变高",
          paragraphs: [
            "老板常见的错觉是以为团队执行差，其实很多时候不是人不行，而是动作没被写清楚、讲透、盯到位。SOP 不是限制创造，而是让关键动作变成稳定结果。",
            "好的 SOP 至少包含：什么时候做、谁负责、怎么说、怎么记录、什么算做到了。配合每天复盘和每周会议，门店的动作才会越跑越顺。"
          ],
          bullets: [
            "先把高频、高价值节点写成 SOP。",
            "每周复盘一张表，比开很多空会更有效。",
            "SOP 不是写完就完，要持续迭代。"
          ]
        }
      ],
      actionChecklist: [
        "先搭出一张本店转化看板。",
        "每周至少做一个 AB 测试。",
        "把收银台、平台核销和欢迎承接写进 SOP。",
        "每周固定一次 20 分钟复盘会，只看关键数据和下周动作。"
      ],
      relatedResources: ["tool-conversion-funnel-dashboard", "tool-ab-test-log", "sop-ab-test-weekly", "tool-acceptance-scorecard", "tool-coaching-log"]
    }
  ];

  for (const chapter of kb.chapters) {
    const extra = chapterEnhancements[chapter.id];
    if (!extra) continue;
    chapter.trainingDuration = extra.trainingDuration;
    chapter.trainingFocus = extra.trainingFocus;
    chapter.trainerTips = extra.trainerTips;
    chapter.practiceTasks = extra.practiceTasks;
    chapter.recommendedTools = extra.recommendedTools;
    chapter.recommendedCases = extra.recommendedCases;
    chapter.sections = chapter.sections.concat(extra.extraSections);
  }

  kb.deepReads = (kb.deepReads || []).concat(extraDeepReads);
  kb.tools.push(...extraTools, ...manualTools);
  kb.sops.push(...extraSops, ...manualSops);
  kb.cases.push(...extraCases, ...manualCases);
  kb.scripts = extraScripts.concat(manualScripts);
  kb.sources = [
    {
      title: "《门店私域引流手册》",
      type: "新增手册",
      description: "新增并入互动站的原始引流手册，可直接打开查看全文或继续抽取内容。",
      url: leadManualFile,
      buttonLabel: "打开手册"
    },
    {
      title: "《门店增长-转化端✅》",
      type: "新增手册",
      description: "新增并入互动站的转化专题手册，重点覆盖超级转化率、信任建立和 AB 测试。",
      url: conversionManualFile,
      buttonLabel: "打开手册"
    },
    ...kb.sources
  ];
  kb.resourceLibraries = [
    {
      id: "library-deepreads",
      title: "专题深读",
      summary: "把新并入的两本手册拆成可连续阅读的专题，适合老板和店长系统吸收。",
      count: `${kb.deepReads.length} 个专题`,
      entry: "principles",
      target: "deepreads-section",
      need: ""
    },
    {
      id: "library-chapters",
      title: "章节正文",
      summary: "按章节系统学习整本手册，适合老板、店长和培训负责人完整梳理链路。",
      count: `${kb.chapters.length} 个章节`,
      entry: "learn",
      target: "chapters-section",
      need: ""
    },
    {
      id: "library-sops",
      title: "培训 SOP",
      summary: "把训练、陪跑、执行和验收拆成标准动作，适合现场带练和复制。",
      count: `${kb.sops.length} 套`,
      entry: "tools",
      target: "sops-section",
      need: "SOP"
    },
    {
      id: "library-tools",
      title: "工具库",
      summary: "直接调用表格、检查表、模板和排期表，适合边讲边用。",
      count: `${kb.tools.length} 份工具`,
      entry: "tools",
      target: "tools-section",
      need: "工具"
    },
    {
      id: "library-scripts",
      title: "话术库",
      summary: "沉淀门店最常用的开口话术、欢迎语、追单话术和复购表达。",
      count: `${kb.scripts.length} 组话术`,
      entry: "tools",
      target: "scripts-section",
      need: "话术"
    },
    {
      id: "library-cases",
      title: "案例库",
      summary: "集中看可复用案例，适合老板对照借鉴和做内部培训举例。",
      count: `${kb.cases.length} 个案例`,
      entry: "learn",
      target: "cases-section",
      need: "案例"
    },
    {
      id: "library-archive",
      title: "原始表格",
      summary: "保留预览图和原始表格，方便二次修改、导出和内部交付。",
      count: `${kb.rawTables.length} 份原表`,
      entry: "tools",
      target: "archive-section",
      need: "工具"
    }
  ];
})();
