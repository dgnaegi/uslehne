import { useState } from 'react'
import type { ContactType } from '../api/types'
import { loadContacts, saveContact, type SavedContact } from '../utils/savedContacts'
import { Button } from './Layout.styled'
import { Select, FormGroup, Label, Input, SelectRow, AddIconButton } from './Form.styled'
import { InlineForm, TypeButtons, TypeButton } from './PhoneField.styled'
import { IconPlus, IconMinus } from '../icons'

const CONTACT_TYPE_OPTIONS: { type: ContactType; label: string }[] = [
  { type: 'SMS', label: 'SMS' },
  { type: 'WHATSAPP', label: 'WhatsApp' },
  { type: 'TELEGRAM', label: 'Telegram' },
  { type: 'EMAIL', label: 'E-Mail' },
]

const USERNAME_TYPES: ContactType[] = ['TELEGRAM']
const TELEGRAM_USERNAME_RE = /^@?[a-zA-Z0-9_.]{3,32}$/

function typeLabel(type: ContactType): string {
  return CONTACT_TYPE_OPTIONS.find((o) => o.type === type)?.label ?? type
}

function inputLabel(type: ContactType): string {
  if (type === 'EMAIL') return 'E-Mail-Adresse'
  if (type === 'TELEGRAM') return 'Telegram-Benutzername'
  return 'Telefonnummer'
}

interface Props {
  userId: string
  selectedType: ContactType
  selectedValue: string
  onSelect: (type: ContactType, value: string) => void
}

export function PhoneField({ userId, selectedType, selectedValue, onSelect }: Props) {
  const [contacts, setContacts] = useState<SavedContact[]>(() => loadContacts(userId))
  const [showForm, setShowForm] = useState(false)
  const [newType, setNewType] = useState<ContactType>('SMS')
  const [newValue, setNewValue] = useState('')

  // With no saved contacts the fields feed the request form directly;
  // the contact is persisted only when the request is submitted.
  const validContacts = contacts.filter(
    (c) => c.type !== 'TELEGRAM' || TELEGRAM_USERNAME_RE.test(c.value),
  )
  const inlineMode = validContacts.length === 0
  const isUsernameType = USERNAME_TYPES.includes(newType)

  const selectedId =
    validContacts.find((c) => c.type === selectedType && c.value === selectedValue)?.id ?? ''

  function handleSelect(id: string) {
    const c = validContacts.find((c) => c.id === id)
    if (c) onSelect(c.type, c.value)
  }

  function handleTypeChange(type: ContactType) {
    setNewType(type)
    if (inlineMode) onSelect(type, newValue.trim())
  }

  function handleValueChange(value: string) {
    setNewValue(value)
    if (inlineMode) onSelect(newType, value.trim())
  }

  function handleAdd() {
    const val = newValue.trim()
    if (!val) return
    const updated = saveContact(userId, newType, val)
    setContacts(updated)
    onSelect(newType, val)
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
              onClick={() => handleTypeChange(type)}
            >
              {label}
            </TypeButton>
          ))}
        </TypeButtons>
      </FormGroup>
      <FormGroup>
        <Label>{inputLabel(newType)}</Label>
        <Input
          value={newValue}
          onChange={(e) => handleValueChange(e.target.value)}
          type={newType === 'EMAIL' ? 'email' : isUsernameType ? 'text' : 'tel'}
          placeholder={
            newType === 'EMAIL'
              ? 'name@beispiel.ch'
              : isUsernameType
                ? '@benutzername'
                : '+41 79 000 00 00'
          }
          autoFocus
          onKeyDown={
            inlineMode
              ? undefined
              : (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAdd()
                  }
                }
          }
        />
      </FormGroup>
      {!inlineMode && (
        <Button type="button" $variant="secondary" onClick={handleAdd}>
          Speichern
        </Button>
      )}
    </InlineForm>
  )

  if (inlineMode) {
    return addForm
  }

  return (
    <>
      <SelectRow>
        <Select value={selectedId} onChange={(e) => handleSelect(e.target.value)}>
          <option value="" disabled>
            Kontakt wählen…
          </option>
          {validContacts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.value} ({typeLabel(c.type)})
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
