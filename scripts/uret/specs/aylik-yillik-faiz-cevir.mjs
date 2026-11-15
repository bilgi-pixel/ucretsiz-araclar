export default {
  slug: 'aylik-yillik-faiz-cevir',
  title: 'Aylık Faizi Yıllık Faize Çevirme',
  h1Tail: 'basit ve bileşik karşılık',
  pageTitle: 'Aylık Faizi Yıllık Faize Çevirme – Basit ve Bileşik Dönüşüm',
  description: 'Aylık faiz oranını yıllığa, yıllık faiz oranını aylığa çevirin. Hem basit (×12, ÷12) hem de bileşik karşılığı ve günlük oranı birlikte görün.',
  card: 'Aylık faiz oranını yıllığa, yıllığı aylığa çevirin; basit ve bileşik karşılıkları yan yana görün.',
  category: 'finans',
  keywords: ['aylık faiz yıllık faize çevirme', 'yıllık faiz aylık faize çevirme', 'aylık faiz yıllık kaç eder', 'yıllık faizden aylık faiz hesaplama', 'faiz oranı çevirme', 'aylık bileşik faiz yıllık', 'faiz dönüştürme'],
  lead: 'Krediler çoğunlukla aylık, mevduat ise yıllık oranla ilan edilir. Bir oranı yazıp yönü seçin; araç <strong>aylık faizin yıllık</strong> ya da yıllık faizin aylık karşılığını hem basit hem bileşik yöntemle hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'oran', label: 'Faiz oranı (%)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ay', 'Aylık → Yıllık'], ['yil', 'Yıllık → Aylık']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.oran, 'Faiz oranı');
    if (x > 100000) h.err('Oran çok büyük; değeri yüzde olarak yazın (örn. 3,5).');
    const r = x / 100;
    if (v.yon === 'yil') {
      const basit = r / 12;
      const bilesik = Math.pow(1 + r, 1 / 12) - 1;
      return {
        rows: [
          ['Aylık faiz (basit, yıllık ÷ 12)', '%' + h.fmt(basit * 100, 4)],
          ['Aylık faiz (bileşik eşdeğer)', '%' + h.fmt(bilesik * 100, 4)],
          ['Günlük faiz (basit, yıllık ÷ 365)', '%' + h.fmt((r / 365) * 100, 5)],
          ['Yıllık oran', '%' + h.fmt(x, 4)],
        ],
        note: 'Basit: aylık = yıllık ÷ 12. Bileşik eşdeğer: aylık = (1 + yıllık)^(1/12) − 1; bu oran 12 ay bileşiklendiğinde tam olarak yıllık oranı verir.',
      };
    }
    if (r > 10) h.err('Aylık oran %1.000\'den büyük olamaz; değeri kontrol edin.');
    const basit = r * 12;
    const bilesik = Math.pow(1 + r, 12) - 1;
    return {
      rows: [
        ['Yıllık faiz (basit, aylık × 12)', '%' + h.fmt(basit * 100, 4)],
        ['Yıllık faiz (bileşik, efektif)', '%' + h.fmt(bilesik * 100, 4)],
        ['Günlük faiz (basit, aylık ÷ 30)', '%' + h.fmt((r / 30) * 100, 5)],
        ['Aylık oran', '%' + h.fmt(x, 4)],
      ],
      note: 'Basit: yıllık = aylık × 12. Bileşik: yıllık = (1 + aylık)^12 − 1; faizin her ay anaparaya eklendiği durumdaki gerçek yıllık orandır.',
    };
  },
  cases: [
    { in: { oran: '1', yon: 'ay' }, out: { 'Yıllık faiz (basit, aylık × 12)': '%12', 'Yıllık faiz (bileşik, efektif)': '%12,6825' } },
    { in: { oran: '12', yon: 'yil' }, out: { 'Aylık faiz (basit, yıllık ÷ 12)': '%1', 'Aylık faiz (bileşik eşdeğer)': '%0,9489' } },
    { in: { oran: '3', yon: 'ay' }, out: { 'Yıllık faiz (basit, aylık × 12)': '%36', 'Yıllık faiz (bileşik, efektif)': '%42,5761', 'Günlük faiz (basit, aylık ÷ 30)': '%0,1' } },
    { in: { oran: '60', yon: 'yil' }, out: { 'Aylık faiz (basit, yıllık ÷ 12)': '%5', 'Aylık faiz (bileşik eşdeğer)': '%3,9944' } },
    { in: { oran: '2,5', yon: 'ay' }, out: { 'Yıllık faiz (basit, aylık × 12)': '%30', 'Yıllık faiz (bileşik, efektif)': '%34,4889' } },
    { in: { oran: '0', yon: 'ay' }, out: { 'Yıllık faiz (basit, aylık × 12)': '%0', 'Yıllık faiz (bileşik, efektif)': '%0' } },
    { in: { oran: '36,5', yon: 'yil' }, out: { 'Günlük faiz (basit, yıllık ÷ 365)': '%0,1' } },
    { in: { oran: '50', yon: 'yil' }, out: { 'Aylık faiz (bileşik eşdeğer)': '%3,4366' } },
    { in: { oran: '-2', yon: 'ay' }, error: true },
    { in: { oran: 'yüzde üç', yon: 'ay' }, error: true },
  ],
  howto: [
    '"Faiz oranı" alanına elinizdeki oranı yüzde olarak yazın; ondalık için virgül kullanabilirsiniz (örn. 3,29).',
    'Yazdığınız oran aylıksa "Aylık → Yıllık", yıllıksa "Yıllık → Aylık" yönünü seçin.',
    '"Çevir" düğmesine basın. İlk satır basit (doğrudan çarpma ya da bölme) karşılığı, ikinci satır bileşik karşılığı gösterir.',
    'Hangi satırı kullanacağınıza aşağıdaki açıklamalara göre karar verin: sözleşme oranları için basit, gerçek yıllık maliyet ya da getiri için bileşik sonuç geçerlidir.',
  ],
  sections: [
    { h: 'İki farklı dönüşüm yöntemi neden var?', p: [
      'Aylık bir oranı yıllığa çevirmenin iki yolu vardır ve ikisi de yerine göre doğrudur. <strong>Basit (nominal) dönüşümde</strong> aylık oran 12 ile çarpılır: aylık %3, yıllık %36 eder. Bu, faizin faiz kazanmadığı varsayımıdır ve bankaların "yıllık akdi faiz" olarak ilan ettiği oran genellikle bu şekilde bulunur.',
      '<strong>Bileşik (efektif) dönüşümde</strong> ise her ay işleyen faizin anaparaya eklendiği ve sonraki aylarda onun da faiz ürettiği kabul edilir: <strong>yıllık = (1 + aylık)<sup>12</sup> − 1</strong>. Aylık %3 için (1,03)<sup>12</sup> = 1,425761, yani yıllık %42,5761 bulunur. Bir borcun ya da yatırımın bir yılda gerçekten yüzde kaç büyüdüğünü bu oran gösterir.',
    ] },
    { h: 'Yıllık faizi aylığa çevirme', p: [
      'Ters yönde de iki yöntem vardır. Basit yöntemde yıllık oran 12\'ye bölünür: yıllık %60, aylık %5 eder. Bir bankanın yıllık nominal oranla ilan ettiği mevduatın ya da kredinin aylık dönem faizini bulmak için bu bölme kullanılır.',
      'Bileşik eşdeğer ise "hangi aylık oran, 12 ay üst üste bileşiklendiğinde bu yıllık oranı verir?" sorusunun yanıtıdır: <strong>aylık = (1 + yıllık)<sup>1/12</sup> − 1</strong>. Yıllık %60 için 1,60\'ın on ikinci dereceden kökü 1,039944\'tür; eşdeğer aylık oran %3,9944 olur. Yıllık enflasyonun ya da yıllık hedef getirinin aylık karşılığını ararken bu yöntem kullanılmalıdır; 12\'ye bölmek aylık oranı olduğundan yüksek gösterir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Kredi teklifi:</strong> Banka aylık %2,5 faiz öneriyor. Basit yıllık karşılığı 2,5 × 12 = %30\'dur. Bileşik karşılığı (1,025)<sup>12</sup> − 1 = %34,4889\'dur. Sözleşmede yıllık akdi faiz %30 olarak yazsa da borcun yıllık efektif faiz yükü %34,49 dolayındadır (vergi ve masraflar hariç).',
      '<strong>Örnek 2 – Mevduat:</strong> Yıllık %12 nominal faizli bir hesabın aylık dönem faizi 12 ÷ 12 = %1\'dir. Öte yandan yıl sonunda tam %12 büyüme sağlayacak aylık bileşik oran yalnızca %0,9489\'dur; çünkü %1\'i her ay bileşiklendirirseniz yıl sonunda %12 değil %12,6825 elde edersiniz.',
      '<strong>Örnek 3 – Yıllık hedefi aylığa bölmek:</strong> Yılda %50 büyüme hedefleyen bir işletmenin her ay yakalaması gereken büyüme 50 ÷ 12 = %4,17 değil, bileşik hesapla %3,4366\'dır.',
    ] },
    { h: 'Hangi durumda hangi sonucu kullanmalı?', ul: [
      '<strong>Kredi sözleşmesindeki yıllık oranı bulmak:</strong> Basit sonuç (aylık × 12). Bankalar yıllık akdi faizi bu şekilde gösterir.',
      '<strong>Kredinin ya da kredi kartı borcunun gerçek yıllık yükünü görmek:</strong> Bileşik sonuç.',
      '<strong>Yıllık ilan edilen mevduat faizinin bir aylık getirisini bulmak:</strong> Basit sonuç (yıllık ÷ 12); bankalar dönem faizini gün ya da ay oranında böler.',
      '<strong>Yıllık enflasyon, büyüme ya da getiri oranının aylık ortalamasını bulmak:</strong> Bileşik eşdeğer sonuç.',
      '<strong>İki farklı teklifi karşılaştırmak:</strong> Her ikisini de bileşik yıllık orana çevirip kıyaslayın.',
    ] },
    { h: 'Hızlı başvuru tablosu: aylık oranın yıllık karşılıkları', ul: [
      'Aylık %1 → basit %12, bileşik %12,6825',
      'Aylık %1,5 → basit %18, bileşik %19,5618',
      'Aylık %2 → basit %24, bileşik %26,8242',
      'Aylık %2,5 → basit %30, bileşik %34,4889',
      'Aylık %3 → basit %36, bileşik %42,5761',
      'Aylık %4 → basit %48, bileşik %60,1032',
      'Aylık %5 → basit %60, bileşik %79,5856',
    ], p: [
      'Tabloda görüldüğü gibi oran yükseldikçe basit ve bileşik sonuç arasındaki makas hızla açılır. Aylık %1\'de fark bir puanın altındayken aylık %5\'te yaklaşık 20 puana çıkar.',
    ] },
    { h: 'Günlük oran satırı', p: [
      'Araç ek olarak basit günlük oranı da verir: aylık oran 30\'a, yıllık oran 365\'e bölünür. Bu değer, gün hesabıyla işleyen gecikme ya da ara dönem faizlerini kabaca tahmin etmek içindir. Bankalar ve sözleşmeler 360 günlük yıl ya da gerçek takvim günü kullanabilir; kesin hesapta sözleşmedeki gün esasına bakın.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Dönüşümler yalnızca faiz oranını kapsar. Kredilerde faiz üzerinden alınan vergi ve fonlar, tahsis ücreti ve sigorta; mevduatta stopaj hesaba katılmaz. Bu kalemler eklendiğinde gerçek maliyet artar, net getiri azalır. Bileşik sonuç, oranın 12 ay boyunca değişmediğini varsayar. Sonuçlar bilgilendirme amaçlıdır; borçlanma ya da yatırım kararlarında kurumun verdiği resmi oran ve ödeme planını esas alın, gerekirse uzmana danışın.',
    ] },
  ],
  faq: [
    ['Aylık %3 faiz yıllık kaç eder?', 'Basit hesapla 3 × 12 = %36 eder. Faizin her ay anaparaya eklendiği bileşik hesapla ise (1,03) üzeri 12 eksi 1 = %42,5761 eder.'],
    ['Yıllık %60 faiz aylık kaç eder?', 'Basit hesapla 60 ÷ 12 = %5\'tir. On iki ay bileşiklendiğinde tam %60 veren eşdeğer aylık oran ise %3,9944\'tür.'],
    ['Basit mi bileşik mi, hangisi doğru?', 'İkisi farklı soruların yanıtıdır. Sözleşmelerde ve ilanlarda geçen nominal yıllık oran basit yöntemle bulunur. Bir yılda paranın gerçekte ne kadar büyüdüğünü ya da borcun ne kadar arttığını ise bileşik oran gösterir.'],
    ['Bankalar yıllık faizi aylık faizden nasıl hesaplıyor?', 'Kredilerde ilan edilen yıllık akdi faiz genellikle aylık oranın 12 katıdır. Bunun yanında tüm masrafları ve bileşik etkiyi içeren yıllık maliyet oranı ayrıca gösterilir; karşılaştırmada bu ikinci orana bakmak daha doğrudur.'],
    ['Yıllık enflasyonu aylığa çevirmek için 12\'ye bölebilir miyim?', 'Kabaca fikir verir ama doğru değildir; çünkü fiyat artışları birbirinin üzerine biner. Doğrusu bileşik eşdeğer orandır: yıllık %50 için aylık ortalama 50 ÷ 12 = %4,17 değil, %3,4366\'dır.'],
    ['Üç aylık ya da altı aylık oranı da çevirebilir miyim?', 'Bu sayfa aylık ve yıllık oranlar içindir. Üç aylık oranı yıllığa çevirmek için aynı mantıkla basit hesapta 4 ile çarpar, bileşik hesapta (1 + oran) üzeri 4 eksi 1 işlemini yaparsınız. Farklı bileşiklenme sıklıkları için efektif faiz aracını kullanabilirsiniz.'],
    ['Sonuçlar neden dört ondalık basamakla gösteriliyor?', 'Faiz oranlarında küçük farklar büyük tutarlarda ve uzun vadelerde anlamlı hale gelir. Dört ondalık, banka ödeme planlarındaki hassasiyetle uyumludur; sondaki gereksiz sıfırlar gösterilmez.'],
    ['Yazdığım oran bir yere kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; girdiğiniz değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['efektif-faiz-hesapla', 'bilesik-faiz-hesapla', 'faiz-hesapla', 'gunluk-faiz-hesapla', 'kredi-hesapla', 'mevduat-faizi-hesapla'],
};
