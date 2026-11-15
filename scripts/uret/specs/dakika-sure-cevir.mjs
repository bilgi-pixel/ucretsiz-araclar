export default {
  slug: 'dakika-sure-cevir',
  title: 'Dakikayı Gün Saat Dakikaya Çevirme',
  h1Tail: 'dakika → gün, saat, dakika',
  pageTitle: "Dakikayı Gün Saat Dakikaya Çevirme – Kaç Dakika Kaç Saat Eder?",
  description: "Dakika cinsinden bir süreyi gün, saat ve dakikaya çevirin. Ondalık saat, ondalık gün, hafta ve saniye karşılıklarını da tek ekranda görün.",
  card: "Toplam dakikayı gün, saat ve dakikaya ayırın; ondalık saat, gün, hafta ve saniye karşılığını birlikte görün.",
  category: 'zaman',
  keywords: ['dakika saat çevirme', 'dakikayı saate çevirme', 'kaç dakika kaç saat', 'dakika gün çevirme', '1000 dakika kaç saat', 'dakika hesaplama', 'dakikayı güne çevirme'],
  lead: "Dakika olarak bildiğiniz bir süreyi <strong>gün, saat ve dakika</strong> olarak okunur hâle getirin. Araç aynı süreyi ondalık saat, ondalık gün, hafta ve saniye olarak da verir; böylece puantaj, fatura ya da plan tablosunda hangi biçim gerekiyorsa onu alırsınız.",
  button: 'Çevir',
  inputs: [
    { id: 'dakika', label: 'Süre (dakika)', type: 'number', placeholder: 'Örn. 1500', hint: 'Ondalıklı yazabilirsiniz (örn. 45,5). Binlik ayraç kullanmayın.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.dakika, 'Süre (dakika)');
    if (x > 1e12) h.err('Süre çok büyük; en fazla 1.000.000.000.000 dakika yazın.');
    const gun = Math.floor(x / 1440 + 1e-9);
    const kalan = Math.max(0, x - gun * 1440);
    const saat = Math.floor(kalan / 60 + 1e-9);
    const dk = Math.max(0, kalan - saat * 60);
    const topSaat = Math.floor(x / 60 + 1e-9);
    const topDk = Math.max(0, x - topSaat * 60);
    const dkTam = Math.floor(topDk + 1e-9);
    const sn = Math.round((topDk - dkTam) * 60);
    const iki = (n) => String(n).padStart(2, '0');
    let ss = topSaat, dd = dkTam, sx = sn;
    if (sx === 60) { sx = 0; dd += 1; }
    if (dd === 60) { dd = 0; ss += 1; }
    return {
      rows: [
        ['Gün, saat, dakika', `${h.fmt(gun, 0)} gün ${saat} saat ${h.fmt(dk, 2)} dakika`],
        ['Saat ve dakika', `${h.fmt(topSaat, 0)} saat ${h.fmt(topDk, 2)} dakika`],
        ['Saat biçimi (SS:DD:SN)', `${iki(ss)}:${iki(dd)}:${iki(sx)}`],
        ['Ondalık saat', h.fmt(x / 60, 4) + ' saat'],
        ['Ondalık gün', h.fmt(x / 1440, 4) + ' gün'],
        ['Hafta', h.fmt(x / 10080, 4) + ' hafta'],
        ['Saniye', h.fmt(x * 60, 2) + ' saniye'],
      ],
      note: '1 saat = 60 dakika, 1 gün = 24 saat = 1.440 dakika, 1 hafta = 10.080 dakika kabul edilir.',
    };
  },
  cases: [
    { in: { dakika: '1500' }, out: { 'Gün, saat, dakika': '1 gün 1 saat 0 dakika', 'Saat ve dakika': '25 saat 0 dakika', 'Ondalık saat': '25 saat', 'Ondalık gün': '1,0417 gün', 'Saat biçimi (SS:DD:SN)': '25:00:00' } },
    { in: { dakika: '90' }, out: { 'Gün, saat, dakika': '0 gün 1 saat 30 dakika', 'Ondalık saat': '1,5 saat', 'Saniye': '5.400 saniye' } },
    { in: { dakika: '10080' }, out: { 'Gün, saat, dakika': '7 gün 0 saat 0 dakika', 'Hafta': '1 hafta', 'Saat ve dakika': '168 saat 0 dakika' } },
    { in: { dakika: '100000' }, out: { 'Gün, saat, dakika': '69 gün 10 saat 40 dakika', 'Saniye': '6.000.000 saniye' } },
    { in: { dakika: '45,5' }, out: { 'Gün, saat, dakika': '0 gün 0 saat 45,5 dakika', 'Saat biçimi (SS:DD:SN)': '00:45:30', 'Saniye': '2.730 saniye' } },
    { in: { dakika: '0' }, out: { 'Gün, saat, dakika': '0 gün 0 saat 0 dakika' } },
    { in: { dakika: '1440' }, out: { 'Gün, saat, dakika': '1 gün 0 saat 0 dakika', 'Ondalık gün': '1 gün' } },
    { in: { dakika: '-30' }, error: true },
    { in: { dakika: 'iki saat' }, error: true },
  ],
  howto: [
    '"Süre (dakika)" alanına çevirmek istediğiniz toplam dakikayı yazın. Yarım dakika gibi kesirli değerler için virgül kullanabilirsiniz.',
    '"Çevir" düğmesine basın.',
    'İlk satırda sürenin gün, saat ve dakika olarak ayrılmış hâlini, ikinci satırda günlere bölünmemiş saat ve dakika karşılığını okuyun.',
    'Tabloya ya da hesap makinesine aktaracaksanız ondalık saat ya da ondalık gün satırını kullanın; "Sonucu kopyala" düğmesi tüm satırları panoya alır.',
  ],
  sections: [
    { h: 'Dakika güne ve saate nasıl çevrilir?', p: [
      "Zaman birimleri onluk değil, altmışlık ve yirmi dörtlük basamaklarla ilerler. Bu yüzden dakikayı saate çevirirken virgülü kaydırmak yetmez; bölme ve kalan işlemi gerekir. Kural şudur: toplam dakikayı <strong>1.440</strong>'a bölün, bölüm gün sayısıdır. Kalan dakikayı <strong>60</strong>'a bölün, bölüm saat, kalan ise dakikadır.",
      "Kâğıt üzerinde bu iki adımlı bölme kolayca şaşırtır; özellikle kalan hesabında. Araç aynı işlemi yapar, ayrıca sonucu günlere ayırmadan yalnızca saat ve dakika olarak da gösterir. İkisi de doğrudur; hangisini kullanacağınız nereye yazacağınıza bağlıdır.",
    ] },
    { h: 'Çözümlü örnek: 1.500 dakika', p: [
      "1.500 dakikalık bir süreyi ele alalım. 1.500 ÷ 1.440 işleminin bölümü 1, kalanı 60'tır; yani 1 tam gün ve 60 dakika. Kalan 60 dakika ise tam 1 saattir, geriye dakika kalmaz. Sonuç: <strong>1 gün 1 saat 0 dakika</strong>. Günlere ayırmadan söylemek isterseniz 1.500 ÷ 60 = 25 saat eder. Ondalık gün karşılığı 1.500 ÷ 1.440 = 1,0417 gündür.",
      "İkinci bir örnek: 100.000 dakika. 100.000 ÷ 1.440 işleminin bölümü 69'dur (69 × 1.440 = 99.360). Kalan 640 dakika, 10 saat 40 dakika eder. Demek ki 100.000 dakika <strong>69 gün 10 saat 40 dakikadır</strong>; bu da iki aydan biraz uzun bir süredir.",
    ] },
    { h: 'Ondalık saat ile saat:dakika aynı şey değildir', p: [
      "En sık yapılan hata, ondalık saati saat ve dakika gibi okumaktır. <strong>1,5 saat</strong> bir saat elli dakika değil, bir saat otuz dakikadır; çünkü virgülden sonraki kısım saatin onda kaçı olduğunu gösterir. Tersine, 1 saat 45 dakika 1,45 saat değil 1,75 saattir.",
      "Ücret hesabı, kilometre başına süre ya da ortalama alma gibi çarpma-bölme gerektiren işlerde ondalık saat kullanılır. İnsanlara söylenecek, takvime yazılacak sürelerde ise saat ve dakika biçimi tercih edilir. Araç ikisini yan yana verdiği için dönüşümü ayrıca yapmanız gerekmez.",
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      "<strong>Puantaj ve mesai:</strong> Kart okuyucular ve bazı personel programları çalışmayı dakika olarak toplar. Ay sonunda 10.350 dakika gibi bir toplamı saat karşılığına çevirmek için kullanılır.",
      "<strong>Telefon ve internet paketleri:</strong> Faturadaki ya da paketteki dakika toplamının kaç saat konuşma anlamına geldiğini görmek için.",
      "<strong>Video ve dizi süreleri:</strong> Bir dizinin tüm bölümlerinin toplam dakikasını yazıp aralıksız izlemenin kaç gün süreceğini bulabilirsiniz.",
      "<strong>Makine ve üretim planı:</strong> Çevrim süreleri dakika olarak verilen işlerde toplam üretim süresini vardiya ve gün olarak ifade etmek için.",
      "<strong>Yolculuk ve uçuş:</strong> Navigasyon ya da bilet üzerindeki 385 dakika gibi süreleri 6 saat 25 dakika biçiminde okumak için.",
      "<strong>Sınav ve ders planı:</strong> Dakika olarak verilen toplam çalışma hedefini güne ve saate bölmek için.",
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>60 dakika</strong> = 1 saat',
      '<strong>90 dakika</strong> = 1 saat 30 dakika = 1,5 saat',
      '<strong>480 dakika</strong> = 8 saat (tipik bir iş günü)',
      '<strong>1.000 dakika</strong> = 16 saat 40 dakika',
      '<strong>1.440 dakika</strong> = 1 gün',
      '<strong>2.880 dakika</strong> = 2 gün',
      '<strong>10.000 dakika</strong> = 6 gün 22 saat 40 dakika',
      '<strong>10.080 dakika</strong> = 1 hafta',
      '<strong>43.200 dakika</strong> = 30 gün',
      '<strong>525.600 dakika</strong> = 365 gün',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      "Buradaki gün, 24 saatlik takvim günüdür. Sonucu <em>iş günü</em> olarak yorumlamak isterseniz ondalık saat değerini günlük çalışma saatinize bölmeniz gerekir; örneğin 1.500 dakika 25 saattir ve günde 8 saatlik çalışmayla 3 iş gününden biraz fazla eder.",
      "Araç ay ve yıl karşılığı vermez, çünkü ayların uzunluğu 28 ile 31 gün arasında değişir ve tek bir kesin karşılık yoktur. Yaz saati geçişi, artık saniye gibi takvim ayrıntıları da hesaba girmez; yalnızca süre aritmetiği yapılır. Kesirli dakikalarda saat biçimi satırı en yakın saniyeye yuvarlanır.",
    ] },
  ],
  faq: [
    ['1.000 dakika kaç saat eder?', '1.000 dakika 16 saat 40 dakikadır. Ondalık olarak yaklaşık 16,67 saat eder. Hesap 1.000 ÷ 60 işlemiyle yapılır; bölüm 16, kalan 40 dakikadır.'],
    ['Bir günde kaç dakika vardır?', 'Bir gün 24 saat, her saat 60 dakika olduğundan bir günde 24 × 60 = 1.440 dakika vardır. Bir haftada 10.080, 365 günlük bir yılda 525.600 dakika bulunur.'],
    ['Dakikayı ondalık saate nasıl çeviririm?', 'Dakikayı 60\'a bölmeniz yeterlidir. 45 dakika 0,75 saat, 20 dakika yaklaşık 0,3333 saat, 150 dakika 2,5 saat eder. Araç bu değeri "Ondalık saat" satırında dört basamağa kadar gösterir.'],
    ['Kesirli dakika yazabilir miyim?', 'Evet. 45,5 yazdığınızda araç bunu 45 dakika 30 saniye olarak yorumlar; saat biçimi satırında 00:45:30, saniye satırında 2.730 saniye görürsünüz.'],
    ['Sonuçta neden hem "gün, saat, dakika" hem "saat ve dakika" var?', 'Uzun süreler gün olarak daha kolay anlaşılır, ancak mesai ve fatura gibi alanlarda süre 24 saati geçse bile saat olarak yazılır. 1.500 dakika için birinci satır 1 gün 1 saat, ikinci satır 25 saat gösterir; ikisi aynı süredir.'],
    ['Saat ve dakikayı tekrar dakikaya nasıl çeviririm?', 'Gün sayısını 1.440 ile, saat sayısını 60 ile çarpıp dakikayı ekleyin. 2 gün 3 saat 15 dakika için 2 × 1.440 + 3 × 60 + 15 = 3.075 dakika bulunur. Bu değeri araca yazarak sağlamasını yapabilirsiniz.'],
    ['Sonuç iş günü olarak mı veriliyor?', 'Hayır, gün 24 saatlik takvim günüdür. İş günü karşılığı için ondalık saat değerini günlük çalışma sürenize bölün; 8 saatlik düzende 2.400 dakika (40 saat) beş iş günü eder.'],
    ['Yazdığım süre bir yere kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['saniye-sure-cevir', 'sure-toplama', 'sure-bolme-carpma', 'calisma-suresi-hesapla', '12-24-saat-cevir'],
};
