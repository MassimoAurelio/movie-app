export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
