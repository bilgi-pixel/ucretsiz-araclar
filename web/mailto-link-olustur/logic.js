// Mailto Bağlantısı Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const liste = (s, ad, zorunlu) => {
      const p = String(s ?? '').split(/[,;\s]+/).map((x) => x.trim()).filter(Boolean);
      if (zorunlu && !p.length) h.err(`"${ad}" alanına en az bir e-posta adresi yazın.`);
      for (const a of p) {
        if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(a)) h.err(`"${ad}" alanındaki "${a}" geçerli bir e-posta adresi değil (örn. ad@ornek.com).`);
      }
      return p;
    };
    const kod = (s) => encodeURIComponent(String(s).replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n')).replace(/'/g, '%27');
    const adr = (a) => a.map((x) => x.replace(/%/g, '%25').replace(/&/g, '%26').replace(/\?/g, '%3F').replace(/#/g, '%23')).join(',');
    const kime = liste(v.kime, 'Alıcı e-posta adresi', true);
    const cc = liste(v.cc, 'CC', false);
    const bcc = liste(v.bcc, 'BCC', false);
    const konu = String(v.konu ?? '').trim();
    const govde = String(v.govde ?? '').replace(/\s+$/, '');
    const q = [];
    if (cc.length) q.push('cc=' + adr(cc));
    if (bcc.length) q.push('bcc=' + adr(bcc));
    if (konu) q.push('subject=' + kod(konu));
    if (govde) q.push('body=' + kod(govde));
    const url = 'mailto:' + adr(kime) + (q.length ? '?' + q.join('&') : '');
    const yazi = String(v.metin ?? '').trim() || kime[0];
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const html = `<a href="${escH(url)}">${escH(yazi)}</a>`;
    return {
      rows: [
        ['Mailto bağlantısı', url],
        ['Alıcı sayısı', String(kime.length + cc.length + bcc.length)],
        ['Bağlantı uzunluğu', `${url.length} karakter`],
      ],
      text: url + '\n\n' + html,
      note: url.length > 2000 ? 'Bağlantı 2.000 karakteri aşıyor; bazı tarayıcı ve e-posta programları uzun mailto adreslerini kesebilir. Mesaj metnini kısaltın.' : 'İlk satır bağlantının kendisi, ikinci blok sayfanıza yapıştıracağınız HTML kodudur.',
    };
  }
