export default {
  slug: 'karbon-ayak-izi-hesapla',
  title: 'Karbon Ayak İzi Hesaplama',
  h1Tail: 'ev enerjisi, araç ve uçuş',
  pageTitle: "Karbon Ayak İzi Hesaplama – Yıllık CO₂ Salımınızı Tahmin Edin",
  description: "Elektrik, doğal gaz, araç yakıtı ve uçuş verilerinizden yıllık karbon ayak izinizi ton CO₂ olarak tahmin edin. Kalem kalem dağılımı ve kişi başı değeri gösterir.",
  card: "Aylık elektrik, doğal gaz ve yakıt tüketiminizi girin; yıllık karbon ayak izinizi ton CO₂ olarak, kalem kalem görün.",
  category: 'gunluk',
  keywords: ['karbon ayak izi hesaplama', 'co2 hesaplama', 'karbon salımı hesaplama', 'elektrik karbon emisyonu', 'doğal gaz co2 emisyonu', 'araç karbon salımı', 'kişisel karbon ayak izi'],
  lead: "Karbon ayak izi, günlük yaşamınızın atmosfere ne kadar karbondioksit saldığının ölçüsüdür. Aylık elektrik, doğal gaz ve yakıt tüketiminizi, varsa yıllık uçuş mesafenizi girin; araç <strong>yıllık salımınızı ton CO₂ olarak</strong>, hangi kalemin ne kadar pay tuttuğuyla birlikte tahmin etsin.",
  button: 'Hesapla',
  inputs: [
    { id: 'elektrik', label: 'Elektrik tüketimi (kWh/ay)', type: 'number', placeholder: 'Örn. 250' },
    { id: 'faktor', label: 'Elektrik emisyon faktörü (kg CO₂/kWh)', type: 'number', value: '0,44', hint: 'Şebekenin üretim karışımına göre değişir; güncel değeri biliyorsanız değiştirin.' },
    { id: 'gaz', label: 'Doğal gaz tüketimi (m³/ay)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yakitTur', label: 'Araç yakıtı', type: 'select', options: [['benzin', 'Benzin (2,31 kg CO₂/litre)'], ['dizel', 'Dizel (2,68 kg CO₂/litre)'], ['lpg', 'LPG (1,51 kg CO₂/litre)']] },
    { id: 'yakit', label: 'Yakıt tüketimi (litre/ay)', type: 'number', placeholder: 'Örn. 80' },
    { id: 'ucus', label: 'Uçuş mesafesi (km/yıl)', type: 'number', placeholder: 'Örn. 2000' },
    { id: 'kisi', label: 'Hanedeki kişi sayısı', type: 'number', value: '1' },
  ],
  compute(v, h) {
    const YAKIT = { benzin: 2.31, dizel: 2.68, lpg: 1.51 };
    const GAZ = 2.0, UCUS = 0.15;
    const el = h.opt(v.elektrik, 0, 'Elektrik tüketimi');
    const fk = h.opt(v.faktor, 0.44, 'Elektrik emisyon faktörü');
    const gaz = h.opt(v.gaz, 0, 'Doğal gaz tüketimi');
    const yk = h.opt(v.yakit, 0, 'Yakıt tüketimi');
    const uc = h.opt(v.ucus, 0, 'Uçuş mesafesi');
    const kisi = h.posint(String(v.kisi || '').trim() === '' ? '1' : v.kisi, 'Kişi sayısı');
    if (el < 0 || fk < 0 || gaz < 0 || yk < 0 || uc < 0) h.err('Tüketim değerleri negatif olamaz.');
    if (fk > 2) h.err('Elektrik emisyon faktörü 0 ile 2 kg CO₂/kWh arasında olmalı.');
    if (el + gaz + yk + uc <= 0) h.err('En az bir tüketim kalemi girin (elektrik, doğal gaz, yakıt ya da uçuş).');
    const kEl = el * 12 * fk;
    const kGaz = gaz * 12 * GAZ;
    const kYk = yk * 12 * (YAKIT[v.yakitTur] || 2.31);
    const kUc = uc * UCUS;
    const top = kEl + kGaz + kYk + kUc;
    const kalemler = [['Elektrik', kEl], ['Doğal gaz', kGaz], ['Araç yakıtı', kYk], ['Uçuş', kUc]];
    let buyuk = kalemler[0];
    for (const k of kalemler) if (k[1] > buyuk[1]) buyuk = k;
    const pay = (x) => h.fmt(x, 0) + ' kg (%' + h.fmt(top > 0 ? x / top * 100 : 0, 1) + ')';
    return {
      rows: [
        ['Yıllık karbon ayak izi', h.fmt(top / 1000, 2) + ' ton CO₂'],
        ['Kişi başı yıllık', h.fmt(top / 1000 / kisi, 2) + ' ton CO₂'],
        ['Aylık ortalama', h.fmt(top / 12, 1) + ' kg CO₂'],
        ['Elektrik', pay(kEl)],
        ['Doğal gaz', pay(kGaz)],
        ['Araç yakıtı', pay(kYk)],
        ['Uçuş', pay(kUc)],
        ['En büyük kalem', buyuk[0]],
      ],
      note: 'Yaklaşık faktörler: doğal gaz 2,0 kg CO₂/m³, uçuş 0,15 kg CO₂/yolcu-km. Beslenme, alışveriş, toplu taşıma ve atık dahil değildir; sonuç yalnızca girilen kalemlerin tahminidir.',
    };
  },
  cases: [
    { in: { elektrik: '250', faktor: '0,44', gaz: '100', yakitTur: 'benzin', yakit: '80', ucus: '2000', kisi: '1' }, out: { 'Yıllık karbon ayak izi': '6,24 ton CO₂', 'Aylık ortalama': '519,8 kg CO₂', 'Elektrik': '1.320 kg (%21,2)', 'Doğal gaz': '2.400 kg (%38,5)', 'Araç yakıtı': '2.218 kg (%35,6)', 'Uçuş': '300 kg (%4,8)', 'En büyük kalem': 'Doğal gaz' } },
    { in: { elektrik: '300', faktor: '0,5', gaz: '150', yakitTur: 'benzin', yakit: '', ucus: '', kisi: '3' }, out: { 'Yıllık karbon ayak izi': '5,4 ton CO₂', 'Kişi başı yıllık': '1,8 ton CO₂', 'Elektrik': '1.800 kg (%33,3)', 'Doğal gaz': '3.600 kg (%66,7)' } },
    { in: { elektrik: '', faktor: '0,44', gaz: '', yakitTur: 'dizel', yakit: '100', ucus: '', kisi: '1' }, out: { 'Yıllık karbon ayak izi': '3,22 ton CO₂', 'Araç yakıtı': '3.216 kg (%100)', 'En büyük kalem': 'Araç yakıtı' } },
    { in: { elektrik: '', faktor: '0,44', gaz: '', yakitTur: 'lpg', yakit: '100', ucus: '', kisi: '1' }, out: { 'Yıllık karbon ayak izi': '1,81 ton CO₂', 'Aylık ortalama': '151 kg CO₂' } },
    { in: { elektrik: '', faktor: '0,44', gaz: '', yakitTur: 'benzin', yakit: '', ucus: '10000', kisi: '1' }, out: { 'Yıllık karbon ayak izi': '1,5 ton CO₂', 'Uçuş': '1.500 kg (%100)' } },
    { in: { elektrik: '200', faktor: '0', gaz: '50', yakitTur: 'benzin', yakit: '', ucus: '', kisi: '2' }, out: { 'Yıllık karbon ayak izi': '1,2 ton CO₂', 'Kişi başı yıllık': '0,6 ton CO₂', 'Elektrik': '0 kg (%0)' } },
    { in: { elektrik: '', faktor: '0,44', gaz: '', yakitTur: 'benzin', yakit: '', ucus: '', kisi: '1' }, error: true },
    { in: { elektrik: '-100', faktor: '0,44', gaz: '', yakitTur: 'benzin', yakit: '', ucus: '', kisi: '1' }, error: true },
    { in: { elektrik: '250', faktor: '0,44', gaz: 'yüz', yakitTur: 'benzin', yakit: '', ucus: '', kisi: '1' }, error: true },
  ],
  howto: [
    'Elektrik faturanızdaki aylık tüketimi kilovatsaat (kWh) olarak yazın. Birkaç ayın ortalamasını almak mevsim etkisini dengeler.',
    'Doğal gaz kullanıyorsanız aylık ortalama tüketimi metreküp olarak girin; yalnızca kışın ısınma için kullanıyorsanız yıllık toplamı 12\'ye bölün.',
    'Aracınızın yakıt türünü seçin ve ayda ortalama kaç litre yakıt aldığınızı yazın. Aracınız yoksa alanı boş bırakın.',
    'Yıl içinde yaptığınız uçuşların toplam mesafesini kilometre olarak ekleyin; gidiş-dönüş uçuşlarda iki yönü de sayın.',
    'Fatura ve araç haneye aitse kişi sayısını girin; "Hesapla" düğmesine bastığınızda toplam, kişi başı değer ve kalemlerin payı görünür.',
  ],
  sections: [
    { h: 'Karbon ayak izi nasıl hesaplanır?', p: [
      "Hesabın mantığı her kalemde aynıdır: <strong>salım = tüketim × emisyon faktörü</strong>. Emisyon faktörü, bir birim enerji ya da yakıt tüketildiğinde atmosfere salınan karbondioksit miktarını kilogram olarak verir. Araç aylık girilen elektrik, doğal gaz ve yakıt değerlerini 12 ile çarparak yıla taşır, her birini kendi faktörüyle çarpar ve uçuş salımını ekleyerek toplamı bulur.",
      "Yakıtların faktörleri kimyadan gelir ve hayli kararlıdır: bir litre benzinin yanması yaklaşık 2,31 kg, bir litre dizelin yanması yaklaşık 2,68 kg, bir litre LPG'nin yanması yaklaşık 1,51 kg CO₂ üretir. Doğal gaz için metreküp başına yaklaşık 2,0 kg alınmıştır. Elektriğin faktörü ise sabit değildir; şebekeye o yıl ne kadar kömür, doğal gaz, hidroelektrik, rüzgâr ve güneş girdiğine bağlıdır. Bu yüzden araç elektrik faktörünü sizin değiştirebileceğiniz bir alan olarak sunar; varsayılan 0,44 kg CO₂/kWh yaklaşık bir değerdir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Ayda 250 kWh elektrik ve 100 m³ doğal gaz tüketen, ayda 80 litre benzin alan ve yılda 2.000 km uçan bir kişiyi ele alalım. Elektrik: 250 × 12 × 0,44 = 1.320 kg. Doğal gaz: 100 × 12 × 2,0 = 2.400 kg. Benzin: 80 × 12 × 2,31 = 2.217,6 kg. Uçuş: 2.000 × 0,15 = 300 kg.",
      "Toplam 1.320 + 2.400 + 2.217,6 + 300 = 6.237,6 kg, yani yaklaşık <strong>6,24 ton CO₂</strong> eder; aylık ortalama 519,8 kg'dır. Dağılıma bakıldığında doğal gaz yüzde 38,5 ile en büyük kalemdir, onu yüzde 35,6 ile araç yakıtı izler. Bu örnekte en etkili azaltım adımının ısınma ve araç kullanımı tarafında olduğu açıkça görülür.",
    ] },
    { h: 'Kalemleri nasıl yorumlamalı?', ul: [
      "<strong>Elektrik:</strong> Faturadaki kWh değeri esas alınır. Çatı güneş paneli ya da yenilenebilir enerji sertifikalı tarife kullanıyorsanız faktörü düşürebilir, hatta sıfır girebilirsiniz.",
      "<strong>Doğal gaz:</strong> Isınma, sıcak su ve ocak tüketiminin toplamıdır. Merkezi sistemli binalarda payınıza düşen tüketimi yönetimden öğrenebilirsiniz.",
      "<strong>Araç yakıtı:</strong> Kilometre yerine doğrudan alınan litre üzerinden hesaplanır; böylece aracın gerçek tüketimi, trafik ve sürüş tarzı kendiliğinden hesaba girer.",
      "<strong>Uçuş:</strong> Yolcu başına kilometre üzerinden yaklaşık 0,15 kg alınır. Gerçek değer uçağın tipine, doluluk oranına, uçuşun uzunluğuna ve koltuk sınıfına göre belirgin biçimde değişir.",
    ] },
    { h: 'Ayak izini küçültmenin yolları', p: [
      "Dağılım satırları nereden başlayacağınızı gösterir. Isınma payı yüksekse çatı ve duvar yalıtımı, pencere değişimi, termostatik vana ve oda sıcaklığını bir derece düşürmek tüketimi doğrudan azaltır. Elektrik payı yüksekse enerji sınıfı yüksek cihazlar, LED aydınlatma ve bekleme modundaki cihazların kapatılması etkilidir.",
      "Ulaşım tarafında kısa mesafelerde yürümek ya da bisiklet kullanmak, toplu taşımayı tercih etmek, araç paylaşmak ve lastik basıncını doğru tutmak yakıtı düşürür. Uçuşlarda aktarmasız rota seçmek ve kısa mesafelerde tren ya da otobüsü değerlendirmek salımı azaltır. Küçük görünen alışkanlık değişiklikleri bir yıl boyunca toplandığında yüzlerce kilogramlık fark yaratabilir.",
    ] },
    { h: 'Bu hesap neleri kapsamaz?', p: [
      "Gerçek bir kişisel karbon ayak izi çok daha fazla kalem içerir: beslenme (özellikle et ve süt ürünleri), giyim ve elektronik alışverişi, toplu taşıma, konut inşaatı, atık ve kamu hizmetlerinden düşen pay. Bu araç yalnızca faturalardan ve yakıt fişlerinden kolayca ölçülebilen dört doğrudan kalemi hesaplar. Dolayısıyla sonuç, toplam ayak izinizin bir <em>alt sınırı</em> gibi düşünülmelidir.",
      "Sonuçlar bilgilendirme amaçlıdır ve yaklaşık faktörlere dayanır. Kurumsal karbon raporlaması, sera gazı envanteri, sertifikasyon ya da yasal bildirim gibi amaçlar için resmî ve güncel emisyon faktörlerini kullanan, ilgili standartlara göre çalışan bir uzmana başvurulmalıdır.",
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '100 kWh elektrik (0,44 faktörüyle): 44 kg CO₂',
      '100 m³ doğal gaz: yaklaşık 200 kg CO₂',
      '50 litre benzin (yaklaşık bir depo): 115,5 kg CO₂',
      '50 litre dizel: 134 kg CO₂',
      '50 litre LPG: 75,5 kg CO₂',
      '1.000 km uçuş (yolcu başına): yaklaşık 150 kg CO₂',
    ] },
  ],
  faq: [
    ['Karbon ayak izi nedir?', 'Bir kişinin, hanenin ya da kuruluşun faaliyetleri sonucunda atmosfere salınan sera gazlarının karbondioksit cinsinden toplamıdır. Genellikle yıllık ton CO₂ olarak ifade edilir.'],
    ['1 litre benzin kaç kilogram CO₂ salar?', 'Yaklaşık 2,31 kilogram. Benzin bir litrede bir kilogramdan hafif olsa da yanma sırasında karbon havadaki oksijenle birleştiği için oluşan karbondioksit yakıtın kendisinden ağırdır. Dizelde bu değer yaklaşık 2,68 kg, LPG\'de yaklaşık 1,51 kg\'dır.'],
    ['Elektrik emisyon faktörünü nereden bulurum?', 'Faktör ülkenin elektrik üretim karışımına göre her yıl değişir ve resmî enerji istatistiklerinde ya da ulusal sera gazı envanterlerinde yayımlanır. Güncel değeri biliyorsanız alana yazın; bilmiyorsanız varsayılan değer kaba bir tahmin için yeterlidir.'],
    ['Elektrikli araç kullanıyorsam ne girmeliyim?', 'Yakıt alanını boş bırakın; aracın şarjı evdeyse zaten elektrik faturanıza dahildir. Dışarıda şarj ediyorsanız o enerjiyi kWh olarak aylık elektrik tüketimine ekleyin.'],
    ['Kişi başı değer nasıl hesaplanıyor?', 'Toplam salım, hanedeki kişi sayısına bölünür. Fatura ve araç ortak kullanılıyorsa bu satır kişisel payınızı gösterir; uçuş mesafesini de hanenin toplamı olarak girmeniz tutarlı olur.'],
    ['Sonuç neden başka hesaplayıcılardan farklı çıkabilir?', 'Hesaplayıcılar farklı emisyon faktörleri kullanır ve farklı kalemleri kapsar. Bazıları beslenme ve alışverişi de ekler, bazıları uçuşlarda yüksek irtifa etkisi için ek katsayı uygular. Bu araç yalnızca dört doğrudan kalemi, sayfada açıkça belirtilen faktörlerle hesaplar.'],
    ['Ağaç dikerek ayak izimi sıfırlayabilir miyim?', 'Ağaçlar büyürken karbon tutar, ancak tuttukları miktar türe, yaşa ve iklime göre çok değişir ve onlarca yıla yayılır. Öncelik her zaman salımı kaynağında azaltmaktır; dengeleme bunun yerini tutmaz, tamamlayıcısı olabilir.'],
    ['Girdiğim tüketim verileri paylaşılıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; fatura ve yakıt bilgileriniz sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['dogalgaz-tuketim-hesapla', 'yakit-tuketimi-hesapla', 'dus-su-tuketimi-hesapla', 'lpg-benzin-karsilastir', 'elektrikli-arac-menzil-hesapla'],
};
