# Variables de entorno

Todas las variables que el frontend puede leer empiezan con `VITE_` — es un requisito de
Vite: cualquier variable sin ese prefijo **no** queda embebida en el bundle y el código del
navegador no puede acceder a ella. Por la misma razón, **ninguna variable `VITE_*` puede ser
secreta**: todo lo que empieza con `VITE_` termina visible en el código JavaScript que se le
sirve a cualquier visitante del sitio.

La única fuente de acceso a estas variables dentro del código es
[`src/lib/env.ts`](../src/lib/env.ts) (tipado en
[`src/vite-env.d.ts`](../src/vite-env.d.ts)) — ningún otro archivo de `src/` debería leer
`import.meta.env` directamente.

## Variables disponibles

| Variable | Propósito | Ejemplo desarrollo | Ejemplo producción | ¿Es secreta? |
|---|---|---|---|---|
| `VITE_APP_NAME` | Nombre visible de la app (uso interno/futuro). | `Appointment Manager` | `Appointment Manager` | NO |
| `VITE_APP_VERSION` | Versión mostrada con fines informativos (uso interno/futuro). | `1.0.0` | `1.0.0` | NO |
| `VITE_API_BASE_URL` | URL base del backend real. **Obligatoria** — el frontend no arranca sin ella. | `http://localhost:8080` | `https://api.midominio.com` | NO |
| `VITE_DEV_PORT` | Puerto del servidor de desarrollo de Vite (`npm run dev`). No aplica al build de producción. | `5173` | *(no aplica)* | NO |
| `VITE_DEFAULT_TIMEZONE` | Zona horaria de fallback **solo visual/configurativo** (ver limitación abajo). | `America/Asuncion` | `America/Asuncion` | NO |
| `VITE_ENABLE_DEBUG` | Habilita logs de depuración controlados. | `true` | `false` | NO |

Todas están marcadas **Secreta: NO** — es una regla, no una casualidad: si algún día hiciera
falta un valor sensible del lado del cliente, la respuesta correcta es replantear el diseño
(por ejemplo, moviendo esa lógica al backend), nunca ponerlo en una variable `VITE_*`.

### Sobre `VITE_DEFAULT_TIMEZONE`

Esta variable es únicamente un valor de fallback visual/configurativo. **No** reemplaza ni
modifica:

- `timeZone: "local"` en la configuración de FullCalendar (Agenda).
- Las conversiones UTC ↔ local ya existentes en Appointments
  (`src/features/appointments/utils/dateConversion.ts`,
  `calendarDateRange.ts`).
- La lógica de `LocalTime` de Schedules.

La lógica de negocio de fechas/horas sigue exactamente igual que antes de esta tarea.

## Variables que nunca pertenecen al frontend

Estas variables existen (o podrían existir) del lado del **backend** y jamás deben
aparecer en este repositorio, en un archivo `.env` versionado, ni mucho menos en una
variable `VITE_*`:

- `OPENAI_API_KEY`
- `JWT_SECRET`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_APP_SECRET`
- `WHATSAPP_VERIFY_TOKEN`
- `DATABASE_PASSWORD` / `DATABASE_URL`

**Por qué:** cualquier variable expuesta al navegador (todo lo que empieza con `VITE_`) es
pública por diseño — queda embebida en el JavaScript que se descarga en el navegador de
cualquier usuario, visible con solo abrir las herramientas de desarrollador. Los secretos de
integración (Meta/WhatsApp, OpenAI) y de infraestructura (JWT, base de datos) deben vivir
exclusivamente en el entorno del servidor backend, nunca en el frontend. Ya se verificó
(Fases 10 y 11A) que el frontend no solicita, muestra ni almacena ninguno de estos valores.

## Archivos de entorno y su rol

| Archivo | Versionado en Git | Contenido |
|---|---|---|
| `.env.example` | Sí | Plantilla de referencia con valores de ejemplo. |
| `.env.development` | Sí | Configuración pública usada en `npm run dev`. |
| `.env.production` | Sí | Configuración pública usada en `npm run build` (con placeholder de URL, ver `docs/deployment.md`). |
| `.env` / `.env.local` | No (ignorado) | Overrides específicos de tu máquina. |
| `.env.[modo].local` | No (ignorado) | Override local para un modo específico (máxima prioridad). |

Precedencia de Vite (de menor a mayor prioridad):
`.env` → `.env.local` → `.env.[modo]` → `.env.[modo].local`.
