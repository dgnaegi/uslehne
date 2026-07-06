import { api } from './client'
import type {
  AuthResponse,
  User,
  UserProfile,
  Address,
  Offer,
  Transaction,
  Invite,
  LedgerEntry,
  Rating,
} from './types'

export const authApi = {
  checkEmail: (email: string) => api.post<{ exists: boolean }>('/auth/check-email', { email }),

  register: (body: { username: string; email: string; password: string; inviteCode: string }) =>
    api.post<AuthResponse>('/auth/register', body),

  login: (body: { login: string; password: string }) => api.post<AuthResponse>('/auth/login', body),

  me: () => api.get<{ user: User }>('/auth/me'),
}

export const addressApi = {
  list: () => api.get<{ addresses: Address[] }>('/addresses'),
  create: (body: { zip: string; city: string; label?: string }) =>
    api.post<{ address: Address }>('/addresses', body),
  delete: (id: string) => api.delete<void>(`/addresses/${id}`),
}

export const offerApi = {
  list: (params?: {
    type?: 'LEND' | 'GIVE'
    cursor?: string
    limit?: number
    zips?: string[]
    q?: string
  }) => {
    const qs = new URLSearchParams()
    if (params?.type) qs.set('type', params.type)
    if (params?.cursor) qs.set('cursor', params.cursor)
    if (params?.limit) qs.set('limit', String(params.limit))
    if (params?.zips?.length) qs.set('zip', params.zips.join(','))
    if (params?.q) qs.set('q', params.q)
    const qstr = qs.toString()
    return api.get<{ offers: Offer[]; nextCursor: string | null }>(
      `/offers${qstr ? `?${qstr}` : ''}`,
    )
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
  confirm: (id: string) =>
    api.post<{ ok: boolean; completed: boolean }>(`/transactions/${id}/confirm`, {}),
  list: (role: 'incoming' | 'outgoing') =>
    api.get<{ transactions: Transaction[] }>(`/transactions?role=${role}`),
  accept: (id: string) => api.post<void>(`/transactions/${id}/accept`, {}),
  decline: (id: string) => api.post<void>(`/transactions/${id}/decline`, {}),
  cancel: (id: string) => api.post<void>(`/transactions/${id}/cancel`, {}),
  rate: (id: string, stars: number) =>
    api.post<{ rating: Rating }>(`/transactions/${id}/rate`, { stars }),
}

export const userApi = {
  getProfile: (id: string) => api.get<{ user: UserProfile }>(`/users/${id}`),
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
