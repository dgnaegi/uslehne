import { APP_URL, FONT, BLACK, MUTED, layout, ctaButton } from './mailTemplates'

const TRANSACTIONS_URL = `${APP_URL}/transaktionen`

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function contactLabel(type: string): string {
  const map: Record<string, string> = {
    SMS: 'SMS',
    WHATSAPP: 'WhatsApp',
    SIGNAL: 'Signal',
    EMAIL: 'E-Mail',
  }
  return map[type] ?? type
}

function p(text: string): string {
  return `<p style="margin:0 0 16px;font-family:${FONT};font-size:16px;font-weight:400;color:${BLACK};line-height:1.6;">${text}</p>`
}

function h1(text: string): string {
  return `<h1 style="margin:0 0 24px;font-family:${FONT};font-size:24px;font-weight:900;color:${BLACK};text-transform:uppercase;letter-spacing:-0.02em;">${text}</h1>`
}

export function offerRequestedMail(opts: {
  ownerUsername: string
  requesterUsername: string
  offerTitle: string
  contactType: string
  contactValue: string
  message?: string | null
}) {
  const body = `
    ${h1('Neue Anfrage')}
    ${p(`Hallo ${esc(opts.ownerUsername)},`)}
    ${p(`<strong>${esc(opts.requesterUsername)}</strong> möchte dein Angebot <strong>«${esc(opts.offerTitle)}»</strong> anfragen.`)}
    ${p(`Kontakt: ${contactLabel(opts.contactType)} &ndash; ${esc(opts.contactValue)}`)}
    ${opts.message ? p(`Nachricht: <em>${esc(opts.message)}</em>`) : ''}
    ${ctaButton(TRANSACTIONS_URL, 'Anfrage anschauen')}`

  return { subject: `Neue Anfrage für «${opts.offerTitle}»`, html: layout(body) }
}

export function offerAcceptedMail(opts: {
  requesterUsername: string
  ownerUsername: string
  offerTitle: string
}) {
  const body = `
    ${h1('Anfrage bestätigt')}
    ${p(`Hallo ${esc(opts.requesterUsername)},`)}
    ${p(`<strong>${esc(opts.ownerUsername)}</strong> hat deine Anfrage für <strong>«${esc(opts.offerTitle)}»</strong> bestätigt.`)}
    ${p('Besprecht die nächsten Schritte direkt miteinander — und vergiss nicht, die Übergabe danach in der App zu bestätigen.')}
    ${ctaButton(TRANSACTIONS_URL, 'Zu meinen Transaktionen')}`

  return { subject: `Anfrage bestätigt – «${opts.offerTitle}»`, html: layout(body) }
}

export function offerDeclinedMail(opts: { requesterUsername: string; offerTitle: string }) {
  const body = `
    ${h1('Anfrage abgelehnt')}
    ${p(`Hallo ${esc(opts.requesterUsername)},`)}
    ${p(`Leider wurde deine Anfrage für <strong>«${esc(opts.offerTitle)}»</strong> abgelehnt.`)}
    ${p('Vielleicht findest du ein anderes passendes Angebot.')}
    ${ctaButton(APP_URL, 'Angebote entdecken')}`

  return { subject: `Anfrage abgelehnt – «${opts.offerTitle}»`, html: layout(body) }
}

export function confirmReminderMail(opts: {
  username: string
  otherUsername: string
  offerTitle: string
}) {
  const body = `
    ${h1('Übergabe bestätigen')}
    ${p(`Hallo ${esc(opts.username)},`)}
    ${p(`<strong>${esc(opts.otherUsername)}</strong> hat die Übergabe von <strong>«${esc(opts.offerTitle)}»</strong> bereits bestätigt.`)}
    ${p('Bitte bestätige auch du, damit die Kudos verrechnet werden können.')}
    ${ctaButton(TRANSACTIONS_URL, 'Jetzt bestätigen')}`

  return { subject: `Bitte bestätige die Übergabe – «${opts.offerTitle}»`, html: layout(body) }
}

export function ratingReceivedMail(opts: {
  username: string
  raterUsername: string
  stars: number
  offerTitle: string
}) {
  const starStr = opts.stars === 1 ? '1 Stern' : `${opts.stars} Sterne`
  const muted = `<span style="font-family:${FONT};font-size:13px;color:${MUTED};">`
  const body = `
    ${h1('Neue Bewertung')}
    ${p(`Hallo ${esc(opts.username)},`)}
    ${p(`<strong>${esc(opts.raterUsername)}</strong> hat dir für <strong>«${esc(opts.offerTitle)}»</strong> ${muted}${starStr}</span> gegeben.`)}
    ${ctaButton(APP_URL, 'Mein Profil ansehen')}`

  return { subject: `Du hast eine Bewertung erhalten – ${starStr}`, html: layout(body) }
}
