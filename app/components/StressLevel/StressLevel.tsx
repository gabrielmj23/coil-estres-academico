import React from "react";

interface StressLevelProps {
  percentage: number;
}

// Determinar el color según el porcentaje
const getColor = (percentage: number) => {
  if (percentage <= 30) return "#28a745"; // Verde
  if (percentage <= 70) return "#B2563C"; // Naranja
  return "#dc3545"; // Rojo
};

const getbgcolor = (percentage: number) => {
  if (percentage <= 30) return "rgba(0, 255, 0, 0.2)";
  if (percentage <= 70) return "rgba(255, 255, 0, 0.2)";
  return "rgba(255, 0, 0, 0.2)";
};

const getMessage = (percentage: number) => {
  if (percentage <= 30)
    return "Felicidades, tu nivel de estrés académico es bajo";
  if (percentage <= 70)
    return "Cuidado, tu nivel de estrés académico es un poco alto";
  return "Tienes alto estrés académico, te aconsejamos seguir nuestras recomendaciones";
};

export const StressLevel: React.FC<StressLevelProps> = ({ percentage }) => {
  // Aplicar el estilo dinámico
  const roundedPercentage = Math.round(percentage * 100);
  const circleStyle: React.CSSProperties = {
    backgroundColor: getbgcolor(roundedPercentage),
    color: getColor(roundedPercentage),
    width: "225px",
    height: "225px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3.25rem",
    fontWeight: "bold",
    marginInline: "auto",
    marginTop: "40px",
    border: "5px solid",
    borderColor: getColor(roundedPercentage),
  };

  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl">Nivel de Estrés Académico</h1>
      <div style={circleStyle}>{roundedPercentage}%</div>
      <p className="text-lg text-coilterracota font-semibold mt-4 mx-auto w-11/12">{getMessage(roundedPercentage)}</p>
    </div>
  );
};

export default StressLevel;
