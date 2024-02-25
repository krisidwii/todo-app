import { createPinia } from "pinia";
import { createApp } from "vue";
import "vue-final-modal/style.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import App from "./App.vue";
import ArgonDashboard from "./argon-dashboard";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import router from "./router";
import store from "./store";

const appInstance = createApp(App);

appInstance.use(ToastPlugin);
appInstance.use(createPinia());
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
