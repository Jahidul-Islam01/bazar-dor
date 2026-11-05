export const API_BASE =
  "https://openapi.programming-hero.com/api/bazardor";

export function toBanglaNumber(value) {
  const digits = [
    "০",
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯",
  ];

  return String(value).replace(
    /\d/g,
    (digit) => digits[Number(digit)]
  );
}

export function formatBanglaPrice(value) {
  const number = Number(value) || 0;

  return `${new Intl.NumberFormat("bn-BD").format(
    Math.round(number)
  )} টাকা`;
}

export function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function getProductChange(product) {
  return Number(product?.change?.pct) || 0;
}