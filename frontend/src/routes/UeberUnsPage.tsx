import { PageWrapper, PageTitle } from '../components/Layout.styled'
import { Lead, Section, SectionTitle, P, Tag } from './UeberUnsPage.styled'

export function UeberUnsPage() {
  return (
    <PageWrapper>
      <PageTitle>Über uns</PageTitle>

      <Lead>
        uslehne ist eine Tauschplattform für das Quartier. Dinge verleihen und verschenken, statt
        sie wegzuwerfen.
      </Lead>

      <Section>
        <Tag>Kein Startup</Tag>
        <P>
          Wir sind Daniel und Rahel, aus Zürich. Keine Investor*innen, kein Risikokapital. Dank
          KI-unterstützter Entwicklung sind gemeinnützige Applikationen heute ohne finanzielle
          Unterstützung machbar. Was früher ein ganzes Entwicklerteam gebraucht hätte, können heute
          zwei Menschen mit einer Idee aufbauen.
        </P>
      </Section>

      <Section>
        <SectionTitle>Karma</SectionTitle>
        <P>
          Auf uslehne gibt es keine Franken. Stattdessen Karma: eine interne Währung, bewusst vom
          Marktwert des Objekts entkoppelt. Für eine Bohrmaschine brauchst du gleich viel Karma
          wie für ein Buch.
        </P>
        <P>
          Wer viel verleiht und verschenkt, sammelt Karma und kann selbst mehr anfragen. Vertrauen
          durch Gegenseitigkeit, ohne Preisschild.
        </P>
      </Section>

      <Section>
        <SectionTitle>So funktioniert's</SectionTitle>
        <P>
          Stöbere durch Angebote in deinem Quartier, gefiltert nach PLZ. Siehst du etwas, das du
          brauchst? Swipe nach rechts oder klick auf «Anfragen», schreib eine kurze Nachricht und
          warte auf die Bestätigung.
        </P>
        <P>
          Für Ausleihen bestätigen beide Seiten den Austausch. Danach gibt's Karma und die
          Möglichkeit, sich gegenseitig zu bewerten.
        </P>
      </Section>

      <Section>
        <SectionTitle>Deine Daten</SectionTitle>
        <P>
          Alle Daten liegen auf EU-Servern in Frankreich. Kein Tracking, keine Werbung, keine
          Analyse-Cookies.
        </P>
      </Section>

      <Section>
        <SectionTitle>Beta</SectionTitle>
        <P>
          uslehne ist in der Beta-Phase. Es läuft nicht alles perfekt. Nutze den «Bug»-Button unten
          rechts, um Feedback zu geben. Jeder Hinweis hilft.
        </P>
      </Section>
    </PageWrapper>
  )
}
