// Sözleşme Örneği Oluşturucu — şablonlar. Motor: engine.js (PDF + DOCX, Türkçe font).
// Yalnızca BOŞ örnek şablon sunar; kullanıcı kendi bilgisini girer. Hukuki tavsiye değildir.
import { initDocTool } from './engine.js';

// Köşeli parantezler kullanıcının dolduracağı boşluklardır; {alan} ve {p1}/{p2} yer tutucuları çıktıda otomatik dolar.
const KEFIL = (borc, kime) => ({
  id: 'kefil',
  label: 'Kefil ekle (isteğe bağlı)',
  person: { role: 'KEFİL' },
  clause: {
    h: 'Kefalet',
    x: `Kefil {kefil}, ${kime} bu sözleşmeden doğan ${borc} borçlarına, [azami kefalet tutarı] tutarını aşmamak üzere ve [kefalet süresi] süreyle müteselsil kefil olarak sorumlu olduğunu kabul eder. Türk Borçlar Kanunu uyarınca kefaletin geçerli olması için kefilin sorumlu olacağı azami miktarı ve kefalet tarihini kendi el yazısıyla yazması gerekir; kefil evli ise eşinin kefalete yazılı rıza göstermesi de aranır.`,
  },
});

const yer = { id: 'yer', label: 'Düzenlendiği yer', ph: 'Örn. Diyarbakır' };
const tarih = { id: 'tarih', label: 'Sözleşme tarihi', type: 'date' };
const baslangic = { id: 'baslangic', label: 'Kira başlangıç tarihi', type: 'date' };
const sure = { id: 'sure', label: 'Kira süresi', ph: 'Örn. 1 (bir) yıl' };
const kira = { id: 'kira', label: 'Aylık kira bedeli', ph: 'Örn. 15.000 TL', req: true };
const odemeGunu = { id: 'odeme_gunu', label: 'Ödeme günü (her ayın…)', ph: 'Örn. 5', hint: 'Her ayın kaçıncı gününe kadar ödeneceğini yazın.' };
const odemeSekli = { id: 'odeme_sekli', label: 'Ödeme şekli', def: 'kiraya verenin bildirdiği banka hesabına havale/EFT ile', wide: true };
const depozito = { id: 'depozito', label: 'Güvence bedeli (depozito)', ph: 'Örn. 30.000 TL', hint: 'Kanun gereği üç aylık kira bedelini aşamaz.' };

const demirbasTablo = {
  title: 'Demirbaş Listesi',
  cols: [{ label: 'Eşya / demirbaş', w: 5 }, { label: 'Adet', w: 1.3 }, { label: 'Durum / açıklama', w: 4 }],
  rows: [['[Eşya adı]', '1', '[Durumu]'], ['[Eşya adı]', '1', '[Durumu]'], ['[Eşya adı]', '1', '[Durumu]']],
  after: 10,
};

const templates = {
  'konut-kira': {
    label: 'Konut kira sözleşmesi',
    title: 'Konut Kira Sözleşmesi',
    note: 'Konut kiralarında kiracıyı koruyan emredici kanun hükümleri vardır (Türk Borçlar Kanunu m. 299 ve devamı); kanuna aykırı şartlar geçersizdir. Kira artışı, depozito, uzama ve tahliye kuralları değişebilir, güncel mevzuatı kontrol edin. Sözleşme damga vergisine tabi olabilir; tahliye taahhüdü ayrı bir belgedir ve bu şablonda yoktur.',
    witness: true,
    minNamed: 2,
    people: [{ role: 'KİRAYA VEREN' }, { role: 'KİRACI' }],
    fields: [
      yer, tarih,
      { id: 'adres', label: 'Kiralanan taşınmazın adresi', type: 'textarea', req: true, ph: 'Mahalle, sokak, bina ve daire no, ilçe/il' },
      { id: 'nitelik', label: 'Taşınmazın niteliği', ph: 'Örn. 3+1 daire, 4. kat' },
      baslangic, sure, kira, odemeGunu, odemeSekli, depozito,
    ],
    optional: [KEFIL('kira ve diğer', 'Kiracının')],
    table: demirbasTablo,
    clauses: [
      { h: 'Sözleşmenin konusu', x: 'Kiraya Veren {p1}, aşağıda adresi ve niteliği belirtilen taşınmazı konut olarak kullanılmak üzere kiraya vermiş; Kiracı {p2} de bu taşınmazı kiralamıştır.' },
      { h: 'Kiralanan taşınmaz', x: 'Kiralanan taşınmaz, {adres} adresinde bulunan {nitelik} niteliğindeki konuttur. Kiracı, taşınmazı ve ekindeki demirbaşları incelediğini, kullanıma uygun durumda teslim aldığını kabul eder.' },
      { h: 'Kira süresi', x: 'Kira süresi {baslangic} tarihinde başlar ve {sure} sürelidir. Sürenin sonunda yenilenme ve sona erme, Türk Borçlar Kanunu\'nun ilgili hükümlerine tabidir; taraflar kanunda öngörülen süre ve usule uygun bildirim yapmadıkça sözleşme aynı koşullarla birer yıl uzamış sayılır.' },
      { h: 'Kira bedeli ve ödeme', x: 'Aylık kira bedeli {kira} olup her ayın en geç {odeme_gunu}. gününe kadar {odeme_sekli} ödenir. Ödemelerin dekont veya makbuzla belgelendirilmesi esastır.' },
      { h: 'Kira bedelinin artırılması', x: 'Yenilenen kira yıllarında kira bedeli, Türk Borçlar Kanunu\'nun 344. maddesi uyarınca bir önceki kira yılındaki on iki aylık TÜFE ortalamasındaki değişim oranını geçmemek üzere artırılabilir. Taraflar daha düşük bir artışı yazılı olarak kararlaştırabilir.' },
      { h: 'Güvence bedeli (depozito)', x: 'Kiracı, Türk Borçlar Kanunu\'nun 342. maddesi uyarınca {depozito} tutarında güvence bedelini kiraya verene teslim eder veya birlikte açılacak vadeli bir banka hesabına yatırır. Güvence bedeli üç aylık kira bedelini aşamaz. Taşınmaz, olağan kullanım dışında bir hasar bulunmadan teslim edildiğinde güvence bedeli, varsa faiziyle birlikte kiracıya iade edilir.' },
      { h: 'Kullanım ve bakım', x: 'Kiracı, taşınmazı özenle ve sözleşmeye uygun biçimde kullanır; olağan kullanımın gerektirdiği küçük onarım ve temizlik giderleri kiracıya aittir. Kiraya verenin yazılı izni olmadan taşınmazda esaslı değişiklik yapılamaz, taşınmaz alt kiraya verilemez veya devredilemez.' },
      { h: 'Giderler', x: 'Elektrik, su, doğalgaz, internet, aidat ve benzeri kullanıma bağlı giderler kiracıya; emlak vergisi ve kanundan doğan malik yükümlülükleri kiraya verene aittir. Yönetim planı hükümleri saklıdır.' },
      { h: 'Tahliye ve teslim', x: 'Sözleşme sona erdiğinde kiracı, taşınmazı olağan kullanımdan doğan aşınma dışında teslim aldığı durumda ve kendi eşyalarından arındırılmış olarak kiraya verene teslim eder. Kanundan doğan tahliye hakları ve usulleri saklıdır.' },
      { h: 'Demirbaşlar', x: 'Taşınmazla birlikte teslim edilen demirbaşlar ve durumları aşağıdaki listede gösterilmiştir. Kiracı bu eşyaları listedeki durumlarıyla teslim aldığını, sözleşme sonunda aynı durumda iade edeceğini kabul eder.' },
      { h: 'Yetkili mahkeme', x: 'Bu sözleşmeden doğan uyuşmazlıklarda kiralananın bulunduğu yerdeki mahkemeler ve icra daireleri yetkilidir.' },
      { h: 'Yürürlük', x: 'İşbu sözleşme {tarih} tarihinde {yer} yerinde, iki nüsha olarak düzenlenmiş; taraflarca okunup anlaşılarak imzalanmış ve birer nüshası taraflara verilmiştir.' },
    ],
  },

  'is-yeri-kira': {
    label: 'İş yeri kira sözleşmesi',
    title: 'İş Yeri Kira Sözleşmesi',
    note: 'Çatılı iş yeri kiralarında da Türk Borçlar Kanunu\'nun konut kirasına ilişkin birçok hükmü uygulanır; kira bedeli, KDV, stopaj ve damga vergisi yükümlülükleri için mali müşavirinize danışın. Ruhsat, iskân ve faaliyet izni gibi resmî şartlar bu belgeyle sağlanmaz. Güncel mevzuatı kontrol edin.',
    witness: true,
    minNamed: 2,
    people: [{ role: 'KİRAYA VEREN' }, { role: 'KİRACI' }],
    fields: [
      yer, tarih,
      { id: 'adres', label: 'Kiralanan iş yerinin adresi', type: 'textarea', req: true, ph: 'Mahalle, cadde, bina ve bağımsız bölüm no, ilçe/il' },
      { id: 'kullanim', label: 'Kullanım amacı', ph: 'Örn. büro / mağaza / atölye', req: true },
      baslangic, sure, kira, odemeGunu, odemeSekli, depozito,
    ],
    optional: [KEFIL('kira ve diğer', 'Kiracının')],
    table: { ...demirbasTablo, title: 'Teslim Edilen Demirbaş ve Tesisat Listesi', after: 9 },
    clauses: [
      { h: 'Sözleşmenin konusu', x: 'Kiraya Veren {p1}, aşağıda adresi belirtilen iş yerini, Kiracı {p2} tarafından {kullanim} amacıyla kullanılmak üzere kiraya vermiş; Kiracı da kiralamıştır.' },
      { h: 'Kiralanan iş yeri', x: 'Kiralanan iş yeri {adres} adresinde bulunmaktadır. Kiracı, iş yerini ve tesisatını incelediğini, kullanıma uygun durumda teslim aldığını kabul eder.' },
      { h: 'Kullanım amacı', x: 'İş yeri yalnızca {kullanim} amacıyla kullanılır. Faaliyet için gereken ruhsat, izin ve belgelerin alınması ile bunlara ilişkin giderler kiracıya aittir; kiraya veren gerekli malik belgelerini vermekle yükümlüdür.' },
      { h: 'Kira süresi', x: 'Kira süresi {baslangic} tarihinde başlar ve {sure} sürelidir. Sürenin sonunda yenilenme ve sona erme, Türk Borçlar Kanunu\'nun ilgili hükümlerine tabidir; kanuna uygun bildirim yapılmadıkça sözleşme aynı koşullarla birer yıl uzamış sayılır.' },
      { h: 'Kira bedeli ve ödeme', x: 'Aylık kira bedeli {kira} olup her ayın en geç {odeme_gunu}. gününe kadar {odeme_sekli} ödenir. Kira bedeline ilişkin KDV, stopaj ve diğer vergisel yükümlülükler yürürlükteki mevzuata göre yerine getirilir; bu konudaki ayrıntı [varsa vergi düzenlemesi] olarak aşağıda belirtilmiştir.' },
      { h: 'Kira bedelinin artırılması', x: 'Yenilenen kira yıllarında kira bedeli, Türk Borçlar Kanunu\'nun 344. maddesi uyarınca bir önceki kira yılındaki on iki aylık TÜFE ortalamasındaki değişim oranını geçmemek üzere artırılabilir.' },
      { h: 'Güvence bedeli (depozito)', x: 'Kiracı, Türk Borçlar Kanunu\'nun 342. maddesi uyarınca {depozito} tutarında güvence bedelini kiraya verene teslim eder veya birlikte açılacak vadeli bir banka hesabına yatırır. Güvence bedeli üç aylık kira bedelini aşamaz ve iş yeri hasarsız teslim edildiğinde iade edilir.' },
      { h: 'Alt kira, devir ve değişiklik', x: 'Kiracı, kiraya verenin yazılı izni olmadan iş yerini alt kiraya veremez, kiracı hakkını devredemez ve iş yerinde esaslı değişiklik, tadilat veya dekorasyon yapamaz. Kanunun tanıdığı haklar saklıdır.' },
      { h: 'Giderler ve bakım', x: 'Elektrik, su, doğalgaz, internet, aidat ve iş yerinin kullanımına bağlı giderler ile olağan bakım ve küçük onarımlar kiracıya; emlak vergisi ve malik yükümlülükleri kiraya verene aittir.' },
      { h: 'Teslim ve tahliye', x: 'Sözleşme sona erdiğinde kiracı, iş yerini olağan kullanım aşınması dışında teslim aldığı durumda ve eşyalarından arındırılmış olarak teslim eder. Kanundan doğan tahliye hakları ve usulleri saklıdır.' },
      { h: 'Yetkili mahkeme', x: 'Bu sözleşmeden doğan uyuşmazlıklarda kiralananın bulunduğu yerdeki mahkemeler ve icra daireleri yetkilidir.' },
      { h: 'Yürürlük', x: 'İşbu sözleşme {tarih} tarihinde {yer} yerinde, iki nüsha olarak düzenlenmiş; taraflarca okunup anlaşılarak imzalanmıştır.' },
    ],
  },

  'arac-satis': {
    label: 'Araç satış ön protokolü',
    title: 'Araç Satış Sözleşmesi (Ön Protokol)',
    note: 'Araç satışı noterde yapılır; bu belge yalnızca ön protokoldür ve noter satışının yerine geçmez. Mülkiyet, noter huzurunda düzenlenen satış senediyle ve tescille devredilir. İşlemden önce aracın haciz, rehin ve borç durumunu resmî kanallardan kontrol edin; kimlik ve ruhsat bilgilerini yalnızca noterde, belgeyle doğrulayın.',
    witness: false,
    minNamed: 2,
    people: [{ role: 'SATICI' }, { role: 'ALICI' }],
    fields: [
      yer, tarih,
      { id: 'plaka', label: 'Plaka', req: true, ph: 'Aracın plakası' },
      { id: 'marka_model', label: 'Marka / model', req: true, ph: 'Örn. marka, model, versiyon' },
      { id: 'model_yili', label: 'Model yılı', ph: 'Örn. 2018' },
      { id: 'sase', label: 'Şase numarası', ph: 'Ruhsattan okuyarak yazın' },
      { id: 'km', label: 'Kilometre', ph: 'Örn. 85.000 km' },
      { id: 'bedel', label: 'Satış bedeli', req: true, ph: 'Örn. 850.000 TL' },
      { id: 'odeme', label: 'Ödeme şekli ve planı', type: 'textarea', def: 'Bedelin tamamı noter satışı sırasında banka havalesi ile ödenecektir.' },
      { id: 'noter_tarihi', label: 'Noter satışının en geç yapılacağı tarih', type: 'date' },
    ],
    optional: [],
    table: null,
    clauses: [
      { h: 'Sözleşmenin niteliği', x: 'İşbu belge, aşağıda bilgileri yazılı aracın noterde yapılacak satışına ilişkin ön protokoldür. Taraflar, aracın mülkiyetinin ancak noter huzurunda düzenlenen satış senedi ve tescille geçeceğini bilmekte; bu belgenin noter satışının yerine geçmediğini kabul etmektedir.' },
      { h: 'Aracın bilgileri', x: 'Satışa konu araç: {plaka} plakalı, {marka_model}, model yılı {model_yili}, şase numarası {sase}, kilometre {km} olan araçtır.' },
      { h: 'Satış bedeli ve ödeme', x: 'Aracın satış bedeli {bedel} olarak kararlaştırılmıştır. Ödeme: {odeme}' },
      { h: 'Noterde devir', x: 'Taraflar, aracın devrini en geç {noter_tarihi} tarihine kadar birlikte noterde yapmayı kabul eder. Devir masrafları, vergi ve harçlar konusunda aksi yazılı kararlaştırılmadıkça kanunun öngördüğü kişiler öder; taraflar bu konuda [masraf paylaşımı] şeklinde anlaşmıştır.' },
      { h: 'Satıcının beyanları', x: 'Satıcı, aracın maliki olduğunu; aracın üzerinde kendisinin bildiği bir haciz, rehin, takyidat veya üçüncü kişi hakkı bulunmadığını beyan eder. Bu beyanların doğruluğu noterde belgelerle teyit edilecektir.' },
      { h: 'Aracın durumu', x: 'Alıcı, aracı yerinde gördüğünü, incelediğini ve ekspertiz yaptırma imkânı bulduğunu kabul eder. Satıcı, bildiği hasar, boya, değişen parça ve kaza geçmişini alıcıya açıkça bildirmiştir: [bilinen hasar ve kaza geçmişi]. Satıcının bildiği ve gizlediği ayıplara ilişkin kanun hükümleri saklıdır.' },
      { h: 'Vergi, ceza ve sigorta', x: 'Devir gününe kadar doğan motorlu taşıtlar vergisi, trafik cezaları ve diğer kamu borçları satıcıya, devirden sonra doğanlar alıcıya aittir. Zorunlu trafik sigortasının devri taraflarca devir gününde ayrıca yapılır.' },
      { h: 'Teslim', x: 'Araç ile birlikte ruhsat, anahtarlar ve [varsa yedek anahtar, servis kayıtları, ek aksesuarlar] noter satışında alıcıya teslim edilecektir.' },
      { h: 'Cayma', x: 'Taraflardan biri haklı bir sebep olmaksızın noter satışına gelmezse veya devri yapmaktan vazgeçerse, [cayma bedeli veya iade koşulu] uygulanır. Alıcı tarafından peşin verilmiş bir tutar varsa, satış gerçekleşmediğinde tamamı alıcıya iade edilir.' },
      { h: 'Yürürlük', x: 'İşbu ön protokol {tarih} tarihinde {yer} yerinde, iki nüsha olarak düzenlenmiş ve taraflarca imzalanmıştır.' },
    ],
  },

  'hizmet-freelance': {
    label: 'Hizmet / freelance sözleşmesi',
    title: 'Hizmet (Freelance) Sözleşmesi',
    note: 'Çalışma ilişkisinin niteliğini sözleşmenin adı değil, fiilî durum belirler; düzenli, bağımlı ve talimatla yürütülen bir çalışma iş sözleşmesi sayılabilir (4857 sayılı İş Kanunu). Telif ve fikrî hak devri, vergi ve fatura yükümlülükleri için uzmana danışın. Güncel mevzuatı kontrol edin.',
    witness: false,
    minNamed: 2,
    people: [{ role: 'HİZMET ALAN' }, { role: 'HİZMET VEREN' }],
    fields: [
      yer, tarih,
      { id: 'is_tanimi', label: 'Yapılacak işin tanımı', type: 'textarea', req: true, ph: 'Örn. kurumsal web sitesi tasarımı ve yayına alınması' },
      { id: 'baslangic', label: 'İşe başlama tarihi', type: 'date' },
      { id: 'teslim_tarihi', label: 'Teslim tarihi', type: 'date' },
      { id: 'ucret', label: 'Hizmet bedeli', req: true, ph: 'Örn. 25.000 TL + KDV' },
      { id: 'odeme', label: 'Ödeme planı', type: 'textarea', def: 'Bedelin yarısı işe başlarken, kalanı teslimde ödenir.' },
      { id: 'revizyon', label: 'Revizyon hakkı', def: '2 (iki) revizyon' },
    ],
    optional: [],
    table: null,
    clauses: [
      { h: 'Sözleşmenin konusu', x: 'İşbu sözleşme, Hizmet Alan {p1} ile Hizmet Veren {p2} arasında aşağıda tanımlanan işin bağımsız bir hizmet olarak yapılmasına ilişkin esasları düzenler.' },
      { h: 'İşin kapsamı', x: 'Hizmet Veren, şu işi yapmayı kabul eder: {is_tanimi}. Kapsam dışında kalan işler ve ek talepler ayrı yazılı anlaşmaya tabidir.' },
      { h: 'Süre ve teslim', x: 'İş {baslangic} tarihinde başlar ve en geç {teslim_tarihi} tarihinde teslim edilir. Hizmet Alanın zamanında bilgi ve malzeme sağlamaması hâlinde teslim süresi aynı oranda uzar.' },
      { h: 'Hizmet bedeli ve ödeme', x: 'Hizmet bedeli {ucret} olarak kararlaştırılmıştır. Ödeme planı: {odeme} Hizmet Veren, ödemeye ilişkin fatura veya serbest meslek makbuzunu mevzuata uygun düzenler; vergi yükümlülükleri kendisine aittir.' },
      { h: 'Revizyonlar', x: 'Teslim edilen işte Hizmet Alanın talep edebileceği düzeltme hakkı {revizyon} ile sınırlıdır. Bu sayıyı aşan değişiklikler ek ücrete tabidir.' },
      { h: 'Bağımsızlık', x: 'Hizmet Veren işi kendi imkânlarıyla, kendi çalışma düzeniyle ve bağımsız olarak yürütür. Taraflar arasında bu sözleşme ile işçi-işveren ilişkisi kurulmak istenmemiştir.' },
      { h: 'Fikrî haklar', x: 'Teslim edilen iş ürünündeki mali hakların Hizmet Alana devri, hizmet bedelinin tamamının ödenmesi şartına bağlıdır. Hizmet Veren, ürünün kendi özgün çalışması olduğunu ve üçüncü kişi haklarını ihlal etmediğini beyan eder. Hizmet Verenin referans olarak kullanma hakkı: [var / yok].' },
      { h: 'Gizlilik', x: 'Taraflar, işin yürütülmesi sırasında öğrendikleri ticari ve teknik bilgileri gizli tutmayı, sözleşme sona erdikten sonra da üçüncü kişilerle paylaşmamayı kabul eder.' },
      { h: 'Fesih', x: 'Taraflardan her biri, karşı tarafa yazılı bildirimle ve [bildirim süresi] önceden haber vererek sözleşmeyi feshedebilir. Fesih hâlinde o âna kadar yapılan işin bedeli oransal olarak ödenir.' },
      { h: 'Mücbir sebep', x: 'Tarafların kontrolü dışındaki olaylar nedeniyle yükümlülüklerin yerine getirilememesi hâlinde taraflar sorumlu tutulmaz; durum karşı tarafa gecikmeden bildirilir.' },
      { h: 'Uyuşmazlık ve yürürlük', x: 'Uyuşmazlıklarda [yetkili mahkeme / icra dairesi] yetkilidir. İşbu sözleşme {tarih} tarihinde {yer} yerinde, iki nüsha olarak düzenlenmiş ve imzalanmıştır.' },
    ],
  },

  'borc-odunc': {
    label: 'Ödünç (borç) sözleşmesi',
    title: 'Borç (Ödünç) Sözleşmesi',
    note: 'Yasal sınırın üzerinde faiz kararlaştırmak hukuka aykırıdır ve tefecilik suçunu oluşturabilir; bu şablon yalnızca faizsiz ya da yasal sınırlar içindeki borç ilişkisi için örnektir. Büyük tutarlarda ve ispat açısından yazılı belge, banka dekontu ve senet gibi araçları birlikte değerlendirin. Güncel mevzuatı kontrol edin.',
    witness: true,
    minNamed: 2,
    people: [{ role: 'BORÇ VEREN' }, { role: 'BORÇLU' }],
    fields: [
      yer, tarih,
      { id: 'tutar', label: 'Borç tutarı', req: true, ph: 'Örn. 50.000 TL' },
      { id: 'tutar_yazi', label: 'Tutarın yazıyla karşılığı', ph: 'Örn. elli bin Türk Lirası', hint: 'Yanlış anlaşılmayı önlemek için tutarı yazıyla da belirtin.' },
      { id: 'teslim_sekli', label: 'Paranın veriliş şekli', def: 'banka havalesi ile' },
      { id: 'vade', label: 'Geri ödeme (vade) tarihi', type: 'date', req: true },
      { id: 'odeme_plani', label: 'Ödeme planı', type: 'textarea', def: 'Borç, vade tarihinde tek seferde ödenir.' },
      { id: 'faiz', label: 'Faiz durumu', def: 'Bu borç faizsizdir.' },
    ],
    optional: [KEFIL('borçlunun', 'Borçlunun')],
    table: null,
    clauses: [
      { h: 'Sözleşmenin konusu', x: 'Borç Veren {p1}, Borçluya ödünç olarak para vermeyi; Borçlu {p2} de aldığı parayı aşağıdaki koşullarla geri ödemeyi kabul eder.' },
      { h: 'Borç tutarı ve veriliş', x: 'Borç tutarı {tutar} ({tutar_yazi}) olup {teslim_sekli} Borçluya verilmiştir. Borçlu, bu tutarı eksiksiz teslim aldığını kabul eder.' },
      { h: 'Geri ödeme', x: 'Borçlu, aldığı tutarı {vade} tarihinde geri ödemeyi taahhüt eder. {odeme_plani}' },
      { h: 'Faiz', x: '{faiz} Taraflar faiz kararlaştırırsa oran, yürürlükteki mevzuatın izin verdiği sınırı aşamaz.' },
      { h: 'Gecikme', x: 'Borçlunun vadede ödememesi hâlinde, kanunun öngördüğü gecikme faizi ve diğer yasal sonuçlar uygulanır. Borç Veren, ödemeyi yazılı olarak hatırlatma hakkını saklı tutar.' },
      { h: 'Erken ödeme', x: 'Borçlu, vadeden önce borcun tamamını veya bir kısmını ödeyebilir. Yapılan her ödeme dekont veya makbuzla belgelenir ve kalan borç bu belgelere göre hesaplanır.' },
      { h: 'Belgeleme', x: 'Taraflar, paranın verilmesine ve geri ödemelere ilişkin banka dekontlarını ve bu sözleşmeyi saklamayı kabul eder. Borcun tamamı ödendiğinde Borç Veren bunu yazılı olarak teyit eder.' },
      { h: 'Uyuşmazlık ve yürürlük', x: 'Uyuşmazlıklarda yetkili mahkeme ve icra daireleri [yetkili yer] mahkeme ve icra daireleridir. İşbu sözleşme {tarih} tarihinde {yer} yerinde, iki nüsha olarak düzenlenmiş ve imzalanmıştır.' },
    ],
  },

  'ikinci-el-satis': {
    label: 'Ev eşyası / ikinci el satış sözleşmesi',
    title: 'İkinci El Eşya Satış Sözleşmesi',
    note: 'Araç, taşınmaz gibi tescile veya noter şartına bağlı mallar için bu şablon uygun değildir. Satıcı ticari faaliyet olarak satış yapmıyorsa tüketici mevzuatı genellikle uygulanmaz; ancak gizlenen ayıplara ilişkin Türk Borçlar Kanunu hükümleri geçerlidir. Çalıntı veya sahipliği belirsiz mal satışı ve alımı suç oluşturabilir. Güncel mevzuatı kontrol edin.',
    witness: false,
    minNamed: 2,
    people: [{ role: 'SATICI' }, { role: 'ALICI' }],
    fields: [
      yer, tarih,
      { id: 'toplam', label: 'Toplam satış bedeli', req: true, ph: 'Örn. 12.500 TL' },
      { id: 'odeme', label: 'Ödeme şekli', def: 'peşin olarak, teslimde' },
      { id: 'teslim_tarihi', label: 'Teslim tarihi', type: 'date' },
      { id: 'durum', label: 'Garanti / ayıp durumu', type: 'textarea', def: 'Eşyalar kullanılmış olup mevcut hâlleriyle satılmıştır; satıcı bilinen kusurları listede belirtmiştir.' },
    ],
    optional: [],
    table: {
      title: 'Satılan Eşyalar',
      cols: [{ label: 'Eşya', w: 4 }, { label: 'Adet', w: 1.2 }, { label: 'Durumu', w: 3.3 }, { label: 'Bedel', w: 2 }],
      rows: [['[Eşya adı]', '1', '[Durumu]', '[Bedel]'], ['[Eşya adı]', '1', '[Durumu]', '[Bedel]']],
      after: 1,
    },
    clauses: [
      { h: 'Sözleşmenin konusu', x: 'Satıcı {p1}, aşağıdaki listede yazılı eşyaları Alıcıya satmayı; Alıcı {p2} de bu eşyaları satın almayı kabul eder.' },
      { h: 'Satış bedeli ve ödeme', x: 'Eşyaların toplam satış bedeli {toplam} olup ödeme {odeme} yapılır. Satıcı, bedeli eksiksiz aldığında bunu yazılı olarak (imza veya makbuz ile) teyit eder.' },
      { h: 'Teslim ve mülkiyet', x: 'Eşyalar {teslim_tarihi} tarihinde, bulundukları yerde alıcıya teslim edilecektir. Taşıma ve nakliye masrafı [kime ait olduğunu yazın]. Mülkiyet, bedelin tamamının ödenmesiyle alıcıya geçer.' },
      { h: 'Eşyaların durumu', x: '{durum} Alıcı, eşyaları görüp incelediğini kabul eder.' },
      { h: 'Satıcının beyanı', x: 'Satıcı, satılan eşyaların kendi mülkiyetinde olduğunu, üzerinde üçüncü kişinin hakkı veya rehin bulunmadığını beyan eder.' },
      { h: 'Teslimden sonra', x: 'Teslimden sonra eşyaların taşınması, kurulumu ve kullanımından doğan risk alıcıya aittir. Bu madde, satıcının bildiği ve gizlediği ayıplara ilişkin kanundan doğan sorumluluğunu ortadan kaldırmaz.' },
      { h: 'Yürürlük', x: 'İşbu sözleşme {tarih} tarihinde {yer} yerinde, iki nüsha olarak düzenlenmiş ve taraflarca imzalanmıştır.' },
    ],
  },
};

initDocTool({
  templates,
  filePrefix: 'sozlesme',
  numbering: 'madde',
  clauseNoun: 'Madde',
  peopleNoun: 'Taraflar',
  addRole: 'TARAF',
});
