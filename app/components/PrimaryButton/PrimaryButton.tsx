import React from "react";
import "./PrimaryButton.css";
import { Link } from "react-router";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.JSX.Element;
  linkTo?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon,
  linkTo,
}) => {
  if (linkTo) {
    return (
      <Link to={linkTo} className="button w-2/3 md:w-72" viewTransition>
        {label}
        {icon}
      </Link>
    );
  }
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
