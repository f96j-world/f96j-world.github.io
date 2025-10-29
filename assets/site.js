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
