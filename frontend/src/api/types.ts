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
export type ContactType = 'SMS' | 'WHATSAPP' | 'SIGNAL' | 'EMAIL'
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
  address: { zip: string; city: string }
  // Only returned for the owner (mine / create / edit responses)
  contactType?: ContactType
  contactValue?: string
  createdAt: string
  updatedAt: string
}

export interface Rating {
  id: string
  stars: number
}

export interface Transaction {
  id: string
  offerId: string
  offer: { title: string; type: OfferType }
  requesterId: string
  requester?: { id: string; username: string }
  ownerId: string
  owner?: { id: string; username: string }
  type: OfferType
  kudos: number
  status: TransactionStatus
  message?: string
  contactType?: ContactType
  contactValue?: string
  rating?: Rating
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

export interface UserProfile {
  id: string
  username: string
  kudosBalance: number
  createdAt: string
  avgStars: number | null
  ratingCount: number
  offersGiven: number
  offersTaken: number
  kudoHistory: Array<{
    id: string
    delta: number
    reason: LedgerReason
    createdAt: string
  }>
}

export interface AuthResponse {
  token: string
  user: Pick<User, 'id' | 'username' | 'email' | 'kudosBalance'>
}
