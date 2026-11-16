export default {
  slug: 'terleme-orani-hesapla',
  title: 'Terleme Oranı ve Sıvı Kaybı Hesaplama',
  h1Tail: 'antrenman öncesi–sonrası tartıyla',
  pageTitle: 'Terleme Oranı Hesaplama – Antrenmanda Saatte Kaç Litre Ter Kaybı?',
  description: 'Antrenman öncesi ve sonrası kilonuzu, içtiğiniz sıvıyı ve süreyi girin; saatlik terleme oranınızı, toplam sıvı kaybınızı ve vücut ağırlığı kaybı yüzdesini hesaplayın.',
  card: 'Antrenman öncesi ve sonrası tartınızdan saatlik terleme oranınızı ve sıvı kaybınızı hesaplayın.',
  category: 'saglik',
  keywords: ['terleme oranı hesaplama', 'ter kaybı hesaplama', 'sıvı kaybı hesaplama', 'antrenmanda ne kadar su içmeli', 'saatte kaç litre ter', 'sweat rate hesaplama', 'koşuda su ihtiyacı'],
  lead: 'Antrenmandan önce ve sonra tartılarak ne kadar terlediğinizi ölçebilirsiniz. Tartı değerlerini, antrenman sırasında içtiğiniz sıvıyı ve süreyi yazın; araç <strong>saatlik terleme oranınızı</strong>, toplam ter kaybınızı ve vücut ağırlığınızın yüzde kaçını kaybettiğinizi hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'once', label: 'Antrenman öncesi kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sonra', label: 'Antrenman sonrası kilo (kg)', type: 'number', placeholder: 'Örn. 69,2' },
    { id: 'icilen', label: 'Antrenmanda içilen sıvı (ml)', type: 'number', value: '0', hint: 'Su, sporcu içeceği vb. toplamı. 1 litre = 1000 ml.' },
    { id: 'idrar', label: 'Antrenmanda idrar miktarı (ml, isteğe bağlı)', type: 'number', value: '0', hint: 'Tuvalete gitmediyseniz 0 bırakın.' },
    { id: 'sure', label: 'Antrenman süresi (dakika)', type: 'number', placeholder: 'Örn. 60' },
  ],
  compute(v, h) {
    const once = h.pos(v.once, 'Antrenman öncesi kilo');
    const sonra = h.pos(v.sonra, 'Antrenman sonrası kilo');
    const icilen = h.nonneg(String(v.icilen ?? '').trim() === '' ? '0' : v.icilen, 'İçilen sıvı');
    const idrar = h.nonneg(String(v.idrar ?? '').trim() === '' ? '0' : v.idrar, 'İdrar miktarı');
    const sure = h.pos(v.sure, 'Antrenman süresi');
    if (once < 20 || once > 300 || sonra < 20 || sonra > 300) h.err('Kilo değerleri 20 ile 300 kg arasında olmalı.');
    if (icilen > 10000 || idrar > 5000) h.err('Sıvı miktarları mililitre cinsinden ve makul sınırlar içinde olmalı (içilen en çok 10.000 ml).');
    if (sure > 1440) h.err('Antrenman süresi 1.440 dakikadan (24 saat) uzun olamaz.');
    const kiloFarki = once - sonra;
    const ter = kiloFarki + icilen / 1000 - idrar / 1000;
    if (ter <= 1e-9) h.err('Bu değerlerle ter kaybı sıfır ya da negatif çıkıyor. Tartı değerlerini ve içilen sıvı miktarını kontrol edin.');
    const saat = sure / 60;
    const oran = ter / saat;
    const yuzde = kiloFarki / once * 100;
    let durum;
    if (yuzde < -1e-9) durum = 'Antrenmanda kaybettiğinizden fazla sıvı aldınız';
    else if (yuzde < 1) durum = 'Sıvı dengesi iyi korunmuş (%1\'in altında kayıp)';
    else if (yuzde < 2) durum = 'Hafif sıvı açığı (%1–2)';
    else if (yuzde < 3) durum = 'Belirgin sıvı açığı (%2–3); performans etkilenebilir';
    else durum = 'Yüksek sıvı açığı (%3 ve üzeri); antrenmanda daha çok sıvı alın';
    const acik = Math.max(0, kiloFarki);
    return {
      rows: [
        ['Terleme oranı', h.fmt(oran, 2) + ' L/saat'],
        ['Toplam ter kaybı', `${h.fmt(ter, 2)} L (${h.fmt(ter * 1000, 0)} ml)`],
        ['Vücut ağırlığı değişimi', (kiloFarki >= 0 ? '−' : '+') + h.fmt(Math.abs(kiloFarki), 2) + ' kg (%' + h.fmt(Math.abs(yuzde), 2) + ')'],
        ['Değerlendirme', durum],
        ['Karşılanan kayıp', '%' + h.fmt(Math.min(100, icilen / 1000 / ter * 100), 0)],
        ['Antrenman sonrası telafi', acik > 0 ? `${h.fmt(acik * 1.25, 2)}–${h.fmt(acik * 1.5, 2)} L` : 'Ek telafi gerekmiyor'],
        ['Ter kaybının 15 dakikalık karşılığı', h.fmt(oran * 250, 0) + ' ml'],
      ],
      note: '1 kg ağırlık kaybı yaklaşık 1 litre sıvı sayılır. Solunumla ve enerji kullanımıyla oluşan küçük kütle kayıpları ihmal edilmiştir. Telafi aralığı, kaybedilen her kilogram için 1,25–1,5 litre sıvı varsayımına dayanır. Amaç ter kaybının tamamını içmek değil, ağırlık kaybını vücut ağırlığının yaklaşık %2\'sinin altında tutmaktır; susuzluğunuza göre için, gereğinden fazla su içmek de sakıncalıdır.',
    };
  },
  cases: [
    { in: { once: '70', sonra: '69,2', icilen: '500', idrar: '0', sure: '60' }, out: { 'Terleme oranı': '1,3 L/saat', 'Toplam ter kaybı': '1,3 L (1.300 ml)', 'Vücut ağırlığı değişimi': '−0,8 kg (%1,14)', 'Değerlendirme': 'Hafif sıvı açığı (%1–2)', 'Antrenman sonrası telafi': '1–1,2 L' } },
    { in: { once: '80', sonra: '78,5', icilen: '750', idrar: '250', sure: '90' }, out: { 'Terleme oranı': '1,33 L/saat', 'Toplam ter kaybı': '2 L (2.000 ml)', 'Vücut ağırlığı değişimi': '−1,5 kg (%1,88)', 'Karşılanan kayıp': '%38' } },
    { in: { once: '60', sonra: '59,7', icilen: '0', idrar: '0', sure: '30' }, out: { 'Terleme oranı': '0,6 L/saat', 'Toplam ter kaybı': '0,3 L (300 ml)', 'Değerlendirme': 'Sıvı dengesi iyi korunmuş (%1\'in altında kayıp)', 'Ter kaybının 15 dakikalık karşılığı': '150 ml' } },
    { in: { once: '75', sonra: '72,5', icilen: '1000', idrar: '0', sure: '120' }, out: { 'Terleme oranı': '1,75 L/saat', 'Toplam ter kaybı': '3,5 L (3.500 ml)', 'Vücut ağırlığı değişimi': '−2,5 kg (%3,33)', 'Değerlendirme': 'Yüksek sıvı açığı (%3 ve üzeri); antrenmanda daha çok sıvı alın', 'Antrenman sonrası telafi': '3,13–3,75 L' } },
    { in: { once: '70', sonra: '70,2', icilen: '1000', idrar: '0', sure: '60' }, out: { 'Terleme oranı': '0,8 L/saat', 'Vücut ağırlığı değişimi': '+0,2 kg (%0,29)', 'Değerlendirme': 'Antrenmanda kaybettiğinizden fazla sıvı aldınız', 'Antrenman sonrası telafi': 'Ek telafi gerekmiyor', 'Karşılanan kayıp': '%100' } },
    { in: { once: '65', sonra: '64', icilen: '600', idrar: '0', sure: '45' }, out: { 'Terleme oranı': '2,13 L/saat', 'Toplam ter kaybı': '1,6 L (1.600 ml)', 'Vücut ağırlığı değişimi': '−1 kg (%1,54)' } },
    { in: { once: '70', sonra: '70,5', icilen: '200', idrar: '0', sure: '60' }, error: true },
    { in: { once: '70', sonra: '69', icilen: '500', idrar: '0', sure: '0' }, error: true },
    { in: { once: '', sonra: '69', icilen: '500', idrar: '0', sure: '60' }, error: true },
  ],
  howto: [
    'Antrenmandan hemen önce, tuvalete gittikten sonra, mümkünse çıplak ya da çok hafif giysiyle tartılın ve değeri "Antrenman öncesi kilo" alanına yazın.',
    'Antrenman boyunca içtiğiniz her şeyi not edin. Matarayı baştan tartmak ya da hacmini bilmek işi kolaylaştırır.',
    'Antrenman biter bitmez havluyla kurulanın, terli giysileri çıkarın ve aynı tartıda yeniden tartılın; değeri "Antrenman sonrası kilo" alanına girin.',
    'İçtiğiniz sıvıyı mililitre olarak, antrenman süresini dakika olarak yazın. Arada tuvalete gittiyseniz tahmini idrar miktarını da ekleyin.',
    '"Hesapla" düğmesine basın; saatlik terleme oranı, toplam kayıp ve vücut ağırlığı değişimi listelenir.',
  ],
  sections: [
    { h: 'Terleme oranı formülü', p: [
      'Yöntem, kısa sürede kaybedilen ağırlığın neredeyse tamamının su olduğu varsayımına dayanır; 1 kilogram ağırlık kaybı yaklaşık 1 litre sıvı sayılır. Formül şöyledir: <strong>ter kaybı (L) = (önceki kilo − sonraki kilo) + içilen sıvı (L) − idrar (L)</strong>. Saatlik oran ise <strong>terleme oranı = ter kaybı ÷ süre (saat)</strong> ile bulunur.',
      'İçilen sıvı toplanır; çünkü içtiğiniz su tartıdaki düşüşü gizler. İdrar çıkarılır; çünkü o kayıp terle değil böbrek yoluyla olmuştur. Vücut ağırlığı değişimi yüzdesi ise yalnızca tartı farkından hesaplanır: <strong>(önceki − sonraki) ÷ önceki × 100</strong>.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Koşuya 70,0 kg ile başlayan biri 60 dakika sonunda 69,2 kg tartılsın ve koşu boyunca 500 ml su içmiş olsun. Tartı farkı 0,8 kg\'dır. Ter kaybı 0,8 + 0,5 − 0 = <strong>1,3 litre</strong>, süre bir saat olduğundan terleme oranı <strong>1,3 L/saat</strong> çıkar. Vücut ağırlığı kaybı 0,8 ÷ 70 × 100 = %1,14\'tür; yani içilen yarım litre, kaybın yaklaşık %38\'ini karşılamıştır.',
      'Bu kişinin ter kaybı 15 dakikada yaklaşık 325 ml\'ye karşılık gelir; hedef bunun tamamını içmek değil, ağırlık kaybını %2\'nin altında tutacak kadarını almaktır. Antrenman sonrasında ise tartıdaki 0,8 kg açığı kapatmak için 1 ila 1,2 litre sıvıyı birkaç saate yayarak alması önerilen aralıktır.',
    ] },
    { h: 'Sonuç nasıl yorumlanır?', p: [
      'Terleme oranı kişiden kişiye ve koşuldan koşula büyük ölçüde değişir. Serin havada hafif tempoda saatte yarım litrenin altında kalabilir; sıcak ve nemli havada yoğun egzersizde saatte 2 litreyi aşabilir. Bu yüzden tek bir ölçüm yerine farklı hava ve tempolarda birkaç ölçüm yapıp kendi aralığınızı çıkarmak daha yararlıdır.',
      'Spor bilimi kaynaklarında sık anılan pratik eşik, egzersiz sırasında vücut ağırlığının yaklaşık <strong>%2\'sinden fazlasını</strong> kaybetmemeye çalışmaktır; bu düzeyin üzerinde dayanıklılık performansının düşebildiği bildirilir. Araçtaki değerlendirme satırı bu çerçeveye göre kaba bir sınıflama yapar; tanı koymaz.',
    ] },
    { h: 'Ölçümü doğru yapmak için ipuçları', ul: [
      'İki tartımı da <strong>aynı tartıda</strong> ve aynı zeminde yapın; halı üzerinde tartılar sapabilir.',
      'Terli giysi ağırlık taşır. Mümkünse çıplak tartılın ya da kuru giysiyle tartılıp sonra yine kuru giysi giyin.',
      'Antrenman sırasında yediğiniz jel, meyve ya da bar varsa ağırlığını içilen sıvıya ekleyin.',
      'Tartınız 100 gram duyarlıysa kısa antrenmanlarda hata payı büyür; en az 45–60 dakikalık seanslarda ölçüm yapın.',
      'Hava sıcaklığını, nemi ve temponuzu not edin; sonuçları karşılaştırırken bu bilgiler gerekir.',
    ] },
    { h: 'Yarış ve uzun antrenman planında kullanım', p: [
      'Saatlik terleme oranınızı bildiğinizde uzun koşu, bisiklet turu ya da maç öncesinde yanınıza ne kadar sıvı almanız gerektiğini tahmin edebilirsiniz. Örneğin oranınız 1,2 L/saat ise ve 2 saatlik bir tur planlıyorsanız toplam kaybınız yaklaşık 2,4 litre olacaktır. Kaybın tamamını karşılamak çoğu zaman gerekmez ve mide açısından zorlayıcı olabilir; amaç ağırlık kaybını makul sınırda tutmaktır.',
      'Terle birlikte sodyum başta olmak üzere mineral de kaybedilir. Bu araç yalnızca sıvı hacmini hesaplar; tuz kaybı kişiye göre çok değiştiği için burada tahmin edilmez.',
    ] },
    { h: 'Dikkat: fazla su içmek de risklidir', p: [
      'Antrenman sonunda tartınız başlangıçtan yüksekse terle kaybettiğinizden fazla sıvı almışsınız demektir. Uzun süreli etkinliklerde ihtiyaçtan çok fazla su içmek kandaki sodyumun seyrelmesine yol açabilir ve bu ciddi bir sağlık sorunudur. Susuzluk hissinizi ve ölçtüğünüz terleme oranını birlikte rehber alın.',
      'Bu sayfadaki sonuçlar bilgilendirme amaçlıdır; tıbbi öneri değildir. Böbrek ya da kalp hastalığı olanlar, sıvı kısıtlaması uygulayanlar ve idrar söktürücü ilaç kullananlar sıvı alımını hekimlerinin önerisine göre düzenlemelidir. Baş dönmesi, kramp, bulantı ya da bilinç bulanıklığı gibi belirtilerde egzersizi bırakıp sağlık yardımı alın.',
    ] },
  ],
  faq: [
    ['Normal terleme oranı kaç litredir?', 'Tek bir normal değer yoktur. Egzersiz yapan yetişkinlerde saatte yaklaşık 0,5 ile 2 litre arası değerler sık görülür; sıcaklık, nem, tempo, vücut büyüklüğü ve sıcağa alışkanlık sonucu belirler. Kendi değerinizi ölçmek en güvenilir yoldur.'],
    ['Antrenmanda içtiğim suyu neden ekliyorum?', 'İçtiğiniz su vücudunuza ağırlık olarak geri döner ve tartıdaki düşüşü küçültür. Gerçek ter kaybını bulmak için tartı farkına içilen miktar eklenir. 0,8 kg kaybedip 500 ml içtiyseniz gerçekte 1,3 litre terlemişsinizdir.'],
    ['Vücut ağırlığının %2\'sini kaybetmek ne demek?', '70 kg bir kişi için 1,4 kg\'lık tartı düşüşü demektir. Bu düzeyin üzerindeki sıvı açığında dayanıklılık performansının etkilenebildiği sık bildirilir. Araç bu yüzdeyi tartı değerlerinizden hesaplar.'],
    ['Antrenmandan sonra ne kadar su içmeliyim?', 'Yaygın pratik öneri, kaybedilen her kilogram için 1,25–1,5 litre sıvıyı birkaç saate yayarak almaktır; fazlalık, antrenman sonrası devam eden idrar kaybını karşılar. Araç bu aralığı tartı farkınıza göre gösterir.'],
    ['İdrar miktarını nasıl tahmin edebilirim?', 'Kesin ölçmek zordur; yetişkinlerde tek seferde tipik olarak 200–400 ml aralığındadır. En pratik çözüm, antrenman öncesi tuvalete gidip antrenman sonrası tartıdan önce gitmemektir; böylece bu alanı 0 bırakabilirsiniz.'],
    ['Kışın da ölçüm yapmalı mıyım?', 'Evet. Soğukta terleme azalır, ama kalın giysiyle yapılan yoğun antrenmanlarda yine de kayda değer kayıp olur. Yaz ve kış değerlerini ayrı ayrı bilmek sıvı planınızı mevsime göre ayarlamanızı sağlar.'],
    ['Sonuç negatif çıkarsa ne anlama gelir?', 'Tartı farkı ve içilen sıvı toplamı sıfır ya da negatifse araç hata verir; bu genellikle tartım hatasına, giysi farkına ya da yanlış girilen bir değere işaret eder. Değerleri kontrol edip yeniden deneyin.'],
    ['Kilo ve sıvı bilgilerim kaydediliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['vucut-su-orani-hesapla', 'kosu-kalori-hesapla', 'kosu-temposu-hesapla', 'met-kalori-hesapla', 'maraton-sure-tahmini'],
};
