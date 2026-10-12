import { computed } from 'vue'
import localeEn from '~/data/locale.en.json'
import localeId from '~/data/locale.id.json'

export type LocaleCode = 'id' | 'en'

type LocaleContent = {
  loading: string
  nav: {
    home: string
    experience: string
    education: string
    projects: string
    certificates: string
  }
  profileCard: {
    menuAriaLabel: string
    profileImageAlt: string
    socialLinks: Array<{
      icon: string
      label: string
      url: string
    }>
  }
  sections: {
    home: {
      title: string
      description: string
      button: string
      link: string
    }
    experience: {
      eyebrow: string
      title: string
    }
    education: {
      eyebrow: string
      title: string
    }
    projects: {
      eyebrow: string
      title: string
      button: string
      icon: string
    }
    certificates: {
      eyebrow: string
      title: string
    }
  }
  portfolio: {
    experiences: Array<{
      role: string
      place: string
      period: string
      detail: string
    }>
    educations: Array<{
      school: string
      major: string
      period: string
    }>
    projects: Array<{
      title: string
      technology: string
      detail: string
      link: string
    }>
    certificates: Array<{
      title: string
      issuer: string
      year: string
    }>
  }
  settingsMenu: {
    title: string
    close: string
    closeAriaLabel: string
    language: {
      title: string
      id: string
      en: string
      helper: string
    }
    theme: {
      title: string
      dark: string
      light: string
    }
    accessibility: {
      title: string
      highContrast: string
      on: string
      off: string
      helper: string
    }
    font: {
      title: string
      helper: string
    }
    fontSize: {
      title: string
      small: string
      medium: string
      large: string
      helper: string
    }
    connect: {
      title: string
      links: Array<{
        icon: string
        label: string
        url: string
      }>
    }
  }
}

const localeMap: Record<LocaleCode, LocaleContent> = {
  id: localeId,
  en: localeEn
}

export const useLocale = () => {
  const locale = useState<LocaleCode>('portfolio-locale', () => 'id')
  const content = computed(() => localeMap[locale.value])

  const setLocale = (nextLocale: LocaleCode) => {
    locale.value = nextLocale
  }

  const initializeLocale = (): LocaleCode => {
    if (!import.meta.client) {
      return locale.value
    }

    let savedPreferences: Record<string, unknown> = {}
    try {
      const rawPreferences = localStorage.getItem('portfolio-preferences')
      if (rawPreferences) {
        const parsedPreferences: unknown = JSON.parse(rawPreferences)
        if (parsedPreferences && typeof parsedPreferences === 'object') {
          savedPreferences = parsedPreferences as Record<string, unknown>
        }
      }
    } catch {
      localStorage.removeItem('portfolio-preferences')
    }

    const savedLocale = savedPreferences.locale
    const systemLocales = navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]
    const systemLocale = systemLocales.find((value) => {
      const language = value.toLowerCase()
      return language.startsWith('id') || language.startsWith('en')
    })
    const nextLocale: LocaleCode = savedLocale === 'id' || savedLocale === 'en'
      ? savedLocale
      : systemLocale?.toLowerCase().startsWith('en') ? 'en' : 'id'

    setLocale(nextLocale)
    localStorage.setItem('portfolio-preferences', JSON.stringify({
      ...savedPreferences,
      locale: nextLocale
    }))

    return nextLocale
  }

  return {
    locale,
    content,
    setLocale,
    initializeLocale
  }
}