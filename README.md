# FrontEnd_GestorCitas

## Autenticación del Frontend

El módulo de autenticación integra el frontend con el backend real mediante la instancia
Axios centralizada (`src/api/client/apiClient.ts`).

### Endpoints utilizados

- `POST /api/auth/login` — inicio de sesión con `email` y `password`.
- `POST /api/auth/register` — registro de un usuario `OWNER` junto con su negocio.
- `GET /api/auth/me` — obtiene el usuario autenticado a partir del token actual.

### Almacenamiento del access token

Solo se guarda el `accessToken` (string) en `localStorage`, mediante la abstracción
`tokenStorage` (`src/api/client/tokenStorage.ts`). No se guarda el objeto `AuthResponse`
completo, ni la contraseña, ni ningún otro dato sensible. No se decodifica el JWT en el
frontend: el usuario autenticado siempre se obtiene desde `GET /api/auth/me`.

### Hidratación de sesión

Al cargar la aplicación (`AuthProvider`, `src/features/auth/components/AuthProvider.tsx`):

1. Se lee el `accessToken` desde `tokenStorage`.
2. Si no existe, la sesión queda como no autenticada de inmediato (`isInitializing = false`).
3. Si existe, se ejecuta `GET /api/auth/me`. Mientras esa petición está en curso,
   `isInitializing = true` y las rutas muestran una pantalla de carga (`FullScreenLoader`)
   en lugar de redirigir prematuramente.
4. Si la petición responde con éxito, se guarda el `CurrentUser` en la cache de TanStack
   Query y `authenticated` pasa a `true`.
5. Si responde `401`, el token se elimina y la sesión queda como no autenticada (ver
   siguiente sección).

La sesión solo se considera autenticada cuando existe un token **y** ese token fue
validado exitosamente contra `/api/auth/me`. Tener cualquier string en `localStorage` no
es suficiente.

### Comportamiento ante 401

El interceptor de respuesta de `apiClient` detecta cualquier `401` de un endpoint
protegido (excepto `POST /api/auth/login`, cuyo `401` solo significa credenciales
inválidas y no debe cerrar una sesión existente). Ante un `401` de un endpoint protegido:

1. Se elimina el `accessToken` de `tokenStorage`.
2. Se notifica a un `sessionManager` desacoplado (`src/api/client/sessionManager.ts`), que
   ejecuta un callback registrado por `AuthProvider` para limpiar el estado de React y la
   cache de TanStack Query, evitando así dependencias circulares entre `apiClient` (fuera
   de React) y el contexto de autenticación.

Esto evita loops infinitos y redirecciones repetidas: el cambio de estado hace que
`ProtectedRoute` redirija declarativamente a `/login`.

### Rutas públicas y privadas

| Ruta          | Usuario no autenticado | Usuario autenticado |
|---------------|--------------------------|-----------------------|
| `/`           | Redirige a `/login`      | Accesible (Dashboard) |
| `/services`, `/employees`, `/customers`, `/schedules`, `/appointments`, `/settings` | Redirige a `/login` | Accesible |
| `/login`      | Accesible                 | Redirige a `/`        |
| `/register`   | Accesible                 | Redirige a `/`        |
| cualquier otra ruta | Página 404          | Página 404             |

### Ausencia de refresh token

El MVP del backend no implementa refresh token. El frontend no intenta renovar el
`accessToken`: cuando expira o el backend responde `401`, la sesión se cierra y el
usuario debe iniciar sesión nuevamente.

## Layout y Navegación

Después de iniciar sesión, las rutas privadas se renderizan dentro de `AppLayout`
(`src/layouts/AppLayout.tsx`), que compone `Header`, `Sidebar`/`MobileDrawer` y
`MainContent` (con `Outlet` de React Router). `AppLayout` es hijo de `ProtectedRoute`,
por lo que nunca se renderiza mientras `AuthProvider` está inicializando: reutiliza el
mismo `FullScreenLoader` de autenticación en lugar de un loader propio.

### Sidebar responsive

- **Escritorio (`md` en adelante):** `Sidebar` es un `Drawer` `permanent` que puede
  colapsarse (solo iconos, `72px`) o expandirse (iconos + texto, `260px`) mediante un
  botón dentro del propio sidebar.
- **Móvil/tablet angosto:** el sidebar permanente se oculta y `MobileDrawer` (un `Drawer`
  `temporary`) se abre desde el botón de menú del `Header`. Se cierra automáticamente al
  seleccionar cualquier opción de navegación.

### Header

Incluye el botón de menú (solo visible en móvil), el título de la página actual, el
nombre del negocio y `UserMenu` (avatar con iniciales, datos de sesión y logout).

### Rutas privadas

Definidas como rutas anidadas bajo `ProtectedRoute` + `AppLayout`
(`src/app/router/AppRouter.tsx`): `/` (Dashboard), `/services`, `/employees`,
`/customers`, `/schedules`, `/appointments`, `/settings`. Cualquier ruta no reconocida
muestra una página 404 (`src/routes/NotFoundPage.tsx`).

### Configuración centralizada de navegación

`src/app/router/navigation.ts` define un único arreglo (`id`, `label`, `path`, `icon`,
`breadcrumb`) que reutilizan tanto el `Sidebar`/`MobileDrawer` (vía `NavigationList` /
`NavigationItem`) como el `Header` (título de página) y `Breadcrumbs`, evitando duplicar
la lista de rutas.

### Breadcrumbs

`src/layouts/components/Breadcrumbs.tsx` arma el camino ("Inicio / Servicios", etc.) a
partir de la ruta actual y la configuración de navegación central — no hay breadcrumbs
hardcodeados por página.

### Persistencia del sidebar colapsado

Solo la preferencia de colapsado/expandido de escritorio se persiste en `localStorage`,
mediante una abstracción propia (`src/layouts/sidebarPreference.ts`) independiente de
`tokenStorage`. El estado de apertura del drawer móvil es transitorio y no se persiste.

### Uso de CurrentUser

`Header`, `UserMenu` y `DashboardPage` leen `user` directamente desde `AuthContext`
(`useAuth()`) — no se realiza ninguna llamada adicional a `/api/auth/me` desde el layout.

## Dashboard del Frontend

El Dashboard (`src/features/dashboard/`) obtiene toda su información mediante una única
llamada al backend:

- `GET /api/dashboard` — requiere JWT, igual que el resto de endpoints protegidos.

### Estructura de la respuesta

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "todayAppointments": 0,
    "activeCustomers": 1,
    "activeEmployees": 1,
    "activeServices": 2,
    "upcomingAppointments": [
      {
        "id": 2,
        "customerId": 2,
        "customerName": "Cristian Benitez",
        "employeeId": 1,
        "employeeName": "Juan Gómez",
        "serviceId": 1,
        "serviceName": "Corte Premium",
        "startAt": "2026-08-10T13:00:00Z",
        "endAt": "2026-08-10T14:00:00Z",
        "status": "CONFIRMED"
      }
    ]
  },
  "timestamp": "..."
}
```

Tipado en `src/features/dashboard/types/dashboard.types.ts` (`DashboardResponse`,
`UpcomingAppointment`, `AppointmentStatus`), reutilizando el `ApiResponse<T>` global. La
petición vive en `src/features/dashboard/api/dashboardApi.ts` (`getDashboard()`), que usa
exclusivamente `apiClient` — sin `fetch` ni instancias Axios adicionales.

### Hook `useDashboard`

`src/features/dashboard/hooks/useDashboard.ts` envuelve `getDashboard()` en TanStack Query
bajo la query key centralizada `dashboardKeys.summary`
(`src/features/dashboard/api/dashboardKeys.ts`). No sobrescribe `staleTime`, `retry` ni
`refetchOnWindowFocus`: hereda la configuración global de `src/lib/queryClient.ts`
(`staleTime` de 60 segundos, sin reintentos para `401`/`403`/`404`,
`refetchOnWindowFocus` en `false`), evitando duplicar esa lógica por feature.

### Loading, error y estado vacío

`DashboardPage` consume únicamente `useDashboard()` — no realiza llamadas HTTP directas:

- **Loading:** mientras la query está en su primera carga (`isPending`) se muestra
  `DashboardSkeleton`, con placeholders para las cuatro métricas y para la sección de
  próximas citas, evitando saltos de layout.
- **Error:** si la query falla (`isError`) se muestra `DashboardError`, un `Alert` con el
  mensaje de `getApiErrorMessage` y un botón "Reintentar" que ejecuta `refetch()`. Un `401`
  dispara la estrategia global de sesión (`sessionManager` + `AuthProvider`) sin lógica
  especial dentro del Dashboard.
- **Vacío:** si `upcomingAppointments` llega vacío se muestra un `EmptyState` reutilizable
  (`src/components/common/EmptyState.tsx`) con la acción "Crear cita" hacia `/appointments`.

### Métricas

`MetricsGrid` renderiza cuatro `MetricCard` (citas de hoy, clientes activos, empleados
activos, servicios activos), cada una con ícono de Material UI, valor real del backend y
navegación accesible por teclado (`CardActionArea` + `react-router-dom`) hacia
`/appointments`, `/customers`, `/employees` y `/services` respectivamente.

### Próximas citas

`UpcomingAppointments` muestra `UpcomingAppointmentsTable` en escritorio (`md` en adelante)
y una lista de `UpcomingAppointmentCard` en móvil/tablet, sin duplicar la petición. Las
fechas UTC del backend se convierten con Day.js a la zona horaria del navegador
(`src/features/dashboard/utils/formatDashboardDate.ts`) y los estados de la cita se
traducen mediante una utilidad centralizada
(`src/features/dashboard/utils/appointmentStatus.ts`) que además define el color de cada
`Chip`, evitando condicionales dispersos.

### Acciones rápidas

`QuickActions` navega a `/appointments`, `/customers`, `/services` y `/employees`. En esta
fase no abre formularios ni modales: solo redirige al módulo correspondiente.

### Responsive

Escritorio: cuatro tarjetas de métricas en una fila y tabla para próximas citas. Tablet: dos
tarjetas por fila. Móvil: una tarjeta por fila, próximas citas en cards y acciones rápidas
apiladas verticalmente — sin scroll horizontal global.

### Refresh y cache

El encabezado del Dashboard incluye un botón de actualización que ejecuta `refetch()` y se
deshabilita mientras la petición está en curso. No hay polling automático. Al cerrar sesión,
`AuthProvider` limpia toda la cache de TanStack Query (`queryClient.clear()`), por lo que
`DashboardPage` no implementa ninguna limpieza manual adicional.
