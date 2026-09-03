# IS1 — Sistema de Gestión de Residuos Sólidos

Proyecto académico del curso **Ingeniería de Software I** desarrollado por el equipo **Soft-Coding**. La aplicación permite administrar y consultar información relacionada con rutas de recolección, horarios, vehículos, puntos de recolección, contenedores, asignaciones operativas y sesiones administrativas.

El sistema fue construido como una aplicación full stack con **frontend React**, **backend NestJS**, **API REST**, **Prisma ORM** y **PostgreSQL**. La base de datos, el backend y el frontend se encuentran desplegados para la presentación final del proyecto.

## Enlaces principales

| Recurso | Enlace |
|---|---|
| Aplicación frontend | [Frontend desplegado](https://trabajo-de-administracion-de-inform-indol.vercel.app) |
| API backend | [Backend desplegado](https://trabajo-de-administracion-de-inform.vercel.app/api) |
| Repositorio GitHub | [LuisEn2005/Trabajo-de-Administracion-de-Informacion-Ciudadana-de-Residuos-Solidos](https://github.com/LuisEn2005/Trabajo-de-Administracion-de-Informacion-Ciudadana-de-Residuos-Solidos) |
| Prototipo Figma | [Ingeniera de Software 1](https://www.figma.com/make/mVc79zZteYAO2kx9eTFHZ6/Ingeniera-de-Software-1?t=gXiMPGeJ7tMv4aP2-1) |
| Tablero Trello | [Proyecto de software ambiental y ciudadano](https://trello.com/b/Ai9kHnGv/proyecto-de-software-ambiental-y-ciudadano) |

Endpoints técnicos de verificación:

- Health backend: `/health`
- Health base de datos: `/health/db`

## Objetivo del proyecto

El objetivo del proyecto es ofrecer una base web para organizar información operativa relacionada con la gestión de residuos sólidos. La solución separa la consulta pública de la administración interna, permitiendo que un usuario invitado visualice información general y que un usuario administrador acceda a operaciones protegidas.

## Funcionalidades implementadas

### Vista pública

- Landing page informativa del proyecto.
- Consulta pública de rutas.
- Consulta pública de horarios.
- Consulta pública de puntos de recolección.
- Inicio del portal con accesos a información pública.

### Vista administrativa

- Inicio de sesión administrativo.
- Manejo de sesión mediante JWT.
- Protección visual de opciones administrativas en el frontend.
- Gestión de rutas.
- Gestión de horarios.
- Gestión de flota vehicular.
- Gestión de puntos de recolección.
- Gestión de contenedores.
- Gestión de asignaciones operativas.
- Consulta de perfil administrativo.

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
| Autenticación | JWT |
| Calidad | ESLint, Prettier, SonarQube/SonarLint |
| Organización | npm workspaces |
| Despliegue | Vercel |

## Arquitectura del software

El proyecto aplica una arquitectura modular con separación por capas. La rúbrica del curso solicita evidenciar estilos o patrones de arquitectura; por ello, el backend se organizó alrededor de las capas **presentación**, **interfaz**, **dominio** y **repositorio**.

![Arquitectura en capas](docs/img/Arquitectura%20en%20Capas.png)

### Flujo general

```text
Frontend React
  -> consume API REST
Backend NestJS
  -> usa Prisma ORM
PostgreSQL
```

### Backend

El backend se encuentra en `apps/backend` y agrupa sus responsabilidades por módulos de negocio:

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

Estructura principal de los módulos orientados al dominio:

```text
src/modules/<modulo>/
├── presentacion/   # Controladores HTTP
├── interfaz/       # Servicios de aplicación y DTO
├── dominio/        # Entidades y conceptos del negocio
└── repositorio/    # Contratos e implementaciones Prisma
```

Responsabilidad de cada capa:

- **Presentación:** expone endpoints HTTP y recibe solicitudes externas.
- **Interfaz:** coordina casos de uso mediante servicios y DTO.
- **Dominio:** representa entidades y conceptos propios del negocio.
- **Repositorio:** define contratos e implementa persistencia con Prisma.
- **Shared:** agrupa recursos transversales como Prisma, filtros y errores comunes.

### Frontend

El frontend se encuentra en `apps/frontend`. Como parte del sistema completo, representa principalmente la capa de presentación. Internamente se organizó por módulos para mantener orden, bajo acoplamiento y claridad.

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

Criterios aplicados:

- Páginas separadas por módulo.
- Componentes reutilizables.
- Servicios API separados de las vistas.
- Tipos TypeScript por módulo.
- Navegación con React Router.
- Opciones administrativas condicionadas por sesión.

## Módulos principales del backend

| Módulo | Responsabilidad |
|---|---|
| `auth` | Login administrativo, JWT y perfil autenticado. |
| `gestion-rutas` | CRUD de rutas, vehículos y horarios. |
| `puntos-recoleccion` | Gestión de puntos geográficos de recolección. |
| `contenedores` | Registro, estado, traslado y resumen de contenedores. |
| `asignaciones` | Relación operativa entre ruta, vehículo y horario. |
| `programacion-publica` | Consultas públicas integradas. |
| `health` | Verificación del servicio y conexión a base de datos. |

## Endpoints principales

Todos los endpoints del backend parten del prefijo global `/api`.

```text
GET    /api
GET    /api/health
GET    /api/health/db

POST   /api/v1/auth/login
GET    /api/v1/auth/perfil

GET    /api/v1/rutas
POST   /api/v1/rutas
GET    /api/v1/rutas/:id
PATCH  /api/v1/rutas/:id
DELETE /api/v1/rutas/:id

GET    /api/v1/vehiculos
POST   /api/v1/vehiculos
GET    /api/v1/horarios-ruta
GET    /api/v1/puntos-recoleccion
GET    /api/v1/contenedores
GET    /api/v1/asignaciones
GET    /api/v1/programacion/hoy
```

## Calidad de Código

### 1. Estilos de programación

El proyecto evidencia más de tres estilos de programación:

- **RESTful:** uso de endpoints HTTP organizados por recurso.
- **Persistent Tables:** persistencia con tablas PostgreSQL administradas mediante Prisma.
- **Error/Exception Handling:** filtros globales y manejo controlado de errores de persistencia.
- **Things / Objetos:** entidades, DTO, servicios, controladores y repositorios.
- **Pipeline:** transformación de registros de persistencia hacia estructuras usadas por la aplicación.

### 2. Prácticas de codificación limpia — Clean Code

Se aplicaron prácticas de codificación limpia en backend y frontend:

- **Nombres claros:** métodos como `buscarTodos`, `buscarPorId`, `actualizar`, `eliminar` y `mapearRuta`.
- **Funciones pequeñas:** métodos enfocados en una operación concreta.
- **Comentarios útiles:** prioridad a código autoexplicativo y ausencia de comentarios redundantes.
- **Estructura de código fuente:** separación por módulos y capas.
- **Objetos tipados:** DTO, entidades, tipos TypeScript e interfaces.
- **Tratamiento de errores:** errores de dominio, filtros globales y manejo de errores Prisma.
- **Clases enfocadas:** controladores, servicios y repositorios con responsabilidades diferenciadas.

### 3. Principios SOLID

El proyecto evidencia principalmente:

- **SRP:** cada clase cumple una responsabilidad principal.
- **OCP:** los servicios dependen de contratos y pueden cambiar implementaciones sin alterar la lógica principal.
- **LSP:** las implementaciones Prisma respetan los contratos de repositorio.
- **ISP:** los contratos contienen operaciones relacionadas al módulo correspondiente.
- **DIP:** NestJS inyecta dependencias mediante providers y tokens.

### 4. Domain-Driven Design — DDD

El backend aplica una organización modular orientada al dominio:

- Entidades en `dominio/entities`.
- Servicios de aplicación en `interfaz/services`.
- DTO en `interfaz/dto`.
- Contratos e implementaciones de persistencia en `repositorio`.
- Módulos NestJS que agrupan dependencias por contexto funcional.

### 5. Estilos o patrones de arquitectura

La arquitectura corresponde a una solución por capas con separación entre:

- **Presentación:** frontend y controladores HTTP.
- **Aplicación / Interfaz:** servicios y DTO.
- **Dominio:** entidades y conceptos del negocio.
- **Repositorio:** contratos e implementaciones Prisma.

Esta separación permite explicar el flujo completo: usuario -> frontend -> API REST -> servicio de aplicación -> repositorio -> base de datos.

## Ejecución local

### Requisitos

- Node.js 20.19 o superior.
- npm.
- PostgreSQL local o remoto.
- Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/LuisEn2005/Trabajo-de-Administracion-de-Informacion-Ciudadana-de-Residuos-Solidos
cd gestion_residuos_solidos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Backend:

```powershell
Copy-Item apps/backend/.env.example apps/backend/.env
```

Frontend:

```powershell
Copy-Item apps/frontend/.env.example apps/frontend/.env
```

Ejemplo para `apps/backend/.env`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/residuos_solidos?schema=public"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
JWT_SECRET="cambiar-este-secreto"
JWT_EXPIRES_IN=3600
```

Ejemplo para `apps/frontend/.env`:

```env
VITE_API_URL="http://localhost:3000/api"
```

### 4. Preparar Prisma

```bash
npm run prisma:generate
```

Aplicar migraciones:

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

También se pueden iniciar ambos workspaces con:

```bash
npm run dev
```

URLs locales:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api`
- API v1: `http://localhost:3000/api/v1`

## Scripts útiles

```bash
npm run dev
npm run dev:backend
npm run dev:frontend
npm run prisma:validate
npm run prisma:generate
npm run lint
npm run format
```

## Documentación y evidencias

- Evidencias por integrante: [`docs/evidencias`](docs/evidencias)
- Diagramas UML: [`docs/uml`](docs/uml)
- Imagen de arquitectura: [`docs/img/Arquitectura en Capas.png`](docs/img/Arquitectura%20en%20Capas.png)
- Modelo editable de arquitectura: [`docs/uml/Arquitectura en Capas.mdj`](docs/uml/Arquitectura%20en%20Capas.mdj)
- Modelo de dominio: [`docs/uml/Modelo de Dominio Recursos y residuos solidos.png`](docs/uml/Modelo%20de%20Dominio%20Recursos%20y%20residuos%20solidos.png)

## Equipo de desarrollo

- Juan Carlos Postigo Cabana
- Luis Enrique Ramos Chambi
- Daysi Jara Arisaca
- Ronald Reynaldo Valdez Agüero
- Fernando Llosa Manchego

## Estado final

El proyecto cuenta con una estructura full stack funcional, API REST, base de datos PostgreSQL en producción, frontend y backend desplegados en Vercel, vistas frontend conectadas a la API y documentación de evidencias por integrante.

## Mejoras futuras

- Mejorar la experiencia visual del portal administrativo.
- Ampliar validaciones de formularios en frontend.
- Incorporar pruebas automatizadas para servicios críticos.
- Agregar reportes gráficos sobre rutas, contenedores y asignaciones.
- Refinar permisos por rol para distintos tipos de usuarios administrativos.
actualizacion de practica Git
