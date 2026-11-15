// Vigenère Şifreleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Şifrelemek ya da çözmek için "Metin" alanına bir yazı yazın.');
    const en = v.alfabe === 'en';
    const BUYUK = en ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
    const KUCUK = en ? 'abcdefghijklmnopqrstuvwxyz' : 'abcçdefgğhıijklmnoöprsştuüvyz';
    const n = BUYUK.length;
    const sira = (c) => { const i = BUYUK.indexOf(c); return i >= 0 ? i : KUCUK.indexOf(c); };
    const hamAnahtar = String(v.anahtar ?? '').replace(/\s+/g, '');
    if (hamAnahtar === '') h.err('"Anahtar kelime" alanını doldurun (örn. KALEM).');
    const k = [];
    for (const c of hamAnahtar) {
      const i = sira(c);
      if (i < 0) h.err(`Anahtardaki "${c}" karakteri seçilen alfabede yok. Anahtar yalnızca ${en ? 'A–Z harflerinden' : 'Türk alfabesinin 29 harfinden'} oluşmalı.`);
      k.push(i);
    }
    const yon = v.islem === 'coz' ? -1 : 1;
    let j = 0, cikti = '';
    for (const c of s) {
      let i = BUYUK.indexOf(c);
      if (i >= 0) { cikti += BUYUK[(i + yon * k[j % k.length] + n) % n]; j++; continue; }
      i = KUCUK.indexOf(c);
      if (i >= 0) { cikti += KUCUK[(i + yon * k[j % k.length] + n) % n]; j++; continue; }
      cikti += c;
    }
    if (j === 0) h.err('Metinde seçilen alfabeye ait harf yok; alfabeyi değiştirin ya da metni denetleyin.');
    const anahtarYazi = k.map((i) => BUYUK[i]).join('');
    return {
      rows: [
        ['Anahtar', `${anahtarYazi} (${k.length} harf)`],
        ['Anahtar kaydırmaları', k.join(', ')],
        ['Alfabe', en ? 'İngilizce, 26 harf' : 'Türkçe, 29 harf'],
        ['İşlenen harf', h.fmt(j, 0)],
      ],
      text: cikti,
      note: (k.every((i) => i === 0) ? 'Anahtar yalnızca A harfinden oluştuğu için kaydırma 0\'dır ve metin değişmedi. ' : '') + 'Anahtar yalnızca harflerde ilerler; boşluk, rakam ve noktalama işaretleri değiştirilmez ve anahtar harfi tüketmez.',
    };
  }
