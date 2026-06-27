import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Address } from '../api/types'
import { offerApi, addressApi } from '../api/endpoints'
import { resizeImage } from '../utils/imageResize'
import { AddressInlineCreate } from '../components/AddressInlineCreate'
import {
  PageWrapper,
  PageTitle,
  FormGroup,
  FormActions,
  Label,
  Input,
  Textarea,
  Select,
  Button,
  ErrorMsg,
} from '../components/Layout.styled'
import { ImagePreview } from './OfferFormPage.styled'

interface FormValues {
  title: string
  description: string
  type: 'LEND' | 'GIVE'
  addressId: string
}

export function OfferFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const { t } = useTranslation(['offers', 'common'])
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [imageDataUrl, setImageDataUrl] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>()

  useEffect(() => {
    addressApi.list().then(({ addresses: a }) => setAddresses(a))
    if (isEdit && id) {
      offerApi.get(id).then(({ offer }) => {
        reset({
          title: offer.title,
          description: offer.description,
          type: offer.type,
          addressId: offer.addressId,
        })
        setImageDataUrl(offer.imageRef)
      })
    }
  }, [id, isEdit, reset])

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageDataUrl(await resizeImage(file))
  }

  async function onSubmit(values: FormValues) {
    try {
      if (isEdit && id) {
        await offerApi.update(id, { ...values, image: imageDataUrl || undefined })
      } else {
        if (!imageDataUrl) {
          setError('root', { message: 'Bitte Bild auswählen.' })
          return
        }
        await offerApi.create({ ...values, image: imageDataUrl })
      }
      navigate('/my-offers')
    } catch (err: unknown) {
      setError('root', {
        message: err instanceof Error ? err.message : t('errors:GENERIC', { ns: 'errors' }),
      })
    }
  }

  const hasAddresses = addresses.length > 0

  return (
    <PageWrapper>
      <PageTitle>{isEdit ? t('offers:editOffer') : t('offers:createOffer')}</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>{t('offers:offerTitle')}</Label>
          <Input {...register('title', { required: true, maxLength: 80 })} />
          {errors.title && <ErrorMsg>{errors.title.message}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>{t('offers:description')}</Label>
          <Textarea {...register('description', { required: true, maxLength: 2000 })} />
          {errors.description && <ErrorMsg>{errors.description.message}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>{t('offers:type')}</Label>
          <Select {...register('type', { required: true })}>
            <option value="">{t('offers:selectType')}</option>
            <option value="LEND">{t('common:offerType.LEND')}</option>
            <option value="GIVE">{t('common:offerType.GIVE')}</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>{t('offers:address')}</Label>
          {!hasAddresses && !isEdit ? (
            <AddressInlineCreate
              onCreated={(newId) => {
                addressApi.list().then(({ addresses: a }) => {
                  setAddresses(a)
                  setValue('addressId', newId)
                })
              }}
            />
          ) : (
            <Select {...register('addressId', { required: true })}>
              <option value="">{t('offers:selectAddress')}</option>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label ? `${a.label} — ` : ''}
                  {a.street}, {a.city}
                </option>
              ))}
            </Select>
          )}
        </FormGroup>
        <FormGroup>
          <Label>{t('offers:image')}</Label>
          {imageDataUrl && <ImagePreview src={imageDataUrl} alt="Vorschau" />}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
          />
        </FormGroup>
        {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
        <FormActions>
          <Button type="submit" disabled={isSubmitting || (!hasAddresses && !isEdit)}>
            {t('common:actions.save')}
          </Button>
          <Button $variant="secondary" type="button" onClick={() => navigate(-1)}>
            {t('common:actions.cancel')}
          </Button>
        </FormActions>
      </form>
    </PageWrapper>
  )
}
