import { useMemo } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { useAuth } from '../hooks/useAuth';
import type { AdministradorSesion } from '../types/auth.types';

function AdministradoresPage() {
  const { administrador } = useAuth();
  const administradores = useMemo(
    () => (administrador ? [administrador] : []),
    [administrador],
  );

  const columnas = useMemo(
    () => [
      { encabezado: 'Nombre', renderizar: (registro: AdministradorSesion) => registro.nombre },
      { encabezado: 'Email', renderizar: (registro: AdministradorSesion) => registro.email },
      {
        encabezado: 'Estado',
        renderizar: (registro: AdministradorSesion) => <EstadoBadge estado={registro.activo ? 'Activo' : 'Inactivo'} />,
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">

      <TablaDatos
        columnas={columnas}
        obtenerClave={(registro) => registro.id}
        registros={administradores}
        titulo="Administrador autenticado"
      />
    </div>
  );
}

export default AdministradoresPage;
