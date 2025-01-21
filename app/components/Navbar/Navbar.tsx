import "./Navbar.css"
import { Link, useLocation } from "react-router"

interface NavbarProps {
    usuario: {
        nombre: string;
    };
}

const Navbar: React.FC<NavbarProps> = ({usuario}) => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <nav className="navbar">
            <div className="navbar-message">
                <a>¡Bienvenido, {usuario.nombre}!</a>

            </div>
            <ul className="navbar-links">
            <li>
                <Link 
                    to="/seleccion-de-prueba"
                    className={location.pathname ==="/seleccion-de-prueba" ? "active-link" : ""}
                >
                    Inicio
                </Link>
            </li>
            <li>
                <Link 
                    to="/historial"
                    className={location.pathname ==="/historial" ? "active-link" : ""}
                >
                    Histórico
                </Link>
            </li>
            <li>
                <Link 
                    to="/recomendaciones"
                    className={location.pathname ==="/recomendaciones" ? "active-link" : ""}
                >
                    Recomendaciones
                </Link>
            </li>
            <li>
                <Link 
                    to="/configuracion"
                    className={location.pathname ==="/configuracion" ? "active-link" : ""}
                >
                    Configuración
                </Link>
            </li>
            </ul>
      </nav>
    )
}

export default Navbar;