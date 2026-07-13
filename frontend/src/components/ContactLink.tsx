import type { ReactNode } from 'react'
import { buildContactUrl } from '../utils/contactUrl'
import { ContactAnchor, ContactPlain } from './ContactLink.styled'

interface Props {
  type: string
  value: string
  icon: ReactNode
}

// Zeigt den Kontakt als Link; ohne baubare URL (Signal-Benutzername) als Text.
export function ContactLink({ type, value, icon }: Props) {
  const url = buildContactUrl(type, value)
  if (!url) {
    return (
      <ContactPlain>
        {icon} {value}
      </ContactPlain>
    )
  }
  return (
    <ContactAnchor href={url} target="_blank" rel="noopener noreferrer">
      {icon} {value}
    </ContactAnchor>
  )
}
