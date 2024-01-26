<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms'
import { useScreenStore } from '@/store/useScreen'
import 'swiper/css'

const filmsStore = useFilmsStore()
const screenStore = useScreenStore()
const { platform } = storeToRefs(screenStore)

const router = useRouter()

const handleCardClick = (kinopoiskId: number) => {
    router.push(`/films/${kinopoiskId}`)
}


</script>

<template>
    <div class="flex flex-col justify-items-start gap-10 w-2/5 h-96">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Viewed
        </h4>
        <div class="flex flex-row gap-5">
            <div class="w-44 h-64 rounded-xl" v-for="item in filmsStore.watchlist" :key="item.kinopoiskId"
                @click="handleCardClick(item.kinopoiskId)">
                <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
            </div>
        </div>
    </div>
</template>