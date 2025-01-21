import React, { useState } from "react";
import { Form, useActionData } from "react-router";

export const SignUpForm: React.FC = () => {
  const actionData = useActionData();
  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  return (
    <div className="signup-form">
      <h1 className="text-3xl text-center">Registro de Usuario</h1>
      <Form method="post" >
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sexo</label>
          <select
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Selecciona sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </Form>
      {actionData && (
        <p>{actionData.success ? actionData.message : `Error: ${actionData.message}`}</p>
      )}
    </div>
  );
};

export default SignUpForm;