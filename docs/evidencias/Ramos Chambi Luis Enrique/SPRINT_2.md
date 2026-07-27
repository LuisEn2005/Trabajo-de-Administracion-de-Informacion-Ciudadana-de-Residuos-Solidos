# Sprint 2 - Luis Enrique Ramos Chambi

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Luis Enrique Ramos Chambi |
| Sprint | Sprint 2 |
| Modulo | Puntos de recoleccion |
| Responsabilidad | CRUD de puntos y consulta publica de puntos |
| Archivo principal | `apps/backend/src/modules/puntos-recoleccion/repositorio/prisma/prisma-punto-recoleccion.repository.ts` |
| Controlador | `apps/backend/src/modules/puntos-recoleccion/presentacion/controllers/puntos-recoleccion.controller.ts` |
| Servicio | `apps/backend/src/modules/puntos-recoleccion/interfaz/services/puntos-recoleccion.service.ts` |
| Contrato | `apps/backend/src/modules/puntos-recoleccion/repositorio/punto-recoleccion.repository.ts` |
| Entidad o DTO principal | `apps/backend/src/modules/puntos-recoleccion/dominio/entities/punto-recoleccion.entity.ts` |

## Metodos pendientes de implementacion

| Metodo | Que debe implementar | Endpoint relacionado |
|---|---|---|
| crear() | Registrar punto con nombre, direccion, referencia, coordenadas y estado. | POST /api/v1/puntos-recoleccion |
| buscarTodos() | Listar puntos para consulta ciudadana. | GET /api/v1/puntos-recoleccion |
| buscarPorId() | Obtener punto por id. | GET /api/v1/puntos-recoleccion/:id |
| actualizar() | Modificar datos generales del punto. | PATCH /api/v1/puntos-recoleccion/:id |
| eliminar() | Eliminar o desactivar punto segun politica del equipo. | DELETE /api/v1/puntos-recoleccion/:id |
| cambiarEstado() | Cambiar estado del punto. | PATCH /api/v1/puntos-recoleccion/:id/estado |
| mapearPunto() | Mapear registro Prisma a entidad de dominio. | Metodo interno |

## Evidencia pendiente por completar

- Commits propios del Sprint 2: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
- Evidencia de pruebas manuales o automatizadas: `PENDIENTE`.
