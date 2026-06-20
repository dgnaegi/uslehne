export type Role = 'USER' | 'ADMIN'
export type OfferType = 'LEND' | 'GIVE'
export type OfferStatus = 'AVAILABLE' | 'RESERVED' | 'LENT' | 'GIVEN' | 'ARCHIVED'
export type TransactionStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'CANCELLED'
  | 'RETURNED'
  | 'COMPLETED'
export type ContactType = 'PHONE' | 'EMAIL'
export type LedgerReason =
  | 'INVITE_BONUS'
  | 'LEND_EARN'
  | 'BORROW_SPEND'
  | 'GIVE_EARN'
  | 'RECEIVE_SPEND'
  | 'ADMIN_ADJUST'

export interface User {
  id: string
  username: string
  email: string
  role: Role
  kudosBalance: number
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  label?: string
  street: string
  zip: string
  city: string
}

export interface Offer {
  id: string
  ownerId: string
  owner: { username: string }
  title: string
  description: string
  type: OfferType
  status: OfferStatus
  imageRef: string
  addressId: string
  address: { zip: string }
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  offerId: string
  offer: { title: string; type: OfferType }
  requesterId: string
  requester?: { username: string }
  ownerId: string
  owner?: { username: string }
  type: OfferType
  kudos: number
  status: TransactionStatus
  message?: string
  contactType?: ContactType
  contactValue?: string
  createdAt: string
  decidedAt?: string
}

export interface Invite {
  id: string
  code: string
  kudos: number
  usedAt?: string
  usedById?: string
  createdAt: string
}

export interface LedgerEntry {
  id: string
  delta: number
  reason: LedgerReason
  transactionId?: string
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: Pick<User, 'id' | 'username' | 'email' | 'kudosBalance'>
}
