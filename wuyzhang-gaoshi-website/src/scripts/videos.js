// 视频页：特辑视频 + 视频网格渲染

import videos from '../data/videos.json';

const featuredMedia = document.getElementById('featuredMedia');
const featuredTitle = document.getElementById('featuredTitle');
const featuredTag = document.getElementById('featuredTag');
const featuredDesc = document.getElementById('featuredDesc');
const videoGrid = document.getElementById('videoGrid');

const createVideo = (item) => {
  const video = document.createElement('video');
  video.controls = true;
  video.preload = 'none';
  video.playsInline = true;
  if (item.poster) video.poster = item.poster;

  const source = document.createElement('source');
  source.src = item.src;
  source.type = 'video/mp4';
  video.append(source);

  const remove = () => video.remove();
  video.addEventListener('error', remove, { once: true });
  source.addEventListener('error', remove, { once: true });
  return video;
};

if (featuredMedia && videos.length > 0) {
  const featured = videos[0];
  featuredMedia.append(createVideo(featured));
  featuredTitle.textContent = featured.title;
  featuredTag.textContent = `${featured.category} · ${featured.duration}`;
  featuredDesc.textContent = featured.description;
}

if (videoGrid) {
  videos.slice(1).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'video-card';

    const frame = document.createElement('div');
    frame.className = 'media-frame frame-16x9';

    const ph = document.createElement('div');
    ph.className = 'ph';
    ph.setAttribute('aria-hidden', 'true');

    const glyph = document.createElement('span');
    glyph.className = 'ph-glyph';
    glyph.textContent = item.title.charAt(0);

    const label = document.createElement('span');
    label.className = 'ph-label';
    label.textContent = 'Video Coming Soon';

    ph.append(glyph, label);
    frame.append(ph, createVideo(item));

    const meta = document.createElement('div');
    meta.className = 'video-meta';
    meta.innerHTML = `
      <div class="video-meta-top">
        <span class="video-category">${item.category}</span>
        <span class="video-duration">${item.duration}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>`;

    card.append(frame, meta);
    videoGrid.append(card);
  });
}
