# uslehne.ch — MVP-Plan

> Verbindliche Umsetzungs-Referenz für die implementierenden Agenten.
> Sprache der App: **Deutsch** (mit i18n-Framework von Anfang an). Bezeichner/Code: Englisch.
> Konventionen aus `CLAUDE.md` gelten (max. 150 Zeilen/Datei, ein Component pro Datei,
> Styling im `.styled.ts`-Sibling, strict TS, ESLint+Prettier, `/api/v1/`-Prefix).

---

## 1. Produkt & Scope

**uslehne.ch** ist eine **unkommerzielle Leih- und Schenkplattform**.
Claim (Vorschläge): *„Teilen statt besitzen.“* / *„Leihen und schenken — ohne Geld.“*
Der finale Claim/Wording wird separat festgelegt; im Code als i18n-Key `tagline` ablegen.

### Im MVP enthalten
1. **Account** erstellen: username, email, passwort, Adresse (aktuell nur **Stadt Zürich** erlaubt).
2. **Angebote** erstellen & bearbeiten: Bild, Beschreibung, Adresse auswählen, Typ (Verleihen/Verschenken).
3. **Kudo-System** (Punkte heissen **„Kudo“**, Plural **„Kudos“**; geschlossener Kreislauf, siehe §5).
4. **Transaktionen**: Anfrage (mit Kontaktangabe) → Bestätigung durch Anbieter → Kudo-Buchung.
5. **Einladungslinks**: nur der Eingeladene erhält 20 Kudos; Registrierung nur per Einladung.
6. **i18n** für alle statischen Texte (Deutsch als einzige aktive Sprache, Struktur für weitere).

### Bewusst NICHT im MVP (später)
- Detailliertes Styling/Design (kommt separat; jetzt nur funktionales, neutrales Layout).
- E-Mail-Versand (Verifikation, Benachrichtigungen).
- Artikel-**Suche** und Filter über Volltext.
- Öffentlicher Sign-up (Button existiert in der UI, ist aber deaktiviert — siehe §8).
- Kauf von Kudos gegen Geld.

---

## 2. Architektur-Entscheidungen (aus Rückfragen)

| Thema | Entscheidung |
|-------|--------------|
| Transaktionsablauf | Interessent stellt **Anfrage** (inkl. **Kontaktangabe**: Telefon **oder** E-Mail); **Anbieter bestätigt**; **dann** werden Kudos verbucht. |
| Bildspeicher | **Base64 in der DB** vorerst, aber hinter einer **austauschbaren Storage-Abstraktion** (später S3). |
| Einladung | Nur **Eingeladener** bekommt 20 Kudos. USER darf **max. 3** Links erstellen, ADMIN unbegrenzt. |
| Währung | Die Punkteinheit heisst **„Kudo“** (Plural „Kudos“). **Nicht käuflich**, Saldo **≥ 0**. |

### Empfohlener Tech-Stack (Ergänzungen zum bestehenden Stack)
- **Backend:** `zod` (Validierung), `bcrypt` (Passwort-Hash), `jsonwebtoken` (JWT), `cuid` via Prisma.
- **Frontend:** `react-router-dom`, `react-i18next` + `i18next`, `react-hook-form` + `zod` (Formulare).
- Keine weiteren schweren Abhängigkeiten ohne Not.

---

## 3. Datenmodell (Prisma)

Erweitert `backend/prisma/schema.prisma`. **`kudosBalance` ist ein gecachter Saldo**; das
`KudoLedger` ist die nachvollziehbare Wahrheit (Saldo = Summe aller `delta`).
Code verwendet durchgängig den Begriff **Kudo(s)**; user-facing Label über i18n-Key `currency`.

```prisma
enum Role          { USER ADMIN }
enum OfferType     { LEND GIVE }
enum OfferStatus   { AVAILABLE RESERVED LENT GIVEN ARCHIVED }
enum TransactionStatus { PENDING ACCEPTED DECLINED CANCELLED RETURNED COMPLETED }
enum LedgerReason  { INVITE_BONUS LEND_EARN BORROW_SPEND GIVE_EARN RECEIVE_SPEND ADMIN_ADJUST }
enum ContactType   { PHONE EMAIL }

model User {
  id            String   @id @default(cuid())
  username      String   @unique
  email         String   @unique
  passwordHash  String
  role          Role     @default(USER)
  kudosBalance  Int      @default(0)          // gecachter Kudo-Saldo, nie < 0
  addresses     Address[]
  offers        Offer[]
  invitesCreated Invite[] @relation("InvitesCreated")
  inviteUsed    Invite?  @relation("InviteUsed")
  requests      Transaction[] @relation("Requester")
  ledger        KudoLedger[]
  createdAt     DateTime @default(now())
}

model Address {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  label     String?                           // z.B. "Zuhause"
  street    String
  zip       String
  city      String                            // Validierung: nur Zürich (siehe §9)
  offers    Offer[]
  createdAt DateTime @default(now())
}

model Offer {
  id           String      @id @default(cuid())
  owner        User        @relation(fields: [ownerId], references: [id])
  ownerId      String
  title        String                          // Kurztitel für Listenansicht
  description  String
  type         OfferType
  status       OfferStatus @default(AVAILABLE)
  imageRef     String                          // Storage-Referenz (jetzt: data-URL Base64)
  address      Address     @relation(fields: [addressId], references: [id])
  addressId    String
  transactions Transaction[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

model Transaction {
  id          String   @id @default(cuid())
  offer       Offer    @relation(fields: [offerId], references: [id])
  offerId     String
  requester   User     @relation("Requester", fields: [requesterId], references: [id])
  requesterId String
  ownerId     String                           // denormalisiert (Anbieter)
  type        OfferType                         // kopiert vom Offer
  kudos       Int                              // 1 (LEND) oder 5 (GIVE)
  status      TransactionStatus @default(PENDING)
  message     String?                          // optionale Notiz des Interessenten
  contactType ContactType                      // PHONE | EMAIL — Pflicht bei Anfrage
  contactValue String                          // Telefonnummer oder E-Mail des Interessenten
  createdAt   DateTime @default(now())
  decidedAt   DateTime?
  returnedAt  DateTime?
}

model Invite {
  id          String   @id @default(cuid())
  code        String   @unique                 // im Link enthalten
  createdBy   User     @relation("InvitesCreated", fields: [createdById], references: [id])
  createdById String
  kudos       Int      @default(20)             // beim Einlösen dem Eingeladenen gutgeschrieben
  usedBy      User?    @relation("InviteUsed", fields: [usedById], references: [id])
  usedById    String?  @unique
  usedAt      DateTime?
  createdAt   DateTime @default(now())
}

model KudoLedger {
  id            String       @id @default(cuid())
  user          User         @relation(fields: [userId], references: [id])
  userId        String
  delta         Int                              // +/- Kudos
  reason        LedgerReason
  transactionId String?                          // Verknüpfung zur Transaction
  createdAt     DateTime     @default(now())
}
```

Migration: `npm run db:migrate:dev`. Seed (`prisma/seed.ts`): 1 Admin-User + ein paar
Start-Invites + Beispiel-Offers für lokale Entwicklung.

---

## 4. Transaktions-Lebenszyklus

```
                 requester                 owner
  Offer.AVAILABLE ──POST request──▶ Transaction.PENDING
                                          │
                        ┌─────────────────┼──────────────────┐
                     accept            decline            cancel (requester)
                        │                 │                   │
                        ▼                 ▼                   ▼
                 Kudos buchen         DECLINED            CANCELLED
                        │
          ┌─────────────┴─────────────┐
       type=GIVE                   type=LEND
          ▼                           ▼
   Offer.GIVEN                 Offer.LENT, Tx.ACCEPTED
   Tx.COMPLETED                       │
                               POST return (Anbieter bestätigt Rückgabe)
                                       ▼
                            Offer.AVAILABLE, Tx.COMPLETED
```

**Regeln beim `request` (Anfrage stellen):**
- Der Interessent **muss Kontakt mitgeben**: `contactType` (`PHONE`|`EMAIL`) + `contactValue`,
  passend validiert (gültige Telefonnummer bzw. E-Mail), sonst `CONTACT_REQUIRED` /
  `CONTACT_INVALID`. Der Anbieter sieht diesen Kontakt erst nach Erhalt der Anfrage.
- Vorab-Prüfung des Guthabens (verhindert tote Anfragen).

**Regeln beim `accept`:**
1. Nur der **Anbieter** der zugehörigen Offer darf akzeptieren; Status muss `PENDING` sein.
2. Saldo-Prüfung: `requester.kudosBalance >= kudos`, sonst Fehler `INSUFFICIENT_KUDOS`.
3. In **einer DB-Transaktion** (`prisma.$transaction`):
   - `requester.kudosBalance -= kudos`, Ledger-Eintrag (`BORROW_SPEND`/`RECEIVE_SPEND`).
   - `owner.kudosBalance += kudos`, Ledger-Eintrag (`LEND_EARN`/`GIVE_EARN`).
   - Tx-Status setzen; Offer-Status auf `LENT` (LEND) bzw. `GIVEN` (GIVE).
   - **Alle anderen `PENDING`-Anfragen** zur selben Offer auf `DECLINED` setzen.
4. **Kudos sind erhalten** (geschlossener Kreislauf): Anbieter gewinnt genau so viel, wie der
   Interessent ausgibt. Neue Kudos entstehen nur durch `INVITE_BONUS` und `ADMIN_ADJUST`.

Die **verbindliche** Saldo-Prüfung erfolgt erneut beim `accept`.

---

## 5. Kudo-System

Die Punkteinheit heisst **„Kudo“** (Singular) / **„Kudos“** (Plural) — überall user-facing so
benennen (i18n-Key `currency`).

| Aktion | Anbieter | Interessent | `kudos` |
|--------|:--------:|:-----------:|:-------:|
| Verleihen / Mieten (`LEND`) | **+1** | **−1** | 1 |
| Verschenken / Geschenk erhalten (`GIVE`) | **+5** | **−5** | 5 |
| Einladung eingelöst | — | **+20** (Eingeladener) | 20 |

- Startsaldo eines neuen Accounts = **20 Kudos** (aus dem eingelösten Invite, via `INVITE_BONUS`).
- **Saldo nie < 0**: jede ausgebende Aktion ist nur mit ausreichend Guthaben möglich.
- Kudos sind **nicht käuflich** (kein Geldfluss im MVP).
- `kudosBalance` am User ist Cache; bei Inkonsistenz aus `KudoLedger` neu berechenbar
  (Hilfsfunktion `recomputeBalance(userId)` vorsehen).

---

## 6. Authentifizierung & Rollen

- **JWT** (Access-Token, z.B. 7 Tage), Secret aus `JWT_SECRET` (in `.env`/`.env.example`).
- Passwörter mit **bcrypt** gehasht (Cost ≥ 12). Nie Klartext loggen/zurückgeben.
- Middleware:
  - `requireAuth` → setzt `req.user` (id, role) oder 401.
  - `requireAdmin` → 403 wenn `role !== ADMIN`.
- **Registrierung nur mit gültigem, unbenutztem Invite-Code** (siehe §8).
- **App ist NICHT komplett hinter Login.** Öffentlich (ohne Auth) erreichbar:
  - Angebote durchstöbern: `GET /offers`, `GET /offers/:id`.
  - Login/Registrierung + Invite-Prüfung.
  - Statische Seiten (Landing/Claim).
- **Auth erforderlich** (sonst 401 → Frontend leitet auf Login/Register):
  - **Anfragen/Mieten** (`POST /offers/:id/request`) und alle Transaktions-Aktionen.
  - Angebote erstellen/bearbeiten/löschen, eigene Adressen, Invites, Kudo-Ledger, `/me`.
- Konkret: Wer als Gast auf „Anfragen/Mieten" klickt, wird zu Login/Registrierung geführt
  (nach erfolgreichem Login zurück zur Offer). Registrierung bleibt invite-only.

---

## 7. Bild-Storage-Abstraktion (austauschbar)

Ziel: Heute Base64-in-DB, später S3 — **ohne Änderungen am Aufrufer**.

`backend/src/storage/imageStorage.ts`:
```ts
export interface ImageStorage {
  // Nimmt einen Base64-data-URL (oder Buffer) entgegen, gibt eine Referenz zurück.
  save(input: string): Promise<string>          // returns imageRef
  // Liefert eine im Frontend nutzbare URL für die Referenz.
  toUrl(ref: string): string
}
```
- **Jetzt:** `Base64ImageStorage` → `save` validiert MIME/Größe, gibt den data-URL als `ref`
  zurück; `toUrl(ref) = ref`. Gespeichert wird der String in `Offer.imageRef`.
- **Später:** `S3ImageStorage` → `save` lädt zu S3 hoch, gibt Key/URL zurück; `toUrl` baut die
  öffentliche URL. **Nur** diese Datei + eine ENV-Variable (`IMAGE_STORAGE=base64|s3`) ändern.
- Routen/Services rufen ausschließlich `imageStorage.save()` / `.toUrl()` auf.
- Limits im MVP: max. ~2 MB pro Bild, nur `image/jpeg|png|webp`. Im Frontend vor Upload
  clientseitig verkleinern (Canvas) auf z.B. max. 1280px Kante.

---

## 8. Einladungen & (noch nicht öffentlicher) Sign-up

- **Invite erstellen** (`POST /invites`): USER darf nur, wenn `count(invitesCreated) < 3`,
  sonst Fehler `INVITE_LIMIT_REACHED`. ADMIN: unbegrenzt. Erzeugt `code` (z.B. 16 Zeichen).
- **Link-Format:** `https://uslehne.ch/register?invite=CODE`.
- **Invite prüfen** (`GET /invites/:code`): public, liefert `valid: boolean` (existiert &
  unbenutzt). Frontend nutzt das, um die Registrierung freizuschalten.
- **Registrierung** verbraucht den Invite atomar: Invite als `used` markieren, User anlegen,
  20 Kudos gutschreiben (`INVITE_BONUS`), Adresse anlegen (Zürich-Validierung).
- **Öffentlicher Sign-up-Button:** in der UI **sichtbar**, aber via Feature-Flag
  `VITE_PUBLIC_SIGNUP=false` **deaktiviert**. Ohne gültigen Invite-Code zeigt das
  Registrierungsformular die Meldung `registration.inviteOnly` und der Submit ist gesperrt.

---

## 9. Validierungsregeln

- **Stadt:** nur Zürich erlaubt. Vergleich case-insensitiv & getrimmt; akzeptiere
  `"zürich"` und `"zurich"`. Andernfalls Fehlercode `ADDRESS_CITY_NOT_ALLOWED`
  (Meldung i18n-Key `errors.cityNotAllowed`). Optional zusätzlich PLZ-Range 8000–8099 prüfen.
- **Username:** unique, 3–30 Zeichen, `[a-zA-Z0-9_]`.
- **Email:** unique, gültiges Format.
- **Passwort:** min. 8 Zeichen.
- **Offer:** `title` 1–80, `description` 1–2000 Zeichen, `type ∈ {LEND, GIVE}`,
  gültige `addressId` (muss dem User gehören), Bild vorhanden & valide.
- **Anfrage-Kontakt:** `contactType ∈ {PHONE, EMAIL}` ist Pflicht; `contactValue` muss zum
  Typ passen (E-Mail-Format bzw. plausible Telefonnummer). Fehlt/ungültig →
  `CONTACT_REQUIRED` / `CONTACT_INVALID`.
- Alle Eingaben backend-seitig mit **zod** validieren; Fehler einheitlich als
  `{ error: { code, message, fields? } }` (siehe §11).

---

## 10. API-Endpunkte (`/api/v1`)

Spalte **Auth**: `–` = öffentlich (kein Login nötig), `✓` = Login nötig (sonst 401).

**Auth**
| Methode | Pfad | Auth | Beschreibung |
|---|---|:--:|---|
| POST | `/auth/register` | – | username, email, password, inviteCode, address{street,zip,city} |
| POST | `/auth/login` | – | email/username + password → JWT |
| GET  | `/auth/me` | ✓ | aktueller User inkl. `kudosBalance` |

**Addresses**
| GET | `/addresses` | ✓ | eigene Adressen |
| POST | `/addresses` | ✓ | neue Adresse (Zürich-Validierung) |
| DELETE | `/addresses/:id` | ✓ | (nur wenn keine aktive Offer daran hängt) |

**Offers**
| GET | `/offers` | – | verfügbare Angebote (Query: `?type=LEND|GIVE`) — **öffentlich browsebar** |
| GET | `/offers/:id` | – | Detail — **öffentlich** |
| GET | `/offers/mine` | ✓ | eigene Angebote |
| POST | `/offers` | ✓ | erstellen (image base64, title, description, type, addressId) |
| PATCH | `/offers/:id` | ✓ | bearbeiten (nur Owner) |
| DELETE | `/offers/:id` | ✓ | archivieren/löschen (nur Owner, nicht während aktiver Ausleihe) |

**Transactions** (alle Auth-pflichtig)
| POST | `/offers/:id/request` | ✓ | Anfrage/Mieten — **Pflicht:** `contactType`+`contactValue`, optional `message` |
| GET | `/transactions` | ✓ | `?role=incoming` (als Anbieter) \| `outgoing` (als Interessent) |
| POST | `/transactions/:id/accept` | ✓ | Anbieter bestätigt → Kudo-Buchung |
| POST | `/transactions/:id/decline` | ✓ | Anbieter lehnt ab |
| POST | `/transactions/:id/cancel` | ✓ | Interessent zieht Anfrage zurück (nur PENDING) |
| POST | `/transactions/:id/return` | ✓ | Rückgabe bei LEND bestätigen → Offer wieder verfügbar |

**Invites**
| GET | `/invites` | ✓ | eigene Invites + Status |
| POST | `/invites` | ✓ | Link erstellen (Limit 3 für USER) |
| GET | `/invites/:code` | – | Gültigkeit prüfen (für Registrierung) |

**Kudos**
| GET | `/kudos/ledger` | ✓ | eigene Kudo-Historie (paginiert) |

Bestehende `GET /health` (–) bleibt.

---

## 11. Fehlerformat & i18n

- **Backend** gibt maschinenlesbare Codes zurück, Default-Message auf Deutsch:
  ```json
  { "error": { "code": "INSUFFICIENT_KUDOS", "message": "Nicht genügend Kudos." } }
  ```
  Zentrale Code-Liste in `backend/src/errors.ts`. Der `errorHandler` mappt geworfene
  `AppError(code, status)` auf dieses Format.
- **Frontend** mappt `error.code` → übersetzten Text (`errors.json`), Fallback `message`.
- **react-i18next** im Frontend:
  - `frontend/src/i18n/index.ts` (init), `locales/de/common.json`, `locales/de/errors.json`.
  - `locales/en/`-Gerüst (leer/kopiert) vorbereiten, aber nur `de` aktiv (`fallbackLng: 'de'`).
  - **Alle** statischen UI-Texte über `t('namespace:key')`. Keine hartkodierten Strings.
  - Empfohlene Namespaces: `common`, `auth`, `offers`, `transactions`, `invites`, `errors`.

---

## 12. Frontend-Struktur

Routing mit `react-router-dom`. **Browsen ist öffentlich** — kein globaler Auth-Guard.
- **Öffentlich:** Landing, `/offers` (Liste), `/offers/:id` (Detail), `/login`, `/register`.
- **Auth-geschützt (Route-Guard):** Angebot erstellen/bearbeiten, eigene Angebote,
  Transaktionen, Invites, Profil/Ledger.
- **Aktions-Gate:** Der „Anfragen/Mieten"-Button ist für Gäste sichtbar; Klick ohne Login
  leitet auf `/login?redirect=/offers/:id` und kehrt nach Login zur Offer zurück.

Header zeigt für eingeloggte User den **Kudo-Saldo**, für Gäste **Login/Registrieren**.

```
src/
├── i18n/                      # init + locales (de aktiv, en Gerüst)
├── api/                       # fetch-Wrapper (Token-Header), typed Endpunkt-Funktionen
├── auth/                      # AuthContext (Token, currentUser), useAuth()
├── routes/
│   ├── LoginPage.(tsx|styled.ts)
│   ├── RegisterPage.(tsx|styled.ts)        # liest ?invite=CODE, prüft Gültigkeit
│   ├── OffersPage.(tsx|styled.ts)          # Liste + Typ-Filter (LEND/GIVE)
│   ├── OfferDetailPage.(tsx|styled.ts)     # Detail + "Anfragen" (Dialog mit Kontaktangabe)
│   ├── OfferFormPage.(tsx|styled.ts)       # erstellen & bearbeiten
│   ├── MyOffersPage.(tsx|styled.ts)
│   ├── TransactionsPage.(tsx|styled.ts)    # eingehend (inkl. Kontakt) / ausgehend, Aktionen
│   ├── InvitesPage.(tsx|styled.ts)         # Links erstellen + Status
│   └── ProfilePage.(tsx|styled.ts)         # Kudo-Saldo + Ledger
└── components/                # OfferCard, ImageUpload, KudoBadge, RequestDialog, Header, ...
```
- **Bild-Upload-Component:** Datei wählen → clientseitig verkleinern → Base64 → an API.
- Jede Komponente: `Foo.tsx` (Logik) + `Foo.styled.ts` (Styling), je ≤ 150 Zeilen.
- Neutrales, funktionales Layout (Theme-Tokens nutzen) — **kein** Feinschliff im MVP.

---

## 13. Umsetzungsphasen (Tasks für Agenten)

Reihenfolge = Abhängigkeit. Jede Phase endet mit grünem `lint` + `build`.

**Phase 0 — Fundament**
- 0.1 Prisma-Schema (§3) + Migration + Seed (Admin, Invites, Beispiel-Offers).
- 0.2 Backend-Gerüst: `errors.ts`, `AppError`, `errorHandler`, `zod`-Validierungs-Middleware.
- 0.3 `imageStorage.ts` mit `Base64ImageStorage` (§7).

**Phase 1 — Auth & Invites**
- 1.1 `bcrypt`/JWT-Utils, `requireAuth`/`requireAdmin`.
- 1.2 Invite-Routen (erstellen mit Limit, prüfen).
- 1.3 Registrierung (Invite-Einlösung + 20 Kudos + Adresse/Zürich-Validierung), Login, `/me`.

**Phase 2 — Angebote**
- 2.1 Address-Routen.
- 2.2 Offer-CRUD inkl. Bild über `imageStorage`, Ownership-Checks.

**Phase 3 — Transaktionen & Kudos**
- 3.1 Anfrage erstellen (Kontakt-Pflicht + Validierung, Vorab-Saldoprüfung).
- 3.2 accept/decline/cancel/return mit Kudo-Buchung in DB-Transaktion + Ledger (§4/§5).
- 3.3 `/kudos/ledger`, `recomputeBalance`-Helper.

**Phase 4 — Frontend Basis**
- 4.1 i18n-Setup + `api`-Wrapper + `AuthContext`.
- 4.2 Login/Register (mit `?invite=`-Handling, deaktivierter öffentlicher Sign-up).
- 4.3 Header mit Kudo-Saldo, Routing/Guards.

**Phase 5 — Frontend Features**
- 5.1 Offers-Liste/Detail + Typ-Filter.
- 5.2 Offer-Formular (erstellen/bearbeiten) + Bild-Upload.
- 5.3 Anfrage-Dialog (Kontaktangabe) + Transaktionen-Seite (eingehend zeigt Kontakt, Aktionen).
- 5.4 Invites-Seite + Profil/Ledger.

**Phase 6 — Abschluss**
- 6.1 `.env.example` aktualisieren (`JWT_SECRET`, `IMAGE_STORAGE`, `VITE_PUBLIC_SIGNUP`).
- 6.2 README/CLAUDE.md-API-Tabelle aktualisieren.
- 6.3 Smoke-Test des End-to-End-Flows (Invite → Register → Offer → Request → Accept → Kudos).

---

## 14. Offene Punkte / spätere Erweiterungen

- E-Mail-Versand (Verifikation, Benachrichtigung bei Anfrage/Bestätigung).
- Volltext-**Suche** & Kategorien/Filter.
- S3-Bildstorage (nur `imageStorage.ts` + ENV tauschen).
- Öffentlicher Sign-up aktivieren (Feature-Flag umlegen, ggf. Missbrauchsschutz).
- Bewertungen/Reputation, Kartenansicht, Push/Notifications.
- Endgültiger Claim/Wording + komplettes Design.
