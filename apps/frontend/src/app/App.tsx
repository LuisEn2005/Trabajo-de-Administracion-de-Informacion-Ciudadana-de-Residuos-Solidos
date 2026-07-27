import DashboardPage from '../modules/dashboard/pages/DashboardPage';
import InicioPage from '../modules/inicio/pages/InicioPage';

function App() {
  const rutaActual = window.location.pathname;

  if (rutaActual.startsWith('/dashboard')) {
    return <DashboardPage rutaActual={rutaActual} />;
  }

  return <InicioPage />;
}

export default App;
