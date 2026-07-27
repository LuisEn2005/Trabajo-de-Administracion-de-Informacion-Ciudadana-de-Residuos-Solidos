import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarVehiculos } from '../../dashboard/services/dashboard-data.service';

function FlotaPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Placa', renderizar: (registro) => registro.placa },
        { encabezado: 'Carrocería', renderizar: (registro) => registro.carroceria },
        { encabezado: 'Ruta', renderizar: (registro) => registro.ruta },
        {
          encabezado: 'Estado',
          renderizar: (registro) => <EstadoBadge estado={registro.activo ? 'Activo' : 'Inactivo'} />,
        },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarVehiculos()}
      titulo="Vehículos registrados"
    />
  );
}

export default FlotaPage;
