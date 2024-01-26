<script setup lang="ts">

useSeoMeta({
    title: "Main Page"
})



</script>

<template>
    <div class="flex flex-col gap-10">
        <!-- <LayoutHeader /> -->
        <FilmsblocksPreviously />
        <div class="flex flex-row relative">
            <FilmsblocksCurrently />
            <FilmsblocksSuggested class="absolute right-0" />
        </div>
    </div>
</template>