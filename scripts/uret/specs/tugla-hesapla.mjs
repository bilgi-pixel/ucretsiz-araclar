export default {
  slug: 'tugla-hesapla',
  title: 'Tuğla Hesaplama',
  h1Tail: 'duvar için tuğla adedi',
  pageTitle: 'Tuğla Hesaplama – Duvar İçin Kaç Adet Tuğla Gerekir?',
  description: 'Duvar ölçülerini, kapı-pencere boşluklarını ve tuğla boyutlarını yazın; derz ve fire payıyla birlikte gereken tuğla adedini ve metrekare başına tuğla sayısını hesaplayın.',
  card: 'Duvar ölçüsü, tuğla boyutu, derz ve fire payına göre kaç adet tuğla gerektiğini hesaplayın.',
  category: 'insaat',
  keywords: ['tuğla hesaplama', '1 metrekare duvara kaç tuğla gider', 'duvar tuğla adedi hesaplama', 'kaç tuğla lazım', 'm2 tuğla hesabı', 'tuğla metraj hesaplama', '13,5 luk tuğla m2 kaç adet'],
  lead: 'Öreceğiniz duvarın uzunluğunu ve yüksekliğini, varsa kapı ve pencere boşluklarını ve kullanacağınız tuğlanın duvar yüzeyinde görünen ölçülerini girin. Araç derz kalınlığını ve fire payını hesaba katarak <strong>kaç adet tuğla almanız gerektiğini</strong> bulur.',
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Duvar uzunluğu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yukseklik', label: 'Duvar yüksekliği (m)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'bosluk', label: 'Kapı ve pencere boşlukları (m²)', type: 'number', value: '0', hint: 'Toplam boşluk alanı; yoksa 0 bırakın.' },
    { id: 'boy', label: 'Tuğla boyu (cm)', type: 'number', value: '19', hint: 'Duvar yüzeyinde yatayda görünen ölçü.' },
    { id: 'en', label: 'Tuğla yüksekliği (cm)', type: 'number', value: '19', hint: 'Duvar yüzeyinde düşeyde görünen ölçü.' },
    { id: 'derz', label: 'Derz kalınlığı (mm)', type: 'number', value: '10' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const u = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const y = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const bos = h.opt(v.bosluk, 0, 'Kapı ve pencere boşlukları');
    if (bos < 0) h.err('Boşluk alanı negatif olamaz.');
    const boy = h.pos(v.boy, 'Tuğla boyu');
    const en = h.pos(v.en, 'Tuğla yüksekliği');
    const derz = h.opt(v.derz, 10, 'Derz kalınlığı');
    if (derz < 0 || derz > 50) h.err('Derz kalınlığı 0 ile 50 mm arasında olmalı.');
    const fire = h.opt(v.fire, 5, 'Fire payı');
    if (fire < 0 || fire > 50) h.err('Fire payı %0 ile %50 arasında olmalı.');
    const brut = u * y;
    const net = brut - bos;
    if (!(net > 1e-9)) h.err('Boşluk alanı duvar alanından küçük olmalı; ölçüleri kontrol edin.');
    const modulM2 = ((boy + derz / 10) / 100) * ((en + derz / 10) / 100);
    const m2Adet = 1 / modulM2;
    const ham = net * m2Adet;
    const adet = Math.ceil(ham - 1e-9);
    const fireli = Math.ceil(ham * (1 + fire / 100) - 1e-9);
    return {
      rows: [
        ['Alınması gereken tuğla (fireli)', h.fmt(fireli, 0) + ' adet'],
        ['Net tuğla adedi (firesiz)', h.fmt(adet, 0) + ' adet'],
        ['Metrekare başına tuğla', h.fmt(m2Adet, 2) + ' adet/m²'],
        ['Net duvar alanı', h.fmt(net, 2) + ' m²'],
        ['Brüt duvar alanı', h.fmt(brut, 2) + ' m²'],
      ],
      note: 'Hesap, tuğlanın duvar yüzeyinde görünen ölçülerine derz kalınlığı eklenerek yapılır ve tek sıra (tek tuğla kalınlığında) duvar içindir. Çift sıra duvarlarda sonucu ikiyle çarpın.',
    };
  },
  cases: [
    { in: { uzunluk: '5', yukseklik: '3', bosluk: '0', boy: '19', en: '19', derz: '10', fire: '5' }, out: { 'Alınması gereken tuğla (fireli)': '394 adet', 'Net tuğla adedi (firesiz)': '375 adet', 'Metrekare başına tuğla': '25 adet/m²', 'Net duvar alanı': '15 m²' } },
    { in: { uzunluk: '10', yukseklik: '2,5', bosluk: '4', boy: '19', en: '8,5', derz: '10', fire: '5' }, out: { 'Alınması gereken tuğla (fireli)': '1.161 adet', 'Net tuğla adedi (firesiz)': '1.106 adet', 'Metrekare başına tuğla': '52,63 adet/m²', 'Net duvar alanı': '21 m²', 'Brüt duvar alanı': '25 m²' } },
    { in: { uzunluk: '4', yukseklik: '2,8', bosluk: '1,8', boy: '29', en: '19', derz: '10', fire: '10' }, out: { 'Alınması gereken tuğla (fireli)': '173 adet', 'Net tuğla adedi (firesiz)': '157 adet', 'Metrekare başına tuğla': '16,67 adet/m²', 'Net duvar alanı': '9,4 m²' } },
    { in: { uzunluk: '6', yukseklik: '2,7', bosluk: '0', boy: '19', en: '13,5', derz: '10', fire: '5' }, out: { 'Alınması gereken tuğla (fireli)': '587 adet', 'Net tuğla adedi (firesiz)': '559 adet', 'Metrekare başına tuğla': '34,48 adet/m²' } },
    { in: { uzunluk: '3', yukseklik: '1', bosluk: '0', boy: '19', en: '5', derz: '10', fire: '0' }, out: { 'Alınması gereken tuğla (fireli)': '250 adet', 'Net tuğla adedi (firesiz)': '250 adet', 'Metrekare başına tuğla': '83,33 adet/m²' } },
    { in: { uzunluk: '2', yukseklik: '2', bosluk: '0', boy: '20', en: '10', derz: '0', fire: '5' }, out: { 'Alınması gereken tuğla (fireli)': '210 adet', 'Net tuğla adedi (firesiz)': '200 adet', 'Metrekare başına tuğla': '50 adet/m²' } },
    { in: { uzunluk: '0', yukseklik: '3', bosluk: '0', boy: '19', en: '19', derz: '10', fire: '5' }, error: true },
    { in: { uzunluk: '2', yukseklik: '2', bosluk: '5', boy: '19', en: '19', derz: '10', fire: '5' }, error: true },
    { in: { uzunluk: '5', yukseklik: 'üç', bosluk: '0', boy: '19', en: '19', derz: '10', fire: '5' }, error: true },
  ],
  howto: [
    'Duvarın uzunluğunu ve yüksekliğini metre olarak yazın. Birden çok duvar örecekseniz uzunlukları toplayıp tek değer olarak girebilirsiniz.',
    'Kapı ve pencere boşluklarının toplam alanını metrekare olarak ekleyin. Örneğin 0,9 × 2,1 m bir kapı 1,89 m² eder.',
    'Tuğlanın duvar yüzeyinde görünen iki ölçüsünü santimetre olarak girin: yatayda görünen boy ve düşeyde görünen yükseklik. Duvarın kalınlığını oluşturan üçüncü ölçü adet hesabına girmez.',
    'Derz kalınlığını ve fire payını gerekirse değiştirin. Varsayılan değerler 10 mm derz ve yüzde 5 firedir.',
    '"Hesapla" düğmesine basın; ilk satırdaki fireli adet, sipariş vermeniz gereken miktardır.',
  ],
  sections: [
    { h: 'Tuğla adedi nasıl hesaplanır?', p: [
      'Hesabın özü, duvar yüzeyinin bir tuğlanın kapladığı alana bölünmesidir. Ancak tuğlalar duvarda yan yana değmez; aralarında harç dolu derzler bulunur. Bu yüzden her tuğlanın kapladığı alan, kendi ölçülerine derz kalınlığı eklenerek bulunur. Buna modül ölçüsü denir.',
    ], ul: [
      '<strong>Net duvar alanı</strong> = uzunluk × yükseklik − boşluklar',
      '<strong>Bir tuğlanın modül alanı</strong> = (boy + derz) × (yükseklik + derz)',
      '<strong>Metrekare başına tuğla</strong> = 1 ÷ modül alanı (m² olarak)',
      '<strong>Net adet</strong> = net duvar alanı × metrekare başına tuğla, yukarı yuvarlanır',
      '<strong>Fireli adet</strong> = net adet × (1 + fire ÷ 100), yukarı yuvarlanır',
    ] },
    { h: 'Çözümlü örnek: 5 × 3 metre duvar', p: [
      'Görünen yüzü 19 × 19 cm olan tuğlayla, 10 mm derzle 5 metre uzunluğunda ve 3 metre yüksekliğinde boşluksuz bir bölme duvar örülecek olsun.',
    ], ol: [
      'Duvar alanı: 5 × 3 = 15 m²',
      'Modül ölçüsü: (19 + 1) × (19 + 1) = 20 × 20 cm = 0,04 m²',
      'Metrekare başına tuğla: 1 ÷ 0,04 = 25 adet',
      'Net adet: 15 × 25 = 375 tuğla',
      'Yüzde 5 fireyle: 375 × 1,05 = 393,75; yukarı yuvarlanınca 394 tuğla',
    ] },
    { h: 'İkinci örnek: boşluklu duvar ve yatık tuğla', p: [
      'Aynı tuğla 8,5 cm\'lik yüzü düşeyde görünecek biçimde yatırılarak örülürse metrekareye çok daha fazla tuğla gider. 10 × 2,5 metrelik, içinde toplam 4 m² kapı ve pencere boşluğu bulunan bir duvar için net alan 25 − 4 = 21 m²\'dir. Modül 20 × 9,5 cm = 0,019 m² olur; metrekareye 52,63 tuğla düşer. Net adet 21 × 52,63 = 1105,3, yani 1106; yüzde 5 fireyle 1161 tuğla gerekir.',
    ] },
    { h: 'Hangi ölçüyü yazmalıyım?', p: [
      'Bir tuğlanın üç ölçüsü vardır ve aynı tuğla farklı yönlerde örülebilir. Adet hesabını belirleyen, tuğlanın duvarın yüzüne bakan iki ölçüsüdür; üçüncü ölçü duvarın kalınlığını oluşturur. Örneğin 19 × 19 × 13,5 cm ölçülerindeki bir yatay delikli tuğla, 13,5 cm\'lik kenarı duvar kalınlığı olacak biçimde örülürse yüzeyde 19 × 19 cm görünür ve metrekareye 25 adet gider. Aynı tuğla 19 cm kalınlığında duvar oluşturacak biçimde çevrilirse yüzeyde 19 × 13,5 cm görünür ve metrekareye yaklaşık 34,5 adet gerekir.',
      'Tuğla ölçüleri üreticiden üreticiye birkaç milimetre değişebilir ve piyasada "8,5\'luk", "13,5\'luk", "19\'luk" gibi adlar duvar kalınlığını ifade eder. En doğru sonuç için alacağınız tuğlayı ölçün ya da üreticinin ürün bilgisindeki ölçüleri kullanın.',
    ] },
    { h: 'Hızlı başvuru: metrekare başına tuğla (10 mm derz)', ul: [
      'Görünen yüz 19 × 19 cm: 25 adet/m²',
      'Görünen yüz 19 × 13,5 cm: yaklaşık 34,5 adet/m²',
      'Görünen yüz 19 × 8,5 cm: yaklaşık 52,6 adet/m²',
      'Görünen yüz 29 × 19 cm: yaklaşık 16,7 adet/m²',
      'Görünen yüz 19 × 5 cm (dolu harman tuğlası, yatık): yaklaşık 83,3 adet/m²',
    ] },
    { h: 'Fire payı ne kadar olmalı?', p: [
      'Nakliye ve indirme sırasında kırılan, duvar sonlarında ve boşluk kenarlarında kesilen tuğlalar fire oluşturur. Düz, uzun ve boşluğu az duvarlarda yüzde 3–5 çoğunlukla yeterlidir. Çok sayıda pencere, köşe, kolon dönüşü ya da eğik kesim içeren işlerde yüzde 7–10 almak daha güvenlidir. Delikli tuğlalar dolu tuğlalara göre daha kolay kırıldığı için elle taşınan ve katlara çıkarılan işlerde payı yüksek tutmak yerinde olur.',
      'Eksik kalan az sayıda tuğla için yeniden nakliye ödemek, birkaç fazla tuğlanın bedelinden pahalıdır. Öte yandan farklı partilerden gelen tuğlalarda ölçü ve renk farkı olabileceğinden, özellikle sıvanmayacak görünür tuğla duvarlarda tüm ihtiyacın tek seferde alınması önerilir.',
    ] },
    { h: 'Boşlukları düşerken dikkat edilecekler', p: [
      'Kapı ve pencere boşluklarını düşmek tuğla sayısını azaltır; ancak boşlukların çevresinde kesim arttığı için fire de artar. Küçük boşlukları (örneğin havalandırma menfezi, küçük banyo penceresi) hiç düşmemek, pratikte fire payının bir bölümünü karşılayan yaygın bir yaklaşımdır. Duvarın içinde kalan kolon ve kirişler tuğla örülmeyen alanlardır; betonarme karkas yapılarda duvar uzunluğunu kolonlar arası net açıklık, yüksekliği ise döşemeden kiriş altına kadar olan net yükseklik olarak ölçün.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç tek sıra duvar için adet hesaplar; harç, lento, hatıl ve bağlantı elemanı miktarlarını vermez. Çift duvar (sandviç duvar) örüyorsanız her sıra için ayrı hesap yapın ya da sonucu ikiyle çarpın. Sonuçlar bilgilendirme ve ön keşif amaçlıdır; taşıyıcı duvarlar, deprem yönetmeliğine uygun bölme duvar detayları ve malzeme seçimi için projenizin mühendisine ya da mimarına danışın.',
    ] },
  ],
  faq: [
    ['1 metrekare duvara kaç tuğla gider?', 'Tuğlanın yüzeyde görünen ölçüsüne bağlıdır. 10 mm derzle 19 × 19 cm görünen yüz için 25 adet, 19 × 13,5 cm için yaklaşık 34,5 adet, 19 × 8,5 cm için yaklaşık 52,6 adet gerekir.'],
    ['Derz kalınlığı sonucu ne kadar etkiler?', 'Derz kalınlaştıkça her tuğlanın kapladığı alan büyür ve adet azalır. 19 × 19 cm tuğlada derzsiz hesap metrekareye 27,7 adet verirken 10 mm derzle 25 adede iner; fark yaklaşık yüzde 10\'dur.'],
    ['Duvar kalınlığını neden sormuyorsunuz?', 'Tek sıra duvarda adet yalnızca yüzey alanına ve tuğlanın yüzeyde görünen ölçülerine bağlıdır. Kalınlık, tuğlayı hangi yüzü görünecek biçimde ördüğünüzle belirlenir; bunu ölçü alanlarına doğru yazmanız yeterlidir.'],
    ['Birden fazla duvarı nasıl hesaplarım?', 'Aynı yükseklikteki duvarların uzunluklarını toplayıp tek uzunluk olarak yazın. Yükseklikler farklıysa her duvarı ayrı hesaplayıp sonuçları toplayın.'],
    ['Kaç palet tuğla sipariş etmeliyim?', 'Paletteki tuğla adedi üreticiye ve tuğla boyutuna göre değişir. Fireli adedi satıcınızın bildirdiği palet adedine bölüp yukarı yuvarlayın.'],
    ['Fire payını sıfır alabilir miyim?', 'Alabilirsiniz ama önerilmez. Taşıma kırıkları ve kesim artıkları her işte olur; fire bırakılmazsa iş sonunda eksik tuğla çıkma olasılığı yüksektir.'],
    ['Bu hesap briket ve gazbeton için de kullanılabilir mi?', 'Mantık aynıdır; blok ölçülerini ve derz kalınlığını yazarsanız adet bulunur. Gazbeton ince yapıştırıcıyla örüldüğü için derz 2–3 mm alınır. Bu malzemeler için sitedeki özel araçlar daha uygun varsayılanlar sunar.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz ölçüler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['briket-hesapla', 'gazbeton-hesapla', 'duvar-alani-hesapla', 'siva-hesapla', 'harc-karisim-hesapla', 'cimento-hesapla'],
};
