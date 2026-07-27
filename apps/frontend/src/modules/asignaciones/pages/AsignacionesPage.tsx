import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarAsignaciones } from '../../dashboard/services/dashboard-data.service';

function AsignacionesPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Ruta', renderizar: (registro) => registro.ruta },
        { encabezado: 'Vehículo', renderizar: (registro) => registro.vehiculo },
        { encabezado: 'Horario', renderizar: (registro) => registro.horario },
        { encabezado: 'Fecha', renderizar: (registro) => registro.fecha },
        { encabezado: 'Estado', renderizar: (registro) => <EstadoBadge estado={registro.estado} /> },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarAsignaciones()}
      titulo="Asignaciones operativas"
    />
  );
}

export default AsignacionesPage;
