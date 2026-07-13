import type { UseFormRegisterReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { OFFER_CATEGORIES } from '../api/types'
import { FormGroup, Label, Select } from './Form.styled'

interface OfferTypeCategoryFieldsProps {
  typeProps: UseFormRegisterReturn
  categoryProps: UseFormRegisterReturn
}

export function OfferTypeCategoryFields({
  typeProps,
  categoryProps,
}: OfferTypeCategoryFieldsProps) {
  const { t } = useTranslation(['offers', 'common'])

  return (
    <>
      <FormGroup>
        <Label>{t('offers:type')}</Label>
        <Select {...typeProps}>
          <option value="">{t('offers:selectType')}</option>
          <option value="LEND">{t('common:offerType.LEND')}</option>
          <option value="GIVE">{t('common:offerType.GIVE')}</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>{t('offers:category')}</Label>
        <Select {...categoryProps}>
          <option value="">{t('offers:selectCategory')}</option>
          {OFFER_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {t(`offers:categories.${c}`)}
            </option>
          ))}
        </Select>
      </FormGroup>
    </>
  )
}
