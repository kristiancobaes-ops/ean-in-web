document.addEventListener('input', (event) => {
  const search = event.target.closest('[data-construct-search]');
  if (!search) return;
  const term = search.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  document.querySelectorAll('[data-construct-card]').forEach(card => {
    const text = card.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    card.style.display = text.includes(term) ? '' : 'none';
  });
});

document.addEventListener('click', async (event) => {
  const btn = event.target.closest('[data-copy-summary]');
  if (!btn) return;
  const el = document.querySelector(btn.getAttribute('data-copy-summary'));
  if (!el) return;
  await navigator.clipboard.writeText(el.innerText.trim());
  const old = btn.textContent;
  btn.textContent = 'Copiado';
  setTimeout(() => btn.textContent = old, 1200);
});

function closeLightbox() {
  const box = document.querySelector('[data-lightbox-overlay]');
  if (box) box.remove();
  document.body.classList.remove('lightbox-open');
}

function openLightbox(img) {
  const caption = img.closest('figure')?.querySelector('figcaption')?.innerText || img.alt || '';
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('data-lightbox-overlay', '');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Cerrar imagen ampliada">Cerrar</button>
    <figure class="lightbox-figure">
      <img src="${img.currentSrc || img.src}" alt="${img.alt || caption}">
      <figcaption>${caption}</figcaption>
    </figure>`;
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.closest('.lightbox-close')) closeLightbox();
  });
  document.body.appendChild(overlay);
  document.body.classList.add('lightbox-open');
}

document.addEventListener('click', (event) => {
  const img = event.target.closest('.figure-card img');
  if (!img) return;
  openLightbox(img);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
