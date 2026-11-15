export default {
  slug: 'ortalama-vade-hesapla',
  title: 'Ortalama Vade Hesaplama',
  h1Tail: 'çek, senet ve fatura',
  pageTitle: 'Ortalama Vade Hesaplama – Çek, Senet ve Faturalar İçin Ağırlıklı Vade',
  description: "Farklı tutar ve vadelerdeki çek, senet ya da faturaların tutar ağırlıklı ortalama vadesini gün ve tarih olarak hesaplayın. Vadeyi gün ya da tarih olarak girebilirsiniz.",
  card: "Birden çok çek, senet ya da faturanın tutar ağırlıklı ortalama vadesini gün ve tarih olarak bulun.",
  category: 'finans',
  keywords: ['ortalama vade hesaplama', 'çek ortalama vade', 'ağırlıklı ortalama vade', 'senet ortalama vade', 'fatura ortalama vade', 'ortalama vade tarihi', 'adat hesaplama'],
  lead: "Tutarları ve vadeleri farklı olan çek, senet ya da faturaları satır satır yazın; araç hepsinin yerine geçebilecek tek bir <strong>tutar ağırlıklı ortalama vadeyi</strong> gün olarak, başlangıç tarihi verdiğinizde <strong>ortalama vade tarihi</strong> olarak da hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'kalemler', label: 'Kalemler (her satıra: tutar ve vade)', type: 'textarea', wide: true, placeholder: '10000 30\n20000 60\n15000 15.04.2026', hint: 'Her satıra bir kalem yazın: önce tutar, boşluk, sonra vade. Vade gün sayısı (örn. 45) ya da tarih (GG.AA.YYYY) olabilir. Tutarda binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
    { id: 'baslangic', label: 'Başlangıç tarihi (boş = bugün)', type: 'date', hint: 'Gün sayılarının sayıldığı tarih. Vadeleri tarih olarak yazdıysanız gün farkı bu tarihe göre hesaplanır.' },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.kalemler);
    if (!satirlar.length) h.err('En az bir kalem yazın. Her satıra tutar ve vade girin (örn. 10000 30).');
    if (satirlar.length > 500) h.err('En fazla 500 kalem girilebilir.');
    const tarihMi = (t) => /^\d{1,2}[./]\d{1,2}[./]\d{4}$/.test(t) || /^\d{4}-\d{1,2}-\d{1,2}$/.test(t);
    const bosBas = String(v.baslangic ?? '').trim() === '';
    const bas = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    let toplam = 0, agirlik = 0, enAz = Infinity, enCok = -Infinity, tarihVar = false;
    satirlar.forEach((s, k) => {
      const p = s.split(/[\s;]+/).filter(Boolean);
      const no = k + 1;
      if (p.length !== 2) h.err(`${no}. satır anlaşılamadı. Her satırda yalnızca tutar ve vade olmalı (örn. 10000 30).`);
      const tutar = h.num(p[0], `${no}. satır tutarı`);
      if (!(tutar > 0)) h.err(`${no}. satırdaki tutar sıfırdan büyük olmalı.`);
      let gun;
      if (tarihMi(p[1])) {
        tarihVar = true;
        gun = h.gunFarki(bas, h.date(p[1], `${no}. satır vadesi`));
        if (gun < 0) h.err(`${no}. satırdaki vade tarihi başlangıç tarihinden önce. Başlangıç tarihini ya da vadeyi düzeltin.`);
      } else {
        gun = h.num(p[1], `${no}. satır vadesi`);
        if (gun < 0) h.err(`${no}. satırdaki vade günü negatif olamaz.`);
      }
      toplam += tutar;
      agirlik += tutar * gun;
      enAz = Math.min(enAz, gun);
      enCok = Math.max(enCok, gun);
    });
    const ort = agirlik / toplam;
    const rows = [['Ortalama vade', h.fmt(ort, 2) + ' gün']];
    if (!bosBas || tarihVar) rows.push(['Ortalama vade tarihi', h.fmtDate(h.gunEkle(bas, Math.round(ort + 1e-9)))]);
    rows.push(['Toplam tutar', h.para(toplam)]);
    rows.push(['Kalem sayısı', String(satirlar.length)]);
    rows.push(['En kısa ve en uzun vade', `${h.fmt(enAz, 2)} gün – ${h.fmt(enCok, 2)} gün`]);
    rows.push(['Tutar × gün toplamı', h.fmt(agirlik, 2)]);
    return { rows, note: 'Ortalama vade, tutar × gün toplamının toplam tutara bölümüdür. Ortalama vade tarihi en yakın tam güne yuvarlanır; hafta sonu ve resmî tatil kontrolü yapılmaz.' };
  },
  cases: [
    { in: { kalemler: '10000 30\n20000 60' }, out: { 'Ortalama vade': '50 gün', 'Toplam tutar': '30.000,00 TL', 'Kalem sayısı': '2', 'En kısa ve en uzun vade': '30 gün – 60 gün', 'Tutar × gün toplamı': '1.500.000' } },
    { in: { kalemler: '10000 31.01.2026\n10000 02.03.2026', baslangic: '2026-01-01' }, out: { 'Ortalama vade': '45 gün', 'Ortalama vade tarihi': '15.02.2026', 'Toplam tutar': '20.000,00 TL' } },
    { in: { kalemler: '1000 30\n1000 60\n1000 90' }, out: { 'Ortalama vade': '60 gün', 'Kalem sayısı': '3' } },
    { in: { kalemler: '20000 30\n10000 90', baslangic: '01.03.2026' }, out: { 'Ortalama vade': '50 gün', 'Ortalama vade tarihi': '20.04.2026' } },
    { in: { kalemler: '5000 0\n15000 40' }, out: { 'Ortalama vade': '30 gün', 'En kısa ve en uzun vade': '0 gün – 40 gün' } },
    { in: { kalemler: '1000 10\n2000 15' }, out: { 'Ortalama vade': '13,33 gün', 'Toplam tutar': '3.000,00 TL' } },
    { in: { kalemler: '1.500,50; 45' }, out: { 'Ortalama vade': '45 gün', 'Toplam tutar': '1.500,50 TL' } },
    { in: { kalemler: '' }, error: true },
    { in: { kalemler: '10000' }, error: true },
    { in: { kalemler: '-500 30' }, error: true },
    { in: { kalemler: '1000 01.01.2026', baslangic: '2026-02-01' }, error: true },
  ],
  howto: [
    'Her çek, senet ya da faturayı ayrı bir satıra yazın: önce tutar, bir boşluk, ardından vade.',
    'Vadeyi isterseniz gün sayısı olarak (örn. 45), isterseniz tarih olarak (örn. 15.04.2026) girin. Aynı listede ikisini birlikte kullanabilirsiniz.',
    'Gün sayılarının hangi tarihten itibaren sayıldığını "Başlangıç tarihi" alanına yazın; boş bırakırsanız bugünün tarihi alınır.',
    '"Hesapla" düğmesine basın. Ortalama vade gün olarak, başlangıç tarihi biliniyorsa tarih olarak da gösterilir.',
    'Sonucu "Sonucu kopyala" ile alıp teklifinize, mutabakat yazınıza ya da tablonuza ekleyin.',
  ],
  sections: [
    { h: 'Ortalama vade nedir?', p: [
      "Ortalama vade, tutarları ve vadeleri birbirinden farklı olan birden çok ödemenin, toplam tutarı tek seferde ödemeye eşdeğer olduğu ortak vadedir. Ticarette bir alıcı borcunu çoğu zaman tek bir çekle değil, farklı tarihlere yayılmış birkaç çek ya da senetle öder. Satıcı bu ödeme planının anlaştıkları vadeye uyup uymadığını görmek için hepsinin ağırlıklı ortalamasına bakar. Aynı hesap, vadeleri farklı faturaların toplu tahsilatında, cari hesap mutabakatında ve vade farkı faturası düzenlenirken de kullanılır.",
      "Burada önemli olan, ortalamanın <strong>tutarla ağırlıklandırılmasıdır</strong>. Vadelerin düz aritmetik ortalaması yanıltıcıdır: 1.000 TL'lik 30 günlük bir çek ile 100.000 TL'lik 120 günlük bir çekin ortalama vadesi 75 gün değil, yaklaşık 119 gündür; çünkü paranın neredeyse tamamı 120. günde tahsil edilecektir.",
    ] },
    { h: 'Hesaplama formülü', p: [
      "Her kalemin tutarı vadesine kalan gün sayısıyla çarpılır, bu çarpımlar toplanır ve toplam tutara bölünür: <strong>Ortalama vade (gün) = Σ (tutar × gün) ÷ Σ tutar</strong>. Muhasebe dilinde tutar × gün çarpımına <em>adat</em> denir; araç bu toplamı da ayrı bir satırda gösterir.",
      "Vadeler tarih olarak girildiğinde araç önce her tarihin başlangıç tarihine uzaklığını gün olarak bulur, sonra aynı formülü uygular. Ortalama vade tarihi, başlangıç tarihine ortalama gün sayısının eklenmesiyle elde edilir; küsuratlı sonuç en yakın tam güne yuvarlanır.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "<strong>Gün sayısıyla:</strong> 10.000 TL'lik 30 gün vadeli ve 20.000 TL'lik 60 gün vadeli iki çek alındığını düşünelim. Çarpımlar 10.000 × 30 = 300.000 ve 20.000 × 60 = 1.200.000'dir; toplamları 1.500.000 eder. Toplam tutar 30.000 TL olduğundan ortalama vade 1.500.000 ÷ 30.000 = <strong>50 gün</strong> bulunur. Düz ortalama 45 gün olurdu; büyük tutarlı çekin vadesi uzun olduğu için ağırlıklı ortalama 50 güne kayar.",
      "<strong>Tarihle:</strong> Başlangıç tarihi 01.01.2026 olsun. 10.000 TL'lik bir çekin vadesi 31.01.2026 (30 gün sonra), aynı tutardaki ikinci çekin vadesi 02.03.2026 (60 gün sonra) ise ortalama vade (10.000 × 30 + 10.000 × 60) ÷ 20.000 = 45 gündür. 1 Ocak'a 45 gün eklendiğinde ortalama vade tarihi <strong>15.02.2026</strong> olur.",
      "<strong>Küsuratlı sonuç:</strong> 1.000 TL 10 gün ve 2.000 TL 15 gün için ortalama (10.000 + 30.000) ÷ 3.000 = 13,33 gündür. Tarih gerektiğinde bu değer 13 güne yuvarlanır.",
    ] },
    { h: 'Ticari hayatta kullanım alanları', ul: [
      "<strong>Çekli ödeme kabulü:</strong> Müşterinin önerdiği çek dağılımının, anlaşılan vadeyi (örneğin 60 gün) aşıp aşmadığını kontrol etmek",
      "<strong>Ödeme planı hazırlama:</strong> Tedarikçiye verilecek çeklerin tutar ve tarihlerini, ortalama vade anlaşmaya uyacak biçimde ayarlamak",
      "<strong>Vade farkı hesabı:</strong> Ortalama vade anlaşılan vadeyi aşıyorsa aşan gün sayısı üzerinden vade farkı hesaplamak",
      "<strong>Çek kırdırma öncesi:</strong> Bir çek portföyünün ortalama vadesini bulup iskonto maliyetini tek bir vade üzerinden kabaca tahmin etmek",
      "<strong>Alacak takibi:</strong> Açık faturaların ortalama tahsil vadesini izleyerek nakit akışı planı yapmak",
    ] },
    { h: 'Sık yapılan hatalar', p: [
      "En yaygın hata, tutarları dikkate almadan vadelerin düz ortalamasını almaktır. İkinci hata, gün sayılarını farklı başlangıç tarihlerine göre saymaktır; bütün vadeler aynı tarihten, çoğunlukla fatura ya da teslim tarihinden itibaren sayılmalıdır. Üçüncü hata, başlangıç gününü de sayarak gün farkını bir gün fazla bulmaktır; araç iki tarih arasındaki farkı başlangıç günü hariç hesaplar, yani 1 Ocak ile 31 Ocak arası 30 gündür.",
      "Peşin ödenen kısım varsa onu da listeye vadesi 0 gün olan bir kalem olarak eklemelisiniz; aksi hâlde ortalama vade olduğundan uzun görünür. Örneğin 5.000 TL peşin ve 15.000 TL 40 gün vadeli ödemede ortalama vade 40 değil 30 gündür.",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Araç basit ağırlıklı ortalama hesaplar; faiz, iskonto ya da bileşik getiri içermez. Ortalama vade tarihinin hafta sonuna ya da resmî tatile denk gelip gelmediği kontrol edilmez. Vadesi başlangıç tarihinden önceye düşen kalemler kabul edilmez; gecikmiş alacaklar için başlangıç tarihini en eski vadeye çekebilirsiniz. Listeye en fazla 500 kalem girilebilir.",
      "Sonuçlar bilgilendirme amaçlıdır. Sözleşmeye bağlı vade farkı, gecikme faizi ve kambiyo senetlerine ilişkin hukuki süreler için sözleşmenizi ve güncel mevzuatı esas alın; gerekirse mali müşavirinize danışın.",
    ] },
  ],
  faq: [
    ['Ortalama vade nasıl hesaplanır?', "Her kalemin tutarı vade günüyle çarpılır, çarpımlar toplanır ve toplam tutara bölünür. 10.000 TL 30 gün ve 20.000 TL 60 gün için sonuç 1.500.000 ÷ 30.000 = 50 gündür."],
    ['Neden vadelerin düz ortalamasını alamıyorum?', "Çünkü tutarlar eşit değilse büyük tutarlı ödemenin vadesi nakit akışınızı daha çok etkiler. Düz ortalama yalnızca bütün tutarlar birbirine eşitken doğru sonuç verir."],
    ['Vadeyi tarih olarak girebilir miyim?', "Evet. Tutarın yanına GG.AA.YYYY biçiminde tarih yazabilirsiniz. Araç tarihin başlangıç tarihine uzaklığını gün olarak hesaplar. Aynı listede bazı satırlar gün, bazıları tarih olabilir."],
    ['Başlangıç tarihi olarak neyi seçmeliyim?', "Vadelerin sayılmaya başladığı tarihi: çoğunlukla fatura, teslim ya da çeklerin teslim alındığı tarihi. Boş bırakırsanız bugünün tarihi kullanılır."],
    ['Peşinatı nasıl eklerim?', "Peşin ödenen tutarı vadesi 0 olan bir satır olarak yazın, örneğin 5000 0. Böylece peşinat ortalamayı öne çeker ve sonuç gerçek ödeme planını yansıtır."],
    ['Ortalama vade tarihi tatile denk gelirse ne olur?', "Araç tatil kontrolü yapmaz, yalnızca takvim günü hesaplar. Uygulamada tarih bir sonraki iş gününe kaydırılabilir; bunu taraflar arasındaki anlaşmaya göre değerlendirin."],
    ['Farklı para birimlerindeki çekleri birlikte girebilir miyim?', "Hayır. Ağırlıklandırma tutara göre yapıldığı için bütün kalemler aynı para biriminde olmalıdır. Farklı para birimleri için ayrı ayrı hesap yapın ya da tutarları önce tek bir birime çevirin."],
    ['Girdiğim çek ve fatura bilgileri saklanıyor mu?', "Hayır. Liste yalnızca tarayıcınızda işlenir; tutarlar ve tarihler hiçbir sunucuya gönderilmez, kaydedilmez."],
  ],
  related: ['cek-senet-iskonto-hesapla', 'pesin-vadeli-karsilastir', 'gunluk-faiz-hesapla', 'iskonto-hesapla', 'alacak-devir-hizi-hesapla'],
};
