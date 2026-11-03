// Hub sayfası: arama kutusu ve kategori sekmeleri — tamamen istemci tarafı.
const search = document.getElementById('ba-search');
const cards = Array.from(document.querySelectorAll('.ba-card'));
const tabs = Array.from(document.querySelectorAll('.ba-tabs a'));
const sections = Array.from(document.querySelectorAll('[data-category]'));

function normalize(s) {
  return s.toLocaleLowerCase('tr').replace(/İ/g, 'i');
}

function applyFilter() {
  const q = normalize(search.value.trim());
  const cat = (location.hash || '#tumu').slice(1);
  tabs.forEach((t) => t.classList.toggle('is-active', t.getAttribute('href') === `#${cat}`));
  let shown = 0;
  cards.forEach((c) => {
    const text = normalize(c.textContent);
    const inCat = cat === 'tumu' || c.closest('[data-category]')?.dataset.category === cat;
    const hit = !q || text.includes(q);
    const visible = inCat && hit;
    c.classList.toggle('is-hidden', !visible);
    if (visible) shown++;
  });
  sections.forEach((s) => {
    const any = s.querySelectorAll('.ba-card:not(.is-hidden)').length > 0;
    s.hidden = !any;
  });
  document.getElementById('ba-empty').hidden = shown > 0;
}

search.addEventListener('input', applyFilter);
window.addEventListener('hashchange', applyFilter);
applyFilter();
