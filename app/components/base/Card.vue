<script setup lang="ts">
interface Props {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  gradient?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  gradient: false
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
}

const variantClasses = {
  default: 'bg-surface border border-border',
  elevated: 'bg-surface shadow-lg border border-border',
  outlined: 'bg-transparent border-2 border-brand/50'
}
</script>

<template>
  <div
    :class="[
      'transition-colors duration-200',
      gradient ? 'gradient-border' : variantClasses[variant],
      paddingClasses[padding], 
      $attrs.class
    ]"
    :style="gradient ? {
      background: 'linear-gradient(to bottom, var(--color-bg), var(--color-surface)) padding-box, linear-gradient(180deg, var(--color-brand) 0%, var(--color-brand-dark) 70%, var(--color-brand-dark) 100%) border-box',
      border: '5px solid transparent'
    } : {}"
  >
    <slot />
  </div>
</template>

<style scoped>
.gradient-border {
  background-clip: padding-box;
  border: 1px solid transparent;
  background-image: 
    linear-gradient(to bottom, var(--color-bg), var(--color-surface)),
    linear-gradient(180deg, var(--color-brand) 0%, var(--color-brand-dark) 70%, var(--color-brand-dark) 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
}
</style>