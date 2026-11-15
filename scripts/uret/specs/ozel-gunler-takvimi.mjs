export default {
  slug: 'ozel-gunler-takvimi',
  title: 'Doğum Günü ve Özel Günler Takvimi Oluşturma',
  h1Tail: 'her yıl kullanılan yazdırılabilir PDF',
  pageTitle: 'Doğum Günü ve Özel Günler Takvimi Oluştur – Yazdırılabilir PDF',
  description: 'Doğum günleri, yıl dönümleri ve özel günler için yılsız, her yıl kullanılabilen takvimi PDF olarak oluşturun. Kayıtlarınız hazır yazılır; tek sayfa ya da ay ay.',
  card: 'Doğum günlerini ve yıl dönümlerini yazın; aylara göre sıralanmış, her yıl kullanılabilen özel günler takvimini PDF olarak indirin.',
  category: 'planlama',
  pdf: true,
  keywords: ['doğum günü takvimi', 'özel günler takvimi', 'doğum günü listesi şablonu', 'yıl dönümü takvimi', 'sürekli takvim pdf', 'doğum günü çizelgesi', 'yazdırılabilir doğum günü takvimi'],
  lead: 'Ailenizin, arkadaşlarınızın ve çalışma arkadaşlarınızın doğum günlerini, yıl dönümlerini ve diğer özel günleri tek bir <strong>özel günler takvimi</strong>nde toplayın. Kayıtlarınızı "gün.ay ad" biçiminde yazın; aylara dağıtılıp gün sırasına dizilir. Takvimde yıl ve haftanın günü bulunmadığı için aynı sayfayı her yıl kullanabilirsiniz.',
  button: 'Takvimi oluştur',
  inputs: [
    { id: 'kayitlar', label: 'Özel günler (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir kayıt: gün.ay ad\n14.03 Ayşe (doğum günü)\n29.10 Evlilik yıl dönümü\n05.01 Mehmet Amca', hint: 'Biçim: 14.03 Ad. En fazla 120 kayıt, ad başına 28 karakter. Boş bırakırsanız takvim boş satırlarla basılır.', wide: true },
    { id: 'duzen', label: 'Düzen', type: 'select', options: [['tek', 'On iki ay tek sayfada (ay başına 7 satır)'], ['iki', 'Sayfa başına altı ay (ay başına 12 satır)'], ['aylik', 'Her ay ayrı sayfa (her güne bir satır)']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Ailemizin Özel Günleri', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const baslik = (v.baslik || '').trim() || 'Özel Günler Takvimi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const satirlar = h.lines(v.kayitlar);
    if (satirlar.length > 120) h.err('En fazla 120 kayıt yazabilirsiniz.');
    const AYGUN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 29 Şubat doğumlular için şubat 29 gün
    const duzen = v.duzen === 'iki' ? 'iki' : v.duzen === 'aylik' ? 'aylik' : 'tek';
    const kapasite = duzen === 'tek' ? 7 : duzen === 'iki' ? 12 : 31;
    // Kayıtları çöz: "14.03 Ad", "14/3 Ad", "14.03 - Ad"
    const aylar = Array.from({ length: 12 }, () => []);
    satirlar.forEach((s, i) => {
      const e = /^(\d{1,2})\s*[./-]\s*(\d{1,2})\.?\s*[:–-]?\s*(.+)$/.exec(s);
      if (!e) h.err(`${i + 1}. satır anlaşılamadı: "${s.slice(0, 30)}". Biçim "14.03 Ad" olmalı (gün.ay, sonra boşluk ve ad).`);
      const gun = +e[1], ay = +e[2], ad = e[3].trim();
      if (ay < 1 || ay > 12) h.err(`${i + 1}. satırda ay 1 ile 12 arasında olmalı (yazılan: ${ay}).`);
      if (gun < 1 || gun > AYGUN[ay - 1]) h.err(`${i + 1}. satırdaki tarih takvimde yok: ${gun} ${h.ayAdi(ay)}.`);
      if (ad.length > 28) h.err(`${i + 1}. satırdaki ad 28 karakterden uzun; kısaltın.`);
      aylar[ay - 1].push({ gun, ad, sira: i });
    });
    aylar.forEach((a) => a.sort((x, y) => x.gun - y.gun || x.sira - y.sira));
    aylar.forEach((a, mo) => {
      if (duzen !== 'aylik' && a.length > kapasite) h.err(`${h.ayAdi(mo + 1)} ayında ${a.length} kayıt var; bu düzende ay başına en fazla ${kapasite} satır bulunur. Daha geniş bir düzen seçin.`);
      if (duzen === 'aylik') for (let g = 1; g <= 31; g++) if (a.filter((k) => k.gun === g).length > 3) h.err(`${g} ${h.ayAdi(mo + 1)} için üçten fazla kayıt var; aynı güne en fazla üç ad sığar.`);
    });
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const ust = m + 14 * k, tw = W - 2 * m;
    const tepe = (ops, sag, buyuk) => {
      ops.push(['yazi', baslik, m, m + 7 * k, f(buyuk ? 14 : 17), { kalin: true }]);
      ops.push(['yazi', sag, W - m, m + 7 * k, f(buyuk ? 15 : 9.5), buyuk ? { hiza: 'sag', kalin: true, ton: 0.25 } : { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
    };
    const sayfalar = [];
    if (duzen !== 'aylik') {
      const sutun = duzen === 'tek' ? 3 : 2, sira = duzen === 'tek' ? 4 : 3, bosluk = 4 * k, bh = 7 * k;
      const bw = (tw - (sutun - 1) * bosluk) / sutun, byuk = (H - m - ust - (sira - 1) * bosluk) / sira, rh = (byuk - bh) / kapasite;
      for (let s = 0; s < 12 / (sutun * sira); s++) {
        const ops = [];
        tepe(ops, duzen === 'tek' ? 'Her yıl kullanılır' : (s === 0 ? 'Ocak – Haziran' : 'Temmuz – Aralık'));
        for (let j = 0; j < sutun * sira; j++) {
          const mo = s * sutun * sira + j, x = m + (j % sutun) * (bw + bosluk), y = ust + Math.floor(j / sutun) * (byuk + bosluk);
          ops.push(['kutu', x, y, bw, byuk, { cizgi: 0.5 }]);
          ops.push(['kutu', x, y, bw, bh, { dolgu: 0.9, cizgi: 0.5 }]);
          ops.push(['yazi', h.ayAdi(mo + 1), x + 2 * k, y + 5 * k, f(9.5), { kalin: true }]);
          ops.push(['cizgi', x + 9 * k, y + bh, x + 9 * k, y + byuk, { kalinlik: 0.2, ton: 0.7 }]);
          for (let r = 0; r < kapasite; r++) {
            const yy = y + bh + r * rh;
            if (r > 0) ops.push(['cizgi', x, yy, x + bw, yy, { kalinlik: 0.2, ton: 0.75 }]);
            const kay = aylar[mo][r];
            if (kay) {
              ops.push(['yazi', String(kay.gun), x + 7.6 * k, yy + rh / 2 + 1.1 * k, f(8.5), { kalin: true, hiza: 'sag' }]);
              ops.push(['yazi', kay.ad, x + 10.8 * k, yy + rh / 2 + 1.1 * k, f(8)]);
            }
          }
        }
        sayfalar.push(ops);
      }
    } else {
      for (let mo = 0; mo < 12; mo++) {
        const ops = [], gs = AYGUN[mo], rh = (H - m - ust) / gs;
        tepe(ops, h.ayAdi(mo + 1), true);
        ops.push(['kutu', m, ust, 13 * k, H - m - ust, { dolgu: 0.93, cizgi: 0.5 }]);
        ops.push(['kutu', m, ust, tw, H - m - ust, { cizgi: 0.5 }]);
        for (let g = 1; g <= gs; g++) {
          const yy = ust + (g - 1) * rh;
          if (g > 1) ops.push(['cizgi', m, yy, W - m, yy, { kalinlik: 0.2, ton: 0.7 }]);
          ops.push(['yazi', String(g), m + 6.5 * k, yy + rh / 2 + 1.2 * k, f(9), { kalin: true, hiza: 'orta' }]);
          const ad = aylar[mo].filter((q) => q.gun === g).map((q) => q.ad).join(', ');
          if (ad) ops.push(['yazi', ad, m + 16 * k, yy + rh / 2 + 1.2 * k, f(9)]);
        }
        sayfalar.push(ops);
      }
    }
    const toplam = satirlar.length;
    let enDolu = 0;
    aylar.forEach((a, mo) => { if (a.length > aylar[enDolu].length) enDolu = mo; });
    const ilkAy = aylar.findIndex((a) => a.length > 0);
    const rows = [
      ['Sayfa sayısı', `${sayfalar.length} sayfa`],
      ['Hazır yazılan özel gün', toplam ? `${toplam} kayıt` : 'Yok (boş takvim)'],
    ];
    if (toplam) {
      rows.push(['En dolu ay', `${h.ayAdi(enDolu + 1)} (${aylar[enDolu].length} kayıt)`]);
      rows.push(['Yılın ilk özel günü', `${aylar[ilkAy][0].gun} ${h.ayAdi(ilkAy + 1)} – ${aylar[ilkAy][0].ad}`]);
      rows.push(['Kayıt bulunan ay', `${aylar.filter((a) => a.length).length} ay`]);
    }
    rows.push(['Düzen', duzen === 'tek' ? 'On iki ay tek sayfada' : duzen === 'iki' ? 'Sayfa başına altı ay' : 'Her ay ayrı sayfa']);
    rows.push(['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)']);
    return {
      rows,
      note: 'Takvimde yıl bulunmaz; aynı çıktıyı her yıl kullanabilirsiniz. Yazdırırken yönü dikey, ölçeği %100 seçin.',
      pdf: { ad: 'ozel-gunler-takvimi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { kayitlar: '14.03 Ayşe (doğum günü)\n29.10 Evlilik yıl dönümü\n05.01 Mehmet Amca\n02.03 Zeynep' }, out: { 'Sayfa sayısı': '1 sayfa', 'Hazır yazılan özel gün': '4 kayıt', 'En dolu ay': 'Mart (2 kayıt)', 'Yılın ilk özel günü': '5 Ocak – Mehmet Amca', 'Kayıt bulunan ay': '3 ay' }, pdfSayfa: 1 },
    { in: { duzen: 'aylik' }, out: { 'Sayfa sayısı': '12 sayfa', 'Hazır yazılan özel gün': 'Yok (boş takvim)', 'Düzen': 'Her ay ayrı sayfa' }, pdfSayfa: 12 },
    { in: { kayitlar: '29.02 Deniz\n29/2 Ece\n1-12 Kemal', duzen: 'iki', boyut: 'a5' }, out: { 'Sayfa sayısı': '2 sayfa', 'En dolu ay': 'Şubat (2 kayıt)', 'Yılın ilk özel günü': '29 Şubat – Deniz', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 2 },
    { in: { kayitlar: '23.04 Okul gösterisi\n23.04 Ali\n23.04 Elif\n19.05 Can', duzen: 'aylik', boyut: 'a5', baslik: 'Sınıfımızın Günleri' }, out: { 'Hazır yazılan özel gün': '4 kayıt', 'En dolu ay': 'Nisan (3 kayıt)', 'Yılın ilk özel günü': '23 Nisan – Okul gösterisi' }, pdfSayfa: 12 },
    { in: { boyut: 'a5' }, out: { 'Sayfa sayısı': '1 sayfa', 'Düzen': 'On iki ay tek sayfada' }, pdfSayfa: 1 },
    { in: { kayitlar: '31.12 Yılbaşı gecesi\n01.01 Yeni yıl\n15.06 - Selin', duzen: 'iki' }, out: { 'Yılın ilk özel günü': '1 Ocak – Yeni yıl', 'Kayıt bulunan ay': '3 ay', 'En dolu ay': 'Ocak (1 kayıt)' }, pdfSayfa: 2 },
    { in: { kayitlar: '30.02 Olmayan gün' }, error: true },
    { in: { kayitlar: 'Ayşe 14 Mart' }, error: true },
    { in: { kayitlar: '1.5 a\n2.5 b\n3.5 c\n4.5 d\n5.5 e\n6.5 f\n7.5 g\n8.5 h', duzen: 'tek' }, error: true },
    { in: { kayitlar: '14.13 Ayşe' }, error: true },
    { in: { kayitlar: '14.03 Bu ad yirmi sekiz karakterden çok daha uzun bir addır' }, error: true },
  ],
  howto: [
    '"Özel günler" kutusuna her satıra bir kayıt gelecek biçimde yazın: önce gün ve ay (14.03), sonra bir boşluk ve ad. Sıranın önemi yoktur; araç kayıtları aylara dağıtıp gün sırasına dizer.',
    'Elle doldurmak üzere boş bir takvim istiyorsanız kutuyu boş bırakın.',
    'Düzeni seçin: buzdolabına asılacak özet için tek sayfa, daha çok satır için sayfa başına altı ay, kalabalık aileler ve sınıflar için her ay ayrı sayfa.',
    'Kâğıt boyutunu seçin ve isterseniz "Ailemizin Özel Günleri" gibi bir başlık yazın.',
    '"Takvimi oluştur" düğmesine basın, önizlemeyi kontrol edip "PDF indir" ile dosyayı kaydedin ve yazdırın.',
  ],
  sections: [
    { h: 'Yılsız takvim ne demek?', p: [
      'Doğum günleri ve yıl dönümleri her yıl aynı tarihe denk gelir; değişen yalnızca haftanın günüdür. Bu yüzden özel günler takviminde yıl ve gün adı bulunmaz, yalnızca ay ve gün numarası yer alır. Bir kez doldurup astığınız sayfayı yıllarca kullanabilirsiniz; yeni bir bebek, yeni bir gelin ya da yeni bir çalışma arkadaşı eklendiğinde boş satıra elle yazmanız yeterlidir.',
      'Bu takvim, bir duvar takviminin yerini tutmaz; onun yanında durur. Her yıl başında yeni takviminize ya da telefonunuza tarihleri geçirirken bu sayfayı kaynak olarak kullanırsınız.',
    ] },
    { h: 'Üç düzen', ul: [
      '<strong>On iki ay tek sayfada:</strong> sayfa üç sütun ve dört sıra halinde on iki ay kutusuna bölünür. Her kutuda yedi satır vardır; solda gün numarası, sağda ad için yer bulunur. Çekirdek aile ve yakın çevre için yeterlidir, tek bakışta bütün yılı gösterir.',
      '<strong>Sayfa başına altı ay:</strong> ilk sayfada ocak ile haziran, ikinci sayfada temmuz ile aralık bulunur. Her ay kutusunda on iki satır vardır. Geniş aileler ve arkadaş grupları için uygundur; iki sayfayı arkalı önlü bastırabilirsiniz.',
      '<strong>Her ay ayrı sayfa:</strong> on iki sayfalık bir set üretilir. Her sayfada o ayın günleri birden başlayarak alt alta numaralı satırlar halinde dizilir ve her kaydınız kendi gününün satırına yazılır. Aynı güne en fazla üç ad sığar. Sınıf listeleri, dernekler, işyerleri ve müşteri kayıtları için en rahat düzendir.',
    ] },
    { h: 'Kayıtlar nasıl yazılır?', p: [
      'Her satır gün ve ay ile başlar. Ayırıcı olarak nokta, eğik çizgi ya da tire kullanabilirsiniz: <code>14.03 Ayşe</code>, <code>14/3 Ayşe</code> ve <code>14-03 Ayşe</code> aynı kaydı verir. Tarihten sonra gelen her şey ad olarak alınır; parantez içinde kısa bir açıklama ekleyebilirsiniz: <code>29.10 Evlilik yıl dönümü</code>, <code>14.03 Ayşe (doğum günü)</code>. Yıl yazmayın; doğum yılını not etmek isterseniz adın yanına "Ayşe 1990" gibi ekleyebilirsiniz, yaş hesabını o yıl siz yaparsınız.',
      'Örnek: dört kayıt yazdığınızı düşünün: 14 Mart Ayşe, 29 Ekim evlilik yıl dönümü, 5 Ocak Mehmet Amca ve 2 Mart Zeynep. Araç bunları üç aya dağıtır; mart kutusunda önce 2 Mart Zeynep, altında 14 Mart Ayşe görünür. Sonuç tablosunda en dolu ay "Mart (2 kayıt)", yılın ilk özel günü "5 Ocak – Mehmet Amca" olarak yazılır.',
      'Araç, takvimde olmayan tarihleri kabul etmez: 30 Şubat ya da 31 Nisan yazarsanız hangi satırda hata olduğunu bildirir. <strong>29 Şubat</strong> geçerlidir; artık yılda doğanların günü şubat kutusuna 29 olarak yazılır.',
    ] },
    { h: 'Neleri yazabilirsiniz?', ul: [
      'Aile bireylerinin, akrabaların ve arkadaşların doğum günleri.',
      'Evlilik, nişan, tanışma ve işe başlama yıl dönümleri.',
      'Anma günleri ve aile için önemli tarihler.',
      'Her yıl aynı tarihte gelen ödemeler ve yenilemeler: sigorta, abonelik, kira sözleşmesi, araç muayenesi gibi.',
      'Sınıfınızdaki öğrencilerin ya da ekibinizdeki çalışanların doğum günleri.',
      'Evcil hayvanların doğum günleri, aşı ve bakım tarihleri.',
    ] },
    { h: 'Kullanım önerileri', p: [
      'Sayfayı mutfakta, girişte ya da çalışma masasında, her gün gözünüzün değeceği bir yere asın. Her ayın başında o ayın kutusuna bir kez bakmak, hediye almak ya da aramak için yeterli zamanı bırakır. Kutlanacak günden birkaç gün önce hatırlamak istediğiniz kayıtların yanına küçük bir yıldız koyabilirsiniz.',
      'Listeyi aile büyükleriyle birlikte doldurmak, unutulmaya yüz tutmuş tarihleri kayda geçirmenin de iyi bir yoludur. Girdiğiniz kayıt listesini bir metin dosyasında saklarsanız, yeni biri eklendiğinde listeyi yapıştırıp takvimi baştan ve temiz biçimde yeniden oluşturabilirsiniz.',
      'Başkalarının doğum tarihleri kişisel bilgidir. İşyeri ya da sınıf gibi ortak alanlara asılacak bir takvime yalnızca kendi rızasıyla adını yazdıran kişileri eklemek ve doğum yılını yazmamak iyi bir alışkanlıktır.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde yönü <strong>dikey</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. Uzun yıllar kullanılacağı için kalın kâğıda basmak ya da çıktıyı şeffaf dosyaya koymak sayfanın ömrünü uzatır.',
      'En fazla 120 kayıt girilebilir ve her ad 28 karakterle sınırlıdır. Tek sayfa düzeninde ay başına en fazla 7, altı aylık düzende en fazla 12 kayıt sığar; bir ay bu sayıyı aşarsa araç daha geniş bir düzen seçmenizi ister. Hicri takvime göre belirlenen dinî günler gibi tarihi her yıl değişen günler bu takvime uygun değildir. Takvim, hatırlatma göndermez; yalnızca basılı bir başvuru sayfasıdır.',
    ] },
  ],
  faq: [
    ['Doğum günü takvimi ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt istemez ve dilediğiniz kadar takvim oluşturup yazdırabilirsiniz.'],
    ['Takvimde neden yıl ve gün adı yok?', 'Çünkü doğum günleri ve yıl dönümleri her yıl aynı tarihe gelir. Yıl ve haftanın günü yazılmadığı için aynı çıktı yıllarca geçerliliğini korur.'],
    ['Kayıtları hangi biçimde yazmalıyım?', 'Her satıra önce gün ve ay, sonra ad: "14.03 Ayşe". Nokta yerine eğik çizgi ya da tire de kullanabilirsiniz. Satırların sırası önemli değildir; araç tarihe göre sıralar.'],
    ['29 Şubat doğumluları ekleyebilir miyim?', 'Evet. "29.02 Ad" biçiminde yazın; kayıt şubat ayına 29 olarak işlenir. Artık olmayan yıllarda hangi gün kutlanacağına siz karar verirsiniz.'],
    ['Aynı güne birden çok kişi yazabilir miyim?', 'Evet. Tek sayfa ve altı aylık düzenlerde her kayıt ayrı satıra yazılır. Her ay ayrı sayfa düzeninde aynı günün adları virgülle yan yana yazılır ve bir güne en fazla üç ad sığar.'],
    ['Sonradan elle ekleme yapabilir miyim?', 'Evet. Kayıtlardan artan satırlar boş bırakılır. Tek sayfa ve altı aylık düzenlerde boş satıra gün numarasını ve adı elle yazarsınız; aylık düzende her günün satırı zaten hazırdır.'],
    ['Bir ayda çok fazla kayıt varsa ne olur?', 'Seçtiğiniz düzenin ay başına satır sayısı aşılırsa araç hangi ayın sığmadığını bildirir. Altı aylık ya da aylık düzene geçtiğinizde sorun çözülür.'],
    ['Yazdığım adlar ve tarihler bir yere kaydediliyor mu?', 'Hayır. Takvim tarayıcınızın içinde, kendi cihazınızda PDF dosyasına dönüştürülür. Girdiğiniz adlar ve tarihler sunucuya gönderilmez, saklanmaz; sayfayı kapattığınızda silinir.'],
  ],
  related: ['aylik-planlayici', 'yillik-planlayici', 'takvim-olustur', 'haftalik-planlayici', 'yapilacaklar-listesi-olustur'],
};
