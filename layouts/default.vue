<script setup lang="ts"></script>


<template>
    <section style="min-height: 150vh;">
        <div class="main-container">
            <slot />
        </div>
    </section>
</template>



<style scoped>
.main-container {
    padding: 5vh;
}
</style>