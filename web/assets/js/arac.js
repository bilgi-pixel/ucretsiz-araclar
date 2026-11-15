// Form tabanlı araçların ortak arayüzü: alanları okur, compute() çağırır, sonucu yazar.
// Her şey tarayıcıda; ağ isteği yok.
import { showError } from './ba.js';
import { h } from './arac-yardimci.js';

const $ = (id) => document.getElementById(id);

export function mount(compute) {
  const form = $('form'), result = $('result'), rows = $('rows'), out = $('out'), outWrap = $('out-wrap'), note = $('note'), status = $('copy-status');
  const fields = Array.from(form.querySelectorAll('[data-field]'));

  function hide() { result.hidden = true; result.classList.remove('is-active'); }

  async function run() {
    showError($('error'), '');
    try {
      const v = {};
      for (const f of fields) v[f.dataset.field] = f.value;
      const r = await compute(v, h);
      rows.textContent = '';
      (r.rows || []).forEach(([k, val], i) => {
        const row = document.createElement('div');
        row.className = 'ar-row' + (i === 0 ? ' is-strong' : '');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = String(val);
        row.append(dt, dd); rows.append(row);
      });
      rows.hidden = !(r.rows && r.rows.length);
      const hasText = typeof r.text === 'string';
      outWrap.hidden = !hasText;
      out.value = hasText ? r.text : '';
      if (hasText) out.rows = Math.max(4, Math.min(16, r.text.split('\n').length + 1));
      note.textContent = r.note || '';
      note.hidden = !r.note;
      status.textContent = '';
      result.hidden = false; result.classList.add('is-active');
    } catch (e) {
      hide();
      showError($('error'), e && e.message ? e.message : 'Hesaplanamadı; girdileri kontrol edin.');
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    form.reset(); hide(); showError($('error'), '');
    if (fields[0]) fields[0].focus();
  });
  $('copy').addEventListener('click', async () => {
    const text = !outWrap.hidden ? out.value
      : Array.from(rows.querySelectorAll('.ar-row')).map((r) => `${r.children[0].textContent}: ${r.children[1].textContent}`).join('\n');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}
