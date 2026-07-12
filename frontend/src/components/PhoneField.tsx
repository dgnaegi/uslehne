import { useState } from 'react'
import type { ContactType } from '../api/types'
import { Button } from './Layout.styled'
import { Select, FormGroup, Label, Input, SelectRow, AddIconButton } from './Form.styled'
import { InlineForm, TypeButtons, TypeButton } from './PhoneField.styled'
import { IconPlus, IconMinus } from '../icons'

const storageKey = (userId: string) => `uslehne_contacts_${userId}`
const CONTACT_TYPE_OPTIONS: { type: ContactType; label: string }[] = [
  { type: 'SMS', label: 'SMS' },
  { type: 'WHATSAPP', label: 'WhatsApp' },
  { type: 'SIGNAL', label: 'Signal' },
  { type: 'EMAIL', label: 'E-Mail' },
]

type SavedContact = { id: string; type: ContactType; value: string }

function loadContacts(userId: string): SavedContact[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId)) ?? '[]')
  } catch {
    return []
  }
}

function initContacts(
  userId: string,
  selectedType: ContactType,
  selectedValue: string,
): SavedContact[] {
  const loaded = loadContacts(userId)
  if (!selectedValue) return loaded
  const exists = loaded.some((c) => c.type === selectedType && c.value === selectedValue)
  if (exists) return loaded
  const entry: SavedContact = { id: crypto.randomUUID(), type: selectedType, value: selectedValue }
  const updated = [...loaded, entry]
  localStorage.setItem(storageKey(userId), JSON.stringify(updated))
  return updated
}

interface Props {
  userId: string
  selectedType: ContactType
  selectedValue: string
  onSelect: (type: ContactType, value: string) => void
}

export function PhoneField({ userId, selectedType, selectedValue, onSelect }: Props) {
  const [contacts, setContacts] = useState<SavedContact[]>(() =>
    initContacts(userId, selectedType, selectedValue),
  )
  const [showForm, setShowForm] = useState(false)
  const [newType, setNewType] = useState<ContactType>('SMS')
  const [newValue, setNewValue] = useState('')

  const selectedId =
    contacts.find((c) => c.type === selectedType && c.value === selectedValue)?.id ?? ''

  function handleSelect(id: string) {
    const c = contacts.find((c) => c.id === id)
    if (c) onSelect(c.type, c.value)
  }

  function handleAdd() {
    const val = newValue.trim()
    if (!val) return
    const entry: SavedContact = { id: crypto.randomUUID(), type: newType, value: val }
    setContacts((prev) => {
      const updated = [...prev, entry]
      localStorage.setItem(storageKey(userId), JSON.stringify(updated))
      return updated
    })
    onSelect(entry.type, entry.value)
    setNewValue('')
    setShowForm(false)
  }

  const addForm = (
    <InlineForm>
      <FormGroup>
        <Label>Kanal</Label>
        <TypeButtons>
          {CONTACT_TYPE_OPTIONS.map(({ type, label }) => (
            <TypeButton
              key={type}
              type="button"
              $active={newType === type}
              onClick={() => setNewType(type)}
            >
              {label}
            </TypeButton>
          ))}
        </TypeButtons>
      </FormGroup>
      <FormGroup>
        <Label>Nummer / Adresse</Label>
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          type={newType !== 'EMAIL' ? 'tel' : 'email'}
          placeholder={newType !== 'EMAIL' ? '+41 79 000 00 00' : 'name@beispiel.ch'}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAdd()
            }
          }}
        />
      </FormGroup>
      <Button type="button" $variant="secondary" onClick={handleAdd}>
        Speichern
      </Button>
    </InlineForm>
  )

  if (contacts.length === 0) {
    return addForm
  }

  return (
    <>
      <SelectRow>
        <Select value={selectedId} onChange={(e) => handleSelect(e.target.value)}>
          <option value="" disabled>
            Kontakt wählen…
          </option>
          {contacts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.value} ({c.type})
            </option>
          ))}
        </Select>
        <AddIconButton type="button" onClick={() => setShowForm((v) => !v)} title="Neuer Kontakt">
          {showForm ? <IconMinus size={14} /> : <IconPlus size={14} />}
        </AddIconButton>
      </SelectRow>
      {showForm && addForm}
    </>
  )
}
