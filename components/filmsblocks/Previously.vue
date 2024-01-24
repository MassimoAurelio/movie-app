<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useScreenStore } from '@/store/useScreen'
import 'swiper/css';

const filmsStore = useFilmsStore();
const screenStore = useScreenStore()

const heartFilled = (film: IFilms) => computed(() => filmsStore.currentlyWatching.some(f => f.nameRu === film.nameRu));

const addToFavorites = (index: number, film: any) => {
    const isAlreadyAdded = filmsStore.currentlyWatching.some(f => f.nameRu === film.nameRu);

    if (!isAlreadyAdded) {
        filmsStore.addToCurrentlyWatching(index, film);
    } else {
        const filmIndex = filmsStore.currentlyWatching.findIndex(f => f.nameRu === film.nameRu);
        filmsStore.removeCurrently(filmIndex);
    }
};

const slidesPerView = computed(() => {
    switch (screenStore.platform) {
        case 'desctope':
            return 7;
        case 'tablet':
            return 5;
        case 'tablet2':
            return 4;
        case 'mobile':
            return 2
        case 'mobile2':
            return 2
        default:
            return 7;
    }
});


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
            <Swiper :slides-per-view="slidesPerView" :space-between="50" :loop="true" :speed="1300">
                <SwiperSlide class="relative" v-for="(item, index) in filmsStore.films" :key="item.nameRu">
                    <div class="relative">
                        <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                        <UiButton class="absolute top-2 left-0 " variant="link" @click="addToFavorites(index, item)">
                            <Icon :name="heartFilled(item).value ? 'line-md:heart-filled' : 'line-md:heart'"
                                :color="heartFilled(item).value ? 'red' : 'white'" size="30" />
                        </UiButton>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>