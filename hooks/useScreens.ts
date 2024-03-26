import { ref, computed } from "vue";
import { useScreenStore } from "@/store/useScreen";
const screenStore = useScreenStore();
const { platform } = storeToRefs(screenStore);

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

export function getScreenSize() {
  const screenStore = useScreenStore();

  return computed(() => {
    if (
      screenStore.platform === "desktop" ||
      screenStore.platform === "tablet"
    ) {
      return "flex flex-col justify-items-start gap-10 w-2/5 h-96";
    }
    if (
      screenStore.platform === "tablet2" ||
      screenStore.platform === "mobile" ||
      screenStore.platform === "mobile2"
    ) {
      return "flex flex-col justify-items-start gap-10 w-full h-96";
    }
  });
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
