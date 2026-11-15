export default {
  slug: 'tasarruf-orani-hesapla',
  title: 'Tasarruf Oranı Hesaplama',
  h1Tail: 'gelirin yüzde kaçı birikiyor?',
  pageTitle: 'Tasarruf Oranı Hesaplama – Gelirinizin Yüzde Kaçını Biriktiriyorsunuz?',
  description: 'Aylık net gelir ve giderinizden tasarruf oranınızı, aylık ve yıllık birikiminizi hesaplayın; hedef oran girerseniz giderleri ne kadar kısmanız gerektiğini görün.',
  card: 'Gelir ve giderden tasarruf oranını, aylık ve yıllık birikimi bulun; hedef orana ne kadar uzak olduğunuzu görün.',
  category: 'finans',
  keywords: ['tasarruf oranı hesaplama', 'birikim oranı hesaplama', 'tasarruf oranı nedir', 'gelirin yüzde kaçı biriktirilmeli', 'aylık tasarruf hesaplama', 'tasarruf oranı formülü', 'acil durum fonu'],
  lead: `Gelirinizin yüzde kaçını biriktirebildiğinizi hesaplayın. Aylık net gelirinizi ve toplam giderinizi yazın; araç <strong>tasarruf oranı = (gelir − gider) ÷ gelir × 100</strong> formülüyle oranı, aylık ve yıllık birikim tutarını ve üç aylık giderinizi biriktirmenin kaç ay süreceğini gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'gelir', label: 'Aylık net gelir (TL)', type: 'number', placeholder: 'Örn. 40000', hint: 'Binlik ayraç kullanmayın ya da 40.000,00 biçiminde yazın.' },
    { id: 'gider', label: 'Aylık toplam gider (TL)', type: 'number', placeholder: 'Örn. 30000', hint: 'Kira, fatura, market, taksitler ve tüm keyfî harcamalar dahil.' },
    { id: 'hedef', label: 'Hedef tasarruf oranı % (isteğe bağlı)', type: 'number', placeholder: 'Örn. 20' },
  ],
  compute(v, h) {
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const gider = h.nonneg(v.gider, 'Aylık toplam gider');
    const tasarruf = gelir - gider;
    const oran = tasarruf / gelir * 100;
    const rows = [
      ['Tasarruf oranı', '%' + h.fmt(oran, 2)],
      ['Aylık tasarruf', h.para(tasarruf)],
      ['Yıllık tasarruf', h.para(tasarruf * 12)],
      ['Gider oranı', '%' + h.fmt(gider / gelir * 100, 2)],
      ['Üç aylık gideri biriktirme süresi', tasarruf > 0 && gider > 0 ? h.fmt(gider * 3 / tasarruf, 1) + ' ay' : '—'],
    ];
    let note = tasarruf < 0
      ? 'Gideriniz gelirinizi aşıyor; tasarruf oranı eksi. Aradaki fark borç ya da önceki birikimle karşılanıyor demektir.'
      : 'Yıllık tasarruf, bu ayın tutarının on iki ay boyunca aynen sürdüğü varsayımıyla hesaplanır; faiz ve getiri eklenmez.';
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.nonneg(v.hedef, 'Hedef tasarruf oranı');
      if (hedef > 100) h.err('"Hedef tasarruf oranı" %100\'den büyük olamaz.');
      const gereken = gelir * hedef / 100;
      const fark = gereken - tasarruf;
      rows.push(['Hedef için gereken aylık tasarruf', h.para(gereken)]);
      rows.push(['Hedef durumu', fark > 0.005 ? `Hedef için giderleri ${h.para(fark)} azaltmalısınız` : fark < -0.005 ? `Hedefin üzerindesiniz (aylık ${h.para(-fark)} fazla)` : 'Tam hedeftesiniz']);
    }
    return { rows, note };
  },
  cases: [
    { in: { gelir: '40000', gider: '30000' }, out: { 'Tasarruf oranı': '%25', 'Aylık tasarruf': '10.000,00 TL', 'Yıllık tasarruf': '120.000,00 TL', 'Gider oranı': '%75', 'Üç aylık gideri biriktirme süresi': '9 ay' } },
    { in: { gelir: '45000', gider: '36000', hedef: '30' }, out: { 'Tasarruf oranı': '%20', 'Aylık tasarruf': '9.000,00 TL', 'Hedef için gereken aylık tasarruf': '13.500,00 TL', 'Hedef durumu': 'Hedef için giderleri 4.500,00 TL azaltmalısınız' } },
    { in: { gelir: '50000', gider: '50000' }, out: { 'Tasarruf oranı': '%0', 'Aylık tasarruf': '0,00 TL', 'Üç aylık gideri biriktirme süresi': '—' } },
    { in: { gelir: '30000', gider: '33000' }, out: { 'Tasarruf oranı': '%-10', 'Aylık tasarruf': '-3.000,00 TL', 'Yıllık tasarruf': '-36.000,00 TL', 'Gider oranı': '%110' } },
    { in: { gelir: '60000', gider: '36000', hedef: '30' }, out: { 'Tasarruf oranı': '%40', 'Hedef için gereken aylık tasarruf': '18.000,00 TL', 'Hedef durumu': 'Hedefin üzerindesiniz (aylık 6.000,00 TL fazla)' } },
    { in: { gelir: '25000', gider: '20000', hedef: '20' }, out: { 'Tasarruf oranı': '%20', 'Üç aylık gideri biriktirme süresi': '12 ay', 'Hedef durumu': 'Tam hedeftesiniz' } },
    { in: { gelir: '32000', gider: '27500' }, out: { 'Tasarruf oranı': '%14,06', 'Aylık tasarruf': '4.500,00 TL', 'Yıllık tasarruf': '54.000,00 TL', 'Üç aylık gideri biriktirme süresi': '18,3 ay' } },
    { in: { gelir: '0', gider: '30000' }, error: true },
    { in: { gelir: '40000', gider: '-5' }, error: true },
    { in: { gelir: '40000', gider: '30000', hedef: '120' }, error: true },
  ],
  howto: [
    `"Aylık net gelir" alanına vergi ve kesintilerden sonra elinize geçen toplam tutarı yazın; maaş dışındaki düzenli gelirleri de ekleyin.`,
    `"Aylık toplam gider" alanına o ay yaptığınız bütün harcamaların toplamını girin. Banka ve kart dökümlerinizi toplamak en güvenilir yoldur.`,
    `Ulaşmak istediğiniz bir oran varsa "Hedef tasarruf oranı" alanına yazın; yoksa boş bırakın.`,
    `"Hesapla" düğmesine basın. Tasarruf oranınız, aylık ve yıllık birikiminiz ve hedefle aranızdaki fark listelenir.`,
  ],
  sections: [
    { h: 'Tasarruf oranı nedir?', p: [
      `Tasarruf oranı, gelirinizin harcanmayıp kenara konan bölümünün yüzde olarak ifadesidir. Biriktirdiğiniz tutarın lira karşılığı gelire göre büyük ya da küçük görünebilir; oran ise farklı gelir düzeylerini ve farklı dönemleri kıyaslanabilir hale getirir. Geliri 30.000 TL olup 6.000 TL biriktiren biri ile geliri 90.000 TL olup 9.000 TL biriktiren birini karşılaştırdığınızda, tutarı daha düşük olan ilk kişinin oranı (%20) ikincisinin oranının (%10) iki katıdır.`,
      `Kişisel finansta bu oran, mali sağlığın en yalın göstergelerinden biri sayılır. Gelir artışı tek başına birikim getirmez; harcama da aynı hızla artıyorsa oran yerinde sayar. Oranı düzenli izlemek, zam aldığınızda yaşam standardını ne kadar yükselttiğinizi ve ne kadarını geleceğe ayırdığınızı görmenizi sağlar.`,
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      `<strong>Tasarruf oranı = (gelir − gider) ÷ gelir × 100.</strong> Aylık net geliri 40.000 TL, toplam gideri 30.000 TL olan biri ayda 10.000,00 TL biriktirir. Oran 10.000 ÷ 40.000 × 100 = %25'tir; gider oranı da buna karşılık %75 olur. Aynı düzen bir yıl sürerse 10.000 × 12 = 120.000,00 TL birikir.`,
      `Araç ayrıca üç aylık giderinizi biriktirmenin ne kadar süreceğini verir. Bu örnekte üç aylık gider 30.000 × 3 = 90.000 TL'dir ve ayda 10.000 TL ile 90.000 ÷ 10.000 = 9 ayda toplanır. Bu satır, sıkça önerilen acil durum fonuna ne kadar uzakta olduğunuzu kabaca gösterir.`,
      `Hedefli bir örnek: geliri 45.000 TL, gideri 36.000 TL olan biri ayda 9.000 TL ile %20 oranındadır. %30 hedefi için 45.000 × 0,30 = 13.500,00 TL biriktirmesi gerekir; yani giderlerini 13.500 − 9.000 = 4.500,00 TL azaltmalı ya da gelirini aynı ölçüde artırmalıdır.`,
    ] },
    { h: 'Oran nasıl yorumlanır?', p: [
      `Herkese uyan tek bir doğru oran yoktur. Yaygın bütçe yaklaşımları gelirin beşte biri civarında bir birikimi başlangıç hedefi olarak önerir; ancak tek gelirli kalabalık bir hane ile ailesinin yanında yaşayan genç bir çalışanın koşulları aynı değildir. Daha anlamlı olan, kendi oranınızın zaman içindeki seyridir.`,
    ], ul: [
      `<strong>Eksi oran:</strong> harcama geliri aşıyor. Fark borçla kapanıyorsa öncelik oranı sıfırın üstüne çıkarmaktır.`,
      `<strong>Sıfıra yakın oran:</strong> gelir ancak giderleri karşılıyor; beklenmedik bir masraf doğrudan borca dönüşür.`,
      `<strong>Orta düzey oran:</strong> düzenli birikim var; acil durum fonu ve orta vadeli hedefler için yol alınıyor.`,
      `<strong>Yüksek oran:</strong> gelirin büyük bölümü birikiyor; uzun vadeli hedeflere daha hızlı ulaşılır, ancak sürdürülebilirliği yaşam kalitesiyle dengelenmelidir.`,
    ] },
    { h: 'Tasarruf oranını artırmanın yolları', ul: [
      `<strong>Önce kendinize ödeyin:</strong> maaş yatar yatmaz belirlediğiniz tutarı ayrı bir hesaba aktarın; ay sonunda kalanı biriktirmeye çalışmak çoğu zaman sonuç vermez.`,
      `<strong>Büyük kalemlere odaklanın:</strong> konut, ulaşım ve gıda bütçenin çoğunu oluşturur. Bu üç kalemdeki küçük bir iyileşme, onlarca küçük harcamayı kısmaktan daha çok etki eder.`,
      `<strong>Abonelikleri gözden geçirin:</strong> kullanılmayan dijital üyelikler, spor salonu ve ek paketler fark edilmeden birikir.`,
      `<strong>Zamları bölüştürün:</strong> gelir artışının bir bölümünü doğrudan birikime yönlendirirseniz yaşam standardınız düşmeden oran yükselir.`,
      `<strong>Yüksek faizli borcu kapatın:</strong> faiz ödemesi giderin en verimsiz kalemidir; borç bittiğinde taksit tutarı birikime dönüşebilir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Brüt geliri kullanmak. Harcayabildiğiniz para net gelir olduğu için oran da net gelir üzerinden hesaplanmalıdır.`,
      `Yıllık ya da düzensiz giderleri unutmak. Sigorta, vergi, okul taksidi, bayram ve tatil harcamalarını on ikiye bölerek aylık gidere ekleyin.`,
      `Kredi kartı taksitlerini saymamak. Taksitli alışverişler, ödeme yapıldığı ayın gideridir.`,
      `Tek bir aya bakmak. Bir ayın oranı olağan dışı bir masraf ya da ikramiye nedeniyle yanıltıcı olabilir; üç ya da altı aylık ortalama daha güvenilirdir.`,
      `Birikimi gider olarak yazmak. Yatırım hesabına ya da emeklilik planına aktardığınız para gider değil, tasarruftur.`,
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      `Araç yalnızca yazdığınız iki rakam arasındaki farkı hesaplar. Yıllık tasarruf, aynı gelir ve giderin on iki ay sürdüğü varsayımına dayanır; faiz, yatırım getirisi ve enflasyonun birikimin alım gücü üzerindeki etkisi hesaba katılmaz. Üç aylık gider ölçüsü yalnızca kolay bir kıyas noktasıdır; sizin için uygun acil durum fonu, gelir güvencenize ve bakmakla yükümlü olduğunuz kişilere göre değişir. Sonuçlar bilgilendirme amaçlıdır, yatırım tavsiyesi değildir; önemli mali kararlarda bir uzmana danışın.`,
    ] },
  ],
  faq: [
    ['Tasarruf oranı nasıl hesaplanır?', `Gelirden gider çıkarılır, sonuç gelire bölünür ve 100 ile çarpılır. 40.000 TL gelir ve 30.000 TL gider için (40.000 − 30.000) ÷ 40.000 × 100 = %25 bulunur.`],
    ['Gelirin yüzde kaçı biriktirilmeli?', `Koşullara göre değişir. Yaygın bütçe yaklaşımları gelirin beşte biri civarını başlangıç hedefi olarak önerir, ancak bu bir kural değil yol göstericidir. Önemli olan, kendinize gerçekçi bir hedef koyup oranı zamanla yükseltmektir.`],
    ['Tasarruf oranım eksi çıktı, ne anlama geliyor?', `Giderleriniz gelirinizden fazla demektir. Aradaki fark kredi kartı, ek hesap ya da önceki birikimlerle karşılanıyordur. Bu durumda önce giderleri gelir düzeyine indirmek gerekir.`],
    ['Kredi taksitleri gidere dahil mi?', `Evet. Konut, taşıt, ihtiyaç kredisi ve kredi kartı taksitleri o ayın gideridir. Yalnızca borcu erken kapatmak için yaptığınız ek ödemeleri birikim benzeri bir kalem olarak ayrıca değerlendirebilirsiniz.`],
    ['Bireysel emeklilik katkısı tasarruf sayılır mı?', `Evet, geleceğe ayrılan bir birikimdir. Bu yüzden katkı payını gider alanına yazmayın; aksi halde tasarruf oranınız olduğundan düşük görünür.`],
    ['Üç aylık gideri biriktirme süresi neyi gösterir?', `Aylık tasarrufunuzla, bugünkü aylık giderinizin üç katı kadar bir tutarı kaç ayda toplayabileceğinizi gösterir. Beklenmedik durumlar için ayrılan acil durum fonuna ne kadar uzak olduğunuzu kabaca anlamanıza yardım eder.`],
    ['Düzensiz gelirle oranı nasıl hesaplarım?', `Son altı ya da on iki ayın toplam gelirini ve toplam giderini ay sayısına bölerek ortalamaları bulun ve bu ortalamaları girin. Tek bir aya göre hesap yanıltıcı olabilir.`],
    ['Gelir ve gider bilgilerim kaydediliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız rakamlar hiçbir sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['butce-50-30-20-hesapla', 'hedef-birikim-suresi-hesapla', 'borc-odeme-plani-hesapla', 'aylik-odeme-gucu-hesapla', 'gelecek-deger-hesapla'],
};
