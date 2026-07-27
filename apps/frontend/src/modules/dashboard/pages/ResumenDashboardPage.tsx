import PanelAsignacion from '../components/PanelAsignacion';
import SelectorZona from '../components/SelectorZona';
import TarjetaResumen from '../components/TarjetaResumen';
import { listarTarjetasResumen, listarZonasGeograficas } from '../services/dashboard-data.service';
import AsignacionesPage from '../../asignaciones/pages/AsignacionesPage';

function ResumenDashboardPage() {
  const tarjetas = listarTarjetasResumen();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map((tarjeta) => (
          <TarjetaResumen key={tarjeta.titulo} tarjeta={tarjeta} />
        ))}
      </div>
      <SelectorZona zonas={listarZonasGeograficas()} />
      <AsignacionesPage />
      <PanelAsignacion />
    </>
  );
}

export default ResumenDashboardPage;
