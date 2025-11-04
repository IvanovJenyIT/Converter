import { CONFIG } from "../model/config";
import type { RatesSnapshot, VatComplyRatesResponse } from "../model/type";

export async function fetchVatComplyRates(
  base?: string
): Promise<VatComplyRatesResponse> {
  const url = new URL(CONFIG.API_BASE_URL);
  if (base) url.searchParams.set("base", base);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Rates fetch failed: ${res.status}`);
  }
  const json = (await res.json()) as VatComplyRatesResponse;
  return json;
}

export function computeRate(
  fromCode: string,
  toCode: string,
  snapshot: RatesSnapshot
): number | null {
  if (fromCode === toCode) return 1;
  const rateTo = snapshot.rates[toCode];
  const rateFrom = snapshot.rates[fromCode];
  if (rateTo == null || rateFrom == null) return null;
  return rateTo / rateFrom;
}

export function readCachedRates(): RatesSnapshot | null {
  try {
    const raw = localStorage.getItem(CONFIG.RATES_CACHE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RatesSnapshot;
    if (!parsed || !parsed.rates) return null;
    return parsed;
  } catch {
    console.error(`Failed to read cached rates`);
    return null;
  }
}

export function writeCachedRates(resp: VatComplyRatesResponse): RatesSnapshot {
  const snapshot: RatesSnapshot = {
    timestamp: Date.now(),
    date: resp.date,
    base: resp.base,
    rates: resp.rates,
  };
  try {
    localStorage.setItem(CONFIG.RATES_CACHE, JSON.stringify(snapshot));
  } catch {
    console.error(`Failed to write cached rates`);
  }
  return snapshot;
}
