import { createApp } from "vue";
import App from "./App.vue";
import dayjs from "./vite/dayjs.ts";
import router from "./router";
import pinia from "./pinia";

const app = createApp(App)

app.use(dayjs)
app.use(router)
app.use(pinia)

app.mount("#app")
