import React from "react";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import "./Testpage.css";
import { icons } from "@ladle/react";

interface TestpageProps {
    // props which come from parent to child
    icon: string;
    image: string;
    buttonpath: string;
}

export const Testpage: React.FC<TestpageProps> = ({icon ,image, buttonpath}) => {
  
    const handleClick = () => {
        console.log("Button clicked");

        if (buttonpath === "/test-sisco") {
            window.location.href = buttonpath;
        } else if (buttonpath === "/test-goldberg") {
            window.location.href = buttonpath;  
        }
    
    };

    const returnClick = () => {
        console.log("Button clicked");
        window.location.href = "/";
    };
  
    return (

    <div className="container">
        {/* Top Bar */}
        <div className="top-bar">
          <img src={icon} alt="Logo" className="icon"/>
          <div>
            <PrimaryButton label="←" onClick={returnClick}></PrimaryButton>
          </div>
        </div>
  

    <div className="container">
      {/* Ilustración */}
      <div className="image-container">
        <img
          src={image} // Reemplaza con la ruta de tu imagen
          alt="Illustration"
          className="image"
        />
      </div>

      {/* Texto */}
      <div className="text-container">
        {buttonpath === "/test-sisco" ? 
        <p className="text">Señala con Qué <span className="highlight">Frecuencia</span> te Inquietan las Siguientes Situaciones</p> : 
        <p className="text"><span className="highlight">Selecciona</span> la Opción que Más se Ajuste a Tí</p>}
      </div>

      {/* Botón */}
      <PrimaryButton label="→" onClick={handleClick}></PrimaryButton>
    </div>
    </div>
  );
};

export default Testpage;
