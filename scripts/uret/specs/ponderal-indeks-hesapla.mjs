export default {
  slug: 'ponderal-indeks-hesapla',
  title: 'Ponderal İndeks Hesaplama',
  h1Tail: 'Rohrer indeksi (kg/m³)',
  pageTitle: 'Ponderal İndeks Hesaplama – Rohrer İndeksi ve VKİ Karşılaştırması',
  description: 'Boy ve kilodan ponderal indeksi (Rohrer indeksi) hesaplayın. Yetişkinler için kg/m³, yenidoğanlar için g/cm³ × 100 biçiminde sonuç; VKİ ile karşılaştırma.',
  card: 'Boy ve kilodan ponderal indeksi (Rohrer indeksi) hesaplayın; yetişkin ve yenidoğan biçimleri, VKİ ile birlikte.',
  category: 'saglik',
  keywords: ['ponderal indeks hesaplama', 'rohrer indeksi', 'ponderal indeks nedir', 'yenidoğan ponderal indeks', 'ponderal index formülü', 'kg/m3 vücut indeksi', 'vki ponderal indeks farkı'],
  lead: 'Kilonuzu ve boyunuzu girin; araç ağırlığın boyun <strong>küpüne</strong> bölünmesiyle bulunan ponderal indeksi (Rohrer indeksi) hesaplasın. Yetişkinler için sonuç kg/m³, yenidoğanlar için g/cm³ × 100 biçiminde verilir; karşılaştırma için vücut kitle indeksi de gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Ağırlık (kg)', type: 'number', placeholder: 'Örn. 70', hint: 'Bebekler için de kilogram yazın (örn. 3,4).' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 175' },
    { id: 'grup', label: 'Hesap biçimi', type: 'select', options: [['yetiskin', 'Yetişkin / çocuk (kg/m³)'], ['bebek', 'Yenidoğan (g/cm³ × 100)']] },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Ağırlık');
    const boy = h.pos(v.boy, 'Boy');
    const bebek = v.grup === 'bebek';
    if (boy < 3) h.err('Boyu santimetre olarak yazın (örn. 1,75 yerine 175).');
    if (bebek) {
      if (boy < 25 || boy > 70) h.err('Yenidoğan hesabında boy 25 ile 70 cm arasında olmalı.');
      if (kilo < 0.3 || kilo > 8) h.err('Yenidoğan hesabında ağırlık 0,3 ile 8 kg arasında olmalı (kilogram olarak yazın, örn. 3,4).');
    } else {
      if (boy < 60 || boy > 250) h.err('Boy 60 ile 250 cm arasında olmalı.');
      if (kilo < 5 || kilo > 400) h.err('Ağırlık 5 ile 400 kg arasında olmalı.');
    }
    const m = boy / 100;
    const pi = kilo / (m * m * m);
    const vki = kilo / (m * m);
    if (bebek) {
      const pib = pi / 10;
      let yorum;
      if (pib < 2.2 - 1e-9) yorum = 'Düşük (2,2 altı)';
      else if (pib <= 3 + 1e-9) yorum = 'Olağan aralıkta (2,2–3,0)';
      else yorum = 'Yüksek (3,0 üstü)';
      return {
        rows: [
          ['Ponderal indeks', h.fmt(pib, 2) + ' (g/cm³ × 100)'],
          ['kg/m³ karşılığı', h.fmt(pi, 2) + ' kg/m³'],
          ['Genel başvuru aralığına göre', yorum],
          ['Ağırlık (gram)', h.fmt(kilo * 1000, 0) + ' g'],
        ],
        note: 'Yenidoğan formülü: 100 × ağırlık (g) ÷ boy (cm)³. Aralıklar kaynaklara göre değişir; değerlendirmeyi gebelik haftasını da bilen hekim yapar.',
      };
    }
    let yorum;
    if (pi < 11 - 1e-9) yorum = 'Düşük (11 altı)';
    else if (pi <= 15 + 1e-9) yorum = 'Olağan aralıkta (11–15)';
    else yorum = 'Yüksek (15 üstü)';
    return {
      rows: [
        ['Ponderal indeks', h.fmt(pi, 2) + ' kg/m³'],
        ['Vücut kitle indeksi (VKİ)', h.fmt(vki, 2) + ' kg/m²'],
        ['Genel başvuru aralığına göre', yorum],
        ['Bu boyda indeks 11–15 için ağırlık', `${h.fmt(11 * m * m * m, 1)}–${h.fmt(15 * m * m * m, 1)} kg`],
      ],
      note: 'Formül: ağırlık (kg) ÷ boy (m)³. Yetişkin aralığı kaynaklarda yaklaşık 11 ile 14–15 arasında verilir; kas kütlesini ve yağ dağılımını ayırt etmez, tanı koymaz.',
    };
  },
  cases: [
    { in: { kilo: '70', boy: '175', grup: 'yetiskin' }, out: { 'Ponderal indeks': '13,06 kg/m³', 'Vücut kitle indeksi (VKİ)': '22,86 kg/m²', 'Genel başvuru aralığına göre': 'Olağan aralıkta (11–15)', 'Bu boyda indeks 11–15 için ağırlık': '59–80,4 kg' } },
    { in: { kilo: '3,4', boy: '50', grup: 'bebek' }, out: { 'Ponderal indeks': '2,72 (g/cm³ × 100)', 'kg/m³ karşılığı': '27,2 kg/m³', 'Genel başvuru aralığına göre': 'Olağan aralıkta (2,2–3,0)', 'Ağırlık (gram)': '3.400 g' } },
    { in: { kilo: '80', boy: '180', grup: 'yetiskin' }, out: { 'Ponderal indeks': '13,72 kg/m³', 'Vücut kitle indeksi (VKİ)': '24,69 kg/m²' } },
    { in: { kilo: '50', boy: '170', grup: 'yetiskin' }, out: { 'Ponderal indeks': '10,18 kg/m³', 'Vücut kitle indeksi (VKİ)': '17,3 kg/m²', 'Genel başvuru aralığına göre': 'Düşük (11 altı)' } },
    { in: { kilo: '100', boy: '170', grup: 'yetiskin' }, out: { 'Ponderal indeks': '20,35 kg/m³', 'Vücut kitle indeksi (VKİ)': '34,6 kg/m²', 'Genel başvuru aralığına göre': 'Yüksek (15 üstü)' } },
    { in: { kilo: '90', boy: '200', grup: 'yetiskin' }, out: { 'Ponderal indeks': '11,25 kg/m³', 'Vücut kitle indeksi (VKİ)': '22,5 kg/m²', 'Bu boyda indeks 11–15 için ağırlık': '88–120 kg' } },
    { in: { kilo: '2,5', boy: '50', grup: 'bebek' }, out: { 'Ponderal indeks': '2 (g/cm³ × 100)', 'Genel başvuru aralığına göre': 'Düşük (2,2 altı)' } },
    { in: { kilo: '70', boy: '1,75', grup: 'yetiskin' }, error: true },
    { in: { kilo: '', boy: '175', grup: 'yetiskin' }, error: true },
    { in: { kilo: '3400', boy: '50', grup: 'bebek' }, error: true },
  ],
  howto: [
    'Ağırlığı kilogram olarak yazın. Bebekler için de kilogram kullanın; 3400 gram için 3,4 girin.',
    'Boyu santimetre olarak yazın; ayakkabısız ve dik duruşta ölçülen değeri kullanın.',
    'Hesap biçimini seçin: yetişkinler ve çocuklar için kg/m³, yenidoğanlar için g/cm³ × 100 biçimi kullanılır.',
    '"Hesapla" düğmesine basın. Ponderal indeks ilk satırda, karşılaştırma değerleri altında görünür.',
  ],
  sections: [
    { h: 'Ponderal indeks nedir?', p: [
      'Ponderal indeks, vücut ağırlığının boyun küpüne bölünmesiyle elde edilen bir "dolgunluk" ölçüsüdür. İsviçreli hekim Fritz Rohrer tarafından 1921\'de önerildiği için <strong>Rohrer indeksi</strong> olarak da anılır. Vücut kitle indeksine (VKİ) çok benzer; tek fark, VKİ\'de boyun karesi, ponderal indekste boyun küpü kullanılmasıdır.',
      'Küp kullanmanın arkasındaki düşünce geometriktir. Ağırlık hacimle ilgilidir ve hacim üç boyutludur. Bir cismi her yönde aynı oranda büyütürseniz ağırlığı boyunun küpüyle artar. Dolayısıyla aynı vücut oranlarına sahip uzun ve kısa iki insanın ağırlık ÷ boy³ değeri aynı çıkar; ağırlık ÷ boy² değeri ise uzun olanda daha yüksek çıkar.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Yetişkinler ve çocuklar için: <strong>Ponderal indeks = ağırlık (kg) ÷ boy (m)³</strong>. Birimi kg/m³\'tür.',
      'Örnek: 70 kg ağırlığında, 175 cm boyunda bir yetişkin. Boy metre olarak 1,75\'tir; küpü 1,75 × 1,75 × 1,75 = 5,359 m³ eder. Ponderal indeks 70 ÷ 5,359 = <strong>13,06 kg/m³</strong> bulunur. Aynı kişinin VKİ değeri 70 ÷ 3,0625 = 22,86 kg/m²\'dir.',
      'Tersinden de bakılabilir: 175 cm boyunda birinin indeksinin 11 ile 15 arasında kalması için ağırlığının yaklaşık 59 ile 80,4 kg arasında olması gerekir (11 × 5,359 ve 15 × 5,359). Araç bu aralığı girdiğiniz boy için otomatik hesaplar.',
    ] },
    { h: 'VKİ ile farkı: boy uzadıkça ne olur?', p: [
      'VKİ, çok uzun boylu insanlarda olduğundan yüksek, çok kısa boylularda olduğundan düşük çıkma eğilimindedir; çünkü boyun karesi, vücudun üç boyutlu büyümesini tam karşılamaz. Ponderal indeks bu etkiyi azaltır.',
      'Karşılaştırma: 200 cm boyunda ve 90 kg ağırlığında bir basketbolcunun VKİ değeri 22,5, ponderal indeksi 11,25\'tir. 175 cm ve 70 kg olan kişide ise VKİ 22,86, ponderal indeks 13,06\'dır. VKİ\'ye göre iki kişi neredeyse aynı görünür; ponderal indeks ise uzun boylu sporcunun boyuna göre belirgin biçimde daha ince yapılı olduğunu gösterir.',
      'Öte yandan yetişkin insanlar boy uzadıkça tam orantılı biçimde genişlemez; bu yüzden küpün de biraz "fazla düzelttiği" ileri sürülür. Bazı araştırmacılar 2 ile 3 arasında bir üs önermiştir. Hiçbir boy-kilo indeksi kusursuz değildir; hepsi kaba tarama araçlarıdır.',
    ] },
    { h: 'Yenidoğanlarda ponderal indeks', p: [
      'İndeksin en yaygın kullanım alanı yenidoğan değerlendirmesidir. Bebeklerde birimler farklı seçilir: <strong>Ponderal indeks = 100 × ağırlık (g) ÷ boy (cm)³</strong>. Bu biçimde çıkan sayı, kg/m³ değerinin onda biridir.',
      'Örnek: 3400 gram ve 50 cm doğan bir bebek için 50³ = 125.000; 100 × 3400 ÷ 125.000 = <strong>2,72</strong>. Aynı bebeğin kg/m³ karşılığı 27,2\'dir.',
      'Zamanında doğan bebekler için kaynaklarda genellikle 2,2 ile 3,0 arası olağan aralık olarak verilir. Düşük değer, bebeğin boyuna göre zayıf kaldığını gösterir ve rahim içi büyümenin son dönemde yavaşladığına işaret edebilir; bu durumda baş çevresi ve boy korunmuş, ağırlık geride kalmıştır. Değerlendirme mutlaka gebelik haftası ve diğer ölçümlerle birlikte, çocuk hekimi tarafından yapılır.',
    ] },
    { h: 'Sonuç nasıl yorumlanır?', ul: [
      '<strong>Yetişkin, 11 altı:</strong> boya göre düşük ağırlık.',
      '<strong>Yetişkin, 11–15:</strong> kaynaklarda olağan kabul edilen yaklaşık aralık (üst sınır kimi kaynakta 14 olarak geçer).',
      '<strong>Yetişkin, 15 üstü:</strong> boya göre yüksek ağırlık.',
      '<strong>Yenidoğan, 2,2 altı:</strong> boya göre düşük ağırlık.',
      '<strong>Yenidoğan, 2,2–3,0:</strong> olağan aralık.',
      '<strong>Yenidoğan, 3,0 üstü:</strong> boya göre yüksek ağırlık.',
    ], p: [
      'Ponderal indeks için VKİ\'deki gibi uluslararası kabul görmüş resmî sınıflandırma eşikleri yoktur; yukarıdaki aralıklar literatürde sık anılan yaklaşık değerlerdir. Sonuç bilgilendirme amaçlıdır, tanı koymaz. Sağlık kararı vermeden önce hekime ya da diyetisyene danışın.',
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', p: [
      'Bütün boy-kilo indeksleri gibi ponderal indeks de kas ile yağı ayırt edemez. Kaslı bir sporcu ile aynı boy ve kilodaki hareketsiz bir kişi aynı sonucu alır. Yağın vücutta nerede toplandığını da göstermez; karın çevresindeki yağlanma için bel çevresi ölçümleri daha bilgilendiricidir. Gebelikte, ödem durumunda ve büyüme çağındaki çocuklarda tek başına yorumlanmamalıdır.',
      'En sık yapılan hata birimleri karıştırmaktır. Boyu metre yerine santimetre olarak, bebek ağırlığını gram yerine kilogram olarak girin. Yetişkin ve yenidoğan biçimlerinin sayıları birbirinin on katıdır; 13 dolayındaki bir yetişkin değeri ile 2,7 dolayındaki bir bebek değeri farklı ölçeklerdedir ve doğrudan karşılaştırılmaz.',
    ] },
  ],
  faq: [
    ['Ponderal indeks nasıl hesaplanır?', 'Ağırlık kilogram olarak, boy metre olarak alınır ve ağırlık boyun küpüne bölünür. 70 kg ve 1,75 m için 70 ÷ 5,359 = 13,06 kg/m³ bulunur.'],
    ['Ponderal indeks ile VKİ arasındaki fark nedir?', 'VKİ\'de ağırlık boyun karesine, ponderal indekste boyun küpüne bölünür. Küp kullanımı, çok uzun ya da çok kısa boylu kişilerde boyun etkisini daha iyi dengeler; VKİ ise daha yaygın kullanılır ve resmî sınıflandırma eşiklerine sahiptir.'],
    ['Yetişkinlerde normal ponderal indeks kaçtır?', 'Kaynaklarda yaklaşık 11 ile 14–15 kg/m³ arası olağan aralık olarak geçer. Resmî ve herkesçe kabul edilmiş kesin eşikler yoktur; bu yüzden sonuç yalnızca kaba bir gösterge sayılmalıdır.'],
    ['Yenidoğanda ponderal indeks neden ölçülür?', 'Bebeğin boyuna göre ağırlığının yeterli olup olmadığını görmek için kullanılır. Düşük değer, boyun korunup ağırlığın geride kaldığı orantısız büyüme geriliğine işaret edebilir. Yorumu çocuk hekimi yapar.'],
    ['Bebek için 2,72 çıkan değer ile 27,2 kg/m³ aynı mı?', 'Evet, aynı ölçümün iki farklı birimle ifadesidir. Yenidoğan formülündeki g/cm³ × 100 biçimi, kg/m³ değerinin onda birini verir.'],
    ['Sporcular için VKİ yerine ponderal indeks kullanılabilir mi?', 'Uzun boylu sporcularda boydan kaynaklanan sapmayı azaltır, ancak o da kas ve yağı ayırt edemez. Vücut bileşimini değerlendirmek için yağ oranı ölçümü ve bel çevresi gibi ek yöntemler gerekir.'],
    ['Çocuklar için kullanılabilir mi?', 'Hesap yapılabilir, ancak çocuklarda büyüme yaşa ve cinsiyete göre değiştiği için değerlendirme büyüme eğrileriyle yapılır. Yetişkin aralıkları çocuklara uygulanmamalıdır; çocuk hekimine danışın.'],
    ['Girdiğim boy ve kilo bilgisi saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['vki-hesapla', 'bel-boy-orani-hesapla', 'vucut-yuzey-alani-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'ideal-bel-cevresi-hesapla'],
};
