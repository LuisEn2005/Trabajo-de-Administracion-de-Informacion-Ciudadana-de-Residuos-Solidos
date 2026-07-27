# IS1 — Sistema de Gestión de Residuos Sólidos

Proyecto académico de **Ingeniería del Software 1** orientado a apoyar la organización de rutas, vehículos, horarios, puntos de recolección, contenedores y recursos relacionados con la recolección de residuos sólidos.

La aplicación está construida como un monorepo con frontend React y backend NestJS. El backend expone una API REST y organiza su lógica con una arquitectura modular orientada al dominio.

## Descarga y ejecución local

### Requisitos

- Node.js 20.19 o superior.
- npm.
- PostgreSQL disponible localmente o una base PostgreSQL remota.
- Git.

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd gestion_residuos_solidos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Backend:

```bash
copy apps\backend\.env.example apps\backend\.env
```

Frontend:

```bash
copy apps\frontend\.env.example apps\frontend\.env
```

En `apps/backend/.env` configura, como mínimo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/residuos_solidos?schema=public"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
JWT_SECRET="cambiar-este-secreto"
JWT_EXPIRES_IN=3600
```

En `apps/frontend/.env` configura:

```env
VITE_API_URL="http://localhost:3000/api"
```

### 4. Preparar Prisma y base de datos

Desde la raíz del proyecto:

```bash
npm run prisma:generate
```

Para aplicar las migraciones en la base de datos:

```bash
cd apps/backend
npx prisma migrate dev
cd ../..
```

### 5. Iniciar el proyecto

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

También se puede iniciar ambos workspaces con:

```bash
npm run dev
```

URLs principales:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api`
- API v1: `http://localhost:3000/api/v1`

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Lenguaje principal | TypeScript |
| Frontend | React, Vite, React Router |
| Estilos | Tailwind CSS |
| Iconografía | Lucide React |
| Backend | NestJS |
| API | REST |
| ORM | Prisma |
| Base de datos | PostgreSQL |
| Autenticación | JWT para sesión administrativa |
| Calidad | ESLint, Prettier, SonarQube/SonarLint como apoyo de revisión |
| Organización | npm workspaces |

## Funcionalidad actual

El sistema cuenta con una página de inicio pública y un portal interno con módulos separados.

### Página de inicio

La ruta `/` presenta información general del proyecto:

- Objetivo académico del sistema.
- Gestión de rutas de recolección.
- Programación del servicio.
- Puntos de recolección y contenedores.
- Tecnologías utilizadas.
- Descripción de la arquitectura frontend, API REST y backend con DDD.
- Equipo de desarrollo.
- Botón principal para ingresar a la aplicación.

### Portal de aplicación

La ruta `/dashboard` funciona como inicio de la aplicación. Para usuarios invitados muestra información pública y accesos de consulta. Las opciones administrativas se protegen para usuarios autenticados.

Módulos disponibles en frontend:

- Inicio público del sistema.
- Rutas.
- Horarios.
- Puntos de recolección.
- Flota.
- Contenedores.
- Asignaciones.
- Administradores.
- Autenticación administrativa.

## Arquitectura del proyecto

El proyecto sigue una arquitectura modular. La rúbrica del curso solicita separación por capas; por eso el backend se estructura alrededor de las capas indicadas por el docente: **presentación, interfaz, dominio y repositorio**.

![Arquitectura en capas](docs/img/Arquitectura%20en%20Capas.png)

### Visión general

```text
Frontend React
   │
   │ consume API REST
   ▼
Backend NestJS
   │
   │ usa Prisma Client
   ▼
PostgreSQL
```

### Backend

El backend usa NestJS y separa cada módulo por responsabilidad de negocio.

```text
apps/backend/src/
├── modules/
│   ├── auth/
│   ├── gestion-rutas/
│   ├── puntos-recoleccion/
│   ├── contenedores/
│   ├── asignaciones/
│   ├── programacion-publica/
│   └── health/
└── shared/
    ├── domain/
    ├── presentacion/
    └── repositorio/
```

Estructura principal de un módulo orientado al dominio:

```text
src/modules/<modulo>/
├── presentacion/   # Controladores HTTP, filtros o elementos cercanos a NestJS
├── interfaz/       # Servicios de aplicación y DTO de entrada/salida
├── dominio/        # Entidades y reglas propias del dominio
└── repositorio/    # Contratos e implementaciones de persistencia con Prisma
```

Responsabilidades:

- **Presentación:** recibe solicitudes HTTP, define rutas y traduce la comunicación con el exterior.
- **Interfaz:** coordina los casos de uso y conecta controladores con contratos del módulo.
- **Dominio:** concentra entidades y conceptos del negocio sin depender de Prisma ni de HTTP.
- **Repositorio:** define contratos de persistencia e implementaciones concretas con Prisma.
- **Shared:** contiene elementos transversales como `PrismaService`, filtros globales y manejo centralizado de errores de persistencia.

### Frontend

El frontend usa una arquitectura modular por funcionalidad. No replica DDD completo, porque su responsabilidad principal es la presentación y la interacción del usuario. Aun así, mantiene separación interna para evitar componentes grandes y lógica mezclada.

```text
apps/frontend/src/
├── modules/
│   ├── inicio/
│   ├── dashboard/
│   ├── rutas/
│   ├── horarios/
│   ├── puntos-recoleccion/
│   ├── flota/
│   ├── contenedores/
│   ├── asignaciones/
│   └── auth/
└── shared/
    └── services/
```

Criterios aplicados en frontend:

- Páginas por módulo.
- Componentes reutilizables para tablas, menú lateral, tarjetas y formularios.
- Servicios API separados de la vista.
- Tipos TypeScript por dominio de pantalla.
- Uso de React Router para navegación sin recarga completa.
- Protección visual de opciones administrativas según sesión.

## Módulos del backend

| Módulo | Responsabilidad |
|---|---|
| `auth` | Inicio de sesión administrativa, perfil autenticado y validación JWT. |
| `gestion-rutas` | CRUD de rutas, vehículos, horarios y puntos asociados a rutas. |
| `puntos-recoleccion` | Gestión de puntos de recolección para consulta y administración. |
| `contenedores` | Registro, estado, traslado y resumen de contenedores. |
| `asignaciones` | Asignaciones operativas entre rutas, vehículos y horarios. |
| `programacion-publica` | Consulta pública de programación, rutas, horarios, vehículos y puntos. |
| `health` | Endpoints técnicos de bienvenida y comprobación de estado. |

## Endpoints principales

Todos los endpoints del backend parten del prefijo global:

```text
/api
```

Algunos endpoints disponibles:

```text
GET  /api
GET  /api/health
POST /api/v1/auth/login
GET  /api/v1/auth/perfil

GET  /api/v1/rutas
POST /api/v1/rutas
GET  /api/v1/rutas/:id
PATCH /api/v1/rutas/:id
DELETE /api/v1/rutas/:id

GET  /api/v1/vehiculos
POST /api/v1/vehiculos
GET  /api/v1/horarios-ruta
GET  /api/v1/puntos-recoleccion
GET  /api/v1/contenedores
GET  /api/v1/asignaciones
GET  /api/v1/programacion/hoy
```

## Calidad de código

El proyecto busca mantener código legible y mantenible. Las prácticas aplicadas incluyen:

- **Nombres claros:** métodos como `buscarTodos`, `buscarPorId`, `actualizar`, `eliminar`, `mapearRuta` y servicios API descriptivos.
- **Funciones pequeñas:** los métodos de repositorio realizan una operación concreta y delegan el mapeo o el manejo de errores cuando corresponde.
- **Separación de responsabilidades:** controladores, servicios, entidades y repositorios se ubican en capas distintas.
- **Objetos y estructuras de datos tipadas:** DTO, entidades de dominio y tipos TypeScript en frontend.
- **Tratamiento de errores:** filtros globales en presentación y función compartida `manejarErrorPrisma()` para errores de persistencia.
- **Clases enfocadas:** repositorios Prisma para persistencia, servicios para casos de uso y controladores para HTTP.
- **Validación de entrada:** `ValidationPipe` global con `whitelist`, `transform` y `forbidNonWhitelisted`.
- **Consistencia de estilo:** ESLint y Prettier configurados en los workspaces.

Principios considerados:

- Clean Code: legibilidad, nombres expresivos y funciones con una sola responsabilidad.
- SOLID: inversión de dependencias mediante contratos de repositorio y separación entre dominio y persistencia.
- Arquitectura por capas: presentación, interfaz, dominio y repositorio.
- Modularidad: cada módulo agrupa su propio lenguaje, operaciones y archivos relacionados.

## Scripts útiles

Desde la raíz:

```bash
npm run dev
npm run dev:backend
npm run dev:frontend
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run format
```

> Nota: `npm run build` existe, pero debe ejecutarse solo cuando el equipo lo requiera para validación de entrega.

## Documentación y evidencias

- Evidencias por integrante: [`docs/evidencias`](docs/evidencias)
- Diagramas UML: [`docs/uml`](docs/uml)
- Modelo editable de arquitectura: [`docs/uml/Arquitectura en Capas.mdj`](docs/uml/Arquitectura%20en%20Capas.mdj)
- Diagrama de arquitectura en capas: [`docs/uml/Arquitectura en Capas.png`](docs/uml/Arquitectura%20en%20Capas.png)
- Modelo de dominio: [`docs/uml/Modelo de Dominio Recursos y residuos solidos.png`](docs/uml/Modelo%20de%20Dominio%20Recursos%20y%20residuos%20solidos.png)

## Equipo de desarrollo

- Juan Carlos Postigo Cabana
- Luis Enrique Ramos Chambi
- Daysi Jara Arisaca
- Ronald Reynaldo Valdez Agüero
- Fernando Llosa Manchego

## Estado actual

El proyecto ya cuenta con estructura full stack, API REST, módulos principales del Sprint 1 y Sprint 2, migración Prisma inicial actualizada, página de inicio pública y vistas frontend conectadas a la API en los módulos principales. Algunas funcionalidades pueden seguir evolucionando según el alcance de los siguientes sprints.
