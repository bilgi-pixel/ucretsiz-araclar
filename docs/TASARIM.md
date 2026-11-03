# Tasarım sistemi — bilisimajans.com ile görsel uyum

Kaynak: https://bilisimajans.com (WordPress, "surrealist" blok teması + özel `.ba-*` CSS katmanı),
3 Kasım 2026'da tarayıcıdan `getComputedStyle` ve `<style>` blokları okunarak çıkarıldı.
Araçlar sitesi (`web/assets/css/ba.css`) bu belgedeki token'ları kullanır.

## 1. Ana sitede gözlenenler

| Öğe | Ana site | Not |
|---|---|---|
| Gövde yazı tipi | `'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif` (Google Fonts'tan yüklenir) | Araçlar sitesinde dış font **yüklenmez**; aynı yığın kullanılır, Plex yüklü değilse ana sitenin kendi yedeği olan Segoe UI / system-ui devreye girer. |
| Mono / etiket yazı tipi | `'IBM Plex Mono', ui-monospace, monospace`, 12px, `letter-spacing: .16em`, büyük harf | Bölüm etiketleri ("KURUMSAL BİLİŞİM ÇÖZÜMLERİ"), adım numaraları, altbilgi sütun başlıkları. |
| Başlıklar | Plex Sans 600, `letter-spacing: -.015em … -.025em`, h1 `clamp(34px, 4.6vw, 56px)` / 1.07, h2 `clamp(26px, 3.2vw, 38px)` / 1.15, h3 19px | |
| Gövde metni | 16–16.5px, `line-height: 1.65`, renk `#45484E` | Koyu zeminde `#C3C4C7`. |
| Ana renk | `#7B2331` (gül-vişne), hover `#5E1A25`, açık vurgu `#A5475A` | Logo ile aynı ton. |
| Metin | `#1E2126`; ikincil `#45484E`; soluk `#63666C` | |
| Zemin | `#FFFFFF`; alternatif bölüm `linear-gradient(180deg,#F8F7F5,#F2F0EE)`; açık kutu `#F6F5F3` | |
| Kenarlık | `#E3E1DF`; hover `#CBC7C4` | |
| Koyu zemin (hero, CTA, altbilgi) | `#1F2226` taban + `radial-gradient` bordo parıltı + 22px nokta ızgarası (`rgba(255,255,255,.045)`) | Hero ve sayfa üstleri koyu, içerik beyaz. |
| Üst çubuk | `linear-gradient(90deg,#1A1C1F,#1E1D20 60%,#251D21)`, 13px, metin `#E7E7E9` | Telefon/e-posta/saat satırı. |
| Üst bilgi | Beyaz, `border-bottom: 1px solid #E3E1DF`, logo 260×39, menü 14.5px/600, 6px köşe, hover `#F6F5F3`; son menü öğesi (İletişim) dolu bordo buton | |
| Birincil buton | `#7B2331` zemin, beyaz, 600, 15px 26px, **6px köşe**, gölge `0 1px 0 rgba(255,255,255,.12) inset, 0 6px 18px rgba(123,35,49,.20)` | |
| İkincil buton (koyu zemin) | `1px solid #55585E`, `rgba(255,255,255,.03)`, 6px köşe | |
| İkincil buton (açık zemin) | `1px solid #1E2126`, hover dolu koyu | |
| Kart | Beyaz, `1px solid #E3E1DF`, **8px köşe**, gölge `0 1px 2px rgba(30,33,38,.05)`; hover `translateY(-2px)` + `0 10px 26px rgba(30,33,38,.09)`; 26px iç boşluk; 48px ikon kutusu 8px köşe | |
| CTA bloğu | `linear-gradient(115deg,#212428,#28262A 45%,#35222A 78%,#45202B)`, 10px köşe, 46px 50px iç boşluk | |
| SSS | `details` kutuları 8px köşe, summary 16.5px/600, sağda mono "+" / "–" | |
| CMYK vurgu şeridi | `#00AEEF`, `#EC008C`, `#FFE000`, beyaz/siyah (altbilgi üstü ve bölüm etiketlerinde 36×4px bordo tonlu şerit) | Baskı/Lexmark kimliğine gönderme. |
| Altbilgi | `linear-gradient(180deg,#1E2024,#1A1C1F 60%,#221B1F)`; 4 sütun (marka, Çözümler, Kurumsal, İletişim); sütun başlığı mono büyük harf `#A6A8AD`; bağlantı 14px `#D5DCE6`; metin `#A9B4C4`; alt satır © + yasal bağlantılar 13px | |
| Boşluk ritmi | Bölüm `padding: 84px 0`; başlık altı 38px; ızgara boşluğu 20px; iç genişlik 1200px, 24px yan boşluk | |
| Seçim rengi | `::selection{background:#EFD9DD}` | |
| Odak | `2px solid #7B2331`, `outline-offset: 2–3px`; koyu zeminde `#D9D9DC` | |

## 2. Araçlar sitesi token tablosu (`ba.css` `:root`)

| Token | Açık | Koyu mod | Kullanım |
|---|---|---|---|
| `--ba-primary` | `#7B2331` | `#E07A93` | Bağlantı, birincil buton, vurgu |
| `--ba-primary-strong` | `#5E1A25` | `#F0A0B3` | Hover |
| `--ba-primary-soft` | `#F6E9EC` | `#3A1C23` | İkon kutusu, seçili sayfa, not |
| `--ba-accent` | `#A5475A` | `#E8A0B3` | Kart hover kenarlığı, odak |
| `--ba-bg` | `#FFFFFF` | `#1A1C1F` | Sayfa zemini |
| `--ba-surface` | `#FFFFFF` | `#23262B` | Kart, araç kutusu |
| `--ba-surface-2` | `#F6F5F3` | `#2F3237` | Dropzone, liste satırı, alternatif bölüm |
| `--ba-text` | `#1E2126` | `#F3F4F6` | |
| `--ba-text-2` | `#45484E` | `#C3C4C7` | Gövde paragraf |
| `--ba-text-muted` | `#63666C` | `#A6A8AD` | Yardımcı metin (AA: 5.3:1 beyazda) |
| `--ba-border` | `#E3E1DF` | `#3D4046` | |
| `--ba-border-hover` | `#CBC7C4` | `#55585E` | |
| `--ba-ink` / `--ba-ink-2` | `#1F2226` / `#2F3237` | aynı | Koyu hero, CTA, altbilgi |
| `--ba-on-ink` / `--ba-on-ink-2` | `#FFFFFF` / `#C3C4C7` | aynı | Koyu zemin metinleri |
| `--ba-success` / `-soft` | `#1F7A4D` / `#E6F4EC` | `#6FCF97` / `#17301F` | Sonuç kutusu, indir butonu |
| `--ba-danger` / `-soft` | `#A3271F` / `#FBE9E7` | `#FF8A80` / `#3A1A18` | Hata kutusu |
| `--ba-radius` | `8px` | | Kart, araç kutusu, SSS |
| `--ba-radius-sm` | `6px` | | Buton, giriş alanı, sekme |
| `--ba-radius-lg` | `10px` | | CTA, hero paneli |
| `--ba-shadow-card` | `0 1px 2px rgba(30,33,38,.05)` | daha koyu | |
| `--ba-shadow-hover` | `0 10px 26px rgba(30,33,38,.09)` | | |
| `--ba-shadow-btn` | `0 1px 0 rgba(255,255,255,.12) inset, 0 6px 18px rgba(123,35,49,.20)` | | |
| `--ba-font` | `"IBM Plex Sans", "Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif` | | Dış font yok |
| `--ba-mono` | `"IBM Plex Mono", ui-monospace, "Cascadia Mono", Consolas, monospace` | | Etiketler |
| `--ba-max` | `1200px` | | İç genişlik (ana siteyle aynı) |
| `--ba-gutter` | `16px` (≥768px'te `24px`) | | |
| `--ba-cmyk-c/m/y` | `#00AEEF` / `#EC008C` / `#FFE000` | | Altbilgi üst şeridi |

Kontrast (WCAG AA ≥ 4.5:1): `#7B2331` beyazda 9.5:1; `#63666C` beyazda 5.4:1; `#C3C4C7` `#1F2226` üzerinde 9.6:1; `#E07A93` `#1A1C1F` üzerinde 6.6:1; `#D5DCE6` `#1E2024` üzerinde 12:1.

## 3. Bileşen eşlemesi

| Ana site | Araçlar sitesi |
|---|---|
| `.ba-topbar` (iletişim satırı) | `.ba-topbar`: solda "← bilisimajans.com", sağda "%100 ücretsiz · kayıt yok · dosya yüklenmez" |
| Üst bilgi: logo + menü + bordo "İletişim" | `.ba-header`: logo + "Ücretsiz Araçlar" alt başlığı (dikey çizgiyle ayrılmış) + menü + bordo "bilisimajans.com" butonu |
| `.ba-hero` (koyu, parıltı, nokta ızgara, mono etiket) | `.ba-hero`: hub ve araç sayfalarında aynı koyu zemin; araç kutusu hero'nun altına taşarak (−44px) beyaz kart olarak oturur |
| `.ba-card` + `.ba-ic` 48px ikon | `.ba-card` + `.icon` (inline SVG, 24px çizgi ikon) |
| `.ba-steps` + `.ba-dot` | `.ba-steps li::before` koyu daire, mono numara |
| `.ba-faq details` + mono "+" | `.ba-faq` aynı |
| `.ba-cta` koyu gradyan | `.ba-cta` aynı gradyan, 10px köşe |
| `.ba-ft` altbilgi 4 sütun + CMYK şerit | `.ba-footer`: CMYK şerit, 3 sütun (marka · Araçlar · Kurumsal/İletişim), alt satır © + Gizlilik / Hakkımızda / İletişim / GitHub |

Reklam alanları (`.ba-ad`) geliştirme modunda kesikli kenarlıklı, mono "REKLAM" etiketli kutu olarak çizilir; konumlar CLAUDE.md §2'ye göre değişmedi (araç kutusunun altında, içerik ortasında, sayfa sonunda).

## 4. Ekran görüntüleri

`docs/ekran/` altında:

- `anasite-ust.jpg`, `anasite-orta.jpg`, `anasite-alt.jpg` — bilisimajans.com referans kareleri (üst bilgi + hero, çözüm kartları, CTA + altbilgi).
- `hub-360.png`, `hub-768.png`, `hub-1280.png` — araçlar ana sayfası.
- `pdf-birlestir-360.png`, `pdf-birlestir-768.png`, `pdf-birlestir-1280.png` — örnek araç sayfası.

Notlar: 360px'te menüdeki ikincil bağlantılar gizlenir, "bilisimajans.com" butonu kalır; üst çubuğun sağ metni gizlenir. Hero başlığı 34px'e iner; araç kutusu tam genişlik, dropzone 28px iç boşluk. 768px'te kart ızgarası 2–3 sütun, altbilgi 2 sütun. 1280px'te içerik 1200px'e sabitlenir; kartlar 4 sütun.
## 5. Hareket (4 Kasım 2026)

Ana sitedeki hareket dili birebir taşındı; kaynak token'lar `web/assets/design-tokens.json` → `motion`,
CSS karşılıkları `ba.css` `:root` (`--ba-dur-*`, `--ba-ease-*`, `--ba-stagger`, `--ba-cycle`).
`npm run tokens:check` JSON ile CSS'in eşleştiğini doğrular (47 token).

| Ana site | Araçlar sitesi | Nasıl |
|---|---|---|
| `.bkx-grad` parlayan başlık (bkxShine 7s) | `.ba-grad` | Hero h1'in anahtar parçası (hub: ikinci satır; araç: araç adı) beyaz→cam göbeği→pembe→amber gradyanıyla kayar |
| Daktilo (`.bkx-type` data-words + caret) | `.ba-typer .ba-type` | Hub hero'da "Tek tıkla: PDF birleştir │" — 5 ifade döner, 2 sn bekler, siler |
| Hero sıralı giriş | `.ba-in .ba-hero *` | Etiket → kelimeler (70 ms ara, hafif blur) → daktilo → lead → rozetler (yay easing) → arama/sekmeler |
| Koyu zeminde gezen bordo parıltı | `.ba-hero::before` | 14 sn ileri-geri `translate` |
| `.ba-eb` CMYK etiket | `.ba-label::before` | C·M·Y·bordo şerit; yüklenince soldan çizilir |
| `baLogoShine` | `.ba-logo-img::after` | 5 sn'de bir çapraz parıltı, hover'da hızlanır |
| `.ba-steps.is-in` sıralı açılış + `baRing`/`baLit` | `.ba-rev` + `.ba-steps.is-in li::before` | IntersectionObserver ile `is-in`; adım numarası yayla büyür, sonra 6.8 sn döngüde halka darbesi adımdan adıma dolaşır |
| Bölüm başlığı | `main h2.ba-rev::after` | Soldan 14px kayarak gelir, altında 44×3 bordo çizgi soldan dolar; CTA'da CMYK çizgi |
| `.ba-fx` çözüm kartlarındaki döngüsel ikon hareketleri (fxBob, fxSpin, fxPulse…) | `.ba-card[data-fx] .icon svg` | motion.js bağlantı adından sabit bir tür seçer (bob · wiggle · pulse · swing · jump · spin), 3.4 sn döngü, kart sırasına göre faz kayması; hover'da kutu bordoya döner ve ikon hızlanır |
| Kartlar / SSS / paragraflar | `.ba-rev` | 22px yukarı kayarak açılır; aynı ebeveyn içinde sıra × 70 ms gecikme (en çok 8) |

Teknik notlar:

- Açılış `translate` / `scale` özellikleriyle yapılır, kart hover'ının `transform`'u ile çakışmaz.
- `<head>`'deki tek satırlık betik `html.ba-js` (açılış stilleri yalnızca JS varken) ve sayfa görünürse `html.ba-in`
  (hero yükleme animasyonları) ekler. Arka planda açılan sekmede animasyon sekme öne gelince başlar; JS yoksa her şey düz görünür.
- Kelime ayırma h1'e `aria-label` ile tam metni yazar; ekran okuyucu tek parça okur.
- `prefers-reduced-motion: reduce` → kelime ayırma ve daktilo çalışmaz, tüm `animation`/`transition` kapalı, her öğe anında görünür.
- Reklam alanları (`.ba-ad`) ve altbilgi hareketsiz; AdSense konumları değişmedi.
- Yeniden uygulama: `npm run motion:apply` (`scripts/apply-motion.mjs`) tüm HTML sayfalarına head betiği, motion.js,
  logo sarmalı ve gradyan h1'i ekler; ba.css'te hareket bloğu yoksa `scripts/motion.css` şablonundan ekler.
  Tekrar çalıştırılabilir; main ile birleştirme sonrası veya yeni sayfa eklenince çalıştırılır (`--dry` yalnızca sayar).

## 6. Üst bilgi ve hero eşlemesi (4 Kasım 2026)

- **Logo:** dosya ana siteyle aynı (`logo.png`, 800×120). Ana sitedeki gibi X simgesi CSS maskesiyle kırpılır
  (`--off: -44.2px`), kelime markası `--ba-primary` ile boyanır, 39 px (≤780 px: 28,5 px). `.ba-logo-img::before` maske +
  bordo, `::after` maske + kayan parıltı. `--ba-logo-mask` token'ı `:root`'ta.
- **Üst bilgi:** ana sitedeki gibi iki satır: logo + "Ücretsiz Araçlar" alt başlığı üstte, menü altta; `bilisimajans.com`
  bordo düğme sağda. 600 px altında alt başlık ve ikincil menü gizlenir, logo kalır.
- **Hub hero:** iki sütun (`.ba-hero-w`): solda metin (`.ba-hl`, 620 px), sağda ana sitedeki ağ şemasının araçlara uyarlanmış
  sürümü (`scripts/hero-dia.svg`: PDF · Resim · Dönüştürücü · Hesaplayıcı · Metin & Dosya → "Ücretsiz Araçlar"). 1000 px altında
  şema metnin altına iner, 640 px altında gizlenir. `apply-motion.mjs` şemayı hub'a ekler.
- **Hero zemini ve etiket şeridi (4 Kasım, akşam):** ana sayfadan ölçülen değerlerle birebir: taban `#1F2226`, 135° antrasit→bordo gradyan,
  iki bordo parıltı, 22 px nokta ızgarası (hareket bloğunun sonundaki `:root` geçersiz kılması). Etiket şeridi ana sitedeki `.ba-cm` gibi
  bordo üçlüsü + beyaz (açık zeminde antrasit); CMYK token'ları yalnızca altbilgi şeridinde kalır.
- **Şema düğümleri tıklanabilir (4 Kasım, akşam):** beş düğüm `<a class="bd-link" href="#pdf|#donustur|#dosya|#hesapla|#rehber">`;
  hover/odakta bordo dolgu, pembe kenar, %10 büyüme, beyaz etiket. Tıklama hub.js'in hash filtresini tetikler, motion.js
  listeye kaydırır. Etiketler hub kategorileriyle birebir: PDF Araçları · Dönüştürücüler · Dosya & Metin · Hesaplayıcılar · Rehberler.
