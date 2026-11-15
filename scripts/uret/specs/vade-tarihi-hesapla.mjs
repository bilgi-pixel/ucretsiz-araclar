export default {
  slug: 'vade-tarihi-hesapla',
  title: 'Vade Tarihi Hesaplama',
  h1Tail: 'fatura, çek ve senet için',
  pageTitle: 'Vade Tarihi Hesaplama – Fatura Tarihine Gün, Hafta ya da Ay Ekleme',
  description: 'Fatura ya da düzenleme tarihine 30, 60, 90 gün gibi bir vade ekleyin; vade tarihini, haftanın gününü ve kalan günü görün. Hafta sonuna denk gelirse iş gününe kaydırır.',
  card: 'Fatura tarihine 30, 60, 90 gün ya da ay ekleyerek vade tarihini, haftanın gününü ve kalan gün sayısını hesaplayın.',
  category: 'zaman',
  keywords: ['vade tarihi hesaplama', 'fatura vade hesaplama', '30 gün vade hangi tarih', '60 gün vadeli', '90 gün sonrası hangi tarih', 'çek vade tarihi', 'senet vade hesaplama', 'ödeme günü hesaplama'],
  lead: 'Fatura, çek, senet ya da sözleşmenin başlangıç tarihini ve vade süresini yazın; ödemenin hangi güne denk geldiğini öğrenin. Vade hafta sonuna gelirse dilerseniz bir sonraki ya da bir önceki iş gününe kaydırabilir, bugüne göre kaç gün kaldığını da görebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç (fatura / düzenleme) tarihi', type: 'date' },
    { id: 'sure', label: 'Vade süresi', type: 'number', placeholder: 'Örn. 30', hint: 'Tam sayı yazın (örn. 30, 45, 60, 90).' },
    { id: 'birim', label: 'Süre birimi', type: 'select', options: [['gun', 'Gün'], ['hafta', 'Hafta'], ['ay', 'Ay']] },
    { id: 'kaydir', label: 'Vade hafta sonuna gelirse', type: 'select', options: [['yok', 'Olduğu gibi bırak'], ['sonraki', 'Sonraki iş gününe kaydır'], ['onceki', 'Önceki iş gününe çek']] },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date', hint: 'Kalan gün bu tarihe göre hesaplanır.' },
  ],
  compute(v, h) {
    const a = h.date(v.baslangic, 'Başlangıç tarihi');
    const n = h.int(v.sure, 'Vade süresi');
    if (n < 0) h.err('"Vade süresi" negatif olamaz; peşin ödeme için 0 yazın.');
    if (n > 36500) h.err('"Vade süresi" çok büyük; en fazla 36.500 yazabilirsiniz.');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    let takvim;
    if (v.birim === 'ay') {
      const t = a.getUTCFullYear() * 12 + a.getUTCMonth() + n;
      const y = Math.floor(t / 12), m = t % 12;
      const son = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      takvim = new Date(Date.UTC(y, m, Math.min(a.getUTCDate(), son)));
    } else {
      takvim = h.gunEkle(a, v.birim === 'hafta' ? n * 7 : n);
    }
    let vade = takvim, duzeltme = 'Yok';
    const g = takvim.getUTCDay(); // 0 Pazar, 6 Cumartesi
    if (g === 0 || g === 6) {
      if (v.kaydir === 'sonraki') {
        const k = g === 6 ? 2 : 1;
        vade = h.gunEkle(takvim, k);
        duzeltme = h.gunAdi(takvim) + ' yerine Pazartesi (+' + k + ' gün)';
      } else if (v.kaydir === 'onceki') {
        const k = g === 6 ? 1 : 2;
        vade = h.gunEkle(takvim, -k);
        duzeltme = h.gunAdi(takvim) + ' yerine Cuma (−' + k + ' gün)';
      } else {
        duzeltme = 'Yapılmadı (vade hafta sonuna denk geliyor)';
      }
    }
    const kalan = h.gunFarki(bugun, vade);
    return {
      rows: [
        ['Vade tarihi', h.fmtDate(vade) + ' ' + h.gunAdi(vade)],
        ['Hafta sonu düzeltmesi', duzeltme],
        ['Başlangıçtan vadeye', h.fmt(h.gunFarki(a, vade), 0) + ' gün'],
        ['Bugüne göre durum', kalan > 0 ? h.fmt(kalan, 0) + ' gün kaldı' : kalan === 0 ? 'Vade günü bugün' : h.fmt(-kalan, 0) + ' gün geçti'],
        ['Başlangıç tarihi', h.fmtDate(a) + ' ' + h.gunAdi(a)],
      ],
      note: 'Başlangıç günü sayılmaz; süre ertesi günden itibaren işler. Resmî tatiller dikkate alınmaz. Bağlayıcı vade için sözleşmenize ve güncel mevzuata bakın.',
    };
  },
  cases: [
    { in: { baslangic: '2026-01-15', sure: '30', birim: 'gun', kaydir: 'yok', bugun: '2026-02-01' }, out: { 'Vade tarihi': '14.02.2026 Cumartesi', 'Hafta sonu düzeltmesi': 'Yapılmadı (vade hafta sonuna denk geliyor)', 'Başlangıçtan vadeye': '30 gün', 'Bugüne göre durum': '13 gün kaldı' } },
    { in: { baslangic: '2026-01-15', sure: '30', birim: 'gun', kaydir: 'sonraki', bugun: '2026-02-01' }, out: { 'Vade tarihi': '16.02.2026 Pazartesi', 'Hafta sonu düzeltmesi': 'Cumartesi yerine Pazartesi (+2 gün)', 'Başlangıçtan vadeye': '32 gün', 'Bugüne göre durum': '15 gün kaldı' } },
    { in: { baslangic: '2026-01-31', sure: '1', birim: 'ay', kaydir: 'yok', bugun: '2026-03-10' }, out: { 'Vade tarihi': '28.02.2026 Cumartesi', 'Başlangıçtan vadeye': '28 gün', 'Bugüne göre durum': '10 gün geçti' } },
    { in: { baslangic: '2026-01-31', sure: '1', birim: 'ay', kaydir: 'onceki', bugun: '2026-03-10' }, out: { 'Vade tarihi': '27.02.2026 Cuma', 'Hafta sonu düzeltmesi': 'Cumartesi yerine Cuma (−1 gün)' } },
    { in: { baslangic: '2026-03-10', sure: '90', birim: 'gun', kaydir: 'sonraki', bugun: '2026-06-08' }, out: { 'Vade tarihi': '08.06.2026 Pazartesi', 'Hafta sonu düzeltmesi': 'Yok', 'Bugüne göre durum': 'Vade günü bugün' } },
    { in: { baslangic: '2026-05-04', sure: '2', birim: 'hafta', bugun: '2026-05-04' }, out: { 'Vade tarihi': '18.05.2026 Pazartesi', 'Başlangıçtan vadeye': '14 gün', 'Bugüne göre durum': '14 gün kaldı' } },
    { in: { baslangic: '2026-11-15', sure: '45', bugun: '2026-11-15' }, out: { 'Vade tarihi': '30.12.2026 Çarşamba', 'Bugüne göre durum': '45 gün kaldı' } },
    { in: { baslangic: '2026-11-30', sure: '3', birim: 'ay', kaydir: 'sonraki', bugun: '2026-11-30' }, out: { 'Vade tarihi': '01.03.2027 Pazartesi', 'Hafta sonu düzeltmesi': 'Pazar yerine Pazartesi (+1 gün)' } },
    { in: { baslangic: '2026-07-01', sure: '120', bugun: '2026-07-01' }, out: { 'Vade tarihi': '29.10.2026 Perşembe' } },
    { in: { baslangic: '2026-01-15', sure: '-5', bugun: '2026-02-01' }, error: true },
    { in: { baslangic: '2026-01-15', sure: '2,5', bugun: '2026-02-01' }, error: true },
    { in: { baslangic: '', sure: '30', bugun: '2026-02-01' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanına faturanın, çekin, senedin ya da sözleşmenin düzenlendiği günü girin.',
    '"Vade süresi" alanına süreyi tam sayı olarak yazın ve yanındaki listeden birimi (gün, hafta ya da ay) seçin.',
    'Vade cumartesi ya da pazara denk gelirse ne yapılacağını seçin: olduğu gibi bırakabilir, sonraki pazartesiye kaydırabilir ya da önceki cumaya çekebilirsiniz.',
    '"Hesapla" düğmesine basın. İlk satırda vade tarihi ve haftanın günü, altında yapılan düzeltme ve bugüne göre kalan ya da geçen gün sayısı görünür.',
    'Sonucu faturaya, teklife ya da ödeme takip tablonuza eklemek için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Vade tarihi nedir, nasıl hesaplanır?', p: [
      'Vade, bir borcun ödenmesi için tanınan süredir; vade tarihi ise bu sürenin dolduğu, ödemenin yapılması gereken gündür. Ticarette "30 gün vadeli fatura", "60 gün vadeli çek", "3 ay vadeli senet" gibi ifadeler bu süreyi anlatır. Hesap, başlangıç tarihine vade süresinin eklenmesinden ibarettir; ancak ayların farklı uzunlukta olması yüzünden elle yapıldığında hata yapmak kolaydır.',
      'Araçta yaygın sayım yöntemi kullanılır: <strong>başlangıç günü sayılmaz</strong>, süre ertesi günden itibaren işlemeye başlar. Yani <strong>vade tarihi = başlangıç tarihi + gün sayısı</strong>. Hafta seçildiğinde süre 7 ile çarpılarak güne çevrilir. Ay seçildiğinde ise gün eklenmez; takvimde aynı günün ileri bir aydaki karşılığı bulunur.',
    ] },
    { h: 'Çözümlü örnek: 30 gün vadeli fatura', p: [
      '15 Ocak 2026 tarihli bir faturanın vadesi 30 gün olsun. Ocak 31 gün çektiğinden ay sonuna 16 gün vardır; kalan 30 − 16 = 14 gün şubata taşar. Vade tarihi <strong>14 Şubat 2026</strong> olur ve bu gün cumartesidir.',
      'Bankalar hafta sonu kapalı olduğundan ödemenin fiilen yapılacağı günü görmek için "Sonraki iş gününe kaydır" seçilirse vade <strong>16 Şubat 2026 Pazartesi</strong> olarak gösterilir; başlangıçtan vadeye geçen süre 32 güne çıkar. Hesabı 1 Şubat 2026\'da yapıyorsanız bu tarihe 15 gün, kaydırılmamış vadeye ise 13 gün kalmıştır.',
    ] },
    { h: 'Gün ile ay arasındaki fark', p: [
      '"30 gün" ile "1 ay" aynı şey değildir. 30 gün her zaman tam otuz takvim günüdür; 1 ay ise başlangıç ayına göre 28 ile 31 gün arasında değişir. 15 Ocak\'a 1 ay eklendiğinde 15 Şubat elde edilir (31 gün sonra), 15 Şubat\'a 1 ay eklendiğinde 15 Mart (28 ya da 29 gün sonra). Sözleşmede süre nasıl yazılmışsa hesabı o birimle yapmak gerekir.',
      'Ay eklerken özel bir durum vardır: hedef ayda o gün bulunmayabilir. 31 Ocak\'a 1 ay eklendiğinde şubatta 31\'inci gün olmadığı için araç ayın son gününü alır; 2026 için sonuç 28 Şubat\'tır. Aynı şekilde 30 Kasım 2026\'ya 3 ay eklendiğinde 28 Şubat 2027 bulunur. Ay sonuna denk gelen vadelerde bu kural yaygın uygulamadır.',
    ] },
    { h: 'Sık kullanılan vade süreleri', ul: [
      '<strong>Peşin (0 gün):</strong> vade tarihi başlangıç tarihiyle aynıdır.',
      '<strong>7, 14 ya da 15 gün:</strong> hizmet faturalarında ve kısa vadeli alışverişlerde görülür.',
      '<strong>30 gün:</strong> en yaygın ticari vade; "ay sonu" ödemeleriyle karıştırılmamalıdır.',
      '<strong>45 ve 60 gün:</strong> toptan satışlarda ve bayi ilişkilerinde sık kullanılır.',
      '<strong>90 ve 120 gün:</strong> uzun vadeli çek ve senetlerde, sezonluk ürün satışlarında tercih edilir.',
      '<strong>Ay bazlı vadeler (1, 3, 6, 12 ay):</strong> taksitli satış, kira ve abonelik sözleşmelerinde kullanılır.',
    ] },
    { h: 'Hafta sonu ve tatil günleri', p: [
      'Vade cumartesi ya da pazara denk geldiğinde uygulama, sözleşmeye ve işlemin türüne göre değişir. Birçok durumda ödeme izleyen ilk iş gününde yapılır; bazı sözleşmeler ise ödemenin tatilden önceki son iş gününde yapılmasını ister. Araç bu yüzden üç seçenek sunar ve hangi düzeltmenin yapıldığını ayrı bir satırda açıkça yazar. "Olduğu gibi bırak" seçildiğinde vade hafta sonuna geliyorsa bu durum yine belirtilir, böylece gözden kaçmaz.',
      'Resmî ve dinî bayramlar, arife günleri ve idari izinler yıldan yıla değiştiği için hesaba katılmaz. Vade bu günlerden birine denk geliyorsa takvime ayrıca bakmanız gerekir.',
    ] },
    { h: 'Kalan gün ve gecikme takibi', p: [
      '"Bugüne göre durum" satırı, vadeye kaç gün kaldığını ya da vadenin kaç gün önce dolduğunu gösterir. Alacak takibi yapan işletmeler için bu sayı, hatırlatma zamanını belirlemeye yarar: vadesine birkaç gün kalan faturalar için nazik bir hatırlatma, vadesi geçenler için takip araması planlanabilir. Tarih alanını ileri bir güne ayarlayarak "ay sonunda bu fatura kaç gün gecikmiş olacak?" sorusunu da yanıtlayabilirsiniz.',
    ] },
    { h: 'Önemli uyarı', p: [
      'Bu araç yalnızca takvim hesabı yapar ve bilgilendirme amaçlıdır. Çek, senet, kredi, vergi ve benzeri işlemlerde vadenin nasıl hesaplanacağı, tatil günlerinin nasıl dikkate alınacağı ve gecikmenin sonuçları sözleşme hükümlerine ve yürürlükteki mevzuata bağlıdır; bunlar zaman içinde değişebilir. Hukuki ya da mali sonucu olan işlemlerde güncel mevzuatı kontrol edin, gerekirse mali müşavirinize ya da avukatınıza danışın.',
    ] },
  ],
  faq: [
    ['30 gün vadeli fatura hangi tarihte ödenir?', 'Fatura tarihine 30 takvim günü eklenir; fatura günü sayılmaz. Örneğin 15 Ocak 2026 tarihli faturanın 30 günlük vadesi 14 Şubat 2026\'da dolar.'],
    ['Başlangıç günü süreye dahil mi?', 'Hayır. Araç yaygın uygulamayı izler ve süreyi başlangıç gününün ertesi gününden başlatır. Başlangıç gününü de saymanız gerekiyorsa süreyi bir eksik yazın.'],
    ['1 ay ile 30 gün aynı sonucu verir mi?', 'Yalnızca 30 gün çeken aylarda. 1 ay, takvimde aynı günün bir sonraki aydaki karşılığıdır ve aya göre 28 ile 31 gün arasında sürer.'],
    ['Ayın 31\'inde başlayan aylık vade nasıl hesaplanır?', 'Hedef ayda 31\'inci gün yoksa o ayın son günü alınır. 31 Ocak\'a 1 ay eklendiğinde sonuç 28 Şubat (artık yıllarda 29 Şubat) olur.'],
    ['Vade hafta sonuna gelirse ne yapmalıyım?', 'Sözleşmenizde özel bir hüküm yoksa ödeme genellikle izleyen ilk iş gününde yapılır. Araçta "Sonraki iş gününe kaydır" seçeneğiyle bu tarihi görebilirsiniz; kesin kural için sözleşmenize ve güncel mevzuata bakın.'],
    ['Resmî tatiller hesaba katılıyor mu?', 'Hayır. Yalnızca cumartesi ve pazar günleri için kaydırma yapılır. Bayram ve resmî tatil günlerini takvimden ayrıca kontrol etmelisiniz.'],
    ['Geçmiş bir vade için kaç gün geciktiğini görebilir miyim?', 'Evet. Vade tarihi bugünden önceyse "Bugüne göre durum" satırı kaç gün geçtiğini gösterir. Belirli bir tarihteki gecikmeyi görmek için son alana o tarihi yazın.'],
    ['Girdiğim fatura tarihleri kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; tarih ve süre bilgileri sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['is-gunu-hesapla', 'gun-sayisi-ekle-is-gunu', 'hangi-gun-hesapla', 'ayin-son-gunu', 'ay-farki-hesapla'],
};
