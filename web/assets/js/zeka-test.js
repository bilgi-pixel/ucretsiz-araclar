// Zekâ testi arayüzü: sorular tarayıcıda bir tohumdan üretilir; cevaplar hiçbir yere gönderilmez.
// Adrese ?tohum=123 eklenirse aynı soru seti yeniden üretilir (test ve paylaşım için).
import { testUret } from './zeka-sorular.js';

const $ = (id) => document.getElementById(id);

export function mount(cfg) {
  const kutu = $('zk'), ekran = { bas: $('zk-bas'), soru: $('zk-soru'), son: $('zk-son') };
  let sorular = [], cevap = [], sira = 0, bitis = 0, sayac = 0, tohum = 0;

  const goster = (ad) => { for (const [k, el] of Object.entries(ekran)) el.hidden = k !== ad; kutu.dataset.ekran = ad; };
  const sureYaz = (sn) => `${String(Math.floor(sn / 60)).padStart(2, '0')}:${String(sn % 60).padStart(2, '0')}`;

  function basla(yeniTohum) {
    const p = new URLSearchParams(location.search).get('tohum');
    tohum = yeniTohum ?? (p && /^\d{1,9}$/.test(p) ? Number(p) : Math.floor(Math.random() * 1e9) + 1);
    sorular = testUret(cfg.karisim, tohum); cevap = new Array(sorular.length).fill(-1); sira = 0;
    bitis = Date.now() + cfg.sure * 60000;
    clearInterval(sayac); sayac = setInterval(tik, 500); tik();
    goster('soru'); ciz();
  }
  function tik() {
    const kalan = Math.max(0, Math.round((bitis - Date.now()) / 1000));
    $('zk-sure').textContent = sureYaz(kalan);
    $('zk-sure').classList.toggle('is-az', kalan <= 60);
    if (kalan <= 0) bitir();
  }
  function ciz() {
    const q = sorular[sira];
    $('zk-sira').textContent = `Soru ${sira + 1} / ${sorular.length}`;
    $('zk-tur').textContent = q.tur;
    $('zk-bar').style.width = `${(sira / sorular.length) * 100}%`;
    $('zk-metin').innerHTML = q.soru;
    const sik = $('zk-siklar'); sik.textContent = '';
    sik.classList.toggle('is-gorsel', /<svg/.test(q.secenekler[0]));
    q.secenekler.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'zk-sik' + (cevap[sira] === i ? ' is-secili' : ''); b.dataset.i = String(i);
      b.setAttribute('aria-pressed', String(cevap[sira] === i));
      b.innerHTML = `<span class="zk-no" aria-hidden="true">${i + 1}</span><span class="zk-ic">${s}</span>`;
      b.addEventListener('click', () => { cevap[sira] = i; ciz(); });
      sik.append(b);
    });
    $('zk-geri').disabled = sira === 0;
    $('zk-ileri').textContent = sira === sorular.length - 1 ? 'Testi bitir' : (cevap[sira] === -1 ? 'Boş geç' : 'Sonraki soru');
    $('zk-metin').focus({ preventScroll: true });
  }
  function bitir() {
    clearInterval(sayac);
    const dogru = sorular.filter((q, i) => cevap[i] === q.dogru).length, bos = cevap.filter((c) => c === -1).length, n = sorular.length;
    const yuzde = Math.round((dogru / n) * 100);
    const duzey = yuzde >= 90 ? 'Çok yüksek' : yuzde >= 75 ? 'Yüksek' : yuzde >= 55 ? 'Ortanın üstü' : yuzde >= 35 ? 'Orta' : 'Gelişime açık';
    $('zk-puan').textContent = `${dogru} / ${n}`;
    $('zk-ozet').textContent = `Doğru: ${dogru} · Yanlış: ${n - dogru - bos} · Boş: ${bos} · Başarı: %${yuzde} · Bu testteki düzey: ${duzey}`;
    // Tür bazında döküm
    const tur = new Map(); sorular.forEach((q, i) => { const t = tur.get(q.tur) || [0, 0]; t[1]++; if (cevap[i] === q.dogru) t[0]++; tur.set(q.tur, t); });
    const dl = $('zk-turler'); dl.textContent = '';
    for (const [ad, [d, t]] of tur) { const row = document.createElement('div'); row.className = 'ar-row'; const dt = document.createElement('dt'); dt.textContent = ad; const dd = document.createElement('dd'); dd.textContent = `${d} / ${t}`; row.append(dt, dd); dl.append(row); }
    // Cevap anahtarı ve açıklamalar
    const ol = $('zk-cevaplar'); ol.textContent = '';
    sorular.forEach((q, i) => {
      const li = document.createElement('li'), ok = cevap[i] === q.dogru;
      li.className = ok ? 'is-dogru' : 'is-yanlis';
      li.innerHTML = `<div class="zk-cs">${q.soru}</div><p class="zk-cd"><b>${ok ? 'Doğru' : cevap[i] === -1 ? 'Boş bırakıldı' : 'Yanlış'}.</b> Doğru cevap: <span class="zk-ic">${q.secenekler[q.dogru]}</span>${!ok && cevap[i] !== -1 ? ` · Sizin cevabınız: <span class="zk-ic">${q.secenekler[cevap[i]]}</span>` : ''}</p>`;
      const a = document.createElement('p'); a.className = 'zk-ca'; a.textContent = q.aciklama; li.append(a); ol.append(li);
    });
    $('zk-tohum').textContent = String(tohum);
    goster('son'); $('zk-puan').focus({ preventScroll: true });
    kutu.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  $('zk-basla').addEventListener('click', () => basla());
  $('zk-geri').addEventListener('click', () => { if (sira > 0) { sira--; ciz(); } });
  $('zk-ileri').addEventListener('click', () => { if (sira < sorular.length - 1) { sira++; ciz(); } else bitir(); });
  $('zk-yeni').addEventListener('click', () => basla(Math.floor(Math.random() * 1e9) + 1));
  $('zk-ayni').addEventListener('click', () => basla(tohum));
  document.addEventListener('keydown', (e) => {
    if (kutu.dataset.ekran !== 'soru' || e.ctrlKey || e.metaKey || e.altKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= sorular[sira].secenekler.length) { cevap[sira] = n - 1; ciz(); }
    else if (e.key === 'ArrowRight') $('zk-ileri').click();
    else if (e.key === 'ArrowLeft') $('zk-geri').click();
  });
  goster('bas');
}
