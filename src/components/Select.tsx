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
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
