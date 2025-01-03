import React from "react";
import "./SurveyOption.css";

interface SurveyOptionProps {
  options: OpcionesReturn[]; // Array of options
  selectedOption: number | null; // Selected option ID
  onChange: (option: OpcionesReturn) => void; // Callback when an option is selected
}

export const SurveyOption: React.FC<SurveyOptionProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div className="survey-option-container w-9/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={`survey-option ${
              selectedOption === option.idOpcion ? "selected" : ""
            }`}
            onClick={() => onChange(option)}
          >
            <span
              className={`option-label ${
                selectedOption === option.idOpcion ? "selected" : ""
              }`}
            >
              {option.contenido}
            </span>
            <span
              className={`radio-circle ${
                selectedOption === option.idOpcion ? "checked" : ""
              }`}
            >
              <span className="radio-dot"></span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
