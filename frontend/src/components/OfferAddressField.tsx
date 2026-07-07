import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { Address } from '../api/types'
import { AddressInlineCreate } from './AddressInlineCreate'
import { FormGroup, Label, Select, SelectRow, AddIconButton } from './Layout.styled'
import { IconPlus } from '../icons'

interface OfferAddressFieldProps {
  addresses: Address[]
  showInlineCreateOnly: boolean
  selectProps: UseFormRegisterReturn
  onAddressCreated: (id: string) => void
}

export function OfferAddressField({
  addresses,
  showInlineCreateOnly,
  selectProps,
  onAddressCreated,
}: OfferAddressFieldProps) {
  const { t } = useTranslation('offers')
  const [showAddressForm, setShowAddressForm] = useState(false)

  return (
    <FormGroup>
      <Label>{t('address')}</Label>
      {showInlineCreateOnly ? (
        <AddressInlineCreate onCreated={onAddressCreated} />
      ) : (
        <>
          <SelectRow>
            <Select {...selectProps}>
              <option value="">{t('selectAddress')}</option>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label ? `${a.label} — ` : ''}
                  {a.zip} {a.city}
                </option>
              ))}
            </Select>
            <AddIconButton
              type="button"
              onClick={() => setShowAddressForm((v) => !v)}
              title="Neue Adresse"
            >
              <IconPlus size={14} />
            </AddIconButton>
          </SelectRow>
          {showAddressForm && (
            <AddressInlineCreate
              onCreated={(newId) => {
                setShowAddressForm(false)
                onAddressCreated(newId)
              }}
            />
          )}
        </>
      )}
    </FormGroup>
  )
}
