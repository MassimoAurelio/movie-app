<script setup lang="ts">
import { useUserStore, useIsLoadingStore } from "@/store/auth.store";

const isAuthStore = useUserStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();
if (!isAuthStore.isAuthenticated) {
  router.push("/login");
}
</script>

<template>
  <section style="min-height: 100vh">
    <!-- <LayoutLoader v-if="isLoadingStore.isLoading" /> -->
    <div class="main-container">
      <LayoutHeader v-if="isAuthStore.isAuthenticated" />
      <slot />
    </div>
    <LayoutFooter v-if="isAuthStore.isAuthenticated" />
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
