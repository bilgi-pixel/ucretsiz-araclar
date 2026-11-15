export default {
  slug: 'gib-gb-cevir',
  title: 'Gibibayt Gigabayt (GiB – GB) Çevirici',
  h1Tail: 'GiB ↔ GB',
  pageTitle: 'GiB GB Çevirici – Gibibayt Gigabayt Dönüştürme ve Fark Hesabı',
  description: 'Gibibaytı (GiB) gigabayta (GB), gigabaytı gibibayta çevirin. 1 GiB = 1,073741824 GB tanımıyla çalışır; bayt, MiB ve MB karşılıklarını da gösterir.',
  card: 'GiB değerini GB\'ye, GB değerini GiB\'ye çevirin; 1024 ve 1000 tabanlı birimler arasındaki farkı net olarak görün.',
  category: 'birim',
  keywords: ['gib gb çevirme', 'gibibayt gigabayt', '1 gib kaç gb', 'gib gb farkı', 'gib to gb', 'gb to gib', 'gibibayt nedir'],
  lead: 'İkili önekli gibibaytı (GiB) ondalık önekli gigabayta (GB) ya da tersine çevirin. Araç uluslararası tanımları kullanır: <strong>1 GiB = 2<sup>30</sup> bayt</strong>, <strong>1 GB = 10<sup>9</sup> bayt</strong>. Bulut sunucu, disk ve bellek değerlerini karşılaştırırken aradaki yaklaşık yüzde 7\'lik farkı kesin olarak hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 16' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['gib', 'Gibibayt (GiB) → Gigabayt (GB)'], ['gb', 'Gigabayt (GB) → Gibibayt (GiB)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const GIB = 1073741824;
    const bayt = v.yon === 'gb' ? x * 1e9 : x * GIB;
    const gb = v.yon === 'gb' ? x : bayt / 1e9;
    const gib = v.yon === 'gb' ? bayt / GIB : x;
    const rGb = ['Gigabayt (GB)', h.sig(gb, 10) + ' GB'];
    const rGib = ['Gibibayt (GiB)', h.sig(gib, 10) + ' GiB'];
    return {
      rows: [
        ...(v.yon === 'gb' ? [rGib, rGb] : [rGb, rGib]),
        ['Bayt', h.sig(bayt, 14) + ' bayt'],
        ['Mebibayt (MiB)', h.sig(bayt / 1048576, 10) + ' MiB'],
        ['Megabayt (MB)', h.sig(bayt / 1e6, 10) + ' MB'],
        ['Sayısal fark (GB − GiB)', h.sig(gb - gib, 6)],
      ],
      note: '1 GiB = 1.073.741.824 bayt, 1 GB = 1.000.000.000 bayt. Aynı miktar GB olarak yazıldığında sayı yaklaşık %7,37 daha büyük görünür.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'gib' }, out: { 'Gigabayt (GB)': '1,073741824 GB', 'Bayt': '1.073.741.824 bayt', 'Mebibayt (MiB)': '1.024 MiB' } },
    { in: { deger: '1000', yon: 'gb' }, out: { 'Gibibayt (GiB)': '931,3225746 GiB', 'Megabayt (MB)': '1.000.000 MB' } },
    { in: { deger: '16', yon: 'gib' }, out: { 'Gigabayt (GB)': '17,17986918 GB', 'Bayt': '17.179.869.184 bayt' } },
    { in: { deger: '500', yon: 'gb' }, out: { 'Gibibayt (GiB)': '465,6612873 GiB' } },
    { in: { deger: '256', yon: 'gb' }, out: { 'Gibibayt (GiB)': '238,4185791 GiB', 'Sayısal fark (GB − GiB)': '17,5814' } },
    { in: { deger: '1', yon: 'gb' }, out: { 'Gibibayt (GiB)': '0,9313225746 GiB', 'Bayt': '1.000.000.000 bayt' } },
    { in: { deger: '0', yon: 'gib' }, out: { 'Gigabayt (GB)': '0 GB' } },
    { in: { deger: '', yon: 'gib' }, error: true },
    { in: { deger: '-4', yon: 'gb' }, error: true },
  ],
  howto: [
    '"Değer" alanına elinizdeki miktarı yazın; ondalıklı değerler için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden değerin GiB mi yoksa GB mi olduğunu belirten seçeneği işaretleyin.',
    '"Çevir" düğmesine basın. İlk satır çevrilen değerdir; ardından bayt, MiB ve MB karşılıkları ile iki gösterim arasındaki sayısal fark gelir.',
    'Sonuçları kopyalayıp teklif, şartname ya da sunucu yapılandırma notunuza ekleyebilirsiniz.',
  ],
  sections: [
    { h: 'GiB ve GB neden iki ayrı birim?', p: [
      'Bilgisayar belleği ikinin kuvvetleriyle düzenlendiği için ilk yıllardan itibaren 1024 baytlık gruplara "kilobayt" dendi. Oysa "kilo", "mega" ve "giga" önekleri ölçü sisteminde bin, milyon ve milyar anlamına gelir. Küçük birimlerde göz ardı edilebilen bu tutarsızlık, kapasiteler büyüdükçe belirgin bir farka dönüştü.',
      'Belirsizliği gidermek amacıyla uluslararası standart kuruluşları ikili katlar için ayrı önekler tanımladı: kibi (Ki), mebi (Mi), gibi (Gi), tebi (Ti). Bu adlandırmaya göre <strong>gibibayt</strong> her zaman 1024 × 1024 × 1024 = 1.073.741.824 bayttır; <strong>gigabayt</strong> ise 1.000.000.000 bayttır. Böylece "GiB" gördüğünüzde 1024 tabanının, "GB" gördüğünüzde kural olarak 1000 tabanının kullanıldığını bilirsiniz.',
    ] },
    { h: 'Çeviri formülleri', p: [
      'İki birim de bayta bağlı olduğundan çeviri katsayısı sabittir: <strong>GB = GiB × 1,073741824</strong> ve <strong>GiB = GB ÷ 1,073741824</strong>. İkinci formül, GB değerini yaklaşık 0,9313 ile çarpmakla aynıdır.',
      'Çözümlü örnek 1: 16 GiB bellek, 16 × 1,073741824 = 17,17986918 GB eder; bayt olarak 17.179.869.184. Çözümlü örnek 2: Etiketinde 1000 GB (1 TB) yazan disk, 1000 ÷ 1,073741824 = 931,3225746 GiB\'dir. Çözümlü örnek 3: 256 GB\'lik bir SSD 238,4185791 GiB tutar; iki sayı arasındaki fark 17,5814\'tür ve bu "kayıp" gibi görünen kısım yalnızca birim farkıdır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 GiB</strong> = 1,073741824 GB',
      '<strong>4 GiB</strong> = 4,294967296 GB',
      '<strong>8 GiB</strong> = 8,589934592 GB',
      '<strong>32 GiB</strong> = 34,359738368 GB',
      '<strong>64 GiB</strong> = 68,719476736 GB',
      '<strong>1 GB</strong> = 0,9313225746 GiB',
      '<strong>32 GB</strong> yaklaşık 29,80 GiB',
      '<strong>64 GB</strong> yaklaşık 59,60 GiB',
      '<strong>128 GB</strong> yaklaşık 119,21 GiB',
      '<strong>512 GB</strong> yaklaşık 476,84 GiB',
    ] },
    { h: 'Hangi ortam hangi birimi kullanır?', p: [
      'Depolama aygıtı üreticileri kapasiteyi ondalık gigabaytla belirtir. Bellek modülleri ise ikili düzende üretilir; "16 GB RAM" denilen modül aslında 16 GiB\'dir. İşletim sistemleri arasında da fark vardır: bazıları disk boyutunu 1024 tabanıyla hesaplayıp "GB" etiketiyle gösterir, bazıları ondalık hesap yapar, bazı komut satırı araçları ise GiB kısaltmasını açıkça kullanır.',
      'Bulut hizmetlerinde sanal sunucu belleği ve disk birimleri çoğunlukla GiB ile tanımlanır ve faturalandırılır; veri aktarım kotaları ise GB ile ifade edilebilir. Konteyner ve orkestrasyon araçlarının yapılandırma dosyalarında <code>Gi</code> ve <code>G</code> son ekleri farklı anlam taşır: ilki 1024 tabanlı, ikincisi 1000 tabanlıdır. Bellek sınırını yanlış son ekle yazmak, uygulamaya düşündüğünüzden yüzde 7 az kaynak vermek anlamına gelir.',
    ] },
    { h: 'Fark birim büyüdükçe artar', p: [
      'İkili ve ondalık önekler arasındaki oran her basamakta 1,024 ile çarpılır. Kilobayt düzeyinde fark yüzde 2,4\'tür; megabaytta yüzde 4,86, gigabaytta yüzde 7,37, terabaytta yüzde 9,95 olur. Bu nedenle birkaç megabaytlık dosyalarda kimsenin fark etmediği ayrım, terabaytlarca depolama satın alırken onda bire yaklaşan bir tutarsızlık olarak karşınıza çıkar. Kapasite planlaması ve maliyet hesabı yaparken tüm değerleri önce tek bir birime, tercihen bayta ya da GiB\'ye çevirmek hata riskini azaltır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      '<strong>Yönü ters seçmek:</strong> GiB daha büyük birimdir; dolayısıyla aynı miktar GiB ile ifade edildiğinde sayı küçülür. 500 GB\'yi GiB\'ye çevirdiğinizde 500\'den küçük bir sonuç (465,66) görmelisiniz.',
      '<strong>Gb ile GB\'yi karıştırmak:</strong> Küçük b bit demektir. Gb gigabit olup bu araçtaki bayt tabanlı birimlerle sekiz kat farklıdır.',
      'Araç negatif değer kabul etmez; sonuçları on anlamlı basamağa kadar gösterir. Bu sayfa birim çevirisi yapar; diskinizdeki biçimlendirme sonrası kullanılabilir alanı hesaplamaz, çünkü dosya sisteminin kendi ayırdığı alan aygıta ve ayarlara göre değişir.',
    ] },
  ],
  faq: [
    ['1 GiB kaç GB eder?', '1 GiB tam olarak 1,073741824 GB\'dir. Bayt olarak 1.073.741.824, yani 2 üzeri 30 bayta eşittir.'],
    ['1 GB kaç GiB eder?', '1 GB yaklaşık 0,9313225746 GiB\'dir. Pratik hesapta GB değerini 0,931 ile çarpmak yeterli olur.'],
    ['GiB mi büyük, GB mi?', 'GiB daha büyüktür. Bir gibibayt, bir gigabayttan 73.741.824 bayt, yani yaklaşık yüzde 7,37 fazladır.'],
    ['GiB nasıl okunur?', '"Gibibayt" diye okunur. Önekteki "bi", ikili anlamındaki "binary" sözcüğünden gelir. Benzer biçimde KiB kibibayt, MiB mebibayt, TiB tebibayt olarak okunur.'],
    ['Bilgisayarım 16 GB RAM gösteriyor, bu GiB mi?', 'Evet. Bellek modülleri ikili düzende üretildiği için 16 GB olarak anılan bellek 16 GiB\'dir ve 17.179.869.184 bayt içerir. Ondalık gigabayt olarak yazılsa 17,18 GB olurdu.'],
    ['512 GB SSD neden 476 GB görünüyor?', '512 GB etiketli sürücü 512.000.000.000 bayt içerir. Bu miktar 1024 tabanıyla bölündüğünde yaklaşık 476,84 GiB eder. İşletim sistemi bunu "GB" etiketiyle gösterdiği için eksikmiş izlenimi doğar.'],
    ['Yapılandırma dosyasında Gi ve G farkı önemli mi?', 'Evet. Gi son eki gibibaytı, G son eki gigabaytı ifade eder. 4Gi yaklaşık 4,29 milyar bayt, 4G ise 4 milyar bayttır; aradaki fark bellek sınırına dayanan uygulamalarda sorun yaratabilir. Kullandığınız aracın belgelerindeki tanımı doğrulayın.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['gb-tb-cevir', 'mb-gb-cevir', 'kb-mb-cevir', 'bit-bayt-cevir', 'birim-donustur'],
};
