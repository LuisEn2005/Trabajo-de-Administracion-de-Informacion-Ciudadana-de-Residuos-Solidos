import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarRutas } from '../../dashboard/services/dashboard-data.service';

function RutasPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Número', renderizar: (registro) => registro.numero },
        { encabezado: 'Nombre', renderizar: (registro) => registro.nombre },
        { encabezado: 'Cobertura', renderizar: (registro) => registro.descripcionCobertura },
        {
          encabezado: 'Estado',
          renderizar: (registro) => <EstadoBadge estado={registro.activa ? 'Activa' : 'Inactiva'} />,
        },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarRutas()}
      titulo="Rutas registradas"
    />
  );
}

export default RutasPage;
