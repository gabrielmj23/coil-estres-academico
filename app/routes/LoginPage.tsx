import { useState, useEffect } from "react";
import { useActionData, Link, Form } from "react-router";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowLeft from "~/icons/ArrowLeft";
import { iniciarSesion } from "~/api/controllers/usuarios";
import {useCookies} from "react-cookie";

export function meta() {
  return [
    { title: "Iniciar Sesión" },
    { name: "description", content: "Página de inicio de sesión." },
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const correo = formData.get("correo") as string;
  const contraseña = formData.get("contraseña") as string;

  const loginData = { correo, contraseña };

  try {
    const respuesta = await iniciarSesion(loginData);

    // Verificar que la respuesta tenga el campo 'usuario' y 'token'
    if (respuesta.usuario && respuesta.token) {
      return {
        success: true,
        message: "Inicio de sesión exitoso",
        data: { usuario: respuesta.usuario, token: respuesta.token, idUsuario: respuesta.idUsuario },
      };
    } else {
      return {
        success: false,
        message: respuesta.message || "Error desconocido",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Error al intentar iniciar sesión",
    };
  }
}


export default function LoginPage() {
  const [cookies, setCookie] = useCookies(["token", "idUsuario"])
  const actionData = useActionData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isValidEmail(e.target.value) || e.target.value === "") {
      setErrorEmail("");
    } else {
      setErrorEmail("El correo electrónico no tiene un formato válido");
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword === "") {
      setErrorPassword("");
    } else if (isValidPassword(newPassword)) {
      setErrorPassword("");
    } else {
      setErrorPassword(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
    }
  };

  // UseEffect to handle successful login and set cookies
  useEffect(() => {
    if (actionData?.success && actionData?.data) {
      const { token, idUsuario } = actionData.data;
      console.log(actionData.data);
      setCookie("token", token, { path: "/", maxAge: 60 * 60 * 12 }); // Guardamos el token en una cookie
      setCookie("idUsuario", idUsuario, { path: "/", maxAge: 60 * 60 * 12 }); // Guardamos el ID del usuario en una cookie
    }
  }, [actionData, setCookie]);

  return (
    <div className="h-[100dvh]">
      <header className="primary rounded-b-[32px] mb-12"></header>
      <Link
        to="/"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-[3.125rem] mt-5">
        <h1 className="text-3xl text-center">Iniciar Sesión</h1>
        <Form method="post">
          <div className="space-y-6">
            <Field
              label="Correo Electrónico"
              name={"correo"}
              placeholder="example@ucab.com"
              type="text"
              onChange={onChangeEmail}
              value={email}
              iconSrc="/email-icon.svg"
              error={errorEmail}
            />
            <Field
              label="Contraseña"
              name="contraseña"
              placeholder="Ingrese su contraseña.."
              type="password"
              onChange={onChangePassword}
              value={password}
              iconSrc="/lock-icon.svg"
              error={errorPassword}
            />
            <PrimaryButton
              type="submit"
              label="Iniciar Sesión"
              disabled={!isValidEmail(email) || !isValidPassword(password)}
            />
          </div>
        </Form>
        <div>
          <p className="login-text text-center">
            ¿No tienes una cuenta?{" "}
            <a href="/registrarse" className="login-link">
              Regístrate.
            </a>
          </p>
          <p className="text-center">
            <a href="/olvide-mi-contraseña" className="login-link">
              Olvidé mi contraseña
            </a>
          </p>
        </div>
      </main>
      {actionData?.success && (
        <div className="text-green-600">{actionData.message}</div>
      )}
      {actionData?.message && !actionData?.success && (
        <div className="text-red-600">{actionData.message}</div>
      )}
    </div>
  );
}
