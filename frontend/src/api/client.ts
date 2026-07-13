const BASE = '/api/v1'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Auth läuft über ein httpOnly-Cookie. Der Content-Type ist auch bei
  // Requests ohne Body nötig: das Backend verlangt ihn als CSRF-Schutz.
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
    credentials: 'same-origin',
  })

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as {
      error?: { code?: string; message?: string }
    }
    const err = new Error(body?.error?.message ?? 'Request failed') as Error & {
      code?: string
      status?: number
    }
    err.code = body?.error?.code
    err.status = res.status
    throw err
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export function apiMsg(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) return fallback
  const msg = err.message
  if (!msg || msg === 'Request failed') return fallback
  return msg
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body), headers }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
