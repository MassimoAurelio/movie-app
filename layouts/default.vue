<script setup lang="ts"></script>

<template>
  <section style="min-height: 100vh">
    <div class="main-container">
      <LayoutHeader />
      <slot />
    </div>
    <LayoutFooter />
  </section>
</template>

<style scoped>
.main-container {
  padding: 5vw;
  max-width: 1600px;
  min-height: 1000px;
  margin: 0 auto;
}
</style>
