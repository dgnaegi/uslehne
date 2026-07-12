import { useState } from 'react'
import type { Address } from '../api/types'
import { addressApi } from '../api/endpoints'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'

interface Props {
  onCreated: (address: Address) => void
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
      const { address } = await addressApi.create({ zip: zip.trim() })
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
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <FormGroup>
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? '…' : 'PLZ speichern'}
        </Button>
      </FormGroup>
    </>
  )
}
