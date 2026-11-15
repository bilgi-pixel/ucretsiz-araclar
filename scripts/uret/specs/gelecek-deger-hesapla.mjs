export default {
  slug: 'gelecek-deger-hesapla',
  title: 'Gelecek Değer (FV) Hesaplama',
  h1Tail: 'paranın ilerideki değeri',
  pageTitle: 'Gelecek Değer (FV) Hesaplama – Paranın Gelecekteki Değeri',
  description: 'Bugünkü tutar, yıllık oran, süre ve düzenli katkıyı girin; bileşik getiriyle paranızın gelecekteki değerini (FV) ve toplam kazancı hesaplayın.',
  card: 'Bugünkü paranın ve düzenli eklemelerin bileşik getiriyle ileride ulaşacağı tutarı (FV) hesaplayın.',
  category: 'finans',
  keywords: ['gelecek değer hesaplama', 'fv hesaplama', 'paranın gelecekteki değeri', 'gelecek değer formülü', 'future value hesaplama', 'paranın zaman değeri', 'bileşik getiri hesaplama'],
  lead: 'Bugün elinizde olan bir tutarın, belirli bir getiri oranıyla yıllar sonra kaç liraya ulaşacağını hesaplayın. İsterseniz her dönem düzenli eklenen bir tutarı da hesaba katın; araç <strong>gelecek değeri (FV)</strong>, yatırılan toplam parayı ve elde edilen getiriyi ayrı ayrı gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bugun', label: 'Bugünkü tutar (TL)', type: 'number', placeholder: 'Örn. 10000', hint: 'Yalnızca düzenli katkı hesaplayacaksanız 0' },
    { id: 'oran', label: 'Yıllık getiri / faiz oranı (%)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'sure', label: 'Süre (yıl)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'siklik', label: 'Bileşiklenme dönemi', type: 'select', options: [['1', 'Yıllık'], ['2', 'Altı aylık'], ['4', 'Üç aylık'], ['12', 'Aylık'], ['365', 'Günlük']] },
    { id: 'katki', label: 'Her dönem sonunda eklenen tutar (TL)', type: 'number', value: '0', hint: 'İsteğe bağlı; dönem, yukarıda seçtiğiniz bileşiklenme dönemidir' },
  ],
  compute(v, h) {
    const PV = h.nonneg(v.bugun, 'Bugünkü tutar');
    const oran = h.num(v.oran, 'Yıllık oran');
    const yil = h.pos(v.sure, 'Süre');
    const pmt = h.nonneg(h.opt(v.katki, 0, 'Dönemlik katkı'), 'Dönemlik katkı');
    const m = Number(v.siklik);
    if (![1, 2, 4, 12, 365].includes(m)) h.err('Listeden geçerli bir bileşiklenme dönemi seçin.');
    if (PV === 0 && pmt === 0) h.err('Bugünkü tutar ya da dönemlik katkıdan en az biri sıfırdan büyük olmalı.');
    if (oran <= -100) h.err('Yıllık oran −%100\'den büyük olmalı.');
    if (oran > 10000) h.err('Yıllık oran %10.000\'den büyük olamaz; değeri kontrol edin.');
    if (yil > 200) h.err('Süre en fazla 200 yıl olabilir.');
    const i = oran / 100 / m;
    if (i <= -1) h.err('Dönem oranı −%100 ya da altına düşüyor; oranı kontrol edin.');
    const N = yil * m;
    const Nt = Math.round(N);
    if (pmt > 0 && Math.abs(N - Nt) > 1e-9) h.err('Düzenli katkı varken süre tam dönem sayısına denk gelmeli (örn. aylık dönemde 2,5 yıl = 30 ay olur; 2,3 yıl olmaz).');
    const carpan = Math.pow(1 + i, N);
    const fvPV = PV * carpan;
    const fvPmt = pmt === 0 ? 0 : (Math.abs(i) < 1e-12 ? pmt * Nt : pmt * (carpan - 1) / i);
    const FV = fvPV + fvPmt;
    if (!Number.isFinite(FV)) h.err('Sonuç gösterilemeyecek kadar büyük; oranı ya da süreyi küçültün.');
    const yatirilan = PV + pmt * (pmt > 0 ? Nt : 0);
    const rows = [
      ['Gelecek değer (FV)', h.para(FV)],
      ['Yatırılan toplam tutar', h.para(yatirilan)],
      ['Elde edilen getiri', h.para(FV - yatirilan)],
      ['Büyüme çarpanı (1 + i)^n', h.fmt(carpan, 6)],
      ['Dönem sayısı', h.fmt(N, 2)],
      ['Dönem oranı', '%' + h.fmt(i * 100, 5)],
    ];
    if (pmt > 0) {
      rows.push(['Bugünkü tutarın gelecek değeri', h.para(fvPV)]);
      rows.push(['Düzenli katkıların gelecek değeri', h.para(fvPmt)]);
    }
    return {
      rows,
      note: 'FV = PV × (1 + i)^n + katkı × ((1 + i)^n − 1) ÷ i. Katkılar dönem sonunda yapılır; vergi, masraf ve enflasyon dikkate alınmaz.',
    };
  },
  cases: [
    { in: { bugun: '1000', oran: '10', sure: '2', siklik: '1' }, out: { 'Gelecek değer (FV)': '1.210,00 TL', 'Elde edilen getiri': '210,00 TL', 'Büyüme çarpanı (1 + i)^n': '1,21' } },
    { in: { bugun: '10000', oran: '12', sure: '1', siklik: '12' }, out: { 'Gelecek değer (FV)': '11.268,25 TL', 'Dönem sayısı': '12', 'Dönem oranı': '%1' } },
    { in: { bugun: '0', oran: '10', sure: '3', siklik: '1', katki: '1000' }, out: { 'Gelecek değer (FV)': '3.310,00 TL', 'Yatırılan toplam tutar': '3.000,00 TL', 'Elde edilen getiri': '310,00 TL' } },
    { in: { bugun: '1000', oran: '10', sure: '10', siklik: '1' }, out: { 'Gelecek değer (FV)': '2.593,74 TL' } },
    { in: { bugun: '5000', oran: '0', sure: '5', siklik: '1', katki: '100' }, out: { 'Gelecek değer (FV)': '5.500,00 TL', 'Elde edilen getiri': '0,00 TL' } },
    { in: { bugun: '10000', oran: '12', sure: '2', siklik: '12', katki: '500' }, out: { 'Gelecek değer (FV)': '26.184,08 TL', 'Yatırılan toplam tutar': '22.000,00 TL', 'Bugünkü tutarın gelecek değeri': '12.697,35 TL', 'Düzenli katkıların gelecek değeri': '13.486,73 TL' } },
    { in: { bugun: '250000', oran: '40', sure: '3', siklik: '1' }, out: { 'Gelecek değer (FV)': '686.000,00 TL' } },
    { in: { bugun: '1000', oran: '10', sure: '2,5', siklik: '1' }, out: { 'Gelecek değer (FV)': '1.269,06 TL' } },
    { in: { bugun: '0', oran: '10', sure: '5', siklik: '1', katki: '0' }, error: true },
    { in: { bugun: '1000', oran: '10', sure: '0', siklik: '1' }, error: true },
    { in: { bugun: '1000', oran: '10', sure: '2,3', siklik: '1', katki: '100' }, error: true },
  ],
  howto: [
    '"Bugünkü tutar" alanına şu an elinizde olan ya da yatıracağınız parayı yazın. Yalnızca düzenli birikimi hesaplayacaksanız 0 girin.',
    'Beklediğiniz yıllık getiri ya da faiz oranını ve paranın kaç yıl değerlendirileceğini girin.',
    'Getirinin ne sıklıkta anaparaya eklendiğini seçin. Aylık faiz işleyen ürünler için "Aylık", yılda bir getiri hesaplanan durumlar için "Yıllık" uygundur.',
    'Düzenli olarak para ekleyecekseniz her dönem sonunda yatıracağınız tutarı yazın; dönem, seçtiğiniz bileşiklenme dönemiyle aynıdır (aylık seçtiyseniz aylık katkı).',
    '"Hesapla" düğmesine basın. İlk satır süre sonunda ulaşılan tutarı, sonraki satırlar cebinizden çıkan parayı ve getiriyi gösterir.',
  ],
  sections: [
    { h: 'Gelecek değer (FV) nedir?', p: [
      'Gelecek değer, bugünkü bir paranın belirli bir getiri oranıyla belirli bir süre değerlendirildiğinde ulaşacağı tutardır. İngilizce "future value" ifadesinin kısaltması olan FV ile gösterilir ve finansın temel kavramı olan <strong>paranın zaman değerinin</strong> bir yüzüdür: bugün elinizde olan para, değerlendirilebildiği için gelecekte aynı miktardaki paradan daha değerlidir.',
      'Gelecek değer hesabı "bu parayı şu oranla şu kadar yıl tutarsam ne olur?" sorusunu yanıtlar. Tersi olan bugünkü değer hesabı ise gelecekteki bir tutarın bugünkü karşılığını bulur. İki hesap aynı formülün iki yönüdür.',
    ] },
    { h: 'Gelecek değer formülü', p: [
      'Tek bir tutar için formül şöyledir: <strong>FV = PV × (1 + i)<sup>n</sup></strong>. PV bugünkü tutar, i dönem oranı (yıllık oran ÷ yıldaki dönem sayısı), n toplam dönem sayısıdır (yıl × yıldaki dönem sayısı). (1 + i)<sup>n</sup> ifadesine büyüme çarpanı ya da gelecek değer faktörü denir.',
      'Her dönem sonunda eşit tutarda katkı yapılıyorsa bu katkıların gelecek değeri ayrıca hesaplanıp eklenir: <strong>FV<sub>katkı</sub> = katkı × ((1 + i)<sup>n</sup> − 1) ÷ i</strong>. Bu, finans kitaplarında "dönem sonu anüitenin gelecek değeri" olarak geçer. Oran sıfırsa katkıların gelecek değeri basitçe katkı × dönem sayısıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Tek tutar:</strong> 1.000 TL, yıllık %10 getiriyle 2 yıl değerlendirilirse FV = 1.000 × (1,10)<sup>2</sup> = 1.000 × 1,21 = <strong>1.210 TL</strong> olur. İlk yıl 100 TL, ikinci yıl 110 TL getiri elde edilir; ikinci yıldaki fazladan 10 TL, ilk yılın getirisinin getirisidir.',
      '<strong>Örnek 2 – Aylık bileşik:</strong> 10.000 TL, yıllık %12 nominal oranla ve aylık bileşiklenmeyle 1 yıl tutulursa dönem oranı %1, dönem sayısı 12\'dir. FV = 10.000 × (1,01)<sup>12</sup> = <strong>11.268,25 TL</strong>. Yıllık bileşiklenmeyle sonuç 11.200 TL olurdu.',
      '<strong>Örnek 3 – Düzenli katkı:</strong> Başlangıçta 10.000 TL yatırıp iki yıl boyunca her ay sonunda 500 TL eklediğinizi, oranın yıllık %12 (aylık %1) olduğunu düşünün. Başlangıç tutarı 12.697,35 TL\'ye, 24 adet 500 TL\'lik katkı 13.486,73 TL\'ye ulaşır. Toplam gelecek değer <strong>26.184,08 TL</strong>\'dir; cebinizden çıkan 22.000 TL, getiri 4.184,08 TL\'dir.',
    ] },
    { h: 'Süre ve oranın etkisi', p: [
      'Bileşik büyümede süre, oran kadar belirleyicidir. 1.000 TL yıllık %10 ile 10 yılda 2.593,74 TL\'ye ulaşır; yani getiri anaparanın bir buçuk katını aşar. İlk yıllarda yavaş görünen artış, biriken getirinin de getiri üretmesiyle giderek hızlanır.',
      'Yüksek oranlarda etki çok daha çarpıcıdır: 250.000 TL yıllık %40 ile 3 yılda 686.000 TL olur. Ancak yüksek nominal getiri çoğunlukla yüksek enflasyonla birlikte görülür; gelecekteki tutarın alım gücünü anlamak için sonucu beklenen enflasyonla bugüne indirgemek ya da oran alanına reel getiriyi yazmak gerekir.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Birikim planı:</strong> Çocuğun eğitimi, ev peşinatı ya da emeklilik için bugünden ayrılan paranın hedef tarihte ne olacağını görmek.',
      '<strong>Yatırım karşılaştırması:</strong> Farklı getiri oranı sunan seçeneklerin aynı süre sonundaki tutarlarını yan yana koymak.',
      '<strong>Fiyat tahmini:</strong> Oran alanına beklenen yıllık fiyat artışını yazarak bugünkü bir maliyetin (kira, okul ücreti, proje bütçesi) birkaç yıl sonraki düzeyini kestirmek.',
      '<strong>İşletme hesapları:</strong> Vadeli bir alacağın ya da ertelenen bir ödemenin fırsat maliyetini hesaplamak, finans derslerindeki FV sorularını doğrulamak.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Aylık bileşiklenme seçip yıllık katkı tutarı yazmak. Katkı her zaman seçilen dönem başına girilmelidir.',
      'Nominal ve efektif oranı karıştırmak. Araç, yazdığınız yıllık oranı dönem sayısına bölerek dönem oranını bulur; yani girilen oran nominal yıllık orandır.',
      'Katkıların dönem başında yapıldığını varsaymak. Araç dönem sonu katkı hesaplar; ödemeler dönem başında yapılıyorsa katkıların gelecek değeri (1 + i) ile çarpılarak biraz daha yüksek çıkar.',
      'Vergiyi unutmak. Faiz ve fon getirilerinden kesilen vergiler net oranı düşürür; daha gerçekçi sonuç için net oranı girin.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Hesap, oranın süre boyunca sabit kaldığını ve tüm getirinin yeniden yatırıldığını varsayar. Gerçek yatırımların getirisi dalgalanır ve geçmiş getiriler geleceğin güvencesi değildir. Sonuçlar bilgilendirme amaçlıdır, yatırım tavsiyesi niteliği taşımaz; birikim ve yatırım kararlarında yetkili bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Gelecek değer nasıl hesaplanır?', 'Bugünkü tutar, bir artı dönem oranının dönem sayısı kadar kuvvetiyle çarpılır: FV = PV × (1 + i) üzeri n. Örneğin 1.000 TL, %10 ile 2 yılda 1.000 × 1,21 = 1.210 TL eder.'],
    ['FV ve PV ne demek?', 'FV (future value) gelecek değer, PV (present value) bugünkü değerdir. Aynı paranın farklı zamanlardaki karşılıklarını ifade ederler; aralarındaki bağı faiz ya da getiri oranı kurar.'],
    ['Gelecek değer ile bileşik faiz hesabı aynı şey mi?', 'Tek bir tutar için evet; gelecek değer formülü bileşik faiz formülünün ta kendisidir. Gelecek değer kavramı buna ek olarak düzenli katkıların (anüitelerin) ve nakit akışlarının ileri taşınmasını da kapsar.'],
    ['Süreyi ay olarak girebilir miyim?', 'Süre alanı yıl cinsindendir; ayı 12\'ye bölerek yazın. Örneğin 18 ay için 1,5 girin. Düzenli katkı varsa sürenin tam dönem sayısına denk gelmesi gerekir.'],
    ['Negatif oran girebilir miyim?', 'Evet. Değer kaybı senaryoları için eksi oran yazabilirsiniz; örneğin yıllık −%5 ile 1.000 TL iki yılda 902,50 TL\'ye düşer. Oran −%100\'den küçük olamaz.'],
    ['Düzenli katkı dönem başında yapılırsa sonuç nasıl değişir?', 'Her katkı bir dönem fazla getiri kazanır. Araçtaki "Düzenli katkıların gelecek değeri" satırını (1 + dönem oranı) ile çarparak dönem başı sonucunu bulabilirsiniz.'],
    ['Sonuç enflasyonu hesaba katıyor mu?', 'Hayır, sonuç nominal tutardır. Alım gücünü görmek için oran alanına reel getiriyi yazabilir ya da bulduğunuz tutarı beklenen enflasyonla bugünkü değere indirgeyebilirsiniz.'],
    ['Girdiğim tutarlar bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda çalışır; yazdığınız bilgiler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['bugunku-deger-hesapla', 'bilesik-faiz-hesapla', 'birikim-hesapla', 'net-bugunku-deger-hesapla', '72-kurali-hesapla', 'efektif-faiz-hesapla'],
};
