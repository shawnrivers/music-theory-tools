import classNames from 'classnames';
import { ChordSymbol as ChordSymbolType } from 'app/utils/chord';

export const ChordSymbol: React.VFC<{
  symbol: ChordSymbolType;
  className?: string;
}> = ({ symbol, className }) => (
  <span className={classNames('leading-none', className)}>
    <span>{symbol.base}</span>
    {symbol.aside && <span className="text-sm">{symbol.aside}</span>}
    {symbol.supperScript && (
      <span className="align-superscript text-sm">{symbol.supperScript}</span>
    )}
  </span>
);
