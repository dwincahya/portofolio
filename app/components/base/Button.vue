<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const variantClasses = {
  primary: 'bg-brand text-bg hover:bg-brand-dark border border-brand',
  secondary: 'bg-accent text-bg hover:opacity-90 border border-accent',
  outline: 'bg-transparent text-brand border-2 border-brand hover:bg-brand/10',
  ghost: 'bg-transparent text-text hover:bg-surface border border-border'
}
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'rounded-lg font-medium transition-all duration-200 cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-bg',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size]
    ]"
  >
    <slot />
  </button>
</template>