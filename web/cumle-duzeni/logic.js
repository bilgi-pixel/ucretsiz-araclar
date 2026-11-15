// Cümle Düzenine Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Cümle düzenine çevirmek için "Metin" alanına bir metin yazın.');
    if (!/\p{L}/u.test(s)) h.err('Metinde harf bulunamadı. İçinde yazı olan bir metin girin.');
    const tr = v.dil !== 'en';
    const kucuk = (x) => (tr ? x.replace(/I/g, 'ı').replace(/İ/g, 'i') : x.replace(/İ/g, 'i')).toLowerCase();
    const buyuk = (x) => (tr ? x.replace(/i/g, 'İ').replace(/ı/g, 'I') : x.replace(/ı/g, 'I')).toUpperCase();
    const kr = Array.from(v.kalan === 'koru' ? s : kucuk(s));
    let yeni = true, cumle = 0, o = '';
    for (let i = 0; i < kr.length; i++) {
      const c = kr[i];
      if (/\p{L}/u.test(c)) {
        if (yeni) { o += buyuk(c); cumle++; yeni = false; } else o += c;
        continue;
      }
      o += c;
      if (c === '\n') yeni = true;
      else if (/\p{N}/u.test(c)) { if (yeni) { cumle++; yeni = false; } }
      else if (c === '.' || c === '!' || c === '?' || c === '…') {
        // Nokta yalnızca ardından boşluk, satır sonu ya da kapanış işareti geliyorsa cümle bitirir (3.5 gibi sayılar bölünmez)
        // Soru ya da ünlemden hemen sonra tırnak kapanıyorsa ("Geldin mi?" dedi) cümle sürüyor kabul edilir
        let j = i + 1, tirnak = false;
        while (j < kr.length && /[.!?…"'’”»)\]]/.test(kr[j])) { if (/["'’”»]/.test(kr[j])) tirnak = true; j++; }
        if (j >= kr.length || /\s/.test(kr[j])) yeni = !(tirnak && (c === '!' || c === '?'));
      }
    }
    let degisen = 0;
    const eski = Array.from(s), son = Array.from(o);
    for (let i = 0; i < eski.length; i++) if (eski[i] !== son[i]) degisen++;
    return {
      rows: [
        ['Cümle sayısı', h.fmt(cumle, 0)],
        ['Değişen harf', h.fmt(degisen, 0)],
        ['Harf kuralı', tr ? 'Türkçe' : 'İngilizce'],
      ],
      text: o,
      note: v.kalan === 'koru' ? 'Yalnızca cümle başları büyütüldü; diğer harflerin büyüklüğüne dokunulmadı.' : 'Özel adlar ve kısaltmalar da küçük harfe çevrildi; bunları sonuçta elle düzeltin.',
    };
  }
