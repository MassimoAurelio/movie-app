<script setup lang="ts">

useSeoMeta({
    title: 'Login'
})

const router = useRouter()
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen w-full gap-5">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" style="white-space: pre-line;">
            The<br>Movie<br>Tracker
        </h1>
        <form>
            <div class="pt-3">
                <UiInput placeholder="Email" type="email" class="mb-3" />
                <UiInput placeholder="Password" type="password" class="mb-3" />
            </div>
            <div class="pt-3">
                <UiButton type="button" class="w-full">Login</UiButton>
            </div>

            <div class="text-xs pt-2">You don’t have an account? <NuxtLink to="registration"><Button
                        variant="link">SignUp</Button>
                </NuxtLink>
            </div>
        </form>
    </div>
</template>