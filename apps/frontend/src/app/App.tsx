import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../modules/dashboard/pages/DashboardPage';
import InicioPage from '../modules/inicio/pages/InicioPage';

function App() {
  return (
    <Routes>
      <Route element={<InicioPage />} path="/" />
      <Route element={<DashboardPage />} path="/dashboard/*" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

export default App;
