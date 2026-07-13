import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { Address } from '../api/types'
import { AddressInlineCreate } from './AddressInlineCreate'
import { FormGroup, Label, Input, Select, SelectRow, AddIconButton, ErrorMsg } from './Form.styled'
import { IconPlus } from '../icons'

interface OfferAddressFieldProps {
  addresses: Address[]
  showInlineCreateOnly: boolean
  selectProps: UseFormRegisterReturn
  zipProps: UseFormRegisterReturn
  zipError: boolean
  onAddressCreated: (address: Address) => void
}

export function OfferAddressField({
  addresses,
  showInlineCreateOnly,
  selectProps,
  zipProps,
  zipError,
  onAddressCreated,
}: OfferAddressFieldProps) {
  const { t } = useTranslation('offers')
  const [showAddressForm, setShowAddressForm] = useState(false)

  return (
    <FormGroup>
      <Label>{t('address')}</Label>
      {showInlineCreateOnly ? (
        <>
          <Input {...zipProps} placeholder="3005" maxLength={10} />
          {zipError && <ErrorMsg>{t('zipRequired')}</ErrorMsg>}
        </>
      ) : (
        <>
          <SelectRow>
            <Select {...selectProps}>
              <option value="">{t('selectAddress')}</option>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label ? `${a.label} — ` : ''}
                  {a.zip}
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
              onCreated={(newAddress) => {
                setShowAddressForm(false)
                onAddressCreated(newAddress)
              }}
            />
          )}
        </>
      )}
    </FormGroup>
  )
}
