export const ErrorCode = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INSUFFICIENT_KUDOS: 'INSUFFICIENT_KUDOS',
  INVITE_NOT_FOUND: 'INVITE_NOT_FOUND',
  INVITE_ALREADY_USED: 'INVITE_ALREADY_USED',
  INVITE_LIMIT_REACHED: 'INVITE_LIMIT_REACHED',
  ADDRESS_CITY_NOT_ALLOWED: 'ADDRESS_CITY_NOT_ALLOWED',
  CONTACT_REQUIRED: 'CONTACT_REQUIRED',
  CONTACT_INVALID: 'CONTACT_INVALID',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_TRANSACTION_STATUS: 'INVALID_TRANSACTION_STATUS',
  OFFER_NOT_AVAILABLE: 'OFFER_NOT_AVAILABLE',
  ADDRESS_IN_USE: 'ADDRESS_IN_USE',
  ALREADY_RATED: 'ALREADY_RATED',
  RESET_TOKEN_INVALID: 'RESET_TOKEN_INVALID',
  RESET_TOKEN_EXPIRED: 'RESET_TOKEN_EXPIRED',
} as const

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

const defaultMessages: Record<ErrorCode, string> = {
  VALIDATION_ERROR: 'Ungültige Eingabe.',
  UNAUTHORIZED: 'Nicht angemeldet.',
  FORBIDDEN: 'Keine Berechtigung.',
  NOT_FOUND: 'Nicht gefunden.',
  CONFLICT: 'Bereits vorhanden.',
  INSUFFICIENT_KUDOS: 'Nicht genügend Kudos.',
  INVITE_NOT_FOUND: 'Einladungscode nicht gefunden.',
  INVITE_ALREADY_USED: 'Einladungscode bereits verwendet.',
  INVITE_LIMIT_REACHED: 'Maximale Anzahl an Einladungen erreicht.',
  ADDRESS_CITY_NOT_ALLOWED: 'Nur Zürich ist aktuell erlaubt.',
  CONTACT_REQUIRED: 'Kontaktangabe ist Pflicht.',
  CONTACT_INVALID: 'Ungültige Kontaktangabe.',
  INVALID_CREDENTIALS: 'E-Mail oder Passwort falsch.',
  INVALID_TRANSACTION_STATUS: 'Diese Aktion ist im aktuellen Status nicht möglich.',
  OFFER_NOT_AVAILABLE: 'Das Angebot ist nicht mehr verfügbar.',
  ADDRESS_IN_USE: 'Die Adresse wird noch von einem Angebot verwendet.',
  ALREADY_RATED: 'Diese Anfrage wurde bereits bewertet.',
  RESET_TOKEN_INVALID: 'Ungültiger oder bereits verwendeter Reset-Link.',
  RESET_TOKEN_EXPIRED: 'Der Reset-Link ist abgelaufen. Bitte fordere einen neuen an.',
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly status: number,
    message?: string,
  ) {
    super(message ?? defaultMessages[code])
  }
}

export function assertFound<T>(record: T | null | undefined): asserts record is T {
  if (record == null) throw new AppError(ErrorCode.NOT_FOUND, 404)
}

export function assertOwns(ownerId: string, requesterId: string): void {
  if (ownerId !== requesterId) throw new AppError(ErrorCode.FORBIDDEN, 403)
}
