export default {
  slug: 'aku-kullanim-suresi-hesapla',
  title: 'Akü Kullanım Süresi Hesaplama',
  pageTitle: 'Akü Kullanım Süresi Hesaplama – Akü Kaç Saat Dayanır?',
  description: 'Akünün bir yükü kaç saat besleyeceğini hesaplayın. Ah kapasitesi, gerilim, yük, deşarj derinliği ve invertör verimine göre süreyi ve akü akımını verir.',
  card: 'Akünüzün bir cihazı kaç saat çalıştıracağını Ah, gerilim, yük ve deşarj derinliğine göre hesaplayın.',
  category: 'elektrik',
  keywords: ['akü kullanım süresi', 'akü kaç saat dayanır', 'akü hesaplama', '100 ah akü kaç saat gider', 'akü ah hesabı', 'invertör akü süresi', 'karavan akü hesabı'],
  lead: 'Bir akünün belirli bir yükü ne kadar süre besleyebileceğini bulun. Araç, akünün enerji içeriğini (Ah × V) <strong>deşarj derinliği</strong> ve <strong>invertör verimi</strong> ile düzeltir, ardından yüke böler. Yükü watt ya da amper olarak girebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'kapasite', label: 'Akü kapasitesi (Ah)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'gerilim', label: 'Akü gerilimi (V)', type: 'number', value: '12' },
    { id: 'yuk', label: 'Yük', type: 'number', placeholder: 'Örn. 100' },
    { id: 'birim', label: 'Yük birimi', type: 'select', options: [['w', 'Watt (W)'], ['a', 'Amper (A) – akü geriliminde']] },
    { id: 'dod', label: 'Kullanılabilir kapasite / deşarj derinliği (%)', type: 'number', value: '50', hint: 'Akünün ne kadarını boşaltacağınız. Kurşun-asit akülerde ömür için düşük tutulur.' },
    { id: 'verim', label: 'İnvertör / sistem verimi (%)', type: 'number', value: '90', hint: 'Yük doğrudan aküden besleniyorsa 100 yazın.' },
  ],
  compute(v, h) {
    const ah = h.pos(v.kapasite, 'Akü kapasitesi');
    const V = h.pos(v.gerilim, 'Akü gerilimi');
    const yuk = h.pos(v.yuk, 'Yük');
    const dod = h.pos(v.dod, 'Deşarj derinliği');
    const verim = h.pos(v.verim, 'Verim');
    if (dod > 100) h.err('"Deşarj derinliği" yüzde 100\'den büyük olamaz.');
    if (verim > 100) h.err('"Verim" yüzde 100\'den büyük olamaz.');
    const W = v.birim === 'a' ? yuk * V : yuk;
    const kullanilabilir = ah * V * dod / 100;
    const yukeGiden = kullanilabilir * verim / 100;
    const saat = yukeGiden / W;
    const dk = Math.round(saat * 60);
    const akim = W / (verim / 100) / V;
    return {
      rows: [
        ['Çalışma süresi', `${Math.floor(dk / 60)} saat ${dk % 60} dakika`],
        ['Süre (ondalık)', h.fmt(saat, 2) + ' saat'],
        ['Akünün toplam enerjisi', h.fmt(ah * V, 1) + ' Wh'],
        ['Kullanılabilir enerji', h.fmt(kullanilabilir, 1) + ' Wh'],
        ['Yüke ulaşan enerji', h.fmt(yukeGiden, 1) + ' Wh'],
        ['Aküden çekilen akım', h.fmt(akim, 2) + ' A'],
        ['Deşarj hızı', h.fmt(akim / ah, 3) + ' C'],
      ],
      note: 'Hesap, akünün etiket kapasitesini verdiğini varsayar. Yüksek akımda, soğukta ve eskimiş akülerde gerçek süre daha kısadır; sonuç yaklaşık değerdir.',
    };
  },
  cases: [
    { in: { kapasite: '100', gerilim: '12', yuk: '100', birim: 'w', dod: '50', verim: '90' }, out: { 'Çalışma süresi': '5 saat 24 dakika', 'Süre (ondalık)': '5,4 saat', 'Kullanılabilir enerji': '600 Wh', 'Yüke ulaşan enerji': '540 Wh', 'Aküden çekilen akım': '9,26 A' } },
    { in: { kapasite: '200', gerilim: '12', yuk: '300', birim: 'w', dod: '80', verim: '85' }, out: { 'Çalışma süresi': '5 saat 26 dakika', 'Süre (ondalık)': '5,44 saat', 'Yüke ulaşan enerji': '1.632 Wh' } },
    { in: { kapasite: '60', gerilim: '12', yuk: '5', birim: 'a', dod: '100', verim: '100' }, out: { 'Çalışma süresi': '12 saat 0 dakika', 'Aküden çekilen akım': '5 A', 'Deşarj hızı': '0,083 C' } },
    { in: { kapasite: '7', gerilim: '12', yuk: '20', birim: 'w', dod: '100', verim: '100' }, out: { 'Çalışma süresi': '4 saat 12 dakika', 'Akünün toplam enerjisi': '84 Wh' } },
    { in: { kapasite: '100', gerilim: '24', yuk: '480', birim: 'w', dod: '50', verim: '100' }, out: { 'Çalışma süresi': '2 saat 30 dakika', 'Aküden çekilen akım': '20 A', 'Deşarj hızı': '0,2 C' } },
    { in: { kapasite: '100', yuk: '60' }, out: { 'Çalışma süresi': '9 saat 0 dakika' } },
    { in: { kapasite: '100', gerilim: '12', yuk: '0', birim: 'w', dod: '50', verim: '90' }, error: true },
    { in: { kapasite: '100', gerilim: '12', yuk: '100', birim: 'w', dod: '120', verim: '90' }, error: true },
    { in: { kapasite: 'yüz', gerilim: '12', yuk: '100', birim: 'w', dod: '50', verim: '90' }, error: true },
  ],
  howto: [
    'Akünün etiketindeki amper-saat (Ah) değerini ve gerilimini yazın. Araç aküleri çoğunlukla 12 V, büyük sistemler 24 ya da 48 V\'tur.',
    'Besleyeceğiniz cihazların toplam gücünü watt olarak ya da aküden çekilen akımı amper olarak girin ve birimi seçin.',
    'Akünün ne kadarını boşaltmayı planladığınızı "deşarj derinliği" alanına yüzde olarak yazın.',
    'İnvertör kullanıyorsanız verimini girin; cihaz doğrudan akü geriliminde çalışıyorsa 100 yazın.',
    '"Hesapla" düğmesine basın; süreyi saat ve dakika olarak, ayrıca aküden çekilen akımı ve deşarj hızını görün.',
  ],
  sections: [
    { h: 'Akü süresi nasıl hesaplanır?', p: [
      'Akünün kapasitesi amper-saat (Ah) ile verilir; bu değer akünün belirli bir akımı kaç saat verebildiğini anlatır. Enerji içeriğini bulmak için kapasite gerilimle çarpılır: 100 Ah kapasiteli 12 voltluk bir akü kâğıt üzerinde 1.200 watt-saat enerji depolar. Bu enerjinin tamamı kullanılamaz; bir bölümü aküyü korumak için içeride bırakılır, bir bölümü de invertörde ısıya dönüşür.',
    ], ul: [
      '<strong>Kullanılabilir enerji (Wh)</strong> = Ah × V × deşarj derinliği',
      '<strong>Yüke ulaşan enerji (Wh)</strong> = kullanılabilir enerji × verim',
      '<strong>Süre (saat)</strong> = yüke ulaşan enerji ÷ yük gücü (W)',
      '<strong>Aküden çekilen akım (A)</strong> = yük gücü ÷ (verim × akü gerilimi)',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 100 Ah, 12 V bir akü ile 100 watt\'lık yük, yüzde 50 deşarj derinliği ve yüzde 90 verimle beslenecek olsun. Kullanılabilir enerji 100 × 12 × 0,5 = 600 Wh, yüke ulaşan enerji 600 × 0,9 = 540 Wh\'tir. Süre 540 ÷ 100 = 5,4 saat, yani 5 saat 24 dakikadır. Aküden çekilen akım 100 ÷ (0,9 × 12) = 9,26 amperdir.',
      '<strong>Örnek 2:</strong> 200 Ah, 12 V bir akü grubu yüzde 80 derinliğe kadar boşaltılıyor ve yüzde 85 verimli invertörle 300 watt besleniyor. Yüke ulaşan enerji 200 × 12 × 0,8 × 0,85 = 1.632 Wh, süre 1.632 ÷ 300 = 5,44 saat, yaklaşık 5 saat 26 dakikadır.',
      '<strong>Örnek 3:</strong> 60 Ah\'lik bir aküden doğrudan 5 amper çeken bir yük, akü tamamen boşaltılırsa 60 ÷ 5 = 12 saat çalışır. Deşarj hızı 5 ÷ 60 = 0,083 C\'dir.',
    ] },
    { h: 'Deşarj derinliği neden yüzde 100 alınmaz?', p: [
      'Deşarj derinliği, akü kapasitesinin ne kadarının kullanıldığını gösterir. Akü ne kadar derin boşaltılırsa o kadar az sayıda şarj-deşarj çevrimine dayanır. Marş aküleri kısa süreli yüksek akım vermek için tasarlanmıştır ve derin deşarja karşı hassastır; bu akülerde kapasitenin yarısından fazlasını düzenli kullanmak ömrü belirgin biçimde kısaltır. Derin deşarja uygun jel, AGM ve traksiyoner tip akülerde daha yüksek, lityum demir fosfat akülerde ise çok daha yüksek kullanım oranları mümkündür.',
      'Hangi değeri yazacağınızdan emin değilseniz akü üreticisinin çevrim ömrü tablosuna bakın. Tablo yoksa kurşun-asit aküler için yüzde 50 temkinli bir başlangıç değeridir; araçta varsayılan olarak bu değer gelir.',
    ] },
    { h: 'Sonucu etkileyen ama hesaba katılmayan etkenler', ul: [
      '<strong>Deşarj hızı:</strong> Kurşun-asit akülerin etiket kapasitesi genellikle uzun süreli (örneğin 20 saatlik) yavaş boşalma için verilir. Akü hızlı boşaltıldığında alınabilen kapasite düşer. Araçtaki "deşarj hızı" satırı bu konuda fikir verir; değer büyüdükçe gerçek süre hesaplanandan kısalır.',
      '<strong>Sıcaklık:</strong> Soğuk havada akü kapasitesi azalır; kış aylarında karavan ve tekne kullanıcıları bunu açıkça fark eder.',
      '<strong>Akünün yaşı:</strong> Kullanılmış aküler etiket kapasitesinin altında enerji depolar.',
      '<strong>İnvertörün boşta tüketimi:</strong> Yük küçük olsa bile invertör kendi devreleri için bir miktar güç harcar.',
      '<strong>Kablo kayıpları:</strong> Düşük gerilimde akım yüksek olduğundan ince ve uzun kablolar kayda değer enerji kaybettirir.',
    ] },
    { h: 'Kullanım senaryoları', p: [
      'Karavan ve teknede buzdolabı, aydınlatma ve su pompasının bir gecede ne kadar akü tükettiğini görmek; bağ evinde güneş paneliyle şarj edilen akünün akşam televizyon ve modemi kaç saat çalıştıracağını tahmin etmek; kamp alanında taşınabilir bir soğutucunun ne kadar dayanacağını öğrenmek için bu hesap kullanılır. Birden çok cihaz çalışıyorsa güçlerini toplayıp tek bir yük olarak girin.',
      'Aküleri seri bağladığınızda gerilim toplanır, kapasite değişmez; paralel bağladığınızda kapasite toplanır, gerilim değişmez. İki adet 12 V 100 Ah akü seri bağlıysa araca 24 V ve 100 Ah, paralel bağlıysa 12 V ve 200 Ah yazın. Her iki durumda da toplam enerji aynıdır.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuç, ideal koşullara dayanan bir tahmindir ve garanti edilen çalışma süresi değildir. Tıbbi cihaz, güvenlik sistemi gibi kesintiye tahammülü olmayan yükler için kapasiteyi ölçüme ve üretici verilerine dayanarak, bol payla belirleyin. Akü bağlantılarında kısa devre ciddi yanık ve yangın riski taşır; sigorta ve uygun kesitli kablo kullanın, gerekiyorsa uzman desteği alın.',
    ] },
  ],
  faq: [
    ['100 Ah akü kaç saat gider?', 'Yüke bağlıdır. 12 voltluk 100 Ah akü, yüzde 50 deşarj derinliği ve yüzde 90 verimle 100 watt\'lık bir yükü yaklaşık 5 saat 24 dakika, 60 watt\'lık bir yükü 9 saat besler.'],
    ['Yükü watt mı amper mi girmeliyim?', 'Cihazınız invertör üzerinden 230 voltta çalışıyorsa etiketindeki watt değerini girin. Doğrudan aküye bağlı 12 voltluk bir cihazın akımını biliyorsanız amper seçeneğini kullanın; araç bu akımı akü gerilimiyle çarparak güce çevirir.'],
    ['Deşarj derinliğine ne yazmalıyım?', 'Akünün tipine göre değişir. Kurşun-asit akülerde ömür için yüzde 50 civarı temkinli bir değerdir; lityum akülerde üretici çoğunlukla daha yüksek oranlara izin verir. En doğru bilgi akünün teknik föyündedir.'],
    ['İnvertör verimi ne kadardır?', 'Modele ve yük düzeyine göre değişir; kaliteli invertörler orta ve yüksek yükte yüzde 90 dolayında verimle çalışır, çok düşük yükte verim düşer. Cihazınızın kullanım kılavuzundaki değeri girmeniz en doğrusudur.'],
    ['Hesaplanan süre neden gerçekte daha kısa çıkıyor?', 'Akü eskimiş olabilir, hava soğuk olabilir ya da yük yüksek akım çekiyordur. Kurşun-asit aküler hızlı boşaltıldığında etiket kapasitesinin altında enerji verir; hesap bu etkiyi içermez.'],
    ['İki aküyü paralel bağlarsam süre iki katına çıkar mı?', 'Aynı tip ve yaştaki iki akü paralel bağlandığında kapasite toplanır ve süre yaklaşık iki katına çıkar. Araca toplam Ah değerini yazmanız yeterlidir.'],
    ['Deşarj hızı (C) ne anlama gelir?', 'Çekilen akımın kapasiteye oranıdır. 100 Ah aküden 20 amper çekiliyorsa hız 0,2 C\'dir. Değer küçüldükçe akü daha rahat çalışır ve etiket kapasitesine daha yakın enerji verir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez.'],
  ],
  related: ['ups-calisma-suresi-hesapla', 'mah-wh-cevir', 'sarj-suresi-hesapla', 'pil-seri-paralel-hesapla', 'gunes-paneli-hesapla', 'amper-watt-cevir'],
};
