export default {
  slug: 'ondalik-kesir-cevir',
  title: 'Ondalık Sayıyı Kesre Çevirme',
  h1Tail: '0,75 → 3/4',
  pageTitle: 'Ondalık Sayıyı Kesre Çevirme – En Sade Kesir ve Tam Sayılı Kesir',
  description: 'Ondalık sayıyı kesre çevirin: 0,75 = 3/4. Sadeleşmemiş hâlini, sadeleştirmede kullanılan EBOB değerini, tam sayılı kesri ve yüzde karşılığını adım adım görün.',
  card: 'Ondalık sayıyı en sade kesre çevirin; sadeleştirme adımı, tam sayılı kesir ve yüzde karşılığıyla birlikte.',
  category: 'matematik',
  keywords: ['ondalık sayıyı kesre çevirme', 'ondalık kesir çevirme', 'virgüllü sayıyı kesre çevirme', '0,75 kesir olarak', 'ondalık gösterim kesir', 'ondalık sayı rasyonel sayıya çevirme', 'kesre çevirme hesaplama', '0,125 kaç bölü kaç'],
  lead: 'Virgüllü bir sayı yazın; araç onu <strong>en sade kesir</strong> olarak versin. Sonuçla birlikte paydası 10\'un kuvveti olan ilk hâlini, hangi sayıyla sadeleştirildiğini, 1\'den büyük sayılarda tam sayılı kesir karşılığını ve yüzde değerini de görürsünüz.',
  button: 'Çevir',
  inputs: [
    { id: 'sayi', label: 'Ondalık sayı', type: 'text', placeholder: 'Örn. 0,75', hint: 'Sonlu ondalık sayı yazın; virgül ya da nokta kullanabilirsiniz (en fazla 15 ondalık basamak)' },
  ],
  compute(v, h) {
    const t = String(v.sayi ?? '').trim().replace(/\s+/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Ondalık sayı" alanını doldurun (örn. 0,75).');
    if (t.includes('/')) h.err('Bu araç ondalık sayıyı kesre çevirir; kesir değil, 0,75 gibi virgüllü bir sayı yazın.');
    const m = /^([-+]?)(\d*)(?:[.,](\d*))?$/.exec(t);
    if (!m || (m[2] === '' && (m[3] ?? '') === '')) h.err('Geçerli bir ondalık sayı yazın (örn. 0,75 ya da 2,5). Binlik ayraç kullanmayın.');
    const tamKisim = m[2] === '' ? '0' : m[2];
    const kesirKisim = m[3] ?? '';
    if (kesirKisim.length > 15) h.err('En fazla 15 ondalık basamak yazabilirsiniz.');
    if (tamKisim.replace(/^0+/, '').length > 15) h.err('Tam kısım en fazla 15 basamak olabilir.');
    const negatif = m[1] === '-';
    let pay = BigInt(tamKisim + kesirKisim);
    let payda = 10n ** BigInt(kesirKisim.length);
    const ebob = (a, b) => { while (b) { [a, b] = [b, a % b]; } return a; };
    const g = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const isaret = negatif && pay !== 0n ? '-' : '';
    const bolen = pay === 0n ? payda : ebob(pay, payda);
    const sPay = pay / bolen, sPayda = payda / bolen;
    const rows = [
      ['Kesir (en sade hâli)', `${isaret}${g(sPay)}/${g(sPayda)}`],
      ['Sadeleşmemiş kesir', `${isaret}${g(pay)}/${g(payda)}`],
      ['Sadeleştirmede bölünen sayı (EBOB)', g(bolen)],
    ];
    const tam = sPay / sPayda, kalan = sPay % sPayda;
    if (sPayda !== 1n && tam > 0n) rows.push(['Tam sayılı kesir', `${isaret}${g(tam)} tam ${g(kalan)}/${g(sPayda)}`]);
    rows.push(['Kesir türü', sPayda === 1n ? 'Tam sayı' : tam > 0n ? 'Bileşik kesir' : 'Basit kesir']);
    const deger = Number(tamKisim + '.' + (kesirKisim || '0')) * (negatif ? -1 : 1);
    rows.push(['Yüzde karşılığı', '%' + h.fmt(deger * 100, 10)]);
    let note;
    if (sPayda === 1n) note = 'Sayının ondalık kısmı olmadığı için paydası 1 olan bir kesir olarak yazılır.';
    else if (bolen === 1n) note = `Pay ile payda aralarında asal olduğundan ${g(pay)}/${g(payda)} kesri daha fazla sadeleşmez.`;
    else note = `Virgülden sonra ${kesirKisim.length} basamak olduğu için payda ${g(payda)} alındı; pay ve payda ${g(bolen)} ile bölünerek sadeleştirildi.`;
    return { rows, note };
  },
  cases: [
    { in: { sayi: '0,75' }, out: { 'Kesir (en sade hâli)': '3/4', 'Sadeleşmemiş kesir': '75/100', 'Sadeleştirmede bölünen sayı (EBOB)': '25', 'Kesir türü': 'Basit kesir', 'Yüzde karşılığı': '%75' } },
    { in: { sayi: '2,5' }, out: { 'Kesir (en sade hâli)': '5/2', 'Sadeleşmemiş kesir': '25/10', 'Sadeleştirmede bölünen sayı (EBOB)': '5', 'Tam sayılı kesir': '2 tam 1/2', 'Kesir türü': 'Bileşik kesir', 'Yüzde karşılığı': '%250' } },
    { in: { sayi: '0,125' }, out: { 'Kesir (en sade hâli)': '1/8', 'Sadeleşmemiş kesir': '125/1.000', 'Sadeleştirmede bölünen sayı (EBOB)': '125', 'Yüzde karşılığı': '%12,5' } },
    { in: { sayi: '-1,2' }, out: { 'Kesir (en sade hâli)': '-6/5', 'Sadeleşmemiş kesir': '-12/10', 'Tam sayılı kesir': '-1 tam 1/5' } },
    { in: { sayi: '3.14' }, out: { 'Kesir (en sade hâli)': '157/50', 'Tam sayılı kesir': '3 tam 7/50', 'Sadeleştirmede bölünen sayı (EBOB)': '2' } },
    { in: { sayi: '0,333' }, out: { 'Kesir (en sade hâli)': '333/1.000', 'Sadeleştirmede bölünen sayı (EBOB)': '1' } },
    { in: { sayi: '5' }, out: { 'Kesir (en sade hâli)': '5/1', 'Kesir türü': 'Tam sayı', 'Yüzde karşılığı': '%500' } },
    { in: { sayi: '0,0625' }, out: { 'Kesir (en sade hâli)': '1/16', 'Sadeleşmemiş kesir': '625/10.000' } },
    { in: { sayi: ',5' }, out: { 'Kesir (en sade hâli)': '1/2' } },
    { in: { sayi: '0,50' }, out: { 'Kesir (en sade hâli)': '1/2', 'Sadeleşmemiş kesir': '50/100' } },
    { in: { sayi: '0' }, out: { 'Kesir (en sade hâli)': '0/1', 'Kesir türü': 'Tam sayı' } },
    { in: { sayi: 'sıfır virgül beş' }, error: true },
    { in: { sayi: '3/4' }, error: true },
    { in: { sayi: '' }, error: true },
    { in: { sayi: '1.234,5' }, error: true },
  ],
  howto: [
    '"Ondalık sayı" alanına çevirmek istediğiniz sayıyı yazın: 0,75 ya da 2,5 gibi. Ondalık ayırıcı olarak virgül de nokta da kabul edilir; binlik ayraç kullanmayın.',
    '"Çevir" düğmesine basın. İlk satırda sayının en sade kesir karşılığı görünür.',
    '"Sadeleşmemiş kesir" ve "EBOB" satırlarını izleyerek sonucun nasıl elde edildiğini adım adım takip edin.',
    'Sayı 1\'den büyükse "Tam sayılı kesir" satırındaki karşılığı; oran olarak kullanacaksanız "Yüzde karşılığı" satırını kullanın.',
  ],
  sections: [
    { h: 'Ondalık sayı kesre nasıl çevrilir?', p: [
      'Her sonlu ondalık sayı, paydası 10\'un bir kuvveti olan bir kesirdir; ondalık yazım yalnızca bu kesrin kısa gösterimidir. Çevirme üç adımda yapılır:',
    ], ol: [
      'Virgülü atıp sayıyı paya yazın.',
      'Virgülden sonra kaç basamak varsa paydaya 1\'in yanına o kadar sıfır koyun: bir basamak için 10, iki basamak için 100, üç basamak için 1000.',
      'Pay ve paydayı en büyük ortak bölenlerine (EBOB) bölerek kesri sadeleştirin.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 0,75 sayısında virgülden sonra iki basamak vardır; pay 75, payda 100 olur. 75 ile 100\'ün en büyük ortak böleni 25\'tir. 75 ÷ 25 = 3 ve 100 ÷ 25 = 4 olduğundan <strong>0,75 = 3/4</strong>.',
      '<strong>Örnek 2:</strong> 0,125 için üç basamak vardır: 125/1000. EBOB 125\'tir; sadeleşince <strong>1/8</strong> kalır. Adım adım giderseniz önce 5\'e (25/200), sonra yine 5\'e (5/40), sonra bir kez daha 5\'e (1/8) bölersiniz; sonuç aynıdır.',
      '<strong>Örnek 3 – 1\'den büyük sayı:</strong> 2,5 = 25/10 = 5/2. Pay paydadan büyük olduğu için bu bir bileşik kesirdir. Tam sayılı kesir olarak yazmak için pay paydaya bölünür: 5 ÷ 2 = 2, kalan 1; yani <strong>2 tam 1/2</strong>. Tam kısmı ayrı tutup yalnızca ondalık kısmı çevirmek de aynı sonucu verir: 0,5 = 1/2.',
      '<strong>Örnek 4 – negatif sayı:</strong> −1,2 için işaret bir kenara bırakılır: 12/10 = 6/5. Sonuç −6/5, tam sayılı yazımla −1 tam 1/5\'tir.',
      '<strong>Örnek 5 – sadeleşmeyen kesir:</strong> 0,333 = 333/1000. 333 = 3 × 3 × 37, 1000 = 2³ × 5³ olduğundan ortak çarpan yoktur ve kesir bu hâliyle kalır. Dikkat: bu sayı 1/3\'e eşit değildir; 1/3 sonsuza kadar süren 0,333… devirli sayısıdır.',
    ] },
    { h: 'Sık kullanılan ondalık – kesir karşılıkları', ul: [
      '<strong>0,5</strong> = 1/2 · <strong>0,25</strong> = 1/4 · <strong>0,75</strong> = 3/4',
      '<strong>0,2</strong> = 1/5 · <strong>0,4</strong> = 2/5 · <strong>0,6</strong> = 3/5 · <strong>0,8</strong> = 4/5',
      '<strong>0,125</strong> = 1/8 · <strong>0,375</strong> = 3/8 · <strong>0,625</strong> = 5/8 · <strong>0,875</strong> = 7/8',
      '<strong>0,1</strong> = 1/10 · <strong>0,05</strong> = 1/20 · <strong>0,04</strong> = 1/25 · <strong>0,025</strong> = 1/40',
      '<strong>0,0625</strong> = 1/16 · <strong>0,01</strong> = 1/100 · <strong>0,001</strong> = 1/1000',
      '<strong>1,5</strong> = 3/2 = 1 tam 1/2 · <strong>1,25</strong> = 5/4 = 1 tam 1/4 · <strong>2,75</strong> = 11/4 = 2 tam 3/4',
    ] },
    { h: 'Paydada neden yalnızca 2 ve 5 çarpanları kalır?', p: [
      'Sonlu bir ondalık sayının paydası başlangıçta 10\'un kuvvetidir ve 10 = 2 × 5 olduğundan paydanın asal çarpanları yalnızca 2 ve 5\'tir. Sadeleştirme bu çarpanların bir kısmını götürebilir ama yenisini ekleyemez. Bu yüzden bu aracın ürettiği kesirlerin paydası hep 2, 4, 5, 8, 10, 16, 20, 25, 40, 50 gibi sayılardır.',
      'Bunun tersi de doğrudur ve kullanışlı bir kuraldır: en sade hâldeki bir kesrin paydasında 2 ve 5\'ten başka asal çarpan varsa o kesrin ondalık açılımı sonlu değildir, devreder. 1/3 = 0,333…, 1/7 = 0,142857142857… ve 5/6 = 0,8333… bu türdendir. Devirli ondalık sayılar farklı bir yöntemle kesre çevrilir; bu sayfa yalnızca sonlu ondalık sayılarla çalışır. 0,33 yazarsanız sonuç 33/100 olur, 1/3 değil.',
    ] },
    { h: 'Basit, bileşik ve tam sayılı kesir', p: [
      'Payı paydasından küçük olan kesirlere <strong>basit kesir</strong> denir; değerleri 0 ile 1 arasındadır (3/4 gibi). Payı paydasına eşit ya da ondan büyük olanlar <strong>bileşik kesirdir</strong> (5/2 gibi). Bileşik kesirler, bir tam sayı ile bir basit kesrin toplamı olarak da yazılabilir; buna <strong>tam sayılı kesir</strong> denir: 5/2 = 2 tam 1/2.',
      'Hangi yazımın kullanılacağı işe bağlıdır. Çarpma ve bölme yaparken bileşik kesir daha kullanışlıdır; ölçü bildirirken ise tam sayılı kesir daha anlaşılırdır. Bir tarifte 2,75 su bardağı un, "iki tam dörtte üç bardak" diye okunur; marangozlukta 1,5 metre "bir buçuk metre" olarak söylenir. Araç her iki yazımı da verir.',
    ] },
    { h: 'Nerede işe yarar?', p: [
      'Okulda rasyonel sayılar, oran-orantı ve yüzde konularında ondalık ile kesir arasında sürekli geçiş yapılır; ödev sonuçlarını bu araçla sağlayabilirsiniz. Mutfakta ölçü kapları kesirli işaretlenir (1/4, 1/2, 3/4 bardak); hesap makinesinden çıkan 0,375 değerinin 3/8 olduğunu bilmek ölçmeyi kolaylaştırır. İnç ölçülü anahtar, matkap ucu ve boru çaplarında 0,625 inç yerine 5/8 inç yazılır.',
      'Olasılık ve istatistikte 0,125 yerine 1/8 demek sonucu daha anlaşılır kılar: sekiz denemede bir. Oranları sadeleştirirken, ölçekli çizimlerde ve indirim oranlarını yorumlarken de kesir karşılığı çoğu zaman daha okunaklıdır: 0,2 oranı beşte bir, yani yüzde yirmidir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Basamak sayısını yanlış saymak.</strong> 0,05 sayısında iki ondalık basamak vardır; karşılığı 5/100 = 1/20\'dir, 5/10 değil.',
      '<strong>Sadeleştirmeyi yarıda bırakmak.</strong> 0,75 = 75/100 doğru ama en sade hâli değildir; 15/20 de öyle. Pay ve payda aralarında asal olana dek bölünmelidir.',
      '<strong>Yuvarlanmış sayıyı tam değer sanmak.</strong> Hesap makinesinin gösterdiği 0,6667 değeri 6667/10000 kesrine çevrilir; bunun 2/3 olduğunu ancak siz yorumlayabilirsiniz.',
      '<strong>Sondaki sıfırların sonucu değiştireceğini düşünmek.</strong> 0,5 ile 0,50 aynı sayıdır; ikisi de 1/2 eder.',
      '<strong>Binlik ayraç yazmak.</strong> 1.250,5 gibi girdiler bu araçta kabul edilmez; sayıyı 1250,5 biçiminde yazın.',
    ] },
    { h: 'Sınırlar', p: [
      'Çeviri tam sayı aritmetiğiyle yapılır; bu nedenle sonuç yaklaşık değil kesindir ve yazdığınız her basamak hesaba katılır. En fazla 15 ondalık basamak ve 15 basamaklı tam kısım desteklenir. Devirli ondalık sayılar, karekök ya da pi gibi irrasyonel sayılar sonlu ondalık olmadıkları için bu yöntemle tam olarak kesre çevrilemez; yazdığınız kısım neyse onun kesir karşılığı verilir.',
    ] },
  ],
  faq: [
    ['0,75 kesir olarak nasıl yazılır?', '0,75 = 75/100\'dür. Pay ve payda 25\'e bölündüğünde en sade hâli 3/4 çıkar.'],
    ['Ondalık sayıyı kesre çevirmenin kuralı nedir?', 'Virgül atılıp sayı paya yazılır; paydaya virgülden sonraki basamak sayısı kadar sıfırı olan 10\'un kuvveti yazılır; sonra kesir sadeleştirilir. İki basamak varsa payda 100, üç basamak varsa 1000 olur.'],
    ['1\'den büyük ondalık sayılar nasıl çevrilir?', 'Aynı kural uygulanır ve bileşik kesir elde edilir: 2,5 = 25/10 = 5/2. İsterseniz tam kısmı ayırıp tam sayılı kesir yazarsınız: 2 tam 1/2. Araç ikisini de gösterir.'],
    ['0,333 neden 1/3 çıkmıyor?', 'Çünkü 0,333 üç basamakta biten bir sayıdır ve tam karşılığı 333/1000\'dir. 1/3 ise hiç bitmeyen 0,333… devirli sayısıdır. Devirli sayılar için ayrı bir çevirme yöntemi gerekir.'],
    ['Her ondalık sayı kesre çevrilebilir mi?', 'Sonlu ve devirli ondalık sayıların tamamı kesir olarak yazılabilir; bunlar rasyonel sayılardır. Basamakları düzensiz biçimde sonsuza dek süren sayılar (pi, karekök 2 gibi) irrasyoneldir ve hiçbir kesre tam olarak eşit değildir.'],
    ['Kesrin en sade hâlde olduğunu nasıl anlarım?', 'Pay ile paydanın 1\'den başka ortak böleni yoksa kesir en sade hâldedir. Araç sadeleştirmede kullanılan en büyük ortak böleni ayrı satırda gösterir; bu değer 1 ise kesir zaten sadedir.'],
    ['Kesri tekrar ondalık sayıya nasıl çeviririm?', 'Payı paydaya bölersiniz: 3 ÷ 4 = 0,75. Payda 2 ve 5 dışında asal çarpan içermiyorsa bölme sonlanır; içeriyorsa sonuç devirli çıkar.'],
    ['Yazdığım sayı kaydediliyor mu?', 'Hayır. Çevirme işlemi tarayıcınızda yapılır; girdiğiniz sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kesir-sadelestir', 'kesir-hesapla', 'devirli-ondalik-kesir-cevir', 'yuzde-kesir-cevir', 'bilesik-kesir-cevir', 'ebob-ekok'],
};
