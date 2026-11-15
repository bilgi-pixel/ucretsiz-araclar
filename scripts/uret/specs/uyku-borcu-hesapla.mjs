export default {
  slug: 'uyku-borcu-hesapla',
  title: 'Uyku Borcu Hesaplama',
  h1Tail: 'haftalık uyku açığı',
  pageTitle: 'Uyku Borcu Hesaplama – Haftalık Uyku Açığınızı Bulun',
  description: 'Son gecelerde kaç saat uyuduğunuzu yazın; ihtiyacınıza göre biriken uyku borcunu, gecelik ortalama uykunuzu ve borcu kapatma süresini hesaplayın.',
  card: 'Son gecelerdeki uyku sürelerinizi girin; biriken uyku borcunuzu, ortalama uykunuzu ve telafi süresini görün.',
  category: 'saglik',
  keywords: ['uyku borcu hesaplama', 'uyku açığı', 'haftalık uyku borcu', 'eksik uyku telafisi', 'kaç saat uyku borcum var', 'uyku süresi ortalaması', 'uykusuzluk hesaplama'],
  lead: 'İhtiyacınızdan az uyuduğunuz her gece, eksik kalan süre birikerek <strong>uyku borcuna</strong> dönüşür. Gecelik uyku ihtiyacınızı ve son gecelerde kaç saat uyuduğunuzu yazın; toplam borcunuzu, ortalamanızı ve borcu kapatmanın ne kadar süreceğini görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'ihtiyac', label: 'Gecelik uyku ihtiyacı (saat)', type: 'number', value: '8', hint: 'Erişkinlerin çoğu için 7–9 saat arasıdır.' },
    { id: 'geceler', label: 'Son gecelerde uyunan süreler (saat)', type: 'text', wide: true, placeholder: 'Örn. 6 7 6,5 8 5 9 7', hint: 'Her gece için bir sayı; boşlukla ayırın. Yarım saat için 6,5 yazın. En fazla 31 gece.' },
  ],
  compute(v, h) {
    const ihtiyac = h.pos(v.ihtiyac, 'Gecelik uyku ihtiyacı');
    if (ihtiyac < 3 || ihtiyac > 16) h.err('"Gecelik uyku ihtiyacı" 3 ile 16 saat arasında olmalı.');
    const g = h.nums(v.geceler, 'Son gecelerde uyunan süreler');
    if (g.length > 31) h.err('En fazla 31 gece girebilirsiniz; listeyi kısaltın.');
    for (const x of g) if (x < 0 || x > 24) h.err('Uyku süreleri 0 ile 24 saat arasında olmalı; değerleri saat olarak yazın (örn. 6,5).');
    const sure = (saat) => {
      const dk = Math.round(saat * 60);
      const s = Math.floor(dk / 60), d = dk % 60;
      if (s && d) return `${s} saat ${d} dakika`;
      if (s) return `${s} saat`;
      return `${d} dakika`;
    };
    const n = g.length;
    const toplam = g.reduce((a, b) => a + b, 0);
    const gerek = ihtiyac * n;
    const borc = Math.round((gerek - toplam) * 60) / 60;
    const eksikGece = g.filter((x) => x < ihtiyac - 1e-9).length;
    const rows = [];
    if (borc > 1e-9) rows.push(['Toplam uyku borcu', sure(borc)]);
    else if (borc < -1e-9) rows.push(['Toplam uyku borcu', `Uyku borcunuz yok (${sure(-borc)} fazla uyku)`]);
    else rows.push(['Toplam uyku borcu', 'Uyku borcunuz yok']);
    rows.push(['Gecelik ortalama uyku', sure(toplam / n)]);
    rows.push(['Toplam uyku', `${sure(toplam)} (${n} gece)`]);
    rows.push(['Toplam ihtiyaç', sure(gerek)]);
    rows.push(['İhtiyacın altında kalan gece', `${eksikGece} / ${n}`]);
    if (borc > 1e-9) {
      rows.push(['Gecelik ortalama açık', sure(borc / n)]);
      rows.push(['Günde 1 saat ek uykuyla telafi süresi', Math.ceil(borc - 1e-9) + ' gün']);
    }
    return {
      rows,
      note: 'Borç = (gecelik ihtiyaç × gece sayısı) − toplam uyku. Fazla uyunan geceler eksik geceleri dengeler. Sonuç bilgilendirme amaçlıdır; süregen uykusuzlukta hekime başvurun.',
    };
  },
  cases: [
    { in: { ihtiyac: '8', geceler: '6 7 6,5 8 5 9 7' }, out: { 'Toplam uyku borcu': '7 saat 30 dakika', 'Gecelik ortalama uyku': '6 saat 56 dakika', 'Toplam uyku': '48 saat 30 dakika (7 gece)', 'Toplam ihtiyaç': '56 saat', 'İhtiyacın altında kalan gece': '5 / 7', 'Günde 1 saat ek uykuyla telafi süresi': '8 gün' } },
    { in: { ihtiyac: '7,5', geceler: '6 6 6 6 6' }, out: { 'Toplam uyku borcu': '7 saat 30 dakika', 'Gecelik ortalama uyku': '6 saat', 'Toplam ihtiyaç': '37 saat 30 dakika', 'İhtiyacın altında kalan gece': '5 / 5', 'Gecelik ortalama açık': '1 saat 30 dakika' } },
    { in: { ihtiyac: '8', geceler: '8 8 8 8 8 8 8' }, out: { 'Toplam uyku borcu': 'Uyku borcunuz yok', 'Gecelik ortalama uyku': '8 saat', 'İhtiyacın altında kalan gece': '0 / 7' } },
    { in: { ihtiyac: '8', geceler: '9 9 8 10 9 8 9' }, out: { 'Toplam uyku borcu': 'Uyku borcunuz yok (6 saat fazla uyku)', 'Toplam uyku': '62 saat (7 gece)' } },
    { in: { ihtiyac: '8', geceler: '5' }, out: { 'Toplam uyku borcu': '3 saat', 'İhtiyacın altında kalan gece': '1 / 1', 'Günde 1 saat ek uykuyla telafi süresi': '3 gün' } },
    { in: { ihtiyac: '9', geceler: '7 7,5 8 6 7 10 9,5' }, out: { 'Toplam uyku borcu': '8 saat', 'Gecelik ortalama uyku': '7 saat 51 dakika', 'Toplam uyku': '55 saat (7 gece)', 'İhtiyacın altında kalan gece': '5 / 7' } },
    { in: { ihtiyac: '8', geceler: '4 4 12 12' }, out: { 'Toplam uyku borcu': 'Uyku borcunuz yok', 'İhtiyacın altında kalan gece': '2 / 4' } },
    { in: { ihtiyac: '8', geceler: '' }, error: true },
    { in: { ihtiyac: '8', geceler: '6 7 25' }, error: true },
    { in: { ihtiyac: '0', geceler: '6 7 8' }, error: true },
    { in: { ihtiyac: '8', geceler: '6 yedi 8' }, error: true },
  ],
  howto: [
    '"Gecelik uyku ihtiyacı" alanına kendinizi dinlenmiş hissetmek için gereken süreyi yazın; emin değilseniz 8 saat olarak bırakın.',
    'İkinci alana son gecelerde kaç saat uyuduğunuzu, her gece için bir sayı olacak şekilde boşlukla ayırarak yazın. Bir hafta için yedi sayı girin; 6 saat 30 dakika için 6,5 yazın.',
    '"Hesapla" düğmesine basın. Toplam uyku borcunuz, gecelik ortalamanız ve kaç gecenin ihtiyacın altında kaldığı görünür.',
    'Borç varsa "telafi süresi" satırı, her gün bir saat fazla uyuyarak açığı kaç günde kapatabileceğinizi gösterir.',
  ],
  sections: [
    { h: 'Uyku borcu nedir?', p: [
      'Uyku borcu ya da uyku açığı, vücudunuzun gereksinim duyduğu uyku süresi ile gerçekte uyuduğunuz süre arasındaki farkın birikmiş toplamıdır. Sekiz saate ihtiyacı olan biri bir gece altı saat uyursa iki saatlik açık oluşur. Bu durum hafta boyunca sürerse açık her gece eklenir ve hafta sonuna gelindiğinde on saati aşabilir.',
      'Tek bir kısa gecenin etkisi çoğu zaman ertesi gün fark edilir ve bir iki iyi geceyle toparlanır. Sorun, az uykunun alışkanlık hâline gelmesidir. Süregen uyku açığında kişi yorgunluğa alışır ve kendini "idare ediyor" sanabilir; oysa dikkat, tepki süresi ve karar verme üzerinde yapılan ölçümler bu dönemde performansın düşmeye devam ettiğini gösterir.',
    ] },
    { h: 'Hesaplama nasıl yapılır?', p: [
      'Formül basittir: <strong>uyku borcu = (gecelik ihtiyaç × gece sayısı) − toplam uyunan süre</strong>. Araç net hesap yapar; yani ihtiyacınızdan fazla uyuduğunuz geceler, eksik uyuduğunuz geceleri dengeler. Sonuç sıfır ya da negatifse girdiğiniz dönem için borcunuz yoktur. Ayrıca gecelik ortalama uyku (toplam ÷ gece sayısı) ve ihtiyacın altında kalan gece sayısı gösterilir; böylece ortalamanız iyi görünse bile düzensizliği fark edebilirsiniz.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Gecelik ihtiyacı 8 saat olan bir kişi yedi gece boyunca sırasıyla 6, 7, 6,5, 8, 5, 9 ve 7 saat uyumuş olsun. Toplam uyku 48,5 saat, yani 48 saat 30 dakikadır. Yedi gecelik ihtiyaç 8 × 7 = 56 saattir. Borç 56 − 48,5 = 7,5 saat, yani <strong>7 saat 30 dakika</strong> eder.',
      'Gecelik ortalama 48,5 ÷ 7 ≈ 6,93 saat, yaklaşık 6 saat 56 dakikadır. Yedi gecenin beşinde ihtiyacın altında kalınmıştır; dokuz saat uyunan gece açığın bir saatini kapatmıştır. Her gün bir saat fazla uyunursa 7,5 saatlik borcun kapanması sekiz gün sürer.',
    ] },
    { h: 'Kaç saat uykuya ihtiyacım var?', p: [
      'Uyku ihtiyacı yaşa ve kişiye göre değişir. Uyku sağlığı alanındaki kuruluşların yaygın önerileri kabaca şöyledir:',
    ], ul: [
      '<strong>Okul çağı çocukları (6–13 yaş):</strong> 9–11 saat',
      '<strong>Ergenler (14–17 yaş):</strong> 8–10 saat',
      '<strong>Erişkinler (18–64 yaş):</strong> 7–9 saat',
      '<strong>65 yaş ve üzeri:</strong> 7–8 saat',
    ] },
    { h: 'Kendi ihtiyacınızı bulmak', p: [
      'Kendi ihtiyacınızı bulmanın pratik bir yolu, tatil gibi çalar saat kullanmadığınız bir dönemde, ilk birkaç günü saymadan, kendiliğinden kaç saat uyuduğunuza bakmaktır. Gündüz uyuklamadan ve kafeine yaslanmadan zinde kalabildiğiniz süre sizin ihtiyacınızdır. Araçtaki ihtiyaç alanına bu değeri yazın.',
    ] },
    { h: 'Uyku borcu nasıl kapatılır?', ul: [
      'Açığı tek bir uzun uykuyla kapatmaya çalışmayın. Hafta sonu öğlene kadar uyumak vücut saatini kaydırır ve pazar gecesi uykuya dalmayı zorlaştırır.',
      'Bunun yerine birkaç gün boyunca her gece 30–60 dakika erken yatın; kalkış saatinizi olabildiğince sabit tutun.',
      'Öğleden sonra erken saatte yapılan 20–30 dakikalık kısa bir şekerleme toparlanmaya yardımcı olabilir; geç saatte ya da uzun süren gündüz uykusu gece uykusunu bozabilir.',
      'Öğleden sonra kafeini azaltın, yatmadan önceki son saatte ekran ışığından ve ağır yemekten uzak durun.',
      'Yatak odasını serin, karanlık ve sessiz tutun; her gün aynı saatte yatıp kalkmak borcun yeniden birikmesini önlemenin en etkili yoludur.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu hesap yalnızca süreye bakar; uykunun kalitesini, gece uyanmalarını ya da uyku evrelerini ölçmez. Yatakta geçen süre ile gerçekten uyunan süre aynı değildir; mümkünse uyuduğunuzu düşündüğünüz süreyi girin. Uzun süre biriken borcun saat saat geri ödenmesi de gerekmez; düzenli ve yeterli uykuya dönüldüğünde vücut çoğu zaman daha kısa sürede toparlanır. Bu yüzden haftalar öncesinin açığını hesaba katmak yerine son bir iki haftaya bakmak daha anlamlıdır.',
      'Sonuçlar bilgilendirme amaçlıdır ve tıbbi değerlendirme yerine geçmez. Yeterince uyuduğunuz hâlde gündüz aşırı uykululuk, yüksek sesli horlama, uykuda nefes durması, haftalarca süren uykuya dalma güçlüğü ya da direksiyon başında uyuklama yaşıyorsanız bir hekime başvurun. Uykulu araç kullanmak ciddi kaza nedenidir; uyku borcunuz yüksekken uzun yola çıkmayın.',
    ] },
  ],
  faq: [
    ['Uyku borcu nasıl hesaplanır?', 'Gecelik uyku ihtiyacınız gece sayısıyla çarpılır ve bundan toplam uyuduğunuz süre çıkarılır. Örneğin 8 saat ihtiyacı olan biri beş gece 6\'şar saat uyursa 40 − 30 = 10 saat borç birikir.'],
    ['Hafta sonu çok uyuyarak uyku borcu kapatılır mı?', 'Bir bölümü kapatılabilir, ancak hafta içi biriken açığın tamamını iki günde gidermek zordur ve uzun hafta sonu uykuları vücut saatini bozar. Açığı birkaç güne yayarak, her gece biraz erken yatarak kapatmak daha sağlıklıdır.'],
    ['Erişkin bir insan günde kaç saat uyumalı?', 'Erişkinlerin çoğu için önerilen aralık 7–9 saattir. Kişisel ihtiyaç bu aralığın içinde ya da nadiren dışında olabilir; ölçüt gündüz kendinizi dinlenmiş hissetmenizdir.'],
    ['Uyku borcu ne kadar geriye dönük hesaplanmalı?', 'Son bir ya da iki hafta yeterlidir. Daha eski açıkları saat saat telafi etmek gerekmez; önemli olan bundan sonraki uyku düzeninizdir.'],
    ['Fazla uyuduğum geceler borçtan düşülüyor mu?', 'Evet. Araç net hesap yapar; ihtiyacınızdan fazla uyuduğunuz süre, eksik gecelerin açığından düşülür. Kaç gecenin ihtiyacın altında kaldığı ayrı bir satırda gösterilir.'],
    ['Gündüz şekerlemesini hesaba katmalı mıyım?', 'Katabilirsiniz; o günün gece uykusuna ekleyip toplamı yazın. Yine de kısa şekerlemeler gece uykusunun yerini tam olarak tutmaz.'],
    ['Uyku borcunun belirtileri nelerdir?', 'Gündüz uyuklama, dikkat dağınıklığı, unutkanlık, sinirlilik, kafeine artan gereksinim ve hafta sonları normalden çok daha uzun uyuma sık görülen işaretlerdir.'],
    ['Yazdığım uyku süreleri kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz süreler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['uyku-hesapla', 'saat-hesapla', 'kafein-hesapla', 'ortalama-hesapla', 'online-alarm'],
};
