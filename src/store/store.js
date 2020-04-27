import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    access_token: sessionStorage.getItem("access_token") || "",
    status: "",
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, access_token) => {
      state.status = "success";
      state.access_token = access_token;
    },
    AUTH_ERROR: (state) => {
      state.status = "error";
    },
    AUTH_LOGOUT: (state) => {
      state.status = "logged_out";
      state.access_token = "";
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.access_token,
    authStatus: (state) => state.status,
  },
  actions: {
    LOGIN_REQUEST: (context, user) => {
      return new Promise((resolve, reject) => {
        context.commit("AUTH_REQUEST");
        axios
          .post("http://imdb-copy-laravel.test/api/auth/login", user)
          .then((resp) => {
            const access_token = resp.data.access_token;
            sessionStorage.setItem("access_token", access_token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + access_token;
            context.commit("AUTH_SUCCESS", access_token);
            resolve(resp);
          })
          .catch((err) => {
            context.commit("AUTH_ERROR", err);
            sessionStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
    LOG_OUT: (context) => {
      return new Promise((resolve) => {
        context.commit("AUTH_LOGOUT");
        sessionStorage.removeItem("access_token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    REGISTER_REQUEST: (context, user) => {
      return new Promise((resolve, reject) => {
        axios
          .post("http://imdb-copy-laravel.test/api/auth/register", user)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            context.commit("AUTH_ERROR", err);
            sessionStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
  },
});

export default store;
