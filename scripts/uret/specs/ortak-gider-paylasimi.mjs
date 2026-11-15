export default {
  slug: 'ortak-gider-paylasimi',
  title: 'Ortak Gider Paylaşımı Hesaplama',
  h1Tail: 'kim kime ne kadar borçlu?',
  pageTitle: 'Ortak Gider Paylaşımı Hesaplama – Kim Kime Ne Kadar Borçlu?',
  description: 'Tatil, ev ya da etkinlik giderlerinde herkesin ödediğini yazın; kişi başı payı, kimin alacaklı kimin borçlu olduğunu ve hesabı kapatacak en az sayıda ödemeyi görün.',
  card: 'Kimin ne ödediğini yazın; kişi başı payı, alacaklı ve borçluları, hesabı kapatacak ödemeleri listeleyin.',
  category: 'finans',
  keywords: ['ortak gider paylaşımı', 'kim kime ne kadar borçlu', 'tatil masrafı paylaşma', 'ev arkadaşı gider paylaşımı', 'masraf bölüşme hesaplama', 'ortak harcama hesaplama', 'borç denkleştirme'],
  lead: `Arkadaş grubuyla çıkılan tatilde, ortak evde ya da bir organizasyonda herkes farklı tutarlar ödediyse hesabı bu araçla kapatın. Her kişinin ödediği tutarı alt alta yazın; araç giderin eşit paylaşıldığını varsayarak <strong>kimin kime ne kadar göndermesi gerektiğini</strong> en az sayıda ödemeyle listeler.`,
  button: 'Hesapla',
  inputs: [
    { id: 'odemeler', label: 'Kişiler ve ödedikleri tutarlar', type: 'textarea', placeholder: 'Ayşe 1200\nMehmet 300\nZeynep 0', hint: 'Her satıra bir ad ve bir tutar yazın. Hiç ödeme yapmayan kişiyi 0 ile ekleyin. Aynı ad birden çok satırda geçerse tutarlar toplanır. Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.', wide: true },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.odemeler);
    if (!satirlar.length) h.err('Her satıra bir ad ve ödediği tutarı yazın (örn. "Ayşe 1200").');
    const kisiler = [];
    const dizin = new Map();
    for (const satir of satirlar) {
      const temiz = satir.replace(/\s*(TL|₺)\s*$/i, '').trim();
      const m = /^(.*?\S)\s*(?:[:=]\s*|\s[-–]\s+|\s+)(\S+)$/.exec(temiz);
      if (!m) h.err(`"${satir}" satırı anlaşılamadı; ad ve tutarı boşlukla ayırarak yazın (örn. "Ayşe 1200").`);
      const ad = m[1].replace(/[\s:=\-–]+$/, '').trim();
      if (!ad || /^[\d.,]+$/.test(ad)) h.err(`"${satir}" satırında ad eksik; önce adı, sonra tutarı yazın.`);
      const tutar = h.nonneg(m[2], `${ad} için tutar`);
      const anahtar = ad.toLocaleLowerCase('tr');
      if (dizin.has(anahtar)) kisiler[dizin.get(anahtar)].kurus += Math.round(tutar * 100);
      else { dizin.set(anahtar, kisiler.length); kisiler.push({ ad, kurus: Math.round(tutar * 100) }); }
    }
    if (kisiler.length < 2) h.err('Paylaşım için en az iki kişi gerekir; ödeme yapmayanları da 0 tutarla ekleyin.');
    if (kisiler.length > 50) h.err('En fazla 50 kişi girilebilir.');
    const toplam = kisiler.reduce((a, k) => a + k.kurus, 0);
    if (toplam === 0) h.err('Toplam gider sıfır; en az bir kişinin ödediği tutarı yazın.');
    const pay = toplam / kisiler.length;
    const tl = (kurus) => h.para(kurus / 100);
    const bakiye = kisiler.map((k) => ({ ad: k.ad, b: Math.round(k.kurus - pay) }));
    const durum = bakiye.map((k) => `${k.ad}: ${k.b > 0 ? tl(k.b) + ' alacaklı' : k.b < 0 ? tl(-k.b) + ' borçlu' : 'denk'}`);
    const alacakli = bakiye.filter((k) => k.b > 0).map((k) => ({ ...k })).sort((a, b) => b.b - a.b);
    const borclu = bakiye.filter((k) => k.b < 0).map((k) => ({ ad: k.ad, b: -k.b })).sort((a, b) => b.b - a.b);
    const transferler = [];
    let i = 0, j = 0;
    while (i < borclu.length && j < alacakli.length) {
      const m = Math.min(borclu[i].b, alacakli[j].b);
      if (m > 0) transferler.push(`${borclu[i].ad} → ${alacakli[j].ad}: ${tl(m)}`);
      borclu[i].b -= m;
      alacakli[j].b -= m;
      if (borclu[i].b === 0) i++;
      if (j < alacakli.length && alacakli[j].b === 0) j++;
    }
    const metin = 'Bakiye durumu:\n' + durum.join('\n') + '\n\nYapılacak ödemeler:\n' + (transferler.length ? transferler.join('\n') : 'Herkes payını ödemiş; ödeme gerekmiyor.');
    return {
      rows: [
        ['Kişi başı pay', tl(pay)],
        ['Toplam gider', tl(toplam)],
        ['Kişi sayısı', String(kisiler.length)],
        ['Gereken ödeme sayısı', String(transferler.length)],
      ],
      text: metin,
      note: 'Gider tüm kişiler arasında eşit paylaştırılmıştır. Pay tam bölünmediğinde bir kuruşluk yuvarlama farkı oluşabilir.',
    };
  },
  cases: [
    { in: { odemeler: 'Ayşe 1200\nMehmet 300\nZeynep 0' }, out: { 'Kişi başı pay': '500,00 TL', 'Toplam gider': '1.500,00 TL', 'Kişi sayısı': '3', 'Gereken ödeme sayısı': '2' }, textMatch: 'Ayşe: 700,00 TL alacaklı\\nMehmet: 200,00 TL borçlu\\nZeynep: 500,00 TL borçlu[\\s\\S]*Zeynep → Ayşe: 500,00 TL\\nMehmet → Ayşe: 200,00 TL' },
    { in: { odemeler: 'Ali 900\nVeli 300' }, out: { 'Kişi başı pay': '600,00 TL', 'Gereken ödeme sayısı': '1' }, textMatch: 'Veli → Ali: 300,00 TL$' },
    { in: { odemeler: 'Elif 1100\nBurak 900\nCem 0\nDeniz 400' }, out: { 'Kişi başı pay': '600,00 TL', 'Toplam gider': '2.400,00 TL', 'Gereken ödeme sayısı': '3' }, textMatch: 'Cem → Elif: 500,00 TL\\nCem → Burak: 100,00 TL\\nDeniz → Burak: 200,00 TL$' },
    { in: { odemeler: 'Can 2000\nEce 1000\nEfe 600\nSu 400' }, out: { 'Kişi başı pay': '1.000,00 TL', 'Gereken ödeme sayısı': '2' }, textMatch: 'Ece: denk[\\s\\S]*Su → Can: 600,00 TL\\nEfe → Can: 400,00 TL$' },
    { in: { odemeler: 'Ali 100\nali 200 TL\nVeli: 0\nCan 0' }, out: { 'Kişi başı pay': '100,00 TL', 'Toplam gider': '300,00 TL', 'Kişi sayısı': '3', 'Gereken ödeme sayısı': '2' }, textMatch: 'Veli → Ali: 100,00 TL\\nCan → Ali: 100,00 TL$' },
    { in: { odemeler: 'Seda 250,50\nOya 250,50' }, out: { 'Kişi başı pay': '250,50 TL', 'Gereken ödeme sayısı': '0' }, textMatch: 'Herkes payını ödemiş' },
    { in: { odemeler: 'Ada 100\nBora 0\nCeren 0' }, out: { 'Kişi başı pay': '33,33 TL', 'Gereken ödeme sayısı': '2' }, textMatch: 'Bora → Ada: 33,33 TL\\nCeren → Ada: 33,33 TL$' },
    { in: { odemeler: 'Ayşe 1200' }, error: true },
    { in: { odemeler: 'Ayşe\nMehmet 300' }, error: true },
    { in: { odemeler: 'Ayşe -100\nMehmet 300' }, error: true },
    { in: { odemeler: '' }, error: true },
  ],
  howto: [
    `Paylaşıma dahil olan herkesi alt alta yazın: her satırda önce ad, sonra o kişinin ortak giderler için ödediği toplam tutar yer alsın (örneğin "Ayşe 1200").`,
    `Hiç ödeme yapmamış ama giderden payına düşeni ödeyecek kişileri de 0 tutarla ekleyin; aksi halde pay eksik kişi üzerinden hesaplanır.`,
    `Bir kişi birden fazla ödeme yaptıysa ya tutarları toplayıp tek satırda yazın ya da aynı adı birkaç satırda tekrarlayın; araç aynı adları birleştirir.`,
    `"Hesapla" düğmesine basın. Üstte kişi başı pay ve toplam gider, altta her kişinin alacaklı mı borçlu mu olduğu ve yapılması gereken ödemeler listelenir.`,
    `Listeyi "Sonucu kopyala" ile kopyalayıp grup sohbetine yapıştırın; herkes kime ne göndereceğini görsün.`,
  ],
  sections: [
    { h: 'Ortak gider paylaşımı nasıl çalışır?', p: [
      `Birkaç kişinin birlikte yaptığı harcamalarda çoğu zaman ödemeleri farklı kişiler yapar: biri konaklamayı karttan çeker, bir başkası marketi öder, üçüncüsü yakıtı alır. Sonunda herkesin eşit katkı yapmış olması istenir, ancak kimin kime ne vereceğini çıkarmak grup büyüdükçe karmaşıklaşır.`,
      `Yöntem üç adımdan oluşur. Önce tüm ödemeler toplanır ve kişi sayısına bölünerek <strong>kişi başı pay</strong> bulunur. Sonra her kişinin ödediği tutardan bu pay çıkarılır: sonuç artıysa kişi alacaklıdır, eksiyse borçludur. Son adımda borçlular alacaklılarla eşleştirilir. Araç en yüksek borcu en yüksek alacakla eşleştirerek ilerler; bu sayede herkesin herkese ayrı ayrı ödeme yapması gerekmez ve ödeme sayısı en fazla kişi sayısının bir eksiği kadar olur.`,
    ] },
    { h: 'Çözümlü örnek: üç kişilik hafta sonu tatili', p: [
      `Ayşe, Mehmet ve Zeynep hafta sonu için bir ev kiralıyor. Ayşe konaklama ve market için toplam 1.200 TL, Mehmet yakıt için 300 TL ödüyor; Zeynep hiçbir ödeme yapmıyor. Toplam gider 1.200 + 300 + 0 = 1.500 TL, kişi başı pay 1.500 ÷ 3 = 500,00 TL'dir.`,
      `Bakiyeler şöyle çıkar: Ayşe 1.200 − 500 = 700 TL alacaklı, Mehmet 300 − 500 = 200 TL borçlu, Zeynep 0 − 500 = 500 TL borçlu. Alacaklı tek kişi olduğu için çözüm açıktır: Zeynep Ayşe'ye 500,00 TL, Mehmet Ayşe'ye 200,00 TL gönderir. İki ödemeyle hesap kapanır ve herkes tatil için tam 500 TL harcamış olur.`,
    ] },
    { h: 'Çözümlü örnek: birden fazla alacaklı', p: [
      `Dört kişilik bir grupta Elif 1.100 TL, Burak 900 TL, Deniz 400 TL ödemiş, Cem hiç ödememiş olsun. Toplam 2.400 TL, pay 600,00 TL'dir. Elif 500 TL, Burak 300 TL alacaklı; Cem 600 TL, Deniz 200 TL borçludur.`,
      `Araç en büyük borçludan başlar: Cem önce en büyük alacaklı olan Elif'e 500,00 TL gönderir ve Elif'in alacağı kapanır. Cem'in kalan 100,00 TL'lik borcu Burak'a gider. Son olarak Deniz Burak'a 200,00 TL öder. Toplam üç ödemeyle herkesin bakiyesi sıfırlanır. Alacakların toplamı (500 + 300 = 800) ile borçların toplamının (600 + 200 = 800) eşit olması, hesabın doğruluğunu sınamanın kolay yoludur.`,
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      `<strong>Tatil ve geziler:</strong> konaklama, araç kiralama, yakıt, market ve müze girişlerini farklı kişiler ödediğinde dönüşte tek seferde hesaplaşmak için.`,
      `<strong>Ev arkadaşlığı:</strong> kira dışındaki fatura, internet, temizlik malzemesi ve ortak mutfak alışverişlerini ay sonunda denkleştirmek için.`,
      `<strong>Organizasyonlar:</strong> doğum günü sürprizi, ortak hediye, mezuniyet yemeği ya da piknik gibi birkaç kişinin masraf yaptığı etkinliklerde.`,
      `<strong>Ofis ve ekip harcamaları:</strong> birlikte verilen yemek siparişleri ya da ortak alınan malzemeler için.`,
    ] },
    { h: 'Doğru sonuç için ipuçları', ul: [
      `Yalnızca <strong>ortak</strong> giderleri yazın. Birinin kendisi için aldığı hediyelik ya da kişisel harcama listeye girmemelidir.`,
      `Ödeme yapmayan kişileri 0 ile eklemeyi unutmayın; kişi başı pay, listedeki kişi sayısına göre hesaplanır.`,
      `Giderlerin tümüne herkes ortak olmayabilir. Örneğin bir kişi akşam yemeğine katılmadıysa, o yemeği ayrı bir hesap olarak yalnızca katılanlarla hesaplayıp iki sonucu birleştirmek en temiz yoldur.`,
      `Farklı para birimleriyle yapılan ödemeleri önce aynı birime çevirin; araç kur dönüşümü yapmaz.`,
      `Ad ile tutarı boşlukla ayırın. "Ali Can 750" gibi iki kelimeli adlar da kabul edilir; satırdaki son sayı tutar sayılır.`,
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      `Araç giderin herkes arasında <strong>eşit</strong> paylaşıldığını varsayar; gelire ya da kullanım oranına göre ağırlıklı paylaşım yapmaz. Toplam tutar kişi sayısına tam bölünmediğinde paylar kuruşa yuvarlanır ve bir kişinin alacağında bir kuruşluk fark kalabilir. Önerilen ödeme listesi hesabı kapatmanın geçerli yollarından biridir; grup kendi arasında farklı bir eşleştirme de yapabilir. Sonuçlar bilgilendirme amaçlıdır; para transferlerini gerçekleştirmeden önce tutarları birlikte gözden geçirin.`,
    ] },
  ],
  faq: [
    ['Kim kime ne kadar borçlu, nasıl hesaplanır?', `Tüm ödemeler toplanıp kişi sayısına bölünür. Her kişinin ödediği tutardan bu pay çıkarılır; sonuç artıysa kişi alacaklı, eksiyse borçludur. Borçlular borçlarını alacaklılara ödediğinde hesap kapanır. Araç bu adımları otomatik yapar.`],
    ['Hiç ödeme yapmayan kişiyi nasıl eklerim?', `Adını yazıp yanına 0 koyun, örneğin "Zeynep 0". Böylece kişi başı pay doğru sayıda kişiye bölünür ve o kişinin payının tamamı borç olarak görünür.`],
    ['Aynı kişi birkaç ödeme yaptıysa ne yapmalıyım?', `Aynı adı birden çok satırda yazabilirsiniz; araç büyük-küçük harf ayrımı yapmadan aynı adları birleştirip tutarları toplar. İsterseniz toplamı kendiniz hesaplayıp tek satırda da girebilirsiniz.`],
    ['Ödeme sayısı neden kişi sayısından az?', `Herkesin herkese ayrı ayrı ödeme yapması gerekmez. Borçlular doğrudan alacaklılara ödeme yaptığında, en fazla kişi sayısının bir eksiği kadar ödeme hesabı kapatmaya yeter.`],
    ['Giderler eşit değil de farklı oranlarda paylaşılacaksa?', `Bu araç yalnızca eşit paylaşımı hesaplar. Farklı oranlı paylaşımlarda giderleri gruplara ayırıp her grubu kendi katılımcılarıyla ayrı ayrı hesaplayabilir, sonra kişilerin bakiyelerini toplayabilirsiniz.`],
    ['Kira gibi düzenli giderlerde de kullanılır mı?', `Evet. Ay boyunca kimin hangi ortak ödemeyi yaptığını not edip ay sonunda toplamları girmeniz yeterlidir. Kira herkes tarafından ayrı ayrı ev sahibine ödeniyorsa listeye eklemenize gerek yoktur.`],
    ['Sonuçta bir kuruşluk fark neden oluşuyor?', `100 TL'nin üç kişiye bölünmesi gibi durumlarda pay 33,333… çıkar ve kuruşa yuvarlanır. Bu yuvarlama nedeniyle alacaklının alacağı ile gelen ödemeler arasında bir kuruş fark kalabilir; pratikte önemsizdir.`],
    ['Yazdığım isimler ve tutarlar saklanıyor mu?', `Hayır. Girdiğiniz isimler ve tutarlar yalnızca tarayıcınızda işlenir; hiçbir sunucuya gönderilmez, kaydedilmez. Sayfayı kapattığınızda tümü silinir.`],
  ],
  related: ['hesap-bolusme', 'bahsis-hesapla', 'butce-50-30-20-hesapla', 'tasarruf-orani-hesapla', 'birim-fiyat-karsilastir'],
};
