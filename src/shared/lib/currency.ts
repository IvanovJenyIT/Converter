export function getCurrencyName(code: string, locale?: string) {
  try {
    const dn = new Intl.DisplayNames(locale ? [locale] : undefined, {
      type: "currency",
    });
    return dn.of(code) || code;
  } catch {
    return code;
  }
}

export function getCurrencySymbol(code: string, locale?: string) {
  try {
    const parts = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      currencyDisplay: "symbol",
    }).formatToParts(0);
    const sym = parts.find((p) => p.type === "currency")?.value;
    return sym || code;
  } catch {
    return code;
  }
}
