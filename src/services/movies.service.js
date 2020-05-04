import ApiService from "./api.service";
import { PER_PAGE } from "../shared/const";

const moviesUrl = {
  getAll: "movies/all",
  getCurrent: "movies/movie/",
  currentUrl: "movies/getPage?page=%page&size=%size",
  createMovieurl: "/movies/create",
};

const MoviesService = {
  getAllMovies() {
    return ApiService.get(moviesUrl.getAll);
  },

  getCurrentPage(page) {
    let currentUrl = moviesUrl.currentUrl
      .replace("%page", page)
      .replace("%size", PER_PAGE);
    return ApiService.get(currentUrl);
  },

  getCurrentMovie(id) {
    return ApiService.get(`${moviesUrl.getCurrent}${id}`);
  },

  createNewMovie(movie) {
    return ApiService.post(moviesUrl.createMovieurl, movie);
  },
};

export default MoviesService;