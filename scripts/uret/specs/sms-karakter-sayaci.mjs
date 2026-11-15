export default {
  slug: 'sms-karakter-sayaci',
  title: 'SMS Karakter ve Mesaj Sayısı Sayacı',
  h1Tail: 'metniniz kaç SMS eder?',
  pageTitle: 'SMS Karakter Sayacı – Mesaj Kaç SMS Eder? (Türkçe Karakter Etkisi)',
  description: 'SMS metninizin kaç karakter ve kaç mesaj ettiğini hesaplayın. Türkçe karakterlerin sınırı 160\'tan 70\'e nasıl düşürdüğünü görün, dönüştürülmüş metni alın.',
  card: 'SMS metniniz kaç karakter, kaç mesaj eder? Türkçe karakterlerin 160/70 sınırına etkisini görün.',
  category: 'metin',
  keywords: ['sms karakter sayacı', 'sms kaç karakter', 'kaç sms eder', 'sms karakter sınırı', 'türkçe karakter sms', '160 karakter sms', 'toplu sms karakter hesaplama', 'sms uzunluk hesaplama'],
  lead: 'SMS metninizi yapıştırın; araç metnin hangi kodlamayla gideceğini, <strong>kaç karakter</strong> tuttuğunu ve <strong>kaç SMS</strong> olarak ücretlendirileceğini hesaplasın. Tek bir "ş" harfinin mesaj sınırını 160\'tan 70\'e nasıl indirdiğini ve Türkçe karakterler dönüştürülürse ne kazanacağınızı da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'metin', label: 'SMS metni', type: 'textarea', placeholder: 'Göndereceğiniz mesajı buraya yazın ya da yapıştırın', wide: true },
    { id: 'mod', label: 'Türkçe ve özel karakterler', type: 'select', options: [['oto', 'Olduğu gibi say'], ['donustur', 'Dönüştür (ş→s, ğ→g, ı→i, ç→c, kıvrık tırnak→düz)']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n').normalize('NFC');
    if (ham === '' || ham.trim() === '') h.err('Hesaplamak için "SMS metni" alanına mesajınızı yazın.');
    const TEMEL = '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';
    const EK = '^{}\\[~]|€\f';
    const cevir = (s) => {
      const harita = { 'ş': 's', 'Ş': 'S', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I', 'ç': 'c', '’': '\'', '‘': '\'', '“': '"', '”': '"', '…': '...', '–': '-', '—': '-', ' ': ' ' };
      return Array.from(s).map((c) => harita[c] ?? c).join('');
    };
    const olc = (s) => {
      const disi = [];
      let birim = 0;
      for (const c of Array.from(s)) {
        if (TEMEL.includes(c)) birim += 1;
        else if (EK.includes(c)) birim += 2;
        else if (!disi.includes(c)) disi.push(c);
      }
      const gsm = disi.length === 0;
      if (!gsm) birim = s.length; // UCS-2: UTF-16 kod birimi sayısı
      const tek = gsm ? 160 : 70, parca = gsm ? 153 : 67;
      const mesaj = birim <= tek ? 1 : Math.ceil(birim / parca);
      const kapasite = mesaj === 1 ? tek : mesaj * parca;
      return { gsm, birim, tek, parca, mesaj, kalan: kapasite - birim, disi };
    };
    const metin = v.mod === 'donustur' ? cevir(ham) : ham;
    const o = olc(metin), alt = olc(cevir(ham));
    const rows = [
      ['Mesaj sayısı', `${o.mesaj} SMS`],
      ['Kodlama', o.gsm ? 'GSM-7 (standart alfabe)' : 'Unicode (UCS-2)'],
      ['Karakter (SMS birimi)', h.fmt(o.birim, 0)],
      ['Bu mesaj sayısında kalan', h.fmt(o.kalan, 0)],
      ['Mesaj başına sınır', `${o.tek} (tek mesaj) / ${o.parca} (birleşik mesajın her parçası)`],
      ['Unicode gerektiren karakterler', o.disi.length ? o.disi.slice(0, 15).join(' ') + (o.disi.length > 15 ? ' …' : '') : '—'],
    ];
    if (v.mod !== 'donustur') rows.push(['Türkçe karakterler dönüştürülürse', `${alt.mesaj} SMS (${alt.gsm ? 'GSM-7' : 'Unicode'}, ${h.fmt(alt.birim, 0)} karakter)`]);
    return {
      rows,
      text: v.mod === 'donustur' ? metin : undefined,
      note: 'Hesap, standart GSM-7 ve UCS-2 kodlamalarına göredir. Ücretlendirme ve Türkçe karakter desteği operatöre ve SMS sağlayıcısına göre değişebilir.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba, siparisiniz kargoya verildi.', mod: 'oto' }, out: { 'Mesaj sayısı': '1 SMS', 'Kodlama': 'GSM-7 (standart alfabe)', 'Karakter (SMS birimi)': '37', 'Bu mesaj sayısında kalan': '123', 'Unicode gerektiren karakterler': '—' } },
    { in: { metin: 'Siparişiniz kargoya verildi.', mod: 'oto' }, out: { 'Mesaj sayısı': '1 SMS', 'Kodlama': 'Unicode (UCS-2)', 'Karakter (SMS birimi)': '28', 'Bu mesaj sayısında kalan': '42', 'Unicode gerektiren karakterler': 'ş', 'Türkçe karakterler dönüştürülürse': '1 SMS (GSM-7, 28 karakter)' } },
    { in: { metin: 'a'.repeat(160) }, out: { 'Mesaj sayısı': '1 SMS', 'Bu mesaj sayısında kalan': '0' } },
    { in: { metin: 'a'.repeat(161) }, out: { 'Mesaj sayısı': '2 SMS', 'Bu mesaj sayısında kalan': '145', 'Mesaj başına sınır': '160 (tek mesaj) / 153 (birleşik mesajın her parçası)' } },
    { in: { metin: 'ş'.repeat(71) }, out: { 'Mesaj sayısı': '2 SMS', 'Bu mesaj sayısında kalan': '63', 'Türkçe karakterler dönüştürülürse': '1 SMS (GSM-7, 71 karakter)' } },
    { in: { metin: 'Fiyat: 100€ [kampanya]' }, out: { 'Kodlama': 'GSM-7 (standart alfabe)', 'Karakter (SMS birimi)': '25' } },
    { in: { metin: 'Şifreniz: çağrı ığdır İZMİR', mod: 'donustur' }, out: { 'Kodlama': 'GSM-7 (standart alfabe)', 'Karakter (SMS birimi)': '27' }, text: 'Sifreniz: cagri igdir IZMIR' },
    { in: { metin: 'Selam 😀' }, out: { 'Kodlama': 'Unicode (UCS-2)', 'Karakter (SMS birimi)': '8' } },
    { in: { metin: 'Çöl ünü' }, out: { 'Kodlama': 'GSM-7 (standart alfabe)', 'Karakter (SMS birimi)': '7' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '   ' }, error: true },
  ],
  howto: [
    'Göndermeyi düşündüğünüz mesajı "SMS metni" kutusuna yazın ya da yapıştırın.',
    'İlk denemede "Olduğu gibi say" seçili kalsın ve "Hesapla" düğmesine basın. Kodlama, karakter ve mesaj sayısı görünür.',
    '"Unicode gerektiren karakterler" satırına bakın. Burada bir karakter varsa mesajınız 70 karakterlik sınıra tabidir.',
    '"Türkçe karakterler dönüştürülürse" satırı, bu karakterler değiştirildiğinde kaç SMS tutacağını gösterir. Kazanç varsa seçeneği "Dönüştür" yapıp yeniden hesaplayın; dönüştürülmüş metin sonuç kutusunda hazır olur.',
  ],
  sections: [
    { h: 'SMS neden 160 karakterdir?', p: [
      'Bir kısa mesaj, şebekede 140 baytlık bir alanda taşınır. Standart SMS alfabesi (GSM-7) her karakteri 7 bitle kodlar; 140 bayt 1120 bit eder ve 1120 ÷ 7 = <strong>160 karakter</strong> sığar. Bu alfabe İngilizce harfleri, rakamları, yaygın noktalama işaretlerini ve Batı Avrupa dillerinin bazı harflerini içerir.',
      'Metinde bu alfabede bulunmayan tek bir karakter bile varsa mesajın <strong>tamamı</strong> Unicode (UCS-2) ile kodlanır. Bu kodlamada her karakter 16 bit yer tutar ve aynı 140 bayta yalnızca <strong>70 karakter</strong> sığar. Yani sınır, o tek karakter yüzünden yarının da altına iner.',
    ] },
    { h: 'Uzun mesajlar: 153 ve 67 kuralı', p: [
      'Sınırı aşan metinler birden fazla SMS olarak gönderilir ve alıcının telefonunda tek mesaj gibi birleştirilir. Birleştirmenin yapılabilmesi için her parçanın başına sıra bilgisini taşıyan küçük bir başlık eklenir. Bu başlık yer kapladığından parça başına kapasite düşer: GSM-7 kodlamasında <strong>153</strong>, Unicode kodlamasında <strong>67</strong> karakter.',
      'Bu yüzden hesap doğrusal değildir. 160 karakterlik bir metin 1 SMS\'tir; 161 karakter olduğunda 2 SMS olur ve iki parçanın toplam kapasitesi 320 değil 306\'dır. Unicode tarafında 70 karakter 1 SMS, 71 karakter 2 SMS\'tir ve iki parça toplam 134 karakter alır. Araç, kalan karakteri bu parça kapasitesine göre hesaplar.',
    ] },
    { h: 'Hangi Türkçe harfler sorun çıkarır?', p: [
      'Standart GSM-7 alfabesinde <strong>ö, ü, Ö, Ü</strong> ve büyük <strong>Ç</strong> bulunur; bunlar mesajı Unicode\'a çevirmez. Buna karşılık <strong>ş, Ş, ğ, Ğ, ı, İ</strong> ve küçük <strong>ç</strong> bu alfabede yoktur. "Siparişiniz" kelimesindeki tek "ş" harfi, mesajın sınırını 160\'tan 70\'e indirmeye yeter.',
      'Gözden kaçan başka suçlular da vardır: kelime işlemcilerin otomatik yerleştirdiği kıvrık tırnaklar (’ “ ”), üç nokta karakteri (…), uzun tire (—) ve emojiler. Metni bir belgeden kopyaladıysanız Türkçe harf kullanmasanız bile mesaj Unicode olabilir. Araç, kodlamayı değiştiren karakterleri ayrı bir satırda listeler; "Dönüştür" seçeneği bunların düz karşılıklarını yazar.',
      'Bazı operatörler ve SMS sağlayıcıları, Türkçe harfleri 7 bitlik kodlama içinde taşıyan ulusal dil tablolarını destekler; bu durumda sınırlar burada hesaplanandan farklı olur. Toplu gönderim yapıyorsanız sağlayıcınızın Türkçe karakter politikasını ve ücretlendirme biçimini ayrıca öğrenin.',
    ] },
    { h: 'Çift sayılan karakterler', p: [
      'GSM-7 alfabesinin genişletme tablosundaki bazı işaretler bir kaçış koduyla birlikte gönderilir ve <strong>iki karakter</strong> yer tutar: köşeli parantezler [ ], süslü parantezler { }, ters eğik çizgi, şapka (^), yaklaşık işareti (~), dikey çizgi (|) ve avro simgesi (€). "Fiyat: 100€ [kampanya]" metni ekranda 22 karakter görünür, ancak avro simgesi ve iki köşeli parantez çift sayıldığı için 25 SMS birimi tutar. Unicode kodlamasında ise emojilerin çoğu iki birim sayılır: "Selam" kelimesi, bir boşluk ve bir gülen yüz 8 birim eder.',
    ] },
    { h: 'Çözümlü örnek: bir harfin maliyeti', p: [
      'Bir kargo bildirimi düşünün: 150 karakterlik, içinde "siparişiniz" kelimesi geçen bir metin. "ş" harfi yüzünden kodlama Unicode\'dur; 150 karakter 70\'i aştığı için parça kapasitesi 67 olur ve 150 ÷ 67 = 2,24, yukarı yuvarlanınca <strong>3 SMS</strong> eder. Aynı metin "siparisiniz" yazımıyla GSM-7 kodlamasına sığar; 150 karakter 160\'ın altında olduğundan <strong>1 SMS</strong> olarak gider.',
      'Bin kişilik bir gönderimde bu fark 3.000 ile 1.000 mesaj arasındaki farktır. Öte yandan Türkçe karaktersiz metin daha özensiz görünebilir ve bazı kelimelerde anlam karışabilir. Kararı içeriğe göre verin: doğrulama kodu ve kargo bildirimi gibi işlevsel mesajlarda dönüştürme yaygındır; marka diliyle yazılmış kampanya metinlerinde Türkçe karakterleri korumak tercih edilebilir.',
    ] },
    { h: 'Hızlı başvuru', ul: [
      'GSM-7, tek mesaj: 160 karakter',
      'GSM-7, birleşik mesaj: parça başına 153 karakter (2 SMS = 306, 3 SMS = 459, 4 SMS = 612)',
      'Unicode, tek mesaj: 70 karakter',
      'Unicode, birleşik mesaj: parça başına 67 karakter (2 SMS = 134, 3 SMS = 201, 4 SMS = 268)',
      'Satır sonu ve boşluk da birer karakterdir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç kodlama ve uzunluk hesabı yapar; mesaj göndermez. Ücretlendirmeyi operatörünüzün tarifesi ve sağlayıcınızın sözleşmesi belirler. Toplu SMS\'lerde başlık, ret bilgisi ya da firma kodu gibi sonradan eklenen metinler de karakter harcar; bunları hesaba katmak için metne ekleyerek sayın. Çift sayılan bir karakter parça sınırına denk gelirse sistem onu bölmeden sonraki parçaya aktarır; bu ender durumda gerçek parça sayısı hesaplanandan bir fazla çıkabilir.',
    ] },
  ],
  faq: [
    ['Bir SMS kaç karakterdir?', 'Standart GSM-7 alfabesiyle yazılmış bir mesaj 160 karakterdir. Metinde bu alfabede olmayan bir karakter varsa kodlama Unicode\'a döner ve sınır 70 karaktere iner.'],
    ['Türkçe karakter kullanınca neden daha çok SMS gidiyor?', 'ş, ğ, ı, İ ve küçük ç standart SMS alfabesinde bulunmaz. Bunlardan biri bile olsa mesajın tamamı karakter başına 16 bit kullanan Unicode ile gönderilir ve mesaj başına kapasite 160\'tan 70\'e düşer.'],
    ['ö ve ü harfleri de sınırı düşürür mü?', 'Hayır. ö, ü, Ö, Ü ve büyük Ç standart alfabede yer alır ve tek karakter sayılır. Sorun çıkaranlar ş, ğ, ı, İ ve küçük ç harfleridir.'],
    ['161 karakter neden 2 SMS sayılıyor?', '160 karakteri aşan metin parçalara bölünür ve her parçaya birleştirme başlığı eklenir. Başlık yer kapladığı için parça kapasitesi 153\'e iner; 161 karakter iki parçaya yayılır.'],
    ['Emoji kullanırsam ne olur?', 'Emoji standart alfabede olmadığı için mesaj Unicode\'a döner ve sınır 70 olur. Ayrıca emojilerin çoğu tek başına iki birim yer tutar.'],
    ['Alıcı uzun mesajı parça parça mı görür?', 'Günümüz telefonları birleşik mesajları tek mesaj olarak gösterir. Yine de gönderen tarafta her parça ayrı bir SMS olarak sayılır ve ücretlendirilir.'],
    ['Dönüştürme seçeneği neleri değiştirir?', 'ş, ğ, ı, İ ve küçük ç harflerini noktasız ve çengelsiz karşılıklarına; kıvrık tırnakları düz tırnağa, üç nokta karakterini üç ayrı noktaya, uzun tireyi kısa tireye çevirir. ö, ü ve büyük Ç zaten standart alfabede olduğu için değiştirilmez.'],
    ['Yazdığım mesaj bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; metin sunucuya iletilmez, saklanmaz ve herhangi bir numaraya gönderilmez.'],
  ],
  related: ['karakter-sayaci', 'twitter-karakter-sayaci', 'turkce-karakter-donustur', 'tirnak-donustur', 'emoji-temizle', 'metin-kisalt'],
};
