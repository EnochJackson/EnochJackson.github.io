/* ─────────────────────────────────────────────
   Portfolio Script v2 — Enoch Jackson C
───────────────────────────────────────────── */

// ── NAV ACTIVE LINK ──────────────────────────
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// ── HAMBURGER ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
  });
});

// ── FADE UP ON SCROLL ─────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── PROJECT FILTER ────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // set active
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', false); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', true);

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.35s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── SMOOTH TILT on PROJECT CARDS ──────────────
projectCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 5;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -5;
    card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.perspective = '800px';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ── CURSOR GLOW EFFECT ────────────────────────
const orb = document.querySelector('.orb-2');
if (orb) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    orb.style.transition = 'left 1.5s ease, top 1.5s ease';
    orb.style.left = `calc(${x}% - 200px)`;
    orb.style.top = `calc(${y}% - 200px)`;
    orb.style.right = 'auto';
    orb.style.bottom = 'auto';
  }, { passive: true });
}
