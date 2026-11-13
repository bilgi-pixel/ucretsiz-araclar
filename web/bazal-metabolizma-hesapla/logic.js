// Bazal metabolizma hızı (BMH) mantığı — DOM yok; TR ve EN sayfalar ortak kullanır.
export const ACTIVITY = [
  { k: 1.2, tr: 'Hareketsiz (masa başı, egzersiz yok)', en: 'Sedentary (desk job, no exercise)' },
  { k: 1.375, tr: 'Hafif aktif (haftada 1–3 gün egzersiz)', en: 'Lightly active (exercise 1–3 days a week)' },
  { k: 1.55, tr: 'Orta aktif (haftada 3–5 gün egzersiz)', en: 'Moderately active (exercise 3–5 days a week)' },
  { k: 1.725, tr: 'Çok aktif (haftada 6–7 gün egzersiz)', en: 'Very active (exercise 6–7 days a week)' },
  { k: 1.9, tr: 'Aşırı aktif (ağır fiziksel iş ya da günde iki antrenman)', en: 'Extra active (physical job or training twice a day)' },
];

/** Mifflin-St Jeor (1990): kg, cm, yaş. sex: 'e' (erkek) | 'k' (kadın). */
export function mifflin(sex, kg, cm, age) {
  return 10 * kg + 6.25 * cm - 5 * age + (sex === 'e' ? 5 : -161);
}

/** Harris-Benedict, Roza ve Shizgal 1984 düzeltmesi. */
export function harris(sex, kg, cm, age) {
  return sex === 'e'
    ? 88.362 + 13.397 * kg + 4.799 * cm - 5.677 * age
    : 447.593 + 9.247 * kg + 3.098 * cm - 4.330 * age;
}

/** Girdi aralık kontrolü; hata varsa alan adını döner. */
export function check(kg, cm, age) {
  if (!(kg >= 20 && kg <= 350)) return 'kg';
  if (!(cm >= 100 && cm <= 250)) return 'cm';
  if (!(age >= 15 && age <= 100)) return 'age';
  return null;
}

/** BMH ve aktiviteye göre günlük enerji ihtiyacı (TDEE) ile kilo hedefleri. */
export function energy(sex, kg, cm, age, k) {
  const bmr = mifflin(sex, kg, cm, age);
  const tdee = bmr * k;
  return { bmr, hb: harris(sex, kg, cm, age), tdee, lose: tdee - 500, gain: tdee + 300 };
}

export const LB = 0.45359237;
export const IN = 2.54;
