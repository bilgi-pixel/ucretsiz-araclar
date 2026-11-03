# Bilişim Ajans Ücretsiz Araçlar

[bilisimajans.com](https://bilisimajans.com) tarafından sunulan, tamamen ücretsiz online araçlar
ve bunların Windows/macOS sürümleri. **Dosyalar sunucuya yüklenmez** — her şey tarayıcıda çalışır.
Kayıt yok, limit yok, izleme yok.

Canlı: https://araclar.bilisimajans.com (yayın sonrası)

| Araç | Durum |
|---|---|
| Resimden PDF'e | geliştiriliyor |
| PDF Birleştir | geliştiriliyor |
| PDF Böl / Sayfa Çıkar | geliştiriliyor |
| PDF'den Resme | geliştiriliyor |
| PDF Küçült, PDF'den Word'e, Word'den PDF'e, Resim Küçült, Zip | planlandı (Faz 2) |
| QR Kod, Şifre Üretici, Metin Araçları | planlandı (Faz 3) |

Tam liste ve yol haritası: [docs/PLAN.md](docs/PLAN.md).

## Geliştirme

Gereksinim: Node 20+ (yalnızca yerel sunucu ve testler için; site bundler kullanmaz).

```
npm install
npx serve web
npx playwright test
```

Proje kuralları: [CLAUDE.md](CLAUDE.md). Katkı için önce bir issue açın.

## Lisans

Kod MIT ([LICENSE](LICENSE)). Üçüncü parti bileşenler: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
"Bilişim Ajans" adı ve logosu tescilli markadır; çatallarda (fork) kullanılamaz.
