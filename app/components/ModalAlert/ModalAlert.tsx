import React, { useEffect } from "react";

interface ModalAlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const ModalAlert: React.FC<ModalAlertProps> = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Cerrar el ModalAlert después de 5 segundos

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-start pt-8 bg-gray-900 bg-opacity-0 z-50">
      <div className="bg-[#FFEEE2] border-2 border-[#FE8659] p-6 rounded-lg shadow-lg max-w-sm w-full flex items-center">
        <img
          src="/warning-icon.svg"
          alt="Warning Icon"
          className="h-6 w-6 mr-3"
        />
        <div className="flex-grow">
          <h2 className="text-xl text-[#FE8659] font-bold">Error</h2>
          <p className="mt-2 text-[#FE8659]">{message}</p>
        </div>
        <button onClick={onClose} className="ml-3">
          <img src="/close-icon.svg" alt="Close Icon" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ModalAlert;
