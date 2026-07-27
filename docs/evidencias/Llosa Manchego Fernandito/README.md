# Evidencias - Fernando Llosa Manchego

## Resumen general del avance

| Sprint | Modulo | Responsabilidad | Archivo de detalle |
|---|---|---|---|
| Sprint 1 | Consulta de horarios | Consultar horarios | [`SPRINT_1.md`](./SPRINT_1.md) |
| Sprint 2 | Programacion publica | Consultas publicas integradas sin duplicar CRUD | [`SPRINT_2.md`](./SPRINT_2.md) |

## Participacion solicitada por el docente

| Criterio | Sprint 1 | Sprint 2 |
|---|---|---|
| Numero de commits de codigo fuente | `PENDIENTE: colocar cantidad y hashes` | `PENDIENTE: colocar cantidad y hashes` |
| Numero de historias de usuario bajo responsabilidad | `PENDIENTE: colocar cantidad y codigo/nombre de HU` | `PENDIENTE: colocar cantidad y codigo/nombre de HU` |
| Checklist para completar historias de usuario | Ver plantilla inferior | Ver plantilla inferior |

## Plantilla de historia de usuario

| Campo | Contenido |
|---|---|
| Codigo / ID de historia | `PENDIENTE` |
| Nombre de historia | `PENDIENTE` |
| Sprint | `Sprint 1` / `Sprint 2` |
| Modulo | `PENDIENTE` |
| Responsable | Fernando Llosa Manchego |
| Descripcion | Como usuario/administrador, quiero `PENDIENTE`, para `PENDIENTE`. |
| Rama usada | `PENDIENTE` |
| Commits relacionados | `PENDIENTE` |
| Pull request | `PENDIENTE` |
| Estado | Pendiente / En proceso / Completado |

## Checklist de implementacion

| Item | Estado | Evidencia |
|---|---|---|
| Revise entidad, DTO, servicio, controlador y contrato del modulo. | [ ] | `PENDIENTE` |
| Implemente unicamente los metodos bajo mi responsabilidad. | [ ] | `PENDIENTE` |
| No modifique archivos compartidos sin coordinar. | [ ] | `PENDIENTE` |
| Valide entradas usando los DTO existentes. | [ ] | `PENDIENTE` |
| Maneje errores de persistencia de forma controlada. | [ ] | `PENDIENTE` |
| Probe endpoints en Thunder Client/Postman u otra herramienta. | [ ] | `PENDIENTE` |
| Registre capturas o resultados de pruebas. | [ ] | `PENDIENTE` |
| Registre commits con mensaje claro. | [ ] | `PENDIENTE` |

## Buenas practicas aplicadas o por evidenciar

### Clean Code

| Categoria | Como evidenciarlo en el codigo | Evidencia del integrante |
|---|---|---|
| Nombres | Metodos, DTO y variables con intencion clara. | `PENDIENTE` |
| Funciones | Metodos pequenos con una responsabilidad principal. | `PENDIENTE` |
| Comentarios | Comentarios solo cuando aclaren decisiones, no para repetir el codigo. | `PENDIENTE` |
| Estructura de codigo fuente | Ubicacion correcta en `dominio`, `repositorio`, `interfaz` o `presentacion`. | `PENDIENTE` |
| Objetos / estructuras de datos | Entidades, DTO y contratos tipados. | `PENDIENTE` |
| Tratamiento de errores | Uso de errores controlados y manejo de errores Prisma cuando corresponda. | `PENDIENTE` |
| Clases | Clases con responsabilidad clara. | `PENDIENTE` |

### SOLID

| Principio | Como aplicarlo en el modulo | Evidencia del integrante |
|---|---|---|
| SRP | Cada clase mantiene una responsabilidad principal. | `PENDIENTE` |
| OCP | El servicio depende de contratos y permite cambiar implementaciones. | `PENDIENTE` |
| LSP | La implementacion Prisma respeta el contrato del repositorio. | `PENDIENTE` |
| ISP | Los contratos contienen operaciones relacionadas al modulo. | `PENDIENTE` |
| DIP | Los servicios dependen de interfaces/tokens, no de clases concretas. | `PENDIENTE` |

### Estilos de programacion

| Estilo | Como puede aparecer en el proyecto | Evidencia del integrante |
|---|---|---|
| RESTful | Endpoints con `GET`, `POST`, `PATCH`, `DELETE`. | `PENDIENTE` |
| Error/Exception Handling | Uso de `try/catch`, filtros o manejadores centralizados. | `PENDIENTE` |
| Persistent Tables | Consultas Prisma hacia modelos persistentes. | `PENDIENTE` |
| Things / Objetos | Entidades, servicios y repositorios con responsabilidades separadas. | `PENDIENTE` |
| Pipeline | Transformacion de registros a entidades mediante mappers. | `PENDIENTE` |

## Evidencias recomendadas

- Capturas de Thunder Client/Postman.
- Capturas de SonarLint si el docente lo solicita.
- Capturas del tablero Trello con historia asignada.
- Hashes de commits propios.
- Fragmentos de codigo del metodo implementado.
- Resultado de pruebas o validaciones ejecutadas.
