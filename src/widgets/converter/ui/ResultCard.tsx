import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { formatCurrency, formatRate } from "@/shared/lib/number";

type ResultCardProps = {
  result: number | null;
  rate: number | null;
  from: string;
  to: string;
  isLoading?: boolean;
};

export function ResultCard({
  result,
  rate,
  from,
  to,
  isLoading,
}: ResultCardProps) {
  const inverse = rate != null && rate !== 0 ? 1 / rate : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl font-semibold min-h-[56px] flex items-center justify-center break-all">
            {isLoading ? (
              <div className="h-8 w-40 rounded-md bg-muted animate-pulse" />
            ) : result == null ? (
              "—"
            ) : (
              formatCurrency(result, to)
            )}
          </div>
          <div className="text-muted-foreground">1 {from} =</div>
        </div>

        <hr className="border-t" />

        <div className="grid grid-cols-[1fr_auto] gap-y-4 items-center">
          <div className="text-muted-foreground text-sm">Exchange Rate</div>
          <div className="font-semibold text-base">
            1 {from} = {rate == null ? "—" : `${formatRate(rate)} ${to}`}
          </div>

          <div className="text-muted-foreground text-sm">Inverse Rate</div>
          <div className="font-semibold text-base">
            1 {to} = {inverse == null ? "—" : `${formatRate(inverse)} ${from}`}
          </div>
        </div>

        <hr className="border-t" />

        <div className="bg-muted/60 text-muted-foreground text-center rounded-xl px-4 py-4 text-sm">
          Rates are for informational purposes only and may not reflect
          real-time market rates
        </div>
      </CardContent>
    </Card>
  );
}
