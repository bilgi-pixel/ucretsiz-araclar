export default {
  slug: 'soru-dagilimi-hesapla',
  title: 'Günlük Soru Hedefi Hesaplama',
  h1Tail: 'günde kaç soru çözmeliyim?',
  pageTitle: 'Günlük Soru Hedefi Hesaplama – Günde Kaç Soru Çözmeliyim?',
  description: 'Toplam soru hedefinizi, kalan gün sayısını ve haftada kaç gün çalıştığınızı girin; günlük ve haftalık soru hedefinizi ve gereken süreyi öğrenin.',
  card: 'Toplam soru hedefinizi kalan günlere bölün: günlük ve haftalık soru sayısını, gereken çalışma süresiyle birlikte görün.',
  category: 'egitim',
  keywords: ['günlük soru hedefi hesaplama', 'günde kaç soru çözmeliyim', 'soru çözme planı', 'haftalık soru hedefi', 'yks günlük soru sayısı', 'lgs soru hedefi', 'soru bankası bitirme planı'],
  lead: 'Sınava kadar çözmek istediğiniz toplam soru sayısını ve kalan günü yazın; araç, dinlenme günlerinizi de hesaba katarak <strong>günde kaç soru</strong> çözmeniz gerektiğini, haftalık hedefi ve günlük süreyi hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'toplam', label: 'Toplam soru hedefi', type: 'number', placeholder: 'Örn. 3000' },
    { id: 'cozulen', label: 'Şimdiye kadar çözülen', type: 'number', value: '0' },
    { id: 'gun', label: 'Kalan gün sayısı', type: 'number', placeholder: 'Örn. 60', hint: 'Bugünden sınava ya da hedef tarihe kadar takvim günü.' },
    { id: 'haftaGun', label: 'Haftada çalışılan gün', type: 'select', options: [['7', 'Her gün (7 gün)'], ['6', '6 gün'], ['5', '5 gün'], ['4', '4 gün'], ['3', '3 gün'], ['2', '2 gün'], ['1', '1 gün']] },
    { id: 'dk', label: 'Soru başına süre (dakika, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1,5' },
  ],
  compute(v, h) {
    const toplam = h.posint(v.toplam, 'Toplam soru hedefi');
    const cozulen = h.int(String(h.opt(v.cozulen, 0, 'Şimdiye kadar çözülen')), 'Şimdiye kadar çözülen');
    if (cozulen < 0) h.err('"Şimdiye kadar çözülen" negatif olamaz.');
    if (cozulen >= toplam) h.err('Çözülen soru sayısı hedefe ulaşmış ya da hedefi aşmış; daha büyük bir hedef yazın.');
    const gun = h.posint(v.gun, 'Kalan gün sayısı');
    if (gun > 3650) h.err('Kalan gün sayısı 3650\'den büyük olamaz.');
    const hg = Number(v.haftaGun) || 7;
    if (!(hg >= 1 && hg <= 7)) h.err('Haftada çalışılan gün 1 ile 7 arasında olmalı.');
    const kalan = toplam - cozulen;
    const hafta = Math.floor(gun / 7);
    const artik = gun % 7;
    const cg = hafta * hg + Math.min(artik, hg);
    const gunluk = Math.ceil(kalan / cg - 1e-9);
    const sure = (dkT) => {
      const t = Math.round(dkT);
      const s = Math.floor(t / 60), d = t % 60;
      return s > 0 ? `${s} sa ${d} dk` : `${d} dk`;
    };
    const rows = [
      ['Günlük soru hedefi', h.fmt(gunluk, 0) + ' soru'],
      ['Haftalık soru hedefi', h.fmt(gunluk * hg, 0) + ' soru'],
      ['Kalan soru', h.fmt(kalan, 0) + ' soru'],
      ['Çalışma günü sayısı', h.fmt(cg, 0) + ' gün'],
      ['Kesirli günlük ortalama', h.fmt(kalan / cg, 2) + ' soru'],
      ['Plan sonunda hedef fazlası', h.fmt(gunluk * cg - kalan, 0) + ' soru'],
    ];
    if (String(v.dk ?? '').trim() !== '') {
      const dk = h.pos(v.dk, 'Soru başına süre');
      rows.push(['Günlük soru çözme süresi', sure(gunluk * dk)]);
      rows.push(['Toplam süre', sure(kalan * dk)]);
    }
    return { rows, note: 'Günlük hedef yukarı yuvarlanır; bu yüzden plana uyarsanız hedefi birkaç soru fazlasıyla tamamlarsınız. Kontrol ve yanlış analizi süresi hesaba dahil değildir.' };
  },
  cases: [
    { in: { toplam: '3000', cozulen: '0', gun: '60', haftaGun: '6', dk: '1,5' }, out: { 'Günlük soru hedefi': '58 soru', 'Haftalık soru hedefi': '348 soru', 'Çalışma günü sayısı': '52 gün', 'Günlük soru çözme süresi': '1 sa 27 dk', 'Toplam süre': '75 sa 0 dk' } },
    { in: { toplam: '1000', cozulen: '0', gun: '30', haftaGun: '7', dk: '2' }, out: { 'Günlük soru hedefi': '34 soru', 'Haftalık soru hedefi': '238 soru', 'Günlük soru çözme süresi': '1 sa 8 dk', 'Plan sonunda hedef fazlası': '20 soru' } },
    { in: { toplam: '500', cozulen: '0', gun: '10', haftaGun: '5', dk: '1' }, out: { 'Günlük soru hedefi': '63 soru', 'Çalışma günü sayısı': '8 gün', 'Kesirli günlük ortalama': '62,5 soru' } },
    { in: { toplam: '120', cozulen: '0', gun: '7', haftaGun: '3' }, out: { 'Günlük soru hedefi': '40 soru', 'Haftalık soru hedefi': '120 soru', 'Plan sonunda hedef fazlası': '0 soru' } },
    { in: { toplam: '2000', cozulen: '500', gun: '30', haftaGun: '6', dk: '1' }, out: { 'Günlük soru hedefi': '58 soru', 'Kalan soru': '1.500 soru', 'Çalışma günü sayısı': '26 gün', 'Günlük soru çözme süresi': '58 dk' } },
    { in: { toplam: '100', cozulen: '0', gun: '100', haftaGun: '7' }, out: { 'Günlük soru hedefi': '1 soru' } },
    { in: { toplam: '500', cozulen: '500', gun: '10', haftaGun: '7' }, error: true },
    { in: { toplam: '500', cozulen: '0', gun: '0', haftaGun: '7' }, error: true },
    { in: { toplam: '12,5', cozulen: '0', gun: '10', haftaGun: '7' }, error: true },
  ],
  howto: [
    'Sınava ya da belirlediğiniz tarihe kadar çözmek istediğiniz toplam soru sayısını yazın. Bir soru bankasını bitirmek istiyorsanız kitaptaki soru sayısını girin.',
    'Daha önce çözdüğünüz soru varsa "Şimdiye kadar çözülen" alanına yazın; hedeften düşülür.',
    'Kalan takvim günü sayısını ve haftada kaç gün soru çözdüğünüzü belirtin. Dinlenme gününüz varsa 6 gün seçin.',
    'İsterseniz soru başına harcadığınız ortalama süreyi dakika olarak ekleyin; günlük ve toplam çalışma süresi de hesaplanır.',
    '"Hesapla" düğmesine basın ve günlük hedefi programınıza yazın.',
  ],
  sections: [
    { h: 'Günlük soru hedefi neden sayıyla belirlenmeli?', p: [
      '"Bugün biraz soru çözeyim" diye başlanan çalışma çoğu zaman ya çok az ya da sürdürülemeyecek kadar çok soruyla biter. Sınava kadar çözülmesi gereken toplam soru sayısı belli olduğunda bunu kalan günlere bölmek, her gün neyin yeterli olduğunu netleştirir. Hedef küçük parçalara ayrıldığında hem erteleme azalır hem de geride kalındığı erken fark edilir.',
      'Bu araç bölmeyi düz yapmaz; haftada kaç gün çalıştığınızı da hesaba katar. Haftada bir gün dinleniyorsanız 60 günlük bir sürede aslında 60 değil 52 çalışma gününüz vardır ve günlük hedef buna göre yükselir. Aradaki fark küçük görünür ama iki ayda yüzlerce soruya karşılık gelir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Önce kalan soru bulunur: <strong>kalan soru = toplam hedef − çözülen</strong>. Ardından çalışma günü sayısı hesaplanır: kalan gün tam haftalara bölünür, her tam hafta için seçtiğiniz çalışma günü sayılır; artan günlerden en fazla haftalık çalışma günü kadarı eklenir. Son olarak <strong>günlük hedef = kalan soru ÷ çalışma günü</strong> işlemi yapılır ve sonuç yukarı yuvarlanır.',
      'Yukarı yuvarlamanın nedeni basittir: 57,69 soru çözülemez, 57 soru çözerseniz de hedefin gerisinde kalırsınız. 58 soru çözdüğünüzde planın sonunda hedefi birkaç soru fazlasıyla tamamlarsınız; bu fazlalık "Plan sonunda hedef fazlası" satırında gösterilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Sınava 60 gün kalmış, 3000 soru çözmeyi hedefleyen ve haftada 6 gün çalışan bir öğrenciyi ele alalım. 60 gün, 8 tam hafta ve 4 gün eder. Sekiz haftada 8 × 6 = 48 çalışma günü, artan 4 günün tamamı da çalışma günü sayılarak toplam <strong>52 gün</strong> bulunur. 3000 ÷ 52 = 57,69 olduğundan günlük hedef <strong>58 soru</strong>, haftalık hedef 58 × 6 = <strong>348 soru</strong> olur.',
      'Soru başına ortalama 1,5 dakika harcanıyorsa günlük soru çözme süresi 58 × 1,5 = 87 dakika, yani 1 saat 27 dakikadır. 3000 sorunun tamamı ise 4500 dakika, yani 75 saat tutar. Bu süre yalnızca soru çözmeyi kapsar; yanlışların incelenmesi için ayrıca zaman ayırmak gerekir.',
    ] },
    { h: 'Gerçekçi hedef koymak için ipuçları', ul: [
      'Toplam hedefi derslere bölün. Tek bir sayı yerine matematik, Türkçe, fen gibi her ders için ayrı hesap yaparsanız zayıf olduğunuz derse daha fazla pay ayırabilirsiniz.',
      'Soru başına süreyi tahmin etmeyin, ölçün. Bir test çözerken geçen süreyi soru sayısına bölmek yeterlidir; paragraf sorularıyla işlem soruları arasında büyük fark olabilir.',
      'Yanlış ve boş bıraktığınız soruların çözümünü incelemek için soru çözme süresinin en az üçte biri kadar ek zaman planlayın.',
      'Deneme sınavı çözdüğünüz günlerde günlük hedefi denemedeki soru sayısı kadar azaltabilirsiniz; denemeler de hedefe sayılır.',
      'Hedefi birkaç gün üst üste tutturamadıysanız aracı güncel sayılarla yeniden çalıştırın. Eski plana yetişmeye çalışmak yerine yeni günlük hedefi görmek daha sağlıklıdır.',
    ] },
    { h: 'Soru sayısı tek ölçü değildir', p: [
      'Çok soru çözmek, konuyu bilmeden yapıldığında yalnızca aynı hatayı tekrarlamaktır. Günlük hedef, konu çalışması tamamlanmış dersler için anlamlıdır. Yeni öğrenilen bir konuda önce az sayıda soruyu çözümleriyle birlikte incelemek, ardından sayıyı artırmak daha verimlidir. Ayrıca zorluk düzeyi de önemlidir: kolay sorulardan oluşan 100 soruluk bir gün ile yeni nesil, uzun çözümlü 40 soruluk bir gün aynı emeği gerektirebilir.',
      'Bu nedenle hedefi bir alt sınır gibi değil, yön gösterici bir ölçü olarak kullanın. Asıl takip edilmesi gereken, çözülen soruların doğru oranının zamanla artıp artmadığıdır.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç, artan günlerin haftanın başından sayıldığını ve bu günlerde önce çalışma günlerinin geldiğini varsayar; gerçek takvimde dinlenme gününüzün hangi güne denk geldiğine göre çalışma günü sayısı bir gün oynayabilir. Resmî tatiller, hastalık ve okul sınav haftaları hesaba katılmaz; bunlar için kalan gün sayısını kendiniz azaltabilirsiniz. Hangi sınav için kaç soru çözülmesi gerektiğine dair evrensel bir sayı yoktur; toplam hedefi kendi düzeyinize ve kaynaklarınıza göre belirlemelisiniz.',
    ] },
  ],
  faq: [
    ['Günde kaç soru çözmeliyim?', 'Bu, toplam hedefinize ve kalan sürenize bağlıdır. Örneğin 60 günde 3000 soru çözmek ve haftada bir gün dinlenmek istiyorsanız günde 58 soru çözmeniz gerekir. Kendi sayılarınızı girerek hedefinizi görebilirsiniz.'],
    ['Dinlenme günü hesaba nasıl katılıyor?', 'Haftada çalışılan gün sayısını seçtiğinizde araç, kalan günlerin yalnızca o kadarını çalışma günü sayar. Haftada 6 gün seçilirse 60 takvim günü 52 çalışma gününe karşılık gelir.'],
    ['Sonuç neden küsuratlı değil?', 'Yarım soru çözülemeyeceği için günlük hedef bir üst tam sayıya yuvarlanır. Yuvarlanmamış değeri görmek isterseniz "Kesirli günlük ortalama" satırına bakabilirsiniz.'],
    ['Soru başına süreyi bilmiyorsam ne yazmalıyım?', 'Bu alan isteğe bağlıdır, boş bırakabilirsiniz. Süreyi öğrenmek için bir testi kronometreyle çözüp toplam süreyi soru sayısına bölün. Sınav türüne ve derse göre süre değişir.'],
    ['Soru bankası bitirme planı için kullanabilir miyim?', 'Evet. Kitaptaki toplam soru sayısını hedef olarak, bitirmek istediğiniz tarihe kalan günü de gün sayısı olarak girin. Birden fazla kitap varsa soru sayılarını toplayın ya da her kitap için ayrı hesap yapın.'],
    ['Plana uyamadığım günler olursa ne yapmalıyım?', 'Çözdüğünüz toplam soru sayısını "Şimdiye kadar çözülen" alanına, kalan günü de güncel değeriyle yazıp yeniden hesaplayın. Yeni günlük hedef, açığı kalan günlere eşit olarak yayar.'],
    ['Deneme sınavındaki sorular hedefe dahil mi?', 'Bu sizin tercihinizdir. Denemeleri toplam hedefe dahil ettiyseniz deneme günü çözdüğünüz soruları günlük hedeften sayabilirsiniz. Dahil etmediyseniz o gün için hedefi ayrıca tamamlamanız gerekir.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['soru-cozme-hizi-hesapla', 'ders-calisma-plani-hesapla', 'konu-tekrar-plani', 'pomodoro-plani-hesapla', 'basari-yuzdesi-hesapla'],
};
