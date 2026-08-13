# MiniBlog API

API REST desarrollada en Node.js + Express, conectada a PostgreSQL, para gestionar autores (authors), publicaciones (posts) y comentarios (comments) de MiniBlog — proyecto para DevSpark.

## Descripción del proyecto

Permite operaciones CRUD completas sobre authors y posts, con una entidad adicional de comments (extra credit) asociada a posts y authors. Incluye validaciones, manejo centralizado de errores, tests automatizados y documentación OpenAPI.

## Requisitos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm

## Instalación y ejecución local

1. Clonar el repositorio: git clone https://github.com/matiasdeluca77-maker/miniblog-api.git y entrar con cd miniblog-api
2. Instalar dependencias: npm install
3. Crear la base de datos en PostgreSQL y correr los scripts db/setup.sql y db/seed.sql (con psql o pgAdmin)
4. Crear un archivo .env en la raíz (usar .env.example como base) con las credenciales reales de PostgreSQL
5. Levantar el servidor: npm start — queda disponible en http://localhost:3000

## Documentación de la API (OpenAPI / Swagger)

Con el servidor corriendo, accedé a http://localhost:3000/docs (o a la URL de producción + /docs).

## Tests automatizados

Correr: npx jest

Cubre operaciones CRUD y casos de error (400, 404) para authors y posts.

## Endpoints principales

- GET/POST /authors, GET/PUT/DELETE /authors/:id
- GET/POST /posts, GET/PUT/DELETE /posts/:id
- GET /posts/author/:authorId
- GET/POST /posts/:id/comments (extra credit)

## Deployment (Railway)

La API está desplegada en Railway y disponible públicamente en: https://miniblog-api-production-7e94.up.railway.app

Documentación interactiva: https://miniblog-api-production-7e94.up.railway.app/docs

Variables de entorno configuradas en Railway: DATABASE_URL (referenciada automáticamente desde el servicio PostgreSQL del mismo proyecto).

## Uso de IA en el desarrollo

Este proyecto fue desarrollado con la asistencia de Claude (Anthropic) como guía paso a paso durante todo el proceso: desde la instalación del entorno (Node.js, PostgreSQL, Git, VS Code) hasta la implementación del backend, debugging de errores de configuración específicos de Windows, diseño de tests automatizados, documentación OpenAPI y deployment en Railway. Cada archivo de código fue escrito, pegado y verificado manualmente por el desarrollador, quien ejecutó y probó cada paso de forma guiada.