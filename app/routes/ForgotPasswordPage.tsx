import { useState, useEffect } from "react";
import { useActionData, Link, Form } from "react-router";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ModalAlert from "~/components/ModalAlert/ModalAlert";
import ArrowLeft from "~/icons/ArrowLeft";
import { generarCodigoRecuperacion, verificarCodigo } from "~/api/controllers/usuarios";

export function meta() {
  return [
    { title: "Olvidé Mi Contraseña" },
    { name: "description", content: "Página de recuperación de contraseña." },
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const correo = formData.get("correo") as string; // Aquí se obtiene el correo del formulario
  const codigo = formData.get("codigo") as string;

  console.log("Correo recibido en el backend:", correo); // Añadir un log para ver si el correo llega correctamente

  try {
    if (codigo) {
      // Verificar el código
      const respuesta = await verificarCodigo(correo, codigo);
      if (respuesta?.message === "Código verificado correctamente.") {
        return { success: true, message: "Código verificado correctamente" };
      } else {
        return { success: false, message: respuesta.message || "Código incorrecto o expirado" };
      }
    } else {
      // Generar el código
      const respuesta = await generarCodigoRecuperacion(correo);
      if (respuesta?.message === "Código de recuperación enviado.") {
        return { success: true, message: "Código enviado correctamente" };
      } else {
        return { success: false, message: respuesta.message || "Error al enviar el código" };
      }
    }
  } catch (error) {
    return { success: false, message: (error as Error).message || "Error desconocido" };
  }
}

export default function ForgotPasswordPage() {
  const actionData = useActionData();
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false); // Nuevo estado para verificar si el código fue enviado

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

  const onChangeCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value);
    if (e.target.value === "") {
      setErrorCodigo("");
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      setSuccessMessage(actionData.message || "Código enviado con éxito");
      setCodigoEnviado(true); // Cambiar estado cuando se envíe el código
        
      // Cerrar el modal después de 4 segundos
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage("");
      }, 4000);
    } else if (!actionData?.success && actionData?.message) {
      setErrorMessage(actionData.message);
      setIsModalOpen(true);

      // Cerrar el modal después de 4 segundos
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
          {codigoEnviado ? "Ingresa el código de recuperación" : "Ingresa tu correo para recibir un código de recuperación"}
        </p>

        {/* Formulario para el correo, solo si no se ha enviado el código */}
        {!codigoEnviado && (
          <Form method="post">
            <div className="space-y-6">
              <Field
                label="Correo Electrónico"
                name="correo" // Asegúrate de que este sea el mismo nombre que esperas en el backend
                placeholder="example@ucab.com"
                type="text"
                onChange={onChangeEmail}
                value={email}
                iconSrc="/email-icon.svg"
                error={errorEmail}
              />
              <PrimaryButton
                type="submit"
                label="Enviar Código"
                disabled={!isValidEmail(email)}
              />
            </div>
          </Form>
        )}

        {/* Formulario para ingresar el código de verificación */}
        {codigoEnviado && (
          <Form method="post" className="mt-6">
            <div className="space-y-6">
              <Field
              iconSrc=""
                label="Código de Recuperación"
                name="codigo"
                placeholder="Ingrese el código"
                type="number" // Cambiar el tipo a number
                onChange={onChangeCodigo}
                value={codigo}
                error={errorCodigo}
              />
              <PrimaryButton
                type="submit"
                label="Verificar Código"
                disabled={codigo.length < 4} // Asegurarse de que el código tenga 4 caracteres
              />
            </div>
          </Form>
        )}
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
