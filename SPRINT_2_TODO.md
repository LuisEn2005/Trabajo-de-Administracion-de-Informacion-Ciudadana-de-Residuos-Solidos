# Sprint 2 TODO — Backend EnrutApp

## 1. Alcance del Sprint 2

Scaffold backend para autenticación administrativa, puntos de recolección, contenedores, asignaciones operativas y consultas públicas de programación. La lógica de negocio y persistencia queda pendiente por integrante mediante `TODO(S2-...)` y `NotImplementedException`.

Fuera de alcance: cuentas ciudadanas, registro público, reportes ciudadanos, equipos de limpieza, notificaciones, recuperación de contraseña, refresh tokens, sesiones persistentes, geolocalización en tiempo real, optimización automática de rutas y frontend.

## 2. Módulos creados

| Módulo                 | Responsable  | Propósito                                            |
| ---------------------- | ------------ | ---------------------------------------------------- |
| `auth`                 | Juan Postigo | Login y perfil de administradores con JWT preparado. |
| `puntos-recoleccion`   | Integrante 2 | CRUD administrativo y consultas públicas de puntos.  |
| `contenedores`         | Integrante 3 | Inventario individual de contenedores.               |
| `asignaciones`         | Integrante 4 | Asociación Ruta + Vehículo + Horario.                |
| `programacion-publica` | Integrante 5 | Consultas ciudadanas integradas sin duplicar CRUD.   |

## 3. Endpoints preparados

### Públicos

| Método | Ruta                                           | Nota                                      |
| ------ | ---------------------------------------------- | ----------------------------------------- |
| POST   | `/api/v1/auth/login`                           | Login administrativo pendiente.           |
| GET    | `/api/v1/rutas`                                | CRUD existente de rutas.                  |
| GET    | `/api/v1/rutas/:id`                            | CRUD existente de rutas.                  |
| GET    | `/api/v1/rutas/:rutaId/horarios`               | Convención actual para horarios por ruta. |
| GET    | `/api/v1/horarios-ruta`                        | Equivalente actual de `/horarios`.        |
| GET    | `/api/v1/horarios-ruta/:id`                    | Equivalente actual de `/horarios/:id`.    |
| GET    | `/api/v1/puntos-recoleccion`                   | Puntos públicos.                          |
| GET    | `/api/v1/puntos-recoleccion/:id`               | Punto público por id.                     |
| GET    | `/api/v1/puntos-recoleccion/:id/contenedores`  | Contenedores públicos por punto.          |
| GET    | `/api/v1/contenedores/punto/:puntoId`          | Consulta pública auxiliar por punto.      |
| GET    | `/api/v1/programacion/hoy`                     | Programación pública del día.             |
| GET    | `/api/v1/programacion/rutas/:rutaId`           | Programación pública por ruta.            |
| GET    | `/api/v1/programacion/rutas/:rutaId/detalle`   | Detalle integrado de ruta.                |
| GET    | `/api/v1/programacion/rutas/:rutaId/horarios`  | Horarios públicos por ruta.               |
| GET    | `/api/v1/programacion/rutas/:rutaId/vehiculos` | Vehículos públicos por ruta.              |
| GET    | `/api/v1/programacion/rutas/:rutaId/puntos`    | Puntos públicos por ruta.                 |

### Protegidos

| Método            | Ruta                                                          |
| ----------------- | ------------------------------------------------------------- |
| GET               | `/api/v1/auth/perfil`                                         |
| POST/PATCH/DELETE | `/api/v1/rutas/**`                                            |
| POST/PATCH/DELETE | `/api/v1/horarios-ruta/**` y `/api/v1/rutas/:rutaId/horarios` |
| Todas             | `/api/v1/vehiculos/**`                                        |
| POST/PATCH/DELETE | `/api/v1/puntos-recoleccion/**`                               |
| GET               | `/api/v1/contenedores`                                        |
| GET               | `/api/v1/contenedores/:id`                                    |
| GET               | `/api/v1/contenedores/resumen`                                |
| POST/PATCH/DELETE | `/api/v1/contenedores/**`                                     |
| Todas             | `/api/v1/asignaciones/**`                                     |

## 4. Métodos pendientes por integrante

| Responsable       | Métodos                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `S2-JUAN`         | `validarCredenciales`, `iniciarSesion`, `generarToken`, `obtenerPerfil`, `validarAdministrador`, consultas base de `AdministradorRepository`.                          |
| `S2-INTEGRANTE-2` | `crear`, `buscarTodos`, `buscarPorId`, `actualizar`, `eliminar`, `cambiarEstado`, `mapearPunto`.                                                                       |
| `S2-INTEGRANTE-3` | `crear`, `buscarTodos`, `buscarPorId`, `actualizar`, `eliminar`, `buscarPorPunto`, `cambiarEstado`, `trasladarAPunto`, `obtenerResumenInventario`, `mapearContenedor`. |
| `S2-INTEGRANTE-4` | `crear`, `buscarTodos`, `buscarPorId`, `actualizar`, `eliminar`, `buscarPorRuta`, `buscarPorVehiculo`, `buscarProgramacionPublica`, `mapearAsignacion`.                |
| `S2-INTEGRANTE-5` | `buscarDetalleDeRuta`, `buscarHorariosPorRuta`, `buscarVehiculosPorRuta`, `buscarPuntosPorRuta`, `buscarProgramacionDelDia`, `buscarProgramacionPorRuta`.              |

## 5. Archivos con `TODO(S2-...)`

- `apps/backend/src/modules/auth/interfaz/services/auth.service.ts`
- `apps/backend/src/modules/auth/repositorio/prisma/prisma-administrador.repository.ts`
- `apps/backend/src/modules/puntos-recoleccion/repositorio/prisma/prisma-punto-recoleccion.repository.ts`
- `apps/backend/src/modules/contenedores/repositorio/prisma/prisma-contenedor.repository.ts`
- `apps/backend/src/modules/asignaciones/repositorio/prisma/prisma-asignacion-operativa.repository.ts`
- `apps/backend/src/modules/programacion-publica/interfaz/services/programacion-publica.service.ts`

## 6. Dependencias entre tareas

- `auth` debe completarse para que las rutas protegidas funcionen con JWT real.
- `programacion-publica` depende de repositorios de rutas, horarios, vehículos, puntos y asignaciones.
- `puntos-recoleccion` y `contenedores` comparten la consulta pública de contenedores por punto.
- `asignaciones` depende de que existan rutas, vehículos y horarios válidos.

## 7. Instrucciones mínimas de implementación

1. Reemplazar cada `NotImplementedException` por lógica real solamente en el método asignado.
2. Mantener el patrón `controlador -> servicio -> repositorio`.
3. Usar `manejarErrorPrisma()` en repositorios Prisma cuando se implemente persistencia.
4. No devolver datos simulados.
5. Conservar `@Public()` solo en endpoints ciudadanos.

## 8. Comandos de verificación

```bash
npm run format --workspace @residuos/backend
npm run prisma:validate --workspace @residuos/backend
npm run prisma:generate --workspace @residuos/backend
npm run lint --workspace @residuos/backend
npx tsc --noEmit --project apps/backend/tsconfig.json
```

Nota: este repositorio no tiene script de pruebas backend configurado actualmente. No se agregaron pruebas falsas para lógica pendiente.

## 9. Migración pendiente

No se ejecutó una migración destructiva. Cuando el equipo confirme la base de datos objetivo, ejecutar:

```bash
cd apps/backend
npx prisma migrate dev --name sprint_2_scaffold
```
