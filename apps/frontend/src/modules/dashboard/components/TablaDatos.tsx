import type { ReactNode } from 'react';

type ColumnaTabla<T> = {
  encabezado: string;
  renderizar: (registro: T) => ReactNode;
};

type TablaDatosProps<T> = {
  columnas: ColumnaTabla<T>[];
  obtenerClave: (registro: T) => string | number;
  registros: T[];
  titulo: string;
};

function TablaDatos<T>({ columnas, obtenerClave, registros, titulo }: TablaDatosProps<T>) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{titulo}</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-700">
              {columnas.map((columna) => (
                <th className="px-4 py-4 font-bold" key={columna.encabezado}>
                  {columna.encabezado}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr className="border-b border-slate-100 text-slate-800" key={obtenerClave(registro)}>
                {columnas.map((columna) => (
                  <td className="px-4 py-4" key={columna.encabezado}>
                    {columna.renderizar(registro)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaDatos;
