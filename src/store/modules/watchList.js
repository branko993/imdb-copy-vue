import { WATCH_LIST_MUTATIONS } from "../mutations/mutations";
import { WATCH_LIST_ACTIONS } from "../actions/actions";
import { WATCH_LIST_GETTERS } from "../getters/getters";
import WatchListService from "../../services/watchList.service";

const watchlist = {
  state: {
    watchlist: [],
  },
  mutations: {
    [WATCH_LIST_MUTATIONS.SET_WATCH_LIST]: (state, watchlist) => {
      state.watchlist = watchlist;
    },
  },
  getters: {
    [WATCH_LIST_GETTERS.getWatchList]: (state) => state.watchlist,
  },
  actions: {
    [WATCH_LIST_ACTIONS.FETCH_WATCH_LIST]: (context) => {
      return WatchListService.getWatchList().then((resp) => {
        context.commit(WATCH_LIST_MUTATIONS.SET_WATCH_LIST, resp.data);
        return resp;
      });
    },
    [WATCH_LIST_ACTIONS.MARK_AS_WATCHED]: (context, id) => {
      return WatchListService.markAsWatched(id);
    },
    [WATCH_LIST_ACTIONS.UNMARK_AS_WATCHED]: (context, id) => {
      return WatchListService.unmarkAsWatched(id);
    },
    [WATCH_LIST_ACTIONS.REMOVE]: (context, id) => {
      return WatchListService.remove(id);
    },
    [WATCH_LIST_ACTIONS.ADD_TO_WATCH_LIST]: (context, movieId) => {
      return WatchListService.addToWachList(movieId);
    },
  },
};
export default watchlist;
