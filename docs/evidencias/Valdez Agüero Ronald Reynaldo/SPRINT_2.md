# Sprint 2 - Ronald Reynaldo Valdez Agüero

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Ronald Reynaldo Valdez Agüero |
| Sprint | Sprint 2 |
| Modulo | Asignaciones operativas |
| Responsabilidad | Relacionar Ruta + Vehiculo + Horario |
| Archivo principal | `apps/backend/src/modules/asignaciones/repositorio/prisma/prisma-asignacion-operativa.repository.ts` |
| Controlador | `apps/backend/src/modules/asignaciones/presentacion/controllers/asignaciones.controller.ts` |
| Servicio | `apps/backend/src/modules/asignaciones/interfaz/services/asignaciones.service.ts` |
| Contrato | `apps/backend/src/modules/asignaciones/repositorio/asignacion-operativa.repository.ts` |
| Entidad o DTO principal | `apps/backend/src/modules/asignaciones/dominio/entities/asignacion-operativa.entity.ts` |

## Metodos pendientes de implementacion

| Metodo | Que debe implementar | Endpoint relacionado |
|---|---|---|
| crear() | Crear asignacion Ruta + Vehiculo + Horario. | POST /api/v1/asignaciones |
| buscarTodos() | Listar asignaciones operativas. | GET /api/v1/asignaciones |
| buscarPorId() | Obtener asignacion por id. | GET /api/v1/asignaciones/:id |
| actualizar() | Modificar ruta, vehiculo, horario, fecha o estado. | PATCH /api/v1/asignaciones/:id |
| eliminar() | Eliminar o cancelar asignacion. | DELETE /api/v1/asignaciones/:id |
| buscarPorRuta() | Obtener asignaciones de una ruta. | GET /api/v1/asignaciones/ruta/:rutaId |
| buscarPorVehiculo() | Obtener asignaciones de un vehiculo. | GET /api/v1/asignaciones/vehiculo/:vehiculoId |
| buscarProgramacionPublica() | Proveer asignaciones para programacion publica. | Metodo interno |
| mapearAsignacion() | Mapear registro Prisma a entidad de dominio. | Metodo interno |

## Evidencia pendiente por completar

- Commits propios del Sprint 2: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
- Evidencia de pruebas manuales o automatizadas: `PENDIENTE`.
