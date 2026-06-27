import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { OfferType } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { FormGroup, Label, Input, Textarea, Button, ErrorMsg, Select } from './Layout.styled'
import { Overlay, DialogBox, DialogTitle, ButtonRow, PrefillBtn } from './RequestDialog.styled'

const SAVED_PHONE_KEY = 'uslehne_lastPhone'
const PHONE_CHANNELS = ['SMS', 'WHATSAPP', 'SIGNAL'] as const

interface Props {
  offerId: string
  offerType: OfferType
  onClose: () => void
}

interface FormValues {
  contactType: 'SMS' | 'WHATSAPP' | 'SIGNAL' | 'EMAIL'
  contactValue: string
  message?: string
}

export function RequestDialog({ offerId, offerType, onClose }: Props) {
  const { t } = useTranslation(['transactions', 'common'])
  const [success, setSuccess] = useState(false)
  const savedPhone = localStorage.getItem(SAVED_PHONE_KEY) ?? ''

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ defaultValues: { contactType: 'SMS' } })

  const contactType = watch('contactType')
  const isPhoneChannel = (PHONE_CHANNELS as readonly string[]).includes(contactType)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  async function onSubmit(values: FormValues) {
    try {
      if (isPhoneChannel && values.contactValue) {
        localStorage.setItem(SAVED_PHONE_KEY, values.contactValue)
      }
      await transactionApi.request(offerId, values)
      setSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors:GENERIC', { ns: 'errors' })
      setError('root', { message: msg })
    }
  }

  const messagePlaceholder =
    offerType === 'LEND'
      ? t('transactions:requestDialog.messagePlaceholderLend')
      : t('transactions:requestDialog.messagePlaceholderGive')

  return (
    <Overlay onClick={onClose}>
      <DialogBox
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle id="request-dialog-title">{t('transactions:requestDialog.title')}</DialogTitle>
        {success ? (
          <>
            <p>{t('transactions:requestDialog.success')}</p>
            <ButtonRow>
              <Button onClick={onClose}>OK</Button>
            </ButtonRow>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>{t('transactions:requestDialog.contactType')}</Label>
              <Select {...register('contactType', { required: true })}>
                <option value="SMS">{t('transactions:requestDialog.sms')}</option>
                <option value="WHATSAPP">{t('transactions:requestDialog.whatsapp')}</option>
                <option value="SIGNAL">{t('transactions:requestDialog.signal')}</option>
                <option value="EMAIL">{t('transactions:requestDialog.email')}</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>{t('transactions:requestDialog.contactValue')}</Label>
              <Input
                {...register('contactValue', { required: true })}
                type={isPhoneChannel ? 'tel' : 'email'}
                placeholder={
                  isPhoneChannel
                    ? t('transactions:requestDialog.phonePlaceholder')
                    : t('transactions:requestDialog.emailPlaceholder')
                }
              />
              {isPhoneChannel && savedPhone && (
                <PrefillBtn type="button" onClick={() => setValue('contactValue', savedPhone)}>
                  {t('transactions:requestDialog.useSaved')}: {savedPhone}
                </PrefillBtn>
              )}
              {errors.contactValue && <ErrorMsg>{errors.contactValue.message}</ErrorMsg>}
            </FormGroup>
            <FormGroup>
              <Label>{t('transactions:requestDialog.message')}</Label>
              <Textarea {...register('message')} placeholder={messagePlaceholder} />
            </FormGroup>
            {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
            <ButtonRow>
              <Button type="submit" disabled={isSubmitting}>
                {t('transactions:requestDialog.submit')}
              </Button>
              <Button $variant="secondary" type="button" onClick={onClose}>
                {t('common:actions.cancel')}
              </Button>
            </ButtonRow>
          </form>
        )}
      </DialogBox>
    </Overlay>
  )
}
