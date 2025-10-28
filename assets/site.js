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

// ===== Welcome modal: first-time visitors =====
(() => {
  const KEY = 'fj-welcome-seen-v1';
  const urlForce = new URLSearchParams(location.search).get('welcome'); // ?welcome=1 to force
  const seen = localStorage.getItem(KEY);
  const modal = document.getElementById('welcome-modal');
  if (!modal) return;

  const open = () => {
    document.body.classList.add('no-scroll');
    modal.classList.add('is-open');
    // build a few confetti bits
    const colors = ['#EDBB00','#A50044','#004D98','#7aa3ff','#ff7a7a'];
    const box = modal.querySelector('.confetti');
    if (box && !box.dataset.filled){
      for (let i=0;i<24;i++){
        const p = document.createElement('i');
        p.style.left = Math.random()*100 + '%';
        p.style.background = colors[i % colors.length];
        p.style.animationDelay = (Math.random()*0.6)+'s';
        p.style.transform = `translateY(-20px) rotate(${Math.random()*90}deg)`;
        box.appendChild(p);
      }
      box.dataset.filled = '1';
    }
  };

  const close = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    localStorage.setItem(KEY, '1');
    const vid = document.getElementById('welcomeVideo');
    if (vid) { vid.pause(); }
  };

  // open once per browser (unless forced with ?welcome=1)
  if (!seen || urlForce === '1') {
    // tiny delay so it feels intentional, not jarring
    setTimeout(open, 700);
  }

  // wire up buttons & backdrop
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) close();
  });
  document.getElementById('welcomeWatch')?.addEventListener('click', () => {
    const vid = document.getElementById('welcomeVideo');
    if (vid) { vid.currentTime = 0; vid.play(); }
  });

  // Esc key closes
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
})();
