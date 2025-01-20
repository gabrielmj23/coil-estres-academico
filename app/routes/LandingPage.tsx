import type { Route } from "./+types/LandingPage";
import "./LandingPage.css";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuerpos y Mentes en Equilibrio" },
    {
      name: "description",
      content:
        "Chequea tu salud, abraza tu bienestar. Completa cuestionarios para medir tu nivel de estrés académico",
    },
  ];
}

export default function LandingPage() {
  const handleButtonClick = () => {
    console.log("activado");
  };

  return (
    <div className="welcome-screen">
      <div className="header">
        <img src="/logo-dark.png" alt="Logo" className="logo" />
      </div>
      <h1 className="title">Cuerpos y mentes</h1>
      <h2 className="subtitle">en equilibrio</h2>
      <p className="tagline">"Chequea tu salud, abraza tu bienestar"</p>
      <div className="illustration">
        <img src="/health-home.svg" alt="Ilustración" />
      </div>
      <PrimaryButton label={"Continuar"} linkTo="seleccion-de-prueba" />
      <p className="login-text">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/iniciar-sesion" className="login-link" viewTransition>
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}
