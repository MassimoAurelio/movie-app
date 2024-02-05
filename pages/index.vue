<script setup lang="ts">
import { useScreenStore } from "@/store/useScreen";
import { useScreenZoom } from "@/hooks/useScreenSize";
import { useUserStore, useIsLoadingStore } from "@/store/auth.store";
useSeoMeta({
  title: "Main Page",
});

const authStore = useUserStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();

const screenStore = useScreenStore();
const { screenZoom } = useScreenZoom();

function logout() {
  isLoadingStore.set(true);
  localStorage.removeItem("token");
  authStore.setAuthenticated(false);
  router.push("/login");
  isLoadingStore.set(false);
}
</script>

<template v-if="isAuthStore.isAuthenticated">
  <div class="flex flex-col gap-10">
    <LayoutLoader v-if="isLoadingStore.isLoading" />
    <button
      class="absolute top-2 right-3 transition-colors hover:text-purple-400"
      @click="logout"
    >
      <Icon name="line-md:logout" color="white" size="30" />
    </button>
    <FilmsblocksAllMovies />
    <div class="flex flex-col relative">
      <FilmsblocksLike />
      <FilmsblocksWatchList
        v-if="
          screenStore.platform === 'desktop' ||
          screenStore.platform === 'tablet'
        "
        :class="screenZoom()"
      />
      <FilmsblocksWatchList v-else />
    </div>
  </div>
</template>
