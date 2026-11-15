// UTM Bağlantısı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let a = String(v.adres ?? '').trim();
    if (a === '') h.err('Etiket eklenecek sayfa adresini yazın (örn. ornek.com/kampanya).');
    if (/\s/.test(a)) h.err('Sayfa adresi boşluk içeremez. Adresi tarayıcının adres çubuğundan kopyalayıp yapıştırın.');
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(a)) a = 'https://' + a.replace(/^\/\//, '');
    let u;
    try { u = new URL(a); } catch { h.err('Sayfa adresi geçerli görünmüyor. Alan adını ve yolu kontrol edin (örn. ornek.com/kampanya).'); }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') h.err('UTM etiketleri yalnızca http ya da https ile başlayan web adreslerine eklenir.');
    if (!u.hostname.includes('.') && u.hostname !== 'localhost') h.err('Alan adı eksik görünüyor. Adresi uzantısıyla birlikte yazın (örn. ornek.com).');
    const sade = (s) => {
      let x = String(s ?? '').trim();
      if (v.duzen === 'aynen') return x;
      const H = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
      x = x.toLocaleLowerCase('tr').replace(/[çğıöşüâîû]/g, (c) => H[c]);
      return x.replace(/[^a-z0-9._-]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
    };
    const alan = [
      ['utm_source', sade(v.kaynak), 'Kaynak (utm_source)', true],
      ['utm_medium', sade(v.ortam), 'Ortam (utm_medium)', true],
      ['utm_campaign', sade(v.kampanya), 'Kampanya (utm_campaign)', true],
      ['utm_term', sade(v.terim), 'Terim', false],
      ['utm_content', sade(v.icerik), 'İçerik', false],
    ];
    for (const [, d, ad, zorunlu] of alan) if (zorunlu && d === '') h.err(`"${ad}" alanını doldurun. Kaynak, ortam ve kampanya adı birlikte kullanıldığında raporlar anlamlı olur.`);
    const rows = [];
    for (const [k, d] of alan) {
      if (d === '') { u.searchParams.delete(k); continue; }
      u.searchParams.set(k, d);
      rows.push([k, d]);
    }
    const link = u.href;
    return {
      rows: [['UTM bağlantısı', link], ...rows, ['Uzunluk', `${link.length} karakter`]],
      text: link,
      note: 'Adresteki diğer parametreler ve # bölümü korunur; önceden bulunan aynı adlı UTM etiketleri yeni değerlerle değiştirilir.',
    };
  }
