export default {
  slug: 'n-inci-gun-bul',
  title: "Ayın N'inci Haftasının Günü Bulma",
  h1Tail: 'ör. mayısın ikinci pazarı',
  pageTitle: "Ayın N'inci Günü Bulma – Ayın 2. Pazarı, Son Cuması Hangi Tarih?",
  description: 'Bir ayın birinci, ikinci, üçüncü, dördüncü, beşinci ya da son pazartesisinin (veya başka bir günün) hangi tarihe denk geldiğini bulun.',
  card: 'Ayın ikinci pazarı, son cuması ya da üçüncü çarşambası hangi tarihe denk geliyor? Ay, yıl ve günü seçip öğrenin.',
  category: 'zaman',
  keywords: ['ayın ikinci pazarı hangi gün', 'ayın son cuması', 'ayın ilk pazartesi', 'ayın üçüncü pazarı', 'anneler günü hangi tarih', 'babalar günü hangi tarih', 'ayın kaçıncı haftası günü bulma'],
  lead: '"Mayıs ayının ikinci pazarı", "ekimin son pazarı", "her ayın ilk pazartesisi" gibi tanımların <strong>hangi tarihe</strong> denk geldiğini bulun. Yılı, ayı, sırayı ve haftanın gününü seçmeniz yeterli; araç tarihi ve o ay içindeki aynı günlerin tamamını gösterir.',
  button: 'Bul',
  inputs: [
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 2026', hint: '1583 ile 9999 arasında.' },
    { id: 'ay', label: 'Ay', type: 'select', options: [['1', 'Ocak'], ['2', 'Şubat'], ['3', 'Mart'], ['4', 'Nisan'], ['5', 'Mayıs'], ['6', 'Haziran'], ['7', 'Temmuz'], ['8', 'Ağustos'], ['9', 'Eylül'], ['10', 'Ekim'], ['11', 'Kasım'], ['12', 'Aralık']] },
    { id: 'sira', label: 'Sıra', type: 'select', options: [['1', 'Birinci'], ['2', 'İkinci'], ['3', 'Üçüncü'], ['4', 'Dördüncü'], ['5', 'Beşinci'], ['son', 'Sonuncu']] },
    { id: 'gun', label: 'Haftanın günü', type: 'select', options: [['1', 'Pazartesi'], ['2', 'Salı'], ['3', 'Çarşamba'], ['4', 'Perşembe'], ['5', 'Cuma'], ['6', 'Cumartesi'], ['7', 'Pazar']] },
  ],
  compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 9999) h.err('"Yıl" 1583 ile 9999 arasında olmalı.');
    const ay = Number(v.ay), gun = Number(v.gun);
    if (!Number.isInteger(ay) || ay < 1 || ay > 12) h.err('Listeden geçerli bir ay seçin.');
    if (!Number.isInteger(gun) || gun < 1 || gun > 7) h.err('Listeden haftanın bir gününü seçin.');
    const son = v.sira === 'son';
    const sira = son ? 0 : Number(v.sira);
    if (!son && (!Number.isInteger(sira) || sira < 1 || sira > 5)) h.err('Listeden geçerli bir sıra seçin.');
    const ilk = new Date(Date.UTC(2000, ay - 1, 1));
    ilk.setUTCFullYear(y);
    const sonraki = new Date(Date.UTC(2000, ay % 12, 1));
    sonraki.setUTCFullYear(ay === 12 ? y + 1 : y);
    const uzunluk = h.gunFarki(ilk, sonraki);
    const hedef = gun % 7; // JS: 0 = Pazar
    const ilkGun = 1 + ((hedef - ilk.getUTCDay() + 7) % 7);
    const gunler = [];
    for (let d = ilkGun; d <= uzunluk; d += 7) gunler.push(d);
    const adlar = ['', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    if (!son && sira > gunler.length) {
      h.err(`${h.ayAdi(ay)} ${y} ayında yalnızca ${gunler.length} ${adlar[gun]} var; beşincisi yok. "Sonuncu" seçeneğini ya da daha küçük bir sıra seçin.`);
    }
    const g = son ? gunler[gunler.length - 1] : gunler[sira - 1];
    const tarih = h.gunEkle(ilk, g - 1);
    const yilBasi = new Date(Date.UTC(2000, 0, 1));
    yilBasi.setUTCFullYear(y);
    return {
      rows: [
        ['Tarih', `${h.fmtDate(tarih)} ${h.gunAdi(tarih)}`],
        ['Tanım', `${h.ayAdi(ay)} ${y} ayının ${son ? 'son' : sira + '.'} ${adlar[gun]} günü`],
        ['Ay içindeki aynı günler', `${gunler.join(', ')} (${gunler.length} kez)`],
        ['Yılın kaçıncı günü', `${h.gunFarki(yilBasi, tarih) + 1}. gün`],
        ['Ay sonuna kalan', `${uzunluk - g} gün`],
      ],
      note: 'Sıra, ayın içinde o günün kaçıncı kez geldiğine göre sayılır; takvim haftası satırına göre değil. Örneğin ay cumartesi başlıyorsa ilk pazartesi ayın 3\'üdür.',
    };
  },
  cases: [
    { in: { yil: '2026', ay: '5', sira: '2', gun: '7' }, out: { 'Tarih': '10.05.2026 Pazar', 'Tanım': 'Mayıs 2026 ayının 2. Pazar günü', 'Ay içindeki aynı günler': '3, 10, 17, 24, 31 (5 kez)', 'Yılın kaçıncı günü': '130. gün', 'Ay sonuna kalan': '21 gün' } },
    { in: { yil: '2026', ay: '10', sira: 'son', gun: '7' }, out: { 'Tarih': '25.10.2026 Pazar', 'Tanım': 'Ekim 2026 ayının son Pazar günü', 'Ay içindeki aynı günler': '4, 11, 18, 25 (4 kez)' } },
    { in: { yil: '2026', ay: '6', sira: '3', gun: '7' }, out: { 'Tarih': '21.06.2026 Pazar', 'Yılın kaçıncı günü': '172. gün' } },
    { in: { yil: '2026', ay: '11', sira: '4', gun: '4' }, out: { 'Tarih': '26.11.2026 Perşembe' } },
    { in: { yil: '2026', ay: '1', sira: '5', gun: '4' }, out: { 'Tarih': '29.01.2026 Perşembe', 'Ay içindeki aynı günler': '1, 8, 15, 22, 29 (5 kez)' } },
    { in: { yil: '2024', ay: '2', sira: '5', gun: '4' }, out: { 'Tarih': '29.02.2024 Perşembe', 'Ay sonuna kalan': '0 gün' } },
    { in: { yil: '2026', ay: '3', sira: 'son', gun: '5' }, out: { 'Tarih': '27.03.2026 Cuma' } },
    { in: { yil: '2026', ay: '8', sira: '1', gun: '1' }, out: { 'Tarih': '03.08.2026 Pazartesi' } },
    { in: { yil: '2026', ay: '2', sira: '5', gun: '1' }, error: true },
    { in: { yil: '', ay: '5', sira: '2', gun: '7' }, error: true },
    { in: { yil: '999', ay: '5', sira: '2', gun: '7' }, error: true },
  ],
  howto: [
    '"Yıl" alanına yılı yazın ve "Ay" listesinden ayı seçin.',
    '"Sıra" listesinden günün ay içinde kaçıncı kez gelişini aradığınızı seçin: birinci, ikinci, üçüncü, dördüncü, beşinci ya da sonuncu.',
    '"Haftanın günü" listesinden pazartesiden pazara istediğiniz günü işaretleyin.',
    '"Bul" düğmesine basın. İlk satırda aradığınız tarih, üçüncü satırda o günün ay içindeki bütün tarihleri görünür.',
    'Seçtiğiniz ayda beşinci gün yoksa araç bunu bildirir; ayın son haftasındaki günü istiyorsanız "Sonuncu" seçeneğini kullanın.',
  ],
  sections: [
    { h: 'Sabit tarihli olmayan günler', p: [
      'Bazı özel günler ve yinelenen etkinlikler belirli bir tarihe değil, ayın içindeki bir sıraya bağlanır. Anneler Günü mayıs ayının ikinci pazarında, Babalar Günü haziran ayının üçüncü pazarında kutlanır; bu yüzden tarihleri her yıl değişir. Toplantı ve nöbet düzenleri de çoğu zaman böyle tanımlanır: "her ayın ilk pazartesisi yönetim toplantısı", "ayın son cuması stok sayımı", "ikinci ve dördüncü salı pazar kurulur" gibi.',
      'Bu tanımları tarihe çevirmek için takvimi açıp parmakla saymak gerekir ve ayın hangi gün başladığına göre kolayca bir hafta kayma yapılır. Araç aynı sayımı sizin yerinize yapar.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Önce ayın birinci gününün haftanın hangi gününe denk geldiği bulunur. Ardından aranan günün ay içindeki <strong>ilk</strong> tarihi hesaplanır; bu tarih her zaman ayın 1\'i ile 7\'si arasındadır. Sonraki gelişler 7\'şer gün eklenerek bulunur: ikincisi 8–14, üçüncüsü 15–21, dördüncüsü 22–28 arasına düşer. Beşincisi varsa 29, 30 ya da 31\'dir.',
      'Buradan kullanışlı bir kural çıkar: bir tarihin gün numarasını 7\'ye bölüp yukarı yuvarlarsanız, o günün ay içinde kaçıncı kez geldiğini bulursunuz. Ayın 10\'u her zaman haftanın o gününün ikinci gelişidir (10 ÷ 7 = 1,43; yukarı yuvarlanınca 2), ayın 21\'i üçüncü gelişidir.',
    ] },
    { h: 'Çözümlü örnek: Mayıs 2026\'nın ikinci pazarı', p: [
      '1 Mayıs 2026 cuma gününe denk gelir. Cumadan sonraki ilk pazar iki gün sonradır; yani ayın ilk pazarı 3 Mayıs\'tır. Yedi gün eklenince ikinci pazar <strong>10 Mayıs 2026</strong> olur. Aynı ayın pazarları 3, 10, 17, 24 ve 31 Mayıs\'tır; yani bu ayda beş pazar vardır. 10 Mayıs yılın 130. günüdür ve ay sonuna 21 gün kalır.',
      'Bir örnek daha: Haziran 2026 pazartesi günü başlar. İlk pazar 7 Haziran, ikinci pazar 14 Haziran, üçüncü pazar <strong>21 Haziran 2026</strong> olur. Ekim 2026\'nın pazarları ise 4, 11, 18 ve 25\'tir; dolayısıyla "ekimin son pazarı" 25 Ekim\'dir.',
    ] },
    { h: '"Beşinci" ve "sonuncu" arasındaki fark', p: [
      'Bir ayda her gün en az dört kez bulunur; çünkü en kısa ay bile 28 gündür. Beşinci geliş ise yalnızca ayın 29, 30 ya da 31\'ine denk gelen günler için vardır. 31 çeken aylarda üç gün, 30 çeken aylarda iki gün beş kez gelir; 29 günlük şubatta bir gün, 28 günlük şubatta hiçbir gün beş kez gelmez.',
      'Bu nedenle "ayın son cuması" ile "ayın dördüncü cuması" her zaman aynı gün değildir. Ocak 2026\'da perşembe günleri 1, 8, 15, 22 ve 29\'dur; dördüncü perşembe 22 Ocak, son perşembe 29 Ocak\'tır. Yinelenen bir etkinlik için kural koyarken "son" mu "dördüncü" mü demek istediğinizi netleştirmek, yılda birkaç kez yaşanan karışıklığı önler. Araçta beşinci gelişi olmayan bir ay için "Beşinci" seçerseniz hata mesajı alırsınız; "Sonuncu" seçeneği ise her ay için sonuç verir.',
    ] },
    { h: '"Ayın ikinci haftası" ifadesindeki belirsizlik', p: [
      'Gündelik dilde "ayın ikinci haftasının pazartesisi" denildiğinde iki farklı şey kastedilebilir. Birincisi, ay içindeki ikinci pazartesidir; araç bunu hesaplar. İkincisi, duvar takvimindeki ikinci satırda yer alan pazartesidir. Ay pazartesi günü başlamıyorsa bu ikisi farklı tarihlere düşer.',
      'Ağustos 2026 cumartesi günü başlar. Takvimin ilk satırında yalnızca 1 ve 2 Ağustos bulunur; ikinci satırdaki pazartesi 3 Ağustos\'tur, ama bu aynı zamanda ayın <em>birinci</em> pazartesisidir. Resmî ve yaygın tanımların neredeyse tamamı ay içindeki sırayı esas aldığından araç da bu yöntemi kullanır.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Özel günler:</strong> Anneler Günü (mayısın ikinci pazarı) ve Babalar Günü (haziranın üçüncü pazarı) tarihlerini yıllar öncesinden görmek.',
      '<strong>Düzenli toplantılar:</strong> Apartman, dernek, kooperatif ya da şirket toplantılarının yıl boyunca hangi tarihlere geldiğini çıkarmak.',
      '<strong>Ödeme ve kesim günleri:</strong> "Ayın ilk cuması" gibi tanımlanan ödeme ya da teslimat günlerini takvime işlemek.',
      '<strong>Okul ve kurs programı:</strong> Ayda bir yapılan veli toplantısı, deneme sınavı ya da atölye günlerini belirlemek.',
      '<strong>Yurt dışı takvimleri:</strong> Başka ülkelerde ayın belirli bir pazartesisine ya da perşembesine bağlanan tatil günlerini bulmak.',
      '<strong>Bakım ve sayım planı:</strong> Ayın son cuması yapılan yedekleme, sayım ya da bakım işlerinin tarihlerini önceden görmek.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca Miladi takvimdeki gün hesabını yapar; resmî tatil, bayram ya da kurumunuzun çalışma günü bilgisini içermez. Bulunan tarih tatile denk geliyorsa etkinliğin ertelenip ertelenmeyeceği sizin kuralınıza bağlıdır. Özel günlerin kutlandığı tarih ülkeden ülkeye farklı olabilir; başka bir ülke için bakıyorsanız o ülkedeki tanımı esas alın.',
    ] },
  ],
  faq: [
    ['2026 yılında Anneler Günü hangi tarihte?', 'Türkiye\'de Anneler Günü mayıs ayının ikinci pazar günü kutlanır. 2026\'da mayısın pazarları 3, 10, 17, 24 ve 31\'dir; ikinci pazar 10 Mayıs 2026\'dır.'],
    ['2026 yılında Babalar Günü ne zaman?', 'Babalar Günü haziran ayının üçüncü pazarıdır. Haziran 2026 pazartesi günü başladığı için pazarlar 7, 14, 21 ve 28\'dir; üçüncü pazar 21 Haziran 2026\'ya denk gelir.'],
    ['Bir ayda aynı günden en fazla kaç tane olur?', 'En fazla beş. Her gün en az dört kez gelir; ayın 29, 30 ve 31\'ine denk gelen günler beşinci kez de görülür. 31 günlük aylarda üç farklı gün beş kez yaşanır.'],
    ['"Beşinci" seçince neden hata alıyorum?', 'Seçtiğiniz ayda o gün yalnızca dört kez geliyordur. Örneğin Şubat 2026 tam 28 gün olduğundan hiçbir günün beşincisi yoktur. Ayın en son gelişini arıyorsanız "Sonuncu" seçeneğini kullanın.'],
    ['Ayın son cuması ile dördüncü cuması aynı mı?', 'Her zaman değil. Ayda beş cuma varsa son cuma beşincisidir ve dördüncü cumadan bir hafta sonradır. Mart 2026\'da cumalar 6, 13, 20 ve 27 olduğu için ikisi aynıdır; Ocak 2026\'da ise beş cuma vardır ve farklıdır.'],
    ['Bir tarihin ay içinde kaçıncı gün olduğunu nasıl anlarım?', 'Gün numarasını 7\'ye bölüp yukarı yuvarlayın. Ayın 1–7 arası birinci, 8–14 arası ikinci, 15–21 arası üçüncü, 22–28 arası dördüncü, 29–31 arası beşinci geliştir.'],
    ['Sıra, takvimdeki hafta satırına göre mi sayılıyor?', 'Hayır. Araç, seçtiğiniz günün ay içinde kaçıncı kez geldiğini sayar. Ay hafta ortasında başlıyorsa takvimin ilk satırı eksik olur ve satır sayımı farklı sonuç verir; yaygın tanımlar ay içi sırayı kullanır.'],
    ['Seçimlerim bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz bilgiler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['hangi-gun-hesapla', 'ayin-son-gunu', 'takvim-olustur', 'ay-kac-gun', 'iso-hafta-tarihi-cevir'],
};
