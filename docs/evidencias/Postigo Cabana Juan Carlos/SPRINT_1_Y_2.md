# Sprint 1 y Sprint 2 — Juan Carlos Postigo

## Sprint 1 — Gestión de rutas

| Elemento | Detalle |
|---|---|
| Módulo | Gestión de rutas |
| Responsabilidad | CRUD completo de rutas |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/rutas.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/rutas.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/ruta.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/ruta.entity.ts` |

### Operaciones del Sprint 1

- `crear()`
- `buscarTodos()`
- `buscarPorId()`
- `actualizar()`
- `eliminar()`
- `mapearRuta()`

### Endpoints relacionados

| Método HTTP | Ruta | Acceso actual |
|---|---|---|
| POST | `/api/v1/rutas` | Administrador |
| GET | `/api/v1/rutas` | Público |
| GET | `/api/v1/rutas/:id` | Público |
| PATCH | `/api/v1/rutas/:id` | Administrador |
| DELETE | `/api/v1/rutas/:id` | Administrador |

---

## Sprint 2 — Autenticación administrativa

| Elemento | Detalle |
|---|---|
| Módulo | Auth |
| Responsabilidad | Login administrativo, JWT, perfil y protección global |
| Archivo principal | `apps/backend/src/modules/auth/interfaz/services/auth.service.ts` |
| Repositorio Prisma | `apps/backend/src/modules/auth/repositorio/prisma/prisma-administrador.repository.ts` |
| Controlador | `apps/backend/src/modules/auth/presentacion/controllers/auth.controller.ts` |
| Módulo NestJS | `apps/backend/src/modules/auth/auth.module.ts` |

### Métodos pendientes

| Método | Qué debe implementar | Endpoint |
|---|---|---|
| `validarCredenciales()` | Buscar admin por correo, verificar activo y contraseña. | Método interno |
| `iniciarSesion()` | Coordinar login y devolver token + datos públicos. | `POST /api/v1/auth/login` |
| `generarToken()` | Crear payload y firmar JWT. | Método interno |
| `obtenerPerfil()` | Devolver perfil sin datos sensibles. | `GET /api/v1/auth/perfil` |
| `validarAdministrador()` | Validar payload JWT y estado del admin. | Método interno |
| `buscarPorEmail()` | Consultar administrador por email con Prisma. | Método interno |
| `buscarPorId()` | Consultar administrador por id con Prisma. | Método interno |

### Archivos compartidos bajo su coordinación

- `apps/backend/src/app.module.ts`
- `apps/backend/src/modules/auth/auth.module.ts`
- `apps/backend/src/modules/auth/presentacion/guards/jwt-auth.guard.ts`
- `apps/backend/src/modules/auth/presentacion/strategies/jwt.strategy.ts`
- `apps/backend/src/shared/presentacion/decorators/public.decorator.ts`
- `.env.example`
- `apps/backend/.env.example`
- `apps/backend/prisma/schema.prisma`
