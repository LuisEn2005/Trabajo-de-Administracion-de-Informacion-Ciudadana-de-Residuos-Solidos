# Evidencias de trabajo — Juan Postigo

# Laboratorio 11 — Calidad y codificación legible en el proyecto final

## 1. Objetivo

En este laboratorio documenté prácticas de codificación legible aplicadas en mi avance del Sprint 1 para el módulo **Gestión de rutas** de EnrutApp. Mi responsabilidad fue implementar el CRUD de rutas en el repositorio Prisma.

Archivo principal trabajado:

```txt
apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts
```

## 2. Prácticas aplicadas

### 2.1 Nombres

**Práctica:** usé nombres descriptivos para que cada método indique claramente su intención dentro del CRUD.

```ts
async crear(datos: CrearRutaDatos): Promise<Ruta>
async buscarTodos(): Promise<Ruta[]>
async buscarPorId(id: number): Promise<Ruta | null>
async actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>
async eliminar(id: number): Promise<void>
```

### 2.2 Funciones

**Práctica:** mantuve funciones con una responsabilidad principal. Por ejemplo, `buscarTodos()` consulta rutas, las ordena y delega el mapeo a otro método.

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

### 2.3 Comentarios

**Práctica:** evité comentarios innecesarios en el repositorio. El código expresa la intención mediante nombres claros y tipos explícitos.

```ts
return rutas.map((ruta) => this.mapearRuta(ruta));
```

Este fragmento no necesita un comentario adicional porque indica directamente que cada registro se transforma mediante `mapearRuta()`.

### 2.4 Estructura de código fuente

**Práctica:** ubiqué la implementación en la capa correspondiente del módulo.

```txt
apps/backend/src/modules/gestion-rutas/
├─ repositorio/
├─ dominio/
├─ interfaz/
└─ presentacion/
```

El archivo implementado está en:

```txt
apps/backend/src/modules/gestion-rutas/repositorio/prisma/prisma-ruta.repository.ts
```

### 2.5 Objetos y estructuras de datos

**Práctica:** transformé los registros de Prisma en la entidad de dominio `Ruta` usando `mapearRuta()`.

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

### 2.6 Tratamiento de errores

**Práctica:** centralicé el manejo de errores de Prisma con `manejarErrorPrisma()` para no repetir lógica en cada método.

```ts
try {
  await this.prisma.ruta.delete({
    where: {
      id,
    },
  });
} catch (error) {
  manejarErrorPrisma(error, 'eliminar la ruta');
}
```

El manejador compartido reconoce errores de Prisma como registros inexistentes:

```ts
if (error.code === 'P2025') {
  return CodigoErrorPersistencia.REGISTRO_NO_ENCONTRADO;
}
```

### 2.7 Clases

**Práctica:** mantuve una clase con responsabilidad clara: `PrismaRutaRepository` implementa la persistencia de rutas y cumple el contrato `RutaRepository`.

```ts
@Injectable()
export class PrismaRutaRepository implements RutaRepository {
  constructor(private readonly prisma: PrismaService) {}
}
```

## 3. SonarLint

No encontré capturas ni reportes de SonarLint guardados en el repositorio. Por eso no documento bugs, code smells ni vulnerabilidades como si hubieran sido detectados por la herramienta.

| Evidencia | Estado |
|---|---|
| Bugs detectados por SonarLint | Pendiente |
| Code smells detectados por SonarLint | Pendiente |
| Vulnerabilidades detectadas por SonarLint | Pendiente |
| Captura o reporte de SonarLint | Pendiente |

> Pendiente: agregar captura o reporte real de SonarLint del módulo de gestión de rutas.

## 4. Resultado

Con mi implementación del CRUD de rutas apliqué prácticas de codificación legible en nombres, funciones, comentarios, estructura del código, objetos, manejo de errores y clases. Queda pendiente agregar evidencia real de SonarLint si el laboratorio lo solicita como comprobación externa.