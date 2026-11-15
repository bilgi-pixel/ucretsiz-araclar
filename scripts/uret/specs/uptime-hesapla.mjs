export default {
  slug: 'uptime-hesapla',
  title: 'Uptime (SLA) Kesinti Süresi Hesaplama',
  h1Tail: 'yüzde ↔ kesinti süresi',
  pageTitle: 'Uptime Hesaplama – SLA Yüzdesine Göre Kesinti Süresi',
  description: 'SLA uptime yüzdesinin yılda, ayda, haftada ve günde kaç dakikalık kesintiye izin verdiğini hesaplayın ya da yaşanan kesintiden gerçekleşen uptime oranını bulun.',
  card: '%99,9 uptime yılda kaç saat kesinti demek? SLA yüzdesini kesinti süresine, kesintiyi uptime oranına çevirin.',
  category: 'gunluk',
  keywords: ['uptime hesaplama', 'sla hesaplama', 'kesinti süresi hesaplama', '99,9 uptime kaç saat', 'erişilebilirlik hesaplama', 'downtime hesaplama', 'sla yüzdesi'],
  lead: "Bir hizmetin taahhüt ettiği <strong>uptime (erişilebilirlik) yüzdesinin</strong> yılda, ayda, haftada ve günde ne kadar kesintiye izin verdiğini hesaplayın. Tersini de yapabilirsiniz: yaşanan kesinti süresini yazın, o dönemde gerçekleşen uptime oranını görün.",
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Hesap türü', type: 'select', options: [['sla', 'Uptime yüzdesi → izin verilen kesinti'], ['kesinti', 'Kesinti süresi → gerçekleşen uptime']] },
    { id: 'oran', label: 'Uptime yüzdesi (%)', type: 'number', placeholder: 'Örn. 99,9', hint: 'Yalnızca ilk hesap türünde kullanılır.' },
    { id: 'kesinti', label: 'Kesinti süresi (dakika)', type: 'number', placeholder: 'Örn. 43,2', hint: 'Yalnızca ikinci hesap türünde kullanılır.' },
    { id: 'donem', label: 'Dönem uzunluğu (gün)', type: 'number', value: '30', hint: 'Kesintinin ölçüldüğü dönem; ay için 30, yıl için 365.' },
  ],
  compute(v, h) {
    const sure = (sn) => {
      let s = Math.round(sn * 100) / 100;
      const g = Math.floor(s / 86400 + 1e-9); s -= g * 86400;
      const sa = Math.floor(s / 3600 + 1e-9); s -= sa * 3600;
      const dk = Math.floor(s / 60 + 1e-9); s -= dk * 60;
      s = Math.round(s * 100) / 100;
      const p = [];
      if (g) p.push(g + ' gün');
      if (sa) p.push(sa + ' sa');
      if (dk) p.push(dk + ' dk');
      if (s > 0.004) p.push(h.fmt(s, 2) + ' sn');
      return p.length ? p.join(' ') : '0 sn';
    };
    if (v.mod === 'kesinti') {
      const k = h.nonneg(v.kesinti, 'Kesinti süresi');
      const d = h.pos(v.donem, 'Dönem uzunluğu');
      const toplam = d * 1440;
      if (k > toplam + 1e-9) h.err('Kesinti süresi dönemin tamamından uzun olamaz. Dönem ' + h.fmt(toplam, 2) + ' dakikadır; değerleri kontrol edin.');
      const up = (1 - k / toplam) * 100;
      return {
        rows: [
          ['Gerçekleşen uptime', '%' + h.fmt(up, 4)],
          ['Kesinti oranı', '%' + h.fmt(100 - up, 4)],
          ['Çalışma süresi', sure((toplam - k) * 60)],
          ['Toplam kesinti', sure(k * 60)],
          ['Dönem', h.fmt(d, 2) + ' gün (' + h.fmt(toplam, 2) + ' dakika)'],
        ],
        note: 'Uptime = (dönem − kesinti) ÷ dönem × 100. Planlı bakımın hesaba girip girmediği sözleşmeye göre değişir.',
      };
    }
    const o = h.num(v.oran, 'Uptime yüzdesi');
    if (o < 0 || o > 100) h.err('Uptime yüzdesi 0 ile 100 arasında olmalı (örn. 99,9).');
    const pay = 1 - o / 100;
    return {
      rows: [
        ['Yıllık kesinti (365 gün)', sure(pay * 365 * 86400)],
        ['Aylık kesinti (30 gün)', sure(pay * 30 * 86400)],
        ['Haftalık kesinti', sure(pay * 7 * 86400)],
        ['Günlük kesinti', sure(pay * 86400)],
        ['Kesinti oranı', '%' + h.fmt(100 - o, 4)],
      ],
      note: 'Yıl 365 gün, ay 30 gün kabul edilmiştir. Sözleşmeniz takvim ayını (28–31 gün) esas alıyorsa aylık değer birkaç dakika oynar.',
    };
  },
  cases: [
    { in: { mod: 'sla', oran: '99,9' }, out: { 'Yıllık kesinti (365 gün)': '8 sa 45 dk 36 sn', 'Aylık kesinti (30 gün)': '43 dk 12 sn', 'Haftalık kesinti': '10 dk 4,8 sn', 'Günlük kesinti': '1 dk 26,4 sn' } },
    { in: { mod: 'kesinti', kesinti: '43,2', donem: '30' }, out: { 'Gerçekleşen uptime': '%99,9', 'Kesinti oranı': '%0,1' } },
    { in: { mod: 'sla', oran: '99,99' }, out: { 'Yıllık kesinti (365 gün)': '52 dk 33,6 sn', 'Aylık kesinti (30 gün)': '4 dk 19,2 sn', 'Günlük kesinti': '8,64 sn' } },
    { in: { mod: 'sla', oran: '99' }, out: { 'Yıllık kesinti (365 gün)': '3 gün 15 sa 36 dk', 'Aylık kesinti (30 gün)': '7 sa 12 dk', 'Günlük kesinti': '14 dk 24 sn' } },
    { in: { mod: 'sla', oran: '99,95' }, out: { 'Yıllık kesinti (365 gün)': '4 sa 22 dk 48 sn', 'Aylık kesinti (30 gün)': '21 dk 36 sn', 'Günlük kesinti': '43,2 sn' } },
    { in: { mod: 'sla', oran: '99,999' }, out: { 'Yıllık kesinti (365 gün)': '5 dk 15,36 sn', 'Aylık kesinti (30 gün)': '25,92 sn' } },
    { in: { mod: 'sla', oran: '100' }, out: { 'Yıllık kesinti (365 gün)': '0 sn' } },
    { in: { mod: 'kesinti', kesinti: '60', donem: '30' }, out: { 'Gerçekleşen uptime': '%99,8611', 'Toplam kesinti': '1 sa' } },
    { in: { mod: 'sla', oran: '101' }, error: true },
    { in: { mod: 'kesinti', kesinti: '50000', donem: '30' }, error: true },
    { in: { mod: 'sla', oran: '' }, error: true },
  ],
  howto: [
    'Hesap türünü seçin: taahhüt edilen yüzdeden izin verilen kesintiyi mi, yoksa yaşanan kesintiden gerçekleşen oranı mı bulmak istiyorsunuz?',
    'İlk tür için uptime yüzdesini yazın (örneğin 99,9). Ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz.',
    'İkinci tür için toplam kesintiyi dakika olarak, kesintinin ölçüldüğü dönemi gün olarak girin. Aylık rapor için 30, yıllık için 365 yazabilirsiniz.',
    'Hesapla düğmesine basın. Sonuç satırlarında süreler gün, saat, dakika ve saniye olarak ayrılmış biçimde görünür.',
    'Sonucu kopyalayıp teklif dosyasına, SLA raporuna ya da müşteriye yazdığınız e-postaya yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'Uptime ve SLA ne anlama gelir?', p: [
      'Uptime, bir sunucunun, internet hattının, web sitesinin ya da yazılım hizmetinin belirli bir dönemde ne kadar süre çalışır ve erişilebilir durumda kaldığını gösteren orandır. Hizmet sağlayıcılar bu oranı genellikle <strong>hizmet düzeyi sözleşmesi (SLA)</strong> içinde yüzde olarak taahhüt eder: %99, %99,9, %99,99 gibi. Yüzdeler birbirine çok yakın göründüğü için aradaki fark kolayca gözden kaçar; oysa %99 ile %99,9 arasında yıllık kesinti süresi on kat değişir.',
      'Bu araç yüzdeyi somut bir süreye çevirir. Barındırma paketi seçerken, veri merkezi ya da bulut teklifi karşılaştırırken, kendi müşterinize bir erişilebilirlik sözü verirken "bu oran pratikte kaç dakika kesinti demek?" sorusunun cevabını hemen görürsünüz.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'İzin verilen kesinti, dönemin toplam süresi ile kesinti payının çarpımıdır: <strong>kesinti = dönem süresi × (1 − uptime ÷ 100)</strong>. Bir yıl 365 gün, yani 525.600 dakika ya da 31.536.000 saniyedir. %99,9 uptime için kesinti payı binde birdir; 31.536.000 × 0,001 = 31.536 saniye, bu da 8 saat 45 dakika 36 saniye eder.',
      'Ters yönde ise <strong>uptime = (dönem − kesinti) ÷ dönem × 100</strong> formülü kullanılır. 30 günlük bir ay 43.200 dakikadır. Bu ay içinde toplam 43,2 dakika kesinti yaşandıysa uptime (43.200 − 43,2) ÷ 43.200 × 100 = %99,9 olur. Kesinti 60 dakikaya çıkarsa oran %99,8611 düzeyine iner ve %99,9 taahhüdü tutmamış olur.',
    ] },
    { h: 'Dokuzlar tablosu: hızlı başvuru', p: [
      'Sektörde erişilebilirlik düzeyleri "kaç dokuz" olduğuyla anılır. Aşağıdaki değerler 365 günlük yıl ve 30 günlük ay için hesaplanmıştır.',
    ], ul: [
      '<strong>%99 (iki dokuz):</strong> yılda 3 gün 15 saat 36 dakika, ayda 7 saat 12 dakika',
      '<strong>%99,5:</strong> yılda 1 gün 19 saat 48 dakika, ayda 3 saat 36 dakika',
      '<strong>%99,9 (üç dokuz):</strong> yılda 8 saat 45 dakika 36 saniye, ayda 43 dakika 12 saniye',
      '<strong>%99,95:</strong> yılda 4 saat 22 dakika 48 saniye, ayda 21 dakika 36 saniye',
      '<strong>%99,99 (dört dokuz):</strong> yılda 52 dakika 33,6 saniye, ayda 4 dakika 19,2 saniye',
      '<strong>%99,999 (beş dokuz):</strong> yılda 5 dakika 15,36 saniye, ayda yaklaşık 26 saniye',
    ] },
    { h: 'Sözleşme okurken dikkat edilecek noktalar', p: [
      'Aynı yüzde, sözleşmenin ayrıntılarına göre çok farklı sonuçlar doğurabilir. Önce <strong>ölçüm dönemine</strong> bakın: oran aylık mı, üç aylık mı, yıllık mı hesaplanıyor? Yıllık %99,9 taahhüdünde sağlayıcı sekiz saatlik tek bir kesinti yaşasa bile sözünü tutmuş sayılır; aylık ölçümde aynı kesinti taahhüdü açıkça bozar.',
      'İkinci nokta <strong>planlı bakımdır</strong>. Birçok sözleşme önceden duyurulan bakım pencerelerini kesinti saymaz. Üçüncüsü kesintinin tanımıdır: hizmet yavaşladığında mı, tamamen erişilemez olduğunda mı sayaç işlemeye başlar; ölçümü kim, hangi noktadan yapar? Son olarak taahhüt tutmadığında ne olacağını okuyun. Çoğu sözleşmede karşılık, hizmet bedelinin bir bölümünün iade ya da kredi olarak verilmesiyle sınırlıdır; uğradığınız iş kaybını karşılamaz.',
    ] },
    { h: 'Birden çok bileşenin toplam erişilebilirliği', p: [
      'Bir hizmet art arda çalışan bileşenlere bağlıysa (örneğin internet hattı, sunucu ve veritabanı) toplam erişilebilirlik, tek tek oranların çarpımıdır. Her biri %99,9 olan üç bileşenin birlikte erişilebilirliği 0,999 × 0,999 × 0,999 = 0,997, yani yaklaşık %99,7 olur. Bu değeri araca yazarsanız yıllık kesinti payının bir günü aştığını görürsünüz. Yedekli (biri durunca diğeri devralan) yapılarda ise hesap tersine işler ve toplam oran tek bileşenden yüksek çıkar.',
      'Küçük bir işletme için pratik sonuç şudur: en zayıf halka belirleyicidir. Sunucunuz dört dokuz taahhütlü bir veri merkezinde dursa bile ofisteki tek internet hattı ya da kesintisiz güç kaynağı olmayan bir modem, gerçek erişilebilirliği aşağı çeker.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç yılı 365 gün, ayı 30 gün, haftayı 7 gün kabul eder. Artık yıllarda ya da 31 günlük aylarda değerler çok az değişir; örneğin %99,9 için 31 günlük ayda izin verilen kesinti 44 dakika 38 saniyedir. Farklı bir dönem için ikinci hesap türünde gün sayısını kendiniz yazabilirsiniz. Sonuçlar matematiksel karşılıktır; hukuki yorum ve tazminat hesabı için sözleşme metni esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['%99,9 uptime yılda kaç saat kesinti demektir?', '365 günlük bir yılda 8 saat 45 dakika 36 saniye kesintiye karşılık gelir. Aylık bazda bu süre 43 dakika 12 saniye, günlük bazda yaklaşık 1 dakika 26 saniyedir.'],
    ['%99,9 ile %99,99 arasındaki fark gerçekten önemli mi?', 'Evet. İlki yılda yaklaşık 8 saat 46 dakika, ikincisi yalnızca 52 dakika 34 saniye kesintiye izin verir. Aradaki fark on kattır ve genellikle fiyat farkına da yansır.'],
    ['Beş dokuz ne demek?', '%99,999 erişilebilirlik anlamına gelir. Yılda yalnızca 5 dakika 15 saniye kadar kesintiye izin verir. Bu düzey, yedekli donanım ve otomatik devralma olmadan pratikte sağlanamaz.'],
    ['Gerçekleşen uptime oranını nasıl hesaplarım?', 'İkinci hesap türünü seçin, dönem içindeki toplam kesintiyi dakika olarak ve dönemin gün sayısını yazın. Araç, çalışma süresini dönem süresine bölerek yüzdeyi verir.'],
    ['Planlı bakım kesinti sayılır mı?', 'Bu tamamen sözleşmeye bağlıdır. Pek çok hizmet sağlayıcı önceden duyurduğu bakım sürelerini hesap dışında tutar. Kendi raporunuzda planlı bakımı ayrı göstermek isterseniz kesinti alanına yalnızca plansız süreyi yazın.'],
    ['Aylık değer neden bazı tablolarda 43,8 dakika görünüyor?', 'Bazı kaynaklar ayı yılın on ikide biri, yani 30,44 gün kabul eder; bu durumda %99,9 için aylık pay 43 dakika 50 saniye çıkar. Bu araç 30 günlük ayı kullanır. Farklı bir uzunluk için ikinci hesap türünde gün sayısını değiştirebilirsiniz.'],
    ['Uptime yüzdesi 100 olabilir mi?', 'Matematiksel olarak evet; araç bu durumda sıfır kesinti gösterir. Uygulamada ise hiçbir sağlayıcı uzun vadede kesintisiz hizmeti garanti edemez, bu yüzden sözleşmelerde %100 yerine dokuzlu oranlar yer alır.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız yüzde ve süreler sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['raid-kapasite-hesapla', 'bant-genisligi-hesapla', 'indirme-suresi-hesapla', 'gun-saat-cevir', 'saat-dakika-cevir'],
};
