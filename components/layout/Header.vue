<script setup lang="ts">
import { useScreenStore } from '@/store/useScreen'
import { useFilmsStore } from '@/store/useFilms'


const screenStore = useScreenStore()
const filmsStore = useFilmsStore();
const query = ref('');



const searchSize = computed(() => {
    switch (screenStore.platform) {
        case 'desctope':
            return "p-3 w-1/2 rounded-3xl";
        case 'tablet':
            return "p-3 w-auto rounded-3xl";
        case 'tablet2':
            return "p-3 w-auto rounded-3xl"
        case 'mobile':
            return "p-3 w-auto rounded-3xl"
        case 'mobile2':
            return "p-3 w-9 h-9 rounded-3xl"
    }
})



const searchResults = computed(() => {
    if (!query.value) {
        return [];
    }
    return filmsStore.films.filter((film) => film.nameRu.includes(query.value));
});

const search = () => {
    query.value = query.value;
};


</script>

<template>
    <div class="flex items-center mb-3">
        <h3 class="text-4xl font-extrabold tracking-tight lg:text-5xl grow">
            <NuxtLink to="/">
                The<br>Movie<br>Tracker
            </NuxtLink>
        </h3>
        <div class="grow">
            <UiButton v-if="screenStore.platform === 'mobile2'" class="rounded-full">
                <Icon name='material-symbols:search' size="30" />
            </UiButton>
            <UiInput v-else v-model="query" @input="search" :class="searchSize" placeholder="Search" />
            <div>
                <p v-for="item in searchResults" :key='item.kinopoiskId'>
                    {{ item.nameRu }}
                </p>
            </div>
        </div>
    </div>
</template>