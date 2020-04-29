import { MOVIES_ACTIONS } from "../actions/actions";
import { MOVIES_GETTERS } from "../getters/getters";
import { MOVIES_MUTATIONS } from "../mutations/mutations";
import MoviesService from "../../services/movies.service";

const movies = {
  state: {
    moviesList: [],
    currentMovie: null,
  },
  mutations: {
    [MOVIES_MUTATIONS.SET_MOVIES_LIST]: (state, moviesList) => {
      state.moviesList = moviesList;
    },
    [MOVIES_MUTATIONS.SET_CURRENT_MOVIE]: (state, currentMovie) => {
      state.currentMovie = currentMovie;
    },
  },
  getters: {
    [MOVIES_GETTERS.getAllMovies]: (state) => state.moviesList,
    [MOVIES_GETTERS.getCurrentMovie]: (state) => state.currentMovie,
  },
  actions: {
    [MOVIES_ACTIONS.FETCH_ALL_MOVIES]: (context) => {
      return MoviesService.getAllMovies().then((resp) => {
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
