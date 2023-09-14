import { cn } from "@/utils/classNames";
import { ChordSymbol as ChordSymbolType } from "@/features/chord";

export const ChordSymbol: React.FC<{
  symbol: ChordSymbolType;
  className?: string;
}> = ({ symbol, className }) => (
  <span className={cn("leading-none", className)}>
    <span>{symbol.base}</span>
    {symbol.aside && <span className="text-sm">{symbol.aside}</span>}
    {symbol.supperScript && (
      <span
        className="text-sm"
        style={{
          verticalAlign: "super",
        }}
      >
        {symbol.supperScript}
      </span>
    )}
  </span>
);
