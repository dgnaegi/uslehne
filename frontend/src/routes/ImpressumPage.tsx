import { useNavigate } from 'react-router-dom'
import { PageWrapper, PageTitle, Button } from '../components/Layout.styled'
import styled from 'styled-components'

const P = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 680px;
`

export function ImpressumPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <Button $variant="secondary" onClick={() => navigate(-1)} style={{ marginBottom: '24px' }}>
        ← Zurück
      </Button>
      <PageTitle>Impressum</PageTitle>
      <P>
        <strong>Verantwortlich für den Inhalt dieser Website:</strong>
      </P>
      <P>
        Daniel Gnägi
        <br />
        Zürich, Schweiz
        <br />
        <a href="mailto:daniel.gnaegi@outlook.com">daniel.gnaegi@outlook.com</a>
      </P>
      <P>
        uslehne.ch ist ein nicht-kommerzielles Privatprojekt. Keine Handelsregistereintragung,
        keine Mehrwertsteuerpflicht.
      </P>
    </PageWrapper>
  )
}
