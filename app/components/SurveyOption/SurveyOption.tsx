import React, { useState } from "react";
import './SurveyOption.css';

interface SurveyOptionProps {
  options: string[]; // Array of options
  onChange?: (option: string) => void; // Callback when an option is selected
}

export const SurveyOption: React.FC<SurveyOptionProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null >(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="survey-option-container w-9/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
<ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={`survey-option ${selectedOption === option ? "selected" : ""}`}
            onClick={() => handleSelect(option)}
          >
            <span className={`option-label ${selectedOption === option ? "selected" : ""}`}>{option}</span>
            <span className={`radio-circle ${selectedOption === option ? "checked" : ""}`}>
              <span className="radio-dot"></span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

