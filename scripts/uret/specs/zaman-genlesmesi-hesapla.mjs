export default {
  slug: 'zaman-genlesmesi-hesapla',
  title: 'Göreli Zaman Genleşmesi Hesaplama',
  h1Tail: 'Lorentz çarpanı ile',
  pageTitle: 'Göreli Zaman Genleşmesi Hesaplama – Lorentz Çarpanı (γ)',
  description: 'Işık hızına yakın hareket eden bir saatin ne kadar yavaş işlediğini hesaplayın. Hızı c oranı, yüzde, km/s ya da m/s girin; Lorentz çarpanını ve süre farkını görün.',
  card: 'Hıza göre Lorentz çarpanını ve hareketli saat ile durgun gözlemci arasındaki süre farkını hesaplayın.',
  category: 'bilim',
  keywords: ['zaman genleşmesi hesaplama', 'lorentz çarpanı hesaplama', 'özel görelilik zaman', 'ışık hızında zaman', 'gama faktörü', 'ikizler paradoksu hesaplama', 'göreli zaman'],
  lead: `Özel görelilik kuramına göre hareket eden bir saat, durgun bir gözlemciye göre daha yavaş işler. Hızı ve bilinen süreyi girin; araç <strong>Lorentz çarpanını (γ)</strong>, iki çerçevedeki süreleri ve aradaki farkı hesaplasın.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hiz', label: 'Hız', type: 'number', placeholder: 'Örn. 0,8' },
    { id: 'birim', label: 'Hız birimi', type: 'select', options: [['c', 'Işık hızının katı (c)'], ['yuzde', 'Işık hızının yüzdesi (%)'], ['kms', 'km/s'], ['ms', 'm/s']] },
    { id: 'sure', label: 'Bilinen süre', type: 'number', placeholder: 'Örn. 3', hint: 'Yıl, gün, saniye… Sonuç aynı birimde çıkar.' },
    { id: 'yon', label: 'Bilinen süre kime ait?', type: 'select', options: [['oz', 'Hareketli saat (yolcu)'], ['goz', 'Durgun gözlemci']] },
  ],
  compute(v, h) {
    const C = 299792458;
    const x = h.nonneg(v.hiz, 'Hız');
    let beta;
    if (v.birim === 'yuzde') beta = x / 100;
    else if (v.birim === 'kms') beta = (x * 1000) / C;
    else if (v.birim === 'ms') beta = x / C;
    else beta = x;
    if (!(beta < 1)) h.err('Hız ışık hızından küçük olmalı. Kütlesi olan bir cisim ışık hızına ulaşamaz; 0,999999 c gibi bir değer deneyin.');
    const sure = h.pos(v.sure, 'Bilinen süre');
    const kok = Math.sqrt(1 - beta * beta);
    const gama = 1 / kok;
    // γ − 1 için düşük hızlarda duyarlılığı koruyan biçim
    const gm1 = (beta * beta) / (kok * (1 + kok));
    let oz, goz;
    if (v.yon === 'goz') { goz = sure; oz = sure * kok; } else { oz = sure; goz = sure * gama; }
    const fark = oz * gm1;
    const rows = [
      ['Lorentz çarpanı (γ)', h.sig(gama, 7)],
      v.yon === 'goz' ? ['Hareketli saatte geçen süre', h.sig(oz, 8)] : ['Durgun gözlemciye göre süre', h.sig(goz, 8)],
      v.yon === 'goz' ? ['Durgun gözlemciye göre süre', h.sig(goz, 8)] : ['Hareketli saatte geçen süre', h.sig(oz, 8)],
      ['Süre farkı', h.sig(fark, 6)],
      ['Hız (c cinsinden)', h.sig(beta, 8) + ' c'],
      ['Hız (km/s)', h.sig(beta * C / 1000, 8) + ' km/s'],
    ];
    return { rows, note: 'Süreler girdiğiniz birimdedir. Hesap yalnızca özel göreliliği (sabit hız) kapsar; kütle çekiminden kaynaklanan zaman genleşmesi dahil değildir. c = 299.792.458 m/s.' };
  },
  cases: [
    { in: { hiz: '0,6', birim: 'c', sure: '10', yon: 'oz' }, out: { 'Lorentz çarpanı (γ)': '1,25', 'Durgun gözlemciye göre süre': '12,5', 'Süre farkı': '2,5' } },
    { in: { hiz: '0,8', birim: 'c', sure: '5', yon: 'goz' }, out: { 'Lorentz çarpanı (γ)': '1,666667', 'Hareketli saatte geçen süre': '3', 'Süre farkı': '2' } },
    { in: { hiz: '60', birim: 'yuzde', sure: '4', yon: 'oz' }, out: { 'Lorentz çarpanı (γ)': '1,25', 'Durgun gözlemciye göre süre': '5' } },
    { in: { hiz: '0', birim: 'c', sure: '7', yon: 'oz' }, out: { 'Lorentz çarpanı (γ)': '1', 'Durgun gözlemciye göre süre': '7', 'Süre farkı': '0' } },
    { in: { hiz: '0,99', birim: 'c', sure: '1', yon: 'oz' }, out: { 'Lorentz çarpanı (γ)': '7,088812' } },
    { in: { hiz: '179875,4748', birim: 'kms', sure: '10', yon: 'oz' }, out: { 'Lorentz çarpanı (γ)': '1,25', 'Hız (c cinsinden)': '0,6 c' } },
    { in: { hiz: '1', birim: 'c', sure: '10', yon: 'oz' }, error: true },
    { in: { hiz: '120', birim: 'yuzde', sure: '10', yon: 'oz' }, error: true },
    { in: { hiz: '0,5', birim: 'c', sure: '', yon: 'oz' }, error: true },
  ],
  howto: [
    `"Hız" alanına cismin hızını yazın ve yanındaki listeden birimi seçin. Işık hızının katı için 0 ile 1 arasında bir sayı (örneğin 0,8), yüzde için 0 ile 100 arasında bir sayı girilir.`,
    `"Bilinen süre" alanına elinizdeki süreyi yazın. Birim serbesttir; yıl yazdıysanız sonuç da yıl olarak okunur.`,
    `Bu sürenin kime ait olduğunu seçin: uzay gemisindeki yolcunun saati mi, yoksa geride kalan durgun gözlemcinin saati mi?`,
    `"Hesapla" düğmesine basın. Lorentz çarpanı, diğer çerçevedeki süre ve iki saat arasındaki fark listelenir.`,
  ],
  sections: [
    { h: 'Zaman genleşmesi nedir?', p: [
      `Albert Einstein'ın 1905'te yayımladığı özel görelilik kuramı, ışık hızının bütün eylemsiz gözlemciler için aynı olduğu kabulüne dayanır. Bu kabulün doğrudan sonucu şudur: birbirine göre hareket eden iki gözlemci, aynı iki olay arasında geçen süreyi farklı ölçer. Hareket eden saat, onu dışarıdan izleyen gözlemciye göre daha yavaş tıklar. Bu etkiye zaman genleşmesi denir.`,
      `Etki bir yanılsama ya da saat arızası değildir; zamanın kendisinin ölçülme biçimiyle ilgilidir. Gündelik hızlarda fark o kadar küçüktür ki fark edilmez. Hız ışık hızının önemli bir kesrine ulaştığında ise fark hızla büyür ve ışık hızına yaklaşıldıkça sınırsız artar.`,
    ] },
    { h: 'Formül ve Lorentz çarpanı', p: [
      `Hesabın merkezinde Lorentz çarpanı bulunur: <strong>γ = 1 ÷ √(1 − v²/c²)</strong>. Burada v cismin hızı, c ise boşluktaki ışık hızıdır (saniyede 299.792.458 metre). Hareketli saatte geçen süreye öz zaman denir ve t<sub>0</sub> ile gösterilir. Durgun gözlemcinin ölçtüğü süre <strong>t = γ × t<sub>0</sub></strong> olur.`,
      `γ her zaman 1 ya da 1'den büyüktür. Hız sıfırken tam 1'dir, yani iki saat aynı işler. Hız arttıkça γ büyür; bu da durgun gözlemcinin saatinde daha fazla zaman geçtiği anlamına gelir. Araç, bilinen süre hangi çerçeveye aitse diğerini bu bağıntıyla bulur: yolcunun süresi biliniyorsa γ ile çarpar, gözlemcinin süresi biliniyorsa γ'ya böler.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Bir uzay gemisi ışık hızının yüzde 60'ı ile, yani 0,6 c hızla yol alsın ve gemideki saate göre yolculuk 10 yıl sürsün. Önce v²/c² hesaplanır: 0,6 × 0,6 = 0,36. Sonra 1 − 0,36 = 0,64 bulunur ve karekökü alınır: 0,8. Lorentz çarpanı 1 ÷ 0,8 = 1,25 olur. Dünya'da kalan gözlemciye göre geçen süre 1,25 × 10 = 12,5 yıldır. İki saat arasındaki fark 2,5 yıldır.`,
      `Tersinden bir örnek: gemi 0,8 c hızla gidiyor ve Dünya'daki takvime göre 5 yıl geçiyor. Bu hızda γ = 1 ÷ √(1 − 0,64) = 1 ÷ 0,6 = 1,666667 eder. Yolcunun saatinde geçen süre 5 ÷ 1,666667 = 3 yıldır. Araca hızı 0,8, süreyi 5 yazıp "Durgun gözlemci" seçtiğinizde aynı sonuçları görürsünüz.`,
    ] },
    { h: 'Hıza göre Lorentz çarpanı tablosu', ul: [
      `<strong>0,1 c</strong> → γ ≈ 1,005 (fark yüzde yarım düzeyinde)`,
      `<strong>0,5 c</strong> → γ ≈ 1,1547`,
      `<strong>0,6 c</strong> → γ = 1,25`,
      `<strong>0,8 c</strong> → γ ≈ 1,6667`,
      `<strong>0,9 c</strong> → γ ≈ 2,2942`,
      `<strong>0,99 c</strong> → γ ≈ 7,0888`,
      `<strong>0,999 c</strong> → γ ≈ 22,366`,
      `<strong>0,9999 c</strong> → γ ≈ 70,712`,
    ] },
    { h: 'Gerçek hayatta zaman genleşmesi', p: [
      `Zaman genleşmesi yalnızca kuramsal bir sonuç değildir; defalarca ölçülmüştür. Atmosferin üst katmanlarında kozmik ışınların oluşturduğu müonlar çok kısa ömürlü parçacıklardır ve kendi ömürlerine göre yeryüzüne ulaşmadan bozunmaları beklenir. Buna karşın ışık hızına çok yakın hareket ettikleri için bizim çerçevemizde ömürleri uzar ve yer seviyesindeki dedektörlerde bol miktarda gözlenirler.`,
      `Uçaklarla taşınan atom saatleriyle yapılan deneyler ve parçacık hızlandırıcılarındaki ölçümler de aynı bağıntıyı doğrular. Uydu tabanlı konum belirleme sistemleri, uydu saatlerinin hem hız hem de kütle çekimi nedeniyle yerdeki saatlerden farklı işlemesini hesaba katmak zorundadır; bu düzeltme yapılmasa konum hatası hızla birikir.`,
      `Gündelik hızlarda etki son derece küçüktür. Saatte yaklaşık 900 kilometre hızla uçan bir yolcu uçağı için γ ile 1 arasındaki fark trilyonda bir düzeyinin altındadır. Araç bu kadar küçük farkları da gösterebilmek için süre farkını ayrı bir satırda, gerekirse bilimsel gösterimle verir.`,
    ] },
    { h: 'İkizler paradoksu ve sık yapılan hatalar', p: [
      `Ünlü düşünce deneyinde ikizlerden biri hızlı bir gemiyle uzak bir yıldıza gidip döner, diğeri Dünya'da kalır. Yolcu ikiz döndüğünde kardeşinden daha genç olur. Paradoks gibi görünen nokta, hareketin göreli olması nedeniyle her ikizin diğerini hareketli sayabilmesidir. Çözüm, yolcu ikizin dönüş için yön değiştirmesi, yani ivmelenmesidir; iki ikizin durumu simetrik değildir.`,
      `En sık yapılan hata, sürenin hangi çerçeveye ait olduğunu karıştırmaktır. Öz zaman her zaman olayların aynı yerde gerçekleştiği çerçevede, yani saatin kendi yanında ölçülen süredir ve en kısa olanıdır. İkinci yaygın hata hızı yanlış birimde girmektir: yüzde 80 yazmak isterken birim olarak "ışık hızının katı" seçili kalırsa 80 c gibi olanaksız bir değer girilmiş olur ve araç hata verir.`,
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      `Hesap sabit hızla hareket eden bir cisim için geçerlidir. Hızlanma ve yavaşlama evreleri, ayrıca genel görelilikten gelen kütle çekimsel zaman genleşmesi hesaba katılmaz. Hız ışık hızına eşit ya da ondan büyük girilemez; formüldeki karekök bu durumda tanımsız olur ve kütlesi olan cisimler için fiziksel bir karşılığı yoktur. Çok yüksek hızlarda (örneğin 0,999999999 c) sonuçların duyarlılığı bilgisayardaki sayı gösterimiyle sınırlıdır. Sonuçlar eğitim ve merak amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Lorentz çarpanı ne anlama gelir?', `Lorentz çarpanı (γ), hareketli bir saatin durgun gözlemciye göre kaç kat yavaş işlediğini gösteren sayıdır. γ = 2 ise gözlemcinin saatinde iki saniye geçerken hareketli saatte bir saniye geçer. Aynı çarpan boy kısalması ve göreli enerji hesaplarında da kullanılır.`],
    ['Işık hızının yüzde 99\'unda zaman ne kadar yavaşlar?', `0,99 c hızda Lorentz çarpanı yaklaşık 7,09'dur. Yolcunun saatine göre 1 yıl süren bir yolculuk, durgun gözlemciye göre yaklaşık 7,09 yıl sürer.`],
    ['Işık hızında zaman durur mu?', `Formülde hız ışık hızına yaklaştıkça γ sınırsız büyür. Ancak kütlesi olan bir cisim ışık hızına ulaşamaz, bu yüzden "ışık hızında giden yolcunun saati" fiziksel olarak tanımlı değildir. Araç da bu nedenle 1 c ve üzeri değerleri kabul etmez.`],
    ['Öz zaman nedir?', `Öz zaman, iki olayın aynı yerde gerçekleştiği çerçevede ölçülen süredir; pratikte saatin kendi taşıyıcısının ölçtüğü süredir. Gemi örneğinde yolcunun kol saatinin gösterdiği süre öz zamandır ve diğer bütün gözlemcilerin ölçtüğünden kısadır.`],
    ['Hangi zaman birimini kullanmalıyım?', `İstediğiniz birimi kullanabilirsiniz. Zaman genleşmesi bir oran olduğu için saniye, saat, gün ya da yıl fark etmez; sonuç girdiğiniz birimde çıkar. Yalnızca hız birimini doğru seçmeniz gerekir.`],
    ['Arabayla ya da uçakla giderken de zaman yavaşlar mı?', `Evet, ama ölçülemeyecek kadar az. Saniyede birkaç yüz metrelik hızlarda γ ile 1 arasındaki fark trilyonda bir mertebesindedir. Bu fark ancak atom saatleriyle yapılan hassas deneylerde saptanabilir.`],
    ['Bu hesap kütle çekiminin etkisini içeriyor mu?', `Hayır. Araç yalnızca hızdan kaynaklanan özel görelilik etkisini hesaplar. Büyük kütlelerin yakınında saatlerin yavaşlaması genel göreliliğin konusudur ve ayrı bir formülle hesaplanır.`],
    ['Girdiğim değerler bir yere kaydediliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır, yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['kutle-enerji-hesapla', 'foton-enerjisi-hesapla', 'kacis-hizi-hesapla', 'yorunge-periyodu-hesapla', 'bilimsel-gosterim-cevir'],
};
