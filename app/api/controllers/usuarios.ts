import { usuarios } from "../tables/usuarios"; // Asegúrate de importar la tabla de usuarios correctamente
import { data } from "react-router";
import bcrypt from "bcryptjs"; // Necesitamos bcrypt para encriptar la contraseña
import { eq } from "drizzle-orm";
import db from "../db"; // Importamos la instancia de db que has configurado
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
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

const codigosRecuperacion: { [correo: string]: { codigo: string; expiracion: Date } } = {};

export const generarCodigoRecuperacion = async (correo: string) => {
  try {
    // Verifica si el usuario existe
    const usuario = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.correo, correo))
      .limit(1)
      .execute();

    if (usuario.length === 0) {
      throw new Error("El correo no está registrado.");
    }

    // Generar un código de 4 dígitos
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();

    // Guardar en la variable global con un tiempo de expiración de 15 minutos
    codigosRecuperacion[correo] = {
      codigo,
      expiracion: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
    };

    // Configuración del transportador para Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Utiliza el servicio de Gmail
      auth: {
        user: process.env.EMAIL_USER, // Tu correo de Gmail
        pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación generada
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Dirección del remitente (tu correo de Gmail)
      to: correo, // Dirección del destinatario
      subject: "Código de verificación para cambiar tu contraseña",
      text: `Tu código de verificación es: ${codigo}`, // Mensaje del correo
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    console.log(`Código enviado a ${correo}: ${codigo}`);

    return { message: "Código de recuperación enviado." };
  } catch (error: any) {
    console.error("Error al generar el código de recuperación:", error.message);
    return { message: error.message };
  }
};

/**
 * Verifica el codigo ingresado para ese correo en la variable global codigosRecuperacion
 * @param correo del usuario que quiere actualizar su correo
 * @param codigoIngresado codigo generado que el usuario obtuvo del correo
 * @author Karim
 */

// Verificar el código
export const verificarCodigo = (correo: string, codigoIngresado: string) => {
  try {
    console.log(correo, 'correo');
    console.log(codigoIngresado, 'codigoIngresado')
    console.log(codigosRecuperacion);
    const datosCodigo = codigosRecuperacion[correo];

    if (!datosCodigo) {
      throw new Error("No se encontró un código para este correo.");
    }

    if (datosCodigo.expiracion < new Date()) {
      throw new Error("El código ha expirado.");
    }

    if (datosCodigo.codigo !== codigoIngresado) {
      throw new Error("El código ingresado es incorrecto.");
    }

    // Si el código es válido, eliminarlo
    delete codigosRecuperacion[correo];

    return { message: "Código verificado correctamente." };
  } catch (error: any) {
    console.error("Error al verificar el código:", error.message);
    return { message: error.message };
  }
};

/**
 * Actualiza la nueva contraseña al usuario
 * @param correo del usuario que quiere actualizar su correo
 * @param nuevaContraseña  nueva contraseña que ingresó el usuario 
 * @author Karim
 */

export const actualizarContraseña = async (correo: string, nuevaContraseña: string) => {
  try {
    // Verifica si ya no existe un código asociado al correo
    if (codigosRecuperacion[correo]) {
      throw new Error("Debe verificar el código antes de actualizar la contraseña.");
    }

    // Hashear la nueva contraseña
    const hashContraseña = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar la contraseña en la base de datos
    await db
      .update(usuarios)
      .set({ contraseña: hashContraseña })
      .where(eq(usuarios.correo, correo))
      .execute();

    return { message: "Contraseña actualizada correctamente." };
  } catch (error: any) {
    console.error("Error al actualizar la contraseña:", error.message);
    return { message: error.message };
  }
};
