// wa.me akzeptiert nur E.164; national erfasste Nummern (079…)
// werden mit Schweizer Vorwahl ergänzt.
function toE164(value: string): string {
  const cleaned = value.replace(/[^\d+]/g, '')
  if (cleaned.startsWith('+')) return cleaned
  if (cleaned.startsWith('00')) return `+${cleaned.slice(2)}`
  if (cleaned.startsWith('0')) return `+41${cleaned.slice(1)}`
  return `+${cleaned}`
}

export function buildContactUrl(type: string, value: string): string {
  switch (type) {
    case 'WHATSAPP':
      return `https://wa.me/${toE164(value).slice(1)}`
    case 'SMS':
      return `sms:${value.replace(/\s/g, '')}`
    case 'TELEGRAM':
      return `https://t.me/${value.replace(/^@/, '')}`
    case 'EMAIL':
      return `mailto:${value}`
    default:
      return ''
  }
}
