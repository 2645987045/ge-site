// 幕后页：照片墙渲染 + 灯箱 + 幕后故事渲染

import behind from '../data/behind.json';

const galleryGrid = document.getElementById('galleryGrid');
const storiesList = document.getElementById('storiesList');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');

const openLightbox = (photo) => {
  // 仅当图片真实存在时才打开灯箱，避免展示破损图
  const probe = new Image();
  probe.onload = () => {
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  probe.src = photo.src;
};

const closeLightbox = () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
};

const EDITIONS = [
  { key: 'all', label: '全部' },
  { key: '2026', label: '2026-09-28 · 第三场' },
  { key: '2025', label: '2025 · 前两场' },
];

const renderGallery = (list) => {
  galleryGrid.innerHTML = '';
  list.forEach((photo) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';
    figure.tabIndex = 0;

    const glyphText = photo.caption.charAt(0);
    figure.innerHTML = `
      <div class="media-frame frame-4x3">
        <div class="ph" aria-hidden="true">
          <span class="ph-glyph">${glyphText}</span>
          <span class="ph-label">Photo Coming Soon</span>
        </div>
        <img src="${photo.src}" alt="${photo.caption}">
      </div>
      <figcaption class="gallery-caption">${photo.caption}</figcaption>`;

    figure.querySelector('img').addEventListener('error', (event) => event.target.remove(), { once: true });
    figure.addEventListener('click', () => openLightbox(photo));
    figure.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(photo);
      }
    });
    galleryGrid.append(figure);
  });
};

if (galleryGrid) {
  const tabs = document.createElement('div');
  tabs.className = 'gallery-tabs';
  EDITIONS.forEach((ed, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gal-tab' + (i === 0 ? ' active' : '');
    btn.textContent = ed.label;
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.gal-tab').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(ed.key === 'all' ? behind.photos : behind.photos.filter((p) => (p.edition || '2025') === ed.key));
    });
    tabs.append(btn);
  });
  galleryGrid.parentElement.insertBefore(tabs, galleryGrid);
  renderGallery(behind.photos);
}

if (storiesList) {
  behind.stories.forEach((story) => {
    const article = document.createElement('article');
    article.className = 'story';
    article.innerHTML = `
      <div class="story-meta">
        <span class="story-date">${story.date}</span>
        <span class="story-author">${story.author}</span>
      </div>
      <div class="story-content">
        <h3>${story.title}</h3>
        ${story.content}
      </div>`;
    storiesList.append(article);
  });
}

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}
