<script setup lang="ts">
import { useFilmsStore } from "@/store/useFilms";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useHandleCardClick } from "@/hooks/useHandleCardClick";
<<<<<<< HEAD
import { useSlidesPerViewLike } from "@/hooks/useScreens";
import { useScreenStore } from "@/store/useScreen";
=======
import { useSlidesPerViewLike, getScreenSize } from "@/hooks/useScreens";
>>>>>>> 44282b62e4b98c1ef355f3af0e75c9c63accf5f0
import "swiper/css";

const { handleCardClick } = useHandleCardClick();
const { slidesPerView } = useSlidesPerViewLike();
const filmsStore = useFilmsStore();
<<<<<<< HEAD
const screenStore = useScreenStore();

const removeFromCurrentlyWatching = (index: number) => {
  const filmToRemove = filmsStore.currentlyWatching[index];
  const filmInStore = filmsStore.films.find(
    (f) => f.nameRu === filmToRemove.nameRu
  );
  if (filmInStore) {
    filmInStore.isFavorite = false;
  }
  filmsStore.removeCurrently(index);
};
const screenSize = computed(() => {
  if (screenStore.platform === "desktop" || screenStore.platform === "tablet") {
    return "flex flex-col justify-items-start gap-10 w-2/5 h-96";
  }
  if (screenStore.platform === "mobile2") {
    return "flex flex-col justify-items-start gap-10 w-full h-96";
  }
});
=======
const screenSize = getScreenSize();
>>>>>>> 44282b62e4b98c1ef355f3af0e75c9c63accf5f0

onMounted(() => {
  filmsStore.loadCurrentlyWatching();
});
</script>

<template>
  <div :class="screenSize">
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Like</h4>
    <div
      v-if="filmsStore.currentlyWatching.length >= 4"
      class="flex flex-row gap-y-5"
    >
      <Swiper
        :slides-per-view="
          Math.min(filmsStore.currentlyWatching.length, slidesPerView)
        "
        :space-between="10"
        :loop="true"
        :speed="1300"
      >
        <SwiperSlide
          v-for="(item, index) in filmsStore.currentlyWatching"
          :key="item.kinopoiskId"
          class="flex flex-col items-center w-44 h-64 relative"
        >
          <div
            class="relative flex items-center justify-center h-72 overflow-hidden transition-transform transform hover:scale-105 hover:brightness-50"
            @click.stop="handleCardClick(item.kinopoiskId)"
          >
            <img :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
            <UiButton
              variant="link"
              class="absolute top-6 left-0"
              @click.stop="filmsStore.removeFromCurrentlyWatching(index)"
            >
              <Icon
                :name="
                  item.isFavorite
                    ? 'flat-color-icons:like'
                    : 'icon-park-solid:like'
                "
                :color="item.isFavorite ? 'red' : 'white'"
                size="30"
              />
            </UiButton>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div v-else class="flex flex-row gap-5">
      <div
        class="w-44 h-72 rounded-xl cursor-pointer relative flex items-center justify-center overflow-hidden transition-transform transform hover:scale-105 hover:brightness-50"
        @click.stop="handleCardClick(item.kinopoiskId)"
        v-for="(item, index) in filmsStore.currentlyWatching"
        :key="item.kinopoiskId"
      >
        <img :src="item.posterUrl" alt="img" class="w-44 h-64 rounded-xl" />
        <UiButton
          variant="link"
          class="absolute top-6 left-0"
          @click.stop="filmsStore.removeFromCurrentlyWatching(index)"
        >
          <Icon
            :name="
              item.isFavorite ? 'flat-color-icons:like' : 'icon-park-solid:like'
            "
            :color="item.isFavorite ? 'red' : 'white'"
            size="30"
          />
        </UiButton>
      </div>
    </div>
  </div>
</template>
