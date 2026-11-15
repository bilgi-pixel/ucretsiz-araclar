export default {
  slug: 'watt-beygir-cevir',
  title: 'Watt Beygir Gücü Çevirici',
  h1Tail: 'W ↔ HP',
  pageTitle: 'Watt Beygir Gücü Çevirici – Watt\'tan HP\'ye, Beygirden Watt\'a',
  description: 'Watt değerini beygir gücüne, beygir gücünü watta çevirin. Elektrik motoru, pompa ve el aletleri için metrik (735,5 W) ve mekanik (745,7 W) beygir seçenekli.',
  card: 'Watt\'ı beygir gücüne, beygiri watta çevirin; pompa, motor ve el aletlerinin gücünü metrik ya da mekanik beygirle karşılaştırın.',
  category: 'birim',
  keywords: ['watt beygir çevirme', '1 beygir kaç watt', 'watt hp dönüştürme', '750 watt kaç beygir', 'hp watt hesaplama', '1 hp kaç watt', 'watt beygir gücü', 'motor watt hp'],
  lead: 'Watt (W) cinsinden verilen bir gücü beygir gücüne ya da beygir gücünü watta çevirin. <strong>1 metrik beygir = 735,5 W</strong>, <strong>1 mekanik beygir = 745,7 W</strong> eşitlikleri kullanılır; hangisini istediğinizi listeden seçebilirsiniz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Güç', type: 'number', placeholder: 'Örn. 1500' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['w', 'Watt → Beygir gücü'], ['hp', 'Beygir gücü → Watt']] },
    { id: 'tur', label: 'Beygir türü', type: 'select', options: [['ps', 'Metrik beygir (PS / BG) – 735,5 W'], ['hp', 'Mekanik beygir (hp) – 745,7 W']], hint: 'Elektrik motoru etiketlerinde "HP" çoğunlukla 746 W kabul edilen mekanik beygirdir.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Güç');
    const PS = 735.49875;
    const HP = 745.69987158227022;
    const mekanik = v.tur === 'hp';
    const w = v.yon === 'hp' ? x * (mekanik ? HP : PS) : x;
    const wRow = ['Watt', h.fmt(w, 2) + ' W'];
    const kwRow = ['Kilovat', h.fmt(w / 1000, 4) + ' kW'];
    const psRow = ['Metrik beygir (PS)', h.fmt(w / PS, 4) + ' PS'];
    const hpRow = ['Mekanik beygir (hp)', h.fmt(w / HP, 4) + ' hp'];
    const rows = v.yon === 'hp'
      ? [wRow, kwRow, psRow, hpRow]
      : (mekanik ? [hpRow, psRow, wRow, kwRow] : [psRow, hpRow, wRow, kwRow]);
    return {
      rows,
      note: '1 PS = 735,49875 W; 1 hp = 745,69987 W. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '1500', yon: 'w', tur: 'ps' }, out: { 'Metrik beygir (PS)': '2,0394 PS', 'Mekanik beygir (hp)': '2,0115 hp', 'Kilovat': '1,5 kW' } },
    { in: { deger: '1', yon: 'hp', tur: 'hp' }, out: { 'Watt': '745,7 W', 'Kilovat': '0,7457 kW' } },
    { in: { deger: '746', yon: 'w', tur: 'hp' }, out: { 'Mekanik beygir (hp)': '1,0004 hp', 'Metrik beygir (PS)': '1,0143 PS' } },
    { in: { deger: '1', yon: 'hp', tur: 'ps' }, out: { 'Watt': '735,5 W', 'Metrik beygir (PS)': '1 PS' } },
    { in: { deger: '0,5', yon: 'hp', tur: 'hp' }, out: { 'Watt': '372,85 W' } },
    { in: { deger: '2200', yon: 'w', tur: 'hp' }, out: { 'Mekanik beygir (hp)': '2,9502 hp', 'Metrik beygir (PS)': '2,9912 PS' } },
    { in: { deger: '3', yon: 'hp', tur: 'ps' }, out: { 'Watt': '2.206,5 W', 'Kilovat': '2,2065 kW' } },
    { in: { deger: '0', yon: 'w' }, out: { 'Metrik beygir (PS)': '0 PS' } },
    { in: { deger: '', yon: 'w' }, error: true },
    { in: { deger: '-750', yon: 'w' }, error: true },
  ],
  howto: [
    'Cihazın etiketinde yazan gücü "Güç" alanına girin. Değer kilovat ise önce 1000 ile çarpıp watt olarak yazın.',
    '"Çeviri yönü" listesinden watttan beygire mi, beygirden watta mı geçeceğinizi seçin.',
    '"Beygir türü" listesinden metrik ya da mekanik beygiri işaretleyin. Hangisi olduğunu bilmiyorsanız sonuçta ikisi de gösterildiği için karşılaştırabilirsiniz.',
    '"Çevir" düğmesine basın ve sonuç satırlarını okuyun; dilerseniz tümünü kopyalayın.',
  ],
  sections: [
    { h: 'Watt ve beygir gücü ilişkisi', p: [
      'Watt, SI\'ın güç birimidir: saniyede bir joule enerji aktarımına bir watt denir. Beygir gücü ise aynı büyüklüğü ölçen, tarihsel kökenli bir birimdir. İkisi arasında sabit bir oran vardır, ancak bu oran hangi beygirden söz edildiğine göre değişir. Metrik beygir 735,49875 W, mekanik beygir ise yaklaşık 745,7 W\'tır.',
      'Küçük güçlerde, yani elektrikli el aletlerinde, su pompalarında, hidroforlarda, kompresörlerde ve küçük sanayi motorlarında güç çoğunlukla watt ya da kilovat ile yazılır; satıcılar ve ustalar ise aynı cihazı "yarım beygir", "bir beygir", "iki beygir" diye anar. Bu sayfa, etiket ile gündelik adlandırma arasındaki boşluğu kapatmak içindir.',
    ] },
    { h: 'Formüller', p: [
      'Watttan beygire geçmek için bölme yapılır: <strong>PS = W ÷ 735,5</strong> ya da <strong>hp = W ÷ 745,7</strong>. Beygirden watta geçmek için çarpma yapılır: <strong>W = PS × 735,5</strong> ya da <strong>W = hp × 745,7</strong>.',
      'Pratikte motor etiketlerinde 1 HP için 746 W, hatta çoğu zaman yuvarlanarak 750 W (0,75 kW) alınır. Bu yuvarlama standart motor güç kademelerinden gelir ve gündelik seçimlerde bir sakınca yaratmaz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>1500 W\'lık motor:</strong> 1500 ÷ 735,49875 = 2,0394 PS; mekanik beygirle 1500 ÷ 745,69987 = 2,0115 hp. Piyasada bu motor "2 beygir" olarak anılır.',
      '<strong>Yarım beygir pompa:</strong> 0,5 hp × 745,69987 = 372,85 W. Etiketlerde bu değer çoğunlukla 0,37 kW olarak yazılır.',
      '<strong>2200 W\'lık kompresör:</strong> 2200 ÷ 745,69987 = 2,9502 hp, metrik beygirle 2,9912 PS; yani "3 beygir" sınıfı.',
      '<strong>3 PS\'lik motor:</strong> 3 × 735,49875 = 2206,5 W, yani 2,2065 kW.',
    ] },
    { h: 'Standart elektrik motoru kademeleri', p: [
      'Elektrik motorları belirli anma güçlerinde üretilir ve her kademenin yerleşmiş bir beygir adı vardır. Aşağıdaki eşleşmeler yuvarlak anma değerleridir; kesin karşılık için aracı kullanın.',
    ], ul: [
      '<strong>0,18 kW</strong> (180 W) – çeyrek beygir (1/4 HP)',
      '<strong>0,37 kW</strong> (370 W) – yarım beygir (1/2 HP)',
      '<strong>0,55 kW</strong> (550 W) – 3/4 HP',
      '<strong>0,75 kW</strong> (750 W) – 1 HP',
      '<strong>1,1 kW</strong> (1100 W) – 1,5 HP',
      '<strong>1,5 kW</strong> (1500 W) – 2 HP',
      '<strong>2,2 kW</strong> (2200 W) – 3 HP',
      '<strong>4 kW</strong> (4000 W) – 5,5 HP',
    ] },
    { h: 'Giriş gücü ile çıkış gücünü ayırın', p: [
      'Bir elektrik motorunun etiketindeki kW ya da HP değeri, milinden alınan <strong>mekanik çıkış gücüdür</strong>. Motorun şebekeden çektiği elektrik gücü bundan daha fazladır, çünkü bir kısım enerji ısı olarak kaybolur. Verimi yüzde 80 olan 750 W çıkışlı bir motor şebekeden yaklaşık 940 W çeker. Sigorta, kablo ya da jeneratör seçerken bu farkı ve motorun kalkış akımını dikkate almak gerekir.',
      'Ev tipi cihazlarda durum tersidir: elektrik süpürgesi, matkap ya da blender üzerindeki watt değeri genellikle şebekeden çekilen giriş gücüdür. 2000 W yazan bir süpürgenin emiş gücü 2,7 beygir değildir; bu değer yalnızca tükettiği elektriğin beygir karşılığıdır. Birim çevirisi doğru olsa da karşılaştırdığınız iki cihazın aynı tür gücü bildirdiğinden emin olun.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Bahçe sulaması için pompa seçerken, bir atölyeye kompresör alırken, tarla sulamasında dalgıç pompa gücünü değerlendirirken ya da eski bir motoru yenisiyle değiştirirken watt–beygir dönüşümü gerekir. Yurt dışından alınan makinelerin kılavuzunda güç mekanik beygirle yazabilir; yerli muadilini bulmak için watt karşılığını bilmek işi kolaylaştırır. Jeneratör seçerken de çalıştırılacak motorların beygir değerlerini watta çevirip toplamak ilk adımdır.',
    ] },
    { h: 'Uyarı', p: [
      'Bu araç yalnızca birim çevirir. Motor, kablo, sigorta, kontaktör ya da jeneratör seçimi; verim, güç faktörü, kalkış akımı ve çalışma koşulları gibi etkenlere bağlıdır. Elektrik tesisatıyla ilgili kararlar için yetkili bir elektrikçiye ya da elektrik mühendisine danışın.',
    ] },
  ],
  faq: [
    ['1 beygir kaç watt eder?', 'Metrik beygir 735,5 W, mekanik beygir 745,7 W eder. Elektrik motoru etiketlerinde 1 HP genellikle 746 W ya da yuvarlak olarak 750 W kabul edilir.'],
    ['750 watt kaç beygirdir?', '750 W yaklaşık 1,0197 metrik beygir ya da 1,0058 mekanik beygirdir; piyasada 1 beygir olarak anılır.'],
    ['1000 watt kaç beygir eder?', '1000 W (1 kW) yaklaşık 1,36 metrik beygir ya da 1,341 mekanik beygirdir.'],
    ['Yarım beygir motor kaç watt çeker?', 'Yarım beygirlik motorun mil gücü yaklaşık 370 W\'tır. Şebekeden çektiği güç verime bağlı olarak bundan daha yüksektir; kesin değer için motor etiketindeki akım ve verim bilgisine bakın.'],
    ['2000 W süpürge kaç beygirdir?', 'Birim olarak 2000 W yaklaşık 2,72 metrik beygirdir. Ancak süpürgelerdeki watt değeri çekilen elektrik gücüdür; emiş performansını doğrudan göstermez.'],
    ['HP ile BG arasında fark var mı?', 'BG, beygir gücünün Türkçe kısaltmasıdır ve metrik beygiri ifade eder. HP ise İngilizce "horsepower" kısaltmasıdır; ABD kaynaklarında mekanik beygiri, Türkiye\'deki gündelik kullanımda çoğunlukla herhangi bir beygiri anlatır.'],
    ['Kilovatı doğrudan girebilir miyim?', 'Araç watt ile çalışır. Kilovat değerini 1000 ile çarparak girin; örneğin 1,5 kW için 1500 yazın. Sonuç kutusunda kilovat karşılığı ayrıca gösterilir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır, yazdığınız değerler sunucuya iletilmez.'],
  ],
  related: ['beygir-kw-cevir', 'kw-watt-cevir', 'motor-guc-tork-hesapla', 'elektrik-gucu-hesapla', 'amper-watt-cevir'],
};
