export type AdministradorSesion = {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
};

export type CredencialesLogin = {
  email: string;
  password: string;
};

export type RespuestaLogin = {
  accessToken: string;
  tokenType: 'Bearer';
  administrador: AdministradorSesion;
};

export type AuthContextValue = {
  administrador: AdministradorSesion | null;
  estaAutenticado: boolean;
  estaCargandoSesion: boolean;
  iniciarSesion: (credenciales: CredencialesLogin) => Promise<void>;
  cerrarSesion: () => void;
};
