export default {
  slug: 'titrasyon-hesapla',
  title: 'Titrasyon Hesaplama',
  h1Tail: 'asit-baz nötrleşmesi',
  pageTitle: 'Titrasyon Hesaplama – Asit Baz Derişimi ve Sarfiyat Hacmi',
  description: 'Asit-baz titrasyonunda bilinmeyen derişimi ya da harcanan hacmi hesaplayın. Değerlikleri hesaba katan Ma·Va·na = Mb·Vb·nb eşitliğiyle çalışır.',
  card: 'Asit-baz titrasyonunda bilinmeyen derişimi ya da sarfiyat hacmini, asit ve baz değerliklerini hesaba katarak bulun.',
  category: 'bilim',
  keywords: ['titrasyon hesaplama', 'titrasyon formülü', 'nötrleşme hesaplama', 'asit baz titrasyonu', 'eşdeğerlik noktası', 'sarfiyat hesaplama', 'bilinmeyen derişim bulma'],
  lead: 'Asit-baz titrasyonunda eşdeğerlik noktasındaki dengeyi kullanarak <strong>bilinmeyen derişimi ya da hacmi</strong> bulun. Asidin verdiği H⁺ ve bazın verdiği OH⁻ sayısını ayrı ayrı girebildiğiniz için sülfürik asit ya da kalsiyum hidroksit gibi çok değerlikli maddelerde de doğru sonuç alırsınız.',
  button: 'Hesapla',
  inputs: [
    { id: 'bilinmeyen', label: 'Bulunacak değer', type: 'select', options: [['asitM', 'Asit derişimi (M)'], ['bazM', 'Baz derişimi (M)'], ['asitV', 'Asit hacmi (mL)'], ['bazV', 'Baz hacmi (mL)']] },
    { id: 'asitM', label: 'Asit derişimi (mol/L)', type: 'number', placeholder: 'Örn. 0,1' },
    { id: 'asitV', label: 'Asit hacmi (mL)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'asitN', label: 'Asidin değerliği (H⁺ sayısı)', type: 'number', value: '1', hint: 'HCl, HNO₃ için 1; H₂SO₄ için 2; H₃PO₄ tam nötrleşmede 3.' },
    { id: 'bazM', label: 'Baz derişimi (mol/L)', type: 'number', placeholder: 'Örn. 0,1' },
    { id: 'bazV', label: 'Baz hacmi (mL)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'bazN', label: 'Bazın değerliği (OH⁻ sayısı)', type: 'number', value: '1', hint: 'NaOH, KOH için 1; Ca(OH)₂, Ba(OH)₂ için 2. Bulunacak değerin alanı boş bırakılabilir.' },
  ],
  compute(v, h) {
    const b = ['asitM', 'bazM', 'asitV', 'bazV'].includes(v.bilinmeyen) ? v.bilinmeyen : 'asitM';
    const na = h.posint(v.asitN, 'Asidin değerliği');
    const nb = h.posint(v.bazN, 'Bazın değerliği');
    if (na > 6 || nb > 6) h.err('Değerlik 1 ile 6 arasında olmalı; H⁺ ya da OH⁻ sayısını kontrol edin.');
    const ad = { asitM: 'Asit derişimi', bazM: 'Baz derişimi', asitV: 'Asit hacmi', bazV: 'Baz hacmi' };
    const x = {};
    for (const k of Object.keys(ad)) if (k !== b) x[k] = h.pos(v[k], ad[k]);
    let mmol;
    if (b === 'asitM') { mmol = x.bazM * x.bazV * nb; x.asitM = mmol / (x.asitV * na); }
    else if (b === 'asitV') { mmol = x.bazM * x.bazV * nb; x.asitV = mmol / (x.asitM * na); }
    else if (b === 'bazM') { mmol = x.asitM * x.asitV * na; x.bazM = mmol / (x.bazV * nb); }
    else { mmol = x.asitM * x.asitV * na; x.bazV = mmol / (x.bazM * nb); }
    const birim = b.endsWith('M') ? ' M' : ' mL';
    return {
      rows: [
        [ad[b], h.fmt(x[b], 4) + birim],
        ['Nötrleşen H⁺ = OH⁻ miktarı', h.fmt(mmol, 4) + ' mmol'],
        ['Asit miktarı', h.fmt(x.asitM * x.asitV, 4) + ' mmol'],
        ['Baz miktarı', h.fmt(x.bazM * x.bazV, 4) + ' mmol'],
        ['Asit normalitesi', h.fmt(x.asitM * na, 4) + ' N'],
        ['Baz normalitesi', h.fmt(x.bazM * nb, 4) + ' N'],
        ['Eşdeğerlik noktasında toplam hacim', h.fmt(x.asitV + x.bazV, 4) + ' mL'],
      ],
      note: 'Eşdeğerlik noktasında Ma × Va × na = Mb × Vb × nb kabul edilir. Dönüm noktası ile eşdeğerlik noktası arasındaki küçük fark hesaba katılmaz.',
    };
  },
  cases: [
    { in: { bilinmeyen: 'asitM', asitV: '25', asitN: '1', bazM: '0,1', bazV: '20', bazN: '1' }, out: { 'Asit derişimi': '0,08 M', 'Nötrleşen H⁺ = OH⁻ miktarı': '2 mmol', 'Eşdeğerlik noktasında toplam hacim': '45 mL' } },
    { in: { bilinmeyen: 'asitM', asitV: '10', asitN: '2', bazM: '0,2', bazV: '30', bazN: '1' }, out: { 'Asit derişimi': '0,3 M', 'Nötrleşen H⁺ = OH⁻ miktarı': '6 mmol', 'Asit miktarı': '3 mmol', 'Asit normalitesi': '0,6 N' } },
    { in: { bilinmeyen: 'bazV', asitM: '0,1', asitV: '50', asitN: '1', bazM: '0,25', bazN: '1' }, out: { 'Baz hacmi': '20 mL' } },
    { in: { bilinmeyen: 'bazM', asitM: '0,1', asitV: '30', asitN: '2', bazV: '40', bazN: '1' }, out: { 'Baz derişimi': '0,15 M', 'Nötrleşen H⁺ = OH⁻ miktarı': '6 mmol' } },
    { in: { bilinmeyen: 'asitV', asitM: '0,5', asitN: '1', bazM: '0,1', bazV: '25', bazN: '2' }, out: { 'Asit hacmi': '10 mL', 'Baz normalitesi': '0,2 N' } },
    { in: { bilinmeyen: 'bazV', asitM: '0,1', asitV: '10', asitN: '3', bazM: '0,1', bazN: '1' }, out: { 'Baz hacmi': '30 mL' } },
    { in: { bilinmeyen: 'asitM', asitV: '25', asitN: '1', bazM: '', bazV: '20', bazN: '1' }, error: true },
    { in: { bilinmeyen: 'bazV', asitM: '0,1', asitV: '-5', asitN: '1', bazM: '0,1', bazN: '1' }, error: true },
    { in: { bilinmeyen: 'asitM', asitV: '25', asitN: '0', bazM: '0,1', bazV: '20', bazN: '1' }, error: true },
  ],
  howto: [
    '"Bulunacak değer" listesinden neyi aradığınızı seçin: asidin ya da bazın derişimi, ya da eşdeğerlik noktasına ulaşmak için gereken hacim.',
    'Bilinen üç büyüklüğü yazın: derişimleri mol/L, hacimleri mililitre olarak. Aranan değerin kutusunu boş bırakabilirsiniz; dolu olsa bile hesaba katılmaz.',
    'Asidin ve bazın değerliklerini girin. Tek hidrojenli asitler ve tek hidroksitli bazlar için varsayılan 1 değeri doğrudur.',
    '"Hesapla" düğmesine basın. İlk satır aradığınız değerdir; altında nötrleşen iyon miktarı, asit ve baz miktarları ile normaliteler listelenir.',
    'Birden fazla deneme yaptıysanız büret okumalarının ortalamasını alıp hacim olarak onu girin.',
  ],
  sections: [
    { h: 'Titrasyon nedir, hesabın mantığı ne?', p: [
      'Titrasyon, derişimi bilinmeyen bir çözeltinin miktarını, derişimi kesin olarak bilinen bir başka çözeltiyle (ayarlı çözelti ya da titrant) tepkimeye sokarak belirleme yöntemidir. Asit-baz titrasyonunda erlendeki numuneye büretten damla damla titrant eklenir; indikatörün renk değiştirdiği ya da pH metrenin sıçrama gösterdiği an tepkimenin tamamlandığı kabul edilir.',
      'Tepkimenin tamamlandığı noktaya <strong>eşdeğerlik noktası</strong> denir. Bu noktada asitten gelen H⁺ iyonlarının mol sayısı, bazdan gelen OH⁻ iyonlarının mol sayısına eşittir. Bütün hesap bu tek eşitliğe dayanır.',
    ] },
    { h: 'Titrasyon formülü', p: [
      'Asidin derişimi M<sub>a</sub>, hacmi V<sub>a</sub> ve verdiği H⁺ sayısı n<sub>a</sub>; bazın derişimi M<sub>b</sub>, hacmi V<sub>b</sub> ve verdiği OH⁻ sayısı n<sub>b</sub> ise eşdeğerlik noktasında şu bağıntı geçerlidir:',
      '<strong>M<sub>a</sub> × V<sub>a</sub> × n<sub>a</sub> = M<sub>b</sub> × V<sub>b</sub> × n<sub>b</sub></strong>',
      'Derişim ile değerliğin çarpımı normalite olduğundan aynı eşitlik N<sub>a</sub>V<sub>a</sub> = N<sub>b</sub>V<sub>b</sub> biçiminde de yazılır. Hacimler her iki tarafta aynı birimde olduğu sürece mililitre kullanmak sorun yaratmaz; mol/L ile mL çarpımı milimol verir. Araç dört büyüklükten hangisini seçerseniz onu yalnız bırakıp hesaplar.',
    ] },
    { h: 'Çözümlü örnek 1: HCl derişimini bulma', p: [
      'Derişimi bilinmeyen 25 mL hidroklorik asit çözeltisi, 0,1 M sodyum hidroksit ile titre ediliyor ve dönüm noktasına 20 mL baz harcanarak ulaşılıyor. Her iki maddenin değerliği 1\'dir. Bazdan gelen OH⁻ miktarı 0,1 × 20 = 2 mmol\'dür; asitteki H⁺ de 2 mmol olmalıdır. Asit derişimi 2 ÷ 25 = <strong>0,08 M</strong> bulunur. Eşdeğerlik noktasında erlendeki toplam hacim 25 + 20 = 45 mL\'dir.',
    ] },
    { h: 'Çözümlü örnek 2: sülfürik asit ve değerlik etkisi', p: [
      '10 mL sülfürik asit numunesi için 0,2 M NaOH çözeltisinden 30 mL harcanıyor. Bazdan gelen OH⁻ miktarı 0,2 × 30 = 6 mmol\'dür. Sülfürik asit molekül başına iki H⁺ verdiğinden 6 mmol H⁺, 3 mmol asit demektir. Derişim 3 ÷ 10 = <strong>0,3 M</strong> olur; normalite ise 0,6 N\'dir.',
      'Değerlik göz ardı edilip M<sub>a</sub>V<sub>a</sub> = M<sub>b</sub>V<sub>b</sub> yazılsaydı sonuç 0,6 M çıkardı, yani gerçek değerin iki katı. Titrasyon sorularındaki en yaygın hata budur. Tersi durumda, örneğin 0,5 M HCl ile 25 mL 0,1 M Ca(OH)₂ nötrleştirilirken bazın değerliği 2 alınır: 0,1 × 25 × 2 = 5 mmol OH⁻ için 5 ÷ 0,5 = 10 mL asit gerekir.',
    ] },
    { h: 'Deneyde doğruluğu etkileyen noktalar', ul: [
      '<strong>Büret okuması:</strong> başlangıç ve bitiş okumaları göz hizasında, sıvı yüzeyinin alt çizgisinden yapılır; harcanan hacim ikisinin farkıdır.',
      '<strong>İndikatör seçimi:</strong> kuvvetli asit-kuvvetli baz titrasyonunda fenolftalein ya da metil oranj kullanılabilir; zayıf asit-kuvvetli baz titrasyonunda dönüm aralığı bazik bölgede olan fenolftalein daha uygundur.',
      '<strong>Tekrar:</strong> genellikle birbirine yakın en az iki-üç okuma alınır ve ortalaması hesaba girer; ilk kaba deneme çoğu zaman atılır.',
      '<strong>Erlene eklenen su:</strong> numuneyi seyreltmek için eklenen saf su mol sayısını değiştirmez; V<sub>a</sub> olarak pipetle aldığınız numune hacmini girin.',
      '<strong>Ayarlı çözelti:</strong> sodyum hidroksit havadan karbondioksit çektiği için derişimi zamanla değişebilir; hassas işlerde titrant birincil standartla ayarlanır.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç, tepkimenin eşdeğerlik noktasında tam olarak gerçekleştiğini ve girdiğiniz değerliklerin o tepkime için geçerli olduğunu varsayar. Fosforik asit gibi çok protonlu asitlerde kullanılan indikatöre göre birinci, ikinci ya da üçüncü eşdeğerlik noktasına ulaşılır; değerliği buna göre 1, 2 ya da 3 seçmelisiniz. Zayıf asit ve bazlarda eşdeğerlik noktasının pH değeri 7 değildir, ancak mol dengesi yine aynı eşitlikle kurulur.',
      'Sayfa asit-baz nötrleşmesine göre düzenlenmiştir; redoks ya da kompleksleşme titrasyonlarında tepkime katsayıları farklı olabilir. Sonuçlar eğitim ve hesap kontrolü amaçlıdır; laboratuvar raporlarında kullandığınız analiz yönteminin gerektirdiği düzeltmeleri ayrıca uygulayın.',
    ] },
  ],
  faq: [
    ['Titrasyonda M1V1 = M2V2 her zaman doğru mudur?', 'Yalnızca asit ve bazın değerlikleri eşitse doğrudur. Genel biçim Ma × Va × na = Mb × Vb × nb eşitliğidir; H₂SO₄ ya da Ca(OH)₂ gibi iki değerlikli maddelerde değerlik çarpanı unutulursa sonuç iki kat hatalı çıkar.'],
    ['Eşdeğerlik noktası ile dönüm noktası aynı şey mi?', 'Eşdeğerlik noktası asit ve bazın kimyasal olarak tam nötrleştiği kuramsal noktadır. Dönüm noktası ise indikatörün renk değiştirdiği, gözle saptanan andır. Uygun indikatör seçildiğinde ikisi arasındaki fark çok küçüktür ve hesapta ihmal edilir.'],
    ['Hacmi litre olarak yazmam gerekir mi?', 'Hayır, alanlar mililitre bekler. Eşitliğin iki tarafında aynı hacim birimi kullanıldığı için sonuç değişmez; mol/L ile mL çarpımı milimol olarak gösterilir.'],
    ['Numuneye saf su eklemem sonucu değiştirir mi?', 'Değiştirmez. Titrasyon mol sayılarını karşılaştırır; erlene eklenen su asidin mol sayısını artırıp azaltmaz. Asit hacmi olarak pipetle aldığınız özgün numune hacmini girin.'],
    ['Asidin ve bazın değerliğini nasıl belirlerim?', 'Asit için tepkimede verilen H⁺ sayısını, baz için OH⁻ sayısını alın: HCl 1, H₂SO₄ 2, NaOH 1, Ba(OH)₂ 2. Asetik asit gibi organik asitlerde yalnızca asidik hidrojen sayılır.'],
    ['Katı bir numunenin saflığını bu araçla bulabilir miyim?', 'Dolaylı olarak evet. Önce titrasyonla numunedeki asit ya da bazın milimol sayısını bulun ("Asit miktarı" ya da "Baz miktarı" satırı), bunu mol kütlesiyle çarparak gramı hesaplayın ve tarttığınız numune kütlesine oranlayın.'],
    ['Zayıf asit titrasyonunda da kullanılır mı?', 'Evet. Zayıf asitlerde eşdeğerlik noktasının pH değeri 7\'den farklıdır, ancak nötrleşen mol sayıları yine eşittir. Yalnızca indikatörünüzün dönüm aralığının eşdeğerlik noktasına uygun olmasına dikkat edin.'],
    ['Yazdığım deney verileri bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; girdiğiniz derişim ve hacim değerleri sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['normalite-hesapla', 'molarite-hesapla', 'ph-hesapla', 'seyreltme-hesapla', 'mol-hesapla'],
};
