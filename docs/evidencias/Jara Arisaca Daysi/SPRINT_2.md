# Sprint 2 - Daysi Jara Arisaca

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Daysi Jara Arisaca |
| Sprint | Sprint 2 |
| Modulo | Inventario de contenedores |
| Responsabilidad | Inventario individual de contenedores |
| Archivo principal | `apps/backend/src/modules/contenedores/repositorio/prisma/prisma-contenedor.repository.ts` |
| Controlador | `apps/backend/src/modules/contenedores/presentacion/controllers/contenedores.controller.ts` |
| Servicio | `apps/backend/src/modules/contenedores/interfaz/services/contenedores.service.ts` |
| Contrato | `apps/backend/src/modules/contenedores/repositorio/contenedor.repository.ts` |
| Entidad o DTO principal | `apps/backend/src/modules/contenedores/dominio/entities/contenedor.entity.ts` |

## Metodos pendientes de implementacion

| Metodo | Que debe implementar | Endpoint relacionado |
|---|---|---|
| crear() | Registrar contenedor con codigo, tipo, capacidad, estado y punto. | POST /api/v1/contenedores |
| buscarTodos() | Listar inventario completo. | GET /api/v1/contenedores |
| buscarPorId() | Obtener contenedor por id. | GET /api/v1/contenedores/:id |
| actualizar() | Modificar datos generales del contenedor. | PATCH /api/v1/contenedores/:id |
| eliminar() | Eliminar o retirar contenedor. | DELETE /api/v1/contenedores/:id |
| buscarPorPunto() | Obtener contenedores de un punto. | GET /api/v1/contenedores/punto/:puntoId y GET /api/v1/puntos-recoleccion/:id/contenedores |
| cambiarEstado() | Cambiar estado del contenedor. | PATCH /api/v1/contenedores/:id/estado |
| trasladarAPunto() | Cambiar punto asignado del contenedor. | PATCH /api/v1/contenedores/:id/trasladar |
| obtenerResumenInventario() | Calcular resumen agrupado del inventario. | GET /api/v1/contenedores/resumen |
| mapearContenedor() | Mapear registro Prisma a entidad de dominio. | Metodo interno |

## Evidencia pendiente por completar

- Commits propios del Sprint 2: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
- Evidencia de pruebas manuales o automatizadas: `PENDIENTE`.
