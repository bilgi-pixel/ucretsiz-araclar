export default {
  slug: 'http-durum-kodlari',
  title: 'HTTP Durum Kodu Sorgulama',
  h1Tail: '200, 301, 404, 500…',
  pageTitle: 'HTTP Durum Kodu Sorgulama – 301, 404, 500 Ne Anlama Gelir?',
  description: 'HTTP durum kodunu yazın; adını, Türkçe karşılığını, sınıfını, ne zaman döndüğünü ve nasıl ele alınacağını öğrenin. 1xx–5xx arası tüm standart kodlar.',
  card: 'HTTP durum kodunu yazın; adı, Türkçe anlamı, sınıfı ve sunucunun bu kodu ne zaman döndürdüğü açıklansın.',
  category: 'gelistirici',
  keywords: ['http durum kodları', '404 hatası nedir', '301 yönlendirme', '500 hatası ne demek', 'http status code', '503 hatası', '403 forbidden nedir', 'http hata kodları'],
  lead: 'Bir HTTP durum kodunu yazın; kodun resmî adını, Türkçe karşılığını, hangi sınıfa girdiğini ve sunucunun bu yanıtı hangi durumda verdiğini görün. Araç <strong>100–599</strong> arasındaki standart kodları tanır.',
  button: 'Sorgula',
  inputs: [
    { id: 'kod', label: 'Durum kodu', type: 'text', placeholder: 'Örn. 404', hint: '100 ile 599 arasında üç haneli bir sayı yazın.' },
  ],
  compute(v, h) {
    const t = String(v.kod ?? '').trim();
    if (!t) h.err('Bir HTTP durum kodu yazın (örn. 404).');
    if (!/^\d{3}$/.test(t)) h.err('HTTP durum kodu üç haneli bir sayıdır (örn. 200, 301, 404).');
    const kod = Number(t);
    if (kod < 100 || kod > 599) h.err('HTTP durum kodları 100 ile 599 arasındadır.');
    const siniflar = {
      1: ['1xx – Bilgilendirme', 'İstek alındı, işlem sürüyor; bu ara yanıttan sonra asıl yanıt gelir.'],
      2: ['2xx – Başarılı', 'İstek alındı, anlaşıldı ve başarıyla işlendi.'],
      3: ['3xx – Yönlendirme', 'İsteğin tamamlanması için istemcinin ek bir adım atması, çoğunlukla başka bir adrese gitmesi gerekir.'],
      4: ['4xx – İstemci hatası', 'İstek hatalı ya da yerine getirilemez; sorun isteği gönderen taraftadır.'],
      5: ['5xx – Sunucu hatası', 'İstek geçerli görünüyor ama sunucu onu yerine getiremedi; sorun sunucu tarafındadır.'],
    };
    const K = {
      100: ['Continue', 'Devam et', 'Sunucu istek başlıklarını aldı; istemci gövdeyi göndermeye devam edebilir. Büyük yüklemelerde "Expect: 100-continue" başlığıyla birlikte kullanılır.'],
      101: ['Switching Protocols', 'Protokol değiştiriliyor', 'Sunucu, istemcinin Upgrade başlığıyla istediği protokole geçmeyi kabul etti. WebSocket bağlantısı kurulurken görülür.'],
      102: ['Processing', 'İşleniyor', 'Sunucu isteği aldı ve işliyor, ancak henüz yanıt hazır değil. WebDAV kaynaklı bir koddur.'],
      103: ['Early Hints', 'Erken ipuçları', 'Asıl yanıt hazırlanırken tarayıcının önceden yükleyebileceği kaynaklar Link başlıklarıyla bildirilir.'],
      200: ['OK', 'Tamam', 'İstek başarılı. GET için istenen kaynak gövdede döner; en sık görülen yanıttır.'],
      201: ['Created', 'Oluşturuldu', 'İstek sonucunda yeni bir kaynak oluşturuldu. Genellikle POST ya da PUT yanıtıdır ve Location başlığı yeni kaynağın adresini verir.'],
      202: ['Accepted', 'Kabul edildi', 'İstek işlenmek üzere kabul edildi ama işlem henüz tamamlanmadı. Kuyruğa alınan, arka planda çalışan işler için kullanılır.'],
      203: ['Non-Authoritative Information', 'Yetkili olmayan bilgi', 'Yanıt başarılı, ancak içerik aradaki bir vekil sunucu tarafından değiştirilmiş olabilir.'],
      204: ['No Content', 'İçerik yok', 'İstek başarılı ama döndürülecek gövde yok. Silme ve kaydetme işlemlerinde yaygındır.'],
      205: ['Reset Content', 'İçeriği sıfırla', 'İstek başarılı; istemci isteği gönderen görünümü, örneğin formu, sıfırlamalıdır.'],
      206: ['Partial Content', 'Kısmi içerik', 'Range başlığıyla istenen parça gönderildi. Video oynatma ve kaldığı yerden indirme bu kodla çalışır.'],
      207: ['Multi-Status', 'Çoklu durum', 'Gövde, birden fazla işlem için ayrı ayrı durum bilgisi içerir. WebDAV kaynaklıdır.'],
      208: ['Already Reported', 'Zaten bildirildi', 'Bir WebDAV bağlamasının üyeleri aynı yanıtın önceki bölümünde sayıldı, yinelenmiyor.'],
      226: ['IM Used', 'IM kullanıldı', 'Sunucu, kaynağa bir ya da daha fazla örnek dönüşümü uygulayarak yanıt verdi.'],
      300: ['Multiple Choices', 'Çoklu seçenek', 'İstek için birden fazla olası yanıt var; istemci birini seçmelidir. Uygulamada nadirdir.'],
      301: ['Moved Permanently', 'Kalıcı olarak taşındı', 'Kaynak kalıcı olarak Location başlığındaki adrese taşındı. Arama motorları eski adresin değerini yenisine aktarır; alan adı ve adres yapısı değişikliklerinde kullanılır.'],
      302: ['Found', 'Bulundu (geçici yönlendirme)', 'Kaynak geçici olarak başka bir adreste. İstemci sonraki isteklerde yine özgün adresi kullanmalıdır.'],
      303: ['See Other', 'Diğerine bak', 'Yanıt başka bir adreste ve GET ile alınmalı. Form gönderiminden sonra sonuç sayfasına yönlendirmede kullanılır.'],
      304: ['Not Modified', 'Değiştirilmedi', 'Kaynak, istemcinin önbelleğindeki kopyadan beri değişmedi; gövde gönderilmez, tarayıcı önbellekteki sürümü kullanır.'],
      305: ['Use Proxy', 'Vekil kullan', 'Kaynağa bir vekil sunucu üzerinden erişilmesi gerektiğini bildirirdi; güvenlik nedeniyle kullanımdan kaldırılmıştır.'],
      307: ['Temporary Redirect', 'Geçici yönlendirme', 'Kaynak geçici olarak başka adreste; 302\'den farkı, istemcinin istek yöntemini ve gövdesini değiştirmeden yinelemesinin zorunlu olmasıdır.'],
      308: ['Permanent Redirect', 'Kalıcı yönlendirme', 'Kaynak kalıcı olarak taşındı; 301\'den farkı, istek yönteminin ve gövdesinin korunmasının zorunlu olmasıdır.'],
      400: ['Bad Request', 'Hatalı istek', 'Sunucu isteği anlayamadı: bozuk sözdizimi, geçersiz parametre ya da hatalı biçimlenmiş gövde.'],
      401: ['Unauthorized', 'Kimlik doğrulama gerekli', 'İstek kimlik doğrulaması gerektiriyor ya da gönderilen kimlik bilgisi geçersiz. Yanıtta WWW-Authenticate başlığı bulunur.'],
      402: ['Payment Required', 'Ödeme gerekli', 'İleride kullanılmak üzere ayrılmış bir koddur; bazı hizmetler ödeme ya da kota sorunlarını bildirmek için kullanır.'],
      403: ['Forbidden', 'Yasak', 'Sunucu isteği anladı ama yerine getirmeyi reddediyor. Kimlik doğrulamak sonucu değiştirmez; erişim izni yoktur.'],
      404: ['Not Found', 'Bulunamadı', 'İstenen adreste bir kaynak yok. Yanlış yazılmış bağlantı, silinmiş ya da taşınmış sayfa en sık nedenleridir.'],
      405: ['Method Not Allowed', 'Yönteme izin verilmiyor', 'Kaynak var ama kullanılan HTTP yöntemini desteklemiyor. Yanıttaki Allow başlığı izin verilen yöntemleri listeler.'],
      406: ['Not Acceptable', 'Kabul edilemez', 'Sunucu, istemcinin Accept başlıklarında belirttiği biçimlerden hiçbirinde içerik üretemiyor.'],
      407: ['Proxy Authentication Required', 'Vekil kimlik doğrulaması gerekli', 'İstemcinin önce aradaki vekil sunucuya kimliğini doğrulaması gerekir.'],
      408: ['Request Timeout', 'İstek zaman aşımı', 'İstemci isteği sunucunun beklemeye razı olduğu süre içinde tamamlamadı.'],
      409: ['Conflict', 'Çakışma', 'İstek kaynağın mevcut durumuyla çelişiyor; eşzamanlı düzenleme ya da yinelenen kayıt denemelerinde görülür.'],
      410: ['Gone', 'Kalıcı olarak kaldırıldı', 'Kaynak bilerek ve kalıcı olarak kaldırıldı, yeni adresi yok. 404\'ten farkı, kaldırmanın kesin olduğunu bildirmesidir.'],
      411: ['Length Required', 'Uzunluk gerekli', 'Sunucu, Content-Length başlığı olmayan isteği kabul etmiyor.'],
      412: ['Precondition Failed', 'Ön koşul sağlanmadı', 'İstek başlıklarındaki koşullardan biri (örneğin If-Match) sunucuda doğrulanamadı.'],
      413: ['Content Too Large', 'İçerik çok büyük', 'İstek gövdesi sunucunun kabul ettiği sınırı aşıyor. Dosya yükleme sınırı aşıldığında görülür.'],
      414: ['URI Too Long', 'Adres çok uzun', 'İstenen adres sunucunun işleyebileceğinden uzun; çoğunlukla aşırı uzun sorgu dizelerinden kaynaklanır.'],
      415: ['Unsupported Media Type', 'Desteklenmeyen ortam türü', 'İstek gövdesinin biçimi (Content-Type) sunucu tarafından desteklenmiyor.'],
      416: ['Range Not Satisfiable', 'Aralık karşılanamıyor', 'Range başlığında istenen bölüm kaynağın sınırları dışında.'],
      417: ['Expectation Failed', 'Beklenti karşılanamadı', 'Sunucu Expect başlığındaki beklentiyi karşılayamıyor.'],
      418: ['I\'m a teapot', 'Ben bir çaydanlığım', 'Bir 1 Nisan şakası olarak tanımlanmış koddur; gerçek bir anlamı yoktur, kimi sunucular şaka amaçlı döndürür.'],
      421: ['Misdirected Request', 'Yanlış yönlendirilmiş istek', 'İstek, yanıt üretemeyecek bir sunucuya ulaştı; bağlantının yeniden kullanıldığı durumlarda ortaya çıkar.'],
      422: ['Unprocessable Content', 'İşlenemeyen içerik', 'İstek sözdizimi doğru ama içerik anlamsal olarak hatalı; API\'lerde doğrulama hatalarını bildirmek için yaygındır.'],
      423: ['Locked', 'Kilitli', 'Erişilmek istenen kaynak kilitli. WebDAV kaynaklıdır.'],
      424: ['Failed Dependency', 'Bağımlılık başarısız', 'İstek, bağlı olduğu önceki bir istek başarısız olduğu için yerine getirilemedi.'],
      425: ['Too Early', 'Çok erken', 'Sunucu, yeniden oynatılma riski taşıyan bir isteği işlemek istemiyor.'],
      426: ['Upgrade Required', 'Yükseltme gerekli', 'Sunucu mevcut protokolle isteği işlemeyi reddediyor; istemci Upgrade başlığındaki protokole geçmelidir.'],
      428: ['Precondition Required', 'Ön koşul gerekli', 'Sunucu isteğin koşullu olmasını şart koşuyor; kayıp güncellemeleri önlemek için kullanılır.'],
      429: ['Too Many Requests', 'Çok fazla istek', 'İstemci belirli bir sürede izin verilenden fazla istek gönderdi. Retry-After başlığı ne kadar beklenmesi gerektiğini söyleyebilir.'],
      431: ['Request Header Fields Too Large', 'İstek başlıkları çok büyük', 'Başlıkların tümü ya da biri sunucunun sınırını aşıyor; aşırı büyümüş çerezler sık görülen nedendir.'],
      451: ['Unavailable For Legal Reasons', 'Yasal nedenlerle kullanılamıyor', 'Kaynağa erişim yasal bir talep nedeniyle engellenmiştir.'],
      500: ['Internal Server Error', 'Sunucu iç hatası', 'Sunucu beklenmeyen bir durumla karşılaştı. Uygulama kodundaki yakalanmamış hata ya da yanlış yapılandırma tipik nedenlerdir; ayrıntı sunucu günlüğündedir.'],
      501: ['Not Implemented', 'Uygulanmadı', 'Sunucu isteği yerine getirmek için gereken işlevi desteklemiyor.'],
      502: ['Bad Gateway', 'Hatalı ağ geçidi', 'Ağ geçidi ya da vekil olarak çalışan sunucu, arkasındaki sunucudan geçersiz yanıt aldı.'],
      503: ['Service Unavailable', 'Hizmet kullanılamıyor', 'Sunucu geçici olarak isteği karşılayamıyor: aşırı yük ya da bakım. Planlı bakımda Retry-After başlığıyla birlikte döndürülmesi önerilir.'],
      504: ['Gateway Timeout', 'Ağ geçidi zaman aşımı', 'Ağ geçidi ya da vekil, arkasındaki sunucudan zamanında yanıt alamadı.'],
      505: ['HTTP Version Not Supported', 'HTTP sürümü desteklenmiyor', 'Sunucu istekte kullanılan HTTP sürümünü desteklemiyor.'],
      506: ['Variant Also Negotiates', 'Değişke de uzlaşıyor', 'Sunucuda içerik uzlaşması döngüye girecek biçimde yanlış yapılandırılmış.'],
      507: ['Insufficient Storage', 'Yetersiz depolama', 'Sunucu isteği tamamlamak için gereken veriyi depolayamıyor. WebDAV kaynaklıdır.'],
      508: ['Loop Detected', 'Döngü algılandı', 'Sunucu isteği işlerken sonsuz döngü algıladı. WebDAV kaynaklıdır.'],
      510: ['Not Extended', 'Genişletilmedi', 'İsteğin yerine getirilmesi için ek uzantılar gerekiyor; kullanımı önerilmeyen eski bir koddur.'],
      511: ['Network Authentication Required', 'Ağ kimlik doğrulaması gerekli', 'İstemcinin ağa erişmek için önce kimlik doğrulaması gerekiyor; otel ve kafe ağlarındaki giriş sayfaları bu kodu kullanır.'],
    };
    const [sinif, sinifAciklama] = siniflar[Math.floor(kod / 100)];
    const k = K[kod];
    // Aynı isteği değiştirmeden yeniden denemek anlamlı mı?
    const yeniden = [408, 425, 429, 500, 502, 503, 504];
    let dene;
    if (yeniden.includes(kod)) dene = 'Evet, bir süre bekleyip yeniden denenebilir';
    else if (kod >= 400) dene = 'Hayır, istek ya da yapılandırma düzeltilmeden sonuç değişmez';
    else dene = 'Gerekmez, hata yanıtı değil';
    if (!k) {
      return {
        rows: [
          ['Durum', `${kod} (standartta tanımlı değil)`],
          ['Sınıf', sinif],
          ['Sınıfın anlamı', sinifAciklama],
          ['Yeniden denenir mi?', dene],
        ],
        note: 'Bu kod standart kayıtta yer almıyor. İstemciler tanımadıkları kodu sınıfının ilk kodu gibi ele alır; kodun özel anlamı için onu döndüren yazılımın belgelerine bakın.',
      };
    }
    return {
      rows: [
        ['Durum', `${kod} ${k[0]}`],
        ['Türkçe karşılığı', k[1]],
        ['Sınıf', sinif],
        ['Açıklama', k[2]],
        ['Yeniden denenir mi?', dene],
      ],
      note: sinifAciklama,
    };
  },
  cases: [
    { in: { kod: '404' }, out: { 'Durum': '404 Not Found', 'Türkçe karşılığı': 'Bulunamadı', 'Sınıf': '4xx – İstemci hatası', 'Yeniden denenir mi?': 'Hayır, istek ya da yapılandırma düzeltilmeden sonuç değişmez' } },
    { in: { kod: '301' }, out: { 'Durum': '301 Moved Permanently', 'Türkçe karşılığı': 'Kalıcı olarak taşındı', 'Sınıf': '3xx – Yönlendirme' } },
    { in: { kod: '200' }, out: { 'Durum': '200 OK', 'Türkçe karşılığı': 'Tamam', 'Sınıf': '2xx – Başarılı', 'Yeniden denenir mi?': 'Gerekmez, hata yanıtı değil' } },
    { in: { kod: '503' }, out: { 'Durum': '503 Service Unavailable', 'Sınıf': '5xx – Sunucu hatası', 'Yeniden denenir mi?': 'Evet, bir süre bekleyip yeniden denenebilir' } },
    { in: { kod: ' 100 ' }, out: { 'Durum': '100 Continue', 'Sınıf': '1xx – Bilgilendirme' } },
    { in: { kod: '429' }, out: { 'Durum': '429 Too Many Requests', 'Türkçe karşılığı': 'Çok fazla istek' } },
    { in: { kod: '499' }, out: { 'Durum': '499 (standartta tanımlı değil)', 'Sınıf': '4xx – İstemci hatası' } },
    { in: { kod: '600' }, error: true },
    { in: { kod: '40' }, error: true },
    { in: { kod: 'abc' }, error: true },
    { in: { kod: '' }, error: true },
  ],
  howto: [
    'Karşılaştığınız durum kodunu "Durum kodu" alanına yazın. Kod; tarayıcının hata sayfasında, geliştirici araçlarının Ağ sekmesinde ya da sunucu erişim günlüğünde üç haneli bir sayı olarak görünür.',
    '"Sorgula" düğmesine basın. Kodun resmî İngilizce adı, Türkçe karşılığı ve ait olduğu sınıf listelenir.',
    '"Açıklama" satırını okuyun; sunucunun bu kodu hangi koşulda döndürdüğü ve tipik nedenleri burada yazar.',
    '"Yeniden denenir mi?" satırı, aynı isteği değiştirmeden tekrarlamanın işe yarayıp yaramayacağını söyler; hata ayıklamaya nereden başlayacağınıza karar vermenizi kolaylaştırır.',
  ],
  sections: [
    { h: 'HTTP durum kodu nedir?', p: [
      'Tarayıcınız ya da bir uygulama bir web adresine istek gönderdiğinde, sunucu yanıtın ilk satırında üç haneli bir sayı döndürür. Bu sayı isteğin akıbetini özetler: başarılı mı oldu, başka bir adrese mi gidilmeli, istek mi hatalıydı, yoksa sunucu mu sorun yaşadı. Sayfa sorunsuz açıldığında bu kodu görmezsiniz; ama arka planda her resim, betik ve stil dosyası için ayrı bir durum kodu alınır.',
      'Kodun ilk hanesi sınıfı belirler ve tek başına çok şey anlatır. Tanımadığınız bir kodla karşılaşsanız bile ilk haneye bakarak sorunun hangi tarafta olduğunu kestirebilirsiniz. İstemciler de aynı kuralı uygular: tanımadıkları bir kodu, o sınıfın genel kodu gibi ele alırlar.',
    ] },
    { h: 'Beş sınıf', ul: [
      '<strong>1xx – Bilgilendirme:</strong> istek alındı, süreç devam ediyor. Gündelik kullanımda nadiren fark edilir.',
      '<strong>2xx – Başarılı:</strong> istek kabul edildi ve işlendi. 200, 201 ve 204 en sık karşılaşılanlardır.',
      '<strong>3xx – Yönlendirme:</strong> kaynak başka bir adreste ya da önbellekteki kopya geçerli. 301, 302 ve 304 bu gruptadır.',
      '<strong>4xx – İstemci hatası:</strong> istek hatalı, yetkisiz ya da var olmayan bir kaynağa yönelik. 400, 401, 403, 404 ve 429 öne çıkar.',
      '<strong>5xx – Sunucu hatası:</strong> istek geçerli ama sunucu yerine getiremedi. 500, 502, 503 ve 504 site sahiplerinin en çok uğraştığı kodlardır.',
    ] },
    { h: 'Çözümlü örnek: 404 ve 503', p: [
      'Alana <strong>404</strong> yazıp sorguladığınızda araç durumu "404 Not Found", Türkçe karşılığını "Bulunamadı", sınıfı "4xx – İstemci hatası" olarak verir ve yeniden deneme satırında "Hayır" yazar. Bu şu demektir: aynı adresi yüz kez daha isteseniz de sonuç değişmez; ya bağlantı yanlış yazılmıştır ya da sayfa kaldırılmıştır. Çözüm bağlantıyı düzeltmek ya da taşınan sayfa için yönlendirme tanımlamaktır.',
      '<strong>503</strong> yazdığınızda ise sonuç "503 Service Unavailable", sınıf "5xx – Sunucu hatası", yeniden deneme satırı "Evet" olur. Bu kod geçici bir durumu anlatır: sunucu o an aşırı yüklüdür ya da bakımdadır. Ziyaretçi açısından yapılacak şey beklemek, site sahibi açısından ise sunucu kaynaklarını ve günlükleri incelemektir.',
    ] },
    { h: 'Yönlendirme kodları ve arama motorları', p: [
      'Bir sayfanın adresi değiştiğinde hangi yönlendirme kodunun kullanıldığı önem taşır. <strong>301</strong> ve <strong>308</strong> taşınmanın kalıcı olduğunu bildirir; arama motorları zamanla dizindeki eski adresi yenisiyle değiştirir. <strong>302</strong> ve <strong>307</strong> ise geçicidir; eski adres dizinde kalmaya devam eder. Alan adı değişikliği, HTTP\'den HTTPS\'ye geçiş ya da adres yapısının yeniden düzenlenmesi gibi kalıcı işlerde geçici kod kullanmak sık yapılan bir hatadır.',
      '301 ile 308, 302 ile 307 arasındaki fark istek yöntemindedir. Eski kodlarda tarayıcılar POST isteğini yönlendirme sonrası GET\'e çevirebilir; 307 ve 308 ise yöntemin ve gövdenin aynen korunmasını zorunlu kılar. Form gönderimi ya da API çağrısı yönlendirilecekse bu ayrım belirleyicidir.',
    ] },
    { h: 'Sık karıştırılan kodlar', p: [
      '<strong>401 ile 403:</strong> 401 "kim olduğunu bilmiyorum, kimliğini doğrula" anlamına gelir; doğru kimlik bilgisiyle yinelenen istek başarılı olabilir. 403 ise "kim olduğunu biliyor olsam da bu kaynağa iznin yok" demektir.',
      '<strong>404 ile 410:</strong> her ikisi de kaynağın bulunmadığını söyler; 410 buna ek olarak kaldırmanın kalıcı ve bilinçli olduğunu belirtir. Kalıcı olarak silinen içerik için 410 daha açık bir işarettir.',
      '<strong>502 ile 504:</strong> ikisi de bir vekil ya da yük dengeleyicinin arkasındaki sunucuyla yaşadığı sorunu anlatır. 502\'de arka sunucu geçersiz bir yanıt vermiştir; 504\'te ise hiç zamanında yanıt vermemiştir.',
      'Bir başka yaygın hata, bulunamayan sayfa için 200 koduyla "sayfa bulunamadı" içeriği göstermektir. Ziyaretçi hata metnini görür ama arama motoru sayfayı geçerli sayar; bu durum gereksiz sayfaların dizine girmesine yol açar.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca standart kayıtta bulunan kodların açıklamasını verir. Bazı sunucu yazılımları, içerik dağıtım ağları ve güvenlik duvarları kendi özel kodlarını döndürür; 100–599 aralığındaki böyle bir kodu yazdığınızda araç sınıfını gösterir ve standartta tanımlı olmadığını belirtir. Özel kodun anlamı için onu üreten yazılımın belgelerine başvurmak gerekir. Açıklamalar genel davranışı özetler; bir kodun belirli bir uygulamada tam olarak neden döndüğünü ancak o sunucunun günlükleri gösterir.',
    ] },
  ],
  faq: [
    ['404 hatası ne anlama gelir?', '404 Not Found, sunucuya ulaşıldığını ama istenen adreste bir kaynak bulunmadığını gösterir. Bağlantı yanlış yazılmış, sayfa silinmiş ya da adresi değişmiş olabilir. Site sahibi taşınan sayfalar için kalıcı yönlendirme tanımlayarak bu hatayı önleyebilir.'],
    ['301 ile 302 arasındaki fark nedir?', '301 kalıcı, 302 geçici yönlendirmedir. Kalıcı yönlendirmede arama motorları eski adres yerine yeni adresi dizine alır; geçici yönlendirmede eski adres geçerliliğini korur. Adres kalıcı olarak değiştiyse 301 kullanılmalıdır.'],
    ['500 hatasını nasıl çözerim?', '500 genel bir sunucu hatasıdır ve nedenini tek başına söylemez. Sunucunun hata günlüğüne bakmak gerekir; çoğu zaman uygulama kodundaki bir hata, eksik bir dosya izni ya da bozuk bir yapılandırma satırı sorumludur. Ziyaretçi tarafında yapılabilecek bir şey yoktur.'],
    ['503 hatası kalıcı mıdır?', 'Hayır, 503 geçici bir durumu bildirir: sunucu aşırı yüklüdür ya da bakımdadır. Kısa süreli bakımlarda bu kodu döndürmek, arama motorlarına sayfanın kaldırılmadığını, daha sonra yeniden gelinmesi gerektiğini anlatır.'],
    ['Durum kodunu tarayıcıda nasıl görürüm?', 'Tarayıcının geliştirici araçlarını açıp Ağ sekmesine geçin ve sayfayı yenileyin. Listelenen her isteğin karşısında durum kodu yazar. Komut satırında ise yalnızca başlıkları isteyen bir HTTP istemcisiyle yanıtın ilk satırını görebilirsiniz.'],
    ['429 kodu aldığımda ne yapmalıyım?', '429, kısa sürede çok fazla istek gönderdiğiniz anlamına gelir. Yanıtta Retry-After başlığı varsa orada belirtilen süre kadar bekleyin; yoksa istek sıklığını azaltıp aralıkları giderek uzatarak yeniden deneyin.'],
    ['Listede olmayan bir kod görürsem?', 'Bazı yazılımlar standart dışı kodlar kullanır. Araç bu kodlar için sınıfı gösterir; ilk hane yine sorunun istemcide mi sunucuda mı olduğunu anlatır. Kesin anlam için kodu döndüren sunucu, vekil ya da güvenlik hizmetinin belgelerine bakın.'],
    ['Sorguladığım kodlar kaydediliyor mu?', 'Hayır. Kod tablosu sayfanın içindedir ve sorgu tarayıcınızda yapılır. Yazdığınız değer hiçbir sunucuya gönderilmez; sayfa çevrimdışıyken de çalışır.'],
  ],
  related: ['htaccess-yonlendirme-olustur', 'url-ayristir', 'user-agent-coz', 'mime-turu-bul', 'robots-txt-olustur', 'canonical-olustur'],
};
