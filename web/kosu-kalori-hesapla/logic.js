// Koşuda Yakılan Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const km = h.pos(v.mesafe, 'Koşu mesafesi');
    const dk = h.pos(v.sure, 'Süre');
    const egim = h.opt(v.egim, 0, 'Eğim');
    if (kg < 25 || kg > 250) h.err('Vücut ağırlığı 25 ile 250 kg arasında olmalı.');
    if (egim < 0 || egim > 15) h.err('Eğim 0 ile 15 arasında olmalı. İniş eğimi için bu formül geçerli değildir.');
    const hiz = (km * 1000) / dk; // m/dk
    const kmh = (km / dk) * 60;
    if (kmh < 6) h.err('Ortalama hız 6 km/sa altında kalıyor; bu yürüyüş temposudur. Mesafe ve süreyi kontrol edin ya da yürüyüş aracını kullanın.');
    if (kmh > 25) h.err('Ortalama hız 25 km/sa üzerinde çıkıyor. Mesafeyi kilometre, süreyi dakika olarak yazdığınızdan emin olun.');
    const vo2 = 0.2 * hiz + 0.9 * hiz * (egim / 100) + 3.5; // ml/kg/dk
    const kcal = (vo2 * kg * dk) / 200;
    const net = ((vo2 - 3.5) * kg * dk) / 200;
    const tempoSn = Math.round((dk / km) * 60);
    const tempo = `${Math.floor(tempoSn / 60)}:${String(tempoSn % 60).padStart(2, '0')}`;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Ortalama hız', h.fmt(kmh, 2) + ' km/sa'],
        ['Tempo', tempo + ' dk/km'],
        ['MET değeri', h.fmt(vo2 / 3.5, 1)],
        ['Kilometre başına', h.fmt(kcal / km, 1) + ' kcal'],
        ['Dakika başına', h.fmt(kcal / dk, 1) + ' kcal'],
      ],
      note: 'Tahmin, koşu için kullanılan metabolik denkleme dayanır; kişisel verim, rüzgâr, zemin ve sıcaklık sonucu yüzde 10–15 kadar değiştirebilir.',
    };
  }
