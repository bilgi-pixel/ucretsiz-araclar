export default {
  slug: 'butunleme-notu-hesapla',
  title: 'Bütünleme Geçme Notu Hesaplama',
  h1Tail: 'bütte kaç almalıyım?',
  pageTitle: 'Bütünleme Geçme Notu Hesaplama – Bütten Kaç Almam Gerekir?',
  description: 'Vize notunuzu ve ağırlıkları girin; dersi geçmek için bütünleme sınavından almanız gereken en düşük notu, barajı da hesaba katarak öğrenin.',
  card: 'Vize notunuza göre bütünleme sınavından en az kaç almanız gerektiğini, baraj ve geçme notuyla birlikte hesaplayın.',
  category: 'egitim',
  keywords: ['bütünleme notu hesaplama', 'bütten kaç almam lazım', 'bütünleme geçme notu', 'büt hesaplama', 'vize bütünleme ortalama', 'bütünleme barajı', 'üniversite bütünleme hesaplama'],
  lead: 'Vize notunuzu, vizenin ağırlığını ve dersin geçme notunu yazın; araç bütünleme sınavından almanız gereken <strong>en düşük notu</strong> hesaplasın. Bütünleme notunuzu da girerseniz dönem sonu ortalamanızı ve geçip geçmediğinizi gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'vize', label: 'Vize (ara sınav) notu', type: 'number', placeholder: 'Örn. 40', hint: 'Birden fazla ara sınav ya da ödev varsa ağırlıklı ortalamasını yazın.' },
    { id: 'agirlik', label: 'Vizenin ağırlığı (%)', type: 'number', value: '40', hint: 'Kalan yüzde bütünleme sınavına aittir.' },
    { id: 'gecme', label: 'Geçme notu (ortalama)', type: 'number', value: '50' },
    { id: 'baraj', label: 'Bütünleme barajı (yoksa 0)', type: 'number', value: '50', hint: 'Bütünleme sınavından alınması zorunlu en düşük not.' },
    { id: 'but', label: 'Bütünleme notunuz (isteğe bağlı)', type: 'number', placeholder: 'Sınav açıklandıysa yazın' },
  ],
  compute(v, h) {
    const vize = h.nonneg(v.vize, 'Vize notu');
    const w = h.pos(v.agirlik, 'Vizenin ağırlığı');
    const gecme = h.pos(v.gecme, 'Geçme notu');
    const baraj = h.nonneg(h.opt(v.baraj, 0, 'Bütünleme barajı') + '', 'Bütünleme barajı');
    if (vize > 100) h.err('Vize notu 0 ile 100 arasında olmalı.');
    if (w >= 100) h.err('Vizenin ağırlığı 100\'den küçük olmalı; kalan pay bütünlemeye aittir.');
    if (gecme > 100) h.err('Geçme notu 100\'den büyük olamaz.');
    if (baraj > 100) h.err('Bütünleme barajı 100\'den büyük olamaz.');
    const wb = 100 - w;
    const katki = vize * w / 100;
    const ham = (gecme - katki) / (wb / 100);
    const gereken = Math.max(ham, baraj, 0);
    const yuvar = Math.ceil(gereken * 100 - 1e-7) / 100;
    const mumkun = yuvar <= 100 + 1e-9;
    let durum;
    if (!mumkun) durum = 'Bütünlemeden 100 alınsa bile geçme notuna ulaşılamıyor';
    else if (ham <= baraj + 1e-9 && baraj > 0) durum = 'Baraj belirleyici: barajı aşmanız yeterli';
    else if (yuvar <= 0) durum = 'Vize notu tek başına yetiyor';
    else durum = 'Ortalama belirleyici: bu notla ortalama geçme notuna ulaşır';
    const rows = [
      ['Gereken en düşük bütünleme notu', mumkun ? h.fmt(yuvar, 2) : 'Geçmek mümkün değil'],
      ['Durum', durum],
      ['Vizeden gelen katkı', h.fmt(katki, 2) + ' puan'],
      ['Bütünlemenin ağırlığı', '%' + h.fmt(wb, 2)],
      ['Bütünlemeden 100 alınırsa ortalama', h.fmt(katki + wb, 2)],
    ];
    if (String(v.but ?? '').trim() !== '') {
      const b = h.nonneg(v.but, 'Bütünleme notu');
      if (b > 100) h.err('Bütünleme notu 0 ile 100 arasında olmalı.');
      const ort = katki + b * wb / 100;
      const gecti = ort >= gecme - 1e-9 && b >= baraj - 1e-9;
      rows.push(['Dönem sonu ortalaması', h.fmt(ort, 2)]);
      rows.push(['Sonuç', gecti ? 'Geçti' : (b < baraj - 1e-9 ? 'Kaldı (baraj altı)' : 'Kaldı (ortalama yetersiz)')]);
    }
    return { rows, note: 'Bütünleme notu final notunun yerine geçer varsayılmıştır. Bağıl değerlendirme (çan eğrisi) uygulanan derslerde sonuç farklı olabilir; kendi yönetmeliğinizi kontrol edin.' };
  },
  cases: [
    { in: { vize: '40', agirlik: '40', gecme: '50', baraj: '50' }, out: { 'Gereken en düşük bütünleme notu': '56,67', 'Vizeden gelen katkı': '16 puan', 'Bütünlemenin ağırlığı': '%60' } },
    { in: { vize: '70', agirlik: '40', gecme: '50', baraj: '50' }, out: { 'Gereken en düşük bütünleme notu': '50', 'Durum': 'Baraj belirleyici: barajı aşmanız yeterli' } },
    { in: { vize: '10', agirlik: '50', gecme: '60', baraj: '0' }, out: { 'Gereken en düşük bütünleme notu': 'Geçmek mümkün değil', 'Bütünlemeden 100 alınırsa ortalama': '55' } },
    { in: { vize: '60', agirlik: '40', gecme: '60', baraj: '0' }, out: { 'Gereken en düşük bütünleme notu': '60' } },
    { in: { vize: '40', agirlik: '40', gecme: '50', baraj: '50', but: '65' }, out: { 'Dönem sonu ortalaması': '55', 'Sonuç': 'Geçti' } },
    { in: { vize: '30', agirlik: '30', gecme: '50', baraj: '0' }, out: { 'Gereken en düşük bütünleme notu': '58,58' } },
    { in: { vize: '90', agirlik: '40', gecme: '50', baraj: '50', but: '45' }, out: { 'Dönem sonu ortalaması': '63', 'Sonuç': 'Kaldı (baraj altı)' } },
    { in: { vize: '120', agirlik: '40', gecme: '50', baraj: '50' }, error: true },
    { in: { vize: '40', agirlik: '100', gecme: '50', baraj: '50' }, error: true },
  ],
  howto: [
    'Vize notunuzu yazın. Dönem içinde birden fazla ara sınav, ödev ya da proje varsa bunların kendi içindeki ağırlıklı ortalamasını tek not olarak girin.',
    'Vizenin dönem sonu notuna etkisini yüzde olarak belirtin. Çoğu derste bu oran yüzde 40\'tır; ders izlencesinde farklı yazıyorsa onu kullanın.',
    'Dersi geçmek için gereken ortalamayı ve varsa bütünleme sınavı barajını yazın. Baraj uygulanmıyorsa bu alana 0 girin.',
    '"Hesapla" düğmesine basın; bütünlemeden almanız gereken en düşük not ve bunu neyin belirlediği sonuç kutusunda görünür.',
    'Sınav açıklandıktan sonra bütünleme notunuzu da yazarak ortalamanızı ve geçme durumunuzu kontrol edin.',
  ],
  sections: [
    { h: 'Bütünleme sınavı nedir, notu nasıl etki eder?', p: [
      'Bütünleme, dönem sonu (final) sınavına giremeyen ya da final sonunda dersten başarısız olan öğrencilere tanınan ikinci sınav hakkıdır. Üniversitelerin büyük bölümünde bütünleme notu final notunun <strong>yerine geçer</strong>: finalden aldığınız not silinir, dönem sonu ortalaması vize ile bütünleme notundan yeniden hesaplanır. Bu yüzden "finalim kötüydü, bütte ne almalıyım" sorusunun yanıtı final notunuza değil, vize notunuza ve ağırlıklara bağlıdır.',
      'Bazı kurumlarda bütünlemeye girildiğinde final notu daha yüksek olsa bile bütünleme notu geçerli sayılır. Yani not yükseltmek için girilen bir bütünleme, kötü geçerse durumu daha da zorlaştırabilir. Sınava girmeden önce gereken notu görmek bu kararı vermenize yardımcı olur.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Dönem sonu ortalaması şu şekilde bulunur: <strong>ortalama = vize × vize ağırlığı + bütünleme × bütünleme ağırlığı</strong>. Ağırlıklar toplamı yüzde 100 olduğu için bütünlemenin ağırlığı, 100 eksi vize ağırlığıdır. Geçmek için gereken bütünleme notunu bulmak üzere eşitlik tersine çevrilir: <strong>gereken not = (geçme notu − vize × vize ağırlığı) ÷ bütünleme ağırlığı</strong>.',
      'Bulunan değer baraj notundan küçükse baraj geçerli olur; çünkü ortalamanız tutsa bile sınavın kendisinden baraj kadar almak zorundasınız. Araç bu iki değerden büyük olanı gösterir ve hangisinin belirleyici olduğunu "Durum" satırında yazar. Sonuç yukarı yuvarlanır; böylece gösterilen notu aldığınızda ortalama geçme notunun altında kalmaz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Vize notunuz 40, vizenin ağırlığı yüzde 40, geçme notu 50 ve bütünleme barajı 50 olsun. Vizeden gelen katkı 40 × 0,40 = 16 puandır. Geriye 50 − 16 = 34 puan kalır ve bunu yüzde 60 ağırlıklı sınavdan toplamanız gerekir: 34 ÷ 0,60 = 56,67. Bu değer barajın üstünde olduğu için en az 56,67, pratikte 57 almanız gerekir.',
      'Vize notunuz 70 olsaydı katkı 28 puan olurdu; kalan 22 puan için 22 ÷ 0,60 = 36,67 yeterdi. Ancak baraj 50 olduğu için 36,67 almak sizi geçirmez; araç bu durumda sonucu 50 olarak verir ve barajın belirleyici olduğunu belirtir.',
      'Vize 10, vize ağırlığı yüzde 50 ve geçme notu 60 ise bütünlemeden 100 alsanız bile ortalama 5 + 50 = 55 olur. Bu durumda araç "Geçmek mümkün değil" sonucunu verir; dersi yeniden almayı planlamak daha gerçekçi olacaktır.',
    ] },
    { h: 'Ağırlıklar ve baraj hakkında bilinmesi gerekenler', ul: [
      'En yaygın dağılım vize yüzde 40, final ya da bütünleme yüzde 60\'tır; ancak yüzde 30–70 ve yüzde 50–50 uygulayan dersler de vardır.',
      'Ödev, proje, kısa sınav gibi dönem içi çalışmalar genellikle vize payının içinde sayılır. Bunların ortalamasını önce kendi ağırlıklarıyla hesaplayın.',
      'Baraj, bazı kurumlarda final ve bütünleme için ayrı ayrı belirlenir; bazılarında ise yalnızca ortalama şartı vardır.',
      'Geçme notu mutlak değerlendirmede sabittir; bağıl değerlendirmede sınıfın başarısına göre harf notu oluşur ve tek bir eşik yoktur.',
      'Koşullu geçme (ör. DC, DD) uygulanan sistemlerde ortalama eşiği ile genel not ortalaması şartı birlikte aranabilir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En sık görülen hata, final notunu da hesaba katmaktır. Bütünlemeye girildiğinde final notu çoğu yönetmelikte geçersiz olur; ortalamayı vize ile final ve bütünlemenin üçünden hesaplamak yanlış sonuç verir. İkinci hata, barajı unutmaktır: yüksek vize notuyla ortalama rahatça tutsa bile sınavdan baraj altı almak dersten kalmaya yol açabilir.',
      'Üçüncü hata yuvarlama beklentisidir. Bazı kurumlar 49,5 ortalamayı 50\'ye yuvarlar, bazıları yuvarlamaz. Araç yuvarlamaya güvenmeden, ortalamayı tam olarak geçme notuna ulaştıran değeri gösterir. Sınırdaysanız bir iki puan fazlasını hedeflemek daha güvenlidir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Hesap, notların 100\'lük sistemde olduğunu ve bütünlemenin finalin yerine geçtiğini varsayar. Dörtlük sistemdeki harf notu karşılıkları, çan eğrisi, devamsızlık şartı ve uygulama sınavı gibi ek koşullar hesaba katılmaz. Ağırlıklar ve baraj kurumdan kuruma, hatta dersten derse değişebildiği için kesin bilgi için üniversitenizin eğitim-öğretim ve sınav yönetmeliğini ve dersin izlencesini kontrol edin.',
    ] },
  ],
  faq: [
    ['Bütünlemeden kaç alırsam geçerim?', 'Bu, vize notunuza ve vizenin ağırlığına bağlıdır. Vize yüzde 40, bütünleme yüzde 60 ve geçme notu 50 ise vizeden 40 alan bir öğrencinin en az 56,67 alması gerekir. Kendi değerlerinizi girerek kesin sonucu görebilirsiniz.'],
    ['Bütünleme notu final notunun yerine mi geçer?', 'Üniversitelerin çoğunda evet; bütünlemeye giren öğrencinin final notu yerine bütünleme notu kullanılır. Ancak uygulama kuruma göre değişebilir, yönetmeliğinize bakmanız gerekir.'],
    ['Bütünleme barajı nedir?', 'Ortalamanız ne olursa olsun bütünleme sınavından almanız gereken en düşük nottur. Birçok kurumda 50 olarak uygulanır; bazı kurumlarda daha düşüktür ya da hiç yoktur. Baraj yoksa ilgili alana 0 yazın.'],
    ['Vizeye girmediysem ne yazmalıyım?', 'Vizeye girilmediyse not genellikle 0 sayılır. Vize alanına 0 yazdığınızda araç, tüm ortalamayı bütünlemeden toplamanız gerektiğini hesaplar; yüzde 60 ağırlıkta 50 ortalama için 83,34 gerekir.'],
    ['Sonuç 100\'den büyük çıkarsa ne anlama gelir?', 'Bütünlemeden tam not alsanız bile ortalamanın geçme notuna ulaşmadığı anlamına gelir. Araç bu durumda "Geçmek mümkün değil" yazar ve tam notla ulaşabileceğiniz ortalamayı ayrıca gösterir.'],
    ['Birden fazla vize ve ödev varsa nasıl girerim?', 'Dönem içi notların her birini kendi yüzdesiyle çarpıp toplayın, sonra dönem içi toplam yüzdeye bölün. Örneğin yüzde 25 ağırlıklı vizeden 60, yüzde 15 ağırlıklı ödevden 80 aldıysanız (60 × 25 + 80 × 15) ÷ 40 = 67,5 yazarsınız.'],
    ['Çan eğrisi uygulanan derslerde bu hesap geçerli mi?', 'Kısmen. Araç ham ortalamanızı doğru hesaplar; ancak bağıl değerlendirmede harf notu sınıf ortalamasına ve standart sapmaya göre belirlendiği için sabit bir geçme notu yoktur. Sonucu yalnızca yaklaşık bir gösterge olarak kullanın.'],
    ['Girdiğim notlar kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; notlarınız sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.'],
  ],
  related: ['sinav-notu-hesapla', 'kredili-ortalama-hesapla', 'hedef-ortalama-hesapla', '100luk-4luk-cevir', 'can-egrisi-hesapla'],
};
