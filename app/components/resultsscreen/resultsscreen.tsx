import React from "react";

interface ResultCardProps {
    hasSymptoms: boolean;

}


export const ResultCard: React.FC<ResultCardProps> = ({ hasSymptoms }) => {
  // Datos dinámicos basados en el estado de síntomas
  const data = hasSymptoms
    ? {
        title: "Resultado",
        message: "Presenta síntomas de Ansiedad/Depresión y Disfunción Social.",
        imageSrc: "url-del-icono-con-síntomas", // Coloca la URL de la imagen con síntomas
        borderColor: "transparent", // Azul para el borde
      }
    : {
        title: "Resultado",
        message: "No presenta síntomas de Ansiedad/Depresión ni Disfunción Social.",
        imageSrc: "url-del-icono-sin-síntomas", // Coloca la URL de la imagen sin síntomas
        borderColor: "transparent", // Sin borde para el caso positivo
      };

  // Estilos dinámicos
  const containerStyle: React.CSSProperties = {
    border: `2px solid ${data.borderColor}`,
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    width: "300px",
    margin: "20px auto",
    backgroundColor: "#f8f9fa", // Fondo claro
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "50%",
    backgroundColor: "#ffe5d9", // Color de fondo del círculo
  };

  const messageStyle: React.CSSProperties = {
    marginTop: "15px",
    color: "#6c757d", // Texto gris
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <h3>{data.title}</h3>
      <div style={{ width: "150px", margin: "0 auto" }}>
        <img
          src={data.imageSrc}
          alt="Resultado"
          style={imageStyle}
        />
      </div>
      <p style={messageStyle}>{data.message}</p>
    </div>
  );
};

export default ResultCard;
