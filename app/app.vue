<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(true)
const nuxtApp = useNuxtApp()

const finishLoading = () => {
  isLoading.value = false
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
