<script setup lang="ts">
const { content } = useLocale()
</script>

<template>
  <section id="education" class="min-h-screen scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
    <p class="text-sm uppercase tracking-[0.2em] text-text-muted">{{ content.sections.education.eyebrow }}</p>
    <h2 class="mt-3 text-2xl font-bold md:text-4xl">{{ content.sections.education.title }}</h2>
    <div class="mt-8 space-y-4">
      <article v-for="education in content.portfolio.educations" :key="education.school" class="rounded-xl border border-border bg-bg/60 p-4 md:p-5">
        <h3 class="text-xl font-semibold">{{ education.school }}</h3>
        <p class="mt-1 text-text-muted">{{ education.major }} · {{ education.period }}</p>
      </article>
    </div>
  </section>
</template>
