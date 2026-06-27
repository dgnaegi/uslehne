import { api } from './client'
import type { AuthResponse, User, Address, Offer, Transaction, Invite, LedgerEntry } from './types'

export const authApi = {
  checkEmail: (email: string) => api.post<{ exists: boolean }>('/auth/check-email', { email }),

  register: (body: { username: string; email: string; password: string; inviteCode: string }) =>
    api.post<AuthResponse>('/auth/register', body),

  login: (body: { login: string; password: string }) => api.post<AuthResponse>('/auth/login', body),

  me: () => api.get<{ user: User }>('/auth/me'),
}

export const addressApi = {
  list: () => api.get<{ addresses: Address[] }>('/addresses'),
  create: (body: { street: string; zip: string; city: string; label?: string }) =>
    api.post<{ address: Address }>('/addresses', body),
  delete: (id: string) => api.delete<void>(`/addresses/${id}`),
}

export const offerApi = {
  list: (params?: { type?: 'LEND' | 'GIVE'; cursor?: string; limit?: number; zips?: string[] }) => {
    const q = new URLSearchParams()
    if (params?.type) q.set('type', params.type)
    if (params?.cursor) q.set('cursor', params.cursor)
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.zips?.length) q.set('zip', params.zips.join(','))
    const qs = q.toString()
    return api.get<{ offers: Offer[]; nextCursor: string | null }>(`/offers${qs ? `?${qs}` : ''}`)
  },
  mine: () => api.get<{ offers: Offer[] }>('/offers/mine'),
  get: (id: string) => api.get<{ offer: Offer }>(`/offers/${id}`),
  create: (body: {
    title: string
    description: string
    type: string
    addressId: string
    image: string
  }) => api.post<{ offer: Offer }>('/offers', body),
  update: (
    id: string,
    body: { title?: string; description?: string; image?: string; status?: string },
  ) => api.patch<{ offer: Offer }>(`/offers/${id}`, body),
  delete: (id: string) => api.delete<void>(`/offers/${id}`),
}

export const transactionApi = {
  request: (
    offerId: string,
    body: { contactType: string; contactValue: string; message?: string },
  ) => api.post<{ transaction: Transaction }>(`/offers/${offerId}/request`, body),
  list: (role: 'incoming' | 'outgoing') =>
    api.get<{ transactions: Transaction[] }>(`/transactions?role=${role}`),
  accept: (id: string) => api.post<void>(`/transactions/${id}/accept`, {}),
  decline: (id: string) => api.post<void>(`/transactions/${id}/decline`, {}),
  cancel: (id: string) => api.post<void>(`/transactions/${id}/cancel`, {}),
  return: (id: string) => api.post<void>(`/transactions/${id}/return`, {}),
}

export const inviteApi = {
  list: () => api.get<{ invites: Invite[] }>('/invites'),
  create: () => api.post<{ invite: Invite }>('/invites', {}),
  check: (code: string) => api.get<{ valid: boolean; kudos: number | null }>(`/invites/${code}`),
}

export const kudosApi = {
  ledger: (limit = 20, offset = 0) =>
    api.get<{ entries: LedgerEntry[]; total: number }>(
      `/kudos/ledger?limit=${limit}&offset=${offset}`,
    ),
}
