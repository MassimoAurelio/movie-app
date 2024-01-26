<script setup lang="ts">
import { useFilmsStore } from '@/store/useFilms'
import { useScreenStore } from '@/store/useScreen'
import 'swiper/css'

const filmsStore = useFilmsStore()
const screenStore = useScreenStore()
const { platform } = storeToRefs(screenStore)




const solo = async () => {
    try {
        const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
            headers: {
                'X-API-KEY': '8b810c06-cb08-4b64-bc65-de7d7951285a',
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        filmsStore.setSuggested(data);
    } catch (error) {
        console.error('WARNING:', error);
    }
};

onMounted(() => {
    solo();
});

</script>

<template>
    <div class="flex flex-col justify-items-start gap-10 w-2/5 h-96">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Viewed
        </h4>
        <div class="flex flex-row gap-5">
            <div class="w-44 h-64 rounded-xl" v-for="item in filmsStore.watchlist" :key="item.nameRu">
                <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
                <UiButton variant="link" class="absolute top-2 left-0 ">
                    <Icon :name="item.isFavorite ? 'line-md:heart-filled' : 'line-md:heart'"
                        :color="item.isFavorite ? 'red' : 'white'" size="30" />
                </UiButton>
            </div>
        </div>
    </div>
</template>