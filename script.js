/* Adiciona js-loaded imediatamente — ativa o reveal via CSS só quando JS estiver funcionando */
document.documentElement.classList.add('js-loaded');

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Active link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* ── Hamburger ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ── Depoimentos slider ── */
  const slides = document.querySelectorAll('.depoimento-slide');
  let current = 0;
  if (slides.length > 0) {
    const show = i => {
      slides.forEach(s => s.classList.remove('active'));
      slides[i].classList.add('active');
    };
    show(0);
    setInterval(() => {
      current = (current + 1) % slides.length;
      show(current);
    }, 5000);
  }

  /* ── Counter animado ── */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.dataset.counter;
          const suffix = el.dataset.suffix || '';
          let count = 0;
          const step = target / (1800 / 16);
          const tick = () => {
            count = Math.min(count + step, target);
            el.textContent = Math.floor(count) + suffix;
            if (count < target) requestAnimationFrame(tick);
          };
          tick();
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

});
