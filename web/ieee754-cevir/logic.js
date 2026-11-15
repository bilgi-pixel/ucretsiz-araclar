// IEEE 754 Kayan Nokta Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const w = v.duyarlik === '64' ? 64 : 32;
    const ub = w === 32 ? 8 : 11; // üs biti
    const p = w === 32 ? 23 : 52; // kesir biti
    const yansiz = w === 32 ? 127 : 1023;
    const dv = new DataView(new ArrayBuffer(8));
    let bits; // BigInt
    const ham = String(v.deger ?? '').trim();
    if (ham === '') h.err('"Sayı ya da bit dizisi" alanını doldurun.');
    let taşma = false;
    if (v.yon === 'bit') {
      const t = ham.replace(/^0[xXbB]/, '').replace(/[\s_|]/g, '');
      if (/^[01]+$/.test(t) && t.length === w) bits = BigInt('0b' + t);
      else if (/^[0-9a-fA-F]+$/.test(t) && t.length === w / 4) bits = BigInt('0x' + t);
      else h.err(`${w} bit için tam ${w / 4} onaltılık hane (örn. ${w === 32 ? '3E200000' : '3FF0000000000000'}) ya da tam ${w} ikili hane yazın.`);
    } else {
      const k = ham.toLowerCase().replace(/\s/g, '').replace(/−/g, '-');
      let x;
      if (/^[+]?(sonsuz|inf|infinity|∞)$/.test(k)) x = Infinity;
      else if (/^-(sonsuz|inf|infinity|∞)$/.test(k)) x = -Infinity;
      else if (k === 'nan') x = NaN;
      else x = h.num(ham, 'Sayı');
      if (w === 32) {
        dv.setFloat32(0, x);
        bits = BigInt(dv.getUint32(0));
        if (Number.isFinite(x) && !Number.isFinite(dv.getFloat32(0))) taşma = true;
      } else {
        dv.setFloat64(0, x);
        bits = dv.getBigUint64(0);
      }
    }
    const ikili = bits.toString(2).padStart(w, '0');
    const isaret = ikili[0];
    const usBit = ikili.slice(1, 1 + ub);
    const kesirBit = ikili.slice(1 + ub);
    const e = parseInt(usBit, 2);
    const f = BigInt('0b' + kesirBit);
    const eMax = (1 << ub) - 1;
    let deger;
    if (w === 32) { dv.setUint32(0, Number(bits)); deger = dv.getFloat32(0); } else { dv.setBigUint64(0, bits); deger = dv.getFloat64(0); }
    // En kısa geri dönüşümlü gösterim
    let kisa;
    if (Number.isNaN(deger)) kisa = 'Sayı değil (not a number)';
    else if (deger === Infinity) kisa = '+Sonsuz';
    else if (deger === -Infinity) kisa = '-Sonsuz';
    else if (deger === 0) kisa = isaret === '1' ? '-0' : '0';
    else {
      let s = String(deger);
      if (w === 32) {
        for (let i = 1; i <= 9; i++) {
          const a = Number(deger.toPrecision(i));
          if (Math.fround(a) === deger) { s = String(a); break; }
        }
      }
      kisa = s.replace('.', ',');
    }
    let tur;
    let usMetin;
    let mantis;
    let tam;
    if (e === eMax) {
      tur = f === 0n ? 'Sonsuz' : 'Sayı değil (not a number)';
      usMetin = `${e} (özel değer)`;
      mantis = '—';
      tam = kisa;
    } else {
      const M = e === 0 ? f : f | (1n << BigInt(p));
      const E = (e === 0 ? 1 : e) - yansiz - p;
      if (e === 0) {
        tur = f === 0n ? 'Sıfır' : 'Denormal (alt normal) sayı';
        usMetin = `0 (etkin üs: ${1 - yansiz})`;
      } else {
        tur = 'Normal sayı';
        usMetin = `${e} (yansız: ${e - yansiz})`;
      }
      mantis = String((e === 0 ? 0 : 1) + Number(f) / 2 ** p).replace('.', ',');
      if (M === 0n) tam = isaret === '1' ? '-0' : '0';
      else {
        let g;
        if (E >= 0) g = (M << BigInt(E)).toString();
        else {
          const k = -E;
          const d = (M * 5n ** BigInt(k)).toString().padStart(k + 1, '0');
          const kes = d.slice(-k).replace(/0+$/, '');
          g = d.slice(0, -k) + (kes ? ',' + kes : '');
        }
        tam = g.length > 80 ? kisa + ' (yaklaşık; tam açılım çok uzun)' : (isaret === '1' ? '-' : '') + g;
      }
    }
    const on6 = '0x' + bits.toString(16).toUpperCase().padStart(w / 4, '0');
    const satirlar = [
      ['Onaltılık', on6],
      ['Değer (kısa gösterim)', kisa],
      ['İkili (işaret | üs | kesir)', `${isaret} ${usBit} ${kesirBit}`],
      ['İşaret biti', isaret === '1' ? '1 (negatif)' : '0 (pozitif)'],
      ['Üs alanı', usMetin],
      ['Anlamlı kısım (mantis)', mantis],
      ['Saklanan tam değer', tam],
      ['Tür', tur],
    ];
    if (v.yon === 'bit') { const t = satirlar[0]; satirlar[0] = satirlar[1]; satirlar[1] = t; }
    return {
      rows: satirlar,
      note: taşma ? 'Yazdığınız sayı tek duyarlığın sınırını aştığı için sonsuz olarak saklanır.' : `${w} bit: 1 işaret biti, ${ub} üs biti, ${p} kesir biti. Çoğu ondalık kesir ikilide tam gösterilemez; "Saklanan tam değer" satırı gerçekte tutulan sayıdır.`,
    };
  }
