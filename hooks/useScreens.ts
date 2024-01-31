import { ref, computed } from "vue";
import { useScreenStore } from "@/store/useScreen";

//LIKE
export function useSlidesPerViewLike() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);

  const slidesPerView = computed(() => {
    switch (platform.value) {
      case "desktop":
        return 3;
      case "tablet":
      case "tablet2":
      case "mobile":
      case "mobile2":
        return 2;
      default:
        return 3;
    }
  });

  return { slidesPerView };
}

//ALLMOVIES

export function useSliderPerViewAllMovies() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);

  const slidesPerView = computed(() => {
    switch (platform.value) {
      case "desktop":
        return 8;
      case "tablet":
        return 5;
      case "tablet2":
        return 4;
      case "mobile":
      case "mobile2":
        return 2;
      default:
        return 8;
    }
  });

  return { slidesPerView };
}

//WatchList
export function useSliderPerViewWatchList() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);
  const slidesPerView = computed(() => {
    switch (platform.value) {
      case "desktop":
        return 3;
      case "tablet":
      case "tablet2":
      case "mobile":
      case "mobile2":
        return 2;
      default:
        return 3;
    }
  });
  return { slidesPerView };
}
