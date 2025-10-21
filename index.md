<link rel="stylesheet" href="/assets/style.css">

<p align="center"><img src="/assets/headshot.jpg" alt="Filip Janev headshot" class="headshot"></p>

# Filip Janev
**Creative Editor & Junior Media Buyer** — I create, polish, and launch content that performs. And everything in between.


<div class="btns">
  <a class="btn" href="mailto:fjanev996@gmail.com">Email</a>
  <a class="btn" href="https://www.upwork.com/freelancers/~016c8e482f2485cc4b" target="_blank">Upwork</a>
  <a class="btn" href="https://www.linkedin.com/in/filip-janev-458402169/" target="_blank">LinkedIn</a>
</div>

---

## Services
- **Video Editing & Motion Graphics** (Premiere Pro, After Effects)
- **Color & Sound Correction** (grading, cleanup, balancing)
- **Media Buying & Ads Setup** (Meta Ads Manager — campaigns, ad-set uploads, optimizations)
- **Design Basics** (thumbnails, social visuals)
- **Tech Support/Data Analyst** (WordPress, SEO, content editing, Animoto)

---

## 🎬 Video Projects

<div class="grid">

<!-- your video cards -->
<!-- omitted for brevity, unchanged -->
</div>

---

## 🎨 Design & Logos
<div class="grid">

  <!-- Mars -->
  <div class="card">
    <a href="#lb-mars"><img src="/assets/mars-with-caption.jpg" alt="Mars Composite"></a>
    <h3>Mars Composite — With Caption</h3>
    <p class="meta">Photo manipulation & sky replacement.</p>
  </div>

  <!-- Summer Sale -->
  <div class="card">
    <a href="#lb-sale"><img src="/assets/summer-sale.jpg" alt="Summer Sale static banner"></a>
    <h3>“Summer Sale” Static Banner</h3>
    <p class="meta">Bold color, layered textures, CTA variants.</p>
  </div>

  <!-- Pod Pro -->
  <div class="card">
    <a href="#lb-pod" class="logo-tile">
      <img class="logo logo-zoom" src="/assets/thepodpro.png" alt="The Pod Pro logo">
    </a>
    <h3>The Pod Pro — Logo</h3>
    <p class="meta">Podcast identity; layered glow & depth.</p>
  </div>

  <!-- AE - YouTube Thumbnail -->
  <div class="card">
    <a href="#lb-thumbnail">
      <img src="/assets/Filip-AE-thumbnail.jpg" alt="AE-YouTube Thumbnail">
    </a>
    <h3>AE - YouTube Thumbnail</h3>
    <p class="meta">A cinematic YouTube thumbnail created in Adobe Photoshop, designed to capture the humor and exhaustion of learning SOMETHING.</p>
  </div>

</div>

<!-- Lightboxes -->
<div id="lb-mars" class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lightbox-close" type="button" aria-label="Close">×</button>
  <img src="/assets/mars-with-caption.jpg" alt="Mars Composite Full">
</div>

<div id="lb-sale" class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lightbox-close" type="button" aria-label="Close">×</button>
  <img src="/assets/summer-sale.jpg" alt="Summer Sale Full">
</div>

<div id="lb-pod" class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lightbox-close" type="button" aria-label="Close">×</button>
  <img src="/assets/thepodpro.png" alt="The Pod Pro Full">
</div>

<div id="lb-thumbnail" class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lightbox-close" type="button" aria-label="Close">×</button>
  <img src="/assets/Filip-AE-thumbnail.jpg" alt="AE-YouTube Thumbnail">
</div>

---

## 📄 CV & Background
<img src="/assets/cv-sneak.jpg" alt="CV preview" style="max-width:100%; border:1px solid #e1e4eb; border-radius:8px;">
<p><a class="btn" href="/assets/FJ-CV.pdf" target="_blank">Download Full CV</a></p>

---

## 📊 Upwork History
<img src="/assets/upwork-history.jpg" alt="Upwork history screenshot" style="max-width:100%; border:1px solid #e1e4eb; border-radius:8px;">
<p><a class="btn" href="https://www.upwork.com/freelancers/~016c8e482f2485cc4b" target="_blank">View Full Upwork Profile</a></p>

---

## Tools
Premiere Pro · After Effects · Photoshop · Illustrator · Audition · Excel/Sheets · Animoto · WordPress ·
Meta Business Suite · Canva · Various SEO tools`

<!-- ✅ FINAL FIXED SCRIPT -->
<script>
(function () {
  const LB_SELECTOR = '.lightbox';
  const CLOSE_SELECTOR = '.lightbox-close';

  function isLightboxHash() {
    return location.hash && location.hash.startsWith('#lb-');
  }

  function lockScroll() {
    document.documentElement.style.overflow = 'hidden';
  }
  function unlockScroll() {
    document.documentElement.style.overflow = '';
  }

  function clearHashWithoutJump() {
    history.replaceState(null, document.title, window.location.pathname + window.location.search);
    unlockScroll();
  }

  function onOpenFromHash() {
    if (!isLightboxHash()) return;
    lockScroll();
    const btn = document.querySelector(location.hash + ' ' + CLOSE_SELECTOR);
    if (btn) btn.focus({ preventScroll: true });
  }

  document.querySelectorAll(LB_SELECTOR).forEach(function (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) {
        e.preventDefault();
        clearHashWithoutJump();
      }
    });

    const img = lb.querySelector('img');
    if (img) img.addEventListener('click', function (e) { e.stopPropagation(); });

    const btn = lb.querySelector(CLOSE_SELECTOR);
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearHashWithoutJump();
      });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isLightboxHash()) {
      clearHashWithoutJump();
    }
  });

  window.addEventListener('hashchange', function () {
    if (isLightboxHash()) onOpenFromHash();
    else unlockScroll();
  });

  onOpenFromHash();
})();
</script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VGK76DBC8H"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VGK76DBC8H');
</script>
