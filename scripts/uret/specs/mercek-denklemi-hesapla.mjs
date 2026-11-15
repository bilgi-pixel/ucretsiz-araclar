export default {
  slug: 'mercek-denklemi-hesapla',
  title: 'Mercek Denklemi Hesaplama',
  h1Tail: '1/f = 1/dc + 1/dg',
  pageTitle: 'Mercek Denklemi Hesaplama – İnce Mercek Formülü, Görüntü ve Büyütme',
  description: 'İnce mercek denklemiyle görüntü uzaklığını, cisim uzaklığını ya da odak uzaklığını hesaplayın. Büyütme, görüntünün gerçek-sanal, düz-ters niteliği ve diyoptri gösterilir.',
  card: 'İnce mercek formülüyle görüntü, cisim ya da odak uzaklığını bulun; büyütmeyi ve görüntünün gerçek mi sanal mı olduğunu görün.',
  category: 'bilim',
  keywords: ['mercek denklemi hesaplama', 'ince mercek formülü', 'odak uzaklığı hesaplama', 'görüntü uzaklığı', 'büyütme hesaplama mercek', 'ince kenarlı mercek', 'kalın kenarlı mercek', 'diyoptri hesaplama'],
  lead: 'İnce mercek denklemi <strong>1/f = 1/d<sub>c</sub> + 1/d<sub>g</sub></strong>, odak uzaklığı ile cismin ve görüntünün merceğe uzaklıklarını birbirine bağlar. Üç değerden ikisini yazın; araç üçüncüyü, büyütmeyi ve görüntünün niteliğini bulsun.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['goruntu', 'Görüntü uzaklığı'], ['cisim', 'Cisim uzaklığı'], ['odak', 'Odak uzaklığı']] },
    { id: 'odak', label: 'Odak uzaklığı (cm)', type: 'number', placeholder: 'Örn. 10', hint: 'İnce kenarlı (yakınsak) mercek için artı, kalın kenarlı (ıraksak) mercek için eksi yazın. Aranıyorsa boş bırakın.' },
    { id: 'cisim', label: 'Cisim uzaklığı (cm)', type: 'number', placeholder: 'Örn. 30', hint: 'Cismin merceğe uzaklığı. Aranıyorsa boş bırakın.' },
    { id: 'goruntu', label: 'Görüntü uzaklığı (cm)', type: 'number', placeholder: 'Örn. 15', hint: 'Gerçek görüntü için artı, sanal görüntü için eksi. Aranıyorsa boş bırakın.' },
    { id: 'boy', label: 'Cisim boyu (cm) – isteğe bağlı', type: 'number', placeholder: 'Örn. 2', hint: 'Yazarsanız görüntünün boyu da hesaplanır.' },
  ],
  compute(v, h) {
    let f, dc, dg, sonsuz = false;
    if (v.bul === 'odak') {
      dc = h.pos(v.cisim, 'Cisim uzaklığı');
      dg = h.num(v.goruntu, 'Görüntü uzaklığı');
      if (dg === 0) h.err('Görüntü uzaklığı sıfır olamaz.');
      const t = 1 / dc + 1 / dg;
      if (Math.abs(t) < 1e-12) h.err('Bu değerlerle odak uzaklığı sonsuz çıkıyor; bu bir mercek değil, düz cam davranışıdır.');
      f = 1 / t;
    } else if (v.bul === 'cisim') {
      f = h.num(v.odak, 'Odak uzaklığı');
      if (f === 0) h.err('Odak uzaklığı sıfır olamaz.');
      dg = h.num(v.goruntu, 'Görüntü uzaklığı');
      if (dg === 0) h.err('Görüntü uzaklığı sıfır olamaz.');
      const t = 1 / f - 1 / dg;
      if (t <= 1e-12) h.err('Bu odak ve görüntü uzaklığıyla gerçek bir cisim konumu bulunamıyor; işaretleri kontrol edin (sanal görüntü ve ıraksak mercek için eksi).');
      dc = 1 / t;
    } else {
      f = h.num(v.odak, 'Odak uzaklığı');
      if (f === 0) h.err('Odak uzaklığı sıfır olamaz.');
      dc = h.pos(v.cisim, 'Cisim uzaklığı');
      const t = 1 / f - 1 / dc;
      if (Math.abs(t) < 1e-12) sonsuz = true; else dg = 1 / t;
    }
    const guc = ['Mercek gücü', h.fmt(100 / f, 4) + ' diyoptri'];
    const tur = ['Mercek türü', f > 0 ? 'İnce kenarlı (yakınsak)' : 'Kalın kenarlı (ıraksak)'];
    if (sonsuz) {
      return {
        rows: [
          ['Görüntü uzaklığı', 'Sonsuzda (görüntü oluşmaz)'],
          ['Cisim uzaklığı', h.fmt(dc, 4) + ' cm'],
          ['Odak uzaklığı', h.fmt(f, 4) + ' cm'],
          ['Görüntünün niteliği', 'Cisim odakta; kırılan ışınlar birbirine paralel çıkar'],
          guc, tur,
        ],
      };
    }
    const m = -dg / dc;
    const am = Math.abs(m);
    const buyukluk = Math.abs(am - 1) < 1e-9 ? 'cisimle aynı boyda' : am > 1 ? 'büyütülmüş' : 'küçültülmüş';
    const nitelik = (dg > 0 ? 'Gerçek, ters, ' : 'Sanal, düz, ') + buyukluk;
    const gS = ['Görüntü uzaklığı', h.fmt(dg, 4) + ' cm'];
    const cS = ['Cisim uzaklığı', h.fmt(dc, 4) + ' cm'];
    const fS = ['Odak uzaklığı', h.fmt(f, 4) + ' cm'];
    const ilk = v.bul === 'odak' ? [fS, cS, gS] : v.bul === 'cisim' ? [cS, fS, gS] : [gS, cS, fS];
    const rows = [...ilk, ['Büyütme', h.fmt(m, 4)], ['Görüntünün niteliği', nitelik], guc, tur];
    if (String(v.boy ?? '').trim() !== '') {
      const boy = h.pos(v.boy, 'Cisim boyu');
      rows.push(['Görüntü boyu', h.fmt(am * boy, 4) + ' cm (' + (m < 0 ? 'ters' : 'düz') + ')']);
    }
    return {
      rows,
      note: 'İşaret kuralı: yakınsak mercekte f artı, ıraksak mercekte eksi; gerçek görüntüde uzaklık artı, sanal görüntüde eksi. Büyütme m = −dg ÷ dc; eksi değer ters görüntü demektir.',
    };
  },
  cases: [
    { in: { bul: 'goruntu', odak: '10', cisim: '30' }, out: { 'Görüntü uzaklığı': '15 cm', 'Büyütme': '-0,5', 'Görüntünün niteliği': 'Gerçek, ters, küçültülmüş', 'Mercek gücü': '10 diyoptri' } },
    { in: { bul: 'goruntu', odak: '10', cisim: '5' }, out: { 'Görüntü uzaklığı': '-10 cm', 'Büyütme': '2', 'Görüntünün niteliği': 'Sanal, düz, büyütülmüş' } },
    { in: { bul: 'goruntu', odak: '-10', cisim: '10' }, out: { 'Görüntü uzaklığı': '-5 cm', 'Büyütme': '0,5', 'Görüntünün niteliği': 'Sanal, düz, küçültülmüş', 'Mercek türü': 'Kalın kenarlı (ıraksak)' } },
    { in: { bul: 'odak', cisim: '20', goruntu: '20' }, out: { 'Odak uzaklığı': '10 cm', 'Büyütme': '-1', 'Görüntünün niteliği': 'Gerçek, ters, cisimle aynı boyda' } },
    { in: { bul: 'cisim', odak: '10', goruntu: '15' }, out: { 'Cisim uzaklığı': '30 cm' } },
    { in: { bul: 'goruntu', odak: '15', cisim: '20', boy: '2' }, out: { 'Görüntü uzaklığı': '60 cm', 'Büyütme': '-3', 'Görüntü boyu': '6 cm (ters)' } },
    { in: { bul: 'goruntu', odak: '10', cisim: '10' }, out: { 'Görüntü uzaklığı': 'Sonsuzda (görüntü oluşmaz)' } },
    { in: { bul: 'goruntu', odak: '0', cisim: '30' }, error: true },
    { in: { bul: 'goruntu', odak: '10', cisim: '-5' }, error: true },
    { in: { bul: 'cisim', odak: '10', goruntu: '5' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden görüntü uzaklığını mı, cisim uzaklığını mı, odak uzaklığını mı aradığınızı seçin.',
    'Bilinen iki uzaklığı santimetre olarak yazın. Kalın kenarlı (ıraksak) mercekte odak uzaklığını eksi işaretiyle girin; sanal görüntü uzaklıkları da eksidir.',
    'Görüntünün boyunu da öğrenmek istiyorsanız cismin boyunu yazın; istemiyorsanız bu alanı boş bırakın.',
    '"Hesapla" düğmesine basın. Aranan uzaklıkla birlikte büyütme, görüntünün gerçek ya da sanal, düz ya da ters olduğu ve merceğin diyoptri cinsinden gücü listelenir.',
  ],
  sections: [
    { h: 'İnce mercek denklemi', p: [
      'Kalınlığı, yüzeylerinin eğrilik yarıçaplarına göre küçük olan merceklere ince mercek denir. Böyle bir mercek için cismin merceğe uzaklığı d<sub>c</sub>, görüntünün uzaklığı d<sub>g</sub> ve odak uzaklığı f arasında şu bağıntı vardır: <strong>1/f = 1/d<sub>c</sub> + 1/d<sub>g</sub></strong>. Bu eşitlikten görüntü uzaklığı d<sub>g</sub> = f · d<sub>c</sub> ÷ (d<sub>c</sub> − f) biçiminde çekilebilir.',
      'Görüntünün cisme göre boyunu <strong>büyütme</strong> verir: m = −d<sub>g</sub> ÷ d<sub>c</sub>. Büyütmenin mutlak değeri 1\'den büyükse görüntü cisimden büyük, küçükse küçüktür. İşareti eksi ise görüntü ters, artı ise düzdür. Merceğin gücü ise metre cinsinden odak uzaklığının tersidir ve diyoptri ile ölçülür; odak uzaklığı santimetre olarak verildiğinde güç = 100 ÷ f olur. Gözlük numaraları bu birimle ifade edilir.',
    ] },
    { h: 'İşaret kuralı', ul: [
      '<strong>Odak uzaklığı:</strong> ince kenarlı (yakınsak) mercekte artı, kalın kenarlı (ıraksak) mercekte eksi.',
      '<strong>Cisim uzaklığı:</strong> gerçek cisimler için her zaman artı.',
      '<strong>Görüntü uzaklığı:</strong> görüntü merceğin öbür tarafında oluşuyorsa (gerçek, perdeye düşürülebilir) artı; cisimle aynı tarafta oluşuyorsa (sanal, ancak merceğe bakınca görülür) eksi.',
      '<strong>Büyütme:</strong> eksi ise ters görüntü, artı ise düz görüntü.',
    ], p: [
      'Bazı ders kitapları işaretsiz büyüklüklerle çalışıp sanal durumlar için formülü 1/f = 1/d<sub>c</sub> − 1/d<sub>g</sub> biçiminde yazar. İki yaklaşım aynı sonucu verir; bu araçta tek formül ve yukarıdaki işaret kuralı kullanılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Odak uzaklığı 10 cm olan ince kenarlı merceğin 30 cm önüne bir mum konuyor. 1/d<sub>g</sub> = 1/10 − 1/30 = 2/30, d<sub>g</sub> = 15 cm. Büyütme m = −15 ÷ 30 = −0,5. Görüntü gerçek, ters ve cismin yarısı boyundadır. Merceğin gücü 100 ÷ 10 = 10 diyoptridir.',
      '<strong>Örnek 2 (büyüteç):</strong> Aynı merceğin 5 cm önüne, yani odağın içine bir cisim konuyor. 1/d<sub>g</sub> = 1/10 − 1/5 = −1/10, d<sub>g</sub> = −10 cm. Büyütme m = 10 ÷ 5 = 2. Görüntü sanal, düz ve iki kat büyüktür; büyüteç tam olarak bu şekilde çalışır.',
      '<strong>Örnek 3 (ıraksak mercek):</strong> Odak uzaklığı −10 cm olan kalın kenarlı merceğin 10 cm önündeki cisim için 1/d<sub>g</sub> = −1/10 − 1/10 = −2/10, d<sub>g</sub> = −5 cm ve m = 0,5 bulunur. Görüntü sanal, düz ve küçüktür.',
      '<strong>Örnek 4:</strong> Odak uzaklığı 15 cm olan merceğin 20 cm önündeki 2 cm boyundaki cismin görüntüsü 60 cm uzakta oluşur; büyütme −3, görüntü boyu 6 cm ve terstir.',
    ] },
    { h: 'İnce kenarlı mercekte cismin konumuna göre görüntü', ul: [
      '<strong>Cisim 2f\'den uzakta:</strong> görüntü f ile 2f arasında; gerçek, ters, küçük (fotoğraf makinesi, göz).',
      '<strong>Cisim tam 2f\'de:</strong> görüntü 2f\'de; gerçek, ters, cisimle aynı boyda.',
      '<strong>Cisim f ile 2f arasında:</strong> görüntü 2f\'den uzakta; gerçek, ters, büyük (projeksiyon cihazı).',
      '<strong>Cisim tam odakta:</strong> kırılan ışınlar paralel çıkar; görüntü sonsuzda kabul edilir.',
      '<strong>Cisim odak ile mercek arasında:</strong> görüntü cisimle aynı tarafta; sanal, düz, büyük (büyüteç).',
    ], p: [
      'Kalın kenarlı mercekte ise gerçek bir cisim nereye konursa konsun görüntü hep sanal, düz ve küçüktür; cisimle mercek arasında, odağın iç tarafında oluşur. Miyop gözlük camları bu tür merceklerdir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Hesaplarda en çok işaret hatası yapılır: ıraksak merceğin odak uzaklığını artı girmek ya da sanal görüntü uzaklığını artı yazmak tamamen farklı bir sonuç verir. İkinci hata birimleri karıştırmaktır; üç uzaklığın da aynı birimde olması gerekir. Araç santimetre kabul eder, ancak hepsini milimetre ya da metre olarak girerseniz uzaklık sonuçları yine aynı birimde doğru çıkar; yalnızca diyoptri satırı santimetre varsayımıyla hesaplandığı için geçersiz olur. Üçüncü hata, terslerin toplamını aldıktan sonra sonucu yeniden ters çevirmeyi unutmaktır; araç bu adımı sizin yerinize yapar.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Denklem ince mercek ve asal eksene yakın ışınlar (paraksiyal yaklaşım) için geçerlidir. Kalın merceklerde, mercek sistemlerinde ve eksenden uzak ışınlarda küresel sapma, renk sapması gibi kusurlar ortaya çıkar ve gerçek görüntü hesaplanandan farklı olabilir. Merceğin her iki yanındaki ortamın aynı (genellikle hava) olduğu varsayılır. Araç yalnızca gerçek cisimler için hesap yapar. Sonuçlar eğitim amaçlıdır; gözlük ya da lens numarası belirlemek için göz hekimine başvurulmalıdır.',
    ] },
  ],
  faq: [
    ['Mercek denklemi nedir?', '1/f = 1/dc + 1/dg eşitliğidir. f odak uzaklığı, dc cismin, dg görüntünün merceğe uzaklığıdır. Odak uzaklığı 10 cm, cisim uzaklığı 30 cm ise görüntü 15 cm uzakta oluşur.'],
    ['Büyütme nasıl hesaplanır?', 'm = −dg ÷ dc ile hesaplanır; aynı zamanda görüntü boyunun cisim boyuna oranıdır. Mutlak değeri 2 ise görüntü iki kat büyüktür; işareti eksi ise görüntü terstir.'],
    ['Görüntü uzaklığının eksi çıkması ne anlama gelir?', 'Görüntünün sanal olduğunu, yani cisimle aynı tarafta oluştuğunu ve perdeye düşürülemeyeceğini gösterir. Büyüteçle bakarken gördüğünüz büyük, düz görüntü buna örnektir.'],
    ['Kalın kenarlı mercek için odak uzaklığını nasıl girmeliyim?', 'Eksi işaretiyle. Örneğin odak uzaklığı 10 cm olan ıraksak mercek için −10 yazın. Bu merceklerde gerçek cismin görüntüsü her zaman sanal, düz ve küçüktür.'],
    ['Cisim odak noktasındaysa ne olur?', 'Mercekten çıkan ışınlar birbirine paralel olur ve kesişmez; görüntü sonsuzda kabul edilir. Araç bu durumda "Sonsuzda" sonucunu verir.'],
    ['Diyoptri nedir?', 'Merceğin gücünü gösteren birimdir ve metre cinsinden odak uzaklığının tersidir. Odak uzaklığı 50 cm olan mercek 2 diyoptri, 10 cm olan mercek 10 diyoptri gücündedir. Iraksak merceklerde değer eksidir.'],
    ['Bu formül aynalar için de kullanılır mı?', 'Küresel aynalarda da aynı biçimde bir bağıntı vardır, ancak işaret kuralı ve gerçek görüntünün oluştuğu taraf farklıdır. Bu araç mercekler için düzenlenmiştir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız uzaklıklar hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kirilma-acisi-hesapla', 'dalga-boyu-frekans-hesapla', 'isik-siddeti-mesafe-hesapla', 'foton-enerjisi-hesapla'],
};
