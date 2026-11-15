export default {
  slug: 'hafta-sonu-sayisi-hesapla',
  title: 'İki Tarih Arası Hafta Sonu Sayısı Hesaplama',
  h1Tail: 'cumartesi ve pazar sayısı',
  pageTitle: 'İki Tarih Arası Hafta Sonu Sayısı – Kaç Cumartesi, Kaç Pazar Var?',
  description: 'İki tarih arasında kaç cumartesi, kaç pazar ve kaç tam hafta sonu olduğunu hesaplayın. Hafta içi gün sayısını ve toplam günü de aynı anda gösterir.',
  card: 'İki tarih arasında kaç cumartesi, kaç pazar ve kaç tam hafta sonu olduğunu, hafta içi gün sayısıyla birlikte bulun.',
  category: 'zaman',
  keywords: ['hafta sonu sayısı hesaplama', 'iki tarih arası kaç cumartesi', 'kaç pazar var', 'kaç hafta sonu kaldı', 'hafta içi gün sayısı', 'cumartesi pazar sayma', 'tatile kaç hafta sonu var'],
  lead: 'Başlangıç ve bitiş tarihini girin; aradaki dönemde kaç <strong>cumartesi</strong>, kaç <strong>pazar</strong> ve kaç tam hafta sonu bulunduğunu öğrenin. Başlangıç ve bitiş günleri sayıma dahildir.',
  button: 'Hesapla',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date' },
    { id: 'bitis', label: 'Bitiş tarihi', type: 'date', hint: 'Her iki gün de sayıma dahil edilir.' },
  ],
  compute(v, h) {
    const a = h.date(v.baslangic, 'Başlangıç tarihi');
    const b = h.date(v.bitis, 'Bitiş tarihi');
    if (b.getTime() < a.getTime()) h.err('Bitiş tarihi başlangıç tarihinden önce olamaz. İki tarihin yerini değiştirin.');
    const n = h.gunFarki(a, b) + 1;
    const ilk = a.getUTCDay(); // 0 = Pazar … 6 = Cumartesi
    const tam = Math.floor(n / 7), artan = n % 7;
    const say = (g) => tam + (((g - ilk + 7) % 7) < artan ? 1 : 0);
    const cmt = say(6), paz = say(0);
    const cift = cmt - (b.getUTCDay() === 6 ? 1 : 0);
    const haftaSonu = cmt + paz;
    return {
      rows: [
        ['Hafta sonu günü', h.fmt(haftaSonu, 0) + ' gün'],
        ['Cumartesi sayısı', h.fmt(cmt, 0)],
        ['Pazar sayısı', h.fmt(paz, 0)],
        ['Tam hafta sonu (Cumartesi + Pazar)', h.fmt(cift, 0)],
        ['Hafta içi gün', h.fmt(n - haftaSonu, 0) + ' gün'],
        ['Toplam gün', h.fmt(n, 0) + ' gün'],
        ['Dönem', h.fmtDate(a) + ' ' + h.gunAdi(a) + ' – ' + h.fmtDate(b) + ' ' + h.gunAdi(b)],
      ],
      note: 'Başlangıç ve bitiş günleri dahildir. Resmî tatiller ve idari izinler hesaba katılmaz; hafta içi sayısı yalnızca pazartesi–cuma günlerini gösterir.',
    };
  },
  cases: [
    { in: { baslangic: '2026-01-01', bitis: '2026-01-31' }, out: { 'Hafta sonu günü': '9 gün', 'Cumartesi sayısı': '5', 'Pazar sayısı': '4', 'Tam hafta sonu (Cumartesi + Pazar)': '4', 'Hafta içi gün': '22 gün', 'Toplam gün': '31 gün' } },
    { in: { baslangic: '2026-01-01', bitis: '2026-12-31' }, out: { 'Hafta sonu günü': '104 gün', 'Cumartesi sayısı': '52', 'Pazar sayısı': '52', 'Hafta içi gün': '261 gün', 'Toplam gün': '365 gün' } },
    { in: { baslangic: '2026-06-15', bitis: '2026-09-11' }, out: { 'Hafta sonu günü': '24 gün', 'Tam hafta sonu (Cumartesi + Pazar)': '12', 'Hafta içi gün': '65 gün', 'Toplam gün': '89 gün' } },
    { in: { baslangic: '2026-11-14', bitis: '2026-11-15' }, out: { 'Hafta sonu günü': '2 gün', 'Tam hafta sonu (Cumartesi + Pazar)': '1', 'Hafta içi gün': '0 gün' } },
    { in: { baslangic: '2026-11-16', bitis: '2026-11-20' }, out: { 'Hafta sonu günü': '0 gün', 'Hafta içi gün': '5 gün' } },
    { in: { baslangic: '2024-02-01', bitis: '2024-02-29' }, out: { 'Cumartesi sayısı': '4', 'Pazar sayısı': '4', 'Hafta içi gün': '21 gün', 'Toplam gün': '29 gün' } },
    { in: { baslangic: '2026-11-15', bitis: '2026-11-15' }, out: { 'Hafta sonu günü': '1 gün', 'Cumartesi sayısı': '0', 'Pazar sayısı': '1', 'Tam hafta sonu (Cumartesi + Pazar)': '0' } },
    { in: { baslangic: '2000-01-01', bitis: '2026-12-31' }, out: { 'Hafta sonu günü': '2.818 gün', 'Hafta içi gün': '7.044 gün', 'Toplam gün': '9.862 gün' } },
    { in: { baslangic: '2026-12-31', bitis: '2026-01-01' }, error: true },
    { in: { baslangic: '2026-01-01', bitis: '31.02.2026' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanına dönemin ilk gününü, "Bitiş tarihi" alanına son gününü girin.',
    '"Hesapla" düğmesine basın. İlk satırda dönemdeki toplam hafta sonu günü (cumartesi ve pazarların toplamı) görünür.',
    'Cumartesi ve pazar sayılarını ayrı ayrı görmek için alttaki iki satıra bakın; "Tam hafta sonu" satırı ikisi de dönem içinde kalan cumartesi-pazar çiftlerini sayar.',
    'Dönemdeki çalışma günü sayısına kabaca ulaşmak için "Hafta içi gün" satırını kullanın; resmî tatilleri bu sayıdan kendiniz düşmelisiniz.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılır?', p: [
      'Araç günleri tek tek saymaz; haftanın yedi günde bir tekrar etmesinden yararlanır. Önce dönemdeki toplam gün sayısı bulunur (bitiş − başlangıç + 1). Bu sayı yediye bölünür: bölüm, dönemdeki <strong>tam hafta</strong> sayısıdır ve her tam haftada kesin olarak bir cumartesi ile bir pazar vardır. Kalan (0 ile 6 arası) ise dönemin sonunda artan günlerdir; bu günlerin hangileri olduğu başlangıç gününe bakılarak belirlenir ve içlerinde cumartesi ya da pazar varsa sayıya eklenir.',
      'Formülle yazarsak: toplam gün <code>n</code>, tam hafta <code>t = n ÷ 7</code> (tam bölüm), artan <code>k = n mod 7</code> olsun. Başlangıç gününden cumartesiye kadar geçen gün sayısı <code>k</code>\'den küçükse cumartesi sayısı <code>t + 1</code>, değilse <code>t</code> olur. Pazar için de aynı kontrol yapılır.',
    ] },
    { h: 'Çözümlü örnek: Ocak 2026', p: [
      '1 Ocak 2026 Perşembe günüdür ve ay 31 gün çeker. 31 ÷ 7 = 4 tam hafta, kalan 3 gündür. Dört tam hafta 4 cumartesi ve 4 pazar demektir. Artan üç gün, başlangıç günüyle aynı sırayı izler: perşembe, cuma, cumartesi. Bunların içinde bir cumartesi vardır, pazar yoktur. Sonuç: <strong>5 cumartesi, 4 pazar</strong>, toplam 9 hafta sonu günü ve 31 − 9 = 22 hafta içi gün.',
      'Ayın son günü olan 31 Ocak cumartesidir ve onu izleyen pazar şubata düşer. Bu yüzden "Tam hafta sonu" satırı 5 değil 4 gösterir: dönem içinde hem cumartesisi hem pazarı bulunan hafta sonu sayısı dörttür. Tüm 2026 yılı için aynı hesap 52 cumartesi, 52 pazar, 104 hafta sonu günü ve 261 hafta içi gün verir.',
    ] },
    { h: '"Tam hafta sonu" satırı ne anlatır?', p: [
      'Cumartesi ve pazar sayıları her zaman eşit çıkmaz. Dönem pazar günü başlıyorsa o pazarın cumartesisi dışarıda kalır; cumartesi günü bitiyorsa o cumartesinin pazarı dışarıda kalır. Tatil ya da şehir dışı gezi planlarken işe yarayan sayı çoğunlukla ikisinin birlikte bulunduğu hafta sonlarıdır. Araç bunu, bitiş günü cumartesi ise cumartesi sayısından bir düşerek bulur; çünkü dönem içindeki her cumartesinin ertesi günü, son gün cumartesi olmadıkça yine dönem içindedir.',
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      '<strong>Geri sayım:</strong> "Düğüne, sınava ya da tatile kaç hafta sonu kaldı?" sorusunun cevabı; hazırlık işlerini hafta sonlarına bölmek için.',
      '<strong>Hafta sonu çalışanlar:</strong> yalnızca cumartesi-pazar çalışılan ek işlerde, kurslarda ve özel derslerde dönem boyunca kaç gün çalışılacağını görmek için.',
      '<strong>Kurs ve antrenman planı:</strong> hafta sonu yapılan sürücü kursu, dil kursu ya da spor okulu programlarında toplam ders gününü hesaplamak için.',
      '<strong>Proje planlama:</strong> hafta içi gün sayısından resmî tatilleri düşerek yaklaşık iş günü sayısına ulaşmak için.',
      '<strong>Kiralama ve konaklama:</strong> hafta sonu fiyatı farklı olan otel, araç ya da salon kiralamalarında kaç günün yüksek tarifeye girdiğini saymak için.',
      '<strong>Okul tatilleri:</strong> yaz tatili ya da ara tatil boyunca çocukla geçirilecek hafta sonlarını planlamak için.',
    ] },
    { h: 'Hızlı başvuru: bir ayda ve bir yılda kaç hafta sonu olur?', p: [
      'Bir ay 28 ile 31 gün arasında sürdüğünden her ayda en az 4 cumartesi ve 4 pazar bulunur. 29, 30 ya da 31 gün çeken aylarda, ayın ilk günlerine denk gelen haftanın günlerinden biri, ikisi ya da üçü beşinci kez tekrar eder. 31 günlük bir ay cuma günü başlarsa hem cumartesi hem pazar beşer kez görülür ve ayda 10 hafta sonu günü olur; bu, bir ay için mümkün olan en yüksek sayıdır. En düşük sayı 8\'dir.',
      'Bir yıl 52 tam hafta ve 1 gün (artık yıllarda 2 gün) sürer. Bu nedenle bir yılda en az 104, en fazla 106 hafta sonu günü bulunur. Artan gün ya da günler cumartesi-pazara denk gelirse sayı 105 ya da 106\'ya çıkar.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç hafta sonunu cumartesi ve pazar olarak kabul eder; bu, Türkiye\'deki yaygın çalışma düzenine uygundur. Cumartesi günü çalışılan işyerlerinde ya da hafta sonunun farklı günlere denk geldiği ülkelerde sonuçları buna göre yorumlamak gerekir: böyle durumlarda cumartesi ve pazar sayıları ayrı satırlarda verildiği için kendi toplamınızı kolayca çıkarabilirsiniz.',
      'Resmî ve dinî bayramlar, arife günleri ve idari izinler hesaba katılmaz. Bu günlerin tarihleri yıldan yıla değiştiği ve bir kısmı hafta sonuna denk geldiği için, kesin iş günü hesabında o yılın resmî tatil takvimine ayrıca bakılmalıdır. Hesap Miladi takvime göre yapılır ve başlangıç ile bitiş günlerinin ikisini de sayar; son günü dışarıda bırakmak istiyorsanız bitiş tarihini bir gün geri alın.',
    ] },
  ],
  faq: [
    ['Başlangıç ve bitiş günleri sayılıyor mu?', 'Evet, ikisi de dahildir. Cumartesi başlayıp pazar biten iki günlük bir dönem için sonuç 2 hafta sonu günü ve 1 tam hafta sonudur.'],
    ['Bir yılda kaç hafta sonu vardır?', 'Bir yılda 52 ya da 53 cumartesi ve 52 ya da 53 pazar bulunur; toplam hafta sonu günü 104 ile 106 arasında değişir. 2026 yılında 52 cumartesi ve 52 pazar vardır.'],
    ['Cumartesi ve pazar sayıları neden farklı çıkabiliyor?', 'Dönem haftanın ortasında başlayıp bittiğinde uçlardaki hafta sonlarından biri yarım kalabilir. Örneğin cumartesi günü biten bir dönemde son cumartesi sayılır, ama ertesi günkü pazar dönem dışındadır.'],
    ['Hafta içi gün sayısı iş günü sayısıyla aynı mı?', 'Tam olarak değil. Hafta içi sayısı pazartesiden cumaya kadar olan günleri verir; resmî tatiller düşülmez. İş günü için bu sayıdan dönemdeki hafta içine denk gelen tatilleri çıkarın.'],
    ['Cumartesi günü de çalışıyorum, nasıl hesaplarım?', 'Çalışma günü sayınız için "Hafta içi gün" değerine "Cumartesi sayısı" değerini ekleyin. Tatil günleriniz yalnızca "Pazar sayısı" satırındaki kadardır.'],
    ['Çok uzun dönemler için de çalışır mı?', 'Evet. Hesap günleri tek tek dolaşmadan bölme işlemiyle yapıldığı için onlarca yıllık aralıklarda da anında sonuç verir. Örneğin 1 Ocak 2000 ile 31 Aralık 2026 arasında 2.818 hafta sonu günü vardır.'],
    ['Bitiş tarihini başlangıçtan önce yazarsam ne olur?', 'Araç hata iletisi gösterir ve tarihlerin yerini değiştirmenizi ister. Aynı günü iki alana da yazarsanız tek günlük dönem olarak hesaplanır.'],
    ['Girdiğim tarihler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; tarihler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['is-gunu-hesapla', 'hafta-farki-hesapla', 'hangi-gun-hesapla', 'gun-sayisi-ekle-is-gunu', 'ay-kac-gun'],
};
