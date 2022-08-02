import { createApp } from "vue";
import { createPinia } from "pinia";

import Vue3Marquee from "vue3-marquee";
import "vue3-marquee/dist/style.css";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

const app = createApp(App);
// NOTE: including pinia in our app (also observe line 2)
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vue3Marquee);
app.mount("#app");
