export default {
  slug: 'hisse-ortalama-maliyet-hesapla',
  title: 'Hisse Ortalama Maliyet Hesaplama',
  h1Tail: 'kademeli alımlar için',
  pageTitle: 'Hisse Ortalama Maliyet Hesaplama – Kademeli Alım Maliyeti',
  description: 'Farklı fiyatlardan yaptığınız hisse alımlarını adet ve fiyat olarak yazın; ağırlıklı ortalama maliyeti, toplam tutarı ve güncel fiyata göre kâr zararı hesaplayın.',
  card: 'Farklı fiyatlardan alınan hisselerin ağırlıklı ortalama maliyetini ve güncel fiyata göre kâr/zararını bulun.',
  category: 'finans',
  keywords: ['hisse ortalama maliyet hesaplama', 'ortalama düşürme hesaplama', 'hisse maliyet hesaplama', 'ağırlıklı ortalama maliyet', 'kademeli alım maliyeti', 'lot maliyet hesaplama', 'hisse kâr zarar hesaplama'],
  lead: 'Aynı hisseyi farklı günlerde, farklı fiyatlardan aldıysanız elinizdeki payların gerçek maliyeti bu fiyatların düz ortalaması değildir. Alımlarınızı adet ve fiyat olarak alt alta yazın; araç <strong>ağırlıklı ortalama maliyeti</strong> hesaplar, güncel fiyatı girerseniz kâr ya da zararınızı da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alimlar', label: 'Alımlar (her satıra: adet fiyat)', type: 'textarea', placeholder: '100 50\n50 40\n50 30', hint: 'Her satıra bir alım yazın: önce adet, sonra birim fiyat. Arayı boşlukla ayırın; binlik ayırıcı kullanmayın, ondalık için virgül yazın.', wide: true },
    { id: 'komisyon', label: 'Alım komisyonu (%, isteğe bağlı)', type: 'number', placeholder: 'Örn. 0,2', hint: 'Aracı kurumunuzun işlem tutarı üzerinden aldığı oran.' },
    { id: 'guncel', label: 'Güncel fiyat (isteğe bağlı)', type: 'number', placeholder: 'Örn. 45', hint: 'Yazarsanız kâr/zarar durumu da hesaplanır.' },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.alimlar);
    if (!satirlar.length) h.err('"Alımlar" alanına en az bir alım yazın (örn. 100 50).');
    if (satirlar.length > 500) h.err('En fazla 500 alım satırı girebilirsiniz.');
    const bos = (s) => String(s ?? '').trim() === '';
    const kom = bos(v.komisyon) ? 0 : h.nonneg(v.komisyon, 'Alım komisyonu');
    if (kom >= 100) h.err('"Alım komisyonu" %100\'den küçük olmalı.');
    const guncel = bos(v.guncel) ? null : h.nonneg(v.guncel, 'Güncel fiyat');
    let adet = 0, tutar = 0;
    satirlar.forEach((s, i) => {
      const p = s.split(/[\s;xX*×]+/).filter(Boolean);
      if (p.length !== 2) h.err((i + 1) + '. satırda tam iki değer olmalı: adet ve fiyat (örn. 100 50).');
      const a = h.pos(p[0], (i + 1) + '. satır adet');
      const f = h.pos(p[1], (i + 1) + '. satır fiyat');
      adet += a;
      tutar += a * f;
    });
    const komTutar = tutar * kom / 100;
    const maliyet = tutar + komTutar;
    const ort = maliyet / adet;
    const rows = [
      ['Ortalama maliyet', h.fmt(ort, 4) + ' TL'],
      ['Toplam adet', h.fmt(adet, 4)],
      ['Toplam maliyet', h.para(maliyet)],
      ['Alım sayısı', String(satirlar.length)],
    ];
    if (kom > 0) rows.push(['Ödenen komisyon', h.para(komTutar)]);
    if (guncel !== null) {
      const deger = adet * guncel;
      const kz = deger - maliyet;
      const oran = (kz / maliyet) * 100;
      const t = h.fmt(Math.abs(oran), 2);
      rows.push(['Güncel değer', h.para(deger)]);
      rows.push(['Kâr/zarar', h.para(kz)]);
      rows.push(['Kâr/zarar oranı', (oran < 0 && t !== '0' ? '-%' : '%') + t]);
    }
    return { rows, note: 'Ortalama maliyet = toplam ödenen tutar ÷ toplam adet. Satış komisyonu ve vergiler kâr/zarar hesabına dahil değildir.' };
  },
  cases: [
    { in: { alimlar: '100 10\n100 20' }, out: { 'Ortalama maliyet': '15 TL', 'Toplam adet': '200', 'Toplam maliyet': '3.000,00 TL' } },
    { in: { alimlar: '100 50\n50 40\n50 30', guncel: '45' }, out: { 'Ortalama maliyet': '42,5 TL', 'Toplam maliyet': '8.500,00 TL', 'Güncel değer': '9.000,00 TL', 'Kâr/zarar': '500,00 TL', 'Kâr/zarar oranı': '%5,88' } },
    { in: { alimlar: '1000 10', komisyon: '0,2' }, out: { 'Ortalama maliyet': '10,02 TL', 'Ödenen komisyon': '20,00 TL', 'Toplam maliyet': '10.020,00 TL' } },
    { in: { alimlar: '100 10\n100 20', guncel: '18' }, out: { 'Güncel değer': '3.600,00 TL', 'Kâr/zarar': '600,00 TL', 'Kâr/zarar oranı': '%20' } },
    { in: { alimlar: '50 40', guncel: '30' }, out: { 'Ortalama maliyet': '40 TL', 'Kâr/zarar': '-500,00 TL', 'Kâr/zarar oranı': '-%25' } },
    { in: { alimlar: '10 12,5\n30 7,5' }, out: { 'Ortalama maliyet': '8,75 TL', 'Toplam adet': '40', 'Alım sayısı': '2' } },
    { in: { alimlar: '100' }, error: true },
    { in: { alimlar: '' }, error: true },
    { in: { alimlar: '0 25' }, error: true },
  ],
  howto: [
    '"Alımlar" kutusuna her alım işleminizi ayrı bir satıra yazın. Satırda önce aldığınız adet (lot), ardından birim fiyat yer alır; örneğin 100 adet hisseyi 50 liradan aldıysanız "100 50" yazın.',
    'Aracı kurumunuz alımlarda komisyon kesiyorsa oranı "Alım komisyonu" alanına yüzde olarak girin; komisyon toplam maliyete eklenir.',
    'Hissenin bugünkü fiyatını "Güncel fiyat" alanına yazarsanız elinizdeki payların değeri ile kâr ya da zararınız hesaplanır.',
    '"Hesapla" düğmesine basın. Ortalama maliyet, toplam adet ve toplam tutar listelenir; yeni bir alım yaptığınızda satır ekleyip yeniden hesaplayabilirsiniz.',
  ],
  sections: [
    { h: 'Ortalama maliyet nedir, neden düz ortalama alınmaz?', p: [
      'Ortalama maliyet, elinizdeki her bir pay için ortalama olarak ne kadar ödediğinizi gösterir. Bir hisseyi tek seferde aldıysanız maliyetiniz alış fiyatınızdır. Kademeli aldıysanız her alımın ağırlığı, o alımda aldığınız adet kadardır. Bu yüzden doğru yöntem <strong>ağırlıklı ortalamadır</strong>.',
      'Bir örnekle farkı görelim: 100 adet hisseyi 50 TL\'den, 10 adet hisseyi 30 TL\'den aldınız. Fiyatların düz ortalaması 40 TL\'dir, ama bu yanlıştır; payların büyük bölümünü 50 TL\'den aldığınız için gerçek ortalamanız 48,18 TL\'dir. Düz ortalamaya güvenip 42 TL\'den satarsanız kâr ettiğinizi sanırken zarar edersiniz.',
    ] },
    { h: 'Formül', p: [
      'Hesap şu şekildedir: <strong>Ortalama maliyet = (Adet<sub>1</sub> × Fiyat<sub>1</sub> + Adet<sub>2</sub> × Fiyat<sub>2</sub> + …) ÷ (Adet<sub>1</sub> + Adet<sub>2</sub> + …)</strong>. Yani tüm alımlar için ödediğiniz toplam para, elinizdeki toplam adede bölünür.',
      'Komisyon girdiyseniz her alımın tutarı komisyon oranı kadar artırılır ve ortalama buna göre yükselir. Kâr/zarar ise <strong>(Güncel fiyat × Toplam adet) − Toplam maliyet</strong> işlemiyle bulunur; oranı bu farkın toplam maliyete bölünmesidir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir yatırımcı aynı hisseden üç ayrı alım yapmış olsun: 100 adet 50 TL\'den, 50 adet 40 TL\'den ve 50 adet 30 TL\'den. Ödenen tutarlar sırasıyla 5.000, 2.000 ve 1.500 TL\'dir; toplam 8.500 TL. Toplam adet 200\'dür.',
      'Ortalama maliyet 8.500 ÷ 200 = <strong>42,50 TL</strong> olur. Hisse bugün 45 TL ise elindeki payların değeri 200 × 45 = 9.000 TL, kârı 500 TL, kâr oranı 500 ÷ 8.500 = %5,88\'dir. Dikkat edin: son alım fiyatı 30 TL olmasına rağmen ortalama 42,50 TL\'dir; çünkü en büyük alım en yüksek fiyattan yapılmıştır.',
      'Komisyon etkisi için küçük bir örnek: 1.000 adet hisseyi 10 TL\'den alıp binde 2 (%0,2) komisyon ödediyseniz işlem tutarı 10.000 TL, komisyon 20 TL, toplam maliyet 10.020 TL ve ortalama maliyet 10,02 TL olur.',
    ] },
    { h: 'Ortalama düşürme ne demektir?', p: [
      'Fiyatı düşen bir hisseden ek alım yaparak ortalama maliyeti aşağı çekmeye halk arasında "ortalama düşürme" ya da "maliyet düşürme" denir. Matematiği basittir: ortalamanızdan düşük fiyattan aldığınız her pay ortalamayı aşağı, yüksek fiyattan aldığınız her pay yukarı çeker. Çekim gücü, yeni alımın adedinin eldeki toplam adede oranına bağlıdır.',
      'Ortalamanın düşmesi başabaş noktasına daha küçük bir yükselişle ulaşmanızı sağlar, ancak zararı ortadan kaldırmaz; aynı hisseye daha fazla para bağlamış olursunuz. Fiyat düşüşünün nedeni şirketin bozulan temel göstergeleriyse ek alım riski büyütür. Bu sayfa yalnızca hesabı yapar; ek alımın doğru olup olmadığına dair bir görüş bildirmez.',
    ] },
    { h: 'Hedef ortalamaya ulaşmak için kaç adet almalı?', p: [
      'Elinizde <em>A</em> adet ve <em>M</em> ortalama maliyet varken, <em>F</em> fiyatından alım yaparak ortalamayı <em>H</em> hedefine indirmek için gereken adet şu formülle bulunur: <strong>Gerekli adet = A × (M − H) ÷ (H − F)</strong>. Hedef, güncel fiyat ile mevcut ortalamanın arasında olmalıdır.',
      'Örneğin 200 adet ve 42,50 TL ortalamanız varken fiyat 30 TL\'ye inmişse ve ortalamayı 38 TL\'ye çekmek istiyorsanız 200 × (42,50 − 38) ÷ (38 − 30) = 112,5, yani yaklaşık 113 adet almanız gerekir. Sonucu denetlemek için kutuya "200 42,5" ve "113 30" satırlarını yazabilirsiniz.',
    ] },
    { h: 'Dikkat edilecek noktalar', ul: [
      'Satış yaptığınızda kalan payların ortalama maliyeti değişmez; ortalama yalnızca yeni alımlarla hareket eder. Sattığınız adedi alım listesinden düşmek yerine, kalan adet ve mevcut ortalamayı tek satır olarak yazıp devam edebilirsiniz.',
      'Bedelsiz sermaye artırımında pay sayınız artar, ödediğiniz toplam para değişmez; ortalama maliyet aynı oranda düşer. Bölünme sonrası hesabı güncel adetle yapın.',
      'Bedelli sermaye artırımına katıldıysanız aldığınız yeni payları, ödediğiniz kullanım fiyatıyla ayrı bir satır olarak ekleyin.',
      'Alınan nakit temettü ortalama maliyeti değiştirmez; getiri hesabında ayrıca dikkate alınır.',
      'Aracı kurum ekranındaki maliyet, kurumun kullandığı yönteme (örneğin ilk giren ilk çıkar) göre buradaki ağırlıklı ortalamadan farklı görünebilir.',
    ] },
    { h: 'Hisse dışındaki kullanım alanları ve uyarı', p: [
      'Aynı hesap yatırım fonu payları, gram altın, döviz ya da kripto varlık alımları için de geçerlidir; adet yerine miktarı, fiyat yerine birim alış fiyatını yazmanız yeterlidir. Ondalıklı miktarlar kabul edilir. Sonuçlar bilgilendirme amaçlıdır; alım satım kararı ve vergi hesabı için yatırım danışmanınıza ya da mali müşavirinize başvurun.',
    ] },
  ],
  faq: [
    ['Hisse ortalama maliyeti nasıl hesaplanır?', 'Her alımda adet ile fiyatı çarpıp bu tutarları toplayın, sonra toplam adede bölün. 100 adet 10 TL\'den ve 100 adet 20 TL\'den alım için (1.000 + 2.000) ÷ 200 = 15 TL bulunur.'],
    ['Farklı adetlerle alım yaptıysam fiyatların ortalamasını alabilir miyim?', 'Hayır. Düz ortalama yalnızca tüm alımlar eşit adetteyse doğru sonuç verir. Adetler farklıysa büyük alımın fiyatı ortalamayı daha çok etkiler; bu yüzden ağırlıklı ortalama kullanılır.'],
    ['Satış yapınca ortalama maliyetim değişir mi?', 'Ağırlıklı ortalama yönteminde değişmez. Elinizdeki payların bir kısmını satmak, kalan payların birim maliyetini etkilemez; yalnızca adet azalır.'],
    ['Ortalama düşürmek zararı azaltır mı?', 'Mevcut zararı azaltmaz, yalnızca başabaş fiyatınızı aşağı çeker. Aynı zamanda o hisseye bağladığınız para ve taşıdığınız risk artar. Karar, hissenin neden düştüğüne göre verilmelidir.'],
    ['Komisyonu hesaba katmalı mıyım?', 'Gerçek maliyetinizi görmek için evet. Komisyon oranı küçük görünse de sık işlem yapanlarda toplamda anlamlı bir tutara ulaşır. Oranı ilgili alana yazarsanız araç bunu maliyete ekler.'],
    ['Binlik ayırıcıyla sayı yazabilir miyim?', 'Alım satırlarında binlik ayırıcı kullanmayın; 1.500 yerine 1500 yazın. Ondalık kısım için virgül kullanabilirsiniz, örneğin 12,75.'],
    ['Kripto para ya da altın alımlarında kullanılabilir mi?', 'Evet. Miktarı ve birim alış fiyatını yazmanız yeterlidir; 0,25 gibi ondalıklı miktarlar da kabul edilir. Sonuçtaki "TL" ifadesi, fiyatı yazdığınız para birimini temsil eder.'],
    ['Alım bilgilerim kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız adet, fiyat ve portföy bilgileri sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['temettu-verimi-hesapla', 'fiyat-kazanc-orani-hesapla', 'yatirim-getirisi-hesapla', 'doviz-kar-zarar-hesapla', 'kar-zarar-hesapla'],
};
