import { useState } from 'react'
import { addressApi } from '../api/endpoints'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'

interface Props {
  onCreated: (addressId: string) => void
}

export function AddressInlineCreate({ onCreated }: Props) {
  const [zip, setZip] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!zip.trim()) {
      setError('Bitte PLZ eingeben.')
      return
    }
    setSaving(true)
    try {
      const { address } = await addressApi.create({ zip: zip.trim(), city: 'Zürich' })
      onCreated(address.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Speichern.')
      setSaving(false)
    }
  }

  return (
    <>
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
          {saving ? '…' : 'PLZ speichern'}
        </Button>
      </FormGroup>
    </>
  )
}
