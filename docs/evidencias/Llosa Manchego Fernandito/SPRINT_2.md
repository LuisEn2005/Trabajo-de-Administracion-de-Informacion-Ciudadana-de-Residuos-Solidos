# Sprint 2 - Fernando Llosa Manchego

## Resumen del avance

| Elemento | Detalle |
|---|---|
| Integrante | Fernando Llosa Manchego |
| Sprint | Sprint 2 |
| Modulo | Programacion publica |
| Responsabilidad | Consultas publicas integradas sin duplicar CRUD |
| Archivo principal | `apps/backend/src/modules/programacion-publica/interfaz/services/programacion-publica.service.ts` |
| Controlador | `apps/backend/src/modules/programacion-publica/presentacion/controllers/programacion-publica.controller.ts` |
| Servicio | `apps/backend/src/modules/programacion-publica/interfaz/services/programacion-publica.service.ts` |
| Contrato | `No aplica: consume repositorios existentes` |
| Entidad o DTO principal | `apps/backend/src/modules/programacion-publica/interfaz/dto/programacion-publica.dto.ts` |

## Metodos pendientes de implementacion

| Metodo | Que debe implementar | Endpoint relacionado |
|---|---|---|
| buscarProgramacionDelDia() | Obtener rutas/asignaciones programadas para hoy. | GET /api/v1/programacion/hoy |
| buscarProgramacionPorRuta() | Obtener programacion de una ruta. | GET /api/v1/programacion/rutas/:rutaId |
| buscarDetalleDeRuta() | Vista integrada de ruta, horarios, vehiculos y puntos. | GET /api/v1/programacion/rutas/:rutaId/detalle |
| buscarHorariosPorRuta() | Obtener horarios relacionados a una ruta. | GET /api/v1/programacion/rutas/:rutaId/horarios |
| buscarVehiculosPorRuta() | Obtener vehiculos relacionados a una ruta. | GET /api/v1/programacion/rutas/:rutaId/vehiculos |
| buscarPuntosPorRuta() | Obtener puntos del recorrido respetando orden si existe. | GET /api/v1/programacion/rutas/:rutaId/puntos |

## Evidencia pendiente por completar

- Commits propios del Sprint 2: `PENDIENTE: colocar hash y mensaje del commit`.
- Historias de usuario bajo responsabilidad: `PENDIENTE: colocar codigo o nombre de HU`.
- Checklist de la historia: completar la tabla del `README.md` de esta carpeta.
- Evidencia de pruebas manuales o automatizadas: `PENDIENTE`.
