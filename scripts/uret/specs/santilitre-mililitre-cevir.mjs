export default {
  slug: 'santilitre-mililitre-cevir',
  title: 'Santilitre Mililitre Çevirici',
  h1Tail: 'cL ↔ mL',
  pageTitle: 'Santilitre Mililitre Çevirici – cL Kaç mL, mL Kaç cL Hesaplama',
  description: 'Santilitreyi mililitreye, mililitreyi santilitreye çevirin. 1 cL = 10 mL eşitliğiyle çalışır; şişe etiketlerindeki 33 cL, 70 cL gibi değerleri litreyle birlikte gösterir.',
  card: 'Santilitreyi mililitreye, mililitreyi santilitreye çevirin; şişe etiketlerindeki cL değerlerini litre karşılığıyla okuyun.',
  category: 'birim',
  keywords: ['santilitre mililitre çevirme', '1 cl kaç ml', 'cl ml hesaplama', '33 cl kaç ml', '70 cl kaç litre', 'santilitre nedir', 'ml kaç cl'],
  lead: 'Santilitre ile mililitre arasında çeviri yapın. Santilitre litrenin yüzde biri, mililitre binde biridir; bu yüzden <strong>1 cL = 10 mL</strong> eder. Araç litre ve desilitre karşılıklarını da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 33' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['cm', 'Santilitre → Mililitre'], ['mc', 'Mililitre → Santilitre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const ml = v.yon === 'mc' ? x : x * 10;
    const mlSatir = ['Mililitre', h.fmt(ml, 4) + ' mL'];
    const clSatir = ['Santilitre', h.fmt(ml / 10, 5) + ' cL'];
    return {
      rows: [
        v.yon === 'mc' ? clSatir : mlSatir,
        v.yon === 'mc' ? mlSatir : clSatir,
        ['Desilitre', h.fmt(ml / 100, 6) + ' dL'],
        ['Litre', h.fmt(ml / 1000, 6) + ' L'],
      ],
      note: '1 cL = 10 mL = 0,1 dL = 0,01 L. Çeviri onluk sisteme dayandığı için tamdır.',
    };
  },
  cases: [
    { in: { deger: '33', yon: 'cm' }, out: { 'Mililitre': '330 mL', 'Litre': '0,33 L' } },
    { in: { deger: '50', yon: 'mc' }, out: { 'Santilitre': '5 cL', 'Litre': '0,05 L' } },
    { in: { deger: '70', yon: 'cm' }, out: { 'Mililitre': '700 mL', 'Litre': '0,7 L' } },
    { in: { deger: '4', yon: 'cm' }, out: { 'Mililitre': '40 mL', 'Desilitre': '0,4 dL' } },
    { in: { deger: '250', yon: 'mc' }, out: { 'Santilitre': '25 cL', 'Desilitre': '2,5 dL' } },
    { in: { deger: '2,5', yon: 'cm' }, out: { 'Mililitre': '25 mL' } },
    { in: { deger: '75', yon: 'cm' }, out: { 'Mililitre': '750 mL', 'Litre': '0,75 L' } },
    { in: { deger: '33cl', yon: 'cm' }, error: true },
    { in: { deger: '-5', yon: 'mc' }, error: true },
  ],
  howto: [
    '"Değer" alanına etikette ya da tarifte gördüğünüz sayıyı yazın; "cl" ya da "ml" kısaltmasını eklemeyin.',
    '"Çeviri yönü" listesinden santilitreden mililitreye ya da mililitreden santilitreye seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılıktır; desilitre ve litre değerleri altında görünür.',
    'Birden fazla değeri karşılaştıracaksanız her sonucu "Sonucu kopyala" ile notlarınıza aktarabilirsiniz.',
  ],
  sections: [
    { h: 'Santilitre nedir?', p: [
      'Santilitre, litrenin yüzde biridir ve "cL" ya da "cl" olarak kısaltılır. "Santi" ön eki yüzde bir anlamına gelir; santimetrenin metreye oranı neyse santilitrenin litreye oranı da odur. Bir litrede 100 santilitre vardır.',
      'Mililitre ise litrenin binde biridir. İki birim arasında on kat fark bulunur: bir santilitre on mililitreye eşittir. Metrik sistemde litrenin alt katları sırasıyla desilitre (onda bir), santilitre (yüzde bir) ve mililitredir (binde bir). Her basamak bir öncekinin onda biri olduğundan çeviri yalnızca virgülü kaydırmaktan ibarettir.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Santilitreden mililitreye geçerken 10 ile çarpılır: <strong>mL = cL × 10</strong>. Mililitreden santilitreye geçerken 10\'a bölünür: <strong>cL = mL ÷ 10</strong>.',
      '<strong>Örnek 1:</strong> Etiketinde 33 cL yazan bir şişe kaç mililitredir? 33 × 10 = 330 mL, yani 0,33 litre. Türkiye\'deki kutu içeceklerde aynı hacim 330 mL olarak yazılır.',
      '<strong>Örnek 2:</strong> 70 cL\'lik bir şişe 70 × 10 = 700 mL, yani 0,7 litredir. 75 cL\'lik şişe ise 750 mL, yani 0,75 litre eder.',
      '<strong>Örnek 3:</strong> Bir içecek tarifi 4 cL şurup istiyor. 4 × 10 = 40 mL eder. Tersine, ölçü kabınızda 50 mL çizgisi varsa bu 50 ÷ 10 = 5 cL\'dir.',
    ] },
    { h: 'Santilitre nerelerde kullanılır?', p: [
      'Santilitre Türkiye\'de gündelik konuşmada pek geçmez, ancak ambalajlarda ve yabancı kaynaklarda sık görülür. Avrupa ülkelerinin çoğunda içecek şişeleri ve kutuları hacimlerini santilitre ile belirtir: 25 cL, 33 cL, 50 cL, 70 cL, 75 cL ve 100 cL en yaygın boylardır. İthal bir ürünün üzerinde "75 cl" gördüğünüzde bunun 750 mL olduğunu bilmek, yerli ürünlerle hacim ve fiyat karşılaştırması yapmanızı sağlar.',
      'Avrupa kökenli içecek ve kokteyl tariflerinde de ölçüler santilitre ile verilir; Amerikan tarifleri aynı miktarları sıvı ons ile yazar. Kafe ve restoranlarda bardak ile kadeh hacimleri, barmen ölçekleri ve porsiyon standartları da sıklıkla santilitre üzerinden tanımlanır. Parfüm ve kozmetikte ise mililitre tercih edilir.',
    ] },
    { h: 'Etiket boylarının karşılıkları', ul: [
      '<strong>2 cL</strong> = 20 mL',
      '<strong>4 cL</strong> = 40 mL',
      '<strong>20 cL</strong> = 200 mL (bir su bardağı)',
      '<strong>25 cL</strong> = 250 mL (çeyrek litre)',
      '<strong>33 cL</strong> = 330 mL',
      '<strong>50 cL</strong> = 500 mL (yarım litre)',
      '<strong>70 cL</strong> = 700 mL',
      '<strong>75 cL</strong> = 750 mL',
      '<strong>100 cL</strong> = 1.000 mL = 1 L',
      '<strong>150 cL</strong> = 1.500 mL = 1,5 L',
    ] },
    { h: 'Santilitre, desilitre ve mililitreyi karıştırmamak', p: [
      'Litrenin alt katlarının kısaltmaları birbirine çok benzer: dL, cL ve mL. Tek harflik fark, sonucu on ya da yüz kat değiştirir. Tahlil sonuçlarında gördüğünüz "mg/dL" ifadesindeki dL desilitredir ve 100 mL\'ye karşılık gelir; santilitre ile ilgisi yoktur. Bir tarifte "5 cl" yerine "5 ml" okumak ise miktarı onda bire düşürür.',
      'Karışıklığı önlemenin kolay yolu, ön ekleri uzunluk birimleriyle eşleştirmektir. Desimetre, santimetre ve milimetre metrenin sırasıyla onda, yüzde ve binde biridir; desilitre, santilitre ve mililitre de litrenin aynı kesirleridir. Bir santimetrenin on milimetre olduğunu hatırlıyorsanız, bir santilitrenin on mililitre olduğunu da hatırlarsınız.',
    ] },
    { h: 'Ölçü kabıyla santilitre ölçmek', p: [
      'Mutfaktaki dereceli kapların çoğu mililitre çizgilidir. Santilitre ile verilmiş bir tarifi uygularken değeri önce mililitreye çevirmek en pratik yoldur. 2 cL gibi küçük miktarlar için ölçü kaşıkları kullanılabilir: ölçü olarak kabul edilen yemek kaşığı yaklaşık 15 mL, tatlı kaşığı yaklaşık 5 mL\'dir; dolayısıyla 2 cL (20 mL) yaklaşık dört tatlı kaşığına denk gelir. Ev kaşıklarının hacmi değişebildiği için bu değerler yaklaşıktır.',
    ] },
    { h: 'Sınırlar', p: [
      'Çeviri tam eşitliğe dayandığından yuvarlama hatası içermez; sonuçlar gereksiz sıfırlar atılarak gösterilir. Araç negatif değer kabul etmez ve yalnızca sayı girilmesini bekler; "33cl" gibi birim ekli yazımlar hata verir. ABD ve İngiliz ölçü birimleri (sıvı ons, pint) için sitedeki ilgili çeviricileri kullanın.',
      'Etiketlerde yazan hacim, ambalajın anma hacmidir; dolum sırasında izin verilen küçük sapmalar nedeniyle şişenin içindeki gerçek miktar birkaç mililitre farklı olabilir. Bu fark çeviriden değil, dolum toleransından kaynaklanır.',
    ] },
  ],
  faq: [
    ['1 cL kaç mL eder?', '1 santilitre 10 mililitre eder. Santilitre litrenin yüzde biri, mililitre binde biri olduğu için aralarında on kat fark vardır.'],
    ['33 cL kaç mL eder?', '33 cL, 330 mL\'dir ve 0,33 litreye eşittir. Standart kutu içecek boyudur.'],
    ['70 cL kaç litredir?', '70 cL, 0,7 litre yani 700 mL\'dir. Santilitre değerini 100\'e bölerek litre karşılığını bulursunuz.'],
    ['1 litre kaç santilitredir?', '1 litre 100 santilitredir. Yarım litre 50 cL, çeyrek litre 25 cL eder.'],
    ['cL ile cc aynı şey midir?', 'Hayır. cL santilitredir ve 10 mL eder; cc ise santimetreküptür ve 1 mL\'ye eşittir. Yani 1 cL, 10 cc\'dir.'],
    ['Santilitre neden Türkiye\'de az kullanılır?', 'Türkiye\'de ambalaj ve tariflerde mililitre ve litre yerleşmiştir. Santilitre daha çok Avrupa ülkelerinin etiketleme alışkanlığıdır; ithal ürünlerde bu yüzden karşımıza çıkar.'],
    ['Desilitre kaç santilitredir?', '1 desilitre 10 santilitre, yani 100 mililitredir. Desilitre litrenin onda biridir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['litre-mililitre-cevir', 'cc-ml-cevir', 'ml-sivi-ons-cevir', 'tatli-kasigi-ml-cevir', 'pint-litre-cevir', 'birim-donustur'],
};
