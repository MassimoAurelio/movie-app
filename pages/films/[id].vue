<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { useScreenStore } from "@/store/useScreen";

import ScrollPanel from "primevue/scrollpanel";
import "swiper/css";

const route = useRoute();
const kinopoiskId = Number(route.params.id);

const filmsStore = useFilmsStore();
const screenStore = useScreenStore();
const { platform } = storeToRefs(screenStore);

const isInWatchlist = computed(() => Array.isArray(filmsStore.watchlist) && filmsStore.watchlist.some(f => f.nameRu === filmsStore.dynamic.nameRu));

const addToWatchList = (film: any) => {
    const index = filmsStore.films.indexOf(film);
    const isAlreadyAdded = filmsStore.watchlist.some(f => f.nameRu === film.nameRu);

    if (!isAlreadyAdded) {
        filmsStore.addToWatchList(index, film);
    } else {
        const filmIndex = filmsStore.watchlist.findIndex(f => f.nameRu === film.nameRu);
        filmsStore.removeCurrently(filmIndex);
    }
};


const dinamicPage = async (kinopoiskId: number) => {
    try {
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`;

        const response = await fetch(url, {
            headers: {
                "X-API-KEY": "8b810c06-cb08-4b64-bc65-de7d7951285a",
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        filmsStore.setDynamic(data);
        console.log(filmsStore.watchlist)
    } catch (error) {
        console.error("WARNING:", error);
    }
};

onMounted(() => {
    dinamicPage(kinopoiskId);
});
</script>

<template>
    <div class="relative flex flex-col gap-14">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {{ filmsStore.dynamic.nameRu }}
        </h1>
        <div class="flex flex-row relative h-72">
            <div class="flex flex-row gap-3">
                <div class="w-56 h-72">
                    <img :src="filmsStore.dynamic.posterUrl" alt="img" class="w-56 h-72 rounded-xl" />
                </div>
                <div class="flex flex-col w-full gap-5">
                    <div class="flex flex-row w-96" v-if="filmsStore.dynamic.genres">
                        <div v-for="(genre, index) in filmsStore.dynamic.genres.slice(0, 1)" :key="index" class="w-32">
                            <UiButton variant="outline" class="rounded-3xl">
                                {{ genre.genre }}
                            </UiButton>
                        </div>
                    </div>
                    <div>
                        <ScrollPanel style="width: 50%; height: 150px">
                            <p>
                                {{ filmsStore.dynamic.description }}
                            </p>
                        </ScrollPanel>
                    </div>
                    <div class="flex flex-col gap-2 justify-center">
                        <p>IMDB Rating</p>
                        <div class="flex flex-row gap-2">
                            <Icon name="twemoji:star" size="20" />{{ filmsStore.dynamic.ratingImdb }}/10
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute right-0">
                <div class="flex flex-row justify-center items-center">
                    Add watchlist
                    <UiButton variant="link" @click="() => addToWatchList(filmsStore.dynamic)">
                        <Icon :name="isInWatchlist ? 'line-md:heart-filled' : 'line-md:heart'"
                            :color="isInWatchlist ? 'red' : 'white'" size="30" />
                    </UiButton>
                </div>


            </div>
        </div>

    </div>
</template>
