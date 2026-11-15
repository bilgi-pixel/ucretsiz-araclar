export default {
  slug: 'bahsis-hesapla',
  title: 'Bahşiş Hesaplama',
  h1Tail: 'tutar, oran ve kişi başı',
  pageTitle: 'Bahşiş Hesaplama – Hesaba Göre Bahşiş ve Kişi Başı Ödeme',
  description: 'Hesap tutarı ve bahşiş oranını girin; bırakılacak bahşişi, toplam ödemeyi ve kişi başına düşen payı görün. Toplamı 10, 50 ya da 100 TL\'ye yuvarlama seçeneği vardır.',
  card: 'Hesap tutarı ve orandan bahşişi, toplam ödemeyi ve kişi başı payı bulun; isterseniz toplamı yuvarlayın.',
  category: 'finans',
  keywords: ['bahşiş hesaplama', 'bahşiş ne kadar bırakılır', 'yüzde 10 bahşiş', 'restoran bahşiş hesaplama', 'kişi başı bahşiş', 'tip hesaplama', 'bahşiş oranı'],
  lead: `Restoranda, kafede ya da kuaförde bırakacağınız bahşişi saniyeler içinde hesaplayın. Hesap tutarını ve oranı yazın; araç <strong>bahşiş = hesap × oran ÷ 100</strong> işlemini yapar, toplam ödemeyi ve masadaki kişi sayısına göre herkesin payını gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'tutar', label: 'Hesap tutarı (TL)', type: 'number', placeholder: 'Örn. 850', hint: 'Binlik ayraç kullanmayın ya da 1.250,00 biçiminde yazın.' },
    { id: 'oran', label: 'Bahşiş oranı (%)', type: 'number', value: '10' },
    { id: 'kisi', label: 'Kişi sayısı', type: 'number', value: '1' },
    { id: 'yuvarla', label: 'Toplamı yuvarla', type: 'select', options: [['yok', 'Yuvarlama yok'], ['10', 'En yakın 10 TL\'ye yukarı'], ['50', 'En yakın 50 TL\'ye yukarı'], ['100', 'En yakın 100 TL\'ye yukarı']] },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Hesap tutarı');
    const oran = h.nonneg(h.opt(v.oran, 10, 'Bahşiş oranı'), 'Bahşiş oranı');
    const kisi = String(v.kisi ?? '').trim() === '' ? 1 : h.posint(v.kisi, 'Kişi sayısı');
    const adim = { 10: 10, 50: 50, 100: 100 }[v.yuvarla] || 0;
    let bahsis = tutar * oran / 100;
    let toplam = tutar + bahsis;
    if (adim) {
      toplam = Math.ceil(toplam / adim - 1e-9) * adim;
      bahsis = toplam - tutar;
    }
    const rows = [
      ['Bahşiş tutarı', h.para(bahsis)],
      ['Toplam ödeme', h.para(toplam)],
      ['Kişi başı ödeme', h.para(toplam / kisi)],
      ['Kişi başı bahşiş', h.para(bahsis / kisi)],
      ['Gerçekleşen bahşiş oranı', '%' + h.fmt(bahsis / tutar * 100, 2)],
    ];
    return {
      rows,
      note: adim
        ? `Toplam ödeme ${adim} TL'nin katına yukarı yuvarlandı; aradaki fark bahşişe eklendi.`
        : 'Bahşiş, yazdığınız hesap tutarı üzerinden hesaplanır. Bahşiş bırakmak ve oranı tamamen sizin takdirinizdedir.',
    };
  },
  cases: [
    { in: { tutar: '850', oran: '10', kisi: '1', yuvarla: 'yok' }, out: { 'Bahşiş tutarı': '85,00 TL', 'Toplam ödeme': '935,00 TL', 'Gerçekleşen bahşiş oranı': '%10' } },
    { in: { tutar: '1200', oran: '10', kisi: '4', yuvarla: 'yok' }, out: { 'Bahşiş tutarı': '120,00 TL', 'Toplam ödeme': '1.320,00 TL', 'Kişi başı ödeme': '330,00 TL', 'Kişi başı bahşiş': '30,00 TL' } },
    { in: { tutar: '600', oran: '15', kisi: '2', yuvarla: '50' }, out: { 'Bahşiş tutarı': '100,00 TL', 'Toplam ödeme': '700,00 TL', 'Kişi başı ödeme': '350,00 TL', 'Gerçekleşen bahşiş oranı': '%16,67' } },
    { in: { tutar: '500', oran: '0', kisi: '1', yuvarla: 'yok' }, out: { 'Bahşiş tutarı': '0,00 TL', 'Toplam ödeme': '500,00 TL' } },
    { in: { tutar: '245,5', oran: '10', kisi: '1', yuvarla: 'yok' }, out: { 'Bahşiş tutarı': '24,55 TL', 'Toplam ödeme': '270,05 TL' } },
    { in: { tutar: '1000', oran: '12,5', kisi: '3', yuvarla: 'yok' }, out: { 'Bahşiş tutarı': '125,00 TL', 'Toplam ödeme': '1.125,00 TL', 'Kişi başı ödeme': '375,00 TL', 'Kişi başı bahşiş': '41,67 TL' } },
    { in: { tutar: '900', oran: '10', kisi: '1', yuvarla: '10' }, out: { 'Bahşiş tutarı': '90,00 TL', 'Toplam ödeme': '990,00 TL' } },
    { in: { tutar: '850', oran: '10', kisi: '0', yuvarla: 'yok' }, error: true },
    { in: { tutar: '0', oran: '10', kisi: '1' }, error: true },
    { in: { tutar: '850', oran: '-5', kisi: '1' }, error: true },
  ],
  howto: [
    `Adisyonda yazan toplam tutarı "Hesap tutarı" alanına girin. Kuruşlu tutarlar için virgül kullanabilirsiniz.`,
    `Bırakmak istediğiniz bahşiş oranını yüzde olarak yazın. Alan %10 ile gelir; hizmetten memnuniyetinize göre değiştirebilirsiniz.`,
    `Hesabı arkadaşlarınızla paylaşacaksanız "Kişi sayısı" alanına masadaki kişi sayısını yazın; tek başınıza ödüyorsanız 1 bırakın.`,
    `Bozuk parayla uğraşmamak için toplamı 10, 50 ya da 100 TL'nin katına yuvarlamayı seçebilirsiniz. Yuvarlama farkı bahşişe eklenir.`,
    `"Hesapla" düğmesine basın; bahşiş tutarı, toplam ödeme ve kişi başı paylar listelenir.`,
  ],
  sections: [
    { h: 'Bahşiş nasıl hesaplanır?', p: [
      `Bahşiş hesabı basit bir yüzde işlemidir: <strong>bahşiş = hesap tutarı × oran ÷ 100</strong>. Toplam ödeme, hesap tutarına bahşişin eklenmesiyle bulunur. Hesap birden fazla kişi arasında eşit paylaşılıyorsa toplam, kişi sayısına bölünür.`,
      `Örnek: 850 TL'lik bir akşam yemeği için %10 bahşiş bırakmak isterseniz 850 × 10 ÷ 100 = 85,00 TL eder ve toplamda 935,00 TL ödersiniz. Dört kişilik bir masada hesap 1.200 TL geldiyse %10 bahşiş 120,00 TL'dir; toplam 1.320,00 TL dörde bölününce kişi başı 330,00 TL düşer ve bunun 30,00 TL'si bahşiştir.`,
    ] },
    { h: 'Yuvarlama seçeneği nasıl çalışır?', p: [
      `Gündelik hayatta çoğu kişi bahşişi kuruşu kuruşuna hesaplamaz; ödenecek toplamı yuvarlak bir rakama tamamlar. Araçtaki yuvarlama seçeneği bunu yapar: önce oranla bahşişi bulur, sonra toplamı seçtiğiniz adımın bir üst katına çıkarır ve aradaki farkı bahşişe ekler.`,
      `İki kişilik 600 TL'lik bir hesapta %15 bahşiş 90 TL, toplam 690 TL eder. "En yakın 50 TL'ye yukarı" seçildiğinde toplam 700,00 TL'ye çıkar, bahşiş 100,00 TL olur ve kişi başı 350,00 TL ödenir. Bu durumda gerçekleşen bahşiş oranı 100 ÷ 600 = %16,67'dir; araç bu değeri ayrı bir satırda gösterir. Toplam zaten tam bir kata denk geliyorsa değişmez.`,
    ] },
    { h: 'Akıldan hızlı bahşiş hesabı', p: [
      `Telefonunuz yanınızda olmadığında işe yarayan birkaç kestirme yol vardır.`,
    ], ul: [
      `<strong>%10:</strong> tutarın virgülünü bir basamak sola kaydırın. 740 TL'nin %10'u 74 TL'dir.`,
      `<strong>%5:</strong> %10'u bulup yarısını alın. 740 TL için 37 TL.`,
      `<strong>%15:</strong> %10 ile %5'i toplayın. 740 TL için 74 + 37 = 111 TL.`,
      `<strong>%20:</strong> %10'u ikiyle çarpın. 740 TL için 148 TL.`,
      `<strong>%12,5:</strong> tutarı sekize bölün. 1.000 TL için 125 TL.`,
    ] },
    { h: 'Bahşiş alışkanlıkları üzerine', p: [
      `Türkiye'de bahşiş yasal bir zorunluluk değil, hizmetten duyulan memnuniyetin gönüllü bir göstergesidir. Oturarak servis alınan restoranlarda hesabın yaklaşık onda biri civarında bırakmak yaygın bir alışkanlıktır; kafelerde, taksilerde ve paket servislerde çoğunlukla üstü bırakılır ya da tutar yukarı yuvarlanır. Kuaför, berber, otel görevlisi ve vale gibi hizmetlerde de bahşiş verilmesi sık görülür, ancak miktar tamamen kişiye kalmıştır.`,
      `Yurt dışında durum ülkeden ülkeye belirgin biçimde değişir. Kimi ülkelerde bahşiş çalışanın gelirinin önemli bir parçasıdır ve daha yüksek oranlar beklenir; kimilerinde servis bedeli fiyata dahildir ve ayrıca bahşiş bırakmak alışılmış değildir. Seyahate çıkmadan önce gideceğiniz ülkenin alışkanlıklarına göz atmak, hem bütçenizi hem de görgü kurallarını gözetmenizi sağlar.`,
    ] },
    { h: 'Dikkat edilecek noktalar', ul: [
      `<strong>Servis bedeli:</strong> Bazı işletmeler adisyona ayrı bir servis ya da kuver kalemi ekler. Böyle bir kalem varsa bahşişi buna göre azaltmak ya da hiç bırakmamak sizin tercihinizdir; adisyonu ödemeden önce satır satır okuyun.`,
      `<strong>Kartla bahşiş:</strong> Her işletmenin kart cihazı bahşiş eklemeye uygun olmayabilir. Kartla ödeyecekseniz bahşişi ekleyip ekleyemeyeceğinizi sorun ya da yanınızda bir miktar nakit bulundurun.`,
      `<strong>İndirimli hesaplar:</strong> Kampanya ya da kuponla hesap düştüyse, bahşişi indirim öncesi tutar üzerinden hesaplamak hizmeti veren kişi açısından daha adil kabul edilir. Bunun için alana indirimsiz tutarı yazabilirsiniz.`,
      `<strong>Eşit olmayan paylaşım:</strong> Araç toplamı kişi sayısına eşit böler. Herkes kendi yediğini ödeyecekse her kişi kendi tutarını ayrı ayrı girip bahşişini bulabilir.`,
    ] },
    { h: 'Sınırlar', p: [
      `Hesap tutarı sıfırdan büyük, oran sıfır ya da pozitif, kişi sayısı en az 1 olmalıdır. Tutarlar iki ondalık basamağa yuvarlanarak gösterilir; kişi sayısına tam bölünmeyen toplamlarda paylar arasında bir kuruşluk fark oluşabilir. Sonuçlar bilgilendirme amaçlıdır; araç bir oran önermez, yalnızca sizin seçtiğiniz oranla hesap yapar.`,
    ] },
  ],
  faq: [
    ['Bahşiş yüzde kaç bırakılır?', `Bağlayıcı bir kural yoktur. Türkiye'de oturarak servis alınan yerlerde hesabın onda biri civarı yaygın bir alışkanlıktır; hizmet çok iyiyse daha fazlası, kötüyse daha azı bırakılabilir. Araç %10 ile açılır, oranı istediğiniz gibi değiştirebilirsiniz.`],
    ['1.000 TL hesaba ne kadar bahşiş bırakılır?', `%10 oranla 100 TL, %15 oranla 150 TL, %5 oranla 50 TL eder. Tutarı ve oranı yazarak kendi hesabınız için kesin rakamı görebilirsiniz.`],
    ['Bahşiş vermek zorunlu mu?', `Hayır, bahşiş gönüllüdür ve müşterinin takdirine bağlıdır. Adisyonda ayrıca yazılan servis bedeli gibi kalemler bahşişten farklıdır; bunlar hakkında sorunuz varsa işletmeye danışabilirsiniz.`],
    ['Bahşiş KDV dahil tutar üzerinden mi hesaplanır?', `Adisyonda gördüğünüz toplam genellikle vergiler dahil tutardır ve pratikte bahşiş bu rakam üzerinden hesaplanır. Dilerseniz alana vergi hariç tutarı yazarak daha düşük bir taban kullanabilirsiniz.`],
    ['Hesabı bölüşürken bahşiş nasıl paylaşılır?', `Kişi sayısını girdiğinizde araç bahşiş dahil toplamı eşit böler ve kişi başı bahşişi ayrı bir satırda gösterir. Dört kişilik 1.200 TL'lik hesapta %10 bahşişle herkes 330 TL öder.`],
    ['Yuvarlama seçince bahşiş oranı neden değişiyor?', `Toplam bir üst kata tamamlandığında aradaki fark bahşişe eklenir, bu yüzden gerçekleşen oran seçtiğiniz orandan biraz yüksek çıkar. "Gerçekleşen bahşiş oranı" satırı sonuçtaki fiilî yüzdeyi verir.`],
    ['Ondalıklı oran yazabilir miyim?', `Evet. 12,5 ya da 7,5 gibi oranları virgül ya da noktayla yazabilirsiniz. 1.000 TL için %12,5 bahşiş 125 TL eder.`],
    ['Yazdığım tutarlar kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; hesap tutarınız hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra bağlantı olmadan da çalışır.`],
  ],
  related: ['hesap-bolusme', 'ortak-gider-paylasimi', 'iskonto-hesapla', 'komisyon-hesapla', 'birim-fiyat-karsilastir'],
};
