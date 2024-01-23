<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const filmsStore = useFilmsStore();
const heartFilled = ref(true);


const addToFavorites = (film: any) => {
    filmsStore.addToCurrentlyWatching(film);
    heartFilled.value = !heartFilled.value; // Обновляем значение heartFilled при добавлении в избранное
};



const fetchPreviosly = async () => {
    try {
        const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1', {
            headers: {
                'X-API-KEY': '8b810c06-cb08-4b64-bc65-de7d7951285a',
                'Content-Type': 'application/json',
            },
        });
        const { items } = await response.json();
        const filterData = items.filter((item: { nameRu: string | null }) => item.nameRu !== null);
        filmsStore.setFilms(filterData);
    } catch (error) {
        console.error('WARNING:', error);
    }
};

onMounted(() => {
    fetchPreviosly();
});
</script>

<template>
    <div class="flex flex-col gap-10">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Previously Watched
        </h4>
        <div class="flex flex-row gap-y-5">
            <Swiper :slides-per-view="7" :space-between="50" :loop="true" :speed="1300">
                <SwiperSlide class="relative" v-for="item in filmsStore.films" :key="item.nameRu">
                    <div class="relative">
                        <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                        <UiButton class="absolute top-2 left-0 " variant="link" @click="addToFavorites(item)">
                            <Icon :name="heartFilled ? 'line-md:heart' : 'line-md:heart-filled'" color="white" size="30" />
                        </UiButton>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>