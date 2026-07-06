import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER ?? '',
    pass: process.env.BREVO_SMTP_KEY ?? '',
  },
})

export interface MailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: MailOptions): Promise<void> {
  await transporter.sendMail({
    from: '"uslehne" <noreply@uslehne.ch>',
    to,
    subject,
    html,
  })
}
