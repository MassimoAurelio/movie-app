<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { useScreenStore } from "@/store/useScreen";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useHandleCardClick } from "@/hooks/useHandleCardClick";
import { useSliderPerViewWatchList } from "@/hooks/useScreens";
import { useScreenSizeWatchList } from "@/hooks/useScreenSize";
import "swiper/css";

const filmsStore = useFilmsStore();
const { handleCardClick } = useHandleCardClick();
const { slidesPerView } = useSliderPerViewWatchList();
const { screenSize } = useScreenSizeWatchList();

onMounted(() => {
  filmsStore.loadWatchlist();
});
</script>

<template>
  <div :class="screenSize">
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Viewed</h4>
    <div
      v-if="Object.keys(filmsStore.watchlist).length >= 4"
      class="flex flex-row gap-y-5"
    >
      <Swiper
        :slides-per-view="slidesPerView"
        :space-between="10"
        :loop="true"
        :speed="1300"
      >
        <SwiperSlide
          v-for="item in filmsStore.watchlist"
          :key="item.kinopoiskId"
        >
          <div
            class="relative cursor-pointer"
            @click.stop="handleCardClick(item.kinopoiskId)"
          >
            <NuxtImg
              :src="item.posterUrl"
              alt="img"
              class="w-44 h-64 rounded-xl"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else class="flex flex-row gap-5">
      <div
        class="w-44 h-64 rounded-xl cursor-pointer"
        v-for="item in filmsStore.watchlist"
        :key="item.kinopoiskId"
        @click="handleCardClick(item.kinopoiskId)"
      >
        <NuxtImg :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
      </div>
    </div>
  </div>
</template>
