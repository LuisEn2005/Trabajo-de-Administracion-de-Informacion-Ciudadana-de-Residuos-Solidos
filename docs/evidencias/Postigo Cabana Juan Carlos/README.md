# Evidencias - Juan Carlos Postigo

Este documento resume mi avance individual en los sprints 1 y 2 del proyecto.
La evidencia se apoya en los archivos de detalle [`SPRINT_1.md`](./SPRINT_1.md) y [`SPRINT_2.md`](./SPRINT_2.md).

## Resumen general del avance

| Sprint | Módulo | Responsabilidad | Archivo de detalle |
|---|---|---|---|
| Sprint 1 | Gestión de rutas | CRUD completo de rutas en backend | [`SPRINT_1.md`](./SPRINT_1.md) |
| Sprint 2 | Autenticación administrativa | Login administrativo, JWT, perfil y protección global | [`SPRINT_2.md`](./SPRINT_2.md) |

## Participación solicitada por el docente

| Criterio | Sprint 1 | Sprint 2 |
|---|---|---|
| Número de commits de código fuente | 4 commits principales. Ver historial de commits de Sprint 1. | 1 commit principal. Ver historial de commits de Sprint 2. |
| Número de historias de usuario bajo responsabilidad | 1 historia: CRUD completo de rutas | 1 historia: autenticación administrativa con JWT |
| Checklist para completar historias de usuario | Ver checklist de Sprint 1 | Ver checklist de Sprint 2 |

## Sprint 1 - Gestión de rutas

### Historia de usuario

| Campo | Contenido |
|---|---|
| Código / ID de historia | HU-S1-RUTAS |
| Nombre de historia | CRUD completo de rutas |
| Sprint | Sprint 1 |
| Módulo | Gestión de rutas |
| Responsable | Juan Carlos Postigo |
| Descripción | Como administrador, quiero crear, listar, consultar, actualizar y eliminar rutas, para mantener organizada la programación de recolección. |
| Rama usada | Integrado en `develop`; la rama feature original ya no aparece como referencia local/remota verificable. |
| Commits relacionados | `3f976ec`, `4c66e19`, `3fe8aef`, `2f228b3` |
| Pull request | Pendiente de colocar enlace si existe |
| Estado | Completado a nivel de backend |

### Historial de commits de Sprint 1

| Hash | Rama verificada | Mensaje | Aporte |
|---|---|---|---|
| `3f976ec` | `develop` | `feat(shared): manejar errores y renombrar repositorio` | Centralicé el manejo de errores de Prisma en `shared/repositorio/prisma`, permitiendo reutilizar el tratamiento de persistencia desde rutas y otros módulos. |
| `4c66e19` | `develop` | `feat(rutas): CRUD completo de rutas` | Implementé las operaciones principales del CRUD de rutas en `PrismaRutaRepository`: crear, listar, buscar por id, actualizar, eliminar y mapear al dominio. |
| `3fe8aef` | `develop` | `chore(gestion-rutas): actualizar encabezados de repositorios` | Ajusté encabezados de repositorios del módulo para mantener consistencia en la estructura del código. |
| `2f228b3` | `develop` | `chore(prisma): agregar migracion inicial de rutas` | Agregué la migración inicial necesaria para persistir rutas en la base de datos con Prisma. |

> Observación: los commits anteriores también aparecen contenidos en `main` y en
> ramas posteriores porque ya fueron integrados. Para la evidencia del sprint se
> toma `develop` como rama de integración del flujo indicado por el docente.

### Archivos principales

| Elemento | Ruta |
|---|---|
| Repositorio Prisma | [`PrismaRutaRepository`](../../../apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts) |
| Contrato del repositorio | [`RutaRepository`](../../../apps/backend/src/modules/gestion-rutas/repositorio/ruta.repository.ts) |
| Entidad de dominio | [`Ruta`](../../../apps/backend/src/modules/gestion-rutas/dominio/entities/ruta.entity.ts) |
| Servicio / casos de uso | [`RutasService`](../../../apps/backend/src/modules/gestion-rutas/interfaz/services/rutas.service.ts) |
| Controlador REST | [`RutasController`](../../../apps/backend/src/modules/gestion-rutas/presentacion/controllers/rutas.controller.ts) |
| Manejo de errores Prisma | [`manejarErrorPrisma`](../../../apps/backend/src/shared/repositorio/prisma/manejar-error-prisma.ts) |

### Operaciones implementadas

| Operación | Evidencia |
|---|---|
| `crear()` | Registra una ruta usando `this.prisma.ruta.create()` y retorna una entidad `Ruta`. |
| `buscarTodos()` | Lista rutas con `findMany()` y ordenamiento por `numero`. |
| `buscarPorId()` | Consulta por `id` y retorna `Ruta` o `null` para que la capa superior decida el 404. |
| `actualizar()` | Actualiza parcialmente los campos permitidos mediante Prisma. |
| `eliminar()` | Elimina una ruta por identificador. |
| `mapearRuta()` | Convierte el registro de persistencia en entidad de dominio. |

### Endpoints relacionados

| Método HTTP | Ruta | Acceso |
|---|---|---|
| POST | `/api/v1/rutas` | Administrador |
| GET | `/api/v1/rutas` | Público |
| GET | `/api/v1/rutas/:id` | Público |
| PATCH | `/api/v1/rutas/:id` | Administrador |
| DELETE | `/api/v1/rutas/:id` | Administrador |

### Checklist de Sprint 1

| Item | Estado | Evidencia |
|---|---|---|
| Revisar entidad, DTO, servicio, controlador y contrato del módulo. | [x] | Se trabajó sobre `Ruta`, `RutaRepository`, `RutasService` y `RutasController`. |
| Implementar los métodos bajo mi responsabilidad. | [x] | CRUD completo en `PrismaRutaRepository`. |
| Mantener separación por capas del profesor. | [x] | Uso de `dominio`, `interfaz`, `repositorio` y `presentacion`. |
| Manejar errores de persistencia de forma controlada. | [x] | Uso de `manejarErrorPrisma()` en los métodos del repositorio. |
| Registrar commits claros. | [x] | `feat(rutas): CRUD completo de rutas` y commits relacionados. |
| Revisar resultado SonarQube. | [x] | No tuve observaciones reportadas para el avance del Sprint 1. |

### Resultado de SonarQube en Sprint 1

| Herramienta | Resultado | Estado |
|---|---|---|
| SonarQube | No tuve observaciones reportadas en el avance de rutas del Sprint 1. | Sin correcciones pendientes |

## Sprint 2 - Autenticación administrativa

### Historia de usuario

| Campo | Contenido |
|---|---|
| Código / ID de historia | HU-S2-AUTH |
| Nombre de historia | Autenticación administrativa con JWT |
| Sprint | Sprint 2 |
| Módulo | Autenticación administrativa |
| Responsable | Juan Carlos Postigo |
| Descripción | Como administrador, quiero iniciar sesión y consultar mi perfil, para acceder a las funciones protegidas del sistema. |
| Rama usada | `feature/sesiones` |
| Commits relacionados | `3e97419` |
| Pull request | Pendiente de colocar enlace si existe |
| Estado | Completado a nivel de backend |

### Historial de commits de Sprint 2

| Hash | Rama verificada | Mensaje | Aporte |
|---|---|---|---|
| `3e97419` | `feature/sesiones` -> `develop` | `feat: métodos para el manejo de sesiones con JWT` | Implementé el flujo backend de autenticación administrativa: búsqueda de administrador, validación de credenciales, generación de JWT, perfil seguro y validación del administrador autenticado. |

> Observación: este commit se conserva en `origin/feature/sesiones` y también
> está integrado en `develop`, por eso se documenta como rama de trabajo
> `feature/sesiones` y rama de integración `develop`.

### Archivos principales

| Elemento | Ruta |
|---|---|
| Servicio de autenticación | [`AuthService`](../../../apps/backend/src/modules/auth/interfaz/services/auth.service.ts) |
| Repositorio Prisma | [`PrismaAdministradorRepository`](../../../apps/backend/src/modules/auth/repositorio/prisma/prisma-administrador.repository.ts) |
| Contrato del repositorio | [`AdministradorRepository`](../../../apps/backend/src/modules/auth/repositorio/administrador.repository.ts) |
| Entidad de dominio | [`Administrador`](../../../apps/backend/src/modules/auth/dominio/entities/administrador.entity.ts) |
| Controlador REST | [`AuthController`](../../../apps/backend/src/modules/auth/presentacion/controllers/auth.controller.ts) |
| Módulo NestJS | [`AuthModule`](../../../apps/backend/src/modules/auth/auth.module.ts) |

### Operaciones implementadas

| Operación | Evidencia |
|---|---|
| `validarCredenciales()` | Busca al administrador, valida estado activo y compara password con `bcrypt.compare()`. |
| `iniciarSesion()` | Orquesta la validación, genera el token y devuelve datos públicos del administrador. |
| `generarToken()` | Construye el `JwtPayload` y firma el token con `JwtService`. |
| `obtenerPerfil()` | Devuelve un perfil sin exponer `passwordHash`. |
| `validarAdministrador()` | Revalida el payload JWT contra la base de datos y el estado activo. |
| `buscarPorEmail()` | Consulta el administrador por correo con Prisma. |
| `buscarPorId()` | Consulta el administrador por id con Prisma. |

### Endpoints relacionados

| Método HTTP | Ruta | Acceso |
|---|---|---|
| POST | `/api/v1/auth/login` | Público |
| GET | `/api/v1/auth/perfil` | Administrador autenticado |

### Checklist de Sprint 2

| Item | Estado | Evidencia |
|---|---|---|
| Revisar entidad, DTO, servicio, controlador y contrato del módulo. | [x] | Se trabajó sobre `Administrador`, DTOs de login/perfil y `AuthController`. |
| Implementar repositorio de administradores. | [x] | `buscarPorEmail()` y `buscarPorId()` en `PrismaAdministradorRepository`. |
| Implementar flujo de login. | [x] | `AuthService.iniciarSesion()` devuelve token Bearer y datos públicos. |
| Proteger rutas administrativas. | [x] | `AuthModule` registra `JwtAuthGuard` como guard global mediante `APP_GUARD`. |
| Evitar exposición de datos sensibles. | [x] | El perfil retornado no incluye `passwordHash`. |
| Registrar commits claros. | [x] | `feat: métodos para el manejo de sesiones con JWT`. |
| Corregir observaciones de SonarQube. | [x] | Se corrigieron las observaciones en `AuthService`: uso de optional chaining y eliminación de implementación duplicada. |

### Observaciones de SonarQube corregidas en Sprint 2

| Archivo | Observación reportada | Corrección aplicada | Estado |
|---|---|---|---|
| `apps/backend/src/modules/auth/interfaz/services/auth.service.ts` | Línea 27: preferir optional chaining por concisión y legibilidad. | Se reemplazó la validación por una expresión con optional chaining. | Corregido |
| `apps/backend/src/modules/auth/interfaz/services/auth.service.ts` | Línea 81: una función tenía implementación idéntica a otra función. | Se extrajo un mapper reutilizable para evitar duplicación y mantener DRY. | Corregido |

## Buenas prácticas aplicadas

### Clean Code

| Categoría | Práctica aplicada | Fragmento / evidencia |
|---|---|---|
| Nombres | Métodos con intención clara y en lenguaje del dominio. | `buscarTodos()`, `buscarPorId()`, `mapearRuta()`, `validarCredenciales()`, `generarToken()`. |
| Funciones | Funciones pequeñas, enfocadas en una acción. | `buscarTodos()` solo consulta, ordena y mapea; `generarToken()` solo crea el JWT. |
| Comentarios | Se evita comentar lo obvio; el código debe explicar la intención. | Los repositorios no dependen de comentarios extensos para entender el flujo. |
| Estructura de código fuente | Separación por capas: dominio, interfaz, repositorio y presentación. | Módulos `gestion-rutas` y `auth` organizados por responsabilidad. |
| Objetos / estructuras de datos | Uso de entidades, DTOs y contratos tipados. | `Ruta`, `Administrador`, `CrearRutaDto`, `IniciarSesionDto`, `JwtPayload`. |
| Tratamiento de errores | Errores de persistencia centralizados y errores HTTP delegados a capas superiores. | `manejarErrorPrisma()` en repositorios y `UnauthorizedException` en auth. |
| Clases | Clases con responsabilidad definida. | `PrismaRutaRepository` persiste rutas; `AuthService` coordina autenticación; `AuthController` expone endpoints. |

### SOLID

| Principio | Evidencia aplicada |
|---|---|
| SRP | Repositorios, servicios y controladores tienen responsabilidades distintas. |
| OCP | El servicio depende de contratos; se puede cambiar Prisma por otro adaptador sin cambiar el caso de uso. |
| LSP | `PrismaRutaRepository` y `PrismaAdministradorRepository` respetan sus contratos. |
| ISP | Los contratos agrupan operaciones específicas del módulo, sin obligar métodos ajenos. |
| DIP | `RutasService` y `AuthService` dependen de tokens/contratos, no de implementaciones concretas. |

### Estilos de programación

| Estilo | Evidencia |
|---|---|
| RESTful | Endpoints con `GET`, `POST`, `PATCH` y `DELETE` para rutas; `POST` y `GET` para auth. |
| Error / Exception Handling | `try/catch` liviano en repositorio y excepciones de NestJS en autenticación. |
| Persistent Tables | Consultas Prisma hacia modelos persistentes como `ruta` y `administrador`. |
| Things / Objetos | Entidades de dominio y DTOs separan datos de entrada, dominio y persistencia. |
| Pipeline | Los datos pasan de controlador a servicio, repositorio, Prisma y mapper de dominio. |
