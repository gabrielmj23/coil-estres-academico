import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Form, useActionData, Link } from "react-router";
import type { Route } from "./+types/RegisterPage";
import { actualizarUsuario, obtenerUsuarioPorId } from "~/api/controllers/usuarios";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowLeft from "~/icons/ArrowLeft";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuración de Perfil" },
    { name: "description", content: "Página para actualizar configuración de usuario." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const correo = formData.get("correo") as string;
  const nombre = formData.get("nombre") as string | undefined;
  const contraseña = formData.get("contraseña") as string | undefined;
  const fechaNacimiento = formData.get("fechaNacimiento") as string | undefined;
  const sexo = formData.get("sexo") as string | undefined;  

  const usuarioData = { nombre, correo, contraseña, fechaNacimiento, sexo };  
  console.log(usuarioData)

  try {
    const respuesta = await actualizarUsuario(usuarioData);
    return { success: true, message: "Actualizacion exitosa", data: respuesta };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export default function ProfileConfigurationPage() {
  const actionData = useActionData<{ success: boolean; message: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [usuarioOriginal, setUsuarioOriginal] = useState<any>(null);

  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  const [errorNombre, setErrorNombre] = useState<string>("");
  const [errorCorreo, setErrorCorreo] = useState<string>("");
  const [errorContraseña, setErrorContraseña] = useState<string>("");
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState<string>("");
  const [errorSexo, setErrorSexo] = useState<string>("");

  const [cookies] = useCookies(["token", "idUsuario"]); // Declara las cookies que quieres leer
  const idUsuario = cookies.idUsuario;

  if (idUsuario) {
    console.log("ID del usuario obtenido de las cookies:", idUsuario, cookies);    
  } else {
    console.error("No se encontró el ID del usuario en las cookies.", cookies.token);
  }

/*
  // Cargar datos del usuario
  useEffect(() => {
    const idUsuario = cookies.idUsuario;
    if (!idUsuario) {
      console.error("No se encontró un ID de usuario en las cookies.");
      setLoading(false);
      return;
    }

    // Llamar a la API para obtener los datos del usuario
    obtenerUsuarioPorId(idUsuario)
      .then((data) => {
        setUsuarioOriginal(data.data.usuario); // Guardar los datos originales
        setNombre(data.data.usuario.nombre || ""); // Inicializar campos
        setCorreo(data.data.usuario.correo || "");
        setFechaNacimiento(data.data.usuario.fechaNacimiento || "");
        setSexo(data.data.usuario.sexo || "");
        setLoading(false); // Datos cargados
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
        setLoading(false); // Finalizar carga incluso si hay errores
      });
  }, [cookies]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
*/

  // Validation functions
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
    return passwordRegex.test(password);
  };

  const onChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    if (e.target.value === "") {
      setErrorNombre("El nombre es obligatorio");
    } else {
      setErrorNombre("");
    }
  };

  const onChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(e.target.value);
    if (isValidEmail(e.target.value) || e.target.value === "") {
      setErrorCorreo("");
    } else {
      setErrorCorreo("El correo electrónico no tiene un formato válido");
    }
  };

  const onChangeContraseña = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setContraseña(newPassword);
    if (newPassword === "") {
      setErrorContraseña(""); // Limpiar el error si el campo está vacío
    } else if (isValidPassword(newPassword)) {
      setErrorContraseña(""); // Limpiar el error si la contraseña es válida
    } else {
      setErrorContraseña(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
    }
  };

  const onChangeFechaNacimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaNacimiento(e.target.value);
    if (e.target.value === "") {
      setErrorFechaNacimiento("La fecha de nacimiento es obligatoria");
    } else {
      setErrorFechaNacimiento("");
    }
  };

  const onChangeSexo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSexo(e.target.value);
    if (e.target.value === "") {
      setErrorSexo("El sexo es obligatorio");
    } else {
      setErrorSexo("");
    }
  };

  const getSexoIconSrc = (sexo: string) => {
    switch (sexo) {
      case "":
        return "/check-icon.svg"
      case "M":
        return "/male-icon.svg";
      case "F":
        return "/female-icon.svg";
      case "Otro":
        return "/other-icon.svg";
      default:
        return "";
    }
  };

  return (
    <div className="h-[100dvh]">
      <header className="primary rounded-b-[32px] mb-12"></header>
      <Link
        to="/"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
        viewTransition
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-[3.125rem] mt-5">
        <h1 className="text-3xl text-center">Configuración de Usuario</h1>
        <Form method="post" className="space-y-6">
          <Field
            label="Nombre"
            name= "nombre"
            placeholder={cookies.idUsuario}
            type="text"
            value={nombre}
            onChange={onChangeNombre}
            error=""
            iconSrc="/user-icon.svg"
          />
          <Field
            label="Correo Electrónico"
            name = "correo"
            placeholder={usuarioOriginal?.correo || "example@ucab.com"}
            type="email"
            value={correo}
            onChange={onChangeCorreo}
            error={errorCorreo}
            iconSrc="/email-icon.svg"
          />
          <Field
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            name = "contraseña"
            type="password"
            value={contraseña}
            onChange={onChangeContraseña}
            error={errorContraseña}
            iconSrc="/lock-icon.svg"
          />
          <Field
            label="Fecha de Nacimiento"
            placeholder={usuarioOriginal?.fechaNacimiento || "Ingrese su fecha de nacimiento"}
            name="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={onChangeFechaNacimiento}
            error={errorFechaNacimiento}
            iconSrc="/calendar-icon.svg"
          />
          <Field
            label="Sexo"
            placeholder="Seleccione su sexo"
            name="sexo"
            type="select"
            value={sexo}
            onChangeSelect={onChangeSexo}
            error={errorSexo}
            iconSrc={getSexoIconSrc(sexo)}
            options={[
              { value: "", label: "Selecciona sexo" },
              { value: "M", label: "Masculino" },
              { value: "F", label: "Femenino" },
              { value: "Otro", label: "Otro" },
            ]}
          />
          <div>
          </div>
          <PrimaryButton
              type="submit"
              label="Actualizar"
              disabled={false}
            />
        </Form>
        {actionData && (
          <p className="text-center">
            {actionData.success ? actionData.message : `Error: ${actionData.message}`}
          </p>
        )}
         <p className="login-text text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to= "/iniciar-sesion"
              className="login-link"
              viewTransition
            >
              Inicia Sesión
            </Link>
          </p>
        <div>
        </div>
      </main>
    </div>
  );
}