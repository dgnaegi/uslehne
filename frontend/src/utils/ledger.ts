import type { LedgerReason } from '../api/types'

export const REASON_LABEL: Record<LedgerReason, string> = {
  INVITE_BONUS: 'Einladungsbonus',
  LEND_EARN: 'Verleihen',
  BORROW_SPEND: 'Ausleihen',
  GIVE_EARN: 'Verschenken',
  RECEIVE_SPEND: 'Erhalten',
  ADMIN_ADJUST: 'Anpassung',
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}
