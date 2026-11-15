// Hreflang Etiketi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const adresDuzelt = (u, yer) => {
      let a = u.trim();
      const sema = /^([a-z][a-z0-9+.-]*):\/\//i.exec(a);
      if (sema && !/^https?$/i.test(sema[1])) h.err(`${yer}: adres http ya da https ile başlamalı.`);
      if (!sema) a = 'https://' + a.replace(/^\/+/, '');
      const host = a.replace(/^https?:\/\//i, '').split(/[/?#]/)[0];
      if (!host || !host.includes('.') || /\s/.test(a)) h.err(`${yer}: "${u}" tam bir adres değil. Hreflang için alan adını içeren tam adres gerekir (örn. ornek.com/en/).`);
      return a;
    };
    const kodDuzelt = (k, yer) => {
      const t = k.replace(/_/g, '-');
      if (/^x-default$/i.test(t)) return 'x-default';
      const m = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}))?$/i.exec(t);
      if (!m) h.err(`${yer}: "${k}" geçerli bir hreflang kodu değil. Dil kodu (tr, en) ya da dil-bölge (en-GB, de-AT) biçiminde yazın.`);
      const bolge = m[3] ? m[3].toUpperCase() : '';
      if (bolge === 'UK') h.err(`${yer}: Birleşik Krallık için bölge kodu UK değil GB olmalı (ör. en-GB).`);
      const yazi = m[2] ? m[2][0].toUpperCase() + m[2].slice(1).toLowerCase() : '';
      return [m[1].toLowerCase(), yazi, bolge].filter(Boolean).join('-');
    };
    const satirlar = h.lines(v.satirlar);
    if (!satirlar.length) h.err('En az iki dil sürümü yazın; her satıra bir dil kodu ve adres gelir.');
    const liste = [], gorulen = new Set();
    satirlar.forEach((s, i) => {
      const yer = `${i + 1}. satır`;
      const m = /^(\S+?)[\s,;=|]+(\S+)$/.exec(s);
      if (!m) h.err(`${yer}: dil kodu ve adresi boşlukla ayırarak yazın (örn. "tr ornek.com/").`);
      const kod = kodDuzelt(m[1], yer);
      if (gorulen.has(kod)) h.err(`${yer}: "${kod}" kodu birden fazla kez yazılmış. Her dil kodu yalnızca bir adrese işaret edebilir.`);
      gorulen.add(kod);
      liste.push([kod, adresDuzelt(m[2], yer)]);
    });
    const xd = String(v.varsayilan ?? '').trim();
    if (xd) {
      if (gorulen.has('x-default')) h.err('x-default hem satırlarda hem ayrı alanda yazılmış; yalnızca birini kullanın.');
      liste.push(['x-default', adresDuzelt(xd, 'x-default adresi')]);
    }
    if (liste.filter(([k]) => k !== 'x-default').length < 2) h.err('Hreflang en az iki dil sürümü olduğunda anlamlıdır; ikinci bir dil satırı ekleyin.');
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    let text;
    if (v.bicim === 'xml') text = liste.map(([k, u]) => `<xhtml:link rel="alternate" hreflang="${k}" href="${escH(u)}"/>`).join('\n');
    else if (v.bicim === 'http') text = 'Link: ' + liste.map(([k, u]) => `<${u}>; rel="alternate"; hreflang="${k}"`).join(', ');
    else text = liste.map(([k, u]) => `<link rel="alternate" hreflang="${k}" href="${escH(u)}">`).join('\n');
    return {
      rows: [
        ['Etiket sayısı', String(liste.length)],
        ['Dil kodları', liste.map(([k]) => k).join(', ')],
        ['x-default', liste.some(([k]) => k === 'x-default') ? 'Var' : 'Yok'],
      ],
      text,
      note: v.bicim === 'xml' ? 'Bu satırları site haritasındaki her dil sürümünün url öğesinin içine ekleyin; urlset öğesinde xhtml ad alanı tanımlı olmalıdır.' : v.bicim === 'http' ? 'Başlığı listedeki her adresin sunucu yanıtına ekleyin (PDF gibi HTML olmayan dosyalar için uygundur).' : 'Aynı etiket kümesini listedeki her dil sürümünün head bölümüne ekleyin.',
    };
  }
