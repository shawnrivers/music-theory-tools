type SelectElementValueType = string | number;

type SelectProps<T extends SelectElementValueType> = {
  label: string;
  visibleLabel?: boolean;
  selected: T;
  options: {
    text: string;
    value: T;
  }[];
  className?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Select = <T extends SelectElementValueType>(
  props: SelectProps<T>,
): React.ReactElement<SelectProps<T>> => {
  const {
    label,
    visibleLabel = false,
    selected,
    options,
    className,
    onChange,
  } = props;

  return (
    <label className={className}>
      {visibleLabel && <div>{label}</div>}
      <select
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm dark:border-gray-500 dark:bg-gray-800"
        value={selected}
        aria-label={visibleLabel ? undefined : label}
        onChange={onChange}
        onBlur={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
  );
};
