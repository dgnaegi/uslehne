import nodemailer from 'nodemailer'

let _transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER ?? '',
        pass: process.env.BREVO_SMTP_KEY ?? '',
      },
    })
  }
  return _transporter
}

export interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: MailOptions): Promise<void> {
  await getTransporter().sendMail({
    from: '"uslehne" <noreply@uslehne.ch>',
    to,
    subject,
    html,
  })
}

export function sendMailSilent(opts: MailOptions): void {
  sendMail(opts).catch(console.error)
}
