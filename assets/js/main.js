/* =========================================================
   个人简历网站 · 交互脚本（原生 JS，无依赖）
   ========================================================= */
(function () {
  'use strict';

  var doc = document.documentElement;
  var header = document.querySelector('.header');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 主题切换（默认深色，记忆偏好） ---------- */
  var KEY = 'resume-theme';
  function applyTheme(t) {
    doc.setAttribute('data-theme', t);
    var btn = document.querySelector('.theme-btn');
    if (btn) {
      btn.setAttribute('aria-label', t === 'dark' ? '切换到浅色模式' : '切换到深色模式');
      btn.setAttribute('title', t === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { saved = null; }
  applyTheme(saved === 'light' ? 'light' : 'dark');

  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* ---------- 2. 移动端菜单 ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn && header) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 3. 滚动时导航样式 ---------- */
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- 4. 滚动入场动画 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var skills = document.querySelectorAll('.skill');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
    skills.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    skills.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. 导航高亮当前分区 ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = '#' + en.target.id;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 6. 返回顶部 ---------- */
  var toTop = document.querySelector('.totop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 7. 页脚年份 ---------- */
  var yr = document.querySelector('.year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
