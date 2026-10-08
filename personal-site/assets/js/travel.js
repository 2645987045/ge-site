// 真实相册保存在 index.html 的 #travel-data；空数组时保留明确标注的占位设计。
(() => {
  const section = document.getElementById('travel');
  if (!section) return;
  const data = document.getElementById('travel-data');
  let albums;
  try { albums = JSON.parse(data.textContent); } catch { return; }
  if (!Array.isArray(albums)) return;
  albums = albums.filter(album => album && Array.isArray(album.photos) && album.photos.some(photo => photo && typeof photo.src === 'string' && photo.src.trim()));
  if (!albums.length) return;
  const list = section.querySelector('.travel-timeline');
  const filters = section.querySelector('.travel-filters');
  const dialog = document.getElementById('travel-lightbox');
  const image = document.getElementById('travel-photo');
  const imageError = document.getElementById('travel-photo-error');
  const previous = document.getElementById('travel-previous');
  const next = document.getElementById('travel-next');
  let activeAlbum;
  let photoIndex = 0;
  let trigger;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function showPhoto() {
    const photo = activeAlbum.photos[photoIndex];
    imageError.hidden = true;
    image.hidden = false;
    image.alt = photo.alt || photo.caption || activeAlbum.title || '旅行照片';
    image.src = photo.src;
    document.getElementById('travel-photo-title').textContent = photo.title || `照片 ${String(photoIndex + 1).padStart(2, '0')}`;
    document.getElementById('travel-photo-meta').textContent = [activeAlbum.location, activeAlbum.date].filter(Boolean).join(' · ');
    document.getElementById('travel-photo-caption').textContent = photo.caption || activeAlbum.note || '';
    document.getElementById('travel-photo-count').textContent = `${photoIndex + 1} / ${activeAlbum.photos.length}`;
    previous.disabled = next.disabled = activeAlbum.photos.length < 2;
  }
  function movePhoto(step) {
    if (!activeAlbum) return;
    photoIndex = (photoIndex + step + activeAlbum.photos.length) % activeAlbum.photos.length;
    showPhoto();
  }
  function openAlbum(album, button, index = 0) {
    activeAlbum = album;
    photoIndex = index;
    trigger = button;
    showPhoto();
    dialog.showModal();
    document.documentElement.classList.add('travel-photo-open');
  }
  function render(category) {
    list.replaceChildren();
    albums.filter(album => category === '全部' || album.category === category).forEach(album => {
      const row = element('li', 'travel-entry');
      row.append(element('span', 'travel-date', album.date || '旅行记忆'));
      const button = element('button', 'travel-thumb');
      button.type = 'button';
      button.setAttribute('aria-label', `查看${album.title || '旅行'}相册，共 ${album.photos.length} 张照片`);
      const thumbnail = element('img');
      thumbnail.src = album.photos[0].thumbnail || album.photos[0].src;
      thumbnail.alt = album.photos[0].alt || album.title || '旅行照片';
      thumbnail.loading = 'lazy';
      thumbnail.decoding = 'async';
      button.append(thumbnail, element('span', '', `${album.photos.length} 张 · 查看相册 ↗`));
      button.addEventListener('click', () => openAlbum(album, button));
      const copy = element('div', 'travel-copy');
      copy.append(element('h3', '', album.title || album.location || '旅行相册'));
      if (album.title && album.location) copy.append(element('p', 'travel-location', [album.category, album.location].filter(Boolean).join(' · ')));
      else if (album.category) copy.append(element('p', 'travel-location', album.category));
      copy.append(element('p', 'travel-note', album.note || ''));
      row.append(button, copy);
      const gallery = element('div', 'travel-album-photos');
      gallery.setAttribute('aria-label', `${album.title || '旅行'}的照片`);
      album.photos.forEach((photo, index) => {
        const figure = element('figure', 'travel-photo-card');
        const photoButton = element('button', 'travel-thumb');
        photoButton.type = 'button';
        photoButton.setAttribute('aria-label', `打开第 ${index + 1} 张照片：${photo.title || photo.alt || '旅行照片'}`);
        const preview = element('img');
        preview.src = photo.thumbnail || photo.src;
        preview.alt = photo.alt || photo.title || '旅行照片';
        preview.loading = 'lazy';
        preview.decoding = 'async';
        photoButton.append(preview);
        photoButton.addEventListener('click', () => openAlbum(album, photoButton, index));
        figure.append(photoButton, element('figcaption', 'travel-photo-label', `${String(index + 1).padStart(2, '0')}${photo.title ? ' · ' + photo.title : ''}`));
        if (photo.caption) figure.append(element('p', 'travel-photo-note', photo.caption));
        gallery.append(figure);
      });
      row.append(gallery);
      list.append(row);
    });
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === category)));
  }
  albums.forEach(album => { album.photos = album.photos.filter(photo => photo && typeof photo.src === 'string' && photo.src.trim()); });
  const categories = [...new Set(albums.map(album => album.category).filter(Boolean))];
  if (categories.length > 1) {
    ['全部', ...categories.filter(category => category !== '全部')].forEach(category => {
      const button = element('button', 'travel-filter', category);
      button.type = 'button';
      button.addEventListener('click', () => render(category));
      filters.append(button);
    });
    filters.hidden = false;
  }
  image.addEventListener('error', () => { image.hidden = true; imageError.hidden = false; });
  dialog.querySelector('.travel-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.documentElement.classList.remove('travel-photo-open'); trigger?.focus(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
  });
  previous.addEventListener('click', () => movePhoto(-1));
  next.addEventListener('click', () => movePhoto(1));
  render('全部');
  document.getElementById('travel-status').textContent = `${albums.length} 段旅程 · ${albums.reduce((count, album) => count + album.photos.length, 0)} 张照片`;
})();
