<script setup lang="ts">
import { useScreenStore } from '@/store/useScreen'


const screenStore = useScreenStore()
const { setPlatform } = screenStore

const onResize = () => {
  setPlatform(window.innerWidth)
}

onMounted(() => {
  window.addEventListener("resize", onResize)
})

onUnmounted(() => {
  window.removeEventListener("resize", onResize)
})
</script>


<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
