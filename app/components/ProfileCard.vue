<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Card from "./base/Card.vue";

const { content } = useLocale();

const emit = defineEmits<{
  (event: "open-menu"): void;
  (event: "toggle-menu"): void;
}>();
</script>

<template>
  <div class="relative h-full w-full">
    <button
      type="button"
      class="absolute -top-12 -left-7 z-20 text-bg flex items-center justify-center hover:cursor-pointer backdrop-blur-sm transition hover:text-brand-dark sm:text-2xl md:text-3xl lg:text-5xl xl:-top-25 xl:text-8xl"
      :aria-label="content.profileCard.menuAriaLabel"
      @mouseenter="emit('open-menu')"
      @click="emit('toggle-menu')"
    >
      <div
        class="bg-brand p-2 rounded-full mt-15 ml-5 border-bg border-2 ring-2 ring-brand"
      >
        <Icon icon="subway:menu" height="20" />
      </div>
    </button>
    <Card
      gradient
      padding="none"
      class="mx-auto flex h-full mt-5 w-5/7 min-h-0 flex-col overflow-hidden"
    >
      <div class="w-full h-full max-h-3/5 shrink-0 min-h-0 flex-1">
        <div
          class="w-full border-border border-2 bg-gray-300 flex items-center justify-center overflow-hidden"
        >
          <img
            src="~/assets/images/PP.JPG"
            :alt="content.profileCard.profileImageAlt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        class="h-full max-h-2/5 bg-bg overflow-y-auto sm:text-2xl md:text-3xl lg:text-5xl xl:text-8xl space-y-0.5 sm:space-y-1 md:space-y-1 lg:space-y-1.5 xl:space-y-1.5 2xl:space-y-3 text-left border-t border-border p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-8"
      >
        <a
          v-for="link in content.profileCard.socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          class="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 2xl:gap-4 px-1 sm:px-1.5 md:px-2 lg:px-3 xl:px-3 2xl:px-5 py-0.5 sm:py-1 md:py-1.5 lg:py-2 xl:py-2 2xl:py-4 rounded-md sm:rounded-lg text-text hover:text-brand hover:bg-surface/50 transition-all duration-200"
        >
          <span
            class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-3xl shrink-0"
          >
            <Icon :icon="link.icon" />
          </span>

          <span
            class="text-2xs sm:text-2xs md:text-xs lg:text-sm xl:text-sm 2xl:text-xl font-medium truncate"
          >
            {{ link.label }}
          </span>
        </a>
      </div>
    </Card>
  </div>
</template>
