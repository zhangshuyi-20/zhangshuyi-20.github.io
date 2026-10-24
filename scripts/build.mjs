import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, education, topics, publications, courses, teachingHistory, ui } from '../content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
// GitHub Actions 自动使用个人主页域名；本地生成使用 profile.origin。
const origin = (process.env.SITE_ORIGIN || (process.env.GITHUB_REPOSITORY_OWNER ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io` : profile.origin)).replace(/\/+$/, '');
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const arrow = '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const diagonal = '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const plus = '<svg class="plus-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
const mark = '<svg class="brand-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true"><circle cx="18" cy="18" r="16.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 23C11 23 11 11 18 11S25 23 31 23M6 26c5 0 7-9 12-9s7 9 12 9" stroke="currentColor" stroke-width="1.2"/></svg>';
const href = (lang, page = 'home') => `${lang === 'en' ? '/en' : ''}/${page === 'home' ? '' : `${page}/`}`;
const link = (url, label, kind = '') => `<a class="${kind || 'text-link'}" href="${esc(url)}">${esc(label)}${arrow}</a>`;
const pill = label => `<span class="keyword">${esc(label)}</span>`;

function header(lang, page) {
  const u = ui[lang];
  const alternatePage = page === '404' ? 'home' : page;
  return `<a class="skip-link" href="#main">${u.skip}</a>
  <header class="site-header" id="top"><div class="shell header-inner">
    <a class="brand" href="${href(lang)}" aria-label="${esc(u.title)}">${mark}<span class="brand-name">${esc(profile.nameZh)}<span class="brand-latin">${esc(profile.nameEn.toUpperCase())}</span></span></a>
    <nav class="desktop-nav" aria-label="${lang === 'zh' ? '主导航' : 'Main navigation'}">${Object.entries(u.nav).map(([key, label]) => `<a href="${href(lang, key)}" ${page === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <div class="header-tools"><a class="language-switch" href="${href(lang === 'zh' ? 'en' : 'zh', alternatePage)}" lang="${lang === 'zh' ? 'en' : 'zh-CN'}" data-language-switch aria-label="${lang === 'zh' ? 'Switch to English' : '切换为中文'}">${lang === 'zh' ? '<span class="language-current">中</span><span class="language-separator">/</span>EN' : '中文<span class="language-separator">/</span><span class="language-current">EN</span>'}</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="${u.menu}" data-open-label="${u.menu}" data-close-label="${u.closeMenu}"><span></span><span></span></button></div>
  </div><nav id="mobile-navigation" class="mobile-nav" aria-label="${lang === 'zh' ? '移动导航' : 'Mobile navigation'}" hidden>${Object.entries(u.nav).map(([key, label]) => `<a href="${href(lang, key)}" ${page === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav></header>`;
}

function footer(lang) {
  const u = ui[lang];
  return `<footer class="site-footer"><div class="shell footer-inner"><div><a class="footer-name" href="${href(lang)}">${esc(lang === 'zh' ? profile.nameZh : profile.nameEn)}</a><p>${u.footerTag}</p></div><div class="footer-right"><span>${u.footerNote} ${profile.updated.replaceAll('-', '.')}</span><a href="#top">${u.top}<span aria-hidden="true"> ↑</span></a></div></div></footer>`;
}

function layout(lang, page, body) {
  const u = ui[lang];
  const pageTitle = page === 'home' ? u.title : `${u.nav[page] || u.noPage} · ${lang === 'zh' ? profile.nameZh : profile.nameEn}`;
  return `<!doctype html>
<html lang="${u.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f8f7f3"><title>${esc(pageTitle)}</title><meta name="description" content="${esc(u.description)}"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/style.css"><script src="/assets/site.js" defer></script>${page === "404" ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${origin}${href(lang, page)}"><link rel="alternate" hreflang="zh-CN" href="${origin}${href('zh', page)}"><link rel="alternate" hreflang="en" href="${origin}${href('en', page)}">`}<meta property="og:type" content="website"><meta property="og:title" content="${esc(pageTitle)}"><meta property="og:description" content="${esc(u.description)}"><meta property="og:url" content="${origin}${href(lang, page)}"><meta property="og:locale" content="${lang === 'zh' ? 'zh_CN' : 'en_US'}"></head><body class="page-${page}">${header(lang, page)}<main id="main" tabindex="-1">${body}</main>${footer(lang)}</body></html>`;
}

function home(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  return `<div class="shell"><section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${u.eyebrow}</p><h1 id="hero-title"><span class="name-latin">${esc(profile.nameEn)}<span class="name-dot">.</span></span><span class="name-han">${esc(profile.nameZh)}</span></h1><p class="hero-position">${esc(profile[`position${suffix}`])}</p><p class="hero-affiliation">${esc(profile[`affiliation${suffix}`])}</p><p class="hero-description">${u.heroBody}</p><div class="hero-actions">${link(href(lang, 'research'), u.researchLink, 'button button-primary')}${link(href(lang, 'teaching'), u.teachingLink, 'text-link')}</div><div class="hero-contact"><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a><a href="${esc(profile.officialHomepage)}" target="_blank" rel="noopener noreferrer">${esc(u.officialHomepage)}${diagonal}</a></div></div><figure class="hero-art"><div class="art-coordinates" aria-hidden="true"><span>FIG. 01</span><span>DISPERSION / EVOLUTION</span></div><img class="wave-image" src="/assets/wave-surface.svg" alt="${esc(u.figureAlt)}" width="600" height="430" fetchpriority="high"><figcaption><span class="math-expression" aria-label="i times u t plus u x x plus absolute u squared u equals zero">i∂<sub>t</sub>u + ∂<sub>x</sub><sup>2</sup>u + |u|<sup>2</sup>u = 0</span><span class="figure-description">${u.waveLabel}</span></figcaption></figure></section>
    <section class="home-research section-rule" aria-labelledby="interests-title"><div class="section-heading"><div><p class="eyebrow">RESEARCH INTERESTS</p><h2 id="interests-title">${u.interests}</h2></div>${link(href(lang, 'research'), u.allResearch)}</div><div class="interest-grid">${topics.map(t => `<a class="interest-item" href="${href(lang, 'research')}#${t.id}"><div class="interest-top"><span class="item-number">${t.number}</span>${diagonal}</div><h3>${esc(t[lang].title)}</h3><p class="interest-subtitle">${esc(t[lang].subtitle)}</p><p class="interest-description">${esc(t[lang].description)}</p></a>`).join('')}</div></section>
    <section class="home-publications section-rule" aria-labelledby="recent-papers-title"><div class="section-heading"><div><p class="eyebrow">RECENT PUBLICATIONS</p><h2 id="recent-papers-title">${u.recentPapers}</h2></div>${link(`${href(lang, 'research')}#publications`, u.allPapers)}</div>${papers(lang, publications.slice(0, 2))}</section>
    <section class="home-teaching section-rule" aria-labelledby="teaching-title"><div class="teaching-intro"><p class="eyebrow">TEACHING &amp; LEARNING</p><h2 id="teaching-title">${u.teachingHomeTitle}</h2><p>${u.teachingHomeText}</p>${link(href(lang, 'teaching'), u.browseTeaching)}</div><div class="course-links">${courses.map(c => `<a class="course-link" href="${href(lang, 'teaching')}#${c.id}"><span class="course-mini-number">${c.number}</span><span><span class="course-link-title">${esc(c[lang].title)}</span><span class="course-link-subtitle">${lang === 'zh' ? c.code : esc(c[lang].subtitle)}</span></span>${arrow}</a>`).join('')}</div></section></div>`;
}

function pageHeading(kicker, title, lead, description = '') {
  return `<div class="page-heading"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="page-lead">${lead}</p>${description ? `<p class="page-description">${description}</p>` : ''}</div>`;
}

function papers(lang, entries = publications) {
  const u = ui[lang];
  if (!entries.length) return `<div class="empty-publications"><svg viewBox="0 0 40 48" width="32" height="38" fill="none" aria-hidden="true"><path d="M9 3h17l9 9v32H5V3h4ZM26 3v10h9M12 23h15M12 30h15M12 37h9" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg><div><h3>${u.papersEmpty}</h3><p>${u.papersEmptyDetail}</p></div></div>`;
  return `<ol class="publication-list">${[...entries].sort((a, b) => b.year - a.year).map(p => `<li><span class="publication-year">${esc(p.year)}</span><div><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>` : esc(p.title)}</h3><p>${esc(p.authors)}</p><p>${esc(p.venue || (p.status === 'preprint' ? 'Preprint' : ''))}</p>${p.pdf ? `<a class="resource-link" href="${esc(p.pdf)}" target="_blank" rel="noopener noreferrer">PDF ${diagonal}</a>` : ''}</div></li>`).join('')}</ol>`;
}

function research(lang) {
  const u = ui[lang];
  return `<div class="shell">${pageHeading(u.researchKicker, u.researchHeading, u.researchLead, u.researchIntro)}<div class="page-layout"><aside class="page-aside"><p class="eyebrow">${u.onThisPage}</p><nav aria-label="${u.onThisPage}">${topics.map(t => `<a href="#${t.id}"><span>${t.number}</span>${esc(t[lang].title)}</a>`).join('')}<a href="#publications"><span>04</span>${u.papersLabel}</a></nav><div class="aside-note">NONLINEAR PDEs<br>PROBABILITY<br>CONTROL</div></aside><div class="page-content"><section class="research-topics" aria-label="${u.topicsLabel}">${topics.map(t => `<article class="research-detail" id="${t.id}"><div class="detail-heading"><span class="item-number">${t.number}</span><div><h2>${esc(t[lang].title)}</h2><p class="detail-subtitle">${esc(t[lang].subtitle)}</p></div></div><p class="detail-description">${esc(t[lang].description)}</p><div class="keywords">${t[lang].keywords.map(pill).join('')}</div><p class="research-question">${esc(t[lang].question)}</p></article>`).join('')}</section><section class="publications-section" id="publications"><p class="eyebrow">SELECTED PUBLICATIONS</p><h2>${u.papersLabel}</h2><p class="section-description">${u.papersIntro}</p>${papers(lang)}${link(profile.publicationsUrl, u.officialPapers)}</section></div></div></div>`;
}

function courseResources(course, lang) {
  const u = ui[lang];
  if (!course.resources.length) return `<p class="resource-empty">${u.resourceEmpty}</p>`;
  return `<ul class="resource-list">${course.resources.map(r => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(r[lang]?.title || r.title)}</span><span class="resource-type">${esc(r.type || 'PDF')}${diagonal}</span></a></li>`).join('')}</ul>`;
}

function teaching(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  return `<div class="shell">${pageHeading(u.teachingKicker, u.teachingHeading, u.teachingLead, u.teachingIntro)}<div class="page-layout"><aside class="page-aside"><p class="eyebrow">${u.onThisPage}</p><nav aria-label="${u.onThisPage}">${courses.map(c => `<a href="#${c.id}"><span>${c.number}</span>${esc(c[lang].title)}</a>`).join('')}</nav><div class="aside-note">CONCEPTS<br>METHODS<br>PROOFS</div></aside><div class="page-content">${courses.map(c => `<article class="course-detail" id="${c.id}"><div class="course-detail-header"><div><p class="eyebrow">${c.code}</p><h2>${esc(c[lang].title)}</h2><p class="course-subtitle">${esc(c[lang].subtitle)}</p></div><span class="course-symbol" aria-hidden="true">${c.id === 'calculus' ? '∫' : 'A'}</span></div><p class="detail-description">${esc(c[lang].description)}</p><details class="course-accordion"><summary>${u.courseThemes}${plus}</summary><ol class="theme-list">${c[lang].themes.map(([title, desc], i) => `<li><span class="theme-number">0${i + 1}</span><div><h3>${esc(title)}</h3><p>${esc(desc)}</p></div></li>`).join('')}</ol></details><div class="course-resources"><h3>${u.courseResources}</h3>${courseResources(c, lang)}</div></article>`).join('')}<section class="teaching-history" id="teaching-history"><p class="eyebrow">TEACHING RECORDS</p><h2>${u.teachingHistory}</h2><p class="section-description">${u.teachingHistoryNote}</p><ul class="teaching-history-list">${teachingHistory.map(c => `<li><span class="teaching-term">${esc(c[`term${suffix}`])}</span><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c[`title${suffix}`])}${diagonal}</a></li>`).join('')}</ul></section></div></div></div>`;
}

function about(lang) {
  const u = ui[lang];
  const suffix = lang === 'zh' ? 'Zh' : 'En';
  const email = profile.email ? `<a class="contact-email" href="mailto:${esc(profile.email)}">${esc(profile.email)}${diagonal}</a>` : `<p class="contact-pending">${u.contactPending}</p>`;
  return `<div class="shell">${pageHeading(u.aboutKicker, u.aboutHeading, u.aboutLead)}<div class="about-layout"><div class="about-identity"><div class="monogram" aria-hidden="true"><span>${esc(profile.initials)}</span><svg viewBox="0 0 220 100"><path d="M0 88c40 0 45-72 110-72S180 88 220 88M0 97c40 0 45-50 110-50s70 50 110 50" fill="none" stroke="currentColor" stroke-width=".7"/></svg></div><h2>${esc(lang === 'zh' ? profile.nameZh : profile.nameEn)}</h2><p class="identity-position">${esc(profile[`position${suffix}`])}</p>${profile[`affiliation${suffix}`] ? `<p>${esc(profile[`affiliation${suffix}`])}</p>` : ''}</div><div class="about-copy"><p class="about-introduction">${u.aboutBody}</p><div class="about-keywords"><p class="eyebrow">${u.interestsSmall}</p><div class="keywords">${topics.flatMap(t => t[lang].keywords.slice(0, 2)).map(pill).join('')}</div></div><section class="education-section about-section"><h2>${u.educationTitle}</h2><ul class="education-list">${education.map(e => `<li><span class="education-period">${esc(e.period)}</span><div><h3>${esc(e[lang].title)}</h3><p>${esc(e[lang].detail)}</p></div></li>`).join('')}</ul></section><section class="about-section"><h2>${u.aboutSite}</h2><p>${u.aboutSiteBody}</p><div class="about-links">${link(href(lang, 'research'), u.browseResearch)}${link(href(lang, 'teaching'), u.browseTeaching)}</div></section><section class="about-section"><h2>${u.contact}</h2>${email}${profile.academicLinks.length ? `<ul class="academic-links">${profile.academicLinks.map(a => `<li><a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a[`label${suffix}`])}${diagonal}</a></li>`).join('')}</ul>` : ''}</section></div></div></div>`;
}

for (const lang of ['zh', 'en']) {
  for (const [page, render] of Object.entries({ home, research, teaching, about })) {
    const folder = path.join(dist, href(lang, page));
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'index.html'), layout(lang, page, render(lang)));
  }
}
fs.writeFileSync(path.join(dist, '404.html'), layout('zh', '404', `<div class="shell error-page"><p class="eyebrow">404</p><h1>${ui.zh.noPage}</h1><p>${ui.zh.noPageBody}</p>${link('/', ui.zh.backHome, 'button button-primary')}</div>`));
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['zh', 'en'].flatMap(lang => ['home', 'research', 'teaching', 'about'].map(page => `<url><loc>${origin}${href(lang, page)}</loc><lastmod>${profile.updated}</lastmod></url>`)).join('')}</urlset>`);
console.log('Built 8 bilingual pages, 404 page, robots.txt and sitemap.xml.');
