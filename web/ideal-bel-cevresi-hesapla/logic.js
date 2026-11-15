// İdeal Bel Çevresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    if (boy < 3) h.err('Boyu santimetre olarak yazın (örn. 1,75 yerine 175).');
    if (boy < 100 || boy > 250) h.err('Boy 100 ile 250 cm arasında olmalı.');
    const kadin = v.cinsiyet === 'kadin';
    const ust = boy * 0.5;
    const rows = [
      ['Önerilen en yüksek bel çevresi', h.fmt(ust, 1) + ' cm'],
      ['Sağlıklı kabul edilen aralık', `${h.fmt(boy * 0.4, 1)}–${h.fmt(ust, 1)} cm`],
      ['Belirgin risk sınırı (boyun %60\'ı)', h.fmt(boy * 0.6, 1) + ' cm'],
      ['Cinsiyete göre genel eşikler', kadin ? '80 cm üstü artmış risk, 88 cm üstü yüksek risk' : '94 cm üstü artmış risk, 102 cm üstü yüksek risk'],
    ];
    const belHam = String(v.bel ?? '').trim();
    if (belHam !== '') {
      const bel = h.pos(belHam, 'Bel çevresi');
      if (bel < 30 || bel > 250) h.err('Bel çevresi 30 ile 250 cm arasında olmalı.');
      if (bel >= boy) h.err('Bel çevresi boydan büyük ya da boya eşit olamaz; iki değeri de santimetre olarak yazdığınızdan emin olun.');
      const oran = bel / boy;
      let yorum;
      if (oran < 0.4 - 1e-9) yorum = 'Düşük (0,40 altı)';
      else if (oran < 0.5 - 1e-9) yorum = 'Sağlıklı aralıkta (0,40–0,50)';
      else if (oran < 0.6 - 1e-9) yorum = 'Artmış risk (0,50–0,60)';
      else yorum = 'Belirgin artmış risk (0,60 ve üstü)';
      const fark = bel - ust;
      rows.push(['Bel-boy oranınız', h.fmt(oran, 2)]);
      rows.push(['Değerlendirme', yorum]);
      rows.push(['Önerilen sınıra göre', Math.abs(fark) < 1e-9 ? 'Tam sınırda' : fark > 0 ? `${h.fmt(fark, 1)} cm fazla` : `Sınırın ${h.fmt(-fark, 1)} cm altında`]);
    }
    return {
      rows,
      note: 'Önerilen sınır "bel çevresi boyun yarısından az olmalı" kuralına dayanır. Sonuç bilgilendirme amaçlıdır; tanı koymaz, hekim ya da diyetisyen değerlendirmesinin yerini tutmaz.',
    };
  }
