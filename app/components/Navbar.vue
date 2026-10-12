<script setup lang="ts" >
import { Icon } from '@iconify/vue'
import type Lenis from 'lenis'
import { computed, inject, onBeforeUnmount, onMounted, ref, type ShallowRef } from 'vue'

const { content } = useLocale()

type NavItem = {
	label: string
	id: string
	icon: string
	height?: string
}

const navItems = computed<NavItem[]>(() => [
	{ label: content.value.nav.home, id: 'home', icon: 'ic:round-home', height: '1.5em' },
	{ label: content.value.nav.experience, id: 'experience', icon: 'tabler:briefcase-filled', height: '1.3em' },
	{ label: content.value.nav.education, id: 'education', icon: 'material-symbols:school', height: '1.3em' },
	{ label: content.value.nav.projects, id: 'projects', icon: 'heroicons:rectangle-stack-20-solid', height: '1.3em' },
	{ label: content.value.nav.certificates, id: 'certificates', icon: 'heroicons:document-check-solid', height: '1.3em' }
])

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
	const sections = navItems.value
		.map((item) => document.getElementById(item.id))
		.filter((section): section is HTMLElement => section !== null)
	if (!sections.length) {
		return
	}

	syncActiveSection = () => {
		const focusLine = container.getBoundingClientRect().top + container.clientHeight * 0.35
		const sectionPositions = sections.map((section) => section.getBoundingClientRect().top)
		const nextSectionIndex = sectionPositions.findIndex((top) => top > focusLine)
		let currentIndex = nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1

		if (currentIndex < 0) {
			currentIndex = 0
		} else if (currentIndex >= sections.length) {
			currentIndex = sections.length - 1
		}

		const currentSection = sections[currentIndex]
		if (!currentSection) {
			return
		}

		const nextSectionTop = sectionPositions[currentIndex + 1]
		const sectionTop = sectionPositions[currentIndex]
		const sectionRatio = nextSectionTop === undefined || nextSectionTop <= sectionTop
			? 0
			: Math.min(1, Math.max(0, (focusLine - sectionTop) / (nextSectionTop - sectionTop)))

		const progress = sections.length > 1
			? (currentIndex + sectionRatio) / (sections.length - 1)
			: 0
		scrollProgress.value = Math.min(1, Math.max(0, progress))

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
		class="relative pointer-events-auto flex w-full flex-row items-center justify-center gap-1 overflow-visible px-1 text-text sm:gap-4 md:w-auto md:flex-col md:gap-8 md:px-0 lg:gap-10">
		<div aria-hidden="true" class="pointer-events-none absolute left-6 right-6 top-1/2 h-px md:bottom-6 md:left-auto md:right-auto md:top-6 md:h-auto md:w-px">
			<span
				class="hidden absolute -top-1.5 size-3 rounded-full bg-brand shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-[left] duration-150 ease-out"
				:style="{ left: `${scrollProgress * 100}%`, transform: 'translateX(-50%)' }" />
			<span
				class="absolute -left-1.5 top-0 hidden size-3 rounded-full bg-brand shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-[top] duration-150 ease-out md:block"
				:style="{ top: `${scrollProgress * 100}%`, transform: 'translateY(-50%)' }" />
		</div>
		<a v-for="item in navItems" :key="item.label" :href="`#${item.id}`" :aria-label="item.label"
			@click.prevent="scrollToSection(item.id)"
			:class="activeSection === item.id ? 'is-active text-bg! ring-2 ring-brand' : ''" class="group relative isolate flex size-11 shrink-0 items-center justify-center overflow-visible rounded-full
    text-text transition duration-200 hover:-translate-y-0.5 hover:text-bg hover:ring-2 hover:ring-brand
	text-2xl sm:size-16 sm:text-3xl md:size-18 md:text-3xl lg:size-20 lg:text-4xl xl:size-20 xl:text-4xl">
			<div class="pointer-events-none absolute -inset-0.5 -z-10 rounded-full
    border-2 border-text transition-colors duration-200
    group-hover:border-brand group-[.is-active]:border-brand" />

			<div class="pointer-events-none absolute inset-0 -z-10 rounded-full bg-bg
    shadow-[0_0_12px_rgba(74,222,128,0.2)]
    transition-colors duration-200 border-5 border-bg
    group-hover:bg-brand group-[.is-active]:bg-brand" />

			<div class="pointer-events-none absolute inset-0 -z-20 rounded-full
      bg-bg transition-all duration-300 border-2 border-white
      group-hover:border-brand group-[.is-active]:border-brand
      md:left-0 md:top-1/2 md:h-full md:w-full md:-translate-y-1/2 md:rounded-full md:border-white
      md:origin-left md:group-hover:w-120 md:p-8 lg:p-8 xl:p-10" />

			<span class="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2
      whitespace-nowrap rounded-md bg-bg px-2 py-1 text-xs font-black tracking-wider text-brand
      opacity-0 transition duration-200 group-hover:opacity-100
      md:left-[calc(100%+1rem)] md:top-1/2 md:bottom-auto md:-translate-x-0 md:-translate-y-1/2
      md:rounded-none md:bg-transparent md:px-0 md:py-0 md:text-xl">
				{{ item.label.toUpperCase() }}
			</span>

			<Icon :icon="item.icon" :height="item.height" class="relative z-10" />
		</a>
	</nav>
</template>