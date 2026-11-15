// robots.txt Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ajanlar = String(v.ajan ?? '').split(/[,\n]+/).map((x) => x.trim()).filter(Boolean);
    if (!ajanlar.length) ajanlar.push('*');
    for (const a of ajanlar) if (!/^(\*|[A-Za-z0-9_./ -]+)$/.test(a)) h.err(`Tarayıcı adı geçersiz: "${a}". Tüm tarayıcılar için yalnızca * yazın ya da tarayıcının adını harf ve rakamlarla girin.`);
    const yollar = (s, ad) => h.lines(s).map((y) => {
      if (/\s/.test(y)) h.err(`"${ad}" alanındaki "${y}" yolunda boşluk var. Her satıra tek bir yol yazın; boşluk içeren yolları %20 ile kodlayın.`);
      if (/^[a-z][a-z0-9+.-]*:\/\//i.test(y)) h.err(`"${ad}" alanına tam adres değil, yalnızca yol yazın (örn. /yonetim/).`);
      return y.startsWith('/') ? y : '/' + y;
    });
    const engel = [...new Set(yollar(v.engelle, 'Engellenecek yollar'))];
    const izin = [...new Set(yollar(v.izin, 'İzin verilecek yollar'))];
    const satir = ajanlar.map((a) => `User-agent: ${a}`);
    let ozet;
    if (v.politika === 'acik') { satir.push('Disallow:'); ozet = 'Tüm site taramaya açık'; }
    else if (v.politika === 'kapali') { satir.push('Disallow: /'); ozet = 'Tüm site taramaya kapalı'; }
    else {
      for (const y of izin) satir.push(`Allow: ${y}`);
      for (const y of engel) satir.push(`Disallow: ${y}`);
      if (!engel.length) satir.push('Disallow:');
      ozet = engel.length ? `${engel.length} yol engellendi, ${izin.length} yola izin verildi` : 'Engel yok; tüm site taramaya açık';
    }
    const g = String(v.gecikme ?? '').trim();
    if (g !== '') {
      const sn = h.nonneg(g, 'Tarama gecikmesi');
      if (sn > 0) satir.push(`Crawl-delay: ${String(sn)}`);
    }
    let harita = String(v.harita ?? '').trim();
    if (harita !== '') {
      if (/\s/.test(harita)) h.err('Site haritası adresi boşluk içeremez.');
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(harita)) harita = 'https://' + harita.replace(/^\/\//, '');
      let u;
      try { u = new URL(harita); } catch { h.err('Site haritası adresi geçerli görünmüyor (örn. ornek.com/sitemap.xml).'); }
      if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.')) h.err('Site haritası adresi http ya da https ile başlayan tam bir web adresi olmalıdır (örn. ornek.com/sitemap.xml).');
      harita = u.href;
      satir.push('', `Sitemap: ${harita}`);
    }
    return {
      rows: [
        ['Özet', ozet],
        ['Tarayıcı (User-agent)', ajanlar.join(', ')],
        ['Site haritası', harita || '—'],
        ['Satır sayısı', String(satir.length)],
      ],
      text: satir.join('\n'),
      note: 'Dosyayı robots.txt adıyla, UTF-8 düz metin olarak sitenizin kök dizinine yükleyin.',
    };
  }
