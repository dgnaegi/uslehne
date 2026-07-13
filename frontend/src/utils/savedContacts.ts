import type { ContactType } from '../api/types'

export type SavedContact = { id: string; type: ContactType; value: string }

const storageKey = (userId: string) => `uslehne_contacts_${userId}`

export function loadContacts(userId: string): SavedContact[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId)) ?? '[]')
  } catch {
    return []
  }
}

export function saveContact(userId: string, type: ContactType, value: string): SavedContact[] {
  const contacts = loadContacts(userId)
  if (contacts.some((c) => c.type === type && c.value === value)) return contacts
  const updated = [...contacts, { id: crypto.randomUUID(), type, value }]
  localStorage.setItem(storageKey(userId), JSON.stringify(updated))
  return updated
}
