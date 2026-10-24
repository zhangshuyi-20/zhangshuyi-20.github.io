(() => {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-navigation');
  const closeMenu = () => {
    if (!button || !menu) return;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', button.dataset.openLabel);
    menu.hidden = true;
  };
  if (button && menu) {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? button.dataset.closeLabel : button.dataset.openLabel);
      menu.hidden = !open;
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        button.focus();
      }
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', e => {
      if (e.matches) closeMenu();
    });
  }
  document.querySelectorAll('[data-language-switch]').forEach(link => {
    link.addEventListener('click', () => {
      const target = new URL(link.href);
      target.hash = location.hash;
      link.href = target.href;
    });
  });
})();
