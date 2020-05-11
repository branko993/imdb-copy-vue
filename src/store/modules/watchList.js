import { WATCH_LIST_MUTATIONS, MOVIES_MUTATIONS } from "../mutations/mutations";
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
    [WATCH_LIST_MUTATIONS.MARK_OR_UNMARK_ITEM]: (state, item) => {
      state.watchlist.forEach((element) => {
        if (element.id === item.id) {
          element.watched = item.watched;
        }
      });
    },
    [WATCH_LIST_MUTATIONS.REMOVE_ITEM_WATCH_LIST]: (state, item) => {
      let index = state.watchlist.findIndex(
        (element) => element.id === item.id
      );
      state.watchlist.splice(index, 1);
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
      return WatchListService.markAsWatched(id).then((resp) => {
        context.commit(WATCH_LIST_MUTATIONS.MARK_OR_UNMARK_ITEM, resp.data);
      });
    },
    [WATCH_LIST_ACTIONS.UNMARK_AS_WATCHED]: (context, id) => {
      return WatchListService.unmarkAsWatched(id).then((resp) => {
        context.commit(WATCH_LIST_MUTATIONS.MARK_OR_UNMARK_ITEM, resp.data);
      });
    },
    [WATCH_LIST_ACTIONS.REMOVE]: (context, id) => {
      return WatchListService.remove(id).then((resp) => {
        context.commit(WATCH_LIST_MUTATIONS.REMOVE_ITEM_WATCH_LIST, resp.data);
      });
    },
    [WATCH_LIST_ACTIONS.ADD_TO_WATCH_LIST]: (context, movieId) => {
      return WatchListService.addToWachList(movieId).then((resp) => {
        context.commit(MOVIES_MUTATIONS.ADD_ITEM_TO_WATCH_LIST, {
          item: resp.data,
          movieId: movieId,
        });
      });
    },
  },
};
export default watchlist;
