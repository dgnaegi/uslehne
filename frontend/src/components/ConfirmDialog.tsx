import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './Layout.styled'
import { Overlay, DialogBox, DialogTitle, ButtonRow } from './Dialog.styled'

interface Props {
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation(['common'])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onCancel])

  return (
    <Overlay onClick={onCancel}>
      <DialogBox
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <p>{message}</p>
        <ButtonRow>
          <Button $variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmLabel ?? t('common:actions.confirm')}
          </Button>
          <Button $variant="secondary" onClick={onCancel}>
            {t('common:actions.cancel')}
          </Button>
        </ButtonRow>
      </DialogBox>
    </Overlay>
  )
}
