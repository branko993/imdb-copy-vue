import ApiService from "./api.service";
import { PER_PAGE } from "../shared/const";

const moviesUrl = {
  getAll: "movies/all",
  getCurrent: "movies/movie/",
  currentUrl: "movies/getPage?page=%page&size=%size",
  createMovieurl: "/movies/create",
  likeMovieUrl: "movies/%movie/like",
  dislikeMovieUrl: "movies/%movie/dislike",
  popularMovies: "movies/popular",
  relatedMovies: "movies/%id/related",
};

const MoviesService = {
  getAllMovies() {
    return ApiService.get(moviesUrl.getAll);
  },

  getCurrentPage(page, filter) {
    let currentUrl = moviesUrl.currentUrl
      .replace("%page", page)
      .replace("%size", PER_PAGE);

    Object.keys(filter).map((key) => {
      if (filter[key] !== "") {
        currentUrl += `&${key}=${filter[key]}`;
      }
    });
    return ApiService.get(currentUrl);
  },

  getCurrentMovie(id) {
    return ApiService.get(`${moviesUrl.getCurrent}${id}`);
  },

  createNewMovie(movie) {
    return ApiService.post(moviesUrl.createMovieurl, movie);
  },

  likeMovie(id) {
    let likeMovieUrl = moviesUrl.likeMovieUrl.replace("%movie", id);
    return ApiService.post(likeMovieUrl);
  },

  dislikeMovie(id) {
    let dislikeMovieUrl = moviesUrl.dislikeMovieUrl.replace("%movie", id);
    return ApiService.post(dislikeMovieUrl);
  },

  getPopularMovies() {
    return ApiService.get(moviesUrl.popularMovies);
  },

  getRelatedMovies(id) {
    let url = moviesUrl.relatedMovies.replace("%id", id);
    return ApiService.get(url);
  },
};

export default MoviesService;
