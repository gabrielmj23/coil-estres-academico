import "./Field.css"; // Archivo CSS para estilos
import React, { useState } from "react";

interface FieldProps {
  label: string;
  name: string;
  placeholder: string;
  type: string; // text || date || number || password || select
  value: string;
  iconSrc: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Only for select type
  options?: { value: string; label: string }[]; // Only for select type
}

const Field: React.FC<{
  label: string;
  name: string;
  iconSrc: string;
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> ) => void;
  onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  error: string;
  options?: { value: string; label: string }[]; 
}> = ({ label,name, iconSrc, type, value, onChange, onChangeSelect, placeholder, error, options }) => {
  const [touched, setTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleFocus = () => {
    setTouched(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = type === "password";
  const isSelectField = type === "select";

  return (
    <div className="mx-auto w-11/12">
      <label className="block mb-1 font-bold text-coilterracota label-input-style">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <img src={iconSrc} alt="Icon" />
        </div>
        {isSelectField ? (
          <select
            name={name}
            value={value}
            onChange={onChangeSelect}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`block w-full ps-14 p-3.5 input-style text-coilgray-light font-bold ${
              error && touched
                ? "bg-F7E8E2 border-1 border-coilorange-light field-error"
                : "border-none focus:border-coilbeige focus:shadow-md ok-input-style"
            }`}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={isPasswordField && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`block w-full ps-14 p-3.5 input-style text-coilgray-light font-bold ${
              error && touched
                ? "bg-F7E8E2 border-1 border-coilorange-light field-error"
                : "border-none focus:border-coilbeige focus:shadow-md ok-input-style"
            }`}
            placeholder={placeholder}
          />
          )}

        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 end-0 flex items-center pe-4"
          >
            <img
              src={showPassword ? "/eye-closed-icon.svg" : "/eye-icon.svg"}
              alt={showPassword ? "Esconder Contraseña" : "Mostrar Contraseña"}
            />
          </button>
        )}
      </div>
      {error != "" && touched && (
        <p className="text-center text-size-14 text-coilorange-light">
          {error}
        </p>
      )}
    </div>
  );
};
export default Field;
