export default {
  slug: 'sunum-suresi-hesapla',
  title: 'Sunum Süresi ve Slayt Sayısı Hesaplama',
  h1Tail: 'kaç slayt, kaç kelime?',
  pageTitle: 'Sunum Süresi ve Slayt Sayısı Hesaplama – Kaç Slayt Hazırlamalıyım?',
  description: 'Sunum sürenizi, soru-cevap payını ve slayt başına ayırdığınız süreyi girin; hazırlamanız gereken slayt sayısını ve konuşma metninin kelime sayısını öğrenin.',
  card: 'Sunum sürenize göre kaç slayt hazırlamanız ve konuşma metninizin kaç kelime olması gerektiğini hesaplayın.',
  category: 'egitim',
  keywords: ['sunum süresi hesaplama', 'kaç slayt hazırlamalıyım', 'slayt sayısı hesaplama', 'sunum kaç kelime olmalı', '10 dakikalık sunum kaç slayt', 'konuşma metni uzunluğu', 'tez savunması slayt sayısı'],
  lead: 'Size ayrılan süreyi ve slayt başına ne kadar konuşmayı düşündüğünüzü yazın; araç <strong>kaç slayt</strong> hazırlamanız gerektiğini ve konuşma metninizin yaklaşık <strong>kaç kelime</strong> olması gerektiğini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'sure', label: 'Toplam süre (dakika)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'sc', label: 'Soru-cevap ve giriş payı (dakika)', type: 'number', value: '0', hint: 'Sorular, tanışma, teknik kurulum gibi konuşma dışı süre.' },
    { id: 'slaytDk', label: 'Slayt başına süre (dakika)', type: 'number', value: '2' },
    { id: 'hiz', label: 'Konuşma hızı (kelime/dakika)', type: 'number', value: '130', hint: 'Kendi hızınızı bir dakikalık okuma denemesiyle ölçebilirsiniz.' },
  ],
  compute(v, h) {
    const sure = h.pos(v.sure, 'Toplam süre');
    const sc = h.nonneg(String(h.opt(v.sc, 0, 'Soru-cevap payı')), 'Soru-cevap payı');
    const sd = h.pos(v.slaytDk, 'Slayt başına süre');
    const hiz = h.pos(v.hiz, 'Konuşma hızı');
    if (sure > 1440) h.err('Toplam süre 1440 dakikadan (24 saat) uzun olamaz.');
    if (sc >= sure) h.err('Soru-cevap payı toplam süreden kısa olmalı; konuşmaya süre kalmıyor.');
    if (hiz > 400) h.err('Konuşma hızı dakikada 400 kelimeden büyük olamaz; değeri kontrol edin.');
    const net = sure - sc;
    const slayt = Math.max(1, Math.floor(net / sd + 1e-9));
    const kelime = net * hiz;
    return {
      rows: [
        ['Önerilen slayt sayısı', h.fmt(slayt, 0) + ' slayt'],
        ['Net konuşma süresi', h.fmt(net, 2) + ' dk'],
        ['Konuşma metni uzunluğu', h.fmt(kelime, 0) + ' kelime'],
        ['Slayt başına ortalama kelime', h.fmt(kelime / slayt, 0) + ' kelime'],
        ['Slayt başına düşen süre', h.fmt(net / slayt, 2) + ' dk'],
        ['Yarı noktada olmanız gereken slayt', h.fmt(Math.max(1, Math.round(slayt / 2)), 0) + '. slayt'],
      ],
      note: 'Slayt sayısı aşağı yuvarlanır; süreyi aşmaktansa bir slayt eksik hazırlamak daha güvenlidir. Başlık ve teşekkür slaytları kısa geçildiği için bu sayıya ek olarak düşünülebilir.',
    };
  },
  cases: [
    { in: { sure: '20', sc: '5', slaytDk: '2', hiz: '130' }, out: { 'Önerilen slayt sayısı': '7 slayt', 'Net konuşma süresi': '15 dk', 'Konuşma metni uzunluğu': '1.950 kelime', 'Slayt başına ortalama kelime': '279 kelime', 'Slayt başına düşen süre': '2,14 dk' } },
    { in: { sure: '10', sc: '0', slaytDk: '1', hiz: '130' }, out: { 'Önerilen slayt sayısı': '10 slayt', 'Konuşma metni uzunluğu': '1.300 kelime', 'Slayt başına ortalama kelime': '130 kelime' } },
    { in: { sure: '45', sc: '10', slaytDk: '3', hiz: '120' }, out: { 'Önerilen slayt sayısı': '11 slayt', 'Konuşma metni uzunluğu': '4.200 kelime', 'Slayt başına ortalama kelime': '382 kelime' } },
    { in: { sure: '5', sc: '0', slaytDk: '0,5', hiz: '150' }, out: { 'Önerilen slayt sayısı': '10 slayt', 'Konuşma metni uzunluğu': '750 kelime', 'Yarı noktada olmanız gereken slayt': '5. slayt' } },
    { in: { sure: '60', sc: '15', slaytDk: '2', hiz: '130' }, out: { 'Önerilen slayt sayısı': '22 slayt', 'Konuşma metni uzunluğu': '5.850 kelime' } },
    { in: { sure: '3', sc: '0', slaytDk: '2', hiz: '130' }, out: { 'Önerilen slayt sayısı': '1 slayt', 'Konuşma metni uzunluğu': '390 kelime' } },
    { in: { sure: '10', sc: '10', slaytDk: '2', hiz: '130' }, error: true },
    { in: { sure: '0', sc: '0', slaytDk: '2', hiz: '130' }, error: true },
    { in: { sure: '20', sc: '0', slaytDk: 'iki', hiz: '130' }, error: true },
  ],
  howto: [
    'Size verilen toplam süreyi dakika olarak yazın.',
    'Soru-cevap, tanışma ve bilgisayar kurulumu gibi konuşma dışı işlere ayrılacak süreyi "pay" alanına girin; yoksa 0 bırakın.',
    'Her slaytta ortalama kaç dakika konuşmayı planladığınızı yazın. Yoğun içerikli akademik slaytlar için 2–3 dakika, görsel ağırlıklı hızlı slaytlar için 1 dakika ya da daha azı uygundur.',
    'Konuşma hızınızı girin ya da varsayılanı kullanın, ardından "Hesapla" düğmesine basın.',
    'Çıkan slayt sayısı ve kelime sayısına göre taslağınızı kısaltın ya da genişletin, sonra kronometreyle prova yapın.',
  ],
  sections: [
    { h: 'Sunumlarda en yaygın sorun: süreyi aşmak', p: [
      'Sunum hazırlayanların çoğu içeriği anlatmak istediklerine göre kurar, süreye göre değil. Sonuç tanıdıktır: ilk slaytlarda rahat rahat konuşulur, son beş slayt bir dakikada geçilir ve en önemli kısım olan sonuçlara zaman kalmaz. Tez savunmasında, proje jürisinde ya da iş toplantısında süreyi aşmak, içeriğin kalitesinden bağımsız olarak olumsuz izlenim bırakır.',
      'Çözüm, hazırlığa slayt tasarlayarak değil sayıyla başlamaktır. Kaç dakikanız olduğu belliyse kaç slayt gösterebileceğiniz ve kaç kelime söyleyebileceğiniz de aşağı yukarı bellidir. Bu araç o iki sınırı verir; içerik bu sınırların içine yerleştirilir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Önce net konuşma süresi bulunur: <strong>net süre = toplam süre − soru-cevap ve giriş payı</strong>. Slayt sayısı, net sürenin slayt başına ayırdığınız süreye bölünmesiyle elde edilir ve aşağı yuvarlanır: <strong>slayt = net süre ÷ slayt başına süre</strong>. Konuşma metninin uzunluğu ise <strong>kelime = net süre × konuşma hızı</strong> ile hesaplanır.',
      'Slayt sayısı aşağı yuvarlandığı için gerçekte slayt başına düşen süre, yazdığınız değerden biraz fazla çıkar. Bu küçük fazlalık, geçişler ve beklenmedik duraksamalar için doğal bir tampon işlevi görür.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Size 20 dakika verildiğini, bunun 5 dakikasının sorulara ayrıldığını düşünelim. Net konuşma süresi 15 dakikadır. Slayt başına 2 dakika planlıyorsanız 15 ÷ 2 = 7,5 çıkar; araç bunu <strong>7 slayta</strong> yuvarlar. Dakikada 130 kelime hızla 15 dakikada 15 × 130 = <strong>1950 kelime</strong> söylenebilir; bu da slayt başına ortalama 279 kelime eder.',
      'Aynı mantıkla 45 dakikalık bir seminerde 10 dakika soru payı ayrılırsa net süre 35 dakikadır. Slayt başına 3 dakika ve dakikada 120 kelime ile 11 slayt ve 4200 kelimelik bir metin gerekir. 10 dakikalık kısa bir sınıf sunumunda ise slayt başına 1 dakika ile 10 slayt ve 1300 kelime yeterlidir.',
    ] },
    { h: 'Slayt başına süre nasıl seçilir?', ul: [
      '<strong>30 saniye – 1 dakika</strong>: tek bir görsel, tek bir cümle ya da tek bir sayı içeren hızlı slaytlar. Tanıtım ve satış sunumlarında yaygındır.',
      '<strong>1 – 2 dakika</strong>: birkaç maddelik ya da bir grafikli standart slayt. Ders ve toplantı sunumlarının çoğu bu aralıktadır.',
      '<strong>2 – 3 dakika</strong>: yöntem, tablo ya da ayrıntılı bulgu içeren akademik slaytlar. Tez savunmaları ve kongre bildirileri için uygundur.',
      '<strong>3 dakikadan fazla</strong>: slayt büyük olasılıkla fazla doludur; ikiye bölmek dinleyicinin takibini kolaylaştırır.',
    ] },
    { h: 'Konuşma hızı hakkında', p: [
      'Dinleyici önünde anlaşılır bir konuşma temposu çoğu kişi için dakikada 110 ile 150 kelime arasındadır; araç varsayılan olarak 130 değerini kullanır. Bu bir ortalamadır: heyecan konuşmayı hızlandırır, teknik terimler ve yabancı dilde sunum yavaşlatır. Türkçede kelimeler uzun olduğu için aynı sürede söylenen kelime sayısı, kısa kelimeli dillere göre daha düşük olabilir.',
      'Kendi hızınızı bulmak kolaydır: konuşma metninizden bir bölümü, sunumda kullanacağınız ses tonu ve duraklamalarla bir dakika boyunca okuyun ve okuduğunuz kelimeleri sayın. Bu değeri araca girdiğinizde metin uzunluğu sizin temponuza göre hesaplanır.',
    ] },
    { h: 'Hazırlık için öneriler', ul: [
      'Metni kelimesi kelimesine ezberlemek yerine her slayt için anahtar cümleleri belirleyin; kelime sayısını yalnızca kapsamı sınırlamak için kullanın.',
      'En az bir kez kronometreyle, ayakta ve sesli prova yapın. İçinden okumak gerçek süreden belirgin biçimde kısa sürer.',
      '"Yarı noktada olmanız gereken slayt" satırını bir kontrol noktası olarak kullanın: sürenin yarısında o slayta ulaşmadıysanız hızlanmanız ya da bir bölümü atlamanız gerekir.',
      'Süre kısalırsa çıkarabileceğiniz bir iki slaytı önceden belirleyin.',
      'Sonuç slaytına her koşulda en az bir dakika ayırın; dinleyicinin aklında en çok o kalır.',
    ] },
    { h: 'Sınırlar', p: [
      'Sonuç bir planlama tahminidir. Video ya da canlı gösterim içeren slaytlar, dinleyiciyle etkileşim, çeviri beklenen toplantılar ve teknik aksaklıklar süreyi değiştirir. Bazı etkinliklerin slayt sayısı ve süre için kendi biçim kuralları vardır; bu durumda düzenleyicinin duyurduğu kurallar esas alınmalıdır. Araç, her slayta eşit süre ayrıldığını varsayar; gerçek sunumda bazı slaytlar birkaç saniye, bazıları dakikalar alır ve önemli olan toplamın tutmasıdır.',
    ] },
  ],
  faq: [
    ['10 dakikalık sunum kaç slayt olmalı?', 'Slayt başına 1 dakika ayırırsanız 10, 2 dakika ayırırsanız 5 slayt uygundur. Yoğun içerikli sunumlarda az slayt, görsel ağırlıklı sunumlarda daha fazla slayt tercih edilir. Soru-cevap için süre ayrılacaksa onu toplamdan düşün.'],
    ['20 dakikalık bir konuşma kaç kelime eder?', 'Dakikada 130 kelime hızla 20 dakikada yaklaşık 2600 kelime söylenir. Bunun 5 dakikası sorulara ayrılırsa konuşma metni 1950 kelimeye iner. Kendi konuşma hızınıza göre sonuç değişir.'],
    ['Slayt sayısı neden aşağı yuvarlanıyor?', 'Yarım slayt hazırlanamaz ve yukarı yuvarlamak süreyi aşmanıza neden olabilir. Aşağı yuvarlandığında slayt başına birkaç saniyelik tampon kalır; bu da geçişler ve duraksamalar için kullanılır.'],
    ['Başlık ve teşekkür slaytları sayıya dahil mi?', 'Araç bütün slaytlara eşit süre ayrıldığını varsayar. Başlık, içindekiler ve teşekkür slaytları genellikle birkaç saniyede geçildiği için bunları hesaplanan sayıya ek olarak düşünebilirsiniz.'],
    ['Tez savunmasında kaç slayt hazırlamalıyım?', 'Bu, size ayrılan sunum süresine bağlıdır ve kurumdan kuruma değişir. Sürenizi öğrenip slayt başına 2–3 dakika ile hesaplayın. Jürinin soruları için ayrılan süreyi pay alanına yazmayı unutmayın.'],
    ['Konuşma hızımı nasıl ölçerim?', 'Sunum metninizden bir bölümü, gerçek sunumdaki tonunuzla bir dakika boyunca sesli okuyun ve okuduğunuz kelimeleri sayın. Birkaç kez tekrarlayıp ortalamasını alırsanız daha güvenilir bir değer elde edersiniz.'],
    ['Slayt başına süre için 1 dakikadan küçük değer girebilir miyim?', 'Evet. Örneğin 30 saniye için 0,5 yazabilirsiniz. Böylece 5 dakikalık hızlı bir sunumda 10 slayt elde edersiniz.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kelime-sayfa-cevir', 'yazma-hizi-sure-hesapla', 'kitap-okuma-suresi-hesapla', 'pomodoro-plani-hesapla', 'ders-calisma-plani-hesapla'],
};
