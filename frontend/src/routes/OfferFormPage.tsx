import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Address, OfferCategory } from '../api/types'
import { offerApi, addressApi } from '../api/endpoints'
import { OfferAddressField } from '../components/OfferAddressField'
import { OfferImageField } from '../components/OfferImageField'
import { OfferTypeCategoryFields } from '../components/OfferTypeCategoryFields'
import { PageWrapper, PageTitle, Button } from '../components/Layout.styled'
import { FormGroup, FormActions, Label, Input, Textarea, ErrorMsg } from '../components/Form.styled'

interface FormValues {
  title: string
  description: string
  type: 'LEND' | 'GIVE'
  category: OfferCategory
  addressId: string
  zip: string
}

export function OfferFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const { t } = useTranslation(['offers', 'common'])
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [pendingAddressId, setPendingAddressId] = useState<string | null>(null)
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
          category: offer.category,
          addressId: offer.addressId,
        })
        setImageUrl(offer.imageRef)
      })
    }
  }, [id, isEdit, reset])

  // Set addressId after the Select has mounted (addresses state updated first)
  useEffect(() => {
    if (pendingAddressId) {
      setValue('addressId', pendingAddressId)
      setPendingAddressId(null)
    }
  }, [pendingAddressId, addresses, setValue])

  function handleAddressCreated(newAddress: Address) {
    setAddresses((prev) => [...prev, newAddress])
    setPendingAddressId(newAddress.id)
  }

  async function onSubmit(values: FormValues) {
    try {
      if (!isEdit && !imageUrl) {
        setError('root', { message: 'Bitte Bild auswählen.' })
        return
      }
      let addressId = values.addressId
      if (!addressId && values.zip) {
        const { address } = await addressApi.create({ zip: values.zip.trim() })
        handleAddressCreated(address)
        addressId = address.id
      }
      if (isEdit && id) {
        await offerApi.update(id, { ...values, image: imageUrl || undefined })
      } else {
        await offerApi.create({ ...values, addressId, image: imageUrl })
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
        <OfferTypeCategoryFields
          typeProps={register('type', { required: true })}
          categoryProps={register('category', { required: true })}
        />
        <OfferAddressField
          addresses={addresses}
          showInlineCreateOnly={!hasAddresses}
          selectProps={register('addressId', { required: hasAddresses })}
          zipProps={register('zip', {
            required: !hasAddresses && !isEdit,
            pattern: /^\d{4}$/,
          })}
          zipError={errors.zip ? t('offers:zipInvalid') : ''}
          onAddressCreated={handleAddressCreated}
        />
        <OfferImageField
          value={imageUrl}
          onChange={setImageUrl}
          uploading={imageUploading}
          onUploadingChange={setImageUploading}
        />
        {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
        <FormActions>
          <Button type="submit" disabled={isSubmitting || imageUploading}>
            {isEdit ? t('common:actions.save') : t('offers:createOffer')}
          </Button>
          <Button $variant="secondary" type="button" onClick={() => navigate(-1)}>
            {t('common:actions.cancel')}
          </Button>
        </FormActions>
      </form>
    </PageWrapper>
  )
}
