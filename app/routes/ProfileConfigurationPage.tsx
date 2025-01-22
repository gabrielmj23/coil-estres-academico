import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Form, useActionData, Link, redirect } from "react-router";
import type { Route } from "./+types/ProfileConfigurationPage";
import {
  actualizarUsuario,
  obtenerUsuarioPorId,
} from "~/api/controllers/usuarios";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowLeft from "~/icons/ArrowLeft";
import { getSession } from "~/sessions.server";
import { getSexoIconSrc, isValidEmail, isValidPassword } from "~/utils";
import ModalAlert from "~/components/ModalAlert/ModalAlert";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuración de Perfil" },
    { name: "description", content: "Actualiza tu configuración de usuario." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    // Redirect to test selection if they are already signed in.
    return redirect("/iniciar-sesion");
  }

  const idUsuario = session.get("userId");
  if (!idUsuario) {
    console.error("No se encontró un ID de usuario en la sesión.");
    return redirect("/iniciar-sesion");
  }

  const userFromDb = await obtenerUsuarioPorId(Number(idUsuario));
  return userFromDb;
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    // Redirect to test selection if they are already signed in.
    return redirect("/iniciar-sesion");
  }

  const formData = await request.formData();
  const correo = formData.get("correo") as string;
  const nombre = formData.get("nombre") as string | undefined;
  const contraseña = formData.get("contraseña") as string | undefined;
  const fechaNacimiento = formData.get("fechaNacimiento") as string | undefined;
  const sexo = formData.get("sexo") as string | undefined;

  const usuarioData = {
    nombre,
    correo,
    contraseña,
    fechaNacimiento,
    sexo,
    sessionId: session.get("userId")!,
  };
  console.log(usuarioData);

  try {
    const respuesta = await actualizarUsuario(usuarioData);
    return { success: true, message: "Actualizacion exitosa", data: respuesta };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export default function ProfileConfigurationPage({
  loaderData,
}: Route.ComponentProps) {
  // Get original user data from db
  const usuarioOriginal = loaderData.usuario;

  const actionData = useActionData<{ success: boolean; message: string }>();

  // Form state
  const [formState, setFormState] = useState({
    nombre: usuarioOriginal.nombre,
    correo: usuarioOriginal.correo,
    contraseña: "",
    fechaNacimiento: usuarioOriginal.fechaNacimiento,
    sexo: usuarioOriginal.sexo,
  });

  // Modal
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");

  // Input error messages
  const [errorNombre, setErrorNombre] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState("");
  const [errorSexo, setErrorSexo] = useState("");

  const onChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, nombre: e.target.value }));
    if (e.target.value === "") {
      setErrorNombre("El nombre es obligatorio");
    } else {
      setErrorNombre("");
    }
  };

  const onChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, correo: e.target.value }));
    if (isValidEmail(e.target.value) || e.target.value === "") {
      setErrorCorreo("");
    } else {
      setErrorCorreo("El correo electrónico no tiene un formato válido");
    }
  };

  const onChangeContraseña = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormState((prev) => ({ ...prev, contraseña: newPassword }));
    if (newPassword === "") {
      setErrorContraseña(""); // Limpiar el error si el campo está vacío
    } else if (isValidPassword(newPassword)) {
      setErrorContraseña(""); // Limpiar el error si la contraseña es válida
    } else {
      setErrorContraseña(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
    }
  };

  const onChangeFechaNacimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, fechaNacimiento: e.target.value }));
    if (e.target.value === "") {
      setErrorFechaNacimiento("La fecha de nacimiento es obligatoria");
    } else {
      setErrorFechaNacimiento("");
    }
  };

  const onChangeSexo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, sexo: e.target.value }));
    if (e.target.value === "") {
      setErrorSexo("El sexo es obligatorio");
    } else {
      setErrorSexo("");
    }
  };

  // UseEffect to handle response
  useEffect(() => {
    if (actionData?.message) {
      setModalMessage(actionData.message);
      setIsModalOpen(true);
      setModalType(actionData.success ? "success" : "error");
      // Hide modal after 5 seconds
      setTimeout(() => {
        setIsModalOpen(false);
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
        <h1 className="text-3xl text-center">Configuración de Usuario</h1>
        <Form method="post" className="space-y-6">
          <Field
            label="Nombre"
            name="nombre"
            placeholder={"Ingrese su nombre"}
            type="text"
            value={formState.nombre}
            onChange={onChangeNombre}
            error={errorNombre}
            iconSrc="/user-icon.svg"
          />
          <Field
            label="Correo Electrónico"
            name="correo"
            placeholder={usuarioOriginal?.correo || "example@ucab.com"}
            type="email"
            value={formState.correo}
            onChange={onChangeCorreo}
            error={errorCorreo}
            iconSrc="/email-icon.svg"
          />
          <Field
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            name="contraseña"
            type="password"
            value={formState.contraseña}
            onChange={onChangeContraseña}
            error={errorContraseña}
            iconSrc="/lock-icon.svg"
          />
          <Field
            label="Fecha de Nacimiento"
            placeholder={
              usuarioOriginal?.fechaNacimiento ||
              "Ingrese su fecha de nacimiento"
            }
            name="fechaNacimiento"
            type="date"
            value={formState.fechaNacimiento}
            onChange={onChangeFechaNacimiento}
            error={errorFechaNacimiento}
            iconSrc="/calendar-icon.svg"
          />
          <Field
            label="Sexo"
            placeholder="Seleccione su sexo"
            name="sexo"
            type="select"
            value={formState.sexo}
            onChangeSelect={onChangeSexo}
            error={errorSexo}
            iconSrc={getSexoIconSrc(formState.sexo)}
            options={[
              { value: "", label: "Selecciona sexo" },
              { value: "M", label: "Masculino" },
              { value: "F", label: "Femenino" },
              { value: "Otro", label: "Otro" },
            ]}
          />
          <div></div>
          <PrimaryButton type="submit" label="Actualizar" disabled={false} />
        </Form>
      </main>
      <ModalAlert
        isOpen={isModalOpen}
        message={modalMessage}
        type={modalType}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
