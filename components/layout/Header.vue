<script setup lang="ts">
import { useScreenStore } from '@/store/useScreen'

const screenStore = useScreenStore()



const searchSize = computed(() => {
    switch (screenStore.platform) {
        case 'desctope':
            return "p-3 w-1/2 rounded-3xl";
        case 'tablet':
            return "p-3 w-auto rounded-3xl";
        case 'tablet2':
            return "p-3 w-auto rounded-3xl"
        case 'mobile':
            return "p-3 w-auto rounded-3xl"
        case 'mobile2':
            return "p-3 w-9 h-9 rounded-3xl"
    }
})


</script>

<template>
    <div class="flex items-center mb-3">
        <h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl grow">
            <NuxtLink to="/">
                The<br>Movie<br>Tracker
            </NuxtLink>
        </h1>
        <div class="grow">
            <UiButton v-if="screenStore.platform === 'mobile2'" class="rounded-full">
                <Icon name='material-symbols:search' size="30" />
            </UiButton>
            <UiInput v-else :class="searchSize" placeholder="Search" />
        </div>
    </div>
</template>