<script setup lang="ts">
const { content } = useLocale()
</script>

<template>
  <section id="certificates" class="min-h-screen scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
    <p class="text-sm uppercase tracking-[0.2em] text-text-muted">{{ content.sections.certificates.eyebrow }}</p>
    <h2 class="mt-3 text-2xl font-bold md:text-4xl">{{ content.sections.certificates.title }}</h2>
    <div class="mt-8 space-y-4">
      <article v-for="certificate in content.portfolio.certificates" :key="certificate.title" class="rounded-xl border border-border bg-bg/60 p-4 md:p-5">
        <h3 class="text-xl font-semibold">{{ certificate.title }}</h3>
        <p class="mt-1 text-text-muted">{{ certificate.issuer }} · {{ certificate.year }}</p>
      </article>
    </div>
  </section>
</template>
