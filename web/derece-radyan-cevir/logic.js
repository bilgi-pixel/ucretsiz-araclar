// Derece Radyan Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Açı değeri');
    let derece;
    if (v.yon === 'radyan') derece = x * 180 / Math.PI;
    else if (v.yon === 'pi') derece = x * 180;
    else derece = x;
    const radyan = v.yon === 'radyan' ? x : derece * Math.PI / 180;
    const piKat = v.yon === 'pi' ? x : derece / 180;
    const dereceSatir = ['Derece', h.fmt(derece, 6) + '°'];
    const radyanSatir = ['Radyan', h.fmt(radyan, 6) + ' rad'];
    const rows = v.yon === 'derece' ? [radyanSatir, ['π cinsinden', h.fmt(piKat, 6) + 'π rad'], dereceSatir] : [dereceSatir, radyanSatir, ['π cinsinden', h.fmt(piKat, 6) + 'π rad']];
    rows.push(['Grad', h.fmt(derece * 10 / 9, 6) + ' grad']);
    rows.push(['Devir', h.fmt(derece / 360, 6) + ' devir']);
    return { rows, note: 'π = 3,14159265358979… alınır; sonuçlar en fazla altı ondalık basamakla gösterilir. 1 rad = 180 ÷ π ≈ 57,29578°.' };
  }
