export default {
  slug: 'ay-kac-gun',
  title: 'Ay Kaç Gün Çekiyor Hesaplama',
  h1Tail: '28, 29, 30 ya da 31',
  pageTitle: 'Ay Kaç Gün Çekiyor? Ayın Gün Sayısını Hesaplama',
  description: 'Seçtiğiniz ayın o yıl kaç gün çektiğini öğrenin. Şubat için artık yıl kontrolü yapar; ayın ilk ve son gününü, hafta içi ve hafta sonu gün sayısını gösterir.',
  card: 'Bir ayın kaç gün çektiğini, hangi gün başlayıp bittiğini ve içinde kaç hafta içi, kaç hafta sonu günü olduğunu bulun.',
  category: 'zaman',
  keywords: ['ay kaç gün çekiyor', 'şubat kaç gün', 'hangi aylar 30 çeker', 'hangi aylar 31 çeker', 'ayın gün sayısı', 'bu ay kaç gün', 'şubat 29 çekiyor mu'],
  lead: 'Ayı ve yılı seçin; o ayın <strong>kaç gün çektiğini</strong>, haftanın hangi günü başlayıp hangi günü bittiğini, içinde kaç hafta içi ve kaç hafta sonu günü bulunduğunu görün. Şubat ayı için artık yıl kuralı otomatik uygulanır.',
  button: 'Hesapla',
  inputs: [
    { id: 'ay', label: 'Ay', type: 'select', options: [['1', 'Ocak'], ['2', 'Şubat'], ['3', 'Mart'], ['4', 'Nisan'], ['5', 'Mayıs'], ['6', 'Haziran'], ['7', 'Temmuz'], ['8', 'Ağustos'], ['9', 'Eylül'], ['10', 'Ekim'], ['11', 'Kasım'], ['12', 'Aralık']] },
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 2026', hint: 'Şubat ayının uzunluğu yıla göre değişir.' },
  ],
  compute(v, h) {
    const ay = Number(v.ay);
    if (!(ay >= 1 && ay <= 12)) h.err('Listeden bir ay seçin.');
    const yil = h.int(v.yil, 'Yıl');
    if (yil < 1583 || yil > 9999) h.err('Yıl 1583 ile 9999 arasında olmalı (Miladi takvim).');
    const artik = (yil % 4 === 0 && yil % 100 !== 0) || yil % 400 === 0;
    const gunler = [31, artik ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const n = gunler[ay - 1];
    const ilk = new Date(Date.UTC(yil, ay - 1, 1));
    const son = new Date(Date.UTC(yil, ay - 1, n));
    let haftaIci = 0;
    let haftaSonu = 0;
    for (let i = 0; i < n; i++) {
      const g = (ilk.getUTCDay() + i) % 7;
      if (g === 0 || g === 6) haftaSonu++; else haftaIci++;
    }
    const tam = Math.floor(n / 7);
    const artan = n % 7;
    return {
      rows: [
        ['Ayın uzunluğu', `${n} gün`],
        ['İlk gün', `${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Hafta içi günleri', `${haftaIci} gün`],
        ['Hafta sonu günleri', `${haftaSonu} gün`],
        ['Hafta olarak', artan ? `${tam} hafta ${artan} gün` : `${tam} hafta`],
        ['Saat olarak', `${h.fmt(n * 24, 0)} saat`],
        ['Yıl', artik ? `${yil} artık yıl (366 gün)` : `${yil} artık yıl değil (365 gün)`],
      ],
      note: `${h.ayAdi(ay)} ${yil} için hesaplandı. Hafta içi sayısı Pazartesi–Cuma günlerini kapsar; resmî tatiller düşülmemiştir.`,
    };
  },
  cases: [
    { in: { ay: '2', yil: '2024' }, out: { 'Ayın uzunluğu': '29 gün', 'İlk gün': '01.02.2024 Perşembe', 'Son gün': '29.02.2024 Perşembe', 'Hafta içi günleri': '21 gün', 'Hafta sonu günleri': '8 gün' } },
    { in: { ay: '11', yil: '2026' }, out: { 'Ayın uzunluğu': '30 gün', 'İlk gün': '01.11.2026 Pazar', 'Son gün': '30.11.2026 Pazartesi', 'Hafta içi günleri': '21 gün', 'Hafta sonu günleri': '9 gün', 'Saat olarak': '720 saat' } },
    { in: { ay: '2', yil: '2025' }, out: { 'Ayın uzunluğu': '28 gün', 'İlk gün': '01.02.2025 Cumartesi', 'Hafta içi günleri': '20 gün', 'Hafta olarak': '4 hafta' } },
    { in: { ay: '1', yil: '2026' }, out: { 'Ayın uzunluğu': '31 gün', 'İlk gün': '01.01.2026 Perşembe', 'Son gün': '31.01.2026 Cumartesi', 'Hafta içi günleri': '22 gün', 'Hafta sonu günleri': '9 gün', 'Hafta olarak': '4 hafta 3 gün' } },
    { in: { ay: '2', yil: '1900' }, out: { 'Ayın uzunluğu': '28 gün', 'Yıl': '1900 artık yıl değil (365 gün)' } },
    { in: { ay: '2', yil: '2000' }, out: { 'Ayın uzunluğu': '29 gün', 'Yıl': '2000 artık yıl (366 gün)' } },
    { in: { ay: '4', yil: '2027' }, out: { 'Ayın uzunluğu': '30 gün' } },
    { in: { ay: '2', yil: '2025,5' }, error: true },
    { in: { ay: '3', yil: '' }, error: true },
    { in: { ay: '3', yil: '120' }, error: true },
  ],
  howto: [
    '"Ay" listesinden gün sayısını öğrenmek istediğiniz ayı seçin.',
    '"Yıl" alanına dört haneli yılı yazın. Şubat dışındaki aylarda gün sayısı değişmez, ama ayın hangi gün başladığı yıla bağlıdır.',
    '"Hesapla" düğmesine basın; ilk satırda ayın kaç gün çektiğini görürsünüz.',
    'Mesai, puantaj ya da bütçe planı yapıyorsanız hafta içi ve hafta sonu gün sayısı satırlarına bakın.',
  ],
  sections: [
    { h: 'Hangi ay kaç gün çeker?', p: [
      'Miladi takvimde yedi ay 31, dört ay 30 gün çeker; Şubat ise 28, artık yıllarda 29 gündür. Bu dağılım yıldan yıla değişmez, değişen tek ay Şubat\'tır.',
    ], ul: [
      '<strong>31 gün çeken aylar:</strong> Ocak, Mart, Mayıs, Temmuz, Ağustos, Ekim, Aralık',
      '<strong>30 gün çeken aylar:</strong> Nisan, Haziran, Eylül, Kasım',
      '<strong>28 ya da 29 gün çeken ay:</strong> Şubat',
    ] },
    { h: 'Yumruk yöntemiyle akılda tutma', p: [
      'Ayların uzunluğunu ezberlemenin en bilinen yolu yumruk yöntemidir. Elinizi yumruk yapın ve parmak kemiklerinizin oluşturduğu tepeler ile aralarındaki çukurları Ocak\'tan başlayarak sayın. Tepeye gelen aylar 31, çukura gelen aylar 30 gün çeker (Şubat hariç). İşaret parmağı tepesi Ocak, yanındaki çukur Şubat, orta parmak tepesi Mart diye ilerlersiniz. Serçe parmağı tepesi Temmuz olur; ardından yeniden aynı tepeden ya da diğer elin ilk tepesinden Ağustos ile devam edersiniz. Temmuz ve Ağustos\'un arka arkaya 31 çekmesi bu yüzden kolayca hatırlanır.',
      'Dikkat edilecek bir başka düzen de şudur: Temmuz\'a kadar tek numaralı aylar (1, 3, 5, 7) 31 çekerken, Ağustos\'tan itibaren çift numaralı aylar (8, 10, 12) 31 çeker.',
    ] },
    { h: 'Şubat neden 28 ya da 29 gün?', p: [
      'Dünya\'nın Güneş çevresindeki bir turu yaklaşık 365 gün 6 saatten biraz kısa sürer. Takvim yılı 365 gün olduğundan aradaki fark dört yılda yaklaşık bir güne ulaşır ve bu gün Şubat ayına eklenir. Kural şöyledir: 4\'e tam bölünen yıllar artık yıldır; ancak 100\'e bölünen yıllar yalnızca 400\'e de bölünüyorsa artık sayılır.',
      'Bu yüzden 2024 ve 2028\'de Şubat 29 gün çekerken 2025, 2026 ve 2027\'de 28 gündür. Yüzyıl dönümlerinde kural ayrıca önem kazanır: 1900 yılı 4\'e bölündüğü hâlde artık değildir, 2000 yılı ise 400\'e bölündüğü için artıktır. Araç bu ayrımı kendiliğinden yapar; yılı yazmanız yeterlidir.',
    ] },
    { h: 'Çözümlü örnek: Şubat 2024', p: [
      '2024 yılı 4\'e bölünür ve 100\'e bölünmez; dolayısıyla artık yıldır ve Şubat 29 gün çeker. Ayın ilk günü 1 Şubat 2024 Perşembe\'dir. 29 gün, dört tam hafta ve bir gün demektir; dört haftada 20 hafta içi ve 8 hafta sonu günü bulunur. Artan tek gün ayın başladığı güne, yani Perşembe\'ye denk gelir. Böylece Şubat 2024\'te <strong>21 hafta içi günü</strong> ve <strong>8 hafta sonu günü</strong> vardır; ay yine Perşembe günü biter.',
      'İkinci bir örnek olarak Kasım 2026\'yı alalım: 30 gün çeker, Pazar günü başlar ve Pazartesi günü biter. Dört tam haftanın üzerine bir Pazar ve bir Pazartesi eklendiği için 21 hafta içi, 9 hafta sonu günü içerir.',
    ] },
    { h: 'Ayın uzunluğu nerelerde işe yarar?', ul: [
      '<strong>Kira ve abonelik kıstı:</strong> Ay ortasında başlayan bir sözleşmede günlük bedel, aylık tutarın o ayın gün sayısına bölünmesiyle bulunur; 28 günlük ay ile 31 günlük ay arasında günlük tutar farklıdır.',
      '<strong>Puantaj ve vardiya planı:</strong> Ay içindeki hafta içi gün sayısı, planlanacak mesai günlerinin üst sınırını verir. Resmî tatilleri ayrıca düşmeniz gerekir.',
      '<strong>Bütçe ve harçlık:</strong> Günlük harcama limitinizi aylık bütçeyi gün sayısına bölerek belirleyebilirsiniz.',
      '<strong>Hedef ve alışkanlık takibi:</strong> "Bu ay her gün" diye koyduğunuz bir hedefin kaç tekrar gerektirdiğini bilirsiniz.',
      '<strong>Fatura ve sayaç dönemleri:</strong> Günlük ortalama tüketimi bulurken dönemin gerçek gün sayısı kullanılır.',
    ] },
    { h: 'Bir ayda kaç hafta, kaç hafta sonu var?', p: [
      'Hiçbir ay tam olarak dört haftadan ibaret değildir; tek istisna artık olmayan yıllardaki 28 günlük Şubat\'tır ve o da tam 4 haftadır. 30 günlük aylar 4 hafta 2 gün, 31 günlük aylar 4 hafta 3 gün sürer. Artan bu günler ayın ilk günlerinin haftanın hangi günlerine geldiğine göre belirlenir: ay Cumartesi başlıyorsa 30 günlük bir ayda beş Cumartesi ve beş Pazar bulunur.',
      'Hafta içi gün sayısı 28 günlük ayda her zaman 20\'dir; diğer aylarda 20 ile 23 arasında değişir. Aracın verdiği sayı yalnızca takvime dayanır; resmî ve dinî tatiller, idari izinler ya da iş yerinize özel çalışma düzeni hesaba katılmaz.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç Miladi takvimi esas alır ve 1583–9999 yıllarını kabul eder. Hafta sonu Cumartesi ve Pazar olarak varsayılmıştır; Cumartesi günü çalışılan iş yerlerinde hafta içi sayısına Cumartesileri kendiniz eklemelisiniz. Ücret, kıdem ya da yasal süre hesabı gibi sonuç doğuran işlemlerde yalnızca gün sayısına değil ilgili sözleşme ve güncel mevzuata da bakın.',
    ] },
  ],
  faq: [
    ['Hangi aylar 30 gün çeker?', 'Nisan, Haziran, Eylül ve Kasım 30 gün çeker. Bu dört ayın dışındaki aylardan Şubat hariç hepsi 31 gündür.'],
    ['Şubat bu yıl kaç gün çekiyor?', 'Ay listesinden Şubat\'ı seçip yılı yazın. Yıl 4\'e bölünüyorsa ve yüzyıl istisnasına girmiyorsa sonuç 29, aksi hâlde 28 gündür. Örneğin Şubat 2025 ve 2026 için 28, Şubat 2028 için 29 gün görürsünüz.'],
    ['Şubat en son ne zaman 29 çekti, bir sonraki ne zaman?', 'Şubat 2024\'te 29 gün çekti. Bir sonraki 29 günlük Şubat 2028\'dedir; ardından 2032 ve 2036 gelir.'],
    ['Temmuz ve Ağustos neden arka arkaya 31 gün çeker?', 'Bu düzen takvimin Roma dönemindeki düzenlemelerinden kalmadır ve günümüz takviminde aynen korunmuştur. Aralık ile Ocak da yıl sınırında arka arkaya 31 gün çeken diğer çifttir.'],
    ['Bir ayda en fazla kaç Cumartesi ya da Pazar olabilir?', 'Bir günün ay içinde en fazla beş kez tekrarı olur. 31 günlük bir ay Cuma günü başlarsa beş Cuma, beş Cumartesi ve beş Pazar içerir; böyle bir ayda hafta sonu günlerinin sayısı 10\'a çıkar.'],
    ['Hafta içi gün sayısı iş günü sayısıyla aynı mı?', 'Tam olarak değil. Araç Pazartesi–Cuma günlerini sayar ve resmî tatilleri düşmez. Gerçek iş günü sayısı için o aya denk gelen tatilleri bu sayıdan çıkarmanız gerekir.'],
    ['Maaş ve kira hesabında ay her zaman 30 gün mü sayılır?', 'Bazı uygulamalarda ay 30 gün kabul edilir, bazılarında gerçek gün sayısı kullanılır; bu durum sözleşmeye ve ilgili düzenlemeye göre değişir. Bu araç yalnızca takvimdeki gerçek gün sayısını verir; hangi yöntemin geçerli olduğunu sözleşmenizden ve güncel mevzuattan kontrol edin.'],
    ['Seçtiğim ay ve yıl bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; girdiğiniz bilgiler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['artik-yil-kontrol', 'takvim-olustur', 'is-gunu-hesapla', 'ayin-son-gunu', 'yilin-kacinci-gunu', 'tarih-farki'],
};
