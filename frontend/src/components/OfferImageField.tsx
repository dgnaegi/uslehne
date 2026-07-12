import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { resizeImage } from '../utils/imageResize'
import { FormGroup, Label } from './Form.styled'
import { AspectRatioHint } from './AspectRatioHint'
import { IconRepeat } from '../icons'
import { ImagePreview, ImagePreviewWrapper, ReplaceImageButton } from './OfferImageField.styled'

interface OfferImageFieldProps {
  value: string
  onChange: (dataUrl: string) => void
}

export function OfferImageField({ value, onChange }: OfferImageFieldProps) {
  const { t } = useTranslation('offers')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(await resizeImage(file))
  }

  return (
    <FormGroup>
      <Label>{t('image')}</Label>
      {value ? (
        <ImagePreviewWrapper>
          <ImagePreview src={value} alt="Vorschau" />
          <ReplaceImageButton
            type="button"
            title="Bild ersetzen"
            onClick={() => fileInputRef.current?.click()}
          >
            <IconRepeat size={14} />
          </ReplaceImageButton>
        </ImagePreviewWrapper>
      ) : (
        <AspectRatioHint
          onClick={() => fileInputRef.current?.click()}
          onFileDrop={async (file) => onChange(await resizeImage(file))}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageChange}
        hidden
      />
    </FormGroup>
  )
}
