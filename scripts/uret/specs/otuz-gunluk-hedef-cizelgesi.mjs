export default {
  slug: 'otuz-gunluk-hedef-cizelgesi',
  title: '30 Günlük Hedef Çizelgesi Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: '30 Günlük Hedef Çizelgesi Oluştur – Yazdırılabilir Takip PDF',
  description: 'Tek bir hedef için otuz kutuluk takip sayfasını PDF olarak oluşturun. Başlangıç tarihine göre günler ve tarihler yazılır; 10., 20. ve 30. gün ara durakları işaretlidir.',
  card: 'Tek hedef, otuz kutu: başlangıç tarihini seçin, her günün tarihi yazılı 30 günlük hedef çizelgesini PDF olarak indirin.',
  category: 'planlama',
  pdf: true,
  keywords: ['30 günlük hedef çizelgesi', '30 gün takip çizelgesi', '30 günlük meydan okuma şablonu', 'otuz günlük plan', '30 günlük çizelge pdf', 'hedef takip sayfası', '30 gün alışkanlık çizelgesi'],
  lead: 'Tek bir hedefi otuz gün boyunca izlemek için bir <strong>30 günlük hedef çizelgesi</strong> oluşturun. Başlangıç tarihini seçin; birden otuza numaralanmış kutulara her günün tarihi yazılır, onuncu, yirminci ve otuzuncu gün ara durak olarak vurgulanır ve sayfanın altında hedefinizle ilgili kısa yazı alanları bulunur.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bugünden başlar. Tarihsiz seçenekte kullanılmaz.' },
    { id: 'tarihli', label: 'Kutularda tarih', type: 'select', options: [['evet', 'Tarih ve gün adı yazılsın'], ['hayir', 'Yalnızca gün numarası (tarihsiz)']] },
    { id: 'hedef', label: 'Hedefiniz (isteğe bağlı)', type: 'text', placeholder: 'Örn. Her gün 30 dakika yürümek', hint: 'En fazla 60 karakter. Boş bırakırsanız elle yazmanız için çizgi bırakılır.', wide: true },
    { id: 'donem', label: 'Dönem (sayfa) sayısı', type: 'number', value: '1', hint: '1 ile 12 arasında. Her sayfa, bir öncekinin bittiği günün ertesinde başlayan yeni bir 30 gündür.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
  ],
  compute(v, h) {
    const tarihli = v.tarihli !== 'hayir';
    const ilk = tarihli ? h.dateOrToday(v.baslangic, 'Başlangıç tarihi') : null;
    if (ilk && (ilk.getUTCFullYear() < 1900 || ilk.getUTCFullYear() > 2200)) h.err('Başlangıç tarihi 1900 ile 2200 yılları arasında olmalı.');
    const hedef = (v.hedef || '').trim();
    if (hedef.length > 60) h.err('Hedef en fazla 60 karakter olabilir; kısa ve tek cümlelik bir hedef yazın.');
    const n = h.posint(v.donem, 'Dönem (sayfa) sayısı');
    if (n > 12) h.err('Dönem sayısı en fazla 12 olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const AYK = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const GK = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const sayfalar = [];
    for (let s = 0; s < n; s++) {
      const ops = [], b = tarihli ? h.gunEkle(ilk, s * 30) : null;
      ops.push(['yazi', '30 Günlük Hedef', m, m + 7 * k, f(18), { kalin: true }]);
      if (tarihli) ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 29))}`, W - m, m + 7 * k, f(10), { hiza: 'sag', ton: 0.35 }]);
      else ops.push(['yazi', 'Başlangıç: ____ / ____ / ________', W - m, m + 7 * k, f(9), { hiza: 'sag', ton: 0.4 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      // Hedef kutusu
      const hy = m + 14 * k, hyuk = 15 * k, tw = W - 2 * m;
      ops.push(['kutu', m, hy, tw, hyuk, { dolgu: 0.95, cizgi: 0.5 }]);
      ops.push(['yazi', 'Hedefim', m + 2.5 * k, hy + 5 * k, f(7.5), { kalin: true, ton: 0.4 }]);
      if (hedef) ops.push(['yazi', hedef, m + 2.5 * k, hy + 11.5 * k, f(11.5), { kalin: true }]);
      else ops.push(['cizgi', m + 2.5 * k, hy + 12 * k, W - m - 2.5 * k, hy + 12 * k, { kalinlik: 0.25, ton: 0.55 }]);
      // 5 × 6 gün kutuları
      const bosluk = 4 * k, altYuk = 46 * k, gy = hy + hyuk + bosluk, gAlt = H - m - altYuk - bosluk;
      const cw = tw / 5, ch = (gAlt - gy) / 6;
      for (let d = 0; d < 30; d++) {
        const x = m + (d % 5) * cw, y = gy + Math.floor(d / 5) * ch, durak = (d + 1) % 10 === 0;
        ops.push(['kutu', x, y, cw, ch, durak ? { dolgu: 0.88, cizgi: 0.45 } : { cizgi: 0.45 }]);
        ops.push(['yazi', String(d + 1), x + 2.2 * k, y + 8 * k, f(16), { kalin: true }]);
        if (tarihli) {
          const t = h.gunEkle(b, d);
          ops.push(['yazi', `${t.getUTCDate()} ${AYK[t.getUTCMonth()]}`, x + cw - 2.2 * k, y + 5 * k, f(7.5), { hiza: 'sag', ton: 0.3 }]);
          ops.push(['yazi', GK[t.getUTCDay()], x + cw - 2.2 * k, y + 8.6 * k, f(6.5), { hiza: 'sag', ton: 0.5 }]);
        }
        ops.push(['daire', x + cw - 6 * k, y + ch - 6 * k, 3.4 * k, { cizgi: 0.35, kalinlik: 0.35, dolgu: 1 }]);
        if (durak) ops.push(['yazi', 'Ara durak', x + 2.2 * k, y + ch - 3 * k, f(6.5), { ton: 0.35 }]);
        else ops.push(['cizgi', x + 2.2 * k, y + ch - 3.5 * k, x + cw - 12 * k, y + ch - 3.5 * k, { kalinlik: 0.2, ton: 0.78 }]);
      }
      // Alt yazı alanları
      const ay = H - m - altYuk, aw = (tw - bosluk) / 2;
      const kutu = (x, ad) => {
        ops.push(['kutu', x, ay, aw, altYuk, { cizgi: 0.5 }]);
        ops.push(['yazi', ad, x + 2.5 * k, ay + 5.5 * k, f(8.5), { kalin: true }]);
        for (let yy = ay + 14 * k; yy < ay + altYuk - 2 * k; yy += 8 * k) ops.push(['cizgi', x + 2.5 * k, yy, x + aw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      };
      kutu(m, 'Bunu neden istiyorum?');
      kutu(m + aw + bosluk, 'Aksadığım gün ne yapacağım?');
      sayfalar.push(ops);
    }
    const rows = [['Sayfa sayısı', `${n} sayfa`], ['Toplam gün', `${n * 30} gün`]];
    if (tarihli) {
      const g = (i) => { const t = h.gunEkle(ilk, i - 1); return `${h.fmtDate(t)} ${h.gunAdi(t)}`; };
      rows.push(['1. gün', g(1)], ['10. gün', g(10)], ['20. gün', g(20)], ['30. gün', g(30)]);
      if (n > 1) rows.push(['Son gün', g(n * 30)]);
    } else rows.push(['Tarih', 'Elle yazılacak']);
    rows.push(['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)']);
    return {
      rows,
      note: 'Kişisel takip sayfasıdır; tıbbi tavsiye ya da program değildir. Yazdırırken yönü dikey, ölçeği %100 seçin.',
      pdf: { ad: 'otuz-gunluk-hedef-cizelgesi', baslik: hedef || '30 Günlük Hedef', boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hedef: 'Her gün 30 dakika yürümek' }, out: { 'Sayfa sayısı': '1 sayfa', 'Toplam gün': '30 gün', '1. gün': '18.11.2026 Çarşamba', '10. gün': '27.11.2026 Cuma', '20. gün': '07.12.2026 Pazartesi', '30. gün': '17.12.2026 Perşembe' }, pdfSayfa: 1 },
    { in: { baslangic: '2027-01-01', boyut: 'a5' }, out: { '1. gün': '01.01.2027 Cuma', '30. gün': '30.01.2027 Cumartesi', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-01' }, out: { '1. gün': '01.02.2028 Salı', '30. gün': '01.03.2028 Çarşamba' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', donem: '2' }, out: { 'Sayfa sayısı': '2 sayfa', 'Toplam gün': '60 gün', '30. gün': '17.12.2026 Perşembe', 'Son gün': '16.01.2027 Cumartesi' }, pdfSayfa: 2 },
    { in: { tarihli: 'hayir', donem: '3', boyut: 'a5', hedef: 'Günde 10 sayfa kitap' }, out: { 'Sayfa sayısı': '3 sayfa', 'Toplam gün': '90 gün', 'Tarih': 'Elle yazılacak' }, pdfSayfa: 3 },
    { in: { baslangic: '2026-11-16', donem: '12' }, out: { 'Toplam gün': '360 gün', '1. gün': '16.11.2026 Pazartesi', 'Son gün': '10.11.2027 Çarşamba' }, pdfSayfa: 12 },
    { in: { baslangic: '2026-11-18', donem: '13' }, error: true },
    { in: { baslangic: '2026-11-18', hedef: 'Bu hedef cümlesi altmış karakterlik sınırı açıkça aşacak kadar uzun yazılmıştır' }, error: true },
    { in: { baslangic: '30.02.2027' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanından hedefe başlayacağınız günü seçin. Boş bırakırsanız bugünün tarihi kullanılır.',
    'Kutulara tarih yazılmasını istemiyorsanız "Yalnızca gün numarası" seçeneğini işaretleyin; bu durumda sayfayı dilediğiniz gün başlatabilirsiniz.',
    'Hedefinizi tek cümleyle yazın. Boş bırakırsanız sayfada elle doldurmanız için bir çizgi bırakılır.',
    'Otuz günden uzun bir süre izleyecekseniz dönem sayısını artırın; her sayfa bir öncekinin devamı olan yeni bir otuz günü gösterir.',
    '"Çizelgeyi oluştur" düğmesine basın, önizlemeyi kontrol edip "PDF indir" ile dosyayı kaydedin ve yazdırın.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Sayfanın üstünde başlık ve karşısında otuz günlük dönemin ilk ve son tarihi yazar. Hemen altında gri zeminli <strong>Hedefim</strong> kutusu bulunur; hedefinizi yazdıysanız kalın harflerle basılır, yazmadıysanız doldurmanız için bir çizgi çıkar.',
      'Sayfanın ortasını beş sütun ve altı sıradan oluşan otuz kutu kaplar. Her kutunun sol üstünde büyük gün numarası, sağ üstünde o günün tarihi ("18 Kas") ve gün adının kısaltması yazar. Sağ alt köşedeki daire, o gün hedefi yerine getirdiğinizde işaretlemeniz içindir; sol alttaki kısa çizgiye süre, sayfa sayısı, mesafe gibi küçük bir not düşebilirsiniz. Onuncu, yirminci ve otuzuncu kutular gri zeminlidir ve "Ara durak" yazısı taşır.',
      'En altta iki yazı kutusu vardır: <strong>Bunu neden istiyorum?</strong> ve <strong>Aksadığım gün ne yapacağım?</strong> Bunları ilk gün doldurmak, isteğin azaldığı günlerde sayfaya bakınca nedeninizi ve planınızı hatırlamanızı sağlar.',
    ] },
    { h: 'Tarihler nasıl hesaplanır?', p: [
      'Birinci kutu başlangıç tarihinizdir; otuzuncu kutu bundan yirmi dokuz gün sonrasıdır. Ay geçişleri ve artık yıllar kendiliğinden hesaba katılır.',
      'Örnek: 18 Kasım 2026 çarşamba günü başlayan bir çizelgede 10. gün 27 Kasım 2026 cuma, 20. gün 7 Aralık 2026 pazartesi, 30. gün 17 Aralık 2026 perşembe olur. 1 Şubat 2028 salı günü başlayan bir çizelge ise şubat o yıl 29 gün çektiği için 1 Mart 2028 çarşamba günü biter. İki dönem seçtiğinizde ikinci sayfa otuz birinci günden başlar; 18 Kasım 2026 başlangıçlı iki dönem 16 Ocak 2027 cumartesi günü tamamlanır.',
      'Otuz gün, bir takvim ayıyla aynı şey değildir. Ayın birinde başlasanız bile 31 gün çeken aylarda çizelge ayın otuzunda, şubatta ise izleyen ayın başında biter. Ayın tamamını gün gün izlemek istiyorsanız alışkanlık takip çizelgesi daha uygundur.',
    ] },
    { h: 'İyi bir 30 günlük hedef nasıl yazılır?', ul: [
      '<strong>Tek bir şey seçin.</strong> Bu sayfa bilerek tek hedeflidir. Birden çok davranışı aynı anda izlemek için alışkanlık takip çizelgesini kullanabilirsiniz.',
      '<strong>Günlük bir eyleme çevirin.</strong> "Daha çok okumak" yerine "her gün 10 sayfa okumak". Kutuyu işaretleyip işaretlemeyeceğiniz gün sonunda tartışmasız belli olmalı.',
      '<strong>Küçük tutun.</strong> En yorgun gününüzde bile yapabileceğiniz bir miktar belirleyin. Fazlasını yaptığınız günler kazançtır; azını yapamadığınız günler zinciri koparır.',
      '<strong>Bir zamana ya da yere bağlayın.</strong> "Akşam yemeğinden sonra", "servise binince", "kahvaltıdan önce" gibi bir tetikleyici, hatırlamayı kolaylaştırır.',
      '<strong>Ara duraklarda durup bakın.</strong> Onuncu ve yirminci günde hedef çok ağır ya da çok hafif geliyorsa miktarı ayarlayın; hedefi bırakmaktan iyidir.',
    ] },
    { h: 'Kullanım örnekleri', p: [
      'Otuz günlük çizelge, kısa ve sınırı belli denemeler için uygundur: her gün belirli sayıda sayfa okumak, yabancı dilde yeni kelime çalışmak, bir enstrümanla pratik yapmak, günlük tutmak, sınava hazırlanırken her gün belli sayıda soru çözmek, her gün bir çekmeceyi ya da rafı düzenlemek, harcamaları not etmek. Çocuklarla birlikte doldurulan bir çizelge, dişlerini fırçalamak ya da çantasını akşamdan hazırlamak gibi rutinleri oyunlaştırmanın da basit bir yoludur.',
      'Otuz gün dolduğunda işaretli daireleri sayın. Sonuç, hedefi sürdürüp sürdürmeyeceğinize ve bir sonraki dönemde neyi değiştireceğinize karar vermek için yeterli bilgiyi verir. Devam etmek isterseniz yeni dönemin sayfasını aynı hedefle yeniden oluşturabilirsiniz.',
    ] },
    { h: 'Sağlıkla ilgili hedefler için not', p: [
      'Bu sayfa yalnızca kendi belirlediğiniz bir hedefi işaretlemeniz için hazırlanmış boş bir çizelgedir; <strong>tıbbi tavsiye değildir</strong> ve bir beslenme, kilo verme ya da egzersiz programı içermez. Otuz günde belirli bir sonuca ulaşılacağına dair bir vaat de taşımaz. Diyet, yoğun egzersiz, ilaç ya da uyku düzeniyle ilgili bir hedef koymadan önce, özellikle bilinen bir sağlık sorununuz varsa, hekiminize danışın.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde yönü <strong>dikey</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. A4 sayfada her gün kutusu yaklaşık 37 mm genişliğinde ve 32 mm yüksekliğindedir; A5 sayfada ölçüler bunun yaklaşık yüzde yetmişine iner. Sayfayı her gün göreceğiniz bir yere asmak, işaretlemeyi unutmamanın en kolay yoludur.',
      'Hedef cümlesi 60 karakterle sınırlıdır. Bir dosyada en fazla 12 dönem, yani 360 gün bulunabilir. Çizelge her zaman otuz kutudur; 21 ya da 100 günlük düzen üretilmez. Tarihsiz seçenekte başlangıç tarihini sağ üstteki alana elle yazarsınız.',
    ] },
  ],
  faq: [
    ['30 günlük hedef çizelgesi ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt istemez ve dilediğiniz kadar çizelge oluşturup yazdırabilirsiniz.'],
    ['Çizelge ayın birinde başlamak zorunda mı?', 'Hayır. Dilediğiniz günü başlangıç olarak seçebilirsiniz; kutulardaki tarihler o günden itibaren otuz gün ilerler. Hedefe başlamak için ay başını beklemeniz gerekmez.'],
    ['Tarihsiz bir çizelge alabilir miyim?', 'Evet. "Yalnızca gün numarası" seçeneğinde kutularda yalnızca 1 ile 30 arası numaralar bulunur. Bu sayfayı çoğaltıp farklı hedefler ve farklı başlangıç günleri için kullanabilirsiniz.'],
    ['Gri kutular ne anlama geliyor?', 'Onuncu, yirminci ve otuzuncu günler ara durak olarak vurgulanır. Bu günlerde durup gidişatı değerlendirmek ve gerekirse hedefin miktarını ayarlamak için bir hatırlatmadır.'],
    ['Bir günü kaçırırsam baştan mı başlamalıyım?', 'Bu sizin kararınızdır, ancak çoğu kişi için baştan başlamak yerine dairesini boş bırakıp ertesi gün devam etmek daha sürdürülebilirdir. Sayfanın altındaki "Aksadığım gün ne yapacağım?" kutusu bu durumu önceden planlamanız içindir.'],
    ['60 ya da 90 günlük takip yapabilir miyim?', 'Evet. Dönem sayısını 2 ya da 3 yapın. Her sayfa otuz günü gösterir ve tarihler bir önceki sayfanın bittiği günün ertesinden devam eder.'],
    ['Bu çizelge bir sağlık ya da diyet programı mı?', 'Hayır. Yalnızca kendi koyduğunuz hedefi işaretlemeye yarayan boş bir sayfadır ve tıbbi tavsiye içermez. Sağlığınızı etkileyebilecek hedefler için bir sağlık uzmanına danışın.'],
    ['Yazdığım hedef bir yere gönderiliyor mu?', 'Hayır. PDF dosyası tarayıcınızın içinde üretilir; hedef cümleniz ve seçtiğiniz tarih sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['aliskanlik-takip-cizelgesi', 'hedef-planlayici', 'aylik-planlayici', 'gunluk-planlayici', 'kitap-okuma-takip-cizelgesi'],
};
