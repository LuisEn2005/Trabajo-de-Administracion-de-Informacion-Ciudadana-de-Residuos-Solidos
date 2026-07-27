# Sprint 1 - Fernando Llosa Manchego

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Fernando Llosa Manchego |
| Sprint | Sprint 1 |
| Modulo | Consulta de horarios |
| Responsabilidad | Consultar horarios |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-horario-ruta.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/horarios-ruta.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/horarios-ruta.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/horario-ruta.entity.ts` |

## Operaciones asignadas

- `buscarTodos()`
- `buscarPorId()`
- `buscarPorRutaId()`

## Endpoints relacionados

| Metodo HTTP | Ruta | Acceso |
|---|---|---|
| GET | /api/v1/rutas/:rutaId/horarios | Publico |
| GET | /api/v1/horarios-ruta | Publico |
| GET | /api/v1/horarios-ruta/:id | Publico |

## Evidencia pendiente por completar

- Commits propios del Sprint 1: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
