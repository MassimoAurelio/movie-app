<script setup lang="ts">
import { useScreenStore } from "@/store/useScreen";
import { useScreenZoom } from "@/hooks/useScreenSize";

useSeoMeta({
  title: "Main Page",
});

const screenStore = useScreenStore();
const { screenZoom } = useScreenZoom();
</script>

<template>
  <div class="flex flex-col gap-10">
    <button
      class="absolute top-2 right-3 transition-colors hover:text-purple-400"
      
    >
      <Icon name="line-md:logout" color="white" size="30" />
    </button>
    <LazyFilmsblocksAllMovies />
    <div class="flex flex-col relative">
      <LazyFilmsblocksLike />
      <LazyFilmsblocksWatchList
        v-if="
          screenStore.platform === 'desktop' ||
          screenStore.platform === 'tablet'
        "
        :class="screenZoom()"
      />
      <LazyFilmsblocksWatchList v-else />
    </div>
  </div>
</template>
