import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router";
import LogoutModal from "../LogoutModal/LogoutModal";
import ModalAlert from "../ModalAlert/ModalAlert";
import { HiOutlineLogout } from "react-icons/hi";

interface NavbarProps {
  nombre: string;
}

const Navbar: React.FC<NavbarProps> = ({ nombre }) => {
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <nav className="navbar h-28">
      <div className="flex items-center">
        <button onClick={openLogoutModal} className="logout-button absolute left-4">
          <HiOutlineLogout className="w-6 h-6 text-white-700" />
        </button>
        <div className="navbar-message ml-10">
          <a>¡Bienvenido, {nombre}!</a>
        </div>
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
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
