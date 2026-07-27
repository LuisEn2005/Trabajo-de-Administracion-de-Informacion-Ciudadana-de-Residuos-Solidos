# Sprint 1 y Sprint 2 — Ronald Reynaldo Valdez Agüero

## Sprint 1 — Administración de horarios

| Elemento | Detalle |
|---|---|
| Módulo | Gestión de rutas / Horarios |
| Responsabilidad | Crear, actualizar y eliminar horarios |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-horario-ruta.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/horarios-ruta.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/horarios-ruta.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/horario-ruta.entity.ts` |

### Operaciones del Sprint 1

- `crear()`
- `actualizar()`
- `eliminar()`

### Endpoints relacionados

| Método HTTP | Ruta | Acceso actual |
|---|---|---|
| POST | `/api/v1/rutas/:rutaId/horarios` | Administrador |
| PATCH | `/api/v1/horarios-ruta/:id` | Administrador |
| DELETE | `/api/v1/horarios-ruta/:id` | Administrador |

---

## Sprint 2 — Asignaciones operativas

| Elemento | Detalle |
|---|---|
| Módulo | Asignaciones |
| Responsabilidad | Relacionar Ruta + Vehículo + Horario |
| Archivo principal | `apps/backend/src/modules/asignaciones/repositorio/prisma/prisma-asignacion-operativa.repository.ts` |
| Controlador | `apps/backend/src/modules/asignaciones/presentacion/controllers/asignaciones.controller.ts` |
| Servicio | `apps/backend/src/modules/asignaciones/interfaz/services/asignaciones.service.ts` |
| Contrato | `apps/backend/src/modules/asignaciones/repositorio/asignacion-operativa.repository.ts` |
| Entidad | `apps/backend/src/modules/asignaciones/dominio/entities/asignacion-operativa.entity.ts` |

### Métodos pendientes

| Método | Qué debe implementar | Endpoint |
|---|---|---|
| `crear()` | Crear asignación Ruta + Vehículo + Horario. | `POST /api/v1/asignaciones` |
| `buscarTodos()` | Listar asignaciones operativas. | `GET /api/v1/asignaciones` |
| `buscarPorId()` | Obtener asignación por id. | `GET /api/v1/asignaciones/:id` |
| `actualizar()` | Modificar ruta, vehículo, horario, fecha o estado. | `PATCH /api/v1/asignaciones/:id` |
| `eliminar()` | Eliminar o cancelar asignación. | `DELETE /api/v1/asignaciones/:id` |
| `buscarPorRuta()` | Obtener asignaciones de una ruta. | `GET /api/v1/asignaciones/ruta/:rutaId` |
| `buscarPorVehiculo()` | Obtener asignaciones de un vehículo. | `GET /api/v1/asignaciones/vehiculo/:vehiculoId` |
| `buscarProgramacionPublica()` | Proveer asignaciones para programación pública. | Método interno |
| `mapearAsignacion()` | Mapear registro Prisma a entidad de dominio. | Método interno |

### DTO relacionados

- `apps/backend/src/modules/asignaciones/interfaz/dto/crear-asignacion.dto.ts`
- `apps/backend/src/modules/asignaciones/interfaz/dto/actualizar-asignacion.dto.ts`
