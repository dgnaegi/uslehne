# Quartier-Flyer

Print-Vorlage: [flyer.html](./flyer.html). Im Browser öffnen und als A5 drucken (Hintergrundgrafiken aktivieren).

## Format

**A5 hoch** (148 × 210 mm), handlich für Briefkästen, Quartierläden, Pinnwände.

## Text

Geprüft gegen [UX_WRITING.md](./UX_WRITING.md) und [TYPOGRAFIE.md](./TYPOGRAFIE.md).

| Element | Text |
|---|---|
| Logo | uslehne |
| Headline | Leihen und schenken ohne Geld. |
| Intro | Bohrmaschine, Fondue-Caquelon, Veloanhänger: Vieles steht bei deinen Nachbar*innen ungenutzt herum. Auf uslehne.ch leihst du es aus oder verschenkst, was du selbst nicht mehr brauchst. |
| Abschnittstitel | So funktioniert's |
| Schritt 1 | Du trittst per Einladung bei und startest mit 20 Kudos. |
| Schritt 2 | Du fragst ein Angebot an. Die Anbieter*in meldet sich bei dir. |
| Schritt 3 | Leihen kostet Kudos, Verleihen bringt Kudos. Geld gibt's keins. |
| Zugang | Zugang nur per Einladung. Scann den Code und tritt bei. |
| QR | *(Einladungslink als QR-Code, siehe Hinweis unten)* |
| Footer | uslehne.ch, Zürich |

## Design

Alle Werte aus `frontend/src/theme.ts`. Der Flyer sieht aus wie die App.

### Farben

| Verwendung | Farbe | Token |
|---|---|---|
| Hintergrund | `#FFFFFF` | `background` |
| Text, Rahmen | `#1a1a1a` | `primary` / `border` |
| Headline-Block | `#FFD600` | `accent` |
| „So funktionierts"-Block | `#B8E1F9` | `pastelBlue` |

Maximal diese vier Farben. Kontrast Schwarz auf Gelb und Schwarz auf Pastellblau erfüllt WCAG AA.

### Schrift

| Verwendung | Font | Grösse (A5) |
|---|---|---|
| Logo | Bangers | ~64 pt |
| Headline | Bangers | ~34 pt |
| Fliesstext, Schritte | Inter Regular | 11–12 pt |
| Abschnittstitel | Inter Bold, Versalien | 12 pt |
| Footer | Inter Regular | 9 pt |

### Stil

- **Streng rechteckig**: keine abgerundeten Ecken (`radius: 0`)
- **Flach**: keine Schatten, keine Verläufe
- **2 px schwarze Rahmen** um farbige Blöcke, wie in der App (`border: 2px solid #1a1a1a`)
- Viel Weissraum, linksbündig, kein Blocksatz

## Hinweis: Einladungslink

Registrierung geht nur per Einladung, und normale Accounts können max. 3 Links erstellen.
Für einen Flyer mit Reichweite braucht der QR-Code einen **Admin-Einladungslink** (unbegrenzt).
Oder du legst pro Aushang einen eigenen Link an, dann siehst du gleich, welcher Standort funktioniert.
