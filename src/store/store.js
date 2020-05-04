import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import movies from "./modules/movies";
import genre from "./modules/genre";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    movies,
    genre
  },
});

export default store;
