// Mod Alma (Kalan Bulma) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.int(v.a, 'Bölünen (a)');
    const b = h.int(v.b, 'Bölen / mod (b)');
    if (b === 0) h.err('Bölen sıfır olamaz; sıfıra bölme tanımsızdır. Sıfırdan farklı bir tam sayı yazın.');
    if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) h.err('Sayılar çok büyük; en fazla 15 basamaklı tam sayılar yazın.');
    const A = BigInt(a), B = BigInt(b);
    const mb = B < 0n ? -B : B;
    const kesKalan = A % B;              // sıfıra doğru kesme (C, Java, JavaScript)
    const kesBolum = A / B;
    const kalan = ((A % mb) + mb) % mb;   // Öklid: 0 ≤ kalan < |b|
    const bolum = (A - kalan) / B;
    let tabKalan = kesKalan;              // tabana yuvarlama (Python): işaret bölenle aynı
    if (tabKalan !== 0n && (tabKalan < 0n) !== (B < 0n)) tabKalan += B;
    const g = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const par = (x) => (x < 0n ? `(${g(x)})` : g(x));
    const rows = [
      ['Kalan (a mod b)', g(kalan)],
      ['Bölüm', g(bolum)],
      ['Sağlama', `${par(B)} × ${par(bolum)} + ${g(kalan)} = ${g(A)}`],
      ['Tam bölünüyor mu?', kalan === 0n ? 'Evet, kalan 0' : 'Hayır'],
      ['Kesmeli bölmede a % b (C, Java, JavaScript)', g(kesKalan)],
      ['Tabana yuvarlamalı a % b (Python)', g(tabKalan)],
    ];
    const farkli = kesKalan !== kalan || tabKalan !== kalan;
    return {
      rows,
      note: farkli
        ? 'Sayılardan biri negatif olduğu için programlama dillerinin sonucu matematikteki kalandan farklı çıktı. İlk satır 0 ≤ kalan < |b| koşulunu sağlayan kalandır.'
        : 'İlk satır 0 ≤ kalan < |b| koşulunu sağlayan kalandır; bu örnekte bütün tanımlar aynı sonucu verir.',
    };
  }
