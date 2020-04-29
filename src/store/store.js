import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import movies from "./modules/movies";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    movies,
  },
});

export default store;
