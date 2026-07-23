# Evidencias de trabajo — Juan Postigo

## Información general

- **Nombre:** Juan Postigo.
- **Módulo asignado:** Gestión de rutas.
- **Responsabilidad:** documentación de estilos de programación aplicados al CRUD de rutas.
- **Archivo principal analizado:** `apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts`.

---

## Laboratorio 10 — estilos de programación

> Pendiente: incorporar el enunciado o rúbrica oficial del Laboratorio 10. En el repositorio no encontré documentos, PDF, imágenes o rúbricas específicas para confirmar el nombre oficial del laboratorio.

### 1. Objetivo del laboratorio

En esta sección documento estilos de programación identificables en mi implementación del CRUD de rutas. El análisis se basa en fragmentos reales del repositorio y evita atribuir estilos que no se puedan comprobar con el código disponible.

### 2. Estilos de programación aplicados

#### Persistent-Tables

**Explicación aplicada al proyecto:** Prisma consulta datos persistentes asociados al modelo `Ruta`. La operación se expresa de forma declarativa mediante `findMany()` y se ordena por el campo `numero`.

```ts
const rutas = await this.prisma.ruta.findMany({
  orderBy: {
    numero: 'asc',
  },
});
```

**Relación con el estilo:** el método trabaja con datos persistidos en la tabla `rutas`, representada en Prisma mediante el modelo `Ruta`.

#### Error/Exception Handling

**Explicación aplicada al proyecto:** las operaciones del repositorio se ejecutan dentro de bloques `try-catch`. Cuando Prisma genera un error, este se deriva a `manejarErrorPrisma()`.

```ts
try {
  const ruta = await this.prisma.ruta.update({
    where: {
      id,
    },
    data: {
      numero: datos.numero,
      nombre: datos.nombre,
      descripcionCobertura: datos.descripcionCobertura,
      activa: datos.activa,
    },
  });

  return this.mapearRuta(ruta);
} catch (error) {
  manejarErrorPrisma(error, 'actualizar la ruta');
}
```

El manejador centralizado reconoce errores conocidos de Prisma y los transforma en `ErrorPersistencia`.

```ts
export function manejarErrorPrisma(error: unknown, operacion: string): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new ErrorPersistencia(
      obtenerMensajeErrorConocido(error, operacion),
      obtenerCodigoErrorConocido(error),
      error,
    );
  }

  throw new ErrorPersistencia(
    `No se pudo ${operacion}.`,
    CodigoErrorPersistencia.ERROR_DESCONOCIDO,
    error,
  );
}
```

**Relación con el estilo:** el flujo separa la operación principal del tratamiento de excepciones.

#### Pipeline

**Explicación aplicada al proyecto:** después de consultar las rutas, se aplica una transformación sobre la colección para convertir cada registro de Prisma en una entidad de dominio.

```ts
return rutas.map((ruta) => this.mapearRuta(ruta));
```

**Relación con el estilo:** el flujo es una tubería breve: registro de Prisma → transformación con `map()` → entidad de dominio `Ruta`. No es una tubería extensa, pero sí muestra una secuencia clara de transformación.

#### Things

**Explicación aplicada al proyecto:** el comportamiento se distribuye entre objetos con responsabilidades específicas.

`PrismaRutaRepository` encapsula la persistencia de rutas:

```ts
export class PrismaRutaRepository implements RutaRepository {
  constructor(private readonly prisma: PrismaService) {}
}
```

`RutaRepository` define el contrato:

```ts
export interface RutaRepository {
  crear(datos: CrearRutaDatos): Promise<Ruta>;
  buscarTodos(): Promise<Ruta[]>;
  buscarPorId(id: number): Promise<Ruta | null>;
  actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>;
  eliminar(id: number): Promise<void>;
}
```

`Ruta` representa el dominio:

```ts
export class Ruta {
  constructor(
    public readonly id: number,
    public readonly props: RutaProps,
  ) {}
}
```

**Relación con el estilo:** los datos y comportamientos están organizados en objetos con responsabilidades diferenciadas: persistencia, contrato y entidad de dominio.

#### RESTful

**Explicación aplicada al proyecto:** el controlador de rutas expone operaciones HTTP para crear, consultar, actualizar y eliminar rutas.

```ts
@Controller('v1/rutas')
export class RutasController {
  @Post()
  crear(@Body() dto: CrearRutaDto) {
    return this.rutasService.crear(dto);
  }

  @Get()
  buscarTodos() {
    return this.rutasService.buscarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.buscarPorId(id);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarRutaDto) {
    return this.rutasService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.eliminar(id);
  }
}
```

**Relación con el estilo:** las operaciones del recurso rutas se expresan mediante métodos HTTP y rutas del controlador.

No encontré evidencia suficiente para atribuir los estilos Cookbook, Lazy-Rivers o Trinity.

### 3. Tabla resumen de estilos

| Estilo | Archivo o método | Evidencia | Aplicación |
|---|---|---|---|
| Persistent-Tables | `PrismaRutaRepository.buscarTodos()` | `findMany()` | Consulta datos persistentes de rutas. |
| Error/Exception Handling | Métodos CRUD de `PrismaRutaRepository` | `try-catch` y `manejarErrorPrisma()` | Captura y traduce errores de Prisma. |
| Pipeline | `PrismaRutaRepository.buscarTodos()` | `map()` y `mapearRuta()` | Transforma registros de Prisma en entidades `Ruta`. |
| Things | `PrismaRutaRepository`, `RutaRepository`, `Ruta` | Clase, contrato y entidad | Distribuye responsabilidades entre objetos. |
| RESTful | `RutasController` | `@Post()`, `@Get()`, `@Patch()`, `@Delete()` | Expone operaciones HTTP para el recurso rutas. |

### 4. Relación con la arquitectura del proyecto

La implementación se relaciona con las capas enseñadas en clase en este orden:

**Repositorios → Dominio → Interfaz → Presentación**

- **Repositorios:** `PrismaRutaRepository` implementa el acceso a datos y cumple el contrato `RutaRepository`.
- **Dominio:** `Ruta` representa la entidad usada por el módulo de gestión de rutas.
- **Interfaz:** `RutasService` coordina los casos de uso y depende del contrato `RutaRepository`.
- **Presentación:** `RutasController` expone los endpoints HTTP del recurso rutas.

`PrismaRutaRepository` se ubica en la parte de repositorios y convierte los datos obtenidos mediante Prisma hacia la entidad `Ruta` del dominio.

### 5. Evidencias

No encontré imágenes dentro de la carpeta `docs/evidencias/Postigo Cabana Juan Carlos`.

Pendientes:

- Pendiente: agregar captura de SonarLint.
- Pendiente: agregar captura de pruebas manuales del endpoint `GET /api/v1/rutas`.
- Pendiente: agregar captura de pruebas manuales de creación, actualización y eliminación de rutas.
- Pendiente: agregar evidencia visual del análisis de estilos de programación, si el laboratorio lo solicita.

Cuando se agreguen imágenes, deben enlazarse con rutas relativas desde este README, por ejemplo:

```md
![Análisis del método buscarTodos](./imagenes/calidad-codigo-buscar-todos.jpg)
```

### 6. Resultado del laboratorio 10

En este avance identifiqué estilos de programación aplicados en una implementación real del CRUD de rutas. El código muestra consulta persistente, manejo de excepciones, transformación de datos, organización por objetos y exposición REST del recurso rutas.

---

---

## Estado del Laboratorio 10

| Evidencia o actividad | Estado | Observación |
|---|---|---|
| Cuatro estilos documentados | Completado | Se documentaron Persistent-Tables, Error/Exception Handling, Pipeline y Things. |
| Estilo RESTful adicional | Completado | Se documentó usando decoradores reales de `RutasController`. |
| Relación con arquitectura del proyecto | Completado | Se usó el orden Repositorios → Dominio → Interfaz → Presentación. |
| Evidencias visuales | Pendiente | No encontré imágenes dentro de la carpeta de Juan Postigo. |
| Pruebas | Pendiente | No encontré pruebas automatizadas ni capturas de pruebas manuales guardadas. |
