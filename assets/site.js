// ===== Theme Toggle =====
(() => {
  const KEY='fj-theme';
  const root=document.documentElement;
  const btn=document.getElementById('themeToggle');
  const icon=btn?btn.querySelector('.theme-toggle__icon'):null;

  function apply(mode){
    if(mode==='dark'){
      root.classList.add('theme-dark');
      if(icon) icon.textContent='🌙';
      localStorage.setItem(KEY,'dark');
    }else{
      root.classList.remove('theme-dark');
      if(icon) icon.textContent='☀️';
      localStorage.setItem(KEY,'light');
    }
  }

  // initial
  const saved=localStorage.getItem(KEY);
  if(saved==='dark'||saved==='light'){
    apply(saved);
  }else{
    const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(prefersDark?'dark':'light');
  }

  btn&&btn.addEventListener('click',()=>apply(root.classList.contains('theme-dark')?'light':'dark'));
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

// Close lightbox on Esc or backdrop click
(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') location.hash = '';
  });
  document.querySelectorAll('.lightbox').forEach(lb => {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) location.hash = '';
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: 0.2});
  document.querySelectorAll('.tile').forEach(t => obs.observe(t));
});

// Welcome confetti once per day
(function() {
  const k = 'confetti-seen-date';
  const today = new Date().toISOString().slice(0,10);
  if (localStorage.getItem(k) === today) return;

  function burst() {
    if (!window.confetti) return; // library not loaded yet
    const defaults = { origin: { y: 0.6 } };

    confetti({ ...defaults, particleCount: 90, spread: 70, scalar: 0.9 });
    setTimeout(() => confetti({ ...defaults, particleCount: 60, spread: 100, startVelocity: 45 }), 180);
  }

  // fire after page settles a bit
  window.requestAnimationFrame(() => setTimeout(burst, 600));
  localStorage.setItem(k, today);
})();

// Mobile hamburger toggle
(function(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('is-open'));
})();

// Optional: add a small shadow when scrolled
(function(){
  const nav = document.querySelector('.navbar');
  if(!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 4);
  onScroll();
  addEventListener('scroll', onScroll, {passive:true});
})();

// ==== Universal theme toggle (works for any of these selectors) ====
(function () {
  const togglers = document.querySelectorAll('#theme-toggle, [data-theme-toggle], .toggle-theme');
  if (!togglers.length) return;

  const root = document.documentElement;
  const KEY  = 'theme';

  // Use existing preference or default to light
  const saved = localStorage.getItem(KEY);
  setTheme(saved === 'dark' ? 'dark' : 'light');

  // Click handlers for every toggle button/icon you render
  togglers.forEach(btn => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  });

  function setTheme(mode) {
    root.dataset.theme = mode;                  // <html data-theme="dark|light">
    localStorage.setItem(KEY, mode);
    // Optional: swap icon glyphs
    togglers.forEach(btn => btn.textContent = mode === 'dark' ? '☀️' : '🌙');
  }
})();