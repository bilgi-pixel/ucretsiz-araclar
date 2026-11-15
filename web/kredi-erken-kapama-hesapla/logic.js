// Kredi Erken Kapama Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const P = h.pos(v.anapara, 'Kalan anapara');
    const r = h.nonneg(v.faiz, 'Aylık faiz oranı') / 100;
    const n = h.posint(v.kalan, 'Kalan taksit sayısı');
    const gun = h.nonneg(h.opt(v.gun, 0, 'Geçen gün'), 'Geçen gün');
    const vergi = h.nonneg(h.opt(v.vergi, 0, 'Vergi ve fon toplamı'), 'Vergi ve fon toplamı') / 100;
    const taz = h.nonneg(h.opt(v.tazminat, 0, 'Erken ödeme tazminatı oranı'), 'Erken ödeme tazminatı oranı') / 100;
    if (n > 600) h.err('Kalan taksit sayısı en fazla 600 olabilir.');
    if (gun > 31) h.err('Geçen gün sayısı 0 ile 31 arasında olmalı; taksit gecikmişse bankanızdan güncel tutarı isteyin.');
    if (r > 1) h.err('Aylık faiz oranı %100\'den büyük olamaz; oranı yüzde olarak yazın (örn. 3).');
    const rb = r * (1 + vergi);
    const taksit = rb === 0 ? P / n : (P * rb) / (1 - Math.pow(1 + rb, -n));
    const toplam = taksit * n;
    const islemis = (P * r * gun) / 30;
    const islemisVergi = islemis * vergi;
    const tazminat = P * taz;
    const kapama = P + islemis + islemisVergi + tazminat;
    const kazanc = toplam - kapama;
    return {
      rows: [
        ['Erken kapama tutarı', h.para(kapama)],
        ['Kalan anapara', h.para(P)],
        ['İşlemiş faiz', h.para(islemis)],
        ['İşlemiş faizin vergi ve fonu', h.para(islemisVergi)],
        ['Erken ödeme tazminatı', h.para(tazminat)],
        ['Mevcut aylık taksit (yaklaşık)', h.para(taksit)],
        ['Kalan taksitlerin toplamı', h.para(toplam)],
        ['Erken kapamanın kazancı', h.para(kazanc)],
      ],
      note: 'Eşit taksitli, sabit faizli kredi varsayılmıştır; ay 30 gün alınır. Kesin kapama tutarını bankanız bildirir.',
    };
  }
