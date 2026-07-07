export function buildContactUrl(type: string, value: string): string {
  switch (type) {
    case 'WHATSAPP':
      return `https://wa.me/${value.replace(/\D/g, '')}`
    case 'SMS':
      return `sms:${value.replace(/\s/g, '')}`
    case 'SIGNAL':
      return `https://signal.me/#p/${value.replace(/\s/g, '')}`
    case 'EMAIL':
      return `mailto:${value}`
    default:
      return ''
  }
}
