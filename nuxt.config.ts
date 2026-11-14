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
      title: 'Dwi Nur Cahya | Software Developer',
      htmlAttrs: { lang: 'id' },
      meta: [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  },
  {
    name: 'description',
    content: 'Personal portfolio of Dwi Nur Cahya, a Software Developer showcasing projects, technical skills, experience, and passion for building digital solutions.'
  },
  { name: 'author', content: 'Dwi Nur Cahya' },
  { name: 'robots', content: 'index, follow' },
  { name: 'theme-color', content: '#0f172a' },

  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'Dwi Nur Cahya | Software Developer' },
  {
    property: 'og:description',
    content: 'Explore the portfolio of Dwi Nur Cahya, a Software Developer passionate about building modern web applications and digital experiences.'
  },
  { property: 'og:url', content: 'https://dwinurcahya.my.id/' },
  {
    property: 'og:image',
    content: 'https://dwinurcahya.my.id/og-image.png'
  },
  { property: 'og:site_name', content: 'Dwi Nur Cahya Portfolio' },

  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Dwi Nur Cahya | Software Developer' },
  {
    name: 'twitter:description',
    content: 'Software Developer building modern web applications and meaningful digital experiences.'
  },
  {
    name: 'twitter:image',
    content: 'https://dwinurcahya.my.id/og-image.png'
  }
],
      link: [
        { rel: 'canonical', href: 'https://dwinurcahya.my.id/' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css' }
      ],
    }
  }
})
