export default {
  slug: 'aliskanlik-takip-cizelgesi',
  title: 'Alışkanlık Takip Çizelgesi Oluşturma',
  h1Tail: 'aylık yazdırılabilir PDF',
  pageTitle: 'Alışkanlık Takip Çizelgesi Oluştur – Aylık Yazdırılabilir PDF',
  description: 'Alışkanlıklarınızı satırlara, ayın günlerini sütunlara yerleştiren aylık alışkanlık takip çizelgesini PDF olarak oluşturun. Kendi alışkanlık adlarınızla, A4 ya da A5.',
  card: 'Alışkanlıklarınızı yazın, ayı seçin: her gün için işaret kutusu olan aylık alışkanlık takip çizelgesini PDF olarak indirin.',
  category: 'planlama',
  pdf: true,
  keywords: ['alışkanlık takip çizelgesi', 'alışkanlık takip şablonu', 'habit tracker pdf', 'aylık alışkanlık çizelgesi', 'yazdırılabilir alışkanlık takibi', 'günlük rutin çizelgesi', 'alışkanlık takvimi'],
  lead: 'Satırlarında alışkanlıklarınız, sütunlarında ayın günleri bulunan bir <strong>alışkanlık takip çizelgesi</strong> oluşturun. Alışkanlık adlarını kendiniz yazın ya da satırları boş bırakın; seçtiğiniz ayın gün sayısına göre kutular çizilir, hafta sonları gölgelenir ve her ay ayrı bir sayfa olur.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'ay', label: 'Başlangıç ayı', type: 'date', hint: 'O ayın herhangi bir gününü seçin. Boş bırakırsanız içinde bulunduğunuz ay kullanılır.' },
    { id: 'aySayisi', label: 'Ay sayısı', type: 'number', value: '1', hint: '1 ile 12 arasında. Her ay bir sayfadır.' },
    { id: 'aliskanliklar', label: 'Alışkanlıklar (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir alışkanlık yazın\n20 dakika kitap oku\nYürüyüş yap\nErken kalk', hint: 'En fazla 15 satır, satır başına 28 karakter. Boş bırakırsanız adları elle yazarsınız.', wide: true },
    { id: 'satir', label: 'Toplam satır sayısı', type: 'number', value: '10', hint: '5 ile 15 arasında. Yazdığınız alışkanlıklardan artan satırlar boş kalır.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Alışkanlık Takibi', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    if (y0 < 1900 || y0 > 2200) h.err('Başlangıç ayı 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir.');
    const adlar = h.lines(v.aliskanliklar);
    if (adlar.length > 15) h.err('En fazla 15 alışkanlık yazabilirsiniz; az sayıda alışkanlığı izlemek daha kolaydır.');
    const uzun = adlar.findIndex((s) => s.length > 28);
    if (uzun >= 0) h.err(`${uzun + 1}. alışkanlık adı 28 karakterden uzun; kısaltın (örn. "20 dk kitap").`);
    const satir = h.posint(v.satir, 'Toplam satır sayısı');
    if (satir < 5 || satir > 15) h.err('Toplam satır sayısı 5 ile 15 arasında olmalı.');
    if (adlar.length > satir) h.err(`${adlar.length} alışkanlık yazdınız; toplam satır sayısını en az ${adlar.length} yapın.`);
    const baslik = (v.baslik || '').trim() || 'Alışkanlık Takibi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const f = (p) => Math.max(5, p * k);
    const HARF = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
    const bilgi = (i) => {
      const t = new Date(Date.UTC(y0, m0 + i, 1));
      return { y: t.getUTCFullYear(), mo: t.getUTCMonth(), ilkGun: t.getUTCDay(), gunSay: new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate() };
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = bilgi(i), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      ops.push(['yazi', `${h.ayAdi(b.mo + 1)} ${b.y}`, W - m, m + 7 * k, f(12), { hiza: 'sag', kalin: true, ton: 0.25 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, adW = 54 * k, topW = 14 * k, bh = 10 * k, altNot = 9 * k;
      const gw = (W - 2 * m - adW - topW) / b.gunSay, gx = m + adW, tx = W - m - topW;
      const rh = Math.min(11 * k, (H - m - altNot - ust - bh) / satir), alt = ust + bh + satir * rh;
      // Başlık satırı
      ops.push(['kutu', m, ust, adW, bh, { dolgu: 0.9, cizgi: 0.5 }]);
      ops.push(['yazi', 'Alışkanlık', m + 2 * k, ust + 6.3 * k, f(8.5), { kalin: true }]);
      ops.push(['kutu', tx, ust, topW, bh, { dolgu: 0.9, cizgi: 0.5 }]);
      ops.push(['yazi', 'Toplam', tx + topW / 2, ust + 6.3 * k, f(7.5), { kalin: true, hiza: 'orta' }]);
      for (let d = 1; d <= b.gunSay; d++) {
        const g = (b.ilkGun + d - 1) % 7, hs = g === 0 || g === 6, x = gx + (d - 1) * gw;
        ops.push(['kutu', x, ust, gw, bh, { dolgu: hs ? 0.8 : 0.9, cizgi: 0.5 }]);
        ops.push(['yazi', String(d), x + gw / 2, ust + 4.2 * k, f(7.5), { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', HARF[g], x + gw / 2, ust + 8.2 * k, f(5.5), { hiza: 'orta', ton: 0.4 }]);
        if (hs) ops.push(['kutu', x, ust + bh, gw, satir * rh, { dolgu: 0.94 }]);
      }
      // Satırlar ve ızgara
      for (let r = 0; r < satir; r++) {
        const y = ust + bh + r * rh;
        if (r < adlar.length) ops.push(['yazi', adlar[r], m + 2 * k, y + rh / 2 + 1.1 * k, f(8.5)]);
        else ops.push(['cizgi', m + 2 * k, y + rh - 2.2 * k, m + adW - 2 * k, y + rh - 2.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
        ops.push(['cizgi', m, y + rh, W - m, y + rh, { kalinlik: 0.25, ton: 0.5 }]);
      }
      for (let d = 0; d <= b.gunSay; d++) ops.push(['cizgi', gx + d * gw, ust + bh, gx + d * gw, alt, { kalinlik: 0.25, ton: 0.5 }]);
      ops.push(['kutu', m, ust + bh, W - 2 * m, satir * rh, { cizgi: 0.4, kalinlik: 0.4 }]);
      ops.push(['yazi', 'Yaptığınız günün kutusunu işaretleyin; ay sonunda işaretleri sayıp "Toplam" sütununa yazın.', m, alt + 5.5 * k, f(7.5), { ton: 0.4 }]);
      // Tablo sayfayı doldurmuyorsa kalan alana ay sonu not kutusu
      const ny = alt + 10 * k, nyuk = H - m - ny;
      if (nyuk >= 22 * k) {
        ops.push(['kutu', m, ny, W - 2 * m, nyuk, { cizgi: 0.5 }]);
        ops.push(['yazi', 'Ay sonu notları: ne iyi gitti, gelecek ay neyi değiştireceğim?', m + 2 * k, ny + 5.5 * k, f(8.5), { kalin: true }]);
        for (let yy = ny + 14 * k; yy < ny + nyuk - 2 * k; yy += 8 * k) ops.push(['cizgi', m + 2.5 * k, yy, W - m - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      }
      sayfalar.push(ops);
    }
    const b0 = bilgi(0), bs = bilgi(n - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${h.ayAdi(b0.mo + 1)} ${b0.y}`],
        ['Son ay', `${h.ayAdi(bs.mo + 1)} ${bs.y}`],
        ['İlk ayda gün sütunu', `${b0.gunSay} gün`],
        ['Satırlar', `${satir} satır (${adlar.length} hazır yazılı, ${satir - adlar.length} boş)`],
        ['İlk ayda işaret kutusu', `${satir * b0.gunSay} kutu`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Bu çizelge kişisel takip içindir; tıbbi tavsiye ya da tedavi planı değildir. Yazdırırken yönü yatay, ölçeği %100 seçin.',
      pdf: { ad: 'aliskanlik-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { ay: '2026-11-18', aySayisi: '1', aliskanliklar: '20 dakika kitap oku\nYürüyüş yap\nErken kalk', satir: '10' }, out: { 'Sayfa sayısı': '1 sayfa', 'İlk ay': 'Kasım 2026', 'İlk ayda gün sütunu': '30 gün', 'Satırlar': '10 satır (3 hazır yazılı, 7 boş)', 'İlk ayda işaret kutusu': '300 kutu' }, pdfSayfa: 1 },
    { in: { ay: '2027-01-01', aySayisi: '3', satir: '8', boyut: 'a5' }, out: { 'Sayfa sayısı': '3 sayfa', 'İlk ay': 'Ocak 2027', 'Son ay': 'Mart 2027', 'İlk ayda gün sütunu': '31 gün', 'Satırlar': '8 satır (0 hazır yazılı, 8 boş)', 'İlk ayda işaret kutusu': '248 kutu', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 3 },
    { in: { ay: '2028-02-29', aySayisi: '1', aliskanliklar: 'Su iç\nEsneme\nGünlük yaz\nDil çalış\nEkransız akşam', satir: '5' }, out: { 'İlk ayda gün sütunu': '29 gün', 'Satırlar': '5 satır (5 hazır yazılı, 0 boş)', 'İlk ayda işaret kutusu': '145 kutu' }, pdfSayfa: 1 },
    { in: { ay: '2027-02-15', aySayisi: '12', satir: '15' }, out: { 'İlk ayda gün sütunu': '28 gün', 'Son ay': 'Ocak 2028', 'İlk ayda işaret kutusu': '420 kutu' }, pdfSayfa: 12 },
    { in: { ay: '2026-12-01', aySayisi: '2', aliskanliklar: 'Bu ad tam yirmi sekiz harf!!', satir: '15', boyut: 'a5', baslik: 'Rutinlerim' }, out: { 'İlk ay': 'Aralık 2026', 'Son ay': 'Ocak 2027', 'Satırlar': '15 satır (1 hazır yazılı, 14 boş)' }, pdfSayfa: 2 },
    { in: { ay: '2026-11-18', aliskanliklar: 'a\nb\nc\nd\ne\nf', satir: '5' }, error: true },
    { in: { ay: '2026-11-18', satir: '16' }, error: true },
    { in: { ay: '2026-11-18', aliskanliklar: 'Her gün en az otuz dakika tempolu yürüyüş', satir: '10' }, error: true },
    { in: { ay: '2026-11-18', aySayisi: '13' }, error: true },
  ],
  howto: [
    '"Başlangıç ayı" alanından izlemeye başlayacağınız ayın herhangi bir gününü seçin; çizelge o ayın birinden son gününe kadar çizilir.',
    'İzlemek istediğiniz alışkanlıkları her satıra bir tane gelecek biçimde yazın. Adları elle yazmayı tercih ediyorsanız kutuyu boş bırakın.',
    '"Toplam satır sayısı" alanına çizelgede kaç satır olacağını yazın. Yazdığınız alışkanlıklardan artan satırlar, sonradan ekleyecekleriniz için boş kalır.',
    'Birkaç aylık takip istiyorsanız ay sayısını artırın; aynı alışkanlık listesi her ayın sayfasına yazılır.',
    '"Çizelgeyi oluştur" düğmesine basın, önizlemeyi kontrol edin ve "PDF indir" ile dosyayı kaydedip yatay yönde yazdırın.',
  ],
  sections: [
    { h: 'Çizelge nasıl okunur?', p: [
      'Sayfanın sol üstünde başlık, sağ üstünde ay ve yıl yazar. Altındaki tablonun ilk sütunu alışkanlık adlarıdır. Ardından ayın her günü için bir sütun gelir; sütun başlığında üstte gün numarası, altında gün adının iki harfli kısaltması bulunur (Pt, Sa, Ça, Pe, Cu, Ct, Pz). Cumartesi ve pazar sütunları açık gri gölgelidir; bu sayede haftaların nerede başlayıp bittiğini saymadan görürsünüz. En sağdaki "Toplam" sütununa ay sonunda o alışkanlığı kaç gün yaptığınızı yazarsınız. Satır sayısı az olduğunda tablonun altında kalan boşluğa çizgili bir "Ay sonu notları" kutusu eklenir.',
      'Sütun sayısı aya göre değişir: şubat için 28 ya da 29, diğer aylar için 30 ya da 31 sütun çizilir ve kutular sayfa genişliğine yayılır. Örneğin Kasım 2026 için 30 gün sütunu ve 10 satır seçildiğinde çizelgede 30 × 10 = 300 işaret kutusu bulunur.',
    ] },
    { h: 'Nasıl doldurulur?', ol: [
      'Her günün sonunda, o gün yaptığınız alışkanlıkların kutusunu işaretleyin. Çarpı atabilir, kutuyu boyayabilir ya da nokta koyabilirsiniz; önemli olan her gün aynı işareti kullanmaktır.',
      'Yapmadığınız günün kutusunu boş bırakın. Boş kutu bir ceza değil, bilgidir: hangi günlerde aksadığınızı gösterir.',
      'Hasta olduğunuz ya da yolda olduğunuz günler için farklı bir işaret (örneğin küçük bir çizgi) kullanabilirsiniz; böylece mazeretli günler aksama gibi görünmez.',
      'Ay sonunda her satırdaki işaretleri sayıp "Toplam" sütununa yazın. İsterseniz gün sayısına bölerek yüzdesini de hesaplayabilirsiniz: 30 günlük ayda 24 işaret, yüzde 80 eder.',
      'Yeni aya geçerken listeyi gözden geçirin: yerleşmiş alışkanlığı çıkarın, tutmayanı küçültün ya da değiştirin.',
    ] },
    { h: 'Hangi alışkanlıkları yazmalı?', p: [
      'Çizelge, evet ya da hayır diye yanıtlanabilen günlük davranışlar için tasarlanmıştır. "Sağlıklı yaşa" izlenemez; "20 dakika yürü" izlenebilir. Adı kısa ve ölçülebilir tutun; 28 karakter sınırı bunu da hatırlatır. Aynı anda çok sayıda yeni alışkanlık başlatmak genellikle hepsinin birden bırakılmasıyla sonuçlanır; üç ile beş satırla başlayıp yerleştikçe eklemek daha gerçekçidir.',
    ], ul: [
      '<strong>Öğrenme:</strong> kitap okuma, yabancı dil çalışma, enstrüman pratiği, soru çözme.',
      '<strong>Düzen:</strong> yatağı toplama, akşam ertesi günü planlama, masayı boşaltma, harcamaları not etme.',
      '<strong>Hareket ve günlük bakım:</strong> yürüyüş, esneme, su içmeyi hatırlama, belirli saatte yatma.',
      '<strong>Bırakmak istenenler:</strong> olumsuz cümleyi olumluya çevirerek yazın; "gece atıştırma yok" yerine "akşam yemeğinden sonra mutfak kapalı" gibi.',
    ] },
    { h: 'Takip neden işe yarar?', p: [
      'İşaretlenen kutular art arda dizildikçe görünür bir zincir oluşur ve çoğu kişi bu zinciri koparmak istemez. Çizelgenin ikinci yararı dürüst bir kayıt tutmasıdır: "bu ay düzenli yürüdüm" duygusu ile sayfadaki on bir işaret arasındaki fark, bir sonraki ayın planını daha gerçekçi yapar. Üçüncü yararı örüntüleri göstermesidir; boş kutular hep hafta sonuna ya da belli bir güne denk geliyorsa sorun iradede değil, o günün düzenindedir.',
      'Kusursuz bir ay hedeflemeyin. Bir günü kaçırmak zinciri bozmaz; önemli olan ertesi gün yeniden başlamaktır. Sayfayı her gün göreceğiniz bir yere, örneğin çalışma masasına ya da buzdolabı kapağına koymak, işaretlemeyi unutmamayı kolaylaştırır.',
    ] },
    { h: 'Sağlıkla ilgili alışkanlıklar için not', p: [
      'Bu çizelge yalnızca kişisel kayıt tutmaya yarayan boş bir tablodur; <strong>tıbbi tavsiye değildir</strong> ve herhangi bir beslenme, egzersiz ya da tedavi programı önermez. İlaç kullanımı, diyet, yoğun egzersiz ya da uyku düzeniyle ilgili hedefleri belirlerken, özellikle süregelen bir sağlık sorununuz varsa, hekiminize ya da ilgili sağlık uzmanına danışın. Çizelgedeki boş kutular bir başarısızlık ölçüsü olarak değil, yalnızca bilgi olarak okunmalıdır.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde yönü <strong>yatay</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. A4 sayfada her gün kutusu yaklaşık 7 mm genişliğindedir. A5 sayfada kutular yaklaşık 5 mm genişliğe iner; işaretlemek için yeterlidir, ancak adları elle yazacaksanız ince uçlu kalem kullanın.',
      'Bir çizelgede en fazla 15 satır, bir dosyada en fazla 12 ay bulunabilir. Alışkanlık adları 28 karakterle sınırlıdır; daha uzun adlar sütundan taşacağı için kabul edilmez. Haftalık ya da belirli günlerde yapılan alışkanlıkları da bu çizelgede izleyebilirsiniz; yapılmayacak günlerin kutularına baştan küçük bir çizgi çekmeniz yeterlidir.',
    ] },
  ],
  faq: [
    ['Alışkanlık takip çizelgesi ücretsiz mi?', 'Evet. Araç ücretsizdir, üyelik istemez ve dilediğiniz ay için dilediğiniz kadar çizelge oluşturabilirsiniz.'],
    ['Kaç alışkanlık yazabilirim?', 'Bir sayfada en fazla 15 satır bulunur. Yeni başlayanlar için üç ile beş alışkanlık önerilir; çok uzun bir liste izlemeyi zorlaştırır.'],
    ['Alışkanlık adlarını boş bırakabilir miyim?', 'Evet. Alışkanlıklar kutusunu boş bırakırsanız ad sütununda yalnızca yazı çizgileri basılır ve adları elle yazarsınız. Bir kısmını yazıp kalan satırları boş bırakmak da mümkündür.'],
    ['Çizelge ayın gün sayısına göre mi çiziliyor?', 'Evet. Seçtiğiniz ay kaç gün çekiyorsa o kadar sütun çizilir; artık yıllarda şubat için 29 sütun açılır. Gün adları da o aya göre doğru yerleştirilir.'],
    ['Birkaç ayı birden yazdırabilir miyim?', 'Evet. Ay sayısını on ikiye kadar artırabilirsiniz. Her ay ayrı bir sayfa olur ve yazdığınız alışkanlık listesi her sayfada tekrarlanır.'],
    ['Haftada üç gün yaptığım bir alışkanlığı nasıl izlerim?', 'Yapmayı planlamadığınız günlerin kutularına baştan küçük bir çizgi çekin; geriye kalan kutular hedef günlerinizdir. Ay sonu toplamını hedef gün sayısıyla karşılaştırırsınız.'],
    ['Bu çizelge bir sağlık programı mı?', 'Hayır. Yalnızca kendi belirlediğiniz davranışları işaretlemeniz için boş bir tablodur; tıbbi tavsiye içermez. Sağlığınızı etkileyebilecek hedefler için bir sağlık uzmanına danışmanız gerekir.'],
    ['Yazdığım alışkanlıklar bir yere kaydediliyor mu?', 'Hayır. PDF dosyası tarayıcınızın içinde, kendi cihazınızda üretilir. Yazdığınız alışkanlık adları ve seçtiğiniz tarih sunucuya gönderilmez.'],
  ],
  related: ['otuz-gunluk-hedef-cizelgesi', 'aylik-planlayici', 'gunluk-planlayici', 'hedef-planlayici', 'kitap-okuma-takip-cizelgesi'],
};
