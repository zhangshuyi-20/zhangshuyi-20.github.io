# 张磊 / Lei Zhang · 个人学术网站

网站：<https://zhangshuyi-20.github.io/>

仓库：<https://github.com/zhangshuyi-20/zhangshuyi-20.github.io>

中文和英文网站均包含首页、教学、研究与论文、个人经历。您在 GitHub 保存内容后，网站会自动生成并发布。

网站采用简洁学术主页排版：深灰导航、白底正文、编号论文列表。首页照片位于 `dist/assets/portrait.jpg`，可上传同名文件替换；照片路径在 `profile.portrait` 中设置。当前照片来自[华中科技大学官方介绍](https://iirmas.hust.edu.cn/info/1021/1092.htm)。

## 日常更新

1. 登录 GitHub，打开本仓库的 [`content.mjs`](content.mjs)。
2. 点击右上角铅笔图标，修改文字，保留原有引号、逗号和括号。
3. 点击 **Commit changes**，将修改保存到 **main** 分支。
4. 打开 **Actions → Deploy academic website**。本次运行显示绿色勾号后，刷新网站。

中文和英文内容需要分别修改。`zh`、`nameZh` 等字段用于中文；`en`、`nameEn` 等字段用于英文。可以同时修改 `profile.updated`，更新页面底部的内容日期。

| 修改内容 | 在 `content.mjs` 中查找 |
| --- | --- |
| 姓名、职称、单位、邮箱和学术链接 | `profile` |
| 教育及博士后经历 | `education` |
| 研究方向 | `topics` |
| 论文列表 | `publications` |
| 课程介绍、主题和资料 | `courses` |
| 历年授课记录 | `teachingHistory` |
| 首页简介、个人经历页面及界面文字 | `ui` |

## 添加论文

在 `publications` 的方括号内添加一项，通常放在最前面。用真实信息替换示例文字和链接：

```js
{
  title: '论文英文题目',
  authors: '作者姓名，按论文署名顺序填写',
  year: 2026,
  venue: '期刊名称、卷号和页码或文章编号',
  status: 'published',
  url: 'https://doi.org/填写实际DOI',
  topic: 'stochastic-pdes',
},
```

`status` 可填 `published` 或 `preprint`；`topic` 对应研究方向的 `id`，目前有 `dispersive-equations`、`stochastic-pdes` 和 `stochastic-control`。如有公开全文，可以增加 `pdf: '实际PDF链接',`。

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
