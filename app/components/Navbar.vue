<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type Lenis from 'lenis'
import { inject, onBeforeUnmount, onMounted, ref, type ShallowRef } from 'vue'

type NavItem = {
	label: string
	id: string
	icon: string
	height?: string
}

const navItems: NavItem[] = [
	{ label: 'Home', id: 'home', icon: 'ic:round-home', height: '1.5em' },
	{ label: 'Experience', id: 'experience', icon: 'tabler:briefcase-filled', height: '1.3em' },
	{ label: 'Education', id: 'education', icon: 'material-symbols:school', height: '1.3em' },
	{ label: 'Projects', id: 'projects', icon: 'heroicons:rectangle-stack-20-solid', height: '1.3em' },
	{ label: 'Certificates', id: 'certificates', icon: 'heroicons:document-check-solid', height: '1.3em' }
]

const activeSection = ref('home')
const scrollProgress = ref(0)
let scrollContainer: HTMLElement | null = null
let syncActiveSection: (() => void) | null = null
const lenis = inject<ShallowRef<Lenis | null>>('portfolio-lenis')

const scrollToSection = (id: string) => {
	const section = document.getElementById(id)
	if (!section) {
		return
	}

	if (lenis?.value) {
		lenis.value.scrollTo(section, { offset: 0 })
	} else {
		section.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
	activeSection.value = id
}

onMounted(() => {
	const container = document.getElementById('sections-container')
	if (!container) {
		return
	}
	scrollContainer = container
	history.replaceState(null, '', window.location.pathname + window.location.search)
	const sections = navItems
		.map((item) => document.getElementById(item.id))
		.filter((section): section is HTMLElement => section !== null)
	if (!sections.length) {
		return
	}

	syncActiveSection = () => {
		const focusLine = container.getBoundingClientRect().top + container.clientHeight * 0.35
		const passedSections = sections.filter((section) => section.getBoundingClientRect().top <= focusLine)
		const currentSection = passedSections.at(-1) ?? sections[0]
		if (!currentSection) {
			return
		}
		const scrollRange = container.scrollHeight - container.clientHeight

		scrollProgress.value = scrollRange > 0 ? container.scrollTop / scrollRange : 0

		if (currentSection.id !== activeSection.value) {
			activeSection.value = currentSection.id
		}
	}

	syncActiveSection()
	container.addEventListener('scroll', syncActiveSection, { passive: true })
})

onBeforeUnmount(() => {
	if (scrollContainer && syncActiveSection) {
		scrollContainer.removeEventListener('scroll', syncActiveSection)
	}
})
</script>

<template>
	<nav
		class="relative pointer-events-auto flex flex-col items-center justify-center gap-8 overflow-visible text-text">
		<div aria-hidden="true" class="pointer-events-none absolute  top-6 bottom-6 w-px">
			<span
				class="absolute -left-1.5 size-3 rounded-full bg-brand shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-[top] duration-150 ease-out"
				:style="{ top: `calc(${scrollProgress * 100}% - 6px)` }" />
		</div>
		<a v-for="item in navItems" :key="item.label" :href="`#${item.id}`" :aria-label="item.label"
			@click.prevent="scrollToSection(item.id)"
			:class="activeSection === item.id ? 'is-active text-bg! ring-2 ring-brand' : ''" class="group relative isolate flex size-12 items-center justify-center overflow-visible rounded-full
    text-text transition duration-200 hover:-translate-y-0.5 hover:text-bg hover:ring-2 hover:ring-brand
    sm:size-14 sm:text-3xl md:size-16 lg:size-18 lg:text-4xl xl:size-20">
			<div class="pointer-events-none absolute -inset-0.5 -z-10 rounded-full
    border-2 border-brand transition-colors duration-200
    group-hover:border-brand group-[.is-active]:border-brand" />

			<div class="pointer-events-none absolute inset-0 -z-10 rounded-full bg-bg
    shadow-[0_0_12px_rgba(74,222,128,0.2)]
    transition-colors duration-200 border-5 border-bg
    group-hover:bg-brand group-[.is-active]:bg-brand" />

			<div class="pointer-events-none absolute left-0 top-1/2 -z-20 h-full w-full -translate-y-1/2 rounded-full
      bg-bg origin-left transition-all duration-300 border-brand border-2 sm:p-6 md:p-8 lg:p-8 xl:p-10
			group-hover:w-120" />

			<span class="pointer-events-none absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2
      whitespace-nowrap text-xl font-black tracking-wider text-brand
      opacity-0 transition duration-200 group-hover:opacity-100">
				{{ item.label.toUpperCase() }}
			</span>

			<Icon :icon="item.icon" :height="item.height" class="relative z-10" />
		</a>
	</nav>
</template>