import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarAdministradores } from '../../dashboard/services/dashboard-data.service';

function AdministradoresPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Nombre', renderizar: (registro) => registro.nombre },
        { encabezado: 'Email', renderizar: (registro) => registro.email },
        {
          encabezado: 'Estado',
          renderizar: (registro) => <EstadoBadge estado={registro.activo ? 'Activo' : 'Inactivo'} />,
        },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarAdministradores()}
      titulo="Administradores"
    />
  );
}

export default AdministradoresPage;
