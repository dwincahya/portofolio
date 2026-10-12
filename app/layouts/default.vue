<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Lenis from 'lenis'
import { onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'
import Navbar from '~/components/Navbar.vue'
import ProfileCard from '~/components/ProfileCard.vue'

const { locale, content, setLocale, initializeLocale } = useLocale()

const lenis = shallowRef<Lenis | null>(null)
const isLeftMenuOpen = ref(false)
const isLeftMenuPinned = ref(false)
const selectedTheme = ref<'dark' | 'light'>('dark')
const highContrastEnabled = ref(false)
const selectedFont = ref<'fira-code' | 'space-grotesk' | 'poppins'>('fira-code')
const selectedFontSize = ref<'small' | 'medium' | 'large'>('medium')

const savePreferences = () => {
    localStorage.setItem('portfolio-preferences', JSON.stringify({
        locale: locale.value,
        theme: selectedTheme.value,
        highContrast: highContrastEnabled.value,
        font: selectedFont.value,
        fontSize: selectedFontSize.value,
    }))
}

const setLocaleAndSave = (nextLocale: 'id' | 'en') => {
    setLocale(nextLocale)
    if (import.meta.client) savePreferences()
}

const setTheme = (nextTheme: 'dark' | 'light') => {
    selectedTheme.value = nextTheme
    document.documentElement.setAttribute('data-theme', nextTheme)
    if (import.meta.client) savePreferences()
}

const setHighContrast = (enabled: boolean) => {
    highContrastEnabled.value = enabled
    document.documentElement.toggleAttribute('data-high-contrast', enabled)
    if (import.meta.client) savePreferences()
}

const setFont = (font: 'fira-code' | 'space-grotesk' | 'poppins') => {
    selectedFont.value = font
    document.documentElement.setAttribute('data-font', font)
    if (import.meta.client) savePreferences()
}

const setFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    selectedFontSize.value = fontSize
    document.documentElement.setAttribute('data-font-size', fontSize)
    if (import.meta.client) savePreferences()
}

const openLeftMenu = () => {
    if (!isLeftMenuPinned.value) {
        isLeftMenuOpen.value = true
    }
}

const closeLeftMenu = () => {
    if (!isLeftMenuPinned.value) {
        isLeftMenuOpen.value = false
    }
}

const toggleLeftMenu = () => {
    isLeftMenuPinned.value = !isLeftMenuPinned.value
    isLeftMenuOpen.value = isLeftMenuPinned.value
}

const closePinnedMenu = () => {
    isLeftMenuPinned.value = false
    isLeftMenuOpen.value = false
}

let animationFrame = 0
provide('portfolio-lenis', lenis)

onMounted(() => {
    initializeLocale()
    const savedPreferences = localStorage.getItem('portfolio-preferences')
    if (savedPreferences) {
        try {
            const preferences = JSON.parse(savedPreferences) as Partial<{
                locale: 'id' | 'en'
                theme: 'dark' | 'light'
                highContrast: boolean
                font: 'fira-code' | 'space-grotesk' | 'poppins'
                fontSize: 'small' | 'medium' | 'large'
            }>
            if (preferences.locale === 'id' || preferences.locale === 'en') setLocale(preferences.locale)
            if (preferences.theme === 'dark' || preferences.theme === 'light') selectedTheme.value = preferences.theme
            if (typeof preferences.highContrast === 'boolean') highContrastEnabled.value = preferences.highContrast
            if (preferences.font === 'fira-code' || preferences.font === 'space-grotesk' || preferences.font === 'poppins') {
                selectedFont.value = preferences.font
            }
            if (preferences.fontSize === 'small' || preferences.fontSize === 'medium' || preferences.fontSize === 'large') {
                selectedFontSize.value = preferences.fontSize
            }
        } catch {
            localStorage.removeItem('portfolio-preferences')
        }
    }

    setTheme(selectedTheme.value)
    setHighContrast(highContrastEnabled.value)
    setFont(selectedFont.value)
    setFontSize(selectedFontSize.value)
    savePreferences()

    const container = document.getElementById('sections-container')
    if (!container) {
        return
    }

    lenis.value = new Lenis({
        wrapper: container,
        content: container.firstElementChild as HTMLElement
    })

    const animate = (time: number) => {
        lenis.value?.raf(time)
        animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
    lenis.value?.destroy()
    lenis.value = null
})
</script>

<template>
    <div class="h-screen w-screen overflow-hidden bg-bg text-text relative">

        <div class="grid h-full grid-cols-1 md:grid-cols-[42.29%_57.71%]">
            <aside class="relative hidden md:block h-full border-r border-border p-4 md:p-6 lg:p-10 overflow-hidden" @mouseleave="closeLeftMenu">
                <div class="sticky top-6 md:top-20 h-[calc(100vh-3rem)] md:h-[calc(100vh-5rem)]">
                    <ProfileCard @open-menu="openLeftMenu" @toggle-menu="toggleLeftMenu" />
                </div>

                <div
                    :class="isLeftMenuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'"
                    class="absolute inset-0 z-30 flex flex-col bg-surface/95 backdrop-blur-md transition-all duration-400 ease-out will-change-transform"
                    @mouseenter="openLeftMenu"
                >
                    <div class="flex items-center justify-between border-b border-border px-6 py-5 lg:px-10">
                        <p class="text-sm uppercase tracking-[0.2em] text-brand">{{ content.settingsMenu.title }}</p>
                        <button
                            type="button"
                            class="cursor-pointer rounded-full border border-border bg-bg/70 px-3 py-1 text-xs uppercase tracking-wider text-text transition hover:border-brand hover:text-brand"
                            :aria-label="content.settingsMenu.closeAriaLabel"
                            @click="closePinnedMenu"
                        >
                            {{ content.settingsMenu.close }}
                        </button>
                    </div>

                    <div class="flex-1 space-y-5 overflow-y-auto px-6 py-5 lg:px-10">
                        <section class="rounded-xl border border-border bg-bg/40 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ content.settingsMenu.language.title }}</p>
                            <div class="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    :class="locale === 'id' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'"
                                    class="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold"
                                    @click="setLocaleAndSave('id')"
                                >
                                    {{ content.settingsMenu.language.id }}
                                </button>
                                <button
                                    type="button"
                                    :class="locale === 'en' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'"
                                    class="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold"
                                    @click="setLocaleAndSave('en')"
                                >
                                    {{ content.settingsMenu.language.en }}
                                </button>
                            </div>
                            <p class="mt-2 text-[11px] text-text-muted">{{ content.settingsMenu.language.helper }}</p>
                        </section>

                        <section class="rounded-xl border border-border bg-bg/40 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ content.settingsMenu.theme.title }}</p>
                            <div class="mt-3 grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    :class="selectedTheme === 'dark' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'"
                                    class="cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-semibold"
                                    @click="setTheme('dark')"
                                >
                                    {{ content.settingsMenu.theme.dark }}
                                </button>
                                <button
                                    type="button"
                                    :class="selectedTheme === 'light' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'"
                                    class="cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-semibold"
                                    @click="setTheme('light')"
                                >
                                    {{ content.settingsMenu.theme.light }}
                                </button>
                            </div>
                        </section>

                        <section class="rounded-xl border border-border bg-bg/40 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ content.settingsMenu.accessibility.title }}</p>
                            <button
                                type="button"
                                class="mt-3 flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-bg/60 px-3 py-2 text-left"
                                :class="highContrastEnabled ? 'border-brand bg-brand/15 text-brand' : 'text-text'"
                                :aria-pressed="highContrastEnabled"
                                @click="setHighContrast(!highContrastEnabled)"
                            >
                                <span class="text-xs font-semibold text-text">{{ content.settingsMenu.accessibility.highContrast }}</span>
                                <span class="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-text-muted">
                                    {{ highContrastEnabled ? content.settingsMenu.accessibility.on : content.settingsMenu.accessibility.off }}
                                </span>
                            </button>
                            <p class="mt-2 text-[11px] text-text-muted">{{ content.settingsMenu.accessibility.helper }}</p>
                        </section>

                        <section class="rounded-xl border border-border bg-bg/40 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ content.settingsMenu.font.title }}</p>
                            <div class="mt-3 grid grid-cols-1 gap-2">
                                <button type="button" :class="selectedFont === 'fira-code' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'" class="cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-semibold" @click="setFont('fira-code')">Fira Code</button>
                                <button type="button" :class="selectedFont === 'space-grotesk' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'" class="cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-semibold" @click="setFont('space-grotesk')">Space Grotesk</button>
                                <button type="button" :class="selectedFont === 'poppins' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'" class="cursor-pointer rounded-lg border px-3 py-2 text-left text-xs font-semibold" @click="setFont('poppins')">Poppins</button>
                            </div>
                            <p class="mt-2 text-[11px] text-text-muted">{{ content.settingsMenu.font.helper }}</p>
                        </section>

                        <section class="rounded-xl border border-border bg-bg/40 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ content.settingsMenu.fontSize.title }}</p>
                            <div class="mt-3 grid grid-cols-3 gap-2">
                                <button type="button" :class="selectedFontSize === 'small' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'" class="cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold" @click="setFontSize('small')">{{ content.settingsMenu.fontSize.small }}</button>
                                <button type="button" :class="selectedFontSize === 'medium' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'" class="cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold" @click="setFontSize('medium')">{{ content.settingsMenu.fontSize.medium }}</button>
                                <button type="button" :class="selectedFontSize === 'large' ? 'border-brand bg-brand/15 text-brand' : 'border-border bg-bg/60 text-text'" class="cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold" @click="setFontSize('large')">{{ content.settingsMenu.fontSize.large }}</button>
                            </div>
                            <p class="mt-2 text-[11px] text-text-muted">{{ content.settingsMenu.fontSize.helper }}</p>
                        </section>

                        <section class="rounded-xl border border-border bg-bg/40 p-4">
                            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">{{ content.settingsMenu.connect.title }}</p>
                            <div class="mt-3 space-y-2">
                                <a
                                    v-for="link in content.settingsMenu.connect.links"
                                    :key="link.label + link.icon"
                                    :href="link.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex items-center gap-2 rounded-lg border border-border bg-bg/60 px-3 py-2 text-text transition hover:border-brand hover:text-brand"
                                >
                                    <span class="text-base">
                                        <Icon :icon="link.icon" />
                                    </span>
                                    <span class="text-sm font-medium">{{ link.label }}</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </aside>

            <div class="fixed bottom-4 left-1/2 z-10 w-full -translate-x-1/2 px-2 pointer-events-auto
            md:left-[42.30%] md:top-4
            md:bottom-auto md:w-auto
            lg:top-10
            xl:top-15">
                <Navbar />
            </div>

            <main id="sections-container" class="h-full overflow-y-auto overscroll-contain p-4 md:p-6 lg:p-8 scroll-smooth">
                <div class="max-w-2xl">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
