// Ortalama Vade Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = h.lines(v.kalemler);
    if (!satirlar.length) h.err('En az bir kalem yazın. Her satıra tutar ve vade girin (örn. 10000 30).');
    if (satirlar.length > 500) h.err('En fazla 500 kalem girilebilir.');
    const tarihMi = (t) => /^\d{1,2}[./]\d{1,2}[./]\d{4}$/.test(t) || /^\d{4}-\d{1,2}-\d{1,2}$/.test(t);
    const bosBas = String(v.baslangic ?? '').trim() === '';
    const bas = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    let toplam = 0, agirlik = 0, enAz = Infinity, enCok = -Infinity, tarihVar = false;
    satirlar.forEach((s, k) => {
      const p = s.split(/[\s;]+/).filter(Boolean);
      const no = k + 1;
      if (p.length !== 2) h.err(`${no}. satır anlaşılamadı. Her satırda yalnızca tutar ve vade olmalı (örn. 10000 30).`);
      const tutar = h.num(p[0], `${no}. satır tutarı`);
      if (!(tutar > 0)) h.err(`${no}. satırdaki tutar sıfırdan büyük olmalı.`);
      let gun;
      if (tarihMi(p[1])) {
        tarihVar = true;
        gun = h.gunFarki(bas, h.date(p[1], `${no}. satır vadesi`));
        if (gun < 0) h.err(`${no}. satırdaki vade tarihi başlangıç tarihinden önce. Başlangıç tarihini ya da vadeyi düzeltin.`);
      } else {
        gun = h.num(p[1], `${no}. satır vadesi`);
        if (gun < 0) h.err(`${no}. satırdaki vade günü negatif olamaz.`);
      }
      toplam += tutar;
      agirlik += tutar * gun;
      enAz = Math.min(enAz, gun);
      enCok = Math.max(enCok, gun);
    });
    const ort = agirlik / toplam;
    const rows = [['Ortalama vade', h.fmt(ort, 2) + ' gün']];
    if (!bosBas || tarihVar) rows.push(['Ortalama vade tarihi', h.fmtDate(h.gunEkle(bas, Math.round(ort + 1e-9)))]);
    rows.push(['Toplam tutar', h.para(toplam)]);
    rows.push(['Kalem sayısı', String(satirlar.length)]);
    rows.push(['En kısa ve en uzun vade', `${h.fmt(enAz, 2)} gün – ${h.fmt(enCok, 2)} gün`]);
    rows.push(['Tutar × gün toplamı', h.fmt(agirlik, 2)]);
    return { rows, note: 'Ortalama vade, tutar × gün toplamının toplam tutara bölümüdür. Ortalama vade tarihi en yakın tam güne yuvarlanır; hafta sonu ve resmî tatil kontrolü yapılmaz.' };
  }
