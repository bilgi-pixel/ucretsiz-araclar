export default {
  slug: 'yas-farki-hesapla',
  title: 'Yaş Farkı Hesaplama',
  h1Tail: 'yıl, ay ve gün olarak',
  pageTitle: 'Yaş Farkı Hesaplama – İki Doğum Tarihi Arasındaki Fark (Yıl Ay Gün)',
  description: 'İki kişinin doğum tarihini girin; aradaki yaş farkını yıl, ay ve gün olarak, toplam gün, hafta ve ay sayısıyla birlikte görün. Kimin büyük olduğunu da söyler.',
  card: 'İki doğum tarihi arasındaki yaş farkını yıl, ay, gün ve toplam gün olarak hesaplayın; kimin büyük olduğunu görün.',
  category: 'zaman',
  keywords: ['yaş farkı hesaplama', 'iki kişi arasındaki yaş farkı', 'kardeş yaş farkı', 'aramızda kaç yaş var', 'doğum tarihi farkı', 'yaş farkı kaç gün', 'eşler arası yaş farkı'],
  lead: 'İki doğum tarihini yazın; aradaki yaş farkını tam olarak <strong>yıl, ay ve gün</strong> cinsinden öğrenin. Araç ayrıca farkı toplam gün, hafta ve ay olarak verir ve hangi kişinin daha büyük olduğunu belirtir.',
  button: 'Hesapla',
  inputs: [
    { id: 'dogum1', label: '1. kişinin doğum tarihi', type: 'date' },
    { id: 'dogum2', label: '2. kişinin doğum tarihi', type: 'date' },
  ],
  compute(v, h) {
    const d1 = h.date(v.dogum1, '1. kişinin doğum tarihi');
    const d2 = h.date(v.dogum2, '2. kişinin doğum tarihi');
    const ayni = d1.getTime() === d2.getTime();
    const a = d1.getTime() <= d2.getTime() ? d1 : d2; // büyük olan (önce doğan)
    const b = a === d1 ? d2 : d1;
    // Ay ekleme: hedef ayda o gün yoksa ayın son günü alınır
    const ekle = (d, n) => {
      const t = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
      const y = Math.floor(t / 12), m = t % 12;
      return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), new Date(Date.UTC(y, m + 1, 0)).getUTCDate())));
    };
    let n = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
    if (ekle(a, n).getTime() > b.getTime()) n--;
    const yil = Math.floor(n / 12), ay = n % 12, gun = h.gunFarki(ekle(a, n), b);
    const parca = [];
    if (yil) parca.push(yil + ' yıl');
    if (ay) parca.push(ay + ' ay');
    if (gun) parca.push(gun + ' gün');
    const toplam = h.gunFarki(a, b);
    const hafta = Math.floor(toplam / 7), artan = toplam % 7;
    return {
      rows: [
        ['Yaş farkı', ayni ? 'Yok (aynı gün doğmuşlar)' : parca.join(' ')],
        ['Büyük olan', ayni ? 'Yaşıtlar' : (a === d1 ? '1. kişi' : '2. kişi')],
        ['Toplam gün', h.fmt(toplam, 0) + ' gün'],
        ['Toplam hafta', h.fmt(hafta, 0) + ' hafta' + (artan ? ' ' + artan + ' gün' : '')],
        ['Toplam tam ay', h.fmt(yil * 12 + ay, 0) + ' ay'],
        ['Ondalık yıl olarak', h.fmt(toplam / 365.2425, 2) + ' yıl'],
      ],
      note: 'Fark, doğum saatleri dikkate alınmadan tam günler üzerinden hesaplanır. Ondalık yıl değeri ortalama 365,2425 günlük yıl ile bulunur.',
    };
  },
  cases: [
    { in: { dogum1: '1988-03-15', dogum2: '1992-11-03' }, out: { 'Yaş farkı': '4 yıl 7 ay 19 gün', 'Büyük olan': '1. kişi', 'Toplam gün': '1.694 gün', 'Toplam hafta': '242 hafta', 'Toplam tam ay': '55 ay', 'Ondalık yıl olarak': '4,64 yıl' } },
    { in: { dogum1: '2015-08-20', dogum2: '1985-08-20' }, out: { 'Yaş farkı': '30 yıl', 'Büyük olan': '2. kişi', 'Toplam gün': '10.957 gün', 'Toplam hafta': '1.565 hafta 2 gün', 'Toplam tam ay': '360 ay' } },
    { in: { dogum1: '1999-12-31', dogum2: '2000-01-01' }, out: { 'Yaş farkı': '1 gün', 'Büyük olan': '1. kişi', 'Toplam gün': '1 gün', 'Toplam tam ay': '0 ay' } },
    { in: { dogum1: '1988-02-29', dogum2: '1990-03-01' }, out: { 'Yaş farkı': '2 yıl 1 gün', 'Toplam gün': '731 gün' } },
    { in: { dogum1: '1995-03-10', dogum2: '1990-05-25' }, out: { 'Yaş farkı': '4 yıl 9 ay 13 gün', 'Büyük olan': '2. kişi', 'Toplam gün': '1.750 gün', 'Toplam hafta': '250 hafta', 'Ondalık yıl olarak': '4,79 yıl' } },
    { in: { dogum1: '2001-07-07', dogum2: '2001-07-07' }, out: { 'Yaş farkı': 'Yok (aynı gün doğmuşlar)', 'Büyük olan': 'Yaşıtlar', 'Toplam gün': '0 gün' } },
    { in: { dogum1: '1990-02-30', dogum2: '1995-01-01' }, error: true },
    { in: { dogum1: '1990-01-01', dogum2: '' }, error: true },
  ],
  howto: [
    'İlk alana birinci kişinin, ikinci alana ikinci kişinin doğum tarihini girin. Sıra önemli değildir; büyük olanı araç kendisi bulur.',
    '"Hesapla" düğmesine basın. İlk satırda yaş farkı yıl, ay ve gün olarak yazılır.',
    '"Büyük olan" satırından hangi kişinin daha önce doğduğunu görün; tarihler aynıysa "Yaşıtlar" yazar.',
    'Farkı tek bir birimle ifade etmeniz gerekiyorsa toplam gün, hafta, ay ya da ondalık yıl satırlarını kullanın.',
  ],
  sections: [
    { h: 'Yaş farkı nasıl hesaplanır?', p: [
      'İki kişi arasındaki yaş farkı, doğum tarihleri arasındaki takvim süresidir ve zaman geçtikçe değişmez: bugün aranızda dört yıl yedi ay varsa, kırk yıl sonra da aynı fark olacaktır. Bu yüzden hesap için bugünün tarihine gerek yoktur; iki doğum tarihi yeterlidir.',
      'Hesap, önce doğan kişinin tarihinden sonra doğanın tarihine doğru yapılır. Önce doğanın tarihine, diğer tarihi aşmayacak şekilde eklenebilecek en fazla tam ay sayısı bulunur; bu sayı 12\'ye bölünerek yıl ve ay kısmı elde edilir. Ardından ulaşılan günden ikinci doğum tarihine kadar kalan günler sayılır. Ay eklerken hedef ayda aynı gün yoksa (örneğin 31\'i olmayan bir ay ya da artık olmayan yılda 29 Şubat) o ayın son günü alınır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Birinci kişi 15 Mart 1988, ikinci kişi 3 Kasım 1992 doğumlu olsun. 15 Mart 1988\'e 55 ay eklendiğinde 15 Ekim 1992\'ye ulaşılır; 56 ay eklenseydi 15 Kasım 1992 olur ve ikinci tarihi aşardı. Demek ki tam ay sayısı 55\'tir: 55 ÷ 12 = 4 yıl, kalan 7 ay. 15 Ekim\'den 3 Kasım\'a ise ekimin kalan 16 günü ile kasımın 3 günü, toplam 19 gün vardır. Sonuç <strong>4 yıl 7 ay 19 gün</strong> olur ve büyük olan birinci kişidir.',
      'Sağlamasını şöyle yapabilirsiniz: 15 Mart 1988\'e 4 yıl eklerseniz 15 Mart 1992, 7 ay eklerseniz 15 Ekim 1992, 19 gün eklerseniz 3 Kasım 1992 elde edilir. Aynı aralık gün olarak sayıldığında 1.694 gün, yani tam 242 hafta eder. Tam ay olarak 4 × 12 + 7 = 55 aydır; ondalık yıl karşılığı ise 1.694 ÷ 365,2425 ≈ 4,64 yıldır.',
    ] },
    { h: 'Neden "kaç yaş var?" sorusunun tek cevabı yok?', p: [
      'Gündelik konuşmada yaş farkı çoğu zaman doğum yıllarının farkı olarak söylenir: 1988 ve 1992 doğumlular için "dört yaş" denir. Oysa gerçek fark dört yıldan birkaç gün fazla da olabilir, beş yıla çok yakın da. Aralık 1988 ile Ocak 1992 doğumlu iki kişi arasında yalnızca üç yıl bir ay varken, Ocak 1988 ile Aralık 1992 doğumlular arasında beş yıla yakın fark bulunur; yıl farkı ikisinde de dörttür.',
      'Bu yüzden yıl içinde bir dönem iki kişinin yaşları arasındaki fark bir fazla ya da bir eksik görünür. Dört yıl yedi ay farkı olan iki kişinin yaşları, yılın yaklaşık yedi ayı boyunca beş, kalan beş ayı boyunca dört fark gösterir. Araç bu belirsizliği ortadan kaldırmak için tam süreyi verir.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Kardeşler:</strong> çocuklar arasındaki farkı ay düzeyinde bilmek, okul başlangıcı ve kıyafet-eşya devri gibi planlarda işe yarar.',
      '<strong>Çiftler:</strong> eşler ya da sevgililer arasındaki farkın tam karşılığını merak edenler için.',
      '<strong>Sınıf arkadaşları:</strong> aynı sınıftaki en büyük ve en küçük öğrenci arasında bir yıla yakın fark olabilir; okul öncesi ve ilkokul yıllarında bu fark gelişim açısından belirgindir.',
      '<strong>Spor ve yaş grupları:</strong> altyapı takımlarında kesim tarihine göre aynı kategorideki sporcular arasındaki ay farkını görmek için.',
      '<strong>Soy ağacı çalışmaları:</strong> nüfus kayıtlarındaki kişiler arasındaki kuşak aralığını hesaplamak için.',
    ] },
    { h: 'Toplam gün, hafta ve ay satırları', p: [
      '<strong>Toplam gün</strong>, iki tarih arasındaki takvim günlerinin sayısıdır ve aradaki artık yılların 29 Şubat günlerini içerir. <strong>Toplam hafta</strong> bu sayının yediye bölünmesiyle bulunur; artan günler ayrıca yazılır. <strong>Toplam tam ay</strong>, yıl ve ay kısmının aya çevrilmiş hâlidir; artan günler bu satıra dahil edilmez.',
      '<strong>Ondalık yıl</strong> satırı, farkı tek bir sayıyla ifade etmek isteyenler içindir. Toplam gün, Miladi takvimin ortalama yıl uzunluğu olan 365,2425 güne bölünür. Bu yaklaşık bir değerdir; tam 30 yıllık bir farkta bile artık yıl sayısına bağlı olarak 29,99 ya da 30,01 gibi küçük sapmalar görülebilir, araç bunu iki ondalığa yuvarlar.',
    ] },
    { h: 'Özel durumlar ve sınırlar', p: [
      '29 Şubat doğumlular için hesap diğer günlerle aynı kuralla yapılır. Örneğin 29 Şubat 1988 ile 1 Mart 1990 arasında 2 yıl 1 gün vardır; çünkü 29 Şubat 1988\'e iki yıl eklendiğinde 1990 artık yıl olmadığından 28 Şubat 1990 alınır ve 1 Mart bunun bir gün sonrasıdır.',
      'Araç doğum saatini dikkate almaz. İkizlerde ya da aynı gün doğmuş kişilerde fark "yok" olarak gösterilir; saat farkı bu hesabın dışındadır. Resmî işlemlerde nüfus kaydındaki tarih esas alındığından, kayıt tarihi ile gerçek doğum tarihi farklıysa hangisini kullandığınıza dikkat edin. Takvimde bulunmayan bir tarih (örneğin 30 Şubat) yazılırsa hata iletisi gösterilir.',
    ] },
  ],
  faq: [
    ['Yaş farkı zamanla değişir mi?', 'Hayır. İki doğum tarihi arasındaki süre sabittir. Yalnızca yıl içinde kimin doğum gününün geçtiğine bağlı olarak "yaş" sayılarının farkı bir artıp bir azalıyormuş gibi görünür.'],
    ['Tarihleri hangi sırayla girmeliyim?', 'Sıra fark etmez. Araç önce doğanı kendisi belirler ve "Büyük olan" satırında 1. kişi ya da 2. kişi olarak gösterir.'],
    ['Yaş farkını yalnızca yıl olarak nasıl söylerim?', 'İlk satırdaki tam yıl sayısını kullanabilirsiniz. Ay kısmı altı ya da daha fazlaysa gündelik dilde bir üst yıla yuvarlamak yaygındır; daha kesin ifade için "Ondalık yıl olarak" satırına bakın.'],
    ['Toplam ay satırı neden günleri içermiyor?', 'Aylar 28 ile 31 gün arasında değiştiği için artan günleri aya çevirmenin tek bir doğru yolu yoktur. Bu yüzden satır yalnızca tamamlanmış ayları gösterir; artan günler ilk satırda yer alır.'],
    ['Aynı yıl doğmuş iki kişi arasında ne kadar fark olabilir?', 'En fazla 364 gün (artık yılda 365 gün). 1 Ocak ve 31 Aralık doğumlu iki kişi aynı yıl doğmuş sayılır, ama aralarında neredeyse bir yıl vardır.'],
    ['İkiden fazla kişi için kullanabilir miyim?', 'Araç her seferinde iki tarihi karşılaştırır. Üç kardeş için hesap yapacaksanız çiftleri sırayla girin: birinci ile ikinci, ikinci ile üçüncü gibi.'],
    ['Miladi takvim dışındaki tarihleri girebilir miyim?', 'Hayır, araç Miladi takvimle çalışır. Hicri ya da Rumi bir doğum tarihiniz varsa önce Miladi karşılığına çevirmeniz gerekir.'],
    ['Doğum tarihleri bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz doğum tarihleri sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kac-gundur-yasiyorum', 'dogum-gunu-geri-sayim', 'ay-farki-hesapla', 'hafta-farki-hesapla', 'yas-ay-gun-hesapla', 'kusak-hesapla'],
};
