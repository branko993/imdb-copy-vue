import { RELATED_MOVIES_ACTIONS } from "../actions/actions";
import { RELATED_MOVIES_GETTERS } from "../getters/getters";
import { RELATED_MOVIES_MUTATIONS } from "../mutations/mutations";
import MoviesService from "../../services/movies.service";

const relatedMovies = {
  state: {
    relatedMovies: [],
  },
  mutations: {
    [RELATED_MOVIES_MUTATIONS.SET_RELATED_MOVIES]: (state, movieList) => {
      state.relatedMovies = movieList;
    },
  },
  getters: {
    [RELATED_MOVIES_GETTERS.getRelatedMovies]: (state) => state.relatedMovies,
  },
  actions: {
    [RELATED_MOVIES_ACTIONS.FETCH_RELATED_MOVIES]: (context, id) => {
      return MoviesService.getRelatedMovies(id).then((resp) => {
        context.commit(RELATED_MOVIES_MUTATIONS.SET_RELATED_MOVIES, resp.data);
        return resp;
      });
    },
  },
};
export default relatedMovies;
