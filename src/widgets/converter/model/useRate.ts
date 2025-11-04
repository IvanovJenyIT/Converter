import { useMemo } from "react";
import { computeRate } from "@/shared/api/exchange";
import type { RatesSnapshot } from "@/shared/model/type";

export function useRate(
  from: string,
  to: string,
  data: RatesSnapshot | undefined
): number | null {
  return useMemo(
    () => (data ? computeRate(from, to, data) : null),
    [data, from, to]
  );
}
