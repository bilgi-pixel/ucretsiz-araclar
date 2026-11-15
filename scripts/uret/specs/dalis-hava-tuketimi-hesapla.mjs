export default {
  slug: 'dalis-hava-tuketimi-hesapla',
  title: 'Tüp Hava Tüketimi (SAC) Hesaplama',
  h1Tail: 'dalışta yüzey hava tüketimi',
  pageTitle: 'Tüp Hava Tüketimi (SAC / RMV) Hesaplama – Dalış Hava Tüketimi',
  description: 'Dalıştaki tüp basıncı düşüşü, ortalama derinlik ve süreden yüzey hava tüketim oranınızı (SAC) litre/dakika ve bar/dakika olarak hesaplayın.',
  card: 'Tüp hacmi, basınç düşüşü, ortalama derinlik ve süreden yüzey hava tüketiminizi (SAC/RMV) litre/dakika olarak bulun.',
  category: 'gunluk',
  keywords: ['sac hesaplama', 'dalış hava tüketimi', 'rmv hesaplama', 'tüp hava tüketimi', 'yüzey hava tüketimi', 'dalış tüpü kaç dakika yeter', 'sac rate hesaplama'],
  lead: 'Bir dalışta harcadığınız havayı yüzey koşullarına indirgeyerek <strong>yüzey hava tüketim oranınızı (SAC)</strong> hesaplayın. Araç, tüp hacmi ile basınç düşüşünden tüketilen hava miktarını bulur, ortalama derinlikteki ortam basıncına ve dalış süresine böler.',
  button: 'Hesapla',
  inputs: [
    { id: 'tup', label: 'Tüp hacmi (litre)', type: 'number', placeholder: 'Örn. 12', value: '12', hint: 'Tüpün su hacmi: 10, 12, 15 litre gibi.' },
    { id: 'baslangic', label: 'Başlangıç basıncı (bar)', type: 'number', placeholder: 'Örn. 200' },
    { id: 'bitis', label: 'Bitiş basıncı (bar)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'derinlik', label: 'Ortalama derinlik (m)', type: 'number', placeholder: 'Örn. 20', hint: 'En derin nokta değil, dalışın ortalama derinliği.' },
    { id: 'sure', label: 'Dalış süresi (dakika)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'su', label: 'Su türü', type: 'select', options: [['tuzlu', 'Deniz (tuzlu su)'], ['tatli', 'Göl / tatlı su']] },
  ],
  compute(v, h) {
    const tup = h.pos(v.tup, 'Tüp hacmi');
    const p1 = h.pos(v.baslangic, 'Başlangıç basıncı');
    const p2 = h.nonneg(v.bitis, 'Bitiş basıncı');
    const d = h.nonneg(v.derinlik, 'Ortalama derinlik');
    const t = h.pos(v.sure, 'Dalış süresi');
    if (tup > 50) h.err('Tüp hacmi 50 litreden büyük olamaz; tüpün su hacmini litre olarak yazın (örn. 12).');
    if (p1 > 350) h.err('Başlangıç basıncı 350 bardan büyük olamaz; değeri bar cinsinden yazın.');
    if (p2 >= p1) h.err('Bitiş basıncı başlangıç basıncından küçük olmalı; iki değeri kontrol edin.');
    if (d > 100) h.err('Ortalama derinlik 100 metreden büyük olamaz.');
    const metreBasinaBar = v.su === 'tatli' ? 10.3 : 10;
    const ortam = d / metreBasinaBar + 1;
    const dusus = p1 - p2;
    const hava = dusus * tup;
    const rmv = hava / t / ortam;
    const sacBar = dusus / t / ortam;
    return {
      rows: [
        ['Yüzey hava tüketimi (SAC/RMV)', h.fmt(rmv, 1) + ' litre/dakika'],
        ['Basınç cinsinden SAC', h.fmt(sacBar, 2) + ' bar/dakika'],
        ['Tüketilen hava', h.fmt(hava, 0) + ' litre'],
        ['Ortalama ortam basıncı', h.fmt(ortam, 2) + ' bar'],
        ['Derinlikteki tüketim', h.fmt(rmv * ortam, 1) + ' litre/dakika'],
      ],
      note: 'Bar/dakika değeri yalnızca bu tüp hacmi için geçerlidir. Sonuç bilgilendirme amaçlıdır; dalış planı eğitiminize ve dalış liderinizin kurallarına göre yapılmalıdır.',
    };
  },
  cases: [
    { in: { tup: '12', baslangic: '200', bitis: '50', derinlik: '20', sure: '40' }, out: { 'Yüzey hava tüketimi (SAC/RMV)': '15 litre/dakika', 'Basınç cinsinden SAC': '1,25 bar/dakika', 'Tüketilen hava': '1.800 litre', 'Ortalama ortam basıncı': '3 bar', 'Derinlikteki tüketim': '45 litre/dakika' } },
    { in: { tup: '15', baslangic: '200', bitis: '80', derinlik: '15', sure: '45' }, out: { 'Yüzey hava tüketimi (SAC/RMV)': '16 litre/dakika', 'Basınç cinsinden SAC': '1,07 bar/dakika', 'Ortalama ortam basıncı': '2,5 bar' } },
    { in: { tup: '10', baslangic: '200', bitis: '100', derinlik: '10', sure: '25' }, out: { 'Yüzey hava tüketimi (SAC/RMV)': '20 litre/dakika', 'Basınç cinsinden SAC': '2 bar/dakika', 'Tüketilen hava': '1.000 litre' } },
    { in: { tup: '12', baslangic: '210', bitis: '60', derinlik: '30', sure: '30' }, out: { 'Yüzey hava tüketimi (SAC/RMV)': '15 litre/dakika', 'Ortalama ortam basıncı': '4 bar', 'Derinlikteki tüketim': '60 litre/dakika' } },
    { in: { tup: '12', baslangic: '200', bitis: '50', derinlik: '0', sure: '60' }, out: { 'Yüzey hava tüketimi (SAC/RMV)': '30 litre/dakika', 'Ortalama ortam basıncı': '1 bar' } },
    { in: { tup: '12', baslangic: '200', bitis: '97', derinlik: '10,3', sure: '30', su: 'tatli' }, out: { 'Ortalama ortam basıncı': '2 bar', 'Yüzey hava tüketimi (SAC/RMV)': '20,6 litre/dakika' } },
    { in: { tup: '12', baslangic: '50', bitis: '200', derinlik: '20', sure: '40' }, error: true },
    { in: { tup: '12', baslangic: '200', bitis: '50', derinlik: '-5', sure: '40' }, error: true },
    { in: { tup: '12', baslangic: '200', bitis: '50', derinlik: '20', sure: '0' }, error: true },
  ],
  howto: [
    'Tüpünüzün su hacmini litre olarak yazın. Bu değer tüpün omzundaki damgada yer alır; ülkemizde kiralanan tüplerin çoğu 12 ya da 15 litredir.',
    'Dalışa girerken ve çıkarken manometrede okuduğunuz basınçları bar cinsinden girin.',
    'Dalış bilgisayarınızın kayıt ekranındaki ortalama derinliği ve toplam dalış süresini yazın.',
    'Denizde mi, tatlı suda mı daldığınızı seçip "Hesapla" düğmesine basın.',
    'İlk satırdaki litre/dakika değerini dalış defterinize not edin; birkaç dalışın ortalaması tek dalıştan daha güvenilir bir göstergedir.',
  ],
  sections: [
    { h: 'SAC nedir, RMV ile farkı ne?', p: [
      'SAC, İngilizce "Surface Air Consumption" ifadesinin kısaltmasıdır ve bir dalgıcın yüzeyde, yani 1 bar ortam basıncında dakikada ne kadar hava soluyacağını anlatır. Derinlik arttıkça regülatör havayı çevre basıncında verdiği için her nefeste tüpten daha fazla hava molekülü çekilir; 20 metrede tüketim yüzeydekinin üç katıdır. Farklı derinlikteki dalışları karşılaştırabilmek için tüketimi yüzeye indirgemek gerekir, SAC bunu sağlar.',
      'Uygulamada iki ayrı gösterim kullanılır. Bar/dakika cinsinden SAC, manometrede dakikada kaç bar düşeceğini söyler; okunması kolaydır ama yalnızca aynı hacimdeki tüp için geçerlidir. Litre/dakika cinsinden değer çoğu kaynakta RMV (solunum dakika hacmi) olarak adlandırılır ve tüpten bağımsızdır. 12 litrelik tüpten 15 litrelik tüpe geçtiğinizde bar/dakika değeriniz değişir, litre/dakika değeriniz değişmez. Araç ikisini birlikte verir.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Önce tüketilen serbest hava bulunur: <strong>hava (litre) = (başlangıç basıncı − bitiş basıncı) × tüp hacmi</strong>. Ardından ortalama derinlikteki mutlak basınç hesaplanır: deniz suyunda <strong>ortam basıncı = derinlik ÷ 10 + 1</strong> bar. Tatlı su biraz daha hafif olduğundan araç gölde 10 yerine 10,3 metreyi 1 bar sayar. Son adımda hava miktarı süreye ve ortam basıncına bölünür: <strong>SAC = hava ÷ süre ÷ ortam basıncı</strong>.',
      'Bu hesap havayı ideal gaz gibi ele alır. 200 bar civarındaki dolumlarda gerçek gaz davranışı ve tüpün suya girince soğuması nedeniyle birkaç puanlık sapma olabilir; planlama için bu fark ihmal edilir, çünkü zaten güvenlik payı bırakılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '12 litrelik tüple 200 barda suya girdiniz, 40 dakika sonra 50 barla çıktınız ve bilgisayarınız ortalama derinliği 20 metre gösterdi. Basınç düşüşü 150 bardır; tüketilen hava 150 × 12 = 1.800 litre eder. 20 metrede ortam basıncı 20 ÷ 10 + 1 = 3 bardır. Derinlikte dakikada 1.800 ÷ 40 = 45 litre hava solumuşsunuz; bunu 3\'e böldüğünüzde yüzey tüketimi <strong>15 litre/dakika</strong> çıkar. Bar cinsinden karşılığı 150 ÷ 40 ÷ 3 = 1,25 bar/dakikadır.',
      'Aynı dalgıç 30 metrede bir dalış planlıyorsa ortam basıncı 4 bar olacağından dakikada 15 × 4 = 60 litre hava harcayacağını öngörebilir. 12 litrelik tüpte bu, dakikada 5 barlık düşüş demektir.',
    ] },
    { h: 'Sonucu nasıl yorumlamalı?', p: [
      'Rahat koşullarda, akıntısız ve ılık suda dalan deneyimli sportif dalgıçlarda litre/dakika değeri çoğunlukla 12 ile 20 arasında görülür. Yeni başlayanlarda, soğuk suda, akıntıya karşı palet vururken ya da heyecanlı anlarda 25 litre/dakikanın üzerine çıkması olağandır. Bu aralıklar bir sınav notu değildir; vücut ölçüsü, kondisyon, ekipmanın suya direnci ve yüzerlik kontrolü tüketimi doğrudan etkiler.',
      'Tek bir dalıştan çıkan sayı o günün koşullarını yansıtır. Dalış defterinize her dalışın değerini yazıp ortalamasını almak, ayrıca "dinlenik" ve "eforlu" tüketiminizi ayrı ayrı bilmek gaz planlamasında çok daha kullanışlıdır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>En derin noktayı yazmak:</strong> Hesap ortalama derinlikle yapılır. Maksimum derinliği girerseniz tüketiminiz olduğundan düşük çıkar ve planınız iyimser kalır.',
      '<strong>Tüpün dolum kapasitesini hacim sanmak:</strong> "2.400 litrelik tüp" ifadesi 12 litrelik tüpün 200 bardaki hava miktarıdır; araca 12 yazılmalıdır.',
      '<strong>Yüzeyde geçen süreyi katmak:</strong> Şnorkelle yüzdüğünüz dakikalar süreye eklenirse sonuç düşer. Regülatörden soluduğunuz süreyi kullanın.',
      '<strong>Isınmamış manometre okuması:</strong> Güneşte bekleyen tüp suya girince soğur ve basınç birkaç bar düşer. Başlangıç değerini suda, ilk dakikada okumak daha doğrudur.',
      '<strong>Çift tüpte tek tüp hacmi yazmak:</strong> İkiz 12 litrelik sette toplam hacim 24 litredir.',
    ] },
    { h: 'Güvenlik notu ve sınırlar', p: [
      'Bu sayfa bir dalış planlama yazılımı ya da dekompresyon hesaplayıcısı değildir. Verdiği sayı geçmiş bir dalışın özetidir; yedek gaz, dönüş basıncı, eş paylaşımı ve acil çıkış payı gibi kararlar aldığınız eğitimin kurallarına, dalış merkezinin brifingine ve kendi sınırlarınıza göre verilmelidir. Hesap hava ve nitroks gibi açık devre solunum için anlamlıdır; kapalı devre cihazlarda gaz tüketimi derinlikle bu şekilde artmaz.',
    ] },
  ],
  faq: [
    ['İyi bir SAC değeri kaçtır?', 'Tek bir doğru değer yoktur. Sakin koşullarda sportif dalgıçların çoğu dakikada 12–20 litre aralığındadır; başlangıç döneminde 20–25 litre ve üzeri görülmesi normaldir. Önemli olan kendi ortalamanızı bilmek ve planı ona göre yapmaktır.'],
    ['SAC değerimi nasıl düşürebilirim?', 'Doğru ağırlık ve nötr yüzerlik, yavaş ve derin nefes, akıntıya karşı gereksiz efordan kaçınma, sıkı toplanmış ekipman ve sudaki rahatlık tüketimi azaltır. Nefes tutarak hava biriktirmeye çalışmak ise hem tehlikelidir hem de işe yaramaz.'],
    ['Bar/dakika mı, litre/dakika mı kullanmalıyım?', 'Hep aynı hacimde tüp kullanıyorsanız bar/dakika manometreyle doğrudan karşılaştırılabildiği için pratiktir. Farklı tüplerle dalıyorsanız litre/dakika değerini esas alın; yeni tüpün bar/dakika karşılığını bulmak için bu değeri tüp hacmine bölmeniz yeterlidir.'],
    ['Ortalama derinliği bilmiyorsam ne yapmalıyım?', 'Dalış bilgisayarlarının çoğu kayıt ekranında ortalama derinliği gösterir. Yoksa dalış profilinizi parçalara ayırıp süreyle ağırlıklı ortalama alabilirsiniz. Kaba bir tahmin olarak maksimum derinliğin yarısını kullanmak yanıltıcı olabilir; kare profilli dalışlarda ortalama, maksimuma çok daha yakındır.'],
    ['Nitroks kullanırken hesap değişir mi?', 'Hayır. Solunan gazın hacmi karışımdaki oksijen oranına bağlı değildir; aynı formül nitroks için de geçerlidir. Değişen şey derinlik sınırı ve dipte kalma süresi gibi konulardır, bunlar bu aracın kapsamı dışındadır.'],
    ['Tatlı su seçeneği sonucu ne kadar etkiler?', 'Tatlı suda 1 barlık artış için yaklaşık 10,3 metre gerekir. Fark küçüktür: 20 metrede ortam basıncı denizde 3 bar, gölde yaklaşık 2,94 bardır. Yüksek rakımlı göllerde yüzey basıncı da düşük olduğundan sonuç ayrıca sapar; araç deniz seviyesini varsayar.'],
    ['Bu değerle tüpümün kaç dakika yeteceğini bulabilir miyim?', 'Kaba bir tahmin yapılabilir: kullanılabilir hava miktarını (yedek payı düştükten sonraki basınç × tüp hacmi) planlanan derinlikteki tüketime bölersiniz. Ancak efor, soğuk ve stres tüketimi artırır; bu yüzden hesap yalnızca fikir verir, dalış sırasında manometre takibinin yerini tutmaz.'],
    ['Girdiğim dalış bilgileri kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; basınç, derinlik ve süre değerleri hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['hidrostatik-basinc-hesapla', 'bar-psi-cevir', 'bar-atm-cevir', 'silindir-hacmi-hesapla', 'tekne-hizi-hesapla'],
};
