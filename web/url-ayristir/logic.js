// URL Ayrıştırma (Parçalarına Ayırma) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.adres ?? '').trim();
    if (t === '') h.err('Ayrıştırılacak adresi yazın ya da yapıştırın.');
    if (/\s/.test(t)) h.err('Adres boşluk içeremez. Boşlukları %20 ile kodlayın ya da adresi tek parça hâlinde yapıştırın.');
    let varsayildi = false;
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) || /^[^/?#]+:\d+([/?#]|$)/.test(t) && !/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)) {
      t = 'https://' + t.replace(/^\/\//, ''); varsayildi = true;
    }
    let u;
    try { u = new URL(t); } catch { h.err('Adres ayrıştırılamadı. Ana makine adını ve port numarasını kontrol edin (örn. ornek.com/sayfa?id=5).'); }
    const sema = u.protocol.replace(/:$/, '');
    const VARS = { http: '80', https: '443', ftp: '21', ws: '80', wss: '443' };
    const port = u.port ? u.port : (VARS[sema] && u.hostname ? `${VARS[sema]} (varsayılan)` : '—');
    const coz = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
    const params = [...new URLSearchParams(u.search)];
    const kullanici = u.username ? coz(u.username) + (u.password ? ' (parola: ' + coz(u.password) + ')' : '') : '—';
    const yol = u.pathname || '—';
    const rows = [
      ['Ana makine (host)', u.hostname || '—'],
      ['Şema', sema + (varsayildi ? ' (varsayıldı)' : '')],
      ['Port', port],
      ['Kullanıcı bilgisi', kullanici],
      ['Yol', yol],
    ];
    if (yol !== '—' && coz(yol) !== yol) rows.push(['Yol (çözülmüş)', coz(yol)]);
    rows.push(
      ['Sorgu dizesi', u.search ? u.search.slice(1) : '—'],
      ['Parametre sayısı', String(params.length)],
      ['Parça (fragment)', u.hash ? coz(u.hash.slice(1)) : '—'],
      ['Köken (origin)', u.origin && u.origin !== 'null' ? u.origin : '—'],
      ['Düzgünleştirilmiş adres', u.href],
    );
    const res = { rows, note: varsayildi ? 'Adreste şema bulunmadığı için https varsayıldı.' : 'Ana makine adı küçük harfe çevrilir; yoldaki "." ve ".." parçaları sadeleştirilir.' };
    if (params.length) res.text = 'Sorgu parametreleri:\n' + params.map(([k, d], i) => `${i + 1}. ${k} = ${d}`).join('\n');
    return res;
  }
