import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import './assets/main.css'
import Vue3Marquee from "vue3-marquee";
import "vue3-marquee/dist/style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vue3Marquee);
app.mount("#app");
