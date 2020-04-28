import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "./store/store";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/global.css";
import ApiService from "./services/api.service";

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VeeValidate);

ApiService.init();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: new VueRouter(routes),
  store: store,
}).$mount("#app");
