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

export const StressLevel: React.FC<StressLevelProps> = ({ percentage }) => {
  // Aplicar el estilo dinámico
  const circleStyle: React.CSSProperties = {
    backgroundColor: getbgcolor(percentage),
    color: getColor(percentage),
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
    borderColor: getColor(percentage),
  };

  const roundedPercentage = Math.round(percentage * 100)

  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl">Nivel de Estrés Académico</h1>
      <div style={circleStyle}>{roundedPercentage}%</div>
    </div>
  );
};

export default StressLevel;
