import { MOVIE_COMMENTS_ACTIONS } from "../actions/actions";
import { MOVIE_COMMENTS_GETTERS } from "../getters/getters";
import { MOVIE_COMMENTS_MUTATIONS } from "../mutations/mutations";
import movieCommentsService from "../../services/movieComments.service";
import { getField, updateField } from "vuex-map-fields";

const movieComments = {
  state: {
    currentMovieComments: [],
    currentPage: 1,
    totalRows: 1,
    perPage: 1,
  },
  mutations: {
    [MOVIE_COMMENTS_MUTATIONS.SET_CURRENT_MOVIE_COMMENTS_LIST]: (
      state,
      response
    ) => {
      state.currentMovieComments = response.data;
      state.totalRows = response.total;
      state.perPage = response.per_page;
    },
    updateField,
  },
  getters: {
    [MOVIE_COMMENTS_GETTERS.getCurrentComments]: (state) =>
      state.currentMovieComments,
    getField,
  },
  actions: {
    [MOVIE_COMMENTS_ACTIONS.FETCH_MOVIE_COMMENTS_LIST]: (
      context,
      { id, page }
    ) => {
      return movieCommentsService.getCurrentComments(id, page).then((resp) => {
        context.commit(
          MOVIE_COMMENTS_MUTATIONS.SET_CURRENT_MOVIE_COMMENTS_LIST,
          resp.data
        );
        return resp;
      });
    },
  },
};
export default movieComments;
