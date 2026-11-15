export default {
  slug: 'kitaplik-kapasite-hesapla',
  title: 'Kitaplık Kapasitesi Hesaplama',
  h1Tail: 'kitaplığa kaç kitap sığar?',
  pageTitle: 'Kitaplık Kapasitesi Hesaplama – Rafa Kaç Kitap Sığar?',
  description: 'Raf genişliği, raf sayısı ve ortalama kitap kalınlığından kitaplığınıza kaç kitap sığacağını, kitaplarınız için kaç raf gerektiğini hesaplayın.',
  card: 'Raf genişliğini ve raf sayısını girin; kitaplığın kaç kitap aldığını ve kitaplarınız için kaç raf gerektiğini görün.',
  category: 'gunluk',
  keywords: ['kitaplık kapasitesi hesaplama', 'rafa kaç kitap sığar', 'kitaplık kaç kitap alır', 'kaç raf gerekir', 'kitaplık ölçüsü hesaplama', 'ortalama kitap kalınlığı', 'kitaplık planlama'],
  lead: 'Yeni bir kitaplık alırken ya da mevcut kitaplarınızı yerleştirirken asıl soru şudur: <strong>bu raflara kaç kitap sığar?</strong> Raf genişliğini, raf sayısını ve kitaplarınızın ortalama sırt kalınlığını girin; araç toplam kapasiteyi, raf başına kitap sayısını ve elinizdeki kitaplar için gereken raf adedini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'rafGenislik', label: 'Raf iç genişliği (cm)', type: 'number', placeholder: 'Örn. 80', hint: 'İki yan panel arasındaki kullanılabilir genişlik' },
    { id: 'rafSayisi', label: 'Raf sayısı', type: 'number', placeholder: 'Örn. 5' },
    { id: 'kalinlik', label: 'Ortalama kitap kalınlığı (cm)', type: 'number', value: '2,5', hint: 'Roman için 2–3, çocuk kitabı için 1, ansiklopedi için 4–6' },
    { id: 'doluluk', label: 'Rafın doldurulacak kısmı (%)', type: 'number', value: '90', hint: 'Kitabı rahat çekmek ve yeni kitaplara yer bırakmak için' },
    { id: 'kitapAdet', label: 'Elinizdeki kitap sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 200' },
  ],
  compute(v, h) {
    const gen = h.pos(v.rafGenislik, 'Raf iç genişliği');
    const raf = h.posint(v.rafSayisi, 'Raf sayısı');
    const kal = h.pos(v.kalinlik, 'Ortalama kitap kalınlığı');
    const dol = h.pos(v.doluluk === '' ? '100' : v.doluluk, 'Rafın doldurulacak kısmı');
    if (dol > 100) h.err('"Rafın doldurulacak kısmı" 1 ile 100 arasında olmalı.');
    const kullan = gen * dol / 100;
    const rafBasi = Math.floor(kullan / kal + 1e-9);
    if (rafBasi < 1) h.err('Bu genişlikte bir rafa tek bir kitap bile sığmıyor; raf genişliğini ve kitap kalınlığını santimetre olarak yazdığınızdan emin olun.');
    const toplam = rafBasi * raf;
    const rows = [
      ['Toplam kitap kapasitesi', `${h.fmt(toplam, 0)} kitap`],
      ['Raf başına kitap', `${h.fmt(rafBasi, 0)} kitap`],
      ['Toplam raf uzunluğu', `${h.fmt(gen * raf / 100, 2)} m`],
      ['Kitap dizilecek uzunluk', `${h.fmt(kullan * raf / 100, 2)} m`],
    ];
    if (String(v.kitapAdet || '').trim() !== '') {
      const adet = h.posint(v.kitapAdet, 'Elinizdeki kitap sayısı');
      rows.push(['Kitaplarınız için gereken raf', `${h.fmt(Math.ceil(adet / rafBasi - 1e-9), 0)} raf`]);
      let durum;
      if (adet < toplam) durum = `Sığıyor; ${h.fmt(toplam - adet, 0)} kitaplık yer kalıyor`;
      else if (adet === toplam) durum = 'Tam sığıyor; boş yer kalmıyor';
      else durum = `Sığmıyor; ${h.fmt(adet - toplam, 0)} kitap açıkta kalıyor`;
      rows.push(['Durum', durum]);
    }
    return {
      rows,
      note: 'Kitapların dik ve tek sıra dizildiği varsayılır. Gerçek kapasite kitaplarınızın kalınlık dağılımına göre değişir; raf yüksekliği ve derinliği ile rafın taşıyabileceği ağırlık bu hesapta kontrol edilmez.',
    };
  },
  cases: [
    { in: { rafGenislik: '80', rafSayisi: '5', kalinlik: '2,5', doluluk: '100' }, out: { 'Toplam kitap kapasitesi': '160 kitap', 'Raf başına kitap': '32 kitap', 'Toplam raf uzunluğu': '4 m' } },
    { in: { rafGenislik: '80', rafSayisi: '5', kalinlik: '2,5', doluluk: '90', kitapAdet: '200' }, out: { 'Toplam kitap kapasitesi': '140 kitap', 'Raf başına kitap': '28 kitap', 'Kitap dizilecek uzunluk': '3,6 m', 'Kitaplarınız için gereken raf': '8 raf', 'Durum': 'Sığmıyor; 60 kitap açıkta kalıyor' } },
    { in: { rafGenislik: '60', rafSayisi: '4', kalinlik: '3', doluluk: '100', kitapAdet: '50' }, out: { 'Toplam kitap kapasitesi': '80 kitap', 'Raf başına kitap': '20 kitap', 'Kitaplarınız için gereken raf': '3 raf', 'Durum': 'Sığıyor; 30 kitaplık yer kalıyor' } },
    { in: { rafGenislik: '100', rafSayisi: '6', kalinlik: '1,5', doluluk: '95' }, out: { 'Toplam kitap kapasitesi': '378 kitap', 'Raf başına kitap': '63 kitap', 'Toplam raf uzunluğu': '6 m' } },
    { in: { rafGenislik: '75', rafSayisi: '3', kalinlik: '4', doluluk: '100' }, out: { 'Toplam kitap kapasitesi': '54 kitap', 'Raf başına kitap': '18 kitap', 'Toplam raf uzunluğu': '2,25 m' } },
    { in: { rafGenislik: '80', rafSayisi: '5', kalinlik: '2,5', doluluk: '100', kitapAdet: '160' }, out: { 'Kitaplarınız için gereken raf': '5 raf', 'Durum': 'Tam sığıyor; boş yer kalmıyor' } },
    { in: { rafGenislik: '0', rafSayisi: '5' }, error: true },
    { in: { rafGenislik: '2', rafSayisi: '5', kalinlik: '3', doluluk: '100' }, error: true },
    { in: { rafGenislik: '80', rafSayisi: '5', kalinlik: '2,5', doluluk: '120' }, error: true },
  ],
  howto: [
    'Rafın iç genişliğini, yani iki yan panel arasında kitap dizilebilecek mesafeyi santimetre olarak ölçüp yazın.',
    'Kitaplıktaki raf sayısını girin. Raflar farklı genişlikteyse her genişlik için hesabı ayrı ayrı yapın.',
    'Ortalama kitap kalınlığını belirleyin. En sağlıklı yöntem, dizili 20 kitabın kapladığı uzunluğu ölçüp 20\'ye bölmektir.',
    'Rafın yüzde kaçını dolduracağınızı seçin; elinizdeki kitap sayısını biliyorsanız isteğe bağlı alana ekleyin.',
    '"Hesapla" düğmesine basın ve kapasite ile durum satırlarını inceleyin.',
  ],
  sections: [
    { h: 'Kapasite nasıl hesaplanır?', p: [
      'Dik dizilen kitaplar rafta sırt kalınlıkları kadar yer tutar. Bu nedenle bir rafa sığan kitap sayısı <strong>raf başına kitap = (raf genişliği × doluluk ÷ 100) ÷ ortalama kitap kalınlığı</strong> formülüyle bulunur ve aşağı yuvarlanır; yarım kitap rafa sığmaz. Toplam kapasite bu sayının raf adediyle çarpımıdır.',
      'Elinizdeki kitap sayısını yazdığınızda araç tersini de hesaplar: <strong>gereken raf = kitap sayısı ÷ raf başına kitap</strong>, yukarı yuvarlanır. Böylece kitaplık almadan önce kaç raflı bir modele ihtiyacınız olduğunu görürsünüz.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İç genişliği 80 cm olan 5 raflı bir kitaplık ve ortalama 2,5 cm kalınlığında kitaplar düşünelim. Raflar tamamen doldurulursa raf başına 80 ÷ 2,5 = 32 kitap, toplam 32 × 5 = <strong>160 kitap</strong> sığar.',
      'Rafların yüzde 90\'ını doldurmak isterseniz kullanılabilir genişlik 72 cm\'ye iner. 72 ÷ 2,5 = 28,8 olduğundan raf başına 28 kitap, toplam <strong>140 kitap</strong> yerleşir. 200 kitabınız varsa 200 ÷ 28 = 7,14, yani 8 raf gerekir; bu kitaplıkta 60 kitap açıkta kalır. Çözüm, ikinci bir kitaplık almak ya da daha geniş raflı bir model seçmektir.',
    ] },
    { h: 'Ortalama kitap kalınlığı için başvuru değerleri', p: [
      'Kitap kalınlığı sayfa sayısına, kâğıt cinsine ve cilt türüne göre değişir. Aşağıdaki değerler yaklaşık olup kendi ölçümünüzün yerini tutmaz:',
    ], ul: [
      '<strong>İnce çocuk kitabı, şiir kitabı:</strong> 0,5–1 cm',
      '<strong>200 sayfa civarı karton kapaklı roman:</strong> 1,5–2 cm',
      '<strong>350–450 sayfalık roman:</strong> 2,5–3,5 cm',
      '<strong>Ciltli roman ve ders kitabı:</strong> 3–4 cm',
      '<strong>Ansiklopedi cildi, sözlük, büyük boy başvuru kitabı:</strong> 4–6 cm',
      '<strong>Dergi:</strong> 0,3–0,8 cm',
    ] },
    { h: 'Raf yüksekliği ve derinliği', p: [
      'Bu araç yalnızca genişlik yönünde hesap yapar; kitabın rafa girip girmeyeceğini yükseklik ve derinlik belirler. Türkiye\'de yaygın roman boyutu yaklaşık 13,5×21 cm\'dir; bu kitaplar için 23–25 cm raf aralığı yeterli olur. A4 boyutundaki dergi ve dosyalar 29,7 cm yüksekliğindedir ve en az 32 cm aralık ister. Sanat ve fotoğraf kitapları daha da büyük olabilir; en büyük kitabınızı ölçüp bir iki santimetre parmak payı ekleyin.',
      'Derinlik için karton kapaklı romanlarda 15–20 cm, ders kitabı ve dosyalarda 25–30 cm yeterlidir. Derin raflara kitapları çift sıra dizmek kapasiteyi iki katına çıkarır ama arka sıradaki kitaplara erişimi zorlaştırır.',
    ] },
    { h: 'Ağırlık ve raf sarkması', p: [
      'Kitap ağır bir yüktür. Dolu bir rafın bir metresi, kitap türüne göre kabaca 20–30 kilogram gelebilir; büyük boy ciltli kitaplarda daha da fazlası görülür. Bu yüzden uzun ve ince raflar zamanla ortadan sarkar. Sunta ya da MDF raflarda 80 cm\'yi aşan açıklıklarda orta destek ya da daha kalın raf tercih etmek, ağır kitapları alt raflara yerleştirmek ve yüksek kitaplıkları devrilmeye karşı duvara sabitlemek iyi uygulamalardır.',
      'Üreticiler genellikle raf başına taşıma kapasitesini kilogram olarak belirtir. Kitaplığı tam kapasite doldurmadan önce bu değeri kontrol edin. Duvara asılan raflarda taşıma gücü, rafın kendisinden çok dübel ve duvar malzemesine bağlıdır; bu konuda emin değilseniz bir ustaya danışın.',
    ] },
    { h: 'Yerleştirme ipuçları ve sınırlar', ul: [
      'Raflarda yüzde 10 kadar boşluk bırakmak, kitabı sırtından zorlamadan çekmenizi ve yeni kitaplara yer açmanızı sağlar.',
      'Kitapları yatay istiflemek kısa vadede yer kazandırır ama alttaki kitaplara erişimi zorlaştırır ve ciltleri yorar.',
      'Kitap desteği kullanmak, yarı dolu raflarda kitapların eğilip sırtlarının bozulmasını önler.',
      'Sonuç ortalama kalınlığa dayandığı için gerçek sayı birkaç kitap sapabilir; farklı türleri ayrı raflara dizecekseniz her tür için ayrı hesap yapın.',
    ] },
  ],
  faq: [
    ['80 cm\'lik bir rafa kaç kitap sığar?', 'Ortalama 2,5 cm kalınlığındaki kitaplardan 32 tane sığar. Kitaplar ortalama 3 cm ise 26, 2 cm ise 40 kitap yerleşir.'],
    ['Ortalama kitap kalınlığını nasıl bulurum?', 'Rafınızda yan yana duran 20 kitabın toplam genişliğini cetvelle ölçün ve 20\'ye bölün. Örneğin 20 kitap 54 cm tutuyorsa ortalama kalınlık 2,7 cm\'dir.'],
    ['500 kitap için kaç metre raf gerekir?', 'Ortalama 2,5 cm kalınlıkla 500 × 2,5 = 1.250 cm, yani 12,5 metre raf gerekir. Yüzde 10 boşluk bırakmak isterseniz yaklaşık 14 metre planlayın.'],
    ['Neden rafın tamamını doldurmamalıyım?', 'Sıkışık dizilen kitapları çekmek zorlaşır ve sırtları zarar görür. Ayrıca kitaplıklar zamanla dolar; baştan bir miktar boş yer bırakmak yeniden düzenleme ihtiyacını erteler.'],
    ['Raflarım farklı genişlikte, nasıl hesaplarım?', 'Her genişlik için aracı ayrı çalıştırıp sonuçları toplayın. Örneğin üç adet 80 cm ve iki adet 40 cm raf için iki ayrı hesap yapın.'],
    ['Çift sıra dizersem kapasite iki katına çıkar mı?', 'Raf derinliği iki kitap sırasını alıyorsa evet, yaklaşık iki katına çıkar. Ancak rafa binen ağırlık da iki katına çıkar ve arka sıra görünmez olur; raf taşıma kapasitesini kontrol edin.'],
    ['Bu hesap dergi, plak ya da dosya için kullanılabilir mi?', 'Evet. Kalınlık alanına dizeceğiniz nesnenin ortalama kalınlığını yazmanız yeterlidir; örneğin klasörler için 7–8 cm girebilirsiniz.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ev-tasima-koli-hesapla', 'hacim-hesapla', 'alan-cevre-hesapla', 'cm-inc-cevir', 'duvar-resim-hizalama-hesapla'],
};
