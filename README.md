# COIL - Cuerpos y Mentes en Equilibrio

Página web para cuestionarios que miden el estrés académico e indicadores asociados

## Cómo configurar la base de datos

1. Crea en un gestor de base de datos Postgres una base de datos con el nombre `estresBD`.

2. Crea un archivo `.env` en la raíz del proyecto con la variable de entorno `DATABASE_URL` que contenga la URL de conexión a la base de datos.También agrega la variable de entorno `JWT_SECRET_KEY` que contenga tu clave secreta. Puedes guiarte de `.env.example`. Por ejemplo:

```bash
DATABASE_URL="postgres://usuario:contraseña@localhost:5432/estresBD"
JWT_SECRET_KEY=brawlstars
```

3. Crea el esquema de la base de datos ejecutando `npx drizzle-kit push`

4. Ejecuta el script para rellenar la base de datos:

```bash
npm run init-db
```

## Cómo empezar con el desarrollo

Asegúrate de tener la versión más reciente de [Node.js](https://nodejs.org/) instalada.

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:3000`.

## Estructura de archivos

- `public/` - Archivos estáticos (imágenes, íconos, etc).
- `app` - Código de la aplicación
  - `app/routes.ts` - Definición de las rutas (URLs) de la aplicación. [Más información aquí](https://reactrouter.com/start/framework/routing)
  - `app/routes/` - Directorio donde se crearán las páginas.
  - `app/components/` - Componentes reutilizables. Cada componente debe tener una carpeta con su nombre, que contiene al menos los archivos:
    - `<componente>.tsx` - Archivo principal del componente
    - `<componente>.stories.tsx` - Historias/Documentación del componente. Guiarse del ejemplo en `app/components/Example`
  - `app/api/` - Directorio donde se crearán funciones del backend.

## Estilos

El proyecto cuenta con integración de [Tailwind CSS](https://tailwindcss.com/). Se han configurado colores para la paleta de colores del proyecto, puedes verlos en `tailwind.config.ts`.

Se puede usar CSS puro sin problemas. Se agregaron variables para colores en `app/app.css`.
