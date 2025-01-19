import type { Route } from "./+types/RegisterPage";
import SignUpForm from "~/components/SignUpForm/SignUpForm";
import { registrarUsuario } from "~/api/controllers/usuarios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registrarse" },
    { name: "description", content: "Página para registrarse." },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const nombre = formData.get("nombre") as string;
  const correo = formData.get("correo") as string;
  const contraseña = formData.get("contraseña") as string;
  const fechaNacimiento = formData.get("fechaNacimiento") as string;
  const sexo = formData.get("sexo") as string;

  const usuarioData = { nombre, correo, contraseña, fechaNacimiento, sexo };

  try {
    const respuesta = await registrarUsuario(usuarioData);
    return { success: true, message: "Registro exitoso", data: respuesta };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export default function RegisterPage() {
  return <SignUpForm />;
}
