export default {
  slug: 'harclik-plani-hesapla',
  title: 'Harçlık Planı Hesaplama',
  h1Tail: 'günlük, haftalık, aylık ve birikim',
  pageTitle: 'Harçlık Planı Hesaplama – Haftalık, Aylık Harçlık ve Birikim',
  description: 'Çocuğunuzun harçlığını günlük, haftalık ve aylık karşılıklarıyla görün; birikim oranı belirleyip hedeflenen bir alışverişe kaç haftada ulaşılacağını hesaplayın.',
  card: 'Harçlığı günlük, haftalık ve aylık tutarlara çevirin; birikim payını ve hedefe kaç haftada ulaşılacağını görün.',
  category: 'gunluk',
  keywords: ['harçlık hesaplama', 'haftalık harçlık ne kadar olmalı', 'çocuk harçlık planı', 'aylık harçlık hesabı', 'harçlık birikim hesaplama', 'öğrenci harçlığı planlama', 'günlük harçlık'],
  lead: 'Harçlık, çocuğun parayla tanıştığı ilk bütçedir. Bu araç, verdiğiniz ya da aldığınız harçlığı <strong>okul günü, hafta, ay ve yıl</strong> bazında gösterir; belirlediğiniz birikim oranına göre harcanabilir ve kenara ayrılacak kısmı ayırır, bir hedef tutarı yazarsanız <strong>kaç haftada</strong> ulaşılacağını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'tutar', label: 'Harçlık tutarı (TL)', type: 'number', placeholder: 'Örn. 500' },
    { id: 'periyot', label: 'Harçlık ne sıklıkla veriliyor?', type: 'select', options: [['hafta', 'Haftalık'], ['gun', 'Okul günü başına (günlük)'], ['ay', 'Aylık']] },
    { id: 'okulGunu', label: 'Haftadaki okul günü', type: 'number', value: '5', hint: 'Günlük karşılığı hesaplamak için; 1–7 arası' },
    { id: 'birikim', label: 'Birikim oranı (%)', type: 'number', value: '20', hint: 'Harçlığın kumbaraya ayrılacak kısmı' },
    { id: 'hedef', label: 'Biriktirilecek hedef tutar (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 3000' },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Harçlık tutarı');
    const okulGunu = h.posint(v.okulGunu, 'Haftadaki okul günü');
    if (okulGunu > 7) h.err('"Haftadaki okul günü" 1 ile 7 arasında olmalı.');
    const oran = h.nonneg(v.birikim === '' ? '0' : v.birikim, 'Birikim oranı');
    if (oran > 100) h.err('"Birikim oranı" 0 ile 100 arasında olmalı.');
    let haftalik;
    if (v.periyot === 'gun') haftalik = tutar * okulGunu;
    else if (v.periyot === 'ay') haftalik = tutar * 12 / 52;
    else haftalik = tutar;
    const birikimHafta = haftalik * oran / 100;
    const rows = [
      ['Haftalık harçlık', h.para(haftalik)],
      ['Okul günü başına', h.para(haftalik / okulGunu)],
      ['Aylık ortalama', h.para(haftalik * 52 / 12)],
      ['Yıllık toplam', h.para(haftalik * 52)],
      ['Haftalık harcanabilir kısım', h.para(haftalik - birikimHafta)],
      ['Haftalık birikim', h.para(birikimHafta)],
      ['Bir yılda biriken', h.para(birikimHafta * 52)],
    ];
    if (String(v.hedef || '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef tutar');
      if (!(birikimHafta > 0)) h.err('Hedefe ulaşma süresini hesaplamak için "Birikim oranı" sıfırdan büyük olmalı.');
      const hafta = Math.ceil(hedef / birikimHafta - 1e-9);
      rows.push(['Hedefe ulaşma süresi', `${h.fmt(hafta, 0)} hafta (yaklaşık ${h.fmt(hafta * 12 / 52, 1)} ay)`]);
    }
    return {
      rows,
      note: 'Bir yıl 52 hafta, bir ay ortalama 52 ÷ 12 = 4,33 hafta kabul edilmiştir. Tatillerde harçlık verilmiyorsa yıllık toplam daha düşük olur.',
    };
  },
  cases: [
    { in: { tutar: '500', periyot: 'hafta', okulGunu: '5', birikim: '20', hedef: '3000' }, out: { 'Haftalık harçlık': '500,00 TL', 'Okul günü başına': '100,00 TL', 'Aylık ortalama': '2.166,67 TL', 'Yıllık toplam': '26.000,00 TL', 'Haftalık harcanabilir kısım': '400,00 TL', 'Haftalık birikim': '100,00 TL', 'Bir yılda biriken': '5.200,00 TL', 'Hedefe ulaşma süresi': '30 hafta (yaklaşık 6,9 ay)' } },
    { in: { tutar: '2000', periyot: 'ay', okulGunu: '5', birikim: '10' }, out: { 'Haftalık harçlık': '461,54 TL', 'Okul günü başına': '92,31 TL', 'Aylık ortalama': '2.000,00 TL', 'Yıllık toplam': '24.000,00 TL', 'Haftalık birikim': '46,15 TL' } },
    { in: { tutar: '50', periyot: 'gun', okulGunu: '5', birikim: '0' }, out: { 'Haftalık harçlık': '250,00 TL', 'Aylık ortalama': '1.083,33 TL', 'Yıllık toplam': '13.000,00 TL', 'Haftalık birikim': '0,00 TL' } },
    { in: { tutar: '150', periyot: 'hafta', okulGunu: '5', birikim: '50', hedef: '1000' }, out: { 'Haftalık birikim': '75,00 TL', 'Hedefe ulaşma süresi': '14 hafta (yaklaşık 3,2 ay)' } },
    { in: { tutar: '100', periyot: 'gun', okulGunu: '6', birikim: '25' }, out: { 'Haftalık harçlık': '600,00 TL', 'Haftalık harcanabilir kısım': '450,00 TL', 'Haftalık birikim': '150,00 TL' } },
    { in: { tutar: '500', periyot: 'hafta', okulGunu: '5', birikim: '0', hedef: '3000' }, error: true },
    { in: { tutar: '-100', periyot: 'hafta' }, error: true },
    { in: { tutar: '500', periyot: 'hafta', okulGunu: '9' }, error: true },
  ],
  howto: [
    '"Harçlık tutarı" alanına verilen miktarı yazın ve bunun haftalık mı, okul günü başına mı, aylık mı olduğunu seçin.',
    'Çocuğun haftada kaç gün okula gittiğini girin; günlük karşılık bu sayıya göre hesaplanır.',
    'Harçlığın yüzde kaçının biriktirileceğini belirleyin. Birikim istemiyorsanız 0 yazın.',
    'Bir bisiklet, oyun ya da kulaklık gibi bir hedef varsa fiyatını "hedef tutar" alanına ekleyin.',
    '"Hesapla" düğmesine basın ve sonuçları çocuğunuzla birlikte inceleyin.',
  ],
  sections: [
    { h: 'Hesaplama mantığı', p: [
      'Araç önce girdiğiniz tutarı haftalığa çevirir, çünkü harçlık planlamasında en kullanışlı birim haftadır. Okul günü başına verilen harçlık haftadaki okul günü sayısıyla çarpılır; aylık harçlık ise <strong>12 ÷ 52</strong> ile çarpılarak haftalığa indirgenir. Bir yılda 52 hafta ve 12 ay olduğundan bir ay ortalama 4,33 haftadır; "ay dört haftadır" kabulü yıllık toplamda dört haftalık bir eksik hesaba yol açar.',
      'Sonra birikim payı ayrılır: <strong>haftalık birikim = haftalık harçlık × birikim oranı ÷ 100</strong>. Kalan kısım harcanabilir paradır. Hedef tutar yazılmışsa <strong>hafta sayısı = hedef ÷ haftalık birikim</strong> işlemi yapılır ve sonuç bir üst tam haftaya yuvarlanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Haftada 500 TL harçlık alan, haftanın beş günü okula giden bir öğrenci yüzde 20 biriktirmeye karar versin. Okul günü başına 500 ÷ 5 = 100 TL düşer. Aylık ortalama 500 × 52 ÷ 12 = 2.166,67 TL, yıllık toplam 500 × 52 = 26.000 TL\'dir.',
      'Birikim payı 500 × 0,20 = <strong>100 TL</strong>, harcanabilir kısım 400 TL olur. 3.000 TL\'lik bir hedef için 3.000 ÷ 100 = <strong>30 hafta</strong>, yani yaklaşık 6,9 ay gerekir. Birikim oranı yüzde 30\'a çıkarılırsa haftalık birikim 150 TL\'ye yükselir ve süre 20 haftaya iner; bu tür karşılaştırmalar çocuğa "beklemek" ile "daha az harcamak" arasındaki ilişkiyi somut biçimde gösterir.',
    ] },
    { h: 'Harçlık tutarını belirlerken nelere bakılır?', p: [
      'Doğru harçlık tutarı diye tek bir rakam yoktur; ailenin bütçesine, çocuğun yaşına ve harçlığın neyi karşılayacağına bağlıdır. Tutarı belirlemeden önce şu soruları yanıtlamak işe yarar:',
    ], ul: [
      'Harçlık yalnızca kantin ve küçük keyfi harcamalar için mi, yoksa yol parası ve öğle yemeğini de kapsıyor mu?',
      'Kırtasiye, kıyafet ve telefon faturası gibi kalemler harçlıktan mı karşılanacak, aile mi ödeyecek?',
      'Çocuk okulda yemek yiyor mu, evden mi götürüyor? Kantinde bir öğünün yaklaşık maliyeti ne?',
      'Harçlık tatillerde de verilecek mi?',
      'Aynı evdeki kardeşler arasında yaşa göre nasıl bir fark gözetilecek?',
    ] },
    { h: 'Yaşa göre ödeme sıklığı', p: [
      'Küçük çocuklar için bir hafta bile uzun bir süredir; bu nedenle ilkokulun ilk yıllarında günlük ya da haftada iki kez verilen küçük tutarlar daha kolay yönetilir. Ortaokul çağında haftalık harçlık, parayı günlere bölmeyi öğretir. Lise ve üniversite öğrencilerinde aylık harçlık, gerçek hayattaki maaş düzenine en yakın uygulamadır ve ayın sonunu getirme becerisini geliştirir. Araçtaki üç sıklık seçeneği arasında geçiş yaparak aynı toplam bütçenin farklı düzenlerde ne kadara denk geldiğini görebilirsiniz; örneğin aylık 2.000 TL, haftalık 461,54 TL\'ye ve beş okul günü için günde 92,31 TL\'ye karşılık gelir.',
    ] },
    { h: 'Birikim alışkanlığı için öneriler', ul: [
      '<strong>Üç kavanoz yöntemi:</strong> Harçlığı harcama, birikim ve paylaşma olarak üçe bölmek küçük yaşlarda görsel ve anlaşılır bir düzendir.',
      '<strong>Somut hedef:</strong> "Para biriktir" yerine "30 haftada bisiklet" gibi tarihi ve tutarı belli bir hedef daha motive edicidir.',
      '<strong>Düzenli gün:</strong> Harçlığı her hafta aynı gün vermek, çocuğun plan yapmasını kolaylaştırır.',
      '<strong>Avans vermemek:</strong> Harçlık bittiğinde ek ödeme yapmak bütçe dersini boşa çıkarır; istisnaları önceden konuşun.',
      '<strong>Fiyat artışlarını gözden geçirmek:</strong> Kantin ve ulaşım fiyatları değiştikçe tutarı yılda bir iki kez yeniden değerlendirin.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Yıllık toplam, harçlığın 52 hafta boyunca kesintisiz verildiğini varsayar. Yaz tatilinde harçlık verilmiyorsa gerçek yıllık tutar daha düşük olur; bu durumda haftalık tutarı okulun açık olduğu hafta sayısıyla kendiniz çarpabilirsiniz. Hedefe ulaşma süresi, birikimin faizsiz bir kumbarada durduğunu ve hedef fiyatının değişmediğini kabul eder. Araç bir eğitim ve planlama yardımcısıdır; hangi tutarın uygun olduğuna dair bir tavsiye vermez.',
    ] },
  ],
  faq: [
    ['Haftalık 500 TL harçlık ayda ne kadar eder?', 'Ortalama 2.166,67 TL eder. Hesap 500 × 52 ÷ 12 işlemiyle yapılır. Dört ile çarpıp 2.000 TL bulmak, yılın dört haftasını hesaba katmadığı için eksik sonuç verir.'],
    ['Aylık harçlığı haftalığa nasıl çeviririm?', 'Aylık tutarı 12 ile çarpıp 52\'ye bölün. 2.000 TL aylık harçlık haftada 461,54 TL\'ye karşılık gelir.'],
    ['Birikim oranı yüzde kaç olmalı?', 'Bunun bir kuralı yoktur. Harçlık zaten temel ihtiyaçları (yol, yemek) karşılıyorsa yüzde 10–20 gerçekçidir; yalnızca keyfi harcamalar için veriliyorsa daha yüksek bir oran denenebilir. Önemli olan oranın çocuğun uygulayabileceği kadar makul olmasıdır.'],
    ['Hedefe ulaşma süresi neden yukarı yuvarlanıyor?', 'Çünkü birikim haftalık dilimlerle artar. 1.000 TL\'lik hedefe haftada 75 TL ile 13,33 haftada değil, 14. haftanın harçlığı alındığında ulaşılır.'],
    ['Okul günü sayısı neyi değiştirir?', 'Yalnızca "Okul günü başına" satırını ve günlük harçlık seçildiğinde haftalık toplamı etkiler. Cumartesi günü kurs ya da etüt varsa 6 yazabilirsiniz.'],
    ['Üniversite öğrencisi için de kullanılabilir mi?', 'Evet. Aileden gelen aylık tutarı ya da bursu "Aylık" seçeneğiyle girerek haftalık ve günlük harcama limitinizi ve birikim hedefinizi görebilirsiniz. Kira ve fatura gibi sabit giderleri düştükten sonra kalan tutarı yazmanız daha anlamlı bir sonuç verir.'],
    ['Tatil aylarını hesaptan nasıl çıkarırım?', 'Araç yılı 52 hafta alır. Harçlık yalnızca okul döneminde veriliyorsa, haftalık tutarı okulun açık olduğu hafta sayısıyla çarparak gerçek yıllık toplamı bulabilirsiniz.'],
    ['Girdiğim tutarlar kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; yazdığınız hiçbir bilgi sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['birikim-hesapla', 'kucuk-harcama-yillik-hesapla', 'abonelik-maliyeti-hesapla', 'yuzde-hesapla', 'calisma-saati-fiyat-hesapla'],
};
