// Pomodoro Planı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const toplam = h.posint(v.toplam, 'Toplam süre');
    const calisma = h.posint(v.calisma, 'Çalışma süresi');
    const kisa = h.posint(v.kisaMola, 'Kısa mola');
    const uzun = h.posint(v.uzunMola, 'Uzun mola');
    const tur = h.posint(v.tur, 'Uzun mola sıklığı');
    if (toplam > 1440) h.err('Toplam süre 1440 dakikadan (24 saat) fazla olamaz.');
    if (calisma > toplam) h.err('Toplam süre bir çalışma oturumuna yetmiyor; toplam süreyi artırın ya da çalışma süresini kısaltın.');
    const m = /^(\d{1,2})[:.](\d{2})$/.exec(String(v.baslangic ?? '').trim());
    if (!m || +m[1] > 23 || +m[2] > 59) h.err('Başlangıç saatini SS:DD biçiminde yazın (örn. 09:00).');
    const bas = +m[1] * 60 + +m[2];
    const saat = (t) => {
      const x = (bas + t) % 1440;
      return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0');
    };
    const sure = (d) => (d >= 60 ? `${Math.floor(d / 60)} saat ${d % 60} dakika` : `${d} dakika`);
    const satirlar = [];
    let t = 0, n = 0, mola = 0;
    while (t + calisma <= toplam) {
      n++;
      satirlar.push(`${saat(t)} – ${saat(t + calisma)}  ${n}. pomodoro (${calisma} dk)`);
      t += calisma;
      const mo = n % tur === 0 ? uzun : kisa;
      if (t + mo + calisma > toplam) break;
      satirlar.push(`${saat(t)} – ${saat(t + mo)}  ${n % tur === 0 ? 'Uzun mola' : 'Kısa mola'} (${mo} dk)`);
      t += mo;
      mola += mo;
    }
    const ertesi = bas + t >= 1440 ? ' (ertesi gün)' : '';
    return {
      rows: [
        ['Pomodoro sayısı', `${n} pomodoro`],
        ['Net çalışma süresi', sure(n * calisma)],
        ['Toplam mola', sure(mola)],
        ['Bitiş saati', saat(t) + ertesi],
        ['Artan süre', sure(toplam - t)],
      ],
      text: satirlar.join('\n'),
      note: 'Ardından yeni bir oturum sığmayan mola plana eklenmez; artan süre son oturumdan sonra boşta kalan zamandır.',
    };
  }
