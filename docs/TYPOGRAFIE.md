# Typografie & Sprache

## Anrede

Konsequente **Du**-Form. Kein formelles „Sie".

| ✓ | ✗ |
|---|---|
| „Du hast noch keine Angebote." | „Sie haben noch keine Angebote." |
| „Bitte melde dich an." | „Bitte melden Sie sich an." |
| „Deine Anfragen" | „Ihre Anfragen" |

---

## Gendergerechte Sprache

Konsequent **Genderstern** (`*`) verwenden. Kein generisches Maskulinum.

Bevorzugte Formen — in dieser Reihenfolge:

1. **Neutrale Personenform** (wo natürlich): „die eingeladene Person", „die anfragende Person"
2. **Genderstern**: `Nutzer*in`, `Anbieter*in`, `Anfragende*r`

| ✓ | ✗ |
|---|---|
| „Die eingeladene Person erhält 20 Karma." | „Der Eingeladene erhält 20 Karma." |
| „Nutzer*innen in Zürich" | „Nutzer in Zürich" |
| „Anbieter*in" | „Anbieter" |

---

## Zeichensetzung

| Zeichen | Korrekt | Falsch |
|---|---|---|
| Auslassungspunkte | `…` (U+2026) | `...` |
| Anführungszeichen | `„…"` | `"…"` |
| Apostroph | `'` (typografisch) | `'` |

---

## Karma

- Immer grossgeschrieben
- Singular und Plural: **Karma** (unveränderlich)

| ✓ | ✗ |
|---|---|
| „Kostet 1 Karma" | „Kostet 1 Kudos" |
| „Du erhältst 5 Karma" | „Du erhältst 5 karma" |

---

## Accessibility

- **Tastaturnavigation**: Alle interaktiven Elemente (Links, Buttons, Inputs, Modals) müssen per `Tab` erreichbar und per `Enter`/`Space` bedienbar sein.
- **Screenreader**: Buttons und Icons ohne sichtbaren Text brauchen `aria-label`. Modals brauchen `role="dialog"` und `aria-modal="true"`.
- **Fokus-Reihenfolge**: Logische DOM-Reihenfolge beibehalten — kein `tabIndex > 0`.
- **Kontrastminimum**: Text auf Hintergrund mind. 4.5:1 (WCAG AA).
- **Keine rein farbbasierten Zustände**: Fehler, Status etc. immer zusätzlich mit Text oder Icon signalisieren.

| ✓ | ✗ |
|---|---|
| `<button aria-label="Schliessen">✕</button>` | `<div onClick={…}>✕</div>` |
| `<input aria-describedby="err-1">` + `<p id="err-1">…</p>` | Fehlertext ohne Verknüpfung |

---

## Schrift

| Verwendung | Font | Fallback |
|---|---|---|
| Fliesstext, Labels, Nav | Inter | system-ui, sans-serif |
| Logo, dekorative Headlines | Bangers | Impact, system-ui |

Definiert in `frontend/src/theme.ts` → `theme.font` / `theme.fontComic`.  
Nie direkt im Code hardcoden — immer über das Theme.
