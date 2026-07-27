# Sistema de Gestión de Residuos Sólidos y Participación Ciudadana

Proyecto universitario orientado a apoyar la gestión municipal de residuos sólidos y la
participación ciudadana en Arequipa. Este repositorio se está preparando para el
**Laboratorio 8: Implementación de DDD con MVC y ORM**.

> **Estado:** estructura base en construcción. Los frameworks y las capas están configurados,
> pero los casos de uso, la autenticación y los CRUD todavía no están implementados por completo.

## Stack tecnológico

- TypeScript
- Backend REST: NestJS
- ORM: Prisma
- Base de datos: PostgreSQL
- Frontend: React con Vite
- Monorepo: npm workspaces
- Calidad: ESLint y Prettier

## Estructura del monorepo

```text
.
├── apps/
│   ├── backend/                 # API REST con NestJS y Prisma
│   │   ├── prisma/
│   │   └── src/
│   │       ├── modules/        # Bounded contexts organizados con DDD
│   │       └── shared/         # Base de dominio y configuración transversal
│   └── frontend/               # Aplicación React con Vite
├── docs/
│   ├── arquitectura/
│   ├── evidencias/
│   └── uml/                    # Diagramas y archivo editable de StarUML
└── package.json                # Scripts y workspaces del proyecto
```

Cada módulo del backend mantiene la siguiente separación:

```text
src/modules/<modulo>/
├── presentation/       # Controladores HTTP y filtros de NestJS
├── application/        # Casos de uso, DTO y puertos de aplicación
├── domain/             # Entidades, objetos de valor, agregados y contratos
└── infrastructure/     # Prisma y servicios externos
```

### Responsabilidad de las capas

- **Presentación:** recibe solicitudes HTTP y entrega respuestas. No contiene reglas de negocio.
- **Aplicación:** coordina los casos de uso y depende de contratos del dominio.
- **Dominio:** representa conceptos y reglas del negocio sin importar NestJS, Prisma ni otras
  tecnologías de infraestructura.
- **Infraestructura:** implementa persistencia y conexiones externas. Las implementaciones Prisma
  se ubican en `infrastructure/persistence/prisma/repositories`, mientras que sus interfaces
  permanecen en `domain/repositories`.

Las entidades de dominio no son modelos Prisma. El esquema de Prisma no contiene modelos todavía:
se agregarán después de que el equipo confirme el modelo de datos.

## Módulos o bounded contexts

- `shared-kernel`: bases del dominio y conceptos de usuario/sesión. No incluye autenticación real.
- `reporte-incidencias`: reportes ciudadanos, ubicación, fotos y seguimiento.
- `gestion-rutas`: rutas, horarios, camiones y avisos de horario.
- `zonas-recursos`: zonas, asignaciones y reportes semanales.
- `inventario`: confirmado en el README y los diagramas existentes; por ahora solo conserva la
  estructura de capas porque sus detalles necesitan validación del equipo.
- `health`: endpoint técnico mínimo para comprobar que la API responde.

## Instalación y ejecución

Requisitos: Node.js 20.19 o superior, npm y una instancia de PostgreSQL.

```bash
npm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
npm run prisma:validate
npm run prisma:generate
```

Ejecutar ambos proyectos en desarrollo:

```bash
npm run dev
```

También se pueden iniciar por separado:

```bash
npm run dev:backend     # http://localhost:3000/api
npm run dev:frontend    # http://localhost:5173
```

El backend expone `GET /api` como bienvenida y `GET /api/health` como comprobación de estado.

### Verificación y formato

```bash
npm run build
npm run lint
npm run format
```

## Diagramas

- [Diagrama de arquitectura en capas](docs/uml/Arquitectura%20en%20Capas.png)
- [Modelo de dominio](docs/uml/Modelo%20de%20Dominio%20Recursos%20y%20residuos%20solidos.png)
- [Modelo editable de StarUML](docs/uml/Arquitectura%20en%20Capas%20-%20Basico.mdj)

![Arquitectura en capas](docs/uml/Arquitectura%20en%20Capas.png)

El repositorio revisado no contiene el PDF del Laboratorio 8 ni un diagrama separado de casos de
uso. Deben incorporarse a `docs/` cuando el equipo facilite los archivos originales.

## Cumplimiento del Laboratorio 8

La base actual demuestra una aplicación MVC mediante un controlador REST de NestJS, un frontend
React y una separación DDD de cuatro capas. Prisma está configurado como ORM para PostgreSQL y se
inyecta mediante `PrismaModule` y `PrismaService`. Esta entrega prepara la arquitectura y el entorno;
no presenta como terminadas funcionalidades que siguen pendientes.

## Integrantes

- Ramos Chambi Luis Enrique
- Valdez Agüero Ronald Reynaldo
- Llosa Manchego Fernandito
- Postigo Cabana Juan Carlos
- Jara Arisaca Daysi

### Convenciones de Codificación Aplicadas

Práctica: Eliminación de Expresiones Muertas

Fragmento de Código:

```ts
async buscarPorId(id: number): Promise<HorarioRuta | null> {
  const horarioRuta = await this.prisma.horarioRuta.findUnique({
    where: { id },
  });

  return horarioRuta ? this.toDomain(horarioRuta) : null;
}
```

Práctica: Mapeo de Capas de Datos

Fragmento de Código:

```ts
private toDomain(horarioRuta: HorarioRutaPrisma): HorarioRuta {
  return new HorarioRuta(horarioRuta.id, {
    rutaId: horarioRuta.rutaId,
    frecuencia: horarioRuta.frecuencia,
    diaSemana: horarioRuta.diaSemana,
    turno: horarioRuta.turno,
    horaInicio: this.fromPrismaTime(horarioRuta.horaInicio),
    horaFin: this.fromPrismaTime(horarioRuta.horaFin),
    activo: horarioRuta.activo,
  });
}
```
