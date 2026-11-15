export default {
  slug: 'konusma-suresi-hesapla',
  title: 'Konuşma Süresi Hesaplama',
  h1Tail: 'metin kaç dakikada konuşulur?',
  pageTitle: 'Konuşma Süresi Hesaplama – Sunum Metni Kaç Dakika Sürer?',
  description: 'Konuşma ya da sunum metninizin kaç dakika süreceğini konuşma hızına göre hesaplayın. Hedef süre girerek metnin kaç kelime fazla ya da eksik olduğunu görün.',
  card: 'Konuşma, sunum ya da seslendirme metninizin süresini hesaplayın; hedef süreye göre kaç kelime fazla olduğunu görün.',
  category: 'metin',
  keywords: ['konuşma süresi hesaplama', 'sunum süresi hesaplama', 'metin kaç dakika sürer', '5 dakikalık konuşma kaç kelime', 'dakikada kaç kelime konuşulur', 'seslendirme süresi', 'konuşma metni uzunluğu', 'sunum metni kaç kelime olmalı'],
  lead: 'Hazırladığınız konuşmanın, sunumun ya da seslendirme metninin sahnede ne kadar süreceğini önceden görün. Araç süreyi <strong>kelime sayısı ÷ konuşma hızı</strong> ile bulur; bir <strong>hedef süre</strong> yazarsanız metninizin bu süreye göre kaç kelime uzun ya da kısa olduğunu da söyler.',
  button: 'Hesapla',
  inputs: [
    { id: 'metin', label: 'Konuşma metni', type: 'textarea', placeholder: 'Konuşma ya da sunum metninizi yapıştırın (ya da aşağıya kelime sayısını yazın)', wide: true },
    { id: 'kelime', label: 'Kelime sayısı (metin yoksa)', type: 'number', placeholder: 'Örn. 650', hint: 'Metin yapıştırdıysanız boş bırakın; metin doluysa bu alan dikkate alınmaz.' },
    { id: 'hiz', label: 'Konuşma hızı', type: 'select', options: [['130', 'Sunum temposu (130 kelime/dk)'], ['110', 'Yavaş ve vurgulu (110 kelime/dk)'], ['150', 'Hızlı ve akıcı (150 kelime/dk)'], ['170', 'Çok hızlı (170 kelime/dk)']] },
    { id: 'ozelHiz', label: 'Kendi hızınız (isteğe bağlı)', type: 'number', placeholder: 'kelime/dk', hint: 'Doldurursanız yukarıdaki seçim yerine bu hız kullanılır.' },
    { id: 'hedef', label: 'Hedef süre, dakika (isteğe bağlı)', type: 'number', placeholder: 'Örn. 5', hint: 'Size ayrılan süreyi yazın; metnin fazlası ya da eksiği hesaplanır.' },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    let kelime;
    if (metin.trim() !== '') {
      kelime = metin.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      if (kelime === 0) h.err('Metinde sayılabilecek kelime bulunamadı. Harf ya da rakam içeren bir metin yapıştırın.');
    } else if (String(v.kelime ?? '').trim() !== '') {
      kelime = h.posint(v.kelime, 'Kelime sayısı');
    } else h.err('Konuşma metnini yapıştırın ya da "Kelime sayısı" alanını doldurun.');
    const hiz = String(v.ozelHiz ?? '').trim() !== '' ? h.pos(v.ozelHiz, 'Kendi hızınız') : Number(v.hiz) || 130;
    if (hiz > 600) h.err('"Kendi hızınız" en fazla 600 kelime/dk olabilir.');
    const sure = (sn) => {
      const t = Math.round(sn);
      if (t < 60) return `${t} sn`;
      const sa = Math.floor(t / 3600), dk = Math.floor((t % 3600) / 60), s = t % 60;
      return [sa ? `${sa} sa` : '', dk ? `${dk} dk` : '', s ? `${s} sn` : ''].filter(Boolean).join(' ');
    };
    const rows = [
      ['Konuşma süresi', sure((kelime / hiz) * 60)],
      ['Kelime sayısı', h.fmt(kelime, 0)],
      ['Konuşma hızı', h.fmt(hiz, 1) + ' kelime/dk'],
      ['Yavaş tempo (110 kelime/dk)', sure((kelime / 110) * 60)],
      ['Hızlı tempo (150 kelime/dk)', sure((kelime / 150) * 60)],
    ];
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef süre');
      const sigan = Math.floor(hedef * hiz + 1e-9);
      const fark = kelime - sigan;
      rows.push(['Hedef süreye sığan kelime', h.fmt(sigan, 0)]);
      rows.push(['Hedefe göre durum', fark === 0 ? 'Hedefe tam uygun' : `${h.fmt(Math.abs(fark), 0)} kelime ${fark > 0 ? 'fazla' : 'eksik'} (${sure((Math.abs(fark) / hiz) * 60)})`]);
    }
    return { rows, note: 'Süre; duraklamalar, soru-cevap, alkış ve slayt geçişleri dışında yalnızca konuşulan metni kapsar. Prova yaparak kendi hızınızla doğrulayın.' };
  },
  cases: [
    { in: { kelime: '650' }, out: { 'Konuşma süresi': '5 dk', 'Kelime sayısı': '650', 'Konuşma hızı': '130 kelime/dk', 'Yavaş tempo (110 kelime/dk)': '5 dk 55 sn', 'Hızlı tempo (150 kelime/dk)': '4 dk 20 sn' } },
    { in: { kelime: '1300', hedef: '8' }, out: { 'Konuşma süresi': '10 dk', 'Hedef süreye sığan kelime': '1.040', 'Hedefe göre durum': '260 kelime fazla (2 dk)' } },
    { in: { metin: 'Sayın konuklar, bugün burada sizlerle olmaktan büyük mutluluk duyuyorum.', ozelHiz: '120' }, out: { 'Kelime sayısı': '9', 'Konuşma süresi': '5 sn', 'Konuşma hızı': '120 kelime/dk' } },
    { in: { kelime: '450', hiz: '150', hedef: '3' }, out: { 'Konuşma süresi': '3 dk', 'Hedef süreye sığan kelime': '450', 'Hedefe göre durum': 'Hedefe tam uygun' } },
    { in: { kelime: '390', hedef: '5' }, out: { 'Konuşma süresi': '3 dk', 'Hedef süreye sığan kelime': '650', 'Hedefe göre durum': '260 kelime eksik (2 dk)' } },
    { in: { kelime: '2200', hiz: '110' }, out: { 'Konuşma süresi': '20 dk', 'Hızlı tempo (150 kelime/dk)': '14 dk 40 sn' } },
    { in: { kelime: '7800' }, out: { 'Konuşma süresi': '1 sa' } },
    { in: { metin: '', kelime: '' }, error: true },
    { in: { kelime: '650', hedef: '0' }, error: true },
    { in: { kelime: '650', ozelHiz: 'hızlı' }, error: true },
  ],
  howto: [
    'Konuşma metninizi "Konuşma metni" kutusuna yapıştırın. Metin henüz hazır değilse kutuyu boş bırakıp planladığınız kelime sayısını yazın.',
    '"Konuşma hızı" listesinden temponuzu seçin. Prova yapıp hızınızı ölçtüyseniz "Kendi hızınız" alanına dakikadaki kelime sayısını girin.',
    'Size ayrılan süre belliyse "Hedef süre" alanına dakika olarak yazın; örneğin 7,5 yazarak yedi buçuk dakikayı belirtebilirsiniz.',
    '"Hesapla" düğmesine basın. Konuşma süresini, hedefe sığan kelime sayısını ve metninizin kaç kelime fazla ya da eksik olduğunu görün.',
    'Metni kısaltıp ya da genişletip yeniden hesaplayın; durum satırı "Hedefe tam uygun" olana ya da küçük bir pay kalana kadar sürdürün.',
  ],
  sections: [
    { h: 'Konuşma süresi nasıl hesaplanır?', p: [
      'Hesap şu bağıntıya dayanır: <strong>süre (dakika) = kelime sayısı ÷ konuşma hızı (kelime/dakika)</strong>. Araç sonucu saniyeye çevirip en yakın saniyeye yuvarlar. Hedef süre yazdığınızda ters işlem de yapılır: <strong>sığan kelime = hedef süre × konuşma hızı</strong>. Metninizdeki kelime sayısı ile bu değer arasındaki fark, kesmeniz ya da eklemeniz gereken kelime miktarını ve bunun yaklaşık süre karşılığını verir.',
      'Kelimeler boşluklara göre ayrılır; içinde harf ya da rakam bulunan her parça bir kelimedir. Rakamla yazılmış sayılar tek kelime sayılır, oysa "1.250.000" gibi bir sayıyı söylemek birkaç kelime sürer. Metninizde çok sayı varsa bunları yazıyla yazmak daha gerçekçi bir süre verir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 650 kelimelik bir konuşma, dakikada 130 kelimelik sunum temposuyla 650 ÷ 130 = 5 dakika sürer. Aynı metin yavaş ve vurgulu bir anlatımla (110 kelime/dk) 5 dakika 55 saniye, hızlı ve akıcı bir anlatımla (150 kelime/dk) 4 dakika 20 saniye tutar.',
      '<strong>Örnek 2:</strong> Elinizde 1.300 kelimelik bir metin var ve size 8 dakika ayrılmış. Sunum temposuyla metin 1.300 ÷ 130 = 10 dakika sürer. Sekiz dakikaya 8 × 130 = 1.040 kelime sığar; yani metin 260 kelime, süre olarak 2 dakika fazladır.',
      '<strong>Örnek 3:</strong> Beş dakikalık bir söz hakkı için 390 kelime yazdınız. Metin 3 dakikada biter; hedefe 650 kelime sığdığı için 260 kelime, yani yaklaşık 2 dakikalık yeriniz daha vardır.',
    ] },
    { h: 'Hangi konuşma hızını seçmeliyim?', p: [
      'Konuşma hızı sessiz okuma hızından belirgin biçimde düşüktür ve konuşmacıya, heyecana, dinleyiciye ve dile göre değişir. Araçtaki değerler yaygın kullanılan kaba aralıklardır; kesin bir ölçü değildir. Türkçede kelimeler eklerle uzadığı için, kelime cinsinden konuşma hızı başka diller için verilen değerlerden düşük çıkabilir. Kararsızsanız daha yavaş bir tempo seçin: sürenin altında kalmak, süreyi aşmaktan her zaman daha iyidir.',
    ], ul: [
      '<strong>110 kelime/dk:</strong> tören konuşmaları, kalabalık salonlar, çeviri yapılan toplantılar, teknik ve yoğun içerik.',
      '<strong>130 kelime/dk:</strong> slaytlı sunumlar, ders anlatımı, bilgilendirme konuşmaları.',
      '<strong>150 kelime/dk:</strong> akıcı sohbet havasındaki anlatımlar, tanıtım videoları, radyo sunumu.',
      '<strong>170 kelime/dk:</strong> hızlı okunan reklam ve duyuru metinleri; uzun süre sürdürmek zordur.',
    ] },
    { h: 'Süreye göre yaklaşık kelime sayıları', p: [
      'Sunum temposu olan dakikada 130 kelimeye göre, belirli sürelere sığan kelime sayıları şöyledir. Kendi hızınız farklıysa süreyi hızınızla çarparak aynı tabloyu kendiniz çıkarabilirsiniz.',
    ], ul: [
      '<strong>1 dakika:</strong> 130 kelime (kısa tanıtım, asansör konuşması)',
      '<strong>3 dakika:</strong> 390 kelime',
      '<strong>5 dakika:</strong> 650 kelime',
      '<strong>10 dakika:</strong> 1.300 kelime',
      '<strong>15 dakika:</strong> 1.950 kelime',
      '<strong>20 dakika:</strong> 2.600 kelime',
      '<strong>45 dakika:</strong> 5.850 kelime (bir ders saati kadar)',
    ] },
    { h: 'Sahnede süreyi tutturmanın yolları', p: [
      'Hesaplanan süre yalnızca sözcüklerin söylenme süresidir. Gerçek bir konuşmada nefes aralıkları, vurgu için verilen duraklamalar, slayt geçişleri, dinleyicinin gülmesi ya da alkışı ve teknik aksaklıklar da zaman alır. Bu yüzden metni size ayrılan sürenin tamamını dolduracak biçimde değil, bir miktar pay bırakarak yazmak iyi bir alışkanlıktır. Hedef süre alanına gerçek sürenizden biraz kısa bir değer girerek bu payı hesaba katabilirsiniz.',
      'Heyecan çoğu konuşmacıyı hızlandırır; provada sekiz dakika süren metin sahnede yedi dakikada bitebilir. Tersine, metinden okumak yerine serbest anlatanlar konuyu açtıkça süreyi aşar. En güvenilir yöntem, metni ayakta ve yüksek sesle, kronometreyle okumak ve ölçtüğünüz hızı "Kendi hızınız" alanına yazmaktır: kelime sayısını prova sürenize (dakika olarak) bölmeniz yeterlidir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç her kelimeyi eşit süreli sayar; uzun ve çok heceli kelimelerle dolu bir metin, aynı sayıda kısa kelimeden oluşan bir metinden daha uzun sürer. Soru-cevap bölümü, video gösterimi, canlı uygulama gibi metin dışı bölümler hesaba dahil değildir; bunların süresini ayrıca ekleyin. Sonuç bir planlama tahminidir, provanın yerini tutmaz.',
    ] },
  ],
  faq: [
    ['5 dakikalık konuşma kaç kelime olmalı?', 'Dakikada 130 kelimelik sunum temposuyla yaklaşık 650 kelime. Yavaş ve vurgulu konuşuyorsanız 550, hızlı konuşuyorsanız 750 kelime dolayında bir metin beş dakikayı doldurur.'],
    ['Dakikada kaç kelime konuşulur?', 'Kişiye ve duruma göre değişir. Araçta 110 ile 170 kelime/dk arasında dört tempo bulunur; slaytlı bir sunum için 130 kelime/dk makul bir başlangıç değeridir. En doğrusu kendi hızınızı prova ile ölçmektir.'],
    ['Kendi konuşma hızımı nasıl ölçerim?', 'Metninizin bir bölümünü kronometreyle yüksek sesle okuyun. Okuduğunuz kelime sayısını geçen süreye (dakika) bölün. Örneğin 280 kelimeyi 2 dakikada okuduysanız hızınız 140 kelime/dk olur.'],
    ['Hedef süre alanı ne işe yarar?', 'Size ayrılan süreyi yazdığınızda araç o süreye sığan kelime sayısını bulur ve metninizin kaç kelime fazla ya da eksik olduğunu, bunun kaç saniyeye karşılık geldiğini gösterir.'],
    ['Duraklamalar ve slayt geçişleri hesaba katılıyor mu?', 'Hayır. Yalnızca metnin söylenme süresi hesaplanır. Duraklama, alkış ve geçişler için hedef süreyi gerçek sürenizden biraz kısa girerek pay bırakabilirsiniz.'],
    ['Seslendirme ve video metinleri için kullanılabilir mi?', 'Evet. Tanıtım videosu, radyo duyurusu ya da sesli kitap metninin süresini tahmin etmek için uygundur. Seslendirmenin temposuna uygun hızı seçin ya da seslendirmenin kendi hızını girin.'],
    ['Okuma süresi ile konuşma süresi arasındaki fark nedir?', 'Sessiz okuma, yüksek sesle konuşmaktan hızlıdır. Aynı metin sessiz okunurken daha kısa, dinleyici önünde konuşulurken daha uzun sürer; bu yüzden iki araç farklı hız değerleri kullanır.'],
    ['Konuşma metnim bir yere gönderiliyor mu?', 'Hayır. Hesaplama tümüyle tarayıcınızda yapılır; metniniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['okuma-suresi-hesapla', 'kelime-sayaci', 'karakter-sayaci', 'cumle-sayaci', 'paragraf-sayaci'],
};
