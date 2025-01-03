import React from "react";
import "./PrimaryButton.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.JSX.Element;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon,
}) => {
  return (
    <button
      className="button w-2/3 md:w-72"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {icon}
    </button>
  );
};

export default PrimaryButton;
