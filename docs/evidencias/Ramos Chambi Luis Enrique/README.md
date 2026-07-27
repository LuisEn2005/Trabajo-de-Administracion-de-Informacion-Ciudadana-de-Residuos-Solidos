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
