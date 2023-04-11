import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@use '@/assets/sass/main.scss' as *;", //PASS: ça marche
            },
        },
    },
    // NOTE: attempting to fix cors issue using this article: https://rubenr.dev/cors-vite-vue
    server: {
        proxy: {
            "/api": {
                target: "https://api.coingecko.com",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
