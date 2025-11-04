import { Button } from "@/shared/ui/kit/button";
import { Wifi, WifiOff, RefreshCw, Clock } from "lucide-react";

interface StatusBarProps {
  offline: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
  isFetching: boolean;
}

export function StatusBar({
  offline,
  lastUpdated,
  onRefresh,
  isFetching,
}: StatusBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-3 md:gap-4 w-full max-w-5xl">
      <div className="flex items-center gap-5">
        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border ${
            offline
              ? "border-red-200 text-red-700 bg-red-50"
              : "border-green-200 text-green-700 bg-green-50"
          }`}
        >
          {offline ? (
            <WifiOff className="size-4" />
          ) : (
            <Wifi className="size-4" />
          )}
          {offline ? "Offline" : "Online"}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="size-4" />
          <span>
            {lastUpdated
              ? `${
                  offline ? "Using cached rates from" : "Last updated:"
                } ${lastUpdated.toLocaleString()}`
              : "Fetching rates..."}
          </span>
        </div>
      </div>

      <Button
        onClick={onRefresh}
        disabled={isFetching}
        variant="outline"
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <RefreshCw className="size-4" /> Refresh rates
      </Button>
    </div>
  );
}
