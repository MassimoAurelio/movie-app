<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const filmsStore = useFilmsStore()

const removeFromCurrentlyWatching = (index: number) => {
    filmsStore.removeCurrently(index);
}
</script>

<template>
    <div class="flex flex-col gap-y-5 max-w-xl">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Currently Watching
        </h4>
        <div class="flex flex-row gap-5">
            <Swiper v-if="filmsStore.currentlyWatching.length > 3" :slides-per-view="3" :space-between="50" :loop="true"
                :speed="1300">
                <SwiperSlide v-for="(item, index) in filmsStore.currentlyWatching" :key="item.nameRu"
                    class="flex flex-col items-center w-44 h-64">
                    <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                    <UiButton @click="removeFromCurrentlyWatching(index)">REMOVE</UiButton>
                </SwiperSlide>
            </Swiper>

            <div v-else class="flex flex-row gap-5">
                <div class="w-44 h-64 rounded-xl" v-for="(item, index) in filmsStore.currentlyWatching" :key="item.nameRu">
                    <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                    <UiButton @click="removeFromCurrentlyWatching(index)">REMOVE</UiButton>
                </div>
            </div>
        </div>
    </div>
</template>