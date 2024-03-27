<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { useIsLoadingStore } from "@/store/auth.store";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useHandleCardClick } from "@/hooks/useHandleCardClick";
import { useSliderPerViewAllMovies } from "@/hooks/useScreens";
import "swiper/css";

const filmsStore = useFilmsStore();
const { handleCardClick } = useHandleCardClick();
const { slidesPerView } = useSliderPerViewAllMovies();
const isLoadingStore = useIsLoadingStore();

const fetchPreviosly = async () => {
  isLoadingStore.set(true);
  try {
    const response = await fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1",
      {
        headers: {
          "X-API-KEY": "8b810c06-cb08-4b64-bc65-de7d7951285a",
          "Content-Type": "application/json",
        },
      }
    );
    const { items } = await response.json();
    const filterData = items.filter(
      (item: { nameRu: string | null }) => item.nameRu !== null
    );
    filmsStore.setFilms(filterData);
  } catch (error) {
    console.error("WARNING:", error);
  }
  isLoadingStore.set(false);
};

const heartFilled = (film: IFilms) =>
  computed(() =>
    filmsStore.currentlyWatching.some((f) => f.nameRu === film.nameRu)
  );

const addToFavorites = (index: number, film: any) => {
  const isAlreadyAdded = filmsStore.currentlyWatching.some(
    (f) => f.nameRu === film.nameRu
  );

  if (!isAlreadyAdded) {
    filmsStore.addToCurrentlyWatching(index, film);
  } else {
    const filmIndex = filmsStore.currentlyWatching.findIndex(
      (f) => f.nameRu === film.nameRu
    );
    filmsStore.removeCurrently(filmIndex);
  }
};

onMounted(() => {
  fetchPreviosly();
});
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <div v-else class="flex flex-col gap-10">
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
          :key="item.nameRu"
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
              @click.stop="addToFavorites(index, item)"
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
