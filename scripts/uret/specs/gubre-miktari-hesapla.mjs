export default {
  slug: 'gubre-miktari-hesapla',
  title: 'Gübre Miktarı Hesaplama',
  h1Tail: 'saf besinden ticari gübreye',
  pageTitle: 'Gübre Miktarı Hesaplama – Dekara Kaç Kg Gübre Atılır?',
  description: 'Dekara önerilen saf azot, fosfor ya da potasyum miktarını ticari gübre kilosuna çevirin. Toplam gübre, dekara düşen miktar ve torba sayısını hesaplar.',
  card: 'Saf besin önerisini gübre kilosuna çevirin: toplam miktar, dekara düşen gübre ve gereken torba sayısı.',
  category: 'gunluk',
  keywords: ['gübre miktarı hesaplama', 'dekara kaç kg gübre', 'saf azot hesaplama', 'üre gübresi hesaplama', 'gübre torba hesabı', 'saf madde gübre hesabı', 'dönüme gübre miktarı'],
  lead: 'Toprak analizi raporları ve gübreleme önerileri çoğunlukla <strong>dekara saf besin</strong> (örneğin 8 kg saf azot) olarak verilir; torbanın içindeki gübre ise yalnızca belli bir oranda besin taşır. Bu araç, saf besin önerisini elinizdeki gübrenin yüzdesine göre gerçek gübre kilosuna ve torba sayısına çevirir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Arazi büyüklüğü (dekar)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'doz', label: 'Önerilen saf besin (kg/dekar)', type: 'number', placeholder: 'Örn. 8', hint: 'Analiz raporundaki saf N, P₂O₅ ya da K₂O değeri' },
    { id: 'oran', label: 'Gübredeki besin oranı (%)', type: 'number', placeholder: 'Örn. 46', hint: 'Torbanın üzerindeki yüzde; üre için 46' },
    { id: 'torba', label: 'Torba ağırlığı (kg)', type: 'number', value: '50' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Arazi büyüklüğü');
    const doz = h.pos(v.doz, 'Önerilen saf besin');
    const oran = h.pos(v.oran, 'Gübredeki besin oranı');
    if (oran > 100) h.err('Gübredeki besin oranı %100\'den büyük olamaz; torbanın üzerindeki yüzdeyi yazın (örn. 46).');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    const saf = alan * doz;
    const gubre = saf / (oran / 100);
    const dekara = gubre / alan;
    const adet = Math.ceil(gubre / torba - 1e-9);
    return {
      rows: [
        ['Gereken toplam gübre', h.fmt(gubre, 2) + ' kg'],
        ['Dekara atılacak gübre', h.fmt(dekara, 2) + ' kg/da'],
        ['Toplam saf besin', h.fmt(saf, 2) + ' kg'],
        ['Gereken torba sayısı', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 2)} kg\'lık)`],
        ['Ton karşılığı', h.fmt(gubre / 1000, 3) + ' ton'],
      ],
      note: 'Formül: gübre = alan × saf besin ÷ (oran ÷ 100). Torba sayısı yukarı yuvarlanır. Doz önerisi için toprak analizi esas alınmalıdır.',
    };
  },
  cases: [
    { in: { alan: '10', doz: '8', oran: '46', torba: '50' }, out: { 'Gereken toplam gübre': '173,91 kg', 'Dekara atılacak gübre': '17,39 kg/da', 'Toplam saf besin': '80 kg', 'Gereken torba sayısı': '4 torba (50 kg\'lık)' } },
    { in: { alan: '5', doz: '10', oran: '21', torba: '50' }, out: { 'Gereken toplam gübre': '238,1 kg', 'Dekara atılacak gübre': '47,62 kg/da', 'Gereken torba sayısı': '5 torba (50 kg\'lık)' } },
    { in: { alan: '100', doz: '12', oran: '33', torba: '50' }, out: { 'Gereken toplam gübre': '3.636,36 kg', 'Gereken torba sayısı': '73 torba (50 kg\'lık)', 'Ton karşılığı': '3,636 ton' } },
    { in: { alan: '20', doz: '4,6', oran: '46', torba: '50' }, out: { 'Gereken toplam gübre': '200 kg', 'Dekara atılacak gübre': '10 kg/da', 'Gereken torba sayısı': '4 torba (50 kg\'lık)' } },
    { in: { alan: '1', doz: '5', oran: '100', torba: '25' }, out: { 'Gereken toplam gübre': '5 kg', 'Gereken torba sayısı': '1 torba (25 kg\'lık)' } },
    { in: { alan: '30', doz: '6', oran: '15', torba: '50' }, out: { 'Gereken toplam gübre': '1.200 kg', 'Dekara atılacak gübre': '40 kg/da', 'Gereken torba sayısı': '24 torba (50 kg\'lık)', 'Ton karşılığı': '1,2 ton' } },
    { in: { alan: '10', doz: '8', oran: '146', torba: '50' }, error: true },
    { in: { alan: '0', doz: '8', oran: '46', torba: '50' }, error: true },
    { in: { alan: '10', doz: '', oran: '46', torba: '50' }, error: true },
  ],
  howto: [
    'Arazinizin büyüklüğünü dekar (dönüm) olarak yazın. Hektar biliyorsanız 10 ile çarpın; 2,5 hektar 25 dekardır.',
    'Toprak analizi raporunda ya da gübreleme rehberinde verilen dekara saf besin miktarını (kg/da) girin.',
    'Kullanacağınız gübrenin torbasında yazan besin yüzdesini yazın: üre için 46, amonyum sülfat için 21 gibi.',
    'Torba ağırlığını gerekirse değiştirin (çoğu gübre 50 kg\'lık torbadadır) ve "Hesapla" düğmesine basın.',
    'Sonuçtaki toplam kiloyu, dekara düşen miktarı ve torba sayısını sipariş verirken ya da gübre mibzerini ayarlarken kullanın.',
  ],
  sections: [
    { h: 'Saf besin ile ticari gübre arasındaki fark', p: [
      'Gübre torbasının tamamı bitki besini değildir. Üre gübresinin yüzde 46\'sı azottur; 50 kiloluk bir torbada 23 kg saf azot bulunur, kalan kısım taşıyıcı bileşiktir. Bu yüzden "dekara 8 kilo azot" önerisini "dekara 8 kilo üre" diye uygulamak, bitkiye gerekenin yarısından azını vermek anlamına gelir. Tersi de sık görülür: saf besin değeri ile gübre miktarını karıştırıp gereğinden fazla atmak hem masrafı artırır hem de bitkide yanıklığa, yatmaya ve yeraltı suyuna azot karışmasına yol açabilir.',
      'Analiz raporlarında azot <strong>N</strong>, fosfor <strong>P<sub>2</sub>O<sub>5</sub></strong>, potasyum ise <strong>K<sub>2</sub>O</strong> cinsinden yazılır. Torba üzerindeki yüzdeler de aynı cinstendir, dolayısıyla ek bir dönüşüm yapmadan doğrudan bölme işlemi yeterlidir.',
    ] },
    { h: 'Hesaplama formülü ve çözümlü örnek', p: [
      'Formül tek satırdır: <strong>gübre miktarı (kg) = alan (da) × saf besin (kg/da) ÷ (gübredeki oran ÷ 100)</strong>. Önce toplam saf besin ihtiyacı bulunur, sonra bu değer gübrenin besin oranına bölünür.',
      'Örnek: 10 dekarlık buğday tarlasına üstten dekara 8 kg saf azot verilecek ve yüzde 46\'lık üre kullanılacak. Toplam saf azot 10 × 8 = 80 kg\'dır. Gereken üre 80 ÷ 0,46 = 173,91 kg eder; dekara 17,39 kg üre düşer. 50 kiloluk torbalarla 173,91 ÷ 50 = 3,48 torba çıkar; yarım torba satılmadığı için 4 torba alınır. Araç aynı girdilerle tam olarak bu sonuçları verir.',
      'Aynı azotu yüzde 21\'lik amonyum sülfatla vermek isterseniz miktar belirgin biçimde artar: 5 dekar için dekara 10 kg saf azot, 50 ÷ 0,21 = 238,1 kg gübre, yani 5 torba demektir. Besin oranı düştükçe taşınacak ve serpilecek gübre miktarı büyür; nakliye ve işçilik hesabında bunu göz önünde bulundurun.',
    ] },
    { h: 'Yaygın gübrelerin besin oranları', ul: [
      '<strong>Üre:</strong> %46 azot (N)',
      '<strong>Amonyum nitrat:</strong> %33 azot',
      '<strong>Kalsiyum amonyum nitrat (CAN):</strong> %26 azot',
      '<strong>Amonyum sülfat:</strong> %21 azot (ayrıca kükürt içerir)',
      '<strong>Diamonyum fosfat (DAP):</strong> %18 azot, %46 fosfor (P<sub>2</sub>O<sub>5</sub>)',
      '<strong>Triple süper fosfat (TSP):</strong> yaklaşık %42–46 fosfor',
      '<strong>Potasyum sülfat:</strong> yaklaşık %50 potasyum (K<sub>2</sub>O)',
      '<strong>15-15-15 kompoze:</strong> %15 azot, %15 fosfor, %15 potasyum',
      '<strong>20-20-0 kompoze:</strong> %20 azot, %20 fosfor',
    ], p: [
      'Oranlar üreticiye göre küçük farklar gösterebilir; hesaba her zaman kendi torbanızın etiketindeki değeri yazın.',
    ] },
    { h: 'Kompoze gübrelerde hesap nasıl yapılır?', p: [
      'Kompoze gübre birden fazla besini aynı anda taşır. Hesabı, en çok önem verdiğiniz ya da sınırlayıcı olan besine göre yaparsınız; diğer besinlerin ne kadar verilmiş olduğunu ise sonuçtan geri hesaplarsınız. Örneğin 30 dekarlık bir alana dekara 6 kg saf fosfor verilecekse ve 15-15-15 kullanılacaksa oran alanına 15 yazılır: 30 × 6 ÷ 0,15 = 1.200 kg, yani dekara 40 kg ve 24 torba gübre gerekir. Bu 40 kg\'lık uygulama aynı zamanda dekara 6 kg azot ve 6 kg potasyum da bırakır.',
      'Azot ihtiyacının geri kalanı genellikle üst gübre olarak ayrıca verilir. Öneri 14 kg saf azotsa ve tabandan 6 kg\'ı kompoze ile gittiyse, kalan 8 kg için aracı bir kez daha çalıştırıp üre ya da amonyum nitrat miktarını bulabilirsiniz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Saf besin önerisini doğrudan gübre kilosu sanmak; sonuç olarak eksik gübreleme yapmak.',
      'Dekar ile hektarı karıştırmak: hektara 80 kg öneri, dekara 8 kg demektir.',
      'DAP gibi iki besinli gübrede azot ve fosfor yüzdesini toplayıp tek oran gibi kullanmak.',
      'Oranı ondalık yazmak: alana 0,46 değil 46 girilmelidir.',
      'Gübrenin tamamını tek seferde vermek; özellikle azotun bölünerek uygulanması genellikle önerilir.',
      'Mibzer ya da gübre serpme makinesini kalibre etmeden hesaplanan dekara miktarı tutturmaya çalışmak.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu araç yalnızca aritmetik dönüşüm yapar; hangi bitkiye ne kadar besin verileceğini söylemez. Doğru doz; toprağın mevcut besin durumuna, ekilecek ürüne, hedeflenen verime, sulama koşullarına ve önceki ürüne göre değişir. En güvenilir yol, tarladan usulüne uygun alınmış örnekle yaptırılan toprak analizidir. Sonuçlar bilgilendirme amaçlıdır; uygulama kararı için ziraat mühendisine ya da il/ilçe tarım müdürlüğüne danışın.',
      'Sıvı gübreler, yaprak gübreleri ve organik materyaller (çiftlik gübresi, kompost) için besin içeriği ve yarayışlılık farklı değerlendirilir; burada hesaplanan miktar katı kimyasal gübreler için geçerlidir.',
    ] },
  ],
  faq: [
    ['Dekara 10 kg saf azot için kaç kg üre atılır?', 'Üre %46 azot içerdiğinden 10 ÷ 0,46 = 21,74 kg üre gerekir. Yani dekara yaklaşık 22 kg üre, 10 kg saf azot sağlar.'],
    ['Bir torba üre kaç kilo saf azot içerir?', '50 kiloluk bir torba ürede 50 × 0,46 = 23 kg saf azot vardır. Aynı ağırlıktaki amonyum sülfat torbasında ise 10,5 kg azot bulunur.'],
    ['Saf madde ne demek?', 'Saf madde ya da saf besin, gübrenin içindeki bitki besin elementinin net miktarıdır. Gübreleme önerileri gübre türünden bağımsız olsun diye saf besin üzerinden verilir; kullanılacak gübreye göre kiloya çevrilmesi gerekir.'],
    ['Dönüm ile dekar aynı mı?', 'Günümüzde resmî kullanımda bir dönüm bir dekara, yani 1.000 metrekareye eşit kabul edilir. Yörelere göre değişen eski dönüm ölçüleriyle çalışıyorsanız önce alanı metrekareye çevirip 1.000\'e bölün.'],
    ['Torba sayısı neden yukarı yuvarlanıyor?', 'Gübre açık olarak değil torbayla satıldığı için 3,48 torbalık ihtiyaç 4 torba alınarak karşılanır. Kalan gübreyi nemden korunan kuru bir yerde, ağzı kapalı biçimde saklayabilirsiniz.'],
    ['Fosforu P₂O₅ yerine saf P olarak biliyorsam ne yapmalıyım?', 'Saf fosforu (P) P₂O₅ cinsine çevirmek için yaklaşık 2,29 ile, saf potasyumu (K) K₂O cinsine çevirmek için yaklaşık 1,2 ile çarpın. Torba etiketleri oksit cinsinden yazıldığı için hesabı bu değerlerle yapmalısınız.'],
    ['Hektarlık öneriyi nasıl girerim?', 'Hektara verilen kg değerini 10\'a bölerek dekara çevirin. Hektara 120 kg saf azot, dekara 12 kg demektir. Alanı da dekar olarak girdiğinizde sonuç doğru çıkar.'],
    ['Girdiğim arazi ve doz bilgileri saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['tohum-miktari-hesapla', 'ilaclama-suyu-hesapla', 'dekar-verim-hesapla', 'donum-metrekare-cevir', 'hektar-donum-cevir'],
};
