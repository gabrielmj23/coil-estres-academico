import "./Field.css"; // Archivo CSS para estilos
import React, {useState} from 'react';

interface FieldProps {
  label: string;
  placeholder: string;
  type: string; // text || date || number
  value: string;
  iconSrc: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<{
  label: string;
  iconSrc: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string;
}> = ({ label, iconSrc, type, value, onChange, placeholder, error }) => {

  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleFocus = () => {
    setTouched(false);
  }
  return (
    <div className="mx-auto w-11/12">
      <label className="block mb-1 font-bold text-coilterracota label-input-style">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <img src={iconSrc} alt="Email Icon" />
        </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`block w-full ps-12 p-3.5 input-style text-coilgray-light font-bold ${
          (error != "" && touched)
            ? 'bg-F7E8E2 border-1 border-coilorange-light field-error'
            : 'border-none focus:border-coilbeige focus:shadow-md ok-input-style'
        }`}
        placeholder={placeholder}
      />
      </div>
      {(error != "" && touched) && (
        <p className="text-center text-size-14 text-coilorange-light">
          {error}
        </p>
      )}
    </div>
  );
};
export default Field;
