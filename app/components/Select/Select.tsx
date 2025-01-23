import "./Select.css";

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  selected?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

/**
 * Select toggle component
 * @author Gabriel
 */
export default function Select({ options, onChange, selected }: SelectProps) {
  return (
    <select className="coil-select" onChange={onChange}>
      {options.map((opt) => (
        <option
          value={opt.value}
          {...(opt.value === selected ? { selected: true } : "")}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}
