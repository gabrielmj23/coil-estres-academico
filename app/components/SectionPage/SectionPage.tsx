import React from "react";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import "./SectionPage.css";
import ArrowRight from "~/icons/ArrowRight";
import RoundButton from "../RoundButton/RoundButton";
import ArrowLeft from "~/icons/ArrowLeft";

interface SectionPageProps {
  // props which come from parent to child
  image: string;
  instruction: string;
  onContinue: () => void;
}

/**
 * Section instructions page for questionnaires
 * @author Ricardo
 * @param props
 * @param props.image Section image
 * @param props.instruction Section instruction
 * @param props.onContinue Handler for continuing from this screen
 */
export const SectionPage: React.FC<SectionPageProps> = ({
  image,
  instruction,
  onContinue,
}) => {
  return (
    <div className="container">
      {/* Top Bar */}
      <div className="top-bar">
        <div>
          <PrimaryButton
            label=""
            linkTo="/seleccion-de-prueba"
            icon={<ArrowLeft className="w-9" />}
          />
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
          <p className="text font-bold">{instruction}</p>
        </div>

        {/* Botón */}
        <RoundButton
          icon={<ArrowRight className="h-8" />}
          onClick={onContinue}
        />
      </div>
    </div>
  );
};

export default SectionPage;
