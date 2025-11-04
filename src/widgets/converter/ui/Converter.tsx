import { useMemo, useCallback } from "react";
import { CurrencyForm } from "./CurrencyForm";
import { ResultCard } from "./ResultCard";
import { StatusBar } from "./StatusBar";
import { useOnline } from "@/shared/utils/useOnline";
import { usePersistentState } from "@/shared/utils/usePersistentState";
import { useDebouncedValue } from "../model/useDebouncedValue";
import { useParsedAmount } from "../model/useParsedAmount";
import { useRate } from "../model/useRate";
import type { RatesSnapshot } from "@/shared/model/type";
import { CONFIG } from "@/shared/model/config";
import { useRates } from "../api/useRates";

type CurrencyCode = string;

export function Converter() {
  const { data, isFetching, isError, refetch } = useRates();
  const isOnline = useOnline();

  const codes = useMemo(
    () => (data ? Object.keys(data.rates).sort() : []),
    [data]
  );

  const [[from, to], setPair] = usePersistentState<
    [CurrencyCode, CurrencyCode]
  >(CONFIG.LAST_PAIR, ["USD", "EUR"]);
  const [amount, setAmount] = usePersistentState<string>(
    CONFIG.LAST_AMOUNT,
    "1"
  );

  const debouncedAmount = useDebouncedValue(amount, 250);
  const parsedAmount = useParsedAmount(debouncedAmount);
  const rate = useRate(from, to, data as RatesSnapshot);

  const result = useMemo(
    () => (rate == null ? null : parsedAmount * rate),
    [parsedAmount, rate]
  );

  const onSwap = useCallback(() => setPair([to, from]), [from, to, setPair]);

  const offline = !isOnline;
  const lastUpdated = data ? new Date(data.timestamp) : null;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <StatusBar
        offline={offline}
        lastUpdated={lastUpdated}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />
      <div className="grid gap-6 md:grid-cols-3 w-full max-w-7xl">
        <div className="md:col-span-2">
          <CurrencyForm
            amount={amount}
            setAmount={setAmount}
            from={from}
            to={to}
            setFrom={(c) => setPair([c, to])}
            setTo={(c) => setPair([from, c])}
            onSwap={onSwap}
            isError={isError}
            isFetching={isFetching}
            codes={codes}
            offline={offline}
            lastUpdated={lastUpdated}
          />
        </div>
        <div className="md:col-span-1">
          <ResultCard
            result={result}
            rate={rate}
            from={from}
            to={to}
            isLoading={isFetching}
          />
        </div>
      </div>
    </div>
  );
}
