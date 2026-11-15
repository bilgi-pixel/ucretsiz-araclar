// Bant Genişliği İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.kullanici, 'Kullanıcı sayısı');
    const k = h.pos(v.kisiBasi, 'Kişi başı ihtiyaç');
    const e = h.pos(v.eszaman, 'Eşzamanlı kullanım oranı');
    if (e > 100) h.err('Eşzamanlı kullanım oranı %100\'den büyük olamaz; herkes aynı anda kullanıyorsa 100 yazın.');
    const p = h.nonneg(v.pay, 'Yedek pay');
    const talep = n * k * e / 100;
    const onerilen = talep * (1 + p / 100);
    return {
      rows: [
        ['Önerilen bant genişliği', h.fmt(onerilen, 2) + ' Mbps'],
        ['Anlık toplam talep (paysız)', h.fmt(talep, 2) + ' Mbps'],
        ['Eşzamanlı aktif kullanıcı', h.fmt(n * e / 100, 1) + ' kişi'],
        ['Herkes aynı anda kullanırsa', h.fmt(n * k, 2) + ' Mbps'],
        ['Saniyede aktarılan veri', h.fmt(onerilen / 8, 2) + ' MB/sn'],
        ['1 GB dosyanın aktarım süresi', h.fmt(8000 / onerilen, 0) + ' saniye'],
      ],
      note: 'Formül: kullanıcı × kişi başı Mbps × eşzamanlılık × (1 + pay). 8 megabit = 1 megabayt. İndirme ve yükleme yönlerini ayrı ayrı değerlendirin; sonuç planlama amaçlı bir tahmindir.',
    };
  }
