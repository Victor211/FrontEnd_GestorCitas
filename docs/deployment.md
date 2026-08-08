# Deploy del Frontend

Guía **conceptual** para desplegar el frontend como archivos estáticos. Este documento no
ejecuta ni configura nada automáticamente — describe el proceso para cuando se decida hacer
el deploy real.

## 1. Configurar producción

Editar [`.env.production`](../.env.production) y reemplazar el placeholder por el dominio
real del backend:

```
VITE_API_BASE_URL=https://api.midominio.com
```

`.env.production` está versionado a propósito porque solo contiene configuración pública
(no secretos) — pero el valor de `VITE_API_BASE_URL` que trae por defecto
(`https://api.example.com`) es un placeholder y **debe** actualizarse antes de generar el
build final.

## 2. Generar build

```bash
npm ci
npm run build
```

Se usa `npm ci` en vez de `npm install` porque el proyecto tiene `package-lock.json`
versionado — `npm ci` instala exactamente las versiones del lockfile, dando un build
reproducible.

Resultado: carpeta `dist/` con archivos estáticos (HTML, JS, CSS) listos para servir.

## 3. Copiar archivos al servidor

El contenido de `dist/` debe copiarse al `DocumentRoot` que sirva Apache (u otro servidor
web). No conocemos todavía la distribución/configuración real del servidor de producción, así
que esto es solo un ejemplo ilustrativo de ruta:

```
/var/www/appointment-manager/   # ejemplo, no una ruta real confirmada
```

## 4. Apache

React Router maneja rutas del lado del cliente (`/appointments`, `/customers`, `/settings`,
etc.). Sin configuración adicional, recargar la página directamente en una de esas rutas
produce un 404 de Apache, porque Apache busca un archivo físico en esa ruta que no existe.
Apache necesita reenviar cualquier ruta que no sea un archivo real hacia `index.html`, para
que React Router la resuelva en el navegador.

Configuración conceptual del `VirtualHost`/directorio:

```apache
<Directory /var/www/appointment-manager>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

`.htaccess` conceptual (requiere `mod_rewrite` habilitado):

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Ninguna de estas configuraciones se aplicó al servidor real en esta tarea — quedan
documentadas para cuando se haga el deploy.

## 5. HTTPS

Producción debe servirse por HTTPS. La configuración de certificados (por ejemplo, Certbot/
Let's Encrypt) es responsabilidad de la infraestructura del servidor, no del frontend — no se
configura desde este repositorio.

## 6. CORS

El backend debe permitir el dominio real del frontend en su configuración de CORS
(`CORS_ALLOWED_ORIGINS` o equivalente en el backend), por ejemplo:

```
https://app.midominio.com
```

Esto se configura del lado del **backend**, no en este repositorio — no se modifica backend
en esta tarea.

## 7. Verificación post deploy

Checklist manual después de desplegar:

- Abrir `/` y confirmar que carga.
- Iniciar sesión (login).
- Recargar `/appointments` directamente (no navegando desde el menú) y confirmar que **no**
  da 404 — valida que el fallback a `index.html` del paso 4 quedó bien configurado.
- Dashboard.
- Services.
- Employees.
- Customers.
- Schedules.
- Appointments (incluyendo la vista Calendario).
- Settings (General e Integraciones).
- Logout.
- Consola del navegador sin errores.
- Pestaña Network: confirmar que las llamadas van al dominio de `VITE_API_BASE_URL`
  configurado, no a `localhost`.
