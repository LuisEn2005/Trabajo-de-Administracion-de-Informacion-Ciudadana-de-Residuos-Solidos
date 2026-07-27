import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarHorarios } from '../../dashboard/services/dashboard-data.service';

function HorariosPage() {
  return (
    <TablaDatos
      columnas={[
        { encabezado: 'Ruta', renderizar: (registro) => registro.ruta },
        { encabezado: 'Frecuencia', renderizar: (registro) => registro.frecuencia },
        { encabezado: 'Día', renderizar: (registro) => registro.diaSemana },
        { encabezado: 'Turno', renderizar: (registro) => registro.turno },
        { encabezado: 'Horario', renderizar: (registro) => `${registro.horaInicio} - ${registro.horaFin}` },
        {
          encabezado: 'Estado',
          renderizar: (registro) => <EstadoBadge estado={registro.activo ? 'Activo' : 'Inactivo'} />,
        },
      ]}
      obtenerClave={(registro) => registro.id}
      registros={listarHorarios()}
      titulo="Horarios registrados"
    />
  );
}

export default HorariosPage;
