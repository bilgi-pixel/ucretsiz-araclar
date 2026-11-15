// Elektron Dizilimi Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const SEM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
    const AD = 'Hidrojen Helyum Lityum Berilyum Bor Karbon Azot Oksijen Flor Neon Sodyum Magnezyum Alüminyum Silisyum Fosfor Kükürt Klor Argon Potasyum Kalsiyum Skandiyum Titanyum Vanadyum Krom Mangan Demir Kobalt Nikel Bakır Çinko Galyum Germanyum Arsenik Selenyum Brom Kripton Rubidyum Stronsiyum İtriyum Zirkonyum Niyobyum Molibden Teknesyum Rutenyum Rodyum Paladyum Gümüş Kadmiyum İndiyum Kalay Antimon Tellür İyot Ksenon Sezyum Baryum Lantan Seryum Praseodim Neodim Prometyum Samaryum Evropiyum Gadolinyum Terbiyum Disprosyum Holmiyum Erbiyum Tulyum İterbiyum Lutesyum Hafniyum Tantal Tungsten Renyum Osmiyum İridyum Platin Altın Cıva Talyum Kurşun Bizmut Polonyum Astatin Radon Fransiyum Radyum Aktinyum Toryum Protaktinyum Uranyum Neptünyum Plütonyum Amerikyum Küriyum Berkelyum Kaliforniyum Aynştaynyum Fermiyum Mendelevyum Nobelyum Lavrensiyum Rutherfordiyum Dubniyum Seaborgiyum Bohriyum Hassiyum Meitneriyum Darmstadtiyum Röntgenyum Kopernikyum Nihonyum Flerovyum Moskovyum Livermoryum Tennesin Oganesson'.split(' ');
    const SIRA = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
    const KAP = { s: 2, p: 6, d: 10, f: 14 };
    // Aufbau sırasına uymayan, bilinen temel hâl dizilimleri (yalnızca farklı orbitaller)
    const ISTISNA = {
      24: { '4s': 1, '3d': 5 }, 29: { '4s': 1, '3d': 10 },
      41: { '5s': 1, '4d': 4 }, 42: { '5s': 1, '4d': 5 }, 44: { '5s': 1, '4d': 7 }, 45: { '5s': 1, '4d': 8 },
      46: { '5s': 0, '4d': 10 }, 47: { '5s': 1, '4d': 10 },
      57: { '4f': 0, '5d': 1 }, 58: { '4f': 1, '5d': 1 }, 64: { '4f': 7, '5d': 1 },
      78: { '6s': 1, '5d': 9 }, 79: { '6s': 1, '5d': 10 },
      89: { '5f': 0, '6d': 1 }, 90: { '5f': 0, '6d': 2 }, 91: { '5f': 2, '6d': 1 }, 92: { '5f': 3, '6d': 1 },
      93: { '5f': 4, '6d': 1 }, 96: { '5f': 7, '6d': 1 }, 103: { '6d': 0, '7p': 1 },
    };
    const t = String(v.element ?? '').trim();
    if (t === '') h.err('Atom numarasını (1–118) ya da element sembolünü yazın.');
    let z;
    if (/^\d+$/.test(t)) {
      z = Number(t);
      if (z < 1 || z > 118) h.err('Atom numarası 1 ile 118 arasında olmalı.');
    } else {
      const k = t.replace(/İ/g, 'I').replace(/ı/g, 'i').toLowerCase();
      z = SEM.findIndex((s) => s.toLowerCase() === k) + 1;
      if (z < 1) h.err(`"${t}" bilinen bir element sembolü değil. Fe, Cu, Na gibi bir sembol ya da 1–118 arası atom numarası yazın.`);
    }
    const doldur = (n) => {
      const d = {};
      let kalan = n;
      for (const o of SIRA) {
        const al = Math.min(kalan, KAP[o[1]]);
        d[o] = al;
        kalan -= al;
      }
      return d;
    };
    const d = doldur(z);
    const ist = ISTISNA[z];
    if (ist) Object.assign(d, ist);
    const UST = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const ust = (n) => String(n).split('').map((c) => UST[+c]).join('');
    const yaz = (liste) => liste.map((o) => o + ust(d[o])).join(' ');
    const dolu = SIRA.filter((o) => d[o] > 0);
    const soylar = [[86, 'Rn'], [54, 'Xe'], [36, 'Kr'], [18, 'Ar'], [10, 'Ne'], [2, 'He']];
    const soy = soylar.find(([n]) => n < z);
    let kisa;
    if (soy) {
      const cekirdek = doldur(soy[0]);
      const dis = SIRA.filter((o) => d[o] > 0 && cekirdek[o] === 0);
      kisa = `[${soy[1]}] ${yaz(dis)}`;
    } else kisa = yaz(dolu);
    const kabukSirasi = [...dolu].sort((a, b) => (+a[0] - +b[0]) || ('spdf'.indexOf(a[1]) - 'spdf'.indexOf(b[1])));
    const katman = [0, 0, 0, 0, 0, 0, 0];
    for (const o of dolu) katman[+o[0] - 1] += d[o];
    while (katman.length && katman[katman.length - 1] === 0) katman.pop();
    let tek = 0;
    for (const o of dolu) { const c = KAP[o[1]]; tek += d[o] <= c / 2 ? d[o] : c - d[o]; }
    const periyot = [2, 10, 18, 36, 54, 86, 118].findIndex((n) => z <= n) + 1;
    let note = 'Dizilim nötr atomun temel hâli içindir; iyonlar ve uyarılmış hâller kapsam dışıdır.';
    if (ist) note = 'Bu element Aufbau sırasına tam uymaz; bilinen temel hâl dizilimi gösterilmiştir. ' + note;
    else if (z > 103) note = 'Atom numarası 103\'ten büyük elementlerde dizilim deneysel olarak kesinleşmemiştir; Aufbau sırasına göre öngörülen dizilim gösterilmiştir. ' + note;
    return {
      rows: [
        ['Elektron dizilimi', yaz(dolu)],
        ['Soy gaz kısaltmasıyla', kisa],
        ['Kabuk sırasına göre', yaz(kabukSirasi)],
        ['Katman dağılımı', katman.join('-')],
        ['Element', `${AD[z - 1]} (${SEM[z - 1]}), atom numarası ${z}`],
        ['Periyot', String(periyot)],
        ['Son katmandaki elektron sayısı', String(katman[katman.length - 1])],
        ['Eşleşmemiş elektron sayısı', String(tek)],
      ],
      note,
    };
  }
