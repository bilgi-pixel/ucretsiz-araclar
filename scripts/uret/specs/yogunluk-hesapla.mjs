export default {
  slug: 'yogunluk-hesapla',
  title: 'Yoğunluk Hesaplama',
  h1Tail: 'd = m ÷ V',
  pageTitle: 'Yoğunluk Hesaplama – d = m/V ile Özkütle, Kütle ve Hacim Bulma',
  description: 'Kütle ve hacimden yoğunluğu (özkütleyi) g/cm³ ve kg/m³ olarak hesaplayın; yoğunluktan kütleyi ya da hacmi bulun. Suda yüzer mi batar mı, birlikte görün.',
  card: 'd = m/V ile yoğunluğu g/cm³ ve kg/m³ olarak bulun; kütleyi ya da hacmi hesaplayın, suda yüzme durumunu görün.',
  category: 'bilim',
  keywords: ['yoğunluk hesaplama', 'özkütle hesaplama', 'yoğunluk formülü', 'd = m/V', 'kütle hacim yoğunluk', 'g/cm3 kg/m3 çevirme', 'yoğunluk nasıl bulunur', 'özkütle formülü'],
  lead: `Bir maddenin <strong>yoğunluğunu (özkütlesini)</strong> kütlesinden ve hacminden hesaplayın ya da yoğunluğu bilinen maddenin kütlesini, hacmini bulun. Araç <strong>d = m ÷ V</strong> bağıntısını kullanır, sonucu hem g/cm³ hem kg/m³ olarak verir ve maddenin suda yüzüp yüzmeyeceğini belirtir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['d', 'Yoğunluk (d)'], ['m', 'Kütle (m)'], ['hacim', 'Hacim (V)']] },
    { id: 'birim', label: 'Birim takımı', type: 'select', options: [['gcm', 'gram, cm³, g/cm³'], ['kgm', 'kilogram, m³, kg/m³']] },
    { id: 'kutle', label: 'Kütle', type: 'number', placeholder: 'Örn. 500', hint: 'Seçtiğiniz birim takımına göre gram ya da kilogram. Kütleyi arıyorsanız boş bırakın.' },
    { id: 'hacimDeger', label: 'Hacim', type: 'number', placeholder: 'Örn. 250', hint: 'cm³ ya da m³. 1 mL = 1 cm³, 1 L = 1000 cm³. Hacmi arıyorsanız boş bırakın.' },
    { id: 'yogunluk', label: 'Yoğunluk', type: 'number', placeholder: 'Örn. 2', hint: 'g/cm³ ya da kg/m³. Yoğunluğu arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    const kg = v.birim === 'kgm';
    const bM = kg ? 'kg' : 'g', bV = kg ? 'm³' : 'cm³';
    let m, hac, d;
    if (v.bul === 'm') {
      d = h.pos(v.yogunluk, 'Yoğunluk');
      hac = h.pos(v.hacimDeger, 'Hacim');
      m = d * hac;
    } else if (v.bul === 'hacim') {
      m = h.pos(v.kutle, 'Kütle');
      d = h.pos(v.yogunluk, 'Yoğunluk');
      hac = m / d;
    } else {
      m = h.pos(v.kutle, 'Kütle');
      hac = h.pos(v.hacimDeger, 'Hacim');
      d = m / hac;
    }
    const dG = kg ? d / 1000 : d;
    const gSatir = ['Yoğunluk (g/cm³)', h.sig(dG, 6) + ' g/cm³'];
    const kSatir = ['Yoğunluk (kg/m³)', h.sig(dG * 1000, 6) + ' kg/m³'];
    const dSatirlar = kg ? [kSatir, gSatir] : [gSatir, kSatir];
    const mSatir = ['Kütle', h.sig(m, 6) + ' ' + bM];
    const vSatir = ['Hacim', h.sig(hac, 6) + ' ' + bV];
    const bas = v.bul === 'm' ? [mSatir, ...dSatirlar, vSatir] : v.bul === 'hacim' ? [vSatir, ...dSatirlar, mSatir] : [...dSatirlar, mSatir, vSatir];
    const fark = dG - 1;
    const su = Math.abs(fark) < 1e-9 ? 'Suyla aynı yoğunlukta; suda askıda kalır'
      : fark < 0 ? 'Sudan az yoğun; suda yüzer' : 'Sudan yoğun; suda batar';
    return {
      rows: [...bas, ['Suya göre durum', su]],
      note: 'Karşılaştırmada saf suyun yoğunluğu 1 g/cm³ (1000 kg/m³) alınmıştır. 1 g/cm³ = 1000 kg/m³.',
    };
  },
  cases: [
    { in: { bul: 'd', birim: 'gcm', kutle: '500', hacimDeger: '250' }, out: { 'Yoğunluk (g/cm³)': '2 g/cm³', 'Yoğunluk (kg/m³)': '2.000 kg/m³', 'Suya göre durum': 'Sudan yoğun; suda batar' } },
    { in: { bul: 'm', birim: 'gcm', hacimDeger: '10', yogunluk: '7,8' }, out: { 'Kütle': '78 g', 'Yoğunluk (kg/m³)': '7.800 kg/m³' } },
    { in: { bul: 'd', birim: 'kgm', kutle: '1000', hacimDeger: '1' }, out: { 'Yoğunluk (kg/m³)': '1.000 kg/m³', 'Yoğunluk (g/cm³)': '1 g/cm³', 'Suya göre durum': 'Suyla aynı yoğunlukta; suda askıda kalır' } },
    { in: { bul: 'hacim', birim: 'gcm', kutle: '270', yogunluk: '2,7' }, out: { 'Hacim': '100 cm³' } },
    { in: { bul: 'd', birim: 'gcm', kutle: '46', hacimDeger: '50' }, out: { 'Yoğunluk (g/cm³)': '0,92 g/cm³', 'Suya göre durum': 'Sudan az yoğun; suda yüzer' } },
    { in: { bul: 'm', birim: 'kgm', hacimDeger: '50', yogunluk: '1,2' }, out: { 'Kütle': '60 kg', 'Yoğunluk (g/cm³)': '0,0012 g/cm³' } },
    { in: { bul: 'd', birim: 'gcm', kutle: '193', hacimDeger: '10' }, out: { 'Yoğunluk (g/cm³)': '19,3 g/cm³', 'Yoğunluk (kg/m³)': '19.300 kg/m³' } },
    { in: { bul: 'd', birim: 'gcm', kutle: '500', hacimDeger: '0' }, error: true },
    { in: { bul: 'hacim', birim: 'gcm', kutle: '270', yogunluk: '' }, error: true },
    { in: { bul: 'm', birim: 'gcm', hacimDeger: '-3', yogunluk: '2' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden yoğunluk, kütle ya da hacimden hangisini aradığınızı seçin.`,
    `"Birim takımı" listesinden verilerinize uyanı seçin: laboratuvar ve okul sorularında gram ve cm³, büyük ölçekli işlerde kilogram ve m³ kullanılır.`,
    `Bildiğiniz iki değeri yazın; aranan büyüklüğün kutusu boş kalabilir. Hacminiz mililitre ise aynen yazın (1 mL = 1 cm³), litre ise 1000 ile çarpın.`,
    `"Hesapla" düğmesine basın. Sonuçta yoğunluk iki birimde, kütle ve hacim seçtiğiniz birimlerde ve maddenin suya göre durumu görünür.`,
  ],
  sections: [
    { h: 'Yoğunluk (özkütle) nedir?', p: [
      `Yoğunluk, bir maddenin birim hacminin kütlesidir. Fizik derslerinde <em>özkütle</em> adıyla da geçer ve çoğunlukla <strong>d</strong> ya da <strong>ρ</strong> (ro) harfiyle gösterilir. Aynı büyüklükteki bir demir küp ile bir tahta küpü elinize aldığınızda demirin daha ağır gelmesinin nedeni, demirin taneciklerinin aynı hacme daha fazla kütle sığdırmasıdır.`,
      `Yoğunluk, saf maddeler için <strong>ayırt edici bir özelliktir</strong>: belirli sıcaklık ve basınçta her saf maddenin kendine özgü bir yoğunluğu vardır ve bu değer maddenin miktarına bağlı değildir. Bir bardak suyun da bir damla suyun da yoğunluğu aynıdır. Bu sayede bilinmeyen bir maddenin kütlesi ve hacmi ölçülerek ne olduğu hakkında fikir edinilebilir.`,
    ] },
    { h: 'Formül ve birimler', p: [
      `Bağıntı <strong>d = m ÷ V</strong> biçimindedir: yoğunluk, kütlenin hacme bölümüdür. Buradan kütle <code>m = d · V</code>, hacim <code>V = m ÷ d</code> olarak bulunur. Üç büyüklükten ikisi bilindiğinde üçüncüsü hesaplanabilir.`,
      `SI sisteminde birim kilogram bölü metreküptür (kg/m³). Laboratuvarda ve okul sorularında ise gram bölü santimetreküp (g/cm³) ya da buna eşit olan g/mL kullanılır. İkisi arasındaki dönüşüm basittir: <strong>1 g/cm³ = 1000 kg/m³</strong>. g/cm³ değerini 1000 ile çarparak kg/m³ elde edersiniz. Araç her iki değeri birlikte gösterir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Kütlesi 500 g, hacmi 250 cm³ olan bir taşın yoğunluğu d = 500 ÷ 250 = <strong>2 g/cm³</strong>, yani 2000 kg/m³'tür. Değer 1'den büyük olduğu için taş suda batar.`,
      `<strong>Örnek 2:</strong> Yoğunluğu 7,8 g/cm³ olan demirden 10 cm³'lük bir parçanın kütlesi m = 7,8 × 10 = <strong>78 g</strong> olur.`,
      `<strong>Örnek 3:</strong> Yoğunluğu 2,7 g/cm³ olan alüminyumdan yapılmış 270 g'lık bir cismin hacmi V = 270 ÷ 2,7 = <strong>100 cm³</strong> bulunur.`,
      `<strong>Örnek 4:</strong> 50 cm³ hacmindeki bir buz parçası 46 g geliyorsa yoğunluğu 46 ÷ 50 = <strong>0,92 g/cm³</strong> olur; sudan az yoğun olduğu için yüzer.`,
      `<strong>Örnek 5:</strong> Yoğunluğu yaklaşık 1,2 kg/m³ olan havayla dolu 50 m³'lük bir odadaki havanın kütlesi 1,2 × 50 = <strong>60 kg</strong> kadardır.`,
    ] },
    { h: 'Bazı maddelerin yaklaşık yoğunlukları', p: [
      `Aşağıdaki değerler oda koşulları için yuvarlatılmış, yaklaşık değerlerdir; sıcaklığa, saflığa ve alaşım bileşimine göre değişebilir.`,
    ], ul: [
      `<strong>Hava:</strong> yaklaşık 0,0012 g/cm³ (1,2 kg/m³)`,
      `<strong>Buz:</strong> yaklaşık 0,92 g/cm³`,
      `<strong>Zeytinyağı:</strong> yaklaşık 0,92 g/cm³`,
      `<strong>Saf su (4 °C):</strong> 1 g/cm³`,
      `<strong>Alüminyum:</strong> yaklaşık 2,7 g/cm³`,
      `<strong>Demir:</strong> yaklaşık 7,8 g/cm³`,
      `<strong>Bakır:</strong> yaklaşık 8,9 g/cm³`,
      `<strong>Kurşun:</strong> yaklaşık 11,3 g/cm³`,
      `<strong>Cıva:</strong> yaklaşık 13,6 g/cm³`,
      `<strong>Altın:</strong> yaklaşık 19,3 g/cm³`,
    ] },
    { h: 'Yüzme, batma ve askıda kalma', p: [
      `Bir cismin sıvı içindeki davranışını yoğunlukların karşılaştırması belirler. Cismin yoğunluğu sıvınınkinden küçükse cisim yüzer, eşitse sıvının içinde askıda kalır, büyükse batar. Zeytinyağının suyun üstünde toplanması, buzun suda yüzmesi ve demir bilyenin batması bundandır.`,
      `Çelikten yapılmış gemilerin yüzmesi bu kuralla çelişmez: geminin içi büyük ölçüde havayla doludur, dolayısıyla toplam kütlesinin toplam hacmine oranı, yani ortalama yoğunluğu sudan küçüktür. Araçtaki "Suya göre durum" satırı içi dolu, homojen cisimler için yorumlanmalıdır ve karşılaştırmayı saf suya göre yapar; deniz suyu biraz daha yoğundur.`,
    ] },
    { h: 'Hacim nasıl ölçülür, sık yapılan hatalar', ul: [
      `Düzgün geometrik cisimlerde hacim boyutlardan hesaplanır: küp için kenarın küpü, dikdörtgenler prizması için en × boy × yükseklik.`,
      `Düzgün olmayan katılarda dereceli kaba konan sıvının yükselme miktarı cismin hacmini verir (taşırma yöntemi); cisim sıvıda çözünmemeli ve tamamen batmalıdır.`,
      `Kütle ile ağırlığı karıştırmayın; formülde terazide ölçülen kütle kullanılır.`,
      `Birimleri karıştırmak en yaygın hatadır: gramı m³ ile ya da kilogramı cm³ ile bölmeyin; araçta tek bir birim takımı seçin.`,
      `Yoğunluk sıcaklıkla değişir; maddeler genellikle ısındıkça genleşir ve yoğunlukları azalır. Gazlarda basıncın etkisi de büyüktür. Karışımlarda ve gözenekli cisimlerde bulunan değer ortalama yoğunluktur.`,
    ] },
  ],
  faq: [
    ['Yoğunluk formülü nedir?', `Yoğunluk, kütlenin hacme bölümüdür: d = m ÷ V. Kütle gram ve hacim cm³ alınırsa sonuç g/cm³, kilogram ve m³ alınırsa kg/m³ olur.`],
    ['Özkütle ile yoğunluk aynı şey mi?', `Okul fiziğinde ikisi aynı anlamda kullanılır: birim hacmin kütlesi. Özkütle terimi daha çok saf maddenin ayırt edici özelliğini vurgulamak için tercih edilir.`],
    ['g/cm³ nasıl kg/m³ birimine çevrilir?', `g/cm³ değeri 1000 ile çarpılır. Örneğin 2,7 g/cm³, 2700 kg/m³ eder. Tersine çevirmek için kg/m³ değeri 1000'e bölünür.`],
    ['Suyun yoğunluğu kaçtır?', `Saf suyun yoğunluğu 4 °C'ta yaklaşık 1 g/cm³, yani 1000 kg/m³'tür. Sıcaklık arttıkça çok az düşer; deniz suyu ise içindeki tuzlar nedeniyle biraz daha yoğundur.`],
    ['Madde miktarı artınca yoğunluk değişir mi?', `Hayır. Aynı koşullardaki saf maddede kütle iki katına çıkarsa hacim de iki katına çıkar ve oran sabit kalır. Yoğunluk maddenin miktarına değil, cinsine bağlıdır.`],
    ['Buz neden suda yüzer?', `Su donarken tanecikleri arasında boşluklu bir düzen oluşur ve hacmi artar. Aynı kütle daha büyük hacim kapladığı için buzun yoğunluğu yaklaşık 0,92 g/cm³'e düşer ve sudan az yoğun olduğu için yüzer.`],
    ['Mililitre ile cm³ arasındaki ilişki nedir?', `1 mililitre tam olarak 1 santimetreküptür. Bu yüzden g/mL ile g/cm³ aynı sayısal değeri verir. 1 litre 1000 cm³, 1 m³ ise 1000 litredir.`],
    ['Girdiğim değerler saklanıyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.`],
  ],
  related: ['kaldirma-kuvveti-hesapla', 'basinc-hesapla', 'gaz-yogunlugu-hesapla', 'hidrostatik-basinc-hesapla', 'kutle-agirlik-hesapla'],
};
