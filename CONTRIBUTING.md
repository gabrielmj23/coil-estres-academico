# Contribuir al Proyecto

## Desarrollo

- Para cada tarea/funcionalidad específica, se creará una rama dedicada.
- Una vez el desarrollo de la tarea esté completado, se hace push a esa rama en GitHub y se abre una Pull Request.
- La Pull Request se debe asignar para revisión a alguno de los integrantes en SQA, para hacer las pruebas y revisiones de código.
- El encargado de revisión, una vez aprobado el cambio, hará merge de la rama a `main`.

## Convenciones de código

- Funciones y nombres de variable en camelCase.
    - Priorizar nombres descriptivos, aun si son largos.
    - Preferir nombres en inglés.
- Documentar cada función del backend y hook con [JSDoc](https://lenguajejs.com/typescript/jsdoc/sintaxis-basica/), especificando: propósito de la función, autor y parámetros.

## Gestión de tareas

Se creó un tablero en [ClickUp](https://app.clickup.com/9011778784/v/li/901107671637) donde se encuentran las tareas. Cada quien debe marcar la etapa en la que esté:
- Pendiente: no se ha iniciado.
- En desarrollo: se está codificando.
- Pruebas: está siendo probada por el equipo de SQA.
- Listo: las pruebas han sido aprobadas y se integró a producción.
