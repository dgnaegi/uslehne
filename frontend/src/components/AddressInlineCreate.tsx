import { useState } from 'react'
import { addressApi } from '../api/endpoints'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'

interface Props {
  onCreated: (addressId: string) => void
}

export function AddressInlineCreate({ onCreated }: Props) {
  const [street, setStreet] = useState('')
  const [zip, setZip] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!street.trim() || !zip.trim()) {
      setError('Bitte alle Felder ausfüllen.')
      return
    }
    setSaving(true)
    try {
      const { address } = await addressApi.create({
        street: street.trim(),
        zip: zip.trim(),
        city: 'Zürich',
      })
      onCreated(address.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern.')
      setSaving(false)
    }
  }

  return (
    <>
      <FormGroup>
        <Label>Strasse & Nr.</Label>
        <Input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Musterstrasse 1"
        />
      </FormGroup>
      <FormGroup>
        <Label>PLZ (Zürich)</Label>
        <Input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="8001"
          maxLength={10}
        />
      </FormGroup>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <FormGroup>
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? '…' : 'Adresse speichern'}
        </Button>
      </FormGroup>
    </>
  )
}
