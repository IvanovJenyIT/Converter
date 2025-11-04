import { useMemo } from "react";
import { getCurrencyName } from "@/shared/lib/currency";

export function useFilteredCurrencies(available: string[], query: string) {
  return useMemo(() => {
    const q = query.toLowerCase().trim();
    return available.filter((c) => {
      if (!q) return true;
      const byCode = c.toLowerCase().includes(q);
      const byName = getCurrencyName(c).toLowerCase().includes(q);
      return byCode || byName;
    });
  }, [available, query]);
}
