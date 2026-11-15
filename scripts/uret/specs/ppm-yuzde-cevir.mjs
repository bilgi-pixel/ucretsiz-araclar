export default {
  slug: 'ppm-yuzde-cevir',
  title: 'PPM Yüzde Çevirici',
  h1Tail: 'ppm ↔ %',
  pageTitle: 'PPM Yüzde Çevirici – ppm\'den Yüzdeye, Yüzdeden ppm\'e Hesaplama',
  description: 'PPM değerini yüzdeye, yüzdeyi ppm\'e çevirin. 1 % = 10.000 ppm bağıntısıyla çalışır; ppb, binde (promil), ondalık oran ve mg/kg karşılığını da verir.',
  card: 'PPM\'i yüzdeye, yüzdeyi PPM\'e çevirin; ppb, binde (promil) ve ondalık oran karşılıkları da listelenir.',
  category: 'birim',
  keywords: ['ppm yüzde çevirme', 'ppm kaç yüzde', 'yüzde ppm hesaplama', '1 ppm yüzde kaç', 'ppb ppm çevirme', 'promil ppm', 'ppm to percent'],
  lead: `Çok küçük oranları ifade eden <strong>ppm</strong> (milyonda bir) değerini <strong>yüzdeye</strong>, yüzdeyi ppm'e çevirin. Aynı anda ppb (milyarda bir), binde (promil) ve ondalık oran karşılıklarını da görürsünüz.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 400' },
    { id: 'birim', label: 'Girilen birim', type: 'select', options: [['ppm', 'ppm (milyonda bir)'], ['yuzde', '% (yüzde)'], ['ppb', 'ppb (milyarda bir)'], ['binde', '‰ (binde, promil)'], ['oran', 'Ondalık oran (0–1)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const payda = { ppm: 1e6, yuzde: 100, ppb: 1e9, binde: 1000, oran: 1 }[v.birim];
    if (!payda) h.err('Geçerli bir birim seçin.');
    const oran = x / payda;
    if (oran > 1 + 1e-12) h.err('Girilen değer bütünün tamamını (%100 = 1.000.000 ppm) aşıyor. Değeri ve birimi kontrol edin.');
    const ppm = oran * 1e6;
    const a = ['Yüzde', '%' + h.sig(oran * 100, 6)];
    const b = ['PPM', h.sig(ppm, 6) + ' ppm'];
    return {
      rows: [
        v.birim === 'ppm' ? a : b,
        v.birim === 'ppm' ? b : a,
        ['PPB', h.sig(oran * 1e9, 6) + ' ppb'],
        ['Binde (promil)', '‰' + h.sig(oran * 1000, 6)],
        ['Ondalık oran', h.sig(oran, 6)],
        ['Kütlece karşılığı', h.sig(ppm, 6) + ' mg/kg'],
      ],
      note: '1 % = 10.000 ppm = 10.000.000 ppb. Sonuçlar altı anlamlı basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '10000', birim: 'ppm' }, out: { 'Yüzde': '%1', 'Binde (promil)': '‰10' } },
    { in: { deger: '0,5', birim: 'yuzde' }, out: { 'PPM': '5.000 ppm', 'PPB': '5.000.000 ppb' } },
    { in: { deger: '400', birim: 'ppm' }, out: { 'Yüzde': '%0,04', 'Ondalık oran': '0,0004', 'Kütlece karşılığı': '400 mg/kg' } },
    { in: { deger: '1', birim: 'ppm' }, out: { 'Yüzde': '%0,0001', 'PPB': '1.000 ppb', 'Ondalık oran': '0,000001' } },
    { in: { deger: '250', birim: 'ppb' }, out: { 'PPM': '0,25 ppm', 'Yüzde': '%0,000025' } },
    { in: { deger: '5', birim: 'binde' }, out: { 'PPM': '5.000 ppm', 'Yüzde': '%0,5' } },
    { in: { deger: '0,02', birim: 'oran' }, out: { 'PPM': '20.000 ppm', 'Yüzde': '%2' } },
    { in: { deger: '100', birim: 'yuzde' }, out: { 'PPM': '1.000.000 ppm' } },
    { in: { deger: '2000000', birim: 'ppm' }, error: true },
    { in: { deger: '-5', birim: 'ppm' }, error: true },
  ],
  howto: [
    `"Değer" alanına elinizdeki sayıyı yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz.`,
    `"Girilen birim" listesinden değerin ppm mi, yüzde mi, ppb mi, binde mi yoksa ondalık oran mı olduğunu seçin.`,
    `"Çevir" düğmesine basın. Değerin bütün diğer gösterimleri alt alta listelenir.`,
    `Rapor ya da etiket metnine aktarmak için "Sonucu kopyala" düğmesini kullanabilirsiniz.`,
  ],
  sections: [
    { h: 'PPM ne demektir?', p: [
      `PPM, İngilizce "parts per million" ifadesinin kısaltmasıdır ve <strong>milyonda bir</strong> anlamına gelir. Yüzde nasıl "yüzde kaç parça" diyorsa, ppm "bir milyonda kaç parça" der. Yüzdeyle yazıldığında virgülden sonra birçok sıfır gerektiren çok küçük oranları okunaklı sayılarla ifade etmek için kullanılır: %0,0004 yerine 4 ppm demek hem yazması hem karşılaştırması kolaydır.`,
      `PPM bir birim değil, birimsiz bir orandır. Neyin neye oranı olduğu bağlama göre değişir: kütlenin kütleye (mg/kg), hacmin hacme (gazlarda) ya da kütlenin hacme (seyreltik sulu çözeltilerde mg/L) oranı olabilir. Çeviri hesabı her durumda aynıdır; ancak sonucu yorumlarken hangi temelin kullanıldığını bilmek gerekir.`,
    ] },
    { h: 'Çeviri formülleri', p: [
      `Yüz ile bir milyon arasındaki oran 10.000'dir. Buradan iki temel bağıntı çıkar: <strong>ppm = yüzde × 10.000</strong> ve <strong>yüzde = ppm ÷ 10.000</strong>.`,
      `Diğer gösterimler de aynı mantıkla bulunur. Bir milyar, bir milyonun bin katı olduğundan <strong>1 ppm = 1.000 ppb</strong>. Binde bir (promil, ‰) bin parçada bir olduğundan <strong>‰1 = 1.000 ppm = %0,1</strong>. Ondalık oran ise yüzdenin 100'e bölünmüş hâlidir: %2, 0,02 olarak yazılır ve 20.000 ppm eder.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 10.000 ppm yüzde kaçtır? 10.000 ÷ 10.000 = %1. Aynı değer binde 10'dur.`,
      `<strong>Örnek 2:</strong> %0,5'lik bir derişim kaç ppm eder? 0,5 × 10.000 = 5.000 ppm; ppb olarak 5.000.000.`,
      `<strong>Örnek 3:</strong> 400 ppm, 400 ÷ 10.000 = %0,04'tür. Ondalık oran olarak 0,0004; kütle temelinde her kilogramda 400 miligram demektir.`,
      `<strong>Örnek 4:</strong> Bir analiz raporunda 250 ppb yazıyor. 250 ÷ 1.000 = 0,25 ppm, yüzde olarak %0,000025.`,
    ] },
    { h: 'PPM nerelerde karşımıza çıkar?', ul: [
      `<strong>Su kalitesi:</strong> İçme suyu, havuz ve akvaryum ölçümlerinde çözünmüş madde miktarı ppm ya da mg/L olarak verilir. Seyreltik sulu çözeltilerde bir litre su yaklaşık bir kilogram geldiğinden 1 mg/L yaklaşık 1 ppm sayılır.`,
      `<strong>Hava kalitesi:</strong> Karbondioksit ve diğer gazların havadaki oranı hacimce ppm ile ölçülür. Kapalı ortam ölçüm cihazları sonucu ppm olarak gösterir.`,
      `<strong>Tarım ve gübreleme:</strong> Besin çözeltilerinde ve toprak analizlerinde element miktarları ppm olarak raporlanır.`,
      `<strong>Gıda ve kimya:</strong> Katkı maddesi, kalıntı ve safsızlık düzeyleri mg/kg, yani kütlece ppm olarak belirtilir.`,
      `<strong>Üretim kalitesi:</strong> Hata oranları "milyonda hatalı parça" olarak izlenir; 500 ppm hata, %0,05 hatalı ürün demektir.`,
      `<strong>Elektronik:</strong> Kristal osilatörlerin frekans sapması ve dirençlerin sıcaklık katsayısı ppm ile verilir.`,
    ], p: [
      `Bu alanlardaki izin verilen sınır değerler ilgili standart ve yönetmeliklerle belirlenir ve zamanla güncellenir. Araç yalnızca birim çevirir; bir değerin uygun olup olmadığına karar vermek için güncel mevzuatı ve yetkili laboratuvar sonuçlarını esas alın.`,
    ] },
    { h: 'Binde (promil) ile bağlantı', p: [
      `Türkiye'de binde gösterimi gündelik hayatta ppm'den daha tanıdıktır. Kuyumculukta altının saflığı binde olarak söylenir: 916 milyem, binde 916 saflık demektir; bu %91,6'ya ve 916.000 ppm'e karşılık gelir. Promil sözcüğü de aynı binde oranını anlatır. Araçta "‰ (binde, promil)" birimini seçerek bu değerleri yüzdeye ve ppm'e çevirebilirsiniz.`,
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      `<strong>1 ppm</strong> = %0,0001`,
      `<strong>10 ppm</strong> = %0,001`,
      `<strong>100 ppm</strong> = %0,01`,
      `<strong>500 ppm</strong> = %0,05`,
      `<strong>1.000 ppm</strong> = %0,1 = ‰1`,
      `<strong>5.000 ppm</strong> = %0,5`,
      `<strong>10.000 ppm</strong> = %1`,
      `<strong>50.000 ppm</strong> = %5`,
      `<strong>100.000 ppm</strong> = %10`,
      `<strong>1.000.000 ppm</strong> = %100`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `<strong>Sıfır sayısını şaşırmak:</strong> Çarpan 10.000'dir, 1.000 ya da 100.000 değil. Kontrol için "%1 = 10.000 ppm" eşitliğini aklınızda tutun.`,
      `<strong>Kütle ve hacim temelini karıştırmak:</strong> Gazlarda hacimce ppm ile kütlece ppm aynı sayı değildir; aralarındaki dönüşüm gazın mol kütlesine ve koşullara bağlıdır. Bu araç temel değiştirmez, yalnızca aynı temeldeki oranı farklı ölçekte yazar.`,
      `<strong>mg/L = ppm eşitliğini her sıvıya uygulamak:</strong> Bu yaklaşım yoğunluğu 1 kg/L dolayında olan seyreltik sulu çözeltilerde geçerlidir. Yoğun çözeltilerde ya da başka çözücülerde yoğunluk hesaba katılmalıdır.`,
      `<strong>Milyar karışıklığı:</strong> ppb'deki "billion" 10<sup>9</sup>, yani Türkçedeki milyardır.`,
      `Bir bütünün parçası bütünü aşamayacağından araç %100'ün (1.000.000 ppm) üzerindeki değerleri kabul etmez.`,
    ] },
  ],
  faq: [
    ['1 ppm yüzde kaçtır?', '1 ppm, %0,0001\'dir. Yüzdeye çevirmek için ppm değerini 10.000\'e bölersiniz.'],
    ['%1 kaç ppm eder?', '%1 tam 10.000 ppm eder. Yüzde değerini 10.000 ile çarparak ppm\'e geçilir; %0,1 için 1.000 ppm, %5 için 50.000 ppm bulunur.'],
    ['PPM ile mg/L aynı şey mi?', 'Seyreltik sulu çözeltilerde pratikte evet; çünkü bir litre su yaklaşık bir kilogramdır ve 1 mg/L yaklaşık 1 mg/kg eder. Yoğunluğu sudan belirgin biçimde farklı sıvılarda bu eşitlik bozulur.'],
    ['PPM ile ppb arasındaki fark nedir?', 'PPM milyonda bir, ppb milyarda birdir. 1 ppm 1.000 ppb eder; ppb daha da küçük oranlar için kullanılır.'],
    ['Promil ile ppm nasıl çevrilir?', 'Binde 1 (‰1) 1.000 ppm\'dir. Promil değerini 1.000 ile çarparak ppm\'i, 10\'a bölerek yüzdeyi bulursunuz.'],
    ['PPM değeri 1.000.000\'u geçebilir mi?', 'Bir bütünün içindeki pay olarak hayır; 1.000.000 ppm bütünün tamamı, yani %100\'dür. Araç bu sınırın üzerindeki girdilerde uyarı verir.'],
    ['Hata oranını ppm olarak nasıl ifade ederim?', 'Hatalı parça sayısını toplam parça sayısına bölüp bir milyonla çarpın ya da yüzde hata oranını araca girin. Örneğin %0,05 hata oranı 500 ppm\'dir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; yazdığınız sayı sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['ppm-hesapla', 'kutlece-yuzde-derisim-hesapla', 'yuzde-hesapla', 'yuzde-kesir-cevir', 'seyreltme-hesapla'],
};
