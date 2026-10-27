import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, publications, courses, teachingHistory, ui } from '../content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
// GitHub Actions 自动使用个人主页域名；本地生成使用 profile.origin。
const origin = (process.env.SITE_ORIGIN || (process.env.GITHUB_REPOSITORY_OWNER ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io` : profile.origin)).replace(/\/+$/, '');
const assetVersion = 'heading-20261027';
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const href = (lang, page = 'home') => `${lang === 'zh' ? '/zh' : ''}/${page === 'home' ? '' : `${page}/`}`;
const link = (url, label, extra = '') => `<a href="${esc(url)}"${extra}>${esc(label)}</a>`;
const sortedPapers = entries => [...entries].sort((a, b) => b.year - a.year || (b.publishedDate || '').localeCompare(a.publishedDate || '') || (b.arxiv || '').localeCompare(a.arxiv || ''));
const publishedPapers = sortedPapers(publications.filter(paper => paper.status === 'published'));
const preprintPapers = sortedPapers(publications.filter(paper => paper.status === 'preprint'));

function publicationSummary(lang) {
  return lang === 'zh'
    ? `${publishedPapers.length} 篇已发表论文${preprintPapers.length ? ` · ${preprintPapers.length} 篇预印本` : ''}`
    : `${publishedPapers.length} published papers${preprintPapers.length ? ` · ${preprintPapers.length} preprints` : ''}`;
}

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

function footer(lang, page) {
  const u = ui[lang];
  const stats = page === '404' ? '' : ` · <span class="site-statistics" data-statistics-host="${esc(new URL(origin).hostname)}" data-statistics-src="https://www.stats4u.net/c/3772303648-2000.png?plang=${lang}"><span class="daily-views-label">${lang === 'zh' ? '日访问量' : 'Daily visits'}</span> <span class="daily-views-count" data-daily-views aria-live="polite" title="${lang === 'zh' ? '暂时无法获取今日浏览量' : 'Today’s page views are unavailable'}">—</span></span>`;
  const privacy = page === '404' ? '' : ` · ${link(`https://www.stats4u.net/${lang === 'zh' ? 'zh' : 'en'}/privacy`, lang === 'zh' ? '统计隐私说明' : 'Statistics privacy', ' target="_blank" rel="noopener noreferrer"')}`;
  return `<footer class="site-footer"><span>${esc(u.footerNote)} ${esc(profile.updated.replaceAll('-', '.'))}</span>${stats} · ${link('#top', u.top)}${privacy}</footer>`;
}

function layout(lang, page, body) {
  const u = ui[lang];
  const title = page === 'home' ? u.title : `${u.nav[page] || u.noPage} · ${lang === 'zh' ? profile.nameZh : profile.nameEn}`;
  const canonical = `${origin}${href(lang, page)}`;
  return `<!doctype html>
<html lang="${u.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#080f26"><title>${esc(title)}</title><meta name="description" content="${esc(u.description)}"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/style.css?v=${assetVersion}"><script src="/assets/site.js?v=${assetVersion}" defer></script>${page === '404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(canonical)}"><link rel="alternate" hreflang="zh-CN" href="${origin}${href('zh', page)}"><link rel="alternate" hreflang="en" href="${origin}${href('en', page)}">`}<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(u.description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:locale" content="${lang === 'zh' ? 'zh_CN' : 'en_US'}"></head><body class="page-${page}">
${header(lang, page)}<main id="main" class="site-main" tabindex="-1">${body}</main>${footer(lang, page)}</body></html>`;
}

function contact(lang) {
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  const address = profile[`address${suffix}`] || profile[`affiliation${suffix}`];
  return `<ul class="contact-list"><li>${esc(address)}</li>${profile.email ? `<li>Email: ${link(`mailto:${profile.email}`, profile.email)}</li>` : ''}</ul>`;
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
<section><h2>${esc(u.recentPapers)}</h2>${papers(publishedPapers.slice(0, 3), { lang, start: publishedPapers.length })}</section>
<section><h2>${esc(u.homeContact)}</h2>${contact(lang)}</section>`;
}

function papers(entries, { lang = 'en', start = entries.length } = {}) {
  return `<ol class="publication-list" reversed start="${start}">${entries.map(paper => {
    const title = paper.url ? link(paper.url, paper.title, ' class="paper-title" target="_blank" rel="noopener noreferrer"') : `<span class="paper-title">${esc(paper.title)}</span>`;
    const volume = paper.volume ? ` ${esc(paper.volume)}${paper.issue ? `(${esc(paper.issue)})` : ''}` : '';
    const details = [paper.articleNumber ? `${lang === 'zh' ? '文章编号' : 'Article'} ${esc(paper.articleNumber)}` : '', paper.pages ? esc(paper.pages) : ''].filter(Boolean).join(', ');
    const venue = paper.status === 'preprint'
      ? `<em class="paper-venue">${paper.arxiv ? `arXiv:${esc(paper.arxiv)}` : esc(lang === 'zh' ? '预印本' : 'Preprint')}</em>`
      : `<em class="paper-venue">${esc(paper.journal || paper.venue || '')}</em>${volume} (${esc(paper.year)})${details ? `, ${details}` : ''}`;
    return `<li><span class="paper-authors">${esc(paper.authors)}.</span> ${title}. ${venue}.${paper.pdf ? ` ${link(paper.pdf, 'PDF', ' class="paper-links" target="_blank" rel="noopener noreferrer"')}` : ''}</li>`;
  }).join('\n')}</ol>`;
}

function research(lang) {
  const u = ui[lang];
  return `<h1>${esc(u.researchHeading)}</h1><p>${esc(u.researchIntro)}</p>
<p class="publication-summary">${esc(publicationSummary(lang))}</p>
<nav class="research-nav" aria-label="${esc(u.onThisPage)}">${[link('#publications', u.publishedPapers), ...(preprintPapers.length ? [link('#preprints', u.preprints)] : [])].join(' · ')}</nav>
<section id="publications"><h2>${esc(u.publishedPapers)}</h2>${u.papersIntro ? `<p>${esc(u.papersIntro)}</p>` : ''}${publishedPapers.length ? papers(publishedPapers, { lang }) : `<p>${esc(u.papersEmpty)}</p>`}</section>
${preprintPapers.length ? `<section id="preprints"><h2>${esc(u.preprints)}</h2>${papers(preprintPapers, { lang })}</section>` : ''}`;
}

function courseResources(course, lang) {
  if (!course.resources.length) return `<p>${esc(ui[lang].resourceEmpty)}</p>`;
  return `<ul class="resource-list">${course.resources.map(resource => `<li>${link(resource.url, resource[lang]?.title || resource.title, ' target="_blank" rel="noopener noreferrer"')}${resource.type ? ` (${esc(resource.type)})` : ''}</li>`).join('')}</ul>`;
}

function teaching(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  return `<h1>${esc(u.teachingHeading)}</h1>
<section id="calculus"><ul class="course-list">${courses.map(course => `<li id="${esc(course.id)}">${esc(course[lang].title)}${course.resources.length ? courseResources(course, lang) : ''}</li>`).join('')}</ul></section>
<section id="teaching-history"><h2>${esc(u.teachingHistory)}</h2><ul class="teaching-history">${teachingHistory.map(course => `<li><span class="period">${esc(course[`term${suffix}`])}</span> ${esc(course[`title${suffix}`])}${course.classesZh ? ` <details class="teaching-classes"><summary>${esc(u.classesLabel)}</summary><p lang="zh-CN">${esc(course.classesZh)}</p></details>` : ''}</li>`).join('')}</ul></section>`;
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
