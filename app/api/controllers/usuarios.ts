import { usuarios } from "../tables/usuarios"; // Asegúrate de importar la tabla de usuarios correctamente
import { data } from "react-router";
import bcrypt from "bcryptjs"; // Necesitamos bcrypt para encriptar la contraseña
import { eq } from "drizzle-orm";
import db from "../db"; // Importamos la instancia de db que has configurado
import jwt from 'jsonwebtoken';
import "dotenv/config";

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


/**
 * Inicia sesión con un usuario registrado
 * @param loginData Datos del usuario para iniciar sesión
 * @author Karim
 */

export const iniciarSesion = async (loginData: { correo: string; contraseña: string }) => {
  try {
    const { correo, contraseña } = loginData;

    // Buscar el usuario por correo
    const usuario = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, correo)) // Filtrar por correo
      .limit(1)
      .execute();

    if (usuario.length === 0) {
      throw new Error("Correo o Contraseña Incorrecta.");
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const esContraseñaValida = await bcrypt.compare(contraseña, usuario[0].contraseña);

    if (!esContraseñaValida) {
      throw new Error("Correo o Contraseña Incorrecta.");
    }

    // // Crea un token (usando jsonwebtoken)
    const token = jwt.sign({ idUsuario: usuario[0].id }, process.env.JWT_SECRET_KEY!, { expiresIn: '12h' });

    // Eliminar la contraseña del objeto usuario antes de devolver la respuesta
    const { contraseña: _contraseña, ...usuarioSinContraseña } = usuario[0];

    // Responder con los datos del usuario y el token
    return {  idUsuario: usuario[0].id, usuario: usuarioSinContraseña,token:token,};
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al iniciar sesión:", error.message);
      return { message: error.message || "Error al iniciar sesión." };
    }
    console.error("Error inesperado:", error);
    return { message: "Error inesperado al iniciar sesión." };
  }
};

/**
 * Actualiza un usuario existente en la base de datos.
 * NOTA: El correo es el identificador único del usuario y NO puede ser actualizado.
 * @param userData Datos del usuario a actualizar
 * @author Jose
 */
export const actualizarUsuario = async (
  userData: {
    correo: string; // Identificador único del usuario
    nombre?: string;
    contraseña?: string;
    fechaNacimiento?: string; // O puedes usar Date si prefieres ese tipo
    sexo?: string;
  }
) => {
  try {
    const { correo, nombre, contraseña, fechaNacimiento, sexo } = userData;

    // Buscar el usuario por correo (identificador único)
    const usuarioExistente = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, correo)) // Filtrar por correo
      .limit(1)
      .execute();

    if (usuarioExistente.length === 0) {
      throw new Error("El usuario no existe.");
    }

    const updates: Record<string, any> = {};

    // Validar y preparar los campos a actualizar
    if (nombre) {
      updates.nombre = nombre;
    }

    if (contraseña) {
      // Encriptar la nueva contraseña
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    if (fechaNacimiento) {
      updates.fechaNacimiento = fechaNacimiento;
    }

    if (sexo) {
      updates.sexo = sexo;
    }

    // Actualizar los datos en la base de datos
    const usuarioActualizado = await db
      .update(usuarios)
      .set(updates)
      .where(eq(usuarios.correo, correo)) // Filtrar por correo
      .returning()
      .execute();

    if (usuarioActualizado.length === 0) {
      throw new Error("No se pudo actualizar el usuario.");
    }

    // Eliminar la contraseña del objeto antes de devolverlo
    const { contraseña: _contraseña, ...usuarioSinContraseña } = usuarioActualizado[0];

    // Responder con el usuario actualizado
    return data({ usuario: usuarioSinContraseña }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw data({ message: "Error al actualizar usuario." }, { status: 500 });
  }
};

/**
 * Obtiene un usuario por su ID
 * @param idUsuario ID del usuario a buscar
 * @author Jose
 */
export const obtenerUsuarioPorId = async (idUsuario: number) => {
  try {
    // Buscar el usuario por ID
    const usuario = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.id, idUsuario)) // Filtrar por ID
      .limit(1)
      .execute();

    if (usuario.length === 0) {
      throw new Error("El usuario no existe.");
    }

    // Eliminar la contraseña del objeto antes de devolverlo
    const { contraseña: _contraseña, ...usuarioSinContraseña } = usuario[0];

    // Responder con el usuario encontrado
    return data({ usuario: usuarioSinContraseña }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw data({ message: "Error al obtener usuario." }, { status: 500 });
  }
};