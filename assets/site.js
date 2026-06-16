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
