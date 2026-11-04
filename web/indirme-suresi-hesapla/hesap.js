// İndirme süresi hesabı (saf JS, DOM yok). Girdiler tarayıcıda kalır; hiçbir veri gömülü ya da gönderilmez.
const nf = (min, max) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max });
const fNum = nf(0, 2), fOne = nf(0, 1), fSig = new Intl.NumberFormat('tr-TR', { maximumSignificantDigits: 5 });
export const fmtNum = (x) => fNum.format(x);

/** Türkçe sayı girişini çözer: "1.024,5", "4,7", "50", "4.7". Geçersizse NaN, boşsa null. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (t === '') return null;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

// Dosya boyutu birimleri: bayt üssü (taban 1000 ya da 1024 ile birlikte kullanılır).
export const SIZE_POW = { kb: 1, mb: 2, gb: 3, tb: 4 };
export const SIZE_LABEL = { kb: 'KB', mb: 'MB', gb: 'GB', tb: 'TB' };
// Hız birimleri: bit tabanlı olanlar her zaman 10'un kuvveti (ağ standardı); bayt tabanlı olanlar seçilen tabanı kullanır.
export const SPEED_UNITS = {
  kbps: { label: 'Kbps', bits: 1e3 },
  mbps: { label: 'Mbps', bits: 1e6 },
  gbps: { label: 'Gbps', bits: 1e9 },
  kbs: { label: 'KB/s', pow: 1 },
  mbs: { label: 'MB/s', pow: 2 },
  gbs: { label: 'GB/s', pow: 3 },
};
const TIME_SEC = { sn: 1, dk: 60, sa: 3600 };

/** Boyutu bayta çevirir. */
export function sizeToBytes(value, unit, base) {
  if (!(unit in SIZE_POW)) throw new Error('Boyut birimi seçilmedi. KB, MB, GB ya da TB seçin.');
  return value * Math.pow(base, SIZE_POW[unit]);
}
/** Hızı bit/saniyeye çevirir. */
export function speedToBps(value, unit, base) {
  const u = SPEED_UNITS[unit];
  if (!u) throw new Error('Hız birimi seçilmedi. Kbps, Mbps, Gbps, KB/s ya da MB/s seçin.');
  return u.bits ? value * u.bits : value * Math.pow(base, u.pow) * 8;
}
/** bit/saniyeyi istenen birime çevirir. */
export function bpsToUnit(bps, unit, base) {
  const u = SPEED_UNITS[unit];
  return u.bits ? bps / u.bits : bps / 8 / Math.pow(base, u.pow);
}

/** Bayt miktarını okunur birimle yazar: 1250000 → "1,25 MB". */
export function fmtBytes(bytes, base = 1000) {
  const names = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0, v = bytes;
  while (i < names.length - 1 && v >= base) { v /= base; i++; }
  return `${fNum.format(v)} ${names[i]}`;
}
/** bit/saniyeyi okunur biçimde yazar (Kbps, Mbps, Gbps). */
export function fmtSpeed(bps) {
  if (bps >= 1e9) return `${fNum.format(bps / 1e9)} Gbps`;
  if (bps >= 1e6) return `${fNum.format(bps / 1e6)} Mbps`;
  return `${fNum.format(bps / 1e3)} Kbps`;
}
/** bit/saniyenin bayt karşılığı: 100 Mbps → "12,5 MB/s". */
export function fmtByteRate(bps, base = 1000) {
  return `${fmtBytes(bps / 8, base)}/s`;
}
/** Saniyeyi okunur süreye çevirir: 4000 → "1 sa 6 dk 40 sn". */
export function fmtDuration(sec) {
  if (!Number.isFinite(sec)) return '—';
  if (sec < 60) return `${fOne.format(sec)} sn`;
  let rest = Math.round(sec);
  const parts = [];
  const d = Math.floor(rest / 86400); rest -= d * 86400;
  const h = Math.floor(rest / 3600); rest -= h * 3600;
  const m = Math.floor(rest / 60); rest -= m * 60;
  if (d) parts.push(`${d} gün`);
  if (h) parts.push(`${h} sa`);
  if (m) parts.push(`${m} dk`);
  if (rest || !parts.length) parts.push(`${rest} sn`);
  return parts.join(' ');
}

/** Zorunlu pozitif sayı: boş ya da geçersizse çözüm öneren Türkçe hata. */
function need(v, label, example) {
  const n = parseNum(v);
  if (n === null) throw new Error(`${label} boş. Bir sayı yazın (örn. ${example}).`);
  if (Number.isNaN(n)) throw new Error(`${label} geçersiz. Yalnızca rakam ve virgül kullanın (örn. ${example}).`);
  if (n <= 0) throw new Error(`${label} sıfırdan büyük olmalıdır. Değeri kontrol edip yeniden girin.`);
  return n;
}
/** Verim yüzdesi: boşsa 100; 1-100 dışı hata. */
function efficiency(v) {
  const n = parseNum(v === '' || v == null ? '100' : v);
  if (n === null || Number.isNaN(n) || n < 1 || n > 100) {
    throw new Error('Verim yüzdesi 1 ile 100 arasında olmalıdır. Gerçek hız genelde %80-90 olduğundan 85 gibi bir değer yazabilirsiniz.');
  }
  return n;
}
function baseOf(v) {
  const b = Number(v.base);
  return b === 1024 ? 1024 : 1000;
}
function guard(x) {
  if (!Number.isFinite(x)) throw new Error('Sonuç hesaplanamayacak kadar büyük. Değerleri küçültüp yeniden deneyin.');
  return x;
}

/**
 * Hesap: mode = 'time' | 'speed' | 'convert'. Dönüş: { rows: [[etiket, değer, vurgulu?]], notes: [], summary }.
 */
export function calc(mode, v) {
  const rows = [], notes = [];
  const base = baseOf(v);

  if (mode === 'time') {
    const size = need(v.size, 'Dosya boyutu', '1,5');
    const speed = need(v.speed, 'Bağlantı hızı', '100');
    const eff = efficiency(v.eff);
    const bytes = sizeToBytes(size, v.sizeUnit, base);
    const bps = speedToBps(speed, v.speedUnit, base);
    const effBps = bps * (eff / 100);
    const sec = guard((bytes * 8) / effBps);
    const sizeLabel = `${fmtNum(size)} ${SIZE_LABEL[v.sizeUnit]}`;
    rows.push(['Dosya boyutu', sizeLabel]);
    // Girilen birimin karşı ailesini göster: bit girildiyse bayt, bayt girildiyse bit karşılığı.
    const other = SPEED_UNITS[v.speedUnit].bits ? fmtByteRate(bps, base) : fmtSpeed(bps);
    rows.push(['Bağlantı hızı', `${fmtNum(speed)} ${SPEED_UNITS[v.speedUnit].label} = ${other}`]);
    if (eff < 100) rows.push([`Verim (%${fmtNum(eff)}) ile etkin hız`, `${fmtSpeed(effBps)} = ${fmtByteRate(effBps, base)}`]);
    rows.push(['Tahmini indirme süresi', fmtDuration(sec), true]);
    rows.push(['Saniye cinsinden', `${fmtNum(sec)} sn`]);
    if (eff === 100) {
      rows.push(['Gerçekçi aralık (%90 - %80 verim)', `${fmtDuration(sec / 0.9)} - ${fmtDuration(sec / 0.8)}`]);
      notes.push('Süre kuramsal hızla hesaplandı. Gerçek indirmelerde hız genelde bağlantı hızının %80-90\'ı kadardır; "Verim" alanına 85 yazarak sonucu gerçeğe yaklaştırabilirsiniz.');
    }
    if (v.speedUnit === 'mbps' || v.speedUnit === 'gbps' || v.speedUnit === 'kbps') {
      notes.push('Mbps megabit demektir; 1 bayt 8 bittir, dolayısıyla 8 Mbps bağlantıda en çok 1 MB/s dosya hızı görürsünüz.');
    }
    return { rows, notes, summary: `${sizeLabel} dosya, ${fmtNum(speed)} ${SPEED_UNITS[v.speedUnit].label} hızda${eff < 100 ? ` (verim %${fmtNum(eff)})` : ''}: yaklaşık ${fmtDuration(sec)} (${fmtNum(sec)} sn)` };
  }

  if (mode === 'speed') {
    const size = need(v.size, 'Dosya boyutu', '1,5');
    const time = need(v.time, 'Hedef süre', '10');
    const eff = efficiency(v.eff);
    if (!(v.timeUnit in TIME_SEC)) throw new Error('Süre birimi seçilmedi. Saniye, dakika ya da saat seçin.');
    const bytes = sizeToBytes(size, v.sizeUnit, base);
    const sec = time * TIME_SEC[v.timeUnit];
    const needBps = guard((bytes * 8) / sec / (eff / 100));
    const sizeLabel = `${fmtNum(size)} ${SIZE_LABEL[v.sizeUnit]}`;
    rows.push(['Dosya boyutu', sizeLabel]);
    rows.push(['Hedef süre', fmtDuration(sec)]);
    if (eff < 100) rows.push(['Verim payı', `%${fmtNum(eff)}`]);
    rows.push(['Gereken bağlantı hızı', fmtSpeed(needBps), true]);
    rows.push(['Bayt cinsinden', fmtByteRate(needBps, base), true]);
    rows.push(['Kbps cinsinden', `${fmtNum(needBps / 1e3)} Kbps`]);
    if (eff === 100) {
      rows.push(['Gerçek yaşam için öneri (%85 verim)', `${fmtSpeed(needBps / 0.85)} (${fmtByteRate(needBps / 0.85, base)})`]);
      notes.push('İlk değer kuramsal minimumdur. Hat paylaşımı, Wi-Fi ve sunucu hızı nedeniyle gerçek hız düşebileceğinden, öneri satırındaki değeri ya da bir üst tarifeyi hedefleyin.');
    }
    return { rows, notes, summary: `${sizeLabel} dosyayı ${fmtDuration(sec)} içinde indirmek için gereken hız: ${fmtSpeed(needBps)} (${fmtByteRate(needBps, base)})` };
  }

  if (mode === 'convert') {
    const value = need(v.value, 'Hız değeri', '100');
    const u = SPEED_UNITS[v.unit];
    if (!u) throw new Error('Hız birimi seçilmedi. Kbps, Mbps, Gbps, KB/s ya da MB/s seçin.');
    const bps = speedToBps(value, v.unit, base);
    const bitFamily = Boolean(u.bits);
    Object.keys(SPEED_UNITS).forEach((k) => {
      const out = bpsToUnit(bps, k, base);
      const isBit = Boolean(SPEED_UNITS[k].bits);
      rows.push([SPEED_UNITS[k].label, `${fSig.format(out)} ${SPEED_UNITS[k].label}`, k !== v.unit && isBit !== bitFamily]);
    });
    notes.push(`Bayt tabanlı birimlerde 1 MB = ${base === 1024 ? '1024 KB (ikili)' : '1000 KB (ondalık)'} kabul edildi. Bit tabanlı Kbps, Mbps ve Gbps her zaman 1000'in katlarıdır.`);
    const main = bitFamily ? `${fSig.format(bpsToUnit(bps, 'mbs', base))} MB/s` : `${fSig.format(bpsToUnit(bps, 'mbps', base))} Mbps`;
    return { rows, notes, summary: `${fmtNum(value)} ${u.label} = ${main}` };
  }
  throw new Error('Hesaplama türü seçilmedi. Üstteki seçeneklerden birini işaretleyin.');
}

/** Hızlı tablo: dosya boyutu (bayt) ve hız (Mbps) için kuramsal süre metni. */
export function quickCell(size, sizeUnit, mbps, base = 1000) {
  const bytes = sizeToBytes(size, sizeUnit, base);
  return fmtDuration((bytes * 8) / (mbps * 1e6));
}
