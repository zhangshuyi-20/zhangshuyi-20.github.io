// Navigation and course disclosure work without JavaScript.
// Preserve the current section when changing between Chinese and English.
document.querySelectorAll('[data-language-switch]').forEach(link => {
  link.addEventListener('click', () => {
    const target = new URL(link.href);
    target.hash = window.location.hash;
    link.href = target.href;
  });
});

// Count published pages only; local previews must not change the shared figures.
const statistics = document.querySelector('[data-statistics-host]');
if (statistics && location.hostname === statistics.dataset.statisticsHost) {
  const counter = new Image();
  counter.src = statistics.dataset.statisticsSrc;
}

// The public counter does not allow cross-origin JSON reads. GitHub Actions
// publishes a small snapshot alongside the website about every 30 minutes.
if (statistics) {
  const display = statistics.querySelector('[data-daily-views]');
  const isChinese = document.documentElement.lang.startsWith('zh');
  const timeZone = 'Europe/Warsaw';
  const dateInZone = date => new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(date);

  (async () => {
    try {
      const response = await fetch('/assets/daily-views.json', {
        cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error('Daily view snapshot is unavailable');
      const snapshot = await response.json();
      const timestamp = new Date(snapshot.timestamp);
      if (!Number.isSafeInteger(snapshot.count) || snapshot.count < 0 ||
          snapshot.timeZone !== timeZone || !Number.isFinite(timestamp.getTime()) ||
          snapshot.date !== dateInZone(timestamp) || snapshot.date !== dateInZone(new Date())) {
        throw new Error('Daily view snapshot is invalid or from a previous day');
      }
      display.textContent = String(snapshot.count).padStart(6, '0');
      const updated = new Intl.DateTimeFormat(isChinese ? 'zh-CN' : 'en-GB', {
        timeZone, dateStyle: 'medium', timeStyle: 'short',
      }).format(timestamp);
      display.title = isChinese
        ? `今日页面浏览量 · 更新于 ${updated} (${timeZone})`
        : `Today’s page views · Updated ${updated} (${timeZone})`;
    } catch {
      display.textContent = '—';
      display.title = isChinese ? '暂时无法获取今日浏览量' : 'Today’s page views are unavailable';
    }
  })();
}
