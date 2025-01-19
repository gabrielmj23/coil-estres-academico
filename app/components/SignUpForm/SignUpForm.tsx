import React, { useState } from "react";
import { registrarUsuario } from "~/api/controllers/usuarios"; // Asegúrate de importar correctamente la función de registro

interface SignUpFormProps {
  onSuccess?: () => void; // Callback opcional después de un registro exitoso
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioData = { nombre, correo, contraseña, fechaNacimiento, sexo };

    try {
      //const respuesta = await registrarUsuario(usuarioData);
      setMensaje("Registro exitoso");
     // console.log(respuesta); // Aquí puedes manejar lo que pasa después del registro (como redirigir al login)
      if (onSuccess) {
        onSuccess(); // Llamar a la función onSuccess si está definida
      }
    } catch (error) {
      setMensaje((error as Error).message);
    }
  };

  return (
    <div className="signup-form">
      <h1 className="text-3xl text-center">Registro de Usuario</h1>
      <form onSubmit={manejarRegistro} className="form-container">
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sexo</label>
          <select
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
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default SignUpForm;
