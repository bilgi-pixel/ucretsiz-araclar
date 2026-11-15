// Meta Yönlendirme (Refresh) Kodu Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let hedef = String(v.hedef ?? '').trim();
    if (!hedef) h.err('"Hedef adres" alanını doldurun.');
    if (/\s/.test(hedef)) h.err('Hedef adreste boşluk olamaz; boşlukları %20 olarak yazın ya da adresi kontrol edin.');
    const sema = /^([a-z][a-z0-9+.-]*):/i.exec(hedef);
    const goreli = hedef.startsWith('/') && !hedef.startsWith('//');
    if (sema && !/^https?$/i.test(sema[1]) && !/^[^/]+:\d+(\/|$)/.test(hedef)) h.err('Hedef adres yalnızca http ya da https ile başlayabilir.');
    if (!goreli && !/^https?:\/\//i.test(hedef)) {
      hedef = 'https://' + hedef.replace(/^\/\//, '');
    }
    if (!goreli) {
      const host = hedef.replace(/^https?:\/\//i, '').split(/[/?#]/)[0];
      if (!host || (!host.includes('.') && !/^localhost(:\d+)?$/i.test(host))) h.err('Hedef adres geçerli bir alan adı içermeli (örn. ornek.com/sayfa).');
    }
    const sure = h.int(v.sure, 'Bekleme süresi');
    if (sure < 0 || sure > 86400) h.err('"Bekleme süresi" 0 ile 86.400 saniye arasında olmalı.');
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const e = escH(hedef);
    const meta = `<meta http-equiv="refresh" content="${sure}; url=${e}">`;
    const L = [meta];
    if (v.kapsam === 'yedek') {
      if (!goreli) L.push(`<link rel="canonical" href="${e}">`);
      L.push(`<p>Bu sayfa taşındı. Otomatik olarak yönlendirilmezseniz <a href="${e}">yeni adrese gitmek için tıklayın</a>.</p>`);
    }
    return {
      rows: [
        ['Meta etiketi', meta],
        ['Hedef adres', hedef],
        ['Bekleme süresi', sure === 0 ? '0 saniye (anında)' : `${h.fmt(sure, 0)} saniye`],
      ],
      text: L.join('\n'),
      note: v.kapsam === 'yedek' ? 'Meta ve canonical satırlarını head bölümüne, paragraf satırını body bölümüne yerleştirin.' : 'Etiketi sayfanın head bölümüne, mümkün olduğunca üste yerleştirin.',
    };
  }
