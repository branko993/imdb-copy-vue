import axios from "axios";
import { AUTH_ACTIONS } from "../store/actions/actions";
import { router } from "../main";
import store from "../store/store";

const ApiService = {
  init() {
    axios.defaults.baseURL = process.env.VUE_APP_ROOT_URL;
  },

  setAuthHeader(access_token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
  },

  removeHeader(header) {
    delete axios.defaults.headers.common[header];
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  initInterceptor() {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (error.response.status === 401) {
          store
            .dispatch(AUTH_ACTIONS.LOG_OUT)
            .then(() => router.push("/login"));
        }
        return Promise.reject(error);
      }
    );
  },
};
export default ApiService;
