<script setup lang="ts">
const { content } = useLocale()
</script>

<template>
  <section id="experience" class="min-h-screen scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
    <p class="text-sm uppercase tracking-[0.2em] text-text-muted">{{ content.sections.experience.eyebrow }}</p>
    <h2 class="mt-3 text-2xl font-bold md:text-4xl">{{ content.sections.experience.title }}</h2>
    <div class="mt-8 space-y-4">
      <article v-for="experience in content.portfolio.experiences" :key="experience.role" class="rounded-xl border border-border bg-bg/60 p-4 md:p-5">
        <h3 class="text-xl font-semibold">{{ experience.role }}</h3>
        <p class="mt-1 text-text-muted">{{ experience.place }} · {{ experience.period }}</p>
        <p class="mt-3 leading-relaxed">{{ experience.detail }}</p>
      </article>
    </div>
  </section>
</template>
