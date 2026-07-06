import { useNavigate } from 'react-router-dom'
import { PageWrapper, PageTitle } from '../components/Layout.styled'
import { P, BackButton } from './ImpressumPage.styled'

export function ImpressumPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <BackButton $variant="secondary" onClick={() => navigate(-1)}>
        ← Zurück
      </BackButton>
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
        uslehne.ch ist ein nicht-kommerzielles Privatprojekt. Keine Handelsregistereintragung, keine
        Mehrwertsteuerpflicht.
      </P>
    </PageWrapper>
  )
}
