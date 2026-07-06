# Maintenance Checklist

Recurring tasks to keep uslehne running securely.

---

## Annual (every 12 months)

### Rotate Brevo SMTP key

Brevo → Settings → SMTP & API → SMTP → delete old key → generate new key.

```bash
scalingo --region osc-fr1 --app uslehne env-set BREVO_SMTP_KEY=xsmtp-NEW
```

Verify by triggering a password-reset email on production.

---

### Rotate Scaleway S3 access credentials

Scaleway console → IAM → API Keys → create new key (attach same policy) → delete old key.

```bash
scalingo --region osc-fr1 --app uslehne env-set \
  S3_ACCESS_KEY_ID=NEW_KEY_ID \
  S3_SECRET_ACCESS_KEY=NEW_SECRET
```

Verify by uploading a test image on production.

---

## As needed

| Trigger | Action |
|---------|--------|
| Team member leaves | Rotate all credentials immediately (Brevo, S3, JWT secret) |
| Suspected credential leak | Rotate affected key immediately, check Brevo send logs |
| Brevo plan renewal | Verify sending domain DNS records are still valid |
| Domain renewal | Re-check Brevo DKIM/SPF DNS records |
| Dependency audit | `npm audit` in both `backend/` and `frontend/` |
