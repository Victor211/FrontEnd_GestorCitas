# Desarrollo local

Guía para levantar y trabajar en el frontend de Appointment Manager en tu máquina.

## Requisitos

- **Node.js** y **npm**.
- El **backend** (`Backend_GestorCitas`) disponible y accesible desde tu máquina.

Validado con:

```
node --version   # v22.19.0
npm --version    # 10.9.3
```

Estas son las versiones con las que se probó esta guía, no un requisito estricto — el
proyecto no declara un rango de versiones en `package.json` (`engines`), así que cualquier
Node/npm razonablemente reciente debería funcionar.

## Instalación

```bash
npm install
```

## Configuración

El frontend lee su configuración desde variables de entorno `VITE_*` (ver
[`docs/environment.md`](environment.md) para el detalle completo de cada una). Vite carga
estos archivos automáticamente según el modo, combinándolos con esta precedencia (de menor a
mayor prioridad):

```
.env  →  .env.local  →  .env.[modo]  →  .env.[modo].local
```

En `npm run dev` el modo es `development`, así que el orden real es:

```
.env  →  .env.local  →  .env.development  →  .env.development.local
```

- **`.env.development`** — configuración pública de desarrollo, versionada en el repo.
  Ya trae valores funcionales por defecto.
- **`.env.local`** / **`.env.development.local`** — para sobrescribir algo solo en tu
  máquina (por ejemplo, un puerto distinto porque el `5173` ya está ocupado, o un
  `VITE_API_BASE_URL` apuntando a un backend en otra IP). Estos archivos están ignorados por
  Git — nunca se commitean.

Ejemplo de override local (`.env.local`):

```
VITE_API_BASE_URL=http://localhost:8080
VITE_DEV_PORT=5173
```

Si no creás ningún archivo local, `.env.development` ya alcanza para levantar todo.

## Ejecutar

```bash
npm run dev
```

## URLs locales

- Frontend: `http://localhost:5173` (o el puerto que hayas configurado en `VITE_DEV_PORT`).
- Backend: `http://localhost:8080` (o el valor real de `VITE_API_BASE_URL`).
- Swagger del backend: `http://localhost:8080/swagger-ui/index.html`.

## Validaciones

Antes de subir un cambio, correr:

```bash
npm run build
npm run lint
npm run typecheck
```

`npm run build` ya incluye una verificación de tipos (`tsc -b`) antes de generar el bundle;
`npm run typecheck` es la misma verificación de forma aislada, útil para correrla rápido sin
esperar el build completo de Vite.

## Build local

```bash
npm run build
```

Genera los archivos estáticos de producción en `dist/`. Este comando usa el modo
`production` por defecto, por lo que toma los valores de `.env.production` (ver
[`docs/deployment.md`](deployment.md) antes de generar un build real para desplegar).

## Preview

```bash
npm run preview
```

Sirve el contenido de `dist/` localmente para verificar que el build generado funciona
antes de desplegarlo. Sirve **únicamente** para probar el build en tu máquina — no
reemplaza un servidor web real en producción (ver `docs/deployment.md`).
