export default {
  slug: 'soru-cozme-hizi-hesapla',
  title: 'Soru Çözme Hızı Hesaplama',
  h1Tail: 'soru başına süre ve sınava yetişme',
  pageTitle: "Soru Çözme Hızı Hesaplama – Soru Başına Süre ve Sınav Temposu",
  description: "Çözdüğünüz soru sayısı ve süreden soru başına ortalama sürenizi bulun; bu hızla sınavdaki soruları süresinde bitirip bitiremeyeceğinizi görün.",
  card: "Kaç soruyu kaç dakikada çözdüğünüzü yazın; soru başına sürenizi ve sınav süresine yetişip yetişmediğinizi görün.",
  category: 'egitim',
  keywords: ['soru çözme hızı hesaplama', 'soru başına süre', 'dakikada kaç soru', 'sınavda süre yetiştirme', 'saatte kaç soru çözülür', 'soru çözme temposu', 'deneme süre analizi'],
  lead: "Bir çalışma oturumunda ya da denemede çözdüğünüz soru sayısını ve harcadığınız süreyi girin. Araç <strong>soru başına ortalama sürenizi</strong>, dakikada ve saatte çözdüğünüz soru sayısını verir; isterseniz hedef sınavın soru sayısı ve süresiyle karşılaştırıp tempo açığınızı gösterir.",
  button: 'Hesapla',
  inputs: [
    { id: 'soru', label: 'Çözülen soru sayısı', type: 'number', placeholder: 'Örn. 40' },
    { id: 'sure', label: 'Harcanan süre (dakika)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'hedefSoru', label: 'Sınavdaki soru sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'hedefSure', label: 'Sınav süresi, dakika (isteğe bağlı)', type: 'number', placeholder: 'Örn. 135' },
  ],
  compute(v, h) {
    const soru = h.pos(v.soru, 'Çözülen soru sayısı');
    const sure = h.pos(v.sure, 'Harcanan süre');
    const dolu = (s) => String(s ?? '').trim() !== '';
    const hs = dolu(v.hedefSoru) ? h.pos(v.hedefSoru, 'Sınavdaki soru sayısı') : null;
    const ht = dolu(v.hedefSure) ? h.pos(v.hedefSure, 'Sınav süresi') : null;
    const sn = (s) => {
      const dk = Math.floor(s / 60 + 1e-9);
      const kalan = Math.max(0, s - dk * 60);
      return dk > 0 ? `${dk} dk ${h.fmt(kalan, 1)} sn` : `${h.fmt(kalan, 1)} sn`;
    };
    const basi = (sure * 60) / soru; // saniye
    const rows = [
      ['Soru başına süre', sn(basi)],
      ['Dakikada çözülen soru', `${h.fmt(soru / sure, 2)} soru`],
      ['Saatte çözülen soru', `${h.fmt((soru / sure) * 60, 1)} soru`],
    ];
    if (hs !== null) rows.push(['Bu hızla sınavın süreceği zaman', `${h.fmt((hs * basi) / 60, 2)} dakika`]);
    if (ht !== null) rows.push(['Sınav süresinde çözülebilecek soru', `${h.fmt(Math.floor((ht * 60) / basi + 1e-9), 0)} soru`]);
    if (hs !== null && ht !== null) {
      rows.push(['Sınav için gereken soru başı süre', sn((ht * 60) / hs)]);
      const fark = ht - (hs * basi) / 60;
      rows.push(['Durum', Math.abs(fark) < 1e-9 ? 'Tam yetişiyor; hiç pay kalmıyor'
        : fark > 0 ? `Yetişiyor; ${h.fmt(fark, 2)} dakika artar` : `Yetişmiyor; ${h.fmt(-fark, 2)} dakika daha gerekir`]);
    }
    return { rows, note: 'Hesap, tüm soruların ortalama hızla çözüldüğünü varsayar; işaretleme ve kontrol süresi ayrıca düşünülmelidir.' };
  },
  cases: [
    { in: { soru: '40', sure: '60' }, out: { 'Soru başına süre': '1 dk 30 sn', 'Dakikada çözülen soru': '0,67 soru', 'Saatte çözülen soru': '40 soru' } },
    { in: { soru: '40', sure: '60', hedefSoru: '120', hedefSure: '135' }, out: { 'Bu hızla sınavın süreceği zaman': '180 dakika', 'Sınav süresinde çözülebilecek soru': '90 soru', 'Sınav için gereken soru başı süre': '1 dk 7,5 sn', 'Durum': 'Yetişmiyor; 45 dakika daha gerekir' } },
    { in: { soru: '100', sure: '80' }, out: { 'Soru başına süre': '48 sn', 'Dakikada çözülen soru': '1,25 soru', 'Saatte çözülen soru': '75 soru' } },
    { in: { soru: '30', sure: '20', hedefSoru: '90', hedefSure: '75' }, out: { 'Soru başına süre': '40 sn', 'Bu hızla sınavın süreceği zaman': '60 dakika', 'Sınav süresinde çözülebilecek soru': '112 soru', 'Sınav için gereken soru başı süre': '50 sn', 'Durum': 'Yetişiyor; 15 dakika artar' } },
    { in: { soru: '1', sure: '2' }, out: { 'Soru başına süre': '2 dk 0 sn', 'Saatte çözülen soru': '30 soru' } },
    { in: { soru: '20', sure: '30', hedefSoru: '40' }, out: { 'Soru başına süre': '1 dk 30 sn', 'Bu hızla sınavın süreceği zaman': '60 dakika' } },
    { in: { soru: '20', sure: '30', hedefSure: '45' }, out: { 'Sınav süresinde çözülebilecek soru': '30 soru' } },
    { in: { soru: '40', sure: '40', hedefSoru: '80', hedefSure: '80' }, out: { 'Durum': 'Tam yetişiyor; hiç pay kalmıyor' } },
    { in: { soru: '0', sure: '60' }, error: true },
    { in: { soru: '40', sure: 'abc' }, error: true },
  ],
  howto: [
    "Süre tutarak bir test ya da deneme çözün; başlarken ve bitirirken saate bakmanız yeterlidir.",
    "<strong>Çözülen soru sayısı</strong> alanına üzerinde uğraştığınız soru adedini, <strong>Harcanan süre</strong> alanına geçen dakikayı yazın.",
    "Hazırlandığınız sınavla kıyaslamak istiyorsanız o sınavın ya da oturumun soru sayısını ve dakika cinsinden süresini isteğe bağlı alanlara girin.",
    "Hesapla düğmesine basın. İlk satır soru başına ortalama sürenizi, son satır ise sınav süresine yetişip yetişmediğinizi gösterir.",
    "Aynı ölçümü farklı dersler için tekrarlayın; hangi derste zaman kaybettiğinizi sayılarla görürsünüz.",
  ],
  sections: [
    { h: 'Soru çözme hızı nasıl hesaplanır?', p: [
      "Temel formül tek bir bölme işlemidir: <strong>soru başına süre = harcanan süre ÷ çözülen soru sayısı</strong>. Süreyi saniyeye çevirmek sonucu daha okunaklı kılar; bu yüzden araç dakikayı 60 ile çarpar ve sonucu dakika ve saniye olarak yazar. Tersinden bakıldığında <strong>dakikadaki soru = soru sayısı ÷ dakika</strong> ve bunun 60 katı saatlik tempodur.",
      "Hedef sınav bilgisi girildiğinde iki hesap daha yapılır. Birincisi, mevcut hızınızla sınavdaki tüm soruların ne kadar süreceğidir: sınav soru sayısı × soru başına süreniz. İkincisi, sınavın sizden istediği tempodur: sınav süresi ÷ sınav soru sayısı. Bu iki değer arasındaki fark, kapatmanız gereken açığı ya da elinizde kalan payı gösterir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Bir öğrenci 40 soruluk bir testi 60 dakikada bitirmiş olsun. Soru başına süre 60 × 60 ÷ 40 = 90 saniye, yani 1 dakika 30 saniyedir. Dakikada 0,67, saatte 40 soru çözmektedir.",
      "Bu öğrenci 120 soruluk ve 135 dakikalık bir sınava hazırlanıyorsa mevcut hızıyla 120 × 90 = 10.800 saniye, yani 180 dakikaya ihtiyaç duyar. Sınav süresi 135 dakika olduğundan 45 dakika eksiği vardır. Sınavın istediği tempo 135 × 60 ÷ 120 = 67,5 saniyedir; öğrencinin soru başına süresini 22,5 saniye kısaltması gerekir. Aynı hızla 135 dakikada ancak 90 soruya bakabilir. Araca bu değerleri yazdığınızda aynı sonuçları görürsünüz.",
    ] },
    { h: 'Sonucu doğru yorumlamak', p: [
      "Ortalama süre, her soruya eşit zaman harcadığınız anlamına gelmez. Bir testte soruların bir bölümü yirmi saniyede çözülürken birkaçı üç dört dakika alabilir. Ortalamanız yüksek çıkıyorsa nedeni çoğu zaman genel yavaşlık değil, az sayıda soruda takılıp kalmaktır. Bu yüzden süre ölçerken takıldığınız soruları işaretlemek, ortalamanın arkasındaki gerçeği görmenizi sağlar.",
      "Hız tek başına bir başarı ölçüsü de değildir. Çok hızlı ama hatalı çözmek, yanlışların doğruları götürdüğü sınavlarda neti düşürür. Tempo hesabını mutlaka doğru sayınızla birlikte değerlendirin; hedef, aynı isabet oranını koruyarak süreyi kısaltmaktır.",
    ] },
    { h: 'Derslere göre farklı tempo', p: [
      "Soru türleri arasında süre gereksinimi çok farklıdır. Bilgiye dayalı kısa sorular hızlı geçilirken uzun paragraf soruları okuma süresi ister, işlem gerektiren matematik ve fen soruları ise en çok zamanı alır. Bu nedenle sınavın tamamı için bulunan ortalama tempo, her derse aynen uygulanmamalıdır.",
      "Pratik bir yöntem şudur: her ders için ayrı ölçüm yapın, hızlı olduğunuz bölümlerde kazandığınız süreyi yavaş olduğunuz bölüme aktarın. Örneğin sözel bölümde soru başına 45 saniye harcıyorsanız, sayısal bölümde 90 saniyeyi aşmanız toplam süreyi bozmayabilir. Araçtaki hedef alanlarını her bölüm için ayrı ayrı doldurarak bu dengeyi kurabilirsiniz.",
    ] },
    { h: 'Hızı artırmak için uygulanabilir öneriler', ul: [
      "<strong>Süreli çözün.</strong> Her çalışmada kronometre kullanmak, sınavdaki zaman baskısına alışmanın en kısa yoludur.",
      "<strong>Takılınca geçin.</strong> Bir soruda hedef sürenizin iki katını aştıysanız işaret koyup sonraya bırakın; turu tamamladıktan sonra dönün.",
      "<strong>İşaretleme süresini hesaba katın.</strong> Optik forma kodlama için sınavın sonunda birkaç dakika ayırın ya da her sayfanın sonunda toplu kodlayın.",
      "<strong>Konu eksiğini hızla karıştırmayın.</strong> Bir konuda sürekli yavaşsanız sorun tempo değil bilgi eksiğidir; önce konuyu pekiştirin.",
      "<strong>Haftalık ölçüm yapın.</strong> Aynı türden testlerde sürenizi her hafta kaydetmek, gelişimi görmenizi sağlar.",
    ] },
    { h: 'Varsayımlar', p: [
      "Araç yalnızca aritmetik ortalama üzerinden çalışır; yorgunluğu, sınav heyecanını ve soruların zorluk dağılımını bilemez. Gerçek sınavda son bölümde hızın düşmesi olağandır, bu yüzden hedef temponuzu sınavın istediğinden biraz daha hızlı belirlemek güvenli bir pay bırakır. Sınavların güncel soru sayısı ve süreleri için ilgili kurumun duyurularını esas alın; bu sayfada sabit bir sınav bilgisi tutulmaz.",
    ] },
  ],
  faq: [
    ['Soru başına süre nasıl bulunur?', "Harcadığınız toplam süreyi çözdüğünüz soru sayısına bölersiniz. 60 dakikada 40 soru çözdüyseniz soru başına 1,5 dakika, yani 90 saniye harcamışsınızdır."],
    ['Saatte kaç soru çözmeliyim?', "Bunun evrensel bir cevabı yoktur; hedefi hazırlandığınız sınav belirler. Sınavın soru sayısını süresine bölerek gereken tempoyu bulun ve kendi hızınızı bu değerle karşılaştırın."],
    ['Boş bıraktığım soruları saymalı mıyım?', "Üzerinde zaman harcadığınız her soruyu sayın, hiç bakmadıklarınızı saymayın. Amaç bir soruyla ilgilenirken geçen ortalama süreyi bulmaktır; okuyup boş bıraktığınız soru da zaman almıştır."],
    ['Durum satırında yetişmiyor yazıyor, ne yapmalıyım?', "Gereken soru başı süre ile kendi sürenizi karşılaştırın. Fark birkaç saniyeyse süreli pratikle kapanır. Fark büyükse takıldığınız soru türlerini belirleyip önce konu eksiğini giderin."],
    ['Hedef alanlarını boş bırakabilir miyim?', "Evet. İki isteğe bağlı alan boşken yalnızca kendi temponuz hesaplanır. Yalnızca birini doldurursanız ona ait satır eklenir; ikisini de doldurursanız yetişme durumu gösterilir."],
    ['Ondalıklı süre girebilir miyim?', "Evet. 42 dakika 30 saniye süren bir testi 42,5 olarak yazabilirsiniz. Ondalık ayırıcı olarak virgül ya da nokta kullanılabilir."],
    ['Hızlı çözmek mi, doğru çözmek mi daha önemli?', "İkisi birlikte değerlendirilmelidir. Önce doğruluk oturur, sonra aynı doğruluk korunarak süre kısaltılır. Hız uğruna yanlış sayısını artırmak çoğu sınavda net kaybına yol açar."],
    ['Bilgilerim saklanıyor mu?', "Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz soru ve süre değerleri sunucuya gönderilmez, kaydedilmez. Gelişiminizi izlemek için sonuçları kendiniz not etmelisiniz."],
  ],
  related: ['basari-yuzdesi-hesapla', 'sinav-notu-hesapla', 'soru-dagilimi-hesapla', 'pomodoro-plani-hesapla', 'ders-calisma-plani-hesapla'],
};
