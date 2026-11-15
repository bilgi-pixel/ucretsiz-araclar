// Sosyal Medya Etkileşim Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const adet = (s, ad) => {
      if (String(s ?? '').trim() === '') return 0;
      const n = h.int(s, ad);
      if (n < 0) h.err(`"${ad}" negatif olamaz.`);
      return n;
    };
    if (String(v.begeni ?? '').trim() === '') h.err('"Beğeni sayısı" alanını doldurun (beğeni yoksa 0 yazın).');
    const begeni = adet(v.begeni, 'Beğeni sayısı');
    const yorum = adet(v.yorum, 'Yorum sayısı');
    const paylasim = adet(v.paylasim, 'Paylaşım sayısı');
    const kaydetme = adet(v.kaydetme, 'Kaydetme sayısı');
    const adlar = { takipci: 'Takipçi sayısı', erisim: 'Erişim sayısı', gosterim: 'Gösterim sayısı' };
    const taban = adlar[v.taban] ? v.taban : 'takipci';
    const kitle = h.posint(v.kitle, adlar[taban]);
    const gonderi = String(v.gonderi ?? '').trim() === '' ? 1 : h.posint(v.gonderi, 'Gönderi sayısı');
    const toplam = begeni + yorum + paylasim + kaydetme;
    const ortalama = toplam / gonderi;
    const oran = ortalama / kitle * 100;
    const etiket = { takipci: 'takipçi', erisim: 'erişilen kişi', gosterim: 'gösterim' }[taban];
    const rows = [
      ['Etkileşim oranı', '%' + h.fmt(oran, 2)],
      ['Toplam etkileşim', h.fmt(toplam, 0)],
      ['Gönderi başına ortalama etkileşim', h.fmt(ortalama, 2)],
      [`1.000 ${etiket} başına etkileşim`, h.fmt(ortalama / kitle * 1000, 2)],
    ];
    const notlar = {
      takipci: 'Takipçi bazlı oran, hesapları birbiriyle kıyaslamak için kullanılır; gönderiyi kaç kişinin gördüğünü hesaba katmaz.',
      erisim: 'Erişim bazlı oran, gönderiyi gerçekten gören kişilerin ne kadarının tepki verdiğini gösterir ve içerik kalitesini ölçmek için uygundur.',
      gosterim: 'Gösterim bazlı oran, aynı kişinin birden çok görüntülemesini de saydığı için genellikle erişim bazlı orandan düşük çıkar.',
    };
    let note = notlar[taban];
    if (oran > 100) note += ' Oran %100\'ü aşıyor; kitle sayısını ve gönderi adedini kontrol edin.';
    return { rows, note };
  }
