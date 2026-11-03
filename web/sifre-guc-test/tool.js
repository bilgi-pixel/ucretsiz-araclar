// Şifre Güvenlik Testi — entropi, kalıp tespiti ve tahmini kırılma süresi.
// Şifre yalnızca bu sayfanın belleğinde işlenir: ağa gönderilmez, depolanmaz, günlüğe yazılmaz.
// (Aynı klasördeki yaygin.json yalnızca yaygın kalıp listesidir; şifre ona gönderilmez, liste buraya indirilir.)

const $ = (id) => document.getElementById(id);
const OFFLINE_RATE = 1e10; // çevrimdışı: saniyede 10 milyar tahmin
const ONLINE_RATE = 100; // çevrimiçi: saniyede 100 deneme

let rankMap = new Map(); // yaygın kelime/şifre → sıra (1 = en sık)
let listReady = false;

fetch('yaygin.json').then((r) => r.json()).then((j) => {
  j.liste.forEach((w, i) => rankMap.set(w, i + 1));
  listReady = true;
  analyze();
}).catch(() => { /* liste yüklenemezse kalıp denetimi yalnızca dizilerle sınırlı kalır */ });

// ---- Normalleştirme: Türkçe karakterleri ve l33t yazımını düz harfe indirger (uzunluk korunur) ----
const TR = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
function fold(s) {
  let out = '';
  for (const ch of s) {
    const low = ch === 'İ' ? 'i' : ch === 'I' ? 'i' : ch.toLowerCase();
    out += TR[low] || low;
  }
  return out;
}
const LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's', '!': 'i', '€': 'e' };
const leet = (s) => [...s].map((c) => LEET[c] || c).join('');

// ---- Klavye dizileri (Q ve Türkçe Q) ----
const ROWS = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'qwertyuiopgu', 'asdfghjklsi', 'zxcvbnmoc', '1qaz2wsx3edc4rfv', 'qazwsxedcrfvtgb', '1q2w3e4r5t6y7u8i9o0p', 'poiuytrewq', 'lkjhgfdsa', 'mnbvcxz'];

const log2 = Math.log2;

/** Her konumda biten en ucuz parçalanma: dynamic programming. */
function analyzePassword(pw) {
  const chars = [...pw];
  const n = chars.length;
  const raw = chars.join('');
  const plain = chars.map((c) => fold(c)).join('');
  const leeted = leet(plain);

  // Küme boyutu (brute force havuzu)
  const has = { lower: /[a-zçğıöşü]/.test(pw), upper: /[A-ZÇĞİÖŞÜ]/.test(pw), digit: /[0-9]/.test(pw), symbol: /[^A-Za-z0-9çğıöşüÇĞİÖŞÜ\s\u0080-￿]/.test(pw), space: /\s/.test(pw), other: /[^\u0000-\u007F\sçğıöşüÇĞİÖŞÜ]/.test(pw) };
  let pool = 0;
  if (has.lower) pool += 26 + (/[çğıöşü]/.test(pw) ? 6 : 0);
  if (has.upper) pool += 26 + (/[ÇĞİÖŞÜ]/.test(pw) ? 6 : 0);
  if (has.digit) pool += 10;
  if (has.symbol) pool += 33;
  if (has.space) pool += 1;
  if (has.other) pool += 100;
  pool = Math.max(pool, 2);
  const perChar = log2(pool);

  // best[i] = ilk i karakteri açıklayan en düşük bit; seg[i] = o parçanın bilgisi
  const best = new Array(n + 1).fill(Infinity);
  const seg = new Array(n + 1).fill(null);
  best[0] = 0;
  const consider = (i, j, bits, type, extra) => {
    if (best[i] + bits < best[j]) { best[j] = best[i] + bits; seg[j] = { from: i, to: j, type, bits, ...extra }; }
  };

  for (let i = 0; i < n; i++) {
    if (best[i] === Infinity) continue;
    // 1) Brute force: tek karakter
    consider(i, i + 1, perChar, 'brute');

    // 2) Sözlük (düz ve l33t yazım)
    for (let len = 3; len <= Math.min(24, n - i); len++) {
      const wordPlain = plain.slice(i, i + len), wordLeet = leeted.slice(i, i + len);
      const piece = raw.slice(i, i + len);
      const hasUpper = /[A-ZÇĞİÖŞÜ]/.test(piece);
      const hasLeetChars = wordPlain !== wordLeet;
      let r = rankMap.get(wordPlain);
      if (r) consider(i, i + len, log2(r) + (hasUpper ? 1 : 0) + 0.5, 'word', { word: piece, rank: r, leet: false });
      r = hasLeetChars ? rankMap.get(wordLeet) : 0;
      if (r) consider(i, i + len, log2(r) + (hasUpper ? 1 : 0) + 2, 'word', { word: piece, rank: r, leet: true });
    }
    // kısa (1-2 harf) sözlük kayıtları yalnızca tam eşleşmede (örn. "gs", "fb") anlamlı
    if (i === 0 && n <= 2) {
      const r = rankMap.get(plain);
      if (r) consider(0, n, log2(r) + 0.5, 'word', { word: raw, rank: r, leet: false });
    }
    // tüm şifre listede mi (bütün parola yaygın): ek güvence
    if (i === 0) {
      const r = rankMap.get(plain) || rankMap.get(leeted);
      if (r) consider(0, n, log2(r) + 0.49, 'common', { word: raw, rank: r });
    }

    // 3) Ardışık dizi (1234, abcd, 9876, dcba)
    if (n - i >= 3) {
      const d = chars[i + 1].codePointAt(0) - chars[i].codePointAt(0);
      if (d === 1 || d === -1) {
        let j = i + 1;
        while (j < n && chars[j].codePointAt(0) - chars[j - 1].codePointAt(0) === d) j++;
        for (let e = i + 3; e <= j; e++) {
          const base = /[0-9]/.test(chars[i]) ? 10 : 26;
          consider(i, e, log2(base) + 1 + log2(e - i), 'sequence', { text: chars.slice(i, e).join('') });
        }
      }
    }

    // 4) Tekrar: aynı birimin birkaç kez yinelenmesi ("aaaa", "abab", "123123")
    for (let u = 1; u <= Math.floor((n - i) / 2); u++) {
      const unit = raw.slice(i, i + u);
      let k = 1;
      while (raw.slice(i + k * u, i + (k + 1) * u) === unit) k++;
      if (k >= 2 && k * u >= 3) {
        for (let kk = 2; kk <= k; kk++) {
          if (kk * u < 3) continue;
          consider(i, i + kk * u, Math.min(perChar * u, 12) + log2(kk) + 1, 'repeat', { text: raw.slice(i, i + kk * u), unit });
        }
      }
    }

    // 5) Klavye dizisi (qwerty, asdf, 1qaz2wsx, ileri ya da geri)
    for (let len = 3; len <= Math.min(20, n - i); len++) {
      const s = plain.slice(i, i + len);
      if (ROWS.some((row) => row.includes(s) || row.includes([...s].reverse().join('')))) {
        consider(i, i + len, log2(40) + 1 + log2(len), 'keyboard', { text: raw.slice(i, i + len) });
      }
    }

    // 6) Yıl (1900-2099) ve ay/gün biçimli tarihler
    if (/^(19|20)\d\d$/.test(raw.slice(i, i + 4))) consider(i, i + 4, log2(120), 'year', { text: raw.slice(i, i + 4) });
    if (/^\d{8}$/.test(raw.slice(i, i + 8)) && /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])(19|20)\d\d$/.test(raw.slice(i, i + 8))) {
      consider(i, i + 8, log2(31 * 12 * 120), 'date', { text: raw.slice(i, i + 8) });
    }
  }

  // Parçaları geri izle
  const parts = [];
  for (let k = n; k > 0;) { const s = seg[k]; parts.unshift(s); k = s.from; }
  // art arda gelen brute parçaları tek parçada topla
  const merged = [];
  for (const p of parts) {
    const last = merged[merged.length - 1];
    if (p.type === 'brute' && last && last.type === 'brute') { last.to = p.to; last.bits += p.bits; }
    else merged.push({ ...p });
  }

  const bits = n ? Math.max(0, best[n]) : 0;
  return { bits, pool, has, parts: merged, length: n, naiveBits: n * perChar };
}

// ---- Süre biçimlendirme ----
function fmtDuration(sec) {
  const nf = (x) => new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(x);
  if (sec < 1) return 'bir saniyeden kısa sürede';
  if (sec < 60) return `${nf(sec)} saniye`;
  if (sec < 3600) return `${nf(sec / 60)} dakika`;
  if (sec < 86400) return `${nf(sec / 3600)} saat`;
  if (sec < 86400 * 365) return `${nf(sec / 86400)} gün`;
  const y = sec / (86400 * 365.25);
  if (y < 1000) return `${nf(y)} yıl`;
  if (y < 1e6) return `${nf(y / 1000)} bin yıl`;
  if (y < 1e9) return `${nf(y / 1e6)} milyon yıl`;
  if (y < 1e12) return `${nf(y / 1e9)} milyar yıl`;
  return 'evrenin yaşından (yaklaşık 13,8 milyar yıl) çok daha uzun';
}

function level(bits) {
  if (bits < 28) return { name: 'Çok zayıf', cls: 'l0' };
  if (bits < 40) return { name: 'Zayıf', cls: 'l1' };
  if (bits < 60) return { name: 'Orta', cls: 'l2' };
  if (bits < 80) return { name: 'Güçlü', cls: 'l3' };
  return { name: 'Çok güçlü', cls: 'l4' };
}

const TYPE_TEXT = {
  common: (p) => `Bu şifre en sık kullanılan şifreler arasında (listede ${p.rank}. sırada). Saldırganlar ilk bu listeleri dener.`,
  word: (p) => `Yaygın bir kelime ya da kalıp: "${p.word}"${p.leet ? ' (harfleri rakam/simgeyle değiştirmek sezilen bir hiledir)' : ''}. Takım, şehir, isim ve sözlük kelimeleri hızlı denenir.`,
  sequence: (p) => `Ardışık dizi: "${p.text}". 1234, abcd, 9876 gibi diziler hemen tahmin edilir.`,
  repeat: (p) => `Tekrar: "${p.text}". Aynı karakter ya da öbeğin yinelenmesi güvenliği artırmaz.`,
  keyboard: (p) => `Klavye dizisi: "${p.text}". qwerty, asdf, 1qaz2wsx gibi tuş yürüyüşleri bilinen kalıplardır.`,
  year: (p) => `Yıl: "${p.text}". Doğum ya da tarih yılları en kolay tahmin edilen eklerdendir.`,
  date: (p) => `Tarih biçimi: "${p.text}". Doğum ve evlilik tarihleri saldırganların ilk deneyeceği kalıplardır.`,
};

function render(res) {
  const pw = $('pw').value;
  const lv = level(res.bits);
  const score = Math.min(100, Math.round((res.bits / 90) * 100));
  $('empty').hidden = !!pw;
  $('report').hidden = !pw;
  if (!pw) return;

  $('score').textContent = String(score);
  $('label').textContent = lv.name;
  $('meter-fill').style.width = `${Math.max(3, score)}%`;
  $('meter-fill').className = `sg-fill ${lv.cls}`;
  $('meter').setAttribute('aria-valuenow', String(score));
  $('meter').setAttribute('aria-valuetext', `${lv.name}, ${score} puan`);

  $('bits').textContent = `${res.bits.toFixed(1).replace('.', ',')} bit`;
  $('naive').textContent = `${res.naiveBits.toFixed(1).replace('.', ',')} bit`;
  $('len').textContent = `${res.length} karakter`;

  const classes = [];
  if (res.has.lower) classes.push('küçük harf');
  if (res.has.upper) classes.push('BÜYÜK harf');
  if (res.has.digit) classes.push('rakam');
  if (res.has.symbol) classes.push('simge');
  if (res.has.space) classes.push('boşluk');
  if (res.has.other) classes.push('diğer karakterler');
  $('charset').textContent = `${classes.join(', ') || '—'} · havuz ≈ ${res.pool} karakter`;

  const avg = (rate) => Math.pow(2, Math.max(0, res.bits - 1)) / rate;
  $('offline').textContent = fmtDuration(avg(OFFLINE_RATE));
  $('online').textContent = fmtDuration(avg(ONLINE_RATE));

  // Bulgular
  const f = $('findings');
  f.textContent = '';
  const found = res.parts.filter((p) => p.type !== 'brute');
  const add = (list, text) => { const li = document.createElement('li'); li.textContent = text; list.appendChild(li); };
  if (!found.length) add(f, 'Bilinen bir kalıp, dizi, yıl ya da yaygın kelime bulunmadı.');
  const seenCommon = found.some((p) => p.type === 'common');
  for (const p of found) {
    if (seenCommon && p.type !== 'common') continue;
    add(f, TYPE_TEXT[p.type](p));
  }
  if (!listReady) add(f, 'Yaygın şifre listesi yüklenemedi; yalnızca dizi, tekrar ve klavye kalıpları denetlendi.');

  // Öneriler
  const s = $('suggestions');
  s.textContent = '';
  if (res.length < 12) add(s, `En az 12, mümkünse 14-16 karakter kullanın (şu an ${res.length}). Uzunluk, güvenliği en çok artıran etkendir.`);
  if (found.length) add(s, 'Kişisel bilgi (ad, takım, şehir, doğum yılı) ve sözlük kelimeleri yerine rastgele üretilmiş bir şifre ya da birbirinden bağımsız 4-5 kelimelik bir parola cümlesi kullanın.');
  if (res.length >= 8 && !(res.has.upper && res.has.lower)) add(s, 'Büyük ve küçük harfleri birlikte kullanmak havuzu genişletir; ancak sıradan yerlerde değil rastgele konumlarda kullanın.');
  if (!res.has.digit && res.length < 16) add(s, 'Araya rakam eklemek havuzu büyütür; ama "1" ya da yıl gibi tahmin edilebilir değerleri sona koymayın.');
  if (!res.has.symbol && res.length < 16) add(s, 'Birkaç simge (örneğin ! ? # %) havuzu büyütür; rastgele yerlere serpiştirin.');
  if (res.bits < 80) add(s, 'Önemli hesaplar için Şifre Üretici ile rastgele ve uzun bir şifre oluşturun ve bir şifre yöneticisinde saklayın.');
  add(s, 'Her hesapta farklı şifre kullanın ve mümkün olan her yerde iki adımlı doğrulamayı (2FA) açın; güçlü şifre bile sızıntıda işe yaramaz.');
  if (res.bits >= 80 && !found.length) add(s, 'Bu şifre iyi görünüyor. Başka bir yerde kullanmadığınızdan emin olun.');
}

function analyze() {
  const pw = $('pw').value;
  if (!pw) { render({}); return; }
  render(analyzePassword(pw.length > 128 ? pw.slice(0, 128) : pw));
  $('trunc').hidden = pw.length <= 128;
}

$('pw').addEventListener('input', analyze);

$('toggle').addEventListener('click', () => {
  const show = $('pw').type === 'password';
  $('pw').type = show ? 'text' : 'password';
  $('toggle').textContent = show ? 'Gizle' : 'Göster';
  $('toggle').setAttribute('aria-pressed', String(show));
});

$('clear').addEventListener('click', () => {
  $('pw').value = '';
  $('pw').type = 'password';
  $('toggle').textContent = 'Göster';
  $('toggle').setAttribute('aria-pressed', 'false');
  analyze();
  $('pw').focus();
});

analyze();
