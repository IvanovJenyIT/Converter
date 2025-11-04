export type VatComplyRatesResponse = {
  date: string;
  base: string;
  rates: Record<string, number>;
};

export type RatesSnapshot = {
  timestamp: number;
  date: string;
  base: string;
  rates: Record<string, number>;
};
