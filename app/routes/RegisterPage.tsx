import React, { useState, useEffect } from "react";
import { Form, useActionData, Link, redirect } from "react-router";
import type { Route } from "./+types/RegisterPage";
import { iniciarSesion, registrarUsuario } from "~/api/controllers/usuarios";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowLeft from "~/icons/ArrowLeft";
import { getSexoIconSrc, isValidEmail, isValidPassword } from "~/utils";
import ModalAlert from "~/components/ModalAlert/ModalAlert";
import { commitSession, getSession } from "~/sessions.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registrarse" },
    { name: "description", content: "Página para registrarse." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const nombre = formData.get("nombre") as string;
  const correo = formData.get("correo") as string;
  const contraseña = formData.get("contraseña") as string;
  const fechaNacimiento = formData.get("fechaNacimiento") as string;
  const sexo = formData.get("sexo") as string;

  const usuarioData = { nombre, correo, contraseña, fechaNacimiento, sexo };
  console.log(usuarioData);
  console.log(usuarioData);
  try {
    const respuesta = await registrarUsuario(usuarioData);

    // Iniciar sesión y redirigir
    const loginResponse = await iniciarSesion({ correo, contraseña });
    if (loginResponse.idUsuario) {
      const session = await getSession(request.headers.get("Cookie"));
      session.set("userId", String(loginResponse.idUsuario));
      session.set("userName", loginResponse.userName);

      return redirect("/seleccion-de-prueba", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    return { success: true, message: "Registro exitoso", data: respuesta };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export default function RegisterPage() {
  const actionData = useActionData<{ success: boolean; message: string }>();

  // Form data
  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  // Modal
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Errors
  const [errorNombre, setErrorNombre] = useState<string>("");
  const [errorCorreo, setErrorCorreo] = useState<string>("");
  const [errorContraseña, setErrorContraseña] = useState<string>("");
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState<string>("");
  const [errorSexo, setErrorSexo] = useState<string>("");

  const onChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    if (e.target.value === "") {
      setErrorNombre("El nombre es obligatorio");
    } else {
      setErrorNombre("");
    }
  };

  const onChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(e.target.value);
    if (isValidEmail(e.target.value) || e.target.value === "") {
      setErrorCorreo("");
    } else {
      setErrorCorreo("El correo electrónico no tiene un formato válido");
    }
  };

  const onChangeContraseña = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setContraseña(newPassword);
    if (newPassword === "") {
      setErrorContraseña(""); // Limpiar el error si el campo está vacío
    } else if (isValidPassword(newPassword)) {
      setErrorContraseña(""); // Limpiar el error si la contraseña es válida
    } else {
      setErrorContraseña(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial de los siguientes (!@#$%^&*,.)."
      );
    }
  };

  const onChangeFechaNacimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaNacimiento(e.target.value);
    if (e.target.value === "") {
      setErrorFechaNacimiento("La fecha de nacimiento es obligatoria");
    } else {
      setErrorFechaNacimiento("");
    }
  };

  const onChangeSexo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSexo(e.target.value);
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
      <main className="flex flex-col gap-8 mt-5">
        <h1 className="text-3xl text-center">Registro de Usuario</h1>
        <Form method="post" className="space-y-6">
          <Field
            label="Nombre"
            name="nombre"
            placeholder="Ingrese su nombre"
            type="text"
            value={nombre}
            onChange={onChangeNombre}
            error={errorNombre}
            iconSrc="/user-icon.svg"
          />
          <Field
            label="Correo Electrónico"
            name="correo"
            placeholder="example@ucab.com"
            type="email"
            value={correo}
            onChange={onChangeCorreo}
            error={errorCorreo}
            iconSrc="/email-icon.svg"
          />
          <Field
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            name="contraseña"
            type="password"
            value={contraseña}
            onChange={onChangeContraseña}
            error={errorContraseña}
            iconSrc="/lock-icon.svg"
          />
          <Field
            label="Fecha de Nacimiento"
            placeholder="Ingrese su fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={onChangeFechaNacimiento}
            error={errorFechaNacimiento}
            iconSrc="/calendar-icon.svg"
          />
          <Field
            label="Sexo"
            placeholder="Seleccione su sexo"
            name="sexo"
            type="select"
            value={sexo}
            onChangeSelect={onChangeSexo}
            error={errorSexo}
            iconSrc={getSexoIconSrc(sexo)}
            options={[
              { value: "", label: "Selecciona sexo" },
              { value: "M", label: "Masculino" },
              { value: "F", label: "Femenino" },
              { value: "Otro", label: "Otro" },
            ]}
          />
          <div></div>
          <PrimaryButton type="submit" label="Registrar" disabled={false} />
        </Form>
        <p className="login-text text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/iniciar-sesion" className="login-link" viewTransition>
            Inicia Sesión
          </Link>
        </p>
      </main>
      <ModalAlert
        type="error"
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
