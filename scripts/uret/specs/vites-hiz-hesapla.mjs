export default {
  slug: 'vites-hiz-hesapla',
  title: 'Vites Oranına Göre Hız Hesaplama',
  h1Tail: 'devir, oran ve lastikten km/sa',
  pageTitle: 'Vites Oranına Göre Hız Hesaplama – Devirden Km/Sa Bulma',
  description: 'Motor devri, vites oranı, diferansiyel oranı ve lastik ebadından aracın hızını hesaplayın; tekerlek devrini ve 1.000 devir başına hızı görün.',
  card: 'Motor devri, vites ve diferansiyel oranı ile lastik ebadından aracın o vitesteki hızını km/sa olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['vites oranı hız hesaplama', 'devir hız hesaplama', 'diferansiyel oranı hesaplama', 'şanzıman oranı hız', 'kaç devirde kaç km', 'aktarma oranı hesaplama', '1000 devirde hız'],
  lead: `Motor devrini, seçili vitesin oranını, diferansiyel (son aktarma) oranını ve lastik ebadını yazın; araç o vitesteki <strong>kuramsal hızı</strong> kilometre/saat olarak hesaplar ve her 1.000 devir için kaç km/sa hız kazanıldığını gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'devir', label: 'Motor devri (d/d)', type: 'number', placeholder: 'Örn. 3000', hint: 'Binlik ayraç kullanmayın: 3000 yazın.' },
    { id: 'vites', label: 'Vites oranı', type: 'number', placeholder: 'Örn. 1', hint: 'Seçili vitesin oranı; örneğin 0,8 ya da 3,5.' },
    { id: 'dif', label: 'Diferansiyel oranı', type: 'number', placeholder: 'Örn. 4', hint: 'Son aktarma oranı.' },
    { id: 'lastik', label: 'Lastik ebadı', type: 'text', value: '205/55 R16', hint: 'Genişlik/yanak oranı R jant çapı biçiminde.' },
  ],
  compute(v, h) {
    const devir = h.pos(v.devir, 'Motor devri');
    const vites = h.pos(v.vites, 'Vites oranı');
    const dif = h.pos(v.dif, 'Diferansiyel oranı');
    if (devir > 30000) h.err('"Motor devri" en fazla 30000 d/d olabilir.');
    if (vites > 30 || dif > 30) h.err('Vites ve diferansiyel oranları en fazla 30 olabilir; oranı 3,5 gibi tek sayı olarak yazın.');
    const t = String(v.lastik ?? '').trim().toUpperCase().replace(',', '.');
    if (t === '') h.err('"Lastik ebadı" alanını doldurun (örn. 205/55 R16).');
    const m = /^(\d{3})\s*\/\s*(\d{2})\s*(?:Z?R|-|\s)\s*(\d{2}(?:\.5)?)$/.exec(t);
    if (!m) h.err('"Lastik ebadı" 205/55 R16 biçiminde olmalı: genişlik (mm) / yanak oranı R jant çapı (inç).');
    const gen = +m[1], oran = +m[2], jant = +m[3];
    if (gen < 105 || gen > 455 || oran < 20 || oran > 95 || jant < 10 || jant > 30) h.err('Lastik ebadı olağan sınırların dışında; değerleri kontrol edin.');
    const cap = jant * 25.4 + 2 * gen * oran / 100; // mm
    const cevre = Math.PI * cap; // mm
    const toplam = vites * dif;
    const teker = devir / toplam;
    const hiz = teker * cevre * 60 / 1e6;
    return {
      rows: [
        ['Hız', h.fmt(hiz, 1) + ' km/sa'],
        ['Tekerlek devri', h.fmt(teker, 1) + ' d/d'],
        ['Toplam aktarma oranı', h.fmt(toplam, 3) + ' : 1'],
        ['1.000 d/d başına hız', h.fmt(hiz / devir * 1000, 2) + ' km/sa'],
        ['Lastik çapı', h.fmt(cap, 1) + ' mm'],
        ['Lastik çevresi', h.fmt(cevre, 0) + ' mm'],
      ],
      note: 'Kuramsal hızdır: debriyaj ya da tork konvertörü kayması, lastiğin yük altında ezilmesi ve aşınma hesaba katılmamıştır; gerçek hız genellikle birkaç yüzde düşük olur.',
    };
  },
  cases: [
    { in: { devir: '3000', vites: '1', dif: '4', lastik: '205/55 R16' }, out: { 'Hız': '89,3 km/sa', 'Tekerlek devri': '750 d/d', 'Toplam aktarma oranı': '4 : 1', '1.000 d/d başına hız': '29,78 km/sa', 'Lastik çapı': '631,9 mm' } },
    { in: { devir: '6000', vites: '3,5', dif: '4', lastik: '205/55 R16' }, out: { 'Hız': '51 km/sa', 'Tekerlek devri': '428,6 d/d', 'Toplam aktarma oranı': '14 : 1' } },
    { in: { devir: '2000', vites: '0,8', dif: '3,5', lastik: '195/65 R15' }, out: { 'Hız': '85,4 km/sa', 'Toplam aktarma oranı': '2,8 : 1', 'Lastik çapı': '634,5 mm' } },
    { in: { devir: '2500', vites: '0,7', dif: '3,9', lastik: '225/45 R17' }, out: { 'Hız': '109,5 km/sa', 'Toplam aktarma oranı': '2,73 : 1' } },
    { in: { devir: '1000', vites: '1', dif: '1', lastik: '205/55R16' }, out: { 'Hız': '119,1 km/sa', 'Tekerlek devri': '1.000 d/d', 'Lastik çevresi': '1.985 mm' } },
    { in: { devir: '4000', vites: '1,3', dif: '4,1', lastik: '185/65 R15' }, out: { 'Hız': '87,9 km/sa', 'Lastik çapı': '621,5 mm' } },
    { in: { devir: '3000', vites: '0', dif: '4', lastik: '205/55 R16' }, error: true },
    { in: { devir: '3000', vites: '1', dif: '4', lastik: '16 inç' }, error: true },
  ],
  howto: [
    `"Motor devri" alanına hızı öğrenmek istediğiniz devri yazın; örneğin devir kesici sınırı ya da otoyol seyir devri.`,
    `Seçili vitesin oranını ve diferansiyel oranını girin. Bu değerler aracın teknik veri sayfasında ya da kullanım kılavuzunda yer alır.`,
    `Tahrikli akstaki lastiğin ebadını 205/55 R16 biçiminde yazın.`,
    `"Hesapla" düğmesine basın; ilk satır o devirdeki kuramsal hızı gösterir.`,
    `Her vites için oranı değiştirip hesabı yineleyerek vites başına azami hız tablosu çıkarabilirsiniz.`,
  ],
  sections: [
    { h: 'Motor devri tekerleğe nasıl ulaşır?', p: [
      `Motorun krank mili dakikada binlerce tur atar, ancak tekerlekler bu hızda dönmez. Arada iki kademeli bir düşürme vardır. İlki şanzımandaki seçili vitestir: 3,5 oranındaki birinci viteste krank mili 3,5 tur attığında şanzıman çıkış mili yalnızca bir tur atar. İkincisi diferansiyeldeki son aktarma oranıdır; şanzıman çıkışını bir kez daha düşürerek tekerleklere iletir.`,
      `İki oranın çarpımına <strong>toplam aktarma oranı</strong> denir. Oran büyüdükçe tekerleğe ulaşan tork artar, hız düşer; bu yüzden kalkışta büyük oranlı birinci vites, otoyolda küçük oranlı üst vitesler kullanılır. Oranı 1'den küçük olan viteslere aşırı vites (overdrive) denir; bu viteslerde şanzıman çıkış mili motordan hızlı döner ve motor düşük devirde, daha sessiz ve tutumlu çalışır.`,
    ] },
    { h: 'Hesaplama formülü', p: [
      `Önce tekerleğin dakikadaki tur sayısı bulunur: <strong>tekerlek devri = motor devri ÷ (vites oranı × diferansiyel oranı)</strong>. Tekerlek her turda çevresi kadar yol alır; çevre, lastik çapının π ile çarpımıdır. Lastik çapı ebat yazısından hesaplanır: <strong>çap = jant × 25,4 + 2 × genişlik × yanak oranı ÷ 100</strong>.`,
      `Dakikada alınan yol saatlik hıza çevrilir: <strong>hız (km/sa) = tekerlek devri × çevre (m) × 60 ÷ 1.000</strong>. Bütün işlem tek satırda şöyle yazılabilir: hız = devir × çevre × 60 ÷ (vites oranı × diferansiyel oranı × 1.000).`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Lastiği 205/55 R16 olan bir araçta dördüncü vitesin oranı 1,00, diferansiyel oranı 4,00 olsun ve motor 3.000 d/d'de dönsün. Lastik çapı 16 × 25,4 + 2 × 205 × 0,55 = 406,4 + 225,5 = 631,9 mm, çevresi 631,9 × π = 1.985 mm, yani yaklaşık 1,985 metredir.`,
      `Toplam oran 1,00 × 4,00 = 4'tür; tekerlek dakikada 3.000 ÷ 4 = 750 tur atar. Dakikada alınan yol 750 × 1,985 = 1.489 metre, saatte 1.489 × 60 = 89.333 metre eder. Hız <strong>89,3 km/sa</strong> bulunur. Bu vites her 1.000 devirde 29,78 km/sa hız kazandırır; 6.000 d/d'de kuramsal hız yaklaşık 178,7 km/sa olur.`,
      `Aynı araçta oranı 3,5 olan birinci viteste 6.000 d/d'de toplam oran 14, tekerlek devri 428,6 d/d ve hız 51 km/sa çıkar. Birinci vitesin devir sınırına kadar çekildiğinde ulaşabileceği en yüksek hız budur.`,
    ] },
    { h: '1.000 devir başına hız neden kullanışlıdır?', p: [
      `Her vites için "1.000 d/d başına hız" sabit bir sayıdır ve o vitesin ne kadar uzun olduğunu tek bakışta gösterir. Değer büyükse vites uzundur: otoyolda motor düşük devirde döner, tüketim ve gürültü azalır, ama ara hızlanma zayıflar. Değer küçükse vites kısadır: hızlanma canlıdır, ancak seyir devri yükselir.`,
      `Bu sayı pratik sorulara hızlı yanıt verir. Son vitesi 1.000 devirde 45 km/sa veren bir araç 120 km/sa hızda yaklaşık 2.670 d/d'de döner. Devir saatiniz ile hız göstergeniz arasındaki ilişkiyi bu yolla denetleyebilir, vites kutusu ya da diferansiyel değişikliğinin seyir devrine etkisini önceden görebilirsiniz.`,
    ] },
    { h: 'Lastik ve oran değişikliklerinin etkisi', ul: [
      `<strong>Daha büyük çaplı lastik</strong> her turda daha uzun yol alır; bütün vitesler uzar, hız göstergesi olduğundan düşük okur.`,
      `<strong>Daha büyük diferansiyel oranı</strong> (örneğin 3,7 yerine 4,1) bütün vitesleri kısaltır: hızlanma artar, her vitesin azami hızı ve otoyol ekonomisi düşer.`,
      `<strong>Vites oranları arasındaki basamak</strong> vites değiştirdiğinizde devrin ne kadar düşeceğini belirler. İki ardışık vitesin oranını birbirine bölerek devir düşüşünü bulabilirsiniz: 2,0'dan 1,4'e geçişte devir yüzde 30 azalır.`,
      `<strong>Arazi araçlarındaki transfer kutusu</strong> gibi ek kademeler varsa oranını vites oranıyla çarparak girin.`,
    ] },
    { h: 'Kuramsal hız ile gerçek hız arasındaki fark', p: [
      `Hesap, motorla tekerlek arasında hiç kayma olmadığını ve lastiğin nominal çapında döndüğünü varsayar. Gerçekte yük altındaki lastik ezilir ve yuvarlanma yarıçapı nominal yarıçaptan biraz küçüktür; tork konvertörlü otomatik şanzımanlarda kilitleme devrede değilken kayma olur; sürekli değişken (CVT) şanzımanlarda ise sabit bir vites oranı yoktur. Ayrıca bir vitesin kuramsal azami hızına ulaşmak, motorun o hızdaki hava ve yuvarlanma direncini yenecek güce sahip olmasına bağlıdır.`,
      `Bu yüzden sonuç bir üst sınır ve karşılaştırma değeri olarak okunmalıdır. Diferansiyel ya da şanzıman değişikliği gibi mekanik işlemler aracın tescil bilgilerini ve güvenliğini etkileyebilir; uygulamadan önce yetkin bir ustaya danışın. Hesap bilgilendirme amaçlıdır ve yasal hız sınırlarını aşmayı özendirmez.`,
    ] },
  ],
  faq: [
    ['Vites oranından hız nasıl hesaplanır?', `Motor devri, vites oranı ile diferansiyel oranının çarpımına bölünerek tekerlek devri bulunur. Tekerlek devri lastik çevresi (metre) ve 60 ile çarpılıp 1.000'e bölününce km/sa cinsinden hız elde edilir.`],
    ['Vites ve diferansiyel oranlarını nereden bulabilirim?', `Aracın teknik veri sayfasında, kullanım kılavuzunda ya da servis dokümanlarında "aktarma oranları" başlığı altında yer alır. Diferansiyel oranı "son aktarma" ya da "final" olarak da geçer.`],
    ['Oranı 0,8 olan vites ne anlama gelir?', `Bu bir aşırı vitestir: motor 0,8 tur attığında şanzıman çıkışı 1 tur atar. Seyir halinde motor devrini düşürerek yakıt tüketimini ve gürültüyü azaltır.`],
    ['Hesaplanan hız göstergedekiyle neden uyuşmuyor?', `Hız göstergeleri çoğunlukla gerçek hızdan biraz fazla gösterir; ayrıca lastiğin yük altındaki gerçek yuvarlanma çevresi nominal değerden küçüktür. Birkaç yüzdelik fark olağandır.`],
    ['Lastik büyütünce hız artar mı?', `Aynı devirde kuramsal hız artar, çünkü tekerlek her turda daha uzun yol alır. Ancak tekerleğe ulaşan çekiş kuvveti aynı oranda azalır; aracın hızlanması zayıflar.`],
    ['Otomatik şanzımanlı araçlarda kullanılabilir mi?', `Sabit kademeli otomatik ve çift kavramalı şanzımanlarda, tork konvertörü kilitliyken evet. Sürekli değişken (CVT) şanzımanlarda oran sürekli değiştiği için yalnızca belirli bir andaki oran biliniyorsa kullanılabilir.`],
    ['Motosiklet için de hesap yapabilir miyim?', `Motosikletlerde birincil aktarma, vites ve zincir dişli oranı olmak üzere üç kademe bulunur. Birincil oran ile vites oranını çarpıp "Vites oranı" alanına, arka dişli sayısının ön dişli sayısına bölümünü "Diferansiyel oranı" alanına yazabilirsiniz; lastik ebadı aynı biçimde girilir.`],
    ['Girdiğim değerler bir yere gönderiliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız bilgiler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['lastik-karsilastir', 'lastik-olcusu-hesapla', 'motor-hacmi-hesapla', 'motor-guc-tork-hesapla', 'bisiklet-vites-orani-hesapla', 'hiz-hesapla'],
};
