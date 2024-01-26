<script setup lang="ts">
import { useScreenStore } from '@/store/useScreen'

useSeoMeta({
    title: "Main Page"
})

const screenStore = useScreenStore()

const screenZoom = () => {
    if (screenStore.platform === 'desctope' || screenStore.platform === 'tablet') {
        return 'absolute right-0'
    }
}


</script>

<template>
    <div class="flex flex-col gap-10">
        <FilmsblocksPreviously />
        <div class="flex flex-col relative">
            <FilmsblocksCurrently />
            <FilmsblocksSuggested v-if="screenStore.platform === 'desctope' || screenStore.platform === 'tablet'"
                :class="screenZoom()" />
            <FilmsblocksSuggested v-else />
        </div>
    </div>
</template>