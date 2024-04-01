<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { useScreenStore } from "@/store/useScreen";
import { useAddToWatchList } from "@/hooks/useAddTo";
import ScrollPanel from "primevue/scrollpanel";
import { FILM_BY_ID_URL } from "@/utils/endpoints";
import { headers } from "@/hooks/header";

const film = computed(() => filmsStore.dynamic.nameRu);
const route = useRoute();
const filmsStore = useFilmsStore();
const { addToWatchList } = useAddToWatchList();

useSeoMeta({
  title: film,
});

const key = useRuntimeConfig().public.apiKey;

const dinamicPage = async (kinopoiskId: number) => {
  try {
    headers["X-API-KEY"] = key;
    filmsStore.setLoading(true);
    const response = await fetch(FILM_BY_ID_URL(kinopoiskId), {
      headers: headers,
    });
    const data = await response.json();
    filmsStore.setDynamic(data);
    filmsStore.setLoading(false);
  } catch (error) {
    console.error("WARNING:", error);
  }
};

const screenStore = useScreenStore();

const screenSize = computed(() => {
  const platformStyles = {
    desktop: "flex flex-row item-center gap-3 w-full",
    tablet: "flex flex-row item-center gap-3 w-full",
    tablet2: "flex flex-col item-center gap-3 w-full",
    mobile: "flex flex-col item-center gap-3 w-full",
    mobile2: "flex flex-col item-center gap-3 w-full",
  };

  return (
    platformStyles[screenStore.platform] ||
    "flex flex-col item-center gap-3 w-full"
  );
});

const isInWatchlist = computed(
  () =>
    Array.isArray(filmsStore.watchlist) &&
    filmsStore.watchlist.some((f) => f.nameRu === filmsStore.dynamic.nameRu)
);

const kinopoiskId = Number(route.params.id);
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
            class="w-auto h-full rounded-xl"
          />
        </div>
        <div class="flex flex-col w-full gap-5">
          <div class="flex flex-row w-96" v-if="filmsStore.dynamic.genres">
            <div
              v-for="(genre, index) in filmsStore.dynamic.genres.slice(0, 1)"
              :key="`genre-${index}`"
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
