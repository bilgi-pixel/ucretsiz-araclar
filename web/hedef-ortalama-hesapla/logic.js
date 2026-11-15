// Hedef Ortalama İçin Gereken Not Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tavan = Number(v.tavan) || 4;
    const m = h.nonneg(v.mevcut, 'Mevcut ortalama');
    const a = h.nonneg(v.tamam, 'Tamamlanan kredi / ağırlık');
    const t = h.pos(v.hedef, 'Hedef ortalama');
    const b = h.pos(v.kalan, 'Kalan kredi / ağırlık');
    if (m > tavan) h.err(`Mevcut ortalama seçtiğiniz not sisteminin tavanını (${tavan}) aşamaz.`);
    if (t > tavan) h.err(`Hedef ortalama seçtiğiniz not sisteminin tavanını (${tavan}) aşamaz.`);
    const toplam = a + b;
    const ham = (t * toplam - m * a) / b;
    const gereken = Math.ceil(ham * 100 - 1e-7) / 100;
    const enYuksek = (m * a + tavan * b) / toplam;
    const enDusuk = (m * a) / toplam;
    let ana, durum;
    if (gereken > tavan + 1e-9) { ana = 'Ulaşılamıyor'; durum = 'Kalan bölümden tam not alınsa bile hedefe ulaşılamıyor'; }
    else if (gereken <= 0) { ana = h.fmt(0, 2); durum = 'Hedef zaten güvende: kalan bölümden sıfır alınsa bile ortalama hedefin altına düşmüyor'; }
    else { ana = h.fmt(gereken, 2); durum = gereken > m + 1e-9 ? 'Ulaşılabilir: mevcut ortalamanızın üzerinde performans gerekiyor' : 'Ulaşılabilir: mevcut ortalamanızın altında bir performans bile yetiyor'; }
    return {
      rows: [
        ['Kalan bölümden gereken ortalama', ana],
        ['Durum', durum],
        ['Ulaşılabilecek en yüksek ortalama', h.fmt(enYuksek, 2)],
        ['Kalan bölümden sıfır alınırsa ortalama', h.fmt(enDusuk, 2)],
        ['Toplam kredi / ağırlık', h.fmt(toplam, 2)],
        ['Mevcut ortalamayla fark', (ham - m >= 0 ? '+' : '−') + h.fmt(Math.abs(ham - m), 2)],
      ],
      note: 'Gereken değer, kalan derslerin kredi ağırlıklı ortalamasıdır; her dersten ayrı ayrı bu notu almanız gerekmez. Ders tekrarı ve ortalamaya katılmayan dersler hesaba dahil değildir.',
    };
  }
