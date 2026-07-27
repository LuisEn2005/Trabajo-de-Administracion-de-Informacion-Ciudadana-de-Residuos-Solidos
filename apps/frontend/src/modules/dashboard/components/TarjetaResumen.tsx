import type { TarjetaResumen as TarjetaResumenDatos } from '../types/dashboard.types';

type TarjetaResumenProps = {
  tarjeta: TarjetaResumenDatos;
};

function TarjetaResumen({ tarjeta }: TarjetaResumenProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{tarjeta.titulo}</p>
      <strong className="mt-3 block text-3xl font-black text-slate-950">{tarjeta.valor}</strong>
      <p className="mt-2 text-sm leading-6 text-slate-500">{tarjeta.descripcion}</p>
    </article>
  );
}

export default TarjetaResumen;
