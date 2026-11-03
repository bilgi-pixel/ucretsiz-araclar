// Regex değerlendirme işçisi: ağır desenler ana sayfayı dondurmasın diye ayrı iş parçacığında çalışır.
// Ana sayfa 2 saniyede yanıt gelmezse bu işçiyi sonlandırır (catastrophic backtracking koruması).
const LIMIT = 5000; // en fazla bu kadar eşleşme toplanır

self.onmessage = (e) => {
  const { id, pattern, flags, text, replacement, doReplace } = e.data;
  try {
    const re = new RegExp(pattern, flags);
    const repeat = re.global || re.sticky;
    const matches = [];
    let truncated = false;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (matches.length >= LIMIT) { truncated = true; break; }
      matches.push({
        index: m.index,
        text: m[0],
        groups: m.slice(1).map((g) => (g === undefined ? null : g)),
        named: m.groups ? Object.fromEntries(Object.entries(m.groups).map(([k, v]) => [k, v === undefined ? null : v])) : null,
      });
      if (!repeat) break;
      if (m[0] === '') re.lastIndex++; // boş eşleşmede sonsuz döngüyü önle
    }
    const out = { id, matches, truncated };
    if (doReplace) out.replaced = text.replace(new RegExp(pattern, flags), replacement);
    self.postMessage(out);
  } catch (err) {
    self.postMessage({ id, error: String((err && err.message) || err) });
  }
};
