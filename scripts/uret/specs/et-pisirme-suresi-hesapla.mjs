export default {
  slug: 'et-pisirme-suresi-hesapla',
  title: 'Et Pişirme Süresi Hesaplama',
  h1Tail: 'fırında rosto, but, tavuk, hindi',
  pageTitle: 'Et Pişirme Süresi Hesaplama – Fırında Kiloya Göre Kaç Dakika?',
  description: 'Fırında dana rosto, kuzu but, bütün tavuk ve hindi için ağırlığa göre pişirme süresini, dinlendirme payını, hedef iç sıcaklığı ve fırına verme saatini hesaplayın.',
  card: 'Rosto, kuzu but, bütün tavuk ya da hindinin fırında kaç dakika pişeceğini ve fırına kaçta girmesi gerektiğini bulun.',
  category: 'gunluk',
  keywords: ['et pişirme süresi', 'fırında et kaç dakikada pişer', 'kuzu but pişirme süresi', 'bütün tavuk fırında kaç dakika', 'hindi pişirme süresi', 'rosto pişirme süresi', 'kiloya göre pişirme süresi'],
  lead: 'Fırına bütün parça halinde girecek etin ağırlığını yazın, türünü seçin; araç <strong>dakika/kilogram + sabit ek süre</strong> kuralıyla pişirme süresini, dinlendirme payını ve kontrol etmeniz gereken iç sıcaklığı verir. Servis saatini de yazarsanız etin fırına kaçta girmesi gerektiğini gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Et türü ve pişme derecesi', type: 'select', options: [
      ['danaOrta', 'Dana rosto – orta pişmiş'],
      ['danaAz', 'Dana rosto – az pişmiş'],
      ['danaIyi', 'Dana rosto – iyi pişmiş'],
      ['kuzuOrta', 'Kuzu but / kol – orta pişmiş'],
      ['kuzuIyi', 'Kuzu but / kol – iyi pişmiş'],
      ['tavuk', 'Bütün tavuk'],
      ['hindi', 'Bütün hindi'],
    ] },
    { id: 'agirlik', label: 'Etin ağırlığı (kg)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'servis', label: 'Servis saati (isteğe bağlı)', type: 'text', placeholder: 'Örn. 19:00', hint: 'Yazarsanız fırına verme saati hesaplanır.' },
  ],
  compute(v, h) {
    const T = {
      danaAz: { ad: 'Dana rosto (az pişmiş)', dk: 45, ek: 20, din: 15, ic: '52–55 °C (az pişmiş)' },
      danaOrta: { ad: 'Dana rosto (orta pişmiş)', dk: 55, ek: 25, din: 15, ic: '60–63 °C (orta)' },
      danaIyi: { ad: 'Dana rosto (iyi pişmiş)', dk: 65, ek: 30, din: 15, ic: '71 °C ve üzeri (iyi pişmiş)' },
      kuzuOrta: { ad: 'Kuzu but / kol (orta pişmiş)', dk: 55, ek: 25, din: 15, ic: '60–63 °C (orta)' },
      kuzuIyi: { ad: 'Kuzu but / kol (iyi pişmiş)', dk: 65, ek: 30, din: 15, ic: '71 °C ve üzeri (iyi pişmiş)' },
      tavuk: { ad: 'Bütün tavuk', dk: 45, ek: 20, din: 15, ic: 'en az 74 °C (but kalın yeri)' },
      hindi: { ad: 'Bütün hindi', dk: 40, ek: 20, din: 30, ic: 'en az 74 °C (but kalın yeri)' },
    };
    const t = T[v.tur] || T.danaOrta;
    const kg = h.pos(v.agirlik, 'Etin ağırlığı');
    if (kg > 15) h.err('Ağırlık 15 kg\'dan büyük olamaz; değeri kilogram olarak yazdığınızdan emin olun (500 g için 0,5).');
    const sure = Math.round(t.dk * kg + t.ek + 1e-9);
    const sa = (m) => {
      const s = Math.floor(m / 60), d = m % 60;
      return s === 0 ? `${d} dk` : d === 0 ? `${s} sa` : `${s} sa ${d} dk`;
    };
    const rows = [
      ['Fırında pişirme süresi', sa(sure)],
      ['Dakika olarak', h.fmt(sure, 0) + ' dk'],
      ['Dinlendirme süresi', t.din + ' dk'],
      ['Toplam (pişirme + dinlendirme)', sa(sure + t.din)],
      ['Hedef iç sıcaklık', t.ic],
      ['Kullanılan kural', `${t.dk} dk/kg + ${t.ek} dk`],
    ];
    const s = String(v.servis ?? '').trim();
    if (s !== '') {
      const m = /^(\d{1,2})[:.](\d{2})$/.exec(s);
      if (!m || +m[1] > 23 || +m[2] > 59) h.err('Servis saatini SS:DD biçiminde yazın (örn. 19:00) ya da alanı boş bırakın.');
      const hedef = +m[1] * 60 + +m[2];
      const bas = (((hedef - sure - t.din) % 1440) + 1440) % 1440;
      const cik = (((hedef - t.din) % 1440) + 1440) % 1440;
      const yaz = (x) => String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0');
      rows.push(['Fırına verme saati', yaz(bas)]);
      rows.push(['Fırından çıkarma saati', yaz(cik)]);
    }
    return {
      rows,
      note: `${t.ad} için önceden ısıtılmış 180 °C (fanlı fırında 160 °C) varsayılmıştır. Süre tahmindir; pişmeyi et termometresiyle iç sıcaklıktan doğrulayın.${v.tur === 'danaAz' ? ' Az pişmiş hedef sıcaklığı (52–55 °C), bütün parça et için yaygın gıda güvenliği önerisi olan 63 °C ve birkaç dakika dinlendirmenin altındadır; çocuklar, hamileler, yaşlılar ve bağışıklığı zayıf kişiler için önerilmez.' : ''}`,
    };
  },
  cases: [
    { in: { tur: 'danaOrta', agirlik: '2' }, out: { 'Fırında pişirme süresi': '2 sa 15 dk', 'Dakika olarak': '135 dk', 'Toplam (pişirme + dinlendirme)': '2 sa 30 dk' } },
    { in: { tur: 'tavuk', agirlik: '1,6', servis: '19:00' }, out: { 'Fırında pişirme süresi': '1 sa 32 dk', 'Fırına verme saati': '17:13', 'Fırından çıkarma saati': '18:45' } },
    { in: { tur: 'hindi', agirlik: '5' }, out: { 'Fırında pişirme süresi': '3 sa 40 dk', 'Dinlendirme süresi': '30 dk', 'Kullanılan kural': '40 dk/kg + 20 dk' } },
    { in: { tur: 'kuzuIyi', agirlik: '2,5' }, out: { 'Dakika olarak': '193 dk', 'Fırında pişirme süresi': '3 sa 13 dk' } },
    { in: { tur: 'danaAz', agirlik: '1' }, out: { 'Fırında pişirme süresi': '1 sa 5 dk', 'Hedef iç sıcaklık': '52–55 °C (az pişmiş)' } },
    { in: { tur: 'danaOrta', agirlik: '2', servis: '01:00' }, out: { 'Fırına verme saati': '22:30' } },
    { in: { tur: 'tavuk', agirlik: '0' }, error: true },
    { in: { tur: 'tavuk', agirlik: '1,5', servis: '25:00' }, error: true },
    { in: { tur: 'hindi', agirlik: '1500' }, error: true },
  ],
  howto: [
    'Listeden etin türünü ve kırmızı ette istediğiniz pişme derecesini seçin.',
    'Etin çiğ ağırlığını kilogram olarak yazın; 1 kilo 600 gram için 1,6 girin. Kemikli parçada kemik dahil tartıyı kullanın.',
    'Sofraya kaçta oturacağınızı biliyorsanız "Servis saati" alanına 19:00 gibi yazın; boş bırakırsanız yalnızca süre hesaplanır.',
    '"Hesapla" düğmesine basın. Pişirme süresi, dinlendirme payı, hedef iç sıcaklık ve varsa fırına verme ile çıkarma saatleri listelenir.',
    'Süre dolmadan 15–20 dakika önce etin en kalın yerinden iç sıcaklığı ölçmeye başlayın; karar ölçüme göre verilir.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılıyor?', p: [
      'Bütün parça etlerde ev mutfağının en eski ve en pratik kuralı, ağırlıkla orantılı bir süreye sabit bir ek süre eklemektir: <strong>süre = kilogram × (dakika/kg) + ek dakika</strong>. Orantılı kısım ısının etin merkezine ilerlemesi için gereken zamanı, sabit kısım ise yüzeyin ısınması ve fırın kapağı açılırken kaybedilen ısıyı karşılar. Araç, önceden ısıtılmış 180 °C fırın (fanlı fırında 160 °C) için şu katsayıları kullanır:',
    ], ul: [
      '<strong>Dana rosto:</strong> az pişmiş 45 dk/kg + 20 dk, orta 55 dk/kg + 25 dk, iyi pişmiş 65 dk/kg + 30 dk',
      '<strong>Kuzu but ya da kol:</strong> orta 55 dk/kg + 25 dk, iyi pişmiş 65 dk/kg + 30 dk',
      '<strong>Bütün tavuk:</strong> 45 dk/kg + 20 dk',
      '<strong>Bütün hindi:</strong> 40 dk/kg + 20 dk',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 2 kg dana rosto, orta pişmiş:</strong> 2 × 55 = 110 dakika, üzerine 25 dakika eklenir ve 135 dakika, yani 2 saat 15 dakika bulunur. 15 dakikalık dinlendirmeyle birlikte toplam 2 saat 30 dakika ayırmanız gerekir.',
      '<strong>Örnek 2 – 1,6 kg bütün tavuk, servis 19:00:</strong> 1,6 × 45 = 72 dakika, 20 dakika ekle, 92 dakika (1 saat 32 dakika). Tavuk 15 dakika dinleneceği için fırından 18:45\'te çıkmalı, fırına ise 17:13\'te girmelidir. Fırının ısınması için bu saatten 10–15 dakika önce düğmeyi çevirmeyi unutmayın.',
      '<strong>Örnek 3 – 5 kg hindi:</strong> 5 × 40 + 20 = 220 dakika, yani 3 saat 40 dakika. Büyük gövdeli hindi yarım saat dinlendirilir; yılbaşı sofrası için toplam 4 saat 10 dakikalık bir pencere gerekir.',
    ] },
    { h: 'Süre değil, iç sıcaklık belirler', p: [
      'Dakika hesabı mutfakta plan yapmanızı sağlar ama etin piştiğini kanıtlamaz. Aynı ağırlıktaki iki parçadan ince uzun olanı, top biçimli olandan belirgin biçimde daha erken pişer. Kemik, dolgu, etin buzdolabından yeni çıkmış olması, fırın termostatının sapması ve tepsinin fırındaki konumu da süreyi oynatır. Bu nedenle güvenilir ölçüt, etin en kalın yerine kemiğe değdirmeden batırılan bir termometrenin gösterdiği iç sıcaklıktır.',
      'Yaygın gıda güvenliği önerilerine göre tavuk ve hindi gibi kanatlılarda en kalın noktada en az <strong>74 °C</strong> görülmelidir. Bütün parça dana ve kuzu etinde en az <strong>63 °C</strong> ve ardından birkaç dakika dinlendirme güvenli kabul edilir; az pişmiş tercihler (52–55 °C) bir damak zevki seçimidir ve bu eşiğin altında kalır. Kıyma, sarma rosto ya da iğneyle yumuşatılmış ette yüzeydeki mikroplar içe taşındığı için en az 71 °C beklenir. Hamileler, küçük çocuklar, yaşlılar ve bağışıklığı zayıf kişiler için az pişmiş et önerilmez.',
    ] },
    { h: 'Dinlendirme neden hesaba katılıyor?', p: [
      'Fırından çıkan etin dış katmanları merkezden daha sıcaktır; bu ısı içeri doğru ilerlemeye devam eder ve iç sıcaklık birkaç derece daha yükselir. Aynı sırada sıkışmış lifler gevşer, et suyu parçanın içine yeniden dağılır. Dinlendirilmeden kesilen rostonun suyu tahtaya akar, dilimler kuru kalır. Araç tavuk, dana ve kuzu için 15, hindi için 30 dakika dinlendirme öngörür ve servis saatinden geriye doğru sayarken bu payı da düşer. Eti dinlenirken üzerine gevşekçe alüminyum folyo örtmek yeterlidir; sıkıca sarmak kabuğu yumuşatır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Fırını önceden ısıtmamak: soğuk fırına giren ette süre 10–15 dakika uzar ve dış yüzey güzel renk almaz.',
      'Eti buzdolabından çıkar çıkmaz fırına vermek: merkez çok soğuk olduğundan dışı kururken içi çiğ kalabilir. Büyük parçaları pişirmeden önce yarım saat kadar tezgâhta bekletmek yaygın bir uygulamadır.',
      'Tam çözülmemiş et pişirmek: içinde buz kalan tavuk ya da hindide süre hesabı tümüyle geçersizleşir.',
      'Fırın kapağını sık açmak: her açışta sıcaklık belirgin biçimde düşer.',
      'Fırın poşeti, döküm tencere ya da folyo kapalı pişirmede aynı katsayıları beklemek: kapalı ortamda buhar pişmeyi hızlandırır, kabuk oluşumunu ise geciktirir.',
      'İçi doldurulmuş tavuk ya da hindide dolguyu hesaba katmamak: tartıya dolgu dahil ağırlığı yazın ve dolgunun ortasının da 74 °C olduğunu ölçün.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca fırında, bütün parça halinde ve orta sıcaklıkta yapılan kuru pişirme içindir. Düşük ısıda uzun pişirme (ör. 120 °C\'de saatlerce pişen kuzu tandır), haşlama, düdüklü tencere, ızgara, biftek ve pirzola gibi ince dilimler için kiloya dayalı kural çalışmaz; orada kalınlık ve yöntem belirleyicidir. Hesaplanan değerler bilgilendirme amaçlı bir planlama tahminidir; gıda güvenliği açısından son kararı iç sıcaklık ölçümüne göre verin.',
    ] },
  ],
  faq: [
    ['1 kilo et fırında kaç dakikada pişer?', 'Bütün parça dana rosto 180 °C\'de orta pişmiş için yaklaşık 55 + 25 = 80 dakikada, az pişmiş için 65 dakikada hazır olur. 1 kiloluk küçük bir tavuk 45 + 20 = 65 dakika ister. Kuşbaşı ya da dilimlenmiş ette bu kural geçerli değildir.'],
    ['Bütün tavuk fırında kaç derecede, kaç dakika pişer?', 'Önceden ısıtılmış 180 °C fırında kilogram başına 45 dakika ve üzerine 20 dakika hesaplanır. 1,6 kg tavuk yaklaşık 1 saat 32 dakikada pişer. But ile gövde arasındaki en kalın yerde 74 °C ölçülmeli, batırıldığında çıkan su pembe değil berrak olmalıdır.'],
    ['Fanlı fırında süre değişir mi?', 'Fanlı (turbo) programda sıcak hava dolaştığı için aynı sonucu yaklaşık 20 °C daha düşük ayarla alırsınız. Araçtaki süreler fansız 180 °C ya da fanlı 160 °C içindir. Fanlıda 180 °C kullanırsanız et daha erken pişer ve dışı daha çabuk kızarır; iç sıcaklığı erken kontrol edin.'],
    ['Kemikli et daha mı geç pişer?', 'Kemikli parçalarda tartının bir kısmı kemik olduğu için kilo başına hesap çoğu zaman yeterli sonuç verir; ancak kemiğe yakın bölge en son pişen yerdir. Termometreyi kemiğe değdirmeden, kemiğin hemen yanındaki kalın ete batırarak ölçün.'],
    ['Et termometrem yoksa pişip pişmediğini nasıl anlarım?', 'Kanatlıda but ile gövdenin birleştiği yere şiş batırın; akan su berraksa ve but kolayca oynuyorsa pişmiştir. Kırmızı ette şiş batırıldığında çıkan suyun rengi pişme derecesi hakkında fikir verir. Bu yöntemler kabadır; düzenli rosto yapıyorsanız basit bir saplamalı termometre en güvenilir çözümdür.'],
    ['Eti folyoyla kapatmalı mıyım?', 'Üstü hızlı kızaran büyük parçalarda, özellikle hindi göğsünde, pişmenin ortasında üzerini folyoyla gevşekçe örtmek kurumayı azaltır. Son 20–30 dakikada folyo açılırsa kabuk renk alır. Baştan sona sıkı kapalı pişirmede buhar oluşur ve süre kısalabilir.'],
    ['Servis saatini neden yazıyorum?', 'Araç, yazdığınız saatten önce dinlendirme süresini, ardından pişirme süresini geriye doğru sayarak etin fırına girmesi ve fırından çıkması gereken saatleri verir. Gece yarısını aşan hesaplarda saat bir önceki güne sarkar; örneğin 01:00 servis için 2 kg orta rosto 22:30\'da fırına girer.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; ağırlık ve saat bilgisi hiçbir sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['et-cozdurme-suresi-hesapla', 'firin-derece-cevir', 'pirinc-su-orani-hesapla', 'makarna-porsiyon-hesapla', 'salamura-tuz-orani-hesapla'],
};
