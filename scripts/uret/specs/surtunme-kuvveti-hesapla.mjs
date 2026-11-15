export default {
  slug: 'surtunme-kuvveti-hesapla',
  title: 'Sürtünme Kuvveti Hesaplama',
  h1Tail: 'F = μ · N',
  pageTitle: 'Sürtünme Kuvveti Hesaplama – F = μ·N Formülü ile',
  description: 'Sürtünme katsayısı ve kütle ya da normal kuvvet ile sürtünme kuvvetini hesaplayın. Eğimli yüzeyi de destekler; normal kuvveti ve yavaşlama ivmesini gösterir.',
  card: 'Sürtünme katsayısı ile kütle ya da normal kuvvetten sürtünme kuvvetini bulun; eğimli yüzey desteklenir.',
  category: 'bilim',
  keywords: ['sürtünme kuvveti hesaplama', 'sürtünme katsayısı', 'sürtünme kuvveti formülü', 'normal kuvvet hesaplama', 'kinetik sürtünme', 'statik sürtünme', 'fs = k.N'],
  lead: `Bir yüzey üzerinde duran ya da kayan cisme etki eden sürtünme kuvvetini <strong>F = μ × N</strong> bağıntısıyla hesaplayın. Kütleyi girerseniz araç normal kuvveti kendisi bulur; isterseniz normal kuvveti doğrudan yazabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mu', label: 'Sürtünme katsayısı (μ)', type: 'number', placeholder: 'Örn. 0,5' },
    { id: 'tur', label: 'Bilinen büyüklük', type: 'select', options: [['kutle', 'Kütle (kg)'], ['normal', 'Normal kuvvet (N)']] },
    { id: 'deger', label: 'Kütle ya da normal kuvvet', type: 'number', placeholder: 'Örn. 10' },
    { id: 'aci', label: 'Yüzeyin eğim açısı (°)', type: 'number', value: '0', hint: 'Yatay zemin için 0. Yalnızca kütle girildiğinde kullanılır.' },
    { id: 'g', label: 'Yer çekimi ivmesi (m/s²)', type: 'number', value: '9,81' },
  ],
  compute(v, h) {
    const mu = h.nonneg(v.mu, 'Sürtünme katsayısı');
    const d = h.nonneg(v.deger, 'Kütle ya da normal kuvvet');
    let N, ivme = null, aci = 0;
    if (v.tur === 'normal') {
      N = d;
    } else {
      const g = h.pos(v.g, 'Yer çekimi ivmesi');
      aci = h.opt(v.aci, 0, 'Eğim açısı');
      if (aci < 0 || aci >= 90) h.err('Eğim açısı 0 ile 90 derece arasında olmalı (90 hariç). Yatay zemin için 0 yazın.');
      const c = Math.cos((aci * Math.PI) / 180);
      N = d * g * c;
      ivme = mu * g * c;
    }
    const F = mu * N;
    const rows = [
      ['Sürtünme kuvveti', h.fmt(F, 2) + ' N'],
      ['Normal kuvvet', h.fmt(N, 2) + ' N'],
    ];
    if (ivme !== null) {
      rows.push(['Sürtünmenin yavaşlatma ivmesi', h.fmt(ivme, 3) + ' m/s²']);
      rows.push(['Cismin ağırlığı', h.fmt(d * h.pos(v.g, 'Yer çekimi ivmesi'), 2) + ' N']);
    }
    return { rows, note: 'Statik katsayı girdiyseniz sonuç, cismi harekete geçirmek için aşılması gereken en büyük sürtünme kuvvetidir; kinetik katsayı girdiyseniz kayma sırasındaki kuvvettir.' };
  },
  cases: [
    { in: { mu: '0,5', tur: 'kutle', deger: '10', aci: '0', g: '9,81' }, out: { 'Sürtünme kuvveti': '49,05 N', 'Normal kuvvet': '98,1 N', 'Sürtünmenin yavaşlatma ivmesi': '4,905 m/s²' } },
    { in: { mu: '0,3', tur: 'normal', deger: '200' }, out: { 'Sürtünme kuvveti': '60 N', 'Normal kuvvet': '200 N' } },
    { in: { mu: '0,4', tur: 'kutle', deger: '5', aci: '30', g: '10' }, out: { 'Sürtünme kuvveti': '17,32 N', 'Normal kuvvet': '43,3 N', 'Cismin ağırlığı': '50 N' } },
    { in: { mu: '0', tur: 'kutle', deger: '20', aci: '0', g: '9,81' }, out: { 'Sürtünme kuvveti': '0 N', 'Normal kuvvet': '196,2 N' } },
    { in: { mu: '0,8', tur: 'kutle', deger: '1200', aci: '0', g: '9,81' }, out: { 'Sürtünme kuvveti': '9.417,6 N', 'Normal kuvvet': '11.772 N', 'Sürtünmenin yavaşlatma ivmesi': '7,848 m/s²' } },
    { in: { mu: '0,25', tur: 'kutle', deger: '8', aci: '60', g: '10' }, out: { 'Sürtünme kuvveti': '10 N', 'Normal kuvvet': '40 N' } },
    { in: { mu: '-0,2', tur: 'kutle', deger: '10' }, error: true },
    { in: { mu: '0,5', tur: 'kutle', deger: '10', aci: '90', g: '9,81' }, error: true },
    { in: { mu: '0,5', tur: 'normal', deger: '' }, error: true },
  ],
  howto: [
    `"Sürtünme katsayısı" alanına yüzey çiftine ait μ değerini yazın. Birimsiz bir sayıdır ve çoğu yüzey için 0 ile 1 arasındadır.`,
    `"Bilinen büyüklük" listesinden kütleyi mi yoksa normal kuvveti mi gireceğinizi seçin ve değeri yazın.`,
    `Kütle girdiyseniz ve yüzey eğimliyse eğim açısını derece olarak yazın; yatay zeminde 0 bırakın. Gerekirse yer çekimi ivmesini değiştirin (ders sorularında çoğu zaman 10 alınır).`,
    `"Hesapla" düğmesine basın. Sürtünme kuvveti, normal kuvvet ve sürtünmenin cismi yavaşlatma ivmesi görüntülenir.`,
  ],
  sections: [
    { h: 'Sürtünme kuvveti nedir?', p: [
      `Sürtünme, birbirine temas eden iki yüzeyin göreli hareketine ya da hareket eğilimine karşı koyan kuvvettir. Yüzeye paraleldir ve her zaman hareketi engelleyecek yöndedir. Yürüyebilmemiz, arabaların fren yapabilmesi, çivinin tahtada kalması sürtünme sayesindedir; makinelerde aşınma ve enerji kaybı da yine sürtünmenin sonucudur.`,
      `Kuru yüzeyler arasındaki sürtünme iyi bir yaklaşıklıkla iki şeye bağlıdır: yüzeyleri birbirine bastıran normal kuvvet ve yüzey çiftinin cinsine bağlı sürtünme katsayısı. Bu yaklaşıma göre sürtünme, temas alanının büyüklüğüne ve (kayma sırasında) hıza belirgin biçimde bağlı değildir.`,
    ] },
    { h: 'Formül: F = μ × N', p: [
      `Sürtünme kuvveti <strong>F<sub>s</sub> = μ × N</strong> bağıntısıyla hesaplanır. μ (mü) sürtünme katsayısı, N ise yüzeyin cisme uyguladığı dik tepki kuvvetidir. Lise kitaplarında katsayı çoğu zaman k harfiyle, formül de F<sub>s</sub> = k × N biçiminde yazılır; ikisi aynı şeydir.`,
      `Yatay bir zeminde, cisme başka düşey kuvvet etki etmiyorsa normal kuvvet ağırlığa eşittir: <strong>N = m × g</strong>. Eğimli bir yüzeyde ağırlığın yalnızca yüzeye dik bileşeni normal kuvveti oluşturur: <strong>N = m × g × cos θ</strong>. Araç, kütle girdiğinizde bu hesabı sizin yerinize yapar. Cismi yukarıdan bastıran ya da yukarı doğru çeken ek bir kuvvet varsa normal kuvveti elle hesaplayıp "Normal kuvvet" seçeneğiyle girmeniz gerekir.`,
    ] },
    { h: 'Statik ve kinetik sürtünme', p: [
      `Duran bir cismi itmeye başladığınızda, cisim harekete geçene kadar sürtünme kuvveti uyguladığınız kuvvete eşit büyüklükte karşı koyar. Bu statik sürtünmedir ve bir üst sınırı vardır: μ<sub>s</sub> × N. Uyguladığınız kuvvet bu sınırı aştığında cisim kaymaya başlar.`,
      `Cisim kayarken etki eden sürtünme kinetik sürtünmedir ve μ<sub>k</sub> × N değerindedir. Kinetik katsayı genellikle statik katsayıdan biraz küçüktür; ağır bir dolabı yerinden oynatmanın, onu kaydırmaya devam etmekten zor olması bu yüzdendir. Araca hangi katsayıyı yazarsanız sonuç ona göre yorumlanır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Yatay zemin:</strong> 10 kg kütleli bir sandık, sürtünme katsayısı 0,5 olan zeminde duruyor. Normal kuvvet N = 10 × 9,81 = 98,1 N olur. Sürtünme kuvveti F = 0,5 × 98,1 = 49,05 N bulunur. Sandık kayarken onu yavaşlatan ivme F ÷ m = 49,05 ÷ 10 = 4,905 m/s² olur; bu değer μ × g'ye eşittir ve kütleden bağımsızdır.`,
      `<strong>Eğimli yüzey:</strong> 5 kg kütleli bir cisim 30 derecelik eğik düzlemde, μ = 0,4 ve g = 10 m/s² alınsın. Ağırlık 50 N'dur. Normal kuvvet 50 × cos 30° = 50 × 0,866 = 43,3 N, sürtünme kuvveti 0,4 × 43,3 = 17,32 N olur.`,
      `<strong>Fren yapan otomobil:</strong> 1200 kg kütleli bir otomobil kuru asfaltta tekerlekleri kilitlenerek kayıyor ve lastik-asfalt katsayısı 0,8 kabul ediliyor. Normal kuvvet 1200 × 9,81 = 11.772 N, sürtünme kuvveti 0,8 × 11.772 = 9.417,6 N, yavaşlama ivmesi 7,848 m/s² olur.`,
    ] },
    { h: 'Yaklaşık sürtünme katsayıları', p: [
      `Sürtünme katsayısı yüzeylerin pürüzlülüğüne, temizliğine, nemine ve sıcaklığına göre değişir. Aşağıdaki değerler ders kitaplarında sık geçen kaba ortalamalardır; gerçek değer için ölçüm ya da ürün verisi gerekir.`,
    ], ul: [
      `Lastik – kuru asfalt: yaklaşık 0,7–0,9`,
      `Lastik – ıslak asfalt: yaklaşık 0,4–0,6`,
      `Tahta – tahta: yaklaşık 0,25–0,5`,
      `Çelik – çelik (kuru): yaklaşık 0,5–0,8`,
      `Çelik – çelik (yağlı): yaklaşık 0,05–0,15`,
      `Buz – çelik (paten): yaklaşık 0,02–0,05`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Normal kuvveti her durumda ağırlığa eşit almak. Eğimli yüzeyde ya da cisme açılı bir kuvvet uygulandığında normal kuvvet değişir.`,
      `Statik sürtünmeyi her zaman μ × N saymak. Cisim hareket etmiyorsa statik sürtünme, uygulanan kuvvete eşittir; μ × N yalnızca üst sınırdır.`,
      `Kütleyi normal kuvvet yerine yazmak. Kütle kilogram, normal kuvvet newton cinsindendir; listeden doğru seçeneği işaretleyin.`,
      `Açıyı radyan girmek. Araç açıyı derece olarak bekler.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu hesap kuru yüzeyler için kullanılan basit Coulomb sürtünme modeline dayanır. Yağlanmış yüzeyler, yuvarlanma direnci, hava direnci, çok yüksek hız ya da basınç altında davranış bu modelle açıklanamaz. Sonuçlar ders çalışma ve ön fikir edinme amaçlıdır; fren mesafesi, taşıma güvenliği, makine tasarımı gibi can ve mal güvenliğini ilgilendiren kararlar için yetkili bir mühendise ve ilgili standartlara başvurun.`,
    ] },
  ],
  faq: [
    ['Sürtünme kuvveti formülü nedir?', `Sürtünme kuvveti, sürtünme katsayısı ile normal kuvvetin çarpımıdır: F = μ × N. Yatay zeminde normal kuvvet m × g olduğundan formül F = μ × m × g biçimini alır.`],
    ['Sürtünme katsayısının birimi var mı?', `Hayır. Sürtünme katsayısı iki kuvvetin oranı olduğu için birimsizdir. Değeri yüzey çiftine bağlıdır ve çoğunlukla 0 ile 1 arasındadır, ancak bazı malzeme çiftlerinde 1'den büyük olabilir.`],
    ['Sürtünme kuvveti temas alanına bağlı mıdır?', `Basit sürtünme modelinde bağlı değildir. Aynı sandığı geniş ya da dar yüzü üzerine koymanız sürtünme kuvvetini değiştirmez; belirleyici olan normal kuvvet ve katsayıdır.`],
    ['Kütle artınca sürtünme kuvveti artar mı?', `Evet. Kütle arttıkça ağırlık ve dolayısıyla normal kuvvet artar, sürtünme kuvveti de aynı oranda büyür. Buna karşın sürtünmenin cisme verdiği yavaşlama ivmesi (μ × g) kütleden bağımsızdır.`],
    ['Eğik düzlemde normal kuvvet nasıl bulunur?', `Eğim açısı θ ise normal kuvvet N = m × g × cos θ olur. Açı büyüdükçe cos θ küçülür, normal kuvvet ve sürtünme kuvveti azalır. Araçta eğim açısını yazmanız yeterlidir.`],
    ['Statik sürtünme mi kinetik sürtünme mi daha büyüktür?', `Aynı yüzey çifti için statik sürtünmenin en büyük değeri genellikle kinetik sürtünmeden büyüktür. Bu yüzden cismi harekete geçirmek, hareketi sürdürmekten daha fazla kuvvet ister.`],
    ['Yer çekimi ivmesini neden değiştirebiliyorum?', `Ders sorularında işlem kolaylığı için g çoğu zaman 10 m/s² alınır; daha gerçekçi hesapta 9,81 kullanılır. Ay ya da Mars gibi başka bir ortam için de ilgili değeri yazabilirsiniz.`],
    ['Yazdığım veriler saklanıyor mu?', `Hayır. Hesaplama yalnızca tarayıcınızda çalışır; girdiğiniz değerler sunucuya gönderilmez.`],
  ],
  related: ['egik-duzlem-hesapla', 'kuvvet-hesapla', 'ivme-hesapla', 'kutle-agirlik-hesapla', 'is-hesapla'],
};
