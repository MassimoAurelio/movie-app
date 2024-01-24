<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms'
import { useScreenStore } from '@/store/useScreen'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const filmsStore = useFilmsStore()
const screenStore = useScreenStore()
const { platform } = storeToRefs(screenStore)


const removeFromCurrentlyWatching = (index: number) => {
    const filmToRemove = filmsStore.currentlyWatching[index];
    const filmInStore = filmsStore.films.find(f => f.nameRu === filmToRemove.nameRu);
    if (filmInStore) {
        filmInStore.isFavorite = false;
    }
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
                    <div class="relative">
                        <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                        <UiButton variant="link" class="absolute top-2 left-0" @click="removeFromCurrentlyWatching(index)">
                            <Icon :name="item.isFavorite ? 'line-md:heart-filled' : 'line-md:heart'"
                                :color="item.isFavorite ? 'red' : 'white'" size="30" />
                        </UiButton>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div v-else class="flex flex-row gap-5">
                <div class="w-44 h-64 rounded-xl" v-for="(item, index) in filmsStore.currentlyWatching" :key="item.nameRu">
                    <div class="relative">
                        <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                        <UiButton variant="link" class="absolute top-2 left-0 " @click="removeFromCurrentlyWatching(index)">
                            <Icon :name="item.isFavorite ? 'line-md:heart-filled' : 'line-md:heart'"
                                :color="item.isFavorite ? 'red' : 'white'" size="30" />
                        </UiButton>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>