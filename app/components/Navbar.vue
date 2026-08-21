<script setup lang="ts">
import { Icon } from '@iconify/vue'

type NavItem = {
	label: string
	to: string
	icon: string
	height?: string
}

const navItems: NavItem[] = [
	{ label: 'Home', to: '/', icon: 'ic:round-home', height: '1.5em' },
	{ label: 'Experience', to: '/experience', icon: 'tabler:briefcase-filled', height: '1.3em' },
	{ label: 'Education', to: '/education', icon: 'material-symbols:school', height: '1.3em' },
	{ label: 'Skill', to: '/skill', icon: 'heroicons:cpu-chip-20-solid', height: '1.3em' },
	{ label: 'Certificates', to: '/certificates', icon: 'heroicons:document-check-solid', height: '1.3em' }
]
</script>

<template>
	<nav class="pointer-events-auto flex flex-col items-center justify-center gap-8 overflow-visible text-text">
		<NuxtLink v-for="item in navItems" :key="item.label" :to="item.to" :aria-label="item.label"
			exact-active-class="is-active !text-bg ring-2 ring-brand" class="group relative isolate flex size-12 items-center justify-center overflow-visible rounded-full
    text-text transition duration-200 hover:-translate-y-0.5 hover:text-bg hover:ring-2 hover:ring-brand
    sm:size-14 sm:text-3xl md:size-16 lg:size-18 lg:text-4xl xl:size-20">
			<!-- border luar -->
			<div class="pointer-events-none absolute inset-[-2px] -z-10 rounded-full
    border-2 border-brand transition-colors duration-200
    group-hover:border-brand group-[.is-active]:border-brand" />

			<!-- circle utama -->
			<div class="pointer-events-none absolute inset-0 -z-10 rounded-full bg-bg
    shadow-[0_0_12px_rgba(74,222,128,0.2)]
    transition-colors duration-200 border-5 border-bg
    group-hover:bg-brand group-[.is-active]:bg-brand" />

			<!-- circle belakang yang memanjang -->
			<div class="pointer-events-none absolute left-0 top-1/2 -z-20 h-full w-full -translate-y-1/2 rounded-full
      bg-bg origin-left transition-all duration-300 border-brand border-2 sm:p-6 md:p-8 lg:p-8 xl:p-10
      group-hover:w-[30rem]" />

			<span class="pointer-events-none absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2
      whitespace-nowrap text-xl font-black tracking-wider text-brand
      opacity-0 transition duration-200 group-hover:opacity-100">
				{{ item.label.toUpperCase() }}
			</span>

			<Icon :icon="item.icon" :height="item.height" class="relative z-10" />
		</NuxtLink>
	</nav>
</template>