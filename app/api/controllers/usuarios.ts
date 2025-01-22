import { usuarios } from "../tables/usuarios"; // Asegúrate de importar la tabla de usuarios correctamente
import { data } from "react-router";
import bcrypt from "bcryptjs"; // Necesitamos bcrypt para encriptar la contraseña
import { eq } from "drizzle-orm";
import db from "../db"; // Importamos la instancia de db que has configurado
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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
    console.log("Contraseña: ", contraseña);
    const contraseñaEncriptada = bcrypt.hashSync(contraseña, 10);
    console.log("Encriptada: ", contraseñaEncriptada);

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

export const iniciarSesion = async (loginData: {
  correo: string;
  contraseña: string;
}) => {
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
    const esContraseñaValida = await bcrypt.compare(
      contraseña,
      usuario[0].contraseña
    );

    if (!esContraseñaValida) {
      throw new Error("Correo o Contraseña Incorrecta.");
    }

    // // Crea un token (usando jsonwebtoken)
    const token = jwt.sign(
      { idUsuario: usuario[0].id },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "12h" }
    );

    // Eliminar la contraseña del objeto usuario antes de devolver la respuesta
    const { contraseña: _contraseña, ...usuarioSinContraseña } = usuario[0];

    // Responder con los datos del usuario y el token
    return {
      idUsuario: usuario[0].id,
      usuario: usuarioSinContraseña,
      token: token,
      userName: usuarioSinContraseña.nombre,
    };
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
 * Genera una contraseña aleatoria segura.
 * La contraseña cumple con los siguientes criterios:
 * - Longitud mínima de 12 caracteres.
 * - Al menos una letra mayúscula.
 * - Al menos una letra minúscula.
 * - Al menos un número.
 * - Al menos un carácter especial.
 *
 * @returns Una contraseña generada aleatoriamente que cumple con los requisitos de seguridad.
 * @author Karim
 */
const generarContraseñaAleatoria = (): string => {
  const longitud = 12; // Longitud mínima de la contraseña
  const caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const caracteresMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const caracteresNumeros = "0123456789";
  const caracteresEspeciales = "!@#$%^&*,.";
  const todosCaracteres =
    caracteresMayusculas +
    caracteresMinusculas +
    caracteresNumeros +
    caracteresEspeciales;

  // Garantizar que la contraseña cumpla con los requisitos mínimos
  let contraseña = "";
  contraseña += caracteresMayusculas.charAt(
    Math.floor(Math.random() * caracteresMayusculas.length)
  );
  contraseña += caracteresMinusculas.charAt(
    Math.floor(Math.random() * caracteresMinusculas.length)
  );
  contraseña += caracteresNumeros.charAt(
    Math.floor(Math.random() * caracteresNumeros.length)
  );
  contraseña += caracteresEspeciales.charAt(
    Math.floor(Math.random() * caracteresEspeciales.length)
  );

  // Completar el resto de la contraseña con caracteres aleatorios
  for (let i = contraseña.length; i < longitud; i++) {
    contraseña += todosCaracteres.charAt(
      Math.floor(Math.random() * todosCaracteres.length)
    );
  }

  // Mezclar los caracteres para que no sigan un patrón predecible
  contraseña = contraseña
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return contraseña;
};

/**
 * Genera una nueva contraseña aleatoria para un usuario registrado y la envía por correo.
 * La contraseña se actualiza en la base de datos de forma segura (hasheada).
 *
 * @param correo - Correo electrónico del usuario para enviar la nueva contraseña.
 * @returns Un objeto con un mensaje indicando si la contraseña fue enviada exitosamente,
 *          o un mensaje de error si el correo no está registrado.
 * @throws Error si ocurre un problema al generar o enviar la nueva contraseña.
 * @author Karim
 */
export const generarCodigoRecuperacion = async (correo: string) => {
  try {
    // Verifica si el usuario existe
    const usuario = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, correo)) // Filtrar por correo
      .limit(1)
      .execute();

    if (usuario.length === 0) {
      throw new Error("El correo no está registrado.");
    }

    // Generar una nueva contraseña aleatoria
    const nuevaContraseña = generarContraseñaAleatoria();

    // Hashear la nueva contraseña
    const hashContraseña = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar la contraseña del usuario en la base de datos
    await db
      .update(usuarios)
      .set({ contraseña: hashContraseña })
      .where(eq(usuarios.correo, correo)) // Filtrar por correo
      .execute();

    // Configuración del transportador para Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail", // Utiliza el servicio de Gmail
      auth: {
        user: process.env.EMAIL_USER, // Tu correo de Gmail
        pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación generada
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Dirección del remitente (tu correo de Gmail)
      to: correo, // Dirección del destinatario
      subject: "Tu nueva contraseña de acceso",
      text: `Tu nueva contraseña es: ${nuevaContraseña}`, // Mensaje del correo
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    console.log(`Nueva contraseña enviada a ${correo}: ${nuevaContraseña}`);

    return { message: "La nueva contraseña ha sido enviada al correo." };
  } catch (error: any) {
    console.error("Error al generar la nueva contraseña:", error.message);
    return { message: error.message };
  }
};

/**
 * Actualiza un usuario existente en la base de datos.
 * NOTA: El correo es el identificador único del usuario y NO puede ser actualizado.
 * @param userData Datos del usuario a actualizar
 * @author Jose
 */
export const actualizarUsuario = async (userData: {
  correo: string;
  nombre?: string;
  contraseña?: string;
  fechaNacimiento?: string;
  sexo?: string;
  sessionId: string;
}) => {
  try {
    const { correo, nombre, contraseña, fechaNacimiento, sexo, sessionId } =
      userData;

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

    if (Number(sessionId) !== usuarioExistente[0].id) {
      throw new Error("No tienes permisos para actualizar este usuario.");
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
    const { contraseña: _contraseña, ...usuarioSinContraseña } =
      usuarioActualizado[0];

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
