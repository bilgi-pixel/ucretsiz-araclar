export default {
  slug: 'mac-adresi-bicimlendir',
  title: 'MAC Adresi Biçimlendirme',
  h1Tail: 'iki nokta, tire, noktalı yazım',
  pageTitle: 'MAC Adresi Biçimlendirme – İki Nokta, Tire ve Noktalı Yazım',
  description: 'MAC adresini iki nokta, tire, noktalı üçlü grup ve ayraçsız biçimlere çevirin; büyük-küçük harfi seçin, üretici önekini ve adres türünü görün.',
  card: 'MAC adresini iki nokta, tire, noktalı ya da ayraçsız yazıma dönüştürün; türünü ve üretici önekini görün.',
  category: 'gelistirici',
  keywords: ['mac adresi biçimlendirme', 'mac adresi formatı', 'mac adresi çevirme', 'mac adresi tire iki nokta', 'mac adresi düzeltme', 'mac address format', 'mac adresi büyük harf'],
  lead: 'Elinizdeki MAC adresini hangi biçimde yazılmış olursa olsun yapıştırın; araç adresi doğrular ve <strong>iki nokta</strong>, <strong>tire</strong>, <strong>noktalı üçlü grup</strong> ve <strong>ayraçsız</strong> yazımlarını birlikte verir. Ayrıca üretici önekini ve adresin tekil, çoklu yayın ya da yerel yönetimli olup olmadığını gösterir.',
  button: 'Biçimlendir',
  inputs: [
    { id: 'mac', label: 'MAC adresi', type: 'text', placeholder: 'Örn. 00-1a-2b-3c-4d-5e', hint: '12 onaltılık basamak; ayraç olarak iki nokta, tire, nokta ya da boşluk kullanılabilir.', wide: true },
    { id: 'harf', label: 'Harf biçimi', type: 'select', options: [['buyuk', 'Büyük harf (A–F)'], ['kucuk', 'Küçük harf (a–f)']] },
  ],
  compute(v, h) {
    const t = String(v.mac ?? '').trim();
    if (t === '') h.err('"MAC adresi" alanını doldurun.');
    if (/[^0-9a-fA-F:\-.\s]/.test(t)) h.err('MAC adresinde yalnızca 0–9 ve A–F karakterleri ile iki nokta, tire, nokta ya da boşluk bulunabilir.');
    let hex;
    const gr = t.split(/[:\-\s]+/).filter(Boolean);
    if (gr.length === 6 && gr.every((g) => /^[0-9a-fA-F]{1,2}$/.test(g))) hex = gr.map((g) => g.padStart(2, '0')).join('');
    else hex = t.replace(/[:\-.\s]/g, '');
    if (hex.length !== 12) h.err('MAC adresi 12 onaltılık basamaktan (6 bayt) oluşmalı; yazdığınız değerde ' + hex.length + ' basamak var.');
    hex = v.harf === 'kucuk' ? hex.toLowerCase() : hex.toUpperCase();
    const bayt = hex.match(/.{2}/g);
    const ilk = parseInt(bayt[0], 16);
    const yayin = hex.toLowerCase() === 'ffffffffffff';
    const tur = yayin ? 'Genel yayın (broadcast)' : (ilk & 1) ? 'Çoklu yayın (multicast)' : 'Tekil (unicast)';
    const yonetim = yayin ? 'Uygulanmaz (genel yayın adresi)' : (ilk & 2) ? 'Yerel yönetimli' : 'Evrensel (üretici atamalı)';
    return {
      rows: [
        ['İki nokta ile', bayt.join(':')],
        ['Tire ile', bayt.join('-')],
        ['Noktalı üçlü grup', hex.match(/.{4}/g).join('.')],
        ['Ayraçsız', hex],
        ['Üretici öneki (OUI)', bayt.slice(0, 3).join(':')],
        ['Adres türü', tur],
        ['Yönetim türü', yonetim],
        ['İlk baytın ikili yazımı', ilk.toString(2).padStart(8, '0')],
      ],
      note: 'Adres türü ilk baytın en sağdaki bitinden, yönetim türü sağdan ikinci bitinden okunur. Üretici adı sorgulanmaz; araç çevrimdışı çalışır.',
    };
  },
  cases: [
    { in: { mac: '00:1a:2b:3c:4d:5e', harf: 'buyuk' }, out: { 'İki nokta ile': '00:1A:2B:3C:4D:5E', 'Tire ile': '00-1A-2B-3C-4D-5E', 'Noktalı üçlü grup': '001A.2B3C.4D5E', 'Ayraçsız': '001A2B3C4D5E', 'Adres türü': 'Tekil (unicast)', 'Yönetim türü': 'Evrensel (üretici atamalı)' } },
    { in: { mac: '001A.2B3C.4D5E', harf: 'kucuk' }, out: { 'İki nokta ile': '00:1a:2b:3c:4d:5e', 'Üretici öneki (OUI)': '00:1a:2b' } },
    { in: { mac: 'FF-FF-FF-FF-FF-FF', harf: 'buyuk' }, out: { 'Adres türü': 'Genel yayın (broadcast)', 'Ayraçsız': 'FFFFFFFFFFFF' } },
    { in: { mac: '01:00:5E:00:00:FB', harf: 'buyuk' }, out: { 'Adres türü': 'Çoklu yayın (multicast)', 'Yönetim türü': 'Evrensel (üretici atamalı)', 'İlk baytın ikili yazımı': '00000001' } },
    { in: { mac: '02:42:ac:11:00:02', harf: 'buyuk' }, out: { 'İki nokta ile': '02:42:AC:11:00:02', 'Adres türü': 'Tekil (unicast)', 'Yönetim türü': 'Yerel yönetimli' } },
    { in: { mac: '0:1a:2b:3c:4d:5e', harf: 'buyuk' }, out: { 'İki nokta ile': '00:1A:2B:3C:4D:5E' } },
    { in: { mac: 'a4b1c2d3e4f5', harf: 'buyuk' }, out: { 'İki nokta ile': 'A4:B1:C2:D3:E4:F5', 'Noktalı üçlü grup': 'A4B1.C2D3.E4F5', 'İlk baytın ikili yazımı': '10100100' } },
    { in: { mac: '00:1A:2B:3C:4D', harf: 'buyuk' }, error: true },
    { in: { mac: '00:1G:2B:3C:4D:5E', harf: 'buyuk' }, error: true },
    { in: { mac: '', harf: 'buyuk' }, error: true },
  ],
  howto: [
    'MAC adresini "MAC adresi" alanına yazın ya da yapıştırın. Ayraçların türü ve harflerin büyük-küçük olması önemli değildir.',
    '"Harf biçimi" listesinden çıktıda büyük harf mi küçük harf mi istediğinizi seçin.',
    '"Biçimlendir" düğmesine basın. Dört farklı yazım alt alta listelenir; hedef sisteminizin istediği satırı alın.',
    'Alt satırlardan adresin üretici önekini, tekil ya da çoklu yayın olduğunu ve yerel yönetimli olup olmadığını okuyun.',
  ],
  sections: [
    { h: 'MAC adresi nedir?', p: [
      'MAC (Media Access Control) adresi, bir ağ arabiriminin yerel ağdaki donanım kimliğidir. Ethernet kartları, kablosuz ağ kartları, Bluetooth alıcıları, yazıcılar, IP kameralar ve akıllı ev cihazlarının her biri en az bir MAC adresi taşır. Adres 48 bit, yani 6 bayt uzunluğundadır ve 12 onaltılık basamakla yazılır. IP adresi cihazın ağdaki mantıksal konumunu gösterirken MAC adresi aynı kablo ya da aynı kablosuz ağ üzerindeki cihazları birbirinden ayırır.',
      'Adresin ilk üç baytı <strong>OUI</strong> (Organizationally Unique Identifier) olarak adlandırılır ve arabirimi üreten firmaya ayrılmış öneki gösterir. Son üç bayt üreticinin o önek altında verdiği sıra numarasıdır. Araç OUI kısmını ayrı bir satırda gösterir; ancak üretici adını bulmak için bir kayıt veritabanına bağlanmaz, çünkü hiçbir verinin cihazınızdan çıkmaması esastır.',
    ] },
    { h: 'Neden bu kadar farklı yazım var?', p: [
      'Altı baytın nasıl ayrılacağı konusunda işletim sistemleri ve ağ cihazı üreticileri farklı alışkanlıklar geliştirmiştir. Aynı adres dört biçimde de aynı anlama gelir, yalnızca görünüş değişir:',
    ], ul: [
      '<strong>İki nokta ile</strong> (<code>00:1A:2B:3C:4D:5E</code>): Linux, macOS, Android ve çoğu modem arayüzünde görülen yazım.',
      '<strong>Tire ile</strong> (<code>00-1A-2B-3C-4D-5E</code>): Windows komut satırı çıktılarında ve Windows ağ ayarlarında kullanılan yazım.',
      '<strong>Noktalı üçlü grup</strong> (<code>001A.2B3C.4D5E</code>): bazı kurumsal anahtar ve yönlendirici işletim sistemlerinin kullandığı, dörder basamaklı üç gruptan oluşan yazım.',
      '<strong>Ayraçsız</strong> (<code>001A2B3C4D5E</code>): veritabanı alanlarında, barkod etiketlerinde ve bazı kablosuz denetleyici arayüzlerinde tercih edilen yazım.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir bilgisayarın komut satırından <code>00-1a-2b-3c-4d-5e</code> adresini aldığınızı ve bunu modemin MAC filtresi ekranına iki nokta ile, büyük harfle yazmanız gerektiğini düşünelim. Adresi yapıştırıp büyük harfi seçtiğinizde ilk satırda <code>00:1A:2B:3C:4D:5E</code> görünür. Aynı adresin kurumsal bir anahtara girilecek noktalı yazımı <code>001A.2B3C.4D5E</code>, ayraçsız yazımı <code>001A2B3C4D5E</code> olur.',
      'İlk bayt 00\'dır; ikili yazımı 00000000 olduğu için en sağdaki bit 0\'dır ve adres tekildir, sağdan ikinci bit de 0 olduğundan adres üretici tarafından atanmış evrensel bir adrestir. Buna karşılık <code>02:42:AC:11:00:02</code> adresinde ilk bayt 02, yani 00000010\'dur: sağdan ikinci bit 1 olduğu için araç bu adresi "yerel yönetimli" olarak işaretler.',
    ] },
    { h: 'Adres türü ve yönetim biti', p: [
      'İlk baytın en düşük değerli biti adresin kime gittiğini belirler. Bu bit 0 ise adres <strong>tekildir</strong> (unicast) ve tek bir arabirimi gösterir. 1 ise adres <strong>çoklu yayın</strong> (multicast) adresidir; çerçeve bir grup cihaza birden iletilir. Altı baytın tamamı FF olduğunda ise <strong>genel yayın</strong> (broadcast) adresi söz konusudur ve yerel ağdaki her cihaz çerçeveyi alır. Bir cihazın kendi arabirim adresi her zaman tekil olmalıdır; MAC filtresine çoklu yayın adresi yazmak anlamlı değildir.',
      'Sağdan ikinci bit, adresin kim tarafından verildiğini gösterir. 0 ise adres üreticinin kayıtlı önekinden gelen evrensel adrestir. 1 ise adres <strong>yerel yönetimlidir</strong>: bir yazılım, sanal makine, konteyner ya da işletim sistemi tarafından üretilmiştir. Günümüz telefonları ve dizüstü bilgisayarları kablosuz ağlara bağlanırken gizlilik amacıyla rastgele, yerel yönetimli adresler kullanabilir. Modeminizdeki MAC filtresi bir cihazı tanımıyorsa nedenlerinden biri bu olabilir; cihazın o ağ için gösterdiği adresi kontrol edin.',
    ] },
    { h: 'Nerelerde gerekir?', p: [
      'Modemde MAC filtresi ya da sabit IP ataması (DHCP rezervasyonu) tanımlarken, kurumsal ağda bir cihazı port güvenliğine eklerken, ağ üzerinden uyandırma (Wake-on-LAN) paketini hazırlarken, envanter tablosuna cihaz kaydederken ve farklı sistemlerden gelen kayıtları eşleştirirken adresin belirli bir biçimde yazılması istenir. Bir sistemin tireyle verdiği adresi diğerine iki noktayla girmek zorunda kalmak gündelik bir iştir. Envanter tablolarında tek bir yazımı (örneğin büyük harf ve iki nokta) standart hâline getirmek, aynı cihazın iki kez kaydedilmesini önler.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Harf O ile sıfırı, küçük L ile biri karıştırmak etiket üzerinden okuma yaparken en sık görülen hatadır; onaltılık yazımda yalnızca 0–9 ve A–F bulunur, O, I, L, G gibi harfler yer almaz. Araç bu tür karakterleri gördüğünde uyarı verir. Bazı sistemler baytların başındaki sıfırı atar (0:1a:2b…); altı grup hâlinde yazıldıysa araç eksik sıfırları tamamlar.',
      'Bu araç 48 bitlik (EUI-48) adresler içindir; 64 bitlik EUI-64 tanımlayıcılarını biçimlendirmez. Adresin gerçekten var olan bir cihaza ait olup olmadığını denetlemez. Araç yalnızca yazımı dönüştürür; MAC adresi değiştirme ya da başka bir cihazın adresini taklit etme işlevi yoktur.',
    ] },
  ],
  faq: [
    ['MAC adresi kaç karakterdir?', 'Ayraçlar sayılmazsa 12 onaltılık basamaktır; bu 6 bayt, yani 48 bit eder. İki nokta ya da tireyle yazıldığında beş ayraçla birlikte 17 karakter olur.'],
    ['Büyük harf ile küçük harf arasında fark var mı?', 'Anlam olarak yoktur; 1a ile 1A aynı bayttır. Yine de bazı arayüzler yalnızca bir biçimi kabul eder ve metin karşılaştırması yapan tablolar ikisini farklı sayabilir. Bu yüzden tek bir biçimde tutarlı kalmak iyi olur.'],
    ['Windows neden tire, diğer sistemler iki nokta kullanıyor?', 'Yalnızca gösterim alışkanlığıdır. Windows araçları baytları tireyle, Linux ve macOS araçları iki noktayla ayırır. Adresin kendisi aynıdır; araç ikisini de üretir.'],
    ['OUI ne anlama gelir?', 'Adresin ilk üç baytıdır ve arabirim üreticisine ayrılmış öneki gösterir. Aynı üreticinin cihazlarında bu kısım çoğu zaman ortaktır. Araç öneki gösterir ama üretici adını sorgulamaz.'],
    ['"Yerel yönetimli" adres ne demek?', 'İlk baytın sağdan ikinci biti 1 olan adreslerdir. Üretici tarafından değil, yazılım tarafından atanmıştır: sanal makineler, konteynerler ve kablosuz ağlarda gizlilik için rastgele adres kullanan telefonlar bu türden adres taşır.'],
    ['Telefonumun MAC adresi neden ağdan ağa değişiyor?', 'Birçok güncel telefon ve bilgisayar, her kablosuz ağ için ayrı bir rastgele adres kullanma seçeneği sunar. Bu adresler yerel yönetimlidir. Sabit IP ya da MAC filtresi için cihazın o ağda gösterdiği adresi kullanmanız gerekir.'],
    ['Noktalı üçlü yazım hangi cihazlarda kullanılır?', 'Dörder basamaklı üç gruptan oluşan bu yazım, bazı kurumsal anahtar ve yönlendiricilerin komut satırında görülür. MAC tablosu çıktıları ve port güvenliği ayarları bu biçimde gösterilir.'],
    ['Girdiğim MAC adresi kaydediliyor mu?', 'Hayır. Biçimlendirme tarayıcınızda yapılır; adres sunucuya gönderilmez, saklanmaz ve herhangi bir üretici veritabanında sorgulanmaz.'],
  ],
  related: ['ip-ikili-cevir', 'cidr-hesapla', 'ip-alt-ag-hesapla', 'onaltilik-ondalik-cevir', 'hex-metin-cevir'],
};
