// 网站内容编辑文件：在 GitHub 上修改并提交后，网页会自动重新生成。
// 保留引号、逗号和括号；中文和英文内容需要分别修改。
// 基本资料：姓名、职称、单位、公开邮箱、学术链接。
export const profile = {
  nameZh: '张磊',
  nameEn: 'Lei Zhang',
  initials: 'LZ',
  updated: '2026-10-24',
  origin: 'https://zhangshuyi-20.github.io',
  email: 'lei_zhang@hust.edu.cn',
  positionZh: '副教授',
  positionEn: 'Associate Professor',
  affiliationZh: '华中科技大学 · 数学与统计学院',
  affiliationEn: 'School of Mathematics and Statistics, Huazhong University of Science and Technology',
  officialHomepage: 'https://faculty.hust.edu.cn/ZHANGLEI/zh_CN/index.htm',
  publicationsUrl: 'https://faculty.hust.edu.cn/ZHANGLEI/zh_CN/lwcg/2160295/list/index.htm',
  academicLinks: [
    { labelZh: '华中科技大学教师主页', labelEn: 'Official HUST faculty page', url: 'https://faculty.hust.edu.cn/ZHANGLEI/zh_CN/index.htm' },
    { labelZh: 'ORCID', labelEn: 'ORCID', url: 'https://orcid.org/0000-0003-1514-3795' },
  ],
};

// 教育及博士后经历；zh 为中文，en 为英文。
export const education = [];

// 历年授课记录；请保留对应学期。
export const teachingHistory = [
  { termZh: '2024 秋季', termEn: 'Autumn 2024', titleZh: '微积分（A）（上）', titleEn: 'Calculus A · Part I', url: 'https://faculty.hust.edu.cn/ZHANGLEI/zh_CN/skxx/2160301/content/3302.htm' },
  { termZh: '2022 春季', termEn: 'Spring 2022', titleZh: '微积分（A）（下）', titleEn: 'Calculus A · Part II', url: 'https://faculty.hust.edu.cn/ZHANGLEI/zh_CN/skxx/2160301/content/3307.htm' },
];

// 研究方向及中英文介绍。
export const topics = [
  {
    id: 'dispersive-equations', number: '01', symbol: '∂',
    zh: {
      title: '非线性色散方程', short: '非线性与色散',
      subtitle: 'Nonlinear dispersive equations',
      description: '关注非线性色散方程的整体适定性、散射与长时间动力学，研究非线性作用和色散之间的相互影响。',
      keywords: ['整体适定性', '散射理论', '长时间动力学'],
      question: '非线性作用与色散如何共同决定解的长期演化？',
    },
    en: {
      title: 'Nonlinear dispersive equations', short: 'Nonlinearity & dispersion',
      subtitle: 'Global behavior of nonlinear waves',
      description: 'Global well-posedness, scattering, and long-time dynamics for nonlinear dispersive equations, with an emphasis on the interplay between nonlinearity and dispersion.',
      keywords: ['Global well-posedness', 'Scattering', 'Long-time dynamics'],
      question: 'How do nonlinearity and dispersion shape the long-time evolution of solutions?',
    },
  },
  {
    id: 'stochastic-pdes', number: '02', symbol: '𝒲',
    zh: {
      title: '随机偏微分方程', short: '随机性与动力学',
      subtitle: 'Stochastic partial differential equations',
      description: '关注随机偏微分方程的适定性、噪声正则化与长时间行为，研究随机扰动对解的存在性和动力学的影响。',
      keywords: ['随机适定性', '噪声正则化', '长时间行为'],
      question: '噪声如何改变解的正则性与长期行为？',
    },
    en: {
      title: 'Stochastic partial differential equations', short: 'Randomness & dynamics',
      subtitle: 'The effects of noise on evolution equations',
      description: 'Well-posedness, regularization by noise, and long-time behavior of stochastic PDEs, including how random perturbations affect the existence and dynamics of solutions.',
      keywords: ['Well-posedness', 'Regularization by noise', 'Long-time behavior'],
      question: 'How does noise influence the regularity and long-time behavior of solutions?',
    },
  },
  {
    id: 'stochastic-control', number: '03', symbol: '𝒰',
    zh: {
      title: '随机控制', short: '演化与控制',
      subtitle: 'Stochastic control',
      description: '关注随机分布参数系统的控制问题，以及随机分析与偏微分方程方法在此类问题中的应用。',
      keywords: ['分布参数系统', '能控性', '随机分析'],
      question: '如何通过控制影响随机系统的演化？',
    },
    en: {
      title: 'Stochastic control', short: 'Evolution & control',
      subtitle: 'Control of distributed parameter systems',
      description: 'Control problems for stochastic distributed parameter systems, using methods from stochastic analysis and partial differential equations.',
      keywords: ['Distributed systems', 'Controllability', 'Stochastic analysis'],
      question: 'How can control influence the evolution of a stochastic system?',
    },
  },
];

// 论文列表：在下面添加真实条目，网页按年份从新到旧排列。
// 条目格式：
// { title, authors, year, venue, status: 'preprint' | 'published', url, pdf, topic }
export const publications = [
  {
    title: 'New Global Carleman Estimates and Null Controllability for Forward/Backward Semilinear Parabolic SPDEs',
    authors: 'Lei Zhang, Fan Xu, Bin Liu', year: 2026,
    venue: 'SIAM Journal on Control and Optimization 64(3), 1297–1326',
    status: 'published', url: 'https://doi.org/10.1137/25M1770643', topic: 'stochastic-control',
  },
  {
    title: 'Well-posedness and invariant measures for the stochastically perturbed Landau-Lifshitz-Baryakhtar equation',
    authors: 'Fan Xu, Lei Zhang, Bin Liu', year: 2026,
    venue: 'Journal of Differential Equations 464, 114194',
    status: 'published', url: 'https://doi.org/10.1016/j.jde.2026.114194', topic: 'stochastic-pdes',
  },
  {
    title: 'Well-posedness and Large Deviations of Lévy-driven Marcus Stochastic Landau-Lifshitz-Baryakhtar Equation',
    authors: 'Fan Xu, Bin Liu, Lei Zhang', year: 2026,
    venue: 'Potential Analysis 64, Article 39',
    status: 'published', url: 'https://doi.org/10.1007/s11118-026-10278-9', topic: 'stochastic-pdes',
  },
  {
    title: 'Global strong solution for the stochastic tamed Chemotaxis–Navier–Stokes system in ℝ³',
    authors: 'Fan Xu, Lei Zhang, Bin Liu', year: 2025,
    venue: 'Stochastic Processes and their Applications 189, 104732',
    status: 'published', url: 'https://doi.org/10.1016/j.spa.2025.104732', topic: 'stochastic-pdes',
  },
  {
    title: 'Random perturbations for the chemotaxis-fluid model with fractional dissipation: Global pathwise weak solutions',
    authors: 'Lei Zhang, Bin Liu', year: 2024,
    venue: 'Electronic Journal of Probability 29, Article 165, 1–56',
    status: 'published', url: 'https://doi.org/10.1214/24-EJP1230', topic: 'stochastic-pdes',
  },
  {
    title: 'Global martingale weak solutions for the three-dimensional stochastic chemotaxis-Navier-Stokes system with Lévy processes',
    authors: 'Lei Zhang, Bin Liu', year: 2024,
    venue: 'Journal of Functional Analysis 286(7), 110337',
    status: 'published', url: 'https://doi.org/10.1016/j.jfa.2024.110337', topic: 'stochastic-pdes',
  },
];

// 课程介绍及教学资料。附件放在 dist/files/，链接填写 /files/文件名.pdf。
export const courses = [
  {
    id: 'linear-algebra', number: '01', code: 'LINEAR ALGEBRA',
    zh: {
      title: '线性代数', subtitle: '从线性方程组到线性变换',
      description: '围绕行列式、矩阵、向量空间和特征值，整理基本概念、计算方法与证明思路。',
      themes: [
        ['行列式与矩阵', '行列式的性质与计算；矩阵运算、逆矩阵与初等变换。'],
        ['线性方程组', '消元法、矩阵的秩、解的结构与线性相关性。'],
        ['向量空间与线性映射', '子空间、基与维数；线性映射的矩阵表示。'],
        ['特征值与二次型', '特征值与特征向量；对角化、正交变换与二次型。'],
      ],
    },
    en: {
      title: 'Linear algebra', subtitle: 'From linear systems to linear transformations',
      description: 'Fundamental concepts, calculations, and proofs involving determinants, matrices, vector spaces, and eigenvalues.',
      themes: [
        ['Determinants and matrices', 'Properties of determinants; matrix operations, inverses, and elementary transformations.'],
        ['Linear systems', 'Elimination, matrix rank, solution spaces, and linear dependence.'],
        ['Vector spaces and linear maps', 'Subspaces, bases, dimension, and matrix representations of linear maps.'],
        ['Eigenvalues and quadratic forms', 'Eigenvectors, diagonalization, orthogonal transformations, and quadratic forms.'],
      ],
    },
    resources: [],
  },
  {
    id: 'calculus', number: '02', code: 'CALCULUS',
    zh: {
      title: '微积分', subtitle: '理解极限、变化与累积',
      description: '围绕极限、连续、微分与积分，梳理定理之间的联系以及计算和证明中的基本方法。',
      themes: [
        ['函数、极限与连续', '函数的基本性质；数列与函数极限；连续性与介值性质。'],
        ['导数与微分', '导数的定义和运算；微分中值定理与 Taylor 公式。'],
        ['导数的应用', '函数单调性、极值、凸性与不等式证明。'],
        ['积分与应用', '不定积分、定积分、微积分基本定理及其应用。'],
      ],
    },
    en: {
      title: 'Calculus', subtitle: 'Limits, change, and accumulation',
      description: 'Limits, continuity, differentiation, and integration, with attention to the connections between theorems and the methods behind calculations and proofs.',
      themes: [
        ['Functions, limits, and continuity', 'Basic properties of functions; limits of sequences and functions; continuity and the intermediate value theorem.'],
        ['Derivatives and differentials', 'The derivative and differentiation rules; mean value theorems and Taylor expansions.'],
        ['Applications of derivatives', 'Monotonicity, extrema, convexity, and proofs of inequalities.'],
        ['Integration and applications', 'Antiderivatives, definite integrals, and the fundamental theorem of calculus.'],
      ],
    },
    resources: [],
  },
];

// 首页、关于页面和导航的中英文文字：zh 为中文，en 为英文。
export const ui = {
  zh: {
    lang: 'zh-CN', title: '张磊 Lei Zhang · 华中科技大学', description: '张磊（Lei Zhang），华中科技大学数学与统计学院副教授。研究非线性偏微分方程、随机偏微分方程及随机控制。个人主页提供研究论文、教学信息与联系方式。',
    nav: { home: '首页', research: '研究', teaching: '教学', about: '关于' },
    skip: '跳至正文', menu: '打开导航菜单', closeMenu: '收起导航菜单',
    eyebrow: 'HUST · MATHEMATICS & STATISTICS',
    field: '偏微分方程 · 随机分析',
    heroIntro: '研究非线性与随机性，理解方程的演化。',
    heroBody: '我的研究涉及非线性偏微分方程、随机偏微分方程及随机控制，关注解的适定性、长时间行为与噪声的作用。',
    researchLink: '了解我的研究', teachingLink: '浏览教学栏目',
    waveLabel: '非线性薛定谔方程 · 孤立波振幅示意',
    interests: '研究方向', interestNote: '我的主要研究兴趣', allResearch: '全部研究方向',
    researchIntro: '我关注解的适定性、散射与长时间行为，以及噪声对方程动力学的影响。我也关注随机分布参数系统中的控制问题。',
    researchKicker: 'RESEARCH', researchHeading: '研究', researchLead: '非线性、随机性与方程的长期行为。',
    onThisPage: '本页内容', topicsLabel: '研究方向', papersLabel: '部分论文',
    papersIntro: '以下列出部分已发表论文，点击题目可访问期刊页面。', papersEmpty: '论文目录待补充', papersEmptyDetail: '公开稿件、出版信息和全文链接将随条目一同更新。',
    recentPapers: '近期论文', allPapers: '查看论文目录', officialPapers: '学校主页的完整论文目录', officialHomepage: '学校主页',
    teachingKicker: 'TEACHING', teachingHeading: '教学', teachingLead: '按课程整理概念、方法与学习资料。',
    teachingIntro: '这里用于整理讲义、习题和补充阅读材料。课程主题可在下方展开查看。',
    teachingHistory: '部分授课记录', teachingHistoryNote: '以下为学校教师主页列出的部分授课信息。',
    teachingHomeTitle: '教学与学习', teachingHomeText: '从概念到方法，从计算到证明。按课程整理学习主题、讲义与习题。',
    courseThemes: '查看课程主题', courseResources: '课程资料', resourceEmpty: '讲义与习题整理中，将在本页更新。',
    materialsTitle: '学习资料', materialsBody: '讲义、习题和补充材料将按课程持续整理。',
    aboutKicker: 'ABOUT', aboutHeading: '关于', aboutLead: '张磊 · 华中科技大学数学与统计学院',
    aboutBody: '我是张磊，现任华中科技大学数学与统计学院副教授。我的研究涉及非线性偏微分方程、随机偏微分方程及相关控制问题，关注适定性、散射与长时间行为，以及随机扰动对方程动力学的影响。',
    educationTitle: '',
    aboutSite: '关于本站', aboutSiteBody: '这个网站用于汇集研究信息、公开论文和教学资料。研究栏目介绍主要方向，教学栏目按课程整理学习内容。',
    interestsSmall: '研究关键词', contact: '联系方式', contactPending: '联系方式将在补充后公布。',
    browseResearch: '浏览研究栏目', browseTeaching: '浏览教学栏目',
    footerTag: '华中科技大学 · 数学与统计学院', footerNote: '内容更新于', top: '回到顶部',
    figureAlt: '非线性薛定谔方程行波振幅的绿色线框曲面，幅度为根号二乘以 sech(x−0.65t)。',
    noPage: '页面未找到', noPageBody: '这个页面可能已移动。你可以返回首页，继续浏览研究和教学内容。', backHome: '返回首页',
  },
  en: {
    lang: 'en', title: 'Lei Zhang · Huazhong University of Science and Technology', description: 'Lei Zhang, Associate Professor at the School of Mathematics and Statistics, Huazhong University of Science and Technology. Research in nonlinear PDEs, stochastic PDEs, and stochastic control; publications and teaching information.',
    nav: { home: 'Home', research: 'Research', teaching: 'Teaching', about: 'About' },
    skip: 'Skip to main content', menu: 'Open navigation', closeMenu: 'Close navigation',
    eyebrow: 'HUST · MATHEMATICS & STATISTICS',
    field: 'Partial differential equations · Stochastic analysis',
    heroIntro: 'Nonlinearity, randomness, and the evolution of equations.',
    heroBody: 'My research interests lie in nonlinear partial differential equations, especially nonlinear dispersive equations, stochastic PDEs, and stochastic control.',
    researchLink: 'Explore my research', teachingLink: 'Browse teaching',
    waveLabel: 'NONLINEAR SCHRÖDINGER EQUATION · SOLITON AMPLITUDE',
    interests: 'Research interests', interestNote: 'Questions I work on', allResearch: 'Explore research',
    researchIntro: 'I am interested in well-posedness, scattering, long-time behavior, and the effects of noise on the dynamics. I also study control problems for stochastic distributed parameter systems.',
    researchKicker: 'RESEARCH', researchHeading: 'Research', researchLead: 'Nonlinearity, randomness, and long-time behavior.',
    onThisPage: 'ON THIS PAGE', topicsLabel: 'Research interests', papersLabel: 'Selected publications',
    papersIntro: 'A selection of published papers. Titles link to the journal pages.', papersEmpty: 'Publication list forthcoming', papersEmptyDetail: 'Each entry will include the public manuscript, publication details, and full-text links.',
    recentPapers: 'Recent publications', allPapers: 'View publications', officialPapers: 'Full list on the HUST faculty page', officialHomepage: 'HUST profile',
    teachingKicker: 'TEACHING', teachingHeading: 'Teaching', teachingLead: 'Concepts, methods, and materials, organized by course.',
    teachingIntro: 'A space for lecture notes, exercises, and further reading. Expand a course below to explore its topics.',
    teachingHistory: 'Selected teaching records', teachingHistoryNote: 'Selected teaching entries from the official HUST faculty page.',
    teachingHomeTitle: 'Teaching & learning', teachingHomeText: 'From concepts to methods, and from calculations to proofs. Course topics, lecture notes, and exercises in one place.',
    courseThemes: 'Explore course topics', courseResources: 'Course materials', resourceEmpty: 'Lecture notes and exercises will be added here.',
    materialsTitle: 'Learning materials', materialsBody: 'Lecture notes, exercises, and supplementary material will be organized by course.',
    aboutKicker: 'ABOUT', aboutHeading: 'About', aboutLead: 'Lei Zhang · School of Mathematics and Statistics, HUST',
    aboutBody: 'I am Lei Zhang, an Associate Professor in the School of Mathematics and Statistics at Huazhong University of Science and Technology. My research interests lie in nonlinear PDEs, stochastic PDEs, and related control problems, including well-posedness, scattering, long-time behavior, and the effects of noise on the dynamics.',
    educationTitle: '',
    aboutSite: 'About this website', aboutSiteBody: 'This website brings together research information, public papers, and teaching materials. The research page introduces my main interests; the teaching page organizes learning material by course.',
    interestsSmall: 'RESEARCH KEYWORDS', contact: 'Contact', contactPending: 'Contact information will be added here.',
    browseResearch: 'Explore research', browseTeaching: 'Explore teaching',
    footerTag: 'School of Mathematics and Statistics · HUST', footerNote: 'Updated', top: 'Back to top',
    figureAlt: 'A green wireframe of the nonlinear Schrödinger traveling soliton amplitude, square root of two times sech(x minus 0.65t).',
    noPage: 'Page not found', noPageBody: 'This page may have moved. Return to the homepage to explore research and teaching.', backHome: 'Back to home',
  },
};
