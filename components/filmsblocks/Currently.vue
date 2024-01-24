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

const slidesPerView = computed(() => {
    switch (screenStore.platform) {
        case 'desctope':
            return 10;
        case 'tablet':
            return 5;
        case 'tablet2':
            return 4;
        case 'mobile':
            return 2
        case 'mobile2':
            return 2
        default:
            return 10;
    }
});


</script>

<template>
    <div class="flex flex-col justify-items-start gap-10 w-full h-96">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Currently Watching
        </h4>
        <div v-if='filmsStore.currentlyWatching.length >= 10' class="flex flex-row gap-y-5">
            <Swiper :slides-per-view="Math.min(filmsStore.currentlyWatching.length, slidesPerView)" :space-between="10"
                :loop="true" :speed="1300">
                <SwiperSlide v-for="(item, index) in filmsStore.currentlyWatching" :key="item.nameRu"
                    class="flex flex-col items-center w-44 h-64 relative">
                    <div class="relative">
                        <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                        <UiButton variant="link" class="absolute top-2 left-0" @click="removeFromCurrentlyWatching(index)">
                            <Icon :name="item.isFavorite ? 'line-md:heart-filled' : 'line-md:heart'"
                                :color="item.isFavorite ? 'red' : 'white'" size="30" />
                        </UiButton>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

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
</template>