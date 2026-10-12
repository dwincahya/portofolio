<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const { content, initializeLocale } = useLocale()
const loadingText = ref(content.value.loading)
const gifAvailable = ref(true)
const loadingGif = '/loading.gif'

const handleGifError = () => {
  gifAvailable.value = false
}

onBeforeMount(() => {
  initializeLocale()
  loadingText.value = content.value.loading
})
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg text-text"
    role="status"
    aria-label="Loading"
  >
    <img
      v-if="gifAvailable"
      :src="loadingGif"
      alt=""
      class="h-28 w-28 object-contain sm:h-36 sm:w-36"
      @error="handleGifError"
    >
    <div
      v-else
      class="size-10 animate-spin rounded-full border-4 border-border border-t-brand"
      aria-hidden="true"
    />
    <p class="mt-4 text-center text-sm font-semibold text-text sm:text-base">
      {{ loadingText }}
    </p>
  </div>
</template>
