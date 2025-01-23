import "./Navbar.css";
import { Link, useLocation } from "react-router";

interface NavbarProps {
  nombre: string;
}

const Navbar: React.FC<NavbarProps> = ({ nombre }) => {
  const location = useLocation();
  return (
    <nav className="navbar h-28">
      <div className="navbar-message">
        <a>¡Bienvenido, {nombre}!</a>
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/seleccion-de-prueba"
            className={
              location.pathname === "/seleccion-de-prueba" ? "active-link" : ""
            }
            viewTransition
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/historial"
            className={location.pathname === "/historial" ? "active-link" : ""}
            viewTransition
          >
            Histórico
          </Link>
        </li>
        <li>
          <Link
            to="/recomendaciones-dashboard"
            className={
              location.pathname === "/recomendaciones-dashboard"
                ? "active-link"
                : ""
            }
            viewTransition
          >
            Recomendaciones
          </Link>
        </li>
        <li>
          <Link
            to="/configurar-perfil"
            className={
              location.pathname === "/configurar-perfil" ? "active-link" : ""
            }
            viewTransition
          >
            Configuración
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
