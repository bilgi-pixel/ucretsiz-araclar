// Video dosya boyutu hesabı (saf JS, DOM yok). Girdiler tarayıcıda kalır; hiçbir veri gönderilmez.
const nf = (min, max) => new Intl.NumberFormat('tr-TR', { minimumFractionDigits: min, maximumFractionDigits: max });
const fNum = nf(0, 2), fOne = nf(0, 1), fZero = nf(0, 0), fRate = nf(0, 3);
export const fmtNum = (x) => fNum.format(x);

/** Türkçe sayı girişini çözer: "1.024,5", "8", "7,5", "4.7". Geçersizse NaN, boşsa null. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (t === '') return null;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Çözünürlük ve bit derinliği seçenekleri (ham boyut bilgisi için). */
export const RESOLUTIONS = {
  '1280x720': '720p (1280×720)',
  '1920x1080': '1080p (1920×1080)',
  '2560x1440': '1440p (2560×1440)',
  '3840x2160': '4K (3840×2160)',
  '7680x4320': '8K (7680×4320)',
};
const CAP_POW = { mb: 2, gb: 3, tb: 4 };

/** Bayt miktarını okunur birimle yazar: 609600000 → "609,6 MB". */
export function fmtBytes(bytes, base = 1000) {
  const names = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0, v = bytes;
  while (i < names.length - 1 && v >= base) { v /= base; i++; }
  return `${fNum.format(v)} ${names[i]}`;
}
/** bit/saniyeyi okunur biçimde yazar (kbps, Mbps, Gbps). */
export function fmtBitrate(bps) {
  if (bps >= 1e9) return `${fRate.format(bps / 1e9)} Gbps`;
  if (bps >= 1e6) return `${fRate.format(bps / 1e6)} Mbps`;
  return `${fOne.format(bps / 1e3)} kbps`;
}
/** Saniyeyi okunur süreye çevirir: 10214 → "2 sa 50 dk 14 sn". */
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
/** Ses bit hızı (kbps): boşsa 0; geçersizse hata. */
function audioBps(v) {
  const n = parseNum(v);
  if (n === null) return 0;
  if (Number.isNaN(n) || n < 0) throw new Error('Ses bit hızı geçersiz. Kbps cinsinden bir sayı yazın (örn. 128) ya da ses yoksa 0 yazın.');
  return n * 1e3;
}
/** Video bit hızını bit/saniyeye çevirir. */
function videoBps(v) {
  const n = need(v.vbr, 'Video bit hızı', v.vbrUnit === 'kbps' ? '8000' : '8');
  if (v.vbrUnit !== 'mbps' && v.vbrUnit !== 'kbps') throw new Error('Bit hızı birimi seçilmedi. Mbps ya da kbps seçin.');
  return n * (v.vbrUnit === 'mbps' ? 1e6 : 1e3);
}
/** Saat, dakika, saniye alanlarından toplam saniye; hepsi boşsa hata. */
function durationSec(v) {
  const part = (s, label) => {
    const n = parseNum(s);
    if (n === null) return 0;
    if (Number.isNaN(n)) throw new Error(`${label} geçersiz. Yalnızca rakam ve virgül kullanın (örn. 10).`);
    return n;
  };
  const sec = part(v.h, 'Saat') * 3600 + part(v.m, 'Dakika') * 60 + part(v.s, 'Saniye');
  if (!(sec > 0)) throw new Error('Süre boş. Saat, dakika ya da saniye alanlarından en az birine sıfırdan büyük bir değer yazın (örn. dakika: 10).');
  return sec;
}
function baseOf(v) { return Number(v.base) === 1024 ? 1024 : 1000; }
function guard(x) {
  if (!Number.isFinite(x)) throw new Error('Sonuç hesaplanamayacak kadar büyük. Değerleri küçültüp yeniden deneyin.');
  return x;
}

/** Bit hızına göre kabaca hangi çözünürlük sınıfına yettiği (H.264 varsayımı). */
export function qualityHint(videoBpsValue) {
  const mbps = videoBpsValue / 1e6;
  if (mbps < 1) return 'çok düşük kalite (yaklaşık 360p ve altı için)';
  if (mbps < 2.5) return 'yaklaşık 480p-720p için düşük/orta kalite';
  if (mbps < 6) return 'yaklaşık 720p için uygun';
  if (mbps < 12) return 'yaklaşık 1080p için uygun';
  if (mbps < 25) return 'yaklaşık 1080p60 ya da 1440p için uygun';
  return 'yaklaşık 4K için uygun';
}

/**
 * Hesap: mode = 'size' | 'need' | 'cap'. Dönüş: { rows: [[etiket, değer, vurgulu?]], notes: [], summary }.
 */
export function calc(mode, v) {
  const rows = [], notes = [];
  const base = baseOf(v);

  if (mode === 'size') {
    const vbps = videoBps(v);
    const abps = audioBps(v.abr);
    const dur = durationSec(v);
    const totalBps = vbps + abps;
    const videoBytes = guard((vbps * dur) / 8);
    const audioBytes = (abps * dur) / 8;
    const total = videoBytes + audioBytes;
    rows.push(['Süre', fmtDuration(dur)]);
    rows.push(['Video akışı', fmtBytes(videoBytes, base)]);
    if (abps > 0) rows.push(['Ses akışı', fmtBytes(audioBytes, base)]);
    rows.push(['Toplam dosya boyutu', fmtBytes(total, base), true]);
    rows.push(['Toplam bit hızı', fmtBitrate(totalBps)]);
    rows.push(['1 dakika ≈', fmtBytes((totalBps * 60) / 8, base)]);
    rows.push(['1 saat ≈', fmtBytes((totalBps * 3600) / 8, base)]);
    // İsteğe bağlı ham boyut bilgisi (çözünürlük seçilmişse)
    if (v.res) {
      const dims = String(v.res).split('x').map(Number);
      if (dims.length !== 2 || !dims.every((x) => x > 0)) throw new Error('Çözünürlük seçimi okunamadı. Listeden bir çözünürlük seçin ya da "Gösterme" seçeneğini kullanın.');
      const fpsRaw = parseNum(v.fps);
      if (fpsRaw === null || Number.isNaN(fpsRaw) || fpsRaw <= 0 || fpsRaw > 1000) {
        throw new Error('Ham boyut için kare hızı (fps) geçersiz. 30 ya da 29,97 gibi bir değer yazın ya da çözünürlük listesinden "Gösterme" seçin.');
      }
      const depth = Number(v.depth);
      if (![12, 24, 30].includes(depth)) throw new Error('Bit derinliği seçimi okunamadı. Listeden bir seçenek işaretleyin.');
      const rawBps = dims[0] * dims[1] * fpsRaw * depth;
      const resName = (RESOLUTIONS[v.res] || v.res).split(' ')[0];
      rows.push([`Ham veri hızı (${resName}, ${fmtNum(fpsRaw)} fps)`, fmtBitrate(rawBps)]);
      rows.push(['Ham boyut (sıkıştırılmamış)', fmtBytes((rawBps * dur) / 8, base)]);
      rows.push(['Yaklaşık sıkıştırma oranı', `${fZero.format(rawBps / vbps)} : 1`]);
      notes.push('Ham boyut yalnızca bilgi içindir: kamera sensöründen çıkan sıkıştırılmamış görüntü, seçtiğiniz çözünürlük, kare hızı ve bit derinliğiyle hesaplanır; ses dahil değildir.');
    }
    notes.push(`Video bit hızı ${qualityHint(vbps)}. Gerçek dosya boyutu; sabit/değişken bit hızı (CBR/VBR), kodek ve kapsayıcı (MP4, MKV) ek yüküne göre yaklaşık %5-10 sapabilir.`);
    return { rows, notes, summary: `${fmtDuration(dur)} video, ${fmtBitrate(vbps)} video${abps > 0 ? ` + ${fmtBitrate(abps)} ses` : ''}: yaklaşık ${fmtBytes(total, base)}` };
  }

  if (mode === 'need') {
    const n = need(v.target, 'Hedef boyut', '25');
    if (!(v.targetUnit in CAP_POW)) throw new Error('Boyut birimi seçilmedi. MB, GB ya da TB seçin.');
    const abps = audioBps(v.abr);
    const dur = durationSec(v);
    const bytes = n * Math.pow(base, CAP_POW[v.targetUnit]);
    const totalBps = guard((bytes * 8) / dur);
    const vbps = totalBps - abps;
    if (vbps <= 0) {
      throw new Error('Hedef boyut bu süre ve ses bit hızı için çok küçük; videoya pay kalmıyor. Hedef boyutu artırın, süreyi kısaltın ya da ses bit hızını düşürün.');
    }
    const safeBps = (totalBps * 0.95) - abps;
    rows.push(['Hedef boyut', `${fmtNum(n)} ${v.targetUnit.toUpperCase()}`]);
    rows.push(['Süre', fmtDuration(dur)]);
    rows.push(['Toplam bit hızı (video + ses)', fmtBitrate(totalBps)]);
    if (abps > 0) rows.push(['Ses bit hızı', fmtBitrate(abps)]);
    rows.push(['Gereken video bit hızı', `${fmtBitrate(vbps)} (${fZero.format(vbps / 1e3)} kbps)`, true]);
    if (safeBps > 0) rows.push(['Güvenli değer (%5 pay bırakarak)', `${fmtBitrate(safeBps)} (${fZero.format(safeBps / 1e3)} kbps)`, true]);
    notes.push(`Bu bit hızı ${qualityHint(vbps)}. Kapsayıcı ek yükü ve değişken bit hızı nedeniyle dosya hedefi biraz aşabilir; sınırı kesin geçmemek gerekiyorsa güvenli değeri kullanın.`);
    return { rows, notes, summary: `${fmtNum(n)} ${v.targetUnit.toUpperCase()} hedef, ${fmtDuration(dur)} süre: video bit hızı yaklaşık ${fmtBitrate(vbps)}` };
  }

  if (mode === 'cap') {
    const n = need(v.cap, 'Depolama kapasitesi', '64');
    if (!(v.capUnit in CAP_POW)) throw new Error('Kapasite birimi seçilmedi. MB, GB ya da TB seçin.');
    const vbps = videoBps(v);
    const abps = audioBps(v.abr);
    const totalBps = vbps + abps;
    const bytes = n * Math.pow(base, CAP_POW[v.capUnit]);
    const sec = guard((bytes * 8) / totalBps);
    rows.push(['Kapasite', `${fmtNum(n)} ${v.capUnit.toUpperCase()}`]);
    rows.push(['Toplam bit hızı (video + ses)', fmtBitrate(totalBps)]);
    rows.push(['Sığan kayıt süresi', fmtDuration(sec), true]);
    rows.push(['Dakika cinsinden', `${fOne.format(sec / 60)} dk`]);
    rows.push(['Saat cinsinden', `${fNum.format(sec / 3600)} sa`]);
    rows.push(['1 saatlik kayıt ≈', fmtBytes((totalBps * 3600) / 8, base)]);
    rows.push(['Biçimlendirme payıyla (%5 az alan)', fmtDuration(sec * 0.95)]);
    notes.push('Kartın üzerinde yazan kapasitenin tamamı kullanılamaz: dosya sistemi ve biçimlendirme yer kaplar, bazı kameralar da hızı değişken bit hızıyla kaydeder. Son satırdaki değer daha güvenli bir tahmindir.');
    return { rows, notes, summary: `${fmtNum(n)} ${v.capUnit.toUpperCase()} alana ${fmtBitrate(totalBps)} ile yaklaşık ${fmtDuration(sec)} (${fOne.format(sec / 60)} dk) kayıt sığar` };
  }
  throw new Error('Hesaplama türü seçilmedi. Üstteki seçeneklerden birini işaretleyin.');
}
