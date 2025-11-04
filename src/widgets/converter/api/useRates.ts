import { useQuery } from "@tanstack/react-query";
import {
  fetchVatComplyRates,
  readCachedRates,
  writeCachedRates,
} from "@/shared/api/exchange";
import { CONFIG } from "@/shared/model/config";
import type { RatesSnapshot } from "@/shared/model/type";

export function useRates() {
  const query = useQuery({
    queryKey: ["rates", "vatcomply"],
    queryFn: async () => {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        const cached = readCachedRates();
        if (cached) return cached;
      }
      const res = await fetchVatComplyRates();
      return writeCachedRates(res);
    },
    staleTime: CONFIG.FIVE_MINUTES,
    select: (data): RatesSnapshot => data,
  });

  return query;
}
