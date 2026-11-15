// Ayın Son İş Günü ve Son Günü Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 9999) h.err('"Yıl" 1583 ile 9999 arasında olmalı.');
    const ay = Number(v.ay);
    if (!Number.isInteger(ay) || ay < 1 || ay > 12) h.err('Listeden geçerli bir ay seçin.');
    const cmt = v.cumartesi === 'evet';
    const ilk = new Date(Date.UTC(2000, ay - 1, 1));
    ilk.setUTCFullYear(y);
    const sonraki = new Date(Date.UTC(2000, ay % 12, 1));
    sonraki.setUTCFullYear(ay === 12 ? y + 1 : y);
    const gunSayisi = h.gunFarki(ilk, sonraki);
    const son = h.gunEkle(ilk, gunSayisi - 1);
    const isGunu = (d) => { const g = d.getUTCDay(); return g !== 0 && (cmt || g !== 6); };
    let sonIs = son;
    while (!isGunu(sonIs)) sonIs = h.gunEkle(sonIs, -1);
    let ilkIs = ilk;
    while (!isGunu(ilkIs)) ilkIs = h.gunEkle(ilkIs, 1);
    let adet = 0;
    for (let i = 0; i < gunSayisi; i++) if (isGunu(h.gunEkle(ilk, i))) adet++;
    const yaz = (d) => `${h.fmtDate(d)} ${h.gunAdi(d)}`;
    return {
      rows: [
        ['Ayın son iş günü', yaz(sonIs)],
        ['Ayın son günü', yaz(son)],
        ['Ayın ilk günü', yaz(ilk)],
        ['Ayın ilk iş günü', yaz(ilkIs)],
        ['Ayın uzunluğu', `${gunSayisi} gün`],
        ['İş günü sayısı', `${adet} gün`],
      ],
      note: `${h.ayAdi(ay)} ${y} için hesaplandı. İş günü olarak pazartesi–${cmt ? 'cumartesi' : 'cuma'} alınmıştır; resmî ve dinî tatiller hesaba katılmaz, bunları takvimden ayrıca kontrol edin.`,
    };
  }
