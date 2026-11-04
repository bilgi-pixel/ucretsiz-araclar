# Oyun Kaynakları Araştırması (ücretsiz ve yasal)

Tarih: 2026-11-04. Yöntem: WebFetch ile birincil sayfa okundu (**Doğrulandı**) ya da yalnızca arama özeti görüldü (**Doğrulanmadı**: kullanmadan önce LICENSE dosyası elle okunmalı).

Mevcut oyunlar (web/oyunlar): 2048-oyunu, adam-asmaca, amiral-batti, araba-yarisi, balon-patlatma, bilgi-yarismasi, blok-dusurme, carpim-tablosu, dama, dizi-hafiza, dort-bagla, farki-bul, hafiza-kartlari, hiz-kosusu, kaydirmali-bulmaca, kelime-avi, kelime-bulmaca, kostebek-vurma, kule-yigma, kutu-kapmaca, labirent, mancala, matematik-yarisi, mayin-tarlasi, nonogram, online-piyano, ping-pong, renk-eslestir, reversi, satranc, sayi-tahmin, solitaire, sudoku, tas-kagit-makas, tavla, tepki-suresi-testi, tugla-kirma, ucan-kus, uzay-savasi, xox, yapboz, yazi-tura, yazma-hizi-testi, yilan-oyunu, zar-at.

Genel kural: Kopyalanan her şey `web/vendor/` ya da `web/assets/` altına gider; çalışma anında ağ isteği (CDN, canlı API) yapılmaz. Her yeni kaynak `THIRD_PARTY_NOTICES.md`'ye yazılır. CC BY / CC BY-SA verisi için atıf, oyun sayfasındaki "Kaynaklar" bölümünde verilir.

---

## 1. Veri / içerik kaynakları

### 1.1 Lichess Puzzle Database (ÖNCELİKLİ)
- URL: https://database.lichess.org/#puzzles
- Lisans: **CC0** (Doğrulandı: "released under the Creative Commons CC0 license", ticari kullanım serbest).
- Miktar: 6.193.530 puzzle. CSV alanları: PuzzleId, FEN, Moves (UCI), Rating, Themes, OpeningTags vb.
- Kullanım: Tüm dosya alınmaz. Betikle tema ve puan aralığına göre 500-2000 puzzle süzülüp tek bir JSON (~100-300 KB) yapılır. Hamle doğrulaması için sitedeki satranç kural motoru ya da chess.js (BSD-2, vendor'a) kullanılır.
- Atıf: gerekmez (nazikçe "Lichess" anılabilir).
- Risk: çok düşük. Stockfish (GPL-3) ve lila (AGPL) KULLANILMAZ. Lichess'in taş SVG setleri ayrı lisanslıdır; taşları Kenney ya da kendi çizimimizle yap.
- Besler: YENİ oyun satranc-bulmacalari (mat-in-1/2/3, günün bulmacası); satranc.

### 1.2 Open Trivia DB
- URL: https://opentdb.com/api_config.php
- Lisans: **CC BY-SA 4.0** (Doğrulandı). Atıf ve ShareAlike gerekir: dağıttığımız soru verisi aynı lisansla yayımlanır, kaynak anılır.
- Miktar: sayfa toplam vermiyor; 24 kategori; API en çok 50 soru/çağrı, IP başına 5 sn'de 1 istek.
- Dil: sorular İngilizce. Türkçe için çeviri gerekir; çeviri türev olduğundan o dosya da CC BY-SA olur.
- Kullanım: çalışma anında API çağrılmaz (gizlilik ve çevrimdışı kuralı). Betikle çekilip sabit JSON olarak depoya alınır. Veri koddan ayrı dosyada tutulur ki ShareAlike oyun koduna bulaşmasın.
- Risk: SA yükümlülüğü, çeviri emeği. TR içerik için daha iyi yol 1.7 (Wikidata).
- Besler: bilgi-yarismasi (EN sürüm), yeni dogru-mu-yanlis-mi.

### 1.3 Türkçe kelime listeleri (çoğu kullanılamaz)
| Kaynak | Lisans (kaynaktan) | Karar |
|---|---|---|
| github.com/mertemin/turkish-word-list (63.840 sözcük, Vikisözlük kaynaklı) | Lisans dosyası YOK (Doğrulandı) | KULLANMA |
| npm `turkish-wordlist` (aynının portu) | npm "MIT" diyor, ama kaynağı Vikisözlük (CC BY-SA); MIT beyanı güvenilmez | KULLANMA |
| github.com/bilalozdemir/tr-word-list (92.407 sözcük, kaynak TDK sozluk.gov.tr) | CC BY-SA 4.0 (Doğrulandı) | Riskli: TDK verisinin yeniden dağıtım hakkı belirsiz |
| github.com/vdemir/hunspell-tr | **CC BY-NC-ND 4.0** (LICENSE dosyası okundu) | KESİN YASAK |
| Hugging Face csariyildiz/turkish-wordlist (2,5 milyon, Vikipedi'den) | "MIT" etiketli ama Vikipedi CC BY-SA (Doğrulanmadı) | KULLANMA |
- Güvenli yol: Vikisözlük (tr.wiktionary.org) döküm dosyasından kendi listemizi üretmek (CC BY-SA, atıf sayfada) ya da sitedeki mevcut listeyi elle büyütmek. TDK sözlüğü telifli, toplu kopyalanmaz.
- Plan: 5 harfli ve madde başı sözcükleri süz, 3-5 bin sözcük.
- Besler: kelime-bulmaca, kelime-avi, adam-asmaca, YENİ kelime-tahmin (Wordle tipi, özgün ad), anagram.

### 1.4 Sudoku seti
- OpenML 3 milyon sudoku: https://api.openml.org/d/43476. **CC0** (arama özeti, Doğrulanmadı), 19-31 ipucu, zorluk puanlı.
- Hugging Face 17M birleşik set "Apache-2.0" etiketli ama kaynakları karışık Kaggle setleri: KULLANMA.
- Kullanım: gerekirse zorluk etiketli 1000 bulmaca süzülüp (~100 KB) JSON yapılır. Sitedeki üretici yeterliyse veri gerekmez.
- Besler: sudoku (günün sudokusu, zorluk seviyeleri). Killer/16x16 için veri değil, kendi üreticimiz.

### 1.5 Nonogram, yapboz ve benzerleri
- Nonogram, kaydırmalı bulmaca, labirent: algoritmik üretilir; veri gerekmez. Güvenilir CC0 toplu nonogram seti bulunamadı (Doğrulanmadı), kendi piksel resimlerimizden üretiriz.
- Yapboz görselleri: kendi çizimlerimiz ya da Wikimedia Commons'ta açıkça CC0/Public Domain olanlar (her dosya sayfası teyit edilir).

### 1.6 Tatoeba (cümle derlemesi)
- URL: https://tatoeba.org/downloads
- Lisans: cümleler varsayılan **CC BY 2.0 FR**, bir kısmı CC0 (arama özeti, Doğrulanmadı). Ses kayıtları konuşmacıya göre değişir (NC içerenler var): SES KULLANMA.
- Kullanım: TR-EN cümle çiftleri sabit JSON olarak.
- Atıf: Tatoeba bağlantısı ve lisans adı.
- Besler: yazma-hizi-testi (Türkçe cümleler), YENİ ingilizce-kelime-eslestir.

### 1.7 Wikidata ile bilgi yarışması üretimi
- Wikidata içeriği **CC0** (Wikimedia politikası; bu oturumda birincil sayfa açılmadı, Doğrulanmadı).
- Kullanım: SPARQL ile TR etiketli başkent-ülke, nüfus, element sembolü, yazar-eser çiftleri çekilir ve JSON'a dönüştürülür. Betik bir kez çalışır, çıktı depoya girer. Atıf zorunlu değil.
- Risk: yanlış şık üretim kuralları, etiket kalitesi, bayrak görselleri için ayrı lisans kontrolü.
- Besler: bilgi-yarismasi (TR), YENİ bayrak-bil, baskent-bil, periyodik-tablo-quiz.

---

## 2. Açık kaynak oyun kodları

Kural: yalnızca MIT/BSD/Apache/zlib/CC0/Unlicense. GPL, AGPL, LGPL, NC, ND ve lisanssız kod kullanılamaz. Marka taşıyan klonlarda (Tetris, Wordle, Flappy Bird vb.) ad ve görsel özgün olmalı (kural 8).

### 2.1 js13kGames
- URL: https://js13kgames.com (ana sayfa bu oturumda yalnızca başlık verdi).
- Arama sonucu: yarışma kurallarında katılımcıya ait açık kaynak şartı yok; katılımcı yalnızca organizatöre kullanım hakkı veriyor. Bazı katılımcılar açık kaynak yayımlıyor.
- Sonuç: **toplu kullanım yapılamaz.** Her oyunun deposundaki LICENSE tek tek okunur; lisanssızlar alınmaz. Gerekirse yazardan e-postayla yazılı izin alınır ve depoda saklanır.
- Miktar: yıllık yüzlerce oyun, her biri ≤13 KB (vendor'a koymak ucuz).
- Risk: orta.

### 2.2 Depolar (arama özeti, Doğrulanmadı; LICENSE elle okunacak)
- TimeBomb7/HTML5-Games-Examples: "tüm oyun kodu MIT" diyor.
- suxrobGM/browser-games: Phaser ile 2D oyunlar, MIT.
- proyecto26/awesome-jsgames (liste, CC0), michelpereira/awesome-open-source-games, leereilly/games: yalnızca keşif listesi; her oyun kendi lisansını taşır.
- attogram/games: oluşturucu MIT, içindeki oyunların lisansı ayrı.
- Q42/0hh1 (0h h1 mantık oyunu): lisans doğrulanamadı (depo URL'si 404 verdi), KULLANMA. Takuzu/Binairo kuralını kendimiz yazarız (oyun kuralları telif konusu değildir).
- Öneri: hazır oyun kopyalamak yerine kural tabanlı klasikleri kendi kodumuzla yazmak lisans ve AdSense "özgün içerik" açısından daha güvenli: Takuzu, Hitori, Kakuro, Futoshiki, Lights Out, Peg Solitaire, Hanoi Kulesi, Simon, Breakout varyantları.

### 2.3 Kütüphaneler (izinli, vendor'a, sabit sürüm; Doğrulanmadı, sürüm LICENSE'ı okunacak)
- chess.js (BSD-2): kural motoru, bulmaca doğrulama.
- Matter.js (MIT): fizik (kule-yigma, kutu-kapmaca iyileştirmesi).
- Phaser, Kaplay (MIT), Howler.js (MIT): gerekmedikçe eklenmez; mevcut oyunlar saf JS.

---

## 3. Sanat ve ses varlıkları

### 3.1 Kenney.nl
- URL: https://kenney.nl/support, https://kenney.nl/assets
- Lisans: **CC0** (Doğrulandı: "public domain licensed (CC0)", atıf zorunlu değil, ticari serbest).
- Miktar: sayfa sayı vermiyor; yüzlerce paket (2D sprite, UI, kart ve tahta oyunu taşları, ses efektleri, jingle). Her paket sayfasındaki lisans satırı ayrıca teyit edilir.
- Kullanım: seçilen paket dosyaları `web/assets/img/oyun/<paket>/` altına, yanında LICENSE.txt ile kopyalanır; WebP/SVG ile küçült.
- Atıf: zorunlu değil. Kenney logosu kullanılamaz.
- Risk: çok düşük.
- Besler: solitaire, dama, mancala, reversi, yeni kart oyunları (21, savaş), tüm oyunlarda efekt sesleri.

### 3.2 OpenGameArt.org
- URL: https://opengameart.org/content/faq (WebFetch 403 verdi; bilgi arama özetinden).
- Lisanslar: CC0, CC-BY 3.0/4.0, CC-BY-SA, OGA-BY 3.0, GPL (Doğrulanmadı).
- Bizim kural: yalnızca **CC0, CC-BY, OGA-BY**; CC-BY-SA ve GPL kullanılmaz. Her varlığın yazarı ve lisansı kayıt altına alınır, atıf sayfada verilir.
- Risk: orta. Yükleyenin gerçek hak sahibi olduğu garanti değil. Kritik varlıklar için Kenney tercih edilir.

### 3.3 Ses
- Kenney ses paketleri (CC0).
- Freesound.org: eser başına lisans (CC0, CC-BY, CC-BY-NC); yalnızca CC0 filtresi (Doğrulanmadı).
- En güvenli: WebAudio ile çalışma anında sentezlenen sesler (dosya yok, lisans riski yok).

---

## 4. Ticari oyun portalları (GameDistribution, GameMonetize, CrazyGames, Poki, GamePix, Playgama)

Hiçbirinin resmi publisher şartları bu oturumda tam okunamadı (GameDistribution şartları sayfası 404; GameMonetize yalnızca özet). Gelir payı rakamları zayıf kaynaklıdır, Doğrulanmadı (örn. bir eklenti duyurusunda GameMonetize için %45, tarihi belirsiz).

Model: portal, oyunu kendi gömme kodu/iframe ile sunar, reklamı kendi SDK'sı ile gösterir; gelirin bir kısmı yayıncıya döner.

**Sonuç: KULLANMA.** Nedenleri:
1. Gizlilik vaadi: kural 1 "analitik/çerez/izleme yok, tek istisna AdSense". Portal SDK'ları üçüncü taraf reklam ağlarını, çerezleri ve izlemeyi getirir (GameDistribution SDK'sında bile tracking ve kişiselleştirilmiş reklam için GDPR bayrakları var). "Dosyanız bilgisayarınızdan çıkmaz / izleme yok" rozetini yanlış kılar.
2. AdSense: Google'ın HTML5 oyun dokümanına göre oyunu barındıran sitenin AdSense etiketi gelirden sorumludur ve yalnızca basit tek yönlü gelir paylaşımı desteklenir. Aynı sayfada başka bir reklam sistemi hem geliri böler hem hesap riski yaratır.
3. Çevrimdışı/PWA/Tauri: iframe internet ister; masaüstünde reklam zaten yasak.
4. İçerik kontrolü: iframe içindeki oyunun içeriği, yaş uygunluğu ve telifi bizim kontrolümüzde değil; oyun bizim olmadığı için "özgün içerik" ve ince içerik riski.
5. Marka: ödüllü reklam ve yanıltıcı butonlar "yanıltıcı buton yok" kuralıyla çelişir.
6. Gelir öngörülemez; ödeme şikayetleri anekdot düzeyinde var.
- Tek makul kullanım: kendi oyunlarımızı onlara geliştirici olarak göndermek (trafik için). Onların SDK'sı gerektiği için ayrı bir paket olurdu; şimdilik önerilmez.

---

## 5. Hemen kullanılabilir ilk 10

| # | Kaynak | Lisans | Besler | Not |
|---|---|---|---|---|
| 1 | Lichess puzzle DB (süzülmüş 1-2 bin) | CC0 | YENİ satranc-bulmacalari; satranc | En yüksek değer, atıfsız |
| 2 | Wikidata SPARQL çıktısı (TR etiketli) | CC0 | bilgi-yarismasi; YENİ bayrak-bil, baskent-bil | Betik bir kez çalışır, JSON girer |
| 3 | Vikisözlük'ten kendi TR kelime listemiz | CC BY-SA (atıf) | YENİ kelime-tahmin; kelime-bulmaca; adam-asmaca | Hazır listeler lisans nedeniyle elendi |
| 4 | Kenney kart/taş/UI paketleri | CC0 | solitaire, dama, mancala, reversi, yeni kart oyunları | Paket başına lisans teyit |
| 5 | Kenney ses paketleri + WebAudio sentezi | CC0 | tüm oyunlara ses aç/kapa | Küçük dosya |
| 6 | OpenML 3M sudoku (teyit et) | CC0 | sudoku (günün sudokusu) | Veya kendi üreticimiz |
| 7 | Open Trivia DB (donmuş JSON) | CC BY-SA 4.0 | bilgi-yarismasi EN sürüm, dogru-mu-yanlis-mi | Atıf ve SA; TR çeviri gerekir |
| 8 | Tatoeba TR-EN cümleler | CC BY 2.0 FR | yazma-hizi-testi, ingilizce-kelime-eslestir | Yalnızca metin |
| 9 | Matter.js / chess.js (vendor) | MIT / BSD-2 | kule-yigma, kutu-kapmaca fiziği; bulmaca doğrulama | LICENSE kopyalanır |
| 10 | js13kGames (tek tek, MIT/CC0 ya da yazar izniyle) | oyuna göre | yeni mini oyunlar | Toplu değil; kısa liste ve e-posta izni |

Elenenler: hunspell-tr (CC BY-NC-ND), mertemin/turkish-word-list (lisanssız), Hugging Face birleşik setleri, OpenGameArt CC-BY-SA/GPL varlıklar, tüm ticari portal API'leri, Stockfish/lila (GPL/AGPL).

Önerilen sıra: 1, 2, 3, 4-5 (aynı hafta), sonra 6-9.
