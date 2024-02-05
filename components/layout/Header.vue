<script setup lang="ts">
import { useScreenStore } from "@/store/useScreen";
import { useFilmsStore } from "@/store/useFilms";
import { useHandleCardClick } from "@/hooks/useHandleCardClick";
import { useScreenHeader } from "@/hooks/useScreenSize";

const screenStore = useScreenStore();
const filmsStore = useFilmsStore();

const { handleCardClick } = useHandleCardClick();
const { searchSize } = useScreenHeader();
</script>

<template>
  <div class="flex items-center relative mb-3">
    <h3 class="text-4xl font-extrabold tracking-tight lg:text-5xl grow">
      <NuxtLink to="/"> The<br />Movie<br />Tracker </NuxtLink>
    </h3>
    <div class="grow relative">
      <div class="relative">
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
