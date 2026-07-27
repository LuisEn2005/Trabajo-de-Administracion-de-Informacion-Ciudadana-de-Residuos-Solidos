# Sprint 1 y Sprint 2 — Luis Enrique Ramos Chambi

## Sprint 1 — Administración de vehículos

| Elemento | Detalle |
|---|---|
| Módulo | Gestión de rutas / Vehículos |
| Responsabilidad | Crear, actualizar y eliminar vehículos |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-vehiculo.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/vehiculos.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/vehiculos.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/vehiculo.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/vehiculo.entity.ts` |

### Operaciones del Sprint 1

- `crear()`
- `actualizar()`
- `eliminar()`

### Endpoints relacionados

| Método HTTP | Ruta | Acceso actual |
|---|---|---|
| POST | `/api/v1/vehiculos` | Administrador |
| PATCH | `/api/v1/vehiculos/:id` | Administrador |
| DELETE | `/api/v1/vehiculos/:id` | Administrador |

---

## Sprint 2 — Puntos de recolección

| Elemento | Detalle |
|---|---|
| Módulo | Puntos de recolección |
| Responsabilidad | CRUD de puntos y consulta pública de puntos |
| Archivo principal | `apps/backend/src/modules/puntos-recoleccion/repositorio/prisma/prisma-punto-recoleccion.repository.ts` |
| Controlador | `apps/backend/src/modules/puntos-recoleccion/presentacion/controllers/puntos-recoleccion.controller.ts` |
| Servicio | `apps/backend/src/modules/puntos-recoleccion/interfaz/services/puntos-recoleccion.service.ts` |
| Contrato | `apps/backend/src/modules/puntos-recoleccion/repositorio/punto-recoleccion.repository.ts` |
| Entidad | `apps/backend/src/modules/puntos-recoleccion/dominio/entities/punto-recoleccion.entity.ts` |

### Métodos pendientes

| Método | Qué debe implementar | Endpoint |
|---|---|---|
| `crear()` | Registrar un punto con nombre, dirección, referencia, coordenadas y estado. | `POST /api/v1/puntos-recoleccion` |
| `buscarTodos()` | Listar puntos para consulta ciudadana. | `GET /api/v1/puntos-recoleccion` |
| `buscarPorId()` | Obtener punto por id. | `GET /api/v1/puntos-recoleccion/:id` |
| `actualizar()` | Modificar datos generales del punto. | `PATCH /api/v1/puntos-recoleccion/:id` |
| `eliminar()` | Eliminar o desactivar punto según política del equipo. | `DELETE /api/v1/puntos-recoleccion/:id` |
| `cambiarEstado()` | Cambiar estado del punto. | `PATCH /api/v1/puntos-recoleccion/:id/estado` |
| `mapearPunto()` | Mapear registro Prisma a entidad de dominio. | Método interno |

### DTO relacionados

- `apps/backend/src/modules/puntos-recoleccion/interfaz/dto/crear-punto-recoleccion.dto.ts`
- `apps/backend/src/modules/puntos-recoleccion/interfaz/dto/actualizar-punto-recoleccion.dto.ts`
- `apps/backend/src/modules/puntos-recoleccion/interfaz/dto/cambiar-estado-punto-recoleccion.dto.ts`
