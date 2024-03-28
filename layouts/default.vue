<script setup lang="ts">
const router = useRouter();
/* if (!isAuthStore.isAuthenticated) {
  router.push("/login");
} */
</script>

<template>
  <section style="min-height: 100vh overflow-x-hidden">
    <div class="main-container">
      <LayoutHeader />
      <slot />
    </div>
    <LayoutFooter />
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
.main-container {
  padding: 5vw;
  max-width: 1600px;
  min-height: 1000px;
  margin: 0 auto;
}
</style>
