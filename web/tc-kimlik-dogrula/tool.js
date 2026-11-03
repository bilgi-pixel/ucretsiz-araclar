// TC Kimlik No algoritma kontrolü — tamamı tarayıcıda çalışır; numara hiçbir yere gönderilmez.
// Yalnızca yazım hatasını yakalayan matematiksel kontrol yapar. MERNİS/NVİ sorgusu DEĞİLDİR, üretici YOKTUR.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Girdiyi temizler: boşluk ve tire atılır. */
export function normalizeTckn(raw) {
  return String(raw ?? '').replace(/[\s\-]/g, '');
}

/**
 * Algoritma kontrolü. Dönüş: { digits, ok, checks: [{ label, pass }] }.
 * Yapısal sorunlarda (rakam dışı karakter, 11 haneden farklı uzunluk) Error fırlatır.
 */
export function analyzeTckn(raw) {
  const s = normalizeTckn(raw);
  if (!s) return null;
  if (/\D/.test(s)) {
    throw new Error('TC kimlik numarası yalnızca rakamlardan oluşur. Harf, nokta ya da başka işaretleri silip yeniden deneyin (boşluk sorun değildir).');
  }
  if (s.length !== 11) {
    const diff = s.length - 11;
    throw new Error(`TC kimlik numarası tam 11 hane olmalı; girdiğiniz ${s.length} hane (${diff > 0 ? `${diff} fazla` : `${-diff} eksik`}). Kimlik kartının ön yüzündeki numarayı kontrol edin.`);
  }
  const d = s.split('').map(Number);
  const oddSum = d[0] + d[2] + d[4] + d[6] + d[8];     // 1, 3, 5, 7, 9. haneler
  const evenSum = d[1] + d[3] + d[5] + d[7];           // 2, 4, 6, 8. haneler
  const first10 = d.slice(0, 10).reduce((a, b) => a + b, 0);
  const checks = [
    { label: 'İlk hane 0 değil', pass: d[0] !== 0 },
    { label: '10. hane kuralı: (tek sıralı hanelerin toplamı × 7 − çift sıralı hanelerin toplamı) mod 10', pass: ((oddSum * 7 - evenSum) % 10 + 10) % 10 === d[9] },
    { label: '11. hane kuralı: ilk 10 hanenin toplamı mod 10', pass: first10 % 10 === d[10] },
  ];
  return { digits: s, ok: checks.every((c) => c.pass), checks };
}

/* ---------- Arayüz ---------- */
const el = {
  form: $('form-tckn'), input: $('f-tckn'), error: $('error'), result: $('result'),
  status: $('r-status'), checks: $('r-checks'), note: $('r-note'), clear: $('clear'),
};

function render() {
  showError(el.error, '');
  let info;
  try {
    info = analyzeTckn(el.input.value);
  } catch (err) {
    el.result.classList.remove('is-active');
    showError(el.error, err.message);
    return;
  }
  if (!info) { el.result.classList.remove('is-active'); return; }
  el.result.classList.toggle('is-invalid', !info.ok);
  el.status.textContent = info.ok ? 'Algoritmaya uygun' : 'Algoritmaya uygun değil';
  el.checks.innerHTML = info.checks.map((c) => `<li class="${c.pass ? 'is-pass' : 'is-fail'}"><span aria-hidden="true">${c.pass ? '✓' : '✕'}</span> ${c.label}: <strong>${c.pass ? 'geçti' : 'geçmedi'}</strong></li>`).join('');
  el.note.textContent = info.ok
    ? 'Numara matematiksel kurallara uyuyor. Bu, numaranın gerçek, kullanımda ya da belirli bir kişiye ait olduğu anlamına gelmez; yalnızca bariz bir yazım hatası yok demektir. Kimlik doğrulaması için NVİ Kimlik Paylaşım Sistemi ya da e-Devlet kullanılır.'
    : 'En az bir kural tutmuyor: büyük olasılıkla bir hane yanlış yazılmış ya da iki hane yer değiştirmiş. Numarayı kimlik kartından yeniden okuyup düzeltin; araç hangi hanenin yanlış olduğunu bilemez ve doğru numarayı üretmez.';
  el.result.classList.add('is-active');
}

el.input.addEventListener('input', () => {
  // Yalnızca rakam ve boşluk bırak; yapıştırılan "123 456 789 01" gibi biçimleri tolere et.
  render();
});
el.form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
el.clear.addEventListener('click', () => { el.input.value = ''; render(); el.input.focus(); });
