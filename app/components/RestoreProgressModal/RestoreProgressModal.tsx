import { Button, Modal, type CustomFlowbiteTheme } from "flowbite-react";

interface RestoreProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const customTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    base: "flex items-center justify-center h-full w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700 mb-6",
  },
};

export default function RestoreProgressModal({
  isOpen,
  onClose,
  onContinue,
}: RestoreProgressModalProps) {
  return (
    <Modal theme={customTheme} size="md" popup show={isOpen} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">¡Bienvenido de nuevo!</h3>
          <p className="mb-4">
            ¿Quieres continuar con tu progreso de la sesión anterior?
          </p>
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={onClose}>
              Empezar de nuevo
            </Button>
            <Button className="bg-coilterracota" onClick={onContinue}>
              Continuar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
