// CSV'den HTML Tablo Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.csv ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('Tabloya çevrilecek CSV verisini "CSV verisi" alanına yapıştırın.');
    let d;
    if (v.ayrac === 'virgul') d = ',';
    else if (v.ayrac === 'nv') d = ';';
    else if (v.ayrac === 'sekme') d = '\t';
    else {
      const say = { ',': 0, ';': 0, '\t': 0 };
      let q = false;
      for (const c of s) {
        if (c === '"') q = !q;
        else if (!q && (c === '\n' || c === '\r')) break;
        else if (!q && c in say) say[c]++;
      }
      d = say[';'] > say[','] && say[';'] >= say['\t'] ? ';' : say['\t'] > say[','] ? '\t' : ',';
    }
    const satirlar = [];
    let satir = [], alan = '', q = false, tirnakli = false;
    const bitir = () => { satir.push(tirnakli ? alan : alan.trim()); alan = ''; tirnakli = false; };
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (q) {
        if (c === '"') { if (s[i + 1] === '"') { alan += '"'; i++; } else q = false; }
        else alan += c;
      } else if (c === '"' && alan.trim() === '') { q = true; tirnakli = true; alan = ''; }
      else if (c === d) bitir();
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && s[i + 1] === '\n') i++;
        bitir(); satirlar.push(satir); satir = [];
      } else alan += c;
    }
    if (q) h.err('CSV içinde açılıp kapatılmamış bir çift tırnak var. Tırnak içeren hücrelerde tırnağı iki kez ("") yazın.');
    if (alan !== '' || satir.length) { bitir(); satirlar.push(satir); }
    const dolu = satirlar.filter((r) => !(r.length === 1 && r[0] === ''));
    if (!dolu.length) h.err('CSV verisinde dolu satır bulunamadı.');

    const sinif = String(v.sinif ?? '').trim();
    if (sinif !== '' && !/^[A-Za-z_-][A-Za-z0-9_ -]*$/.test(sinif)) h.err('CSS sınıfı yalnızca harf, rakam, tire ve alt çizgi içerebilir; birden çok sınıfı boşlukla ayırın (örn. tablo tablo-cizgili).');
    const kac = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\r\n|\r|\n/g, '<br>');
    const kolon = Math.max(...dolu.map((r) => r.length));
    const tamamla = (r) => r.concat(Array(kolon - r.length).fill(''));
    const baslikVar = v.baslik !== 'hayir';
    const bas = baslikVar ? tamamla(dolu[0]) : null;
    const veri = (baslikVar ? dolu.slice(1) : dolu).map(tamamla);
    const girintili = v.bicim !== 'tek';
    const L = [];
    const ekle = (d2, t) => L.push(girintili ? '  '.repeat(d2) + t : t);
    ekle(0, sinif ? `<table class="${sinif}">` : '<table>');
    const cap = String(v.aciklama ?? '').trim();
    if (cap) ekle(1, `<caption>${kac(cap)}</caption>`);
    if (bas) {
      ekle(1, '<thead>'); ekle(2, '<tr>');
      for (const b of bas) ekle(3, `<th scope="col">${kac(b)}</th>`);
      ekle(2, '</tr>'); ekle(1, '</thead>');
    }
    if (veri.length) {
      ekle(1, '<tbody>');
      for (const r of veri) {
        ekle(2, '<tr>');
        for (const c of r) ekle(3, `<td>${kac(c)}</td>`);
        ekle(2, '</tr>');
      }
      ekle(1, '</tbody>');
    }
    ekle(0, '</table>');
    const eksik = dolu.some((r) => r.length !== kolon);
    return {
      rows: [
        ['Veri satırı', h.fmt(veri.length, 0)],
        ['Sütun sayısı', h.fmt(kolon, 0)],
        ['Ayraç', d === ',' ? 'virgül' : d === ';' ? 'noktalı virgül' : 'sekme'],
      ],
      text: L.join(girintili ? '\n' : ''),
      note: eksik
        ? 'Bazı satırlarda hücre sayısı eksikti; tablo düzgün görünsün diye bu satırlar boş hücrelerle tamamlandı.'
        : 'Kod yalnızca yapıyı içerir; kenarlık, renk ve boşlukları kendi CSS dosyanızda tanımlayın.',
    };
  }
