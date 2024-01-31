<script setup lang="ts">
import { useScreenStore } from "@/store/useScreen";
import { useFilmsStore } from "@/store/useFilms";

const screenStore = useScreenStore();
const filmsStore = useFilmsStore();
const router = useRouter();

const handleCardClick = (kinopoiskId: number) => {
  console.log("click");
  router.push(`/films/${kinopoiskId}`);
};

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
</script>

<template>
  <div class="flex items-center relative mb-3">
    <h3 class="text-4xl font-extrabold tracking-tight lg:text-5xl grow">
      <NuxtLink to="/"> The<br />Movie<br />Tracker </NuxtLink>
    </h3>
    <div class="grow relative">
      <UiButton v-if="screenStore.platform === 'mobile2'" class="rounded-full">
        <Icon name="material-symbols:search" size="30" />
      </UiButton>
      <div v-else class="relative">
        <UiInput
          v-model="filmsStore.query"
          :class="searchSize"
          placeholder="Search"
        />
        <button
          v-if="filmsStore.query.length > 0"
          class="absolute top-0 right-0 px-3 py-1.5"
          @click="filmsStore.query = ''"
        >
          <Icon name="material-symbols-light:close" size="20" />
        </button>
      </div>
      <div
        v-if="filmsStore.query.length > 0"
        class="mt-1.5 bg-slate-600 w-auto grow p-3 rounded-2xl cursor-pointer"
        style="position: absolute; width: 100%"
      >
        <p
          v-for="item in filmsStore.getSearchResults()"
          :key="item.kinopoiskId"
          @click.stop="handleCardClick(item.kinopoiskId)"
        >
          {{ item.nameRu }}
        </p>
      </div>
    </div>
  </div>
</template>
