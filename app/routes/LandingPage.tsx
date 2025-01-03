import type { Route } from "./+types/landing";
import "./LandingPage.css";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Página de Inicio" },
    { name: "description", content: "Bienvenido a la página de inicio." },
  ];
}

export default function LandingPage() {
  const handleButtonClick = () => {
    console.log("activado");
  };

  return (
    <div className="welcome-screen">
      <div className="header">
        <img src="../public/Project-Logo.png" alt="Logo" className="logo" />
      </div>
      <h1 className="title">
        Cuerpos <span className="highlight"> y mentes</span>
      </h1>
      <h2 className="subtitle">en equilibrio</h2>
      <p className="tagline">
        "Chequea tu salud, abraza tu{" "}
        <span className="highlight-green">bienestar</span>"
      </p>
      <div className="illustration">
        <img
          src="../public/health-home.png"
          alt="Illustration"
          className="image"
        />
      </div>
      <PrimaryButton label={"Continuar"} onClick={handleButtonClick} />
      <p className="login-text">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="login-link">
          Inicia Sesión
        </a>
      </p>
    </div>
  );
}
