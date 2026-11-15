export default {
  slug: 'desibel-hesapla',
  title: 'Desibel (dB) Kazanç Hesaplama',
  h1Tail: 'güç ve gerilim oranı',
  pageTitle: 'Desibel (dB) Kazanç Hesaplama – Güç ve Gerilim Oranından dB',
  description: 'Giriş ve çıkış değerlerinden kazancı ya da zayıflamayı desibel (dB) olarak hesaplayın; dB değerini güç ve gerilim oranına geri çevirin. 10 log ve 20 log kuralı.',
  card: 'Giriş-çıkış değerlerinden dB kazancını bulun ya da dB değerini güç ve gerilim oranına çevirin.',
  category: 'elektrik',
  keywords: ['desibel hesaplama', 'db hesaplama', 'kazanç hesaplama db', 'db oran çevirme', '3 db kaç kat', 'gerilim kazancı db', 'zayıflama hesaplama'],
  lead: `Bir yükseltecin, filtrenin, kablonun ya da antenin <strong>kazancını veya kaybını desibel (dB)</strong> olarak hesaplayın. Giriş ve çıkış değerlerinden dB'yi bulabilir ya da bildiğiniz bir dB değerinin kaç kat güç ve gerilim farkına karşılık geldiğini görebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'İşlem', type: 'select', options: [['oran', 'Giriş ve çıkıştan dB hesapla'], ['db', 'dB değerinden oran hesapla']] },
    { id: 'tur', label: 'Büyüklük türü', type: 'select', options: [['guc', 'Güç (W, mW) – 10 log'], ['gerilim', 'Gerilim ya da akım (V, A) – 20 log']] },
    { id: 'giris', label: 'Giriş değeri', type: 'number', placeholder: 'Örn. 1' },
    { id: 'cikis', label: 'Çıkış değeri', type: 'number', placeholder: 'Örn. 2', hint: 'Girişle aynı birimde olmalı.' },
    { id: 'db', label: 'dB değeri', type: 'number', placeholder: 'Yalnızca dB\'den oran hesaplanırken' },
  ],
  compute(v, h) {
    let db;
    if (v.mod === 'db') {
      db = h.num(v.db, 'dB değeri');
      if (Math.abs(db) > 400) h.err('dB değeri −400 ile 400 arasında olmalı.');
    } else {
      const g = h.pos(v.giris, 'Giriş değeri');
      const c = h.pos(v.cikis, 'Çıkış değeri');
      db = (v.tur === 'gerilim' ? 20 : 10) * Math.log10(c / g);
    }
    if (Math.abs(db) < 1e-12) db = 0;
    const gucOran = Math.pow(10, db / 10);
    const gerOran = Math.pow(10, db / 20);
    const durum = db > 0 ? 'Kazanç (yükseltme)' : db < 0 ? 'Zayıflama (kayıp)' : 'Değişim yok';
    const dbSatir = ['Kazanç', h.fmt(db, 2) + ' dB'];
    const oranlar = [
      ['Güç oranı', h.sig(gucOran, 6) + ' kat'],
      ['Gerilim (genlik) oranı', h.sig(gerOran, 6) + ' kat'],
    ];
    return {
      rows: v.mod === 'db' ? [...oranlar, dbSatir, ['Durum', durum]] : [dbSatir, ...oranlar, ['Durum', durum]],
      note: 'Güç için dB = 10 × log10(çıkış ÷ giriş), gerilim ve akım için dB = 20 × log10(çıkış ÷ giriş). Gerilim formülü giriş ve çıkış empedansları eşitken güç oranıyla tutarlıdır.',
    };
  },
  cases: [
    { in: { mod: 'oran', tur: 'guc', giris: '1', cikis: '2' }, out: { 'Kazanç': '3,01 dB', 'Güç oranı': '2 kat', 'Gerilim (genlik) oranı': '1,41421 kat', 'Durum': 'Kazanç (yükseltme)' } },
    { in: { mod: 'oran', tur: 'gerilim', giris: '1', cikis: '10' }, out: { 'Kazanç': '20 dB', 'Güç oranı': '100 kat', 'Gerilim (genlik) oranı': '10 kat' } },
    { in: { mod: 'oran', tur: 'guc', giris: '10', cikis: '1' }, out: { 'Kazanç': '-10 dB', 'Güç oranı': '0,1 kat', 'Durum': 'Zayıflama (kayıp)' } },
    { in: { mod: 'db', db: '3' }, out: { 'Güç oranı': '1,99526 kat', 'Gerilim (genlik) oranı': '1,41254 kat' } },
    { in: { mod: 'db', db: '20' }, out: { 'Güç oranı': '100 kat', 'Gerilim (genlik) oranı': '10 kat' } },
    { in: { mod: 'db', db: '-6' }, out: { 'Güç oranı': '0,251189 kat', 'Gerilim (genlik) oranı': '0,501187 kat', 'Durum': 'Zayıflama (kayıp)' } },
    { in: { mod: 'oran', tur: 'gerilim', giris: '2', cikis: '1' }, out: { 'Kazanç': '-6,02 dB', 'Gerilim (genlik) oranı': '0,5 kat', 'Güç oranı': '0,25 kat' } },
    { in: { mod: 'oran', tur: 'guc', giris: '50', cikis: '50' }, out: { 'Kazanç': '0 dB', 'Durum': 'Değişim yok' } },
    { in: { mod: 'oran', tur: 'guc', giris: '0,001', cikis: '5' }, out: { 'Kazanç': '36,99 dB', 'Güç oranı': '5.000 kat' } },
    { in: { mod: 'oran', tur: 'guc', giris: '0', cikis: '2' }, error: true },
    { in: { mod: 'db', db: '' }, error: true },
    { in: { mod: 'oran', tur: 'gerilim', giris: '1', cikis: '-3' }, error: true },
  ],
  howto: [
    `"İşlem" listesinden yönü seçin: giriş ve çıkış değerlerinden dB bulmak ya da bir dB değerini orana çevirmek.`,
    `Giriş ve çıkıştan hesap yapıyorsanız "Büyüklük türü" olarak güç ya da gerilim/akım seçin; bu seçim 10 log ya da 20 log formülünü belirler.`,
    `Giriş ve çıkış değerlerini aynı birimde yazın (ikisi de watt, ikisi de volt gibi). dB'den oran arıyorsanız yalnızca "dB değeri" alanını doldurun.`,
    `"Hesapla" düğmesine basın. Kazanç, karşılık gelen güç ve gerilim oranları ile kazanç ya da zayıflama durumu listelenir.`,
  ],
  sections: [
    { h: 'Desibel nedir?', p: [
      `Desibel, iki büyüklüğün oranını logaritmik olarak ifade eden birimsiz bir ölçüdür. Adını Alexander Graham Bell'den alan "bel" biriminin onda biridir. Tek başına bir dB değeri mutlak bir büyüklük göstermez; her zaman "neye göre" sorusunun cevabı olan bir referansa ihtiyaç duyar. Bu sayfada referans giriş değeridir: sonuç, çıkışın girişe göre kaç dB yüksek ya da düşük olduğunu söyler.`,
      `Logaritmik ölçek iki nedenle tercih edilir. Birincisi, milyonda birden milyon kata kadar uzanan oranlar −60 dB ile +60 dB gibi okunaklı sayılara sığar. İkincisi, art arda bağlı katların kazançları çarpılmak yerine toplanır: 20 dB kazançlı bir yükselteçten sonra 3 dB kayıplı bir kablo gelirse toplam 17 dB'dir.`,
    ] },
    { h: '10 log mu, 20 log mu?', p: [
      `Desibelin tanımı güç oranı üzerinedir: <strong>dB = 10 × log<sub>10</sub>(P<sub>çıkış</sub> ÷ P<sub>giriş</sub>)</strong>. Güç, gerilimin karesiyle orantılı olduğundan (P = V² ÷ R), aynı direnç üzerindeki gerilim ya da akım oranı için katsayı ikiye katlanır: <strong>dB = 20 × log<sub>10</sub>(V<sub>çıkış</sub> ÷ V<sub>giriş</sub>)</strong>.`,
      `Bu yüzden aynı dB değeri güç ve gerilim için farklı oranlara denk gelir. 6 dB, gücün yaklaşık dört katı ama gerilimin yaklaşık iki katıdır. Araç her iki oranı birlikte gösterir; böylece hangi büyüklükle çalıştığınıza göre doğru satırı okuyabilirsiniz. 20 log formülünün güç kazancıyla aynı sonucu vermesi için giriş ve çıkış empedanslarının eşit olması gerektiğini unutmayın.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Güç yükselteci:</strong> Girişine 1 W verilen bir yükselteç 2 W çıkış veriyorsa kazanç 10 × log<sub>10</sub>(2) = 10 × 0,30103 = <strong>3,01 dB</strong> olur. "3 dB iki kat güçtür" kuralı buradan gelir.`,
      `<strong>Gerilim yükselteci:</strong> 1 V giriş 10 V çıkışa yükseltiliyorsa kazanç 20 × log<sub>10</sub>(10) = <strong>20 dB</strong> eder. Bu, gerilimde 10 kat, güçte 100 kat artış demektir.`,
      `<strong>Kablo kaybı:</strong> Uzun bir koaksiyel kabloya 10 W verip ucunda 1 W ölçüyorsanız 10 × log<sub>10</sub>(0,1) = <strong>−10 dB</strong> bulunur; eksi işareti zayıflamayı gösterir.`,
      `<strong>Tersine hesap:</strong> Bir zayıflatıcının değeri −6 dB olarak verilmişse gerilim 10<sup>−6 ÷ 20</sup> = 0,501 katına, güç 10<sup>−6 ÷ 10</sup> = 0,251 katına düşer.`,
    ] },
    { h: 'Ezberlemeye değer dB değerleri', ul: [
      `<strong>0 dB:</strong> değişim yok, oran 1.`,
      `<strong>3 dB:</strong> güç yaklaşık 2 kat, gerilim yaklaşık 1,41 kat.`,
      `<strong>6 dB:</strong> güç yaklaşık 4 kat, gerilim yaklaşık 2 kat.`,
      `<strong>10 dB:</strong> güç 10 kat, gerilim yaklaşık 3,16 kat.`,
      `<strong>20 dB:</strong> güç 100 kat, gerilim 10 kat.`,
      `<strong>30 dB:</strong> güç 1000 kat, gerilim yaklaşık 31,6 kat.`,
      `<strong>40 dB:</strong> güç 10 000 kat, gerilim 100 kat.`,
      `Eksi işaretli değerler aynı oranların tersidir: −3 dB güçte yarı, −20 dB gerilimde onda bir.`,
    ] },
    { h: 'dB\'nin türevleri: dBm, dBV, dBi, dB SPL', p: [
      `dB'nin sonuna eklenen harfler sabit bir referansı gösterir ve değeri mutlak hâle getirir. <strong>dBm</strong> 1 miliwatta, <strong>dBW</strong> 1 watta, <strong>dBV</strong> 1 volta, <strong>dBu</strong> yaklaşık 0,775 volta göre ölçümdür. Anten kazancında kullanılan <strong>dBi</strong> her yöne eşit yayan kuramsal bir antene, <strong>dBd</strong> ise yarım dalga dipole göredir.`,
      `Ses seviyesi için kullanılan dB SPL de aynı mantıkla, insan kulağının duyma eşiği kabul edilen bir ses basıncına göre 20 log formülüyle hesaplanır. Bu sayfadaki araç referansı siz verdiğiniz için bunların hepsinde oran hesabı yapabilir; ancak gürültü ölçümlerindeki frekans ağırlıklandırmaları (dBA gibi) ayrı bir konudur ve burada hesaplanmaz.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Gerilim oranı için 10 log, güç oranı için 20 log kullanmak. Sonuç iki kat yanlış çıkar.`,
      `Giriş ve çıkışı farklı birimlerde yazmak. Biri miliwatt, diğeri watt ise önce aynı birime çevirin.`,
      `dB değerlerini çarpmak. Art arda katlarda dB değerleri toplanır.`,
      `"İki kat ses" ile "iki kat güç"ü karıştırmak. Gücü ikiye katlamak 3 dB'dir, ancak algılanan ses yüksekliğinin iki katına çıkması için genellikle yaklaşık 10 dB'lik artış gerektiği kabul edilir.`,
      `Empedanslar farklıyken gerilim kazancını güç kazancı sanmak.`,
    ] },
    { h: 'Sınırlar', p: [
      `Logaritma yalnızca pozitif sayılar için tanımlı olduğundan giriş ve çıkış değerleri sıfırdan büyük olmalıdır; sıfır çıkış eksi sonsuz dB'ye karşılık gelir. Sonuçlar iki ondalık basamakla, oranlar altı anlamlı basamakla gösterilir. Hesap bilgilendirme amaçlıdır; ölçüm cihazı belirsizliği ve empedans uyumsuzluğu gibi etkenler hesaba katılmaz.`,
    ] },
  ],
  faq: [
    ['3 dB kaç kat demektir?', `Güçte yaklaşık 2 kat (tam değer 1,995), gerilimde yaklaşık 1,41 kat demektir. −3 dB ise gücün yarıya, gerilimin yaklaşık 0,707 katına düşmesidir.`],
    ['Güç için neden 10, gerilim için neden 20 ile çarpılır?', `Güç gerilimin karesiyle orantılıdır. Logaritmada kare almak 2 ile çarpmaya dönüştüğü için gerilim ve akım oranlarında katsayı 20 olur; böylece aynı devre için iki hesap aynı dB değerini verir.`],
    ['Negatif dB ne anlama gelir?', `Çıkışın girişten küçük olduğunu, yani zayıflama ya da kayıp bulunduğunu gösterir. −10 dB gücün onda birine düştüğü anlamına gelir.`],
    ['20 dB kazanç kaç kat yükseltme eder?', `Gerilimde 10 kat, güçte 100 kat. Araçta "dB değerinden oran hesapla" seçip 20 yazarak her iki oranı görebilirsiniz.`],
    ['Art arda bağlı katların toplam kazancı nasıl bulunur?', `dB değerleri toplanır. 12 dB kazançlı bir ön yükselteç, 2 dB kayıplı bir kablo ve 25 dB kazançlı bir güç katı için toplam 12 − 2 + 25 = 35 dB'dir.`],
    ['dB ile dBm aynı şey mi?', `Hayır. dB iki değer arasındaki oranı, dBm ise 1 miliwatta göre mutlak gücü gösterir. Bir dBm değerine dB eklenebilir ama dB tek başına bir güç değeri vermez.`],
    ['Ses desibeli de bu formülle mi hesaplanır?', `Ses basıncı seviyesi 20 log formülüyle, ses gücü ve şiddeti 10 log formülüyle hesaplanır; mantık aynıdır. Ancak gürültü ölçümlerinde kullanılan ağırlıklandırma eğrileri bu aracın kapsamında değildir.`],
    ['Girdiğim değerler saklanıyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez.`],
  ],
  related: ['dbm-watt-cevir', 'opamp-kazanc-hesapla', 'rc-filtre-kesim-frekansi-hesapla', 'anten-boyu-hesapla', 'elektrik-gucu-hesapla'],
};
