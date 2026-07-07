import { useState } from 'react'
import { IconBug } from '../icons/IconBug'
import { IconX } from '../icons/IconX'
import { Button } from './Layout.styled'
import {
  Fab,
  Overlay,
  Panel,
  PanelHeader,
  PanelTitle,
  CloseButton,
  BugTextArea,
  PanelActions,
  SuccessMsg,
} from './BugReportButton.styled'
import { api } from '../api/client'

export function BugReportButton() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit() {
    if (!message.trim()) return
    setLoading(true)
    try {
      await api.post<{ ok: boolean }>('/bug-report', { message })
      setSuccess(true)
      setMessage('')
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setOpen(false)
    setMessage('')
    setSuccess(false)
  }

  return (
    <>
      {open && (
        <Overlay onClick={handleClose}>
          <Panel onClick={(e) => e.stopPropagation()}>
            <PanelHeader>
              <PanelTitle>Bug melden</PanelTitle>
              <CloseButton onClick={handleClose} aria-label="Schliessen">
                <IconX size={16} />
              </CloseButton>
            </PanelHeader>
            {success ? (
              <SuccessMsg>Danke, gesendet!</SuccessMsg>
            ) : (
              <>
                <BugTextArea
                  placeholder="Was ist passiert?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
                <PanelActions>
                  <Button onClick={handleSubmit} disabled={loading || !message.trim()}>
                    Senden
                  </Button>
                </PanelActions>
              </>
            )}
          </Panel>
        </Overlay>
      )}
      <Fab onClick={() => setOpen((o) => !o)} aria-label="Bug melden">
        <IconBug size={14} />
      </Fab>
    </>
  )
}
