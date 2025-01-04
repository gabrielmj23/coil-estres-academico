import React from "react";

const Card = ({ title, description, image, selected }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: selected ? "#fff" : "#F7F7F7", // Fondo blanco si seleccionado, gris claro si no
        border: "2px solid #000",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: selected
          ? "0 4px 8px rgba(0, 0, 0, 0.1)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "0.3s",
        cursor: "pointer",
        maxWidth: "500px",
      }}
    >
      <div style={{ flex: "1", marginRight: "20px" }}>
        <h3 style={{ fontSize: "18px", margin: "0", fontWeight: "bold" }}>
          {title}
        </h3>
        <p style={{ fontSize: "14px", margin: "5px 0", color: "#555" }}>
          {description}
        </p>
      </div>
      <div>
        <img
          src={image}
          alt={title}
          style={{ width: "80px", height: "80px", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
};
export default Card;