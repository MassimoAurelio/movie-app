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
