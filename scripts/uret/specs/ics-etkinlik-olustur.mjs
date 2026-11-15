export default {
  slug: 'ics-etkinlik-olustur',
  title: 'Takvim Etkinliği (ICS) Metni Oluşturma',
  h1Tail: 'takvime eklenebilir .ics içeriği',
  pageTitle: 'Takvim Etkinliği (ICS) Oluşturma – Takvime Ekle Dosyası Metni',
  description: 'Başlık, tarih, saat, konum ve hatırlatma bilgilerinden iCalendar (.ics) etkinlik metni oluşturun. Tüm gün ve saatli etkinlikleri, UTC dönüşümünü destekler.',
  card: 'Toplantı, davet ya da randevu için takvim uygulamalarının açabildiği .ics etkinlik metnini oluşturun.',
  category: 'gelistirici',
  keywords: ['ics dosyası oluşturma', 'takvime ekle dosyası', 'icalendar oluşturma', 'ics etkinlik', 'vevent oluşturma', 'takvim daveti oluşturma', 'ics nedir'],
  lead: 'Bir etkinliğin başlığını, tarihini, saatini ve konumunu yazın; takvim uygulamalarının tanıdığı <strong>iCalendar (.ics)</strong> metnini alın. Metni <code>.ics</code> uzantılı bir dosyaya kaydedip e-postayla gönderebilir ya da sitenize "takvime ekle" dosyası olarak koyabilirsiniz.',
  button: 'Oluştur',
  inputs: [
    { id: 'baslik', label: 'Etkinlik başlığı', type: 'text', placeholder: 'Örn. Proje toplantısı', wide: true },
    { id: 'tarih', label: 'Başlangıç tarihi', type: 'date' },
    { id: 'saat', label: 'Başlangıç saati', type: 'text', placeholder: 'Örn. 14:00', hint: 'Boş bırakırsanız tüm gün süren etkinlik olur.' },
    { id: 'bitisTarih', label: 'Bitiş tarihi', type: 'date' },
    { id: 'bitisSaat', label: 'Bitiş saati', type: 'text', placeholder: 'Örn. 15:30', hint: 'Boşsa saatli etkinlik 1 saat sürer.' },
    { id: 'dilim', label: 'Saat türü', type: 'select', options: [['yerel', 'Yerel saat (açan cihazın saatine göre)'], ['tr', 'Türkiye saati (UTC+3) → UTC olarak yaz']] },
    { id: 'hatirlatma', label: 'Hatırlatma', type: 'select', options: [['0', 'Yok'], ['10', '10 dakika önce'], ['30', '30 dakika önce'], ['60', '1 saat önce'], ['1440', '1 gün önce']] },
    { id: 'konum', label: 'Konum', type: 'text', placeholder: 'İsteğe bağlı', wide: true },
    { id: 'aciklama', label: 'Açıklama', type: 'textarea', placeholder: 'İsteğe bağlı', rows: 3 },
  ],
  compute(v, h) {
    const baslik = String(v.baslik ?? '').trim();
    if (!baslik) h.err('"Etkinlik başlığı" alanını doldurun.');
    const saatOku = (s, ad) => {
      const m = /^(\d{1,2})[:.](\d{2})$/.exec(String(s).trim());
      if (!m || +m[1] > 23 || +m[2] > 59) h.err(`"${ad}" alanına saati SS:DD biçiminde yazın (örn. 14:30).`);
      return +m[1] * 60 + +m[2];
    };
    const p2 = (n) => String(n).padStart(2, '0');
    const gun = (d) => `${d.getUTCFullYear()}${p2(d.getUTCMonth() + 1)}${p2(d.getUTCDate())}`;
    const an = (d) => `${gun(d)}T${p2(d.getUTCHours())}${p2(d.getUTCMinutes())}00`;
    const kacis = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r\n?|\n/g, '\\n');
    const katla = (satir) => {
      const enc = new TextEncoder();
      let out = '', cur = '', len = 0, lim = 75;
      for (const ch of satir) {
        const b = enc.encode(ch).length;
        if (len + b > lim) { out += cur + '\n '; cur = ''; len = 0; lim = 74; }
        cur += ch; len += b;
      }
      return out + cur;
    };
    const sureMetni = (dk) => {
      const g = Math.floor(dk / 1440), s = Math.floor((dk % 1440) / 60), d = dk % 60, p = [];
      if (g) p.push(`${g} gün`);
      if (s) p.push(`${s} saat`);
      if (d) p.push(`${d} dakika`);
      return p.join(' ');
    };
    const t0 = h.date(v.tarih, 'Başlangıç tarihi');
    const saatStr = String(v.saat ?? '').trim(), bitSaatStr = String(v.bitisSaat ?? '').trim();
    const t1gun = String(v.bitisTarih ?? '').trim() ? h.date(v.bitisTarih, 'Bitiş tarihi') : t0;
    if (t1gun < t0) h.err('Bitiş tarihi başlangıç tarihinden önce olamaz.');
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bilisim Ajans//ICS Olusturucu//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT'];
    const simdi = new Date();
    L.push(`UID:${simdi.getTime().toString(36)}-${Math.random().toString(36).slice(2, 10)}@ics-olusturucu`);
    L.push(`DTSTAMP:${an(simdi)}Z`);
    let rows;
    if (!saatStr) {
      if (bitSaatStr) h.err('Bitiş saati yazdıysanız başlangıç saatini de yazın; tüm gün etkinlik için ikisini de boş bırakın.');
      const son = h.gunEkle(t1gun, 1);
      L.push(`DTSTART;VALUE=DATE:${gun(t0)}`, `DTEND;VALUE=DATE:${gun(son)}`);
      rows = [['Etkinlik', baslik], ['Başlangıç', `${h.fmtDate(t0)} (tüm gün)`], ['Bitiş', `${h.fmtDate(t1gun)} (tüm gün)`], ['Süre', `${h.gunFarki(t0, son)} gün`]];
    } else {
      const b = new Date(t0.getTime() + saatOku(saatStr, 'Başlangıç saati') * 60000);
      const s = bitSaatStr ? new Date(t1gun.getTime() + saatOku(bitSaatStr, 'Bitiş saati') * 60000) : new Date(b.getTime() + 3600000 + (t1gun.getTime() - t0.getTime()));
      if (s <= b) h.err('Bitiş zamanı başlangıçtan sonra olmalı. Gece yarısını aşan etkinliklerde bitiş tarihini bir sonraki gün seçin.');
      const kay = v.dilim === 'tr' ? -3 * 3600000 : 0, ek = v.dilim === 'tr' ? 'Z' : '';
      L.push(`DTSTART:${an(new Date(b.getTime() + kay))}${ek}`, `DTEND:${an(new Date(s.getTime() + kay))}${ek}`);
      const yaz = (d) => `${h.fmtDate(d)} ${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}`;
      rows = [['Etkinlik', baslik], ['Başlangıç', yaz(b)], ['Bitiş', yaz(s)], ['Süre', sureMetni(Math.round((s - b) / 60000))]];
    }
    L.push(`SUMMARY:${kacis(baslik)}`);
    const konum = String(v.konum ?? '').trim(), acik = String(v.aciklama ?? '').trim();
    if (konum) L.push(`LOCATION:${kacis(konum)}`);
    if (acik) L.push(`DESCRIPTION:${kacis(acik)}`);
    const hat = { 10: 'PT10M', 30: 'PT30M', 60: 'PT1H', 1440: 'P1D' }[v.hatirlatma];
    if (hat) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${kacis(baslik)}`, `TRIGGER:-${hat}`, 'END:VALARM');
    L.push('END:VEVENT', 'END:VCALENDAR');
    return {
      rows,
      text: L.map(katla).join('\n'),
      note: 'Metni kopyalayıp bir metin düzenleyiciye yapıştırın ve "etkinlik.ics" adıyla, UTF-8 kodlamasıyla kaydedin. UID ve DTSTAMP satırları her oluşturmada yenilenir.',
    };
  },
  cases: [
    { in: { baslik: 'Proje toplantısı', tarih: '2027-03-15', saat: '14:00', bitisSaat: '15:30' }, out: { 'Etkinlik': 'Proje toplantısı', 'Başlangıç': '15.03.2027 14:00', 'Bitiş': '15.03.2027 15:30', 'Süre': '1 saat 30 dakika' }, textMatch: '^BEGIN:VCALENDAR\\nVERSION:2\\.0\\n[\\s\\S]*\\nDTSTART:20270315T140000\\nDTEND:20270315T153000\\nSUMMARY:Proje toplantısı\\nEND:VEVENT\\nEND:VCALENDAR$' },
    { in: { baslik: 'Yıllık izin', tarih: '2027-07-05', bitisTarih: '2027-07-09' }, out: { 'Başlangıç': '05.07.2027 (tüm gün)', 'Bitiş': '09.07.2027 (tüm gün)', 'Süre': '5 gün' }, textMatch: 'DTSTART;VALUE=DATE:20270705\\nDTEND;VALUE=DATE:20270710\\nSUMMARY:Yıllık izin' },
    { in: { baslik: 'Çevrim içi sunum', tarih: '2027-01-10', saat: '01:30', dilim: 'tr', hatirlatma: '30' }, out: { 'Bitiş': '10.01.2027 02:30', 'Süre': '1 saat' }, textMatch: 'DTSTART:20270109T223000Z\\nDTEND:20270109T233000Z\\n[\\s\\S]*BEGIN:VALARM\\nACTION:DISPLAY\\nDESCRIPTION:Çevrim içi sunum\\nTRIGGER:-PT30M\\nEND:VALARM' },
    { in: { baslik: 'Gece vardiyası', tarih: '2027-02-28', saat: '22:00', bitisTarih: '2027-03-01', bitisSaat: '06:00' }, out: { 'Bitiş': '01.03.2027 06:00', 'Süre': '8 saat' } },
    { in: { baslik: 'Doğum günü', tarih: '2028-02-29' }, out: { 'Süre': '1 gün' }, textMatch: 'DTSTART;VALUE=DATE:20280229\\nDTEND;VALUE=DATE:20280301' },
    { in: { baslik: 'Yemek; saat 8, sakın gecikme', tarih: '2027-05-01', saat: '20.00', konum: 'Ofis, 3. kat', aciklama: 'Birinci satır\nİkinci satır' }, textMatch: 'SUMMARY:Yemek\\\\; saat 8\\\\, sakın gecikme\\nLOCATION:Ofis\\\\, 3\\. kat\\nDESCRIPTION:Birinci satır\\\\nİkinci satır' },
    { in: { baslik: 'Toplantı', tarih: '2027-03-15', saat: '14:00', bitisSaat: '13:00' }, error: true },
    { in: { baslik: '', tarih: '2027-03-15' }, error: true },
    { in: { baslik: 'Toplantı', tarih: '2027-03-15', saat: '25:00' }, error: true },
  ],
  howto: [
    'Etkinlik başlığını ve başlangıç tarihini girin. Saatli bir etkinlikse başlangıç saatini 14:00 gibi yazın; tüm gün sürecekse saat alanlarını boş bırakın.',
    'Bitiş tarihini ve saatini girin. Bitiş tarihini boş bırakırsanız etkinlik başladığı gün biter; bitiş saatini boş bırakırsanız süre bir saat kabul edilir.',
    'Saat türünü seçin: katılımcılar farklı ülkelerdeyse Türkiye saatini UTC\'ye çeviren seçeneği kullanın. İsterseniz hatırlatma, konum ve açıklama ekleyin.',
    '"Oluştur" düğmesine basın, çıkan metni kopyalayın ve bir metin düzenleyicide <code>.ics</code> uzantısıyla kaydedin.',
    'Dosyayı çift tıklayarak kendi takviminize ekleyin ya da e-posta eki olarak katılımcılara gönderin.',
  ],
  sections: [
    { h: 'ICS dosyası nedir?', p: [
      'ICS, takvim verilerini uygulamalar arasında taşımak için kullanılan iCalendar biçiminin dosya uzantısıdır. Düz metinden oluşur; her satır bir özellik adı, iki nokta ve değerden ibarettir. Telefon ve bilgisayarlardaki takvim uygulamalarının ve web tabanlı takvim hizmetlerinin büyük çoğunluğu bu biçimi içe aktarabilir. Bu sayede tek bir dosya hazırlayıp herkese gönderirsiniz, alan kişi hangi takvimi kullanırsa kullansın etkinliği birkaç dokunuşla ekler.',
      'Bir etkinlik dosyası iç içe iki bloktan oluşur. Dıştaki <code>VCALENDAR</code> bloğu dosyanın bir takvim olduğunu ve sürümünü bildirir. İçteki <code>VEVENT</code> bloğu etkinliğin kendisidir: başlığı <code>SUMMARY</code>, başlangıcı <code>DTSTART</code>, bitişi <code>DTEND</code>, konumu <code>LOCATION</code>, açıklaması <code>DESCRIPTION</code> satırında tutulur. <code>UID</code> etkinliğin benzersiz kimliği, <code>DTSTAMP</code> ise dosyanın üretildiği andır; ikisi de standartça zorunludur ve araç bunları kendiliğinden ekler.',
    ] },
    { h: 'Yerel saat mi, UTC mi?', p: [
      'Saat türü seçimi, etkinliğin farklı saat dilimlerindeki kişilerde nasıl görüneceğini belirler. "Yerel saat" seçeneğinde saat, dilim bilgisi olmadan yazılır (<code>DTSTART:20270315T140000</code>). Dosyayı açan her cihaz bunu kendi saatine göre 14:00 olarak gösterir. Herkesin aynı şehirde olduğu toplantı, randevu ve davetlerde bu yeterlidir.',
      'Çevrim içi seminer gibi farklı ülkelerden katılım olan etkinliklerde ise saat kesin bir ana bağlanmalıdır. İkinci seçenek, yazdığınız saati Türkiye saati (UTC+3) kabul eder, üç saat geri alarak UTC\'ye çevirir ve sonuna <code>Z</code> harfi koyar. Örneğin 10 Ocak 2027 saat 01:30 için <code>DTSTART:20270109T223000Z</code> yazılır; tarih bir gün geriye kaymıştır, çünkü UTC\'de o an henüz 9 Ocak akşamıdır. Takvim uygulaması bu değeri her katılımcının kendi saatine çevirerek gösterir.',
    ] },
    { h: 'Tüm gün süren etkinliklerde bitiş tarihi', p: [
      'Saat yazmadığınızda etkinlik tüm gün olarak işaretlenir ve tarih <code>VALUE=DATE</code> ekiyle saatsiz yazılır. Burada sık karıştırılan bir ayrıntı vardır: iCalendar biçiminde bitiş tarihi <strong>dahil değildir</strong>. 5 Temmuz\'dan 9 Temmuz\'a kadar süren beş günlük bir izin için bitiş satırına 9 değil 10 Temmuz yazılır (<code>DTEND;VALUE=DATE:20270710</code>). Araç bu kaydırmayı kendisi yapar; siz son günü, yani 9 Temmuz\'u seçersiniz ve sonuç tablosunda süreyi 5 gün olarak görürsünüz.',
    ] },
    { h: 'Özel karakterler ve uzun satırlar', p: [
      'Başlık, konum ve açıklama metinlerinde virgül ve noktalı virgül ayraç anlamı taşıdığından önlerine ters eğik çizgi konur; alt satıra geçişler ise <code>\\n</code> olarak yazılır. Örneğin "Ofis, 3. kat" konumu dosyada <code>LOCATION:Ofis\\, 3. kat</code> biçiminde görünür. Takvim uygulaması bunu yeniden normal metne çevirir.',
      'Standart, bir satırın 75 bayttan uzun olmamasını ister. Uzun açıklamalar bu yüzden bölünür ve devam satırları bir boşlukla başlar. Çıktıda boşlukla başlayan satırlar görürseniz bu bir hata değildir; "katlama" denen bu kural uygulamalarca geri birleştirilir. Türkçe harfler birden fazla bayt tuttuğu için bölme harf ortasına denk gelmeyecek biçimde yapılır.',
    ] },
    { h: 'Hatırlatma nasıl çalışır?', p: [
      'Hatırlatma seçtiğinizde etkinliğin içine bir <code>VALARM</code> bloğu eklenir. <code>TRIGGER:-PT30M</code> satırı "başlangıçtan 30 dakika önce" anlamına gelir; bir saat için <code>-PT1H</code>, bir gün için <code>-P1D</code> yazılır. Hatırlatmayı gösterip göstermemek takvim uygulamasının kararıdır; bazı uygulamalar dışarıdan gelen dosyalardaki hatırlatmaları yok sayıp kullanıcının kendi varsayılan ayarını uygular.',
    ] },
    { h: 'Sınırlar', ul: [
      'Araç tek bir etkinlik üretir; haftalık ya da aylık yinelenen etkinlik kuralı eklemez.',
      'Katılımcı listesi ve yanıt isteği içeren toplantı davetleri kapsam dışındadır; üretilen dosya bilgilendirme amaçlı bir etkinliktir.',
      'UTC dönüşümü yalnızca Türkiye saati (UTC+3) için yapılır. Başka bir dilimdeyseniz saati önce Türkiye saatine çevirin ya da yerel saat seçeneğini kullanın.',
      'Dosyayı kaydederken kodlamanın UTF-8 olmasına dikkat edin; aksi hâlde Türkçe harfler bozuk görünebilir.',
    ] },
  ],
  faq: [
    ['ICS dosyası nasıl açılır?', 'Bilgisayarda dosyaya çift tıkladığınızda varsayılan takvim uygulaması etkinliği eklemeyi önerir. Telefonda e-posta ekine ya da indirilen dosyaya dokunmanız yeterlidir. Web tabanlı takvimlerde ayarlar bölümündeki içe aktarma seçeneği kullanılır.'],
    ['Oluşan metni .ics dosyasına nasıl çeviririm?', 'Metni kopyalayın, Not Defteri gibi düz metin düzenleyiciye yapıştırın ve "Farklı kaydet" ile adını <code>etkinlik.ics</code> yapın. Kayıt türünü "Tüm dosyalar", kodlamayı UTF-8 seçin; aksi hâlde dosya .txt olarak kaydedilebilir.'],
    ['Bitiş saatini yazmazsam ne olur?', 'Başlangıç saati yazılıp bitiş saati boş bırakılırsa etkinlik bir saat sürecek şekilde oluşturulur. Hem başlangıç hem bitiş saati boşsa etkinlik tüm gün olarak işaretlenir.'],
    ['Gece yarısını geçen etkinlik nasıl girilir?', 'Bitiş tarihini bir sonraki gün seçin. Örneğin 28 Şubat 22:00\'de başlayıp 1 Mart 06:00\'da biten vardiya için bitiş tarihi 1 Mart yazılır; araç süreyi 8 saat olarak hesaplar.'],
    ['Yurt dışındaki katılımcı etkinliği doğru saatte görür mü?', 'Saat türünü "Türkiye saati → UTC" seçerseniz evet; takvim uygulaması saati katılımcının kendi dilimine çevirir. "Yerel saat" seçeneğinde herkes yazdığınız saati kendi yerel saati olarak görür, bu da farklı ülkelerde yanlış ana denk gelir.'],
    ['UID satırı ne işe yarar, neden her seferinde değişiyor?', 'UID etkinliğin benzersiz kimliğidir; takvim uygulaması aynı kimlikli etkinliği yeniden içe aktarırken ikinci bir kayıt açmak yerine var olanı günceller. Araç her oluşturmada yeni bir kimlik üretir; aynı etkinliği güncellemek istiyorsanız eski dosyadaki UID satırını yeni metne taşıyın.'],
    ['Çıktıda boşlukla başlayan satırlar hata mı?', 'Hayır. iCalendar biçiminde 75 baytı aşan satırlar bölünür ve devamı tek boşlukla başlar. Takvim uygulamaları bu satırları birleştirerek okur.'],
    ['Etkinlik bilgilerim sunucuya gönderiliyor mu?', 'Hayır. ICS metni tarayıcınızda üretilir; başlık, tarih, konum ve açıklama hiçbir sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['vcard-olustur', 'mailto-link-olustur', 'tarih-farki', 'iso-hafta-tarihi-cevir', 'qr-kod'],
};
