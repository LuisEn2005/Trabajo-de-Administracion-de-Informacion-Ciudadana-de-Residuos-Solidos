import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  iniciarSesionAdministrativa,
  obtenerPerfilAdministrativo,
} from '../services/auth-api.service';
import {
  eliminarAccessToken,
  guardarAccessToken,
  obtenerAccessToken,
} from '../services/auth-token.storage';
import type { AdministradorSesion, CredencialesLogin } from '../types/auth.types';
import { AuthContext } from './auth-context';

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [administrador, setAdministrador] = useState<AdministradorSesion | null>(null);
  const [estaCargandoSesion, setEstaCargandoSesion] = useState(true);

  useEffect(() => {
    let componenteActivo = true;
    const accessToken = obtenerAccessToken();

    if (!accessToken) {
      setEstaCargandoSesion(false);
      return () => {
        componenteActivo = false;
      };
    }

    obtenerPerfilAdministrativo(accessToken)
      .then((perfil) => {
        if (componenteActivo) {
          setAdministrador(perfil);
        }
      })
      .catch(() => {
        eliminarAccessToken();

        if (componenteActivo) {
          setAdministrador(null);
        }
      })
      .finally(() => {
        if (componenteActivo) {
          setEstaCargandoSesion(false);
        }
      });

    return () => {
      componenteActivo = false;
    };
  }, []);

  const iniciarSesion = useCallback(async (credenciales: CredencialesLogin): Promise<void> => {
    const respuesta = await iniciarSesionAdministrativa(credenciales);

    guardarAccessToken(respuesta.accessToken);
    setAdministrador(respuesta.administrador);
  }, []);

  const cerrarSesion = useCallback((): void => {
    eliminarAccessToken();
    setAdministrador(null);
  }, []);

  const valor = useMemo(
    () => ({
      administrador,
      estaAutenticado: Boolean(administrador),
      estaCargandoSesion,
      iniciarSesion,
      cerrarSesion,
    }),
    [administrador, cerrarSesion, estaCargandoSesion, iniciarSesion],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
