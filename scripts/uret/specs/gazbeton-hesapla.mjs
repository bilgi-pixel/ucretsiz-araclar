export default {
  slug: 'gazbeton-hesapla',
  title: 'Gazbeton (Ytong) Hesaplama',
  h1Tail: 'duvar için kaç blok?',
  pageTitle: 'Gazbeton Hesaplama – Duvar İçin Kaç Adet Blok Gerekir?',
  description: 'Duvar uzunluğu, yüksekliği ve blok ölçülerine göre gereken gazbeton blok adedini hesaplayın. Kapı pencere boşluklarını düşün, fire payını ve duvar hacmini görün.',
  card: 'Duvar ölçüleri ve blok boyutuna göre gereken gazbeton adedini, metrekare başına blok sayısını ve hacmi bulun.',
  category: 'insaat',
  keywords: ['gazbeton hesaplama', 'ytong hesaplama', 'kaç adet gazbeton gerekir', '1 metrekare kaç gazbeton', 'gazbeton metreküp hesaplama', 'gazbeton duvar hesabı', 'gazbeton blok adedi'],
  lead: `Öreceğiniz duvarın uzunluğunu, yüksekliğini ve kullanacağınız blok ölçüsünü girin; araç kapı ve pencere boşluklarını düşerek <strong>kaç adet gazbeton blok</strong> gerektiğini, metrekareye düşen blok sayısını ve duvarın metreküp hacmini hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Duvar uzunluğu (m)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'yukseklik', label: 'Duvar yüksekliği (m)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'bosluk', label: 'Kapı ve pencere boşlukları (m²)', type: 'number', value: '0' },
    { id: 'blokBoy', label: 'Blok uzunluğu (cm)', type: 'number', value: '60' },
    { id: 'blokYuk', label: 'Blok yüksekliği (cm)', type: 'number', value: '25' },
    { id: 'kalinlik', label: 'Blok kalınlığı (cm)', type: 'number', value: '20', hint: 'Duvar kalınlığıdır; adedi değil hacmi etkiler.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const H = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const bos = h.nonneg(v.bosluk, 'Kapı ve pencere boşlukları');
    const bb = h.pos(v.blokBoy, 'Blok uzunluğu');
    const by = h.pos(v.blokYuk, 'Blok yüksekliği');
    const bk = h.pos(v.kalinlik, 'Blok kalınlığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    const brut = L * H;
    if (bos >= brut) h.err('Boşluk alanı duvar alanından küçük olmalı; kapı ve pencere ölçülerini kontrol edin.');
    const net = brut - bos;
    const m2Adet = 10000 / (bb * by);
    const firesiz = net * m2Adet;
    const adet = Math.ceil(firesiz * (1 + fire / 100) - 1e-9);
    const blokHacim = bb * by * bk / 1e6;
    return {
      rows: [
        ['Gereken blok (fire dahil)', h.fmt(adet, 0) + ' adet'],
        ['Firesiz blok sayısı', h.fmt(firesiz, 1) + ' adet'],
        ['Net duvar alanı', h.fmt(net, 2) + ' m²'],
        ['Metrekare başına blok', h.fmt(m2Adet, 2) + ' adet/m²'],
        ['Duvar hacmi', h.fmt(net * bk / 100, 3) + ' m³'],
        ['Sipariş hacmi (fire dahil)', h.fmt(adet * blokHacim, 3) + ' m³'],
      ],
      note: 'İnce derzli (yapıştırıcılı) örgü varsayılır; birkaç milimetrelik derz kalınlığı hesaba katılmaz. Lento, hatıl ve U blok gibi özel elemanlar ayrıca hesaplanmalıdır.',
    };
  },
  cases: [
    { in: { uzunluk: '10', yukseklik: '3', bosluk: '0', blokBoy: '60', blokYuk: '25', kalinlik: '20', fire: '0' }, out: { 'Gereken blok (fire dahil)': '200 adet', 'Net duvar alanı': '30 m²', 'Metrekare başına blok': '6,67 adet/m²', 'Duvar hacmi': '6 m³' } },
    { in: { uzunluk: '10', yukseklik: '3', bosluk: '0', blokBoy: '60', blokYuk: '25', kalinlik: '20', fire: '5' }, out: { 'Gereken blok (fire dahil)': '210 adet', 'Firesiz blok sayısı': '200 adet', 'Sipariş hacmi (fire dahil)': '6,3 m³' } },
    { in: { uzunluk: '5', yukseklik: '2,8', bosluk: '2', blokBoy: '60', blokYuk: '25', kalinlik: '20', fire: '5' }, out: { 'Gereken blok (fire dahil)': '84 adet', 'Net duvar alanı': '12 m²', 'Duvar hacmi': '2,4 m³' } },
    { in: { uzunluk: '4', yukseklik: '2,5', bosluk: '0', blokBoy: '60', blokYuk: '20', kalinlik: '10', fire: '5' }, out: { 'Gereken blok (fire dahil)': '88 adet', 'Firesiz blok sayısı': '83,3 adet', 'Metrekare başına blok': '8,33 adet/m²', 'Duvar hacmi': '1 m³' } },
    { in: { uzunluk: '20', yukseklik: '2,7', bosluk: '6', blokBoy: '60', blokYuk: '25', kalinlik: '15', fire: '10' }, out: { 'Gereken blok (fire dahil)': '352 adet', 'Net duvar alanı': '48 m²', 'Duvar hacmi': '7,2 m³' } },
    { in: { uzunluk: '3', yukseklik: '2', bosluk: '6', blokBoy: '60', blokYuk: '25', kalinlik: '20', fire: '5' }, error: true },
    { in: { uzunluk: '', yukseklik: '3' }, error: true },
  ],
  howto: [
    'Örülecek duvarın toplam uzunluğunu ve yüksekliğini metre olarak yazın. Birden fazla duvar varsa uzunlukları toplayın.',
    'Kapı ve pencere boşluklarının toplam alanını metrekare olarak girin; yoksa 0 bırakın.',
    'Kullanacağınız bloğun uzunluk, yükseklik ve kalınlığını santimetre olarak yazın. Varsayılan 60 × 25 × 20 cm sık rastlanan bir ölçüdür.',
    'Kesim ve kırılma kayıpları için fire payını belirleyin; düz duvarlarda %5, çok köşeli ve boşluklu işlerde daha yüksek tutun.',
    '"Hesapla" düğmesine basın; blok adedi, duvar alanı ve sipariş hacmi sonuç kutusunda görünür.',
  ],
  sections: [
    { h: 'Gazbeton adedi nasıl hesaplanır?', p: [
      `Hesabın mantığı, duvarın net alanını tek bir bloğun ön yüz alanına bölmektir. Önce brüt alan bulunur: <strong>uzunluk × yükseklik</strong>. Bundan kapı ve pencere boşlukları düşülür. Bir bloğun duvarda kapladığı yüz alanı, blok uzunluğu ile blok yüksekliğinin çarpımıdır; 60 cm × 25 cm'lik blok 0,15 m² yer kaplar. Dolayısıyla <strong>1 m² duvara 1 ÷ 0,15 = 6,67 adet</strong> blok gider.`,
      `Blok kalınlığı adet sayısını değiştirmez; yalnızca duvarın kalınlığını ve dolayısıyla hacmini belirler. 10 cm'lik bölme duvar bloğu ile 25 cm'lik dış duvar bloğunun yüz ölçüleri aynıysa metrekareye giden adet de aynıdır. Fark, sipariş edilen metreküpte ve elbette fiyatta ortaya çıkar.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `10 m uzunluğunda, 3 m yüksekliğinde boşluksuz bir duvar 60 × 25 × 20 cm bloklarla örülecek olsun. Alan 10 × 3 = 30 m², metrekare başına 6,67 adetle firesiz ihtiyaç 30 ÷ 0,15 = 200 adet çıkar. %5 fire payıyla 210 adet sipariş edilir. Duvarın hacmi 30 × 0,20 = 6 m³, fire dahil sipariş hacmi ise 210 × 0,03 = 6,3 m³ olur.`,
      `İkinci örnek: 5 m × 2,8 m ölçüsündeki bir iç duvarda 2 m²'lik bir kapı boşluğu var. Net alan 14 − 2 = 12 m², firesiz 80 adet, %5 fireyle 84 adet blok gerekir. Duvar hacmi 12 × 0,20 = 2,4 m³'tür.`,
    ] },
    { h: 'Neden derz payı düşülmüyor?', p: [
      `Tuğla ve briket duvarlarda bloklar arasına yaklaşık bir santimetre kalınlığında harç konur ve bu derz, metrekareye giden adet sayısını gözle görülür biçimde azaltır. Gazbeton ise ölçü hassasiyeti yüksek üretilen bir malzemedir ve genellikle özel yapıştırıcısıyla, yalnızca birkaç milimetrelik <strong>ince derzle</strong> örülür. Bu kadar ince bir derzin adet sayısına etkisi fire payının içinde kaybolur; bu nedenle araç derzi ayrıca hesaba katmaz.`,
      `Bloklar kalın harçla örülecekse (bu yöntem ısı yalıtımını zayıflattığı için üreticilerce genellikle önerilmez) blok uzunluğuna ve yüksekliğine derz kalınlığını ekleyerek yazabilirsiniz: 1 cm derz için 60 yerine 61, 25 yerine 26 girmek yeterlidir.`,
    ] },
    { h: 'Sık kullanılan blok ölçülerinde metrekare başına adet', ul: [
      '<strong>60 × 25 cm:</strong> yüz alanı 0,15 m² → 6,67 adet/m²',
      '<strong>60 × 20 cm:</strong> yüz alanı 0,12 m² → 8,33 adet/m²',
      '<strong>60 × 30 cm:</strong> yüz alanı 0,18 m² → 5,56 adet/m²',
      '<strong>50 × 25 cm:</strong> yüz alanı 0,125 m² → 8 adet/m²',
      'Kalınlıklar üreticiye göre değişmekle birlikte bölme duvarlarda ince, dış duvarlarda kalın bloklar tercih edilir; satın almadan önce üreticinin güncel ürün listesindeki ölçüleri doğrulayın.',
    ] },
    { h: 'Adet mi, metreküp mü, palet mi?', p: [
      `Gazbeton satıcıları fiyatı çoğu zaman metreküp ya da palet üzerinden verir. Araçtaki "Sipariş hacmi" satırı, fire dahil adedin metreküp karşılığını göstererek teklifi doğrudan karşılaştırmanızı sağlar. Bir bloğun hacmi üç ölçünün çarpımıdır: 60 × 25 × 20 cm blok 0,03 m³ eder, yani 1 m³ içinde yaklaşık 33 adet bulunur. Aynı yüz ölçüsünde 10 cm kalınlıktaki blok 0,015 m³'tür ve 1 m³'te yaklaşık 67 adet vardır.`,
      `Bir palette kaç blok olduğu kalınlığa ve üreticiye göre değişir; sipariş verirken palet içi adedi satıcıdan öğrenip gereken blok sayısını buna bölün ve yukarı yuvarlayın. Yarım palet satılıp satılmadığını da sorun.`,
    ] },
    { h: 'Fire payı ve hesaba girmeyen kalemler', p: [
      `Gazbeton testereyle kolay kesildiği için kesim artıkları çoğu zaman başka bir yerde değerlendirilebilir; yine de nakliyede kırılan köşeler, pencere kenarlarındaki küçük parçalar ve şaşırtmalı örgüde sıra başlarında gereken yarım bloklar için pay bırakmak gerekir. Düz ve uzun duvarlarda %3–5, çok pencereli cephelerde ve kısa duvarlı planlarda %7–10 yaygın olarak kullanılan değerlerdir.`,
    ], ul: [
      'Kapı ve pencere üstlerindeki lentolar ile hatıl için kullanılan U bloklar adet hesabına dahil değildir.',
      'Yapıştırıcı tüketimi blok kalınlığına ve derz kalınlığına bağlıdır; torba üzerindeki sarfiyat tablosuna göre ayrıca hesaplanır.',
      'İlk sıra genellikle tesviye için normal harç üzerine oturtulur; bu harç ayrı bir kalemdir.',
      'Kolon ve kiriş gibi betonarme elemanların kapladığı alanı duvar uzunluğundan ya da yüksekliğinden düşmeyi unutmayın.',
    ] },
    { h: 'Uyarı', p: [
      `Sonuçlar metraj ve bütçe ön çalışması içindir. Duvar kalınlığının seçimi ısı yalıtımı, ses yalıtımı ve deprem davranışı açısından proje konusudur; taşıyıcı duvar, yüksek bölme duvar ve dış cephe uygulamalarında mimar ve inşaat mühendisinin belirlediği detaylar ile üretici uygulama kılavuzu esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['1 metrekare duvara kaç gazbeton gider?', 'Bloğun yüz ölçüsüne bağlıdır. 60 × 25 cm blokta 6,67 adet, 60 × 20 cm blokta 8,33 adet, 60 × 30 cm blokta 5,56 adet gider. Kalınlık bu sayıyı değiştirmez.'],
    ['1 metreküp gazbeton kaç adet eder?', '1 m³\'ü tek bloğun hacmine bölün. 60 × 25 × 20 cm blok 0,03 m³ olduğundan yaklaşık 33 adet; 60 × 25 × 10 cm blok 0,015 m³ olduğundan yaklaşık 67 adet eder.'],
    ['Kapı ve pencere boşluğunu nasıl girerim?', 'Her boşluğun genişliği ile yüksekliğini çarpıp sonuçları toplayın. 90 × 210 cm bir kapı 1,89 m², 120 × 140 cm bir pencere 1,68 m² eder; ikisi birlikte 3,57 m² yazılır.'],
    ['Blok kalınlığı adet sayısını neden değiştirmiyor?', 'Adet, duvarın yüz alanının bloğun yüz alanına bölünmesiyle bulunur. Kalınlık duvarın derinliğidir; yalnızca hacmi, ağırlığı ve yalıtım değerini etkiler.'],
    ['Birden fazla duvar için nasıl hesap yaparım?', 'Yükseklikleri aynıysa uzunlukları toplayıp tek seferde hesaplayın. Yükseklik ya da blok kalınlığı farklı olan duvarları ayrı ayrı hesaplayıp sonuçları toplayın.'],
    ['Fire payı ne kadar olmalı?', 'Düz duvarlarda %3–5 genellikle yeterlidir. Çok sayıda boşluk, köşe ve kısa duvar varsa %7–10 almak güvenlidir. Blokların nakliye ve istifte kırılma olasılığını da düşünün.'],
    ['Yapıştırıcı miktarını da veriyor mu?', 'Hayır. Sarfiyat ürüne ve blok kalınlığına göre değişir; kullandığınız yapıştırıcının ambalajındaki tüketim değerini net duvar alanıyla ya da hacmiyle çarparak bulabilirsiniz.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; duvar ölçüleriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['tugla-hesapla', 'briket-hesapla', 'duvar-alani-hesapla', 'siva-hesapla', 'mantolama-hesapla'],
};
