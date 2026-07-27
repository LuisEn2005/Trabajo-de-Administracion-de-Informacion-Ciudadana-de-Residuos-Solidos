type Caracteristica = {
  titulo: string;
  descripcion: string;
};

type Tecnologia = {
  nombre: string;
  detalle: string;
};

const caracteristicas: Caracteristica[] = [
  {
    titulo: 'Gestión de rutas',
    descripcion: 'Administración de rutas de recolección, horarios y vehículos asociados.',
  },
  {
    titulo: 'Programación del servicio',
    descripcion: 'Base para organizar la planificación de recolección y consulta ciudadana.',
  },
  {
    titulo: 'Puntos y contenedores',
    descripcion: 'Estructura preparada para registrar zonas, puntos de recolección y contenedores.',
  },
  {
    titulo: 'Trabajo modular',
    descripcion: 'Separación por módulos para mantener el código ordenado, mantenible y escalable.',
  },
];

const desarrolladores = [
  'Juan Carlos Postigo Cabana',
  'Luis Enrique Ramos Chambi',
  'Daysi Jara Arisaca',
  'Ronald Reynaldo Valdez Agüero',
  'Fernando Llosa Manchego',
];

const tecnologias: Tecnologia[] = [
  {
    nombre: 'React',
    detalle: 'Construcción de interfaces mediante componentes reutilizables.',
  },
  {
    nombre: 'Vite',
    detalle: 'Entorno de desarrollo rápido para el frontend.',
  },
  {
    nombre: 'TypeScript',
    detalle: 'Tipado estático para reducir errores y mejorar mantenibilidad.',
  },
  {
    nombre: 'Tailwind CSS',
    detalle: 'Estilos utilitarios para construir una interfaz limpia y consistente.',
  },
  {
    nombre: 'NestJS',
    detalle: 'Backend modular orientado a capas y casos de uso.',
  },
  {
    nombre: 'Prisma',
    detalle: 'Acceso tipado a la base de datos desde la capa de repositorio.',
  },
];

function InicioPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#10b98133,transparent_34rem),linear-gradient(135deg,#052e2bcc,#020617)]" />
        <header className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <span className="text-lg font-black tracking-tight text-emerald-300">Ingeniería del Software 1</span>
          <nav className="hidden gap-6 text-sm font-semibold text-slate-300 sm:flex">
            <a className="transition hover:text-emerald-300" href="#proyecto">Proyecto</a>
            <a className="transition hover:text-emerald-300" href="#tecnologias">Tecnologías y Arquitectura</a>
            <a className="transition hover:text-emerald-300" href="#funcionalidades">Funcionalidades</a>
            <a className="transition hover:text-emerald-300" href="#equipo">Equipo</a>
          </nav>
        </header>

        <div className="mx-auto flex max-w-5xl flex-col items-center py-20 text-center lg:py-28">
          <div className="flex flex-col items-center">
            <p className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.25em] text-emerald-200">
              Gestión de residuos sólidos
            </p>
            <h1 className="mx-auto max-w-4xl text-center text-5xl font-black tracking-tight text-white sm:text-7xl">
              Rutas de recolección más claras, ordenadas y sostenibles.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Proyecto académico orientado a apoyar la organización de rutas, vehículos, horarios
              y recursos relacionados con la recolección de residuos sólidos.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                className="rounded-full bg-emerald-400 px-6 py-3 text-center text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
                href="/dashboard"
              >
                Ir a la app
              </a>
              <a
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-bold text-white transition hover:border-emerald-300 hover:text-emerald-200"
                href="#equipo"
              >
                Conocer al equipo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-slate-950 sm:px-10 lg:px-16" id="proyecto">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">Sobre el proyecto</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Una solución académica para ordenar la recolección.</h2>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-slate-600">
            <p>
              El proyecto busca representar digitalmente procesos importantes de la gestión de residuos:
              rutas, vehículos, horarios, puntos de recolección, contenedores y programación pública.
            </p>
            <p>
              La aplicación se desarrolla con buenas prácticas de Clean Code, separación de responsabilidades
              y una estructura preparada para crecer sin mezclar la presentación con la lógica del sistema.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16" id="tecnologias">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">Tecnologías</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Base técnica separada por capas y módulos.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              El sistema separa la interfaz de usuario, los servicios del backend y el acceso a datos
              para que cada parte tenga una responsabilidad clara dentro del proyecto.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tecnologias.map((tecnologia) => (
              <article className="rounded-3xl border border-white/10 bg-white/5 p-6" key={tecnologia.nombre}>
                <h3 className="text-xl font-black text-emerald-200">{tecnologia.nombre}</h3>
                <p className="mt-3 leading-7 text-slate-300">{tecnologia.detalle}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-dashed border-emerald-300/40 pt-10">
            <div className="grid gap-6 lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">Arquitectura del sistema</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">Frontend, API REST y backend con DDD.</h3>
              </div>
              <div className="grid gap-4 text-base leading-7 text-slate-300">
                <p>
                  El frontend actúa como capa de presentación: muestra la información al usuario y consume
                  los servicios publicados por el backend mediante endpoints de una API REST.
                </p>
                <p>
                  El backend concentra la lógica principal del sistema y se organiza siguiendo DDD. Por eso
                  separa presentación, interfaz, dominio y repositorio, evitando que las reglas del negocio
                  dependan directamente de controladores, Prisma o detalles de base de datos.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-emerald-100">Frontend: presentación</span>
                  <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-emerald-100">API REST: comunicación</span>
                  <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-emerald-100">Backend: dominio y repositorio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 px-6 py-20 text-slate-950 sm:px-10 lg:px-16" id="funcionalidades">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">Funcionalidades</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Módulos pensados para el crecimiento del sistema.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {caracteristicas.map((caracteristica) => (
              <article className="rounded-3xl bg-white p-6 shadow-lg shadow-emerald-900/5" key={caracteristica.titulo}>
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-black text-emerald-700">
                  ✓
                </div>
                <h3 className="text-xl font-black">{caracteristica.titulo}</h3>
                <p className="mt-3 leading-7 text-slate-600">{caracteristica.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-slate-950 sm:px-10 lg:px-16" id="equipo">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">Equipo de desarrollo</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Integrantes responsables del proyecto.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {desarrolladores.map((desarrollador) => (
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6" key={desarrollador}>
                <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-emerald-300">
                  {desarrollador.charAt(0)}
                </div>
                <h3 className="text-xl font-black">{desarrollador}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-6 text-center text-sm text-slate-400 sm:px-10 lg:px-16">
        <p>IS1 · Proyecto académico de gestión de residuos sólidos</p>
      </footer>
    </main>
  );
}

export default InicioPage;
