import type { Transaction } from '../api/types'

export function getActiveTimelineStep(tx: Transaction): number {
  switch (tx.status) {
    case 'PENDING':
      return 0
    case 'ACCEPTED':
      return tx.ownerConfirmed || tx.requesterConfirmed ? 2 : 1
    case 'RETURNED':
      return 4 // Zurückgeben done, Bewerten active
    case 'COMPLETED':
      return tx.type === 'LEND' ? 5 : 4 // past end = all done
    default:
      return -1
  }
}
