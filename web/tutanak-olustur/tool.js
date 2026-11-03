// Tutanak Örneği Oluşturucu — şablonlar. Motor: engine.js (PDF + DOCX, Türkçe font).
// Yalnızca BOŞ örnek şablon sunar; kullanıcı kendi bilgisini girer. Resmî form yerine geçmez.
import { initDocTool } from './engine.js';

const tarih = { id: 'tarih', label: 'Tarih', type: 'date' };
const saat = { id: 'saat', label: 'Saat', type: 'time' };
const yer = { id: 'yer', label: 'Yer', req: true, ph: 'Örn. şirket merkezi, adres' };
const yerOpt = { id: 'yer', label: 'Yer', ph: 'Örn. şirket merkezi, adres' };
const pozisyon = { id: 'pozisyon', label: 'Görev / unvan', req: true, ph: 'Örn. satış uzmanı' };

/** Malzeme teslimi için ortak tablo; köşeli parantezli satırlar kullanıcıya örnektir. */
const malzemeTablo = (title, after, cols) => {
  const c = cols || [{ label: 'Malzeme / ürün', w: 4 }, { label: 'Adet', w: 1 }, { label: 'Seri no / açıklama', w: 3 }, { label: 'Durum', w: 2.2 }];
  const row = () => c.map((x, i) => (i === 0 ? '[Malzeme adı]' : x.label === 'Adet' ? '1' : `[${x.label}]`));
  return { title, cols: c, rows: [row(), row()], after };
};

const KAPANIS = 'İşbu tutanak iki nüsha olarak düzenlenmiş, katılımcılarca okunarak imzalanmış ve birer nüshası taraflara verilmiştir.';

const templates = {
  'teslim-tesellum': {
    label: 'Teslim tesellüm tutanağı',
    title: 'Teslim Tesellüm Tutanağı',
    note: 'Bu tutanak taraflar arasındaki teslimi kayda alır; noter, kurum ya da mevzuatın öngördüğü resmî form yerine geçmez. Teslim anında görünen eksik ve hasarı not bölümüne yazın.',
    witness: false, minNamed: 2,
    people: [{ role: 'TESLİM EDEN' }, { role: 'TESLİM ALAN' }],
    meta: ['tarih', 'saat', 'yer'],
    fields: [{ id: 'konu', label: 'Teslim konusu', req: true, ph: 'Örn. ofis ekipmanları', wide: true }, tarih, saat, yer],
    optional: [],
    table: malzemeTablo('Teslim Edilen Malzemeler', 1),
    clauses: [
      { h: 'Teslimin konusu', x: 'Taraflar {tarih} tarihinde, saat {saat} sıralarında {yer} yerinde hazır bulunmuştur. {konu} kapsamındaki aşağıdaki liste, Teslim Eden {p1} tarafından teslim edilmiş ve Teslim Alan {p2} tarafından teslim alınmıştır.' },
      { h: 'Teslim durumu', x: 'Teslim Alan, malzemeleri listede yazılı adet ve durumlarıyla gözle kontrol ettiğini; açıkça görülen bir eksik veya hasar bulunmadığını, aksi hâlde bunların not bölümünde belirtildiğini beyan eder.' },
      { h: 'Notlar', x: '[Varsa eksik, hasar, kullanım koşulu veya iade tarihi gibi notları yazın; yoksa "Not yoktur" yazın.]' },
      { h: 'Kapanış', x: KAPANIS },
    ],
  },

  toplanti: {
    label: 'Toplantı tutanağı',
    title: 'Toplantı Tutanağı',
    note: 'Bu tutanak iç toplantıları ve karar takibini kayda alır. Şirket, dernek ve kat malikleri kurulu gibi yapılarda karar defteri, çağrı usulü ve toplantı-karar nisabı gibi kanuni şartlar ayrıca geçerlidir; bu belge onların yerine geçmez.',
    witness: false, minNamed: 2,
    people: [{ role: 'TOPLANTI BAŞKANI' }, { role: 'TUTANAĞI TUTAN' }, { role: 'KATILIMCI' }],
    meta: ['tarih', 'saat', 'bitis', 'yer'],
    fields: [
      { id: 'toplanti_adi', label: 'Toplantının adı', req: true, ph: 'Örn. haftalık proje toplantısı', wide: true },
      tarih, saat, { id: 'bitis', label: 'Bitiş saati', type: 'time', metaLabel: 'Bitiş' }, yer,
    ],
    optional: [],
    table: {
      title: 'Karar ve Görev Takibi',
      cols: [{ label: 'Karar / görev', w: 5 }, { label: 'Sorumlu', w: 2.5 }, { label: 'Termin', w: 2 }],
      rows: [['[Karar veya görev]', '[Sorumlu kişi]', '[Tarih]'], ['[Karar veya görev]', '[Sorumlu kişi]', '[Tarih]']],
      after: 5,
    },
    clauses: [
      { h: 'Toplantının açılışı', x: '{toplanti_adi}, {yer} yerinde {tarih} tarihinde saat {saat} itibarıyla başlamıştır. Toplantıya {p1} başkanlık etmiş, tutanak {p2} tarafından tutulmuştur. Katılımcılar aşağıda gösterilmiştir.' },
      { h: 'Gündem', x: '1. [Birinci gündem maddesi]\n2. [İkinci gündem maddesi]' },
      { h: 'Görüşmeler', x: '[Her gündem maddesi için yapılan görüşmeleri kısaca ve tarafsız biçimde özetleyin.]' },
      { h: 'Alınan kararlar', x: '1. [Karar ve gerekçesi]\n2. [Karar ve gerekçesi]' },
      { h: 'Sonraki toplantı', x: '[Sonraki toplantının tarihi, saati ve yeri; yoksa "Belirlenmemiştir" yazın.]' },
      { h: 'Kapanış', x: 'Gündemde başka madde bulunmadığından toplantıya {bitis} itibarıyla son verilmiştir. İşbu tutanak katılımcılarca okunarak imzalanmıştır.' },
    ],
  },

  'kaza-olay': {
    label: 'Kaza / olay tespit tutanağı',
    title: 'Kaza / Olay Tespit Tutanağı',
    note: 'Bu tutanak resmî kaza tespit tutanağı yerine geçmez. Yaralanma, ölüm, alkol veya uyuşturucu şüphesi, kamu malına zarar ya da taraflar arasında anlaşmazlık varsa polis, jandarma ve sağlık ekiplerini çağırın; sigorta ve resmî başvurular için kurumların kabul ettiği formu kullanın.',
    witness: true, minNamed: 1,
    people: [{ role: 'TARAF 1' }, { role: 'TARAF 2' }],
    meta: ['tarih', 'saat', 'yer'],
    fields: [{ id: 'olay_turu', label: 'Olayın türü', req: true, ph: 'Örn. maddi hasarlı park kazası', wide: true }, tarih, saat, yer],
    optional: [],
    table: null,
    clauses: [
      { h: 'Olayın zamanı ve yeri', x: 'İşbu tutanak, {tarih} tarihinde saat {saat} sıralarında {yer} yerinde meydana gelen "{olay_turu}" ile ilgili olarak, olay yerinde bulunanlarca tespit amacıyla düzenlenmiştir.' },
      { h: 'Taraflar ve araç / eşya bilgileri', x: '[Her taraf için ilgili araç plakası, marka/modeli, sigorta şirketi ve poliçe bilgisini ya da ilgili eşya bilgisini yazın.]' },
      { h: 'Olayın oluş şekli', x: '[Olayın nasıl gerçekleştiğini sırasıyla, tarafsız ve somut biçimde anlatın; yön, yol ve hava koşulları gibi bilgileri ekleyin. Yorum ve suçlama yazmayın.]' },
      { h: 'Hasar ve yaralanma durumu', x: '[Maddi hasarı ve varsa yaralanmayı belirtin. Yaralanma varsa 112\'yi arayın ve resmî makamları çağırın.]' },
      { h: 'Fotoğraf ve diğer deliller', x: '[Çekilen fotoğrafları, kamera kayıtlarını ve tanık bilgilerini listeleyin; ekler bölümüne ekleyin.]' },
      { h: 'Tarafların beyanı', x: 'Taraflar, bu tutanakta yazılı bilgilerin kendi bilgilerine uygun olduğunu beyan eder. Bu tutanak kusur veya sorumluluk hakkında karar niteliği taşımaz; kusur belirlemesi sigorta şirketleri ve yetkili makamlarca yapılır.' },
    ],
  },

  zimmet: {
    label: 'Zimmet tutanağı',
    title: 'Zimmet Tutanağı',
    note: 'Zimmet tutanağı eşyanın kime teslim edildiğini kayda alır; tek başına maaştan kesinti yapma yetkisi vermez. Kamu kurumlarında taşınır mal yönetmeliğine göre düzenlenen resmî fiş ve formlar bu belgenin yerine kullanılır.',
    witness: false, minNamed: 2,
    people: [{ role: 'ZİMMETİ VEREN' }, { role: 'ZİMMET ALAN' }],
    meta: ['tarih', 'yer'],
    fields: [tarih, yerOpt, { id: 'birim', label: 'Birim / departman', ph: 'Örn. muhasebe' }],
    optional: [],
    table: malzemeTablo('Zimmetlenen Malzemeler', 1, [{ label: 'Malzeme', w: 3 }, { label: 'Marka / model', w: 2.4 }, { label: 'Seri no', w: 2.4 }, { label: 'Adet', w: 1 }, { label: 'Durum', w: 2 }]),
    clauses: [
      { h: 'Zimmetin teslimi', x: '{tarih} tarihinde, {birim} biriminde, aşağıda cinsi ve adedi yazılı malzemeler Zimmeti Veren {p1} tarafından Zimmet Alan {p2} adına zimmetlenmiştir.' },
      { h: 'Zimmet alanın sorumlulukları', x: 'Zimmet Alan, malzemeleri yalnızca iş amacıyla ve özenle kullanacağını, üçüncü kişilere devretmeyeceğini, kayıp, çalınma veya hasar hâlinde durumu gecikmeden bildireceğini kabul eder.' },
      { h: 'İade', x: 'Zimmet Alan, görevinin sona ermesi veya işverenin talebi hâlinde malzemeleri teslim aldığı durumda, olağan kullanım aşınması dışında iade eder.' },
      { h: 'Kayıp ve hasar', x: 'Kayıp veya hasar durumunda sorumluluk; iş sözleşmesi, işyeri düzenlemeleri ve ilgili mevzuat çerçevesinde değerlendirilir. Bu tutanak tek başına kesinti veya tazminat yetkisi vermez.' },
      { h: 'Kapanış', x: KAPANIS },
    ],
  },

  'ise-baslama': {
    label: 'İşe başlama teslim tutanağı',
    title: 'İşe Başlama Teslim Tutanağı',
    note: 'Bu tutanak işe başlarken teslim edilen malzeme ve belgeleri kayda alır; iş sözleşmesi, sigorta girişi veya resmî bildirimlerin yerine geçmez. İş sağlığı ve güvenliği gibi zorunlu işlemler ayrıca yapılmalıdır.',
    witness: false, minNamed: 2,
    people: [{ role: 'ÇALIŞAN' }, { role: 'İŞVEREN YETKİLİSİ' }],
    meta: ['tarih', 'yer'],
    fields: [{ ...tarih, label: 'İşe başlama tarihi', metaLabel: 'Tarih' }, { ...yerOpt, label: 'İşyeri', req: true, metaLabel: 'Yer' }, pozisyon],
    optional: [],
    table: malzemeTablo('Teslim Edilen Malzeme ve Belgeler', 1),
    clauses: [
      { h: 'İşe başlama', x: '{p1}, {tarih} tarihinde {yer} işyerinde {pozisyon} görevine başlamıştır. İşe başlarken aşağıdaki malzeme ve belgeler çalışana teslim edilmiştir.' },
      { h: 'Çalışanın beyanı', x: 'Çalışan, listedeki malzemeleri belirtilen durumda teslim aldığını, bunları yalnızca iş amacıyla ve özenle kullanacağını, kayıp veya hasar hâlinde işverene gecikmeden bildireceğini kabul eder.' },
      { h: 'Bilgilendirme', x: '[Yapılan bilgilendirmeleri yazın: işyeri iç düzenlemeleri, iş sağlığı ve güvenliği eğitimi vb. Yapılmadıysa bu bölümü silin.]' },
      { h: 'Kapanış', x: KAPANIS },
    ],
  },

  'isten-ayrilma': {
    label: 'İşten ayrılma teslim tutanağı',
    title: 'İşten Ayrılma Teslim Tutanağı',
    note: 'Bu tutanak yalnızca malzeme ve belge teslimini kayda alır; ibraname değildir, kıdem ve ihbar tazminatı, yıllık izin ücreti gibi hakların hesabı ya da bunlardan feragat anlamı taşımaz. İbraname hukuki sonuç doğurur; imzalamadan önce haklarınızı kontrol edin.',
    witness: false, minNamed: 2,
    people: [{ role: 'AYRILAN ÇALIŞAN' }, { role: 'İŞVEREN YETKİLİSİ' }],
    meta: ['tarih', 'yer'],
    fields: [{ ...tarih, label: 'Ayrılış tarihi', metaLabel: 'Tarih' }, { ...yerOpt, label: 'İşyeri', req: true, metaLabel: 'Yer' }, pozisyon],
    optional: [],
    table: malzemeTablo('İade Edilen Malzeme ve Belgeler', 1),
    clauses: [
      { h: 'Ayrılış', x: '{p1}, {pozisyon} görevinden {tarih} tarihi itibarıyla ayrılmakta olup zimmetindeki aşağıdaki malzeme ve belgeleri iade etmiştir.' },
      { h: 'İadenin kontrolü', x: 'İşveren yetkilisi, listedeki malzemeleri belirtilen durumlarıyla kontrol ederek teslim almıştır. Eksik veya hasarlı olanlar "Durum" sütununda ve not bölümünde belirtilmiştir.' },
      { h: 'Hesap ve yetkiler', x: '[Kurumsal e-posta, sistem erişimi, kart ve anahtar gibi yetkilerin kapatıldığı tarihi yazın.]' },
      { h: 'Kapsam sınırı', x: 'Bu tutanak yalnızca malzeme ve belge teslimini kayıt altına alır; ücret, kıdem ve ihbar tazminatı, yıllık izin ücreti gibi mali hakların hesabı veya bunlardan feragat anlamı taşımaz ve ibraname yerine geçmez.' },
      { h: 'Kapanış', x: KAPANIS },
    ],
  },

  'devir-teslim': {
    label: 'Devir teslim tutanağı',
    title: 'Devir Teslim Tutanağı',
    note: 'Kamu kurumlarında görev devir teslimleri ilgili yönetmelik ve resmî formlarla yapılır; bu belge onların yerine geçmez. Şifre ve PIN gibi gizli erişim bilgilerini tutanağa yazmayın, güvenli yoldan ayrıca iletin.',
    witness: false, minNamed: 2,
    people: [{ role: 'DEVREDEN' }, { role: 'DEVRALAN' }],
    meta: ['tarih', 'saat', 'yer'],
    fields: [{ id: 'konu', label: 'Devredilen görev / iş / varlık', req: true, ph: 'Örn. muhasebe birimi görev devri', wide: true }, tarih, saat, yerOpt],
    optional: [],
    table: {
      title: 'Devredilen Evrak, Varlık ve İşler',
      cols: [{ label: 'Madde', w: 3.5 }, { label: 'Konum / açıklama', w: 3.5 }, { label: 'Durum', w: 2 }],
      rows: [['[Evrak, varlık veya iş]', '[Konumu]', '[Durumu]'], ['[Evrak, varlık veya iş]', '[Konumu]', '[Durumu]']],
      after: 1,
    },
    clauses: [
      { h: 'Devrin konusu', x: 'Devreden {p1} tarafından yürütülen "{konu}", {tarih} tarihinde Devralan {p2} tarafından devralınmıştır. Devredilen evrak, varlık ve işler aşağıdaki listede gösterilmiştir.' },
      { h: 'Devredilen görev ve sorumluluklar', x: '[Devredilen görev ve sorumlulukları maddeler hâlinde yazın.]' },
      { h: 'Bekleyen işler ve süreler', x: '[Devir tarihinde bekleyen işleri, kritik tarihleri ve ilgili kişileri yazın.]' },
      { h: 'Erişim bilgileri', x: 'Şifre, PIN ve benzeri gizli erişim bilgileri bu tutanağa yazılmamıştır; güvenli yoldan ayrıca iletilmiş ve devralan tarafından değiştirilmelidir.' },
      { h: 'Kapanış', x: KAPANIS },
    ],
  },
};

initDocTool({
  templates,
  filePrefix: 'tutanak',
  numbering: 'num',
  clauseNoun: 'Bölüm',
  peopleNoun: 'Katılımcılar',
  addRole: 'KATILIMCI',
});
