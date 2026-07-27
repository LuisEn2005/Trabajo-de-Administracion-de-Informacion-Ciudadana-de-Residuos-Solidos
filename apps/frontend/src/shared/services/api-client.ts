const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

type ApiRequestOptions = {
  accessToken?: string | null;
  body?: unknown;
  method?: string;
  signal?: AbortSignal;
};

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: buildHeaders(options),
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  if (response.ok) {
    return readJsonResponse<TResponse>(response);
  }

  throw new Error(await readErrorMessage(response));
}

function buildHeaders(options: ApiRequestOptions): HeadersInit {
  const headers: Record<string, string> = {};

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  return headers;
}

async function readJsonResponse<TResponse>(response: Response): Promise<TResponse> {
  const body = await response.text();

  if (!body) {
    return undefined as TResponse;
  }

  return JSON.parse(body) as TResponse;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string | string[] };

    if (Array.isArray(body.message)) {
      return body.message.join(', ');
    }

    return body.message ?? 'No se pudo completar la solicitud.';
  } catch {
    return 'No se pudo conectar correctamente con el servidor.';
  }
}
