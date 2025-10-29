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
