// Metinden Emoji Temizleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Temizlemek için "Metin" alanına bir yazı yapıştırın.');
    // Tek bir emoji dizisi: bayrak çifti | tuş takımı emojisi | (ZWJ ile birleşebilen) resim karakteri
    const ek = '(?:\\uFE0F|[\\u{1F3FB}-\\u{1F3FF}]|[\\u{E0020}-\\u{E007F}])*';
    const resim = '(?![\\u00A9\\u00AE\\u2122])\\p{Extended_Pictographic}';
    const re = new RegExp('[\\u{1F1E6}-\\u{1F1FF}]{2}|[0-9#*]\\uFE0F?\\u20E3|' + resim + ek + '(?:\\u200D' + resim + ek + ')*', 'gu');
    let adet = 0;
    const yer = v.yerine === 'bosluk' ? ' ' : '';
    let cikti = s.replace(re, () => { adet++; return yer; });
    // Sahipsiz kalan biçim seçici, ten rengi ve bölge göstergesi artıkları
    cikti = cikti.replace(/[️⃣\u{1F3FB}-\u{1F3FF}\u{1F1E6}-\u{1F1FF}\u{E0020}-\u{E007F}]/gu, '');
    if (v.duzelt !== 'hayir') {
      cikti = cikti.split('\n').map((x) => x.replace(/[ \t]{2,}/g, ' ').replace(/ +([.,;:!?])/g, '$1').trim()).join('\n');
    }
    const say = (t) => Array.from(t).length;
    return {
      rows: [
        ['Silinen emoji', h.fmt(adet, 0)],
        ['Önceki karakter sayısı', h.fmt(say(s), 0)],
        ['Sonraki karakter sayısı', h.fmt(say(cikti), 0)],
      ],
      text: cikti,
      note: adet === 0 ? 'Metinde emoji bulunamadı; çıktı yalnızca seçtiğiniz boşluk düzeltmesinden etkilenir.' : 'Telif (©), tescil (®) ve marka (™) işaretleri emoji sayılmaz ve korunur.',
    };
  }
