import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonDe from '../locales/de/common.json'
import authDe from '../locales/de/auth.json'
import offersDe from '../locales/de/offers.json'
import transactionsDe from '../locales/de/transactions.json'
import invitesDe from '../locales/de/invites.json'
import errorsDe from '../locales/de/errors.json'

i18n.use(initReactI18next).init({
  lng: 'de',
  fallbackLng: 'de',
  resources: {
    de: {
      common: commonDe,
      auth: authDe,
      offers: offersDe,
      transactions: transactionsDe,
      invites: invitesDe,
      errors: errorsDe,
    },
  },
  interpolation: { escapeValue: false },
})

export default i18n
