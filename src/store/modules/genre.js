import { GENRE_ACTIONS } from "../actions/actions";
import { GENRE_GETTERS } from "../getters/getters";
import { GENRE_MUTATIONS } from "../mutations/mutations";
import GenreService from "../../services/genre.service"

const genre = {
  state: {
    genreList: [],
  },
  mutations: {
    [GENRE_MUTATIONS.SET_GENRE_LIST]: (state, genreList) => {
      state.genreList = genreList;
    },
  },
  getters: {
    [GENRE_GETTERS.getGenreList]: (state) => state.genreList,
  },
  actions: {
    [GENRE_ACTIONS.FETCH_GENRE_LIST]: (context) => {
      return GenreService.getAllGenres().then((resp) => {
        context.commit(GENRE_MUTATIONS.SET_GENRE_LIST, resp.data);
        return resp;
      });
    },
  },
};
export default genre;
