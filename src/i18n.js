import { createI18n } from 'vue-i18n'
import fr from './locales/fr'
import en from './locales/en'

// Détection de la langue du navigateur
const getBrowserLocale = () => {
    const browserLang = navigator.language || navigator.userLanguage
    const langCode = browserLang.split('-')[0].toLowerCase()

    // Vérifier si la langue est supportée
    return ['fr', 'en'].includes(langCode) ? langCode : 'en'
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || getBrowserLocale(),
    fallbackLocale: 'en',
    messages: {
        fr,
        en
    }
})

export default i18n