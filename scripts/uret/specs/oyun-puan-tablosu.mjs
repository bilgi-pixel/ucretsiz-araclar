export default {
  slug: 'oyun-puan-tablosu',
  title: 'Oyun Puan Tablosu Hesaplama',
  h1Tail: 'tur puanlarından sıralama',
  pageTitle: 'Oyun Puan Tablosu Hesaplama – Okey, Kâğıt ve Kutu Oyunu Skoru',
  description: 'Oyuncuların tur tur aldığı puanları yazın; toplamları, ortalamaları ve sıralamayı anında görün. Okey, 101, batak, tavla ve kutu oyunları için skor tablosu.',
  card: 'Oyuncuların tur puanlarını yazın; toplam, ortalama ve sıralamayı görün. Okey, 101, kâğıt ve kutu oyunları için skor tablosu.',
  category: 'gunluk',
  keywords: ['oyun puan tablosu', 'skor tablosu hesaplama', 'okey puan hesaplama', '101 okey puan tablosu', 'batak puan tablosu', 'oyun skoru tutma', 'puan toplama sıralama'],
  lead: 'Arkadaş ya da aile oyunlarında <strong>tur tur yazılan puanları toplayıp sıralamayı</strong> çıkarın. Her satıra bir oyuncunun adını ve aldığı puanları yazmanız yeterli; araç toplamı, tur sayısını, ortalamayı ve lidere olan farkı hesaplar. Düşük puanın kazandığı oyunlar için sıralama yönünü değiştirebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'puanlar', label: 'Oyuncular ve puanları (her satıra bir oyuncu)', type: 'textarea', wide: true, placeholder: 'Ali: 10 20 30\nAyşe: 25 25 25\nCan: 5 15 10', hint: 'Biçim: Ad: puan puan puan. Puanları boşlukla ayırın; ceza için eksi işareti kullanın (örn. -101).' },
    { id: 'yon', label: 'Kazanan', type: 'select', options: [['yuksek', 'En yüksek puan kazanır'], ['dusuk', 'En düşük puan kazanır (okey, 101, king cezaları)']] },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.puanlar);
    if (!satirlar.length) h.err('En az bir oyuncu yazın. Biçim: "Ali: 10 20 30" (her satıra bir oyuncu).');
    if (satirlar.length > 50) h.err('En fazla 50 oyuncu girebilirsiniz.');
    const oyuncular = [];
    const adlar = new Set();
    for (const [no, satir] of satirlar.entries()) {
      let ad, kalan;
      const iki = satir.indexOf(':');
      if (iki >= 0) { ad = satir.slice(0, iki).trim(); kalan = satir.slice(iki + 1); }
      else {
        const m = /^(.*?)\s+([-+−]?[\d.,]+(?:[\s;]+[-+−]?[\d.,]+)*)\s*$/.exec(satir);
        if (!m) h.err(`${no + 1}. satır anlaşılamadı: "${satir}". Biçim: "Ad: 10 20 30".`);
        ad = m[1].trim(); kalan = m[2];
      }
      if (!ad) h.err(`${no + 1}. satırda oyuncu adı eksik. Biçim: "Ad: 10 20 30".`);
      const parcalar = kalan.replace(/,\s+/g, ' ').split(/[\s;]+/).filter(Boolean);
      if (!parcalar.length) h.err(`"${ad}" için en az bir puan yazın (örn. ${ad}: 10 20).`);
      const puanlar = parcalar.map((p) => {
        const t = p.replace(/−/g, '-');
        if ((t.match(/[.,]/g) || []).length > 1 || !/^[-+]?(\d+[.,]?\d*|[.,]\d+)$/.test(t)) h.err(`"${ad}" satırındaki "${p}" puanı anlaşılamadı. Puanları boşlukla ayırın (örn. 10 20 -5).`);
        return Number(t.replace(',', '.'));
      });
      const anahtar = ad.toLocaleLowerCase('tr-TR');
      if (adlar.has(anahtar)) h.err(`"${ad}" adı birden fazla satırda geçiyor; her oyuncuyu tek satıra yazın.`);
      adlar.add(anahtar);
      const toplam = puanlar.reduce((a, b) => a + b, 0);
      oyuncular.push({ ad, tur: puanlar.length, toplam: Math.round(toplam * 1e6) / 1e6 });
    }
    const dusuk = v.yon === 'dusuk';
    const sirali = oyuncular.map((o, i) => ({ ...o, i })).sort((a, b) => (dusuk ? a.toplam - b.toplam : b.toplam - a.toplam) || a.i - b.i);
    let sira = 0;
    sirali.forEach((o, k) => { if (k === 0 || o.toplam !== sirali[k - 1].toplam) sira = k + 1; o.sira = sira; });
    const en = sirali[0].toplam;
    const liderler = sirali.filter((o) => o.toplam === en);
    const enTur = Math.max(...oyuncular.map((o) => o.tur));
    const esitTur = oyuncular.every((o) => o.tur === enTur);
    const genel = oyuncular.reduce((a, o) => a + o.toplam, 0);
    const text = sirali.map((o) => {
      const fark = Math.abs(o.toplam - en);
      return `${o.sira}. ${o.ad} — ${h.fmt(o.toplam, 2)} puan (${o.tur} tur, ortalama ${h.fmt(o.toplam / o.tur, 2)}${fark > 0 ? `, liderden ${h.fmt(fark, 2)} ${dusuk ? 'fazla' : 'geride'}` : ''})`;
    }).join('\n');
    return {
      rows: [
        ['Lider', liderler.length > 1 ? `${liderler.map((o) => o.ad).join(', ')} (berabere, ${h.fmt(en, 2)} puan)` : `${liderler[0].ad} (${h.fmt(en, 2)} puan)`],
        ['Oyuncu sayısı', String(oyuncular.length)],
        ['Tur sayısı', esitTur ? String(enTur) : `${enTur} (oyuncuların tur sayıları farklı)`],
        ['İlk ile son arasındaki fark', h.fmt(Math.abs(sirali[sirali.length - 1].toplam - en), 2) + ' puan'],
        ['Tüm puanların toplamı', h.fmt(genel, 2)],
      ],
      text,
      note: esitTur ? '' : 'Bazı oyuncuların tur sayısı diğerlerinden farklı; eksik ya da fazla yazılmış bir puan olup olmadığını kontrol edin.',
    };
  },
  cases: [
    { in: { puanlar: 'Ali: 10 20 30\nAyşe: 25 25 25\nCan: 5 15 10', yon: 'yuksek' }, out: { 'Lider': 'Ayşe (75 puan)', 'Oyuncu sayısı': '3', 'Tur sayısı': '3', 'İlk ile son arasındaki fark': '45 puan', 'Tüm puanların toplamı': '165' }, text: '1. Ayşe — 75 puan (3 tur, ortalama 25)\n2. Ali — 60 puan (3 tur, ortalama 20, liderden 15 geride)\n3. Can — 30 puan (3 tur, ortalama 10, liderden 45 geride)' },
    { in: { puanlar: 'Ali: 10 20 30\nAyşe: 25 25 25\nCan: 5 15 10', yon: 'dusuk' }, out: { 'Lider': 'Can (30 puan)' }, text: '1. Can — 30 puan (3 tur, ortalama 10)\n2. Ali — 60 puan (3 tur, ortalama 20, liderden 30 fazla)\n3. Ayşe — 75 puan (3 tur, ortalama 25, liderden 45 fazla)' },
    { in: { puanlar: 'Zeynep: 40, 60\nMert: 70, 30\nElif: 20, 10', yon: 'yuksek' }, out: { 'Lider': 'Zeynep, Mert (berabere, 100 puan)', 'İlk ile son arasındaki fark': '70 puan' }, textMatch: '^1\\. Zeynep — 100 puan.*\\n1\\. Mert — 100 puan.*\\n3\\. Elif — 30 puan' },
    { in: { puanlar: 'Hasan: 34 -101 12 202\nHüseyin: 5 48 -101 67\nFatma: -101 23 9 55\nEmine: 80 15 404 -101', yon: 'dusuk' }, out: { 'Lider': 'Fatma (-14 puan)', 'Oyuncu sayısı': '4', 'Tur sayısı': '4', 'Tüm puanların toplamı': '550' } },
    { in: { puanlar: 'Biz 120 85 140\nOnlar 95 110 60', yon: 'yuksek' }, out: { 'Lider': 'Biz (345 puan)', 'İlk ile son arasındaki fark': '80 puan' } },
    { in: { puanlar: 'Deniz: 7,5 8 9,25\nEge: 10 6', yon: 'yuksek' }, out: { 'Lider': 'Deniz (24,75 puan)', 'Tur sayısı': '3 (oyuncuların tur sayıları farklı)' } },
    { in: { puanlar: '' }, error: true },
    { in: { puanlar: 'Ali:\nAyşe: 10' }, error: true },
    { in: { puanlar: 'Ali: 10 yirmi 30' }, error: true },
    { in: { puanlar: 'Ali: 10\nali: 20' }, error: true },
  ],
  howto: [
    'Her satıra bir oyuncu ya da takım yazın: önce ad, ardından iki nokta, sonra o oyuncunun tur tur aldığı puanlar. Örnek: <code>Ali: 10 20 30</code>.',
    'Puanları boşlukla ayırın. Ceza ya da eksi puanları başına eksi koyarak yazın (<code>-101</code>). Ondalıklı puan gerekiyorsa virgül kullanabilirsiniz.',
    'Oyunun kuralına göre "En yüksek puan kazanır" ya da "En düşük puan kazanır" seçeneğini işaretleyin.',
    '"Hesapla" düğmesine basın. Üstte lider ve özet bilgiler, altta bütün oyuncuların sıralı tablosu görünür.',
    'Yeni tur oynandıkça puanları satırların sonuna ekleyip yeniden hesaplayın; tabloyu kopyalayıp grup sohbetine yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'Ne işe yarar?', p: [
      'Okey masasında, batak ya da pişti oynarken, kutu oyunu gecesinde ya da çocukların mahalle turnuvasında skoru biri kâğıda yazar ve oyunun sonunda uzun bir toplama işlemi başlar. Sütunlar birbirine karışır, eksi puanlar unutulur, toplamda anlaşılamaz. Bu araç o toplama ve sıralama işini üstlenir: puanları yazdığınız gibi bırakır, her oyuncunun toplamını, kaç tur oynadığını ve tur başına ortalamasını çıkarır, oyuncuları kazanma ölçütüne göre dizer.',
      'Hesap çok basittir ama elle yapıldığında hataya açıktır: her oyuncu için <strong>toplam = tur puanlarının toplamı</strong>, <strong>ortalama = toplam ÷ tur sayısı</strong>. Sıralama, seçtiğiniz yöne göre toplamların büyükten küçüğe ya da küçükten büyüğe dizilmesidir. Aynı toplama sahip oyuncular aynı sırayı paylaşır ve bir sonraki sıra atlanır; iki kişi birinci olduysa ardından gelen oyuncu üçüncü sayılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Üç arkadaş üç tur oynamış olsun. Ali 10, 20 ve 30; Ayşe üç turda da 25; Can 5, 15 ve 10 puan almış. Toplamlar sırasıyla 60, 75 ve 30\'dur. Yüksek puanın kazandığı bir oyunda sıralama Ayşe (75), Ali (60), Can (30) olur; Ali liderden 15, Can 45 puan geridedir. Ortalamalar 25, 20 ve 10 puandır.',
      'Aynı puanlar, düşük puanın kazandığı bir oyunda tersine okunur: Can 30 puanla birinci, Ali 60 puanla ikinci, Ayşe 75 puanla üçüncüdür. Araçta yalnızca "Kazanan" seçeneğini değiştirmeniz yeterlidir; puanları yeniden yazmanıza gerek kalmaz.',
    ] },
    { h: 'Hangi oyunlarda hangi yön seçilir?', ul: [
      '<strong>Okey ve 101:</strong> Elde kalan taşların değeri ceza olarak yazılır, bitiren oyuncu eksi puan alır. En düşük toplam kazanır; "En düşük puan kazanır" seçilmelidir.',
      '<strong>King:</strong> Ceza ellerinde eksi, koz ellerinde artı puan yazılır ve oyun sonunda en yüksek toplam kazanır. Cezaları eksi işaretiyle girip "En yüksek puan kazanır" seçeneğini kullanın.',
      '<strong>Batak ve ihaleli oyunlar:</strong> İhaleyi tutturan aldığı el sayısı kadar artı, batan ihale kadar eksi yazar; yüksek toplam kazanır.',
      '<strong>Tavla, pişti, kelime ve bilgi oyunları:</strong> Her turun ya da partinin puanı toplanır, en yüksek puan kazanır.',
      '<strong>Golf tarzı oyunlar ve süre yarışları:</strong> Az vuruş ya da kısa süre iyidir; düşük toplam kazanır.',
    ] },
    { h: 'Yazım biçimi ve ipuçları', p: [
      'Ad ile puanlar arasına iki nokta koymak en güvenli yazımdır; özellikle "Takım 1" gibi içinde rakam geçen adlarda iki nokta, adın nerede bittiğini belirler. İki nokta kullanmazsanız araç satırın sonundaki sayıları puan, öncesini ad sayar. Puanlar arasında boşluk, noktalı virgül ya da virgül ve boşluk kullanılabilir. Boşluksuz virgül ondalık ayırıcı sayılır: <code>7,5</code> yedi buçuk demektir, bu yüzden <code>10,20,30</code> gibi bitişik yazımlar kabul edilmez ve araç sizi uyarır.',
      'Bir oyuncu bir turda oynamadıysa o tur için 0 yazmak, sütunların kaymasını önler. Oyuncuların tur sayıları birbirinden farklı çıktığında araç bunu not olarak bildirir; çoğu zaman bu, bir puanın unutulduğunun ya da iki kez yazıldığının işaretidir. Okey gibi çiftli oynanan oyunlarda oyuncu yerine takım adlarını yazarak takım toplamını izleyebilirsiniz.',
    ] },
    { h: 'Toplam mı, ortalama mı?', p: [
      'Herkes aynı sayıda tur oynadıysa toplam ile ortalama aynı sıralamayı verir ve toplam yeterlidir. Oyuna sonradan katılan ya da erken ayrılan biri varsa toplam yanıltıcı olabilir; bu durumda tablodaki ortalama sütunu daha adil bir karşılaştırma sunar. Araç sıralamayı her zaman toplama göre yapar; ortalamaya göre karar vermek isterseniz listedeki ortalama değerlerine bakmanız yeterlidir.',
      'Uzun soluklu ev liglerinde her oyun gecesinin toplamını tek bir puan gibi düşünüp yeni bir tablo tutabilirsiniz: satırlara oyuncuları, puan olarak da her gecenin sonucunu yazın. Böylece sezon sıralaması da aynı araçla çıkar.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca toplama ve sıralama yapar; oyunların kendine özgü puanlama kurallarını (okeyde çift açma, 101\'de el açma cezası, batakta ihale hesabı gibi) bilmez. Her tur için yazılacak puanı masadaki kurala göre siz belirlersiniz. Beraberlik durumunda bir eşitlik bozma ölçütü uygulanmaz; eşit puanlı oyuncular aynı sırada gösterilir. En fazla 50 oyuncu girilebilir.',
    ] },
  ],
  faq: [
    ['Okeyde puan tablosu nasıl tutulur?', 'Her elin sonunda bitiremeyen oyuncuların ıstakasında kalan taşların değeri o oyuncuya ceza olarak yazılır. Eller bittiğinde cezası en az olan kazanır. Araçta her oyuncunun el el cezalarını yazıp "En düşük puan kazanır" seçeneğini kullanın.'],
    ['Eksi puanları nasıl yazarım?', 'Puanın başına eksi işareti koymanız yeterlidir, örneğin -101 ya da -50. Araç eksi değerleri toplamdan düşer. Sayı ile işaret arasında boşluk bırakmayın.'],
    ['Oyuncu adında boşluk ya da rakam olabilir mi?', 'Evet. "Ayşe Teyze" ya da "Takım 2" gibi adlar kullanılabilir; bu durumda adın ardından iki nokta koymanız önerilir. İki nokta, adın bittiği ve puanların başladığı yeri kesin olarak belirler.'],
    ['İki oyuncunun puanı eşitse sıralama nasıl olur?', 'Eşit puanlı oyuncular aynı sırayı paylaşır ve liste içinde yazdığınız sırayla gösterilir. Bir sonraki oyuncu, önündeki kişi sayısına göre numaralanır; iki birinci varsa sıradaki oyuncu üçüncüdür.'],
    ['Takım halinde oynanan oyunlarda nasıl kullanılır?', 'Oyuncu adı yerine takım adını yazmanız yeterlidir: "Biz: 120 85 140" ve "Onlar: 95 110 60" gibi. Araç her satırı ayrı bir taraf olarak toplar.'],
    ['Oyun bitmeden ara sonuç alabilir miyim?', 'Evet. O ana kadar oynanan turları yazıp hesaplayın; yeni tur oynandıkça puanları satırların sonuna ekleyip yeniden hesaplamanız yeterlidir. Yazdıklarınız sayfa açık kaldığı sürece kutuda durur.'],
    ['Ondalıklı puan girebilir miyim?', 'Evet, virgül ya da nokta ile yazabilirsiniz (7,5 gibi). Toplam ve ortalamalar en fazla iki ondalık basamakla gösterilir. Binlik ayırıcı kullanmayın; 1500 puanı 1.500 olarak değil 1500 olarak yazın.'],
    ['Oyuncu adları ve puanlar kaydediliyor mu?', 'Hayır. Tablo tarayıcınızda hesaplanır; adlar ve puanlar hiçbir sunucuya gönderilmez, sayfayı kapattığınızda silinir.'],
  ],
  related: ['gol-averaji-hesapla', 'rastgele-takim-olustur', 'lig-fiksturu-olustur', 'bowling-puani-hesapla', 'satranc-elo-hesapla', 'sinif-ortalamasi-hesapla'],
};
