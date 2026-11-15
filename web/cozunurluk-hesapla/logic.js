// Çözünürlük Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const su = h.pos(v.su, 'Su kütlesi');
    const rows = [];
    let S;
    let cozunmus;
    if (bos(v.cozunurluk)) {
      if (bos(v.cozunen)) h.err('Çözünürlüğü ya da eklenen madde kütlesini yazın; ikisi birden boş bırakılamaz.');
      const m = h.pos(v.cozunen, 'Eklenen madde kütlesi');
      S = m / su * 100;
      cozunmus = m;
      rows.push(['Çözünürlük', h.fmt(S, 2) + ' g/100 g su']);
    } else {
      S = h.pos(v.cozunurluk, 'Çözünürlük');
      const enCok = S * su / 100;
      rows.push(['En çok çözünebilen madde', h.fmt(enCok, 2) + ' g']);
      if (bos(v.cozunen)) {
        cozunmus = enCok;
        rows.push(['Durum', 'Doymuş çözelti için gereken miktar gösterildi']);
      } else {
        const m = h.nonneg(v.cozunen, 'Eklenen madde kütlesi');
        if (m < enCok - 1e-9) {
          cozunmus = m;
          rows.push(['Durum', 'Doymamış']);
          rows.push(['Doyurmak için eklenmesi gereken', h.fmt(enCok - m, 2) + ' g']);
        } else if (m <= enCok + 1e-9) {
          cozunmus = enCok;
          rows.push(['Durum', 'Doymuş']);
        } else {
          cozunmus = enCok;
          rows.push(['Durum', 'Doymuş, dipte çözünmemiş katı var']);
          rows.push(['Çözünmeden kalan', h.fmt(m - enCok, 2) + ' g']);
        }
        rows.push(['Çözünen madde', h.fmt(cozunmus, 2) + ' g']);
      }
    }
    rows.push(['Çözelti kütlesi', h.fmt(su + cozunmus, 2) + ' g']);
    rows.push(['Kütlece yüzde derişim', '%' + h.fmt(cozunmus / (su + cozunmus) * 100, 2)]);
    if (!bos(v.soguk)) {
      const S2 = h.nonneg(v.soguk, 'Soğutulan sıcaklıktaki çözünürlük');
      if (S2 > S + 1e-9) h.err('Soğutulan sıcaklıktaki çözünürlük, ilk çözünürlükten büyük olamaz. Değerleri kontrol edin.');
      const kalan = Math.min(cozunmus, S2 * su / 100);
      rows.push(['Soğutunca çöken madde', h.fmt(cozunmus - kalan, 2) + ' g']);
      rows.push(['Soğutulmuş çözeltide kalan madde', h.fmt(kalan, 2) + ' g']);
    }
    return { rows, note: 'Çözünürlük 100 g su başına tanımlanmıştır. Çökme hesabında suyun buharlaşmadığı ve çözeltinin aşırı doymuş kalmadığı varsayılır.' };
  }
