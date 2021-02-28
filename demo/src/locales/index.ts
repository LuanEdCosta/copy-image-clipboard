import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import EN from './EN'

i18next.use(initReactI18next).init({
  resources: { en: EN },
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'Glossary',
  debug: false,
})

export default i18next
