// Takvim Etkinliği (ICS) Metni Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const baslik = String(v.baslik ?? '').trim();
    if (!baslik) h.err('"Etkinlik başlığı" alanını doldurun.');
    const saatOku = (s, ad) => {
      const m = /^(\d{1,2})[:.](\d{2})$/.exec(String(s).trim());
      if (!m || +m[1] > 23 || +m[2] > 59) h.err(`"${ad}" alanına saati SS:DD biçiminde yazın (örn. 14:30).`);
      return +m[1] * 60 + +m[2];
    };
    const p2 = (n) => String(n).padStart(2, '0');
    const gun = (d) => `${d.getUTCFullYear()}${p2(d.getUTCMonth() + 1)}${p2(d.getUTCDate())}`;
    const an = (d) => `${gun(d)}T${p2(d.getUTCHours())}${p2(d.getUTCMinutes())}00`;
    const kacis = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r\n?|\n/g, '\\n');
    const katla = (satir) => {
      const enc = new TextEncoder();
      let out = '', cur = '', len = 0, lim = 75;
      for (const ch of satir) {
        const b = enc.encode(ch).length;
        if (len + b > lim) { out += cur + '\n '; cur = ''; len = 0; lim = 74; }
        cur += ch; len += b;
      }
      return out + cur;
    };
    const sureMetni = (dk) => {
      const g = Math.floor(dk / 1440), s = Math.floor((dk % 1440) / 60), d = dk % 60, p = [];
      if (g) p.push(`${g} gün`);
      if (s) p.push(`${s} saat`);
      if (d) p.push(`${d} dakika`);
      return p.join(' ');
    };
    const t0 = h.date(v.tarih, 'Başlangıç tarihi');
    const saatStr = String(v.saat ?? '').trim(), bitSaatStr = String(v.bitisSaat ?? '').trim();
    const t1gun = String(v.bitisTarih ?? '').trim() ? h.date(v.bitisTarih, 'Bitiş tarihi') : t0;
    if (t1gun < t0) h.err('Bitiş tarihi başlangıç tarihinden önce olamaz.');
    const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bilisim Ajans//ICS Olusturucu//TR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT'];
    const simdi = new Date();
    L.push(`UID:${simdi.getTime().toString(36)}-${Math.random().toString(36).slice(2, 10)}@ics-olusturucu`);
    L.push(`DTSTAMP:${an(simdi)}Z`);
    let rows;
    if (!saatStr) {
      if (bitSaatStr) h.err('Bitiş saati yazdıysanız başlangıç saatini de yazın; tüm gün etkinlik için ikisini de boş bırakın.');
      const son = h.gunEkle(t1gun, 1);
      L.push(`DTSTART;VALUE=DATE:${gun(t0)}`, `DTEND;VALUE=DATE:${gun(son)}`);
      rows = [['Etkinlik', baslik], ['Başlangıç', `${h.fmtDate(t0)} (tüm gün)`], ['Bitiş', `${h.fmtDate(t1gun)} (tüm gün)`], ['Süre', `${h.gunFarki(t0, son)} gün`]];
    } else {
      const b = new Date(t0.getTime() + saatOku(saatStr, 'Başlangıç saati') * 60000);
      const s = bitSaatStr ? new Date(t1gun.getTime() + saatOku(bitSaatStr, 'Bitiş saati') * 60000) : new Date(b.getTime() + 3600000 + (t1gun.getTime() - t0.getTime()));
      if (s <= b) h.err('Bitiş zamanı başlangıçtan sonra olmalı. Gece yarısını aşan etkinliklerde bitiş tarihini bir sonraki gün seçin.');
      const kay = v.dilim === 'tr' ? -3 * 3600000 : 0, ek = v.dilim === 'tr' ? 'Z' : '';
      L.push(`DTSTART:${an(new Date(b.getTime() + kay))}${ek}`, `DTEND:${an(new Date(s.getTime() + kay))}${ek}`);
      const yaz = (d) => `${h.fmtDate(d)} ${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}`;
      rows = [['Etkinlik', baslik], ['Başlangıç', yaz(b)], ['Bitiş', yaz(s)], ['Süre', sureMetni(Math.round((s - b) / 60000))]];
    }
    L.push(`SUMMARY:${kacis(baslik)}`);
    const konum = String(v.konum ?? '').trim(), acik = String(v.aciklama ?? '').trim();
    if (konum) L.push(`LOCATION:${kacis(konum)}`);
    if (acik) L.push(`DESCRIPTION:${kacis(acik)}`);
    const hat = { 10: 'PT10M', 30: 'PT30M', 60: 'PT1H', 1440: 'P1D' }[v.hatirlatma];
    if (hat) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${kacis(baslik)}`, `TRIGGER:-${hat}`, 'END:VALARM');
    L.push('END:VEVENT', 'END:VCALENDAR');
    return {
      rows,
      text: L.map(katla).join('\n'),
      note: 'Metni kopyalayıp bir metin düzenleyiciye yapıştırın ve "etkinlik.ics" adıyla, UTF-8 kodlamasıyla kaydedin. UID ve DTSTAMP satırları her oluşturmada yenilenir.',
    };
  }
