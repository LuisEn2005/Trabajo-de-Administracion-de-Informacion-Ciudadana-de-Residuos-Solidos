import { useCallback, useEffect, useMemo, useState } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarAdministradoresDesdeApi } from '../services/administradores-api.service';
import type { AdministradorSesion } from '../types/auth.types';

function AdministradoresPage() {
  const [administradores, setAdministradores] = useState<AdministradorSesion[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const cargarAdministradores = useCallback(async (): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      setAdministradores(await listarAdministradoresDesdeApi());
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarAdministradores();
  }, [cargarAdministradores]);

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
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
        <p className="font-black">Modulo conectado al backend actual.</p>
        <p>
          La API disponible solo expone el perfil del administrador autenticado en
          <strong> GET /api/v1/auth/perfil</strong>. No existen endpoints de CRUD de administradores en el backend actual.
        </p>
      </section>

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando perfil administrativo desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={administradores}
          titulo="Administrador autenticado"
        />
      )}
    </div>
  );
}

function obtenerMensajeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrio un error inesperado.';
}

export default AdministradoresPage;
