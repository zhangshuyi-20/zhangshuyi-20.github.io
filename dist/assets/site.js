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
  const counter = statistics.querySelector('[data-statistics-src]');
  counter.src = counter.dataset.statisticsSrc;
} else if (statistics) {
  statistics.hidden = true;
}
