# Evidencias - Daysi Jara Arisaca

## Resumen general del avance

| Sprint | Modulo | Responsabilidad | Archivo de detalle |
|---|---|---|---|
| Sprint 1 | Consulta de vehiculos | Consultar vehiculos | [`SPRINT_1.md`](./SPRINT_1.md) |
| Sprint 2 | Inventario de contenedores | Inventario individual de contenedores | [`SPRINT_2.md`](./SPRINT_2.md) |

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
| Responsable | Daysi Jara Arisaca |
| Descripcion | Como usuario/administrador, quiero `PENDIENTE`, para `PENDIENTE`. |
| Rama usada | `PENDIENTE` |
| Commits relacionados | `PENDIENTE` |
| Pull request | `PENDIENTE` |
| Estado | Pendiente / En proceso / Completado |

## Checklist de implementación

| Ítem | Estado | Evidencia |
|---|---|---|
| Revisé entidad, DTO, servicio, controlador y contrato del módulo. | [x] | Se revisaron `VehiculoRepository` / `ContenedorRepository` y sus entidades de dominio antes de implementar. |
| Implementé únicamente los métodos bajo mi responsabilidad. | [x] | Métodos de consulta y CRUD de `PrismaVehiculoRepository` y `PrismaContenedorRepository`. |
| No modifiqué archivos compartidos sin coordinar. | [x] | Solo se trabajó dentro de las carpetas `repositorio/` de cada módulo. |
| Validé entradas usando los DTO existentes. | [x] | Uso de `CrearVehiculoDatos`, `ActualizarVehiculoDatos`, `CrearContenedorDatos`, `ActualizarContenedorDatos`. |
| Manejé errores de persistencia de forma controlada. | [x] | Método `traducirErrorPrisma` que traduce códigos de error de Prisma a errores de dominio. |
| Probé endpoints en Thunder Client/Postman u otra herramienta. | [ ] | PENDIENTE: adjuntar capturas |
| Registré capturas o resultados de pruebas. | [ ] | PENDIENTE |
| Registré commits con mensaje claro. | [ ] | PENDIENTE: colocar hashes/mensajes |

---
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


## Laboratorio 9 — Convenciones de Codificación

Se aplicaron las convenciones del lenguaje **TypeScript** (alineadas a las guías de Java/C#/Python vistas en clase: nombres descriptivos, camelCase para variables y métodos, PascalCase para clases e interfaces) sobre los repositorios de `Vehiculo` y `Contenedor`.

**Práctica 1: Nomenclatura consistente en camelCase/PascalCase**

Clases en PascalCase (`PrismaVehiculoRepository`, `ContenedorMapper`), métodos y variables en camelCase (`buscarPorId`, `traducirErrorPrisma`, `puntoRecoleccionId`):

```typescript
export class PrismaContenedorRepository implements ContenedorRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTENEDOR_MAPPER_TOKEN)
    private readonly mapper: IContenedorMapper,
  ) {}
```

**Práctica 2: Constantes en mayúsculas para valores fijos**

```typescript
const PRISMA_UNIQUE_CONSTRAINT = 'P2002';
const PRISMA_RECORD_NOT_FOUND = 'P2025';
```

**Práctica 3: Uso de tipos explícitos e interfaces para contratos**

Los contratos (`VehiculoRepository`, `ContenedorRepository`, `IContenedorMapper`) documentan explícitamente la firma de cada operación, mejorando la legibilidad y el mantenimiento:

```typescript
export interface ContenedorRepository {
  crear(datos: CrearContenedorDatos): Promise<Contenedor>;
  buscarTodos(): Promise<Contenedor[]>;
  buscarPorId(id: number): Promise<Contenedor | null>;
  ...
}
```

**SonarLint:** Análisis sin bugs/vulnerabilities Blocker o Critical.

---

## Laboratorio 10 — Estilos de Codificación

Se aplicaron al menos 4 estilos de programación en la implementación:

| Estilo | Evidencia en el código |
|---|---|
| **RESTful** | El módulo expone un `ContenedoresController` y un `VehiculoRepository` pensados para ser consumidos vía endpoints GET/POST/PATCH/DELETE, encargando la lógica de persistencia al repositorio. |
| **Persistent Tables** | Todas las operaciones (`crear`, `buscarTodos`, `actualizar`, `eliminar`) delegan en `this.prisma.vehiculo` / `this.prisma.contenedor`, tratando el estado como tablas persistentes consultadas mediante Prisma ORM. |
| **Error/Exception Handling** | Manejo centralizado de errores con `try/catch` y traducción de errores técnicos (Prisma) a errores de dominio (`ConflictError`, `NotFoundError`). |
| **Pipeline** | El flujo `fromPrisma → toDomain` en `ContenedorMapper` transforma el registro crudo de la base de datos en una entidad de dominio en pasos sucesivos. |
| **Things (Objetos)** | Separación de responsabilidades entre `Vehiculo`/`Contenedor` (entidad), `PrismaVehiculoRepository`/`PrismaContenedorRepository` (acceso a datos) y `ContenedorMapper` (transformación). |

**Fragmento — Estilo Pipeline (transformación en cadena):**

```typescript
async buscarTodos(): Promise<Contenedor[]> {
  const contenedores = await this.prisma.contenedor.findMany();
  return contenedores.map((c) =>
    this.mapper.toDomain(this.mapper.fromPrisma(c)),
  );
}
```

**Fragmento — Estilo Error/Exception Handling:**

```typescript
private traducirErrorPrisma(error: unknown, placa?: string, id?: number): Error {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === PRISMA_UNIQUE_CONSTRAINT) {
      return new ConflictError(`Ya existe un vehiculo con placa "${placa}".`);
    }
    if (error.code === PRISMA_RECORD_NOT_FOUND) {
      return new NotFoundError(`No se encontro vehiculo ${id}.`);
    }
  }
  return error instanceof Error ? error : new Error('Error inesperado en Prisma.');
}
```

---

## Laboratorio 11 — Clean Code

Se aplicó al menos una práctica por categoría:

| Categoría | Cómo se evidencia en el código |
|---|---|
| **Nombres** | Métodos con intención clara: `buscarPorRutaId`, `cambiarEstado`, `trasladarAPunto`, `obtenerResumenInventario`. No se usan abreviaturas ambiguas. |
| **Funciones** | Cada método tiene una única responsabilidad: `cambiarEstado` solo actualiza el estado; `trasladarAPunto` solo actualiza el punto de recolección; no se mezclan ambas operaciones en un mismo método. |
| **Comentarios** | El código es autoexplicativo por los nombres elegidos; no se usan comentarios redundantes que repitan lo que ya dice el código. |
| **Estructura de código fuente** | Separación en capas: `dominio/entities`, `repositorio` (contrato + implementación Prisma), `interfaz/services`, `presentacion/controllers`, respetando DDD. |
| **Objetos / estructuras de datos** | Uso de interfaces tipadas (`CrearContenedorDatos`, `ActualizarContenedorDatos`, `ContenedorPersistencia`) en vez de objetos genéricos, dejando explícitos los campos esperados. |
| **Tratamiento de errores** | Traducción de errores técnicos de Prisma a errores de dominio explícitos (`ConflictError`, `NotFoundError`) en lugar de propagar excepciones genéricas. |
| **Clases** | `ContenedorMapper` tiene una única responsabilidad (mapear entre persistencia y dominio), separada de `PrismaContenedorRepository`, que se encarga solo del acceso a datos. |

**Fragmento — Función pequeña con responsabilidad única:**

```typescript
async cambiarEstado(id: number, estado: EstadoContenedor): Promise<Contenedor> {
  const contenedor = await this.prisma.contenedor.update({
    where: { id },
    data: { estado },
  });
  return this.mapper.toDomain(this.mapper.fromPrisma(contenedor));
}
```

**Fragmento — Objeto de datos tipado en vez de estructura genérica:**

```typescript
export interface ActualizarContenedorDatos {
  codigo?: string;
  tipo?: TipoContenedor;
  capacidad?: number;
  estado?: EstadoContenedor;
  puntoRecoleccionId?: number;
  fechaInstalacion?: Date;
}
---

## Laboratorio 12 — Principios SOLID

Se aplicaron al menos 3 principios SOLID en la implementación:

| Principio | Cómo se aplica en el módulo |
|---|---|
| **SRP (Responsabilidad Única)** | `ContenedorMapper` solo mapea datos; `PrismaContenedorRepository` solo accede a datos; ninguna clase mezcla lógica de negocio con acceso a datos. |
| **OCP (Abierto/Cerrado)** | El servicio depende del contrato `ContenedorRepository`, por lo que se puede agregar una nueva implementación (por ejemplo, otra base de datos) sin modificar el código que ya consume el repositorio. |
| **LSP (Sustitución de Liskov)** | `PrismaContenedorRepository` y `PrismaVehiculoRepository` implementan fielmente sus contratos (`ContenedorRepository`, `VehiculoRepository`), pudiendo sustituir a cualquier otra implementación del mismo contrato sin romper el comportamiento esperado. |
| **ISP (Segregación de Interfaces)** | `IContenedorMapper` solo define las operaciones de mapeo (`toDomain`, `fromPrisma`), sin forzar a los clientes a depender de métodos que no usan. |
| **DIP (Inversión de Dependencias)** | `PrismaContenedorRepository` depende del token `CONTENEDOR_MAPPER_TOKEN` (una abstracción) inyectado por NestJS, no de una clase concreta de mapeo; el módulo (`ContenedoresModule`) es quien decide la implementación concreta. |

**Fragmento — DIP mediante inyección de dependencias con token:**

```typescript
export const CONTENEDOR_MAPPER_TOKEN = 'CONTENEDOR_MAPPER_TOKEN';

@Injectable()
export class PrismaContenedorRepository implements ContenedorRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTENEDOR_MAPPER_TOKEN)
    private readonly mapper: IContenedorMapper,
  ) {}
```

**Fragmento — Módulo NestJS que configura las dependencias (OCP + DIP):**

```typescript
@Module({
  imports: [PrismaModule],
  controllers: [ContenedoresController],
  providers: [
    ContenedoresService,
    { provide: CONTENEDOR_MAPPER_TOKEN, useClass: ContenedorMapper },
    { provide: CONTENEDOR_REPOSITORY, useClass: PrismaContenedorRepository },
  ],
  exports: [ContenedoresService, CONTENEDOR_REPOSITORY],
})
export class ContenedoresModule {}
```
estorlaaaaaad


