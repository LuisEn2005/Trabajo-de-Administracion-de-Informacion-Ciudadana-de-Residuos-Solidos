# Sprint 1 - Juan Carlos Postigo

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Juan Carlos Postigo |
| Sprint | Sprint 1 |
| Modulo | Gestion de rutas |
| Responsabilidad | CRUD completo de rutas |
| Archivo principal | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts` |
| Controlador | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/rutas.controller.ts` |
| Servicio | `apps/backend/src/modules/gestion-rutas/interfaz/services/rutas.service.ts` |
| Contrato | `apps/backend/src/modules/gestion-rutas/repositorio/ruta.repository.ts` |
| Entidad | `apps/backend/src/modules/gestion-rutas/dominio/entities/ruta.entity.ts` |

## Operaciones asignadas

- `crear()`
- `buscarTodos()`
- `buscarPorId()`
- `actualizar()`
- `eliminar()`
- `mapearRuta()`

## Endpoints relacionados

| Metodo HTTP | Ruta | Acceso |
|---|---|---|
| POST | /api/v1/rutas | Administrador |
| GET | /api/v1/rutas | Publico |
| GET | /api/v1/rutas/:id | Publico |
| PATCH | /api/v1/rutas/:id | Administrador |
| DELETE | /api/v1/rutas/:id | Administrador |

## Evidencia pendiente por completar

- Commits propios del Sprint 1: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
