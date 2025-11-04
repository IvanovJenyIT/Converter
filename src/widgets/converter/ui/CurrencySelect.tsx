import { useState } from "react";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";
import { Input } from "@/shared/ui/kit/input";
import { Search } from "lucide-react";
import { getCurrencyName, getCurrencySymbol } from "@/shared/lib/currency";
import { useFilteredCurrencies } from "../model/useFilteredCurrencies";
import { useActiveItemNavigation } from "../model/useActiveItemNavigation";
import { CurrencyOption } from "@/entites/currency";

export type CurrencyCode = string;

export function CurrencySelect({
  code,
  setCode,
  available,
  label,
}: {
  code: CurrencyCode;
  setCode: (c: CurrencyCode) => void;
  available: CurrencyCode[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useFilteredCurrencies(available, q);
  const { active, setActive, itemRefs, onKeyDown } =
    useActiveItemNavigation(filtered);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(e);
    if (e.key === "Enter") {
      e.preventDefault();
      const c = filtered[active];
      if (c) {
        setCode(c);
        setOpen(false);
      }
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto py-1"
          >
            <CurrencyOption
              code={code}
              as="div"
              name={getCurrencyName(code)}
              symbol={getCurrencySymbol(code)}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Select currency</DialogTitle>
            <DialogDescription>
              {label}: Choose a currency from the list below or use the search
              bar to find a specific currency.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search"
              className="pl-9"
            />
          </div>
          <div className="max-h-80 overflow-auto mt-3 p-0.5">
            {filtered.map((c, idx) => (
              <CurrencyOption
                key={c}
                code={c}
                name={getCurrencyName(c)}
                symbol={getCurrencySymbol(c)}
                selected={c === code}
                active={idx === active}
                as="button"
                onSelect={() => {
                  setCode(c);
                  setOpen(false);
                }}
                refEl={(el) => (itemRefs.current[idx] = el)}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
