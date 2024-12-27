# COIL - Cuerpos y Mentes en Equilibrio

Página web para cuestionarios que miden el estrés académico e indicadores asociados

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

3. Abre tu navegador en `http://localhost:5173`.

## Estructura de archivos

- `public/` - Archivos estáticos (imágenes, íconos, etc).
- `app` - Código de la aplicación
    - `app/routes.ts` - Definición de las rutas (URLs) de la aplicación. [Más información aquí](https://reactrouter.com/start/framework/routing)
    - `app/routes/` - Directorio donde se crearán las páginas.
    - `app/components/` - Componentes reutilizables.
    - `app/api/` - Directorio donde se crearán funciones del backend.

## Estilos

El proyecto cuenta con integración de [Tailwind CSS](https://tailwindcss.com/). Se puede usar CSS puro sin problemas.
