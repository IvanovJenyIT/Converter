export function formatCurrency(n: number, currency?: string) {
  try {
    return new Intl.NumberFormat(
      undefined,
      currency ? { style: 'currency', currency } : undefined
    ).format(n)
  } catch {
    return n.toFixed(2)
  }
}

export function formatRate(n: number) {
  return n.toFixed(6)
}


