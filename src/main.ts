import { createApp } from "vue";
import App from "./App.vue";
import dayjs from "./vite/dayjs.ts";
import router from "./router";
import pinia from "./pinia";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(dayjs)
app.use(router)
app.use(pinia)

app.mount("#app")
