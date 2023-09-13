import { createApp } from "vue";
import router from "./router";

import "./assets/tailwind.css";
import AppVue from "./App.vue";

const app = createApp(AppVue);
app.use(router);

app.mount("#app");
