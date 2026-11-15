export default {
  slug: 'konu-tekrar-plani',
  title: 'Aralıklı Tekrar Planı Oluşturma',
  h1Tail: 'konu tekrar tarihleri',
  pageTitle: 'Aralıklı Tekrar Planı Oluşturma – Konu Tekrar Tarihleri Hesaplama',
  description: 'Konuyu çalıştığınız tarihi girin; 1, 3, 7, 14 ve 30. gün gibi aralıklarla tekrar tarihlerinizi gün adlarıyla listeleyin, sınav tarihine göre kontrol edin.',
  card: 'Çalıştığınız konunun tekrar tarihlerini 1-3-7-14-30 gün gibi aralıklarla, gün adlarıyla birlikte çıkarın.',
  category: 'egitim',
  keywords: ['aralıklı tekrar planı', 'konu tekrar tarihleri', 'tekrar takvimi oluşturma', 'unutma eğrisi tekrar', '1 3 7 14 30 tekrar', 'ders tekrar programı', 'yks tekrar planı'],
  lead: 'Bir konuyu ilk çalıştığınız tarihi yazın; araç unutmayı geciktirmek için önerilen <strong>aralıklı tekrar</strong> günlerini takvim tarihi ve gün adıyla listelesin. Aralıkları kendiniz belirleyebilir, sınav tarihini girerek kaç tekrarın sınava yetiştiğini görebilirsiniz.',
  button: 'Planı oluştur',
  inputs: [
    { id: 'konu', label: 'Konu adı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Türev' },
    { id: 'ilk', label: 'İlk çalışma tarihi (boş = bugün)', type: 'date' },
    { id: 'araliklar', label: 'Tekrar günleri (ilk çalışmadan kaç gün sonra)', type: 'text', value: '1 3 7 14 30', hint: 'Boşlukla ayırın; en fazla 12 tekrar.' },
    { id: 'sinav', label: 'Sınav tarihi (isteğe bağlı)', type: 'date' },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.ilk, 'İlk çalışma tarihi');
    const ham = h.nums(v.araliklar, 'Tekrar günleri');
    for (const g of ham) {
      if (!Number.isInteger(g) || g < 1) h.err('Tekrar günleri 1 ya da daha büyük tam sayılar olmalı (örn. 1 3 7 14 30).');
      if (g > 3650) h.err('Tekrar günü 3650\'den (yaklaşık 10 yıl) büyük olamaz.');
    }
    const gunler = [...new Set(ham)].sort((a, b) => a - b);
    if (gunler.length > 12) h.err('En fazla 12 tekrar günü yazabilirsiniz.');
    const sinavVar = String(v.sinav ?? '').trim() !== '';
    let sinav = null;
    if (sinavVar) {
      sinav = h.date(v.sinav, 'Sınav tarihi');
      if (h.gunFarki(ilk, sinav) < 1) h.err('Sınav tarihi ilk çalışma tarihinden sonra olmalı.');
    }
    const konu = String(v.konu ?? '').trim();
    const rows = [];
    const satirlar = [`${konu ? konu + ' – ' : ''}İlk çalışma: ${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`];
    let yetisen = 0;
    gunler.forEach((g, i) => {
      const d = h.gunEkle(ilk, g);
      const once = i === 0 ? g : g - gunler[i - 1];
      let deger = `${h.fmtDate(d)} ${h.gunAdi(d)} (${g} gün sonra)`;
      if (sinav) {
        if (h.gunFarki(d, sinav) > 0) yetisen++;
        else deger += ' – sınava yetişmiyor';
      }
      rows.push([`${i + 1}. tekrar`, deger]);
      satirlar.push(`${i + 1}. tekrar: ${h.fmtDate(d)} ${h.gunAdi(d)} (önceki adımdan ${once} gün sonra)`);
    });
    if (sinav) {
      rows.push(['Sınava kadar yapılabilen tekrar', `${yetisen} / ${gunler.length}`]);
      rows.push(['Sınava kalan gün', `${h.gunFarki(ilk, sinav)} gün`]);
      satirlar.push(`Sınav: ${h.fmtDate(sinav)} ${h.gunAdi(sinav)}`);
    }
    return { rows, text: satirlar.join('\n'), note: 'Günler ilk çalışma tarihinden itibaren sayılır. Bir tekrarı kaçırırsanız en kısa sürede yapın ve sonraki tarihleri aynı tutun.' };
  },
  cases: [
    { in: { ilk: '01.03.2026', araliklar: '1 3 7 14 30' }, out: { '1. tekrar': '02.03.2026 Pazartesi (1 gün sonra)', '2. tekrar': '04.03.2026 Çarşamba (3 gün sonra)', '3. tekrar': '08.03.2026 Pazar (7 gün sonra)', '4. tekrar': '15.03.2026 Pazar (14 gün sonra)', '5. tekrar': '31.03.2026 Salı (30 gün sonra)' } },
    { in: { konu: 'Türev', ilk: '2026-01-01', araliklar: '1 7 30' }, out: { '1. tekrar': '02.01.2026 Cuma (1 gün sonra)', '2. tekrar': '08.01.2026 Perşembe (7 gün sonra)', '3. tekrar': '31.01.2026 Cumartesi (30 gün sonra)' }, textMatch: '^Türev – İlk çalışma: 01\\.01\\.2026 Perşembe' },
    { in: { ilk: '01.03.2026', araliklar: '1 3 7 14 30', sinav: '10.03.2026' }, out: { 'Sınava kadar yapılabilen tekrar': '3 / 5', 'Sınava kalan gün': '9 gün', '4. tekrar': '15.03.2026 Pazar (14 gün sonra) – sınava yetişmiyor' } },
    { in: { ilk: '28.02.2024', araliklar: '1 2' }, out: { '1. tekrar': '29.02.2024 Perşembe (1 gün sonra)', '2. tekrar': '01.03.2024 Cuma (2 gün sonra)' } },
    { in: { ilk: '25.12.2026', araliklar: '7' }, out: { '1. tekrar': '01.01.2027 Cuma (7 gün sonra)' } },
    { in: { ilk: '01.03.2026', araliklar: '7 1 7' }, out: { '1. tekrar': '02.03.2026 Pazartesi (1 gün sonra)', '2. tekrar': '08.03.2026 Pazar (7 gün sonra)' } },
    { in: { ilk: '01.03.2026', araliklar: '0 3 7' }, error: true },
    { in: { ilk: '01.03.2026', araliklar: '1 3 7', sinav: '01.02.2026' }, error: true },
    { in: { ilk: '31.02.2026', araliklar: '1 3' }, error: true },
  ],
  howto: [
    'İsterseniz konu adını yazın; planın başına eklenir ve kopyaladığınızda hangi konuya ait olduğu belli olur.',
    'Konuyu ilk kez çalıştığınız tarihi seçin. Boş bırakırsanız bugünün tarihi kullanılır.',
    'Tekrar günlerini ilk çalışmadan kaç gün sonra olacaklarına göre boşlukla ayırarak yazın. Varsayılan 1, 3, 7, 14 ve 30. günlerdir.',
    'Sınav tarihiniz belliyse girin; sınava yetişmeyen tekrarlar işaretlenir.',
    '"Planı oluştur" düğmesine basın ve çıkan listeyi kopyalayıp ajandanıza, takviminize ya da çalışma tablonuza aktarın.',
  ],
  sections: [
    { h: 'Aralıklı tekrar nedir?', p: [
      'Aralıklı tekrar, öğrenilen bilgiyi tek seferde uzun uzun çalışmak yerine giderek açılan aralıklarla yeniden gözden geçirme yöntemidir. Dayandığı gözlem, on dokuzuncu yüzyılın sonunda Hermann Ebbinghaus\'un bellek deneyleriyle ortaya koyduğu <strong>unutma eğrisidir</strong>: yeni öğrenilen bilgi tekrar edilmezse ilk saatler ve günler içinde hızla silikleşir, sonra unutma hızı yavaşlar.',
      'Her tekrar, bilginin akılda kalma süresini uzatır. Bu yüzden ilk tekrarın erken, sonrakilerin ise giderek daha seyrek yapılması verimlidir. Aynı konuyu bir gecede beş kez okumak yerine bir ay içine yayılmış beş kısa tekrar, toplamda daha az zaman alır ve kalıcılığı belirgin biçimde artırır.',
    ] },
    { h: 'Varsayılan 1-3-7-14-30 düzeni', p: [
      'Araçtaki varsayılan aralıklar öğrenciler arasında en yaygın kullanılan düzendir: konuyu çalıştıktan 1 gün, 3 gün, 7 gün, 14 gün ve 30 gün sonra tekrar. Bu sayılar bir yasa değildir; önemli olan aralıkların giderek açılmasıdır. Zor bulduğunuz konularda aralıkları sıklaştırabilir (ör. 1 2 4 7 14 21), iyi bildiğiniz konularda seyreltebilirsiniz (ör. 2 7 21 60).',
      'Günler ilk çalışma tarihinden itibaren sayılır, bir önceki tekrardan itibaren değil. Yani "7" yazdığınızda tekrar, ilk çalışmadan tam bir hafta sonraya, aynı hafta gününe denk gelir. Ardışık iki tekrar arasındaki boşluk ise metin çıktısında ayrıca gösterilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Türev konusunu 1 Mart 2026 Pazar günü çalıştığınızı düşünelim. Varsayılan düzenle plan şöyle çıkar: ilk tekrar 2 Mart Pazartesi, ikinci tekrar 4 Mart Çarşamba, üçüncü tekrar 8 Mart Pazar, dördüncü tekrar 15 Mart Pazar ve beşinci tekrar 31 Mart Salı. Mart ayı 31 gün çektiği için 30 gün sonrası ayın son gününe düşer.',
      'Aynı konu için sınav 10 Mart\'taysa ilk üç tekrar sınavdan önce tamamlanır, 15 ve 31 Mart tekrarları sınava yetişmez. Araç bu durumu "3 / 5" olarak özetler. Böyle bir sıkışıklıkta aralıkları 1 2 4 6 8 gibi daraltıp planı yeniden oluşturmak daha mantıklıdır.',
    ] },
    { h: 'Tekrarı nasıl yapmalı?', ul: [
      'Tekrar, konuyu baştan okumak değildir. Kitabı kapatıp konuyu kendi cümlelerinizle anlatmayı ya da boş kâğıda ana başlıkları yazmayı deneyin; hatırlayamadığınız yerlere sonra bakın.',
      'İlk tekrarlar 10–15 dakika, sonrakiler birkaç dakika sürebilir. Süre kısaldıkça yöntem doğru işliyor demektir.',
      'Sayısal derslerde tekrar, formül ezberi yerine birkaç tipik sorunun çözülmesiyle yapılmalıdır.',
      'Tekrarda zorlandığınız konuyu yeni çalışılmış sayın ve o günü ilk çalışma tarihi yaparak planı yeniden çıkarın.',
      'Aynı güne çok sayıda konunun tekrarı düşüyorsa yeni konu çalışmayı o gün azaltın; plan ancak uygulanabilirse işe yarar.',
    ] },
    { h: 'Sınav hazırlığında kullanım', p: [
      'LGS, YKS, KPSS, ALES ya da üniversite finalleri gibi geniş kapsamlı sınavlarda en sık yapılan hata, konuları sırayla bitirip başa hiç dönmemektir. Aylar önce çalışılan konu sınav günü çoktan silinmiş olur. Her konu için tekrar tarihlerini çıkarıp haftalık programa işlemek, konu bitirme ile tekrarı aynı takvimde dengelemeyi sağlar.',
      'Uygulamada her konuyu ayrı ayrı takip etmek yorucu olabilir. Pratik bir çözüm, bir haftada çalışılan konuları tek bir paket sayıp haftanın son gününü ilk çalışma tarihi olarak girmektir. Böylece her hafta için tek bir tekrar planınız olur.',
    ] },
    { h: 'Sınırlar', p: [
      'Bu araç bir takvim hesaplayıcısıdır; hangi aralığın sizin için en uygun olduğunu ölçmez. Unutma hızı kişiye, konunun zorluğuna, uykuya ve ilk öğrenmenin kalitesine göre değişir. Araç ayrıca resmî tatilleri, sınav haftalarını ve kişisel programınızı bilmez; denk gelen tekrarları bir gün öne ya da arkaya kaydırmak planı bozmaz. Soru-cevap kartlarıyla çalışıyor ve her tekrardaki başarınıza göre aralığın uzamasını istiyorsanız ezber kartı zamanlama aracı daha uygundur.',
    ] },
  ],
  faq: [
    ['Konu tekrarı kaç gün arayla yapılmalı?', 'Yaygın düzen, konuyu çalıştıktan 1, 3, 7, 14 ve 30 gün sonra tekrar etmektir. Kesin bir kural yoktur; temel ilke aralıkların giderek açılmasıdır. Zor konularda aralıkları sıklaştırabilirsiniz.'],
    ['Günler neye göre sayılıyor?', 'Yazdığınız her sayı, ilk çalışma tarihinden kaç gün sonra tekrar yapılacağını gösterir. Örneğin 1 Mart\'ta çalışılan konu için "7" değeri 8 Mart\'a karşılık gelir.'],
    ['Bir tekrarı kaçırırsam ne yapmalıyım?', 'İlk fırsatta yapın ve kalan tarihleri değiştirmeyin. Gecikme birkaç günü aştıysa ve konuyu hatırlamakta zorlandıysanız, tekrar yaptığınız günü yeni başlangıç kabul edip planı yeniden oluşturun.'],
    ['Aynı sayıyı iki kez yazarsam ne olur?', 'Yinelenen günler tek sayılır ve günler küçükten büyüğe sıralanır. "7 1 7" yazarsanız plan 1. gün ve 7. gün olmak üzere iki tekrardan oluşur.'],
    ['Sınava az kaldıysa hangi aralıkları kullanmalıyım?', 'Sınava kalan gün sayısını aşmayan, sıkılaştırılmış bir düzen seçin. Örneğin 10 gün kaldıysa 1 2 4 6 9 yazabilirsiniz. Sınav tarihini girerseniz yetişmeyen tekrarlar listede işaretlenir.'],
    ['Planı takvimime nasıl aktarırım?', 'Sonucu kopyalayıp not uygulamanıza ya da tablo programına yapıştırabilirsiniz. Her satırda tarih ve gün adı bulunduğu için takvime elle girmek de kolaydır.'],
    ['En fazla kaç tekrar planlayabilirim?', 'Tek seferde en fazla 12 tekrar günü yazabilirsiniz ve her gün ilk çalışmadan en çok 3650 gün sonrası olabilir. Sınav hazırlığı için beş altı tekrar genellikle yeterlidir.'],
    ['Yazdığım konu adı ve tarihler saklanıyor mu?', 'Hayır. Plan tarayıcınızda oluşturulur; konu adı, tarihler ve aralıklar sunucuya gönderilmez. Sayfayı kapattığınızda bilgiler silinir, bu yüzden planı kopyalamayı unutmayın.'],
  ],
  related: ['ezber-karti-zamanlama', 'ders-calisma-plani-hesapla', 'pomodoro-plani-hesapla', 'soru-dagilimi-hesapla', 'kitap-okuma-suresi-hesapla'],
};
