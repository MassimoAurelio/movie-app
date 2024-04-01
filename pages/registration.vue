<script setup lang="ts">
useSeoMeta({
  title: "Registration",
});

definePageMeta({
  layout: "un-auth",
});

const form = ref({
  email: "",
  password: "",
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen w-full gap-5 overflow-x-hidden"
  >
    <h1
      class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      style="white-space: pre-line"
    >
      The<br />Movie<br />Tracker
    </h1>
    <form>
      <div class="pt-3">
        <UiInput
          placeholder="Email"
          type="email"
          v-model="form.email"
          class="mb-3"
        />
        <UiInput
          placeholder="Password"
          type="password"
          v-model="form.password"
          class="mb-3"
        />
      </div>
      <div class="pt-3">
        <UiButton type="button" class="w-full">Registration</UiButton>
      </div>

      <div class="text-xs pt-2">
        Already have an account?
        <NuxtLink to="login"><Button variant="link">Login</Button> </NuxtLink>
      </div>
    </form>
  </div>
</template>
