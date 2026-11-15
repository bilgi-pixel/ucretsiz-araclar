// JSON XML Dönüştürücü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.girdi ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('Dönüştürülecek JSON ya da XML metnini yapıştırın.');
    const gir = v.girinti === '0' ? 0 : v.girinti === '4' ? 4 : 2;
    let sayac = 0;

    if (v.yon !== 'xj') {
      // ---------- JSON → XML ----------
      let veri;
      try { veri = JSON.parse(s); }
      catch { h.err('Girdi geçerli bir JSON değil. Anahtarların çift tırnak içinde olduğunu ve parantezlerin kapandığını denetleyin; XML yapıştırdıysanız yönü "XML → JSON" yapın.'); }
      const adGecerli = (t) => /^[\p{L}_][\p{L}\p{N}_.\-]*$/u.test(t);
      const kok = String(v.kok ?? '').trim() || 'kok';
      if (!adGecerli(kok)) h.err('Kök öğe adı harf ya da alt çizgiyle başlamalı; boşluk ve özel karakter içermemeli (örn. kok, liste, veri).');
      const ad = (t) => {
        let a = String(t).replace(/[^\p{L}\p{N}_.\-]/gu, '_');
        if (a === '' || !/^[\p{L}_]/u.test(a)) a = '_' + a;
        return a;
      };
      const kac = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const kacOz = (t) => kac(t).replace(/"/g, '&quot;');
      const satirlar = [];
      const yaz = (isim, deger, d) => {
        const pad = ' '.repeat(gir * d);
        if (Array.isArray(deger)) deger = { oge: deger };
        sayac++;
        if (deger === null || deger === undefined) { satirlar.push(`${pad}<${isim}/>`); return; }
        if (typeof deger !== 'object') { satirlar.push(`${pad}<${isim}>${kac(deger)}</${isim}>`); return; }
        let oz = '', metin = null;
        const cocuk = [];
        for (const [k, val] of Object.entries(deger)) {
          if (k === '#text') metin = val === null ? '' : String(val);
          else if (k[0] === '@' && k.length > 1 && (val === null || typeof val !== 'object')) oz += ` ${ad(k.slice(1))}="${kacOz(val === null ? '' : val)}"`;
          else cocuk.push([ad(k[0] === '@' ? k.slice(1) : k), val]);
        }
        if (!cocuk.length) {
          satirlar.push(metin === null || metin === '' ? `${pad}<${isim}${oz}/>` : `${pad}<${isim}${oz}>${kac(metin)}</${isim}>`);
          return;
        }
        satirlar.push(`${pad}<${isim}${oz}>`);
        if (metin !== null && metin !== '') satirlar.push(' '.repeat(gir * (d + 1)) + kac(metin));
        for (const [k, val] of cocuk) {
          if (Array.isArray(val)) for (const x of val) yaz(k, x, d + 1);
          else yaz(k, val, d + 1);
        }
        satirlar.push(`${pad}</${isim}>`);
      };
      yaz(kok, veri, 0);
      satirlar.unshift('<?xml version="1.0" encoding="UTF-8"?>');
      return {
        rows: [['Dönüşüm', 'JSON → XML'], ['Öğe sayısı', h.fmt(sayac, 0)], ['Kök öğe', kok]],
        text: satirlar.join(gir ? '\n' : ''),
        note: 'Diziler aynı adlı öğelerin tekrarı olarak, "@" ile başlayan anahtarlar öznitelik olarak, null değerler boş öğe olarak yazıldı.',
      };
    }

    // ---------- XML → JSON ----------
    let i = 0;
    const n = s.length;
    const yer = () => `${s.slice(0, i).split('\n').length}. satır`;
    const coz = (t) => t.replace(/&(#x[0-9a-fA-F]+|#\d+|lt|gt|amp|quot|apos);/g, (m, e) => {
      if (e === 'lt') return '<';
      if (e === 'gt') return '>';
      if (e === 'amp') return '&';
      if (e === 'quot') return '"';
      if (e === 'apos') return '\'';
      const kod = e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return kod > 0 && kod <= 0x10ffff ? String.fromCodePoint(kod) : m;
    });
    const atla = () => {
      for (;;) {
        while (i < n && /\s/.test(s[i])) i++;
        let son;
        if (s.startsWith('<?', i)) son = s.indexOf('?>', i), son = son < 0 ? -1 : son + 2;
        else if (s.startsWith('<!--', i)) son = s.indexOf('-->', i), son = son < 0 ? -1 : son + 3;
        else if (s.startsWith('<!DOCTYPE', i)) son = s.indexOf('>', i), son = son < 0 ? -1 : son + 1;
        else return;
        if (son < 0) h.err(`XML hatası (${yer()}): açılan bildirim ya da yorum kapatılmamış.`);
        i = son;
      }
    };
    const AD = /[^\s<>\/=!?"'&]+/y;
    const OZ = /\s+([^\s<>\/=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/y;
    const BIT = /\s*(\/?)>/y;
    const KAPA = /<\/([^\s<>]+)\s*>/y;
    const oge = () => {
      i++; // '<'
      AD.lastIndex = i;
      const m = AD.exec(s);
      if (!m) h.err(`XML hatası (${yer()}): "<" işaretinden sonra geçerli bir öğe adı yok. Metin içindeki "<" işaretini &lt; olarak yazın.`);
      const dugum = { ad: m[0], oz: [], cocuk: [], metin: '' };
      i = AD.lastIndex;
      sayac++;
      for (;;) {
        OZ.lastIndex = i;
        const a = OZ.exec(s);
        if (!a) break;
        dugum.oz.push([a[1], coz(a[2] ?? a[3])]);
        i = OZ.lastIndex;
      }
      BIT.lastIndex = i;
      const b = BIT.exec(s);
      if (!b) h.err(`XML hatası (${yer()}): <${dugum.ad}> etiketi düzgün kapatılmamış ya da özniteliği tırnak içinde değil.`);
      i = BIT.lastIndex;
      if (b[1] === '/') return dugum;
      for (;;) {
        if (i >= n) h.err(`XML hatası: <${dugum.ad}> öğesi kapatılmamış; </${dugum.ad}> bekleniyor.`);
        if (s.startsWith('</', i)) {
          KAPA.lastIndex = i;
          const k = KAPA.exec(s);
          if (!k || k[1] !== dugum.ad) h.err(`XML hatası (${yer()}): <${dugum.ad}> öğesi için </${dugum.ad}> bekleniyordu, başka bir kapanış etiketi geldi.`);
          i = KAPA.lastIndex;
          return dugum;
        }
        if (s.startsWith('<!--', i)) { const e = s.indexOf('-->', i); if (e < 0) h.err(`XML hatası (${yer()}): yorum kapatılmamış.`); i = e + 3; continue; }
        if (s.startsWith('<![CDATA[', i)) { const e = s.indexOf(']]>', i); if (e < 0) h.err(`XML hatası (${yer()}): CDATA bölümü kapatılmamış.`); dugum.metin += s.slice(i + 9, e); i = e + 3; continue; }
        if (s.startsWith('<?', i)) { const e = s.indexOf('?>', i); if (e < 0) h.err(`XML hatası (${yer()}): işlem yönergesi kapatılmamış.`); i = e + 2; continue; }
        if (s[i] === '<') { dugum.cocuk.push(oge()); continue; }
        let e = s.indexOf('<', i);
        if (e < 0) e = n;
        dugum.metin += coz(s.slice(i, e));
        i = e;
      }
    };
    atla();
    if (i >= n || s[i] !== '<') h.err('Girdi XML gibi görünmüyor; belge "<" ile başlayan bir kök öğe içermeli. JSON yapıştırdıysanız yönü "JSON → XML" yapın.');
    const kokDugum = oge();
    atla();
    if (i < n) h.err(`XML hatası (${yer()}): kök öğeden sonra fazladan içerik var. Bir XML belgesinde yalnızca bir kök öğe bulunur.`);
    const cevir = (d) => {
      const metin = d.metin.trim();
      if (!d.oz.length && !d.cocuk.length) return metin === '' ? null : metin;
      const o = {};
      for (const [k, val] of d.oz) o['@' + k] = val;
      for (const c of d.cocuk) {
        const val = cevir(c);
        if (Object.prototype.hasOwnProperty.call(o, c.ad)) {
          if (!Array.isArray(o[c.ad]) || !o[c.ad].__dizi) { const dz = [o[c.ad]]; Object.defineProperty(dz, '__dizi', { value: true }); o[c.ad] = dz; }
          o[c.ad].push(val);
        } else o[c.ad] = val;
      }
      if (metin !== '') o['#text'] = metin;
      return o;
    };
    const sonuc = { [kokDugum.ad]: cevir(kokDugum) };
    return {
      rows: [['Dönüşüm', 'XML → JSON'], ['Öğe sayısı', h.fmt(sayac, 0)], ['Kök öğe', kokDugum.ad]],
      text: JSON.stringify(sonuc, null, gir),
      note: 'XML\'de veri türü olmadığından bütün değerler dizgi olarak aktarıldı; öznitelikler "@", karışık içerikteki metin "#text" anahtarıyla yazıldı.',
    };
  }
