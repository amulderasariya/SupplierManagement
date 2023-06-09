import { createApp } from "vue";
// import { createPinia } from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";
import HighchartsVue from "highcharts-vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.interceptors.request.use((config) => {
	config.headers["Authorization"] = `Bearer ${$cookies.get("token")}`;
	return config;
});

const app = createApp(App);

const toastOptions = {
	transition: "Vue-Toastification__fade",
	maxToasts: 10,
	newestOnTop: true,
	position: "bottom-right",
	timeout: 5000,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: true,
	closeButton: "button",
	icon: true,
	rtl: false,
};

// app.use(createPinia());
app.use(router);
app.use(HighchartsVue);
app.use(VueCookies, { expires: "7d" });
app.use(Toast, toastOptions);
app.component("Datepicker", Datepicker);

app.mount("#app");
