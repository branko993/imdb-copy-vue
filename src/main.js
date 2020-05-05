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
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas);
library.add(far);

Vue.component("font-awesome-icon", FontAwesomeIcon);
var VueTruncate = require("vue-truncate-filter");

Vue.use(VueTruncate);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(VeeValidate);

ApiService.init();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: new VueRouter(routes),
  store: store,
}).$mount("#app");
