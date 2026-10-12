<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(true)
const hasFinishedLoading = useState('portfolio-loading-finished', () => false)
const nuxtApp = useNuxtApp()

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
