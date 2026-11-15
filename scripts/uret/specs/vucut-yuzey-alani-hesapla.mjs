export default {
  slug: 'vucut-yuzey-alani-hesapla',
  title: 'Vücut Yüzey Alanı Hesaplama',
  h1Tail: 'VYA (m²)',
  pageTitle: 'Vücut Yüzey Alanı Hesaplama – Mosteller, Du Bois, Haycock',
  description: 'Boy ve kilodan vücut yüzey alanını (VYA) metrekare olarak hesaplayın. Mosteller, Du Bois ve Haycock formüllerinin sonuçlarını yan yana görün.',
  card: 'Boy ve kilodan vücut yüzey alanını m² olarak bulun; Mosteller, Du Bois ve Haycock sonuçlarını karşılaştırın.',
  category: 'saglik',
  keywords: ['vücut yüzey alanı hesaplama', 'vya hesaplama', 'bsa hesaplama', 'mosteller formülü', 'du bois formülü', 'vücut yüzey alanı m2', 'haycock formülü'],
  lead: 'Boyunuzu ve kilonuzu yazarak <strong>vücut yüzey alanınızı</strong> metrekare cinsinden hesaplayın. Araç, en yaygın kullanılan Mosteller formülünü ana sonuç olarak verir; Du Bois ve Haycock formüllerinin sonuçlarını da karşılaştırma için gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 170' },
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
  ],
  compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    const kilo = h.pos(v.kilo, 'Kilo');
    if (boy < 30 || boy > 250) h.err('Boy 30 ile 250 cm arasında olmalı; metre yerine santimetre yazın (1,70 değil 170).');
    if (kilo < 1 || kilo > 400) h.err('Kilo 1 ile 400 kg arasında olmalı.');
    const mosteller = Math.sqrt(boy * kilo / 3600);
    const dubois = 0.007184 * Math.pow(kilo, 0.425) * Math.pow(boy, 0.725);
    const haycock = 0.024265 * Math.pow(kilo, 0.5378) * Math.pow(boy, 0.3964);
    const ort = (mosteller + dubois + haycock) / 3;
    return {
      rows: [
        ['Vücut yüzey alanı (Mosteller)', h.fix(mosteller, 2) + ' m²'],
        ['Du Bois formülü', h.fix(dubois, 2) + ' m²'],
        ['Haycock formülü', h.fix(haycock, 2) + ' m²'],
        ['Üç formülün ortalaması', h.fix(ort, 2) + ' m²'],
        ['Santimetrekare olarak (Mosteller)', h.fmt(mosteller * 10000, 0) + ' cm²'],
      ],
      note: 'İlaç dozu gibi tıbbi kararlar yalnızca hekim ve eczacı tarafından verilir; bu sonuç bilgilendirme amaçlıdır.',
    };
  },
  cases: [
    { in: { boy: '170', kilo: '70' }, out: { 'Vücut yüzey alanı (Mosteller)': '1,82 m²', 'Du Bois formülü': '1,81 m²', 'Haycock formülü': '1,83 m²' } },
    { in: { boy: '180', kilo: '80' }, out: { 'Vücut yüzey alanı (Mosteller)': '2,00 m²', 'Du Bois formülü': '2,00 m²', 'Haycock formülü': '2,01 m²', 'Santimetrekare olarak (Mosteller)': '20.000 cm²' } },
    { in: { boy: '160', kilo: '55' }, out: { 'Vücut yüzey alanı (Mosteller)': '1,56 m²', 'Du Bois formülü': '1,56 m²', 'Haycock formülü': '1,57 m²' } },
    { in: { boy: '100', kilo: '16' }, out: { 'Vücut yüzey alanı (Mosteller)': '0,67 m²', 'Du Bois formülü': '0,66 m²', 'Haycock formülü': '0,67 m²' } },
    { in: { boy: '175', kilo: '90' }, out: { 'Vücut yüzey alanı (Mosteller)': '2,09 m²', 'Du Bois formülü': '2,06 m²', 'Haycock formülü': '2,11 m²' } },
    { in: { boy: '60', kilo: '60' }, out: { 'Vücut yüzey alanı (Mosteller)': '1,00 m²' } },
    { in: { boy: '1,70', kilo: '70' }, error: true },
    { in: { boy: '170', kilo: '0' }, error: true },
    { in: { boy: '', kilo: '70' }, error: true },
  ],
  howto: [
    'Boyunuzu santimetre cinsinden yazın; 1 metre 70 santim için 170 girin.',
    'Kilonuzu kilogram olarak yazın. Ondalık değer için virgül kullanabilirsiniz (örn. 72,5).',
    '"Hesapla" düğmesine basın. İlk satırda Mosteller formülüne göre vücut yüzey alanınız metrekare olarak görünür.',
    'Alt satırlardan Du Bois ve Haycock sonuçlarını, üç formülün ortalamasını ve santimetrekare karşılığını inceleyin.',
  ],
  sections: [
    { h: 'Vücut yüzey alanı nedir?', p: [
      'Vücut yüzey alanı (VYA; İngilizce kısaltmasıyla BSA), insan bedeninin dış yüzeyinin toplam alanıdır ve metrekare (m²) ile ifade edilir. Bir insanın derisini doğrudan ölçmek pratik olmadığı için bu alan, boy ve kilodan türetilen formüllerle tahmin edilir. Ortalama bir yetişkinde değer kabaca 1,6 ile 2,0 m² arasındadır; tıpta "standart" yetişkin için sıklıkla 1,73 m² değeri referans alınır.',
      'VYA, metabolik olaylarla vücut ağırlığından daha iyi ilişkili kabul edildiği için klinikte birçok yerde kullanılır: bazı ilaçların dozunun kişiye göre ayarlanması, böbrek süzme hızının 1,73 m²\'ye göre standartlaştırılması, kalp debisinin kalp indeksine çevrilmesi ve yanıklarda sıvı gereksiniminin hesaplanması bunların başlıcalarıdır.',
    ] },
    { h: 'Kullanılan formüller', p: [
      'Araç üç formülü de aynı girdilerle hesaplar. Formüllerde <em>B</em> santimetre cinsinden boyu, <em>K</em> kilogram cinsinden ağırlığı gösterir.',
    ], ul: [
      '<strong>Mosteller:</strong> VYA = √(B × K ÷ 3600). Hesap makinesiyle kolayca yapılabildiği için günümüzde en çok tercih edilen formüldür.',
      '<strong>Du Bois ve Du Bois:</strong> VYA = 0,007184 × K<sup>0,425</sup> × B<sup>0,725</sup>. Alanın en eski ve en çok atıf alan formülüdür.',
      '<strong>Haycock:</strong> VYA = 0,024265 × K<sup>0,5378</sup> × B<sup>0,3964</sup>. Bebek ve çocukları da içeren ölçümlere dayandığı için çocuk hekimliğinde sık anılır.',
    ] },
    { h: 'Çözümlü örnek: 170 cm, 70 kg', p: [
      'Mosteller formülünde önce boy ile kilo çarpılır: 170 × 70 = 11.900. Bu sayı 3600\'e bölünür: 11.900 ÷ 3600 = 3,3056. Karekökü alındığında 1,8181 bulunur; yani vücut yüzey alanı yaklaşık <strong>1,82 m²</strong>\'dir. Aynı kişi için Du Bois formülü 1,81 m², Haycock formülü 1,83 m² verir. Görüldüğü gibi ortalama yapıdaki bir yetişkinde üç formül arasındaki fark yüzde bir düzeyindedir.',
      'Boyu 180 cm, kilosu 80 kg olan bir kişide çarpım 14.400, bölüm tam 4 ve karekök tam 2 olur; sonuç 2,00 m²\'dir. Bu örnek, Mosteller formülünü elle sınamak için kullanışlıdır.',
    ] },
    { h: 'Formüller arasındaki fark ne zaman büyür?', p: [
      'Formüller farklı dönemlerde, farklı sayıda ve farklı yapıda kişiler üzerinde yapılan ölçümlere dayanır. Ortalama boy ve kilodaki yetişkinlerde sonuçlar birbirine çok yakındır. Fark, uç değerlere gidildikçe açılır: çok küçük bebeklerde, çok kısa ya da çok uzun boylularda ve ileri derecede kilolu kişilerde formüller birbirinden yüzde birkaç oranında ayrılabilir. Örneğin 175 cm boyunda 90 kg ağırlığındaki bir kişi için Mosteller 2,09 m², Du Bois 2,06 m², Haycock 2,11 m² verir.',
      'Bir kurumda hangi formülün kullanılacağı genellikle o kurumun protokolüyle belirlenir. Bu nedenle bir sonucu başka bir kaynaktaki değerle karşılaştırırken aynı formülün kullanıldığından emin olun.',
    ] },
    { h: 'Yaklaşık başvuru değerleri', p: ['Aşağıdaki değerler Mosteller formülüyle hesaplanmıştır ve yalnızca fikir vermek içindir.'], ul: [
      '<strong>100 cm, 16 kg (küçük çocuk):</strong> 0,67 m²',
      '<strong>160 cm, 55 kg:</strong> 1,56 m²',
      '<strong>170 cm, 70 kg:</strong> 1,82 m²',
      '<strong>180 cm, 80 kg:</strong> 2,00 m²',
      '<strong>175 cm, 90 kg:</strong> 2,09 m²',
    ] },
    { h: 'Vücut kitle indeksiyle karıştırmayın', p: [
      'Her iki değer de boy ve kilodan hesaplanır, ancak amaçları farklıdır. Vücut kitle indeksi kilonun boya göre az mı fazla mı olduğunu değerlendirmek için kullanılır ve birimi kg/m²\'dir. Vücut yüzey alanı ise bir büyüklük ölçüsüdür; zayıf ya da kilolu olmanın yorumunu yapmaz, yalnızca bedenin ne kadar "büyük" olduğunu alan cinsinden söyler. İri yapılı ve uzun boylu bir sporcunun VYA değeri yüksek çıkar, bu bir sağlık sorunu anlamına gelmez.',
    ] },
    { h: 'Sınırlar ve önemli uyarı', p: [
      'Bütün VYA formülleri tahmindir; gerçek deri alanı vücut biçimine, yağ ve kas dağılımına göre değişir. Uzuv kaybı, ileri ödem ya da gebelik gibi durumlarda formüller gerçeği iyi yansıtmayabilir.',
      'Bu sayfa hesaplama mantığını göstermek ve hızlı bir değer vermek için hazırlanmıştır. Kemoterapi başta olmak üzere hiçbir ilacın dozunu bu sonuca dayanarak kendiniz belirlemeyin ya da değiştirmeyin; doz kararı hekimin, uygulama kontrolü eczacı ve hemşirenin sorumluluğundadır.',
    ] },
  ],
  faq: [
    ['Vücut yüzey alanı nasıl hesaplanır?', 'En yaygın yöntem Mosteller formülüdür: santimetre cinsinden boy ile kilogram cinsinden ağırlık çarpılır, 3600\'e bölünür ve karekökü alınır. Sonuç metrekaredir.'],
    ['Normal vücut yüzey alanı kaç metrekaredir?', 'Yetişkinlerde çoğunlukla 1,6 ile 2,0 m² arasındadır. Tıbbi hesaplamalarda standart yetişkin için 1,73 m² değeri referans olarak kullanılır. "Normal" bir sınır yoktur; değer kişinin boy ve kilosuna bağlıdır.'],
    ['Hangi formül daha doğru?', 'Hiçbiri kesin değildir; hepsi ölçümlere dayalı tahmindir. Ortalama yetişkinlerde sonuçlar neredeyse aynıdır. Mosteller basitliği nedeniyle, Du Bois köklü olduğu için, Haycock ise çocuklarda sık tercih edilir.'],
    ['1,73 m² değeri nereden geliyor?', 'Geçmişte ortalama bir yetişkinin yüzey alanı olarak kabul edilmiş bir değerdir. Böbrek süzme hızı gibi ölçümler, farklı büyüklükteki kişileri karşılaştırabilmek için bu alana göre standartlaştırılır.'],
    ['Çocuklar için de kullanılabilir mi?', 'Formüller çocuk boy ve kilolarıyla da çalışır; araç 30 cm boy ve 1 kg ağırlıktan itibaren hesap yapar. Ancak çocuklara ilişkin her tıbbi değerlendirme çocuk hekimi tarafından yapılmalıdır.'],
    ['Sonucu ilaç dozu hesaplamak için kullanabilir miyim?', 'Hayır. Dozlama; böbrek ve karaciğer işlevi, hastalığın durumu ve kullanılan protokol gibi pek çok etkene bağlıdır. Bu araç yalnızca yüzey alanı tahmini verir, tedavi kararı vermez.'],
    ['Boyu metre olarak yazarsam ne olur?', 'Formüller boyu santimetre olarak bekler. 1,70 gibi bir değer yazarsanız araç boyun 30 cm\'den küçük olduğunu fark eder ve santimetre yazmanızı ister.'],
    ['Boy ve kilo bilgim kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz değerler internet üzerinden herhangi bir yere gönderilmez.'],
  ],
  related: ['vki-hesapla', 'ideal-kilo-hesapla', 'bazal-metabolizma-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'ponderal-indeks-hesapla'],
};
