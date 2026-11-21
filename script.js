(() => {
  const body = document.body;
  const intro = document.getElementById('intro');
  const stage = intro.querySelector('.intro-stage');
  const video = document.getElementById('introVideo');
  const progress = document.getElementById('progress');
  const layers = [...document.querySelectorAll('.bg-layer')];
  const sections = [...document.querySelectorAll('main > section[data-era]')];
  const navLinks = [...document.querySelectorAll('#timeline a')];
  const hudDivision = document.getElementById('hudDivision');
  const hudYears = document.getElementById('hudYears');

  // ---------- Intro video -> Peugeot Sport splash ----------
  video.addEventListener('ended', () => body.classList.add('video-ended'));
  video.play().catch(() => {
    // If autoplay is blocked, reveal the splash cleanly
    body.classList.add('video-ended');
  });

  document.getElementById('soundToggle').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    video.muted = !video.muted;
    if (!video.muted) video.play().catch(() => {});
    btn.classList.toggle('is-unmuted', !video.muted);
    btn.setAttribute('aria-pressed', String(!video.muted));
    const lbl = btn.querySelector('.chip-label');
    if (lbl) lbl.textContent = video.muted ? 'Sound off' : 'Sound on';
  });

  document.getElementById('replayIntro').addEventListener('click', () => {
    body.classList.remove('video-ended');
    video.currentTime = 0;
    video.play().catch(() => {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('skipIntro').addEventListener('click', () => {
    document.getElementById('nine-x-eight').scrollIntoView({ behavior: 'smooth' });
  });

  // ---------- Era switching + live HUD update ----------
  let currentEra = null;
  function setEra(section) {
    const era = section.dataset.era;
    if (era === currentEra) return;
    currentEra = era;
    layers.forEach(l => l.classList.toggle('active', l.dataset.era === era));
    body.dataset.theme = era;
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === era));
    if (hudDivision && section.dataset.division) hudDivision.textContent = section.dataset.division;
    if (hudYears && section.dataset.years) hudYears.textContent = section.dataset.years;
  }
  setEra(sections[0]);

  // ---------- Reveal on scroll + side-burst cutout cars ----------
  const burstCars = [...document.querySelectorAll('.car-burst')];
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal, .car-burst').forEach(el => revealObs.observe(el));

  // ---------- Smooth scroll transform loop ----------
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const docH = Math.max(1, document.documentElement.scrollHeight - vh);
    progress.style.width = (y / docH * 100) + '%';

    // Intro: video dissolves into Peugeot Sport splash across sticky stage
    const introSpan = Math.max(1, intro.offsetHeight - vh);
    const p = Math.min(1, Math.max(0, y / introSpan));
    stage.style.setProperty('--p', p.toFixed(3));
    stage.style.setProperty('--s', Math.min(1, Math.max(0, (p - 0.22) / 0.45)).toFixed(3));
    body.classList.toggle('past-intro', y > introSpan * 0.88);

    // Active era = section whose box contains viewport midpoint
    const mid = y + vh * 0.48;
    for (const s of sections) {
      const top = s.offsetTop;
      const bottom = top + s.offsetHeight;
      if (mid >= top && mid < bottom) {
        setEra(s);
        const local = (mid - top) / Math.max(1, s.offsetHeight) - 0.5;
        const layer = layers.find(l => l.dataset.era === s.dataset.era);
        if (layer) {
          layer.style.setProperty('--par', (local * -160).toFixed(1) + 'px');
          layer.style.setProperty('--par-x', (local * -240).toFixed(1) + 'px');
        }
        break;
      }
    }
    // Live scroll-linked horizontal surge for visible cutout cars
    for (const car of burstCars) {
      if (!car.classList.contains('in')) continue;
      const rect = car.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > vh + 120) continue;
      const norm = ((rect.top + rect.height * 0.5) / vh - 0.5); // -0.5 (top) to +0.5 (bottom)
      const dir = car.dataset.burst === 'left' ? -1 : 1;
      // Car surges inward subtly as you scroll without overlapping adjacent info cards
      const driftX = (norm * dir * 20).toFixed(1) + 'px';
      const driftY = (norm * -10).toFixed(1) + 'px';
      const driftRot = (norm * dir * 1.1).toFixed(2) + 'deg';
      car.style.setProperty('--drift-x', driftX);
      car.style.setProperty('--drift-y', driftY);
      car.style.setProperty('--drift-rot', driftRot);
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
