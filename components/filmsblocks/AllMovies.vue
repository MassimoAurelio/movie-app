<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useHandleCardClick } from "@/hooks/useHandleCardClick";
import { useSliderPerViewAllMovies } from "@/hooks/useScreens";
import {TOP_POPULAR_FILMS_URL } from "@/utils/endpoints";
import "swiper/css";

const filmsStore = useFilmsStore();
const { handleCardClick } = useHandleCardClick();
const { slidesPerView } = useSliderPerViewAllMovies();

const fetchPreviosly = async () => {
  try {
    const response = await fetch(TOP_POPULAR_FILMS_URL, {
      headers: {
        "X-API-KEY": "8b810c06-cb08-4b64-bc65-de7d7951285a",
        "Content-Type": "application/json",
      },
    });
    const { items } = await response.json();
    const filterData = items.filter(
      (item: { nameRu: string | null }) => item.nameRu !== null
    );
    filmsStore.setFilms(filterData);
  } catch (error) {
    console.error("WARNING:", error);
  }
};

const heartFilled = (film: IFilms) =>
  computed(() =>
    filmsStore.currentlyWatching.some((f) => f.nameRu === film.nameRu)
  );

onMounted(() => {
  fetchPreviosly();
});
</script>

<template>
  <div class="flex flex-col gap-10">
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
      Suggested To Watch
    </h4>
    <div class="flex flex-row gap-y-5 cursor-pointer">
      <Swiper
        :slides-per-view="slidesPerView"
        :space-between="15"
        :loop="true"
        :speed="1300"
      >
        <SwiperSlide
          class="relative"
          v-for="(item, index) in filmsStore.films"
          :key="item.kinopoiskId"
        >
          <div
            class="relative flex items-center justify-center h-72 overflow-hidden transition-transform transform hover:scale-105 hover:brightness-50"
            @click.stop="handleCardClick(item.kinopoiskId)"
          >
            <NuxtImg
              :src="item.posterUrl"
              alt="img"
              class="w-44 h-64 rounded-xl"
            />
            <UiButton
              class="absolute top-5 left-0"
              variant="link"
              @click.stop="filmsStore.addToFavorites(index, item)"
            >
              <Icon
                :name="
                  heartFilled(item).value
                    ? 'flat-color-icons:like'
                    : 'icon-park-solid:like'
                "
                :color="heartFilled(item).value ? 'red' : 'white'"
                size="30"
              />
            </UiButton>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
