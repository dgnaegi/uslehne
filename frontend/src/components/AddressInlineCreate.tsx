import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Address } from '../api/types'
import { addressApi } from '../api/endpoints'
import { ZIP_RE } from '../utils/validation'
import { Button } from './Layout.styled'
import { FormGroup, Label, Input, ErrorMsg } from './Form.styled'

interface Props {
  onCreated: (address: Address) => void
}

export function AddressInlineCreate({ onCreated }: Props) {
  const { t } = useTranslation('offers')
  const [zip, setZip] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!ZIP_RE.test(zip.trim())) {
      setError(t('zipInvalid'))
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
          placeholder="8004"
          maxLength={4}
          inputMode="numeric"
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
