export default {
  slug: 'dus-su-tuketimi-hesapla',
  title: 'Duş Su Tüketimi Hesaplama',
  h1Tail: 'litre, m³ ve enerji',
  pageTitle: "Duş Su Tüketimi Hesaplama – Bir Duşta Kaç Litre Su Harcanır?",
  description: "Duş süresi ve duş başlığı debisine göre bir duşta, ayda ve yılda kaç litre su harcadığınızı, suyu ısıtmak için gereken enerjiyi ve isteğe bağlı maliyeti hesaplayın.",
  card: "Duş sürenizi ve başlığın debisini girin; duş başına, aylık ve yıllık su tüketimini, ısıtma enerjisiyle birlikte görün.",
  category: 'gunluk',
  keywords: ['duş su tüketimi', 'bir duşta kaç litre su harcanır', '10 dakikalık duş kaç litre', 'duş başlığı debisi', 'duş su tasarrufu', 'aylık su tüketimi hesaplama', 'duş enerji tüketimi'],
  lead: "Duş, evdeki su tüketiminin en büyük kalemlerinden biridir. Duş sürenizi ve başlığın dakikada akıttığı su miktarını girin; araç <strong>duş başına, aylık ve yıllık</strong> tüketimi litre ve metreküp olarak, suyu ısıtmak için harcanan enerjiyle birlikte hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'sure', label: 'Duş süresi (dakika)', type: 'number', placeholder: 'Örn. 8' },
    { id: 'debi', label: 'Duş başlığı debisi (litre/dakika)', type: 'number', value: '10', hint: 'Bilmiyorsanız kovayla ölçün: 1 dakikada dolan litre.' },
    { id: 'gunluk', label: 'Kişi başı günlük duş sayısı', type: 'number', value: '1' },
    { id: 'kisi', label: 'Evdeki kişi sayısı', type: 'number', value: '1' },
    { id: 'fark', label: 'Suyun ısıtıldığı sıcaklık farkı (°C)', type: 'number', value: '25', hint: 'Duş sıcaklığı − şebeke suyu sıcaklığı.' },
    { id: 'fiyat', label: 'Su birim fiyatı (TL/m³, isteğe bağlı)', type: 'number', placeholder: 'Boş bırakılabilir' },
  ],
  compute(v, h) {
    const sure = h.pos(v.sure, 'Duş süresi');
    const debi = h.pos(v.debi === '' ? '10' : v.debi, 'Duş başlığı debisi');
    const gunluk = h.pos(v.gunluk === '' ? '1' : v.gunluk, 'Günlük duş sayısı');
    const kisi = h.posint(v.kisi === '' ? '1' : v.kisi, 'Kişi sayısı');
    const fark = h.nonneg(v.fark === '' ? '25' : v.fark, 'Sıcaklık farkı');
    if (sure > 600) h.err('Duş süresi en fazla 600 dakika olabilir.');
    if (debi > 100) h.err('Debi en fazla 100 litre/dakika olabilir.');
    if (fark > 90) h.err('Sıcaklık farkı en fazla 90 °C olabilir.');
    const dus = sure * debi;
    const gun = dus * gunluk * kisi;
    const ay = gun * 30, yil = gun * 365;
    const kwhDus = dus * fark * 1.163 / 1000;
    const rows = [
      ['Bir duşta', h.fmt(dus, 1) + ' litre'],
      ['Günlük', h.fmt(gun, 1) + ' litre'],
      ['Aylık (30 gün)', h.fmt(ay, 0) + ' litre (' + h.fmt(ay / 1000, 2) + ' m³)'],
      ['Yıllık (365 gün)', h.fmt(yil, 0) + ' litre (' + h.fmt(yil / 1000, 2) + ' m³)'],
      ['Isıtma enerjisi (duş başına)', h.fmt(kwhDus, 2) + ' kWh'],
      ['Isıtma enerjisi (aylık)', h.fmt(kwhDus * gunluk * kisi * 30, 1) + ' kWh'],
    ];
    if (String(v.fiyat || '').trim() !== '') {
      const f = h.pos(v.fiyat, 'Su birim fiyatı');
      rows.push(['Aylık su tutarı', h.para(ay / 1000 * f)]);
      rows.push(['Yıllık su tutarı', h.para(yil / 1000 * f)]);
    }
    return {
      rows,
      note: 'Isıtma enerjisi, suyun özgül ısısı (1 litre suyu 1 °C ısıtmak için 1,163 Wh) ile hesaplanan net ısıdır; kombi ya da şofbenin verim kaybı dahil değildir.',
    };
  },
  cases: [
    { in: { sure: '8', debi: '10', gunluk: '1', kisi: '1', fark: '25', fiyat: '' }, out: { 'Bir duşta': '80 litre', 'Günlük': '80 litre', 'Aylık (30 gün)': '2.400 litre (2,4 m³)', 'Yıllık (365 gün)': '29.200 litre (29,2 m³)', 'Isıtma enerjisi (duş başına)': '2,33 kWh' } },
    { in: { sure: '10', debi: '12', gunluk: '1', kisi: '4', fark: '25', fiyat: '' }, out: { 'Bir duşta': '120 litre', 'Günlük': '480 litre', 'Aylık (30 gün)': '14.400 litre (14,4 m³)', 'Isıtma enerjisi (duş başına)': '3,49 kWh' } },
    { in: { sure: '5', debi: '6', gunluk: '1', kisi: '1', fark: '25', fiyat: '' }, out: { 'Bir duşta': '30 litre', 'Aylık (30 gün)': '900 litre (0,9 m³)', 'Yıllık (365 gün)': '10.950 litre (10,95 m³)' } },
    { in: { sure: '10', debi: '10', gunluk: '1', kisi: '2', fark: '30', fiyat: '50' }, out: { 'Günlük': '200 litre', 'Aylık (30 gün)': '6.000 litre (6 m³)', 'Isıtma enerjisi (duş başına)': '3,49 kWh', 'Aylık su tutarı': '300,00 TL', 'Yıllık su tutarı': '3.650,00 TL' } },
    { in: { sure: '15', debi: '10', gunluk: '0,5', kisi: '1', fark: '0', fiyat: '' }, out: { 'Bir duşta': '150 litre', 'Günlük': '75 litre', 'Isıtma enerjisi (duş başına)': '0 kWh' } },
    { in: { sure: '7,5', debi: '8', gunluk: '2', kisi: '1', fark: '25', fiyat: '' }, out: { 'Bir duşta': '60 litre', 'Günlük': '120 litre', 'Aylık (30 gün)': '3.600 litre (3,6 m³)' } },
    { in: { sure: '0', debi: '10', gunluk: '1', kisi: '1', fark: '25', fiyat: '' }, error: true },
    { in: { sure: 'on', debi: '10', gunluk: '1', kisi: '1', fark: '25', fiyat: '' }, error: true },
    { in: { sure: '8', debi: '10', gunluk: '1', kisi: '1,5', fark: '25', fiyat: '' }, error: true },
  ],
  howto: [
    'Ortalama duş sürenizi dakika olarak yazın. Emin değilseniz bir kez telefonunuzun kronometresiyle ölçün; çoğu kişi süresini olduğundan kısa tahmin eder.',
    'Duş başlığınızın debisini girin. Bilmiyorsanız litre ölçüsü belli bir kovayı duşun altına tutup bir dakikada kaç litre dolduğuna bakın.',
    'Kişi başına günde kaç duş alındığını ve evde kaç kişinin duş aldığını belirtin; gün aşırı duş için 0,5 yazabilirsiniz.',
    'Şebeke suyu ile duş suyu arasındaki sıcaklık farkını girin; soğuk duş alıyorsanız 0 yazın.',
    'İsterseniz su faturanızdaki metreküp birim fiyatını ekleyin ve "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Duş su tüketimi nasıl hesaplanır?', p: [
      "Hesabın özü basittir: <strong>tüketim (litre) = süre (dakika) × debi (litre/dakika)</strong>. Debi, duş başlığından bir dakikada akan su miktarıdır. Günlük tüketim, bir duşun tüketimi ile günlük duş sayısının ve evdeki kişi sayısının çarpımıdır; aylık değer 30, yıllık değer 365 günle çarpılarak bulunur. Su faturaları metreküp üzerinden kesildiği için sonuçlar metreküpe de çevrilir: 1 m³ = 1.000 litre.",
      "Duş başlıklarının debisi geniş bir aralıkta değişir. Tasarruflu (hava karışımlı ya da debi sınırlayıcılı) başlıklar dakikada 6–8 litre civarında, standart başlıklar 10–12 litre civarında, geniş tepe duşları ise 15 litre ve üzerinde su akıtabilir. Şebeke basıncı ve bataryanın ne kadar açıldığı da gerçek debiyi etkiler; bu yüzden en doğru değer kendi ölçtüğünüz değerdir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Dakikada 10 litre su akıtan bir başlıkla 8 dakikalık duş alan bir kişi düşünelim. Bir duşta 8 × 10 = <strong>80 litre</strong> su harcanır. Her gün bir duşla aylık tüketim 80 × 30 = 2.400 litre, yani 2,4 m³; yıllık tüketim 80 × 365 = 29.200 litre, yani 29,2 m³ olur.",
      "Aynı kişi süreyi 5 dakikaya indirip dakikada 6 litre veren tasarruflu bir başlığa geçerse duş başına tüketim 30 litreye düşer; yıllık 10.950 litre eder. Aradaki fark yılda 18.250 litredir. Dört kişilik bir ailede aynı değişiklik yılda 73 metreküp su tasarrufu anlamına gelir.",
    ] },
    { h: 'Sıcak suyun enerji maliyeti', p: [
      "Duşta yalnızca su değil, o suyu ısıtmak için enerji de harcanır. Bir litre suyu bir santigrat derece ısıtmak için 1,163 watt-saat enerji gerekir. Buna göre <strong>enerji (kWh) = litre × sıcaklık farkı × 1,163 ÷ 1.000</strong>. Şebeke suyu 13 °C, duş suyu 38 °C ise fark 25 °C'dir ve 80 litrelik bir duş 80 × 25 × 1,163 ÷ 1.000 = 2,33 kWh net ısı ister.",
      "Bu değer suya geçen net enerjidir. Kombi, şofben ya da termosifon bu ısıyı yüzde yüz verimle üretmez; borulardaki ısı kaybı da buna eklenir. Dolayısıyla faturaya yansıyan enerji bir miktar daha yüksektir. Şebeke suyu kışın daha soğuk olduğundan aynı duş kışın daha fazla enerji tüketir; kış hesabı için sıcaklık farkını 30 °C dolayında girebilirsiniz.",
    ] },
    { h: 'Su tasarrufu için uygulanabilir adımlar', ul: [
      "<strong>Süreyi kısaltın:</strong> Her bir dakika, standart bir başlıkta yaklaşık 10 litre demektir. Günde iki dakika kısaltmak yılda 7 metreküpten fazla su kazandırır.",
      "<strong>Sabunlanırken suyu kapatın:</strong> Islan – kapat – sabunlan – durulan yöntemi akış süresini yarıya yakın azaltabilir.",
      "<strong>Tasarruflu başlık takın:</strong> Debi sınırlayıcı ya da hava karışımlı başlıklar konforu fazla düşürmeden dakikadaki litreyi azaltır.",
      "<strong>Sıcak su gelene kadar akan suyu toplayın:</strong> İlk saniyelerde akan soğuk su bir kovada biriktirilip temizlikte ya da çiçek sulamada kullanılabilir.",
      "<strong>Damlatan bataryayı onarın:</strong> Sürekli damlayan bir armatür gün boyunca fark edilmeden litrelerce su kaybettirir.",
    ] },
    { h: 'Duş mu, küvet mi?', p: [
      "Dolu bir küvet, boyutuna göre kabaca 150–200 litre su alır. Bu, dakikada 10 litrelik başlıkla 15–20 dakikalık duşa eşittir. Kısa duş her zaman küvetten tasarrufludur; ancak yüksek debili tepe duşunun altında uzun süre kalmak küveti doldurmaktan daha fazla su tüketebilir. Kendi durumunuzu görmek için sürenizi ve debinizi araca girip 'Bir duşta' satırını küvet hacminizle karşılaştırabilirsiniz.",
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      "Araç suyun duş boyunca kesintisiz ve sabit debiyle aktığını varsayar; suyu arada kapatıyorsanız süre alanına yalnızca suyun aktığı dakikaları yazın. Ay 30, yıl 365 gün alınır. Su tutarı yalnızca girdiğiniz birim fiyatla çarpımdır; su faturalarındaki kademeli tarife, atık su bedeli ve vergiler idareden idareye değiştiği için hesaba katılmaz. Enerji satırı bilgilendirme amaçlı fiziksel bir hesaptır; cihaz verimi ve tesisat kayıpları için bir yetkiliye ya da cihazın teknik belgelerine başvurun.",
    ] },
  ],
  faq: [
    ['Bir duşta ortalama kaç litre su harcanır?', 'Süre ile debinin çarpımı kadar. Dakikada 10 litre veren standart bir başlıkla 8 dakikalık duş 80 litre, 10 dakikalık duş 100 litre su tüketir.'],
    ['Duş başlığımın debisini nasıl ölçerim?', 'Hacmini bildiğiniz bir kovayı duşun altına koyun, suyu her zamanki ayarda açın ve bir dakika bekleyin. Kovada biriken litre, başlığınızın dakikalık debisidir. 10 litrelik kova 45 saniyede doluyorsa debi 10 ÷ 0,75 = 13,3 litre/dakikadır.'],
    ['5 dakikalık duş kaç litre su harcar?', 'Standart 10 litre/dakikalık başlıkla 50 litre, 6 litre/dakikalık tasarruflu başlıkla 30 litre su harcar.'],
    ['Aylık su faturasına etkisi ne olur?', 'Aylık metreküp tüketimini bölgenizdeki birim fiyatla çarparak yaklaşık tutarı bulabilirsiniz; fiyat alanını doldurursanız araç bunu yapar. Kademeli tarife ve atık su bedeli faturayı bu tutarın üzerine çıkarabilir.'],
    ['Sıcaklık farkını nasıl belirleyeceğim?', 'Duş suyu çoğunlukla 37–40 °C arasındadır. Şebeke suyu mevsime ve bölgeye göre değişir; yazın ılık, kışın belirgin biçimde soğuktur. İkisinin farkını girin; emin değilseniz varsayılan 25 °C makul bir ortalamadır.'],
    ['Isıtma enerjisi neden faturadakinden düşük çıkabilir?', 'Araç yalnızca suya geçen net ısıyı hesaplar. Isıtıcının verimi yüzde yüzden düşüktür ve sıcak su borularda bir miktar soğur; bu kayıplar gerçek tüketimi artırır.'],
    ['Gün aşırı duş alıyorsam ne yazmalıyım?', 'Kişi başı günlük duş sayısına 0,5 yazın. Haftada üç duş için 3 ÷ 7 ≈ 0,43 girebilirsiniz.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Tüm hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['su-tuketimi-hesapla', 'dogalgaz-tuketim-hesapla', 'karbon-ayak-izi-hesapla', 'abonelik-maliyeti-hesapla', 'kucuk-harcama-yillik-hesapla'],
};
