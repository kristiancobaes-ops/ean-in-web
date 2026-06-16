const search = document.querySelector('[data-construct-search]');
if (search) {
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    document.querySelectorAll('[data-construct-card]').forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

document.querySelectorAll('[data-copy-summary]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.querySelector(button.getAttribute('data-copy-summary'));
    if (!target) return;
    const text = target.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = 'Resumen copiado';
      setTimeout(() => { button.textContent = original; }, 1600);
    } catch (err) {
      button.textContent = 'Selecciona el texto manualmente';
    }
  });
});
