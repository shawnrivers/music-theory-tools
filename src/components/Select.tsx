type SelectElementValueType = string | number;

type SelectProps<T extends SelectElementValueType> = {
  label: string;
  selected: T;
  options: {
    text: string;
    value: T;
  }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
};

export const Select = <T extends SelectElementValueType>(
  props: SelectProps<T>,
): React.ReactElement<SelectProps<T>> => {
  const { label, selected, options, className, onChange } = props;

  return (
    <label className={className}>
      <div>{label}</div>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-800 rounded-md shadow-sm focus-ring-outline"
        value={selected}
        onChange={onChange}
        onBlur={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
  );
};
