const APP_URL = process.env.APP_URL ?? 'https://uslehne.ch'

const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif"
const BLACK = '#1a1a1a'
const YELLOW = '#FFD600'
const WARM_WHITE = '#FDFAF0'
const MUTED = '#555555'

function layout(body: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>uslehne</title>
</head>
<body style="margin:0;padding:0;background:${WARM_WHITE};font-family:${FONT};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WARM_WHITE};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:${BLACK};padding:20px 32px;border:3px solid ${BLACK};">
              <span style="font-family:${FONT};font-size:22px;font-weight:900;color:${YELLOW};text-transform:uppercase;letter-spacing:-0.02em;">
                uslehne
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;border:3px solid ${BLACK};border-top:none;padding:40px 32px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:left;">
              <p style="margin:0;font-family:${FONT};font-size:12px;font-weight:600;color:${MUTED};text-transform:uppercase;letter-spacing:0.1em;">
                uslehne.ch &mdash; Zürich
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function ctaButton(href: string, label: string): string {
  return `<a href="${href}"
    style="display:inline-block;margin-top:32px;padding:14px 28px;
           background:${YELLOW};color:${BLACK};
           font-family:${FONT};font-size:14px;font-weight:800;
           text-transform:uppercase;letter-spacing:0.08em;
           text-decoration:none;border:3px solid ${BLACK};">
    ${label}
  </a>`
}

export function passwordResetMail(opts: { username: string; token: string }) {
  const link = `${APP_URL}/reset-password?token=${opts.token}`

  const body = `
    <h1 style="margin:0 0 24px;font-family:${FONT};font-size:24px;font-weight:900;
               color:${BLACK};text-transform:uppercase;letter-spacing:-0.02em;">
      Passwort zurücksetzen
    </h1>
    <p style="margin:0 0 16px;font-family:${FONT};font-size:16px;font-weight:400;color:${BLACK};line-height:1.6;">
      Hallo ${opts.username},
    </p>
    <p style="margin:0 0 16px;font-family:${FONT};font-size:16px;font-weight:400;color:${BLACK};line-height:1.6;">
      Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt. Klicke auf den Button — der Link ist <strong>1 Stunde</strong> gültig.
    </p>
    ${ctaButton(link, 'Passwort zurücksetzen')}
    <p style="margin:32px 0 0;font-family:${FONT};font-size:13px;font-weight:400;color:${MUTED};line-height:1.5;">
      Falls du kein Passwort zurücksetzen wolltest, ignoriere diese E-Mail. Dein Konto bleibt unverändert.
    </p>
    <p style="margin:16px 0 0;font-family:${FONT};font-size:12px;font-weight:400;color:${MUTED};">
      Link funktioniert nicht? Kopiere diese URL in deinen Browser:<br />
      <span style="word-break:break-all;">${link}</span>
    </p>`

  return {
    subject: 'Passwort zurücksetzen – uslehne',
    html: layout(body),
  }
}
