export default {
  slug: 'saatlik-aylik-ucret-cevir',
  title: 'Saatlik Ücreti Aylık Maaşa Çevirme',
  h1Tail: 'saatlik ↔ aylık',
  pageTitle: 'Saatlik Ücreti Aylık Maaşa Çevirme – Aylık Maaştan Saat Ücreti',
  description: "Saatlik ücreti aylık maaşa, aylık maaşı saatlik ücrete çevirin. Haftalık çalışma saatine göre günlük, haftalık ve yıllık karşılıklarını da görün.",
  card: "Saatlik ücretin aylık maaş karşılığını ya da maaşın saatlik karşılığını haftalık çalışma saatine göre hesaplayın.",
  category: 'finans',
  keywords: ['saatlik ücret aylık maaş', 'saat ücreti hesaplama', 'aylık maaş saatlik ücret', 'saatlik ücret hesaplama', '225 saat hesabı', 'maaş saatlik kaç lira', 'saatlik ücretten maaş'],
  lead: "Saatlik ücretinizin aylık maaş olarak neye karşılık geldiğini ya da aylık maaşınızın bir saatinin kaç lira ettiğini hesaplayın. Araç, haftalık çalışma saatinize göre <strong>aylık çalışma saatini</strong>, günlük, haftalık ve yıllık tutarı da gösterir.",
  button: 'Çevir',
  inputs: [
    { id: 'tutar', label: 'Ücret (TL)', type: 'number', placeholder: 'Örn. 200', hint: 'Binlik ayraç kullanmayın ya da 45.000,00 biçiminde yazın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['saatlik', 'Saatlik ücret → Aylık maaş'], ['aylik', 'Aylık maaş → Saatlik ücret']] },
    { id: 'haftalik', label: 'Haftalık çalışma saati', type: 'number', value: '45' },
    { id: 'yontem', label: 'Aylık saat hesabı', type: 'select', options: [['otuz', '30 günlük ay (45 saat için 225 saat)'], ['hafta', 'Yıllık ortalama (haftalık saat × 52 ÷ 12)']] },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Ücret');
    const hafta = h.pos(v.haftalik, 'Haftalık çalışma saati');
    if (hafta > 168) h.err('"Haftalık çalışma saati" 168 saati aşamaz; bir haftada 168 saat vardır.');
    const aySaat = v.yontem === 'hafta' ? hafta * 52 / 12 : hafta / 6 * 30;
    const saatlik = v.yon === 'aylik' ? tutar / aySaat : tutar;
    const aylik = saatlik * aySaat;
    const ana = v.yon === 'aylik' ? ['Saatlik ücret', h.para(saatlik)] : ['Aylık ücret', h.para(aylik)];
    const diger = v.yon === 'aylik' ? ['Aylık ücret', h.para(aylik)] : ['Saatlik ücret', h.para(saatlik)];
    return {
      rows: [
        ana,
        diger,
        ['Aylık çalışma saati', h.fmt(aySaat, 2) + ' saat'],
        ['Günlük ücret (aylık ÷ 30)', h.para(aylik / 30)],
        ['Haftalık ücret', h.para(saatlik * hafta)],
        ['Yıllık ücret (12 ay)', h.para(aylik * 12)],
      ],
      note: 'Girdiğiniz tutar brütse sonuç brüt, netse nettir; araç vergi ve prim kesintisi hesaplamaz. Fazla mesai, ikramiye ve yan haklar dâhil değildir.',
    };
  },
  cases: [
    { in: { tutar: '200', yon: 'saatlik', haftalik: '45', yontem: 'otuz' }, out: { 'Aylık ücret': '45.000,00 TL', 'Aylık çalışma saati': '225 saat', 'Günlük ücret (aylık ÷ 30)': '1.500,00 TL', 'Haftalık ücret': '9.000,00 TL', 'Yıllık ücret (12 ay)': '540.000,00 TL' } },
    { in: { tutar: '45000', yon: 'aylik', haftalik: '45', yontem: 'otuz' }, out: { 'Saatlik ücret': '200,00 TL', 'Aylık çalışma saati': '225 saat' } },
    { in: { tutar: '100', yon: 'saatlik', haftalik: '40', yontem: 'hafta' }, out: { 'Aylık ücret': '17.333,33 TL', 'Aylık çalışma saati': '173,33 saat', 'Haftalık ücret': '4.000,00 TL' } },
    { in: { tutar: '26000', yon: 'aylik', haftalik: '40', yontem: 'hafta' }, out: { 'Saatlik ücret': '150,00 TL', 'Yıllık ücret (12 ay)': '312.000,00 TL' } },
    { in: { tutar: '150', yon: 'saatlik', haftalik: '30', yontem: 'otuz' }, out: { 'Aylık ücret': '22.500,00 TL', 'Aylık çalışma saati': '150 saat' } },
    { in: { tutar: '33750', yon: 'aylik' }, out: { 'Saatlik ücret': '150,00 TL', 'Günlük ücret (aylık ÷ 30)': '1.125,00 TL' } },
    { in: { tutar: 'abc', yon: 'saatlik' }, error: true },
    { in: { tutar: '200', yon: 'saatlik', haftalik: '200' }, error: true },
  ],
  howto: [
    '"Ücret" alanına saatlik ücretinizi ya da aylık maaşınızı yazın.',
    '"Çeviri yönü" listesinden saatlikten aylığa mı, aylıktan saatliğe mi çevireceğinizi seçin.',
    'Haftalık çalışma saatinizi girin. Tam zamanlı çalışma için varsayılan değer 45 saattir; kısmi süreli çalışıyorsanız kendi saatinizi yazın.',
    'Aylık saat hesabı için yöntemi seçin: 30 günlük ay yöntemi ya da yıllık ortalama yöntemi.',
    '"Çevir" düğmesine basın; aylık, günlük, haftalık ve yıllık karşılıklar birlikte listelenir.',
  ],
  sections: [
    { h: 'Saatlik ücret aylık maaşa nasıl çevrilir?', p: [
      "Çevirinin özü, bir ayda kaç saat çalışıldığının kabul edildiğidir. Saatlik ücret bu saatle çarpılınca aylık ücret, aylık ücret bu saate bölününce saatlik ücret bulunur: <strong>aylık ücret = saatlik ücret × aylık çalışma saati</strong>. Zorluk, ayların 28 ile 31 gün arasında değişmesinden ve hafta tatilinin de ücrete dâhil sayılıp sayılmamasından kaynaklanır. Bu yüzden araç iki ayrı yöntem sunar.",
      "<strong>30 günlük ay yöntemi</strong> Türkiye'de bordro uygulamasında yaygın olan yaklaşımdır. Ay 30 gün sayılır, haftalık çalışma süresi altı güne bölünerek günlük süre bulunur ve hafta tatili günü de ücretli kabul edilir. Haftalık 45 saat için günlük süre 45 ÷ 6 = 7,5 saat, aylık süre 7,5 × 30 = <strong>225 saat</strong> olur. Aylık ücretin 225'e bölünmesiyle saat ücretinin bulunması bu hesaba dayanır.",
      "<strong>Yıllık ortalama yöntemi</strong> uluslararası karşılaştırmalarda ve serbest çalışma tekliflerinde kullanılır. Bir yılda 52 hafta olduğu kabul edilir ve yıllık toplam saat 12 aya bölünür: haftalık saat × 52 ÷ 12. Haftalık 40 saat için bu 173,33 saat, 45 saat için 195 saat eder. Bu yöntemde yalnızca fiilen çalışılan saatler sayılır.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Saatlik ücreti 200 TL olan ve haftada 45 saat çalışan bir kişi için 30 günlük ay yöntemiyle aylık çalışma saati 225'tir. Aylık ücret 200 × 225 = 45.000 TL, günlük ücret 45.000 ÷ 30 = 1.500 TL, haftalık ücret 200 × 45 = 9.000 TL, yıllık ücret 45.000 × 12 = 540.000 TL olur.",
      "Tersine, aylık 45.000 TL maaş alan birinin saat ücreti aynı yöntemle 45.000 ÷ 225 = 200 TL'dir. Yıllık ortalama yöntemini seçerseniz bölen 195 saat olur ve saat ücreti 45.000 ÷ 195 = 230,77 TL çıkar. Aradaki fark, ilk yöntemde hafta tatilinin de ücretli saat gibi sayılmasından kaynaklanır; hangi yöntemin kullanılacağı hesabın amacına bağlıdır.",
      "Haftada 40 saat çalışan ve saatlik 100 TL alan biri için yıllık ortalama yöntemi 40 × 52 ÷ 12 = 173,33 saat verir; aylık karşılık 17.333,33 TL'dir.",
    ] },
    { h: 'Hangi yöntemi seçmeliyim?', ul: [
      "<strong>Bordrolu çalışan, fazla mesai saat ücretini merak eden:</strong> 30 günlük ay yöntemi uygulamadaki hesaba daha yakındır.",
      "<strong>Serbest çalışan ya da proje bazlı teklif veren:</strong> yıllık ortalama yöntemi, faturalanabilir saat üzerinden düşünmek için daha uygundur.",
      "<strong>Yurt dışı iş ilanlarını karşılaştıran:</strong> ilanlardaki saatlik ücretler çoğunlukla fiilî çalışma saatine göre verildiğinden yıllık ortalama yöntemini seçin.",
      "<strong>Kısmi süreli çalışan:</strong> haftalık saat kutusuna kendi sürenizi yazın; her iki yöntem de bu saate göre oranlanır.",
    ] },
    { h: 'Brüt, net ve kesintiler', p: [
      "Araç yalnızca birim çevirisi yapar; gelir vergisi, sigorta primi, damga vergisi gibi kesintileri hesaplamaz. Saatlik brüt ücret yazarsanız sonuç aylık brüt, net ücret yazarsanız aylık net olur. Brütten nete geçiş; vergi dilimlerine, istisnalara ve yıl içinde değişebilen oranlara bağlıdır. Bu oranlar bu sayfada sabitlenmemiştir; kesin tutar için güncel mevzuatı kontrol edin ya da bordro uzmanınıza danışın.",
      "Yasal çalışma süreleri, fazla çalışma ücretinin nasıl hesaplanacağı ve asgari ücret gibi konular mevzuatla belirlenir ve zamanla değişebilir. Buradaki 45 saatlik varsayılan değer yalnızca bir başlangıç değeridir; iş sözleşmenizdeki süreyi esas alın. Sonuçlar bilgilendirme amaçlıdır, hukuki ya da mali danışmanlık yerine geçmez.",
    ] },
    { h: 'Sık yapılan hatalar', p: [
      "En yaygın hata, aylık çalışma saatini haftalık saati dörtle çarparak bulmaktır. Bir ay dört haftadan uzundur; ortalama 4,33 hafta sürer. 45 × 4 = 180 saat hesabı aylık ücreti olduğundan düşük gösterir. İkinci hata, saat ücretini hesaplarken resmî tatil ve yıllık izin günlerini çalışılmamış gibi düşmektir; aylık ücretli çalışanlarda bu günlerin ücreti maaşın içindedir.",
      "Serbest çalışanlar için ters yönde bir yanılgı vardır: bordrolu bir çalışanın saat ücretini doğrudan kendi saatlik teklifleri olarak kullanmak. Serbest çalışan vergisini, sigortasını, ekipmanını, izin günlerini ve iş bulmak için harcadığı faturalanamayan saatleri kendi karşılar; bu yüzden saatlik teklifin bordrolu saat ücretinden belirgin biçimde yüksek olması gerekir.",
    ] },
  ],
  faq: [
    ['Aylık maaş saatlik ücrete nasıl çevrilir?', "Aylık ücret, aylık çalışma saatine bölünür. Haftalık 45 saatlik çalışmada 30 günlük ay yöntemiyle bölen 225'tir. 33.750 TL maaşın saat ücreti 33.750 ÷ 225 = 150 TL eder."],
    ['225 saat nereden geliyor?', "Haftalık 45 saat altı güne bölününce günlük 7,5 saat bulunur. Ay 30 gün kabul edilip hafta tatili de ücretli sayıldığında 7,5 × 30 = 225 saat elde edilir. Haftalık saatiniz farklıysa araç aynı mantıkla kendi aylık saatinizi hesaplar."],
    ['Neden iki yöntem farklı sonuç veriyor?', "30 günlük ay yöntemi hafta tatili gününü de ücretli gün sayar, yıllık ortalama yöntemi yalnızca fiilen çalışılan saatleri sayar. Bu nedenle ilkinde aylık saat daha yüksek, aylık maaştan bulunan saat ücreti daha düşük çıkar."],
    ['Sonuç net mi brüt mü?', "Girdiğiniz değer neyse sonuç da odur. Araç kesinti hesaplamaz; brüt saatlik ücret brüt aylığa, net saatlik ücret net aylığa çevrilir."],
    ['Fazla mesai ücreti bu hesapta var mı?', "Hayır. Araç yalnızca normal çalışma süresinin karşılığını verir. Fazla çalışma ücreti, bulunan saat ücretinin mevzuatta ya da sözleşmede belirlenen oranda artırılmasıyla hesaplanır; güncel oranı kontrol ederek ayrıca hesaplayabilirsiniz."],
    ['Yarı zamanlı çalışıyorum, nasıl hesaplarım?', "Haftalık çalışma saati kutusuna kendi sürenizi yazın. Örneğin haftada 30 saat ve saatlik 150 TL için 30 günlük ay yöntemi 150 saat ve 22.500 TL aylık ücret verir."],
    ['Günlük ücret neden aylığın 30\'a bölümü?', "Aylık ücretli çalışmada ay, gün sayısına bakılmaksızın 30 gün kabul edilir; günlük ücret de buna göre bulunur. Gündelikle çalışanlarda ise günlük ücret, saat ücretinin günlük çalışma saatiyle çarpımıdır."],
    ['Maaş bilgim kaydediliyor mu?', "Hayır. Çeviri tarayıcınızda yapılır; yazdığınız ücret ve saat bilgileri hiçbir sunucuya gönderilmez."],
  ],
  related: ['yillik-maas-hesapla', 'saatlik-ucret-hesapla', 'aylik-odeme-gucu-hesapla', 'butce-50-30-20-hesapla', 'tasarruf-orani-hesapla'],
};
