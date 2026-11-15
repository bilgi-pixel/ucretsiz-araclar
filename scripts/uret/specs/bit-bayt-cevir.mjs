export default {
  slug: 'bit-bayt-cevir',
  title: 'Bit Bayt Çevirici',
  h1Tail: 'bit ↔ bayt',
  pageTitle: 'Bit Bayt Çevirici – Bit Kaç Bayt, Bayt Kaç Bit Hesaplama',
  description: 'Biti bayta, baytı bite çevirin. 1 bayt = 8 bit eşitliğiyle çalışır; kilobit, kilobayt, megabit ve megabayt karşılıklarını da aynı anda gösterir.',
  card: 'Bit değerini bayta, bayt değerini bite çevirin; kilobit, megabit, kilobayt ve megabayt karşılıklarıyla birlikte.',
  category: 'birim',
  keywords: ['bit bayt çevirme', '1 bayt kaç bit', 'bit kaç bayt', 'bit byte dönüştürme', 'bit to byte', '8 bit 1 bayt', 'kilobit kilobayt'],
  lead: 'Bit cinsinden bir veri miktarını bayta ya da baytı bite çevirin. Araç <strong>1 bayt = 8 bit</strong> eşitliğini kullanır ve sonucu kilobit, megabit, kilobayt ve megabayt olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 64' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['bit', 'Bit → Bayt'], ['bayt', 'Bayt → Bit']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const bit = v.yon === 'bayt' ? x * 8 : x;
    const bayt = bit / 8;
    const rBayt = ['Bayt', h.sig(bayt, 12) + ' bayt'];
    const rBit = ['Bit', h.sig(bit, 12) + ' bit'];
    return {
      rows: [
        ...(v.yon === 'bayt' ? [rBit, rBayt] : [rBayt, rBit]),
        ['Kilobit (1000 bit)', h.sig(bit / 1000, 8) + ' kbit'],
        ['Megabit (1.000.000 bit)', h.sig(bit / 1e6, 8) + ' Mbit'],
        ['Kilobayt (1024 bayt)', h.sig(bayt / 1024, 8) + ' KB'],
        ['Megabayt (1.048.576 bayt)', h.sig(bayt / 1048576, 8) + ' MB'],
      ],
      note: '1 bayt = 8 bit. Bit katları ondalık (1 kbit = 1000 bit), bayt katları ikili (1 KB = 1024 bayt) olarak gösterilir.',
    };
  },
  cases: [
    { in: { deger: '64', yon: 'bit' }, out: { 'Bayt': '8 bayt', 'Bit': '64 bit' } },
    { in: { deger: '1024', yon: 'bayt' }, out: { 'Bit': '8.192 bit', 'Kilobayt (1024 bayt)': '1 KB', 'Kilobit (1000 bit)': '8,192 kbit' } },
    { in: { deger: '1', yon: 'bayt' }, out: { 'Bit': '8 bit' } },
    { in: { deger: '100', yon: 'bit' }, out: { 'Bayt': '12,5 bayt' } },
    { in: { deger: '1000000', yon: 'bit' }, out: { 'Bayt': '125.000 bayt', 'Megabit (1.000.000 bit)': '1 Mbit', 'Kilobayt (1024 bayt)': '122,07031 KB' } },
    { in: { deger: '1048576', yon: 'bayt' }, out: { 'Bit': '8.388.608 bit', 'Megabayt (1.048.576 bayt)': '1 MB' } },
    { in: { deger: '0', yon: 'bit' }, out: { 'Bayt': '0 bayt' } },
    { in: { deger: 'sekiz', yon: 'bit' }, error: true },
    { in: { deger: '-8', yon: 'bit' }, error: true },
  ],
  howto: [
    '"Değer" alanına bit ya da bayt cinsinden miktarı yazın.',
    '"Çeviri yönü" listesinden bitten bayta mı, bayttan bite mi çevireceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satırda aradığınız sonuç, alt satırlarda kilobit, megabit, kilobayt ve megabayt karşılıkları görünür.',
    'Gerekirse sonuçları kopyalayıp ders notunuza, ödevinize ya da teknik belgenize yapıştırın.',
  ],
  sections: [
    { h: 'Bit ve bayt nedir?', p: [
      'Bit, dijital bilginin en küçük birimidir ve yalnızca iki değerden birini alabilir: 0 ya da 1. Adı İngilizce "binary digit", yani ikili basamak sözünden gelir. Tek bir bit açık-kapalı, doğru-yanlış, var-yok gibi iki durumlu bir bilgiyi tutar. Daha karmaşık bilgileri saklamak için bitler yan yana getirilir.',
      'Bayt, sekiz bitten oluşan gruptur. Sekiz bit yan yana geldiğinde 2<sup>8</sup> = 256 farklı birleşim elde edilir; bu da 0 ile 255 arasındaki tam sayıları ya da temel bir karakter kümesindeki harfleri göstermeye yeter. Bilgisayar belleği ve dosya boyutları bu yüzden bayt ve onun katlarıyla ölçülür.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'İki birim arasındaki ilişki sabittir: <strong>bayt = bit ÷ 8</strong> ve <strong>bit = bayt × 8</strong>. Burada 1024 ile 1000 arasındaki tartışma yoktur; bir bayt her zaman sekiz bittir.',
      'Örnek 1: 64 bitlik bir sayı 64 ÷ 8 = 8 bayt yer tutar. Örnek 2: 1024 baytlık bir veri bloğu 1024 × 8 = 8.192 bit eder; bu aynı zamanda 1 KB ve 8,192 kilobittir. Örnek 3: 100 bit, 100 ÷ 8 = 12,5 bayttır; bit sayısı sekizin katı olmadığında sonuç kesirli çıkar ve pratikte bu veriyi saklamak için 13 bayt gerekir. Örnek 4: 1.000.000 bit, yani 1 megabit, 125.000 bayttır.',
    ] },
    { h: 'Küçük b ve büyük B farkı', p: [
      'Kısaltmalarda küçük <code>b</code> biti, büyük <code>B</code> baytı gösterir. Bu yüzden <code>Mb</code> megabit, <code>MB</code> megabayttır ve ikisi arasında sekiz kat fark vardır. İnternet servis sağlayıcıları hızı megabit/saniye (Mbps) olarak duyurur; tarayıcılar ve indirme yöneticileri ise ilerlemeyi megabayt/saniye olarak gösterir. 100 Mbps\'lik bir bağlantıda indirme hızının en fazla 12,5 MB/sn görünmesi bu sekiz katlık farktan kaynaklanır.',
      'Bir başka gelenek farkı da öneklerdedir. Ağ ve iletişim alanında bit katları ondalıktır: 1 kilobit 1000 bit, 1 megabit 1.000.000 bittir. Depolama ve bellek alanında bayt katları çoğunlukla ikili sayılır: 1 kilobayt 1024 bayt, 1 megabayt 1.048.576 bayttır. Araç her birim ailesini kendi yaygın geleneğiyle gösterir ve hangi tanımı kullandığını satır başlığında belirtir.',
    ] },
    { h: 'Bit genişliklerinin karşılıkları', ul: [
      '<strong>4 bit</strong> = 0,5 bayt (bir onaltılık basamak; "nibble" olarak anılır)',
      '<strong>8 bit</strong> = 1 bayt (256 farklı değer)',
      '<strong>16 bit</strong> = 2 bayt (65.536 farklı değer)',
      '<strong>24 bit</strong> = 3 bayt (yaklaşık 16,7 milyon renk)',
      '<strong>32 bit</strong> = 4 bayt (IPv4 adresi uzunluğu)',
      '<strong>64 bit</strong> = 8 bayt',
      '<strong>128 bit</strong> = 16 bayt (IPv6 adresi uzunluğu)',
      '<strong>256 bit</strong> = 32 bayt',
      '<strong>512 bit</strong> = 64 bayt',
      '<strong>2048 bit</strong> = 256 bayt',
    ] },
    { h: 'Hangi durumlarda bu çeviriye gerek duyulur?', p: [
      'Programlama derslerinde veri tiplerinin bellekte kapladığı alan bayt olarak, sayının alabileceği değer aralığı ise bit sayısı üzerinden anlatılır. 32 bitlik bir tam sayının 4 bayt tuttuğunu bilmek, bir milyon elemanlı dizinin yaklaşık 4 milyon bayt gerektirdiğini hesaplamanızı sağlar. Şifreleme anahtarları bit uzunluğuyla anılır, ancak dosyaya yazılırken bayt olarak saklanır; 256 bitlik bir anahtar 32 bayttır ve onaltılık yazıldığında 64 karakter tutar.',
      'Görüntü ve ses alanında da bit derinliği kullanılır. Piksel başına 24 bit renk derinliği olan sıkıştırılmamış bir görüntüde her piksel 3 bayt yer kaplar. 16 bit örnek derinliğindeki ses kaydında her örnek 2 bayttır. Ağ tarafında ise paket boyutları bayt, hat kapasiteleri bit ile ifade edildiğinden iki birim arasında sürekli gidip gelmek gerekir.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Tarihte farklı uzunlukta baytlar kullanan sistemler olmuştur; bugün ise bayt, standartlarda ve uygulamada sekiz bit olarak kabul edilir. Belirsizliği tümüyle ortadan kaldırmak isteyen ağ belgeleri bu yüzden "oktet" sözcüğünü tercih eder; oktet kesin olarak sekiz bit demektir.',
      'Araç negatif değer kabul etmez. Kesirli bit sayıları fiziksel olarak anlamlı olmasa da ortalama ya da oran hesaplarında karşınıza çıkabileceği için ondalıklı girişe izin verilir. Sonuçlar bit ve bayt satırlarında on iki, diğer satırlarda sekiz anlamlı basamağa kadar gösterilir.',
    ] },
  ],
  faq: [
    ['1 bayt kaç bittir?', '1 bayt 8 bittir. Bu oran sabittir; depolama ya da ağ bağlamına göre değişmez.'],
    ['1 bit kaç bayttır?', '1 bit, 1 ÷ 8 = 0,125 bayttır. Sekiz bit bir araya geldiğinde bir bayt oluşur.'],
    ['1 kilobayt kaç bittir?', '1024 baytlık kilobayt 8.192 bit eder. Ondalık tanımla 1000 baytlık kilobayt ise 8.000 bittir.'],
    ['1 megabit kaç megabayttır?', '1 megabit 1.000.000 bit, yani 125.000 bayttır. Bu, ondalık tanımla 0,125 MB; 1.048.576 baytlık megabaytla yaklaşık 0,1192 MB eder.'],
    ['Bir harf kaç bit tutar?', 'Temel Latin harfleri yaygın kodlamalarda 1 bayt, yani 8 bit tutar. Türkçeye özgü ç, ğ, ı, ö, ş, ü harfleri UTF-8 kodlamasında 2 bayt, yani 16 bit yer kaplar.'],
    ['Mb ile MB aynı mıdır?', 'Hayır. Mb megabit, MB megabayttır. Megabayt, megabitin sekiz katı büyüklüğündedir; hız ve boyut karşılaştırmalarında bu ayrıma dikkat etmek gerekir.'],
    ['Nibble nedir?', 'Nibble, dört bitlik gruba verilen addır ve yarım bayta eşittir. Bir nibble 16 farklı değer alabildiği için tek bir onaltılık basamakla gösterilir; iki nibble bir bayt eder.'],
    ['Yazdığım sayılar saklanıyor mu?', 'Hayır. Çeviri tamamen tarayıcınızda yapılır; girdiğiniz değer sunucuya gönderilmez ve hiçbir yerde tutulmaz.'],
  ],
  related: ['mbps-mbs-cevir', 'kb-mb-cevir', 'mb-gb-cevir', 'sayi-tabani-donustur', 'birim-donustur'],
};
