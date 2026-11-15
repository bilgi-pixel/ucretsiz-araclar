export default {
  slug: 'hedef-ortalama-hesapla',
  title: 'Hedef Ortalama İçin Gereken Not Hesaplama',
  h1Tail: 'kalan derslerden kaç almalıyım?',
  pageTitle: 'Hedef Ortalama İçin Gereken Not Hesaplama – GANO ve Ders Notu',
  description: 'Mevcut ortalamanızı, tamamladığınız krediyi ve hedefinizi girin; kalan derslerden ya da sınavlardan almanız gereken ortalama notu hemen hesaplayın.',
  card: 'Hedeflediğiniz ortalamaya ulaşmak için kalan kredi ya da sınavlardan ortalama kaç almanız gerektiğini bulun.',
  category: 'egitim',
  keywords: ['hedef ortalama hesaplama', 'gano yükseltme hesaplama', 'ortalamayı yükseltmek için kaç almalıyım', 'gereken not hesaplama', 'agno hedef', 'onur belgesi için ortalama', 'ortalama yükseltme'],
  lead: 'Şu anki ortalamanızı, bu ortalamanın dayandığı kredi ya da ağırlığı ve ulaşmak istediğiniz hedefi yazın. Araç, kalan kredilerden ya da sınavlardan <strong>ortalama kaç almanız gerektiğini</strong> ve hedefin ulaşılabilir olup olmadığını gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mevcut', label: 'Mevcut ortalama', type: 'number', placeholder: 'Örn. 2,40' },
    { id: 'tamam', label: 'Tamamlanan kredi / ağırlık', type: 'number', placeholder: 'Örn. 60', hint: 'Mevcut ortalamanın dayandığı toplam kredi, AKTS ya da yüzde.' },
    { id: 'hedef', label: 'Hedef ortalama', type: 'number', placeholder: 'Örn. 2,50' },
    { id: 'kalan', label: 'Kalan kredi / ağırlık', type: 'number', placeholder: 'Örn. 30', hint: 'Hedefe ulaşmak için kullanacağınız derslerin kredisi ya da sınavların yüzdesi.' },
    { id: 'tavan', label: 'Not sistemi', type: 'select', options: [['4', '4\'lük sistem (en yüksek 4,00)'], ['100', '100\'lük sistem (en yüksek 100)'], ['5', '5\'lik sistem (en yüksek 5)'], ['10', '10\'luk sistem (en yüksek 10)']] },
  ],
  compute(v, h) {
    const tavan = Number(v.tavan) || 4;
    const m = h.nonneg(v.mevcut, 'Mevcut ortalama');
    const a = h.nonneg(v.tamam, 'Tamamlanan kredi / ağırlık');
    const t = h.pos(v.hedef, 'Hedef ortalama');
    const b = h.pos(v.kalan, 'Kalan kredi / ağırlık');
    if (m > tavan) h.err(`Mevcut ortalama seçtiğiniz not sisteminin tavanını (${tavan}) aşamaz.`);
    if (t > tavan) h.err(`Hedef ortalama seçtiğiniz not sisteminin tavanını (${tavan}) aşamaz.`);
    const toplam = a + b;
    const ham = (t * toplam - m * a) / b;
    const gereken = Math.ceil(ham * 100 - 1e-7) / 100;
    const enYuksek = (m * a + tavan * b) / toplam;
    const enDusuk = (m * a) / toplam;
    let ana, durum;
    if (gereken > tavan + 1e-9) { ana = 'Ulaşılamıyor'; durum = 'Kalan bölümden tam not alınsa bile hedefe ulaşılamıyor'; }
    else if (gereken <= 0) { ana = h.fmt(0, 2); durum = 'Hedef zaten güvende: kalan bölümden sıfır alınsa bile ortalama hedefin altına düşmüyor'; }
    else { ana = h.fmt(gereken, 2); durum = gereken > m + 1e-9 ? 'Ulaşılabilir: mevcut ortalamanızın üzerinde performans gerekiyor' : 'Ulaşılabilir: mevcut ortalamanızın altında bir performans bile yetiyor'; }
    return {
      rows: [
        ['Kalan bölümden gereken ortalama', ana],
        ['Durum', durum],
        ['Ulaşılabilecek en yüksek ortalama', h.fmt(enYuksek, 2)],
        ['Kalan bölümden sıfır alınırsa ortalama', h.fmt(enDusuk, 2)],
        ['Toplam kredi / ağırlık', h.fmt(toplam, 2)],
        ['Mevcut ortalamayla fark', (ham - m >= 0 ? '+' : '−') + h.fmt(Math.abs(ham - m), 2)],
      ],
      note: 'Gereken değer, kalan derslerin kredi ağırlıklı ortalamasıdır; her dersten ayrı ayrı bu notu almanız gerekmez. Ders tekrarı ve ortalamaya katılmayan dersler hesaba dahil değildir.',
    };
  },
  cases: [
    { in: { mevcut: '2,40', tamam: '60', hedef: '2,50', kalan: '30', tavan: '4' }, out: { 'Kalan bölümden gereken ortalama': '2,7', 'Ulaşılabilecek en yüksek ortalama': '2,93', 'Toplam kredi / ağırlık': '90' } },
    { in: { mevcut: '60', tamam: '40', hedef: '70', kalan: '60', tavan: '100' }, out: { 'Kalan bölümden gereken ortalama': '76,67', 'Kalan bölümden sıfır alınırsa ortalama': '24' } },
    { in: { mevcut: '2', tamam: '100', hedef: '3', kalan: '20', tavan: '4' }, out: { 'Kalan bölümden gereken ortalama': 'Ulaşılamıyor', 'Ulaşılabilecek en yüksek ortalama': '2,33' } },
    { in: { mevcut: '85', tamam: '50', hedef: '70', kalan: '50', tavan: '100' }, out: { 'Kalan bölümden gereken ortalama': '55', 'Mevcut ortalamayla fark': '−30' } },
    { in: { mevcut: '90', tamam: '80', hedef: '70', kalan: '20', tavan: '100' }, out: { 'Kalan bölümden gereken ortalama': '0', 'Kalan bölümden sıfır alınırsa ortalama': '72' } },
    { in: { mevcut: '0', tamam: '0', hedef: '3', kalan: '30', tavan: '4' }, out: { 'Kalan bölümden gereken ortalama': '3' } },
    { in: { mevcut: '4,5', tamam: '60', hedef: '3', kalan: '30', tavan: '4' }, error: true },
    { in: { mevcut: '2,4', tamam: '60', hedef: '2,5', kalan: '0', tavan: '4' }, error: true },
  ],
  howto: [
    'Not sisteminizi seçin: genel not ortalaması için 4\'lük, tek bir dersin dönem notu için çoğunlukla 100\'lük sistem uygundur.',
    'Mevcut ortalamanızı ve bu ortalamanın hesaplandığı toplam krediyi yazın. Tek ders için hesap yapıyorsanız kredi yerine açıklanan sınavların yüzde toplamını girin.',
    'Ulaşmak istediğiniz ortalamayı ve bunun için elinizde kalan kredi miktarını (ya da kalan sınavların yüzdesini) yazın.',
    '"Hesapla" düğmesine basın; kalan bölümden almanız gereken ortalama, hedefin ulaşılabilirliği ve en iyi ile en kötü senaryo birlikte gösterilir.',
    'Sonuç gerçekçi değilse hedefi ya da kalan kredi miktarını değiştirip farklı senaryoları deneyin.',
  ],
  sections: [
    { h: 'Bu hesap ne işe yarar?', p: [
      'Ortalama, geçmişin ağırlığını taşıyan bir sayıdır: ne kadar çok kredi tamamladıysanız yeni notların ortalamayı oynatma gücü o kadar azalır. Bu yüzden "bu dönem iyi çalışırsam ortalamam 3 olur" gibi tahminler çoğu zaman yanıltıcıdır. Bu araç tahmini sayıya çevirir: hedeflediğiniz ortalama için kalan derslerden tam olarak hangi ortalamayı tutturmanız gerektiğini söyler.',
      'Kullanım alanı geniştir. Üniversitede onur ya da yüksek onur sınırına ulaşmak, burs için istenen ortalamayı korumak, çift anadal ve yandal başvuru şartını sağlamak, mezuniyet için gereken alt sınırın üzerine çıkmak ya da tek bir derste final öncesi "kaç alırsam şu harfi tuttururum" sorusunu yanıtlamak için aynı formül geçerlidir.',
    ] },
    { h: 'Formül', p: [
      'Ağırlıklı ortalama, her notun kendi kredisiyle çarpılıp toplam krediye bölünmesiyle bulunur. Mevcut ortalamanız <em>M</em>, tamamlanan krediniz <em>A</em>, hedefiniz <em>H</em> ve kalan krediniz <em>B</em> ise kalan bölümden gereken ortalama şöyle hesaplanır: <strong>gereken = (H × (A + B) − M × A) ÷ B</strong>.',
      'Mantığı basittir: hedef ortalamaya ulaşmak için toplamda H × (A + B) kadar "not puanı" gerekir. Bunun M × A kadarını zaten kazandınız; kalan fark, kalan kredilere bölünür. Sonuç not sisteminin tavanını aşıyorsa hedefe bu kredi miktarıyla ulaşmak matematiksel olarak mümkün değildir.',
    ] },
    { h: 'Çözümlü örnek: genel not ortalaması', p: [
      '60 kredi tamamlamış ve ortalaması 2,40 olan bir öğrenci, önündeki 30 kredilik dönemin sonunda 2,50 ortalamaya ulaşmak istiyor. Gereken toplam puan 2,50 × 90 = 225, kazanılmış puan 2,40 × 60 = 144\'tür. Aradaki 81 puan 30 krediye bölündüğünde <strong>2,70</strong> çıkar. Yani ortalamayı yalnızca 0,10 yükseltmek için bile dönem ortalamasının 2,70 olması gerekir.',
      'Aynı öğrenci bu dönemin tüm derslerinden 4,00 alsa ortalaması (144 + 120) ÷ 90 = 2,93 olur. Araç bu değeri "Ulaşılabilecek en yüksek ortalama" satırında gösterir; 3,00 gibi bir hedefin tek dönemde tutmayacağını baştan görmenizi sağlar.',
    ] },
    { h: 'Çözümlü örnek: tek dersin notu', p: [
      'Bir derste yüzde 40 ağırlıklı ara sınavlardan ortalama 60 aldınız ve dönem notunun 70 olmasını istiyorsunuz. Kalan yüzde 60\'lık finalden gereken not (70 × 100 − 60 × 40) ÷ 60 = 76,67\'dir. Not sistemi olarak 100\'lük seçip tamamlanan ağırlığa 40, kalan ağırlığa 60 yazmanız yeterlidir.',
      'Ters durum da olabilir: yüzde 80\'lik bölümden 90 ortalama tutturmuş bir öğrencinin hedefi 70 ise kalan yüzde 20\'den sıfır alsa bile dönem notu 72 olur. Araç bu durumda gereken notu 0 olarak gösterir ve hedefin güvende olduğunu belirtir.',
    ] },
    { h: 'Sonucu yorumlarken dikkat edilecekler', ul: [
      'Gereken değer bir <strong>ortalamadır</strong>. 2,70 çıkması her dersten 2,70 almanız gerektiği anlamına gelmez; yüksek kredili bir dersteki iyi not, düşük kredili bir dersteki kötü notu telafi edebilir.',
      'Harf notları basamaklıdır (ör. 2,50 – 3,00 – 3,50). Gereken ortalama 2,70 ise derslerin çoğunda bir üst basamağı hedeflemeniz gerekir.',
      'Başarısız olunan dersi tekrar alıp yükseltmek, yeni ders almaktan farklı çalışır: çoğu kurumda eski not ortalamadan çıkar. Bu durumda tamamlanan krediyi ve mevcut ortalamayı o ders hariç yeniden hesaplayıp girmek daha doğru sonuç verir.',
      'Ortalamaya katılmayan dersler (geçti-kaldı notu verilenler, muafiyetler) kredi toplamına eklenmemelidir.',
      'Kredi olarak ulusal krediyi mi AKTS\'yi mi kullanacağınız, kurumunuzun ortalamayı hangisiyle hesapladığına bağlıdır; transkriptinizdeki toplamı esas alın.',
    ] },
    { h: 'Neden ortalama yükseltmek giderek zorlaşır?', p: [
      'Tamamlanan kredi arttıkça her yeni dönemin toplam içindeki payı küçülür. 30 kredisi olan birinci sınıf öğrencisi için 30 kredilik yeni dönem toplamın yarısıdır; 180 kredisi olan son sınıf öğrencisi için aynı dönem yalnızca yedide birdir. Bu nedenle ortalama hedefleri ne kadar erken konursa o kadar ulaşılabilir olur. Araçta kalan krediyi artırarak hedefe kaç dönemde varılabileceğini de sınayabilirsiniz: 30 kredi yetmiyorsa 60 kredi için gereken ortalamaya bakın.',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap salt aritmetiktir; kurumunuzun yuvarlama kuralını, ders tekrarı ve not yükseltme uygulamalarını, yaz okulu notlarının ortalamaya katılma biçimini bilemez. Burs, onur belgesi ya da mezuniyet gibi resmî sonuçlar için öğrenci bilgi sisteminizdeki ortalama ve kurumunuzun yönetmeliği esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Ortalamamı 2,40\'tan 2,50\'ye çıkarmak için kaç almam gerekir?', 'Bu, tamamladığınız ve kalan krediye bağlıdır. 60 kredi tamamladıysanız ve 30 kredilik bir dönem alacaksanız dönem ortalamanızın 2,70 olması gerekir. Tamamlanan kredi arttıkça gereken değer de yükselir.'],
    ['Araç "Ulaşılamıyor" diyorsa ne yapmalıyım?', 'Girdiğiniz kalan krediyle hedef matematiksel olarak tutmuyor demektir. Kalan krediyi artırarak (ör. iki dönemi birlikte düşünerek) yeniden hesaplayın ya da "Ulaşılabilecek en yüksek ortalama" satırına bakarak daha gerçekçi bir hedef belirleyin.'],
    ['Kredi yerine AKTS kullanabilir miyim?', 'Evet. Önemli olan tamamlanan ve kalan değerlerin aynı birimde olması ve mevcut ortalamanızın o birimle hesaplanmış olmasıdır. Kurumunuz ortalamayı hangisiyle hesaplıyorsa onu kullanın.'],
    ['Tek bir dersin final notu için kullanılır mı?', 'Evet. 100\'lük sistemi seçin, tamamlanan ağırlığa açıklanan sınavların yüzde toplamını, kalan ağırlığa finalin yüzdesini yazın. Sonuç finalden almanız gereken nottur.'],
    ['Ders tekrarı yaparsam hesap nasıl değişir?', 'Tekrar edilen dersin eski notu çoğu kurumda ortalamadan çıkarılır. Bu durumda o dersi tamamlanan krediden düşüp mevcut ortalamayı onsuz hesaplayın, dersi de kalan krediye ekleyin. Kurallar kuruma göre değiştiği için yönetmeliğinizi kontrol edin.'],
    ['Gereken ortalama mevcut ortalamamdan düşük çıktı, bu normal mi?', 'Evet. Hedefiniz mevcut ortalamanızın altındaysa, yani amacınız belirli bir sınırın altına düşmemekse, gereken değer mevcut ortalamadan düşük hatta sıfır çıkabilir. Bu, ne kadar hata payınız olduğunu gösterir.'],
    ['Sonuç neden yukarı yuvarlanıyor?', 'Aşağı yuvarlanmış bir değer hedefin çok az altında kalmanıza yol açabilir. Araç, gösterilen notu tutturduğunuzda hedefe kesin ulaşmanız için sonucu yüzde bir duyarlılıkla yukarı yuvarlar.'],
    ['Notlarım bir yere kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız ortalama ve kredi bilgileri sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kredili-ortalama-hesapla', '100luk-4luk-cevir', 'sinav-notu-hesapla', 'butunleme-notu-hesapla', 'basari-yuzdesi-hesapla'],
};
