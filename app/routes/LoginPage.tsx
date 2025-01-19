import { Link } from "react-router";
import type { Route } from "./+types/LoginPage";
import ArrowLeft from "~/icons/ArrowLeft";
import Field from "~/components/Field/Field";
import React, { useState } from "react";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iniciar Sesión" },
    { name: "description", content: "Página de inicio de sesión." },
  ];
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Función para validar correo electrónico
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex estándar para validar correos
    return emailRegex.test(email);
  };

  // Función para validar contraseña
  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
    // Regex corregida que permite el punto (.) además de los caracteres especiales
    return passwordRegex.test(password);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isValidEmail(email) || email === "") {
      setErrorEmail("");
    } else {
      setErrorEmail("El correo electrónico no tiene un formato válido");
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Aquí validamos la contraseña correctamente
    if (newPassword === "") {
      setErrorPassword(""); // Limpiar el error si el campo está vacío
    } else if (isValidPassword(newPassword)) {
      setErrorPassword(""); // Limpiar el error si la contraseña es válida
    } else {
      setErrorPassword(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
    }
  };

  return (
    <div className="h-[100dvh]">
      <header className="primary rounded-b-[32px] mb-12"></header>
      <Link
        to="/"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-[3.125rem] mt-5">
        <h1 className="text-3xl text-center">Iniciar Sesión</h1>
        <div className="space-y-6">
          <Field
            label="Correo Electrónico"
            placeholder="example@ucab.com"
            type="text"
            onChange={onChangeEmail}
            value={email}
            iconSrc="/email-icon.svg"
            error={errorEmail}
          />

          <Field
            label="Contraseña"
            placeholder="Ingrese su contraseña.."
            type="password"
            onChange={onChangePassword}
            value={password}
            iconSrc="/lock-icon.svg"
            error={errorPassword}
          />

          <PrimaryButton label={"Inciar Sesión"} linkTo="seleccion-de-prueba" />
        </div>
        <div>
          <p className="login-text text-center">
            ¿No tienes una cuenta?{" "}
            <a href="/registrarse" className="login-link">
              Regístrate.
            </a>
          </p>
          <p className="text-center">
            <a href="/olvide-mi-contraseña" className="login-link">
              Olvidé mi contraseña
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
