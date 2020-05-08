import { MOVIE_COMMENTS_ACTIONS } from "../actions/actions";
import { MOVIE_COMMENTS_GETTERS } from "../getters/getters";
import { MOVIE_COMMENTS_MUTATIONS } from "../mutations/mutations";
import movieCommentsService from "../../services/movieComments.service";

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
    [MOVIE_COMMENTS_MUTATIONS.SET_CURRENT_PAGE_NUM]: (state, currentPage) => {
      state.currentPage = currentPage;
    },
    [MOVIE_COMMENTS_MUTATIONS.INITIALIZE_COMMENTS]: (state) => {
      state.currentMovieComments = [];
      state.currentPage = 1;
      state.totalRows = 1;
      state.perPage = 1;
    },
  },
  getters: {
    [MOVIE_COMMENTS_GETTERS.getCurrentComments]: (state) =>
      state.currentMovieComments,
    [MOVIE_COMMENTS_GETTERS.getCommentsCurrentPageNum]: (state) =>
      state.currentPage,
    [MOVIE_COMMENTS_GETTERS.getCommentsPerPage]: (state) => state.perPage,
    [MOVIE_COMMENTS_GETTERS.getCommentsTotalRows]: (state) => state.totalRows,
  },
  actions: {
    [MOVIE_COMMENTS_ACTIONS.FETCH_MOVIE_COMMENTS_LIST]: (
      context,
      { id, page }
    ) => {
      context.commit(MOVIE_COMMENTS_MUTATIONS.SET_CURRENT_PAGE_NUM, page);
      return movieCommentsService.getCurrentComments(id, page).then((resp) => {
        context.commit(
          MOVIE_COMMENTS_MUTATIONS.SET_CURRENT_MOVIE_COMMENTS_LIST,
          resp.data
        );
        return resp;
      });
    },
    [MOVIE_COMMENTS_ACTIONS.ADD_NEW_COMMENT]: (
      context,
      { id, description }
    ) => {
      return movieCommentsService.createNewComment(id, description);
    },
    [MOVIE_COMMENTS_ACTIONS.INITIALIZE_COMMENTS]: (context) => {
      context.commit(MOVIE_COMMENTS_MUTATIONS.INITIALIZE_COMMENTS);
    },
  },
};
export default movieComments;
