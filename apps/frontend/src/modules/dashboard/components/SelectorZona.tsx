type SelectorZonaProps = {
  zonas: string[];
};

function SelectorZona({ zonas }: SelectorZonaProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <label className="block text-sm font-semibold text-slate-800" htmlFor="zona-geografica">
        Seleccionar Zona Geográfica
      </label>
      <select
        className="mt-3 w-full max-w-xs rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        id="zona-geografica"
      >
        {zonas.map((zona) => (
          <option key={zona}>{zona}</option>
        ))}
      </select>
    </section>
  );
}

export default SelectorZona;
