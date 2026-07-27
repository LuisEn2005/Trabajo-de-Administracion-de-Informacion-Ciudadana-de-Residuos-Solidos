const AUTH_TOKEN_KEY = 'is1.auth.access_token';

export function guardarAccessToken(accessToken: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
}

export function obtenerAccessToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function eliminarAccessToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
