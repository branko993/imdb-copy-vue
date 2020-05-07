import { MOVIES_ACTIONS } from "../actions/actions";
import { MOVIES_GETTERS } from "../getters/getters";
import { MOVIES_MUTATIONS } from "../mutations/mutations";
import { getField, updateField } from "vuex-map-fields";
import MoviesService from "../../services/movies.service";

const movies = {
  state: {
    moviesList: [],
    currentMovie: {
      title: "",
      description: "",
      image_url: "",
    },
    currentPage: 1,
    totalRows: 1,
    perPage: 1,
    filters: {
      title: "",
      genreId: "",
    },
  },
  mutations: {
    [MOVIES_MUTATIONS.SET_MOVIES_LIST]: (state, response) => {
      state.moviesList = response.data;
      state.totalRows = response.total;
      state.perPage = response.per_page;
    },
    [MOVIES_MUTATIONS.SET_CURRENT_MOVIE]: (state, currentMovie) => {
      state.currentMovie = currentMovie;
    },
    [MOVIES_MUTATIONS.SET_FILTER_TITLE]: (state, title) => {
      state.filters.title = title;
    },
    [MOVIES_MUTATIONS.SET_FILTER_GENRE]: (state, genreId) => {
      state.filters.genreId = genreId;
    },
    [MOVIES_MUTATIONS.SET_CURRENT_PAGE]: (state, currentPage) => {
      state.currentPage = currentPage;
    },
    updateField,
  },
  getters: {
    [MOVIES_GETTERS.getMovies]: (state) => state.moviesList,
    [MOVIES_GETTERS.getCurrentMovie]: (state) => state.currentMovie,
    [MOVIES_GETTERS.getCurrentPage]: (state) => state.currentPage,
    [MOVIES_GETTERS.getPerPage]: (state) => state.perPage,
    [MOVIES_GETTERS.getTotalRows]: (state) => state.totalRows,
    [MOVIES_GETTERS.getFilters]: (state) => state.filters,
    getField,
  },
  actions: {
    [MOVIES_ACTIONS.FETCH_CURRENT_PAGE]: (context, {currentPage, filters}) => {
      return MoviesService.getCurrentPage(
        currentPage,
        filters
      ).then((resp) => {
        context.commit(MOVIES_MUTATIONS.SET_MOVIES_LIST, resp.data);
        return resp;
      });
    },
    [MOVIES_ACTIONS.FETCH_CURRENT_MOVIE]: (context, id) => {
      return MoviesService.getCurrentMovie(id).then((resp) => {
        context.commit(MOVIES_MUTATIONS.SET_CURRENT_MOVIE, resp.data);
        return resp;
      });
    },
    [MOVIES_ACTIONS.CREATE_NEW_MOVIE]: (context, movie) => {
      return MoviesService.createNewMovie(movie);
    },
    [MOVIES_ACTIONS.LIKE_MOVIE]: (context, movieId) => {
      return MoviesService.likeMovie(movieId);
    },
    [MOVIES_ACTIONS.DISLIKE_MOVIE]: (context, movieId) => {
      return MoviesService.dislikeMovie(movieId);
    },
    [MOVIES_ACTIONS.CHANGE_FILTER_TITLE]: (context, title) => {
      context.commit(MOVIES_MUTATIONS.SET_FILTER_TITLE, title);
    },
    [MOVIES_ACTIONS.CHANGE_FILTER_GENRE]: (context, genreId) => {
      context.commit(MOVIES_MUTATIONS.SET_FILTER_GENRE, genreId);
    },
  },
};
export default movies;
