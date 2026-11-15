export default {
  slug: 'amper-watt-cevir',
  title: 'Amper Watt Çevirici',
  h1Tail: 'A ↔ W',
  pageTitle: 'Amper Watt Çevirici – Amperi Watta, Wattı Ampere Çevirme',
  description: 'Amperi watta, wattı ampere çevirin. Doğru akım, tek faz ve üç faz için gerilim ve güç faktörünü hesaba katar; kW ve VA karşılığını da gösterir.',
  card: 'Amperi watta ya da wattı ampere çevirin; DC, tek faz ve üç faz devrelerde gerilim ve cos φ ile birlikte.',
  category: 'elektrik',
  keywords: ['amper watt çevirme', '1 amper kaç watt', 'watt amper hesaplama', 'kaç amper çeker', 'amperden watt bulma', 'watt kaç amper', '16 amper kaç watt'],
  lead: 'Akımı (amper) güce (watt) ya da gücü akıma çevirin. Amper ile watt arasında sabit bir oran yoktur; sonuç <strong>gerilime</strong>, alternatif akımda ayrıca <strong>güç faktörüne</strong> bağlıdır. Araç doğru akım, tek faz ve üç faz için ayrı formül kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 10' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['aw', 'Amper → Watt'], ['wa', 'Watt → Amper']] },
    { id: 'sistem', label: 'Devre türü', type: 'select', options: [['tek', 'Alternatif akım – tek faz'], ['uc', 'Alternatif akım – üç faz'], ['dc', 'Doğru akım (DC)']] },
    { id: 'gerilim', label: 'Gerilim (V)', type: 'number', value: '230', hint: 'Üç fazda fazlar arası gerilimi yazın (Türkiye şebekesinde 400 V).' },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '1', hint: '0 ile 1 arasında. Isıtıcı gibi omik yüklerde 1; doğru akımda dikkate alınmaz.' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const V = h.pos(v.gerilim, 'Gerilim');
    const dc = v.sistem === 'dc';
    const pf = dc ? 1 : h.pos(v.cosfi, 'Güç faktörü');
    if (pf > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,8).');
    const k = v.sistem === 'uc' ? Math.sqrt(3) : 1;
    let I, P;
    if (v.yon === 'wa') { P = x; I = P / (k * V * pf); } else { I = x; P = k * V * I * pf; }
    const S = k * V * I;
    const rows = [];
    if (v.yon === 'wa') {
      rows.push(['Akım', h.fmt(I, 2) + ' A']);
      rows.push(['Güç', h.fmt(P, 2) + ' W']);
    } else {
      rows.push(['Güç', h.fmt(P, 2) + ' W']);
      rows.push(['Akım', h.fmt(I, 2) + ' A']);
    }
    rows.push(['Kilowatt', h.fmt(P / 1000, 4) + ' kW']);
    if (!dc) rows.push(['Görünür güç', h.fmt(S, 2) + ' VA']);
    const formul = dc ? 'P = V × I' : (v.sistem === 'uc' ? 'P = √3 × V × I × cos φ (V: fazlar arası gerilim)' : 'P = V × I × cos φ');
    return { rows, note: 'Kullanılan formül: ' + formul + '. Sonuç bilgilendirme amaçlıdır; sigorta ve kablo seçimini yetkili bir elektrikçi yapmalıdır.' };
  },
  cases: [
    { in: { deger: '10', yon: 'aw', sistem: 'tek', gerilim: '230', cosfi: '1' }, out: { 'Güç': '2.300 W', 'Kilowatt': '2,3 kW', 'Görünür güç': '2.300 VA' } },
    { in: { deger: '2000', yon: 'wa', sistem: 'tek', gerilim: '230', cosfi: '1' }, out: { 'Akım': '8,7 A' } },
    { in: { deger: '16', yon: 'aw', sistem: 'tek', gerilim: '230', cosfi: '0,8' }, out: { 'Güç': '2.944 W', 'Görünür güç': '3.680 VA' } },
    { in: { deger: '10', yon: 'aw', sistem: 'uc', gerilim: '400', cosfi: '0,8' }, out: { 'Güç': '5.542,56 W', 'Görünür güç': '6.928,2 VA' } },
    { in: { deger: '60', yon: 'wa', sistem: 'dc', gerilim: '12' }, out: { 'Akım': '5 A', 'Kilowatt': '0,06 kW' } },
    { in: { deger: '11000', yon: 'wa', sistem: 'uc', gerilim: '400', cosfi: '0,85' }, out: { 'Akım': '18,68 A' } },
    { in: { deger: '10', yon: 'aw', sistem: 'tek', gerilim: '230', cosfi: '1,5' }, error: true },
    { in: { deger: 'abc', yon: 'aw', sistem: 'tek', gerilim: '230', cosfi: '1' }, error: true },
    { in: { deger: '10', yon: 'aw', sistem: 'dc', gerilim: '0' }, error: true },
  ],
  howto: [
    '"Değer" alanına elinizdeki sayıyı yazın: amperi watta çevirecekseniz akımı, wattı ampere çevirecekseniz gücü girin.',
    '"Çeviri yönü" ve "Devre türü" listelerinden uygun seçenekleri belirleyin. Ev prizleri tek faz, sanayi motorları çoğunlukla üç faz, akü ve adaptör çıkışları doğru akımdır.',
    'Gerilimi yazın. Ev prizi için 230 V, üç fazlı tesisatta fazlar arası 400 V, araç aküsünde 12 V kullanılır.',
    'Motor, kompresör, floresan gibi yüklerde etiketteki cos φ değerini girin; bilmiyorsanız ve yük ısıtıcı türündeyse 1 olarak bırakın.',
    '"Çevir" düğmesine basın; sonucu watt, kilowatt ve görünür güç (VA) olarak okuyun.',
  ],
  sections: [
    { h: 'Amper ile watt neden doğrudan çevrilemez?', p: [
      'Amper bir iletkenden geçen akımın, watt ise harcanan gücün birimidir. İkisi farklı büyüklükleri ölçtüğü için "1 amper şu kadar watt eder" diye tek bir cevap verilemez. Aradaki bağı gerilim kurar: aynı 10 amperlik akım 12 voltluk bir aküde 120 watt, 230 voltluk prizde 2.300 watt güç demektir. Bu yüzden araç sizden mutlaka gerilim değerini ister.',
      'Alternatif akımda bir etken daha vardır: güç faktörü. Motor ve trafo gibi bobinli yüklerde akımın bir bölümü iş yapmadan şebeke ile yük arasında gidip gelir. Bu durumda çekilen akımın tamamı faydalı güce dönüşmez ve hesapta cos φ çarpanı kullanılır.',
    ] },
    { h: 'Kullanılan formüller', ul: [
      '<strong>Doğru akım:</strong> P = V × I',
      '<strong>Tek faz alternatif akım:</strong> P = V × I × cos φ',
      '<strong>Üç faz alternatif akım:</strong> P = √3 × V × I × cos φ (V fazlar arası gerilim, I hat akımı)',
      '<strong>Tersine çeviri:</strong> akım, gücün aynı çarpanlara bölünmesiyle bulunur; örneğin tek fazda I = P ÷ (V × cos φ)',
    ], p: [
      'Formüllerde P watt, V volt, I amper cinsindendir. √3 yaklaşık 1,732 değerindedir ve dengeli üç fazlı sistemlerde üç fazın toplam gücünü tek çarpanla ifade etmeye yarar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Priz hattı:</strong> 16 amperlik bir sigortaya bağlı priz hattından, 230 voltta ve cos φ = 1 kabulüyle en fazla 16 × 230 = 3.680 watt çekilebilir. Aynı hatta güç faktörü 0,8 olan bir yük çalışıyorsa faydalı güç 16 × 230 × 0,8 = 2.944 watt olur; görünür güç yine 3.680 VA\'dır.',
      '<strong>Örnek 2 – Elektrikli ısıtıcı:</strong> 2.000 watt gücündeki bir ısıtıcı 230 voltta 2.000 ÷ 230 = 8,7 amper akım çeker. Isıtıcılar omik yük olduğundan güç faktörü 1 alınır.',
      '<strong>Örnek 3 – Üç fazlı motor:</strong> 400 volt şebekede 11 kW çeken ve cos φ değeri 0,85 olan bir yükün hat akımı 11.000 ÷ (1,732 × 400 × 0,85) = 18,68 amperdir.',
      '<strong>Örnek 4 – Araç aküsü:</strong> 12 voltluk sistemde çalışan 60 watt gücündeki bir cihaz 60 ÷ 12 = 5 amper çeker.',
    ] },
    { h: '230 voltta hızlı başvuru tablosu', p: ['Tek faz, cos φ = 1 kabulüyle yaygın sigorta değerlerinin karşılık geldiği güçler:'], ul: [
      '<strong>1 A</strong> = 230 W',
      '<strong>6 A</strong> = 1.380 W',
      '<strong>10 A</strong> = 2.300 W',
      '<strong>16 A</strong> = 3.680 W',
      '<strong>20 A</strong> = 4.600 W',
      '<strong>25 A</strong> = 5.750 W',
      '<strong>32 A</strong> = 7.360 W',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, üç fazlı hesapta faz-nötr gerilimi olan 230 voltu √3 formülüne yazmaktır. √3 çarpanlı formül fazlar arası gerilimle, yani 400 voltla kullanılır. İkinci yaygın hata, motor etiketindeki gücü doğrudan elektrik gücü sanmaktır: etiketteki kW değeri çoğunlukla mildeki mekanik güçtür ve şebekeden çekilen güç, verim kaybı kadar daha yüksektir.',
      'Bir diğer karışıklık watt ile volt-amperin aynı sayılmasıdır. Jeneratör, UPS ve trafo gibi kaynakların kapasitesi VA ile verilir; bu değeri watt gibi kullanırsanız kaynağı gereğinden küçük seçebilirsiniz. Araç bu yüzden görünür gücü ayrı bir satırda gösterir.',
    ] },
    { h: 'Sınırlar ve güvenlik uyarısı', p: [
      'Hesap, dengeli ve sinüs biçimli bir şebekeyi varsayar. Motorların kalkış anında çektiği akım, etiket akımının birkaç katına çıkabilir; elektronik güç kaynaklarında harmonikler nedeniyle gerçek akım hesaplanandan farklı olabilir. Şebeke gerilimi de gün içinde nominal değerin altına ya da üstüne çıkar.',
      'Bu sayfadaki sonuçlar bilgilendirme amaçlıdır. Sigorta, kablo kesiti ve kaçak akım rölesi seçimi; ortam sıcaklığı, döşeme biçimi, hat uzunluğu ve yürürlükteki yönetmelikler dikkate alınarak yetkili bir elektrik teknisyeni ya da mühendisi tarafından yapılmalıdır.',
    ] },
  ],
  faq: [
    ['1 amper kaç watt eder?', 'Gerilime bağlıdır. 230 voltluk ev prizinde ve güç faktörü 1 iken 1 amper 230 watt eder. 12 voltluk bir aküde aynı 1 amper yalnızca 12 watt, 5 voltluk USB çıkışında 5 watt demektir.'],
    ['16 amper sigorta kaç watt kaldırır?', '230 voltta 16 × 230 = 3.680 watt eder. Bu, hattın sürekli taşıyabileceği üst sınıra yakın bir değerdir; aynı hatta birden çok güçlü cihazı birlikte çalıştırırken toplam gücü bu sınırın altında tutmak gerekir.'],
    ['2000 watt kaç amper çeker?', '230 voltta 2.000 ÷ 230 = yaklaşık 8,7 amper çeker. Yük motorlu ise ve güç faktörü 0,8 ise akım 2.000 ÷ (230 × 0,8) = yaklaşık 10,87 ampere çıkar.'],
    ['Üç fazda hangi gerilimi yazmalıyım?', 'Fazlar arası gerilimi, yani Türkiye şebekesinde 400 voltu yazmalısınız. Araç üç faz seçildiğinde √3 çarpanını kendisi uygular; 230 volt yazarsanız sonuç olması gerekenden düşük çıkar.'],
    ['Güç faktörünü bilmiyorsam ne yazmalıyım?', 'Isıtıcı, fırın, ütü, akkor lamba gibi dirençli yüklerde 1 yazın. Motorlu cihazlarda etiket üzerindeki cos φ değerini kullanın; etiket yoksa 0,8 yaygın bir yaklaşık değerdir ama kesin sonuç için ölçüm gerekir.'],
    ['Watt ile VA arasındaki fark nedir?', 'Watt işe dönüşen aktif gücü, VA ise gerilim ile akımın çarpımı olan görünür gücü ifade eder. Güç faktörü 1 olduğunda ikisi eşittir; daha düşük güç faktöründe VA değeri watt değerinden büyük olur.'],
    ['Doğru akımda neden güç faktörü sorulmuyor?', 'Doğru akımda gerilim ve akım zamanla yön değiştirmediği için aralarında faz farkı oluşmaz. Güç doğrudan gerilim ile akımın çarpımıdır; bu nedenle doğru akım seçildiğinde cos φ alanı hesaba katılmaz.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kw-amper-cevir', 'kva-kw-cevir', 'elektrik-gucu-hesapla', 'ohm-kanunu-hesapla', 'uc-faz-guc-hesapla', 'kablo-kesiti-hesapla'],
};
