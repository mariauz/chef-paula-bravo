/* ================================================
   CHEF PAULA BRAVO — script.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── Active nav link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Hamburger menu ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  /* ── Depoimentos slider simples ── */
  const slides = document.querySelectorAll('.depoimento-slide');
  let current = 0;
  if (slides.length > 0) {
    const show = (i) => {
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
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.counter;
        const duration = 1800;
        const step = target / (duration / 16);
        let count = 0;
        const tick = () => {
          count = Math.min(count + step, target);
          el.textContent = Math.floor(count) + (el.dataset.suffix || '');
          if (count < target) requestAnimationFrame(tick);
        };
        tick();
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

});
