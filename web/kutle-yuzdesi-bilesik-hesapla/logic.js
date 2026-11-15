// Bileşikte Kütlece Yüzde Bileşim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const A = {
      H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
      Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
      Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
      Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
      Nb: 92.906, Mo: 95.95, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
      Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Sm: 150.36,
      Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
      Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59, Tl: 204.38, Pb: 207.2,
      Bi: 208.98, Th: 232.04, U: 238.03,
    };
    let f = String(v.formul ?? '').replace(/\s/g, '').replace(/[₀-₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)));
    if (f === '') h.err('Kimyasal formülü yazın (örn. H2O, Ca(OH)2).');
    if (f.length > 100) h.err('Formül çok uzun; en fazla 100 karakter yazın.');
    const sayim = {};
    const sira = [];
    const ekle = (hedef, sem, n) => { hedef[sem] = (hedef[sem] || 0) + n; };
    const coz = (s) => {
      const yigin = [{}];
      let i = 0;
      const sayiOku = () => {
        let j = i;
        while (j < s.length && /\d/.test(s[j])) j++;
        if (j === i) return 1;
        const n = Number(s.slice(i, j));
        i = j;
        if (n < 1) h.err('Formülde alt indis 0 olamaz.');
        return n;
      };
      while (i < s.length) {
        const c = s[i];
        if (c === '(' || c === '[') { yigin.push({}); i++; }
        else if (c === ')' || c === ']') {
          if (yigin.length < 2) h.err('Formülde açılmamış bir parantez kapatılmış.');
          i++;
          const k = sayiOku();
          const grup = yigin.pop();
          for (const e of Object.keys(grup)) ekle(yigin[yigin.length - 1], e, grup[e] * k);
        } else if (/[A-Z]/.test(c)) {
          let sem = c;
          if (i + 1 < s.length && /[a-z]/.test(s[i + 1])) sem += s[i + 1];
          if (!(sem in A)) {
            if (sem.length === 2 && sem[0] in A && !/[a-z]/.test(s[i + 1] || '')) sem = c;
            else h.err(`"${sem}" tabloda bulunan bir element sembolü değil. Yazımı ve büyük-küçük harfi kontrol edin.`);
          }
          i += sem.length;
          if (!sira.includes(sem)) sira.push(sem);
          ekle(yigin[yigin.length - 1], sem, sayiOku());
        } else if (/[a-z]/.test(c)) h.err('Element sembolleri büyük harfle başlar (örn. NaCl, H2O). Formülü büyük-küçük harfe dikkat ederek yazın.');
        else h.err(`Formülde tanınmayan karakter var: "${c}".`);
      }
      if (yigin.length !== 1) h.err('Formülde kapatılmamış parantez var.');
      return yigin[0];
    };
    for (const parca of f.split(/[.·*]/)) {
      if (parca === '') h.err('Formülde nokta işaretinden önce ya da sonra eksik bölüm var.');
      const m = /^(\d*)(.*)$/.exec(parca);
      const kat = m[1] === '' ? 1 : Number(m[1]);
      if (kat < 1 || m[2] === '') h.err('Kristal suyu bölümünü 5H2O biçiminde yazın.');
      const p = coz(m[2]);
      for (const e of Object.keys(p)) ekle(sayim, e, p[e] * kat);
    }
    let M = 0;
    let atom = 0;
    for (const e of sira) { M += A[e] * sayim[e]; atom += sayim[e]; }
    const bosNumune = String(v.numune ?? '').trim() === '';
    const numune = bosNumune ? null : h.pos(v.numune, 'Numune kütlesi');
    const rows = [['Molar kütle', h.fmt(M, 3) + ' g/mol']];
    for (const e of sira) {
      const pay = A[e] * sayim[e];
      rows.push([`${e} yüzdesi`, `%${h.fmt(pay / M * 100, 2)} (${sayim[e]} atom, ${h.fmt(pay, 3)} g/mol)`]);
    }
    if (numune !== null) for (const e of sira) rows.push([`${e} kütlesi`, h.fmt(numune * A[e] * sayim[e] / M, 3) + ' g']);
    rows.push(['Formül birimindeki atom sayısı', String(atom)]);
    return { rows, note: 'Yüzdeler standart atom kütleleriyle hesaplanır ve iki ondalığa yuvarlanır; toplamları yuvarlama nedeniyle 100\'den 0,01 kadar sapabilir.' };
  }
