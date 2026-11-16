// Tüm sayfalarda SEO tutarlılığını sağlar; tekrar çalıştırmak güvenlidir (değişmesi gerekmeyene dokunmaz).
// 1) Ana sayfa sayacı (JS'siz görünen sayı) karttan sayılır; og:title sayfa başlığıyla eşitlenir.
// 2) Open Graph + Twitter etiketleri (başlık, açıklama ve canonical'dan türetilir).
// 3) BreadcrumbList (görünen .ba-crumb'dan) ve FAQPage (görünen .ba-faq'tan) yapısal verisi.
// 4) Çerez Politikası, Kullanım Koşulları, İletişim sayfaları + alt bilgi bağlantıları + sitemap.
// Kullanım: node scripts/seo-uygula.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const web = join(dirname(fileURLToPath(import.meta.url)), '..', 'web');
const ORIGIN = 'https://araclar.bilisimajans.com';
const IMG = `${ORIGIN}/assets/img/icon-512.png`;
const GUN = '16 Kasım 2026';

const dec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');
const text = (s) => dec(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const ld = (o) => `  <script type="application/ld+json">\n  ${JSON.stringify(o).replace(/</g, String.fromCharCode(92) + 'u003c')}\n  </script>\n`;

// ── Yeni kurumsal sayfalar (gizlilik sayfasının kabuğu kullanılır) ──
const SAYFALAR = {
  'cerez-politikasi': {
    baslik: 'Çerez Politikası',
    aciklama: 'Bilişim Ajans ücretsiz araçlarında çerezler: kendi çerezimiz yok; yalnızca Google AdSense reklam çerezleri kullanılabilir. Nasıl yönetileceğini öğrenin.',
    govde: `<h2>1. Kısa özet</h2>
      <p>Bu sitenin kendisi çerez oluşturmaz. Üyelik, oturum, analitik veya sosyal medya çerezi kullanmıyoruz. Sitede çerez kullanabilen tek hizmet, reklamları gösteren Google AdSense'tir.</p>
      <h2>2. Çerez nedir?</h2>
      <p>Çerez, bir sitenin tarayıcınıza kaydettiği küçük bir metin dosyasıdır. Tercihleri hatırlamak, ziyaretleri saymak ya da reklamları ilgi alanına göre seçmek için kullanılabilir.</p>
      <h2>3. Reklam çerezleri (Google AdSense)</h2>
      <p>Sitenin masrafları içerik bölümlerindeki Google AdSense reklamlarıyla karşılanır. Google ve reklam ortakları, reklam sunmak, gösterim sayısını sınırlamak ve reklam performansını ölçmek için çerez ve benzeri teknolojiler kullanabilir. Bu çerezler Google tarafından yönetilir; biz bu verilere kişi bazında erişemeyiz. Ayrıntılar için <a href="https://policies.google.com/technologies/ads" rel="noopener">Google'ın reklam teknolojileri açıklaması</a>na bakabilirsiniz.</p>
      <h2>4. Onay ve tercihleriniz</h2>
      <p>Bulunduğunuz ülkeye göre ilk ziyaretinizde Google'ın sunduğu bir onay penceresi görebilirsiniz; kişiselleştirilmiş reklamları buradan kabul veya reddedebilirsiniz. Ayrıca kişiselleştirmeyi <a href="https://adssettings.google.com/" rel="noopener">Google reklam ayarları</a> sayfasından dilediğiniz zaman kapatabilir, tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Çerezleri engellemeniz araçların çalışmasını etkilemez.</p>
      <h2>5. Tarayıcı deposu</h2>
      <p>Bazı araçlar ve oyunlar, tercihlerinizi, planlayıcılara yazdıklarınızı veya en yüksek puanınızı hatırlamak için tarayıcınızın yerel deposunu kullanır. Site ayrıca çevrimdışı çalışabilmek için sayfa dosyalarını cihazınızda önbelleğe alabilir. Bu bilgiler yalnızca cihazınızda durur, bize veya başka bir sunucuya gönderilmez; tarayıcınızın site verilerini temizleme seçeneğiyle silebilirsiniz.</p>
      <h2>6. Değişiklikler ve iletişim</h2>
      <p>Bu politika değişirse yeni sürüm tarihiyle birlikte bu sayfada yayınlanır. Sorularınız için <a href="../iletisim/">iletişim</a> sayfasını kullanabilirsiniz. Verilerinizle ilgili genel ilkelerimiz <a href="../gizlilik/">Gizlilik Politikası</a>'nda yer alır.</p>`,
  },
  'kullanim-kosullari': {
    baslik: 'Kullanım Koşulları',
    aciklama: 'Bilişim Ajans ücretsiz online araçlarının kullanım koşulları: ücretsiz kullanım, sorumluluk sınırları, hesaplama sonuçlarının bilgi amaçlı olması ve yasaklı kullanımlar.',
    govde: `<h2>1. Hizmet</h2>
      <p><strong>araclar.bilisimajans.com</strong>, Bilişim Ajans tarafından sunulan ücretsiz online araçlar, rehberler, testler ve oyunlardan oluşur. Siteyi kullanmak için kayıt olmanız veya ödeme yapmanız gerekmez. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.</p>
      <h2>2. Dosyalarınız ve içeriğiniz</h2>
      <p>Araçlar tarayıcınızda çalışır; seçtiğiniz dosyalar sunucumuza yüklenmez. Bu nedenle dosyalarınızın yedeği bizde bulunmaz ve kaybolan bir dosyayı geri getiremeyiz. İşlediğiniz dosyalar üzerinde gerekli haklara sahip olmak ve asıllarını saklamak sizin sorumluluğunuzdadır.</p>
      <h2>3. Sonuçların doğruluğu</h2>
      <p>Hesaplayıcılar (maaş, vergi, kredi, sınav puanı, sağlık göstergeleri, elektrik ve inşaat hesapları ve benzerleri) genel bilgi vermek için hazırlanmıştır; sonuçlar yaklaşık olabilir ve mevzuat ya da katsayı değişikliklerinden etkilenebilir. Zekâ testleri eğlence ve alıştırma amaçlıdır, IQ ölçümü değildir. Bu sonuçlar muhasebe, hukuk, finans, mühendislik veya sağlık danışmanlığı yerine geçmez. Önemli kararlar için resmî kaynakları ve ilgili uzmanı esas alın.</p>
      <h2>4. Kabul edilebilir kullanım</h2>
      <p>Araçları yürürlükteki mevzuata aykırı biçimde, başkalarının haklarını ihlal edecek şekilde veya sahte belge düzenlemek amacıyla kullanamazsınız. Siteye zarar verecek, hizmeti kesintiye uğratacak otomatik istekler göndermeyin.</p>
      <h2>5. Garanti ve sorumluluk</h2>
      <p>Hizmet "olduğu gibi" sunulur. Araçların kesintisiz veya hatasız çalışacağı garanti edilmez. Sitenin kullanımından doğabilecek veri kaybı, hatalı sonuç veya dolaylı zararlardan, yasaların izin verdiği ölçüde Bilişim Ajans sorumlu tutulamaz.</p>
      <h2>6. Fikri haklar</h2>
      <p>Sitenin kaynak kodu MIT lisansıyla <a href="https://github.com/bilgi-pixel/ucretsiz-araclar" rel="noopener">GitHub</a>'da yayınlanır; üçüncü taraf bileşenler kendi lisanslarına tabidir. "Bilişim Ajans" adı ve logosu izinsiz kullanılamaz. Rehber ve makale metinleri kaynak gösterilmeden kopyalanamaz.</p>
      <h2>7. Reklamlar ve dış bağlantılar</h2>
      <p>Sitede Google AdSense reklamları gösterilir. Reklamların ve dış bağlantıların götürdüğü sitelerin içeriğinden o sitelerin sahipleri sorumludur. Ayrıntılar: <a href="../gizlilik/">Gizlilik Politikası</a> ve <a href="../cerez-politikasi/">Çerez Politikası</a>.</p>
      <h2>8. Değişiklikler ve iletişim</h2>
      <p>Araçlar ve bu koşullar önceden bildirilmeden güncellenebilir; geçerli sürüm bu sayfadadır. Sorularınız için <a href="../iletisim/">iletişim</a> sayfasını kullanabilirsiniz.</p>`,
  },
  iletisim: {
    baslik: 'İletişim',
    aciklama: 'Bilişim Ajans ücretsiz araçları için iletişim: hata bildirimi, araç önerisi ve kurumsal talepler için telefon, WhatsApp ve iletişim formu.',
    govde: `<h2>Bize ulaşın</h2>
      <p>Bir araçta hata gördüyseniz, yeni bir araç önermek istiyorsanız ya da kurumsal bir projeniz varsa aşağıdaki yollardan bize ulaşabilirsiniz.</p>
      <ul>
        <li><strong>Telefon:</strong> <a href="tel:+904122230466">0412 223 04 66</a></li>
        <li><strong>WhatsApp:</strong> <a href="https://wa.me/905425122120" rel="noopener">0542 512 21 20</a></li>
        <li><strong>İletişim formu:</strong> <a href="https://bilisimajans.com/iletisim">bilisimajans.com/iletisim</a></li>
        <li><strong>Hata ve öneri kaydı:</strong> <a href="https://github.com/bilgi-pixel/ucretsiz-araclar/issues" rel="noopener">GitHub üzerinde kayıt açın</a></li>
      </ul>
      <h2>Hata bildirirken</h2>
      <p>Sorunu hızlı çözebilmemiz için hangi aracı kullandığınızı, ne yapmak istediğinizi, ekranda ne gördüğünüzü ve kullandığınız cihaz ile tarayıcıyı yazmanız yeterlidir. Dosyalarınız bize ulaşmadığı için sorunlu dosyayı göremeyiz; gizli bilgi içermeyen bir örnek dosya paylaşırsanız inceleyebiliriz.</p>
      <h2>Kim yapıyor?</h2>
      <p>Bu site, Diyarbakır merkezli <a href="https://bilisimajans.com/">Bilişim Ajans</a>'ın topluluğa açık projesidir. Ayrıntılar için <a href="../hakkimizda/">Hakkımızda</a> sayfasına bakabilirsiniz.</p>`,
  },
};

const kabuk = readFileSync(join(web, 'gizlilik', 'index.html'), 'utf8');
const eskiBaslik = text(kabuk.match(/<title>([\s\S]*?)<\/title>/)[1]);
for (const [slug, s] of Object.entries(SAYFALAR)) {
  const hedef = join(web, slug, 'index.html');
  if (existsSync(hedef)) continue;
  let h = kabuk
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${s.baslik} – Bilişim Ajans Ücretsiz Araçlar</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${attr(s.aciklama)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${ORIGIN}/${slug}/"`)
    .replace(/<link rel="alternate" hreflang[^>]*>\s*/g, '')
    .replace(/<meta (property="og:|name="twitter:)[^>]*>\s*/g, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace(/<main>[\s\S]*<\/main>/, `<main>
    <section class="ba-hero"><div class="ba-container ba-narrow"><h1>${s.baslik}</h1><p class="lead">Son güncelleme: ${GUN}. Bu sayfa <strong>araclar.bilisimajans.com</strong> için geçerlidir.</p></div></section>
    <div class="ba-container ba-narrow">
    <section class="ba-content">
      ${s.govde}
    </section>
    </div>
  </main>`);
  if (h.includes(eskiBaslik) && eskiBaslik !== s.baslik) h = h.split(eskiBaslik).join(s.baslik);
  mkdirSync(join(web, slug), { recursive: true });
  writeFileSync(hedef, h);
}

// Sitemap: yeni sayfalar gizlilik satırının ardına eklenir.
{
  const p = join(web, 'sitemap.xml');
  let sm = readFileSync(p, 'utf8');
  const once = sm;
  for (const slug of Object.keys(SAYFALAR).reverse()) {
    if (sm.includes(`${ORIGIN}/${slug}/<`)) continue;
    sm = sm.replace(/(\n[^\n]*\/gizlilik\/<\/loc>[^\n]*)/, `$1\n  <url><loc>${ORIGIN}/${slug}/</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  }
  if (sm !== once) writeFileSync(p, sm);
}

// ── Tüm sayfalar ──
const dosyalar = [];
(function gez(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (e.name !== 'vendor' && e.name !== 'assets') gez(join(d, e.name)); }
    else if (e.name === 'index.html') dosyalar.push(join(d, e.name));
  }
})(web);

let degisen = 0;
for (const f of dosyalar) {
  const once = readFileSync(f, 'utf8');
  let h = once;
  const canon = h.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canon) continue;
  const kok = f === join(web, 'index.html');
  const en = /<html[^>]*lang="en/.test(h);

  if (kok) {
    // og:title sayfa başlığıyla eşitlenir. Sayaç (#ba-count) ve <title> içindeki sayı scripts/uret/derle.mjs tarafından yazılır.
    const t = h.match(/<title>([^<]*)<\/title>/)[1];
    h = h.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${t}"`);
  }

  const baslik = text(h.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  const aciklama = dec(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');

  // Open Graph + Twitter: eksik olan etiketler eklenir, var olana dokunulmaz.
  const og = [
    ['property', 'og:title', baslik], ['property', 'og:description', aciklama],
    ['property', 'og:type', /\/rehber\/./.test(canon) ? 'article' : 'website'], ['property', 'og:url', canon],
    ['property', 'og:site_name', 'Bilişim Ajans Ücretsiz Araçlar'], ['property', 'og:locale', en ? 'en_US' : 'tr_TR'],
    ['property', 'og:image', IMG], ['name', 'twitter:card', 'summary'],
  ].filter(([k, ad, v]) => v && !h.includes(`${k}="${ad}"`)).map(([k, ad, v]) => `  <meta ${k}="${ad}" content="${attr(v)}">\n`).join('');

  // BreadcrumbList: görünen kırıntıdan; son öğe sayfanın kendisi.
  let ekLd = '';
  const crumb = h.match(/<ol class="ba-crumb"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
  if (!h.includes('"BreadcrumbList"')) {
    const ogeler = [];
    for (const m of (crumb ?? '').matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) {
      const a = m[1].match(/<a[^>]*href="([^"]+)"/);
      ogeler.push({ name: text(m[1]), item: a ? new URL(a[1], canon).href : undefined });
    }
    if (!ogeler.length && !kok) ogeler.push({ name: en ? 'Tools' : 'Araçlar', item: `${ORIGIN}/${en ? 'en/' : ''}` });
    if (ogeler.length && ogeler[0].item !== canon) {
      ogeler.push({ name: text(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? baslik), item: canon });
      ekLd += ld({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: ogeler.map((o, i) => ({ '@type': 'ListItem', position: i + 1, name: o.name, ...(o.item ? { item: o.item } : {}) })) });
    }
  }

  // FAQPage: görünen SSS'ten (yalnızca sayfada gerçekten bulunan sorular).
  if (!h.includes('"FAQPage"')) {
    const sss = [];
    for (const blok of h.matchAll(/<div class="ba-faq">([\s\S]*?)<\/div>/g)) {
      for (const m of blok[1].matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
        const q = text(m[1]); const a = text(m[2]);
        if (q && a) sss.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
      }
    }
    if (sss.length >= 2) ekLd += ld({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: sss });
  }

  if (og || ekLd) h = h.replace(/<\/head>/, `${og}${ekLd}</head>`);

  // Alt bilgi: Çerez Politikası + Kullanım Koşulları bağlantıları; İletişim sitedeki sayfaya gider.
  if (!en && !h.includes('cerez-politikasi/">')) {
    h = h.replace(/<li><a href="([^"]*)gizlilik\/">Gizlilik Politikası<\/a><\/li>/, (m, on) => `${m}<li><a href="${on}cerez-politikasi/">Çerez Politikası</a></li><li><a href="${on}kullanim-kosullari/">Kullanım Koşulları</a></li>`);
    const on = h.match(/<li><a href="([^"]*)cerez-politikasi\/">/)?.[1];
    if (on !== undefined) h = h.replace('<li><a href="https://bilisimajans.com/iletisim">İletişim</a></li>', `<li><a href="${on}iletisim/">İletişim</a></li>`);
  }

  if (h !== once) { writeFileSync(f, h); degisen++; }
}
console.log(`seo-uygula: ${dosyalar.length} sayfa tarandı, ${degisen} sayfa güncellendi.`);
