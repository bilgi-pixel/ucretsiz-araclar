// Terleme Oranı ve Sıvı Kaybı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const once = h.pos(v.once, 'Antrenman öncesi kilo');
    const sonra = h.pos(v.sonra, 'Antrenman sonrası kilo');
    const icilen = h.nonneg(String(v.icilen ?? '').trim() === '' ? '0' : v.icilen, 'İçilen sıvı');
    const idrar = h.nonneg(String(v.idrar ?? '').trim() === '' ? '0' : v.idrar, 'İdrar miktarı');
    const sure = h.pos(v.sure, 'Antrenman süresi');
    if (once < 20 || once > 300 || sonra < 20 || sonra > 300) h.err('Kilo değerleri 20 ile 300 kg arasında olmalı.');
    if (icilen > 10000 || idrar > 5000) h.err('Sıvı miktarları mililitre cinsinden ve makul sınırlar içinde olmalı (içilen en çok 10.000 ml).');
    if (sure > 1440) h.err('Antrenman süresi 1.440 dakikadan (24 saat) uzun olamaz.');
    const kiloFarki = once - sonra;
    const ter = kiloFarki + icilen / 1000 - idrar / 1000;
    if (ter <= 1e-9) h.err('Bu değerlerle ter kaybı sıfır ya da negatif çıkıyor. Tartı değerlerini ve içilen sıvı miktarını kontrol edin.');
    const saat = sure / 60;
    const oran = ter / saat;
    const yuzde = kiloFarki / once * 100;
    let durum;
    if (yuzde < -1e-9) durum = 'Antrenmanda kaybettiğinizden fazla sıvı aldınız';
    else if (yuzde < 1) durum = 'Sıvı dengesi iyi korunmuş (%1\'in altında kayıp)';
    else if (yuzde < 2) durum = 'Hafif sıvı açığı (%1–2)';
    else if (yuzde < 3) durum = 'Belirgin sıvı açığı (%2–3); performans etkilenebilir';
    else durum = 'Yüksek sıvı açığı (%3 ve üzeri); antrenmanda daha çok sıvı alın';
    const acik = Math.max(0, kiloFarki);
    return {
      rows: [
        ['Terleme oranı', h.fmt(oran, 2) + ' L/saat'],
        ['Toplam ter kaybı', `${h.fmt(ter, 2)} L (${h.fmt(ter * 1000, 0)} ml)`],
        ['Vücut ağırlığı değişimi', (kiloFarki >= 0 ? '−' : '+') + h.fmt(Math.abs(kiloFarki), 2) + ' kg (%' + h.fmt(Math.abs(yuzde), 2) + ')'],
        ['Değerlendirme', durum],
        ['Karşılanan kayıp', '%' + h.fmt(Math.min(100, icilen / 1000 / ter * 100), 0)],
        ['Antrenman sonrası telafi', acik > 0 ? `${h.fmt(acik * 1.25, 2)}–${h.fmt(acik * 1.5, 2)} L` : 'Ek telafi gerekmiyor'],
        ['Ter kaybının 15 dakikalık karşılığı', h.fmt(oran * 250, 0) + ' ml'],
      ],
      note: '1 kg ağırlık kaybı yaklaşık 1 litre sıvı sayılır. Solunumla ve enerji kullanımıyla oluşan küçük kütle kayıpları ihmal edilmiştir. Telafi aralığı, kaybedilen her kilogram için 1,25–1,5 litre sıvı varsayımına dayanır. Amaç ter kaybının tamamını içmek değil, ağırlık kaybını vücut ağırlığının yaklaşık %2\'sinin altında tutmaktır; susuzluğunuza göre için, gereğinden fazla su içmek de sakıncalıdır.',
    };
  }
