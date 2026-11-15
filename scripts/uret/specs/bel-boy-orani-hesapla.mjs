export default {
  slug: 'bel-boy-orani-hesapla',
  title: 'Bel Boy Oranı Hesaplama',
  h1Tail: 'BBO',
  pageTitle: 'Bel Boy Oranı Hesaplama – Bel Çevresi Boyun Yarısını Geçmesin',
  description: 'Bel çevrenizi ve boyunuzu yazın, bel boy oranınızı ve hangi aralıkta olduğunuzu öğrenin. Boyunuza göre bel çevresi üst sınırını da gösterir.',
  card: 'Bel çevresi ve boydan bel boy oranını hesaplayın; boyunuzun yarısına göre bel çevresi sınırınızı görün.',
  category: 'saglik',
  keywords: ['bel boy oranı hesaplama', 'bel boy oranı kaç olmalı', 'bel çevresi boy oranı', 'bel çevresi boyun yarısı', 'bbo hesaplama', 'bel çevresi kaç olmalı', 'karın yağlanması ölçümü'],
  lead: 'Bel çevrenizi boyunuza bölerek <strong>bel boy oranınızı</strong> bulun. Temel kural akılda kalıcıdır: bel çevreniz boyunuzun yarısından az olmalı. Araç oranı, bulunduğunuz aralığı ve boyunuza karşılık gelen sınır bel ölçüsünü verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bel', label: 'Bel çevresi (cm)', type: 'number', placeholder: 'Örn. 82', hint: 'En alt kaburga ile kalça kemiği arasının ortasından, nefes verdikten sonra ölçün.' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 170' },
  ],
  compute(v, h) {
    const bel = h.pos(v.bel, 'Bel çevresi');
    const boy = h.pos(v.boy, 'Boy');
    if (boy < 50 || boy > 250) h.err('Boy 50 ile 250 cm arasında olmalı; metre yerine santimetre yazın (1,70 değil 170).');
    if (bel < 20 || bel > 250) h.err('Bel çevresi 20 ile 250 cm arasında olmalı; değeri santimetre olarak yazın.');
    const oran = bel / boy;
    const o = oran + 1e-9;
    const durum = o >= 0.6 ? 'Yüksek risk (0,60 ve üzeri)'
      : o >= 0.5 ? 'Artmış risk (0,50–0,59)'
      : o >= 0.4 ? 'Sağlıklı aralık (0,40–0,49)'
      : 'Düşük (0,40 altı)';
    const sinir = boy * 0.5;
    const fark = bel - sinir;
    return {
      rows: [
        ['Bel boy oranı', h.fix(oran, 2)],
        ['Değerlendirme', durum],
        ['Boyunuza göre bel çevresi üst sınırı', h.fmt(sinir, 1) + ' cm'],
        ['Sınıra göre durum', fark > 1e-9 ? `Sınırın ${h.fmt(fark, 1)} cm üzerinde` : Math.abs(fark) <= 1e-9 ? 'Tam sınırda' : `Sınırın ${h.fmt(-fark, 1)} cm altında`],
        ['Sağlıklı aralığa karşılık gelen bel çevresi', `${h.fmt(boy * 0.4, 1)} – ${h.fmt(sinir, 1)} cm`],
      ],
      note: 'Aralıklar yetişkinler için yaygın kullanılan sınırlardır ve kadın-erkek ayrımı yapılmaz. Sonuç tanı değildir.',
    };
  },
  cases: [
    { in: { bel: '80', boy: '170' }, out: { 'Bel boy oranı': '0,47', 'Değerlendirme': 'Sağlıklı aralık (0,40–0,49)', 'Boyunuza göre bel çevresi üst sınırı': '85 cm', 'Sınıra göre durum': 'Sınırın 5 cm altında' } },
    { in: { bel: '110', boy: '175' }, out: { 'Bel boy oranı': '0,63', 'Değerlendirme': 'Yüksek risk (0,60 ve üzeri)', 'Boyunuza göre bel çevresi üst sınırı': '87,5 cm', 'Sınıra göre durum': 'Sınırın 22,5 cm üzerinde' } },
    { in: { bel: '85', boy: '170' }, out: { 'Bel boy oranı': '0,50', 'Değerlendirme': 'Artmış risk (0,50–0,59)', 'Sınıra göre durum': 'Tam sınırda' } },
    { in: { bel: '60', boy: '180' }, out: { 'Bel boy oranı': '0,33', 'Değerlendirme': 'Düşük (0,40 altı)' } },
    { in: { bel: '70', boy: '175' }, out: { 'Bel boy oranı': '0,40', 'Değerlendirme': 'Sağlıklı aralık (0,40–0,49)', 'Sağlıklı aralığa karşılık gelen bel çevresi': '70 – 87,5 cm' } },
    { in: { bel: '96', boy: '160' }, out: { 'Bel boy oranı': '0,60', 'Değerlendirme': 'Yüksek risk (0,60 ve üzeri)', 'Boyunuza göre bel çevresi üst sınırı': '80 cm' } },
    { in: { bel: '80', boy: '1,70' }, error: true },
    { in: { bel: 'seksen', boy: '170' }, error: true },
    { in: { bel: '80', boy: '' }, error: true },
  ],
  howto: [
    'Bel çevrenizi esnemeyen bir mezurayla, ayakta ve karnınızı serbest bırakarak ölçün; değeri santimetre olarak yazın.',
    'Boyunuzu santimetre cinsinden girin. 1 metre 70 santim için 170 yazmanız gerekir.',
    '"Hesapla" düğmesine basın. İlk satırda oranınız, ikinci satırda hangi aralığa düştüğünüz görünür.',
    'Üçüncü ve dördüncü satırlardan boyunuzun yarısına karşılık gelen sınır bel ölçüsünü ve bu sınıra kaç santimetre uzak olduğunuzu okuyun.',
  ],
  sections: [
    { h: 'Bel boy oranı neyi ölçer?', p: [
      'Bel boy oranı (BBO), bel çevresinin boya bölünmesiyle bulunur: <strong>BBO = bel çevresi ÷ boy</strong>. İki ölçü aynı birimde olduğu sürece sonuç birimsizdir. Oran, karın bölgesinde biriken yağın kişinin vücut ölçüsüne göre ne kadar olduğunu kabaca gösterir.',
      'Tek başına bel çevresi de bir göstergedir, ancak 155 cm boyundaki biriyle 190 cm boyundaki birinin aynı bel ölçüsüne sahip olması aynı anlama gelmez. Bel boy oranı bu farkı boya bölerek giderir. Ayrıca kadınlar ve erkekler için ayrı eşik gerektirmemesi ve tek bir cümleyle özetlenebilmesi onu pratik kılar: <em>bel çevrenizi boyunuzun yarısının altında tutun</em>.',
    ] },
    { h: 'Adım adım örnek hesap', p: [
      'Boyu 170 cm, bel çevresi 80 cm olan bir kişi için oran 80 ÷ 170 = 0,4706, yani yuvarlanınca <strong>0,47</strong> olur. Bu değer 0,40 ile 0,49 arasındaki sağlıklı aralıktadır. Boyun yarısı 85 cm olduğundan kişi sınırın 5 cm altındadır.',
      'Boyu 175 cm, bel çevresi 110 cm olan bir başka kişide oran 110 ÷ 175 = 0,6286, yani <strong>0,63</strong> çıkar. Bu, 0,60 ve üzeri olan yüksek risk bandıdır. Bu boy için sınır 87,5 cm\'dir; kişi sınırın 22,5 cm üzerindedir.',
    ] },
    { h: 'Aralıklar nasıl yorumlanır?', ul: [
      '<strong>0,40 altı:</strong> Bel çevresi boya göre düşüktür. Çok zayıf kişilerde görülür; yetersiz beslenme açısından ayrıca değerlendirilmesi gerekebilir.',
      '<strong>0,40–0,49:</strong> Sağlıklı kabul edilen aralık. Karın bölgesinde belirgin yağlanma beklenmez.',
      '<strong>0,50–0,59:</strong> Artmış risk. Bel çevresi boyun yarısını geçmiştir; beslenme ve hareket alışkanlıklarını gözden geçirmek yerinde olur.',
      '<strong>0,60 ve üzeri:</strong> Yüksek risk. Karın bölgesinde yağlanma belirgindir; bir sağlık uzmanıyla görüşmek önerilir.',
    ], p: [
      'Bu sınırlar, bel boy oranı üzerine yapılan çalışmalarda önerilen ve halk sağlığı mesajlarında yaygınlaşan değerlerdir. Bazı kaynaklar yaşa göre biraz farklı eşikler kullanır; buradaki sınıflama genel bir çerçevedir.',
    ] },
    { h: 'Vücut kitle indeksinden farkı', p: [
      'Vücut kitle indeksi kilo ile boyu ilişkilendirir ama o kilonun kas mı yağ mı olduğunu, yağın nerede biriktiğini söylemez. Kaslı bir sporcunun indeksi "fazla kilolu" çıkabilirken beli incedir; öte yandan indeksi normal görünen ama göbek bölgesinde yağlanması olan kişiler de vardır. Bel boy oranı tam bu ikinci grubu yakalamakta işe yarar. İki göstergeyi birlikte kullanmak, tek birine güvenmekten daha doğru bir fikir verir.',
    ] },
    { h: 'Boya göre sınır bel çevreleri', p: ['Aşağıdaki değerler boyun yarısıdır; bel çevresinin bu ölçünün altında kalması hedeflenir.'], ul: [
      '<strong>150 cm boy:</strong> 75 cm',
      '<strong>160 cm boy:</strong> 80 cm',
      '<strong>165 cm boy:</strong> 82,5 cm',
      '<strong>170 cm boy:</strong> 85 cm',
      '<strong>175 cm boy:</strong> 87,5 cm',
      '<strong>180 cm boy:</strong> 90 cm',
      '<strong>190 cm boy:</strong> 95 cm',
    ] },
    { h: 'Değişimi takip etmek', p: [
      'Boy yetişkinlikte neredeyse sabit kaldığı için bel boy oranındaki her değişim doğrudan bel çevresindeki değişimi yansıtır. Bu da onu tartıya göre daha sakin bir takip ölçüsü yapar: günlük su tutulması ya da öğün saati kiloyu bir iki kilogram oynatabilirken bel çevresi daha yavaş ve daha anlamlı değişir. Ayda bir, aynı gün ve saatte ölçüp not almak yeterlidir. 170 cm boyundaki biri için bel çevresindeki her 1,7 cm\'lik azalma oranı 0,01 düşürür.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, bel çevresi yerine pantolon bedenini yazmaktır. Pantolonlar genellikle kalça kemiğinin üzerinde durur ve beden numarası gerçek bel çevresinden küçüktür. İkinci hata, karnı içeri çekerek ölçmektir; ölçüm normal nefes verişin sonunda, kaslar gevşekken alınmalıdır. Boyu metre cinsinden (1,70) yazmak da sık rastlanan bir yanlıştır; araç bu durumda uyarı verir.',
      'Bel boy oranı gebelikte, karında sıvı birikimine neden olan hastalıklarda ve büyüme çağındaki çocuklarda bu sınırlarla yorumlanmamalıdır. Sonuç bilgilendirme amaçlıdır; sağlığınızla ilgili karar verirken hekiminize danışın.',
    ] },
  ],
  faq: [
    ['Bel boy oranı kaç olmalı?', 'Yetişkinler için 0,40 ile 0,49 arası sağlıklı aralık kabul edilir. Pratik kural, bel çevresinin boyun yarısından az olmasıdır; yani oranın 0,50\'nin altında kalması.'],
    ['Bel boy oranı nasıl hesaplanır?', 'Bel çevresi boya bölünür; ikisi de santimetre olmalıdır. 85 cm bel ve 170 cm boy için 85 ÷ 170 = 0,50 bulunur.'],
    ['170 cm boyunda bel çevresi en fazla kaç olmalı?', 'Boyun yarısı kuralına göre 85 cm\'nin altında olmalıdır. Sağlıklı aralık 68 ile 85 cm arasına karşılık gelir.'],
    ['Kadın ve erkek için sınır farklı mı?', 'Bel boy oranında genellikle tek bir sınır kullanılır; boya bölme işlemi cinsiyetler arasındaki ölçü farkını büyük oranda dengeler. Bel kalça oranında ise kadın ve erkek için ayrı eşikler vardır.'],
    ['Bel çevresini göbek deliğinden mi ölçmeliyim?', 'Önerilen nokta, en alt kaburga ile kalça kemiğinin üst kenarı arasının ortasıdır. Göbek deliği kişiden kişiye farklı yükseklikte olabildiği için güvenilir bir işaret değildir.'],
    ['Oranım 0,50\'nin biraz üstünde, bu ciddi mi?', 'Tek başına bir hastalık göstergesi değildir; bel çevresinin boya göre artmaya başladığını söyler. Ölçümü birkaç hafta arayla yineleyip eğilime bakmak ve gerekirse bir sağlık uzmanına danışmak uygun olur.'],
    ['Çocuklarda bu oran kullanılabilir mi?', 'Boyun yarısı kuralı çocuklar için de bir tarama ölçütü olarak anılır, ancak büyüme dönemindeki değerlendirme yaşa özgü eğrilerle yapılır. Çocuklarla ilgili yorum için çocuk hekimine başvurun.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. İşlem cihazınızdaki tarayıcıda gerçekleşir; boy ve bel bilgileriniz hiçbir sunucuya iletilmez.'],
  ],
  related: ['bel-kalca-orani-hesapla', 'ideal-bel-cevresi-hesapla', 'vki-hesapla', 'vucut-yag-orani-hesapla', 'ideal-kilo-hesapla'],
};
