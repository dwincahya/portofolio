<script setup lang="ts">
const { content } = useLocale();
const hasFinishedLoading = useState('portfolio-loading-finished', () => false)
</script>

<template>
  <section
    id="home"
    class="min-h-screen scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6 md:p-8"
  >
    <div class="my-30 mx-5">
      <h1
        :class="[
          'typing-name mt-3 max-w-full text-3xl font-black leading-tight text-accent sm:text-4xl md:text-6xl',
          { 'typing-name--active': hasFinishedLoading }
        ]"
      >
        {{ content.sections.home.title }}
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed md:text-3xl">
        {{ content.sections.home.description }}
      </p>
      <a
        v-if="content.sections.home.link"
        :href="content.sections.home.link"
        target="_blank"
        class="mt-6 inline-flex items-center justify-center rounded-full border-2 border-text px-14 py-2 text-sm font-semibold text-text transition-all duration-300 ease-out hover:scale-105 hover:border-brand hover:bg-brand hover:text-bg hover:shadow-[0_0_25px_rgba(74,222,128,0.5)] active:scale-95 md:text-3xl"
      >
        <button type="button" class="cursor-pointer">
          {{ content.sections.home.button }}
        </button></a
      >
    </div>
  </section>
</template>

<style scoped>
.typing-name {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  border-right: 0.12em solid currentColor;
}

.typing-name--active {
  animation:
    typing 2.4s steps(13, end) forwards,
    blink-caret 0.8s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 13ch;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: currentColor;
  }
}
</style>
