// Et Pişirme Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const T = {
      danaAz: { ad: 'Dana rosto (az pişmiş)', dk: 45, ek: 20, din: 15, ic: '52–55 °C (az pişmiş)' },
      danaOrta: { ad: 'Dana rosto (orta pişmiş)', dk: 55, ek: 25, din: 15, ic: '60–63 °C (orta)' },
      danaIyi: { ad: 'Dana rosto (iyi pişmiş)', dk: 65, ek: 30, din: 15, ic: '71 °C ve üzeri (iyi pişmiş)' },
      kuzuOrta: { ad: 'Kuzu but / kol (orta pişmiş)', dk: 55, ek: 25, din: 15, ic: '60–63 °C (orta)' },
      kuzuIyi: { ad: 'Kuzu but / kol (iyi pişmiş)', dk: 65, ek: 30, din: 15, ic: '71 °C ve üzeri (iyi pişmiş)' },
      tavuk: { ad: 'Bütün tavuk', dk: 45, ek: 20, din: 15, ic: 'en az 74 °C (but kalın yeri)' },
      hindi: { ad: 'Bütün hindi', dk: 40, ek: 20, din: 30, ic: 'en az 74 °C (but kalın yeri)' },
    };
    const t = T[v.tur] || T.danaOrta;
    const kg = h.pos(v.agirlik, 'Etin ağırlığı');
    if (kg > 15) h.err('Ağırlık 15 kg\'dan büyük olamaz; değeri kilogram olarak yazdığınızdan emin olun (500 g için 0,5).');
    const sure = Math.round(t.dk * kg + t.ek + 1e-9);
    const sa = (m) => {
      const s = Math.floor(m / 60), d = m % 60;
      return s === 0 ? `${d} dk` : d === 0 ? `${s} sa` : `${s} sa ${d} dk`;
    };
    const rows = [
      ['Fırında pişirme süresi', sa(sure)],
      ['Dakika olarak', h.fmt(sure, 0) + ' dk'],
      ['Dinlendirme süresi', t.din + ' dk'],
      ['Toplam (pişirme + dinlendirme)', sa(sure + t.din)],
      ['Hedef iç sıcaklık', t.ic],
      ['Kullanılan kural', `${t.dk} dk/kg + ${t.ek} dk`],
    ];
    const s = String(v.servis ?? '').trim();
    if (s !== '') {
      const m = /^(\d{1,2})[:.](\d{2})$/.exec(s);
      if (!m || +m[1] > 23 || +m[2] > 59) h.err('Servis saatini SS:DD biçiminde yazın (örn. 19:00) ya da alanı boş bırakın.');
      const hedef = +m[1] * 60 + +m[2];
      const bas = (((hedef - sure - t.din) % 1440) + 1440) % 1440;
      const cik = (((hedef - t.din) % 1440) + 1440) % 1440;
      const yaz = (x) => String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0');
      rows.push(['Fırına verme saati', yaz(bas)]);
      rows.push(['Fırından çıkarma saati', yaz(cik)]);
    }
    return {
      rows,
      note: `${t.ad} için önceden ısıtılmış 180 °C (fanlı fırında 160 °C) varsayılmıştır. Süre tahmindir; pişmeyi et termometresiyle iç sıcaklıktan doğrulayın.${v.tur === 'danaAz' ? ' Az pişmiş hedef sıcaklığı (52–55 °C), bütün parça et için yaygın gıda güvenliği önerisi olan 63 °C ve birkaç dakika dinlendirmenin altındadır; çocuklar, hamileler, yaşlılar ve bağışıklığı zayıf kişiler için önerilmez.' : ''}`,
    };
  }
