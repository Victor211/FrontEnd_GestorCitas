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

## Módulo Services

CRUD completo de servicios (`src/features/services/`) sobre los endpoints reales:

- `GET /api/services` — listado paginado, soporta `name`, `page` y `size`.
- `GET /api/services/{id}` — detalle (expuesto vía `useService`, no usado por la página de
  listado porque la fila ya trae el objeto completo).
- `POST /api/services` — creación.
- `PUT /api/services/{id}` — edición.
- `DELETE /api/services/{id}` — eliminación lógica (soft delete).

Todas las llamadas usan `apiClient` (`src/features/services/api/servicesApi.ts`), sin
`fetch` ni instancias Axios adicionales.

### Tipos

`src/features/services/types/service.types.ts` define `Service`, `CreateServiceRequest`,
`UpdateServiceRequest` (alias de `CreateServiceRequest`, mismo contrato) y
`ServicesListParams`. La forma paginada del backend se tipa con `PageResponse<T>`
(`src/api/types/page-response.types.ts`), agregada a nivel global junto a `ApiResponse<T>`
para que otros módulos paginados (Employees, Customers, etc.) la reutilicen sin duplicarla.

### Query keys y hooks

`servicesKeys` (`src/features/services/api/servicesKeys.ts`) centraliza las keys: `all`,
`lists()`, `list(filters)`, `details()`, `detail(id)`. Hooks en
`src/features/services/hooks/`:

- `useServices(filters)` — listado con `placeholderData: keepPreviousData` para mantener
  la página anterior visible (sin parpadeos) mientras se resuelve la siguiente.
- `useService(id)` — detalle individual.
- `useCreateService()`, `useUpdateService()`, `useDeleteService()` — mutaciones que, al
  tener éxito, invalidan `servicesKeys.lists()` (y `servicesKeys.detail(id)` en el update) y
  además `dashboardKeys.summary`, para que las métricas `activeServices` del Dashboard
  queden al día sin recargar la página.

### Búsqueda y paginación

`ServicesPage` mantiene el texto tipeado (`searchInput`) separado del valor efectivo que
viaja en la query (`search`), aplicando un debounce de 400 ms antes de actualizar `search` y
reiniciar `page` a `0`. La paginación usa exclusivamente los datos reales del `Page` del
backend (`content`, `totalElements`, `number`, `size`) a través de `TablePagination` de
Material UI, con tamaños de página `5 / 10 / 20` — no hay paginación manual en el frontend.

### Formulario y validaciones

`ServiceForm` (`src/features/services/components/ServiceForm.tsx`) es el único formulario,
reutilizado tanto para crear como para editar (`ServiceDialog` decide el modo según si
recibe un `Service` o `null`, y lo remonta con `key` para resetear sus valores). Usa React
Hook Form + Zod (`src/features/services/schemas/service.schema.ts`):

- `name`: obligatorio, 2–100 caracteres.
- `description`: opcional, máximo 500 caracteres.
- `durationMinutes`: obligatorio, entero, mayor a 0, máximo 480.
- `price`: obligatorio, mayor a 0.
- `color`: obligatorio, formato `#RRGGBB` (regex compartida `HEX_COLOR_REGEX`).

El color se edita con un `TextField` de texto (validado por el mismo regex) sincronizado con
un `<input type="color">` nativo que actúa como selector y preview, sin agregar ninguna
librería de color picker.

### Formato de precio y duración

`src/features/services/utils/formatters.ts` centraliza `formatServicePrice` (con
`Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG" })`, sin símbolo `$`
hardcodeado) y `formatServiceDuration` (`"60 min"`). Ambos se reutilizan en la tabla y en las
cards, evitando duplicar el formato.

### Feedback compartido

Se agregaron componentes genéricos en `src/components/feedback/` para reutilizar en
Services y en futuros módulos: `ConfirmDialog` (usado por `DeleteServiceDialog`, con mensaje
explícito del servicio a eliminar), `SuccessSnackbar`, `ErrorAlert` y `LoadingTable`. El
`EmptyState` común (`src/components/common/EmptyState.tsx`, ya creado en la Fase 4) se
reutiliza diferenciando "no hay servicios registrados" (acción "Crear primer servicio") de
"no se encontraron servicios" cuando la búsqueda no da resultados (acción "Limpiar
búsqueda").

### Errores de negocio

Los mensajes de error (409 nombre duplicado, 400 datos inválidos, 404 no encontrado, 500)
se muestran tal como los devuelve el backend vía `getApiErrorMessage`, tanto en el diálogo
de crear/editar (`FormErrorAlert`) como en el de eliminar (`ConfirmDialog`). El diálogo
correspondiente no se cierra si la operación falla.

### Responsive

Escritorio/tablet: `ServicesTable` (Material UI `Table`). Móvil (`xs`, por debajo de `md`):
cards compactas (`ServiceCard`) con indicador de color, nombre, descripción, duración,
precio y acciones. `ServiceDialog` pasa a `fullScreen` por debajo del breakpoint `sm`.

### Cache

Al cerrar sesión, `queryClient.clear()` (ver sección de Dashboard) también limpia la cache
de Services — no hay limpieza manual adicional en el módulo.

## Módulo Employees

CRUD completo de empleados (`src/features/employees/`), reutilizando explícitamente los
patrones ya establecidos por Services (API tipada, query keys, hooks con TanStack Query,
formulario con React Hook Form + Zod, `ServiceDialog`/`ConfirmDialog`/`SuccessSnackbar`/
`EmptyState`/`LoadingTable`, paginación y búsqueda con debounce). Endpoints reales:

- `GET /api/employees` — listado paginado, soporta `name`, `page` y `size`.
- `GET /api/employees/{id}` — detalle (expuesto vía `useEmployee`, no usado por el listado).
- `POST /api/employees` — creación.
- `PUT /api/employees/{id}` — edición (reemplaza por completo los `serviceIds` asignados).
- `DELETE /api/employees/{id}` — eliminación lógica (soft delete).

Todas las llamadas usan `apiClient` (`src/features/employees/api/employeesApi.ts`), sin
`fetch` ni instancias Axios adicionales.

### Tipos

`src/features/employees/types/employee.types.ts` define `Employee`,
`EmployeeServiceSummary` (`id`, `name`, `durationMinutes`, `price`, `color`),
`CreateEmployeeRequest`, `UpdateEmployeeRequest` (alias de `CreateEmployeeRequest`) y
`EmployeeFilters`. Reutiliza `PageResponse<T>` global (`src/api/types/page-response.types.ts`,
creado en la Fase 5) sin duplicarlo.

### Query keys y hooks

`employeesKeys` (`src/features/employees/api/employeesKeys.ts`) sigue la misma estructura
que `servicesKeys`: `all`, `lists()`, `list(filters)`, `details()`, `detail(id)`. Hooks en
`src/features/employees/hooks/`:

- `useEmployees(filters)` — listado con `placeholderData: keepPreviousData`.
- `useEmployee(id)` — detalle individual.
- `useCreateEmployee()`, `useUpdateEmployee()`, `useDeleteEmployee()` — invalidan
  `employeesKeys.lists()` (y `employeesKeys.detail(id)` en el update) y `dashboardKeys.summary`,
  sin invalidar el `QueryClient` completo.

### Relación con Services

El selector de servicios del formulario (`EmployeeServicesSelect`) reutiliza directamente
`useServices` (hook), `servicesApi`/`servicesKeys` (indirectamente vía el hook) y el tipo
`Service` del módulo Services — no existe un segundo acceso a `/api/services`. Consulta
`{ page: 0, size: 100 }` sin `name` (sin paginación propia dentro del selector, según lo
definido para esta fase) y filtra a `service.active` antes de mostrar las opciones, para no
permitir seleccionar servicios eliminados lógicamente. El precio se muestra con
`formatServicePrice` y la duración con `formatServiceDuration`, ambos reutilizados de
`src/features/services/utils/formatters.ts` sin duplicar el formatter.

### Selector múltiple de servicios

`EmployeeServicesSelect` usa `Autocomplete` `multiple` de Material UI. Cada opción muestra
un indicador de color, el nombre, la duración y el precio formateado. El valor se guarda en
el formulario como `serviceIds: number[]` (nunca los objetos completos). Mientras
`useServices` carga, el Autocomplete queda deshabilitado y muestra un `CircularProgress` en
el input; si la carga falla, se reemplaza por `ErrorAlert` con botón "Reintentar" y el
formulario no puede enviarse porque el esquema Zod exige al menos un servicio seleccionado.
Al editar, `EmployeeForm` se remonta con `key` según el empleado, precargando sus
`serviceIds` actuales a partir de `employee.services`.

### Formulario y validaciones

`EmployeeForm` (`src/features/employees/components/EmployeeForm.tsx`) es el único
formulario, reutilizado para crear y editar. Esquema Zod
(`src/features/employees/schemas/employee.schema.ts`):

- `firstName` / `lastName`: obligatorios, 2–100 caracteres.
- `phone`: **opcional**, máximo 30 caracteres, sin regex rígida de formato.
- `email`: **opcional**; si tiene contenido, debe tener formato de email válido; máximo 150
  caracteres.
- `color`: obligatorio, formato `#RRGGBB` (reutiliza `HEX_COLOR_REGEX` exportado desde el
  esquema de Services, sin duplicar la expresión regular).
- `serviceIds`: al menos un servicio, sin IDs repetidos.

El color se edita igual que en Services: un `TextField` de texto sincronizado con un
`<input type="color">` nativo como selector/preview.

### Teléfono y email opcionales

`phone` y `email` son opcionales tanto en `Employee` como en `CreateEmployeeRequest` /
`UpdateEmployeeRequest` (tipados como `string | null`). El formulario no marca estos campos
como requeridos (sin asterisco, con texto auxiliar "Opcional") y el schema Zod solo valida
el formato de `email` cuando el campo tiene contenido — un campo vacío es válido en ambos
casos.

Antes de enviar `POST`/`PUT`, `normalizeEmployeePayload`
(`src/features/employees/schemas/employee.schema.ts`) centraliza el `trim()` y la
conversión de cadenas vacías (o solo espacios) a `null`, para no duplicar esa lógica entre
crear y editar. Al editar, `toEmployeeFormValues` convierte un `phone`/`email` `null` del
backend a `""` para los `defaultValues` del formulario, evitando pasar `null` a un input
controlado. En el listado (`EmployeesTable`/`EmployeeCard`), un `phone`/`email` `null` se
muestra como "Sin teléfono" / "Sin correo" en lugar de un valor vacío o `null` crudo.

### Avatar e iniciales

`EmployeesTable` y `EmployeeCard` muestran un `Avatar` con el color del empleado y sus
iniciales, calculadas con la utilidad reutilizable `getEmployeeInitials`
(`src/features/employees/utils/initials.ts`) — el color nunca es el único indicador, el
nombre completo siempre se muestra junto al avatar.

### Servicios asignados en el listado

`EmployeeServicesChips` muestra hasta 2 servicios como `Chip` en la tabla de escritorio (3
en las cards móviles) y agrupa el resto en un `Chip "+N"` con `Tooltip` con los nombres
restantes, para no renderizar listas largas dentro de la fila.

### Errores de negocio

409 (teléfono duplicado), 400 (datos inválidos), 404 (empleado no encontrado o servicios
inexistentes/inactivos al asignar) y 500 se muestran con el mensaje real del backend vía
`getApiErrorMessage`, sin cerrar el diálogo correspondiente.

### Responsive

Escritorio/tablet: `EmployeesTable`. Móvil (`xs`, por debajo de `md`): `EmployeeCard` con
avatar, teléfono, email, servicios asignados y acciones. `EmployeeDialog` pasa a
`fullScreen` por debajo del breakpoint `sm`, igual que `ServiceDialog`.

### Integración con Dashboard y cache

Crear, editar y eliminar un empleado invalidan `dashboardKeys.summary`, por lo que
`activeEmployees` se actualiza sin recargar la página. Al cerrar sesión,
`queryClient.clear()` limpia también la cache de Employees — no hay limpieza manual
adicional en el módulo.
