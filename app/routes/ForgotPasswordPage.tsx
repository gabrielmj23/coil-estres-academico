import { useState, useEffect } from "react";
import { useActionData, Link, Form } from "react-router";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ModalAlert from "~/components/ModalAlert/ModalAlert";
import ArrowLeft from "~/icons/ArrowLeft";
import { generarCodigoRecuperacion } from "~/api/controllers/usuarios";

export function meta() {
  return [
    { title: "Olvidé Mi Contraseña" },
    { name: "description", content: "Página de recuperación de contraseña." },
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const correo = formData.get("correo") as string;

  console.log("Correo recibido en el backend:", correo);

  try {
    const respuesta = await generarCodigoRecuperacion(correo);
    if (
      respuesta?.message === "La nueva contraseña ha sido enviada al correo."
    ) {
      return {
        success: true,
        message: "Nueva contraseña enviada correctamente",
      };
    } else {
      return {
        success: false,
        message: respuesta.message || "Error al enviar la nueva contraseña",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Error desconocido",
    };
  }
}

export default function ForgotPasswordPage() {
  const actionData = useActionData();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isValidEmail(e.target.value) || e.target.value === "") {
      setErrorEmail("");
    } else {
      setErrorEmail("El correo electrónico no tiene un formato válido");
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      setSuccessMessage(
        actionData.message || "Nueva contraseña enviada con éxito"
      );
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage("");
      }, 4000);
    } else if (!actionData?.success && actionData?.message) {
      setErrorMessage(actionData.message);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        setErrorMessage("");
      }, 4000);
    }
  }, [actionData]);

  return (
    <div className="h-[100dvh]">
      <header className="primary rounded-b-[32px] mb-12"></header>
      <Link
        to="/"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
        viewTransition
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-[3.125rem] mt-5">
        <h1 className="text-3xl text-center">¿Olvidaste tu contraseña?</h1>
        <p
          className="text-coilterracota text-center"
          style={{ fontSize: "18px" }}
        >
          Ingresa tu correo para recibir una nueva contraseña
        </p>

        <Form method="post">
          <div className="space-y-6">
            <Field
              label="Correo Electrónico"
              name="correo"
              placeholder="example@ucab.com"
              type="text"
              onChange={onChangeEmail}
              value={email}
              iconSrc="/email-icon.svg"
              error={errorEmail}
            />
            <PrimaryButton
              type="submit"
              label="Enviar Nueva Contraseña"
              disabled={!isValidEmail(email)}
            />
          </div>
        </Form>
      </main>
      <ModalAlert
        isOpen={isModalOpen}
        message={errorMessage}
        onClose={() => setIsModalOpen(false)}
      />

      {actionData?.success && (
        <div className="text-green-600">{actionData.message}</div>
      )}
    </div>
  );
}