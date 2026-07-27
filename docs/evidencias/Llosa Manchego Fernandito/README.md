# Evidencia de Desarrollo — Sprint 1 y Sprint 2
**Desarrollador:** Fernando Llosa Manchego  
**Proyecto:** Sistema de Gestión e Inspección de Rutas y Servicios Públicos (`apps/backend`)

---

## 📌 Sprint 1 — Consulta de Horarios de Rutas

### 🛠️ Descripción General
Durante el **Sprint 1**, el objetivo principal fue diseñar e implementar el módulo de consulta y lectura de los horarios asignados a las distintas rutas del sistema de recolección/transporte. Se construyó una arquitectura limpia basada en repositorios, servicios y controladores NestJS.

### 🗂️ Estructura de Archivos Asignados

| Elemento | Detalle de Implementación / Ruta |
|---|---|
| **Módulo NestJS** | `apps/backend/src/modules/gestion-rutas/gestion-rutas.module.ts` |
| **Responsabilidad** | Módulo de Gestión de Rutas y Horarios |
| **Archivo Principal (Repositorio)** | `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-horario-ruta.repository.ts` |
| **Controlador** | `apps/backend/src/modules/gestion-rutas/presentacion/controllers/horarios-ruta.controller.ts` |
| **Servicio de Aplicación** | `apps/backend/src/modules/gestion-rutas/interfaz/services/horarios-ruta.service.ts` |
| **Contrato (Puerto)** | `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts` |
| **Entidad de Dominio** | `apps/backend/src/modules/gestion-rutas/dominio/entities/horario-ruta.entity.ts` |

---

### ⚙️ Operaciones Implementadas

- **`buscarTodos()`**: Consulta general de la matriz de horarios configurados.
- **`buscarPorId(id)`**: Obtención detallada de un registro específico de horario por su ID.
- **`buscarPorRutaId(rutaId)`**: Consulta filtrada de la programación temporal de una ruta dada.

---

### 🌐 Endpoints HTTP Expuestos

| Método | Endpoint | Nivel de Acceso | Descripción |
|---|---|---|---|
| `GET` | `/api/v1/rutas/:rutaId/horarios` | **Público** | Obtiene la lista de horarios mapeados a una ruta en particular. |
| `GET` | `/api/v1/horarios-ruta` | **Público** | Lista general de todos los horarios de rutas registrados. |
| `GET` | `/api/v1/horarios-ruta/:id` | **Público** | Recupera la información de un horario específico. |

---

## 📌 Sprint 2 — Programación Pública e Integración de Servicios

### 🛠️ Descripción General
El **Sprint 2** se centró en la creación del módulo de **Programación Pública**. Su propósito es ofrecer una capa de lectura unificada/read-model que integre información contextual de rutas, horarios, vehículos asignados y puntos de recolección de residuos para consulta ciudadana/pública sin duplicar la lógica CRUD de los módulos core.

### 🗂️ Estructura de Archivos Asignados

| Elemento | Detalle de Implementación / Ruta |
|---|---|
| **Módulo NestJS** | `apps/backend/src/modules/programacion-publica/programacion-publica.module.ts` |
| **Responsabilidad** | Consultas públicas integradas de la operación del servicio |
| **Servicio de Aplicación** | `apps/backend/src/modules/programacion-publica/interfaz/services/programacion-publica.service.ts` |
| **Controlador Público** | `apps/backend/src/modules/programacion-publica/presentacion/controllers/programacion-publica.controller.ts` |
| **DTO de Respuesta** | `apps/backend/src/modules/programacion-publica/interfaz/dto/programacion-publica.dto.ts` |

---

### 📋 Métodos del Servicio y Cobertura de Endpoints

| Método | Responsabilidad y Lógica | Endpoint Asociado |
|---|---|---|
| `buscarProgramacionDelDia()` | Recupera las asignaciones e iteraciones operativas vigentes para la fecha actual. | `GET /api/v1/programacion/hoy` |
| `buscarProgramacionPorRuta()` | Consulta la programación activa de una ruta específica. | `GET /api/v1/programacion/rutas/:rutaId` |
| `buscarDetalleDeRuta()` | Vista consolidada que integra datos de la ruta, sus horarios, vehículos y puntos de recolección. | `GET /api/v1/programacion/rutas/:rutaId/detalle` |
| `buscarHorariosPorRuta()` | Filtra únicamente los bloques de horarios asociados a una ruta. | `GET /api/v1/programacion/rutas/:rutaId/horarios` |
| `buscarVehiculosPorRuta()` | Mapea las unidades vehiculares asignadas a una ruta. | `GET /api/v1/programacion/rutas/:rutaId/vehiculos` |
| `buscarPuntosPorRuta()` | Devuelve los puntos geográficos de recolección respetando la secuencia/orden de recorrido. | `GET /api/v1/programacion/rutas/:rutaId/puntos` |

---

### 🔗 Mapeo de Dependencias (Puertos / Repositorios)

Para no alterar las reglas de negocio base ni duplicar persistencia, el servicio de **Programación Pública** orquesta consultas sobre los siguientes repositorios:

1. **Rutas:** `apps/backend/src/modules/gestion-rutas/repositorio/ruta.repository.ts`
2. **Horarios:** `apps/backend/src/modules/gestion-rutas/repositorio/horario-ruta.repository.ts`
3. **Vehículos:** `apps/backend/src/modules/gestion-rutas/repositorio/vehiculo.repository.ts`
4. **Puntos de Recolección:** `apps/backend/src/modules/puntos-recoleccion/repositorio/punto-recoleccion.repository.ts`
5. **Asignaciones Operativas:** `apps/backend/src/modules/asignaciones/repositorio/asignacion-operativa.repository.ts`