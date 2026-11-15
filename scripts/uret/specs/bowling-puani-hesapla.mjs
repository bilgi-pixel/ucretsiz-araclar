export default {
  slug: 'bowling-puani-hesapla',
  title: 'Bowling Puanı Hesaplama',
  h1Tail: 'strike ve spare bonuslarıyla',
  pageTitle: 'Bowling Puanı Hesaplama – Strike ve Spare ile Skor Hesabı',
  description: 'Bowling atışlarınızı X, / ve rakamlarla yazın; strike ve spare bonuslarıyla çerçeve çerçeve toplam puanınızı ve kümülatif skor tablonuzu hesaplayın.',
  card: 'Atışlarınızı X, / ve rakamlarla yazın; strike ve spare bonuslarıyla çerçeve çerçeve bowling skorunuzu hesaplayın.',
  category: 'gunluk',
  keywords: ['bowling puanı hesaplama', 'bowling skor hesaplama', 'bowling puanlama', 'strike spare puan', 'bowling nasıl sayılır', 'bowling skor tablosu', 'bowling 300 puan'],
  lead: 'On çerçevelik bir bowling oyununun puanını <strong>strike ve spare bonuslarıyla</strong> birlikte hesaplayın. Atışlarınızı skor kâğıdındaki gibi yazmanız yeterli; araç her çerçevenin puanını ve kümülatif toplamı çıkarır, yarım kalan oyunlarda o ana kadar kesinleşen skoru gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'atislar', label: 'Atışlar', type: 'text', wide: true, placeholder: 'Örn. X 7/ 9- X -8 8/ -6 X X X81', hint: 'X = strike, / = spare, - = ıska (0), F = faul, 1–9 = devrilen lobut. Çerçeveleri boşlukla ayırabilirsiniz.' },
  ],
  compute(v, h) {
    const ham = String(v.atislar ?? '').toUpperCase().replace(/[\s,;|]+/g, '');
    if (ham === '') h.err('"Atışlar" alanına atışlarınızı yazın (örn. X 7/ 9- 81 ...).');
    const rolls = [];
    const spareIsareti = [];
    for (const c of ham) {
      if (c === 'X') { rolls.push(10); spareIsareti.push(false); }
      else if (c === '-' || c === 'F' || c === '−' || c === '–') { rolls.push(0); spareIsareti.push(false); }
      else if (c >= '0' && c <= '9') { rolls.push(Number(c)); spareIsareti.push(false); }
      else if (c === '/') {
        const n = rolls.length;
        if (n === 0 || rolls[n - 1] === 10 || spareIsareti[n - 1]) h.err('"/" işareti yalnızca bir çerçevenin ikinci atışında, ilk atışın ardından kullanılabilir.');
        rolls.push(10 - rolls[n - 1]); spareIsareti.push(true);
      } else h.err(`Tanınmayan karakter: "${c}". Yalnızca X, /, -, F ve 0–9 rakamlarını kullanın; strike için 10 değil X yazın.`);
    }
    const n = rolls.length;
    const izinli = new Set();
    const cerceveler = [];
    let i = 0, toplam = 0, strike = 0, spare = 0, acik = 0, yarim = false;
    for (let f = 1; f <= 10 && i < n; f++) {
      if (f < 10) {
        if (rolls[i] === 10) {
          if (i + 2 >= n) { yarim = true; i = n; break; }
          toplam += 10 + rolls[i + 1] + rolls[i + 2]; strike++;
          cerceveler.push([f, 'X', toplam]); i += 1;
        } else {
          if (i + 1 >= n) { yarim = true; i = n; break; }
          const a = rolls[i], b = rolls[i + 1];
          if (a + b > 10) h.err(`${f}. çerçevede iki atışın toplamı 10'u geçiyor (${a} + ${b}). Atışları kontrol edin.`);
          izinli.add(i + 1);
          const yazi = (a === 0 ? '-' : String(a)) + (a + b === 10 ? '/' : b === 0 ? '-' : String(b));
          if (a + b === 10) {
            if (i + 2 >= n) { yarim = true; i = n; break; }
            toplam += 10 + rolls[i + 2]; spare++;
          } else { toplam += a + b; acik++; }
          cerceveler.push([f, yazi, toplam]); i += 2;
        }
      } else {
        const a = rolls[i], b = rolls[i + 1], c = rolls[i + 2];
        const g = (x) => (x === 10 ? 'X' : x === 0 ? '-' : String(x));
        if (b === undefined) { yarim = true; i = n; break; }
        if (a === 10) {
          if (c === undefined) { yarim = true; i = n; break; }
          if (b < 10 && b + c > 10) h.err(`10. çerçevede strike sonrası iki atışın toplamı 10'u geçiyor (${b} + ${c}).`);
          izinli.add(i + 2);
          strike++; if (b === 10) { strike++; if (c === 10) strike++; } else if (b + c === 10) spare++;
          toplam += 10 + b + c;
          cerceveler.push([10, 'X' + g(b) + (b < 10 && b + c === 10 ? '/' : g(c)), toplam]); i += 3;
        } else if (a + b === 10) {
          izinli.add(i + 1);
          if (c === undefined) { yarim = true; i = n; break; }
          spare++; if (c === 10) strike++;
          toplam += 10 + c;
          cerceveler.push([10, g(a) + '/' + g(c), toplam]); i += 3;
        } else {
          if (a + b > 10) h.err(`10. çerçevede iki atışın toplamı 10'u geçiyor (${a} + ${b}).`);
          izinli.add(i + 1);
          acik++; toplam += a + b;
          cerceveler.push([10, g(a) + g(b), toplam]); i += 2;
        }
      }
    }
    if (i < n) h.err(`Fazla atış var: oyun 10 çerçevede bitti ama ${n - i} atış daha yazılmış. Açık 10. çerçevede bonus atışı yapılmaz.`);
    for (let j = 0; j < n; j++) if (spareIsareti[j] && !izinli.has(j)) h.err('"/" işareti yanlış yerde: spare yalnızca bir çerçevenin ikinci atışında (10. çerçevede strike sonrası üçüncü atışta) olabilir.');
    const bitti = cerceveler.length === 10;
    const rows = [
      [bitti ? 'Toplam puan' : 'Kesinleşen puan', String(toplam)],
      ['Puanı kesinleşen çerçeve', `${cerceveler.length} / 10`],
      ['Strike sayısı', String(strike)],
      ['Spare sayısı', String(spare)],
      ['Açık çerçeve', String(acik)],
    ];
    const text = cerceveler.length
      ? cerceveler.map(([f, y, t]) => `${f}. çerçeve: ${y} → ${t}`).join('\n')
      : 'Henüz puanı kesinleşen çerçeve yok.';
    return {
      rows, text,
      note: bitti ? 'Oyun tamamlandı. En yüksek olası puan 300\'dür (art arda 12 strike).' : (yarim || !bitti) ? 'Oyun tamamlanmamış: strike ve spare çerçevelerinin puanı, bonus atışları yapılınca kesinleşir. Yalnızca kesinleşen çerçeveler toplandı.' : '',
    };
  },
  cases: [
    { in: { atislar: 'X 7/ 9- X -8 8/ -6 X X X81' }, out: { 'Toplam puan': '167', 'Puanı kesinleşen çerçeve': '10 / 10', 'Strike sayısı': '5', 'Spare sayısı': '2', 'Açık çerçeve': '3' }, textMatch: '^1\\. çerçeve: X → 20\\n2\\. çerçeve: 7/ → 39\\n3\\. çerçeve: 9- → 48\\n' },
    { in: { atislar: 'X X X X X X X X X XXX' }, out: { 'Toplam puan': '300', 'Strike sayısı': '12', 'Spare sayısı': '0' } },
    { in: { atislar: '9/ 9/ 9/ 9/ 9/ 9/ 9/ 9/ 9/ 9/9' }, out: { 'Toplam puan': '190', 'Spare sayısı': '10', 'Strike sayısı': '0' } },
    { in: { atislar: '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-' }, out: { 'Toplam puan': '90', 'Açık çerçeve': '10' } },
    { in: { atislar: '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5' }, out: { 'Toplam puan': '150' } },
    { in: { atislar: '-- -- -- -- -- -- -- -- -- --' }, out: { 'Toplam puan': '0' } },
    { in: { atislar: 'X 7/ 9-' }, out: { 'Kesinleşen puan': '48', 'Puanı kesinleşen çerçeve': '3 / 10' } },
    { in: { atislar: 'X X 7' }, out: { 'Kesinleşen puan': '27', 'Puanı kesinleşen çerçeve': '1 / 10' } },
    { in: { atislar: '11 11 11 11 11 11 11 11 11 X7/' }, out: { 'Toplam puan': '38', 'Strike sayısı': '1', 'Spare sayısı': '1' } },
    { in: { atislar: '85 X' }, error: true },
    { in: { atislar: '' }, error: true },
    { in: { atislar: '72 / X' }, error: true },
    { in: { atislar: '9- 9- 9- 9- 9- 9- 9- 9- 9- 9- 5' }, error: true },
    { in: { atislar: 'strike' }, error: true },
  ],
  howto: [
    'Atışlarınızı skor kâğıdındaki sırayla yazın. Strike için <code>X</code>, spare için ilk atıştan sonra <code>/</code>, hiç lobut devrilmeyen atış için <code>-</code> kullanın.',
    'Çerçeveleri boşlukla ayırmanız okumayı kolaylaştırır ama zorunlu değildir; <code>X7/9-</code> ile <code>X 7/ 9-</code> aynı şeydir.',
    'Onuncu çerçevede strike ya da spare yaptıysanız bonus atışlarını da ekleyin; örneğin <code>X81</code> ya da <code>9/X</code>.',
    '"Hesapla" düğmesine basın. Üstte toplam puan, altta her çerçevenin işareti ve o çerçeve sonundaki kümülatif skor listelenir.',
    'Oyun sürerken de kullanabilirsiniz: yarım bıraktığınız dizide araç yalnızca bonusu belli olan çerçeveleri toplar.',
  ],
  sections: [
    { h: 'Bowlingde puan nasıl sayılır?', p: [
      'Klasik on lobutlu bowlingde oyun on çerçeveden oluşur. Her çerçevede on lobutu devirmek için en fazla iki atış hakkınız vardır. İki atışta lobutların hepsini deviremezseniz bu <em>açık çerçeve</em> olur ve yalnızca devirdiğiniz lobut sayısı kadar puan alırsınız. İşi ilginç kılan, on lobutun tamamını devirdiğinizde gelen bonuslardır.',
      '<strong>Spare</strong>, on lobutu iki atışta devirmektir. Çerçevenin puanı 10 artı <em>bir sonraki tek atışta</em> devrilen lobut sayısıdır. <strong>Strike</strong>, on lobutu ilk atışta devirmektir; çerçeve orada biter ve puanı 10 artı <em>sonraki iki atışta</em> devrilen lobutların toplamıdır. Bu yüzden strike ya da spare yapılan bir çerçevenin puanı hemen yazılamaz; sonraki atışlar beklenir.',
    ] },
    { h: 'Onuncu çerçevenin özel kuralı', p: [
      'Son çerçevede bonus atışlarının yapılabileceği başka çerçeve kalmadığı için kural değişir. Onuncu çerçevede strike atarsanız iki atış daha, spare yaparsanız bir atış daha hakkınız olur. Bu ek atışlar yalnızca bonus içindir; kendi başlarına yeni bonus doğurmazlar. Açık kalan onuncu çerçevede ise üçüncü atış yoktur. Mükemmel oyun bu nedenle on değil <strong>on iki strike</strong> gerektirir ve 300 puan eder.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Dizi şu olsun: <code>X 7/ 9- X -8 8/ -6 X X X81</code>. Birinci çerçeve strike; sonraki iki atış 7 ve 3 olduğundan 10 + 10 = 20. İkinci çerçeve spare; sonraki atış 9, yani 10 + 9 = 19, toplam 39. Üçüncü çerçeve açık: 9 puan, toplam 48. Dördüncü çerçeve strike; sonraki iki atış 0 ve 8, yani 18, toplam 66. Beşinci çerçeve 8 puanla 74\'e çıkar.',
      'Altıncı çerçeve spare; sonraki atış ıska olduğu için yalnızca 10 puan, toplam 84. Yedinci çerçeve 6 puanla 90. Sekizinci çerçeve strike ve ardından iki strike daha geldiği için 30 puan, toplam 120. Dokuzuncu çerçeve strike; sonraki iki atış X ve 8, yani 28, toplam 148. Onuncu çerçeve X, 8, 1 ile 19 puan getirir ve oyun <strong>167</strong> ile biter. Aracın ürettiği tablo bu adımları satır satır gösterir.',
    ] },
    { h: 'Yazım kuralları ve sık yapılan hatalar', ul: [
      '<strong>Strike için 10 yazmak:</strong> Araç her karakteri bir atış sayar; "10" yazarsanız 1 ve 0 olarak okunur. Strike daima <code>X</code> ile gösterilir.',
      '<strong>Spare\'i rakamla yazmak:</strong> 7 lobuttan sonra kalan 3 lobutu devirdiyseniz <code>73</code> de <code>7/</code> de kabul edilir; ikisi aynı puanı verir.',
      '<strong>Iskayı boş bırakmak:</strong> Hiç lobut devrilmeyen atış <code>-</code> ya da <code>0</code> ile yazılmalıdır, yoksa sonraki atışlar bir öne kayar.',
      '<strong>Faul:</strong> Çizgiyi geçtiğiniz atış geçersizdir ve 0 sayılır; <code>F</code> yazabilirsiniz.',
      '<strong>Bir çerçevede 10\'dan fazla lobut:</strong> <code>85</code> gibi bir çerçeve olanaksızdır; araç hangi çerçevede hata olduğunu bildirir.',
    ] },
    { h: 'Puanlar ne anlama gelir?', p: [
      'Bütün çerçeveleri 9 lobutla açık bırakan biri 90 puan alır. Her çerçevede 9 lobut devirip spare tamamlayan ve bonus atışında yine 9 yapan oyuncu 190 puana ulaşır; aradaki 100 puanlık fark yalnızca spare bonuslarından gelir. Bu örnek, yeni başlayanlar için en verimli gelişme yolunun strike kovalamaktan çok, kalan lobutları temizlemeyi öğrenmek olduğunu gösterir.',
      'Art arda gelen strike\'lar puanı katlar: iki strike üst üste geldiğinde ilk çerçeve en az 20, üç strike üst üste geldiğinde tam 30 puan eder. Eğlence amaçlı oynayanların skorları çoğunlukla 100\'ün altında ya da çevresinde gezer; düzenli lig oyuncuları belirgin biçimde daha yüksek ortalamalar tutturur. 300 puanlık mükemmel oyun ise deneyimli oyuncular için bile seyrek görülen bir başarıdır.',
    ] },
    { h: 'Kapsam', p: [
      'Araç, salonlarda yaygın olan geleneksel on lobutlu puanlamayı uygular. Bazı turnuvalarda denenen ve her çerçevenin kendi içinde sabit bonusla puanlandığı güncel puanlama türleri, dokuz lobutlu ya da mum lobutlu bowling gibi farklı oyunlar bu hesabın dışındadır. Handikap puanı da eklenmez; ligde handikap kullanılıyorsa çıkan skora ayrıca eklemeniz gerekir.',
    ] },
  ],
  faq: [
    ['Bowlingde en yüksek puan kaçtır?', '300 puandır. Bunun için ilk dokuz çerçevede strike, onuncu çerçevede de üç strike olmak üzere art arda on iki strike atmak gerekir. Her çerçeve 30 puan eder.'],
    ['Strike ile spare arasındaki fark nedir?', 'Strike on lobutu ilk atışta, spare iki atışta devirmektir. Strike sonraki iki atışı, spare yalnızca sonraki tek atışı bonus olarak alır. Bu yüzden strike sonrası iyi atışlar spare sonrasına göre daha çok puan kazandırır.'],
    ['Skor tablosunda X, / ve - ne demek?', 'X strike, / spare, - ise hiç lobut devrilmeyen atıştır. Rakamlar o atışta devrilen lobut sayısını gösterir. Örneğin "7/" ilk atışta 7 lobut, ikinci atışta kalan 3 lobut devrildi anlamına gelir.'],
    ['Strike attıktan sonra puanım neden hemen yazılmıyor?', 'Çünkü strike çerçevesinin puanı sonraki iki atışa bağlıdır. O atışlar yapılana kadar çerçevenin değeri bilinmez. Araç da yarım dizilerde bu çerçeveleri "kesinleşmemiş" sayar ve toplama katmaz.'],
    ['Onuncu çerçevede neden üç atış yapılabiliyor?', 'Son çerçevede yapılan strike ya da spare\'in bonusunu sayabilmek için. Strike sonrası iki, spare sonrası bir ek atış verilir. Onuncu çerçeveyi açık bırakırsanız ek atış hakkı doğmaz.'],
    ['Bütün atışlarım spare olursa kaç puan alırım?', 'Bu, her çerçevenin ilk atışına bağlıdır. Her çerçevede 5 lobut devirip spare tamamlar ve bonus atışında da 5 yaparsanız 150; her seferinde 9 lobut devirirseniz 190 puan alırsınız.'],
    ['Birden fazla oyuncunun skorunu hesaplayabilir miyim?', 'Araç bir seferde tek oyuncunun dizisini hesaplar. Her oyuncunun atışlarını sırayla yazıp sonuçları kopyalayarak karşılaştırabilirsiniz; toplamları yan yana sıralamak için puan tablosu aracından yararlanabilirsiniz.'],
    ['Yazdığım skorlar bir yere kaydediliyor mu?', 'Hayır. Puan tarayıcınızda hesaplanır; atışlarınız sunucuya gönderilmez ve sayfayı kapattığınızda silinir.'],
  ],
  related: ['oyun-puan-tablosu', 'satranc-elo-hesapla', 'iki-zar-olasilik-hesapla', 'gol-averaji-hesapla', 'rastgele-takim-olustur'],
};
