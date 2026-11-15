export default {
  slug: 'maksimum-nabiz-hesapla',
  title: 'Maksimum Nabız Hesaplama',
  h1Tail: 'yaşa göre, 5 formülle',
  pageTitle: 'Maksimum Nabız Hesaplama – Yaşa Göre Maksimum Kalp Atım Hızı',
  description: 'Yaşınıza göre maksimum nabzınızı Fox (220 − yaş), Tanaka, Gellish, Gulati ve Nes formülleriyle hesaplayın; beş antrenman nabız bölgesini atım/dk olarak görün.',
  card: 'Yaşınıza göre maksimum nabzı beş farklı formülle hesaplayın ve antrenman nabız bölgelerinizi görün.',
  category: 'saglik',
  keywords: ['maksimum nabız hesaplama', 'maksimum kalp atım hızı', '220 eksi yaş', 'yaşa göre nabız', 'nabız bölgeleri', 'tanaka formülü', 'egzersizde nabız kaç olmalı'],
  lead: `Yaşınızı yazın ve bir formül seçin; araç tahmini <strong>maksimum kalp atım hızınızı</strong> ve buna bağlı beş antrenman bölgesini verir. Karşılaştırma yapabilmeniz için yaygın kullanılan beş formülün sonucu aynı tabloda gösterilir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yas', label: 'Yaş', type: 'number', placeholder: 'Örn. 40' },
    { id: 'formul', label: 'Bölgeler için kullanılacak formül', type: 'select', options: [
      ['tanaka', 'Tanaka: 208 − 0,7 × yaş'],
      ['fox', 'Fox: 220 − yaş'],
      ['gellish', 'Gellish: 207 − 0,7 × yaş'],
      ['gulati', 'Gulati (kadınlar): 206 − 0,88 × yaş'],
      ['nes', 'Nes: 211 − 0,64 × yaş'],
    ] },
  ],
  compute(v, h) {
    const yas = h.posint(v.yas, 'Yaş');
    if (yas < 5 || yas > 110) h.err('Yaş 5 ile 110 arasında olmalı.');
    const f = {
      fox: 220 - yas,
      tanaka: 208 - 0.7 * yas,
      gellish: 207 - 0.7 * yas,
      gulati: 206 - 0.88 * yas,
      nes: 211 - 0.64 * yas,
    };
    const yuv = (x) => Math.round(x + 1e-9);
    const sec = v.formul || 'tanaka';
    if (!(sec in f)) h.err('Geçerli bir formül seçin.');
    const maks = yuv(f[sec]);
    const b = (a, c) => `${yuv(maks * a)}–${yuv(maks * c)} atım/dk`;
    return {
      rows: [
        ['Maksimum nabız', maks + ' atım/dk'],
        ['Bölge 1 – çok hafif (%50–60)', b(0.5, 0.6)],
        ['Bölge 2 – hafif (%60–70)', b(0.6, 0.7)],
        ['Bölge 3 – orta (%70–80)', b(0.7, 0.8)],
        ['Bölge 4 – zor (%80–90)', b(0.8, 0.9)],
        ['Bölge 5 – maksimum (%90–100)', b(0.9, 1)],
        ['Fox (220 − yaş)', yuv(f.fox) + ' atım/dk'],
        ['Tanaka', yuv(f.tanaka) + ' atım/dk'],
        ['Gellish', yuv(f.gellish) + ' atım/dk'],
        ['Gulati (kadınlar)', yuv(f.gulati) + ' atım/dk'],
        ['Nes', yuv(f.nes) + ' atım/dk'],
      ],
      note: 'Formüller nüfus ortalamasını verir; kişisel maksimum nabız bu değerden 10–12 atım kadar farklı olabilir.',
    };
  },
  cases: [
    { in: { yas: '40', formul: 'fox' }, out: { 'Maksimum nabız': '180 atım/dk', 'Bölge 2 – hafif (%60–70)': '108–126 atım/dk', 'Bölge 5 – maksimum (%90–100)': '162–180 atım/dk', 'Tanaka': '180 atım/dk', 'Gellish': '179 atım/dk', 'Gulati (kadınlar)': '171 atım/dk', 'Nes': '185 atım/dk' } },
    { in: { yas: '30', formul: 'tanaka' }, out: { 'Maksimum nabız': '187 atım/dk', 'Fox (220 − yaş)': '190 atım/dk', 'Bölge 3 – orta (%70–80)': '131–150 atım/dk', 'Nes': '192 atım/dk' } },
    { in: { yas: '50', formul: 'gulati' }, out: { 'Maksimum nabız': '162 atım/dk', 'Fox (220 − yaş)': '170 atım/dk', 'Tanaka': '173 atım/dk', 'Gellish': '172 atım/dk', 'Nes': '179 atım/dk' } },
    { in: { yas: '60', formul: 'nes' }, out: { 'Maksimum nabız': '173 atım/dk', 'Fox (220 − yaş)': '160 atım/dk', 'Tanaka': '166 atım/dk', 'Gulati (kadınlar)': '153 atım/dk' } },
    { in: { yas: '20', formul: 'gellish' }, out: { 'Maksimum nabız': '193 atım/dk', 'Fox (220 − yaş)': '200 atım/dk', 'Tanaka': '194 atım/dk', 'Gulati (kadınlar)': '188 atım/dk', 'Nes': '198 atım/dk' } },
    { in: { yas: '40' }, out: { 'Maksimum nabız': '180 atım/dk', 'Bölge 1 – çok hafif (%50–60)': '90–108 atım/dk', 'Bölge 4 – zor (%80–90)': '144–162 atım/dk' } },
    { in: { yas: '', formul: 'fox' }, error: true },
    { in: { yas: '35,5', formul: 'fox' }, error: true },
    { in: { yas: '130', formul: 'tanaka' }, error: true },
  ],
  howto: [
    `"Yaş" alanına doldurduğunuz yaşı tam sayı olarak yazın.`,
    `Antrenman bölgelerinin hangi formüle göre hesaplanacağını listeden seçin. Emin değilseniz varsayılan Tanaka formülünü kullanabilirsiniz.`,
    `"Hesapla" düğmesine basın. İlk satır seçtiğiniz formüle göre maksimum nabzı, sonraki beş satır antrenman bölgelerini gösterir.`,
    `Tablonun alt kısmındaki satırlardan diğer formüllerin sonuçlarını karşılaştırın; aralarındaki fark tahminin ne kadar belirsiz olduğu hakkında fikir verir.`,
  ],
  sections: [
    { h: 'Maksimum nabız nedir?', p: [
      `Maksimum nabız (maksimum kalp atım hızı, kısaca KAH<sub>maks</sub>), kalbin en yoğun eforda bir dakikada ulaşabildiği en yüksek atım sayısıdır. Kondisyon düzeyinin bir göstergesi değildir; antrenmanla belirgin biçimde artmaz, büyük ölçüde yaşa ve kalıtıma bağlıdır ve yaş ilerledikçe yavaş yavaş düşer. Asıl önemi, egzersiz yoğunluğunu kişiye göre ölçeklemeye yarayan bir referans noktası olmasıdır: "maksimumun yüzde 70'inde koşmak" 25 yaşındaki ile 60 yaşındaki için farklı nabız sayılarına karşılık gelir.`,
    ] },
    { h: 'Kullanılan formüller', p: [
      `Maksimum nabzı gerçekten ölçmek yorucu ve herkes için uygun olmayan bir test gerektirdiğinden, pratikte yaşa dayalı tahmin formülleri kullanılır. Araç şu beş denklemi hesaplar:`,
    ], ul: [
      `<strong>Fox: 220 − yaş.</strong> En bilinen ve en basit kuraldır. Ezberlemesi kolaydır, ancak genç yetişkinlerde değeri biraz yüksek, ileri yaşlarda düşük tahmin etme eğilimindedir.`,
      `<strong>Tanaka: 208 − 0,7 × yaş.</strong> Çok sayıda çalışmanın birlikte değerlendirilmesinden türetilmiştir ve sağlıklı yetişkinlerde Fox kuralına göre daha tutarlı kabul edilir.`,
      `<strong>Gellish: 207 − 0,7 × yaş.</strong> Aynı kişilerin yıllar boyunca izlenmesiyle elde edilmiştir; Tanaka ile neredeyse aynı sonucu verir.`,
      `<strong>Gulati: 206 − 0,88 × yaş.</strong> Yalnızca kadınlar üzerinde yapılan bir çalışmadan gelir ve kadınlar için diğerlerinden daha düşük değerler öngörür.`,
      `<strong>Nes: 211 − 0,64 × yaş.</strong> Geniş bir yetişkin grubunda yapılan ölçümlere dayanır; özellikle orta ve ileri yaşlarda daha yüksek sonuç verir.`,
    ] },
    { h: 'Çözümlü örnek: 40 yaş', p: [
      `40 yaşındaki biri için Fox formülü 220 − 40 = <strong>180 atım/dk</strong> verir. Tanaka: 208 − 0,7 × 40 = 208 − 28 = 180. Gellish: 207 − 28 = 179. Gulati: 206 − 0,88 × 40 = 206 − 35,2 = 170,8, yuvarlanınca 171. Nes: 211 − 0,64 × 40 = 211 − 25,6 = 185,4, yani 185.`,
      `Görüldüğü gibi 40 yaş, Fox ve Tanaka formüllerinin kesiştiği noktadır. Daha genç yaşlarda Fox daha yüksek (30 yaşta 190'a karşı 187), daha ileri yaşlarda Tanaka daha yüksek (60 yaşta 160'a karşı 166) sonuç verir. 180 atımlık maksimuma göre yüzde 60–70 bölgesi 108–126, yüzde 80–90 bölgesi 144–162 atım/dk olur.`,
    ] },
    { h: 'Antrenman nabız bölgeleri', p: [
      `Dayanıklılık sporlarında yoğunluk genellikle maksimum nabzın yüzdesine göre beş bölgeye ayrılır. Araç bu bölgelerin alt ve üst sınırlarını atım/dk olarak verir:`,
    ], ul: [
      `<strong>Bölge 1 (%50–60):</strong> ısınma, soğuma ve toparlanma. Rahatça sohbet edilir.`,
      `<strong>Bölge 2 (%60–70):</strong> temel dayanıklılık. Uzun süre sürdürülebilir; hacim antrenmanlarının büyük kısmı burada yapılır.`,
      `<strong>Bölge 3 (%70–80):</strong> orta yoğunluk. Nefes hızlanır, konuşma kısa cümlelere iner.`,
      `<strong>Bölge 4 (%80–90):</strong> eşik çalışmaları. Zorlayıcıdır; tempo koşuları ve uzun aralıklar bu bölgededir.`,
      `<strong>Bölge 5 (%90–100):</strong> maksimum efor. Yalnızca kısa aralıklarla sürdürülebilir.`,
    ] },
    { h: 'Formüllerin sınırları', p: [
      `Bu denklemlerin hepsi büyük grupların ortalamasını verir. Aynı yaştaki iki sağlıklı insanın gerçek maksimum nabızları arasında 20 atımdan fazla fark bulunabilir; tahminin standart sapması kabaca 10–12 atımdır. Bu yüzden formülden çıkan sayı bir başlangıç noktasıdır, kesin sınır değildir. Antrenmanda formülün verdiği değerin üzerinde nabızlar görüyorsanız ve kendinizi iyi hissediyorsanız, büyük olasılıkla gerçek maksimumunuz ortalamanın üstündedir.`,
      `Maksimum nabız spor dalına göre de değişir: koşuda ölçülen değer genellikle bisiklettekinden birkaç atım, yüzmedekinden 10 atım kadar yüksektir. Beta bloker gibi bazı ilaçlar nabzı baskılar; bu ilaçları kullananlarda formüller geçersizdir. Dinlenme nabzınızı da hesaba katan daha kişisel bölgeler için nabız rezervi (Karvonen) yöntemine bakabilirsiniz.`,
    ] },
    { h: 'Güvenlik uyarısı', p: [
      `Bu sayfadaki sonuçlar bilgilendirme amaçlıdır ve tıbbi değerlendirme yerine geçmez. Kalp-damar hastalığı, yüksek tansiyon, diyabet, göğüs ağrısı ya da çarpıntı öykünüz varsa, ilaç kullanıyorsanız ya da uzun bir aradan sonra spora başlıyorsanız hedef nabız aralığınızı hekiminiz belirlemelidir. Maksimum nabzı kendi kendinize test etmeye çalışmak, özellikle risk taşıyan kişilerde tehlikeli olabilir; gerekli görülürse efor testi sağlık kuruluşunda, gözetim altında yapılır. Egzersiz sırasında göğüs ağrısı, baş dönmesi ya da olağandışı nefes darlığı hissederseniz durun ve tıbbi yardım alın.`,
    ] },
  ],
  faq: [
    ['Maksimum nabız kaç olmalı?', `"Olması gereken" tek bir değer yoktur; maksimum nabız kişiye özgüdür ve yaşla birlikte düşer. Formüllere göre 20 yaşında yaklaşık 194–200, 40 yaşında 180, 60 yaşında 160–166 atım/dk civarındadır.`],
    ['220 eksi yaş formülü doğru mu?', `Kabaca doğru bir ortalama verir ve hatırlaması kolaydır, ancak bilimsel dayanağı zayıftır. Tanaka gibi sonradan geliştirilen formüller sağlıklı yetişkinlerde daha tutarlı kabul edilir. Fark 40 yaş civarında sıfır, uçlarda birkaç atımdır.`],
    ['Hangi formülü seçmeliyim?', `Genel kullanım için Tanaka makul bir seçimdir. Kadınlar Gulati formülünü de dikkate alabilir. Formüller arasındaki fark kişisel sapmadan küçük olduğundan, hangisini seçerseniz seçin sonucu yaklaşık değer olarak görün.`],
    ['Egzersizde nabzım maksimum değeri geçerse tehlikeli mi?', `Formülün verdiği sayı gerçek maksimumunuz olmayabilir; sağlıklı kişilerde tahmini değerin üzerine çıkılması tek başına tehlike göstergesi değildir. Ancak göğüs ağrısı, baş dönmesi ya da çarpıntı eşlik ediyorsa egzersizi bırakıp hekime başvurun.`],
    ['Maksimum nabız antrenmanla yükselir mi?', `Hayır, belirgin biçimde değişmez. Antrenmanla düşen dinlenme nabzıdır; ayrıca aynı hızda daha düşük nabızla koşabilir hâle gelirsiniz. Maksimum değer esas olarak yaşla azalır.`],
    ['Yağ yakımı için hangi nabız aralığında çalışmalıyım?', `Enerjinin yağdan gelen payı düşük-orta yoğunlukta, kabaca maksimumun yüzde 60–70'inde en yüksektir. Ancak kilo kontrolünde belirleyici olan toplam harcanan kaloridir; daha yoğun çalışmalar aynı sürede daha çok enerji harcatır.`],
    ['Gerçek maksimum nabzımı nasıl öğrenirim?', `En güvenilir yol, sağlık kuruluşunda gözetim altında yapılan efor testidir. Deneyimli ve sağlıklı sporcular saha testleriyle de ölçer, ancak bu testler çok zorlayıcıdır ve önceden hekim onayı alınmalıdır.`],
    ['Yaş bilgim kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız yaş hiçbir yere gönderilmez ve saklanmaz.`],
  ],
  related: ['nabiz-rezervi-hesapla', 'yag-yakim-bolgesi-hesapla', 'vo2-max-hesapla', 'kosu-hiz-bolgeleri-hesapla', 'kosu-kalori-hesapla'],
};
