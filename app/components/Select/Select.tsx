import "./Select.css";

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

/**
 * Select toggle component
 * @author Gabriel
 */
export default function Select({ options, onChange }: SelectProps) {
  return (
    <select className="coil-select" onChange={onChange}>
      {options.map((opt) => (
        <option value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
