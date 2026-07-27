import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarPuntosRecoleccion } from '../../dashboard/services/dashboard-data.service';

function PuntosRecoleccionPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Nombre', renderizar: (registro) => registro.nombre },
        { encabezado: 'Dirección', renderizar: (registro) => registro.direccion },
        { encabezado: 'Estado', renderizar: (registro) => <EstadoBadge estado={registro.estado} /> },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarPuntosRecoleccion()}
      titulo="Puntos de recolección"
    />
  );
}

export default PuntosRecoleccionPage;
