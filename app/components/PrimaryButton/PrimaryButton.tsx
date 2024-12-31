import React from "react";
import "./PrimaryButton.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
