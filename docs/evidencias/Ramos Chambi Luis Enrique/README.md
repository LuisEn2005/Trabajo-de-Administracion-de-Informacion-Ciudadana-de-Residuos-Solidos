## Documentación de Cambios — Repositorio de Vehículos (Prisma)

**Archivo modificado:** `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-vehiculo.repository.ts`

### Resumen de Implementación

Se implementó la clase `PrismaVehiculoRepository` adaptando el contrato `VehiculoRepository` para la persistencia de datos de la entidad **Vehículo** utilizando **Prisma ORM**. Esta capa se encarga de la traducción entre los modelos de la base de datos (`VehiculoPrisma`) y las entidades del dominio (`Vehiculo`).

---

### Métodos Implementados

* **`crear(datos: CrearVehiculoDatos)`**
  * Registra un nuevo vehículo en la base de datos (placa, carrocería, ruta asociada y estado activo).
  * Devuelve la entidad de dominio mapeada.
  * Maneja excepciones de restricción única (`P2002`).

* **`buscarTodos()`**
  * Recupera el listado completo de vehículos ordenados por ID de forma ascendente.

* **`buscarPorId(id: number)`**
  * Busca un vehículo por su identificador único. Retorna `null` si no existe.

* **`buscarPorRutaId(rutaId: number)`**
  * Filtra y retorna los vehículos asignados a una ruta específica.

* **`actualizar(id: number, datos: ActualizarVehiculoDatos)`**
  * Realiza una actualización parcial (*patch*) de las propiedades del vehículo.
  * Captura errores de registro no encontrado (`P2025`) o duplicidad de placa (`P2002`).

* **`eliminar(id: number)`**
  * Elimina el registro del vehículo por su ID.

---

### Mapeo de Entidades y Manejo de Errores

1. **Mapeo al Dominio (`toDomain`)**:
   * Convierte el objeto devuelto por Prisma a una instancia pura del dominio (`Vehiculo`), asegurando el *casting* del enum `TipoCarroceria` y asignando metadatos como `createdAt` y `updatedAt`.

2. **Traducción de Errores de Prisma (`traducirErrorPrisma`)**:
   * Encapsula los códigos de error conocidos de Prisma para evitar acoplar la capa de aplicación con el ORM:
     * **`P2002` (Unique Constraint)** → Mapeado a `ConflictError` (*"Ya existe un vehículo con placa..."*).
     * **`P2025` (Record Not Found)** → Mapeado a `NotFoundError` (*"No se encontró vehículo..."*).

# Módulo de Gestión de Rutas - Sprint 2: Gestión de Puntos de Recolección

Este documento detalla la arquitectura, estructura de archivos y endpoints API implementados en el **Sprint 2** dentro del módulo de `gestion-rutas` (`apps/backend/src/modules/gestion-rutas`).

---

## Arquitectura Aplicada

Se implementó una **Arquitectura Hexagonal (Puertos y Adaptadores) con principios DDD (Domain-Driven Design)** para mantener una separación clara de responsabilidades:

1. **Dominio (`dominio/`):** Contiene la entidad pura `PuntoRecoleccionEntity` con la representación de negocio.
2. **Interfaz (`interfaz/`):** 
   - **DTOs (`dto/`):** Objetos de transferencia de datos con validaciones utilizando `class-validator` y `@nestjs/mapped-types`.
   - **Servicios (`services/`):** Contiene los casos de uso y lógica de negocio (`PuntosRecoleccionService`).
3. **Repositorio (`repositorio/`):** 
   - **Puertos:** Interfaz abstracta `PuntoRecoleccionRepository` y token `PUNTO_RECOLECCION_REPOSITORY`.
   - **Adaptadores (`prisma/`):** Implementación concreta con Prisma ORM (`PrismaPuntoRecoleccionRepository`) que mapea tipos `Decimal` a `number`.
4. **Presentación (`presentacion/`):** Controladores NestJS (`PuntosRecoleccionController`) que exponen la API REST.

---

## Estructura de Archivos Creados / Actualizados

```text
apps/backend/src/modules/gestion-rutas/
├── dominio/
│   └── entities/
│       └── punto-recoleccion.entity.ts         # Entidad de dominio PuntoRecoleccionEntity
├── interfaz/
│   ├── dto/
│   │   ├── crear-punto-recoleccion.dto.ts      # DTO para la creación de puntos
│   │   └── actualizar-punto-recoleccion.dto.ts # DTOs para actualización parcial y cambio de estado
│   └── services/
│       └── puntos-recoleccion.service.ts       # Servicio de casos de uso (PuntosRecoleccionService)
├── presentacion/
│   └── controllers/
│       └── puntos-recoleccion.controller.ts    # Controlador REST (PuntosRecoleccionController)
├── repositorio/
│   ├── punto-recoleccion.repository.ts         # Interfaz puerto PuntoRecoleccionRepository
│   └── prisma/
│       └── prisma-punto-recoleccion.repository.ts # Adaptador de Prisma (PrismaPuntoRecoleccionRepository)
└── gestion-rutas.module.ts                     # Registro de controladores, servicios y proveedores
```

---

## Métodos e Implementaciones Realizadas

| Método | Ubicación / Capa | Descripción |
| :--- | :--- | :--- |
| `crear(dto)` | Service / Repository | Crea un nuevo punto de recolección en la base de datos PostgreSQL. |
| `buscarTodos()` | Service / Repository | Retorna el listado completo de puntos de recolección (Público). |
| `buscarPorId(id)` | Service / Repository | Busca un punto por su ID. Lanza `NotFoundException` si no existe (Público). |
| `actualizar(id, dto)` | Service / Repository | Actualiza parcialmente los datos de un punto de recolección existente. |
| `eliminar(id)` | Service / Repository | Elimina permanentemente un punto de recolección por su ID. |
| `cambiarEstado(id, estado)` | Service / Repository | Actualiza el estado operativo (`ACTIVO`, `INACTIVO`, `MANTENIMIENTO`). |
| `mapearPunto(punto)` | Prisma Repository | Convierte las coordenadas `Decimal` de Prisma a `number` JS. |

---

## Endpoints de la API REST

Ruta base: `/api/puntos-recoleccion`

### Endpoints Públicos

#### 1. Obtener todos los puntos de recolección
- **Método:** `GET`
- **Ruta:** `/puntos-recoleccion`
- **Respuesta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "nombre": "Punto Parque Central",
      "direccion": "Av. Principal 123",
      "referencia": "Frente al quiosco de periódicos",
      "latitud": -12.046374,
      "longitud": -77.042793,
      "estado": "ACTIVO",
      "createdAt": "2026-07-27T00:00:00.000Z",
      "updatedAt": "2026-07-27T00:00:00.000Z"
    }
  ]
  ```

#### 2. Obtener punto de recolección por ID
- **Método:** `GET`
- **Ruta:** `/puntos-recoleccion/:id`
- **Respuesta (200 OK):** Objeto con la entidad del punto seleccionado.
- **Respuesta (404 Not Found):** Si el ID no existe.

---

### Endpoints Protegidos (Requieren Autenticación / Bearer Token)

#### 3. Crear un punto de recolección
- **Método:** `POST`
- **Ruta:** `/puntos-recoleccion`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body:**
  ```json
  {
    "nombre": "Punto Parque Central",
    "direccion": "Av. Principal 123",
    "referencia": "Frente al quiosco de periódicos",
    "latitud": -12.046374,
    "longitud": -77.042793,
    "estado": "ACTIVO"
  }
  ```

#### 4. Actualizar un punto de recolección
- **Método:** `PATCH`
- **Ruta:** `/puntos-recoleccion/:id`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body:**
  ```json
  {
    "nombre": "Punto Parque Central - Editado",
    "referencia": "A dos cuadras del mercado"
  }
  ```

#### 5. Cambiar estado de un punto de recolección
- **Método:** `PATCH`
- **Ruta:** `/puntos-recoleccion/:id/estado`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body:**
  ```json
  {
    "estado": "MANTENIMIENTO"
  }
  ```

#### 6. Eliminar un punto de recolección
- **Método:** `DELETE`
- **Ruta:** `/puntos-recoleccion/:id`
- **Headers:** `Authorization: Bearer <TOKEN>`

---

## Dependencias Requeridas
Asegurarse de contar con la librería `@nestjs/mapped-types` instalada para el funcionamiento de `PartialType`:

```bash
npm install --save @nestjs/mapped-types