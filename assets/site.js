// Dark mode toggle (saves preference)
(() => {
  const key = 'fj-theme';
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const pref = localStorage.getItem(key);
  if (pref === 'dark') root.classList.add('theme-dark');

  if (btn) btn.addEventListener('click', () => {
    root.classList.toggle('theme-dark');
    localStorage.setItem(key, root.classList.contains('theme-dark') ? 'dark' : 'light');
  });
})();

// Smooth scroll-reveal (respects reduced motion)
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal--in');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
