(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* sticky nav */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  const toggle = $('#navToggle'), mobile = $('#navMobile');
  if (toggle && mobile) {
    const set = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      mobile.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', mobile).forEach(a => a.addEventListener('click', () => set(false)));
  }

  /* year */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* video autoplay kick (Chrome) */
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('video[autoplay]').forEach(v => {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    v.muted = true;
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play(); else v.addEventListener('loadeddata', play, { once: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && v.paused) play(); });
  });

  /* scroll reveal */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }
})();
