import ApiService from "./api.service";

const watchListUrl = {
  getList: "user/watchList",
  markAsWatched: "user/watchList/$id/mark",
  unmarkAsWatched: "user/watchList/$id/unmark",
  addToWatchlist: "user/watchList",
  remove: "user/watchList/$id/remove",
};

const WatchListService = {
  getWatchList() {
    return ApiService.get(watchListUrl.getList);
  },
  markAsWatched(id) {
    let url = watchListUrl.markAsWatched.replace("$id", id);
    return ApiService.post(url);
  },
  unmarkAsWatched(id) {
    let url = watchListUrl.unmarkAsWatched.replace("$id", id);
    return ApiService.post(url);
  },
  addToWachList(movieId) {
    return ApiService.post(watchListUrl.addToWatchlist, { movie_id: movieId });
  },
  remove(id) {
    let url = watchListUrl.remove.replace("$id", id);
    return ApiService.delete(url);
  },
};

export default WatchListService;
