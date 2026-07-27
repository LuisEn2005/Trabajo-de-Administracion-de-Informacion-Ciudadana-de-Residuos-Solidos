# Sprint 1 y Sprint 2 — Daysi Jara Arisaca

## Sprint 1 — Consulta de vehículos

| Elemento | Detalle |
|---|---|
| Módulo | Gestión de rutas / Vehículos |
| Responsabilidad | Consultar vehículos |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-vehiculo.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/vehiculos.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/vehiculos.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/vehiculo.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/vehiculo.entity.ts` |

### Operaciones del Sprint 1

- `buscarTodos()`
- `buscarPorId()`
- `buscarPorRutaId()`

### Endpoints relacionados

| Método HTTP | Ruta | Acceso actual |
|---|---|---|
| GET | `/api/v1/vehiculos` | Administrador |
| GET | `/api/v1/vehiculos/:id` | Administrador |
| GET | `/api/v1/rutas/:rutaId/vehiculos` | Administrador |

---

## Sprint 2 — Inventario de contenedores

| Elemento | Detalle |
|---|---|
| Módulo | Contenedores |
| Responsabilidad | Inventario individual de contenedores |
| Archivo principal | `apps/backend/src/modules/contenedores/repositorio/prisma/prisma-contenedor.repository.ts` |
| Controlador | `apps/backend/src/modules/contenedores/presentacion/controllers/contenedores.controller.ts` |
| Servicio | `apps/backend/src/modules/contenedores/interfaz/services/contenedores.service.ts` |
| Contrato | `apps/backend/src/modules/contenedores/repositorio/contenedor.repository.ts` |
| Entidad | `apps/backend/src/modules/contenedores/dominio/entities/contenedor.entity.ts` |

### Métodos pendientes

| Método | Qué debe implementar | Endpoint |
|---|---|---|
| `crear()` | Registrar contenedor con código, tipo, capacidad, estado y punto. | `POST /api/v1/contenedores` |
| `buscarTodos()` | Listar inventario completo. | `GET /api/v1/contenedores` |
| `buscarPorId()` | Obtener contenedor por id. | `GET /api/v1/contenedores/:id` |
| `actualizar()` | Modificar datos generales del contenedor. | `PATCH /api/v1/contenedores/:id` |
| `eliminar()` | Eliminar o retirar contenedor. | `DELETE /api/v1/contenedores/:id` |
| `buscarPorPunto()` | Obtener contenedores de un punto. | `GET /api/v1/contenedores/punto/:puntoId` y `GET /api/v1/puntos-recoleccion/:id/contenedores` |
| `cambiarEstado()` | Cambiar estado del contenedor. | `PATCH /api/v1/contenedores/:id/estado` |
| `trasladarAPunto()` | Cambiar punto asignado del contenedor. | `PATCH /api/v1/contenedores/:id/trasladar` |
| `obtenerResumenInventario()` | Calcular resumen agrupado del inventario. | `GET /api/v1/contenedores/resumen` |
| `mapearContenedor()` | Mapear registro Prisma a entidad de dominio. | Método interno |

### DTO relacionados

- `apps/backend/src/modules/contenedores/interfaz/dto/crear-contenedor.dto.ts`
- `apps/backend/src/modules/contenedores/interfaz/dto/actualizar-contenedor.dto.ts`
- `apps/backend/src/modules/contenedores/interfaz/dto/cambiar-estado-contenedor.dto.ts`
- `apps/backend/src/modules/contenedores/interfaz/dto/trasladar-contenedor.dto.ts`
