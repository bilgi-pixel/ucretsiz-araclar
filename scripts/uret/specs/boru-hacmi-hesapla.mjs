export default {
  slug: 'boru-hacmi-hesapla',
  title: 'Boru İçi Su Hacmi Hesaplama',
  h1Tail: 'litre ve metre başına hacim',
  pageTitle: 'Boru İçi Su Hacmi Hesaplama – Boru Kaç Litre Su Alır?',
  description: 'Boru çapı ve uzunluğundan borunun içindeki su hacmini litre olarak hesaplayın. Dış çap ve et kalınlığıyla da çalışır; metre başına hacmi ve su ağırlığını gösterir.',
  card: 'Boru çapı ve uzunluğuna göre borunun içinde kaç litre su olduğunu, metre başına hacmi ve su ağırlığını bulun.',
  category: 'insaat',
  keywords: ['boru hacmi hesaplama', 'boru kaç litre su alır', 'boru içi su hacmi', 'metre başına boru hacmi', 'tesisat su hacmi', 'yerden ısıtma su hacmi', 'boru litre hesabı'],
  lead: 'Bir borunun içine ne kadar su sığdığını hesaplayın. Araç, borunun iç kesit alanını uzunlukla çarpar: <strong>hacim = π × (iç çap ÷ 2)² × uzunluk</strong>. İç çapı bilmiyorsanız dış çap ve et kalınlığını yazmanız yeterlidir.',
  button: 'Hesapla',
  inputs: [
    { id: 'cap', label: 'Boru çapı (mm)', type: 'number', placeholder: 'Örn. 20', hint: 'Et kalınlığı alanı boşsa iç çap, doluysa dış çap kabul edilir.' },
    { id: 'et', label: 'Et kalınlığı (mm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 2', hint: 'Yalnızca dış çapı biliyorsanız doldurun; iç çap = dış çap − 2 × et kalınlığı.' },
    { id: 'uzunluk', label: 'Boru uzunluğu (m)', type: 'number', placeholder: 'Örn. 10' },
  ],
  compute(v, h) {
    const cap = h.pos(v.cap, 'Boru çapı');
    const et = h.opt(v.et, 0, 'Et kalınlığı');
    if (et < 0) h.err('"Et kalınlığı" negatif olamaz.');
    const ic = cap - 2 * et;
    if (!(ic > 0)) h.err('Et kalınlığının iki katı dış çaptan küçük olmalı; değerleri milimetre olarak kontrol edin.');
    const L = h.pos(v.uzunluk, 'Boru uzunluğu');
    const kesitMm2 = Math.PI * ic * ic / 4;
    const litreMetre = kesitMm2 / 1000;
    const litre = litreMetre * L;
    return {
      rows: [
        ['Su hacmi', h.fmt(litre, 3) + ' litre'],
        ['Metreküp karşılığı', h.fmt(litre / 1000, 6) + ' m³'],
        ['Metre başına hacim', h.fmt(litreMetre, 4) + ' litre/m'],
        ['Suyun ağırlığı (yaklaşık)', h.fmt(litre, 3) + ' kg'],
        ['İç çap', h.fmt(ic, 2) + ' mm'],
        ['İç kesit alanı', h.fmt(kesitMm2 / 100, 4) + ' cm²'],
      ],
      note: 'Suyun yoğunluğu 1 kg/litre kabul edilmiştir. Dirsek, vana ve kolektör gibi parçaların hacmi hesaba dahil değildir.',
    };
  },
  cases: [
    { in: { cap: '20', et: '', uzunluk: '10' }, out: { 'Su hacmi': '3,142 litre', 'Metre başına hacim': '0,3142 litre/m', 'İç kesit alanı': '3,1416 cm²' } },
    { in: { cap: '16', et: '2', uzunluk: '100' }, out: { 'Su hacmi': '11,31 litre', 'Metre başına hacim': '0,1131 litre/m', 'İç çap': '12 mm' } },
    { in: { cap: '100', et: '', uzunluk: '1' }, out: { 'Su hacmi': '7,854 litre', 'Metreküp karşılığı': '0,007854 m³', 'Suyun ağırlığı (yaklaşık)': '7,854 kg' } },
    { in: { cap: '110', et: '3,2', uzunluk: '6' }, out: { 'Su hacmi': '50,578 litre', 'İç çap': '103,6 mm', 'Metre başına hacim': '8,4296 litre/m' } },
    { in: { cap: '26', et: '', uzunluk: '50' }, out: { 'Su hacmi': '26,546 litre', 'Metre başına hacim': '0,5309 litre/m' } },
    { in: { cap: '50', et: '', uzunluk: '2,5' }, out: { 'Su hacmi': '4,909 litre' } },
    { in: { cap: '20', et: '10', uzunluk: '5' }, error: true },
    { in: { cap: '', et: '', uzunluk: '5' }, error: true },
  ],
  howto: [
    'Borunun iç çapını milimetre olarak "Boru çapı" alanına yazın. İç çapı biliyorsanız et kalınlığı alanını boş bırakın.',
    'Elinizde yalnızca dış çap varsa (örneğin borunun üzerinde 16×2 yazıyorsa) çapa 16, et kalınlığına 2 yazın; araç iç çapı kendisi bulur.',
    'Borunun toplam uzunluğunu metre olarak girin. Birden fazla aynı çaplı hat varsa uzunlukları toplayıp tek değer olarak yazabilirsiniz.',
    '"Hesapla" düğmesine basın. Toplam su hacmi, metre başına hacim, suyun yaklaşık ağırlığı ve iç kesit alanı görüntülenir.',
  ],
  sections: [
    { h: 'Boru içi hacim formülü', p: [
      'Boru, geometrik olarak içi boş bir silindirdir; içindeki suyun hacmi de iç çapla tanımlanan silindirin hacmidir. Silindir hacmi taban alanı ile yüksekliğin çarpımıdır: <strong>V = π × r² × L</strong>. Burada r iç yarıçap, L boru uzunluğudur. Çap cinsinden yazıldığında formül <strong>V = π × d² ÷ 4 × L</strong> olur.',
      'Birimlere dikkat etmek gerekir. Çap milimetre, uzunluk metre verildiğinde pratik bir kısayol vardır: iç kesit alanını mm² olarak bulup 1000\'e böldüğünüzde doğrudan <strong>metre başına litre</strong> değerini elde edersiniz. Örneğin iç çapı 20 mm olan borunun kesit alanı π × 10² = 314,16 mm²\'dir; bu boru metrede 0,3142 litre su alır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> İç çapı 20 mm, uzunluğu 10 m olan bir hat. Metre başına hacim 0,3142 litre olduğundan toplam hacim 0,3142 × 10 = 3,142 litredir. İçindeki suyun ağırlığı da yaklaşık 3,142 kg\'dır.',
      '<strong>Örnek 2:</strong> Yerden ısıtmada sık kullanılan 16×2 mm borudan 100 m döşenmiş olsun. Dış çap 16 mm, et kalınlığı 2 mm olduğundan iç çap 16 − 2 × 2 = 12 mm\'dir. Kesit alanı π × 6² = 113,1 mm², metre başına hacim 0,1131 litre, 100 metrelik devrenin su hacmi 11,31 litredir.',
      '<strong>Örnek 3:</strong> Dış çapı 110 mm, et kalınlığı 3,2 mm olan 6 metrelik bir pis su borusunun iç çapı 103,6 mm\'dir. Metre başına 8,4296 litre, toplamda 50,578 litre su alır.',
    ] },
    { h: 'İç çap, dış çap ve anma çapı farkı', p: [
      'Hesapta en sık yapılan hata, borunun üzerinde yazan değeri iç çap sanmaktır. Plastik borularda (PPR, PEX, PE, PVC) ölçü çoğunlukla <strong>dış çap × et kalınlığı</strong> biçiminde verilir. Aynı dış çapa sahip iki borunun basınç sınıfı farklıysa et kalınlıkları, dolayısıyla iç çapları ve su hacimleri de farklı olur. Et kalınlığı arttıkça iç çap küçülür.',
      'Çelik borularda kullanılan "yarım parmak", "bir parmak" gibi inç adları ise anma ölçüsüdür; ne iç çapın ne de dış çapın tam karşılığıdır. Bu borularda doğru sonuç için üretici kataloğundaki ya da standart tablosundaki gerçek dış çap ve et kalınlığını kullanın. Elinizde kumpas varsa en güvenilir yöntem iç çapı doğrudan ölçmektir.',
    ] },
    { h: 'Bu hesap nerelerde işe yarar?', ul: [
      '<strong>Kalorifer ve kombi tesisatı:</strong> Sistemdeki toplam su hacmi, genleşme tankı seçiminde ve tesisata eklenecek koruyucu sıvının dozunun belirlenmesinde kullanılır. Boru hacmine radyatör ve kazan hacimleri ayrıca eklenir.',
      '<strong>Yerden ısıtma:</strong> Her devrenin boru uzunluğundan su hacmi bulunur; kolektör başına toplam hacim sistemin doldurulması ve havasının alınması sırasında yol gösterir.',
      '<strong>Sıcak su bekleme süresi:</strong> Kombi ile musluk arasındaki boruda duran soğuk su boşalmadan sıcak su gelmez. Bu hacmi musluğun debisine böldüğünüzde bekleme süresini tahmin edebilirsiniz.',
      '<strong>Bahçe sulama ve damlama hatları:</strong> Hattın dolması için gereken su ve kış öncesi boşaltılacak miktar hesaplanır.',
      '<strong>Havuz ve hidrofor tesisatı:</strong> Kimyasal dozajı ve pompa seçimi için hattaki su miktarı bilinmelidir.',
      '<strong>Taşıma ve askı yükü:</strong> Dolu borunun ağırlığı, boş boru ağırlığına içindeki suyun ağırlığı eklenerek bulunur; kelepçe aralıkları buna göre belirlenir.',
    ] },
    { h: 'İç çapa göre metre başına su hacmi', p: [
      'Aşağıdaki değerler doğrudan formülden hesaplanmıştır ve hızlı tahmin için kullanılabilir.',
    ], ul: [
      '<strong>10 mm</strong> iç çap: 0,0785 litre/m',
      '<strong>12 mm</strong> iç çap: 0,1131 litre/m',
      '<strong>16 mm</strong> iç çap: 0,2011 litre/m',
      '<strong>20 mm</strong> iç çap: 0,3142 litre/m',
      '<strong>25 mm</strong> iç çap: 0,4909 litre/m',
      '<strong>32 mm</strong> iç çap: 0,8042 litre/m',
      '<strong>40 mm</strong> iç çap: 1,2566 litre/m',
      '<strong>50 mm</strong> iç çap: 1,9635 litre/m',
      '<strong>100 mm</strong> iç çap: 7,854 litre/m',
    ], },
    { h: 'Çap iki katına çıkınca hacim dört katına çıkar', p: [
      'Hacim çapın karesiyle orantılıdır. İç çapı 20 mm olan boru metrede 0,3142 litre alırken 40 mm\'lik boru 1,2566 litre, yani tam dört katını alır. Bu ilişki, ana hat ile branşman boruları arasındaki farkı anlamak açısından önemlidir: kısa ama kalın bir ana boru, uzun ama ince bir hattan daha fazla su barındırabilir. Farklı çaplardan oluşan bir tesisatta her çapı ayrı ayrı hesaplayıp sonuçları toplamak gerekir.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç borunun tamamen dolu olduğunu, kesitinin tam daire olduğunu ve suyun yoğunluğunun 1 kg/litre olduğunu kabul eder. Sıcak suda yoğunluk bir miktar düşer; 80 °C civarındaki suyun litresi 1 kg\'dan yaklaşık yüzde üç daha hafiftir. Antifrizli karışımların yoğunluğu ise sudan yüksektir. Yarı dolu akan pis su ve yağmur suyu borularında gerçek su miktarı bu değerin altında kalır. Dirsek, te, vana, kolektör, radyatör ve kazan hacimleri hesaba dahil değildir. Sonuç bilgilendirme amaçlıdır; genleşme tankı, pompa ve basınçlı sistem tasarımı için tesisat mühendisine danışın.',
    ] },
  ],
  faq: [
    ['Boru hacmi nasıl hesaplanır?', 'İç yarıçapın karesi π ile çarpılır, sonra boru uzunluğuyla çarpılır: V = π × r² × L. Çap mm, uzunluk m ise iç kesit alanını (mm²) 1000\'e bölüp uzunlukla çarptığınızda sonuç doğrudan litre çıkar.'],
    ['1 metre boru kaç litre su alır?', 'İç çapa bağlıdır. 12 mm iç çapta 0,1131 litre, 20 mm\'de 0,3142 litre, 25 mm\'de 0,4909 litre, 50 mm\'de 1,9635 litre, 100 mm\'de 7,854 litre su alır.'],
    ['16×2 borunun iç çapı ve hacmi nedir?', '16×2 gösterimi 16 mm dış çap ve 2 mm et kalınlığı demektir. İç çap 12 mm olur ve boru metrede 0,1131 litre su alır; 100 metrelik bir devrede 11,31 litre su bulunur.'],
    ['Hesapta dış çapı kullanırsam ne olur?', 'Hacim olduğundan büyük çıkar. Örneğin 16×2 boruda dış çapla hesap 0,2011 litre/m verir; gerçek değer 0,1131 litre/m\'dir. Aradaki fark yaklaşık yüzde 78\'dir. Bu yüzden et kalınlığı alanını doldurmanız ya da iç çapı yazmanız gerekir.'],
    ['Yerden ısıtma sisteminin toplam su hacmini nasıl bulurum?', 'Her devrenin boru uzunluğunu toplayıp bu araca girin; çıkan değere kolektör, bağlantı boruları ve ısı kaynağının su hacmini ekleyin. Farklı çapta borular varsa her çapı ayrı hesaplayın.'],
    ['Sonuçtaki ağırlık borunun ağırlığını da içeriyor mu?', 'Hayır, yalnızca içindeki suyun yaklaşık ağırlığıdır. Dolu borunun toplam ağırlığı için boş boru ağırlığını ayrıca hesaplayıp bu değere eklemeniz gerekir.'],
    ['İnç ölçülü borularda hangi değeri yazmalıyım?', 'İnç adı anma ölçüsü olduğundan doğrudan milimetreye çevirip yazmak hatalı sonuç verir. Borunun gerçek iç çapını kumpasla ölçün ya da üretici tablosundaki dış çap ve et kalınlığını kullanın.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['boru-agirligi-hesapla', 'su-deposu-hacmi-hesapla', 'tank-doluluk-hesapla', 'hacim-hesapla', 'petek-hesapla'],
};
