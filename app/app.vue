<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(true)
const hasFinishedLoading = useState('portfolio-loading-finished', () => false)
const nuxtApp = useNuxtApp()
const { locale, content } = useLocale()
const siteUrl = 'https://dwinurcahya.my.id'

useSeoMeta({
  title: () => `${content.value.sections.home.title} | Fullstack Developer`,
  description: () => content.value.sections.home.description,
  author: 'Dwi Nur Cahya',
  ogTitle: () => `${content.value.sections.home.title} | Fullstack Developer`,
  ogDescription: () => content.value.sections.home.description,
  ogType: 'website',
  ogUrl: siteUrl,
  ogLocale: () => locale.value === 'id' ? 'id_ID' : 'en_US',
  twitterCard: 'summary',
  twitterTitle: () => `${content.value.sections.home.title} | Fullstack Developer`,
  twitterDescription: () => content.value.sections.home.description
})

useHead(() => ({
  htmlAttrs: {
    lang: locale.value
  },
  link: [
    {
      rel: 'alternate',
      hreflang: 'id',
      href: siteUrl
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: siteUrl
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: siteUrl
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Dwi Nur Cahya',
        url: siteUrl,
        jobTitle: 'Fullstack Developer',
        sameAs: content.value.profileCard.socialLinks.map((link) => link.url),
        knowsAbout: ['Fullstack Development', 'Vue.js', 'Nuxt', 'TypeScript', 'IoT']
      })
    }
  ]
}))

const finishLoading = () => {
  isLoading.value = false
  hasFinishedLoading.value = true
}

nuxtApp.hook('page:finish', finishLoading)
</script>

<template>
  <NuxtLoadingIndicator />
  <LoadingScreen v-if="isLoading" />
  <div :class="isLoading ? 'invisible' : 'visible'">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
