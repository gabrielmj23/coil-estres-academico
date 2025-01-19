import { Link } from "react-router";
import type { Route } from "./+types/LoginPage";
import ArrowLeft from "~/icons/ArrowLeft";
import Field from "~/components/Field/Field";
import React, { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iniciar Sesión" },
    { name: "description", content: "Página de inicio de sesión." },
  ];
}


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const[errorEmail, setErrorEmail] = useState("");


  // Función para validar correo electrónico
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex estándar para validar correos
    return emailRegex.test(email);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if(isValidEmail(email) || email === ""){
      setErrorEmail("");
    }else{
      setErrorEmail("El correo electrónico no tiene un formato válido");
    }
    
  }
  return (
    <div className="h-[100dvh]">
      <header className="questionnaire"></header>
      <Link
        to="/"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-5">
        <h1 className="text-3xl text-center">Iniciar Sesión</h1>

        <Field
          label="Correo Electrónico"
          placeholder="example@ucab.com"
          type="text"
          onChange={onChangeEmail}
          value={email}
          iconSrc="/email-icon.svg"
          error={errorEmail}
        />
      </main>
    </div>
  );
}
