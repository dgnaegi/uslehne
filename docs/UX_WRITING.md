# UX-Texte

Gilt für alle UI-Texte, Fehlermeldungen und transaktionalen E-Mails. Grundregeln aus [TYPOGRAFIE.md](./TYPOGRAFIE.md) — Du-Form, Genderstern, Zeichensetzung — gelten weiterhin.

## Stimme

Schreib wie jemand, der einer Kolleg*in erklärt, was gerade passiert. Kein Support-Bot, keine Werbeagentur, kein Corporate-Wir.

| ✓ | ✗ |
|---|---|
| „Schön, dass du dabei bist. Du kannst jetzt Gegenstände in deiner Nachbarschaft ausleihen und verleihen." | „Herzlich willkommen! Wir freuen uns riesig, dich als Mitglied begrüssen zu dürfen!" |
| „Da ist etwas schiefgelaufen. Lade die Seite neu." | „Oops! Es tut uns leid, aber leider ist ein Fehler aufgetreten 😕" |
| „Zugang nur per Einladung." | „Bitte beachte, dass die Registrierung ausschliesslich per gültigem Einladungscode möglich ist." |
| „Die Anbieter*in meldet sich bald bei dir." | „Bitte hab etwas Geduld und warte auf eine Rückmeldung des Anbieters/der Anbieterin." |
| „Anfrage gesendet." | „Super! Deine Anfrage wurde erfolgreich übermittelt!" |

## Satzbau

Kurze Sätze. Aktiv. Ohne Füllwörter. Kontraktionen ('s, 's) dort, wo sie natürlich klingen. Kein Fachjargon, ausser der Begriff ist geläufig (z.B. „Karma").

| ✓ | ✗ |
|---|---|
| „Anfrage fehlgeschlagen. Versuch es noch einmal." | „Die Verarbeitung deiner Anfrage war aufgrund eines technischen Fehlers leider nicht möglich." |
| „Du hast den Austausch bestätigt. Warte auf die andere Person." | „Du hast bestätigt, dass der Austausch stattgefunden hat. Bitte warte nun auf die Bestätigung der anderen beteiligten Person." |
| „Da ist etwas schiefgelaufen. Lade die Seite neu." | „Es ist ein unbekannter Fehler aufgetreten. Bitte versuche, die Seite neu zu laden, oder kontaktiere uns, falls das Problem weiterhin besteht." |
| „Sobald jemand dein Angebot anfrägt, erscheint es hier." | „Es liegen aktuell keine eingehenden Anfragen für deine Angebote vor." |
| „Konto erstellt." | „Dein Konto wurde erfolgreich erstellt." |

## Fehlermeldungen

Zustand + Handlung. Keine Schuldzuweisung, keine technischen Codes, kein „leider".

| ✓ | ✗ |
|---|---|
| „Du hast keine Berechtigung für diese Aktion." | „Keine Berechtigung." |
| „Dieser Inhalt existiert nicht mehr." | „Nicht gefunden." |
| „Da ist etwas schiefgelaufen. Lade die Seite neu." | „Etwas ist schiefgelaufen. Bitte Seite neu laden oder uns kontaktieren." |
| „Bitte alle Felder prüfen." | „Ungültige Eingabe." |
| „Du hast nicht genug Karma für diese Anfrage." | „Nicht genügend Karma." |

## Buttons & CTAs

Verb zuerst, max. 3–4 Wörter. Konkrete Aktion beschreiben, nicht generisch „Senden" oder „Speichern".

| ✓ | ✗ |
|---|---|
| „Anfragen" | „Anfragen / Mieten" |
| „Bewertung abgeben" | „Speichern" (auf dem Bewertungs-Button) |
| „Anfrage ablehnen" | „Ablehnen" |
| „Anfrage zurückziehen" | „Zurückziehen" |
| „Anmelden zum Anfragen" | „Anmelden um anzufragen" |

Einwort-Verben im Kontext sind selbsterklärend: „Archivieren", „Bearbeiten", „Löschen" brauchen kein Objekt.

## Leerzustände

Zeile 1: Was hier erscheint. Zeile 2: Was man tun kann. Kein „Hier ist noch nichts" ohne Kontext, keine Ausrufezeichen zur Aufmunterung.

| ✓ | ✗ |
|---|---|
| „Noch keine Anfragen eingegangen. / Sobald jemand dein Angebot anfrägt, erscheint es hier." | „Keine eingehenden Anfragen." |
| „Du hast noch keine Angebote. / Erstell dein erstes." | „Du hast noch keine Angebote." |
| „Noch keine Links erstellt. / Erstell einen für deine Nachbar*innen." | „Noch keine Einladungslinks." |
| „Keine Treffer für «{{q}}». / Versuch ein anderes Stichwort." | „Keine Angebote für «{{q}}» gefunden." |
| „Du hast noch keine Anfrage gestellt. / Schau dir die Angebote an." | „Keine ausgehenden Anfragen." |

## Was vermeiden

| Vermeiden | Stattdessen |
|---|---|
| Ausrufezeichen als normales Satzende | Punkt. Ausrufezeichen nur bei echten Höhepunkten, max. 1 pro Screen/Mail |
| „Anfrage gesendet!" | „Anfrage gesendet." |
| „Leider…", „Es tut uns leid" | Direkt sagen was passiert ist |
| „Bitte beachte…", „Bitte beachten Sie…" | Einfach sagen |
| „Wir freuen uns…", Corporate-Wir | Zum Thema kommen |
| Passiv ohne Subjekt: „Die Anfrage wurde abgelehnt" | „Deine Anfrage wurde abgelehnt." |
| Füllwörter: „erfolgreich", „automatisch", „einfach" | Weglassen |

Einwort-Mikro-Bestätigungen als kurzes visuelles Feedback können ein Ausrufezeichen tragen: „Kopiert!" ist okay.

## E-Mails

Gleiche Regeln, plus:

- Betreff: kein Ausrufezeichen (Ausnahme: Willkommensmail), max. 50 Zeichen, kein Clickbait
- Anrede: immer mit Name — `Hallo {{username}},`
- CTA-Button: Verb zuerst, max. 3 Wörter
- Kein Abschluss, keine Grussformel. Footer: `uslehne.ch — Zürich`

| Feld | ✓ | ✗ |
|---|---|---|
| Betreff | „Neue Anfrage für «Bohrmaschine»" | „Du hast eine neue Anfrage erhalten!" |
| H1 | „Anfrage bestätigt" | „Anfrage bestätigt!" |
| Body | „Die Anbieter*in meldet sich bald bei dir." | „Herzlichen Glückwunsch! Du hast eine Bestätigung erhalten." |
| CTA | „Anfrage anschauen" | „Hier klicken" / „Weiter" |
| Abschluss | *(keiner)* | „Mit freundlichen Grüssen, das uslehne-Team" |

*Änderungen an UI-Texten, Fehlermeldungen und E-Mail-Templates sind gegen diese Datei zu prüfen. Alle Texte müssen auch [TYPOGRAFIE.md](./TYPOGRAFIE.md) entsprechen.*
