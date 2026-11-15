export default {
  slug: 'hoparlor-kablo-hesapla',
  title: 'Hoparlör Kablosu Kesiti Hesaplama',
  h1Tail: 'uzunluk ve empedansa göre',
  pageTitle: 'Hoparlör Kablosu Kesiti Hesaplama – Kaç mm² Kablo Gerekir?',
  description: 'Hoparlör kablosu kaç mm² olmalı? Kablo uzunluğunu ve hoparlör empedansını girin; önerilen bakır kesiti, kablo direncini ve desibel cinsinden seviye kaybını görün.',
  card: 'Kablo uzunluğu ve hoparlör empedansına göre gereken bakır kesitini, kablo direncini ve seviye kaybını hesaplayın.',
  category: 'gunluk',
  keywords: ['hoparlör kablosu kesiti', 'hoparlör kablosu kaç mm', 'hoparlör kablosu hesaplama', 'ses kablosu kalınlığı', 'hoparlör kablo direnci', 'ev sineması kablo', '2x1,5 hoparlör kablosu'],
  lead: 'Amfi ile hoparlör arasına çekeceğiniz kablonun kesiti, uzunluğa ve hoparlörün empedansına göre seçilir. Tek yön uzunluğu ve empedansı girin; araç kablo direncini empedansın belirlediğiniz yüzdesinin altında tutan <strong>en küçük standart bakır kesitini</strong>, bu kesitteki direnci ve seviye kaybını verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Kablo uzunluğu, tek yön (m)', type: 'number', placeholder: 'Örn. 10', hint: 'Amfiden hoparlöre olan mesafe; gidiş-dönüş hesaba otomatik katılır' },
    { id: 'empedans', label: 'Hoparlör empedansı', type: 'select', options: [['8', '8 Ω'], ['6', '6 Ω'], ['4', '4 Ω'], ['2', '2 Ω'], ['16', '16 Ω']] },
    { id: 'pay', label: 'İzin verilen kablo direnci (empedansın %\'si)', type: 'number', value: '5', hint: 'Yaygın kural %5; daha titiz kurulumlar için 2–3 yazın' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Kablo uzunluğu');
    const Z = Number(v.empedans) || 8;
    const p = h.pos(v.pay, 'İzin verilen kablo direnci');
    if (p > 50) h.err('İzin verilen oran %50\'den büyük olamaz; genellikle %5 kullanılır.');
    const rho = 0.0172;
    const minKesit = rho * 2 * L / (Z * p / 100);
    const standart = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16];
    const secilen = standart.find((s) => s >= minKesit - 1e-9);
    if (!secilen) h.err('Bu uzunluk için 16 mm²\'den kalın kablo gerekiyor. Amfiyi hoparlöre yaklaştırın ya da izin verilen oranı yükseltin.');
    const R = rho * 2 * L / secilen;
    const oran = R / Z * 100;
    const db = 20 * Math.log10((Z + R) / Z);
    return {
      rows: [
        ['Önerilen kablo kesiti', '2 × ' + h.fmt(secilen, 2) + ' mm²'],
        ['Hesaplanan en küçük kesit', h.fmt(minKesit, 2) + ' mm²'],
        ['Kablo direnci (gidiş-dönüş)', h.fmt(R, 3) + ' Ω'],
        ['Direncin empedansa oranı', '%' + h.fmt(oran, 2)],
        ['Seviye kaybı', h.fmt(db, 2) + ' dB'],
        ['Toplam iletken uzunluğu', h.fmt(2 * L, 1) + ' m'],
      ],
      note: 'Bakır iletken ve 20 °C için 0,0172 Ω·mm²/m özdirenç kullanılır. Bakır kaplı alüminyum (CCA) kablolarda bir üst kesiti seçin.',
    };
  },
  cases: [
    { in: { uzunluk: '10', empedans: '8', pay: '5' }, out: { 'Önerilen kablo kesiti': '2 × 1 mm²', 'Hesaplanan en küçük kesit': '0,86 mm²', 'Kablo direnci (gidiş-dönüş)': '0,344 Ω', 'Direncin empedansa oranı': '%4,3', 'Seviye kaybı': '0,37 dB' } },
    { in: { uzunluk: '20', empedans: '4', pay: '5' }, out: { 'Önerilen kablo kesiti': '2 × 4 mm²', 'Hesaplanan en küçük kesit': '3,44 mm²', 'Kablo direnci (gidiş-dönüş)': '0,172 Ω' } },
    { in: { uzunluk: '15', empedans: '6', pay: '5' }, out: { 'Önerilen kablo kesiti': '2 × 2,5 mm²', 'Hesaplanan en küçük kesit': '1,72 mm²', 'Direncin empedansa oranı': '%3,44', 'Seviye kaybı': '0,29 dB' } },
    { in: { uzunluk: '30', empedans: '8', pay: '2' }, out: { 'Önerilen kablo kesiti': '2 × 10 mm²', 'Hesaplanan en küçük kesit': '6,45 mm²', 'Seviye kaybı': '0,11 dB' } },
    { in: { uzunluk: '3', empedans: '4', pay: '5' }, out: { 'Önerilen kablo kesiti': '2 × 0,75 mm²', 'Toplam iletken uzunluğu': '6 m' } },
    { in: { uzunluk: '5', empedans: '8', pay: '5' }, out: { 'Önerilen kablo kesiti': '2 × 0,5 mm²', 'Hesaplanan en küçük kesit': '0,43 mm²' } },
    { in: { uzunluk: '200', empedans: '2', pay: '5' }, error: true },
    { in: { uzunluk: '-4', empedans: '8', pay: '5' }, error: true },
  ],
  howto: [
    'Amfi ya da alıcı ile hoparlör arasındaki kablo güzergâhını ölçün ve tek yön uzunluğu metre olarak yazın. Kablo duvar dibinden ya da süpürgelik içinden dolaşacaksa kuş uçuşu mesafeyi değil gerçek güzergâhı ölçün.',
    'Hoparlörün arkasındaki etikette yazan anma empedansını seçin. Ev tipi hoparlörlerin çoğu 4, 6 ya da 8 ohm\'dur.',
    'İzin verilen kablo direncini yüzde olarak girin. Emin değilseniz varsayılan %5 değerini bırakın.',
    '"Hesapla" düğmesine basın. İlk satırdaki kesit, piyasada satılan standart çift damarlı hoparlör kablosu ölçüsüdür.',
    'Birden fazla hoparlör için en uzun hattı hesaplayıp tüm kanallarda aynı kesiti kullanmak hem pratik hem de dengelidir.',
  ],
  sections: [
    { h: 'Kablo kesiti sesi neden etkiler?', p: [
      'Hoparlör kablosu, amfi ile hoparlör arasına seri bağlanmış küçük bir dirençtir. Bu direnç büyüdükçe amfinin ürettiği gücün bir bölümü kabloda ısıya dönüşür ve hoparlöre ulaşan seviye düşer. Daha önemlisi, hoparlörün empedansı frekansa göre değiştiği için kablo direnci yüksekse bu değişim frekans tepkisine yansır ve amfinin hoparlör konisini denetleme yeteneği (sönümleme) zayıflar.',
      'Bu etkiyi duyulmaz düzeyde tutmak için yaygın olarak kullanılan kural, kablonun gidiş-dönüş toplam direncinin hoparlör anma empedansının <strong>%5\'ini aşmamasıdır</strong>. Bu sınırda seviye kaybı yarım desibelin altında kalır. Stüdyo monitörleri ve yüksek sadakatli kurulumlarda bazı kullanıcılar %2–3 gibi daha sıkı bir sınır tercih eder.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Bir iletkenin direnci <strong>R = ρ × uzunluk ÷ kesit</strong> bağıntısıyla bulunur. Bakır için özdirenç ρ, 20 °C\'de yaklaşık 0,0172 Ω·mm²/m\'dir. Akım hoparlöre bir damardan gidip diğerinden döndüğü için uzunluk, tek yön mesafenin iki katı alınır. İzin verilen en büyük direnç empedans × yüzde olduğundan gereken en küçük kesit şöyle çıkar: <strong>kesit = ρ × 2 × L ÷ (Z × yüzde)</strong>.',
      'Örnek: 8 ohm\'luk bir hoparlöre 10 metre kablo çekeceksiniz ve %5 kuralını uyguluyorsunuz. İzin verilen direnç 8 × 0,05 = 0,4 Ω\'dur. Gereken kesit 0,0172 × 20 ÷ 0,4 = 0,86 mm² bulunur. Bunun üstündeki ilk standart ölçü 1 mm² olduğundan araç 2 × 1 mm² önerir. Bu kabloda direnç 0,0172 × 20 ÷ 1 = 0,344 Ω, empedansa oranı %4,3 ve seviye kaybı yaklaşık 0,37 dB olur.',
      'Aynı uzunlukta 4 ohm\'luk bir hoparlör için izin verilen direnç yarıya iner; bu yüzden gereken kesit iki katına çıkar. Düşük empedanslı hoparlörlerin ve araç ses sistemlerinin daha kalın kablo istemesinin nedeni budur.',
    ] },
    { h: 'Hızlı başvuru: %5 kuralına göre en uzun tek yön mesafe', p: [
      'Aşağıdaki değerler bakır kablo için aynı formülden türetilmiştir ve yaklaşık üst sınırlardır.',
    ], ul: [
      '<strong>2 × 0,75 mm²:</strong> 8 Ω için yaklaşık 8,7 m, 4 Ω için yaklaşık 4,4 m',
      '<strong>2 × 1,5 mm²:</strong> 8 Ω için yaklaşık 17 m, 4 Ω için yaklaşık 8,7 m',
      '<strong>2 × 2,5 mm²:</strong> 8 Ω için yaklaşık 29 m, 4 Ω için yaklaşık 14,5 m',
      '<strong>2 × 4 mm²:</strong> 8 Ω için yaklaşık 46 m, 4 Ω için yaklaşık 23 m',
    ] },
    { h: 'Kablo seçerken dikkat edilecekler', p: [
      'Piyasada "hoparlör kablosu" adıyla satılan ürünlerin bir bölümü saf bakır değil, bakır kaplı alüminyumdur (CCA). Alüminyumun özdirenci bakırınkinden belirgin biçimde yüksek olduğundan aynı kesitteki CCA kablonun direnci daha fazladır. Ambalajda "OFC" ya da "%100 bakır" ibaresi yoksa hesaplanan kesitin bir üst boyunu almak güvenli bir yaklaşımdır.',
      'Etikette yazan kesit ile gerçek iletken kesiti her zaman örtüşmeyebilir; kalın görünen kılıf, içindeki ince iletkeni gizleyebilir. Tereddütte kalırsanız kablonun bir metresinin direncini ölçü aletiyle kontrol etmek ya da güvenilir bir elektrik malzemecisinden standartlara uygun çok telli bakır kablo almak daha sağlıklıdır.',
      'Sol ve sağ kanal kablolarını aynı kesit ve yaklaşık aynı uzunlukta tutmak, iki hoparlörün eşit seviyede çalmasını kolaylaştırır. Artı ve eksi kutupları her iki uçta doğru eşleştirmeyi unutmayın; ters bağlanan bir hoparlör basların zayıflamasına yol açar. Kabloyu elektrik hattıyla uzun mesafe yan yana döşemekten kaçının.',
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      'Bu araç yalnızca düşük empedanslı (2–16 Ω) hoparlör hatları içindir. Mağaza, cami, okul ve fabrika anons sistemlerinde kullanılan 70 V ve 100 V hat trafolu sistemlerde hesap farklıdır; bu sistemler ince kabloyla uzun mesafeye izin verecek biçimde tasarlanmıştır. Hesap doğru akım direncine dayanır; kablonun endüktansı ve sığası ev tipi uzunluklarda ses bandında ihmal edilebilir düzeydedir ve dikkate alınmaz.',
      'Sonuçlar bilgilendirme amaçlıdır. Sıva altı ya da tavan içi sabit tesisatta kablonun yangın sınıfı ve döşeme koşulları ayrıca önem taşır; yüksek güçlü profesyonel ses sistemlerinde ve bina tesisatında yetkili bir elektrik ya da ses sistemleri uzmanına danışın.',
    ] },
  ],
  faq: [
    ['Ev sineması için hoparlör kablosu kaç mm² olmalı?', 'Oda içi 10 metreye kadar hatlarda 8 ohm hoparlörler için 2 × 1 mm² ya da 2 × 1,5 mm² yeterlidir. 4 ohm hoparlörlerde ya da 10–15 metreyi bulan arka kanal hatlarında 2 × 2,5 mm² seçmek uygun olur. Kendi ölçünüzü girerek kesin değeri görebilirsiniz.'],
    ['Daha kalın kablo sesi iyileştirir mi?', 'Kablo direnci zaten empedansın birkaç yüzdesinin altındaysa daha kalın kabloya geçmenin duyulabilir bir katkısı beklenmez. Kalın kablonun zararı yoktur; yalnızca maliyeti ve döşeme zorluğu artar.'],
    ['Neden tek yön uzunluk soruluyor?', 'Çünkü ölçmesi kolay olan budur. Akım bir damardan gidip diğerinden döndüğü için araç direnci hesaplarken uzunluğu kendiliğinden ikiyle çarpar; "Toplam iletken uzunluğu" satırında bu değeri görürsünüz.'],
    ['4 ohm hoparlör neden daha kalın kablo ister?', 'İzin verilen kablo direnci empedansın yüzdesi olarak belirlendiği için empedans yarıya indiğinde kabul edilebilir direnç de yarıya iner. Aynı uzunlukta bunu sağlamak için kesitin iki katına çıkması gerekir.'],
    ['Seviye kaybı satırı ne anlama geliyor?', 'Kablo direnci yüzünden hoparlöre ulaşan gerilimin, sıfır dirençli ideal bir kabloya göre kaç desibel düştüğünü gösterir. Yarım desibelin altındaki farklar normal dinlemede çoğu kişi tarafından ayırt edilmez.'],
    ['Araç ses sisteminde de kullanabilir miyim?', 'Hoparlör hatları için evet; araçlarda hoparlörler çoğunlukla 4 ohm, bas hoparlörleri 2 ohm olabilir. Aküden amfiye giden besleme kablosu ise farklı bir hesaptır; akıma ve gerilim düşümüne göre seçilir.'],
    ['AWG olarak verilen kablo ölçüsünü nasıl karşılaştırırım?', 'Yurt dışı kaynaklı kablolarda kesit AWG numarasıyla verilir; numara küçüldükçe kablo kalınlaşır. Yaklaşık olarak 18 AWG 0,82 mm², 16 AWG 1,31 mm², 14 AWG 2,08 mm² ve 12 AWG 3,31 mm² kesite karşılık gelir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız ölçüler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kablo-kesiti-hesapla', 'awg-mm2-cevir', 'gerilim-dusumu-hesapla', 'ohm-kanunu-hesapla', 'desibel-hesapla'],
};
