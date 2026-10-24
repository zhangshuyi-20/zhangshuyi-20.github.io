教学资料目录

将可公开分享的讲义、习题等 PDF 文件上传到本目录。
文件名建议使用英文字母、数字和短横线，例如 calculus-chapter1.pdf。

然后打开仓库根目录的 content.mjs，在相应课程的 resources 列表中添加：

{
  zh: { title: '微积分第一章讲义' },
  en: { title: 'Calculus: Chapter 1 Notes' },
  url: '/files/calculus-chapter1.pdf',
  type: 'PDF',
},

链接以 /files/ 开头，文件名及大小写必须与上传的文件一致。
保存到 main 分支后，等待 Actions 发布成功，即可在教学页面打开资料。
