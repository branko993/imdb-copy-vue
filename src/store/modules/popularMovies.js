import { POPULAR_MOVIES_ACTIONS } from "../actions/actions";
import { POPULAR_MOVIES_GETTERS } from "../getters/getters";
import { POPULAR_MOVIES_MUTATIONS } from "../mutations/mutations";
import MoviesService from "../../services/movies.service";

const popularMovies = {
  state: {
    popularMovies: [],
  },
  mutations: {
    [POPULAR_MOVIES_MUTATIONS.SET_POPULAR_MOVIES]: (state, movieList) => {
        state.popularMovies = movieList;
      },
  },
  getters: {
    [POPULAR_MOVIES_GETTERS.getPopularMovies]: (state) => state.popularMovies,
  },
  actions: {
    [POPULAR_MOVIES_ACTIONS.FETCH_POPULAR_MOVIES]: (context) => {
        return MoviesService.getPopularMovies().then((resp) => {
          context.commit(POPULAR_MOVIES_MUTATIONS.SET_POPULAR_MOVIES, resp.data);
          return resp;
        });
      }
  },
};
export default popularMovies;
