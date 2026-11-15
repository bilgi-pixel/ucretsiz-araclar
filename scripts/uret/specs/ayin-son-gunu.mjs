export default {
  slug: 'ayin-son-gunu',
  title: 'Ayın Son İş Günü ve Son Günü Bulma',
  h1Tail: 'ay sonu tarihleri',
  pageTitle: 'Ayın Son İş Günü ve Son Günü Bulma – Ay Sonu Hangi Gün?',
  description: 'Seçtiğiniz ayın son gününü, son iş gününü ve ilk iş gününü bulun. Ayın kaç gün çektiği ve hafta içi iş günü sayısı da gösterilir.',
  card: 'Bir ayın son gününü ve son iş gününü, haftanın hangi gününe denk geldiğiyle birlikte bulun.',
  category: 'zaman',
  keywords: ['ayın son iş günü', 'ayın son günü hangi gün', 'ay sonu tarihi', 'son iş günü hesaplama', 'ayın ilk iş günü', 'ay kaç iş günü', 'ayın son cuması'],
  lead: 'Bir ay ve yıl seçin; o ayın <strong>son gününü</strong>, hafta sonuna denk geliyorsa geriye çekilmiş <strong>son iş gününü</strong> ve ayın ilk iş gününü gösterelim. Maaş, kira, fatura, vade ve raporlama tarihlerini planlarken takvim karıştırmanıza gerek kalmaz.',
  button: 'Bul',
  inputs: [
    { id: 'ay', label: 'Ay', type: 'select', options: [['1', 'Ocak'], ['2', 'Şubat'], ['3', 'Mart'], ['4', 'Nisan'], ['5', 'Mayıs'], ['6', 'Haziran'], ['7', 'Temmuz'], ['8', 'Ağustos'], ['9', 'Eylül'], ['10', 'Ekim'], ['11', 'Kasım'], ['12', 'Aralık']] },
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 2026', hint: '1583 ile 9999 arasında.' },
    { id: 'cumartesi', label: 'Cumartesi', type: 'select', options: [['hayir', 'İş günü değil'], ['evet', 'İş günü sayılsın']] },
  ],
  compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 9999) h.err('"Yıl" 1583 ile 9999 arasında olmalı.');
    const ay = Number(v.ay);
    if (!Number.isInteger(ay) || ay < 1 || ay > 12) h.err('Listeden geçerli bir ay seçin.');
    const cmt = v.cumartesi === 'evet';
    const ilk = new Date(Date.UTC(2000, ay - 1, 1));
    ilk.setUTCFullYear(y);
    const sonraki = new Date(Date.UTC(2000, ay % 12, 1));
    sonraki.setUTCFullYear(ay === 12 ? y + 1 : y);
    const gunSayisi = h.gunFarki(ilk, sonraki);
    const son = h.gunEkle(ilk, gunSayisi - 1);
    const isGunu = (d) => { const g = d.getUTCDay(); return g !== 0 && (cmt || g !== 6); };
    let sonIs = son;
    while (!isGunu(sonIs)) sonIs = h.gunEkle(sonIs, -1);
    let ilkIs = ilk;
    while (!isGunu(ilkIs)) ilkIs = h.gunEkle(ilkIs, 1);
    let adet = 0;
    for (let i = 0; i < gunSayisi; i++) if (isGunu(h.gunEkle(ilk, i))) adet++;
    const yaz = (d) => `${h.fmtDate(d)} ${h.gunAdi(d)}`;
    return {
      rows: [
        ['Ayın son iş günü', yaz(sonIs)],
        ['Ayın son günü', yaz(son)],
        ['Ayın ilk günü', yaz(ilk)],
        ['Ayın ilk iş günü', yaz(ilkIs)],
        ['Ayın uzunluğu', `${gunSayisi} gün`],
        ['İş günü sayısı', `${adet} gün`],
      ],
      note: `${h.ayAdi(ay)} ${y} için hesaplandı. İş günü olarak pazartesi–${cmt ? 'cumartesi' : 'cuma'} alınmıştır; resmî ve dinî tatiller hesaba katılmaz, bunları takvimden ayrıca kontrol edin.`,
    };
  },
  cases: [
    { in: { ay: '2', yil: '2026', cumartesi: 'hayir' }, out: { 'Ayın son iş günü': '27.02.2026 Cuma', 'Ayın son günü': '28.02.2026 Cumartesi', 'Ayın ilk iş günü': '02.02.2026 Pazartesi', 'Ayın uzunluğu': '28 gün', 'İş günü sayısı': '20 gün' } },
    { in: { ay: '5', yil: '2026', cumartesi: 'hayir' }, out: { 'Ayın son iş günü': '29.05.2026 Cuma', 'Ayın son günü': '31.05.2026 Pazar', 'Ayın ilk günü': '01.05.2026 Cuma', 'İş günü sayısı': '21 gün' } },
    { in: { ay: '2', yil: '2024', cumartesi: 'hayir' }, out: { 'Ayın son iş günü': '29.02.2024 Perşembe', 'Ayın son günü': '29.02.2024 Perşembe', 'Ayın uzunluğu': '29 gün' } },
    { in: { ay: '8', yil: '2026', cumartesi: 'hayir' }, out: { 'Ayın son iş günü': '31.08.2026 Pazartesi', 'Ayın ilk günü': '01.08.2026 Cumartesi', 'Ayın ilk iş günü': '03.08.2026 Pazartesi' } },
    { in: { ay: '2', yil: '2026', cumartesi: 'evet' }, out: { 'Ayın son iş günü': '28.02.2026 Cumartesi', 'İş günü sayısı': '24 gün' } },
    { in: { ay: '12', yil: '2026', cumartesi: 'hayir' }, out: { 'Ayın son iş günü': '31.12.2026 Perşembe', 'Ayın son günü': '31.12.2026 Perşembe', 'Ayın uzunluğu': '31 gün', 'İş günü sayısı': '23 gün' } },
    { in: { ay: '2', yil: '1900', cumartesi: 'hayir' }, out: { 'Ayın son günü': '28.02.1900 Çarşamba' } },
    { in: { ay: '2', yil: '1200', cumartesi: 'hayir' }, error: true },
    { in: { ay: '2', yil: '', cumartesi: 'hayir' }, error: true },
  ],
  howto: [
    '"Ay" listesinden ilgilendiğiniz ayı seçin ve "Yıl" alanına yılı yazın.',
    'İş yerinizde cumartesi günleri de çalışılıyorsa "Cumartesi" listesinden "İş günü sayılsın" seçeneğini işaretleyin.',
    '"Bul" düğmesine basın. İlk satır ayın son iş gününü, ikinci satır takvimdeki son gününü gösterir.',
    'Ayın ilk iş gününü, toplam gün sayısını ve iş günü sayısını alttaki satırlardan okuyun.',
    'Sonuçtaki tarih resmî tatile denk geliyorsa bir önceki iş gününü esas alın; araç tatil takvimini bilmez.',
  ],
  sections: [
    { h: 'Ayın son günü ve son iş günü neden farklı olabilir?', p: [
      'Ayın son günü takvime bağlıdır: ay 28, 29, 30 ya da 31 gün çeker ve son gün haftanın herhangi bir gününe düşebilir. <strong>Son iş günü</strong> ise ayın içindeki en son çalışma günüdür. Ay cumartesi ya da pazar günü bitiyorsa son iş günü bir ya da iki gün geriye, cumaya çekilir.',
      'Bu fark küçük görünür, ama ödeme ve teslim tarihlerinde belirleyicidir. Ay sonunda yapılacağı söylenen bir ödeme, bankaların kapalı olduğu güne denk geldiğinde uygulamada ya son iş gününe öne alınır ya da izleyen ilk iş gününe kalır. Hangi yönde kaydırılacağı kuruma ve sözleşmeye göre değişir; bu yüzden araç hem ayın son iş gününü hem de ilk iş gününü ayrı satırlarda verir.',
    ] },
    { h: 'Çözümlü örnek: Şubat 2026', p: [
      '2026 artık yıl olmadığı için şubat 28 gün çeker. 1 Şubat 2026 pazar gününe denk gelir; dolayısıyla ay tam dört haftadan oluşur ve 28 Şubat cumartesi günüdür. Cumartesi iş günü sayılmadığında son iş günü bir gün geriye çekilir: <strong>27 Şubat 2026 Cuma</strong>. Ayın ilk günü pazar olduğundan ilk iş günü 2 Şubat Pazartesi olur. Dört tam haftada 4 × 5 = 20 hafta içi günü vardır.',
      'Aynı ayı "Cumartesi iş günü sayılsın" seçeneğiyle hesaplarsanız son iş günü 28 Şubat Cumartesi olur ve iş günü sayısı 24\'e çıkar. Altı gün çalışılan iş yerlerinde puantaj ve teslim planı için bu seçenek kullanılır.',
    ] },
    { h: 'İkinci örnek: Mayıs 2026', p: [
      'Mayıs 31 gün çeker ve 2026\'da cuma günü başlar. 31 Mayıs pazar gününe denk geldiği için son iş günü iki gün geriye, <strong>29 Mayıs Cuma</strong> gününe çekilir. Ay içinde beş cuma ve dörder tane pazartesi, salı, çarşamba, perşembe bulunduğundan hafta içi gün sayısı 21\'dir.',
      'Bu örnek aracın sınırını da gösterir: 1 Mayıs resmî tatildir, ancak araç yalnızca haftanın günlerine baktığı için 1 Mayıs Cuma\'yı ilk iş günü olarak gösterir. Resmî tatil ve bayram günlerini kendi takviminizden düşmeniz gerekir. Bayram tarihleri her yıl değiştiği ve idari izin kararları sonradan açıklanabildiği için bu bilgi araca sabit olarak konmamıştır.',
    ] },
    { h: 'Aylar kaç gün çeker?', p: [
      'Nisan, haziran, eylül ve kasım 30 gün; ocak, mart, mayıs, temmuz, ağustos, ekim ve aralık 31 gün çeker. Şubat normal yıllarda 28, artık yıllarda 29 gündür. Dörde tam bölünen yıllar artık yıldır; ancak 100\'e bölünüp 400\'e bölünmeyen yıllar (1900, 2100 gibi) artık yıl sayılmaz. Araç bu kuralı uygular: Şubat 2024 için 29 Şubat Perşembe, Şubat 1900 için 28 Şubat Çarşamba sonucunu verir.',
      'Akılda tutmanın bilinen yolu yumruk yöntemidir: elinizi yumruk yapıp parmak kemiklerini ve aralarındaki çukurları sırayla sayarsınız. Kemiğe gelen aylar 31, çukura gelen aylar 30 gün (şubat hariç) çeker.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Maaş ve ödeme günleri:</strong> "Ayın son iş günü" ödeme yapılan iş yerlerinde paranın hangi tarihte hesaba geçeceğini öngörmek.',
      '<strong>Kira, aidat ve fatura:</strong> Ay sonu vadeli ödemelerin hafta sonuna denk gelip gelmediğini önceden görmek.',
      '<strong>Muhasebe ve raporlama:</strong> Ay kapanışı, mutabakat ve dönem sonu işlemlerinin yapılacağı son çalışma gününü belirlemek.',
      '<strong>Bordro ve puantaj:</strong> Aydaki iş günü sayısını günlük ücret ya da yemek ve yol hesabında kullanmak.',
      '<strong>Proje ve teslim planı:</strong> "Ay sonuna kadar" verilen bir sözün fiilen hangi iş gününe kadar geçerli olduğunu netleştirmek.',
      '<strong>Abonelik ve sözleşme yenileme:</strong> Ay sonunda biten taahhütlerde işlem yapılabilecek son günü kaçırmamak.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç bir takvim yardımcısıdır. Resmî tatilleri, dinî bayramları, yarım günleri, idari izinleri ve kurumunuza özgü çalışma düzenini bilmez. Vergi beyanı, sigorta bildirimi ya da sözleşmeden doğan ödemeler gibi sonucu olan işlemlerde son günün tatile denk gelmesi hâlinde sürenin nasıl uzadığı ilgili düzenlemeyle belirlenir; kesin tarih için güncel mevzuatı ve kurumunuzun duyurularını kontrol edin.',
    ] },
  ],
  faq: [
    ['Ayın son iş günü nasıl bulunur?', 'Ayın son gününe bakılır; hafta içiyse son iş günü odur. Cumartesiye denk geliyorsa bir gün, pazara denk geliyorsa iki gün geriye, cumaya çekilir. Resmî tatil varsa bir önceki çalışma gününe gidilir.'],
    ['Şubat 2026 kaç gün çekiyor ve son iş günü ne zaman?', 'Şubat 2026, 28 gün çeker. Ayın son günü 28 Şubat Cumartesi, hafta içi son iş günü 27 Şubat Cuma\'dır.'],
    ['Bir ayda kaç iş günü olur?', 'Pazartesi–cuma çalışma düzeninde bir ayda 20 ile 23 arasında hafta içi günü bulunur. Şubat 2026\'da 20, Mayıs 2026\'da 21, Aralık 2026\'da 23 gündür. Resmî tatiller bu sayıdan ayrıca düşülmelidir.'],
    ['Resmî tatiller hesaba katılıyor mu?', 'Hayır. Araç yalnızca hafta sonlarını ayırır. Sonuç tarihi bir resmî tatile ya da bayrama denk geliyorsa bir önceki iş gününü kendiniz belirlemelisiniz.'],
    ['Cumartesi günleri çalışıyorum, ne yapmalıyım?', '"Cumartesi" listesinden "İş günü sayılsın" seçeneğini işaretleyin. Bu durumda yalnızca pazar günleri iş günü dışında tutulur; son iş günü ve iş günü sayısı buna göre hesaplanır.'],
    ['Maaşım ayın son iş günü yatıyor; hafta sonuna denk gelirse ne olur?', 'Araç, ayın son gününden geriye doğru ilk hafta içi günü gösterir; uygulamada çoğu iş yeri ödemeyi bu güne çeker. Ancak kesin ödeme günü iş yerinizin ve bankanızın uygulamasına bağlıdır.'],
    ['Hangi yıllar için kullanabilirim?', '1583 ile 9999 arasındaki yıllar için çalışır. Geçmiş bir dönemin ay sonunu kontrol edebilir ya da gelecek yılların planını yapabilirsiniz.'],
    ['Seçtiğim ay ve yıl bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz bilgiler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ay-kac-gun', 'is-gunu-hesapla', 'n-inci-gun-bul', 'gun-sayisi-ekle-is-gunu', 'vade-tarihi-hesapla', 'hangi-gun-hesapla'],
};
