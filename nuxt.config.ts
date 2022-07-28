import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@pinia/nuxt"],
  css: ["@/assets/sass/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: "@import '@/assets/sass/_variables.scss'",
        },
      },
    },
  },
});
