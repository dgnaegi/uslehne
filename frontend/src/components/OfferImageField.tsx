import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { imageApi } from '../api/endpoints'
import { apiMsg } from '../api/client'
import { resizeImage } from '../utils/imageResize'
import { FormGroup, Label, ErrorMsg } from './Form.styled'
import { AspectRatioHint } from './AspectRatioHint'
import { Spinner } from './Spinner'
import { IconRepeat, IconX } from '../icons'
import {
  ImagePreview,
  ImagePreviewWrapper,
  ReplaceImageButton,
  DeleteImageButton,
  UploadOverlay,
} from './OfferImageField.styled'

interface OfferImageFieldProps {
  value: string
  onChange: (url: string) => void
  uploading: boolean
  onUploadingChange: (uploading: boolean) => void
}

export function OfferImageField({
  value,
  onChange,
  uploading,
  onUploadingChange,
}: OfferImageFieldProps) {
  const { t } = useTranslation('offers')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [localPreview, setLocalPreview] = useState('')
  // Filename of an image uploaded in this session — only those may be deleted from S3
  const [uploadedFilename, setUploadedFilename] = useState('')
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    if (uploading) return
    setError('')
    const dataUrl = await resizeImage(file)
    setLocalPreview(dataUrl)
    onUploadingChange(true)
    try {
      const { filename, url } = await imageApi.upload(dataUrl)
      if (uploadedFilename) imageApi.delete(uploadedFilename).catch(() => {})
      setUploadedFilename(filename)
      onChange(url)
    } catch (err) {
      setError(apiMsg(err, t('uploadError')))
    } finally {
      setLocalPreview('')
      onUploadingChange(false)
    }
  }

  function handleDelete() {
    if (uploading) return
    if (uploadedFilename) imageApi.delete(uploadedFilename).catch(() => {})
    setUploadedFilename('')
    onChange('')
  }

  const preview = localPreview || value

  return (
    <FormGroup>
      <Label>{t('image')}</Label>
      {preview ? (
        <ImagePreviewWrapper>
          <ImagePreview src={preview} alt="Vorschau" />
          {uploading ? (
            <UploadOverlay>
              <Spinner />
            </UploadOverlay>
          ) : (
            <>
              <ReplaceImageButton
                type="button"
                title={t('changeImage')}
                onClick={() => fileInputRef.current?.click()}
              >
                <IconRepeat size={14} />
              </ReplaceImageButton>
              {uploadedFilename && (
                <DeleteImageButton type="button" title={t('deleteImage')} onClick={handleDelete}>
                  <IconX size={14} />
                </DeleteImageButton>
              )}
            </>
          )}
        </ImagePreviewWrapper>
      ) : (
        <AspectRatioHint onClick={() => fileInputRef.current?.click()} onFileDrop={handleFile} />
      )}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0]
          e.target.value = ''
          if (file) handleFile(file)
        }}
        disabled={uploading}
        hidden
      />
    </FormGroup>
  )
}
