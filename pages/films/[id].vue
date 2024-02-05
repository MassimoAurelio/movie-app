<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { useScreenStore } from "@/store/useScreen";
import { useSliderPerViewID } from "@/hooks/useScreenSize";
import { useAddToWatchList } from "@/hooks/useAddTo";
import { useUserStore, useIsLoadingStore } from "@/store/auth.store";
import ScrollPanel from "primevue/scrollpanel";

const route = useRoute();
const kinopoiskId = Number(route.params.id);

const filmsStore = useFilmsStore();
const screenStore = useScreenStore();
const isLoadingStore = useIsLoadingStore();
const { screenSize } = useSliderPerViewID();
const { addToWatchList } = useAddToWatchList();

const film = computed(() => filmsStore.dynamic.nameRu);

useSeoMeta({
  title: film,
});

const isInWatchlist = computed(
  () =>
    Array.isArray(filmsStore.watchlist) &&
    filmsStore.watchlist.some((f) => f.nameRu === filmsStore.dynamic.nameRu)
);

const dinamicPage = async (kinopoiskId: number) => {
  isLoadingStore.set(true);
  try {
    filmsStore.setLoading(true);
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${kinopoiskId}`;
    const response = await fetch(url, {
      headers: {
        "X-API-KEY": "8b810c06-cb08-4b64-bc65-de7d7951285a",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    filmsStore.setDynamic(data);
    filmsStore.setLoading(false);
  } catch (error) {
    console.error("WARNING:", error);
    filmsStore.setLoading(false);
  }
  isLoadingStore.set(false);
};
onMounted(() => {
  dinamicPage(kinopoiskId);
});
</script>

<template>
  <div class="relative flex flex-col gap-14" v-if="!filmsStore.loading">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {{ filmsStore.dynamic.nameRu }}
    </h1>
    <div class="flex flex-row relative">
      <div :class="screenSize">
        <div class="w-auto h-96 mr cursor-pointer">
          <img
            :src="filmsStore.dynamic.posterUrl"
            alt="img"
            class="w-auto h-full rounded-xl mr-4"
          />
        </div>
        <div class="flex flex-col w-full gap-5">
          <div class="flex flex-row w-96" v-if="filmsStore.dynamic.genres">
            <div
              v-for="(genre, index) in filmsStore.dynamic.genres.slice(0, 1)"
              :key="index"
              class="w-32"
            >
              <UiButton variant="outline" class="rounded-3xl">
                {{ genre.genre }}
              </UiButton>
            </div>
          </div>
          <div
            v-if="
              screenStore.platform === 'mobile2' ||
              screenStore.platform === 'mobile'
            "
          >
            <ScrollPanel style="width: 100%; height: 150px">
              <p>
                {{ filmsStore.dynamic.description }}
              </p>
            </ScrollPanel>
          </div>
          <div v-else class="w-3/4">
            {{ filmsStore.dynamic.description }}
          </div>
          <div class="flex flex-col gap-2 justify-center w-1/2">
            <p>IMDB Rating</p>
            <div class="flex flex-row gap-2">
              <Icon name="twemoji:star" size="20" />{{
                filmsStore.dynamic.ratingImdb
              }}/10
            </div>
          </div>
        </div>
      </div>
      <div class="absolute right-0">
        <div class="flex flex-row justify-center items-center w-32">
          <UiButton
            variant="link"
            @click="() => addToWatchList(filmsStore.dynamic)"
          >
            <Icon
              :name="
                isInWatchlist ? 'solar:bookmark-bold' : 'solar:bookmark-broken'
              "
              :color="isInWatchlist ? 'red' : 'white'"
              size="30"
            />
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>
