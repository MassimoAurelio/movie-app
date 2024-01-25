<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms'
import { useScreenStore } from '@/store/useScreen'
import 'swiper/css'



const route = useRoute() // Получаем текущий маршрут
const kinopoiskId = Number(route.params.id)

const filmsStore = useFilmsStore()
const screenStore = useScreenStore()
const { platform } = storeToRefs(screenStore)



const dinamicPage = async (kinopoiskId: number) => {
    try {
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`;

        const response = await fetch(url, {
            headers: {
                'X-API-KEY': '8b810c06-cb08-4b64-bc65-de7d7951285a',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        filmsStore.setDynamic(data);
    } catch (error) {
        console.error('WARNING:', error);
    }
};

onMounted(() => {
    dinamicPage(kinopoiskId);
});
</script>



<template>
    <div class="relative">
        <!-- <NuxtImg :src="filmsStore.suggested.posterUrl" alt="img" class="w-44 h-64 rounded-xl" /> -->
        <h2>{{ filmsStore.dynamic.nameRu }}</h2>
    </div>
</template>