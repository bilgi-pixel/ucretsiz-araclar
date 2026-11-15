export default {
  slug: 'temettu-verimi-hesapla',
  title: 'Temettü Verimi Hesaplama',
  h1Tail: 'brüt ve net',
  pageTitle: 'Temettü Verimi Hesaplama – Brüt ve Net Temettü Verimi',
  description: 'Hisse başına temettüyü ve hisse fiyatını yazın; brüt ve net temettü verimini, stopaj sonrası hisse başına tutarı ve lot sayınıza göre toplam temettüyü hesaplayın.',
  card: 'Hisse başına temettü ve fiyattan brüt/net temettü verimini, adet girerseniz toplam temettü tutarını bulun.',
  category: 'finans',
  keywords: ['temettü verimi hesaplama', 'temettü verimi nedir', 'net temettü hesaplama', 'hisse başına temettü', 'kâr payı verimi', 'temettü stopaj hesaplama', 'temettü verimliliği'],
  lead: 'Bir hissenin dağıttığı kâr payının, hisse fiyatına göre yüzde kaç getiri sağladığını hesaplayın. Hisse başına temettüyü ve fiyatı yazmanız yeterli; stopaj oranı ve elinizdeki adet bilgisini eklerseniz <strong>net temettü verimi</strong> ile hesabınıza geçecek toplam tutarı da görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'temettu', label: 'Hisse başına brüt temettü (TL)', type: 'number', placeholder: 'Örn. 2,5', hint: 'Şirketin 1 TL nominal değerli pay başına açıkladığı brüt tutar.' },
    { id: 'fiyat', label: 'Hisse fiyatı (TL)', type: 'number', placeholder: 'Örn. 50', hint: 'Güncel fiyat ya da kendi alış maliyetiniz.' },
    { id: 'stopaj', label: 'Stopaj oranı (%, isteğe bağlı)', type: 'number', placeholder: 'Örn. 10', hint: 'Geçerli güncel oranı yazın; boş bırakılırsa yalnızca brüt hesaplanır.' },
    { id: 'adet', label: 'Hisse adedi (isteğe bağlı)', type: 'number', placeholder: 'Örn. 1000' },
  ],
  compute(v, h) {
    const t = h.nonneg(v.temettu, 'Hisse başına brüt temettü');
    const f = h.pos(v.fiyat, 'Hisse fiyatı');
    const bos = (s) => String(s ?? '').trim() === '';
    const st = bos(v.stopaj) ? null : h.nonneg(v.stopaj, 'Stopaj oranı');
    if (st !== null && st > 100) h.err('"Stopaj oranı" 0 ile 100 arasında olmalı.');
    const adet = bos(v.adet) ? null : h.pos(v.adet, 'Hisse adedi');
    const brutVerim = (t / f) * 100;
    const rows = [['Brüt temettü verimi', '%' + h.fmt(brutVerim, 2)]];
    let net = t;
    if (st !== null) {
      net = t * (1 - st / 100);
      rows.push(['Net temettü verimi', '%' + h.fmt((net / f) * 100, 2)]);
      rows.push(['Hisse başına net temettü', h.fmt(net, 4) + ' TL']);
      rows.push(['Hisse başına stopaj', h.fmt(t - net, 4) + ' TL']);
    }
    if (adet !== null) {
      rows.push(['Toplam brüt temettü', h.para(t * adet)]);
      if (st !== null) rows.push(['Toplam net temettü', h.para(net * adet)]);
      rows.push(['Hisselerin toplam değeri', h.para(f * adet)]);
    }
    return { rows, note: 'Temettü verimi = hisse başına temettü ÷ hisse fiyatı × 100. Geçmişte dağıtılan temettü, gelecekte de dağıtılacağının güvencesi değildir.' };
  },
  cases: [
    { in: { temettu: '5', fiyat: '100' }, out: { 'Brüt temettü verimi': '%5' } },
    { in: { temettu: '2,5', fiyat: '50', stopaj: '10' }, out: { 'Brüt temettü verimi': '%5', 'Net temettü verimi': '%4,5', 'Hisse başına net temettü': '2,25 TL', 'Hisse başına stopaj': '0,25 TL' } },
    { in: { temettu: '1,2', fiyat: '40', adet: '1000' }, out: { 'Brüt temettü verimi': '%3', 'Toplam brüt temettü': '1.200,00 TL', 'Hisselerin toplam değeri': '40.000,00 TL' } },
    { in: { temettu: '4', fiyat: '80', stopaj: '15', adet: '250' }, out: { 'Brüt temettü verimi': '%5', 'Net temettü verimi': '%4,25', 'Toplam brüt temettü': '1.000,00 TL', 'Toplam net temettü': '850,00 TL' } },
    { in: { temettu: '3', fiyat: '24' }, out: { 'Brüt temettü verimi': '%12,5' } },
    { in: { temettu: '0,75', fiyat: '18,5' }, out: { 'Brüt temettü verimi': '%4,05' } },
    { in: { temettu: '0', fiyat: '100' }, out: { 'Brüt temettü verimi': '%0' } },
    { in: { temettu: '5', fiyat: '0' }, error: true },
    { in: { temettu: '5', fiyat: '100', stopaj: '120' }, error: true },
  ],
  howto: [
    '"Hisse başına brüt temettü" alanına şirketin açıkladığı, pay başına düşen brüt kâr payını lira olarak yazın. Bu bilgi genel kurul kararında ve şirketin kâr dağıtım duyurusunda yer alır.',
    '"Hisse fiyatı" alanına verimi hangi fiyata göre ölçmek istiyorsanız onu girin: bugünkü borsa fiyatı ya da hisseyi aldığınız ortalama maliyet.',
    'Net tutarı görmek için "Stopaj oranı" alanına ödeme tarihinde geçerli olan oranı yazın. Oran zaman içinde değişebildiği için araç sabit bir değer varsaymaz.',
    'Kaç hisseniz olduğunu "Hisse adedi" alanına yazarsanız hesabınıza geçecek toplam brüt ve net tutar da hesaplanır.',
    '"Hesapla" düğmesine basın; sonuçları dilerseniz "Sonucu kopyala" ile panoya alın.',
  ],
  sections: [
    { h: 'Temettü verimi nedir?', p: [
      'Temettü, bir şirketin dönem kârından ortaklarına dağıttığı paydır; kâr payı olarak da adlandırılır. Temettü verimi ise bu ödemenin hisse fiyatına oranıdır ve yatırımcıya "bu hisseye bugünkü fiyattan yatırdığım her 100 lira için yılda kaç lira kâr payı alırım" sorusunun cevabını verir.',
      'Verim, hisse fiyatındaki artış ya da azalışı içermez; yalnızca nakit olarak ele geçen kâr payını ölçer. Bu nedenle bir hissenin toplam getirisini bulmak için temettü verimine fiyat değişimini de eklemek gerekir. Düzenli gelir arayan yatırımcılar, kira getirisi ya da mevduat faiziyle kıyaslama yaparken bu oranı kullanır.',
    ] },
    { h: 'Formül', p: [
      'Hesap tek adımdır: <strong>Temettü verimi = Hisse başına temettü ÷ Hisse fiyatı × 100</strong>. Hisse başına temettü, şirketin dağıttığı toplam tutarın pay sayısına bölünmesiyle bulunur ve duyurularda doğrudan verilir.',
      'Kâr payı üzerinden kaynakta kesinti (stopaj) yapılıyorsa hesabınıza geçen tutar brüt tutardan düşüktür: <strong>Net temettü = Brüt temettü × (1 − Stopaj oranı)</strong>. Net temettü verimi de bu net tutarın fiyata bölünmesiyle elde edilir. Stopaj oranı mevzuatla belirlenir ve değişebilir; hesap yapmadan önce güncel oranı aracı kurumunuzdan ya da şirket duyurusundan teyit edin.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir şirket pay başına brüt 2,50 TL temettü açıklamış, hisse borsada 50 TL\'den işlem görüyor olsun. Brüt temettü verimi 2,50 ÷ 50 × 100 = <strong>%5</strong> olur.',
      'Stopaj oranı %10 kabul edilirse pay başına 0,25 TL kesilir ve net temettü 2,25 TL\'ye iner. Net temettü verimi 2,25 ÷ 50 × 100 = <strong>%4,5</strong> eder.',
      'İkinci bir örnek: pay başına brüt 4 TL dağıtan ve 80 TL\'den işlem gören bir hisseden 250 adet tutuyorsunuz. Brüt verim yine %5\'tir. Toplam brüt temettü 4 × 250 = 1.000 TL; %15 stopaj varsayımıyla net tutar 850 TL, net verim %4,25 olur.',
    ] },
    { h: 'Güncel fiyata göre mi, maliyete göre mi?', p: [
      'Temettü verimi iki farklı fiyatla hesaplanabilir ve ikisi farklı sorulara cevap verir. <strong>Güncel fiyata göre verim</strong>, hisseyi bugün alacak birinin elde edeceği oranı gösterir ve hisseleri birbiriyle karşılaştırmak için kullanılır. <strong>Maliyete göre verim</strong> ise sizin alış fiyatınız üzerinden hesaplanır ve kendi yatırımınızın size ne kazandırdığını anlatır.',
      'Yıllar önce 20 TL\'den aldığınız bir hisse bugün 80 TL ise ve 4 TL temettü dağıtıyorsa güncel verim %5, sizin maliyetinize göre verim ise %20\'dir. Araçta "Hisse fiyatı" alanına hangisini yazarsanız sonuç ona göre çıkar.',
    ] },
    { h: 'Yüksek temettü verimi her zaman iyi midir?', p: [
      'Verim bir kesirdir ve iki yoldan yükselir: temettü artar ya da fiyat düşer. Hisse fiyatı şirketle ilgili olumsuz beklentiler yüzünden sert düştüyse geçmiş temettüye göre hesaplanan verim çok yüksek görünür, ama şirket ertesi yıl temettüyü azaltabilir ya da hiç dağıtmayabilir. Buna yatırım literatüründe temettü tuzağı denir.',
      'Bu yüzden verimi tek başına değil, şu sorularla birlikte değerlendirmek gerekir: Şirket kaç yıldır düzenli dağıtım yapıyor? Dağıtılan tutar net kârın ne kadarı? Dağıtım faaliyet kârından mı, tek seferlik bir varlık satışından mı geliyor? Borçluluk temettüyü sürdürmeye izin veriyor mu?',
    ] },
    { h: 'Dikkat edilecek ayrıntılar', ul: [
      'Türkiye\'de pay başına temettü çoğunlukla 1 TL nominal değerli pay üzerinden açıklanır; borsada işlem birimi olan lot da 1 paya karşılık gelir.',
      'Temettü dağıtım tarihinde hisse fiyatı, dağıtılan brüt tutar kadar düzeltilir; temettü "bedava" bir ek kazanç değil, şirket değerinin bir kısmının nakde dönmesidir.',
      'Bedelsiz pay dağıtımı nakit temettü değildir ve bu hesaba girmez.',
      'Şirket yıl içinde birden fazla taksitle ödeme yapıyorsa yıllık verimi bulmak için taksitlerin toplamını yazın.',
      'Açıklanan oran "brüt %250" gibi nominal değere göre verilmişse bu, pay başına 2,50 TL demektir; temettü verimiyle karıştırılmamalıdır.',
    ] },
    { h: 'Uyarı', p: [
      'Bu sayfadaki hesap yalnızca yazdığınız rakamlar üzerinden aritmetik yapar; herhangi bir hisse için alım satım önerisi içermez. Geçmiş temettüler gelecekteki ödemelerin garantisi değildir. Vergi yükümlülükleriniz kişisel durumunuza göre değişebilir; yatırım ve vergi kararlarında yetkili bir yatırım danışmanına ya da mali müşavire başvurun.',
    ] },
  ],
  faq: [
    ['Temettü verimi nasıl hesaplanır?', 'Hisse başına temettü, hisse fiyatına bölünür ve 100 ile çarpılır. Pay başına 3 TL dağıtan ve 24 TL\'den işlem gören bir hissede verim 3 ÷ 24 × 100 = %12,5 olur.'],
    ['Brüt ve net temettü arasındaki fark nedir?', 'Brüt temettü, şirketin açıkladığı kesinti öncesi tutardır. Net temettü, kaynakta kesilen stopaj düşüldükten sonra hesabınıza geçen tutardır. Net verimi görmek için stopaj oranı alanını doldurun.'],
    ['Stopaj oranını neden kendim giriyorum?', 'Oran mevzuatla belirlenir ve zaman içinde değişmiştir; yatırımcının türüne göre de farklılaşabilir. Yanlış bir sabit değerle hesap yapmamak için araç oranı sizden ister.'],
    ['Temettü verimi yüzde kaç olursa iyidir?', 'Kesin bir eşik yoktur. Oran; enflasyon, mevduat faizi ve benzer şirketlerin verimiyle birlikte değerlendirilir. Sıra dışı yüksek bir verim, fiyatın düşmüş olmasından kaynaklanıyor olabilir ve ayrıca incelenmelidir.'],
    ['Temettü verimi ile temettü dağıtım oranı aynı şey mi?', 'Hayır. Verim, temettüyü hisse fiyatına oranlar. Dağıtım oranı ise dağıtılan temettünün şirketin net kârına oranıdır ve kârın ne kadarının ortaklara verildiğini gösterir.'],
    ['Nominal değere göre açıklanan yüzdeyi nasıl çeviririm?', 'Şirket "brüt %180 kâr payı" açıkladıysa bu, 1 TL nominal değerli pay başına 1,80 TL demektir. Araca 1,8 yazın; verim, bu tutarın borsa fiyatına oranıdır.'],
    ['Yabancı para cinsinden hisselerde kullanılabilir mi?', 'Evet. Temettü ve fiyat aynı para biriminde olduğu sürece verim yüzdesi doğrudur. Yalnızca toplam tutar satırlarındaki "TL" ifadesini kendi para biriminiz olarak okuyun.'],
    ['Girdiğim hisse bilgileri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız temettü, fiyat ve adet bilgileri sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['fiyat-kazanc-orani-hesapla', 'hisse-ortalama-maliyet-hesapla', 'yatirim-getirisi-hesapla', 'kira-getirisi-hesapla', 'yillik-bilesik-buyume-hesapla'],
};
