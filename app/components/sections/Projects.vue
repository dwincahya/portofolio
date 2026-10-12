<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { content } = useLocale()
</script>

<template>
  <section id="projects" class="min-h-screen scroll-mt-24 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
    <p class="text-sm uppercase tracking-[0.2em] text-text-muted">{{ content.sections.projects.eyebrow }}</p>
    <h2 class="mt-3 text-2xl font-bold md:text-4xl">{{ content.sections.projects.title }}</h2 >
    <div class="mt-8 space-y-4">
      <article v-for="project in content.portfolio.projects" :key="project.title" class="rounded-xl border border-border bg-bg/60 p-4 md:p-5">
        <h3 class="text-xl font-semibold">{{ project.title }}</h3>
        <p class="mt-1 text-text-muted">{{ project.technology }}</p>
        <p class="mt-3 leading-relaxed">{{ project.detail }}</p>
        <a v-if="project.link" :href="project.link" target="_blank" class="mt-3 inline-flex items-center justify-center rounded-full border-2 border-text px-4 py-2 text-sm font-semibold text-text transition-all duration-300 ease-out hover:scale-105 hover:border-brand hover:bg-brand hover:text-bg hover:shadow-[0_0_25px_rgba(74,222,128,0.5)] active:scale-95 md:text-base">
          <span>{{ content.sections.projects.button }}</span>
          <Icon :icon="content.sections.projects.icon" class="ml-2" />
        </a>
      </article>
    </div>
  </section>
</template>
