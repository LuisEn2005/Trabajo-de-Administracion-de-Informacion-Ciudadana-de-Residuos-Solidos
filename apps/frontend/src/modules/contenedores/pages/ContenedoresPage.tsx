import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarContenedores } from '../../dashboard/services/dashboard-data.service';

function ContenedoresPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Código', renderizar: (registro) => registro.codigo },
        { encabezado: 'Tipo', renderizar: (registro) => registro.tipo },
        { encabezado: 'Capacidad', renderizar: (registro) => registro.capacidad },
        { encabezado: 'Punto', renderizar: (registro) => registro.puntoRecoleccion },
        { encabezado: 'Estado', renderizar: (registro) => <EstadoBadge estado={registro.estado} /> },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarContenedores()}
      titulo="Contenedores registrados"
    />
  );
}

export default ContenedoresPage;
