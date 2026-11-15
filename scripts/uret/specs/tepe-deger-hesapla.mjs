export default {
  slug: 'tepe-deger-hesapla',
  title: 'Mod (Tepe Değer) Hesaplama',
  h1Tail: 'en sık tekrar eden değer',
  pageTitle: 'Mod (Tepe Değer) Hesaplama – En Çok Tekrar Eden Sayıyı Bulma',
  description: 'Sayı dizinizin modunu (tepe değerini) bulun. En sık tekrar eden değeri, tekrar sayısını, birden fazla mod varsa hepsini ve sıklık tablosunu gösterir.',
  card: 'Bir veri grubunda en çok tekrar eden değeri (modu) bulun; tekrar sayısı, çok modlu durumlar ve sıklık tablosuyla.',
  category: 'matematik',
  keywords: ['mod hesaplama', 'tepe değer hesaplama', 'mod nasıl bulunur', 'tepe değer nedir', 'en çok tekrar eden sayı', 'istatistik mod bulma', 'frekans tablosu oluşturma'],
  lead: 'Verilerinizi yazın; araç her değerin kaç kez geçtiğini sayar ve en sık tekrar eden değeri, yani <strong>modu (tepe değeri)</strong> bulur. Birden fazla tepe değer varsa hepsini listeler, hiç yoksa bunu açıkça belirtir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 38 40 39 40 41 40 39', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Ondalık için virgül kullanın.', wide: true },
  ],
  compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const say = new Map();
    for (const x of a) {
      const k = x === 0 ? 0 : x;
      say.set(k, (say.get(k) || 0) + 1);
    }
    const tablo = [...say.entries()].sort((p, q) => p[0] - q[0]);
    const enCok = Math.max(...tablo.map((t) => t[1]));
    const enAz = Math.min(...tablo.map((t) => t[1]));
    const modlar = tablo.filter((t) => t[1] === enCok).map((t) => t[0]);
    const farkli = tablo.length;
    const yok = farkli > 1 && enCok === enAz;
    let tur;
    if (yok) tur = 'Modu yok';
    else if (modlar.length === 1) tur = 'Tek modlu (unimodal)';
    else if (modlar.length === 2) tur = 'İki modlu (bimodal)';
    else tur = 'Çok modlu (multimodal)';
    const satirlar = tablo.slice(0, 300).map((t) => `${h.fmt(t[0], 6)}\t${t[1]}`);
    return {
      rows: [
        ['Mod (tepe değer)', yok ? 'Yok' : modlar.map((x) => h.fmt(x, 6)).join('; ')],
        ['Tekrar sayısı', yok ? `Her değer ${enCok} kez` : `${enCok} kez`],
        ['Dağılım türü', tur],
        ['Veri sayısı', String(a.length)],
        ['Farklı değer sayısı', String(farkli)],
      ],
      text: 'Değer\tSıklık\n' + satirlar.join('\n') + (tablo.length > 300 ? '\n…' : ''),
      note: yok
        ? 'Bütün değerler eşit sayıda geçtiği için öne çıkan bir tepe değer yoktur.'
        : 'Altta her değerin kaç kez geçtiğini gösteren sıklık (frekans) tablosu yer alır.',
    };
  },
  cases: [
    { in: { sayilar: '38 40 39 40 41 40 39' }, out: { 'Mod (tepe değer)': '40', 'Tekrar sayısı': '3 kez', 'Dağılım türü': 'Tek modlu (unimodal)', 'Veri sayısı': '7', 'Farklı değer sayısı': '4' }, text: 'Değer\tSıklık\n38\t1\n39\t2\n40\t3\n41\t1' },
    { in: { sayilar: '1 2 2 3 3 4' }, out: { 'Mod (tepe değer)': '2; 3', 'Tekrar sayısı': '2 kez', 'Dağılım türü': 'İki modlu (bimodal)' } },
    { in: { sayilar: '1 2 3 4' }, out: { 'Mod (tepe değer)': 'Yok', 'Dağılım türü': 'Modu yok', 'Tekrar sayısı': 'Her değer 1 kez' } },
    { in: { sayilar: '4 4 4' }, out: { 'Mod (tepe değer)': '4', 'Tekrar sayısı': '3 kez', 'Farklı değer sayısı': '1' } },
    { in: { sayilar: '1,5 2 1,5 3' }, out: { 'Mod (tepe değer)': '1,5', 'Tekrar sayısı': '2 kez' } },
    { in: { sayilar: '1 1 2 2 3 3' }, out: { 'Mod (tepe değer)': 'Yok', 'Tekrar sayısı': 'Her değer 2 kez' } },
    { in: { sayilar: '3 1 2 1 3 2 4' }, out: { 'Mod (tepe değer)': '1; 2; 3', 'Dağılım türü': 'Çok modlu (multimodal)' } },
    { in: { sayilar: '2 3 3 5 7 3 5' }, out: { 'Mod (tepe değer)': '3', 'Tekrar sayısı': '3 kez' } },
    { in: { sayilar: '   ' }, error: true },
    { in: { sayilar: '3 3 x' }, error: true },
  ],
  howto: [
    'Verilerinizi "Sayılar" kutusuna yazın. Sıralı olmaları gerekmez; her tekrarı ayrı ayrı yazmanız yeterlidir.',
    'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Virgül ondalık işareti sayıldığından sayıların arasına virgül koymayın.',
    '"Hesapla" düğmesine basın. İlk satır modu, ikinci satır bu değerin kaç kez geçtiğini, üçüncü satır dağılımın tek, iki ya da çok modlu olduğunu gösterir.',
    'Sonuç kutusunun altındaki sıklık tablosunda her değerin kaç kez tekrar ettiğini inceleyin; tabloyu kopyalayıp bir hesap tablosuna yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'Mod (tepe değer) nedir?', p: [
      'Mod, bir veri grubunda en çok tekrar eden değerdir. Türkçe ders kitaplarında <strong>tepe değer</strong> adıyla anılır; çünkü veriler bir sütun grafiğine döküldüğünde en yüksek sütun, yani grafiğin tepesi bu değere denk gelir. Aritmetik ortalama ve medyan (ortanca) ile birlikte üç temel merkezî eğilim ölçüsünden biridir.',
      'Modu diğer ikisinden ayıran özellik, hesap gerektirmemesidir: toplama ya da bölme yapılmaz, yalnızca sayılır. Bu sayede sayısal olmayan verilerde de anlamlıdır. En çok satılan ayakkabı numarası, en sık tercih edilen renk ya da bir ankette en çok işaretlenen seçenek birer moddur; bu tür verilerin ortalaması alınamaz ama modu bulunabilir.',
    ] },
    { h: 'Mod nasıl bulunur? Çözümlü örnek', p: [
      'Yöntem basittir: her farklı değerin kaç kez geçtiği sayılır ve en büyük sayıya sahip olan değer mod olarak alınır. Bu sayım tablosuna sıklık ya da frekans tablosu denir.',
      'Bir ayakkabı mağazasında gün içinde satılan yedi çiftin numaraları 38, 40, 39, 40, 41, 40 ve 39 olsun. Sayım yapıldığında 38 bir kez, 39 iki kez, 40 üç kez, 41 bir kez geçer. En yüksek sıklık üçtür ve 40 numaraya aittir; dolayısıyla mod <strong>40</strong>, tekrar sayısı 3\'tür. Aynı veriyi araca yazdığınızda bu sonucu ve dört satırlık sıklık tablosunu görürsünüz. Mağaza için anlamı açıktır: stokta en çok bulundurulması gereken numara 40\'tır.',
    ] },
    { h: 'Birden fazla mod ya da hiç mod olmaması', p: [
      'Ortalama ve medyandan farklı olarak mod tek olmak zorunda değildir. En yüksek sıklığı iki değer paylaşıyorsa dağılım <strong>iki modlu</strong> (bimodal) olur: 1, 2, 2, 3, 3, 4 dizisinde hem 2 hem 3 ikişer kez geçer ve iki değer de moddur. Üç ya da daha fazla değer aynı en yüksek sıklığa sahipse dağılım <strong>çok modlu</strong> olarak adlandırılır.',
      'Bütün değerler aynı sayıda geçiyorsa öne çıkan bir değer yoktur ve verinin <strong>modu yoktur</strong>. 1, 2, 3, 4 dizisinde her sayı bir kez, 1, 1, 2, 2, 3, 3 dizisinde her sayı iki kez geçer; iki durumda da tepe değer bulunmaz. Bu araç okul müfredatındaki bu yaygın tanımı izler. Bazı kaynaklar böyle durumlarda tüm değerleri mod sayar; ödev ya da sınavda hangi tanımın beklendiğini öğretmeninizin kullandığı kaynağa göre kontrol edin. Dizideki bütün sayılar aynıysa, örneğin 4, 4, 4 ise mod doğal olarak o sayıdır.',
      'İki modlu bir dağılım çoğu zaman verinin iki ayrı gruptan geldiğine işaret eder. Kadın ve erkek ayakkabı numaraları tek listede toplandığında ya da bir sınavda konuyu bilenlerle bilmeyenler belirgin biçimde ayrıştığında iki tepe ortaya çıkar.',
    ] },
    { h: 'Mod, medyan ve ortalama ne zaman kullanılır?', ul: [
      '<strong>Mod:</strong> En yaygın olanı sorduğunuzda. Beden, numara, model, renk gibi kategorilerde ve stok, üretim planı, menü kararlarında kullanılır.',
      '<strong>Medyan:</strong> Tipik değeri sorduğunuzda ve veride uç değerler varsa. Gelir, kira, fiyat gibi çarpık dağılımlarda tercih edilir.',
      '<strong>Ortalama:</strong> Toplamı eşit paylaştırmak istediğinizde ve veri dengeli dağılıyorsa. Not ortalaması ve kişi başı tüketim gibi hesaplarda kullanılır.',
    ], p: [
      'Simetrik ve tek tepeli bir dağılımda üç ölçü birbirine çok yakın çıkar. Aralarındaki fark büyüdükçe dağılımın çarpık olduğu anlaşılır; bu yüzden üçünü birlikte incelemek veriyi tanımanın hızlı bir yoludur.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, modu tekrar sayısıyla karıştırmaktır. Yukarıdaki örnekte mod 3 değil 40\'tır; 3 yalnızca 40\'ın kaç kez geçtiğidir. İkinci hata, en büyük sayıyı mod sanmaktır; modun değerin büyüklüğüyle ilgisi yoktur, yalnızca sıklığa bakılır. Üçüncü hata, iki değer eşit sıklıkta zirvedeyken yalnızca birini yazmaktır.',
      'Ölçümle elde edilen ondalıklı verilerde, örneğin boy ya da ağırlık ölçümlerinde, değerlerin neredeyse hiçbiri tekrar etmez ve ham veriden bulunan mod anlam taşımaz. Bu durumda veriyi önce yuvarlamak ya da sınıflara ayırmak gerekir; en çok gözlem içeren sınıfa <strong>mod sınıfı</strong> denir. Araç yalnızca birebir eşit değerleri aynı sayar: 2,5 ile 2,50 aynıdır, 2,5 ile 2,51 farklıdır.',
    ] },
    { h: 'Sınırlar', p: [
      'Bu sayfa yalnızca sayılarla çalışır; sözcük ya da harf girildiğinde hata verir. Kategorik veriniz varsa her kategoriye bir numara verip o numaraları yazabilirsiniz. Gruplandırılmış frekans tablolarında mod, mod sınıfının sınırları kullanılarak ayrı bir formülle kestirilir ve bu araç o hesabı yapmaz. Sıklık tablosunda en fazla üç yüz farklı değer listelenir; hesap ise girilen bütün veriyle yapılır.',
    ] },
  ],
  faq: [
    ['Mod ile tepe değer aynı şey midir?', 'Evet. İkisi de bir veri grubunda en çok tekrar eden değeri ifade eder. Tepe değer Türkçe karşılıktır; mod ise aynı kavramın uluslararası adıdır.'],
    ['Bir veri grubunun birden fazla modu olabilir mi?', 'Olabilir. En yüksek tekrar sayısını birden fazla değer paylaşıyorsa hepsi moddur. İki mod varsa dağılıma iki modlu, daha fazlaysa çok modlu denir.'],
    ['Hiçbir sayı tekrar etmiyorsa mod nedir?', 'Bu araçta ve okul kitaplarındaki yaygın tanımda böyle bir verinin modu yoktur. Bütün değerler eşit sayıda geçtiğinde öne çıkan bir tepe değer bulunmaz.'],
    ['Mod ile mod alma (kalan bulma) aynı işlem mi?', 'Hayır. İstatistikteki mod en sık tekrar eden değerdir. Programlama ve sayı kuramındaki mod alma ise bir bölme işleminden kalanı bulmaktır; yalnızca adları benzer.'],
    ['Mod sayısal olmayan verilerde kullanılabilir mi?', 'Evet, modun en güçlü yanı budur. En çok satılan beden ya da en çok tercih edilen renk birer moddur. Bu araçta hesaplamak için kategorilere numara vermeniz yeterlidir.'],
    ['Mod mu, ortalama mı daha güvenilirdir?', 'Soruya göre değişir. En yaygın değeri arıyorsanız mod, verinin dengesini arıyorsanız ortalama, uç değerlerden etkilenmeyen tipik değeri arıyorsanız medyan uygundur. Küçük veri gruplarında mod tesadüfen oluşabileceği için tek başına yorumlanmamalıdır.'],
    ['Sıklık tablosunu başka bir programa aktarabilir miyim?', 'Evet. Tablo sekmeyle ayrılmış iki sütun olarak üretilir; kopyalayıp bir hesap tablosuna yapıştırdığınızda değerler ve sıklıklar ayrı sütunlara yerleşir.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Sayım işlemi tarayıcınızın içinde yapılır; verileriniz sunucuya gönderilmez ve sayfayı kapattığınızda kaybolur.'],
  ],
  related: ['medyan-hesapla', 'ortalama-hesapla', 'istatistik-hesapla', 'aciklik-hesapla', 'mod-alma-hesapla', 'sayi-siralama'],
};
