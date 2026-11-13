// UUID üretme ve doğrulama mantığı — DOM yok; TR ve EN sayfalar ortak kullanır.
const hex = (b) => b.toString(16).padStart(2, '0');

/** RFC 9562 sürüm 4 (rastgele) UUID. crypto.getRandomValues kullanır. */
export function uuidv4() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map(hex).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** RFC 9562 sürüm 7: ilk 48 bit Unix milisaniye zamanı, kalanı rastgele; zamana göre sıralanabilir. */
export function uuidv7(now = Date.now()) {
  const b = crypto.getRandomValues(new Uint8Array(16));
  let t = BigInt(now);
  for (let i = 5; i >= 0; i--) { b[i] = Number(t & 0xffn); t >>= 8n; }
  b[6] = (b[6] & 0x0f) | 0x70; b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map(hex).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** Biçim seçenekleri: büyük harf, tiresiz, süslü parantez. */
export function format(u, { upper = false, hyphens = true, braces = false } = {}) {
  let s = hyphens ? u : u.replace(/-/g, '');
  if (upper) s = s.toUpperCase();
  return braces ? `{${s}}` : s;
}

/** Bir metnin UUID olup olmadığını ve sürümünü söyler. */
export function inspect(text) {
  const t = String(text).trim().replace(/^[{(]|[})]$/g, '').replace(/^urn:uuid:/i, '');
  const m = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i.exec(t);
  if (!m) return { ok: false };
  const h = m.slice(1).join('').toLowerCase();
  if (/^0{32}$/.test(h)) return { ok: true, version: 0, nil: true, canonical: `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}` };
  const version = parseInt(h[12], 16);
  const v = parseInt(h[16], 16);
  const variant = v >= 8 && v <= 11 ? 'RFC' : v < 8 ? 'NCS' : v < 14 ? 'Microsoft' : 'reserved';
  let time = null;
  if (version === 7) time = new Date(Number(BigInt('0x' + h.slice(0, 12))));
  return { ok: true, version, variant, time, canonical: `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}` };
}
