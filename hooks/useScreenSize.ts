export function useScreenSizeLike() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);
  const screenSize = computed(() => {
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
  return { screenSize };
}

// WATCHLIST
export function useScreenSizeWatchList() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);
  const screenSize = computed(() => {
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
  return { screenSize };
}

//[id]

export function useSliderPerViewID() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);

  const screenSize = computed(() => {
    if (
      screenStore.platform === "desktop" ||
      screenStore.platform === "tablet"
    ) {
      return "flex flex-row item-center gap-3 w-full";
    }
    if (
      screenStore.platform === "tablet2" ||
      screenStore.platform === "mobile" ||
      screenStore.platform === "mobile2"
    ) {
      return "flex flex-col item-center gap-3 w-full";
    }
  });
  return { screenSize };
}

//index.vue

export function useScreenZoom() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);

  const screenZoom = () => {
    if (
      screenStore.platform === "desktop" ||
      screenStore.platform === "tablet"
    ) {
      return "absolute right-0";
    }
  };
  return { screenZoom };
}

//Header
export function useScreenHeader() {
  const screenStore = useScreenStore();
  const { platform } = storeToRefs(screenStore);

  const searchSize = computed(() => {
    switch (screenStore.platform) {
      case "desktop":
        return "p-3 w-1/2 rounded-3xl w-full";
      case "tablet":
        return "p-3 w-auto rounded-3xl w-full";
      case "tablet2":
        return "p-3 w-auto rounded-3xl w-full";
      case "mobile":
        return "p-3 w-auto rounded-3xl w-full";
      case "mobile2":
        return "p-3 w-9 h-9 rounded-3xl w-full";
    }
  });
  return { searchSize };
}
