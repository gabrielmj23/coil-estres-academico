import type { Route } from "./+types/LoginPage";
import { useState, useEffect } from "react";
import { useActionData, Link, Form, redirect } from "react-router";
import Field from "~/components/Field/Field";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowLeft from "~/icons/ArrowLeft";
import { iniciarSesion } from "~/api/controllers/usuarios";
import ModalAlert from "~/components/ModalAlert/ModalAlert";
import { commitSession, getSession } from "~/sessions.server";
import { isValidEmail, isValidPassword } from "~/utils";

export function meta() {
  return [
    { title: "Iniciar Sesión" },
    { name: "description", content: "Página de inicio de sesión." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to test selection if they are already signed in.
    return redirect("/seleccion-de-prueba");
  }
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
      const session = await getSession(request.headers.get("Cookie"));
      session.set("userId", String(respuesta.idUsuario));
      session.set("userName", respuesta.userName);

      return redirect("/seleccion-de-prueba", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
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
  const actionData = useActionData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //error que aparece en el modal

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
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial de los siguientes (!@#$%^&*,.)."
      );
    }
  };

  // UseEffect to handle login error
  useEffect(() => {
    if (actionData?.message && !actionData?.success) {
      setErrorMessage(actionData.message);
      setIsModalOpen(true);
      // Hide modal after 5 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 4000);
    }
  }, [actionData]);

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
            <Link to="/registrarse" className="login-link" viewTransition>
              Regístrate.
            </Link>
          </p>
          <p className="text-center">
            <Link
              to="/olvide-mi-contraseña"
              className="login-link"
              viewTransition
            >
              Olvidé mi contraseña
            </Link>
          </p>
        </div>
      </main>
      <ModalAlert
        isOpen={isModalOpen}
        message={errorMessage}
        onClose={() => setIsModalOpen(false)}
        type="error"
      />

      {actionData?.success && (
        <div className="text-green-600">{actionData.message}</div>
      )}
    </div>
  );
}
