function PanelAsignacion() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold text-slate-800">Panel de Asignación</h2>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          className="rounded-xl bg-slate-300 px-7 py-3 text-sm font-black text-white disabled:cursor-not-allowed"
          disabled
          type="button"
        >
          Asignar Ruta (0)
        </button>
        <button
          className="rounded-xl bg-slate-100 px-7 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200"
          type="button"
        >
          Despachar Camión
        </button>
      </div>
    </section>
  );
}

export default PanelAsignacion;
