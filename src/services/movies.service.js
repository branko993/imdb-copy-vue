import ApiService from "./api.service";

const moviesUrl = {
  getAll: "movies/all",
  getCurrent: "movies/",
};

const MoviesService = {
  getAllMovies() {
    return ApiService.get(moviesUrl.getAll);
  },

  getCurrentMovie(id) {
    return ApiService.get(`${moviesUrl.getCurrent}${id}`);
  },
};

export default MoviesService;
