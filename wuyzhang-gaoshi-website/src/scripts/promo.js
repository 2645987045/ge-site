// 宣传片：优先播放真实视频 /videos/promo.mp4；缺失时播放代码生成的动态海报宣传片

const stage = document.getElementById('promoStage');
const note = document.getElementById('promoNote');

const SCENE_MS = 4500;

const SCENES = [
  `
    <p class="reel-kicker">四川大学吴玉章学院 出品</p>
    <p class="reel-sub">一部关于教育家与革命家的舞台正剧</p>
  `,
  `
    <h3 class="reel-title">吴玉章在高师</h3>
    <span class="reel-seal" aria-hidden="true">话剧</span>
  `,
  `
    <p class="reel-quote">人生最有趣味的事情，就是送旧迎新，<br>因为人类最高的欲求，是在时时创造新生活。</p>
    <p class="reel-sub">—— 吴玉章</p>
  `,
  `
    <p class="reel-vertical">成都高等师范学校</p>
    <p class="reel-sub">一九二〇年代 · 激情燃烧的岁月</p>
  `,
  `
    <p class="reel-date">2025.05.16 / 05.18 · 2026.09.28</p>
    <p class="reel-sub">三场公演圆满落幕 · 江安校区 艺术学院教学实验剧场</p>
  `,
];

if (stage) {
  fetch('./videos/promo.mp4', { method: 'HEAD' })
    .then((res) => (res.ok ? mountRealVideo() : mountReel()))
    .catch(() => mountReel());
}

function mountRealVideo() {
  stage.innerHTML = '';
  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.poster = './images/posters/promo-poster.jpg';

  const source = document.createElement('source');
  source.src = './videos/promo.mp4';
  source.type = 'video/mp4';
  video.append(source);

  const fallback = () => mountReel();
  video.addEventListener('error', fallback, { once: true });
  source.addEventListener('error', fallback, { once: true });

  stage.append(video);
  if (note) note.textContent = '《吴玉章在高师》官方宣传片 · 四川大学吴玉章学院出品';
}

function mountReel() {
  stage.innerHTML = `
    <div class="reel" id="promoReel">
      <div class="reel-sweep" aria-hidden="true"></div>
      ${SCENES.map((scene) => `<div class="reel-scene">${scene}</div>`).join('')}
      <div class="reel-grain" aria-hidden="true"></div>
      <div class="reel-bar">
        <button class="reel-toggle" id="reelToggle" aria-label="暂停">❚❚</button>
        <div class="reel-progress" id="reelProgress">
          ${SCENES.map(() => '<span><i></i></span>').join('')}
        </div>
        <span class="reel-time" id="reelTime"></span>
      </div>
    </div>`;

  const reel = stage.querySelector('#promoReel');
  reel.style.setProperty('--scene-ms', `${SCENE_MS}ms`);

  const scenes = [...reel.querySelectorAll('.reel-scene')];
  const bars = [...reel.querySelectorAll('.reel-progress span')];
  const timeEl = reel.querySelector('#reelTime');
  const toggleBtn = reel.querySelector('#reelToggle');

  let index = 0;
  let timer = null;
  let paused = false;

  const pad = (num) => String(num).padStart(2, '0');

  const playBar = (i) => {
    bars.forEach((bar, k) => {
      const fill = bar.querySelector('i');
      fill.style.transition = '';
      fill.style.transform = '';
      bar.classList.toggle('done', k < i);
      bar.classList.remove('playing');
    });
    void bars[i].offsetWidth;
    bars[i].classList.add('playing');
  };

  const activate = (i) => {
    index = i;
    scenes.forEach((scene, k) => scene.classList.toggle('active', k === i));
    playBar(i);
    timeEl.textContent = `${pad(i + 1)} / ${pad(scenes.length)}`;
  };

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => activate((index + 1) % scenes.length), SCENE_MS);
  };

  const pause = () => {
    paused = true;
    clearInterval(timer);
    timer = null;
    const fill = bars[index].querySelector('i');
    const computed = getComputedStyle(fill).transform;
    let scale = 0;
    if (computed && computed !== 'none') {
      const match = computed.match(/matrix\(([-\d.e]+),/);
      if (match) scale = Math.max(0, Math.min(1, parseFloat(match[1])));
    }
    fill.style.transition = 'none';
    fill.style.transform = `scaleX(${scale})`;
    toggleBtn.textContent = '▶';
    toggleBtn.setAttribute('aria-label', '播放');
  };

  const play = () => {
    paused = false;
    const bar = bars[index];
    const fill = bar.querySelector('i');
    fill.style.transition = '';
    fill.style.transform = '';
    bar.classList.remove('playing');
    void bar.offsetWidth;
    bar.classList.add('playing');
    startTimer();
    toggleBtn.textContent = '❚❚';
    toggleBtn.setAttribute('aria-label', '暂停');
  };

  toggleBtn.addEventListener('click', () => (paused ? play() : pause()));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  activate(0);
  if (!reduce) startTimer();
  else pause();

  if (note) {
    note.textContent = '动态海报宣传片 · 将 promo.mp4 放入 public/videos/ 后自动切换为真实视频';
  }
}
