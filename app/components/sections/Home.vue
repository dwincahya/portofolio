<script setup lang="ts">
const { content } = useLocale();
</script>

<template>
  <section
    id="home"
    class="min-h-screen scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6 md:p-8"
  >
    <div class="my-30 mx-5">
      <h1
        class="mt-3 text-4xl font-black leading-tight md:text-6xl text-accent"
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
