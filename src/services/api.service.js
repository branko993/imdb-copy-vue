import axios from "axios";

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
};
export default ApiService;
