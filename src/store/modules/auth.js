import { AUTH_ACTIONS } from "../actions/actions";
import { AUTH_GETTERS } from "../getters/getters";
import { AUTH_MUTATIONS } from "../mutations/mutations";
import ApiService from "../../services/api.service";

const auth = {
  state: {
    access_token: sessionStorage.getItem("access_token") || "",
    status: "",
  },
  mutations: {
    [AUTH_MUTATIONS.AUTH_REQUEST]: (state) => {
      state.status = "loading";
    },
    [AUTH_MUTATIONS.AUTH_SUCCESS]: (state, access_token) => {
      state.status = "success";
      state.access_token = access_token;
    },
    [AUTH_MUTATIONS.AUTH_ERROR]: (state) => {
      state.status = "error";
    },
    [AUTH_MUTATIONS.AUTH_LOGOUT]: (state) => {
      state.status = "logged out";
      state.access_token = "";
    },
  },
  getters: {
    [AUTH_GETTERS.isAuthenticated]: (state) => !!state.access_token,
    [AUTH_GETTERS.authStatus]: (state) => state.status,
  },
  actions: {
    [AUTH_ACTIONS.LOGIN_REQUEST]: (context, user) => {
      context.commit(AUTH_MUTATIONS.AUTH_REQUEST);

      return new Promise((resolve, reject) => {
        ApiService.post("auth/login", user)
          .then((resp) => {
            const access_token = resp.data.access_token;
            sessionStorage.setItem("access_token", access_token);
            // axios.defaults.headers.common["Authorization"] =
            //   "Bearer " + access_token;
            ApiService.setAuthHeader(access_token);
            context.commit(AUTH_MUTATIONS.AUTH_SUCCESS, access_token);
            resolve(resp);
          })
          .catch((err) => {
            context.commit(AUTH_MUTATIONS.AUTH_ERROR, err);
            sessionStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
    [AUTH_ACTIONS.LOG_OUT]: (context, router) => {
      context.commit(AUTH_MUTATIONS.AUTH_LOGOUT);
      sessionStorage.removeItem("access_token");
      ApiService.removeHeader("Authorization");

      router.push("/login");

      // delete axios.defaults.headers.common["Authorization"];
    },
    [AUTH_ACTIONS.REGISTER_REQUEST]: (context, user) => {
      return new Promise((resolve, reject) => {
        ApiService.post("auth/register", user)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            context.commit(AUTH_MUTATIONS.AUTH_ERROR, err);
            sessionStorage.removeItem("access_token");
            reject(err);
          });
      });
    },
  },
};
export default auth;
