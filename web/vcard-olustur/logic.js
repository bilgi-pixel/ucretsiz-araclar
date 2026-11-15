// vCard Kartvizit Metni Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const al = (k) => String(v[k] ?? '').trim().replace(/\s+/g, ' ');
    const kacis = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');
    const ad = al('ad'), soyad = al('soyad'), firma = al('firma');
    if (!ad && !soyad && !firma) h.err('En az ad, soyad ya da firma alanlarından birini doldurun.');
    const tel = (k, etiket) => {
      const t = al(k);
      if (!t) return '';
      if (!/^\+?[\d\s().\-/]+$/.test(t) || t.replace(/\D/g, '').length < 3) h.err(`"${etiket}" alanına geçerli bir telefon numarası yazın (örn. +90 532 123 45 67).`);
      return (t.startsWith('+') ? '+' : '') + t.replace(/\D/g, '');
    };
    const cep = tel('cep', 'Cep telefonu'), isTel = tel('isTel', 'İş telefonu');
    const eposta = al('eposta');
    if (eposta && !/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(eposta)) h.err('"E-posta" alanına geçerli bir adres yazın (örn. ad@ornek.com).');
    let web = al('web');
    if (web) {
      if (/\s/.test(web) || !/\./.test(web)) h.err('"Web sitesi" alanına geçerli bir adres yazın (örn. ornek.com).');
      if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(web)) web = 'https://' + web;
      if (!/^https?:\/\//i.test(web)) h.err('Web sitesi adresi http ya da https ile başlamalı.');
    }
    const unvan = al('unvan'), adres = al('adres');
    const tamAd = [ad, soyad].filter(Boolean).join(' ') || firma;
    const s4 = v.surum === '4';
    const L = ['BEGIN:VCARD', `VERSION:${s4 ? '4.0' : '3.0'}`, `N:${kacis(soyad)};${kacis(ad)};;;`, `FN:${kacis(tamAd)}`];
    if (firma) L.push(`ORG:${kacis(firma)}`);
    if (unvan) L.push(`TITLE:${kacis(unvan)}`);
    if (cep) L.push(`TEL;TYPE=${s4 ? 'cell' : 'CELL'}:${cep}`);
    if (isTel) L.push(`TEL;TYPE=${s4 ? 'work' : 'WORK'}:${isTel}`);
    if (eposta) L.push(`EMAIL${s4 ? '' : ';TYPE=INTERNET'}:${eposta}`);
    if (web) L.push(`URL:${web}`);
    if (adres) L.push(`ADR;TYPE=${s4 ? 'work' : 'WORK'}:;;${kacis(adres)};;;;`);
    L.push('END:VCARD');
    const text = L.join('\n');
    const bayt = new TextEncoder().encode(text).length;
    return {
      rows: [
        ['Kart sahibi', tamAd],
        ['Alan sayısı', `${L.length - 3} satır`],
        ['Metin boyutu', `${bayt} bayt`],
      ],
      text,
      note: 'Metni "kartvizit.vcf" adıyla UTF-8 olarak kaydedin ya da QR koda dönüştürün. Boş bırakılan alanlar karta yazılmaz.',
    };
  }
