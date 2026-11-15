export default {
  slug: 'vcard-olustur',
  title: 'vCard Kartvizit Metni Oluşturma',
  h1Tail: 'rehbere eklenebilir .vcf içeriği',
  pageTitle: 'vCard Oluşturma – Dijital Kartvizit (.vcf) Metni Hazırlama',
  description: 'Ad, firma, unvan, telefon, e-posta ve adres bilgilerinden vCard 3.0 ya da 4.0 biçiminde dijital kartvizit (.vcf) metni oluşturun; rehbere tek dokunuşla eklensin.',
  card: 'İletişim bilgilerinizden telefon rehberine eklenebilen vCard (.vcf) dijital kartvizit metnini oluşturun.',
  category: 'gelistirici',
  keywords: ['vcard oluşturma', 'vcf dosyası oluşturma', 'dijital kartvizit oluşturma', 'vcard nedir', 'rehbere ekle dosyası', 'vcard 3.0', 'kartvizit qr kod metni'],
  lead: 'Adınızı, firmanızı, telefon ve e-posta bilgilerinizi yazın; telefonların ve e-posta programlarının rehberine doğrudan eklenebilen <strong>vCard (.vcf)</strong> metnini alın. Metni dosya olarak paylaşabilir ya da QR koda dönüştürüp kartvizitinize basabilirsiniz.',
  button: 'Oluştur',
  inputs: [
    { id: 'ad', label: 'Ad', type: 'text', placeholder: 'Örn. Ayşe' },
    { id: 'soyad', label: 'Soyad', type: 'text', placeholder: 'Örn. Yılmaz' },
    { id: 'firma', label: 'Firma / kurum', type: 'text', placeholder: 'İsteğe bağlı' },
    { id: 'unvan', label: 'Unvan / görev', type: 'text', placeholder: 'İsteğe bağlı' },
    { id: 'cep', label: 'Cep telefonu', type: 'text', placeholder: 'Örn. +90 532 123 45 67' },
    { id: 'isTel', label: 'İş telefonu', type: 'text', placeholder: 'İsteğe bağlı' },
    { id: 'eposta', label: 'E-posta', type: 'text', placeholder: 'Örn. ayse@ornek.com' },
    { id: 'web', label: 'Web sitesi', type: 'text', placeholder: 'Örn. ornek.com' },
    { id: 'adres', label: 'Adres', type: 'text', placeholder: 'İsteğe bağlı; tek satır', wide: true },
    { id: 'surum', label: 'vCard sürümü', type: 'select', options: [['3', '3.0 (en yaygın uyumluluk)'], ['4', '4.0']] },
  ],
  compute(v, h) {
    const al = (k) => String(v[k] ?? '').trim().replace(/\s+/g, ' ');
    const kacis = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');
    const ad = al('ad'), soyad = al('soyad'), firma = al('firma');
    if (!ad && !soyad && !firma) h.err('En az ad, soyad ya da firma alanlarından birini doldurun.');
    const tel = (k, etiket) => {
      const t = al(k);
      if (!t) return '';
      if (!/^\+?[\d\s().\-/]+$/.test(t) || t.replace(/\D/g, '').length < 3) h.err(`"${etiket}" alanına geçerli bir telefon numarası yazın (örn. +90 532 123 45 67).`);
      return (t.startsWith('+') ? '+' : '') + t.replace(/\D/g, '');
    };
    const cep = tel('cep', 'Cep telefonu'), isTel = tel('isTel', 'İş telefonu');
    const eposta = al('eposta');
    if (eposta && !/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(eposta)) h.err('"E-posta" alanına geçerli bir adres yazın (örn. ad@ornek.com).');
    let web = al('web');
    if (web) {
      if (/\s/.test(web) || !/\./.test(web)) h.err('"Web sitesi" alanına geçerli bir adres yazın (örn. ornek.com).');
      if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(web)) web = 'https://' + web;
      if (!/^https?:\/\//i.test(web)) h.err('Web sitesi adresi http ya da https ile başlamalı.');
    }
    const unvan = al('unvan'), adres = al('adres');
    const tamAd = [ad, soyad].filter(Boolean).join(' ') || firma;
    const s4 = v.surum === '4';
    const L = ['BEGIN:VCARD', `VERSION:${s4 ? '4.0' : '3.0'}`, `N:${kacis(soyad)};${kacis(ad)};;;`, `FN:${kacis(tamAd)}`];
    if (firma) L.push(`ORG:${kacis(firma)}`);
    if (unvan) L.push(`TITLE:${kacis(unvan)}`);
    if (cep) L.push(`TEL;TYPE=${s4 ? 'cell' : 'CELL'}:${cep}`);
    if (isTel) L.push(`TEL;TYPE=${s4 ? 'work' : 'WORK'}:${isTel}`);
    if (eposta) L.push(`EMAIL${s4 ? '' : ';TYPE=INTERNET'}:${eposta}`);
    if (web) L.push(`URL:${web}`);
    if (adres) L.push(`ADR;TYPE=${s4 ? 'work' : 'WORK'}:;;${kacis(adres)};;;;`);
    L.push('END:VCARD');
    const text = L.join('\n');
    const bayt = new TextEncoder().encode(text).length;
    return {
      rows: [
        ['Kart sahibi', tamAd],
        ['Alan sayısı', `${L.length - 3} satır`],
        ['Metin boyutu', `${bayt} bayt`],
      ],
      text,
      note: 'Metni "kartvizit.vcf" adıyla UTF-8 olarak kaydedin ya da QR koda dönüştürün. Boş bırakılan alanlar karta yazılmaz.',
    };
  },
  cases: [
    { in: { ad: 'Ayşe', soyad: 'Yılmaz', cep: '+90 532 123 45 67', eposta: 'ayse@ornek.com' }, out: { 'Kart sahibi': 'Ayşe Yılmaz', 'Alan sayısı': '4 satır' }, text: 'BEGIN:VCARD\nVERSION:3.0\nN:Yılmaz;Ayşe;;;\nFN:Ayşe Yılmaz\nTEL;TYPE=CELL:+905321234567\nEMAIL;TYPE=INTERNET:ayse@ornek.com\nEND:VCARD' },
    { in: { ad: 'Mehmet', soyad: 'Kaya', firma: 'Örnek Yazılım Ltd. Şti.', unvan: 'Satış Müdürü', isTel: '(0412) 123 45 67', web: 'ornek.com', adres: 'Örnek Mah. 1. Sok. No: 5, Yenişehir, Diyarbakır' }, text: 'BEGIN:VCARD\nVERSION:3.0\nN:Kaya;Mehmet;;;\nFN:Mehmet Kaya\nORG:Örnek Yazılım Ltd. Şti.\nTITLE:Satış Müdürü\nTEL;TYPE=WORK:04121234567\nURL:https://ornek.com\nADR;TYPE=WORK:;;Örnek Mah. 1. Sok. No: 5\\, Yenişehir\\, Diyarbakır;;;;\nEND:VCARD' },
    { in: { ad: 'Ayşe', soyad: 'Yılmaz', cep: '+90 532 123 45 67', eposta: 'ayse@ornek.com', surum: '4' }, text: 'BEGIN:VCARD\nVERSION:4.0\nN:Yılmaz;Ayşe;;;\nFN:Ayşe Yılmaz\nTEL;TYPE=cell:+905321234567\nEMAIL:ayse@ornek.com\nEND:VCARD' },
    { in: { firma: 'Örnek Ticaret', isTel: '444 1 234' }, out: { 'Kart sahibi': 'Örnek Ticaret' }, text: 'BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:Örnek Ticaret\nORG:Örnek Ticaret\nTEL;TYPE=WORK:4441234\nEND:VCARD' },
    { in: { ad: 'Ali', soyad: 'Demir; Jr.' }, text: 'BEGIN:VCARD\nVERSION:3.0\nN:Demir\\; Jr.;Ali;;;\nFN:Ali Demir\\; Jr.\nEND:VCARD' },
    { in: { ad: 'Can' }, out: { 'Kart sahibi': 'Can', 'Alan sayısı': '2 satır', 'Metin boyutu': '50 bayt' } },
    { in: { ad: 'Ayşe', eposta: 'ayse-ornek.com' }, error: true },
    { in: { cep: '0532 123 45 67' }, error: true },
    { in: { ad: 'Ayşe', cep: 'telefon yok' }, error: true },
  ],
  howto: [
    'Ad ve soyadınızı yazın. Kişi yerine bir işletme kartı hazırlıyorsanız yalnızca "Firma / kurum" alanını doldurmanız yeterlidir.',
    'Telefon numaralarını tercihen +90 ile başlayan uluslararası biçimde, e-posta ve web adresinizi de ilgili alanlara girin. İstemediğiniz alanları boş bırakın.',
    'Sürümü seçin. Hangi cihazda açılacağını bilmiyorsanız 3.0 sürümünde kalın.',
    '"Oluştur" düğmesine basın ve çıkan metni kopyalayın.',
    'Metni düz metin düzenleyicide <code>.vcf</code> uzantısıyla kaydedin ya da bir QR kod üretecine yapıştırarak kartvizit QR kodu hazırlayın.',
  ],
  sections: [
    { h: 'vCard nedir?', p: [
      'vCard, kişi ve kurum iletişim bilgilerini taşımak için kullanılan standart bir metin biçimidir; dosya uzantısı <code>.vcf</code> olur. Telefonların rehber uygulamaları, e-posta programları ve müşteri yönetim yazılımlarının büyük bölümü bu biçimi okuyabilir. Karşı tarafa bir vCard gönderdiğinizde adınızı, numaranızı ve e-postanızı tek tek yazmak zorunda kalmaz; dosyayı açar ve "kişilere ekle" der.',
      'Biçimin yapısı basittir. Kart <code>BEGIN:VCARD</code> satırıyla başlar, <code>END:VCARD</code> ile biter. Aradaki her satır bir bilgidir: <code>FN</code> görünen tam ad, <code>N</code> soyad ve adın ayrı ayrı yazıldığı yapılandırılmış ad, <code>ORG</code> kurum, <code>TITLE</code> unvan, <code>TEL</code> telefon, <code>EMAIL</code> e-posta, <code>URL</code> web sitesi ve <code>ADR</code> adrestir.',
    ] },
    { h: 'Örnek kart ve satırların anlamı', p: [
      'Ad "Ayşe", soyad "Yılmaz", cep telefonu "+90 532 123 45 67" ve e-posta "ayse@ornek.com" girildiğinde araç yedi satırlık bir kart üretir. <code>N:Yılmaz;Ayşe;;;</code> satırında önce soyad, sonra ad gelir; noktalı virgüller ikinci ad, ön ek ve son ek gibi kullanılmayan bölümlerin yerini tutar. <code>FN:Ayşe Yılmaz</code> rehberde görünecek addır. Telefon satırı <code>TEL;TYPE=CELL:+905321234567</code> biçimindedir: numara boşluklardan arındırılmış, türü cep olarak işaretlenmiştir.',
      'Yalnızca firma adı girerseniz kişi adı bölümleri boş kalır (<code>N:;;;;</code>) ve görünen ad olarak firma adı kullanılır. Böylece rehberde kayıt işletme adıyla listelenir.',
    ] },
    { h: '3.0 mı, 4.0 mı?', p: [
      'vCard 3.0 uzun süredir kullanılan ve neredeyse her rehber uygulamasının sorunsuz okuduğu sürümdür. 4.0 daha yeni bir standarttır; tür etiketleri küçük harfle yazılır, e-posta satırında "INTERNET" türü kullanılmaz ve metnin UTF-8 olması zorunludur. İki sürüm arasındaki fark bu aracın ürettiği temel alanlar için küçüktür. Kartı kimin, hangi cihazda açacağını bilmediğiniz durumlarda 3.0 daha güvenli tercihtir; 4.0\'ı yalnızca hedef sistemin bu sürümü istediğinden eminseniz seçin.',
    ] },
    { h: 'QR kodlu kartvizit hazırlama', p: [
      'Basılı kartvizitlerin üzerindeki QR kodların çoğu aslında bir vCard metni taşır. Bu sayfada ürettiğiniz metni bir QR kod üretecine yapıştırdığınızda, kodu telefon kamerasıyla okutan kişi doğrudan "kişilere ekle" ekranını görür. Burada dikkat edilmesi gereken nokta metnin boyutudur: QR kod ne kadar çok veri taşırsa kareleri o kadar küçülür ve küçük baskıda okunması zorlaşır. Sonuç tablosundaki "Metin boyutu" satırı bunun için vardır. Kartvizit boyutunda bir baskı için yalnızca ad, tek telefon, e-posta ve web adresini bırakıp birkaç yüz baytı aşmamak iyi bir hedeftir; uzun adresler kodu hızla büyütür.',
    ] },
    { h: 'Telefon ve adres yazımında dikkat edilecekler', ul: [
      'Telefonları <strong>+90</strong> ile başlayan uluslararası biçimde yazın. Sıfırla başlayan numara yurt dışındaki bir telefonda aranamaz.',
      'Araç telefonlardaki boşluk, parantez ve tireleri siler; baştaki artı işaretini korur.',
      'Web adresini protokolsüz yazarsanız başına güvenli bağlantı protokolü eklenir.',
      'Adres tek satır olarak "sokak" bölümüne yazılır. Rehber uygulamaları adresi gösterir ve haritada aratabilir, ancak il, ilçe ve posta kodu ayrı alanlara bölünmez.',
      'Virgül ve noktalı virgül vCard\'da ayraç olduğundan metin içindekilerin önüne ters eğik çizgi konur; bu normaldir ve rehberde görünmez.',
    ] },
    { h: 'Sınırlar ve gizlilik', p: [
      'Araç fotoğraf, logo, doğum günü, sosyal medya hesabı ve birden fazla adres gibi ileri alanları üretmez; amaç her cihazda sorunsuz açılan yalın bir kart hazırlamaktır. Dosyayı kaydederken kodlamayı UTF-8 seçmezseniz "ş", "ğ", "ı" gibi harfler karşı tarafta bozuk görünebilir.',
      'Dijital kartvizit kişisel veri içerir. Kartı herkese açık bir sayfada yayımlamadan önce cep telefonu ve ev adresi gibi bilgileri gerçekten paylaşmak isteyip istemediğinizi düşünün; iş kartlarında kurumsal telefon ve e-posta kullanmak genellikle daha doğrudur.',
    ] },
  ],
  faq: [
    ['VCF dosyası nasıl oluşturulur?', 'Bu sayfada bilgilerinizi girip "Oluştur" düğmesine basın, çıkan metni kopyalayın ve düz metin düzenleyicide <code>kartvizit.vcf</code> adıyla, UTF-8 kodlamasıyla kaydedin. Dosya rehber uygulamalarınca doğrudan açılır.'],
    ['vCard telefonda nasıl açılır?', 'E-posta ya da mesajla gelen .vcf dosyasına dokunduğunuzda telefon kişiyi önizler ve rehbere eklemeyi önerir. QR kod olarak paylaşıldıysa kamerayla okutmak yeterlidir.'],
    ['vCard 3.0 ile 4.0 arasındaki fark nedir?', '4.0 daha yeni standarttır; tür etiketleri küçük harflidir, kodlama her zaman UTF-8\'dir ve bazı ek alanlar tanımlar. 3.0 ise daha eski cihaz ve yazılımlarla uyumludur. Emin değilseniz 3.0 kullanın.'],
    ['Türkçe karakterler bozuk çıkıyor, ne yapmalıyım?', 'Dosya büyük olasılıkla UTF-8 dışında bir kodlamayla kaydedilmiştir. Metin düzenleyicinin "Farklı kaydet" penceresinde kodlamayı UTF-8 seçip yeniden kaydedin.'],
    ['Birden fazla telefon numarası ekleyebilir miyim?', 'Araç bir cep ve bir iş telefonu alanı sunar. Daha fazla numara gerekiyorsa çıkan metne aynı kalıpta yeni bir <code>TEL</code> satırı ekleyebilirsiniz; vCard birden çok telefon satırına izin verir.'],
    ['vCard metnini QR koda çevirebilir miyim?', 'Evet. Metnin tamamını bir QR kod üretecine yapıştırın. Okunabilirlik için kartı kısa tutun; uzun adres ve açıklamalar QR kodu yoğunlaştırır ve küçük baskıda okutmayı zorlaştırır.'],
    ['Ad yazmadan yalnızca firma kartı olur mu?', 'Olur. Ad ve soyadı boş bırakıp firma alanını doldurduğunuzda görünen ad olarak firma adı kullanılır ve rehberde kayıt işletme adıyla görünür.'],
    ['Girdiğim kişisel bilgiler kaydediliyor mu?', 'Hayır. Kart metni tarayıcınızda oluşturulur; ad, telefon, e-posta ve adres bilgileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['qr-kod', 'tel-link-olustur', 'mailto-link-olustur', 'ics-etkinlik-olustur'],
};
