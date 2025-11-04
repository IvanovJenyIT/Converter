import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { CurrencySelect } from "./CurrencySelect";

type CurrencyCode = string;

type Props = {
  amount: string;
  setAmount: (v: string) => void;
  from: CurrencyCode;
  to: CurrencyCode;
  setFrom: (c: CurrencyCode) => void;
  setTo: (c: CurrencyCode) => void;
  onSwap: () => void;
  isFetching?: boolean;
  isError: boolean;
  codes: CurrencyCode[];
  offline: boolean;
  lastUpdated: Date | null;
};

export function CurrencyForm(props: Props) {
  const {
    amount,
    setAmount,
    from,
    to,
    setFrom,
    setTo,
    onSwap,
    isFetching,
    isError,
    codes,
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Amount</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="font-semibold">
            <p>From</p>
            <CurrencySelect
              code={from}
              setCode={setFrom}
              available={codes}
              label="From"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onSwap}
            aria-label="Swap"
            className="mt-5"
          >
            ⇄
          </Button>
          <div className="font-semibold">
            <p>To</p>
            <CurrencySelect
              code={to}
              setCode={setTo}
              available={codes}
              label="To"
            />
          </div>
        </div>
        {isFetching && (
          <div className="text-sm text-muted-foreground">
            Loading latest rates…
          </div>
        )}
        {isError && (
          <div className="text-destructive text-sm">
            Failed to load rates. If offline, cached data will be used.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
