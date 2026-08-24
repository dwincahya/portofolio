import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/test-utils/module',
    'lenis/nuxt'
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      title: "Dwi Nur Cahya",
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-16' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Dwi Nur Cahya Portofolio website' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css' }
      ],
    }
  }
})
