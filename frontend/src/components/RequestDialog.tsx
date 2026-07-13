import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { ContactType, OfferType } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { Button } from './Layout.styled'
import { FormGroup, Label, Textarea, ErrorMsg } from './Form.styled'
import { Overlay, DialogBox, DialogTitle, ButtonRow } from './Dialog.styled'
import { FieldHint } from './RequestDialog.styled'
import { PhoneField } from './PhoneField'
import { saveContact } from '../utils/savedContacts'
import { ProcessTimeline } from './ProcessTimeline'

interface Props {
  offerId: string
  offerType: OfferType
  onClose: () => void
}

interface FormValues {
  contactType: ContactType
  contactValue: string
  message?: string
}

export function RequestDialog({ offerId, offerType, onClose }: Props) {
  const { t } = useTranslation(['transactions', 'common'])
  const { user } = useAuth()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ defaultValues: { contactType: 'SMS', contactValue: '' } })

  const contactType = watch('contactType')
  const contactValue = watch('contactValue')

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  async function onSubmit(values: FormValues) {
    try {
      await transactionApi.request(offerId, {
        contactType: values.contactType,
        contactValue: values.contactValue,
        message: values.message,
      })
      saveContact(user!.id, values.contactType, values.contactValue)
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
        <ProcessTimeline offerType={offerType} activeStep={0} compact role="requester" />
        {success ? (
          <>
            <p>{t('transactions:requestDialog.success')}</p>
            <ButtonRow>
              <Button onClick={onClose}>OK</Button>
            </ButtonRow>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('contactType', { required: true })} />
            <input type="hidden" {...register('contactValue', { required: true })} />
            <FormGroup>
              <Label>{t('transactions:requestDialog.contactType')}</Label>
              <PhoneField
                userId={user!.id}
                selectedType={contactType}
                selectedValue={contactValue}
                onSelect={(type, value) => {
                  setValue('contactType', type, { shouldValidate: true })
                  setValue('contactValue', value, { shouldValidate: true })
                }}
              />
              {errors.contactValue && (
                <ErrorMsg>{t('transactions:requestDialog.contactRequired')}</ErrorMsg>
              )}
            </FormGroup>
            <FormGroup>
              <Label>{t('transactions:requestDialog.message')}</Label>
              <Textarea {...register('message')} placeholder={messagePlaceholder} />
              <FieldHint>{t('transactions:requestDialog.messageHint')}</FieldHint>
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
