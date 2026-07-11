import { useNavigate } from 'react-router-dom'
import { PageWrapper, PageTitle, Button } from '../components/Layout.styled'
import styled from 'styled-components'

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const H2 = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const P = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 680px;
`

const Ul = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  max-width: 680px;

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

export function PrivacyPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <Button $variant="secondary" onClick={() => navigate(-1)} style={{ marginBottom: '24px' }}>
        ← Zurück
      </Button>
      <PageTitle>Datenschutzerklärung</PageTitle>
      <P>
        Wir nehmen den Schutz deiner Daten ernst — fast so ernst wie das Ausleihen von
        Bohrmaschinen. Diese Erklärung gilt gemäss dem Schweizer Datenschutzgesetz (DSG).
      </P>

      <Section>
        <H2>Verantwortliche Stelle</H2>
        <P>Verantwortlich für die Datenbearbeitung auf uslehne.ch ist:</P>
        <P>
          Daniel Gnägi
          <br />
          Zürich, Schweiz
          <br />
          <a href="mailto:daniel.gnaegi@outlook.com">daniel.gnaegi@outlook.com</a>
        </P>
      </Section>

      <Section>
        <H2>Welche Daten wir bearbeiten</H2>
        <P>Wir erheben nur, was wirklich nötig ist:</P>
        <Ul>
          <li>
            <strong>Registrierung:</strong> Benutzername, E-Mail-Adresse, Passwort (mit bcrypt
            gehasht, nie im Klartext)
          </li>
          <li>
            <strong>Angebote:</strong> Titel, Beschreibung, Angebotstyp, PLZ, Kontaktangabe (Telefon
            oder E-Mail), Foto
          </li>
          <li>
            <strong>Transaktionen:</strong> Anfragen zwischen Nutzenden inkl. optionaler Nachricht
          </li>
          <li>
            <strong>Karma-Verlauf:</strong> Kontobewegungen der plattforminternen Währung
          </li>
          <li>
            <strong>Einladungen:</strong> Einladungscodes und deren Nutzung
          </li>
          <li>
            <strong>Passwort-Reset:</strong> E-Mail-Adresse und ein temporärer Token (1 Stunde
            gültig, danach automatisch ungültig)
          </li>
        </Ul>
        <P>
          Wir speichern keine Kreditkartendaten, kein Tracking-Pixel, keine Cookies für Werbezwecke.
          Wir haben schlicht keine Zeit dafür.
        </P>
      </Section>

      <Section>
        <H2>Zweck und Rechtsgrundlage</H2>
        <P>
          Deine Daten werden ausschliesslich für den Betrieb der Plattform verwendet — also damit du
          Dinge verleihen, verschenken und anfragen kannst. Rechtsgrundlage ist die
          Vertragserfüllung (Art. 31 Abs. 2 lit. a DSG) sowie das überwiegende Interesse am Betrieb
          einer funktionierenden Sharing-Plattform.
        </P>
      </Section>

      <Section>
        <H2>Hosting &amp; Infrastruktur — Europäisch, versteht sich</H2>
        <P>
          Wir legen Wert auf europäische Infrastruktur. Deine Daten verlassen Europa nicht — weder
          für ein Nickerchen in Übersee noch aus anderen Gründen:
        </P>
        <Ul>
          <li>
            <strong>Scalingo</strong> (Frankreich) — Hosting der Applikation und der
            PostgreSQL-Datenbank. ISO 27001-zertifiziert, Rechenzentren in Frankreich.
          </li>
          <li>
            <strong>Scaleway</strong> (Frankreich) — Speicherung von Angebotsfotos in Object
            Storage. Ebenfalls ISO 27001-zertifiziert, Rechenzentren in Paris.
          </li>
          <li>
            <strong>Brevo</strong> (Frankreich) — Versand von transaktionalen E-Mails (z.B.
            Passwort-Reset). Deine E-Mail-Adresse wird ausschliesslich für diesen Zweck übermittelt.
            Rechenzentren in der EU.
          </li>
        </Ul>
        <P>Keine US-Cloud, kein AWS, kein Google Cloud. Merci bien.</P>
      </Section>

      <Section>
        <H2>Speicherdauer</H2>
        <P>
          Deine Daten werden gespeichert, solange dein Konto aktiv ist. Wenn du dein Konto löschst,
          werden deine personenbezogenen Daten gelöscht, soweit keine gesetzliche
          Aufbewahrungspflicht besteht. Angebotsfotos werden aus dem Bildspeicher entfernt, wenn das
          zugehörige Angebot gelöscht wird.
        </P>
      </Section>

      <Section>
        <H2>Deine Rechte</H2>
        <P>Du hast gemäss DSG folgende Rechte:</P>
        <Ul>
          <li>
            <strong>Auskunft</strong> — welche Daten wir über dich gespeichert haben
          </li>
          <li>
            <strong>Berichtigung</strong> — Korrektur falscher Daten
          </li>
          <li>
            <strong>Löschung</strong> — Entfernung deiner Daten
          </li>
          <li>
            <strong>Datenherausgabe</strong> — deine Daten in einem übertragbaren Format
          </li>
          <li>
            <strong>Widerspruch</strong> — gegen bestimmte Datenbearbeitungen
          </li>
        </Ul>
        <P>
          Für all das genügt eine kurze E-Mail an{' '}
          <a href="mailto:daniel.gnaegi@outlook.com">daniel.gnaegi@outlook.com</a>. Wir antworten
          innerhalb von 30 Tagen — meistens schneller.
        </P>
      </Section>

      <Section>
        <H2>Sicherheit</H2>
        <P>
          Die Verbindung zur Plattform ist durchgehend TLS-verschlüsselt (HTTPS). Passwörter werden
          mit bcrypt gehasht und nie im Klartext gespeichert. Authentifizierung erfolgt über
          signierte JWTs.
        </P>
      </Section>

      <Section>
        <H2>Änderungen</H2>
        <P>
          Diese Datenschutzerklärung kann gelegentlich angepasst werden. Die jeweils aktuelle
          Version ist immer auf dieser Seite zu finden. Stand: Juli 2026.
        </P>
      </Section>
    </PageWrapper>
  )
}
