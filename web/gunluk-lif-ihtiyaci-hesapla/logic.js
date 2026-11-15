// Günlük Lif İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (x) => String(x ?? '').trim() === '';
    const yas = h.num(v.yas, 'Yaş');
    if (yas < 1 || yas > 120) h.err('"Yaş" 1 ile 120 arasında olmalı; bir yaşından küçük bebekler için lif önerisi tanımlı değildir.');
    const g = v.grup || 'erkek';
    const erkek = g === 'erkek';
    if ((g === 'gebe' || g === 'emziren') && yas < 14) h.err('Gebelik ve emzirme seçenekleri için yaş en az 14 olmalı.');
    let oneri;
    if (g === 'gebe') oneri = 28;
    else if (g === 'emziren') oneri = 29;
    else if (yas < 4) oneri = 19;
    else if (yas < 9) oneri = 25;
    else if (yas < 14) oneri = erkek ? 31 : 26;
    else if (yas < 19) oneri = erkek ? 38 : 26;
    else if (yas < 51) oneri = erkek ? 38 : 25;
    else oneri = erkek ? 30 : 21;
    const rows = [
      ['Önerilen günlük lif', oneri + ' g'],
      ['Öğün başına (3 ana öğün)', h.fmt(oneri / 3, 1) + ' g'],
    ];
    if (!bos(v.kalori)) {
      const kcal = h.pos(v.kalori, 'Günlük kalori alımı');
      if (kcal < 500 || kcal > 8000) h.err('"Günlük kalori alımı" 500 ile 8000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (örn. 2000).');
      rows.push(['Kaloriye göre lif (1000 kcal başına 14 g)', h.fmt((kcal / 1000) * 14, 1) + ' g']);
    }
    if (!bos(v.mevcut)) {
      const m = h.nonneg(v.mevcut, 'Şu anki günlük lif alımınız');
      if (m > 200) h.err('"Şu anki günlük lif alımınız" çok yüksek görünüyor; değeri gram olarak yazın.');
      rows.push(['Öneriyi karşılama oranı', '%' + h.fmt((m / oneri) * 100, 1)]);
      rows.push(['Öneriyle fark', m + 1e-9 >= oneri ? 'Öneriyi karşılıyorsunuz' : h.fmt(oneri - m, 1) + ' g eksik']);
    }
    return {
      rows,
      note: 'Değerler sağlıklı kişiler için genel yeterli alım düzeyleridir. Bağırsak hastalığı, ameliyat sonrası dönem ya da özel diyet gerektiren durumlarda hedefi hekiminiz ya da diyetisyeniniz belirler.',
    };
  }
