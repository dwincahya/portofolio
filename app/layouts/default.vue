<script setup lang="ts">
    import Navbar from '~/components/Navbar.vue'
    import ProfileCard from '~/components/ProfileCard.vue'
</script>

<template>
    <div class="min-h-screen bg-bg text-text relative">
        <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <Navbar />
        </div>

        <div class="grid grid-cols-1 lg:min-h-screen" style="grid-template-columns: 42% 58%">
            <aside class="border-r border-border p-6 lg:p-8">
                <div class="sticky top-6 space-y-4 max-w-md">
                    <ProfileCard />
                </div>
            </aside>

            <main class="p-6 lg:p-8 overflow-y-auto">
                <div class="max-w-2xl">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
