# Evidencias de trabajo — Juan Postigo

## Información general

- **Nombre:** Juan Postigo.
- **Módulo asignado:** Gestión de rutas.
- **Responsabilidad:** implementación del CRUD de rutas.
- **Archivo principal trabajado:** `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts`.

`PrismaRutaRepository` es la implementación del contrato `RutaRepository` usando Prisma. Su responsabilidad es acceder a la base de datos para crear, consultar, actualizar y eliminar rutas, y devolver entidades de dominio `Ruta` al resto del módulo.

Avance realizado:

- Implementé `crear`.
- Implementé `buscarTodos`.
- Implementé `buscarPorId`.
- Implementé `actualizar`.
- Implementé `eliminar`.
- Implementé el mapeo entre registros de Prisma y la entidad de dominio `Ruta` mediante `mapearRuta()`.
- Apliqué manejo centralizado de errores de Prisma usando `manejarErrorPrisma()`.

Prisma devuelve objetos asociados al modelo de persistencia. Para no exponer esos objetos directamente como dominio, `mapearRuta()` transforma cada registro en una instancia de la entidad `Ruta`.

Ejemplo inicial del método `buscarTodos()`:

```ts
async buscarTodos(): Promise<Ruta[]> {
  try {
    const rutas = await this.prisma.ruta.findMany({
      orderBy: {
        numero: 'asc',
      },
    });

    return rutas.map((ruta) => this.mapearRuta(ruta));
  } catch (error) {
    manejarErrorPrisma(error, 'buscar todas las rutas');
  }
}
```

Flujo del método:

1. Se consultan las rutas mediante Prisma.
2. Se ordenan ascendentemente por número.
3. Cada registro se transforma en una entidad `Ruta`.
4. Los errores se derivan al manejador centralizado.

---

---

## Laboratorio 9 — análisis de calidad y diseño de código

> Pendiente: incorporar el enunciado o rúbrica oficial del Laboratorio 9. En el repositorio no encontré documentos, PDF, imágenes o rúbricas específicas para confirmar el nombre oficial del laboratorio.

### 1. Objetivo del laboratorio

En esta sección documento el análisis de calidad y diseño aplicado a mi implementación del CRUD de rutas. El objetivo fue revisar si el código tiene responsabilidades claras, nombres entendibles, separación entre persistencia y dominio, tipado explícito y manejo de errores centralizado.

### 2. Código analizado o implementado

El archivo principal analizado fue:

```txt
apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts
```

Operaciones implementadas en el CRUD de rutas:

- `crear(datos: CrearRutaDatos): Promise<Ruta>`
- `buscarTodos(): Promise<Ruta[]>`
- `buscarPorId(id: number): Promise<Ruta | null>`
- `actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>`
- `eliminar(id: number): Promise<void>`

Fragmento de creación de ruta:

```ts
const ruta = await this.prisma.ruta.create({
  data: {
    numero: datos.numero,
    nombre: datos.nombre,
    descripcionCobertura: datos.descripcionCobertura,
    activa: datos.activa,
  },
});

return this.mapearRuta(ruta);
```

Fragmento de búsqueda por id:

```ts
const ruta = await this.prisma.ruta.findUnique({
  where: {
    id,
  },
});

return ruta ? this.mapearRuta(ruta) : null;
```

### 3. Calidad del código

#### Nombres significativos

Los nombres de los métodos expresan directamente la operación que realizan dentro del CRUD.

```ts
async crear(datos: CrearRutaDatos): Promise<Ruta>
async buscarTodos(): Promise<Ruta[]>
async buscarPorId(id: number): Promise<Ruta | null>
async actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>
async eliminar(id: number): Promise<void>
```

#### Funciones pequeñas

Cada método realiza una operación principal contra Prisma y delega la transformación al método `mapearRuta()`.

```ts
return rutas.map((ruta) => this.mapearRuta(ruta));
```

#### Responsabilidad única

`PrismaRutaRepository` se concentra en la persistencia de rutas. No contiene controladores HTTP ni reglas de presentación.

```ts
export class PrismaRutaRepository implements RutaRepository {
  constructor(private readonly prisma: PrismaService) {}
}
```

#### Tipado explícito

Los métodos declaran tipos de entrada y salida, lo que ayuda a evitar ambigüedad en el contrato del repositorio.

```ts
async actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>
```

#### Encapsulamiento del mapeo

El mapeo de los datos devueltos por Prisma está encapsulado en un método privado.

```ts
private mapearRuta(ruta: {
  id: number;
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Ruta {
  return new Ruta(ruta.id, {
    numero: ruta.numero,
    nombre: ruta.nombre,
    descripcionCobertura: ruta.descripcionCobertura,
    activa: ruta.activa,
    createdAt: ruta.createdAt,
    updatedAt: ruta.updatedAt,
  });
}
```

#### Separación entre persistencia y dominio

El repositorio consulta con Prisma, pero devuelve entidades `Ruta` definidas en la capa de dominio.

```ts
import { Ruta } from '../../dominio/entities/ruta.entity';
```

```ts
return this.mapearRuta(ruta);
```

#### Manejo centralizado de errores

Los métodos del repositorio no construyen respuestas HTTP. En caso de error, delegan a un manejador compartido para errores de Prisma.

```ts
try {
  // Operación con Prisma
} catch (error) {
  manejarErrorPrisma(error, 'actualizar la ruta');
}
```

#### Composición e inyección de dependencias

El repositorio recibe `PrismaService` por constructor. Además, el módulo registra el contrato `RUTA_REPOSITORY` con la implementación `PrismaRutaRepository`.

```ts
constructor(private readonly prisma: PrismaService) {}
```

```ts
{
  provide: RUTA_REPOSITORY,
  useClass: PrismaRutaRepository,
}
```

#### Eliminación de duplicación

La transformación de registros a entidades se concentra en `mapearRuta()`, evitando repetir el mismo mapeo en cada método.

```ts
return this.mapearRuta(ruta);
```

### 4. Principios SOLID aplicados

#### SRP — Single Responsibility Principle

**Explicación:** `PrismaRutaRepository` se ocupa de la persistencia de rutas mediante Prisma.

```ts
export class PrismaRutaRepository implements RutaRepository {
  constructor(private readonly prisma: PrismaService) {}
}
```

**Evaluación:** Cumple.

#### OCP — Open/Closed Principle

**Explicación:** la clase implementa el contrato `RutaRepository`. Otra implementación podría sustituirla sin cambiar el servicio que depende del contrato.

```ts
export interface RutaRepository {
  crear(datos: CrearRutaDatos): Promise<Ruta>;
  buscarTodos(): Promise<Ruta[]>;
  buscarPorId(id: number): Promise<Ruta | null>;
  actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>;
  eliminar(id: number): Promise<void>;
}
```

```ts
export class PrismaRutaRepository implements RutaRepository {
```

**Evaluación:** Cumple.

#### LSP — Liskov Substitution Principle

**Explicación:** `PrismaRutaRepository` respeta los tipos y comportamientos definidos por `RutaRepository`. Los métodos devuelven los tipos prometidos por el contrato.

```ts
async buscarTodos(): Promise<Ruta[]> {
```

```ts
async buscarPorId(id: number): Promise<Ruta | null> {
```

**Evaluación:** Cumple.

#### ISP — Interface Segregation Principle

**Explicación:** el contrato `RutaRepository` agrupa operaciones relacionadas únicamente con rutas. No obliga a implementar operaciones de vehículos u horarios.

```ts
export interface RutaRepository {
  crear(datos: CrearRutaDatos): Promise<Ruta>;
  buscarTodos(): Promise<Ruta[]>;
  buscarPorId(id: number): Promise<Ruta | null>;
  actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>;
  eliminar(id: number): Promise<void>;
}
```

**Evaluación:** Cumple.

#### DIP — Dependency Inversion Principle

**Explicación:** el servicio de rutas depende del contrato `RutaRepository`, no directamente de `PrismaRutaRepository`. La configuración del módulo decide qué implementación concreta se usa.

```ts
constructor(
  @Inject(RUTA_REPOSITORY)
  private readonly rutaRepository: RutaRepository,
) {}
```

```ts
{
  provide: RUTA_REPOSITORY,
  useClass: PrismaRutaRepository,
}
```

**Evaluación:** Cumple.

### 5. Análisis con SonarLint

No encontré evidencias guardadas de SonarLint dentro del repositorio, ni capturas en la carpeta de evidencias de Juan Postigo.

- Bugs detectados: pendiente de evidenciar.
- Code smells detectados: pendiente de evidenciar.
- Vulnerabilidades detectadas: pendiente de evidenciar.
- Correcciones realizadas a partir de SonarLint: pendiente de evidenciar.
- Resultado posterior a correcciones: pendiente de evidenciar.

> Pendiente: incorporar la captura del análisis de SonarLint antes o después de las correcciones.

### 6. Mejoras realizadas o propuestas

#### Mejoras implementadas

- Implementé el CRUD completo de rutas en `PrismaRutaRepository`.
- Apliqué `mapearRuta()` para separar los registros de Prisma de la entidad de dominio.
- Reutilicé `manejarErrorPrisma()` para centralizar el tratamiento de errores de base de datos.
- Mantuve el repositorio sin respuestas HTTP directas.
- Se agregó manejo de `NotFoundError` en el servicio para búsquedas por id sin resultado.

#### Recomendaciones pendientes

- Usar un tipo generado por Prisma para el parámetro de `mapearRuta()` si el equipo decide hacerlo.
- Agregar pruebas unitarias para el repositorio y el servicio de rutas.
- Agregar paginación futura en `buscarTodos()` si aumenta la cantidad de rutas.
- Incorporar capturas reales de SonarLint.
- Documentar pruebas manuales con Thunder Client o una herramienta equivalente.

### 7. Resultado del laboratorio 9

En este avance apliqué criterios de calidad de código sobre una implementación real del CRUD de rutas. Separé la consulta con Prisma del modelo de dominio, reduje duplicación mediante `mapearRuta()` y dejé el manejo de errores en una función reutilizable.

---

---

## Estado del Laboratorio 9

| Evidencia o actividad | Estado | Observación |
|---|---|---|
| CRUD de rutas | Completado | Se comprobó en `PrismaRutaRepository` con `crear`, `buscarTodos`, `buscarPorId`, `actualizar` y `eliminar`. |
| Mapeo a entidad de dominio | Completado | Se comprobó mediante `mapearRuta()`. |
| Manejo de errores | Completado | Se comprobó el uso de `manejarErrorPrisma()` y filtros compartidos para errores. |
| Análisis de calidad | Completado parcialmente | Se documentó con fragmentos reales; falta evidencia externa como capturas de SonarLint. |
| Evidencias de SonarLint | Pendiente | No encontré capturas ni resultados guardados en el repositorio. |
| Pruebas | Pendiente | No encontré pruebas automatizadas ni capturas de pruebas manuales guardadas. |
