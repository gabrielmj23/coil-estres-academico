import React from "react";
import Close from "~/icons/Close";

interface ModalAlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  type: "success" | "error";
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  isOpen,
  message,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  if (type === "success") {
    return (
      <div className="fixed top-0 left-0 right-0 flex justify-center items-start pt-8 bg-gray-900 bg-opacity-0 z-50">
        <div className="bg-coilgreen-light border-2 border-coilgreen-dark p-6 rounded-lg shadow-lg max-w-sm w-full flex items-center">
          <img
            src="/success-icon.svg"
            alt="Success Icon"
            className="h-6 w-6 mr-3"
            aria-hidden="true"
          />
          <div className="flex-grow">
            <h2 className="text-xl text-coilgreen-dark font-bold">Éxito</h2>
            <p className="mt-2 text-coilgreen-dark font-bold">{message}</p>
          </div>
          <button onClick={onClose} className="ml-3">
            <Close type="success" className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-start pt-8 bg-gray-900 bg-opacity-0 z-50">
      <div className="bg-[#FFEEE2] border-2 border-coilorange-light p-6 rounded-lg shadow-lg max-w-sm w-full flex items-center">
        <img
          src="/warning-icon.svg"
          alt="Warning Icon"
          className="h-6 w-6 mr-3"
          aria-hidden="true"
        />
        <div className="flex-grow">
          <h2 className="text-xl text-coilorange-light font-bold">Error</h2>
          <p className="mt-2 text-coilorange-light">{message}</p>
        </div>
        <button onClick={onClose} className="ml-3">
          <Close type="error" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ModalAlert;
