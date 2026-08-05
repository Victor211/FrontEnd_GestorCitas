const priceFormatter = new Intl.NumberFormat("es-PY", {
  style: "currency",
  currency: "PYG",
});

export function formatServicePrice(price: number): string {
  return priceFormatter.format(price);
}

export function formatServiceDuration(durationMinutes: number): string {
  return `${durationMinutes} min`;
}
