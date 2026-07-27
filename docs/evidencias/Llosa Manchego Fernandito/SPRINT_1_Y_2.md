# Sprint 1 y Sprint 2 — Fernando Llosa Manchego

## Sprint 1 — Consulta de horarios

| Elemento | Detalle |
|---|---|
| Módulo | Gestión de rutas / Horarios |
| Responsabilidad | Consultar horarios |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-horario-ruta.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/horarios-ruta.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/horarios-ruta.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/horario-ruta.entity.ts` |

### Operaciones del Sprint 1

- `buscarTodos()`
- `buscarPorId()`
- `buscarPorRutaId()`

### Endpoints relacionados

| Método HTTP | Ruta | Acceso actual |
|---|---|---|
| GET | `/api/v1/rutas/:rutaId/horarios` | Público |
| GET | `/api/v1/horarios-ruta` | Público |
| GET | `/api/v1/horarios-ruta/:id` | Público |

---

## Sprint 2 — Programación pública

| Elemento | Detalle |
|---|---|
| Módulo | Programación pública |
| Responsabilidad | Consultas públicas integradas sin duplicar CRUD |
| Archivo principal | `apps/backend/src/modules/programacion-publica/interfaz/services/programacion-publica.service.ts` |
| Controlador | `apps/backend/src/modules/programacion-publica/presentacion/controllers/programacion-publica.controller.ts` |
| DTO | `apps/backend/src/modules/programacion-publica/interfaz/dto/programacion-publica.dto.ts` |
| Módulo NestJS | `apps/backend/src/modules/programacion-publica/programacion-publica.module.ts` |

### Métodos pendientes

| Método | Qué debe implementar | Endpoint |
|---|---|---|
| `buscarProgramacionDelDia()` | Obtener rutas/asignaciones programadas para hoy. | `GET /api/v1/programacion/hoy` |
| `buscarProgramacionPorRuta()` | Obtener programación de una ruta. | `GET /api/v1/programacion/rutas/:rutaId` |
| `buscarDetalleDeRuta()` | Vista integrada de ruta, horarios, vehículos y puntos. | `GET /api/v1/programacion/rutas/:rutaId/detalle` |
| `buscarHorariosPorRuta()` | Obtener horarios relacionados a una ruta. | `GET /api/v1/programacion/rutas/:rutaId/horarios` |
| `buscarVehiculosPorRuta()` | Obtener vehículos relacionados a una ruta. | `GET /api/v1/programacion/rutas/:rutaId/vehiculos` |
| `buscarPuntosPorRuta()` | Obtener puntos del recorrido respetando orden si existe. | `GET /api/v1/programacion/rutas/:rutaId/puntos` |

### Dependencias

- Rutas: `apps/backend/src/modules/gestion-rutas/repositorio/ruta.repository.ts`
- Horarios: `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts`
- Vehículos: `apps/backend/src/modules/gestion-rutas/repositorio/vehiculo.repository.ts`
- Puntos: `apps/backend/src/modules/puntos-recoleccion/repositorio/punto-recoleccion.repository.ts`
- Asignaciones: `apps/backend/src/modules/asignaciones/repositorio/asignacion-operativa.repository.ts`
