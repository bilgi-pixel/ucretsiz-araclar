export default {
  slug: 'hex-rgb-cevir',
  title: 'HEX RGB Renk Çevirici',
  h1Tail: '#RRGGBB ↔ rgb()',
  pageTitle: 'HEX RGB Renk Çevirici – Renk Kodunu RGB\'ye ve HEX\'e Çevirme',
  description: 'HEX renk kodunu RGB değerlerine, RGB değerlerini HEX koduna çevirin. Üç, altı ve sekiz haneli kodları, alfa kanalını ve kısa yazımı destekler.',
  card: 'HEX renk kodunu RGB\'ye, RGB değerlerini HEX\'e çevirin; kısa yazım ve saydamlık (alfa) desteğiyle.',
  category: 'gelistirici',
  keywords: ['hex rgb çevirme', 'rgb hex çevirme', 'renk kodu çevirme', 'hex renk kodu', 'rgb renk kodu', 'hex to rgb', 'rgb to hex', 'css renk kodu'],
  lead: 'Web tasarımında kullanılan <strong>HEX</strong> renk kodunu (ör. <code>#FF5733</code>) kırmızı, yeşil ve mavi bileşenlerine ayırın ya da elinizdeki <strong>RGB</strong> değerlerinden HEX kodunu üretin. Araç üç, altı ve sekiz haneli kodları tanır; saydamlık içeren kodlarda alfa değerini de hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'renk', label: 'Renk değeri', type: 'text', placeholder: 'Örn. #FF5733 ya da 255, 87, 51', hint: 'HEX için # işareti isteğe bağlıdır. RGB için üç sayıyı virgül ya da boşlukla ayırın; rgb(…) biçimi de kabul edilir.', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['hex', 'HEX → RGB'], ['rgb', 'RGB → HEX']] },
  ],
  compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Renk değeri" alanını doldurun.');
    let r, g, b, a = null;
    if (v.yon === 'rgb') {
      const ic = t.replace(/^rgba?\s*\(/i, '').replace(/\)\s*;?$/, '');
      const par = ic.split(/[\s,;\/]+/).filter(Boolean);
      if (par.length !== 3) h.err('RGB için tam üç sayı yazın (örn. 255, 87, 51).');
      const s = par.map((p) => {
        if (!/^\d+$/.test(p)) h.err('RGB bileşenleri 0 ile 255 arasında tam sayı olmalı; "' + p + '" geçersiz.');
        const n = Number(p);
        if (n > 255) h.err('RGB bileşenleri 255\'i geçemez; "' + p + '" çok büyük.');
        return n;
      });
      [r, g, b] = s;
    } else {
      let x = t.replace(/^#/, '');
      if (!/^[0-9a-fA-F]+$/.test(x)) h.err('HEX kodunda yalnızca 0–9 ve A–F karakterleri bulunabilir (örn. #1E90FF).');
      if (x.length === 3 || x.length === 4) x = x.split('').map((c) => c + c).join('');
      if (x.length !== 6 && x.length !== 8) h.err('HEX kodu 3, 4, 6 ya da 8 haneli olmalı; yazdığınız kod ' + t.replace(/^#/, '').length + ' haneli.');
      r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b = parseInt(x.slice(4, 6), 16);
      if (x.length === 8) a = parseInt(x.slice(6, 8), 16);
    }
    const iki = (n) => n.toString(16).toUpperCase().padStart(2, '0');
    const hex6 = iki(r) + iki(g) + iki(b);
    const tam = hex6 + (a === null ? '' : iki(a));
    const kisa = tam.match(/.{2}/g).every((p) => p[0] === p[1]) ? '#' + tam.match(/.{2}/g).map((p) => p[0]).join('') : 'Yok (çift haneler eşit değil)';
    const alfa = a === null ? null : Number((a / 255).toFixed(2));
    const css = a === null ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alfa})`;
    const yuzde = [r, g, b].map((n) => '%' + h.fmt(n / 255 * 100, 2)).join(' · ');
    const rows = v.yon === 'rgb' ? [['HEX', '#' + tam], ['RGB', css]] : [['RGB', css], ['HEX', '#' + tam]];
    rows.push(['Kırmızı (R)', String(r)], ['Yeşil (G)', String(g)], ['Mavi (B)', String(b)]);
    if (a !== null) rows.push(['Opaklık (alfa)', h.fmt(a / 255, 2) + ' (%' + h.fmt(a / 255 * 100, 0) + ')']);
    rows.push(['Yüzde olarak', yuzde], ['Kısa HEX', kisa], ['Ondalık renk değeri', String(r * 65536 + g * 256 + b)]);
    return { rows, note: 'Her kanal 0–255 aralığındadır; HEX kodunda iki onaltılık haneyle (00–FF) yazılır.' };
  },
  cases: [
    { in: { renk: '#FF5733', yon: 'hex' }, out: { 'RGB': 'rgb(255, 87, 51)', 'Kırmızı (R)': '255', 'Yeşil (G)': '87', 'Mavi (B)': '51', 'Yüzde olarak': '%100 · %34,12 · %20' } },
    { in: { renk: '255, 87, 51', yon: 'rgb' }, out: { 'HEX': '#FF5733', 'Ondalık renk değeri': '16734003' } },
    { in: { renk: '0af', yon: 'hex' }, out: { 'RGB': 'rgb(0, 170, 255)', 'HEX': '#00AAFF', 'Kısa HEX': '#0AF' } },
    { in: { renk: 'rgb(30, 144, 255)', yon: 'rgb' }, out: { 'HEX': '#1E90FF', 'Kısa HEX': 'Yok (çift haneler eşit değil)' } },
    { in: { renk: '#000000', yon: 'hex' }, out: { 'RGB': 'rgb(0, 0, 0)', 'Kısa HEX': '#000', 'Ondalık renk değeri': '0' } },
    { in: { renk: '#FF573380', yon: 'hex' }, out: { 'RGB': 'rgba(255, 87, 51, 0.5)', 'Opaklık (alfa)': '0,5 (%50)', 'HEX': '#FF573380' } },
    { in: { renk: '255 255 255', yon: 'rgb' }, out: { 'HEX': '#FFFFFF', 'Kısa HEX': '#FFF', 'Ondalık renk değeri': '16777215' } },
    { in: { renk: '#GGHHII', yon: 'hex' }, error: true },
    { in: { renk: '300, 0, 0', yon: 'rgb' }, error: true },
    { in: { renk: '#12345', yon: 'hex' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden HEX kodundan RGB\'ye mi, RGB değerlerinden HEX\'e mi çevireceğinizi seçin.',
    'HEX için kodu <code>#1E90FF</code> gibi yazın; # işaretini koymasanız da olur. RGB için üç sayıyı virgülle ya da boşlukla ayırın.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı, sonraki satırlar kanalları tek tek, yüzde değerlerini ve varsa kısa yazımı gösterir.',
    'CSS dosyanıza yapıştırmak istediğiniz satırı "Sonucu kopyala" düğmesiyle alın.',
  ],
  sections: [
    { h: 'HEX ve RGB aynı rengin iki yazımıdır', p: [
      'Ekranlar rengi üç ışığın karışımıyla üretir: kırmızı (R), yeşil (G) ve mavi (B). Her kanalın parlaklığı 8 bitle, yani 0 ile 255 arasında bir sayıyla ifade edilir. Üç kanal birlikte 256 × 256 × 256 = 16.777.216 farklı renk oluşturur. <strong>RGB yazımı</strong> bu üç sayıyı ondalık olarak verir: <code>rgb(255, 87, 51)</code>. <strong>HEX yazımı</strong> ise aynı üç sayıyı onaltılık tabanda, ikişer haneyle arka arkaya yazar: <code>#FF5733</code>.',
      'İkisi arasında bilgi kaybı yoktur; biri diğerine tam olarak çevrilir. HEX daha kısa olduğu için CSS dosyalarında, tasarım araçlarının renk kutularında ve marka kılavuzlarında yaygındır. RGB ise kanalları okumayı ve saydamlık eklemeyi kolaylaştırdığı için program kodunda ve hesaplama gereken yerlerde tercih edilir.',
    ] },
    { h: 'HEX kodunu RGB\'ye çevirme: çözümlü örnek', p: [
      'Onaltılık tabanda 0–9 rakamlarından sonra A = 10, B = 11, C = 12, D = 13, E = 14, F = 15 gelir. İki haneli bir onaltılık sayının ondalık değeri <strong>ilk hane × 16 + ikinci hane</strong> formülüyle bulunur.',
      '<code>#FF5733</code> kodunu üç çifte ayıralım. <strong>FF</strong>: 15 × 16 + 15 = 255. <strong>57</strong>: 5 × 16 + 7 = 87. <strong>33</strong>: 3 × 16 + 3 = 51. Sonuç <code>rgb(255, 87, 51)</code> olur; kırmızı kanal tam açık, yeşil yaklaşık üçte bir, mavi beşte bir düzeyindedir ve ortaya canlı bir turuncu-kırmızı çıkar. Araç aynı girdiyle bu değerleri ve yüzde karşılıklarını (%100, %34,12, %20) verir.',
    ] },
    { h: 'RGB değerlerini HEX\'e çevirme', p: [
      'Ters yönde her kanal 16\'ya bölünür: bölüm ilk haneyi, kalan ikinci haneyi verir. <code>rgb(30, 144, 255)</code> için: 30 ÷ 16 = 1, kalan 14 → <strong>1E</strong>. 144 ÷ 16 = 9, kalan 0 → <strong>90</strong>. 255 ÷ 16 = 15, kalan 15 → <strong>FF</strong>. Üç çift birleştirilince <code>#1E90FF</code> elde edilir. Değer 16\'dan küçükse başa sıfır konur; 10 sayısı A değil 0A olarak yazılır. Bu sıfırı unutmak, altı hane yerine beş hane üreterek kodun geçersiz olmasına yol açan en sık hatadır.',
    ] },
    { h: 'Üç, dört ve sekiz haneli kodlar', p: [
      'Bir HEX kodunun her çiftindeki iki hane aynıysa kod kısaltılabilir: <code>#00AAFF</code> yerine <code>#0AF</code> yazılabilir. Tarayıcı kısa kodu okurken her haneyi ikiler; <code>#0AF</code> → <code>#00AAFF</code>. Dikkat edilmesi gereken nokta, haneye sıfır eklenmediği, hanenin tekrarlandığıdır: <code>#123</code> kodu <code>#102030</code> değil <code>#112233</code> anlamına gelir. Araç, çevrilen rengin kısa yazımı mümkünse ayrı bir satırda gösterir.',
      'Sekiz haneli kodlarda son iki hane <strong>alfa kanalıdır</strong>, yani opaklığı belirtir: 00 tamamen saydam, FF tamamen opaktır. <code>#FF573380</code> kodundaki 80 değeri ondalık 128\'dir ve 128 ÷ 255 ≈ 0,5, yani yaklaşık yüzde 50 opaklık demektir; CSS karşılığı <code>rgba(255, 87, 51, 0.5)</code> olur. Dört haneli kodlar da sekiz hanelinin kısa biçimidir.',
    ] },
    { h: 'Sık kullanılan renkler', ul: [
      '<strong>Siyah</strong>: #000000 = rgb(0, 0, 0)',
      '<strong>Beyaz</strong>: #FFFFFF = rgb(255, 255, 255)',
      '<strong>Kırmızı</strong>: #FF0000 = rgb(255, 0, 0)',
      '<strong>Yeşil (tam parlak)</strong>: #00FF00 = rgb(0, 255, 0)',
      '<strong>Mavi</strong>: #0000FF = rgb(0, 0, 255)',
      '<strong>Sarı</strong>: #FFFF00 = rgb(255, 255, 0)',
      '<strong>Camgöbeği</strong>: #00FFFF = rgb(0, 255, 255)',
      '<strong>Macenta</strong>: #FF00FF = rgb(255, 0, 255)',
      '<strong>Orta gri</strong>: #808080 = rgb(128, 128, 128)',
      '<strong>Turuncu</strong>: #FFA500 = rgb(255, 165, 0)',
    ] },
    { h: 'Kullanım alanları ve sınırlar', p: [
      'Bir tasarım dosyasındaki rengi CSS\'e taşırken, e-posta şablonunda yalnızca HEX kabul eden bir alana RGB ile verilmiş kurumsal rengi yazarken, grafik kütüphanesine kanal değerlerini ayrı ayrı verirken ya da bir rengin üzerine saydamlık eklemek için <code>rgba()</code> biçimine geçerken bu çeviriye gerek duyulur. "Ondalık renk değeri" satırı ise rengi tek tam sayı olarak isteyen programlama arayüzlerinde işe yarar; hesabı R × 65.536 + G × 256 + B biçimindedir.',
      'Araç standart sRGB kanal değerleriyle çalışır; renk profili dönüşümü yapmaz. Aynı kod farklı ekranlarda panel türüne ve kalibrasyona bağlı olarak biraz farklı görünebilir. Baskı işlerinde ekrandaki RGB rengi kâğıtta birebir elde edilemeyebilir; baskı için matbaanızın istediği renk değerlerini esas alın.',
    ] },
  ],
  faq: [
    ['#FFFFFF hangi renktir?', 'Beyazdır. FF onaltılık tabanda 255 demektir; üç kanalın da en yüksek değerde olması beyaz ışığı verir. #000000 ise üç kanalın da kapalı olduğu siyahtır.'],
    ['HEX kodunun başındaki # işareti zorunlu mu?', 'CSS içinde zorunludur; işaret olmadan tarayıcı değeri renk olarak tanımaz. Bu araçta ise yazmasanız da olur, sonuçta # işaretiyle birlikte verilir.'],
    ['Üç haneli HEX kodu ne anlama gelir?', 'Altı haneli kodun kısaltmasıdır; her hane ikilenerek okunur. #F80 kodu #FF8800 ile aynıdır. Yalnızca her çiftin iki hanesi eşit olan renkler bu biçimde yazılabilir.'],
    ['Büyük harf ile küçük harf fark eder mi?', 'Hayır. #ff5733 ile #FF5733 aynı renktir. Araç çıktıyı büyük harfle verir; proje içinde tek bir biçimde tutarlı kalmanız yeterlidir.'],
    ['Saydam renk nasıl yazılır?', 'İki yol vardır: sekiz haneli HEX kodu (son iki hane alfa) ya da rgba() biçimi (dördüncü değer 0 ile 1 arasında). #00000080 ile rgba(0, 0, 0, 0.5) yaklaşık aynı yarı saydam siyahı verir.'],
    ['RGB değeri 255\'ten büyük olabilir mi?', 'Hayır. Her kanal 8 bitle saklandığı için en büyük değer 255\'tir. Araç 255\'i aşan ya da tam sayı olmayan bileşenlerde uyarı verir.'],
    ['HEX kodundan rengin açık mı koyu mu olduğunu anlayabilir miyim?', 'Kabaca evet. Üç çiftin de değeri yüksekse (C, D, E, F ile başlıyorsa) renk açıktır; düşükse (0–3 ile başlıyorsa) koyudur. Kesin karar için parlaklık ya da kontrast hesabı yapmak gerekir.'],
    ['Yazdığım renk kodları kaydediliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; girdiğiniz değerler hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['rgb-hsl-cevir', 'cmyk-rgb-cevir', 'renk-secici', 'renk-kontrast-hesapla', 'renk-tonu-olustur', 'onaltilik-ondalik-cevir'],
};
