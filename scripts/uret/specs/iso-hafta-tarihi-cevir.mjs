export default {
  slug: 'iso-hafta-tarihi-cevir',
  title: 'ISO Hafta Tarihi Çevirici',
  h1Tail: 'tarih ↔ YYYY-Www-G',
  pageTitle: 'ISO Hafta Tarihi Çevirici – Tarihi ISO 8601 Hafta Biçimine Çevirme',
  description: 'Takvim tarihini ISO 8601 hafta tarihine (2026-W46-7) ya da ISO yıl, hafta ve gün numarasını takvim tarihine çevirin. Hafta aralığı ve yıldaki hafta sayısı da gösterilir.',
  card: 'Tarihi ISO 8601 hafta tarihine (YYYY-Www-G), hafta tarihini takvim tarihine çevirin; hafta aralığını ve 53 haftalı yılları görün.',
  category: 'zaman',
  keywords: ['iso hafta tarihi', 'iso 8601 hafta', 'hafta numarasından tarih bulma', 'iso week date', 'yılın kaçıncı haftası', '53 haftalı yıllar', 'hafta tarihi çevirme', 'W01 hafta'],
  lead: 'Bir takvim tarihini <strong>ISO 8601 hafta tarihi</strong> biçimine (örneğin 2026-W46-7) çevirin ya da ISO yılı, hafta numarası ve gün numarasından takvim tarihini bulun. Araç haftanın Pazartesi–Pazar aralığını ve o ISO yılının 52 mi 53 mü hafta sürdüğünü de gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['tarih', 'Takvim tarihi → ISO hafta tarihi'], ['iso', 'ISO hafta tarihi → Takvim tarihi']] },
    { id: 'tarih', label: 'Takvim tarihi', type: 'date', hint: 'İlk yönde kullanılır.' },
    { id: 'isoYil', label: 'ISO yılı', type: 'number', placeholder: 'Örn. 2026', hint: 'İkinci yönde kullanılır.' },
    { id: 'isoHafta', label: 'Hafta numarası (1–53)', type: 'number', placeholder: 'Örn. 46' },
    { id: 'isoGun', label: 'Haftanın günü', type: 'select', options: [['1', '1 – Pazartesi'], ['2', '2 – Salı'], ['3', '3 – Çarşamba'], ['4', '4 – Perşembe'], ['5', '5 – Cuma'], ['6', '6 – Cumartesi'], ['7', '7 – Pazar']] },
  ],
  compute(v, h) {
    const gunNo = (d) => (d.getUTCDay() + 6) % 7 + 1;
    const utc = (y, m, d) => { const t = new Date(Date.UTC(y, m, d)); t.setUTCFullYear(y); return t; };
    const birinciPazartesi = (y) => { const d4 = utc(y, 0, 4); return h.gunEkle(d4, 1 - gunNo(d4)); };
    const isoBilgi = (d) => {
      const g = gunNo(d);
      const per = h.gunEkle(d, 4 - g);
      const yil = per.getUTCFullYear();
      const hafta = Math.floor(h.gunFarki(utc(yil, 0, 1), per) / 7) + 1;
      return { yil, hafta, g };
    };
    const haftaSayisi = (y) => isoBilgi(utc(y, 11, 28)).hafta;
    let d;
    if (v.yon === 'iso') {
      const y = h.int(v.isoYil, 'ISO yılı');
      if (y < 1583 || y > 9999) h.err('"ISO yılı" 1583 ile 9999 arasında olmalı.');
      const w = h.int(v.isoHafta, 'Hafta numarası');
      const top = haftaSayisi(y);
      if (w < 1 || w > 53) h.err('"Hafta numarası" 1 ile 53 arasında olmalı.');
      if (w > top) h.err(`${y} ISO yılı ${top} hafta sürer; 53. hafta yoktur. Hafta numarasını kontrol edin.`);
      const g = Number(v.isoGun);
      if (!(g >= 1 && g <= 7)) h.err('Haftanın gününü listeden seçin.');
      d = h.gunEkle(birinciPazartesi(y), (w - 1) * 7 + (g - 1));
    } else {
      d = h.date(v.tarih, 'Takvim tarihi');
      if (d.getUTCFullYear() < 1583) h.err('Takvim tarihi 1583 yılından önce olamaz (Miladi takvim öncesi).');
    }
    const b = isoBilgi(d);
    const ww = String(b.hafta).padStart(2, '0');
    const yyyy = String(b.yil).padStart(4, '0');
    const pzt = h.gunEkle(d, 1 - b.g), paz = h.gunEkle(d, 7 - b.g);
    const isoSatir = ['ISO hafta tarihi', `${yyyy}-W${ww}-${b.g}`];
    const tarihSatir = ['Takvim tarihi', `${h.fmtDate(d)} ${h.gunAdi(d)}`];
    return {
      rows: [
        ...(v.yon === 'iso' ? [tarihSatir, isoSatir] : [isoSatir, tarihSatir]),
        ['Kısa gösterim', `${yyyy}-W${ww}`],
        ['ISO yılı', String(b.yil)],
        ['Hafta numarası', String(b.hafta)],
        ['Haftanın günü', `${b.g} (${h.gunAdi(d)})`],
        ['Hafta aralığı', `${h.fmtDate(pzt)} Pazartesi – ${h.fmtDate(paz)} Pazar`],
        ['ISO yılındaki hafta sayısı', String(haftaSayisi(b.yil))],
      ],
      note: b.yil !== d.getUTCFullYear() ? `Dikkat: bu tarih takvim yılı olarak ${d.getUTCFullYear()} yılındadır, ancak ISO hafta yılı ${b.yil} olarak sayılır.` : 'ISO 8601: hafta Pazartesi başlar; yılın ilk Perşembe gününü içeren hafta 1. haftadır.',
    };
  },
  cases: [
    { in: { yon: 'tarih', tarih: '2026-11-15' }, out: { 'ISO hafta tarihi': '2026-W46-7', 'Takvim tarihi': '15.11.2026 Pazar', 'Kısa gösterim': '2026-W46', 'Hafta numarası': '46', 'Haftanın günü': '7 (Pazar)', 'Hafta aralığı': '09.11.2026 Pazartesi – 15.11.2026 Pazar', 'ISO yılındaki hafta sayısı': '53' } },
    { in: { yon: 'iso', isoYil: '2026', isoHafta: '53', isoGun: '5' }, out: { 'Takvim tarihi': '01.01.2027 Cuma', 'ISO hafta tarihi': '2026-W53-5', 'ISO yılı': '2026' } },
    { in: { yon: 'tarih', tarih: '2021-01-03' }, out: { 'ISO hafta tarihi': '2020-W53-7', 'ISO yılı': '2020', 'ISO yılındaki hafta sayısı': '53' } },
    { in: { yon: 'tarih', tarih: '2024-12-30' }, out: { 'ISO hafta tarihi': '2025-W01-1', 'ISO yılındaki hafta sayısı': '52' } },
    { in: { yon: 'tarih', tarih: '2008-12-29' }, out: { 'ISO hafta tarihi': '2009-W01-1' } },
    { in: { yon: 'tarih', tarih: '2010-01-03' }, out: { 'ISO hafta tarihi': '2009-W53-7' } },
    { in: { yon: 'tarih', tarih: '2026-01-01' }, out: { 'ISO hafta tarihi': '2026-W01-4', 'Hafta aralığı': '29.12.2025 Pazartesi – 04.01.2026 Pazar' } },
    { in: { yon: 'iso', isoYil: '2020', isoHafta: '53', isoGun: '4' }, out: { 'Takvim tarihi': '31.12.2020 Perşembe' } },
    { in: { yon: 'iso', isoYil: '2025', isoHafta: '1', isoGun: '1' }, out: { 'Takvim tarihi': '30.12.2024 Pazartesi', 'ISO hafta tarihi': '2025-W01-1' } },
    { in: { yon: 'iso', isoYil: '2025', isoHafta: '52', isoGun: '7' }, out: { 'Takvim tarihi': '28.12.2025 Pazar' } },
    { in: { yon: 'iso', isoYil: '2025', isoHafta: '53', isoGun: '1' }, error: true },
    { in: { yon: 'tarih', tarih: '' }, error: true },
    { in: { yon: 'iso', isoYil: '2026', isoHafta: '0', isoGun: '1' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden hangi yönde çeviri yapacağınızı seçin.',
    'Takvim tarihinden çeviri için "Takvim tarihi" alanını doldurun; diğer alanları boş bırakabilirsiniz.',
    'Hafta tarihinden çeviri için ISO yılını, hafta numarasını yazın ve haftanın gününü seçin (1 Pazartesi, 7 Pazar).',
    '"Çevir" düğmesine basın. ISO hafta tarihi, takvim tarihi, haftanın Pazartesi–Pazar aralığı ve o yılın hafta sayısı listelenir.',
  ],
  sections: [
    { h: 'ISO hafta tarihi nedir?', p: [
      'ISO 8601, tarih ve saat yazımını ülkeler arasında tek tipleştiren uluslararası standarttır. Bu standart bildiğimiz yıl-ay-gün yazımının yanında bir de <strong>hafta tarihi</strong> tanımlar: yıl, hafta numarası ve haftanın günü. Yazımı <code>YYYY-Www-G</code> biçimindedir; örneğin <code>2026-W46-7</code>, 2026 ISO yılının 46. haftasının 7. günü, yani 15 Kasım 2026 Pazar demektir. Gün belirtilmeden yalnızca hafta kastedildiğinde <code>2026-W46</code> yazılır.',
      'Hafta tarihi özellikle üretim planlama, lojistik, perakende ve proje yönetiminde yaygındır. Avrupa\'daki tedarikçilerle çalışan firmalar "teslimat 46. haftada" gibi ifadelerle sık karşılaşır; ürün etiketlerindeki üretim haftası kodları ve bordro dönemleri de çoğunlukla bu sisteme dayanır.',
    ] },
    { h: 'Kurallar: hafta ne zaman başlar, 1. hafta hangisidir?', ul: [
      'Hafta <strong>Pazartesi</strong> başlar ve Pazar biter; günler 1\'den 7\'ye numaralanır.',
      'Yılın <strong>ilk Perşembe gününü</strong> içeren hafta 1. haftadır. Aynı kural şöyle de söylenir: 4 Ocak\'ı içeren hafta 1. haftadır.',
      'Her hafta bütünüyle tek bir ISO yılına aittir; hafta yıl sınırında bölünmez.',
      'Bir ISO yılı 52 ya da 53 tam haftadan, yani 364 ya da 371 günden oluşur.',
    ] },
    { h: 'ISO yılı ile takvim yılı neden farklı olabilir?', p: [
      'Haftalar bölünmediği için yılbaşı çevresindeki birkaç gün komşu yılın haftasına düşebilir. 1 Ocak Cuma, Cumartesi ya da Pazar gününe geliyorsa o günler önceki ISO yılının son haftasına aittir. Tersine, 29–31 Aralık günleri Pazartesi, Salı ya da Çarşambaya geliyorsa sonraki ISO yılının 1. haftasına girer.',
      'Örnekler: 3 Ocak 2021 Pazar günü takvimde 2021 yılındadır ama ISO hafta tarihi <strong>2020-W53-7</strong>\'dir. 30 Aralık 2024 Pazartesi ise <strong>2025-W01-1</strong> olarak yazılır. 1 Ocak 2026 Perşembe gününe geldiği için 2026\'nın 1. haftası 29 Aralık 2025 Pazartesi günü başlar. Araç, ISO yılı takvim yılından farklı çıktığında sonuç notunda bunu ayrıca belirtir.',
      'Yazılımda bu fark sık görülen bir hata kaynağıdır: tarih biçimlendirirken hafta yılı yerine takvim yılı (ya da tersi) kullanıldığında, aralık sonu ve ocak başındaki kayıtlar yanlış yıla yazılır. Raporlarda hafta numarasını her zaman ISO yılıyla birlikte saklamak gerekir.',
    ] },
    { h: 'Hangi yıllar 53 haftalıdır?', p: [
      'Bir ISO yılı, 1 Ocak Perşembe gününe geliyorsa ya da yıl artık yıl olup 1 Ocak Çarşamba gününe geliyorsa 53 hafta sürer. Bu, kabaca beş altı yılda bir gerçekleşir. Yakın dönemde 2015, 2020 ve 2026 yılları 53 haftalıdır; 2026\'nın 53. haftası 28 Aralık 2026 Pazartesi başlar ve 3 Ocak 2027 Pazar biter. Dolayısıyla 1 Ocak 2027 Cuma günü <strong>2026-W53-5</strong> olarak yazılır.',
      '52 haftalı bir yıl için 53. hafta girilirse araç hata verir. Örneğin 2025 ISO yılı 52 haftadır ve son günü 28 Aralık 2025 Pazar\'dır.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Tarihten hafta numarasına geçmek için tarihin bulunduğu haftanın Perşembe günü bulunur. Bu Perşembe hangi yıldaysa ISO yılı odur; Perşembe\'nin yıl içindeki sıra numarası 7\'ye bölünüp yukarı yuvarlanınca hafta numarası çıkar. 15 Kasım 2026 Pazar için haftanın Perşembesi 12 Kasım\'dır; 12 Kasım 2026 yılın 316. günüdür ve 316 ÷ 7 = 45,14 olduğundan hafta numarası 46\'dır.',
      'Hafta tarihinden takvime dönmek için önce 4 Ocak\'ı içeren haftanın Pazartesi günü bulunur; bu, 1. haftanın başlangıcıdır. Üzerine (hafta − 1) × 7 gün ve (gün − 1) gün eklenir.',
    ] },
    { h: 'Diğer hafta numaralama sistemleriyle farkı', p: [
      'Her "hafta numarası" ISO değildir. ABD\'de yaygın olan sistemde hafta Pazar günü başlar ve 1 Ocak\'ı içeren hafta 1. hafta sayılır; bu yüzden aynı tarih için bir hafta fark çıkabilir. Elektronik tablo programlarında hafta numarası işlevlerinin birden çok türü bulunur ve varsayılan tür genellikle ISO değildir; ISO sonucu için ayrı işlev ya da tür seçeneği kullanılmalıdır. Türkiye\'de takvimlerde ve iş hayatında hafta Pazartesi başladığı için ISO sistemi gündelik kullanıma en yakın olanıdır.',
      'Araç 1583–9999 yılları arasında, Miladi takvime göre çalışır.',
    ] },
  ],
  faq: [
    ['2026-W46-7 ne demek?', '2026 ISO yılının 46. haftasının 7. günü demektir. 7. gün Pazar olduğundan bu tarih 15 Kasım 2026 Pazar gününe karşılık gelir.'],
    ['ISO standardında hafta hangi gün başlar?', 'Pazartesi günü başlar. Pazartesi 1, Pazar 7 numarasını alır.'],
    ['Yılın 1. haftası nasıl belirlenir?', 'Yılın ilk Perşembe gününü içeren hafta 1. haftadır. Bu, 4 Ocak\'ı içeren hafta ile aynıdır. Dolayısıyla 1. hafta en erken 29 Aralık, en geç 4 Ocak Pazartesi günü başlar.'],
    ['Bir yılda 53 hafta olabilir mi?', 'Evet. 1 Ocak Perşembe gününe geliyorsa ya da artık yılda Çarşambaya geliyorsa ISO yılı 53 haftadır. 2020 ve 2026 bunun örnekleridir.'],
    ['1 Ocak her zaman 1. haftada mıdır?', 'Hayır. 1 Ocak Cuma, Cumartesi ya da Pazar ise önceki ISO yılının 52. ya da 53. haftasına aittir. Örneğin 1 Ocak 2027 Cuma günü 2026-W53-5 olarak yazılır.'],
    ['Hafta numarasından haftanın başlangıç tarihini nasıl bulurum?', 'İkinci çeviri yönünü seçin, ISO yılını ve hafta numarasını yazın, günü 1 (Pazartesi) bırakın. Sonuçtaki "Hafta aralığı" satırı haftanın Pazartesi ve Pazar tarihlerini birlikte verir.'],
    ['Başka bir programda farklı hafta numarası görüyorum, neden?', 'Büyük olasılıkla o program haftayı Pazar günü başlatan ya da 1 Ocak\'ı içeren haftayı 1. hafta sayan bir sistem kullanıyordur. ISO dışındaki sistemlerde yıl başı ve sonunda bir haftalık fark oluşabilir.'],
    ['Girdiğim tarihler saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; tarih bilgisi sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hafta-numarasi', 'hangi-gun-hesapla', 'yilin-kacinci-gunu', 'hafta-farki-hesapla', 'julyen-gun-hesapla', 'tarih-ekle-cikar'],
};
