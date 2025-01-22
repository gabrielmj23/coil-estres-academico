import React from "react";
import { Form } from "react-router";
import Close from "~/icons/Close";
import { Modal } from "flowbite-react";
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
        <Modal.Header/>
        <Modal.Body>
          <div className="bg-white rounded-lg  max-w-sm w-full flex flex-col items-center">
            <h2 className="text-xl text-coilterracota font-bold mb-4">¿Desea cerrar sesión?</h2>
            <Form method="post" action="/logout" className="w-full">
              <button
                type="submit"
                className="bg-coilterracota text-white p-2 rounded w-full mb-2"
              >
                Cerrar sesión
              </button>
            </Form>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded w-full"
            >
              Cancelar
            </button>
        </div>
        </Modal.Body>
        </Modal>
      );
};

export default LogoutModal;