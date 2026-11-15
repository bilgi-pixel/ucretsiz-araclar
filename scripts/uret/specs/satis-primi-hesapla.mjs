export default {
  slug: 'satis-primi-hesapla',
  title: 'Satış Primi Hesaplama',
  h1Tail: 'hedef ve oran üzerinden',
  pageTitle: 'Satış Primi Hesaplama – Hedef, Oran ve Kademeye Göre Prim',
  description: 'Satış tutarı, hedef ve prim oranından satış primini hesaplayın: tüm satış üzerinden, hedefi aşan kısımdan, kademeli ya da hedef şartlı prim yöntemleriyle.',
  card: 'Satış tutarı, hedef ve prim oranından dört farklı yönteme göre satış primini ve hedef gerçekleşme oranını hesaplayın.',
  category: 'finans',
  keywords: ['satış primi hesaplama', 'prim hesaplama', 'hedef primi hesaplama', 'satış temsilcisi primi', 'ciro primi hesaplama', 'kademeli prim hesaplama', 'hedef gerçekleşme oranı'],
  lead: `Dönem satışını, hedefi ve prim oranını yazın; prim sisteminizi seçin. Araç <strong>hak edilen prim tutarını</strong>, hedef gerçekleşme oranını ve sabit maaşla birlikte toplam brüt geliri hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Prim yöntemi', type: 'select', wide: true, options: [['tum', 'Tüm satış üzerinden sabit oran'], ['asim', 'Yalnızca hedefi aşan kısım üzerinden'], ['kademeli', 'Kademeli: hedefe kadar taban oran, aşan kısma yüksek oran'], ['esik', 'Hedef şartlı: hedef tutarsa tüm satış üzerinden']] },
    { id: 'satis', label: 'Dönem satış tutarı', type: 'number', placeholder: 'Örn. 250000' },
    { id: 'hedef', label: 'Satış hedefi', type: 'number', placeholder: 'Örn. 200000', hint: 'İlk yöntemde isteğe bağlıdır.' },
    { id: 'oran', label: 'Prim oranı (%)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'ustOran', label: 'Hedef üstü oranı (%)', type: 'number', placeholder: 'Örn. 5', hint: 'Yalnızca kademeli yöntemde kullanılır.' },
    { id: 'maas', label: 'Sabit brüt maaş (isteğe bağlı)', type: 'number', placeholder: 'Örn. 30000' },
  ],
  compute(v, h) {
    const y = v.yontem || 'tum';
    const satis = h.nonneg(v.satis, 'Dönem satış tutarı');
    const oran = h.nonneg(v.oran, 'Prim oranı');
    if (oran > 100) h.err('Prim oranı %100\'den büyük olamaz.');
    const hedefVar = String(v.hedef ?? '').trim() !== '';
    if (y !== 'tum' && !hedefVar) h.err('Bu prim yönteminde "Satış hedefi" alanını doldurmanız gerekir.');
    const hedef = hedefVar ? h.pos(v.hedef, 'Satış hedefi') : 0;
    const asan = hedefVar ? Math.max(0, satis - hedef) : 0;
    let prim;
    if (y === 'asim') prim = asan * oran / 100;
    else if (y === 'kademeli') {
      const ust = h.nonneg(v.ustOran, 'Hedef üstü oranı');
      if (ust > 100) h.err('Hedef üstü oranı %100\'den büyük olamaz.');
      prim = Math.min(satis, hedef) * oran / 100 + asan * ust / 100;
    } else if (y === 'esik') prim = satis >= hedef - 1e-9 ? satis * oran / 100 : 0;
    else prim = satis * oran / 100;
    const maas = h.opt(v.maas, 0, 'Sabit brüt maaş');
    if (maas < 0) h.err('"Sabit brüt maaş" negatif olamaz.');
    const rows = [['Prim tutarı', h.para(prim)]];
    if (hedefVar) {
      rows.push(['Hedef gerçekleşme', '%' + h.fmt((satis / hedef) * 100, 2)]);
      rows.push(satis >= hedef ? ['Hedefi aşan tutar', h.para(asan)] : ['Hedefe kalan tutar', h.para(hedef - satis)]);
    }
    rows.push(['Primin satışa oranı', satis > 0 ? '%' + h.fmt((prim / satis) * 100, 2) : '—']);
    if (maas > 0) rows.push(['Toplam brüt gelir', h.para(maas + prim)]);
    return {
      rows,
      note: 'Tutarlar brüttür; gelir vergisi, damga vergisi ve sigorta primi kesintileri hesaba katılmamıştır.',
    };
  },
  cases: [
    { in: { yontem: 'tum', satis: '200000', oran: '3' }, out: { 'Prim tutarı': '6.000,00 TL', 'Primin satışa oranı': '%3' } },
    { in: { yontem: 'asim', satis: '250000', hedef: '200000', oran: '5' }, out: { 'Prim tutarı': '2.500,00 TL', 'Hedef gerçekleşme': '%125', 'Hedefi aşan tutar': '50.000,00 TL', 'Primin satışa oranı': '%1' } },
    { in: { yontem: 'kademeli', satis: '250000', hedef: '200000', oran: '2', ustOran: '5' }, out: { 'Prim tutarı': '6.500,00 TL', 'Primin satışa oranı': '%2,6' } },
    { in: { yontem: 'esik', satis: '180000', hedef: '200000', oran: '3' }, out: { 'Prim tutarı': '0,00 TL', 'Hedef gerçekleşme': '%90', 'Hedefe kalan tutar': '20.000,00 TL' } },
    { in: { yontem: 'esik', satis: '200000', hedef: '200000', oran: '3' }, out: { 'Prim tutarı': '6.000,00 TL', 'Hedef gerçekleşme': '%100' } },
    { in: { yontem: 'tum', satis: '100000', oran: '2', maas: '30000' }, out: { 'Prim tutarı': '2.000,00 TL', 'Toplam brüt gelir': '32.000,00 TL' } },
    { in: { yontem: 'kademeli', satis: '150000', hedef: '200000', oran: '2', ustOran: '5' }, out: { 'Prim tutarı': '3.000,00 TL', 'Hedef gerçekleşme': '%75' } },
    { in: { yontem: 'asim', satis: '250000', hedef: '', oran: '5' }, error: true },
    { in: { yontem: 'tum', satis: '200000', oran: '' }, error: true },
    { in: { yontem: 'kademeli', satis: '250000', hedef: '200000', oran: '2', ustOran: '' }, error: true },
  ],
  howto: [
    `"Prim yöntemi" listesinden işyerinizde uygulanan sistemi seçin. Emin değilseniz prim yönetmeliğinize ya da iş sözleşmenize bakın.`,
    `"Dönem satış tutarı" alanına primin hesaplanacağı dönemdeki (ay, çeyrek ya da yıl) satışınızı yazın.`,
    `Hedefe bağlı yöntemlerde "Satış hedefi" alanını doldurun; ilk yöntemde boş bırakabilirsiniz.`,
    `"Prim oranı" alanına yüzde değerini girin. Kademeli yöntemde hedefi aşan kısma uygulanan oranı "Hedef üstü oranı" alanına yazın.`,
    `Toplam geliri görmek istiyorsanız sabit brüt maaşınızı ekleyin ve "Hesapla" düğmesine basın.`,
  ],
  sections: [
    { h: 'Satış primi nedir?', p: [
      `Satış primi, satış ekibine sabit ücrete ek olarak, gerçekleştirdikleri satışa ya da ulaştıkları hedefe bağlı olarak ödenen değişken ücrettir. Amacı çalışanın gelirini işletmenin cirosuyla ilişkilendirmek ve satışı teşvik etmektir. Mağaza satış danışmanları, saha satış temsilcileri, plasiyerler, çağrı merkezi satış ekipleri, sigorta ve otomotiv satış danışmanları prim sistemiyle en sık çalışan gruplardır.`,
      `Prim sistemlerinin tek bir standardı yoktur; her işletme kendi yönetmeliğini belirler. Yine de uygulamadaki sistemlerin çoğu dört temel modelden birine ya da bunların birleşimine dayanır. Bu araç o dört modeli hesaplar.`,
    ] },
    { h: 'Dört prim yöntemi ve formülleri', ul: [
      `<strong>Tüm satış üzerinden sabit oran:</strong> Prim = Satış × Oran. En yalın sistemdir; hedef yoktur ya da yalnızca bilgi amaçlıdır.`,
      `<strong>Hedefi aşan kısım üzerinden:</strong> Prim = (Satış − Hedef) × Oran. Hedefin altında prim sıfırdır; oran çoğunlukla daha yüksek tutulur.`,
      `<strong>Kademeli:</strong> Prim = Hedefe kadar olan satış × Taban oran + Hedefi aşan satış × Hedef üstü oranı. Hedefe ulaşılamasa da taban oranla prim alınır.`,
      `<strong>Hedef şartlı:</strong> Satış hedefe eşit ya da hedeften büyükse Prim = Satış × Oran, değilse prim yoktur. "Ya hep ya hiç" sistemidir.`,
    ] },
    { h: 'Çözümlü örnek: aynı satış, dört farklı prim', p: [
      `Aylık hedefi 200.000 lira olan bir satış temsilcisinin 250.000 liralık satış yaptığını düşünelim. Hedef gerçekleşme oranı 250.000 ÷ 200.000 = %125, hedefi aşan tutar 50.000 liradır.`,
    ], ol: [
      `Tüm satış üzerinden %3: 250.000 × 0,03 = 7.500 lira.`,
      `Hedefi aşan kısım üzerinden %5: 50.000 × 0,05 = 2.500 lira.`,
      `Kademeli, taban %2 ve hedef üstü %5: 200.000 × 0,02 + 50.000 × 0,05 = 4.000 + 2.500 = 6.500 lira.`,
      `Hedef şartlı %3: hedef tutulduğu için 250.000 × 0,03 = 7.500 lira. Satış 180.000 lirada kalsaydı gerçekleşme %90 olur ve prim sıfır çıkardı.`,
    ] },
    { h: 'Hangi sistem neyi teşvik eder?', p: [
      `Tüm satış üzerinden sabit oran, hesaplaması en kolay ve öngörülebilir sistemdir; ancak hedefi geçmek için ek bir teşvik sunmaz. Yalnızca aşan kısım üzerinden prim, işletmenin maliyetini düşük tutar, fakat hedefin ulaşılamaz göründüğü aylarda çalışanın motivasyonunu tamamen düşürebilir.`,
      `Kademeli sistem bu ikisinin ortasıdır: her satış prim kazandırır, hedef aşıldıktan sonraki her lira daha değerlidir. Hedef şartlı sistemde ise eşiğin hemen altı ile hemen üstü arasında büyük bir gelir farkı oluşur. Bu durum çalışanı ay sonunda satışı öne çekmeye ya da bir sonraki aya ertelemeye yöneltebilir; sistem tasarlanırken bu davranışın hesaba katılması gerekir.`,
    ] },
    { h: 'Primi hesaplarken sık yapılan hatalar', ul: [
      `<strong>Matrahı yanlış almak:</strong> Prim KDV dahil ciro üzerinden mi, KDV hariç net satış üzerinden mi hesaplanıyor? İadeler ve iskontolar düşülüyor mu? Yönetmelikte yazan tanımı esas alın.`,
      `<strong>Faturalanan satış ile tahsil edilen satışı karıştırmak:</strong> Birçok işletme primi tahsilata bağlar; vadesi gelmemiş alacaklar o dönemin primine girmez.`,
      `<strong>Brüt ile neti karıştırmak:</strong> Prim de ücretin parçasıdır ve yasal kesintilere tabidir; ele geçen tutar bu sayfadaki brüt tutardan düşük olur.`,
      `<strong>Dönemi karıştırmak:</strong> Aylık hedefi çeyreklik satışla karşılaştırmak gerçekleşme oranını anlamsızlaştırır.`,
      `<strong>Kademeli sistemde üst oranı tüm satışa uygulamak:</strong> Yüksek oran yalnızca hedefi aşan kısma uygulanır.`,
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      `Araç tek hedef ve en fazla iki oranla çalışır; ikiden fazla kademesi olan, ürün grubuna göre değişen, takım primi ya da tavan uygulaması içeren sistemleri kapsamaz. Hesaplanan tutarlar brüttür; gelir vergisi, damga vergisi ve sosyal güvenlik primi kesintileri kişinin ücret düzeyine ve yürürlükteki oranlara göre değiştiği için dahil edilmemiştir. Sonuç bilgilendirme amaçlıdır; hak edişiniz konusunda işyerinizin prim yönetmeliği ve bordro birimi, hukuki uyuşmazlıklarda ise uzman görüşü esas alınmalıdır.`,
    ] },
  ],
  faq: [
    [`Satış primi nasıl hesaplanır?`, `En yalın hâliyle satış tutarı prim oranıyla çarpılır. 200.000 liralık satışta %3 prim 6.000 liradır. Hedefe bağlı sistemlerde hesap, hedefi aşan tutar ya da kademeler üzerinden yapılır.`],
    [`Hedef gerçekleşme oranı nedir?`, `Gerçekleşen satışın hedefe bölünüp 100 ile çarpılmasıdır. 200.000 liralık hedefe karşı 250.000 lira satış %125, 180.000 lira satış %90 gerçekleşme demektir.`],
    [`Hedefi tutturamazsam prim alır mıyım?`, `Sisteme bağlıdır. Sabit oranlı ve kademeli sistemlerde yaptığınız satış kadar prim alırsınız. Yalnızca aşan kısımdan ya da hedef şartlı prim veren sistemlerde hedefin altında prim sıfırdır.`],
    [`Kademeli primde yüksek oran hangi tutara uygulanır?`, `Yalnızca hedefi aşan kısma. Hedef 200.000, satış 250.000 lira ise taban oran 200.000 liraya, hedef üstü oranı aşan 50.000 liraya uygulanır.`],
    [`Hesaplanan prim net mi brüt mü?`, `Brüttür. Prim ücret sayıldığı için vergi ve sigorta kesintilerine tabidir. Elinize geçecek net tutar, toplam ücretinizin içinde bulunduğu vergi dilimine göre değişir.`],
    [`Prim KDV dahil satıştan mı hesaplanır?`, `Bunun genel bir kuralı yoktur; işletmenin prim yönetmeliği belirler. Uygulamada çoğunlukla KDV hariç, iade ve iskontolar düşülmüş net satış esas alınır. Araca hangi tutarı yazarsanız prim onun üzerinden hesaplanır.`],
    [`Prim ile komisyon arasındaki fark nedir?`, `Prim, işletmenin kendi çalışanına performansa bağlı olarak ödediği ek ücrettir. Komisyon ise çoğunlukla bağımsız aracılara, bayilere ya da acentelere işlem başına ödenen paydır.`],
    [`Satış ve maaş bilgilerim bir yere kaydediliyor mu?`, `Hayır. Hesaplama tarayıcınızda yapılır; satış, hedef ve maaş tutarları sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['komisyon-hesapla', 'kar-zarar-hesapla', 'yuzde-hesapla', 'calisan-basi-ciro-hesapla', 'yuzde-degisim-hesapla'],
};
