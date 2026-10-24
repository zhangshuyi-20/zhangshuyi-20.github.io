// Navigation and course disclosure work without JavaScript.
// Preserve the current section when changing between Chinese and English.
document.querySelectorAll('[data-language-switch]').forEach(link => {
  link.addEventListener('click', () => {
    const target = new URL(link.href);
    target.hash = window.location.hash;
    link.href = target.href;
  });
});