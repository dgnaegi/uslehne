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
  AdminOffer,
} from './types'

export const authApi = {
  checkEmail: (email: string) => api.post<{ exists: boolean }>('/auth/check-email', { email }),

  register: (body: { username: string; email: string; password: string; inviteCode: string }) =>
    api.post<AuthResponse>('/auth/register', body),

  login: (body: { login: string; password: string }) => api.post<AuthResponse>('/auth/login', body),

  me: () => api.get<{ user: User }>('/auth/me'),

  logout: () => api.post<{ ok: boolean }>('/auth/logout', {}),

  // Übergang: tauscht einen alten localStorage-Token gegen ein httpOnly-Cookie.
  migrateSession: (legacyToken: string) =>
    api.post<{ ok: boolean }>('/auth/session', {}, { Authorization: `Bearer ${legacyToken}` }),

  forgotPassword: (email: string) => api.post<{ ok: boolean }>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post<{ ok: boolean }>('/auth/reset-password', { token, password }),
}

export const addressApi = {
  list: () => api.get<{ addresses: Address[] }>('/addresses'),
  create: (body: { zip: string; city?: string; label?: string }) =>
    api.post<{ address: Address }>('/addresses', body),
  delete: (id: string) => api.delete<void>(`/addresses/${id}`),
}

export const imageApi = {
  upload: (image: string) => api.post<{ filename: string; url: string }>('/images', { image }),
  delete: (filename: string) => api.delete<void>(`/images/${filename}`),
}

export const offerApi = {
  list: (params?: {
    type?: 'LEND' | 'GIVE'
    category?: string
    cursor?: string
    limit?: number
    zips?: string[]
    q?: string
  }) => {
    const qs = new URLSearchParams()
    if (params?.type) qs.set('type', params.type)
    if (params?.category) qs.set('category', params.category)
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
    category: string
    addressId: string
    image: string
  }) => api.post<{ offer: Offer }>('/offers', body),
  update: (
    id: string,
    body: {
      title?: string
      description?: string
      type?: string
      category?: string
      image?: string
      status?: string
    },
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
  list: (role: 'incoming' | 'outgoing' | 'open' | 'closed') =>
    api.get<{ transactions: Transaction[] }>(`/transactions?role=${role}`),
  accept: (id: string) => api.post<void>(`/transactions/${id}/accept`, {}),
  decline: (id: string, message?: string) =>
    api.post<void>(`/transactions/${id}/decline`, message ? { message } : {}),
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
  check: (code: string) => api.get<{ valid: boolean; karma: number | null }>(`/invites/${code}`),
}

export const karmaApi = {
  ledger: (limit = 20, offset = 0) =>
    api.get<{ entries: LedgerEntry[]; total: number }>(
      `/karma/ledger?limit=${limit}&offset=${offset}`,
    ),
}

export const adminApi = {
  users: () => api.get<{ users: User[] }>('/admin/users'),
  deleteUser: (id: string) => api.delete<void>(`/admin/users/${id}`),
  offers: () => api.get<{ offers: AdminOffer[] }>('/admin/offers'),
  deleteOffer: (id: string) => api.delete<void>(`/admin/offers/${id}`),
}
