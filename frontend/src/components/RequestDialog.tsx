import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { transactionApi } from '../api/endpoints'
import { FormGroup, Label, Input, Textarea, Button, ErrorMsg, Select } from './Layout.styled'
import { Overlay, DialogBox, DialogTitle } from './RequestDialog.styled'

interface Props {
  offerId: string
  onClose: () => void
}

interface FormValues {
  contactType: 'PHONE' | 'EMAIL'
  contactValue: string
  message?: string
}

export function RequestDialog({ offerId, onClose }: Props) {
  const { t } = useTranslation(['transactions', 'common'])
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ defaultValues: { contactType: 'PHONE' } })

  async function onSubmit(values: FormValues) {
    try {
      await transactionApi.request(offerId, values)
      setSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors:GENERIC', { ns: 'errors' })
      setError('root', { message: msg })
    }
  }

  return (
    <Overlay onClick={onClose}>
      <DialogBox onClick={(e) => e.stopPropagation()}>
        <DialogTitle>{t('transactions:requestDialog.title')}</DialogTitle>
        {success ? (
          <>
            <p>{t('transactions:requestDialog.success')}</p>
            <Button onClick={onClose} style={{ marginTop: '16px' }}>
              OK
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>{t('transactions:requestDialog.contactType')}</Label>
              <Select {...register('contactType', { required: true })}>
                <option value="PHONE">{t('transactions:requestDialog.phone')}</option>
                <option value="EMAIL">{t('transactions:requestDialog.email')}</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>{t('transactions:requestDialog.contactValue')}</Label>
              <Input
                {...register('contactValue', { required: true })}
                placeholder={t('transactions:requestDialog.phonePlaceholder')}
              />
              {errors.contactValue && <ErrorMsg>{errors.contactValue.message}</ErrorMsg>}
            </FormGroup>
            <FormGroup>
              <Label>{t('transactions:requestDialog.message')}</Label>
              <Textarea {...register('message')} />
            </FormGroup>
            {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
            <Button type="submit" disabled={isSubmitting}>
              {t('transactions:requestDialog.submit')}
            </Button>
            <Button
              $variant="secondary"
              type="button"
              onClick={onClose}
              style={{ marginLeft: '8px' }}
            >
              {t('common:actions.cancel')}
            </Button>
          </form>
        )}
      </DialogBox>
    </Overlay>
  )
}
