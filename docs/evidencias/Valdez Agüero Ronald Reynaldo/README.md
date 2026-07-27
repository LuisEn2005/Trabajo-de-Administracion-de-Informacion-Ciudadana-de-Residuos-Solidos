# Sprint 1 y Sprint 2 — Ronald Reynaldo Valdez Agüero

## Integrante 4 — Ronald Reynaldo Valdez Agüero

Este documento resume la participación del integrante 4 en los dos sprints del proyecto, de acuerdo con los lineamientos del tercer parcial. Los cambios se realizaron en ramas feature y luego se integraron mediante pull request hacia `develop`.

## Ramas de trabajo

| Rama | Propósito |
|---|---|
| `feature/implementar-horario-ruta` | Implementación del Sprint 1 sobre horarios de ruta. |
| `feature/Asignaciones-operativas` | Implementación del Sprint 2 sobre asignaciones operativas. |

## Flujo de integración

1. Desarrollo de cada sprint en su rama feature correspondiente.
2. Validación local de los cambios.
3. Creación de pull request.
4. Merge final hacia la rama `develop`.

---

## Sprint 1 — Administración de horarios

| Elemento | Detalle |
|---|---|
| Módulo | Gestión de rutas / Horarios |
| Responsabilidad | Crear, actualizar y eliminar horarios |
| Rama utilizada | `feature/implementar-horario-ruta` |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-horario-ruta.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/horarios-ruta.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/horarios-ruta.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/horario-ruta.entity.ts` |

### Operaciones implementadas

- `crear()`
- `actualizar()`
- `eliminar()`

### Endpoints relacionados

| Método HTTP | Ruta | Requiere JSON |
|---|---|---|
| POST | `/api/v1/rutas/:rutaId/horarios` | Sí |
| PATCH | `/api/v1/horarios-ruta/:id` | Sí |
| DELETE | `/api/v1/horarios-ruta/:id` | No |

---

## Sprint 2 — Asignaciones operativas

| Elemento | Detalle |
|---|---|
| Módulo | Asignaciones |
| Responsabilidad | Relacionar Ruta + Vehículo + Horario |
| Rama utilizada | `feature/Asignaciones-operativas` |
| Archivo principal | `apps/backend/src/modules/asignaciones/repositorio/prisma/prisma-asignacion-operativa.repository.ts` |
| Controlador | `apps/backend/src/modules/asignaciones/presentacion/controllers/asignaciones.controller.ts` |
| Servicio | `apps/backend/src/modules/asignaciones/interfaz/services/asignaciones.service.ts` |
| Contrato | `apps/backend/src/modules/asignaciones/repositorio/asignacion-operativa.repository.ts` |
| Entidad | `apps/backend/src/modules/asignaciones/dominio/entities/asignacion-operativa.entity.ts` |

### Métodos implementados

- `crear()`
- `buscarTodos()`
- `buscarPorId()`
- `actualizar()`
- `eliminar()`
- `buscarPorRuta()`
- `buscarPorVehiculo()`
- `buscarProgramacionPublica()`
- `mapearAsignacion()`

### Endpoints relacionados

| Método HTTP | Ruta | Requiere JSON |
|---|---|---|
| POST | `/api/v1/asignaciones` | Sí |
| GET | `/api/v1/asignaciones` | No |
| GET | `/api/v1/asignaciones/:id` | No |
| PATCH | `/api/v1/asignaciones/:id` | Sí |
| DELETE | `/api/v1/asignaciones/:id` | No |
| GET | `/api/v1/asignaciones/ruta/:rutaId` | No |
| GET | `/api/v1/asignaciones/vehiculo/:vehiculoId` | No |

### DTO relacionados

- `apps/backend/src/modules/asignaciones/interfaz/dto/crear-asignacion.dto.ts`
- `apps/backend/src/modules/asignaciones/interfaz/dto/actualizar-asignacion.dto.ts`

## Evidencia de cierre

Los cambios de ambos sprints se integraron posteriormente mediante pull request hacia la rama `develop`, manteniendo el flujo de trabajo por feature branch solicitado en el tercer parcial.
