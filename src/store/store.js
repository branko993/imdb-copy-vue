import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
// import { AUTH_ACTIONS } from "./actions/actions";
// import getters from './getters';
// import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
  }
});

export default store;
