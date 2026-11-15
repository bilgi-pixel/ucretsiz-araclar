export default {
  slug: 'verim-hesapla',
  title: 'Verim Hesaplama (Fizik)',
  h1Tail: 'çıkış ÷ giriş',
  pageTitle: 'Verim Hesaplama (Fizik) – Enerji ve Güç Verimi Yüzdesi',
  description: 'Bir makinenin verimini giriş ve çıkış enerjisinden ya da gücünden hesaplayın. Verim biliniyorsa yararlı çıkışı veya gereken girişi ve kayıp miktarını bulun.',
  card: 'Giriş ve çıkış enerjisinden ya da gücünden verimi bulun; verim biliniyorsa çıkışı, girişi ve kaybı hesaplayın.',
  category: 'bilim',
  keywords: ['verim hesaplama', 'verim formülü fizik', 'enerji verimi hesaplama', 'makine verimi', 'yüzde verim fizik', 'alınan enerji verilen enerji', 'motor verimi hesaplama'],
  lead: `Bir makinenin, motorun ya da düzeneğin <strong>verimini</strong> harcanan (giriş) ve yararlı (çıkış) enerji ya da güç değerlerinden hesaplayın. Verim biliniyorsa aynı araçla yararlı çıkışı veya gereken girişi de bulabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplansın?', type: 'select', wide: true, options: [['verim', 'Verim (giriş ve çıkış biliniyor)'], ['cikis', 'Yararlı çıkış (giriş ve verim biliniyor)'], ['giris', 'Gereken giriş (çıkış ve verim biliniyor)']] },
    { id: 'giris', label: 'Giriş (harcanan enerji ya da güç)', type: 'number', placeholder: 'Örn. 500', hint: 'Giriş ve çıkış aynı birimde olmalı (J, kJ, W, kWh…).' },
    { id: 'cikis', label: 'Çıkış (yararlı enerji ya da güç)', type: 'number', placeholder: 'Örn. 400' },
    { id: 'verim', label: 'Verim (%)', type: 'number', placeholder: 'Örn. 80' },
  ],
  compute(v, h) {
    let gir, cik, eta;
    if (v.mod === 'cikis') {
      gir = h.pos(v.giris, 'Giriş');
      eta = h.nonneg(v.verim, 'Verim');
      if (eta > 100) h.err('Verim yüzde 100\'den büyük olamaz; hiçbir makine harcadığından fazla enerji veremez.');
      cik = (gir * eta) / 100;
    } else if (v.mod === 'giris') {
      cik = h.nonneg(v.cikis, 'Çıkış');
      eta = h.pos(v.verim, 'Verim');
      if (eta > 100) h.err('Verim yüzde 100\'den büyük olamaz; hiçbir makine harcadığından fazla enerji veremez.');
      gir = (cik * 100) / eta;
    } else {
      gir = h.pos(v.giris, 'Giriş');
      cik = h.nonneg(v.cikis, 'Çıkış');
      if (cik > gir) h.err('Çıkış girişten büyük olamaz. Değerlerin yerini ve birimlerini kontrol edin; yararlı çıkış her zaman harcanan girişten küçük ya da ona eşittir.');
      eta = (cik / gir) * 100;
    }
    const kayip = gir - cik;
    const V = ['Verim', '%' + h.fmt(eta, 2)];
    const G = ['Giriş (harcanan)', h.fmt(gir, 4)];
    const C = ['Çıkış (yararlı)', h.fmt(cik, 4)];
    const ilk = v.mod === 'cikis' ? [C, G, V] : v.mod === 'giris' ? [G, C, V] : [V, G, C];
    return {
      rows: [
        ...ilk,
        ['Kayıp', h.fmt(kayip, 4)],
        ['Kayıp oranı', '%' + h.fmt(100 - eta, 2)],
        ['Verim (ondalık)', h.fmt(eta / 100, 4)],
      ],
      note: 'Giriş, çıkış ve kayıp değerleri girdiğiniz birimdedir. Kayıp çoğunlukla ısı, ses ve sürtünme olarak ortama yayılan enerjidir.',
    };
  },
  cases: [
    { in: { mod: 'verim', giris: '500', cikis: '400' }, out: { 'Verim': '%80', 'Kayıp': '100', 'Kayıp oranı': '%20', 'Verim (ondalık)': '0,8' } },
    { in: { mod: 'cikis', giris: '2000', verim: '90' }, out: { 'Çıkış (yararlı)': '1.800', 'Kayıp': '200' } },
    { in: { mod: 'giris', cikis: '750', verim: '75' }, out: { 'Giriş (harcanan)': '1.000', 'Kayıp': '250', 'Kayıp oranı': '%25' } },
    { in: { mod: 'verim', giris: '1000', cikis: '250' }, out: { 'Verim': '%25', 'Kayıp': '750' } },
    { in: { mod: 'verim', giris: '60', cikis: '60' }, out: { 'Verim': '%100', 'Kayıp': '0' } },
    { in: { mod: 'verim', giris: '1200', cikis: '420' }, out: { 'Verim': '%35', 'Kayıp': '780' } },
    { in: { mod: 'verim', giris: '400', cikis: '500' }, error: true },
    { in: { mod: 'cikis', giris: '2000', verim: '120' }, error: true },
    { in: { mod: 'verim', giris: '0', cikis: '0' }, error: true },
  ],
  howto: [
    `"Ne hesaplansın?" listesinden bulmak istediğiniz büyüklüğü seçin: verim, yararlı çıkış ya da gereken giriş.`,
    `Seçiminize göre gereken iki alanı doldurun. Giriş ve çıkış değerleri enerji (joule, kilojoule, kilovatsaat) ya da güç (vat, kilovat) olabilir; önemli olan ikisinin aynı birimde olmasıdır.`,
    `Verimi yüzde olarak yazın; örneğin yüzde 80 için 80 girin.`,
    `"Hesapla" düğmesine basın. Verim, giriş, çıkış, kayıp miktarı ve kayıp oranı birlikte listelenir.`,
  ],
  sections: [
    { h: 'Fizikte verim nedir?', p: [
      `Verim, bir makineye ya da sisteme verilen enerjinin ne kadarının istenen işe dönüştüğünü gösteren orandır. Hiçbir gerçek makine aldığı enerjinin tamamını yararlı işe çeviremez; bir kısmı sürtünme, ısınma, ses, titreşim ya da elektrik direnci nedeniyle istenmeyen biçimlere dönüşür. Enerji yok olmaz, yalnızca işimize yaramayan bir hâle geçer. Verim bu kaybın ne kadar az olduğunun ölçüsüdür.`,
      `Verim birimsiz bir orandır; 0 ile 1 arasında ondalık sayı ya da yüzde olarak ifade edilir. Fizikte çoğunlukla Yunan alfabesindeki eta (η) harfiyle gösterilir. Yüzde 100 verim, kayıpsız ideal bir makine anlamına gelir ve pratikte ulaşılamaz.`,
    ] },
    { h: 'Verim formülü', p: [
      `Verim, yararlı çıkışın toplam girişe bölünmesiyle bulunur: <strong>Verim = (Çıkış ÷ Giriş) × 100</strong>. Lise kitaplarında bu ifade "alınan enerji bölü verilen enerji" ya da "yapılan iş bölü harcanan enerji" olarak geçer. Aynı oran güç değerleriyle de hesaplanabilir, çünkü güç birim zamandaki enerjidir ve süre sadeleşir.`,
      `Formül üç biçimde kullanılır. Giriş ve çıkış biliniyorsa verim bulunur. Giriş ve verim biliniyorsa <strong>Çıkış = Giriş × Verim ÷ 100</strong>, çıkış ve verim biliniyorsa <strong>Giriş = Çıkış × 100 ÷ Verim</strong> uygulanır. Kayıp ise her durumda giriş ile çıkışın farkıdır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Verimi bulma:</strong> Bir elektrik motoru şebekeden 500 J enerji çekiyor ve 400 J mekanik iş yapıyor. Verim (400 ÷ 500) × 100 = yüzde 80'dir. Kayıp 500 − 400 = 100 J olur ve bu enerjinin büyük bölümü motoru ısıtır.`,
      `<strong>Çıkışı bulma:</strong> Verimi yüzde 90 olan bir ısıtıcı 2000 W güç çekiyor. Yararlı çıkış 2000 × 90 ÷ 100 = 1800 W, kayıp 200 W'tır.`,
      `<strong>Girişi bulma:</strong> Bir pompanın suya 750 W güç aktarması isteniyor ve pompa verimi yüzde 75. Gereken giriş gücü 750 × 100 ÷ 75 = 1000 W'tır; 250 W kayıptır.`,
      `<strong>Vinç örneği:</strong> Bir vinç motoru 1200 J enerji harcayarak 14 kg'lık yükü yaklaşık 3 metre kaldırıyor ve yüke 420 J potansiyel enerji kazandırıyor. Verim (420 ÷ 1200) × 100 = yüzde 35 bulunur.`,
    ] },
    { h: 'Art arda çalışan makinelerde toplam verim', p: [
      `Enerji birden fazla aşamadan geçiyorsa toplam verim, aşamaların verimlerinin çarpımıdır. Örneğin verimi yüzde 90 olan bir motor, verimi yüzde 80 olan bir dişli kutusunu çalıştırıyorsa toplam verim 0,90 × 0,80 = 0,72, yani yüzde 72'dir. Aşama sayısı arttıkça toplam verim düşer. Bu hesabı araçla yapmak için ilk aşamanın çıkışını ikinci aşamanın girişi olarak kullanabilirsiniz.`,
    ] },
    { h: 'Verim neden yüzde 100 olamaz?', p: [
      `Hareketli parçalar arasında sürtünme, iletkenlerde direnç, akışkanlarda türbülans ve her sıcaklık farkında ısı kaçağı vardır. Bu etkiler azaltılabilir ama tümüyle yok edilemez. Yakıtın ısısını işe çeviren ısı makinelerinde ise termodinamiğin ikinci yasası, verimin sıcak ve soğuk kaynak sıcaklıklarına bağlı kuramsal bir üst sınırı olduğunu söyler.`,
      `Bir hesapta verim yüzde 100'ün üzerinde çıkıyorsa neredeyse her zaman bir veri ya da birim hatası vardır: giriş ile çıkış yer değiştirmiş, biri kilojoule diğeri joule alınmış ya da girişin bir kısmı hesaba katılmamıştır. Araç bu yüzden çıkışın girişten büyük olmasına izin vermez. Isı pompaları ve klimalar için kullanılan performans katsayısı 1'den büyük olabilir; ancak bu büyüklük verim değildir, çünkü cihaz ısıyı üretmez, bir yerden başka bir yere taşır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Giriş ve çıkışı farklı birimlerde yazmak (biri kWh, diğeri J gibi).`,
      `Enerji ile gücü karıştırmak: çıkış enerji olarak verilmişse giriş de enerji olmalıdır; gerekirse gücü süreyle çarparak enerjiye çevirin.`,
      `Kaybı çıkış sanmak. Soruda "ısıya dönüşen enerji" veriliyorsa yararlı çıkış, girişten bu kayıp çıkarılarak bulunur.`,
      `Verimi ondalık yazmak. Araç yüzde bekler; 0,8 yerine 80 girin.`,
    ] },
    { h: 'Kapsam ve uyarı', p: [
      `Bu sayfa fizikteki enerji ve güç verimini hesaplar. Kimyadaki tepkime verimi (kuramsal ve gerçek ürün miktarı) farklı bir kavramdır ve ayrı bir araçla hesaplanır. Sonuçlar ders çalışma ve ön değerlendirme içindir. Cihaz seçimi, enerji tüketimi tahmini ya da tesis tasarımı yaparken üreticinin ölçülmüş verilerini kullanın ve gerektiğinde bir mühendise danışın; gerçek verim yüke, sıcaklığa ve çalışma koşullarına göre değişir.`,
    ] },
  ],
  faq: [
    ['Verim nasıl hesaplanır?', `Yararlı çıkış, toplam girişe bölünür ve 100 ile çarpılır. Örneğin 500 J harcayıp 400 J iş yapan bir makinenin verimi yüzde 80'dir.`],
    ['Verimin birimi nedir?', `Verim iki aynı cins büyüklüğün oranı olduğu için birimsizdir. Yüzde olarak ya da 0 ile 1 arasında ondalık sayı olarak yazılır; yüzde 80 ile 0,8 aynı verimi anlatır.`],
    ['Verim yüzde 100\'den büyük olabilir mi?', `Hayır. Enerjinin korunumu gereği bir makine aldığından fazla enerji veremez. Hesapta yüzde 100'ün üzerinde bir değer çıkıyorsa birimleri ve giriş-çıkış değerlerinin yerini kontrol edin.`],
    ['Kayıp enerji nereye gider?', `Çoğunlukla ısıya dönüşür ve çevreye yayılır. Bir bölümü ses ve titreşim olarak da açığa çıkar. Enerji yok olmaz, yalnızca yararlanılamayan bir biçime geçer.`],
    ['Güç değerleriyle verim hesaplanabilir mi?', `Evet. Çıkış gücünün giriş gücüne oranı da verimi verir. Önemli olan iki değerin aynı birimde ve aynı çalışma anına ait olmasıdır.`],
    ['İki makine art arda çalışıyorsa toplam verim nedir?', `Verimler çarpılır. Yüzde 90 ve yüzde 80 verimli iki aşamanın toplam verimi 0,9 × 0,8 = 0,72, yani yüzde 72'dir.`],
    ['Basit makinelerde verim nasıl bulunur?', `Yüke kazandırılan iş (yük × yükseklik), uygulanan kuvvetin yaptığı işe (kuvvet × yol) bölünür. Sürtünme olmasaydı bu iki iş eşit, verim de yüzde 100 olurdu.`],
    ['Girdiğim değerler bir yere kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['is-hesapla', 'guc-hesapla', 'kinetik-enerji-hesapla', 'potansiyel-enerji-hesapla', 'yuzde-verim-hesapla'],
};
