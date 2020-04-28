import { AUTH_ACTIONS } from "../actions/actions";
import { AUTH_GETTERS } from "../getters/getters";
import { AUTH_MUTATIONS } from "../mutations/mutations";
import AuthService from "../../services/auth.service";

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

      return AuthService.login(user)
        .then((resp) => {
          context.commit(AUTH_MUTATIONS.AUTH_SUCCESS, resp.data.access_token);
          return Promise.resolve(resp);
        })
        .catch((err) => {
          context.commit(AUTH_MUTATIONS.AUTH_ERROR, err);
          return Promise.reject(err);
        });
    },
    [AUTH_ACTIONS.LOG_OUT]: (context, router) => {
      context.commit(AUTH_MUTATIONS.AUTH_LOGOUT);

      AuthService.logout(router);
    },
    [AUTH_ACTIONS.REGISTER_REQUEST]: (context, user) => {
      return AuthService.register(user)
        .then((resp) => {
          return Promise.resolve(resp);
        })
        .catch((err) => {
          context.commit(AUTH_MUTATIONS.AUTH_ERROR, err);
          sessionStorage.removeItem("access_token");
          return Promise.reject(err);
        });
    },
  },
};
export default auth;
