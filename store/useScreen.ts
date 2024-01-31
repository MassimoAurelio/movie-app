export const useScreenStore = defineStore("screen", () => {
  const platform = ref<"desktop" | "tablet" | "tablet2" | "mobile" | "mobile2">(
    "desktop"
  );

  const setPlatform = (width: number) => {
    if (width >= 1250) return (platform.value = "desktop");
    if (width >= 900) return (platform.value = "tablet");
    if (width >= 600) return (platform.value = "tablet2");
    if (width >= 450) return (platform.value = "mobile");
    return (platform.value = "mobile2");
  };

  return { setPlatform, platform };
});
