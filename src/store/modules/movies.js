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
    updateField,
  },
  getters: {
    [MOVIES_GETTERS.getMovies]: (state) => state.moviesList,
    [MOVIES_GETTERS.getCurrentMovie]: (state) => state.currentMovie,
    [MOVIES_GETTERS.getCurrentPage]: (state) => state.currentPage,
    [MOVIES_GETTERS.getPerPage]: (state) => state.perPage,
    [MOVIES_GETTERS.getTotalRows]: (state) => state.totalRows,
    getField,
  },
  actions: {
    [MOVIES_ACTIONS.FETCH_CURRENT_PAGE]: (context, currentPage) => {
      return MoviesService.getCurrentPage(currentPage).then((resp) => {
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
  },
};
export default movies;
