// Lorem Ipsum ve Türkçe örnek metin üretici — saf JS. Her şey tarayıcıda, rastgele ve sahte üretilir.
// Kural 8: gerçek kişi verisi, TC kimlik no veya IBAN üretilmez; ad/adres/telefon yalnızca biçimsel örnektir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_ITEMS = 500;      // paragraf/cümle/liste için üst sınır
const MAX_WORDS = 20000;    // kelime modunda üst sınır

/* ---------- Kelime havuzları ---------- */
const LATIN = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum at vero eos accusamus iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi occaecati cupiditate provident similique mollitia animi perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae dicta explicabo nemo ipsam quia voluptas aspernatur aut odit fugit consequuntur magni dolores eos ratione sequi nesciunt neque porro quisquam dolorem adipisci numquam eius modi tempora incidunt magnam quaerat').split(' ');

const TR = ('ağaç gölge şehir güneş ışık çocuk bahçe köprü yağmur rüzgâr deniz dağ ırmak göl orman çiçek yaprak toprak taş yol kapı pencere masa sandalye kitap defter kalem çanta okul öğrenci öğretmen sınıf ders bilgi düşünce hayal rüya umut sevgi dostluk emek çalışma başarı güç cesaret sabır özgürlük barış huzur sessizlik gürültü müzik şarkı türkü ezgi söz anlam cümle kelime harf sayfa hikâye masal roman şiir öykü yazar okur dinleyici izleyici sahne perde ışıltı gölgelik güzellik çirkinlik büyük küçük uzun kısa geniş dar derin sığ yüksek alçak hızlı yavaş sıcak soğuk ılık taze eski yeni genç yaşlı güçlü zayıf akıllı çalışkan cömert şımarık yaramaz sakin neşeli hüzünlü öfkeli şaşkın meraklı gizemli ışıklı karanlık aydınlık parlak mat renkli soluk kırmızı mavi yeşil sarı turuncu mor pembe beyaz siyah gri kahverengi çarşı pazar dükkân esnaf müşteri ürün hizmet fiyat değer kalite güven garanti teslimat kargo paket fatura sipariş sepet ödeme kampanya indirim fırsat seçenek çözüm yöntem süreç sistem yazılım donanım ağ sunucu bilgisayar telefon ekran klavye fare yazıcı tarayıcı dosya klasör belge rapor tablo grafik liste form alan düğme bağlantı sayfa tasarım renk yazı tipi görsel resim fotoğraf video ses kayıt arşiv yedek güvenlik gizlilik koruma erişim kullanıcı yönetici ziyaretçi üye proje görev takvim toplantı plan hedef strateji analiz araştırma geliştirme deneme test sonuç öneri değerlendirme karar uygulama gelişim değişim dönüşüm yenilik buluş keşif yolculuk macera gezi tatil sahil kumsal dalga martı balık vapur liman rıhtım feneri sabah öğle akşam gece gün hafta ay yıl mevsim ilkbahar yaz sonbahar kış kar buz sis bulut yıldız gökyüzü evren dünya ülke kasaba köy mahalle sokak cadde meydan park müze kütüphane tiyatro sinema galeri festival bayram düğün kutlama armağan misafir komşu aile anne baba kardeş dede nine amca hala dayı teyze arkadaş yoldaş ustalık meslek zanaat sanat tasarımcı mühendis doktor hemşire çiftçi balıkçı fırıncı aşçı lezzet tatlı tuzlu ekşi acı baharat çorba pilav börek çay kahve süt yoğurt ekmek peynir zeytin bal reçel meyve sebze elma armut üzüm incir nar şeftali kiraz çilek').split(' ');
const TR_STOP = ['ve', 'ile', 'için', 'gibi', 'kadar', 'çok', 'daha', 'bir', 'her', 'bu', 'şu', 'ama', 'fakat', 'ancak', 'belki', 'hâlâ', 'yine', 'şimdi', 'hiç', 'bazen'];

const FIRST = ['Ayşe', 'Fatma', 'Emine', 'Hatice', 'Zeynep', 'Elif', 'Merve', 'Büşra', 'Özge', 'Gülşen', 'Çiğdem', 'Şule', 'Ebru', 'Derya', 'İpek', 'Mehmet', 'Mustafa', 'Ahmet', 'Ali', 'Hüseyin', 'İbrahim', 'Yusuf', 'Emre', 'Burak', 'Çağrı', 'Oğuz', 'Şükrü', 'Barış', 'Ömer', 'Uğur', 'Tuğba', 'Gökhan', 'Ünal', 'Selim', 'Ceren'];
const LAST = ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek', 'Polat', 'Korkmaz', 'Çakır', 'Erdoğan', 'Güneş', 'Aksoy', 'Tekin', 'Ünlü', 'Işık', 'Bulut', 'Güler', 'Karaca', 'Sönmez', 'Başaran', 'Uçar'];
const STREET = ['Gül', 'Menekşe', 'Lale', 'Zambak', 'Çınar', 'Kavak', 'Fidan', 'Akasya', 'Sümbül', 'Papatya', 'Atatürk', 'Cumhuriyet', 'İnönü', 'Barış', 'Gazi', 'Hürriyet', 'Çiçek', 'Ihlamur', 'Şehit', 'Yeşilyurt'];
const HOOD = ['Örnek', 'Merkez', 'Yeni', 'Cumhuriyet', 'Bahçelievler', 'Çamlık', 'Gülbahçe', 'Güneştepe', 'Şirinevler', 'Dumlupınar', 'Fatih', 'Yıldızevler', 'Ulus', 'Kuruçeşme', 'Hürriyet'];
const CITY = [['Çankaya', 'Ankara'], ['Kadıköy', 'İstanbul'], ['Konak', 'İzmir'], ['Bağlar', 'Diyarbakır'], ['Nilüfer', 'Bursa'], ['Seyhan', 'Adana'], ['Şahinbey', 'Gaziantep'], ['Selçuklu', 'Konya'], ['Muratpaşa', 'Antalya'], ['İpekyolu', 'Van'], ['Ortahisar', 'Trabzon'], ['Yenişehir', 'Mersin'], ['Tepebaşı', 'Eskişehir'], ['Odunpazarı', 'Eskişehir'], ['Atakum', 'Samsun']];

const LATIN_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

/* ---------- Rastgele yardımcıları ---------- */
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
const between = (a, b) => a + rnd(b - a + 1);
const cap = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);

/** Kelime listesi üret; art arda aynı kelime gelmesin. */
function words(pool, n, stop) {
  const out = [];
  while (out.length < n) {
    // Türkçe modda sık sık bağlaç/zarf serpiştir: daha doğal ritim
    let w = stop && out.length > 0 && Math.random() < 0.18 ? pick(stop) : pick(pool);
    if (w === out[out.length - 1]) continue;
    out.push(w);
  }
  return out;
}

function sentence(pool, stop) {
  const n = between(6, 14);
  const w = words(pool, n, stop);
  // Uzun cümlede bir virgül
  if (n > 9) { const at = between(3, n - 4); w[at] += ','; }
  return cap(w.join(' ')) + '.';
}

function paragraph(pool, stop) {
  return Array.from({ length: between(4, 7) }, () => sentence(pool, stop)).join(' ');
}

/* ---------- Metin üreticisi ---------- */
function makeText(kind, unit, count, startLorem) {
  const pool = kind === 'lorem' ? LATIN : TR;
  const stop = kind === 'tr' ? TR_STOP : null;
  const lead = kind === 'lorem' && startLorem;
  if (unit === 'words') {
    let list = [];
    if (lead) list = LATIN_START.toLowerCase().replace(',', '').split(' ');
    if (list.length >= count) list = list.slice(0, count);
    else list = list.concat(words(pool, count - list.length, stop));
    return [cap(list.join(' ')) + '.'];
  }
  if (unit === 'sentences') {
    const items = Array.from({ length: count }, () => sentence(pool, stop));
    if (lead) items[0] = LATIN_START + '.';
    return [items.join(' ')];
  }
  // paragraflar
  const items = Array.from({ length: count }, () => paragraph(pool, stop));
  if (lead) items[0] = LATIN_START + '. ' + items[0];
  return items;
}

/* ---------- Örnek veri (sahte, biçimsel) ---------- */
function makeNames(n) { return Array.from({ length: n }, () => `${pick(FIRST)} ${pick(LAST)}`); }

function makeAddresses(n) {
  return Array.from({ length: n }, () => {
    const [ilce, il] = pick(CITY);
    return `${pick(HOOD)} Mah. ${pick(STREET)} Sok. No: ${between(1, 98)} Daire: ${between(1, 24)}, ${ilce}/${il}`;
  });
}

function makePhones(n, style) {
  return Array.from({ length: n }, () => {
    const op = `5${between(0, 5)}${between(0, 9)}`;           // 5xx biçimi
    const a = String(between(100, 999));
    const b = String(between(0, 99)).padStart(2, '0');
    const c = String(between(0, 99)).padStart(2, '0');
    if (style === 'intl') return `+90 ${op} ${a} ${b} ${c}`;
    if (style === 'paren') return `(0${op}) ${a} ${b} ${c}`;
    if (style === 'plain') return `0${op}${a}${b}${c}`;
    return `0${op} ${a} ${b} ${c}`;
  });
}

/* ---------- Çıktı biçimleri ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function format(items, fmt, isList) {
  if (fmt === 'html') return isList ? `<ul>\n${items.map((i) => `  <li>${esc(i)}</li>`).join('\n')}\n</ul>` : items.map((p) => `<p>${esc(p)}</p>`).join('\n');
  if (fmt === 'md') return isList ? items.map((i) => `- ${i}`).join('\n') : items.join('\n\n');
  return isList ? items.join('\n') : items.join('\n\n');
}

/* ---------- Arayüz ---------- */
const output = $('output');
let lastText = '';

function generate() {
  showError($('error'), '');
  const kind = $('opt-kind').value;     // lorem | tr | names | address | phone
  const fmt = $('opt-format').value;
  const unit = $('opt-unit').value;
  const isData = ['names', 'address', 'phone'].includes(kind);
  const isText = !isData;
  $('text-opts').hidden = !isText;
  $('start-wrap').hidden = kind !== 'lorem';
  $('phone-opts').hidden = kind !== 'phone';
  $('count-label').textContent = isText ? (unit === 'words' ? 'Kelime sayısı' : unit === 'sentences' ? 'Cümle sayısı' : 'Paragraf sayısı') : 'Kayıt sayısı';

  const raw = Number($('opt-count').value);
  const limit = isText && unit === 'words' ? MAX_WORDS : MAX_ITEMS;
  if (!Number.isInteger(raw) || raw < 1) { showError($('error'), 'Sayı en az 1 olmalı. Örneğin 3 yazın.'); return; }
  if (raw > limit) { showError($('error'), `En fazla ${limit} üretilebilir. Daha küçük bir sayı girin; gerekirse işlemi birkaç kez tekrarlayın.`); return; }

  let items;
  if (kind === 'names') items = makeNames(raw);
  else if (kind === 'address') items = makeAddresses(raw);
  else if (kind === 'phone') items = makePhones(raw, $('opt-phone').value);
  else items = makeText(kind, unit, raw, $('opt-start').checked);

  const text = format(items, fmt, isData);
  lastText = text;
  output.value = text;
  // İstatistik düz metin üzerinden hesaplanır (etiketler sayılmaz)
  const plain = items.join(' ');
  const wc = plain.trim() ? plain.trim().split(/\s+/).length : 0;
  $('stats').textContent = `${wc} kelime · ${plain.length} karakter · ${items.length} ${isData ? 'kayıt' : unit === 'paragraphs' ? 'paragraf' : unit === 'sentences' ? 'cümle' : 'bölüm'}`;
  $('btn-copy').disabled = false;
  $('btn-download').disabled = false;
}

async function copyOut() {
  try { await navigator.clipboard.writeText(output.value); }
  catch { output.select(); document.execCommand('copy'); }
  const b = $('btn-copy'); const old = b.textContent;
  b.textContent = 'Kopyalandı'; setTimeout(() => { b.textContent = old; }, 1500);
}

function download() {
  const ext = { text: 'txt', html: 'html', md: 'md' }[$('opt-format').value];
  const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ornek-metin.${ext}`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

$('btn-generate').addEventListener('click', generate);
['opt-kind', 'opt-unit', 'opt-format', 'opt-start', 'opt-phone'].forEach((id) => $(id).addEventListener('change', generate));
$('opt-count').addEventListener('input', generate);
$('btn-copy').addEventListener('click', copyOut);
$('btn-download').addEventListener('click', download);
generate();
