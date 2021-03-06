import ApiService from "./api.service";

const authUrl = {
  login: "auth/login",
  register: "auth/register",
};

const AuthService = {
  login(user) {
    return ApiService.post(authUrl.login, user)
      .then((resp) => {
        const access_token = resp.data.access_token;
        sessionStorage.setItem("access_token", access_token);
        ApiService.setAuthHeader(access_token);
        return resp;
      })
      .catch((err) => {
        sessionStorage.removeItem("access_token");
        return Promise.reject(err);
      });
  },

  register(user) {
    return ApiService.post(authUrl.register, user);
  },

  logout() {
    sessionStorage.removeItem("access_token");
    ApiService.removeHeader("Authorization");
  },
};

export default AuthService;
