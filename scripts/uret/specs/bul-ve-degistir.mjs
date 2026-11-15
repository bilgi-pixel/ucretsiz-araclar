export default {
  slug: 'bul-ve-degistir',
  title: 'Metinde Bul ve Değiştir',
  h1Tail: 'toplu kelime değiştirme',
  pageTitle: 'Metinde Bul ve Değiştir – Online Toplu Kelime Değiştirme Aracı',
  description: 'Metninizdeki bir kelimeyi ya da ifadeyi bulun, tek seferde hepsini değiştirin. Büyük-küçük harf, tam kelime ve düzenli ifade seçenekleriyle; eşleşme sayısı gösterilir.',
  card: 'Metindeki bir kelimeyi ya da ifadeyi topluca değiştirin; Türkçeye uygun harf duyarlılığı, tam kelime ve regex seçenekleriyle.',
  category: 'metin',
  keywords: ['bul ve değiştir', 'metinde kelime değiştirme', 'toplu kelime değiştirme', 'online bul değiştir', 'metin değiştirme aracı', 'find and replace', 'regex ile değiştirme', 'kelime bul değiştir'],
  lead: 'Yapıştırdığınız metinde bir kelimeyi, ifadeyi ya da işareti arayın ve bulunan <strong>bütün eşleşmeleri tek seferde</strong> yenisiyle değiştirin. Araç kaç eşleşme bulduğunu söyler; büyük-küçük harf ayrımı, yalnızca tam kelime eşleştirme ve düzenli ifade (regex) kipleri vardır.',
  button: 'Değiştir',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Üzerinde değişiklik yapılacak metni yapıştırın', rows: 8 },
    { id: 'bul', label: 'Bulunacak ifade', type: 'text', placeholder: 'Örn. firma' },
    { id: 'degistir', label: 'Yerine yazılacak ifade', type: 'text', placeholder: 'Örn. şirket', hint: 'Boş bırakırsanız bulunan ifade silinir' },
    { id: 'harf', label: 'Büyük-küçük harf', type: 'select', options: [['duyarsiz', 'Ayırma (Ali = ALİ = ali)'], ['duyarli', 'Ayır (yalnızca birebir aynı yazım)']] },
    { id: 'kelime', label: 'Eşleşme kapsamı', type: 'select', options: [['parca', 'Kelimenin içinde de bul'], ['tam', 'Yalnızca tam kelime']] },
    { id: 'kip', label: 'Arama kipi', type: 'select', options: [['duz', 'Düz metin'], ['regex', 'Düzenli ifade (regex)']] },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin === '') h.err('Üzerinde arama yapılacak metni yazın.');
    const bul = String(v.bul ?? '');
    if (bul === '') h.err('"Bulunacak ifade" alanını doldurun.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const yeni = String(v.degistir ?? '');
    const duyarli = v.harf === 'duyarli';
    const tam = v.kelime === 'tam';
    const kelimeKarakteri = (c) => c !== undefined && c !== '' && /[\p{L}\p{N}_]/u.test(c);
    let sonuc = '', adet = 0;
    if (v.kip === 'regex') {
      let re;
      try { re = new RegExp(bul, 'gmu' + (duyarli ? '' : 'i')); }
      catch (e) { h.err('Düzenli ifade geçersiz; parantez ve köşeli parantezlerin kapandığını, özel karakterlerin önüne ters eğik çizgi koyduğunuzu kontrol edin.'); }
      let son = 0;
      for (const m of metin.matchAll(re)) {
        const bas = m.index, bit = bas + m[0].length;
        if (m[0] === '') continue;
        if (tam && (kelimeKarakteri(metin[bas - 1]) || kelimeKarakteri(metin[bit]))) continue;
        // $1, $2, $& ve $$ yer tutucularını çöz
        const yerine = yeni.replace(/\$(\$|&|\d{1,2})/g, (t, k) => {
          if (k === '$') return '$';
          if (k === '&') return m[0];
          const n = Number(k);
          return n >= 1 && n < m.length ? (m[n] ?? '') : t;
        });
        sonuc += metin.slice(son, bas) + yerine;
        son = bit; adet++;
      }
      sonuc += metin.slice(son);
    } else {
      // Türkçe kurallarına göre harf harf küçültme (uzunluk korunur): I→ı, İ→i
      const kucuk = (s) => {
        let o = '';
        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          if (c === 'I') o += 'ı';
          else if (c === 'İ') o += 'i';
          else { const k = c.toLowerCase(); o += k.length === 1 ? k : c; }
        }
        return o;
      };
      const saman = duyarli ? metin : kucuk(metin);
      const igne = duyarli ? bul : kucuk(bul);
      let i = 0, son = 0;
      while (true) {
        const k = saman.indexOf(igne, i);
        if (k === -1) break;
        const bit = k + igne.length;
        if (tam && (kelimeKarakteri(metin[k - 1]) || kelimeKarakteri(metin[bit]))) { i = k + 1; continue; }
        sonuc += metin.slice(son, k) + yeni;
        son = bit; i = bit; adet++;
      }
      sonuc += metin.slice(son);
    }
    return {
      rows: [
        ['Değiştirilen eşleşme', h.fmt(adet, 0)],
        ['Önceki uzunluk', h.fmt(metin.length, 0) + ' karakter'],
        ['Sonraki uzunluk', h.fmt(sonuc.length, 0) + ' karakter'],
      ],
      text: sonuc,
      note: adet === 0 ? 'Eşleşme bulunamadı; metin değiştirilmedi. Yazımı ve seçenekleri kontrol edin.' : undefined,
    };
  },
  cases: [
    { in: { metin: 'Firma yetkilisi firma adına imza attı.', bul: 'firma', degistir: 'şirket' }, text: 'şirket yetkilisi şirket adına imza attı.', out: { 'Değiştirilen eşleşme': '2', 'Önceki uzunluk': '38 karakter', 'Sonraki uzunluk': '40 karakter' } },
    { in: { metin: 'Firma yetkilisi firma adına imza attı.', bul: 'firma', degistir: 'şirket', harf: 'duyarli' }, text: 'Firma yetkilisi şirket adına imza attı.', out: { 'Değiştirilen eşleşme': '1' } },
    { in: { metin: 'at, atlas, saat, at', bul: 'at', degistir: 'kedi', kelime: 'tam' }, text: 'kedi, atlas, saat, kedi', out: { 'Değiştirilen eşleşme': '2' } },
    { in: { metin: 'at, atlas, saat, at', bul: 'at', degistir: 'X', kelime: 'parca' }, text: 'X, Xlas, saX, X', out: { 'Değiştirilen eşleşme': '4' } },
    { in: { metin: 'ISPARTA ve ıslak', bul: 'ıs', degistir: '#' }, text: '#PARTA ve #lak', out: { 'Değiştirilen eşleşme': '2' } },
    { in: { metin: 'İSTANBUL istasyon', bul: 'ist', degistir: '#' }, text: '#ANBUL #asyon', out: { 'Değiştirilen eşleşme': '2' } },
    { in: { metin: 'a  b   c', bul: ' +', degistir: ' ', kip: 'regex' }, text: 'a b c', out: { 'Değiştirilen eşleşme': '2' } },
    { in: { metin: '15.03.2026 ve 01.11.2025', bul: '(\\d{2})\\.(\\d{2})\\.(\\d{4})', degistir: '$3-$2-$1', kip: 'regex' }, text: '2026-03-15 ve 2025-11-01', out: { 'Değiştirilen eşleşme': '2' } },
    { in: { metin: 'fiyat: 5$ (yaklaşık)', bul: '(yaklaşık)', degistir: '$1', kip: 'duz' }, text: 'fiyat: 5$ $1', out: { 'Değiştirilen eşleşme': '1' } },
    { in: { metin: 'bir iki üç', bul: 'dört', degistir: 'beş' }, text: 'bir iki üç', out: { 'Değiştirilen eşleşme': '0' } },
    { in: { metin: 'a-b-c', bul: '-', degistir: '' }, text: 'abc', out: { 'Sonraki uzunluk': '3 karakter' } },
    { in: { metin: 'deneme', bul: '', degistir: 'x' }, error: true },
    { in: { metin: '', bul: 'a', degistir: 'x' }, error: true },
    { in: { metin: 'deneme', bul: '(a', degistir: 'x', kip: 'regex' }, error: true },
  ],
  howto: [
    'Düzeltmek istediğiniz metni "Metin" kutusuna yapıştırın.',
    '"Bulunacak ifade" alanına aradığınız kelimeyi ya da ifadeyi, "Yerine yazılacak ifade" alanına yenisini yazın. İfadeyi tümüyle silmek için ikinci alanı boş bırakın.',
    'Büyük-küçük harf ayrımını ve eşleşme kapsamını seçin. "at" ararken "saat" kelimesinin de değişmesini istemiyorsanız "Yalnızca tam kelime" seçeneğini kullanın.',
    'Desenle arama yapacaksanız arama kipini "Düzenli ifade" yapın; aksi hâlde "Düz metin" kipinde kalın.',
    '"Değiştir" düğmesine basın. Kaç eşleşmenin değiştiğini denetleyin, ardından yeni metni kopyalayın.',
  ],
  sections: [
    { h: 'Bul ve değiştir ne zaman işe yarar?', p: [
      'Bir sözleşme taslağında taraf adının değişmesi, bir ürün açıklamasında eski model kodunun yenisiyle güncellenmesi, toplu e-posta metninde yanlış yazılmış bir kelimenin düzeltilmesi ya da başka bir programdan kopyalanan verideki ayırıcıların değiştirilmesi: bunların hepsi aynı işlemdir. Metinde belirli bir parçanın geçtiği her yer bulunur ve yerine başka bir parça konur.',
      'Kelime işlemcilerde bu özellik vardır; ancak bir web formuna, mesajlaşma penceresine ya da telefonun not uygulamasına yazılmış metinde çoğu zaman yoktur. Bu araç, metni kopyalayıp yapıştırabildiğiniz her durumda aynı işlevi sunar ve fazladan iki şeyi görünür kılar: kaç eşleşme değiştirildi ve metnin uzunluğu nasıl değişti. Beklediğiniz sayıyla sonuçtaki sayı tutmuyorsa bir şeyin gözden kaçtığını hemen anlarsınız.',
    ] },
    { h: 'Türkçede büyük-küçük harf eşleştirme', p: [
      'Türkçede noktalı ve noktasız i ayrı harflerdir: küçük <strong>ı</strong> harfinin büyüğü <strong>I</strong>, küçük <strong>i</strong> harfinin büyüğü <strong>İ</strong>\'dir. İngilizce kurallarına göre çalışan pek çok program ise büyük I harfini küçük i ile eşleştirir. Bunun sonucu, "ISPARTA" içinde "ıs" aradığınızda bulunamaması ya da "İSTANBUL" içinde "ist" aramasının sonuç vermemesidir.',
      'Bu araç düz metin kipinde harfleri Türkçe kurallarına göre karşılaştırır. "Ayırma" seçeneği açıkken <code>ıs</code> araması hem "ISPARTA" hem "ıslak" kelimesindeki ilk iki harfi bulur; <code>ist</code> araması da hem "İSTANBUL" hem "istasyon" içinde eşleşir. Bunun bedeli, İngilizce bir metinde büyük I ile küçük i harfinin aynı sayılmamasıdır; İngilizce metinle çalışıyorsanız düzenli ifade kipini ya da harf ayrımlı aramayı tercih edebilirsiniz.',
      'Yerine yazılan ifade her zaman yazdığınız gibi eklenir. Araç, bulduğu kelime büyük harfle başlıyor diye yeni kelimeyi de büyük harfle başlatmaz. Cümle başındaki eşleşmelerin büyük harfini korumak istiyorsanız aramayı harf ayrımlı yapıp iki ayrı değiştirme uygulayın: önce "Firma" yerine "Şirket", sonra "firma" yerine "şirket".',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Metin: <code>Firma yetkilisi firma adına imza attı.</code> Bulunacak ifade <code>firma</code>, yerine yazılacak ifade <code>şirket</code> olsun. Harf ayrımı kapalıyken hem baştaki "Firma" hem ortadaki "firma" eşleşir; sonuç <code>şirket yetkilisi şirket adına imza attı.</code> olur ve değiştirilen eşleşme sayısı 2\'dir. Metin 38 karakterden 40 karaktere çıkar, çünkü "şirket" kelimesi "firma"dan bir harf uzundur ve iki yerde değişmiştir.',
      'Aynı aramayı "Ayır" seçeneğiyle yaparsanız yalnızca küçük harfle yazılmış olan ikinci kelime değişir: <code>Firma yetkilisi şirket adına imza attı.</code> Eşleşme sayısı bu kez 1\'dir.',
      'Tam kelime farkını görmek için <code>at, atlas, saat, at</code> metninde <code>at</code> ifadesini <code>kedi</code> ile değiştirin. "Kelimenin içinde de bul" seçiliyken dört eşleşme çıkar ve "atlas" ile "saat" de bozulur. "Yalnızca tam kelime" seçildiğinde yalnızca baştaki ve sondaki bağımsız "at" kelimeleri değişir: <code>kedi, atlas, saat, kedi</code>.',
    ] },
    { h: 'Tam kelime eşleştirme nasıl karar verir?', p: [
      'Bir eşleşmenin tam kelime sayılması için hemen öncesindeki ve hemen sonrasındaki karakterin harf, rakam ya da alt çizgi olmaması gerekir. Boşluk, noktalama işareti, satır başı ve satır sonu kelime sınırı kabul edilir. Türkçe harfler de harf sayıldığı için "çay" araması "çaydanlık" içinde tam kelime olarak eşleşmez.',
      'Türkçe sondan eklemeli bir dil olduğundan bu seçenek çekimli biçimleri de dışarıda bırakır: tam kelime olarak "ev" aradığınızda "evler", "evde", "evin" değişmez. Kesme işaretiyle ayrılan ekler ise farklıdır; "Ankara\'da" ifadesinde kesme işareti sınır sayıldığından "Ankara" tam kelime olarak bulunur.',
    ] },
    { h: 'Düzenli ifade (regex) kipi', p: [
      'Düzenli ifadeler, sabit bir kelime yerine bir <em>desen</em> aramanızı sağlar. Bu kipte bulunacak ifade JavaScript düzenli ifadesi olarak yorumlanır ve yerine yazılacak ifadede yakalama gruplarına <code>$1</code>, <code>$2</code> ile, eşleşmenin tamamına <code>$&</code> ile başvurabilirsiniz. Düz dolar işareti yazmak için <code>$$</code> kullanılır.',
    ], ul: [
      '<code> +</code> ifadesini tek boşlukla değiştirmek, art arda gelen boşlukları teke indirir: <code>a  b   c</code> metni <code>a b c</code> olur.',
      '<code>(\\d{2})\\.(\\d{2})\\.(\\d{4})</code> desenini <code>$3-$2-$1</code> ile değiştirmek, 15.03.2026 biçimindeki tarihleri 2026-03-15 biçimine çevirir.',
      '<code>\\d+</code> bütün sayı dizilerini, <code>^\\s+</code> satır başındaki boşlukları bulur. Nokta, parantez, artı, yıldız, soru işareti gibi özel karakterleri düz anlamıyla aramak için önlerine ters eğik çizgi koyun.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', ul: [
      'Düz metin kipinde her şey yazıldığı gibi aranır; parantez, nokta ya da dolar işareti özel anlam taşımaz. Yerine yazılan ifadedeki <code>$1</code> de olduğu gibi eklenir.',
      'Değiştirme tek geçişte yapılır; yeni eklenen metnin içinde yeniden arama yapılmaz. Böylece "a" harfini "aa" ile değiştirmek sonsuz döngüye girmez.',
      'Düzenli ifade kipinde harf ayrımsız arama, Türkçe i ve ı ayrımını değil genel Unicode kurallarını kullanır.',
      'Özgün metniniz kutuda değişmeden durur; sonuç beklediğiniz gibi değilse seçenekleri değiştirip yeniden deneyebilirsiniz. Önemli belgelerde sonucu kullanmadan önce bir kez okuyun.',
      'Düzenli ifade kipinde <code>^</code> ve <code>$</code> işaretleri her satırın başını ve sonunu gösterir.',
      'Metin uzunluğu 2.000.000 karakterle sınırlıdır.',
    ] },
  ],
  faq: [
    ['Bir kelimeyi metinden tamamen nasıl silerim?', 'Kelimeyi "Bulunacak ifade" alanına yazın ve "Yerine yazılacak ifade" alanını boş bırakın. Bütün eşleşmeler silinir. Kelimeyle birlikte yanındaki boşluğun da gitmesini istiyorsanız aranan ifadeye boşluğu da ekleyin.'],
    ['"at" ararken "saat" kelimesi neden değişti?', 'Varsayılan ayarda araç, aranan ifadeyi kelimelerin içinde de bulur. Yalnızca bağımsız kelimeleri değiştirmek için "Eşleşme kapsamı" seçeneğini "Yalnızca tam kelime" yapın.'],
    ['Büyük I ile küçük ı aynı harf sayılıyor mu?', 'Düz metin kipinde ve harf ayrımı kapalıyken evet: araç Türkçe kurallarını uygular, I ile ı ve İ ile i eşleşir. Büyük I ile noktalı küçük i ise aynı sayılmaz.'],
    ['Aynı anda birden fazla kelimeyi değiştirebilir miyim?', 'Araç her seferinde tek bir ifadeyi değiştirir. Birkaç farklı değişiklik için sonucu kopyalayıp metin kutusuna yapıştırın ve bir sonraki ifadeyle işlemi yineleyin. Düzenli ifade kipinde dikey çizgiyle (elma|armut) birden çok kelimeyi aynı ifadeyle değiştirebilirsiniz.'],
    ['Satır sonlarını ya da sekmeleri değiştirebilir miyim?', 'Evet, düzenli ifade kipinde. Bulunacak ifadeye satır sonu için \\n, sekme için \\t yazın. Örneğin \\n ifadesini virgül ve boşlukla değiştirmek alt alta satırları tek satırlık virgüllü listeye çevirir.'],
    ['Düzenli ifadem "geçersiz" hatası veriyor, neden?', 'Çoğunlukla kapatılmamış bir parantez ya da köşeli parantez, tek başına kalmış bir yıldız veya artı işareti neden olur. Nokta, parantez, soru işareti gibi karakterleri düz anlamıyla arıyorsanız önlerine ters eğik çizgi koyun ya da düz metin kipine dönün.'],
    ['Hiç eşleşme bulunamadı diyor, ne yapmalıyım?', 'Aranan ifadede fazladan boşluk olup olmadığına, harf ayrımının açık olup olmadığına ve tam kelime seçeneğine bakın. Kopyalanmış metinlerde düz boşluk yerine bölünemez boşluk ya da düz tırnak yerine kıvrık tırnak bulunması da eşleşmeyi engelleyebilir.'],
    ['Metnim sunucuya gönderiliyor mu?', 'Hayır. Arama ve değiştirme tamamen tarayıcınızda yapılır; sözleşme ya da yazışma gibi özel metinler dahil hiçbir içerik sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['regex-test', 'metin-karsilastir', 'bosluk-temizle', 'turkce-karakter-donustur', 'buyuk-kucuk-harf-donustur', 'onek-sonek-ekle'],
};
