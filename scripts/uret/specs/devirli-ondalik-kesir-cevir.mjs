export default {
  slug: 'devirli-ondalik-kesir-cevir',
  title: 'Devirli Ondalık Sayıyı Kesre Çevirme',
  h1Tail: 'devreden sayıdan kesre',
  pageTitle: 'Devirli Ondalık Sayıyı Kesre Çevirme – Devreden Sayı Hesaplama',
  description: 'Devirli ondalık sayıyı kesre çevirin: tam kısmı, devretmeyen ve devreden basamakları yazın; sade kesir, sadeleşmemiş hâli ve açılımı anında görün.',
  card: 'Devirli (devreden) ondalık sayıyı rasyonel kesre çevirin; 9 ve 0 kuralıyla sadeleşmemiş hâli ve en sade kesri görün.',
  category: 'matematik',
  keywords: ['devirli ondalık sayıyı kesre çevirme', 'devirli ondalık sayı', 'devreden sayı kesre çevirme', 'devirli sayı hesaplama', 'devirli ondalık açılım', 'rasyonel sayıya çevirme', '0,333 kesir olarak'],
  lead: 'Virgülden sonra aynı basamakları sonsuza kadar tekrar eden <strong>devirli ondalık sayıyı</strong> kesre çevirin. Tam kısmı, devretmeyen basamakları ve devreden basamakları ayrı ayrı yazmanız yeterlidir.',
  button: 'Kesre çevir',
  inputs: [
    { id: 'tamKisim', label: 'Tam kısım', type: 'text', value: '0', hint: 'Virgülden önceki sayı.' },
    { id: 'devretmeyen', label: 'Devretmeyen basamaklar', type: 'text', placeholder: 'Örn. 1 (yoksa boş bırakın)', hint: 'Virgülden sonra gelen ve tekrar etmeyen kısım.' },
    { id: 'devreden', label: 'Devreden basamaklar', type: 'text', placeholder: 'Örn. 6', hint: 'Sonsuza kadar tekrar eden kısım (devir çizgisinin altındaki basamaklar).' },
  ],
  compute(v, h) {
    const temiz = (s) => String(s ?? '').replace(/\s/g, '');
    const T = temiz(v.tamKisim) === '' ? '0' : temiz(v.tamKisim);
    const N = temiz(v.devretmeyen);
    const R = temiz(v.devreden);
    if (!/^\d+$/.test(T)) h.err('"Tam kısım" yalnızca rakamlardan oluşmalı (örn. 0 ya da 12). Negatif sayı için sonucu eksi işaretiyle yazın.');
    if (N !== '' && !/^\d+$/.test(N)) h.err('"Devretmeyen basamaklar" yalnızca rakamlardan oluşmalı; devretmeyen kısım yoksa alanı boş bırakın.');
    if (R === '') h.err('"Devreden basamaklar" alanını doldurun; örneğin 0,333… için 3 yazın.');
    if (!/^\d+$/.test(R)) h.err('"Devreden basamaklar" yalnızca rakamlardan oluşmalı (örn. 3 ya da 142857).');
    if (/^0+$/.test(R)) h.err('Devreden kısım yalnızca sıfırlardan oluşamaz; bu durumda sayı devirli değildir. Sıfırdan farklı en az bir rakam yazın.');
    if (T.length > 15 || N.length > 15 || R.length > 15) h.err('Her alan en fazla 15 basamak olabilir.');
    const hepsi = BigInt(T + N + R);
    const on = BigInt(T + N);
    const hamPay = hepsi - on;
    const hamPayda = BigInt('9'.repeat(R.length) + '0'.repeat(N.length));
    let x = hamPay, y = hamPayda;
    while (y) { const t = x % y; x = y; y = t; }
    const p = hamPay / x, q = hamPayda / x;
    const tamYaz = String(BigInt(T));
    let acilim = N + R;
    while (acilim.length < 12) acilim += R;
    const rows = [
      ['Kesir (sade)', q === 1n ? String(p) : `${p}/${q}`],
      ['Sadeleşmemiş kesir', `${hamPay}/${hamPayda}`],
    ];
    if (q !== 1n && p > q) rows.push(['Tam sayılı kesir', `${p / q} tam ${p % q}/${q}`]);
    rows.push(['Devirli gösterim', `${tamYaz},${N}(${R})`]);
    rows.push(['Açılım', `${tamYaz},${acilim.slice(0, 12)}…`]);
    return {
      rows,
      note: `Kural: (${BigInt(T + N + R)} − ${on}) / ${hamPayda}. Paydada devreden basamak sayısı kadar 9, devretmeyen basamak sayısı kadar 0 bulunur.`,
    };
  },
  cases: [
    { in: { tamKisim: '0', devretmeyen: '', devreden: '3' }, out: { 'Kesir (sade)': '1/3', 'Sadeleşmemiş kesir': '3/9', 'Devirli gösterim': '0,(3)', 'Açılım': '0,333333333333…' } },
    { in: { tamKisim: '0', devretmeyen: '1', devreden: '6' }, out: { 'Kesir (sade)': '1/6', 'Sadeleşmemiş kesir': '15/90', 'Devirli gösterim': '0,1(6)', 'Açılım': '0,166666666666…' } },
    { in: { tamKisim: '2', devretmeyen: '', devreden: '3' }, out: { 'Kesir (sade)': '7/3', 'Sadeleşmemiş kesir': '21/9', 'Tam sayılı kesir': '2 tam 1/3' } },
    { in: { tamKisim: '0', devretmeyen: '', devreden: '142857' }, out: { 'Kesir (sade)': '1/7', 'Sadeleşmemiş kesir': '142857/999999' } },
    { in: { tamKisim: '0', devretmeyen: '58', devreden: '3' }, out: { 'Kesir (sade)': '7/12', 'Sadeleşmemiş kesir': '525/900' } },
    { in: { tamKisim: '1', devretmeyen: '2', devreden: '34' }, out: { 'Kesir (sade)': '611/495', 'Sadeleşmemiş kesir': '1222/990', 'Tam sayılı kesir': '1 tam 116/495', 'Açılım': '1,234343434343…' } },
    { in: { tamKisim: '0', devretmeyen: '', devreden: '9' }, out: { 'Kesir (sade)': '1', 'Sadeleşmemiş kesir': '9/9' } },
    { in: { tamKisim: '0', devretmeyen: '', devreden: '27' }, out: { 'Kesir (sade)': '3/11', 'Sadeleşmemiş kesir': '27/99' } },
    { in: { tamKisim: '', devretmeyen: '0', devreden: '6' }, out: { 'Kesir (sade)': '1/15', 'Sadeleşmemiş kesir': '6/90', 'Devirli gösterim': '0,0(6)' } },
    { in: { tamKisim: '0', devretmeyen: '', devreden: '' }, error: true },
    { in: { tamKisim: '0', devretmeyen: '', devreden: '3a' }, error: true },
    { in: { tamKisim: '0', devretmeyen: '5', devreden: '0' }, error: true },
    { in: { tamKisim: '-1', devretmeyen: '', devreden: '3' }, error: true },
  ],
  howto: [
    'Sayının virgülden önceki kısmını "Tam kısım" alanına yazın. Sayı 0,… ile başlıyorsa 0 olarak bırakın.',
    'Virgülden sonra gelen ama tekrar etmeyen basamaklar varsa "Devretmeyen basamaklar" alanına yazın; yoksa bu alanı boş bırakın.',
    'Sonsuza kadar tekrar eden basamak grubunu "Devreden basamaklar" alanına bir kez yazın. Örneğin 0,1666… için devretmeyen 1, devreden 6\'dır.',
    '"Kesre çevir" düğmesine basın. İlk satırda en sade kesri, ikinci satırda kuralın doğrudan verdiği sadeleşmemiş kesri görürsünüz.',
    '"Açılım" satırından sayıyı doğru girip girmediğinizi kontrol edin; yazdığınız sayının ilk on iki ondalık basamağı burada gösterilir.',
  ],
  sections: [
    { h: 'Devirli ondalık sayı nedir?', p: [
      'Bir kesrin payını paydasına böldüğünüzde bölme ya bir yerde biter ya da kalanlar tekrar etmeye başlar ve aynı basamak grubu sonsuza kadar sürer. İkinci türdeki sayılara devirli ondalık sayı, tekrar eden gruba da <strong>devreden</strong> denir. 1 ÷ 3 = 0,333… ve 1 ÷ 7 = 0,142857142857… bunun bilinen örnekleridir.',
      'Defterde devreden basamakların üzerine bir çizgi çekilir. Klavyeyle yazarken bu çizgi yerine parantez kullanmak yaygındır; bu sayfada da 0,1(6) yazımı "sıfır tam, onda bir ve devreden altı", yani 0,1666… anlamına gelir. Virgülden hemen sonra devir başlıyorsa sayıya <em>basit devirli</em>, arada devretmeyen basamaklar varsa <em>karışık devirli</em> denir.',
      'Her devirli ondalık sayı bir rasyonel sayıdır, yani iki tam sayının oranı olarak yazılabilir. Bunun tersi de doğrudur: her kesrin ondalık açılımı ya sonludur ya devirlidir. Açılımı ne biten ne de tekrar eden sayılar, örneğin pi sayısı ve 2\'nin karekökü, irrasyoneldir ve kesre çevrilemez.',
    ] },
    { h: 'Kesre çevirme kuralı', p: [
      'Okullarda öğretilen kısa kural şöyledir:',
      '<strong>Kesir = (sayının virgülsüz tamamı − devretmeyen kısmın virgülsüz tamamı) / (devreden basamak sayısı kadar 9, ardından devretmeyen ondalık basamak sayısı kadar 0)</strong>',
      '"Sayının tamamı" derken tam kısım, devretmeyen basamaklar ve devreden grubun bir kez yazılmış hâli virgül atılarak yan yana getirilir. "Devretmeyen kısım" ise tam kısım ile devretmeyen ondalık basamakların yan yana yazılmasıdır. Paydadaki 9\'ların sayısı devreden basamak sayısına, 0\'ların sayısı virgülden sonraki devretmeyen basamak sayısına eşittir. Tam kısım paydayı etkilemez.',
    ] },
    { h: 'Çözümlü örnekler', ol: [
      '<strong>0,(3):</strong> sayının tamamı 3, devretmeyen kısım 0. Pay 3 − 0 = 3. Devreden bir basamak olduğu için payda 9. Sonuç 3/9 = 1/3.',
      '<strong>0,1(6):</strong> sayının tamamı 16, devretmeyen kısım 1. Pay 16 − 1 = 15. Bir devreden, bir devretmeyen basamak var; payda 90. Sonuç 15/90 = 1/6.',
      '<strong>2,(3):</strong> sayının tamamı 23, devretmeyen kısım 2. Pay 23 − 2 = 21, payda 9. Sonuç 21/9 = 7/3, yani 2 tam 1/3.',
      '<strong>0,58(3):</strong> pay 583 − 58 = 525, payda 900. 525/900 kesri 75\'e bölünerek 7/12 olur.',
      '<strong>1,2(34):</strong> pay 1234 − 12 = 1222, payda 990. Sadeleşince 611/495 bulunur.',
      '<strong>0,(142857):</strong> pay 142857, payda 999999. İkisi de 142857\'ye bölünür ve sonuç 1/7 çıkar.',
    ] },
    { h: 'Kural nereden geliyor?', p: [
      'Kural bir ezber değil, basit bir denklem çözümüdür. x = 0,1666… olsun. Devretmeyen kısmı virgülün soluna almak için iki tarafı 10 ile çarpın: 10x = 1,666… Devreden grubu bir kez daha sola geçirmek için 100 ile çarpın: 100x = 16,666… Bu iki eşitliğin virgülden sonraki kısımları aynıdır; taraf tarafa çıkarınca sonsuz kuyruk yok olur: 100x − 10x = 16 − 1, yani 90x = 15 ve x = 15/90 = 1/6.',
      'Paydadaki 90 sayısı 100 − 10 farkından gelir; 9\'lar ve 0\'lar bu çıkarmanın doğal sonucudur. Devreden grup iki basamaklıysa 100 ile, üç basamaklıysa 1000 ile çarpmak gerekir; paydada o kadar 9 görünmesinin nedeni budur.',
    ] },
    { h: '0,999… neden 1\'e eşittir?', p: [
      'Devreden kısma 9 yazdığınızda araç 9/9, yani 1 sonucunu verir. Bu bir hata değildir: 0,999… ile 1 aynı sayının iki farklı yazılışıdır. Yukarıdaki yöntemle görmek kolaydır: x = 0,999… ise 10x = 9,999… olur; çıkarınca 9x = 9 ve x = 1 bulunur. Başka bir yoldan, 1/3 = 0,333… eşitliğinin iki tarafını 3 ile çarparsanız 1 = 0,999… elde edersiniz. Aynı nedenle 0,4(9) sayısı 0,5\'e, 2,(9) sayısı 3\'e eşittir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Devreden grubu birden fazla kez yazmak: 0,(3) için devreden alanına 333 yazarsanız sonuç yine 1/3 çıkar, ama sadeleşmemiş kesir 333/999 olur. Grubu bir kez yazmak yeterlidir.',
      'Devretmeyen basamağı devredene katmak: 0,1666… sayısında devreden yalnızca 6\'dır. 16 yazılırsa sayı 0,161616… olarak yorumlanır ve 16/99 gibi bambaşka bir sonuç çıkar.',
      'Baştaki sıfırı atlamak: 0,0(6) sayısında devretmeyen kısım 0\'dır ve yazılması gerekir; sonuç 6/90 = 1/15\'tir. Sıfır yazılmazsa sayı 0,(6) = 2/3 olur.',
      'Çıkarma adımını unutmak: karışık devirli sayılarda paya yalnızca sayının tamamını yazmak yanlıştır; devretmeyen kısım mutlaka çıkarılır.',
      'Araç her alanda en fazla 15 basamak kabul eder ve negatif tam kısım almaz. Negatif bir devirli sayı için pozitif hâlini çevirip sonucun başına eksi işareti koyun.',
    ] },
  ],
  faq: [
    ['Devirli ondalık sayı kesre nasıl çevrilir?', 'Sayının virgülsüz tamamından devretmeyen kısım çıkarılır ve paya yazılır. Paydaya devreden basamak sayısı kadar 9, devretmeyen ondalık basamak sayısı kadar 0 yazılır; sonra kesir sadeleştirilir.'],
    ['0,333… kesir olarak kaçtır?', '0,333… sayısı 3/9, yani sadeleşmiş hâliyle 1/3\'tür. Aynı biçimde 0,666… sayısı 6/9 = 2/3 eder.'],
    ['0,1666… sayısının kesir karşılığı nedir?', 'Devretmeyen kısım 1, devreden kısım 6\'dır. Pay 16 − 1 = 15, payda 90 olur; 15/90 kesri sadeleşince 1/6 elde edilir.'],
    ['Devreden ile devretmeyen kısmı nasıl ayırt ederim?', 'Virgülden sonraki basamaklara bakın: bir noktadan sonra aynı grup kesintisiz tekrar ediyorsa o grup devredendir, ondan önce kalan ondalık basamaklar devretmeyendir. 0,58333… sayısında 58 devretmeyen, 3 devredendir.'],
    ['0,999… gerçekten 1\'e eşit mi?', 'Evet. İki yazılış aynı sayıyı gösterir; aralarında hiçbir sayı yoktur. Kural uygulandığında 9/9 = 1 bulunur. Bu, ondalık gösterimin bazı sayılar için iki farklı yazıma izin vermesinden kaynaklanır.'],
    ['Her ondalık sayı kesre çevrilebilir mi?', 'Sonlu ve devirli ondalık sayılar kesre çevrilebilir. Basamakları hiçbir düzenle tekrar etmeden sonsuza kadar süren sayılar irrasyoneldir ve iki tam sayının oranı olarak yazılamaz.'],
    ['Hangi kesirlerin açılımı devirli olur?', 'En sade hâlindeki bir kesrin paydasında 2 ve 5 dışında bir asal çarpan varsa açılım devirlidir. 1/3, 1/6, 1/7 ve 1/11 devirli; 1/4, 1/8 ve 1/20 sonlu açılıma sahiptir.'],
    ['Yazdığım sayılar bir yere kaydediliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda gerçekleşir; girdiğiniz basamaklar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ondalik-kesir-cevir', 'kesir-sadelestir', 'kesir-hesapla', 'bilesik-kesir-cevir', 'yuzde-kesir-cevir'],
};
