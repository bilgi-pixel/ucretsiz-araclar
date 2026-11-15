export default {
  slug: 'isi-enerjisi-hesapla',
  title: 'Isı Enerjisi Hesaplama (Q = m·c·ΔT)',
  h1Tail: 'öz ısı ile',
  pageTitle: 'Isı Enerjisi Hesaplama – Q = m·c·ΔT ile Isı, Kütle, Öz Isı, Sıcaklık',
  description: 'Q = m·c·ΔT formülüyle bir maddeyi ısıtmak için gereken ısıyı hesaplayın; ısıdan kütleyi, öz ısıyı ya da son sıcaklığı bulun. Sonuç J, kJ, kcal ve kWh olarak verilir.',
  card: 'Kütle, öz ısı ve sıcaklık farkından gereken ısıyı bulun; ya da ısıdan kütleyi, öz ısıyı, son sıcaklığı hesaplayın.',
  category: 'bilim',
  keywords: ['ısı enerjisi hesaplama', 'Q = mcΔT', 'öz ısı hesaplama', 'ısı formülü', 'suyu ısıtmak için gereken enerji', 'ısı miktarı hesaplama', 'kalori joule ısı', 'son sıcaklık hesaplama'],
  lead: 'Hâl değiştirmeyen bir maddenin sıcaklığını değiştirmek için alınan ya da verilen ısı <strong>Q = m · c · ΔT</strong> bağıntısıyla bulunur. Kütleyi, öz ısıyı ve sıcaklıkları yazın; sonuç joule, kilojoule, kilokalori ve kilovatsaat olarak gösterilsin.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['isi', 'Isı enerjisi (Q)'], ['kutle', 'Kütle (m)'], ['ozIsi', 'Öz ısı (c)'], ['son', 'Son sıcaklık']] },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 2', hint: '500 g için 0,5 yazın. Aranıyorsa boş bırakın.' },
    { id: 'ozIsi', label: 'Öz ısı (J/kg·°C)', type: 'number', value: '4186', hint: 'Su için yaklaşık 4186. Aranıyorsa dikkate alınmaz.' },
    { id: 'ilk', label: 'İlk sıcaklık (°C)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'son', label: 'Son sıcaklık (°C)', type: 'number', placeholder: 'Örn. 80', hint: 'Aranıyorsa boş bırakın.' },
    { id: 'isi', label: 'Isı enerjisi (J)', type: 'number', placeholder: 'Örn. 502320', hint: 'Madde ısı veriyorsa (soğuyorsa) eksi yazın. Isı aranıyorsa boş bırakın.' },
  ],
  compute(v, h) {
    let m, c, t1, t2, Q;
    t1 = h.num(v.ilk, 'İlk sıcaklık');
    if (v.bul === 'kutle') {
      c = h.pos(v.ozIsi, 'Öz ısı'); t2 = h.num(v.son, 'Son sıcaklık'); Q = h.num(v.isi, 'Isı enerjisi');
      if (t2 === t1) h.err('İlk ve son sıcaklık aynı; sıcaklık değişmediği için kütle hesaplanamaz.');
      m = Q / (c * (t2 - t1));
      if (!(m > 0)) h.err('Isının işareti sıcaklık değişimiyle uyuşmuyor: ısınma için artı, soğuma için eksi ısı yazın.');
    } else if (v.bul === 'ozIsi') {
      m = h.pos(v.kutle, 'Kütle'); t2 = h.num(v.son, 'Son sıcaklık'); Q = h.num(v.isi, 'Isı enerjisi');
      if (t2 === t1) h.err('İlk ve son sıcaklık aynı; sıcaklık değişmediği için öz ısı hesaplanamaz.');
      c = Q / (m * (t2 - t1));
      if (!(c > 0)) h.err('Isının işareti sıcaklık değişimiyle uyuşmuyor: ısınma için artı, soğuma için eksi ısı yazın.');
    } else if (v.bul === 'son') {
      m = h.pos(v.kutle, 'Kütle'); c = h.pos(v.ozIsi, 'Öz ısı'); Q = h.num(v.isi, 'Isı enerjisi');
      t2 = t1 + Q / (m * c);
    } else {
      m = h.pos(v.kutle, 'Kütle'); c = h.pos(v.ozIsi, 'Öz ısı'); t2 = h.num(v.son, 'Son sıcaklık');
      Q = m * c * (t2 - t1);
    }
    if (t1 < -273.15 || t2 < -273.15) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz.');
    const dT = t2 - t1;
    const qS = ['Isı enerjisi', h.fmt(Q, 2) + ' J'];
    const mS = ['Kütle', h.fmt(m, 4) + ' kg'];
    const cS = ['Öz ısı', h.fmt(c, 2) + ' J/kg·°C'];
    const sS = ['Son sıcaklık', h.fmt(t2, 2) + ' °C'];
    const ilk = v.bul === 'kutle' ? [mS, qS] : v.bul === 'ozIsi' ? [cS, qS] : v.bul === 'son' ? [sS, qS] : [qS];
    let durum;
    if (Math.abs(Q) < 1e-12) durum = 'Isı alışverişi yok';
    else if (Q > 0) durum = 'Madde ısı alır (ısınma)';
    else durum = 'Madde ısı verir (soğuma)';
    return {
      rows: [
        ...ilk,
        ['Isı (kJ)', h.fmt(Q / 1000, 3) + ' kJ'],
        ['Isı (kcal)', h.fmt(Q / 4184, 2) + ' kcal'],
        ['Isı (kWh)', h.fmt(Q / 3.6e6, 4) + ' kWh'],
        ['Sıcaklık değişimi', h.fmt(dT, 2) + ' °C'],
        ['Isı sığası (m·c)', h.fmt(m * c, 2) + ' J/°C'],
        ['Durum', durum],
      ],
      note: 'Hâl değişimi olmadığı ve öz ısının sıcaklık aralığında sabit kaldığı varsayılır. 1 kcal = 4184 J, 1 kWh = 3.600.000 J.',
    };
  },
  cases: [
    { in: { bul: 'isi', kutle: '2', ozIsi: '4186', ilk: '20', son: '80' }, out: { 'Isı enerjisi': '502.320 J', 'Isı (kJ)': '502,32 kJ', 'Isı (kcal)': '120,06 kcal', 'Isı (kWh)': '0,1395 kWh', 'Durum': 'Madde ısı alır (ısınma)' } },
    { in: { bul: 'ozIsi', kutle: '0,2', ilk: '20', son: '120', isi: '9000' }, out: { 'Öz ısı': '450 J/kg·°C', 'Sıcaklık değişimi': '100 °C' } },
    { in: { bul: 'isi', kutle: '0,5', ozIsi: '900', ilk: '25', son: '125' }, out: { 'Isı enerjisi': '45.000 J', 'Isı (kJ)': '45 kJ', 'Isı sığası (m·c)': '450 J/°C' } },
    { in: { bul: 'kutle', ozIsi: '4186', ilk: '10', son: '30', isi: '83720' }, out: { 'Kütle': '1 kg' } },
    { in: { bul: 'son', kutle: '1', ozIsi: '4186', ilk: '20', isi: '41860' }, out: { 'Son sıcaklık': '30 °C', 'Sıcaklık değişimi': '10 °C' } },
    { in: { bul: 'isi', kutle: '1', ozIsi: '4186', ilk: '90', son: '40' }, out: { 'Isı enerjisi': '-209.300 J', 'Durum': 'Madde ısı verir (soğuma)' } },
    { in: { bul: 'isi', kutle: '3', ozIsi: '4186', ilk: '25', son: '25' }, out: { 'Isı enerjisi': '0 J', 'Durum': 'Isı alışverişi yok' } },
    { in: { bul: 'isi', kutle: '-2', ozIsi: '4186', ilk: '20', son: '80' }, error: true },
    { in: { bul: 'kutle', ozIsi: '4186', ilk: '30', son: '30', isi: '1000' }, error: true },
    { in: { bul: 'isi', kutle: '2', ozIsi: '4186', ilk: '', son: '80' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden ısıyı mı, kütleyi mi, öz ısıyı mı, yoksa son sıcaklığı mı hesaplayacağınızı seçin.',
    'Kütleyi kilogram olarak yazın. Gram olarak biliyorsanız 1000\'e bölün: 250 g = 0,25 kg.',
    'Öz ısı alanı su için dolu gelir. Başka bir madde için sorunuzda ya da tablonuzda verilen değeri J/kg·°C biriminde girin. Değer cal/g·°C olarak verilmişse 4184 ile çarpın.',
    'İlk ve son sıcaklığı santigrat derece olarak yazıp "Hesapla" düğmesine basın. Sonuç joule ile birlikte kJ, kcal ve kWh karşılıklarıyla, ısınma ya da soğuma bilgisiyle listelenir.',
  ],
  sections: [
    { h: 'Isı, sıcaklık ve öz ısı', p: [
      '<strong>Sıcaklık</strong> bir maddenin taneciklerinin ortalama hareket enerjisinin göstergesidir ve termometreyle ölçülür. <strong>Isı</strong> ise sıcaklık farkı nedeniyle bir cisimden diğerine aktarılan enerjidir; birimi joule\'dür. İkisi sık karıştırılır: bir bardak kaynar su ile bir kazan ılık suyu düşünün; bardaktaki suyun sıcaklığı yüksektir, ama kazandaki suyun taşıdığı ısıl enerji çok daha fazladır.',
      '<strong>Öz ısı</strong> (c), bir maddenin 1 kilogramının sıcaklığını 1 °C artırmak için gereken ısı miktarıdır ve maddeye özgü ayırt edici bir özelliktir. Öz ısısı büyük olan madde geç ısınır, geç soğur. Suyun öz ısısı gündelik maddelerin çoğundan yüksektir; denizlerin kıyı iklimini yumuşatması, kalorifer tesisatında ve motor soğutmasında su kullanılması bu yüzdendir. Kütle ile öz ısının çarpımına <strong>ısı sığası</strong> denir ve cismin tamamının sıcaklığını 1 °C değiştirmek için gereken ısıyı verir.',
    ] },
    { h: 'Q = m · c · ΔT formülü', p: [
      'Bağıntıda Q alınan ya da verilen ısı (J), m kütle (kg), c öz ısı (J/kg·°C) ve ΔT sıcaklık değişimidir: ΔT = son sıcaklık − ilk sıcaklık. Sıcaklık artıyorsa ΔT ve Q artı çıkar, madde ısı almıştır. Sıcaklık düşüyorsa ikisi de eksidir, madde çevresine ısı vermiştir.',
      'Formül diğer büyüklükler için de çözülebilir: m = Q ÷ (c · ΔT), c = Q ÷ (m · ΔT) ve son sıcaklık = ilk sıcaklık + Q ÷ (m · c). Sıcaklık farkı santigrat ve kelvin ölçeklerinde aynı büyüklükte olduğundan öz ısının J/kg·°C ya da J/kg·K olarak verilmesi sonucu değiştirmez.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 2 kg suyu 20 °C\'den 80 °C\'ye ısıtmak için gereken ısı, c = 4186 J/kg·°C alınarak Q = 2 × 4186 × (80 − 20) = 2 × 4186 × 60 = 502.320 J\'dür. Bu 502,32 kJ, yaklaşık 120,06 kcal ve yaklaşık 0,1395 kWh eder. Kayıpsız çalışan 2000 watt\'lık bir ısıtıcı bu enerjiyi yaklaşık 251 saniyede, yani dört dakikadan biraz uzun sürede verir.',
      '<strong>Örnek 2 (öz ısı bulma):</strong> 200 gramlık bir metal parçası 9000 J ısı aldığında sıcaklığı 20 °C\'den 120 °C\'ye çıkıyor. c = 9000 ÷ (0,2 × 100) = 450 J/kg·°C bulunur; bu değer demirin öz ısısına yakındır.',
      '<strong>Örnek 3 (soğuma):</strong> 1 kg su 90 °C\'den 40 °C\'ye soğurken Q = 1 × 4186 × (40 − 90) = −209.300 J olur. Eksi işaret suyun çevresine 209,3 kJ ısı verdiğini gösterir.',
      '<strong>Örnek 4 (son sıcaklık):</strong> 20 °C\'deki 1 kg suya 41.860 J ısı verilirse sıcaklık artışı 41.860 ÷ (1 × 4186) = 10 °C, son sıcaklık 30 °C olur.',
    ] },
    { h: 'Bazı maddelerin yaklaşık öz ısıları', ul: [
      '<strong>Su:</strong> yaklaşık 4186 J/kg·°C (1 cal/g·°C)',
      '<strong>Buz:</strong> yaklaşık 2100 J/kg·°C',
      '<strong>Alüminyum:</strong> yaklaşık 900 J/kg·°C',
      '<strong>Demir:</strong> yaklaşık 450 J/kg·°C',
      '<strong>Bakır:</strong> yaklaşık 385 J/kg·°C',
      '<strong>Kurşun:</strong> yaklaşık 130 J/kg·°C',
    ], p: [
      'Bu sayılar oda sıcaklığı dolayındaki tipik yaklaşık değerlerdir; kaynaklar arasında küçük farklar bulunur ve öz ısı sıcaklıkla bir miktar değişir. Ödev ve sınav sorularında soruda verilen değeri kullanın. Okul kitaplarında su için çoğu zaman 4200 J/kg·°C ya da 4,18 J/g·°C yuvarlamaları da görülür.',
    ] },
    { h: 'Birim dönüşümleri', p: [
      'Isı için joule dışında kalori ve kilovatsaat de kullanılır. Bu araç termokimyasal kaloriyi esas alır: 1 cal = 4,184 J ve 1 kcal = 4184 J. Besin etiketlerindeki "kalori" aslında kilokaloridir. Elektrik faturalarındaki birim olan kilovatsaat ise 3.600.000 J\'dür; elektrikli su ısıtıcısı, şofben ya da kombi için kaba bir enerji tahmini yaparken kWh satırı işinize yarar. Öz ısı cal/g·°C olarak verildiyse 4184 ile, J/g·°C olarak verildiyse 1000 ile çarparak J/kg·°C\'ye çevirin.',
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', p: [
      'Formül yalnızca madde <strong>hâl değiştirmediği</strong> sürece geçerlidir. Buz erirken ya da su kaynarken sıcaklık sabit kalır ve alınan ısı Q = m · L (erime ya da buharlaşma ısısı) ile hesaplanır. −10 °C\'deki buzu 110 °C\'de buhara dönüştürmek gibi sorularda her aşama ayrı ayrı hesaplanıp toplanmalıdır; bu araç tek aşamayı hesaplar ve hâl değişimini denetlemez.',
      'Sık yapılan hatalar: kütleyi gram olarak girip öz ısıyı J/kg·°C almak, ΔT yerine yalnızca son sıcaklığı kullanmak ve farklı maddenin öz ısısını yazmak. Gerçek uygulamalarda kap da ısınır ve çevreye ısı kaçar; bu yüzden pratikte gereken enerji hesaplanandan fazladır. Sonuçlar eğitim ve ön tahmin amaçlıdır; ısıtma sistemi boyutlandırması gibi işler için mühendislik hesabı gerekir.',
    ] },
  ],
  faq: [
    ['Isı enerjisi nasıl hesaplanır?', 'Q = m · c · ΔT formülüyle: kütle, öz ısı ve sıcaklık değişimi çarpılır. 2 kg suyu 20 °C\'den 80 °C\'ye ısıtmak için 2 × 4186 × 60 = 502.320 J gerekir.'],
    ['Öz ısı nedir?', 'Bir maddenin 1 kilogramının sıcaklığını 1 °C artırmak için gereken ısı miktarıdır. Maddeye özgüdür; suyunki yaklaşık 4186 J/kg·°C, demirinki yaklaşık 450 J/kg·°C\'dir.'],
    ['Isı ile sıcaklık arasındaki fark nedir?', 'Sıcaklık taneciklerin ortalama hareket enerjisinin ölçüsüdür ve derece ile ifade edilir. Isı ise sıcaklık farkından dolayı aktarılan enerjidir ve joule ile ölçülür. Aynı sıcaklıktaki büyük kütle daha fazla ısıl enerji taşır.'],
    ['Sonuç eksi çıkarsa ne anlama gelir?', 'Son sıcaklık ilk sıcaklıktan düşük demektir; madde soğumuş ve çevresine ısı vermiştir. Büyüklük olarak verilen ısı, sonucun mutlak değeridir.'],
    ['Öz ısı ile ısı sığası aynı şey mi?', 'Hayır. Öz ısı birim kütle içindir ve maddeye özgüdür. Isı sığası ise cismin tamamı içindir ve kütle ile öz ısının çarpımına eşittir; aynı maddeden yapılmış büyük cismin ısı sığası daha büyüktür.'],
    ['1 litre suyu kaynatmak için ne kadar enerji gerekir?', '1 litre su yaklaşık 1 kg\'dır. 20 °C\'den 100 °C\'ye ısıtmak için 1 × 4186 × 80 = 334.880 J, yani yaklaşık 0,093 kWh gerekir. Bu yalnızca suyu kaynama sıcaklığına getirir; buharlaştırmak için ayrıca ısı gerekir.'],
    ['Hâl değişimi sırasında bu formül kullanılır mı?', 'Hayır. Erime, donma, kaynama gibi hâl değişimlerinde sıcaklık değişmez; ısı Q = m · L ile hesaplanır. Q = m · c · ΔT yalnızca sıcaklığın değiştiği aşamalarda geçerlidir.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız kütle, sıcaklık ve enerji değerleri sunucuya gönderilmez.'],
  ],
  related: ['isil-genlesme-hesapla', 'ideal-gaz-denklemi-hesapla', 'guc-hesapla', 'kinetik-enerji-hesapla', 'verim-hesapla'],
};
