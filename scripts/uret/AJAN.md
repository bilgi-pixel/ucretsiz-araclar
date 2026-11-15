# Ajan görevi: bir grubun araç spec'lerini yaz

Depo: /home/claude/repo (Bilişim Ajans ücretsiz online araçlar sitesi). Sana bir grup numarası verildi.

1. Önce oku: `scripts/uret/REHBER.md`, `scripts/uret/specs/cm-inc-cevir.mjs` (örnek), `web/assets/js/arac-yardimci.js` (h yardımcıları).
2. `cd /home/claude/repo && node scripts/uret/grup.mjs <grupNo>` ile listeni al. "YAZ" satırlarındaki her araç için
   `scripts/uret/specs/<slug>.mjs` dosyasını yaz ("VAR" olanlara dokunma).
3. Her spec'ten hemen sonra `node scripts/uret/dogrula.mjs <slug>` çalıştır ve ✓ görene kadar düzelt; sonra sıradakine geç.
4. Kurallar REHBER.md'de: en az 800 kelime özgün, araca özel, doğru Türkçe içerik; en az 7 SSS; en az 6 test örneği
   (bilinen doğru sonuçlarla, en az 1 hata örneği); compute tamamen bağımsız ve ağsız.
   Yalnızca `scripts/uret/specs/` altına yaz; başka dosyaya dokunma, derle.mjs ya da git çalıştırma.
5. Kalite önemli: formüller doğru, çözümlü örnekler compute sonucuyla tutarlı, metin şablon tekrarı değil.
6. Ek notlar:
   - Metinde HTML varlığı (`&lt;`, `&gt;`, `&amp;`, `&nbsp;`) kullanma; düz `<`, `>`, `&` yaz (üretici kaçırır).
   - `h.num` tek noktalı girdiyi ondalık sayar ("1.500" → 1,5); binlik için "1.234.567" ya da "1.500,00" kabul edilir.
     Para/tutar alanlarının `hint` metninde "binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın" gibi kısa bir uyarı ver;
     test örneklerinde tutarları ayraçsız yaz.
   - 10'dan fazla girdi gerekiyorsa birkaç değeri tek metin alanında boşlukla ayırarak al.
   - Mevzuat, vergi, resmî oran gibi doğrulayamadığın bilgileri kesin hüküm olarak yazma; genel anlat ve
     "güncel mevzuatı kontrol edin" de.

Bitince yalnızca şunu döndür: geçen slug sayısı ve varsa bitiremediğin slug'lar (nedeniyle).
