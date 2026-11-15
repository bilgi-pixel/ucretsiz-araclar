export default {
  slug: 'lc-rezonans-frekansi-hesapla',
  title: 'LC Rezonans Frekansı Hesaplama',
  h1Tail: 'bobin ve kondansatör',
  pageTitle: 'LC Rezonans Frekansı Hesaplama – Bobin ve Kondansatörden Frekans',
  description: 'Bobin (L) ve kondansatör (C) değerlerinden LC devresinin rezonans frekansını hesaplayın ya da istenen frekans için gereken L veya C değerini bulun.',
  card: 'LC devresinin rezonans frekansını bulun ya da hedef frekans için gereken bobin veya kondansatör değerini hesaplayın.',
  category: 'elektrik',
  keywords: ['lc rezonans frekansı', 'rezonans frekansı hesaplama', 'lc devresi hesaplama', 'tank devresi frekansı', 'bobin kondansatör frekans', 'thomson formülü', 'lc osilatör frekansı'],
  lead: `Bir bobin ile bir kondansatörün oluşturduğu LC devresinin <strong>rezonans frekansını</strong> hesaplayın. İsterseniz hesabı tersine çevirip hedeflediğiniz frekans için gereken endüktansı ya da kapasiteyi de bulabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hedef', label: 'Hesaplanacak değer', type: 'select', options: [['f', 'Rezonans frekansı (L ve C biliniyor)'], ['c', 'Kondansatör C (f ve L biliniyor)'], ['l', 'Bobin L (f ve C biliniyor)']] },
    { id: 'l', label: 'Endüktans L', type: 'number', placeholder: 'Örn. 10' },
    { id: 'lb', label: 'L birimi', type: 'select', options: [['uH', 'µH (mikrohenri)'], ['nH', 'nH (nanohenri)'], ['mH', 'mH (milihenri)'], ['H', 'H (henri)']] },
    { id: 'c', label: 'Kapasite C', type: 'number', placeholder: 'Örn. 100' },
    { id: 'cb', label: 'C birimi', type: 'select', options: [['pF', 'pF (pikofarad)'], ['nF', 'nF (nanofarad)'], ['uF', 'µF (mikrofarad)']] },
    { id: 'f', label: 'Frekans', type: 'number', placeholder: 'Yalnızca L ya da C aranırken', hint: 'Rezonans frekansı hesaplanırken boş bırakın.' },
    { id: 'fb', label: 'Frekans birimi', type: 'select', options: [['MHz', 'MHz'], ['kHz', 'kHz'], ['Hz', 'Hz']] },
  ],
  compute(v, h) {
    const olcek = (x, birimler) => {
      // birimler: [[çarpan, ad], …] büyükten küçüğe
      for (const [k, ad] of birimler) if (x >= k * (1 - 1e-9)) return h.sig(x / k, 4) + ' ' + ad;
      const son = birimler[birimler.length - 1];
      return h.sig(x / son[0], 4) + ' ' + son[1];
    };
    const fYaz = (x) => olcek(x, [[1e9, 'GHz'], [1e6, 'MHz'], [1e3, 'kHz'], [1, 'Hz']]);
    const lYaz = (x) => olcek(x, [[1, 'H'], [1e-3, 'mH'], [1e-6, 'µH'], [1e-9, 'nH']]);
    const cYaz = (x) => olcek(x, [[1, 'F'], [1e-3, 'mF'], [1e-6, 'µF'], [1e-9, 'nF'], [1e-12, 'pF']]);
    const tYaz = (x) => olcek(x, [[1, 's'], [1e-3, 'ms'], [1e-6, 'µs'], [1e-9, 'ns'], [1e-12, 'ps']]);
    const lk = { nH: 1e-9, uH: 1e-6, mH: 1e-3, H: 1 }[v.lb] || 1e-6;
    const ck = { pF: 1e-12, nF: 1e-9, uF: 1e-6 }[v.cb] || 1e-12;
    const fk = { Hz: 1, kHz: 1e3, MHz: 1e6 }[v.fb] || 1e6;
    let L, C, f;
    if (v.hedef === 'c') {
      f = h.pos(v.f, 'Frekans') * fk;
      L = h.pos(v.l, 'Endüktans L') * lk;
      C = 1 / (Math.pow(2 * Math.PI * f, 2) * L);
    } else if (v.hedef === 'l') {
      f = h.pos(v.f, 'Frekans') * fk;
      C = h.pos(v.c, 'Kapasite C') * ck;
      L = 1 / (Math.pow(2 * Math.PI * f, 2) * C);
    } else {
      L = h.pos(v.l, 'Endüktans L') * lk;
      C = h.pos(v.c, 'Kapasite C') * ck;
      f = 1 / (2 * Math.PI * Math.sqrt(L * C));
    }
    const ortak = [
      ['Açısal frekans', h.sig(2 * Math.PI * f, 4) + ' rad/s'],
      ['Periyot', tYaz(1 / f)],
      ['Karakteristik empedans', h.sig(Math.sqrt(L / C), 4) + ' Ω'],
    ];
    const bas = v.hedef === 'c' ? ['Gereken kapasite', cYaz(C)] : v.hedef === 'l' ? ['Gereken endüktans', lYaz(L)] : ['Rezonans frekansı', fYaz(f)];
    return {
      rows: [bas, ...ortak],
      note: 'f = 1 ÷ (2π√(L × C)). İdeal (kayıpsız) elemanlar varsayılır; dağınık kapasite ve bobin direnci hesaba katılmaz.',
    };
  },
  cases: [
    { in: { hedef: 'f', l: '10', lb: 'uH', c: '100', cb: 'pF' }, out: { 'Rezonans frekansı': '5,033 MHz', 'Karakteristik empedans': '316,2 Ω', 'Periyot': '198,7 ns' } },
    { in: { hedef: 'f', l: '1', lb: 'mH', c: '1', cb: 'uF' }, out: { 'Rezonans frekansı': '5,033 kHz', 'Karakteristik empedans': '31,62 Ω' } },
    { in: { hedef: 'f', l: '1', lb: 'H', c: '1', cb: 'uF' }, out: { 'Rezonans frekansı': '159,2 Hz', 'Karakteristik empedans': '1.000 Ω', 'Periyot': '6,283 ms', 'Açısal frekans': '1.000 rad/s' } },
    { in: { hedef: 'f', l: '4,7', lb: 'mH', c: '100', cb: 'nF' }, out: { 'Rezonans frekansı': '7,341 kHz', 'Karakteristik empedans': '216,8 Ω' } },
    { in: { hedef: 'f', l: '100', lb: 'nH', c: '10', cb: 'pF' }, out: { 'Rezonans frekansı': '159,2 MHz', 'Karakteristik empedans': '100 Ω' } },
    { in: { hedef: 'c', l: '100', lb: 'uH', f: '1', fb: 'MHz' }, out: { 'Gereken kapasite': '253,3 pF' } },
    { in: { hedef: 'l', c: '100', cb: 'uF', f: '50', fb: 'Hz' }, out: { 'Gereken endüktans': '101,3 mH' } },
    { in: { hedef: 'f', l: '10', lb: 'uH', c: '', cb: 'pF' }, error: true },
    { in: { hedef: 'f', l: '0', lb: 'uH', c: '100', cb: 'pF' }, error: true },
    { in: { hedef: 'c', l: '100', lb: 'uH', f: '', fb: 'MHz' }, error: true },
  ],
  howto: [
    `"Hesaplanacak değer" listesinden neyi bulmak istediğinizi seçin: frekans, kondansatör ya da bobin.`,
    `Bildiğiniz endüktans ve kapasite değerlerini yazıp birimlerini seçin. Aranan büyüklüğün alanını boş bırakabilirsiniz.`,
    `L ya da C arıyorsanız hedef frekansı yazıp Hz, kHz ya da MHz birimini seçin.`,
    `"Hesapla" düğmesine basın. Aranan değer ilk satırda; açısal frekans, periyot ve karakteristik empedans altında görünür.`,
  ],
  sections: [
    { h: 'LC devresinde rezonans nedir?', p: [
      `Bir bobin enerjiyi manyetik alanda, bir kondansatör ise elektrik alanda depolar. İkisi birbirine bağlandığında enerji bobin ile kondansatör arasında gidip gelmeye başlar; tıpkı bir sarkaçta enerjinin hız ile yükseklik arasında gidip gelmesi gibi. Bu salınımın kendiliğinden gerçekleştiği frekansa rezonans frekansı denir.`,
      `Rezonansta bobinin endüktif reaktansı ile kondansatörün kapasitif reaktansı büyüklükçe eşit olur ve birbirini götürür. Seri LC devresinde bu frekansta toplam empedans en küçük değerine iner ve akım en büyük olur; paralel LC devresinde (tank devresi) ise empedans en büyük değerine çıkar. Radyo alıcılarında istasyon seçimi, osilatörler, filtreler ve kablosuz şarj bobinleri bu davranışa dayanır.`,
    ] },
    { h: 'Formül', p: [
      `Rezonans frekansı Thomson formülü olarak bilinen eşitlikle bulunur: <strong>f = 1 ÷ (2π × √(L × C))</strong>. Burada L henri, C farad, f hertz cinsindendir. Formül, X<sub>L</sub> = 2πfL ile X<sub>C</sub> = 1 ÷ (2πfC) reaktanslarının eşitlenmesinden çıkar.`,
      `Aynı eşitlik tersine çevrilerek bilinmeyen eleman da bulunur: <strong>C = 1 ÷ ((2πf)² × L)</strong> ve <strong>L = 1 ÷ ((2πf)² × C)</strong>. Frekans L ve C'nin çarpımının kareköküyle ters orantılı olduğundan, frekansı yarıya indirmek için L ya da C'yi dört katına çıkarmak gerekir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> L = 10 µH ve C = 100 pF. Çarpım 10 × 10<sup>−6</sup> × 100 × 10<sup>−12</sup> = 10<sup>−15</sup>, karekökü 3,162 × 10<sup>−8</sup> eder. f = 1 ÷ (6,2832 × 3,162 × 10<sup>−8</sup>) = 5 033 000 Hz, yani yaklaşık <strong>5,033 MHz</strong>. Karakteristik empedans √(L ÷ C) = √100 000 = 316,2 Ω çıkar.`,
      `<strong>Örnek 2:</strong> 1 MHz'e ayarlanacak bir devrede elinizde 100 µH bobin var. Gereken kapasite C = 1 ÷ ((2π × 10<sup>6</sup>)² × 100 × 10<sup>−6</sup>) = 253,3 pF bulunur. Bu değere en yakın standart kondansatör 220 pF ya da 270 pF olduğundan, pratikte sabit bir kondansatöre paralel bir trimer kondansatör eklenerek ince ayar yapılır.`,
      `<strong>Örnek 3:</strong> 1 H bobin ile 1 µF kondansatör 159,2 Hz'de rezonansa girer; açısal frekans tam 1000 rad/s, karakteristik empedans 1000 Ω olur. Sayıların yuvarlak çıkması bu örneği formülü sınamak için elverişli kılar.`,
    ] },
    { h: 'Karakteristik empedans ve kalite faktörü', p: [
      `Sonuçlarda görülen karakteristik empedans, <strong>Z<sub>0</sub> = √(L ÷ C)</strong> ile hesaplanır ve rezonans frekansında bobinin ve kondansatörün ayrı ayrı gösterdiği reaktansa eşittir. Aynı rezonans frekansı sonsuz sayıda L–C çiftiyle elde edilebilir; hangi çiftin seçileceğini çoğu zaman bu empedans belirler.`,
      `Devrenin seçiciliğini anlatan kalite faktörü Q, seri devrede Z<sub>0</sub>'ın kayıp direncine oranıdır. Kayıp direnci bobinin tel direnci ve çekirdek kayıplarından geldiği için bu araç Q değerini hesaplamaz; ancak Z<sub>0</sub> değerini bobininizin seri direncine bölerek kaba bir tahmin yapabilirsiniz.`,
    ] },
    { h: 'Hesap ile ölçüm arasındaki farkın nedenleri', ul: [
      `<strong>Dağınık kapasite:</strong> Bobin sarımları arasındaki, baskı devre yollarındaki ve ölçü probundaki birkaç pikofaradlık kapasite özellikle yüksek frekansta rezonansı aşağı çeker.`,
      `<strong>Eleman toleransı:</strong> %10 toleranslı bir kondansatör frekansı yaklaşık %5 kaydırabilir, çünkü frekans karekökle değişir.`,
      `<strong>Bobinin kendi rezonansı:</strong> Her bobinin, sarım kapasitesi nedeniyle bir öz rezonans frekansı vardır; bu frekansın üzerinde bobin gibi davranmaz.`,
      `<strong>Çekirdek etkisi:</strong> Ferit ve demir tozu çekirdeklerde endüktans akıma ve sıcaklığa bağlı olarak değişir.`,
      `<strong>Kondansatör türü:</strong> Bazı seramik kondansatörlerin kapasitesi üzerindeki gerilime göre belirgin biçimde düşer.`,
    ] },
    { h: 'Kullanım alanları ve sınırlar', p: [
      `LC rezonansı; radyo ve amatör telsiz devrelerinde bant geçiren filtre ve osilatör tasarımında, anahtarlamalı güç kaynaklarının rezonanslı dönüştürücülerinde, indüksiyonlu ısıtıcılarda, metal dedektörlerinde ve RFID antenlerinde kullanılır. Şebeke frekansındaki kompanzasyon panolarında ise kondansatörlerle şebeke endüktansı arasında istenmeyen rezonans oluşabilir; bu konu harmonik analizi gerektirir.`,
      `Bu araç ideal, kayıpsız bir L ve C için tek bir rezonans frekansı verir. Direnç içeren paralel devrelerde gerçek rezonans frekansı biraz farklı çıkabilir. Güç elektroniği ve şebeke uygulamalarında rezonans akım ve gerilimleri tehlikeli seviyelere ulaşabildiğinden, sonuçlar yalnızca bilgilendirme amaçlıdır; tasarım kararı için bir elektrik-elektronik mühendisine danışın.`,
    ] },
  ],
  faq: [
    ['LC rezonans frekansı formülü nedir?', `f = 1 ÷ (2π√(LC)). L henri, C farad olarak yazıldığında sonuç hertz çıkar. Araç birim dönüşümlerini sizin yerinize yapar.`],
    ['Seri ve paralel LC devresinde rezonans frekansı farklı mıdır?', `İdeal elemanlarla ikisinde de aynı formül geçerlidir. Fark davranıştadır: seri devrede rezonansta empedans en küçük, paralel devrede en büyük olur. Kayıp direnci büyük paralel devrelerde frekans biraz kayabilir.`],
    ['Frekansı iki katına çıkarmak için ne yapmalıyım?', `L × C çarpımını dörtte birine indirmelisiniz. Örneğin kondansatörü dörtte birine düşürmek ya da hem L'yi hem C'yi yarıya indirmek frekansı iki katına çıkarır.`],
    ['100 µH bobinle 1 MHz için hangi kondansatör gerekir?', `Yaklaşık 253,3 pF. "Hesaplanacak değer" olarak kondansatörü seçip L = 100 µH ve f = 1 MHz yazarak bu sonucu görebilirsiniz.`],
    ['Karakteristik empedans ne işe yarar?', `Rezonans anında bobinin ve kondansatörün reaktansını gösterir. Devredeki akım ve gerilim seviyelerini, ayrıca kayıp direnciyle birlikte kalite faktörünü tahmin etmek için kullanılır.`],
    ['Ölçtüğüm frekans hesaplanandan neden düşük çıkıyor?', `En sık neden dağınık kapasitedir. Sarımlar arası kapasite, kablolar ve osiloskop probu devreye fazladan pikofaradlar ekler; toplam kapasite artınca frekans düşer.`],
    ['Açısal frekans ile frekans arasındaki fark nedir?', `Açısal frekans ω, frekansın 2π katıdır ve rad/s ile ölçülür. Rezonansta ω = 1 ÷ √(LC) eşitliği geçerlidir; devre analizinde formülleri sadeleştirdiği için tercih edilir.`],
    ['Girdiğim değerler bir sunucuya gidiyor mu?', `Hayır. Tüm hesap tarayıcınızda yapılır; değerleriniz gönderilmez ve saklanmaz.`],
  ],
  related: ['bobin-enduktans-hesapla', 'kapasitif-reaktans-hesapla', 'empedans-hesapla', 'rc-filtre-kesim-frekansi-hesapla', 'kondansator-seri-paralel-hesapla'],
};
