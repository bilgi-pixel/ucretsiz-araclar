export default {
  slug: 'alacak-devir-hizi-hesapla',
  title: 'Alacak Devir Hızı Hesaplama',
  h1Tail: 've ortalama tahsil süresi',
  pageTitle: 'Alacak Devir Hızı Hesaplama – Ortalama Tahsil Süresi (Gün)',
  description: 'Kredili satışlar ve ticari alacak bakiyelerinden alacak devir hızını ve ortalama tahsil süresini hesaplayın; alacaklarınızın yılda kaç kez nakde döndüğünü görün.',
  card: 'Vadeli satışlarınız ve alacak bakiyenizden alacak devir hızını ve ortalama tahsil süresini gün olarak bulun.',
  category: 'finans',
  keywords: ['alacak devir hızı', 'alacak devir hızı hesaplama', 'ortalama tahsil süresi', 'alacak tahsil süresi', 'ticari alacak devir hızı', 'alacak devir hızı formülü', 'tahsilat süresi hesaplama'],
  lead: 'Vadeli satışlarınızın ne kadar hızlı tahsil edildiğini ölçün. Araç, dönem içindeki kredili satışları ortalama ticari alacağa bölerek <strong>alacak devir hızını</strong>, dönem gün sayısını bu hıza bölerek de <strong>ortalama tahsil süresini</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'satis', label: 'Dönem kredili (vadeli) net satışları (TL)', type: 'number', placeholder: 'Örn. 1200000', hint: 'Binlik ayraç kullanmayın ya da 1.200.000,00 biçiminde yazın.', wide: true },
    { id: 'alacakSon', label: 'Dönem sonu ticari alacak (TL)', type: 'number', placeholder: 'Örn. 220000' },
    { id: 'alacakBas', label: 'Dönem başı ticari alacak (TL)', type: 'number', placeholder: 'Örn. 180000', hint: 'Boş bırakırsanız yalnızca dönem sonu bakiyesi kullanılır.' },
    { id: 'donem', label: 'Dönem gün sayısı', type: 'number', value: '365' },
  ],
  compute(v, h) {
    const satis = h.pos(v.satis, 'Dönem kredili net satışları');
    const son = h.nonneg(v.alacakSon, 'Dönem sonu ticari alacak');
    const basVar = String(v.alacakBas ?? '').trim() !== '';
    const bas = basVar ? h.nonneg(v.alacakBas, 'Dönem başı ticari alacak') : son;
    const donem = h.pos(v.donem, 'Dönem gün sayısı');
    if (donem > 3660) h.err('"Dönem gün sayısı" en fazla 3660 olabilir; yıllık hesap için 365 yazın.');
    const ort = (bas + son) / 2;
    if (!(ort > 0)) h.err('Ortalama ticari alacak sıfır; devir hızı hesaplanamaz. Alacak bakiyesi olmayan (tamamen peşin çalışan) işletmede tahsil süresi 0 gündür.');
    const hiz = satis / ort;
    const sure = donem / hiz;
    return {
      rows: [
        ['Alacak devir hızı', h.fmt(hiz, 2) + ' kez'],
        ['Ortalama tahsil süresi', h.fmt(sure, 1) + ' gün'],
        ['Ortalama ticari alacak', h.para(ort)],
        ['Günlük ortalama kredili satış', h.para(satis / donem)],
        ['Alacakların satışa oranı', '%' + h.fmt(ort / satis * 100, 2)],
      ],
      note: basVar ? 'Ortalama alacak, dönem başı ve dönem sonu bakiyelerinin aritmetik ortalamasıdır.' : 'Dönem başı bakiyesi girilmediği için ortalama yerine dönem sonu bakiyesi kullanıldı; bakiye dönem içinde çok değiştiyse sonuç sapabilir.',
    };
  },
  cases: [
    { in: { satis: '1200000', alacakSon: '220000', alacakBas: '180000', donem: '365' }, out: { 'Alacak devir hızı': '6 kez', 'Ortalama tahsil süresi': '60,8 gün', 'Ortalama ticari alacak': '200.000,00 TL', 'Günlük ortalama kredili satış': '3.287,67 TL' } },
    { in: { satis: '3650000', alacakSon: '300000', alacakBas: '', donem: '365' }, out: { 'Alacak devir hızı': '12,17 kez', 'Ortalama tahsil süresi': '30 gün', 'Ortalama ticari alacak': '300.000,00 TL', 'Günlük ortalama kredili satış': '10.000,00 TL' } },
    { in: { satis: '900000', alacakSon: '250000', alacakBas: '350000', donem: '90' }, out: { 'Alacak devir hızı': '3 kez', 'Ortalama tahsil süresi': '30 gün', 'Alacakların satışa oranı': '%33,33' } },
    { in: { satis: '500000', alacakSon: '0', alacakBas: '100000', donem: '360' }, out: { 'Alacak devir hızı': '10 kez', 'Ortalama tahsil süresi': '36 gün', 'Ortalama ticari alacak': '50.000,00 TL' } },
    { in: { satis: '2400000', alacakSon: '600000', alacakBas: '600000' }, out: { 'Alacak devir hızı': '4 kez', 'Ortalama tahsil süresi': '91,3 gün', 'Alacakların satışa oranı': '%25' } },
    { in: { satis: '100000', alacakSon: '200000', alacakBas: '200000', donem: '365' }, out: { 'Alacak devir hızı': '0,5 kez', 'Ortalama tahsil süresi': '730 gün' } },
    { in: { satis: '0', alacakSon: '220000', alacakBas: '180000', donem: '365' }, error: true },
    { in: { satis: '1200000', alacakSon: '0', alacakBas: '0', donem: '365' }, error: true },
    { in: { satis: '1200000', alacakSon: 'yok', alacakBas: '', donem: '365' }, error: true },
  ],
  howto: [
    'İlk alana dönem içinde yaptığınız vadeli (kredili) satışların iade ve iskontolar düşülmüş net tutarını yazın. Peşin satışları ayıramıyorsanız toplam net satışı kullanabilirsiniz; bu durumda devir hızı olduğundan yüksek çıkar.',
    'Dönem sonu ticari alacak bakiyenizi girin: müşterilerden alacaklar ile alacak senetleri ve alınan vadeli çekler bu kalemin içindedir.',
    'Varsa dönem başı bakiyesini de yazın. Araç iki bakiyenin ortalamasını alır; boş bırakırsanız yalnızca dönem sonu kullanılır.',
    'Dönem gün sayısını satış tutarının kapsadığı süreye göre ayarlayın (yıl için 365, çeyrek için 90) ve "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Alacak devir hızı neyi ölçer?', p: [
      'Alacak devir hızı, bir işletmenin müşterilerine açtığı vadeli satış kredisini dönem içinde kaç kez tahsil edip yeniden kullandırdığını gösteren bir faaliyet oranıdır. Oran 6 ise, ortalama alacak bakiyesi yıl içinde altı kez nakde dönmüş demektir. Aynı bilgiyi gün cinsinden söylemek daha sezgiseldir: yılı devir hızına bölerseniz ortalama tahsil süresini bulursunuz.',
      'Bu oran özellikle açık hesap çalışan toptancılar, imalatçılar, bayiler ve kurumsal müşteriye hizmet veren ajans ya da yazılım firmaları için önemlidir. Fatura kesmek gelir yazdırır ama kasaya para koymaz; tahsilat ne kadar gecikirse maaş, kira ve satıcı ödemeleri için o kadar çok kaynak bulmak gerekir.',
    ] },
    { h: 'Formüller', ul: [
      '<strong>Ortalama ticari alacak</strong> = (Dönem başı alacak + Dönem sonu alacak) ÷ 2',
      '<strong>Alacak devir hızı</strong> = Kredili net satışlar ÷ Ortalama ticari alacak',
      '<strong>Ortalama tahsil süresi</strong> = Dönem gün sayısı ÷ Alacak devir hızı',
      'Tahsil süresi aynı zamanda <strong>Ortalama alacak ÷ Günlük kredili satış</strong> olarak da hesaplanabilir; iki yol aynı sonucu verir.',
    ] },
    { h: 'Adım adım örnek', p: [
      'Bir matbaanın yıllık vadeli net satışları 1.200.000 TL olsun. Yılbaşında müşterilerden 180.000 TL, yıl sonunda 220.000 TL alacağı var. Ortalama alacak (180.000 + 220.000) ÷ 2 = 200.000 TL\'dir. Alacak devir hızı 1.200.000 ÷ 200.000 = 6 kez çıkar. Ortalama tahsil süresi 365 ÷ 6 = 60,8 gündür; yani kesilen bir fatura ortalama iki ayda tahsil edilmektedir.',
      'Günlük ortalama kredili satış 1.200.000 ÷ 365 = 3.287,67 TL\'dir. 200.000 TL\'lik alacak bu günlük satışın yaklaşık 60,8 katıdır; aynı sonuca diğer yoldan da ulaşılır. Matbaa müşterilerine 45 gün vade veriyorsa, fiilî tahsilatın vadeden yaklaşık 16 gün geciktiği söylenebilir.',
    ] },
    { h: 'Sonucu yorumlamak', p: [
      'Yüksek devir hızı ve kısa tahsil süresi, alacakların hızlı nakde döndüğünü gösterir. Düşük devir hızı ise ya uzun vade verildiğine ya da tahsilatın aksadığına işaret eder. Ancak tek başına "yüksek iyidir" demek doğru olmaz: çok sıkı vade politikası, vadeli çalışmak isteyen iyi müşterileri rakibe kaptırmak anlamına da gelebilir.',
      'En sağlıklı karşılaştırma, bulduğunuz tahsil süresini müşterilerinize tanıdığınız sözleşme vadesiyle yan yana koymaktır. Süre vadeye yakınsa tahsilat düzenlidir. Süre vadeyi belirgin biçimde aşıyorsa gecikmiş alacaklar birikmektedir ve yaşlandırma tablosuna, yani alacakların vadesine göre dökümüne bakmanın zamanı gelmiştir. Ayrıca sonucu önceki dönemlerinizle karşılaştırın; süredeki istikrarlı uzama, müşteri portföyünde ödeme güçlüğünün erken habercisi olabilir.',
    ] },
    { h: 'Dikkat edilecek noktalar', ul: [
      '<strong>KDV uyumu:</strong> Alacak bakiyesi genellikle KDV dahil, gelir tablosundaki satış ise KDV hariçtir. Karşılaştırmayı aynı esasa getirmezseniz tahsil süresi olduğundan uzun görünür.',
      '<strong>Peşin satışlar:</strong> Paya peşin satışları da katarsanız devir hızı şişer. Mümkünse yalnızca vadeli satışları kullanın.',
      '<strong>Mevsimsellik:</strong> Satışları yılın belli aylarında yoğunlaşan işletmelerde dönem başı ve sonu ortalaması yetersiz kalır; aylık bakiyelerin ortalamasını alıp dönem başı ve sonu alanlarına aynı değeri yazabilirsiniz.',
      '<strong>Şüpheli alacaklar:</strong> Tahsil edilemeyeceği anlaşılan alacaklar bakiyede durdukça süre uzun görünür; bu kalemleri ayrı değerlendirin.',
      '<strong>Tek büyük müşteri:</strong> Ortalama, birkaç büyük müşterinin geç ödemesini küçük müşterilerin düzenli ödemesiyle gizleyebilir.',
    ] },
    { h: 'Tahsil süresini kısaltmak için', p: [
      'Faturayı işi teslim eder etmez kesmek, vade tarihini faturanın üzerine açıkça yazmak ve vadeden birkaç gün önce hatırlatma göndermek en az maliyetli adımlardır. Yeni müşterilerde kredi limiti belirlemek, limiti aşan siparişlerde avans istemek riski sınırlar. Erken ödeme iskontosu tahsilatı hızlandırır, ancak iskontonun yıllık maliyeti çoğu zaman göründüğünden yüksektir; karar vermeden önce hesaplayın.',
      'Bu araç genel bir oran hesabı yapar ve bilgilendirme amaçlıdır. Kredi politikası, karşılık ayırma ve vergi boyutu olan konularda mali müşavirinize danışın.',
    ] },
  ],
  faq: [
    ['Alacak devir hızı kaç olmalı?', 'Herkes için geçerli tek bir değer yoktur; sektörün vade alışkanlıklarına bağlıdır. 30 gün vadeyle çalışan bir işletmede yıllık 12 civarı, 90 gün vadeyle çalışan bir işletmede 4 civarı olağandır. Asıl ölçüt, hesaplanan tahsil süresinin verdiğiniz vadeye yakın olmasıdır.'],
    ['Ortalama tahsil süresi nasıl hesaplanır?', 'Dönem gün sayısı alacak devir hızına bölünür. Devir hızı 6 ise 365 ÷ 6 = 60,8 gün bulunur. Aynı değer, ortalama alacağın günlük kredili satışa bölünmesiyle de elde edilir.'],
    ['Kredili satış tutarını bilmiyorum, toplam satışı yazabilir miyim?', 'Yazabilirsiniz, ancak peşin satışlar da hesaba girdiği için devir hızı gerçekte olduğundan yüksek, tahsil süresi kısa çıkar. Satışlarınızın büyük bölümü vadeliyse sapma küçük olur.'],
    ['Dönem başı bakiyesini neden giriyorum?', 'Tek bir günün bakiyesi dönemin tamamını temsil etmeyebilir. Dönem başı ve sonunun ortalaması, yıl içindeki değişimi kabaca dengeler. Bu bilgi yoksa alan boş bırakılabilir.'],
    ['Alınan çekler ve senetler alacağa dahil mi?', 'Evet. Ticari faaliyetten doğan ve henüz nakde dönmemiş müşteri çekleri ile alacak senetleri de ticari alacağın parçasıdır. Bunları dışarıda bırakırsanız tahsil süresi olduğundan kısa görünür.'],
    ['Devir hızının düşmesi ne anlama gelir?', 'Satışlara kıyasla alacakların büyüdüğünü gösterir. Nedeni daha uzun vade verilmesi, tahsilat takibinin zayıflaması ya da müşterilerin ödeme güçlüğü olabilir. Hangisinin geçerli olduğunu anlamak için alacakların vadesine göre dökümüne bakın.'],
    ['Aylık ya da çeyreklik hesap yapabilir miyim?', 'Evet. Satış tutarı hangi dönemi kapsıyorsa gün sayısını ona göre yazın: bir ay için 30, çeyrek için 90. Devir hızı o dönem içindeki dönüş sayısını verir; tahsil süresi ise gün cinsinden olduğu için dönemler arasında doğrudan karşılaştırılabilir.'],
    ['Girdiğim tutarlar saklanıyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; satış ve alacak tutarlarınız hiçbir sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['nakit-donusum-suresi-hesapla', 'stok-devir-hizi-hesapla', 'cari-oran-hesapla', 'ortalama-vade-hesapla', 'cek-senet-iskonto-hesapla'],
};
