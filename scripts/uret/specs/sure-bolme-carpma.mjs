export default {
  slug: 'sure-bolme-carpma',
  title: 'Süre Çarpma ve Bölme',
  h1Tail: 'saat:dakika:saniye ile işlem',
  pageTitle: 'Süre Çarpma ve Bölme – Saat Dakika Saniyeyi Sayıyla Çarp, Böl',
  description: 'Saat:dakika:saniye biçimindeki bir süreyi bir sayıyla çarpın, sayıya bölün ya da başka bir süreye bölerek kaç kat olduğunu bulun. Sonuç süre ve ondalık saat olarak gelir.',
  card: 'Bir süreyi sayıyla çarpın ya da bölün, iki süreyi birbirine oranlayın; sonucu saat:dakika:saniye ve ondalık saat olarak görün.',
  category: 'zaman',
  keywords: ['süre çarpma', 'süre bölme', 'saat dakika çarpma', 'saat dakika bölme', 'zaman çarpma hesaplama', 'süreyi sayıya bölme', 'saat dakika saniye hesaplama', 'süre oranı'],
  lead: '<strong>Saat:dakika:saniye</strong> biçiminde yazdığınız bir süreyi bir sayıyla çarpın, bir sayıya bölün ya da başka bir süreye bölerek içinde kaç kez geçtiğini bulun. Araç 60 tabanındaki elde ve borç işlemlerini sizin yerinize yapar; sonucu hem süre biçiminde hem de toplam saniye, toplam dakika ve ondalık saat olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sure', label: 'Süre', type: 'text', placeholder: 'Örn. 1:30:00', hint: 'saat:dakika:saniye ya da saat:dakika biçiminde yazın (2:45 = 2 saat 45 dakika).' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['carp', 'Süre × sayı'], ['bol', 'Süre ÷ sayı'], ['oran', 'Süre ÷ süre (kaç kat?)']] },
    { id: 'deger', label: 'Sayı ya da ikinci süre', type: 'text', placeholder: 'Örn. 3 ya da 0:45:00', hint: 'İlk iki işlemde sayı (2,5 gibi), üçüncü işlemde saat:dakika:saniye biçiminde süre yazın.' },
  ],
  compute(v, h) {
    const coz = (s, ad) => {
      const t = String(s ?? '').trim();
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      const p = t.split(':').map((x) => x.trim());
      if (p.length < 2 || p.length > 3) h.err(`"${ad}" alanını saat:dakika:saniye ya da saat:dakika biçiminde yazın (örn. 1:30:00).`);
      const sa = h.nonneg(p[0], ad + ' (saat)');
      if (!Number.isInteger(sa)) h.err(`"${ad}" alanında saat tam sayı olmalı; kesirli kısmı dakika olarak yazın.`);
      const dk = h.nonneg(p[1], ad + ' (dakika)');
      if (!Number.isInteger(dk) || dk >= 60) h.err(`"${ad}" alanında dakika 0–59 arasında tam sayı olmalı.`);
      const sn = p.length === 3 ? h.nonneg(p[2], ad + ' (saniye)') : 0;
      if (sn >= 60) h.err(`"${ad}" alanında saniye 60'tan küçük olmalı.`);
      return sa * 3600 + dk * 60 + sn;
    };
    const bicim = (sn) => {
      const cs = Math.round(sn * 100);
      const sa = Math.floor(cs / 360000);
      const dk = Math.floor((cs % 360000) / 6000);
      const kalan = cs % 6000;
      const tam = Math.floor(kalan / 100), kes = kalan % 100;
      return `${sa}:${String(dk).padStart(2, '0')}:${String(tam).padStart(2, '0')}${kes ? ',' + String(kes).padStart(2, '0').replace(/0$/, '') : ''}`;
    };
    const yaziyla = (sn) => {
      const cs = Math.round(sn * 100);
      const sa = Math.floor(cs / 360000);
      const dk = Math.floor((cs % 360000) / 6000);
      const s = (cs % 6000) / 100;
      const parca = [];
      if (sa) parca.push(`${h.fmt(sa, 0)} saat`);
      if (dk) parca.push(`${dk} dakika`);
      if (s || !parca.length) parca.push(`${h.fmt(s, 2)} saniye`);
      return parca.join(' ');
    };
    const a = coz(v.sure, 'Süre');
    if (v.islem === 'oran') {
      const b = coz(v.deger, 'İkinci süre');
      if (b === 0) h.err('İkinci süre sıfır olamaz; sıfıra bölme tanımsızdır.');
      const kat = a / b;
      const tam = Math.floor(kat + 1e-9);
      const kalan = Math.max(0, a - tam * b);
      return {
        rows: [
          ['Sonuç', h.fmt(kat, 4) + ' kat'],
          ['Tam bölüm', `${h.fmt(tam, 0)} kez`],
          ['Kalan süre', bicim(kalan)],
          ['Yüzde olarak', '%' + h.fmt(kat * 100, 2)],
          ['İşlem', `${bicim(a)} ÷ ${bicim(b)}`],
        ],
        note: 'İki süre birbirine bölündüğünde sonuç birimsiz bir orandır; "tam bölüm" ikinci sürenin birincinin içine kaç kez tam sığdığını gösterir.',
      };
    }
    const k = h.nonneg(v.deger, 'Sayı');
    if (v.islem === 'bol' && k === 0) h.err('Süre sıfıra bölünemez; sıfırdan büyük bir sayı yazın.');
    const sonuc = v.islem === 'bol' ? a / k : a * k;
    if (sonuc > 3.6e9) h.err('Sonuç çok büyük; daha küçük bir süre ya da çarpan deneyin.');
    return {
      rows: [
        ['Sonuç', bicim(sonuc)],
        ['Yazıyla', yaziyla(sonuc)],
        ['Toplam saniye', h.fmt(sonuc, 2) + ' sn'],
        ['Toplam dakika', h.fmt(sonuc / 60, 4) + ' dk'],
        ['Ondalık saat', h.fmt(sonuc / 3600, 4) + ' saat'],
        ['İşlem', `${bicim(a)} ${v.islem === 'bol' ? '÷' : '×'} ${h.fmt(k, 6)}`],
      ],
      note: 'Sonuç saniyenin yüzde birine yuvarlanır. Süre biçimi saat:dakika:saniye şeklindedir; saat kısmı 24\'ü aşabilir.',
    };
  },
  cases: [
    { in: { sure: '1:30:00', islem: 'carp', deger: '3' }, out: { 'Sonuç': '4:30:00', 'Yazıyla': '4 saat 30 dakika', 'Toplam saniye': '16.200 sn', 'Toplam dakika': '270 dk', 'Ondalık saat': '4,5 saat', 'İşlem': '1:30:00 × 3' } },
    { in: { sure: '2:45', islem: 'bol', deger: '3' }, out: { 'Sonuç': '0:55:00', 'Yazıyla': '55 dakika', 'Toplam saniye': '3.300 sn' } },
    { in: { sure: '0:45:30', islem: 'carp', deger: '2,5' }, out: { 'Sonuç': '1:53:45', 'Yazıyla': '1 saat 53 dakika 45 saniye', 'Toplam saniye': '6.825 sn' } },
    { in: { sure: '1:00:00', islem: 'bol', deger: '7' }, out: { 'Sonuç': '0:08:34,29', 'Yazıyla': '8 dakika 34,29 saniye' } },
    { in: { sure: '10:00:00', islem: 'oran', deger: '2:30:00' }, out: { 'Sonuç': '4 kat', 'Tam bölüm': '4 kez', 'Kalan süre': '0:00:00', 'Yüzde olarak': '%400' } },
    { in: { sure: '8:00:00', islem: 'oran', deger: '0:45:00' }, out: { 'Sonuç': '10,6667 kat', 'Tam bölüm': '10 kez', 'Kalan süre': '0:30:00' } },
    { in: { sure: '0:03:25', islem: 'carp', deger: '12' }, out: { 'Sonuç': '0:41:00', 'Ondalık saat': '0,6833 saat' } },
    { in: { sure: '7:30', islem: 'carp', deger: '22' }, out: { 'Sonuç': '165:00:00', 'Yazıyla': '165 saat' } },
    { in: { sure: '1:30:00', islem: 'bol', deger: '0' }, error: true },
    { in: { sure: 'abc', islem: 'carp', deger: '2' }, error: true },
    { in: { sure: '1:75:00', islem: 'carp', deger: '2' }, error: true },
    { in: { sure: '2:00:00', islem: 'oran', deger: '3' }, error: true },
  ],
  howto: [
    '"Süre" alanına işlem yapacağınız süreyi saat:dakika:saniye biçiminde yazın. Saniye gerekmiyorsa 2:45 gibi yalnızca saat ve dakika yazabilirsiniz.',
    '"İşlem" listesinden süreyi bir sayıyla çarpmak mı, bir sayıya bölmek mi, yoksa başka bir süreye bölmek mi istediğinizi seçin.',
    'Son alana çarpanı ya da böleni yazın. Ondalıklı sayılar için virgül kullanabilirsiniz; "süre ÷ süre" seçtiyseniz buraya ikinci süreyi yazın.',
    '"Hesapla" düğmesine basın. Sonuç süre biçiminde, yazıyla ve toplam saniye, dakika, ondalık saat olarak listelenir.',
  ],
  sections: [
    { h: 'Süreyle çarpma ve bölme neden karışır?', p: [
      'Gündelik sayılar onluk tabandadır, oysa zaman 60 tabanında ilerler: 60 saniye bir dakika, 60 dakika bir saat eder. Bu yüzden 1 saat 30 dakikayı hesap makinesine 1,30 diye yazıp 3 ile çarparsanız 3,90 bulursunuz ve bu "3 saat 90 dakika" bile değildir. Doğru sonuç 4 saat 30 dakikadır.',
      'Güvenilir yöntem, süreyi önce tek bir birime, yani saniyeye çevirmek, işlemi onluk sayılarla yapmak ve sonucu yeniden saat, dakika ve saniyeye ayırmaktır. Araç tam olarak bunu yapar: <strong>toplam saniye = saat × 3600 + dakika × 60 + saniye</strong>.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Çarpma:</strong> Bir ders 1 saat 30 dakika sürüyor ve haftada 3 kez yapılıyor. 1:30:00 = 5.400 saniyedir. 5.400 × 3 = 16.200 saniye eder. 16.200 ÷ 3.600 = 4 tam saat, kalan 1.800 saniye de 30 dakikadır. Sonuç <strong>4:30:00</strong>, ondalık olarak 4,5 saattir.',
      '<strong>Bölme:</strong> 2 saat 45 dakikalık bir sınav süresi üç eşit bölüme ayrılacak. 2:45 = 9.900 saniyedir. 9.900 ÷ 3 = 3.300 saniye, yani <strong>55 dakika</strong> eder.',
      '<strong>Ondalıklı çarpan:</strong> 45 dakika 30 saniyelik bir işin 2,5 katı ne kadar sürer? 2.730 × 2,5 = 6.825 saniye; bu da 1 saat 53 dakika 45 saniyedir.',
      '<strong>Tam bölünmeyen süre:</strong> 1 saat 7 eşit parçaya bölündüğünde 3.600 ÷ 7 = 514,2857 saniye bulunur. Araç bunu saniyenin yüzde birine yuvarlayarak 0:08:34,29 olarak gösterir.',
      '<strong>Süreyi süreye bölme:</strong> 8 saatlik bir mesaiye 45 dakikalık kaç görüşme sığar? 28.800 ÷ 2.700 = 10,6667 kat. Tam bölüm 10\'dur; 10 görüşmeden sonra 30 dakika artar.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Bordro ve puantaj:</strong> günlük 7 saat 30 dakikalık çalışmanın 22 iş günündeki toplamı 165 saattir; ondalık saat satırı ücret çarpımına hazırdır.',
      '<strong>Koşu ve yüzme:</strong> hedef bitiş süresini tur ya da kilometre sayısına bölerek tur başına tempoyu bulursunuz.',
      '<strong>Video ve ses:</strong> bölüm başına ortalama süreyi bölüm sayısıyla çarparak toplam kayıt süresini, toplam süreyi parça sayısına bölerek ortalama parça uzunluğunu hesaplarsınız.',
      '<strong>Üretim planlama:</strong> bir parçanın işlem süresini adetle çarpar ya da vardiya süresini çevrim süresine bölerek vardiyada kaç parça çıkacağını görürsünüz.',
      '<strong>Ders ve sınav planı:</strong> toplam çalışma süresini konu ya da soru sayısına bölerek her birine düşen payı belirlersiniz.',
      '<strong>Mutfak:</strong> kilogram başına verilen pişirme süresini ağırlıkla çarparsınız.',
    ] },
    { h: 'Ondalık saat ile saat:dakika farkı', p: [
      'Puantaj ve fatura hesaplarında en sık yapılan hata, ondalık saat ile dakika gösterimini karıştırmaktır. <strong>1,5 saat</strong> 1 saat 50 dakika değil, 1 saat 30 dakikadır; 1:15 ise 1,15 değil 1,25 saattir. Dakikayı ondalığa çevirmek için 60\'a bölersiniz: 45 dakika 0,75 saat, 20 dakika yaklaşık 0,3333 saat eder.',
      'Araç her iki gösterimi birlikte verdiği için elle çeviri yapmanız gerekmez. Saatlik ücretle çarpacaksanız "Ondalık saat" satırını, bir programa ya da takvime yazacaksanız "Sonuç" satırını kullanın.',
    ] },
    { h: 'Giriş kuralları ve sınırlar', p: [
      'Süre iki ya da üç parçalı olmalıdır ve parçalar iki nokta üst üste ile ayrılır. İki parçalı yazım <strong>saat:dakika</strong> olarak okunur; yalnızca dakika ve saniye girmek istiyorsanız başına sıfır ekleyin (0:03:25). Dakika ve saniye 60\'tan küçük olmalıdır; saat kısmı ise 24\'ü aşabilir, örneğin 165:00:00 geçerlidir. Saniyeyi ondalıklı yazabilirsiniz (0:00:12,5).',
      'Negatif süre ve negatif çarpan kabul edilmez. Sıfıra bölme tanımsız olduğu için hata verir. Sonuç saniyenin yüzde birine yuvarlanır; çok sayıda yuvarlanmış sonucu yeniden çarparsanız küçük farklar birikebilir, bu durumda işlemi baştaki süre üzerinden tek adımda yapın.',
    ] },
  ],
  faq: [
    ['1 saat 30 dakika çarpı 3 kaç eder?', '4 saat 30 dakika eder. 1:30:00 süresi 5.400 saniyedir; 3 ile çarpılınca 16.200 saniye, yani 4:30:00 bulunur.'],
    ['Saat ve dakikayı hesap makinesinde neden doğrudan çarpamıyorum?', 'Çünkü hesap makinesi onluk tabanda çalışır, dakika ise 60 üzerinden sayılır. 1 saat 30 dakika 1,30 değil 1,5 saattir. Süreyi önce saniyeye ya da ondalık saate çevirmek gerekir; araç bunu kendiliğinden yapar.'],
    ['Bir süreyi başka bir süreye bölebilir miyim?', 'Evet. İşlem listesinden "Süre ÷ süre" seçin ve ikinci süreyi son alana yazın. Sonuç kaç kat olduğunu, tam bölümü ve artan süreyi gösterir.'],
    ['Yalnızca dakika ve saniye girmek için ne yapmalıyım?', 'Başına sıfır saat ekleyin: 3 dakika 25 saniye için 0:03:25 yazın. İki parçalı 3:25 yazımı 3 saat 25 dakika olarak okunur.'],
    ['Sonuç 24 saati geçerse gün olarak gösterilir mi?', 'Hayır, saat kısmı büyümeye devam eder; örneğin 165:00:00 görürsünüz. Bu, puantaj ve toplam süre hesaplarında tercih edilen gösterimdir. Gün karşılığı için saati 24\'e bölebilirsiniz.'],
    ['Çarpan ondalıklı olabilir mi?', 'Evet. 2,5 ya da 0,75 gibi çarpanlar ve bölenler kullanılabilir. Bir sürenin %80\'ini bulmak için 0,8 ile çarpmanız yeterlidir.'],
    ['Sonuçtaki virgüllü saniye ne anlama geliyor?', 'Bölme işlemi tam çıkmadığında saniyenin kesirli kısmı kalır. 0:08:34,29 yazımı 8 dakika 34 saniye ve saniyenin yüzde 29\'u demektir.'],
    ['Girdiğim süreler bir yere kaydediliyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; yazdıklarınız sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['sure-toplama', 'saat-hesapla', 'saniye-sure-cevir', 'dakika-sure-cevir', 'calisma-suresi-hesapla'],
};
