export default {
  slug: 'pozlama-hesapla',
  title: 'Pozlama Değeri (EV) Hesaplama',
  h1Tail: 'diyafram, enstantane, ISO',
  pageTitle: 'Pozlama Değeri (EV) Hesaplama – Diyafram, Enstantane ve ISO',
  description: 'Diyafram, enstantane ve ISO değerinden pozlama değerini (EV) hesaplayın. ISO 100 eşdeğeri ışık değerini ve aynı pozlamayı veren eşdeğer ayarları görün.',
  card: 'Diyafram, enstantane ve ISO\'dan pozlama değerini (EV) bulun; aynı pozlamayı veren eşdeğer ayar listesini alın.',
  category: 'gunluk',
  keywords: ['pozlama değeri hesaplama', 'ev hesaplama', 'exposure value', 'diyafram enstantane iso', 'pozlama üçgeni', 'eşdeğer pozlama', 'güneşli 16 kuralı'],
  lead: 'Fotoğraf makinenizdeki diyafram, enstantane ve ISO ayarının hangi <strong>pozlama değerine (EV)</strong> karşılık geldiğini hesaplayın. Araç, ayarın kendi EV değerini, ISO 100\'e indirgenmiş ışık değerini ve aynı pozlamayı veren diğer diyafram-enstantane çiftlerini listeler.',
  button: 'Hesapla',
  inputs: [
    { id: 'diyafram', label: 'Diyafram (f/)', type: 'number', placeholder: 'Örn. 8', hint: 'Yalnızca sayıyı yazın: f/2,8 için 2,8' },
    { id: 'enstantane', label: 'Enstantane (saniye)', type: 'text', placeholder: 'Örn. 1/125 ya da 2', hint: 'Kesirli (1/125) ya da ondalıklı (0,5) yazabilirsiniz' },
    { id: 'iso', label: 'ISO', type: 'number', value: '100' },
  ],
  compute(v, h) {
    const N = h.pos(v.diyafram, 'Diyafram');
    const ham = String(v.enstantane ?? '').trim();
    if (ham === '') h.err('"Enstantane" alanını doldurun (örn. 1/125).');
    let t;
    const m = /^([^/]+)\/([^/]+)$/.exec(ham);
    if (m) t = h.pos(m[1], 'Enstantane') / h.pos(m[2], 'Enstantane');
    else t = h.pos(ham, 'Enstantane');
    const iso = h.pos(v.iso, 'ISO');
    const ev = Math.log2(N * N / t);
    const ev100 = ev - Math.log2(iso / 100);
    const sure = (x) => {
      if (x >= 0.75) return h.fmt(x, x >= 10 ? 0 : 1) + ' sn';
      const p = 1 / x;
      return '1/' + h.fmt(p, p >= 10 ? 0 : 1) + ' sn';
    };
    const r = Math.round(ev100);
    let sahne;
    if (r >= 16) sahne = 'Çok parlak: güneş altında kar ya da açık renkli kum';
    else if (r === 15) sahne = 'Açık havada parlak güneş (güneşli 16 kuralı)';
    else if (r >= 13) sahne = 'Puslu güneş ya da parçalı bulutlu gün';
    else if (r === 12) sahne = 'Kapalı hava ya da açık gölge';
    else if (r >= 9) sahne = 'Gün doğumu-batımı çevresi, parlak vitrin ve sahne ışığı';
    else if (r >= 5) sahne = 'Aydınlık iç mekân, ışıklı gece sokağı';
    else if (r >= 0) sahne = 'Loş iç mekân, mum ışığı, gece manzarası';
    else sahne = 'Çok karanlık: ay ışığı ve gece gökyüzü';
    const satirlar = [];
    for (let k = 2; k <= 10; k++) {
      const n = Math.pow(Math.SQRT2, k);
      const ad = k % 2 === 0 ? h.fmt(n, 0) : h.fmt(n, n < 10 ? 1 : 0);
      satirlar.push('f/' + ad + '  →  ' + sure(n * n / Math.pow(2, ev)));
    }
    return {
      rows: [
        ['Pozlama değeri (ayar)', h.fmt(ev, 2) + ' EV'],
        ['ISO 100 eşdeğeri ışık değeri', h.fmt(ev100, 2) + ' EV'],
        ['Yaklaşık sahne', sahne],
        ['Enstantane', sure(t)],
      ],
      text: 'ISO ' + h.fmt(iso, 0) + ' için aynı pozlamayı veren ayarlar:\n' + satirlar.join('\n'),
      note: 'EV = log2(N² ÷ t). Sahne karşılığı yaklaşık bir rehberdir; ışık ölçümünün yerini tutmaz.',
    };
  },
  cases: [
    { in: { diyafram: '16', enstantane: '1/125', iso: '100' }, out: { 'Pozlama değeri (ayar)': '14,97 EV', 'ISO 100 eşdeğeri ışık değeri': '14,97 EV', 'Yaklaşık sahne': 'Açık havada parlak güneş (güneşli 16 kuralı)' } },
    { in: { diyafram: '4', enstantane: '1/16', iso: '400' }, out: { 'Pozlama değeri (ayar)': '8 EV', 'ISO 100 eşdeğeri ışık değeri': '6 EV' } },
    { in: { diyafram: '1', enstantane: '1', iso: '100' }, out: { 'Pozlama değeri (ayar)': '0 EV', 'Enstantane': '1 sn' } },
    { in: { diyafram: '2', enstantane: '0,25', iso: '100' }, out: { 'Pozlama değeri (ayar)': '4 EV', 'Enstantane': '1/4 sn' } },
    { in: { diyafram: '8', enstantane: '1/64', iso: '200' }, out: { 'Pozlama değeri (ayar)': '12 EV', 'ISO 100 eşdeğeri ışık değeri': '11 EV' } },
    { in: { diyafram: '2,8', enstantane: '1/60', iso: '400' }, out: { 'Pozlama değeri (ayar)': '8,88 EV', 'ISO 100 eşdeğeri ışık değeri': '6,88 EV' } },
    { in: { diyafram: '4', enstantane: '1/16', iso: '100' }, textMatch: 'f/8 {2}→ {2}1/4 sn' },
    { in: { diyafram: '8', enstantane: 'hızlı', iso: '100' }, error: true },
    { in: { diyafram: '0', enstantane: '1/125', iso: '100' }, error: true },
  ],
  howto: [
    '"Diyafram" alanına objektifin f değerini yalnızca sayı olarak yazın; f/5,6 için 5,6 girmeniz yeterlidir.',
    '"Enstantane" alanına perde hızını saniye cinsinden yazın. Makinede 125 olarak görünen değer 1/125 saniyedir; uzun pozlamalarda 2 ya da 30 gibi tam saniye yazabilirsiniz.',
    '"ISO" alanına kullandığınız duyarlılığı girin. Boş bırakmayın; varsayılan değer 100\'dür.',
    '"Hesapla" düğmesine basın. İlk satır ayarın pozlama değerini, ikinci satır aynı sahnenin ISO 100\'e indirgenmiş ışık değerini gösterir.',
    'Alttaki kutuda, seçtiğiniz ISO için aynı pozlamayı veren diyafram-enstantane çiftlerini bulursunuz; alan derinliği ya da hareket dondurma ihtiyacınıza göre birini seçin.',
  ],
  sections: [
    { h: 'Pozlama değeri (EV) nedir?', p: [
      'Pozlama değeri, diyafram açıklığı ile enstantane süresinin birlikte sensöre ne kadar ışık geçirdiğini tek sayıyla ifade eden logaritmik bir ölçüdür. Tanım gereği <strong>f/1 diyafram ve 1 saniye enstantane 0 EV</strong> kabul edilir. EV bir birim arttığında sensöre ulaşan ışık yarıya iner; bir birim azaldığında iki katına çıkar. Fotoğrafçıların "bir stop" dediği şey tam olarak 1 EV\'lik farktır.',
      'Bu ölçünün güzelliği, birbirinden çok farklı görünen ayarların aynı sayıya denk gelebilmesidir. f/4 ile 1/16 saniye de, f/8 ile 1/4 saniye de 8 EV eder; ikisi de sensöre aynı miktarda ışık düşürür. Aralarındaki fark pozlamada değil, alan derinliğinde ve hareketin nasıl kaydedildiğindedir.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Hesap şu eşitliğe dayanır: <strong>EV = log<sub>2</sub>(N² ÷ t)</strong>. Burada N diyafram sayısı, t saniye cinsinden enstantanedir. Örnek olarak f/16 ve 1/125 saniyeyi alalım. N² = 256, t = 0,008 olduğundan N² ÷ t = 32.000 bulunur. 32.000\'in 2 tabanındaki logaritması 14,97\'dir; araç da bu ayar için 14,97 EV gösterir.',
      'ISO devreye girdiğinde iki ayrı sayı konuşulur. Birincisi ayarın kendi EV değeridir ve yalnızca diyafram ile enstantaneye bağlıdır. İkincisi sahnenin ışık düzeyidir ve ISO 100\'e göre ifade edilir: <strong>EV<sub>100</sub> = EV − log<sub>2</sub>(ISO ÷ 100)</strong>. f/4, 1/16 saniye ve ISO 400 ile doğru pozlanan bir sahnede ayar 8 EV\'dir, ISO 400 ise ISO 100\'den iki stop daha duyarlıdır; dolayısıyla sahnenin ışık değeri 8 − 2 = 6 EV olur. Yani bu ortam, ISO 100\'de 6 EV\'lik ayar isteyen loşlukta bir ortamdır.',
    ] },
    { h: 'Pozlama üçgeni ve eşdeğer ayarlar', p: [
      'Diyafram, enstantane ve ISO birbirini telafi eden üç ayardır. Diyaframı bir stop kısarsanız (örneğin f/4\'ten f/5,6\'ya) aynı pozlamayı korumak için enstantaneyi iki katına uzatmanız ya da ISO\'yu iki katına çıkarmanız gerekir. Sonuç kutusundaki liste bu takası sizin yerinize yapar: f/2\'den f/32\'ye kadar tam stop diyaframların her biri için gereken enstantaneyi yazar.',
      'Listedeki diyafram sayıları 2\'nin karekökünün kuvvetleridir; makinelerde f/5,6, f/11 ve f/22 olarak yazan değerler gerçekte 5,657, 11,31 ve 22,63\'tür. Araç hesabı gerçek değerle yapar, bu yüzden listedeki süreler tam stop aralıklarıyla ilerler. Kendi girdiğiniz diyafram ise yazdığınız sayı olarak işlenir; f/5,6 yazdığınızda 5,6 kullanılır ve sonuç tam sayıdan birkaç yüzde bir sapabilir. Bu sapma pratikte görünmez.',
    ] },
    { h: 'Hangi sahne kaç EV eder?', p: [
      'Aşağıdaki değerler ISO 100 için yaygın kabul gören yaklaşık karşılıklardır. Gerçek ışık saate, mevsime, bulut kalınlığına ve konunun yansıtıcılığına göre bir iki stop oynayabilir; bu tabloyu başlangıç noktası olarak görün.',
    ], ul: [
      '<strong>16 EV:</strong> güneş altında kar ya da açık renkli kum',
      '<strong>15 EV:</strong> açık havada parlak güneş, belirgin gölgeler',
      '<strong>13–14 EV:</strong> puslu güneş, yumuşak gölgeler',
      '<strong>12 EV:</strong> kapalı hava ya da açık gölge',
      '<strong>9–11 EV:</strong> gün batımı çevresi, parlak vitrinler, sahne ışıkları',
      '<strong>5–8 EV:</strong> aydınlık iç mekân, ışıklı cadde',
      '<strong>0–4 EV:</strong> loş oda, mum ışığı, gece şehir manzarası',
    ] },
    { h: 'Güneşli 16 kuralı', p: [
      'Işıkölçer olmadan pozlama kestirmenin en bilinen yolu güneşli 16 kuralıdır: parlak güneşte diyaframı f/16\'ya alın, enstantaneyi ISO değerinin tersine en yakın hıza ayarlayın. ISO 100 için bu 1/100 ya da 1/125 saniyedir. Araçta f/16 ve 1/125 girdiğinizde çıkan 14,97 EV, kuralın işaret ettiği 15 EV düzeyiyle örtüşür. Filmli makine kullananlar ve ışıkölçeri bozulan gövdelerle çekim yapanlar bu kuralı hâlâ sık kullanır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın karışıklık, EV yükseldikçe fotoğrafın aydınlanacağını sanmaktır. Tersi doğrudur: yüksek EV, kısık diyafram ve kısa enstantane demektir, yani sensöre daha az ışık düşer. Parlak sahneler bu yüzden yüksek EV ister. Bir diğer hata, makinedeki pozlama telafisi düğmesindeki "+1 EV" ifadesiyle bu sayfadaki mutlak EV\'yi karıştırmaktır; telafi düğmesi ölçülen değere göre göreli bir kaydırmadır.',
      'Hesap, objektifin ışık geçirgenliği kaybını, ND ve polarize filtreleri, çok uzun pozlamalarda filmde görülen karşılıklılık sapmasını hesaba katmaz. ND filtre kullanıyorsanız filtrenin stop değerini sonuçtan kendiniz düşmelisiniz. Sahne karşılığı satırı bilgilendirme amaçlıdır; önemli çekimlerde histogramı ya da ışıkölçeri esas alın.',
    ] },
  ],
  faq: [
    ['EV kaç olursa fotoğraf doğru pozlanır?', 'Tek bir doğru sayı yoktur; doğru EV sahnenin ışığına bağlıdır. Parlak güneşte ISO 100 ile yaklaşık 15 EV, kapalı havada 12 EV, aydınlık bir odada 6–7 EV civarı ayar gerekir. Araç, girdiğiniz ayarın hangi ışık düzeyine uygun olduğunu "Yaklaşık sahne" satırında söyler.'],
    ['1 stop ile 1 EV aynı şey midir?', 'Evet. Bir stop, ışığın iki katına çıkması ya da yarıya inmesidir ve tam olarak 1 EV\'lik değişime karşılık gelir. Diyaframı f/8\'den f/11\'e kısmak, enstantaneyi 1/60\'tan 1/125\'e kısaltmak ya da ISO\'yu 400\'den 200\'e indirmek bir stopluk değişikliktir.'],
    ['ISO pozlama değerini değiştirir mi?', 'Ayarın kendi EV değeri yalnızca diyafram ve enstantaneden hesaplanır, ISO bunu değiştirmez. ISO, aynı ayarla hangi parlaklıktaki sahnenin doğru pozlanacağını değiştirir. Bu yüzden araç iki satır verir: ayarın EV değeri ve ISO 100\'e indirgenmiş ışık değeri.'],
    ['Enstantaneyi nasıl yazmalıyım?', 'Saniyenin kesri olan hızları 1/250 biçiminde, bir saniye ve üzerini doğrudan sayı olarak yazın. 0,5 ile 1/2 aynı kabul edilir. Makine ekranında yalnızca 250 yazıyorsa bu 1/250 saniyedir; tırnak işaretiyle 2" yazıyorsa 2 saniyedir.'],
    ['Negatif EV çıkması hata mıdır?', 'Hayır. f/1 ve 1 saniyeden daha fazla ışık toplayan ayarlar negatif EV verir. Örneğin f/2,8 ile 30 saniyelik bir gece gökyüzü pozlaması yaklaşık −1,9 EV eder. Astrofotoğrafçılıkta negatif değerler olağandır.'],
    ['Eşdeğer ayarlar listesinde hangisini seçmeliyim?', 'Hepsi aynı parlaklıkta fotoğraf verir. Arka planı bulanıklaştırmak istiyorsanız listenin başındaki açık diyaframları, her şeyin net olmasını istiyorsanız kısık diyaframları seçin. Hareketli konuda kısa enstantaneli satırı, elde çekimde titreşimi önleyecek kadar hızlı olanı tercih edin.'],
    ['Video çekiminde de kullanılabilir mi?', 'Evet, formül aynıdır. Videoda enstantane genellikle kare hızının iki katının tersi olarak sabitlenir; 25 kare/saniye için 1/50 saniye yazılır. Bu durumda pozlamayı diyafram, ISO ve ND filtreyle dengelemeniz gerekir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; yazdığınız ayarlar hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['alan-derinligi-hesapla', 'crop-faktoru-hesapla', 'kamera-lens-gorus-acisi-hesapla', 'timelapse-hesapla', 'megapiksel-hesapla'],
};
