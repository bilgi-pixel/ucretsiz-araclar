// Unix zaman damgası ↔ tarih dönüşümü — saf mantık (DOM yok).
export const MAX_MS = 8.64e15; // JavaScript Date sınırı (±275.760 yıl)
export const TR_ZONE = 'Europe/Istanbul';

/** Metni sayıya çevirir; yalnızca (isteğe bağlı eksi ve ondalıklı) rakam kabul edilir. */
export function parseStamp(text) {
  const s = String(text ?? '').trim().replace(/[\s_]/g, '').replace(',', '.');
  if (s === '') throw new Error('Zaman damgası boş. Örneğin 1700000000 (saniye) ya da 1700000000000 (milisaniye) yazın.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) throw new Error('Zaman damgası yalnızca rakamlardan oluşmalı (örneğin 1700000000). Harf, boşluk ve tarih biçimi kullanmayın.');
  return Number(s);
}

/** Birim: 'auto' | 's' | 'ms'. Otomatikte |n| >= 1e11 ise milisaniye sayılır. */
export function toMs(n, unit = 'auto') {
  const u = unit === 'auto' ? (Math.abs(n) >= 1e11 ? 'ms' : 's') : unit;
  const ms = u === 'ms' ? Math.trunc(n) : Math.round(n * 1000);
  if (Math.abs(ms) > MAX_MS) throw new Error('Bu zaman damgası desteklenen aralığın dışında. Birimi (saniye/milisaniye) kontrol edin ya da daha küçük bir değer girin.');
  return { ms, unit: u };
}

const pad = (n, w = 2) => String(n).padStart(w, '0');

/** Verilen saat diliminde "GG.AA.YYYY SS:DD:SS" ve haftanın günü. */
export function formatIn(ms, timeZone) {
  const d = new Date(ms);
  const parts = Object.fromEntries(new Intl.DateTimeFormat('tr-TR', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', weekday: 'long',
  }).formatToParts(d).map((p) => [p.type, p.value]));
  return { text: `${parts.day}.${parts.month}.${parts.year} ${parts.hour}:${parts.minute}:${parts.second}`, weekday: parts.weekday };
}

/** ISO 8601 (UTC). */
export function isoUtc(ms) { return new Date(ms).toISOString(); }

/** Bir zaman diliminin o andaki UTC farkı (ms). */
function zoneOffset(ms, timeZone) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(ms / 1000) * 1000;
}

/** "YYYY-MM-DDTHH:MM[:SS]" (datetime-local) → ms. zone: 'tr' | 'utc' | 'local'. */
export function fromLocalInput(value, zone = 'tr') {
  const m = /^(\d{4,6})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value || '').trim());
  if (!m) throw new Error('Tarih ve saat eksik ya da geçersiz. Gün, ay, yıl, saat ve dakikayı eksiksiz seçin.');
  const [y, mo, d, h, mi, s] = [+m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] || 0)];
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59 || s > 59) throw new Error('Tarih ya da saat geçersiz. Değerleri takvim ve saat seçicisinden yeniden seçin.');
  const asUtc = Date.UTC(y, mo - 1, d, h, mi, s);
  if (new Date(asUtc).getUTCDate() !== d) throw new Error('Bu gün seçilen ayda yok (örneğin 31 Nisan). Tarihi düzeltin.');
  let ms;
  if (zone === 'utc') ms = asUtc;
  else if (zone === 'local') ms = new Date(y, mo - 1, d, h, mi, s).getTime();
  else { ms = asUtc - zoneOffset(asUtc, TR_ZONE); ms = asUtc - zoneOffset(ms, TR_ZONE); }
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_MS) throw new Error('Tarih desteklenen aralığın dışında. Daha yakın bir tarih seçin.');
  return ms;
}

/** "3 yıl önce" gibi göreli metin. */
export function relative(ms, now = Date.now()) {
  const diff = ms - now;
  const rtf = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' });
  const a = Math.abs(diff) / 1000;
  const steps = [['year', 31557600], ['month', 2629800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
  for (const [u, sec] of steps) if (a >= sec || u === 'second') return rtf.format(Math.round(diff / 1000 / sec), u);
}
