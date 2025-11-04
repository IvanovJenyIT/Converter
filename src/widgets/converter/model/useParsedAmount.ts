import { useMemo } from "react";

export function useParsedAmount(amount: string): number {
  return useMemo(() => {
    const normalized = amount.replace(",", ".");
    const n = Number.parseFloat(normalized);
    return Number.isFinite(n) ? n : 0;
  }, [amount]);
}
