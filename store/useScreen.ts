export const useScreenStore = defineStore("screen", () => {
  const platform = ref<
    "desctope" | "tablet" | "tablet2" | "mobile" | "mobile2"
  >("desctope");


  const setPlatform = (width: number) => {
    if (width >= 1250) return (platform.value = "desctope");
    if (width >= 900) return (platform.value = "tablet");
    if (width >= 600) return (platform.value = "tablet2");
    if (width >= 450) return (platform.value = "mobile");
    return (platform.value = "mobile2");
  };

  return { setPlatform, platform};
});
