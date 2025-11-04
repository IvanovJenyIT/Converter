import { Check } from "lucide-react";

type CurrencyOptionProps = {
  code: string;
  name: string;
  symbol: string;
  selected?: boolean;
  active?: boolean;
  onSelect?: () => void;
  refEl?: (el: HTMLButtonElement | null) => void;
  as: "button" | "div";
};

export function CurrencyOption({
  code,
  name,
  symbol,
  selected,
  active,
  onSelect,
  refEl,
  as,
}: CurrencyOptionProps) {
  const className = `w-full text-left px-4 py-3 rounded-lg hover:bg-accent flex items-center gap-3
    ${active ? "ring-2 ring-ring" : ""}
    ${selected ? "bg-accent/50" : ""}`;

  const content = (
    <>
      <div className="size-9 rounded-full border flex items-center justify-center text-blue-600 bg-blue-50">
        {symbol}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{code}</div>
        <div className="text-muted-foreground text-sm">{name}</div>
      </div>
      {selected && <Check className="size-5 text-blue-600" />}
    </>
  );

  if (as === "button") {
    return (
      <button ref={refEl} onClick={onSelect} className={className}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
