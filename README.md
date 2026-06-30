# Sistema de Gestión de Residuos Sólidos y Participación Ciudadana (PIGARS Arequipa)

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-orange)
![Sprint actual](https://img.shields.io/badge/Sprint-1%20%2F%202-blue)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Limpia%20%2F%20Capas-green)

Este repositorio contiene el diseño arquitectónico y la base de conocimiento para el **Sistema de Gestión de Residuos Sólidos Urbanos**, una solución de ingeniería de software orientada a la provincia de Arequipa y alineada con los lineamientos del **Plan Integral de Gestión Ambiental de Residuos Sólidos (PIGARS)**. El sistema promueve la participación activa de los ciudadanos y optimiza las operaciones logísticas municipales.

---

## 🏗️ Arquitectura del Sistema (Mapeo de Clases e Interfaces)

A partir del modelado formal en StarUML (`Arquitectura en Capas - Basico.mdj`), el sistema se divide estrictamente en cuatro capas bajo los principios de *Domain-Driven Design* (DDD):

### 1. Capa de Presentación (Controllers)
Encargada de exponer los puntos de entrada del sistema para interactuar con los clientes móviles y web.
* **`Reporte Controller`**:
    * `+ CrearReporteIncidencia()`
* **`Ruta Controller`**:
    * `+ ObtenerHorariosyRutas()`
* **`InventarioController`**:
    * `+ NotificarFaltadeInsumos()`
* **`Administración Controller`**: Punto de acceso para la gestión administrativa general.

### 2. Capa de Aplicación (Application Services)
Orquesta el flujo de los casos de uso descritos en los requisitos del backlog, comunicando la presentación con el dominio e infraestructura.
* **`Reporte Application Service`** (Implementa `IReporte Application Service`):
    * `+ registrarReporteCiudadano()`
    * `+ cambiarEstadodeIncidencia()`
* **`Ruta Application Service`** (Implementa `IRuta Application Service`):
    * `+ ActualizarRutaExistente()`
    * `+ ConsultarRutasyHorarios()`
* **`Administración Appllication Service`** (Implementa `IAdministración Appllication Service`):
    * `+ GenerarReporteSemanal()`
    * `+ AsignarEmpleadoAlCamión()`
* **`InventarioApplicationService`** (Implementa `IInventarioApplicationService`):
    * `+ registrarFaltadeHerramientas()`

### 3. Capa de Dominio (Domain)
El núcleo lógico del negocio que encapsula el estado de las entidades e impone las reglas invariantes.

* **Entidades y Objetos de Valor:**
    * `Ciudadano`, `Administrador`, `Empleado Municipal` (Actores).
    * `Reporte`, `Estado Reporte`, `Reporte Herramienta`, `Reporte Semanal`.
    * `Ruta` (`+ CalcularCaminoMinimo()`), `Horario`, `Zona`, `Camion`.
    * `Inventario`, `herramienta`, `Limpieza`.
    * `Asignacion`.
    * `Clasificador Zonas Críticas` (`+ calcularDensidadBasura()`): Lógica core para procesar la severidad geográfica.
    * `Reporte` (`+ validarCoordenadasArequipa()`): Validación espacial estricta dentro del límite provincial.

* **Interfaces de Repositorio (Abstracción de Datos):**
    * `IReporteRepository` (`+ Save()`, `+ FindbyId()`, `+ FindZonasCríticas()`)
    * `IRutaRepository` (`+ getAllRoutes()`, `+ Update()`)
    * `IAsignacionRepository`
    * `IInventarioRepository`

### 4. Capa de Infraestructura (Infrastructure)
Implementación técnica detallada de los adaptadores externos y la persistencia de datos.
* **Persistencia:** `ReporteRepositoryImpl`, `RutaRepositoryImpl`, `AsignacionRepositoryImpl`, `InventarioRepositoryImpl` que interactúan de forma directa mediante la clase central `DatabaseConnection`.
* **Adaptadores de Servicios Externos:**
    * `NotificacionPushAdapter` (`+ EnviarAlertaDispositivo()`): Envío de alertas tempranas sobre la llegada del camión recolector.
    * `MapaGeograficoAdapter` (`+ generarMatrizPixelesCalor()`): Motor encargado del renderizado espacial del mapa de calor de residuos.
    * `AlmacenamientoImagenesAdapter`: Módulo para la persistencia física de evidencias fotográficas de contaminación.

---

## 📊 Planificación Ágil del Backlog (Sprint Mapping)

El desarrollo del sistema está estructurado bajo métricas de estimación en Puntos de Historia (PTS):

### 📅 Sprint 1: Infraestructura Base, Reportes e Insumos (22 PTS)
* **HF.1.1 [Ciudadano]:** Consulta de rutas y horarios mediante `Ruta Controller::ObtenerHorariosyRutas` (5 PTS).
* **HF.1.3 [Administrador]:** CRUD de rutas mediante `Ruta Application Service::ActualizarRutaExistente` (3 PTS).
* **HF.2.1 [Ciudadano]:** Formulario de reporte con captura GPS validado mediante `Reporte::validarCoordenadasArequipa` y guardado mediante `IReporteRepository::Save` (5 PTS).
* **HF.4.1 [Empleado Municipal]:** Reporte de insuficiencia de insumos mediante `InventarioController::NotificarFaltadeInsumos` (3 PTS).
* **HNF.1.1 & HNF.3.1:** Diseño UX sin capacitación previa y módulo de autenticación segura por roles (6 PTS).

### 📅 Sprint 2: Análisis Geoespacial Avanzado (13 PTS)
* **HF.3.1 [Administrador]:** Renderizado automático de densidades críticas mediante `Clasificador Zonas Críticas::calcularDensidadBasura` y `MapaGeograficoAdapter::generarMatrizPixelesCalor` (8 PTS).
* **HF.3.2 [Administrador]:** Asignación interactiva del personal mediante `Administración Appllication Service::AsignarEmpleadoAlCamión` (5 PTS).

---

## 🚧 Estado del Módulo `App`
* **Estructura Backend & Arquitectura UML:** 100% Calibrada e integrada con el modelo StarUML de persistencia, lógica de dominio y contratos de servicios.
* **Sección App (Frontend / Interfaces de Usuario):** ⚠️ **EN CONSTRUCCIÓN**. Las interfaces móviles y la consola web administrativa de cara al usuario final se encuentran en fase de desarrollo e integración con los controladores definidos.

---

## 👥 Integrantes del Equipo (Ciencia de la Computación - UNSA)
* Ramos Chambi Luis Enrique
* Valdez Agüero Ronald Reynaldo
* Llosa Manchego Fernandito
* Postigo Cabana Juan Carlos
* Jara Arisaca Daysi
