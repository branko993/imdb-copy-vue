import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import movies from "./modules/movies";
import genre from "./modules/genre";
import movieComments from "./modules/movieComments";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    movies,
    genre,
    movieComments,
  },
});

export default store;
