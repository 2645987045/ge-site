// 全局脚本：导航、滚动状态、显现动画、媒体回退

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  });
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
}

// 滚动时导航栏转为实底（零阴影方案：背景 + 描边）
const updateNav = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 24);
};
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// 滚动显现
const revealEls = document.querySelectorAll('.reveal');
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('in'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -4% 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// 媒体回退：图片加载失败时移除图片，露出底层占位层
document.querySelectorAll('.media-frame img').forEach((img) => {
  img.addEventListener('error', () => img.remove(), { once: true });
});

// 排版海报：真实海报加载成功后隐藏文字版海报层
document.querySelectorAll('.poster').forEach((poster) => {
  const img = poster.querySelector('img[data-poster]');
  if (!img) return;
  img.addEventListener('load', () => poster.classList.add('has-img'), { once: true });
  img.addEventListener('error', () => img.remove(), { once: true });
});

// 英雄区视频：源文件不存在时移除视频层，保留舞台光效
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  const hideVideo = () => heroVideo.remove();
  heroVideo.addEventListener('error', hideVideo, { once: true });
  const heroSource = heroVideo.querySelector('source');
  if (heroSource) {
    heroSource.addEventListener('error', hideVideo, { once: true });
  }
}
