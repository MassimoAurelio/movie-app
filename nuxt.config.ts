export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/test-utils/module",
    "nuxt-primevue",
    "@nuxt/image",
    "@nuxt/content",
    "@pinia/nuxt",
    "nuxt-icon",
  ],
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  pinia: {
    storesDirs: ["./store/**"],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  nitro: {
    prerender: {
      routes: ["/", "/films"],
    },
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.APIKEY || "",
      baseUrl: process.env.KINOPOISK_API_BASE_URL || "",
    },
    app: {
      apiKey: process.env.APIKEY || "",
    },
  },
});
