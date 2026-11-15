// Günlük Soru Hedefi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const toplam = h.posint(v.toplam, 'Toplam soru hedefi');
    const cozulen = h.int(String(h.opt(v.cozulen, 0, 'Şimdiye kadar çözülen')), 'Şimdiye kadar çözülen');
    if (cozulen < 0) h.err('"Şimdiye kadar çözülen" negatif olamaz.');
    if (cozulen >= toplam) h.err('Çözülen soru sayısı hedefe ulaşmış ya da hedefi aşmış; daha büyük bir hedef yazın.');
    const gun = h.posint(v.gun, 'Kalan gün sayısı');
    if (gun > 3650) h.err('Kalan gün sayısı 3650\'den büyük olamaz.');
    const hg = Number(v.haftaGun) || 7;
    if (!(hg >= 1 && hg <= 7)) h.err('Haftada çalışılan gün 1 ile 7 arasında olmalı.');
    const kalan = toplam - cozulen;
    const hafta = Math.floor(gun / 7);
    const artik = gun % 7;
    const cg = hafta * hg + Math.min(artik, hg);
    const gunluk = Math.ceil(kalan / cg - 1e-9);
    const sure = (dkT) => {
      const t = Math.round(dkT);
      const s = Math.floor(t / 60), d = t % 60;
      return s > 0 ? `${s} sa ${d} dk` : `${d} dk`;
    };
    const rows = [
      ['Günlük soru hedefi', h.fmt(gunluk, 0) + ' soru'],
      ['Haftalık soru hedefi', h.fmt(gunluk * hg, 0) + ' soru'],
      ['Kalan soru', h.fmt(kalan, 0) + ' soru'],
      ['Çalışma günü sayısı', h.fmt(cg, 0) + ' gün'],
      ['Kesirli günlük ortalama', h.fmt(kalan / cg, 2) + ' soru'],
      ['Plan sonunda hedef fazlası', h.fmt(gunluk * cg - kalan, 0) + ' soru'],
    ];
    if (String(v.dk ?? '').trim() !== '') {
      const dk = h.pos(v.dk, 'Soru başına süre');
      rows.push(['Günlük soru çözme süresi', sure(gunluk * dk)]);
      rows.push(['Toplam süre', sure(kalan * dk)]);
    }
    return { rows, note: 'Günlük hedef yukarı yuvarlanır; bu yüzden plana uyarsanız hedefi birkaç soru fazlasıyla tamamlarsınız. Kontrol ve yanlış analizi süresi hesaba dahil değildir.' };
  }
