import React, { useState } from "react";
import './SurveyOption.css';

interface SurveyOptionProps {
  options: string[]; // Array of options
  selectedOption: string | null; // Selected option
  onChange: (option: string) => void; // Callback when an option is selected
}

export const SurveyOption: React.FC<SurveyOptionProps> = ({ options, selectedOption, onChange }) => {
  return (
    <div className="survey-option-container w-9/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={`survey-option ${selectedOption === option ? "selected" : ""}`}
            onClick={() => onChange(option)}
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

