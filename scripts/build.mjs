import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, topics, publications, courses, teachingHistory, ui } from '../content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
// GitHub Actions 自动使用个人主页域名；本地生成使用 profile.origin。
const origin = (process.env.SITE_ORIGIN || (process.env.GITHUB_REPOSITORY_OWNER ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io` : profile.origin)).replace(/\/+$/, '');
const assetVersion = 'classic-20261024';
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const href = (lang, page = 'home') => `${lang === 'zh' ? '/zh' : ''}/${page === 'home' ? '' : `${page}/`}`;
const link = (url, label, extra = '') => `<a href="${esc(url)}"${extra}>${esc(label)}</a>`;

function header(lang, page) {
  const u = ui[lang];
  const alternate = page === '404' ? 'home' : page;
  const name = lang === 'zh' ? `${profile.nameZh} (${profile.nameEn})` : `${profile.nameEn} (${profile.nameZh})`;
  return `<a class="skip-link" href="#main">${esc(u.skip)}</a>
<header class="site-header" id="top"><nav class="site-nav" aria-label="${lang === 'zh' ? '主导航' : 'Main navigation'}">
${link(href(lang), name, ' class="site-name"')}
${['home', 'research', 'teaching'].map(key => link(href(lang, key), u.nav[key], ` class="nav-link"${page === key ? ' aria-current="page"' : ''}`)).join('\n')}
<div class="language-links">${link(href(lang === 'zh' ? 'en' : 'zh', alternate), lang === 'zh' ? 'English' : '中文', ` class="language-switch" lang="${lang === 'zh' ? 'en' : 'zh-CN'}" data-language-switch aria-label="${lang === 'zh' ? 'Switch to English' : '切换为中文'}"`)}</div>
</nav></header>`;
}

function footer(lang) {
  const u = ui[lang];
  return `<footer class="site-footer"><span>${esc(u.footerNote)} ${esc(profile.updated.replaceAll('-', '.'))}</span> · ${link('#top', u.top)}</footer>`;
}

function layout(lang, page, body) {
  const u = ui[lang];
  const title = page === 'home' ? u.title : `${u.nav[page] || u.noPage} · ${lang === 'zh' ? profile.nameZh : profile.nameEn}`;
  const canonical = `${origin}${href(lang, page)}`;
  return `<!doctype html>
<html lang="${u.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#333333"><title>${esc(title)}</title><meta name="description" content="${esc(u.description)}"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/style.css?v=${assetVersion}"><script src="/assets/site.js?v=${assetVersion}" defer></script>${page === '404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(canonical)}"><link rel="alternate" hreflang="zh-CN" href="${origin}${href('zh', page)}"><link rel="alternate" hreflang="en" href="${origin}${href('en', page)}">`}<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(u.description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:locale" content="${lang === 'zh' ? 'zh_CN' : 'en_US'}"></head><body class="page-${page}">
${header(lang, page)}<main id="main" class="site-main" tabindex="-1">${body}</main>${footer(lang)}</body></html>`;
}

function contact(lang) {
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  return `<ul class="contact-list"><li>${esc(profile[`affiliation${suffix}`])}</li>${profile.email ? `<li>Email: ${link(`mailto:${profile.email}`, profile.email)}</li>` : ''}</ul>`;
}

function home(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  const affiliation = link(profile.officialHomepage, profile[`affiliation${suffix}`]);
  const appointment = lang === 'zh'
    ? `${esc(u.appointmentBefore)} ${affiliation} ${esc(u.appointmentBetween)}${esc(profile.positionZh)}${esc(u.appointmentAfter)}`
    : `${esc(u.appointmentBefore)} ${esc(profile.positionEn.toLowerCase())} ${esc(u.appointmentBetween)} ${affiliation}${esc(u.appointmentAfter)}`;
  const academicLinks = profile.academicLinks.filter(item => item.url !== profile.officialHomepage).map(item => link(item.url, item[`label${suffix}`]));
  return `${profile.portrait ? `<img class="profile-photo" src="${esc(profile.portrait)}" width="200" height="280" alt="${esc(profile.nameZh)} / ${esc(profile.nameEn)}" fetchpriority="high">` : ''}
<section class="intro"><h1 class="welcome">${esc(u.welcome)}</h1><p>${appointment}</p><p>${esc(u.heroBody)}</p><p class="profile-links">${[link(`${href(lang, 'research')}#publications`, u.allPapers), ...academicLinks].join(' · ')}</p></section>
<section id="research-interests"><h2>${esc(u.interests)}</h2><ul>${topics.map(topic => `<li>${link(`${href(lang, 'research')}#${topic.id}`, topic[lang].title)}${lang === 'zh' ? '：' : ': '}${esc(topic[lang].description)}</li>`).join('')}</ul></section>
<section><h2>${esc(u.recentPapers)}</h2>${papers([...publications].sort((a, b) => b.year - a.year).slice(0, 3))}<p>${link(`${href(lang, 'research')}#publications`, u.allPapers)}</p></section>
<section><h2>${esc(u.homeContact)}</h2>${contact(lang)}</section>`;
}

function papers(entries) {
  return `<ol class="publication-list">${[...entries].sort((a, b) => b.year - a.year).map(paper => `<li><span class="paper-authors">${esc(paper.authors)} (${esc(paper.year)}).</span> ${paper.url ? link(paper.url, paper.title, ' class="paper-title" target="_blank" rel="noopener noreferrer"') : `<span class="paper-title">${esc(paper.title)}</span>`}. <em class="paper-venue">${esc(paper.venue || (paper.status === 'preprint' ? 'Preprint' : ''))}</em>${paper.pdf ? ` ${link(paper.pdf, 'PDF', ' class="paper-links" target="_blank" rel="noopener noreferrer"')}` : ''}</li>`).join('\n')}</ol>`;
}

function research(lang) {
  const u = ui[lang];
  const preprints = publications.filter(paper => paper.status === 'preprint');
  const published = publications.filter(paper => paper.status !== 'preprint');
  return `<h1>${esc(u.researchHeading)}</h1><p>${esc(u.researchIntro)}</p>
${preprints.length ? `<section id="preprints"><h2>${esc(u.preprints)}</h2>${papers(preprints)}</section>` : ''}
<section id="publications"><h2>${esc(u.publishedPapers)}</h2><p>${esc(u.papersIntro)}</p>${published.length ? papers(published) : `<p>${esc(u.papersEmpty)}</p>`}<p>${link(profile.publicationsUrl, u.officialPapers)}</p></section>
<section><h2>${esc(u.interests)}</h2><ul class="research-topics">${topics.map(topic => `<li id="${esc(topic.id)}"><strong>${esc(topic[lang].title)}</strong><p>${esc(topic[lang].description)}</p><p>${esc(topic[lang].keywords.join(' · '))}</p><p><em>${esc(topic[lang].question)}</em></p></li>`).join('\n')}</ul></section>`;
}

function courseResources(course, lang) {
  if (!course.resources.length) return `<p>${esc(ui[lang].resourceEmpty)}</p>`;
  return `<ul class="resource-list">${course.resources.map(resource => `<li>${link(resource.url, resource[lang]?.title || resource.title, ' target="_blank" rel="noopener noreferrer"')}${resource.type ? ` (${esc(resource.type)})` : ''}</li>`).join('')}</ul>`;
}

function teaching(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  return `<h1>${esc(u.teachingHeading)}</h1><p>${esc(u.teachingIntro)}</p>
<p>${link('http://faculty.hust.edu.cn/ZHANGLEI/zh_CN/skxx/2160301/list/index.htm', u.officialTeaching)}</p>
<section id="calculus"><h2>${esc(u.coursesLabel)}</h2><ul class="course-list">${courses.map(course => `<li id="${esc(course.id)}">${esc(course[lang].title)}${course.resources.length ? courseResources(course, lang) : ''}</li>`).join('')}</ul></section>
<section id="teaching-history"><h2>${esc(u.teachingHistory)}</h2><ul class="teaching-history">${teachingHistory.map(course => `<li><span class="period">${esc(course[`term${suffix}`])}</span> ${link(course.url, course[`title${suffix}`], ' target="_blank" rel="noopener noreferrer"')}${course.classesZh ? `<details class="teaching-classes"><summary>${esc(u.classesLabel)}</summary><p lang="zh-CN">${esc(course.classesZh)}</p></details>` : ''}</li>`).join('')}</ul></section>`;
}

function about(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  return `<h1>${esc(u.aboutHeading)}</h1><p>${esc(u.aboutBody)}</p>
<section><h2>${esc(u.currentPosition)}</h2><p>${esc(profile[`position${suffix}`])} · ${esc(profile[`affiliation${suffix}`])}</p></section>
<section><h2>${esc(u.contact)}</h2>${contact(lang)}<ul>${profile.academicLinks.map(item => `<li>${link(item.url, item[`label${suffix}`])}</li>`).join('')}</ul></section>`;
}

for (const lang of ['zh', 'en']) {
  for (const [page, render] of Object.entries({ home, research, teaching, about })) {
    const folder = path.join(dist, href(lang, page));
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'index.html'), layout(lang, page, render(lang)));
  }
}
// 保留旧英文地址，转向新的英语主站。
for (const page of ['home', 'research', 'teaching', 'about']) {
  const folder = path.join(dist, 'en', page === 'home' ? '' : page);
  const target = href('en', page);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${origin}${target}"><title>Page moved · Lei Zhang</title><script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script></head><body><a href="${target}">Continue to the English website</a></body></html>`);
}
fs.writeFileSync(path.join(dist, '404.html'), layout('en', '404', `<h1>${esc(ui.en.noPage)}</h1><p>${esc(ui.en.noPageBody)}</p><p>${link('/', ui.en.backHome)}</p>`));
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['zh', 'en'].flatMap(lang => ['home', 'research', 'teaching', 'about'].map(page => `<url><loc>${origin}${href(lang, page)}</loc><lastmod>${profile.updated}</lastmod></url>`)).join('')}</urlset>`);
console.log('Built 8 bilingual academic pages, 404 page, robots.txt and sitemap.xml.');
