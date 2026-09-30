// 角色页：角色卡片渲染 + 详情模态框

import characters from '../data/characters.json';

const grid = document.getElementById('characterGrid');
const modal = document.getElementById('characterModal');
const modalClose = document.getElementById('modalClose');
const modalImageWrap = document.getElementById('modalImageWrap');
const modalGlyph = document.getElementById('modalGlyph');
const modalName = document.getElementById('modalName');
const modalActor = document.getElementById('modalActor');
const modalBrief = document.getElementById('modalBrief');
const modalHistory = document.getElementById('modalHistory');
const modalQuote = document.getElementById('modalQuote');

const openModal = (character) => {
  modalGlyph.textContent = character.name.charAt(0);

  modalImageWrap.querySelectorAll('img').forEach((el) => el.remove());
  const img = document.createElement('img');
  img.src = character.image;
  img.alt = `${character.name} 定妆照`;
  img.addEventListener('error', () => img.remove(), { once: true });
  modalImageWrap.append(img);

  modalName.textContent = character.name;
  modalActor.textContent = `饰演 · ${character.actor}`;
  modalBrief.textContent = character.brief;
  modalHistory.textContent = character.history;
  modalQuote.textContent = character.quote;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

if (grid) {
  characters.forEach((character) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'char-card';

    const glyphText = character.name.charAt(0);
    card.innerHTML = `
      <div class="media-frame frame-3x4">
        <div class="ph" aria-hidden="true">
          <span class="ph-glyph">${glyphText}</span>
          <span class="ph-label">Character Still</span>
        </div>
        <img src="${character.image}" alt="${character.name} 定妆照">
      </div>
      <div class="char-info">
        <h3 class="char-name">${character.name}</h3>
        <p class="char-actor">饰演 · ${character.actor}</p>
        <p class="char-brief">${character.brief}</p>
        <span class="char-more">查看档案 →</span>
      </div>`;

    card.querySelector('img').addEventListener('error', (event) => event.target.remove(), { once: true });
    card.addEventListener('click', () => openModal(character));
    grid.append(card);
  });
}

if (modal) {
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}
