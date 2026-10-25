# 张磊 / Lei Zhang · 个人学术网站

网站：<https://zhangshuyi-20.github.io/>

仓库：<https://github.com/zhangshuyi-20/zhangshuyi-20.github.io>

网站默认使用英语，中文辅助版本位于 `/zh/`。首页以研究简介和近期论文为主，完整论文目录位于研究页面；教学页面收录学院个人主页的 19 条授课记录，不展示学历信息。旧 `/en/` 地址会自动转向英语主站。您在 GitHub 保存内容后，网站会自动生成并发布。

网站采用简洁学术主页排版：星空导航、白底正文、编号论文列表。研究页面将已发表论文与公开预印本分开，两类都使用连续列表，不按年份分组。每类按日期从新到旧排列，编号从大到小递减，最新论文的编号最大。首页只显示最近三篇已发表论文，编号与完整目录保持一致；研究页的论文数量自动计算。首页照片位于 `dist/assets/portrait.jpg`，可上传同名文件替换；照片路径在 `profile.portrait` 中设置。当前照片来自[华中科技大学官方介绍](https://iirmas.hust.edu.cn/info/1021/1092.htm)。顶部星空背景位于 `dist/assets/starfield-header.png`；主标题在电脑端为 28px，手机端为 24px。

## 日常更新

1. 登录 GitHub，打开本仓库的 [`content.mjs`](content.mjs)。
2. 点击右上角铅笔图标，修改文字，保留原有引号、逗号和括号。
3. 点击 **Commit changes**，将修改保存到 **main** 分支。
4. 打开 **Actions → Deploy academic website**。本次运行显示绿色勾号后，刷新网站。

中文和英文内容需要分别修改。`zh`、`nameZh` 等字段用于中文；`en`、`nameEn` 等字段用于英文。可以同时修改 `profile.updated`，更新页面底部的内容日期。

| 修改内容 | 在 `content.mjs` 中查找 |
| --- | --- |
| 姓名、职称、单位、通信地址、邮箱和学术链接 | `profile`，完整地址使用 `addressZh`、`addressEn` |
| 研究页面简介 | `ui.zh.researchIntro`、`ui.en.researchIntro` |
| 论文列表 | `publications` |
| 课程介绍、主题和资料 | `courses` |
| 学院个人主页的历年授课记录 | `teachingHistory` |
| 首页简介、研究领域标题及界面文字 | `ui` |

## 添加论文

在 `publications` 的方括号内添加一项，通常放在最前面。用真实信息替换示例文字和链接：

```js
{
  title: '论文英文题目',
  authors: '作者姓名，按论文署名顺序填写',
  year: 2026,
  journal: '期刊名称',
  volume: '卷号',
  issue: '期号',
  pages: '起始页–终止页',
  // 使用文章编号的期刊可用 articleNumber: '文章编号'，无需重复填写 pages。
  doi: '实际DOI，不含 https://doi.org/',
  status: 'published',
  url: 'https://doi.org/填写实际DOI',
  publishedDate: '2026-05-11',
  topic: 'stochastic-pdes',
},
```

`status` 可填 `published`（已正式发表）或 `preprint`（公开预印本，包括作者明确同意在本站公开的 PDF）。添加前核对作者身份；本地稿件须经作者明确同意公开后上传。`year` 使用论文年份；可选的 `publishedDate` 用于同一年内排序。作者必须按原论文署名顺序完整填写。没有核实的 DOI、期号或页码请省略，不要猜填。

预印本列表不展示年份、发布日期或修订日期；这些内容字段仍用于排序。已发表论文保留出版年份。

公开 arXiv 预印本可按以下格式填写，不应使用尚无证据的“已接收”状态：

```js
{
  title: '公开预印本英文题目',
  authors: '作者姓名，按署名顺序填写',
  year: 2026,
  arxiv: '实际arXiv编号',
  doi: '10.48550/arXiv.实际编号',
  status: 'preprint',
  url: 'https://arxiv.org/abs/实际编号',
  publishedDate: '2026-09',
  topic: 'dispersive-equations',
},
```

论文正式发表后，将同一条记录更新为期刊信息和 `status: 'published'`，避免两类中重复列出。`topic` 对应研究方向的 `id`，目前有 `dispersive-equations`、`stochastic-pdes` 和 `stochastic-control`。如有公开全文，可以增加 `pdf: '实际PDF链接',`。

### 在本站公开未上传 arXiv 的预印本

1. 确认作者同意公开该版本，在仓库的 **dist → files → preprints** 中上传 PDF。
2. 在 `publications` 中添加 `status: 'preprint'` 的记录，填写准确题目、作者和年份；将 `url` 设为 `/files/preprints/实际文件名.pdf`，点击论文题目即可打开 PDF。
3. 没有 arXiv 编号或 DOI 时省略对应字段。`publishedDate` 可填写该版本首次在本站公开的日期；不要将投稿模板或文件夹名称当作已接收、已发表的依据。

例如：

```js
{
  title: '预印本英文题目',
  authors: '作者姓名，按署名顺序填写',
  year: 2026,
  status: 'preprint',
  url: '/files/preprints/manuscript.pdf',
  publishedDate: '2026-10-25',
  topic: 'stochastic-pdes',
},
```

## 上传教学讲义

1. 在仓库中打开 **dist → files**，点击 **Add file → Upload files**，上传 PDF。
2. 在 `content.mjs` 中找到 `courses`，再找到对应课程的 `resources: []`。
3. 将空列表改为下面的形式。文件名需与上传文件完全一致：

```js
resources: [
  {
    zh: { title: '微积分第一章讲义' },
    en: { title: 'Calculus: Chapter 1 Notes' },
    url: '/files/calculus-chapter1.pdf',
    type: 'PDF',
  },
],
```

已有资料时，在列表中继续增加同样格式的记录。保存到 **main** 后会自动发布。建议文件名使用英文字母、数字和短横线。

## 每日浏览量

各页面底部将 **Daily visits / 日访问量** 和六位数字接在更新日期后，与返回顶部、统计隐私说明使用相同字号，窄屏自然换行。数字例如 `000123`，超过六位时完整显示。这里统计的是全站当日页面浏览次数（PV），同一人浏览多个页面会计多次，不是独立访客人数。

全站中英文页面使用同一个 Stats4U 计数器。生产网站通过一个不显示的图片请求登记浏览，不载入第三方统计脚本；本地预览和 404 页面不会计数。`scripts/update-daily-views.mjs` 读取该服务的公开今日浏览量，GitHub Actions 每小时第 7、37 分运行并重新发布快照；推送内容或手动发布时也会更新。数字约每 30 分钟刷新，GitHub 定时任务可能延迟。

浏览器从本站 `/assets/daily-views.json` 读取快照，不向访客暴露管理密钥。服务故障时保留原快照；如果快照不是服务时区的当天，或读取失败，页面显示 `—`，不显示虚假的零。统计按服务默认时区 **Europe/Warsaw** 划分日期，数字的提示文字中显示更新时间与时区。它从启用后开始，无法还原此前数据；浏览器拦截或网络故障可能导致漏计。服务说明见 [Stats4U](https://www.stats4u.net/en/about) 及[隐私说明](https://www.stats4u.net/en/privacy)。私有管理链接请单独妥善保存，不要放入公开仓库。

## 文件说明

| 文件或目录 | 用途 |
| --- | --- |
| `content.mjs` | 主要内容，日常维护从这里开始 |
| `scripts/build.mjs` | 读取内容并生成中英文页面 |
| `dist/assets` | 网站样式、脚本和图片 |
| `dist/files` | 公开讲义、习题等附件 |
| `.github/workflows/pages.yml` | 自动生成和发布网站 |
| `setup/pages-workflow.txt` | 同一份发布配置的备用文本 |

生成后的 HTML 页面位于 `dist` 中。修改页面文字时，请编辑 `content.mjs`，下次生成会覆盖 HTML。`dist/assets` 和 `dist/files` 中的静态文件会保留。

## 发布设置与故障查看

仓库的 **Settings → Pages → Build and deployment → Source** 应设为 **GitHub Actions**。工作流会在每次向 **main** 保存修改时运行，也可从 **Actions → Deploy academic website → Run workflow** 手动运行。

如果 Actions 显示红色叉号，打开该次运行查看失败步骤；修改内容后最常见的原因是漏了引号、逗号或括号。修正后再次保存即可重新发布。

如果 `.github` 文件夹在上传时遗漏，可新建 `.github/workflows/pages.yml`，粘贴 `setup/pages-workflow.txt` 的全部内容并保存。

可选的本地生成命令（需要 Node.js 24）：

```text
node scripts/build.mjs
```

工作流使用 GitHub 官方 Actions，不需要另建部署密钥。参考：[GitHub Pages 自定义工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
