import { useState } from 'react'
import type { Address } from '../api/types'
import { addressApi } from '../api/endpoints'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'

interface Props {
  onCreated: (address: Address) => void
}

export function AddressInlineCreate({ onCreated }: Props) {
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!zip.trim()) {
      setError('Bitte PLZ eingeben.')
      return
    }
    setSaving(true)
    try {
      const { address } = await addressApi.create({
        zip: zip.trim(),
        ...(city.trim() ? { city: city.trim() } : {}),
      })
      onCreated(address)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern.')
      setSaving(false)
    }
  }

  return (
    <>
      <FormGroup>
        <Label>PLZ</Label>
        <Input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="3005"
          maxLength={10}
        />
      </FormGroup>
      <FormGroup>
        <Label>Ort (optional)</Label>
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Bern"
          maxLength={100}
        />
      </FormGroup>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <FormGroup>
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? '…' : 'PLZ speichern'}
        </Button>
      </FormGroup>
    </>
  )
}
