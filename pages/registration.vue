<script setup lang="ts">
useSeoMeta({
  title: "Registration",
});

const authStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

/* const registration = async () => {
  try {
    const userData = {
      username: email.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:5000/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      authStore.setAuthenticated(true);
      await router.push("/");
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }  
};
*/

onBeforeMount(() => {
  /* const token = localStorage.getItem("token");
  if (token) {
    authStore.isAuthenticated = true;
    router.push("/");
  } else {
    authStore.isAuthenticated = false;
  } */
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen w-full gap-5"
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
          v-model="email"
          class="mb-3"
        />
        <UiInput
          placeholder="Password"
          type="password"
          v-model="password"
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
