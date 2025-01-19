
import React, { useState } from "react";
import "./Field.css"; // Archivo CSS para estilos

function Field() {
  return (
    <div className="form-container">
      <label htmlFor="email" className="form-label">
        Correo Electrónico
      </label>
      <div className="input-wrapper">
        <span className="icon">📧</span>
        <input
          type="email"
          id="email"
          className="email-input"
          placeholder="gabo@gmail.com"
        />
      </div>
    </div>
  );
}
export default Field;