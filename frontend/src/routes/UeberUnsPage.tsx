import { PageWrapper, PageTitle } from '../components/Layout.styled'
import { Lead, Section, SectionTitle, P, Tag, KarmaList, KarmaRow } from './UeberUnsPage.styled'

export function UeberUnsPage() {
  return (
    <PageWrapper>
      <PageTitle>Über uns</PageTitle>

      <Lead>
        uslehne ist eine Tauschplattform für das Quartier. Dinge verleihen und verschenken, statt
        sie wegzuwerfen.
      </Lead>

      <Section>
        <Tag>Keine kommerziellen Interessen</Tag>
        <P>
          Wir sind Daniel und Rahel, aus Zürich. uslehne ist ein Projekt ohne finanzielle Absichten,
          und das soll so bleiben. Dank KI-unterstützter Entwicklung lässt sich so etwas heute zu
          zweit aufbauen und betreiben, ohne dass dahinter ein Geschäftsmodell stecken muss.
        </P>
      </Section>

      <Section>
        <SectionTitle>Karma</SectionTitle>
        <P>
          Auf uslehne gibt es keine Franken. Stattdessen Karma: eine interne Währung, bewusst vom
          Marktwert des Objekts entkoppelt. Für eine Bohrmaschine brauchst du gleich viel Karma wie
          für ein Buch.
        </P>
        <P>
          Wer viel verleiht und verschenkt, sammelt Karma und kann selbst mehr anfragen. Vertrauen
          durch Gegenseitigkeit, ohne Preisschild.
        </P>
        <KarmaList>
          <KarmaRow $positive>
            <span>Registrierung via Einladung</span>
            <span>+10</span>
          </KarmaRow>
          <KarmaRow $positive>
            <span>Jemanden einladen</span>
            <span>+1</span>
          </KarmaRow>
          <KarmaRow $positive>
            <span>Etwas verleihen</span>
            <span>+1</span>
          </KarmaRow>
          <KarmaRow>
            <span>Etwas ausleihen</span>
            <span>-1</span>
          </KarmaRow>
          <KarmaRow $positive>
            <span>Etwas verschenken</span>
            <span>+5</span>
          </KarmaRow>
          <KarmaRow>
            <span>Etwas erhalten</span>
            <span>-5</span>
          </KarmaRow>
        </KarmaList>
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
