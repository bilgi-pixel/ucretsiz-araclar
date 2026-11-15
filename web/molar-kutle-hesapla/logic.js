// Molar Kütle (Mol Kütlesi) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const T = {
      H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
      Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
      Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
      Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
      Nb: 92.906, Mo: 95.95, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
      Te: 127.6, I: 126.9, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Sm: 150.36,
      Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.5, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
      Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59, Tl: 204.38, Pb: 207.2,
      Bi: 208.98, Th: 232.04, Pa: 231.04, U: 238.03,
    };
    let s = String(v.formul ?? '').trim();
    if (!s) h.err('Bir kimyasal formül yazın (örn. H2O).');
    s = s.replace(/\s+/g, '')
      .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))
      .replace(/[\[{]/g, '(').replace(/[\]}]/g, ')');
    if (s.length > 200) h.err('Formül çok uzun; en fazla 200 karakter yazın.');
    const toplam = {};
    const sira = [];
    const ekle = (hedef, sym, n) => { hedef[sym] = (hedef[sym] || 0) + n; };
    const parcalar = s.split(/[·.*•]/);
    for (const parca of parcalar) {
      if (!parca) h.err('Kristal suyu ayracından önce ve sonra bir formül olmalı (örn. CuSO4.5H2O).');
      const m = /^(\d*)(.*)$/.exec(parca);
      const kat = m[1] === '' ? 1 : Number(m[1]);
      const govde = m[2];
      if (kat < 1) h.err('Formülün başındaki katsayı en az 1 olmalı.');
      if (!govde) h.err('Katsayıdan sonra bir formül yazın (örn. 5H2O).');
      let i = 0;
      const sayi = () => {
        let t = '';
        while (i < govde.length && /\d/.test(govde[i])) { t += govde[i]; i++; }
        if (t === '') return 1;
        const n = Number(t);
        if (n < 1) h.err('Alt indis 0 olamaz; elementi formülden çıkarın ya da sayıyı düzeltin.');
        if (n > 100000) h.err('Alt indis çok büyük.');
        return n;
      };
      const grup = (derinlik) => {
        const yerel = {};
        let adet = 0;
        while (i < govde.length && govde[i] !== ')') {
          const ch = govde[i];
          if (ch === '(') {
            if (derinlik > 10) h.err('Çok fazla iç içe parantez var.');
            i++;
            const ic = grup(derinlik + 1);
            if (govde[i] !== ')') h.err('Açılan bir parantez kapatılmamış.');
            i++;
            const n = sayi();
            for (const k of Object.keys(ic)) ekle(yerel, k, ic[k] * n);
            adet++;
          } else if (/[A-Z]/.test(ch)) {
            let sym = ch;
            i++;
            if (i < govde.length && /[a-z]/.test(govde[i])) { sym += govde[i]; i++; }
            if (i < govde.length && /[a-z]/.test(govde[i])) h.err(`"${sym}${govde[i]}…" tanınmadı. Element simgeleri bir büyük harf ve en fazla bir küçük harften oluşur.`);
            if (!T[sym]) h.err(`"${sym}" simgeli bir element bulunamadı. Büyük-küçük harf yazımını kontrol edin (örn. NaCl, Co, CO).`);
            if (!sira.includes(sym)) sira.push(sym);
            ekle(yerel, sym, sayi());
            adet++;
          } else if (/[a-z]/.test(ch)) {
            h.err(`Element simgeleri büyük harfle başlar; "${ch}" harfini kontrol edin (örn. h2o yerine H2O).`);
          } else if (/\d/.test(ch)) {
            h.err('Sayı bir element simgesinden ya da kapanan parantezden sonra gelmelidir.');
          } else {
            h.err(`Formülde geçersiz karakter var: "${ch}". Yalnızca element simgeleri, sayılar, parantez ve nokta kullanın.`);
          }
        }
        if (adet === 0) h.err('Boş parantez ya da boş formül parçası var.');
        return yerel;
      };
      const sonuc = grup(0);
      if (i < govde.length) h.err('Fazladan bir kapanış parantezi var.');
      for (const k of Object.keys(sonuc)) ekle(toplam, k, sonuc[k] * kat);
    }
    let M = 0;
    let atom = 0;
    for (const k of sira) { M += toplam[k] * T[k]; atom += toplam[k]; }
    const satirlar = sira.map((k) => `${k}: ${toplam[k]} atom × ${h.fmt(T[k], 4)} = ${h.fmt(toplam[k] * T[k], 3)} g/mol (%${h.fmt(toplam[k] * T[k] / M * 100, 2)})`);
    const rows = [
      ['Molar kütle', h.fmt(M, 3) + ' g/mol'],
      ['Toplam atom sayısı', String(atom)],
      ['Element çeşidi', String(sira.length)],
      ['Kütlece bileşim', sira.map((k) => `${k} %${h.fmt(toplam[k] * T[k] / M * 100, 2)}`).join('; ')],
    ];
    if (String(v.kutle ?? '').trim() !== '') {
      const g = h.pos(v.kutle, 'Örnek kütlesi');
      rows.push(['Mol sayısı', h.sig(g / M, 6) + ' mol']);
    }
    return {
      rows,
      text: satirlar.join('\n'),
      note: 'Standart atom kütlelerinin kısaltılmış değerleri kullanılır (H = 1,008; C = 12,011; O = 15,999 …). Ders kitaplarındaki yuvarlatılmış değerlerle küçük farklar olabilir.',
    };
  }
