import { usuarios } from "../tables/usuarios"; // Asegúrate de importar la tabla de usuarios correctamente
import { data } from "react-router";
import bcrypt from "bcryptjs"; // Necesitamos bcrypt para encriptar la contraseña
import { eq } from "drizzle-orm";
import db from "../db"; // Importamos la instancia de db que has configurado

/**
 * Registra un nuevo usuario en la base de datos
 * @param userData Datos del usuario a registrar
 * @author Roberth
 */
export const registrarUsuario = async (userData: {
  nombre: string;
  correo: string;
  contraseña: string;
  fechaNacimiento: string; // O puedes usar Date si prefieres ese tipo
  sexo: string;
}) => {
  try {
    const { nombre, correo, contraseña, fechaNacimiento, sexo } = userData;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, correo)) // Filtrar por correo
      .limit(1)
      .execute();

    if (usuarioExistente.length > 0) {
      throw new Error("El correo ya está registrado.");
    }

    // Encriptar la contraseña
    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    // Insertar el nuevo usuario
    const nuevoUsuario = await db
      .insert(usuarios)
      .values({
        nombre,
        correo,
        contraseña: contraseñaEncriptada,
        fechaNacimiento: fechaNacimiento,
        sexo,
      })
      .returning()
      .execute();

    // Devolver el usuario sin la contraseña
    const { contraseña: _contraseña, ...usuarioSinContraseña } =
      nuevoUsuario[0];

    // Responder con el usuario creado
    return data({ usuario: usuarioSinContraseña }, { status: 201 });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw data({ message: "Error al registrar usuario." }, { status: 500 });
  }
};
