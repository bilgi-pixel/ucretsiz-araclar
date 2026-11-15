export default {
  slug: 'bir-tekrar-maksimum-hesapla',
  title: 'Bir Tekrar Maksimum (1RM) Hesaplama',
  h1Tail: 'Epley, Brzycki, Lombardi ve O\'Conner',
  pageTitle: 'Bir Tekrar Maksimum (1RM) Hesaplama – Epley ve Brzycki Formülü',
  description: 'Kaldırdığınız ağırlık ve tekrar sayısından bir tekrar maksimumunuzu (1RM) Epley, Brzycki, Lombardi ve O\'Conner formülleriyle tahmin edin; yüzdelik yükleri görün.',
  card: 'Kaldırdığınız ağırlık ve tekrar sayısından 1RM değerinizi dört formülle tahmin edin, yüzdelik yükleri görün.',
  category: 'saglik',
  keywords: ['1rm hesaplama', 'bir tekrar maksimum', 'maksimum kaldırış hesaplama', 'epley formülü', 'brzycki formülü', 'bench press 1rm', 'antrenman yüzdesi hesaplama'],
  lead: `Bir harekette kaldırdığınız ağırlığı ve o ağırlıkla yapabildiğiniz tekrar sayısını girin; araç tek seferde kaldırabileceğiniz en yüksek ağırlığı, yani <strong>bir tekrar maksimumunuzu (1RM)</strong> tahmin eder. Dört yaygın formülün sonucu ile antrenman planlarında kullanılan yüzdelik yükler aynı tabloda verilir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'agirlik', label: 'Kaldırılan ağırlık (kg)', type: 'number', placeholder: 'Örn. 100', hint: 'Halter çubuğunun ağırlığı dahil toplam yük.' },
    { id: 'tekrar', label: 'Tekrar sayısı', type: 'number', placeholder: 'Örn. 5', hint: '1 ile 12 arasında, düzgün formla tamamlanan tekrar.' },
    { id: 'formul', label: 'Ana sonuç için formül', type: 'select', options: [['epley', 'Epley'], ['brzycki', 'Brzycki'], ['lombardi', 'Lombardi'], ['oconner', 'O\'Conner'], ['ortalama', 'Dört formülün ortalaması']] },
  ],
  compute(v, h) {
    const w = h.pos(v.agirlik, 'Kaldırılan ağırlık');
    const r = h.posint(v.tekrar, 'Tekrar sayısı');
    if (w > 1000) h.err('Kaldırılan ağırlık 1.000 kg\'dan büyük olamaz.');
    if (r > 12) h.err('Tekrar sayısı en fazla 12 olabilir. Daha yüksek tekrarlarda tahmin güvenilir değildir; daha ağır bir yükle yeniden deneyin.');
    const f = r === 1
      ? { epley: w, brzycki: w, lombardi: w, oconner: w }
      : { epley: w * (1 + r / 30), brzycki: (w * 36) / (37 - r), lombardi: w * Math.pow(r, 0.1), oconner: w * (1 + 0.025 * r) };
    f.ortalama = (f.epley + f.brzycki + f.lombardi + f.oconner) / 4;
    const sec = v.formul || 'epley';
    if (!(sec in f)) h.err('Geçerli bir formül seçin.');
    const rm = f[sec];
    const kg = (x) => h.fmt(x, 1) + ' kg';
    const rows = [
      ['Tahmini 1RM', kg(rm)],
      ['Epley', kg(f.epley)],
      ['Brzycki', kg(f.brzycki)],
      ['Lombardi', kg(f.lombardi)],
      ['O\'Conner', kg(f.oconner)],
      ['Ortalama', kg(f.ortalama)],
    ];
    for (const p of [95, 90, 85, 80, 75, 70, 60, 50]) rows.push([`%${p} yük`, kg((rm * p) / 100)]);
    return { rows, note: r === 1 ? 'Tek tekrar girdiğiniz için kaldırdığınız ağırlık doğrudan 1RM kabul edilmiştir.' : 'Sonuç tahmindir; gerçek 1RM tekniğe, harekete ve o günkü forma göre birkaç kilogram farklı olabilir.' };
  },
  cases: [
    { in: { agirlik: '100', tekrar: '5', formul: 'epley' }, out: { 'Tahmini 1RM': '116,7 kg', 'Epley': '116,7 kg', 'Brzycki': '112,5 kg', 'Lombardi': '117,5 kg', 'O\'Conner': '112,5 kg', 'Ortalama': '114,8 kg', '%90 yük': '105 kg', '%80 yük': '93,3 kg' } },
    { in: { agirlik: '80', tekrar: '10', formul: 'brzycki' }, out: { 'Tahmini 1RM': '106,7 kg', 'Epley': '106,7 kg', 'Lombardi': '100,7 kg', 'O\'Conner': '100 kg' } },
    { in: { agirlik: '60', tekrar: '8', formul: 'oconner' }, out: { 'Tahmini 1RM': '72 kg', 'Epley': '76 kg', 'Brzycki': '74,5 kg', 'Lombardi': '73,9 kg', '%50 yük': '36 kg' } },
    { in: { agirlik: '120', tekrar: '3', formul: 'epley' }, out: { 'Tahmini 1RM': '132 kg', 'Brzycki': '127,1 kg', 'O\'Conner': '129 kg', '%75 yük': '99 kg' } },
    { in: { agirlik: '100', tekrar: '1', formul: 'ortalama' }, out: { 'Tahmini 1RM': '100 kg', 'Epley': '100 kg', 'Brzycki': '100 kg', '%85 yük': '85 kg' } },
    { in: { agirlik: '50', tekrar: '12' }, out: { 'Tahmini 1RM': '70 kg', 'Brzycki': '72 kg', 'O\'Conner': '65 kg', '%60 yük': '42 kg' } },
    { in: { agirlik: '100', tekrar: '0' }, error: true },
    { in: { agirlik: '100', tekrar: '20' }, error: true },
    { in: { agirlik: '100', tekrar: '2,5' }, error: true },
    { in: { agirlik: '', tekrar: '5' }, error: true },
  ],
  howto: [
    `İyi ısındıktan sonra seçtiğiniz harekette, düzgün formla 2–10 tekrar yapabildiğiniz bir ağırlıkla tükenişe yakın bir set yapın.`,
    `"Kaldırılan ağırlık" alanına çubuk dahil toplam yükü kilogram olarak, "Tekrar sayısı" alanına tamamladığınız temiz tekrar sayısını yazın.`,
    `Ana sonuçta hangi formülün kullanılacağını seçin; kararsızsanız Epley ya da dört formülün ortalaması iyi bir başlangıçtır.`,
    `"Hesapla" düğmesine basın. İlk satır tahmini 1RM değerini, sonraki satırlar her formülün sonucunu ve yüzdelik antrenman yüklerini gösterir.`,
    `Yüzdelik değerleri salonunuzdaki en küçük plaka adımına (çoğunlukla 2,5 kg) yuvarlayarak programınıza aktarın.`,
  ],
  sections: [
    { h: '1RM nedir ve neden tahmin edilir?', p: [
      `Bir tekrar maksimum (İngilizce "one repetition maximum", kısaca 1RM), bir harekette doğru teknikle yalnızca bir kez kaldırabildiğiniz en yüksek ağırlıktır. Kuvvet antrenmanında yükler çoğunlukla bu değerin yüzdesi olarak yazılır: "1RM'in yüzde 80'iyle 5 tekrar" gibi. Dolayısıyla programı doğru uygulamak için 1RM'inizi bilmeniz gerekir.`,
      `Gerçek 1RM denemesi ise yorucudur, iyi ısınma ve gözetmen ister, tekniği oturmamış kişilerde sakatlık riski taşır. Bu yüzden çoğu sporcu daha hafif bir yükle birkaç tekrar yapıp sonucu formülle tahmin eder. Yük ile yapılabilen tekrar sayısı arasındaki ilişki oldukça düzenli olduğundan bu tahminler düşük tekrarlarda gerçeğe yakın çıkar.`,
    ] },
    { h: 'Kullanılan formüller', ul: [
      `<strong>Epley:</strong> 1RM = ağırlık × (1 + tekrar ÷ 30). En yaygın kullanılan denklemdir.`,
      `<strong>Brzycki:</strong> 1RM = ağırlık × 36 ÷ (37 − tekrar). Düşük tekrarlarda Epley'den biraz temkinli, 10 tekrarda onunla aynı sonucu verir.`,
      `<strong>Lombardi:</strong> 1RM = ağırlık × tekrar<sup>0,10</sup>. Üslü bir bağıntıdır; yüksek tekrarlarda diğerlerinden düşük kalır.`,
      `<strong>O'Conner:</strong> 1RM = ağırlık × (1 + 0,025 × tekrar). Her tekrar için yüzde 2,5 ekleyen, en temkinli doğrusal formüldür.`,
    ], p: [
      `Tek tekrar girildiğinde kaldırılan ağırlık zaten 1RM olduğundan araç formül uygulamaz ve ağırlığı aynen verir.`,
    ] },
    { h: 'Çözümlü örnek: 100 kg ile 5 tekrar', p: [
      `Bench press'te 100 kilogramla 5 temiz tekrar yapan biri için Epley: 100 × (1 + 5 ÷ 30) = 100 × 1,1667 = <strong>116,7 kg</strong>. Brzycki: 100 × 36 ÷ (37 − 5) = 3.600 ÷ 32 = 112,5 kg. Lombardi: 100 × 5<sup>0,10</sup> = 100 × 1,1746 = 117,5 kg. O'Conner: 100 × (1 + 0,125) = 112,5 kg. Dört sonucun ortalaması 114,8 kilogramdır.`,
      `Formüller arasındaki 5 kilogramlık fark, tahminin doğal belirsizliğini gösterir. Epley sonucuna göre yüzde 90 yük 105 kg, yüzde 80 yük 93,3 kg eder; salonda bunlar 105 ve 92,5 kilograma yuvarlanır.`,
    ] },
    { h: 'Yüzdelik yükler ne için kullanılır?', p: [
      `Antrenman hedefi, kullanılan yükün 1RM'e oranını belirler. Genel bir çerçeve olarak maksimum kuvvet çalışmaları yüzde 85 ve üzeri yüklerle 1–5 tekrar, kas gelişimi çalışmaları yüzde 65–85 arası yüklerle 6–12 tekrar, kassal dayanıklılık çalışmaları yüzde 65'in altındaki yüklerle 12 ve üzeri tekrar aralığında yapılır. Bunlar kesin sınırlar değil, programlamada kullanılan yaygın kılavuz değerlerdir.`,
      `Birçok program gerçek ya da tahmini 1RM yerine onun yüzde 90'ı olan bir "antrenman maksimumu" üzerinden hesap yapar; böylece kötü günlerde de yükler tamamlanabilir kalır. Tablodaki yüzde 90 satırını bu amaçla kullanabilirsiniz.`,
    ] },
    { h: 'Tahminin isabetini artırmak', p: [
      `Formüller <strong>düşük tekrar sayılarında</strong> en iyi sonucu verir. 3–5 tekrarlık ağır bir setten yapılan tahmin genellikle birkaç kilogram içinde tutar; 10 tekrarın üzerinde ise kassal dayanıklılık, laktat toleransı ve irade devreye girdiği için sapma büyür. Bu nedenle araç 12 tekrardan fazlasını kabul etmez.`,
      `Yalnızca tam hareket açıklığıyla ve yardım almadan tamamlanan tekrarları sayın. Yarım tekrarlar, çubuğu göğüsten sektirmek ya da gözetmenin dokunması 1RM'i olduğundan yüksek gösterir. Hareketler arasında da fark vardır: squat ve deadlift gibi büyük kas gruplarını çalıştıran hareketlerde aynı yüzdeyle daha fazla tekrar yapılabilirken, omuz presi gibi küçük kas grubu hareketlerinde tekrar sayısı hızla düşer. Kas lifi dağılımı da kişiden kişiye değiştiği için bir formül size diğerinden daha iyi uyabilir; birkaç ay boyunca tahminlerinizi gerçek denemelerle karşılaştırarak kendinize uyan formülü belirleyin.`,
    ] },
    { h: 'Güvenlik uyarısı', p: [
      `Bu araç bilgilendirme amaçlıdır ve bir antrenörün ya da sağlık uzmanının değerlendirmesinin yerini tutmaz. Hesaplanan 1RM değerini denemek zorunda değilsiniz; tahmin, tam da bu denemeyi yapmadan program yazabilmeniz içindir. Maksimum denemesi yapacaksanız iyi ısının, emniyet kolları ya da deneyimli bir gözetmen kullanın ve tekniğiniz bozulduğunda bırakın. Bel, omuz, diz sorunu ya da tansiyon ve kalp rahatsızlığı olanlar ağır yüklerle çalışmadan önce hekime danışmalıdır.`,
    ] },
  ],
  faq: [
    ['1RM nasıl hesaplanır?', `En yaygın yöntem Epley formülüdür: kaldırdığınız ağırlığı (1 + tekrar ÷ 30) ile çarparsınız. 80 kg ile 6 tekrar yaptıysanız 80 × 1,2 = 96 kg bulunur.`],
    ['Hangi formül daha doğru?', `Tek bir doğru yoktur. Epley ve Brzycki en çok kullanılanlardır ve 10 tekrarda aynı sonucu verirler. Düşük tekrarlarda aralarındaki fark birkaç kilogramdır; ortalamayı almak makul bir yaklaşımdır.`],
    ['Kaç tekrarla test yapmalıyım?', `3–6 tekrar arası hem güvenli hem de isabetlidir. Tekrar sayısı arttıkça tahmin hatası büyür; 10 tekrarın üzerindeki setlerden çıkan sonuçlara temkinli yaklaşın.`],
    ['Bench press, squat ve deadlift için aynı hesap geçerli mi?', `Evet, formüller hareketten bağımsızdır. Ancak her hareket için ayrı test yapmalı ve ayrı 1RM hesaplamalısınız; bir hareketin sonucu diğerine aktarılamaz.`],
    ['Dambıl ve makine hareketlerinde kullanılabilir mi?', `Kullanılabilir. Dambılda tek elin ağırlığını yazarsanız sonuç da tek el içindir. Makinelerde makara düzeni yükü değiştirdiğinden sonuç yalnızca o makine için anlam taşır.`],
    ['Tahmini 1RM değerimi denemeli miyim?', `Gerekmez. Yeni başlayanlar için maksimum denemesi önerilmez; tahmini değerin yüzdeleriyle çalışmak yeterlidir. Denemek isteyen deneyimli sporcular gözetmenle ve kademeli ısınmayla çalışmalıdır.`],
    ['1RM ne sıklıkla yeniden hesaplanmalı?', `Çoğu program 4–8 haftada bir yeniden değerlendirme önerir. Aynı ağırlıkla daha fazla tekrar yapabildiğinizde yeni değerleri girerek güncel tahmini görebilirsiniz.`],
    ['Antrenman verilerim saklanıyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz ağırlık ve tekrar bilgileri hiçbir yere gönderilmez.`],
  ],
  related: ['wilks-puani-hesapla', 'protein-ihtiyaci-hesapla', 'kreatin-dozu-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'met-kalori-hesapla'],
};
