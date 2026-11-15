// CSV'den SQL INSERT Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.csv ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('SQL\'e çevrilecek CSV verisini "CSV verisi" alanına yapıştırın.');
    // Ayraç
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
    // RFC 4180 uyumlu ayrıştırma
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

    const TR = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'C', Ğ: 'G', İ: 'I', Ö: 'O', Ş: 'S', Ü: 'U' };
    const sade = (t, yedek) => {
      let a = String(t).trim().replace(/[çğıöşüÇĞİÖŞÜ]/g, (c) => TR[c]).replace(/[^A-Za-z0-9_]+/g, '_').replace(/^_+|_+$/g, '');
      if (a === '') a = yedek;
      if (/^[0-9]/.test(a)) a = '_' + a;
      return a;
    };
    const adYaz = (t, yedek) => {
      const a = String(t).trim() || yedek;
      if (v.tirnak === 'ters') return '`' + a.replace(/`/g, '``') + '`';
      if (v.tirnak === 'cift') return '"' + a.replace(/"/g, '""') + '"';
      if (v.tirnak === 'koseli') return '[' + a.replace(/\]/g, ']]') + ']';
      return sade(a, yedek);
    };
    const tabloHam = String(v.tablo ?? '').trim();
    if (tabloHam === '') h.err('"Tablo adı" alanını doldurun (örn. musteriler).');
    const tablo = adYaz(tabloHam, 'tablo');

    let basliklar, veri;
    if (v.baslik === 'hayir') { veri = dolu; basliklar = dolu[0].map((_, k) => `sutun${k + 1}`); }
    else { basliklar = dolu[0]; veri = dolu.slice(1); }
    if (!veri.length) h.err('Yalnızca başlık satırı var; INSERT üretmek için en az bir veri satırı gerekir. İlk satır veri ise "İlk satır" seçeneğini değiştirin.');
    const kolon = basliklar.length;
    const adlar = basliklar.map((b, k) => adYaz(b, `sutun${k + 1}`));
    if (new Set(adlar).size !== adlar.length) h.err('Sütun adları birbirinden farklı olmalı; başlık satırında aynı ad birden çok kez geçiyor.');
    const SAYI = /^-?(0|[1-9]\d*)(\.\d+)?$/;
    const deger = (t) => {
      if (t === '') return v.bos === 'metin' ? '\'\'' : 'NULL';
      if (v.tur !== 'metin' && SAYI.test(t)) return t;
      return '\'' + t.replace(/'/g, '\'\'') + '\'';
    };
    const degerler = veri.map((r, k) => {
      if (r.length !== kolon) h.err(`${k + 1}. veri satırında ${r.length} hücre var, oysa ${kolon} sütun bekleniyor. Ayraç seçimini ve tırnak içine alınması gereken hücreleri denetleyin.`);
      return '(' + r.map(deger).join(', ') + ')';
    });
    const bas = `INSERT INTO ${tablo} (${adlar.join(', ')}) VALUES`;
    const text = v.bicim === 'tek'
      ? bas + '\n' + degerler.map((x) => '  ' + x).join(',\n') + ';'
      : degerler.map((x) => `${bas} ${x};`).join('\n');
    return {
      rows: [
        ['Satır sayısı', h.fmt(veri.length, 0)],
        ['Sütun sayısı', h.fmt(kolon, 0)],
        ['Ayraç', d === ',' ? 'virgül' : d === ';' ? 'noktalı virgül' : 'sekme'],
      ],
      text,
      note: 'Sorguları çalıştırmadan önce sütun adlarının ve veri türlerinin tablonuzla uyuştuğunu denetleyin; önce bir test veritabanında deneyin.',
    };
  }
