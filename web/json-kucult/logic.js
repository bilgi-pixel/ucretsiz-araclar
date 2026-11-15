// JSON Küçültme (Minify) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.json ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('Küçültülecek JSON metnini "JSON metni" alanına yapıştırın.');
    let veri;
    try { veri = JSON.parse(s); }
    catch (e) {
      const m = /position (\d+)/.exec(String(e && e.message));
      if (m) {
        const k = Math.min(Number(m[1]), s.length);
        const once = s.slice(0, k).split('\n');
        h.err(`Metin geçerli bir JSON değil: ${once.length}. satır, ${once[once.length - 1].length + 1}. karakter civarında söz dizimi hatası var. Tırnakları, virgülleri ve parantezleri denetleyin.`);
      }
      h.err('Metin geçerli bir JSON değil. Anahtarların çift tırnak içinde olduğunu, sonda fazladan virgül kalmadığını ve parantezlerin kapandığını denetleyin.');
    }
    let o;
    if (v.sira === 'sirala') {
      const sirala = (x) => {
        if (Array.isArray(x)) return x.map(sirala);
        if (x && typeof x === 'object') {
          const y = {};
          for (const k of Object.keys(x).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))) y[k] = sirala(x[k]);
          return y;
        }
        return x;
      };
      o = JSON.stringify(sirala(veri));
    } else {
      // Sayıların yazımını (1.50, 1e3) bozmamak için metin üzerinde, dizgilerin dışındaki boşlukları sil
      o = '';
      let dizgi = false;
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (dizgi) {
          o += c;
          if (c === '\\') { o += s[i + 1] ?? ''; i++; }
          else if (c === '"') dizgi = false;
        } else if (c === '"') { dizgi = true; o += c; }
        else if (c !== ' ' && c !== '\n' && c !== '\r' && c !== '\t') o += c;
      }
    }
    const tur = veri === null ? 'null' : Array.isArray(veri) ? `dizi (${veri.length} öğe)` : typeof veri === 'object' ? `nesne (${Object.keys(veri).length} anahtar)` : typeof veri === 'string' ? 'dizgi' : typeof veri === 'number' ? 'sayı' : 'mantıksal değer';
    const bayt = (t) => new TextEncoder().encode(t).length;
    const b1 = bayt(s), b2 = bayt(o);
    return {
      rows: [
        ['Küçültülmüş boyut', h.fmt(b2, 0) + ' bayt'],
        ['Özgün boyut', h.fmt(b1, 0) + ' bayt'],
        ['Kazanç', '%' + h.fmt((b1 - b2) / b1 * 100, 1) + ' (' + h.fmt(b1 - b2, 0) + ' bayt)'],
        ['Kök değer', tur],
      ],
      text: o,
      note: v.sira === 'sirala'
        ? 'Anahtarlar alfabetik sıralandı. Bu kipte sayılar yeniden yazılır (1.50 → 1.5); çok büyük tam sayılar duyarlılık kaybedebilir.'
        : 'JSON geçerli. Yalnızca dizgilerin dışındaki boşluklar silindi; değerler ve anahtar sırası değişmedi.',
    };
  }
