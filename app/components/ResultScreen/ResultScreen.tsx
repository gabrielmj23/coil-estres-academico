import React from "react";

interface ResultCardProps {
  hasSymptoms: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ hasSymptoms }) => {
  // Datos dinámicos basados en el estado de síntomas
  const data = hasSymptoms
    ? {
        title: "Resultado",
        message: "Presentas síntomas de Ansiedad/Depresión y Disfunción Social.",
        imageSrc: "/con-sintomas.svg",
      }
    : {
        title: "Resultado",
        message:
          "No presentas síntomas de Ansiedad/Depresión ni Disfunción Social.",
        imageSrc: "/sin-sintomas.svg",
      };

  // Estilos dinámicos
  const containerStyle: React.CSSProperties = {
    borderRadius: "15px",
    textAlign: "center",
    width: "100%",
    margin: "20px auto",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "50%",
    backgroundColor: "#ffe5d9", // Color de fondo del círculo
  };

  const messageStyle: React.CSSProperties = {
    marginTop: "15px",
    fontWeight: "bold",
    color: "var(--coilterracota)"
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-3xl">{data.title}</h1>
      <div style={{ width: "300px", marginInline: "auto", marginTop: "15px" }}>
        <img src={data.imageSrc} alt="Resultado" style={imageStyle} />
      </div>
      <p style={messageStyle} className="text-lg px-4">{data.message}</p>
    </div>
  );
};

export default ResultCard;
