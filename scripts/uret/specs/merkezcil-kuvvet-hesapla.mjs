export default {
  slug: 'merkezcil-kuvvet-hesapla',
  title: 'Merkezcil Kuvvet Hesaplama',
  h1Tail: 'F = m · v² ÷ r',
  pageTitle: 'Merkezcil Kuvvet Hesaplama – F = mv²/r ile Kuvvet, Hız, Yarıçap',
  description: 'Düzgün çembersel harekette merkezcil kuvveti kütle, hız ve yarıçaptan hesaplayın; kuvvetten hızı, yarıçapı ya da kütleyi bulun. Merkezcil ivme ve periyot dahil.',
  card: 'F = mv²/r ile merkezcil kuvveti, hızı, yarıçapı ya da kütleyi bulun; merkezcil ivme, açısal hız ve periyot da gösterilir.',
  category: 'bilim',
  keywords: ['merkezcil kuvvet hesaplama', 'merkezcil kuvvet formülü', 'F = m v2 / r', 'merkezcil ivme hesaplama', 'çembersel hareket', 'düzgün çembersel hareket formülleri', 'viraj kuvveti'],
  lead: `Çembersel yörüngede dönen bir cismi yörüngede tutan <strong>merkezcil kuvveti</strong> hesaplayın ya da kuvveti bilinen hareketin hızını, yarıçapını, kütlesini bulun. Araç <strong>F = m · v² ÷ r</strong> bağıntısını kullanır; merkezcil ivmeyi, açısal hızı ve periyodu da verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['f', 'Merkezcil kuvvet (F)'], ['v', 'Çizgisel hız (v)'], ['r', 'Yarıçap (r)'], ['m', 'Kütle (m)']] },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 2', hint: 'Kütleyi arıyorsanız boş bırakın.' },
    { id: 'hiz', label: 'Çizgisel hız (m/s)', type: 'number', placeholder: 'Örn. 4', hint: 'Hızı arıyorsanız boş bırakın.' },
    { id: 'yaricap', label: 'Yarıçap (m)', type: 'number', placeholder: 'Örn. 8', hint: 'Yarıçapı arıyorsanız boş bırakın.' },
    { id: 'kuvvet', label: 'Merkezcil kuvvet (N)', type: 'number', placeholder: 'Örn. 4', hint: 'Kuvveti arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    let m, hiz, r, f;
    if (v.bul === 'v') {
      f = h.pos(v.kuvvet, 'Merkezcil kuvvet'); m = h.pos(v.kutle, 'Kütle'); r = h.pos(v.yaricap, 'Yarıçap');
      hiz = Math.sqrt((f * r) / m);
    } else if (v.bul === 'r') {
      f = h.pos(v.kuvvet, 'Merkezcil kuvvet'); m = h.pos(v.kutle, 'Kütle'); hiz = h.pos(v.hiz, 'Çizgisel hız');
      r = (m * hiz * hiz) / f;
    } else if (v.bul === 'm') {
      f = h.pos(v.kuvvet, 'Merkezcil kuvvet'); hiz = h.pos(v.hiz, 'Çizgisel hız'); r = h.pos(v.yaricap, 'Yarıçap');
      m = (f * r) / (hiz * hiz);
    } else {
      m = h.pos(v.kutle, 'Kütle'); hiz = h.pos(v.hiz, 'Çizgisel hız'); r = h.pos(v.yaricap, 'Yarıçap');
      f = (m * hiz * hiz) / r;
    }
    const s = {
      f: ['Merkezcil kuvvet', h.fmt(f, 4) + ' N'],
      v: ['Çizgisel hız', h.fmt(hiz, 4) + ' m/s'],
      r: ['Yarıçap', h.fmt(r, 4) + ' m'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
    };
    const sira = [v.bul in s ? v.bul : 'f', ...['f', 'm', 'v', 'r'].filter((k) => k !== (v.bul in s ? v.bul : 'f'))];
    const T = (2 * Math.PI * r) / hiz;
    return {
      rows: [
        ...sira.map((k) => s[k]),
        ['Merkezcil ivme', h.fmt((hiz * hiz) / r, 4) + ' m/s²'],
        ['Açısal hız', h.fmt(hiz / r, 4) + ' rad/s'],
        ['Periyot (bir tur süresi)', h.fmt(T, 4) + ' s'],
        ['Frekans', h.fmt(1 / T, 4) + ' Hz'],
      ],
      note: 'Sabit süratli (düzgün) çembersel hareket varsayılır. Merkezcil kuvvet her an yörüngenin merkezine yöneliktir.',
    };
  },
  cases: [
    { in: { bul: 'f', kutle: '2', hiz: '4', yaricap: '8' }, out: { 'Merkezcil kuvvet': '4 N', 'Merkezcil ivme': '2 m/s²', 'Açısal hız': '0,5 rad/s', 'Periyot (bir tur süresi)': '12,5664 s' } },
    { in: { bul: 'v', kutle: '4', yaricap: '1', kuvvet: '100' }, out: { 'Çizgisel hız': '5 m/s', 'Merkezcil ivme': '25 m/s²' } },
    { in: { bul: 'f', kutle: '1000', hiz: '20', yaricap: '50' }, out: { 'Merkezcil kuvvet': '8.000 N', 'Merkezcil ivme': '8 m/s²', 'Açısal hız': '0,4 rad/s' } },
    { in: { bul: 'r', kutle: '2', hiz: '10', kuvvet: '50' }, out: { 'Yarıçap': '4 m', 'Açısal hız': '2,5 rad/s' } },
    { in: { bul: 'm', hiz: '3', yaricap: '2', kuvvet: '90' }, out: { 'Kütle': '20 kg', 'Merkezcil ivme': '4,5 m/s²' } },
    { in: { bul: 'f', kutle: '0,5', hiz: '6', yaricap: '1,5' }, out: { 'Merkezcil kuvvet': '12 N', 'Merkezcil ivme': '24 m/s²', 'Açısal hız': '4 rad/s' } },
    { in: { bul: 'f', kutle: '1', hiz: '6,2832', yaricap: '1' }, out: { 'Periyot (bir tur süresi)': '1 s', 'Frekans': '1 Hz' } },
    { in: { bul: 'f', kutle: '2', hiz: '4', yaricap: '0' }, error: true },
    { in: { bul: 'v', kutle: '4', yaricap: '1', kuvvet: '' }, error: true },
    { in: { bul: 'f', kutle: '-2', hiz: '4', yaricap: '8' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden merkezcil kuvvet, çizgisel hız, yarıçap ya da kütleden hangisini aradığınızı seçin.`,
    `Bildiğiniz üç değeri yazın: kütle kilogram, hız m/s, yarıçap metre, kuvvet newton cinsindendir. Aranan büyüklüğün kutusu boş kalabilir.`,
    `Hızınız km/sa ise 3,6'ya bölerek m/s birimine çevirin; yarıçap yerine çap verilmişse ikiye bölün.`,
    `"Hesapla" düğmesine basın. İlk satır aradığınız sonuçtur; altında merkezcil ivme, açısal hız, bir turun süresi (periyot) ve frekans gösterilir.`,
  ],
  sections: [
    { h: 'Merkezcil kuvvet nedir?', p: [
      `Bir cisim kendi hâline bırakıldığında düz bir çizgi boyunca gitmek ister. Onu çembersel bir yörüngede tutmak için hız vektörünün yönünü sürekli değiştiren, yörüngenin merkezine doğru bir net kuvvet gerekir. Bu net kuvvete <strong>merkezcil kuvvet</strong> denir. Sürat sabit olsa bile hızın yönü değiştiği için cisim ivmelidir; bu ivmeye de <em>merkezcil ivme</em> denir ve o da merkeze yöneliktir.`,
      `Merkezcil kuvvet yeni bir kuvvet türü değildir; mevcut kuvvetlerin üstlendiği bir <em>roldür</em>. İpe bağlı döndürülen taşta bu rolü ip gerilmesi, virajı dönen araçta lastik ile yol arasındaki sürtünme, Dünya çevresinde dolanan uyduda kütle çekim kuvveti, çamaşır makinesinde tamburun çeperinin uyguladığı tepki kuvveti üstlenir. Kuvvet ortadan kalkarsa cisim merkezden dışarı fırlamaz; o andaki hız yönünde, yani çembere teğet doğrultuda düz gider.`,
    ] },
    { h: 'Formüller', p: [
      `Kütlesi m olan cisim r yarıçaplı çemberde v çizgisel hızıyla dönüyorsa merkezcil kuvvet <strong>F = m · v² ÷ r</strong> olur. Merkezcil ivme <strong>a = v² ÷ r</strong> olduğundan bu, Newton'un ikinci yasasının (F = m · a) çembersel harekete uygulanmış hâlidir.`,
    ], ul: [
      `<strong>Hız için:</strong> v = √(F · r ÷ m)`,
      `<strong>Yarıçap için:</strong> r = m · v² ÷ F`,
      `<strong>Kütle için:</strong> m = F · r ÷ v²`,
      `<strong>Açısal hız:</strong> ω = v ÷ r (rad/s); bununla kuvvet F = m · ω² · r biçiminde de yazılır`,
      `<strong>Periyot:</strong> T = 2π · r ÷ v; frekans f = 1 ÷ T`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 2 kg'lık cisim 8 m yarıçaplı çemberde 4 m/s hızla dönüyor. F = 2 × 4² ÷ 8 = 32 ÷ 8 = <strong>4 N</strong>. Merkezcil ivme 16 ÷ 8 = 2 m/s², açısal hız 4 ÷ 8 = 0,5 rad/s, periyot 2π × 8 ÷ 4 ≈ 12,57 s'dir.`,
      `<strong>Örnek 2:</strong> 1000 kg kütleli otomobil 50 m yarıçaplı virajı 20 m/s (72 km/sa) hızla dönüyor. Gerekli merkezcil kuvvet F = 1000 × 20² ÷ 50 = <strong>8000 N</strong>. Bu kuvveti lastiklerle yol arasındaki sürtünme sağlamak zorundadır.`,
      `<strong>Örnek 3:</strong> 1 m uzunluğundaki ipe bağlı 4 kg'lık cisim yatay düzlemde döndürülüyor ve ip en fazla 100 N taşıyabiliyor. Ulaşılabilecek en büyük hız v = √(100 × 1 ÷ 4) = √25 = <strong>5 m/s</strong> olur.`,
      `<strong>Örnek 4:</strong> 10 m/s hızla dönen 2 kg'lık cisme 50 N merkezcil kuvvet etki ediyorsa yörünge yarıçapı r = 2 × 10² ÷ 50 = <strong>4 m</strong> bulunur.`,
      `<strong>Örnek 5:</strong> 2 m yarıçaplı çemberde 3 m/s hızla dönen cisme 90 N kuvvet etki ediyorsa kütlesi m = 90 × 2 ÷ 3² = <strong>20 kg</strong> olur.`,
    ] },
    { h: 'Virajlarda hız neden bu kadar önemli?', p: [
      `Formülde hızın karesi yer alır: aynı virajı iki kat hızla dönmek için dört kat merkezcil kuvvet gerekir. Yolun sağlayabileceği en büyük sürtünme kuvveti ise sınırlıdır; ıslak ya da buzlu zeminde bu sınır iyice düşer. Gerekli kuvvet sınırı aştığında araç virajın dışına doğru, teğet yönde kayar.`,
      `Yarıçap paydada olduğu için keskin virajlar (küçük r) aynı hızda daha büyük kuvvet ister. Otoyol virajlarının geniş yapılmasının ve yolun viraj içine doğru eğimlendirilmesinin nedeni budur; eğim sayesinde zeminin tepki kuvvetinin bir bileşeni de merkezcil kuvvete katkı sağlar.`,
    ] },
    { h: 'Merkezcil ve merkezkaç kuvvet farkı', p: [
      `Dönen bir arabanın içindeki yolcu kendini dışa doğru itiliyormuş gibi hisseder ve buna gündelik dilde merkezkaç kuvveti denir. Yerde duran bir gözlemciye göre ise yolcuyu dışarı iten gerçek bir kuvvet yoktur: yolcunun bedeni eylemsizliği nedeniyle düz gitmek ister, araba ise altından döner. Kapı ya da emniyet kemeri yolcuya içe doğru, yani merkezcil bir kuvvet uygular.`,
      `Merkezkaç kuvveti yalnızca dönen (ivmeli) gözlem çerçevesinde tanımlanan hayalî bir kuvvettir ve büyüklüğü merkezcil kuvvetle aynı, yönü terstir. Okul fiziğinde hesaplar çoğunlukla durgun gözlemciye göre yapılır ve yalnızca merkezcil kuvvet kullanılır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Hızın karesini almayı unutmak.`,
      `Yarıçap yerine çapı kullanmak; sonuç yarı değerde çıkar.`,
      `Çizgisel hız (m/s) ile açısal hızı (rad/s) karıştırmak; açısal hız verilmişse önce v = ω · r ile çizgisel hızı bulun.`,
      `Merkezcil kuvveti serbest cisim diyagramına ayrı bir kuvvet olarak eklemek; o, diğer kuvvetlerin merkeze yönelik bileşkesidir.`,
      `Araç sabit süratli, düzgün çembersel hareket içindir. Düşey çemberde dönme, eğimli viraj ya da hızın değiştiği durumlarda ek kuvvetlerin hesaba katılması gerekir. Sonuçlar eğitim amaçlıdır; yol, araç ya da makine güvenliği için tek başına karar ölçütü olarak kullanılmamalıdır.`,
    ] },
  ],
  faq: [
    ['Merkezcil kuvvet formülü nedir?', `Merkezcil kuvvet, kütle ile hızın karesinin çarpımının yarıçapa bölümüdür: F = m · v² ÷ r. Açısal hız cinsinden F = m · ω² · r olarak da yazılır.`],
    ['Merkezcil ivme nasıl hesaplanır?', `Çizgisel hızın karesi yarıçapa bölünür: a = v² ÷ r. Birimi m/s²'dir ve yönü her an çemberin merkezine doğrudur.`],
    ['Merkezcil kuvvetin yönü neresidir?', `Her zaman yörüngenin merkezine doğrudur ve hız vektörüne diktir. Harekete dik olduğu için iş yapmaz; cismin süratini değil, yalnızca hareket yönünü değiştirir.`],
    ['Hız iki katına çıkarsa merkezcil kuvvet ne olur?', `Dört katına çıkar, çünkü kuvvet hızın karesiyle orantılıdır. Yarıçap iki katına çıkarsa, hız sabitken kuvvet yarıya iner.`],
    ['İp koparsa cisim hangi yönde gider?', `Merkezcil kuvvet ortadan kalktığında cisim o andaki hızının yönünde, yani çembere teğet doğrultuda düz bir çizgi boyunca hareket eder; merkezden dışarı doğru fırlamaz.`],
    ['Merkezcil kuvvet ile merkezkaç kuvveti aynı mı?', `Hayır. Merkezcil kuvvet cismi merkeze çeken gerçek net kuvvettir. Merkezkaç kuvveti ise yalnızca dönen gözlemcinin hissettiği, eylemsizlikten kaynaklanan hayalî bir kuvvettir.`],
    ['Periyot ve frekans sonuçları ne anlama geliyor?', `Periyot cismin bir tam turu kaç saniyede tamamladığını, frekans ise bir saniyede kaç tur attığını gösterir. İkisi birbirinin tersidir: f = 1 ÷ T.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['aci-hizi-hesapla', 'kuvvet-hesapla', 'ivme-hesapla', 'surtunme-kuvveti-hesapla', 'yorunge-periyodu-hesapla'],
};
