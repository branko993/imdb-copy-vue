export const AUTH_ACTIONS = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOG_OUT: "LOG_OUT",
  REGISTER_REQUEST: "REGISTER_REQUEST",
};
export const MOVIES_ACTIONS = {
  FETCH_CURRENT_PAGE: "FETCH_CURRENT_PAGE",
  FETCH_CURRENT_MOVIE: "FETCH_CURRENT_MOVIE",
  CHANGE_CURRENT_PAGE: "CHANGE_CURRENT_PAGE",
  CREATE_NEW_MOVIE: "CREATE_NEW_MOVIE",
  LIKE_MOVIE: "LIKE_MOVIE",
  DISLIKE_MOVIE: "DISLIKE_MOVIE",
  CHANGE_FILTER_TITLE: "CHANGE_FILTER_TITLE",
  CHANGE_FILTER_GENRE: "CHANGE_FILTER_GENRE",
};
export const GENRE_ACTIONS = {
  FETCH_GENRE_LIST: "FETCH_GENRE_LIST",
};
export const MOVIE_COMMENTS_ACTIONS = {
  FETCH_MOVIE_COMMENTS_LIST: "FETCH_MOVIE_COMMENTS_LIST",
  ADD_NEW_COMMENT: "ADD_NEW_COMMENT",
  INITIALIZE_COMMENTS: "INITIALIZE_COMMENTS",
};
export const WATCH_LIST_ACTIONS = {
  FETCH_WATCH_LIST: "FETCH_WATCH_LIST",
  MARK_AS_WATCHED: "MARK_AS_WATCHED",
  UNMARK_AS_WATCHED: "UNMARK_AS_WATCHED",
  ADD_TO_WATCH_LIST: "ADD_TO_WATCH_LIST",
  REMOVE: "REMOVE",
};
export const POPULAR_MOVIES_ACTIONS = {
  FETCH_POPULAR_MOVIES: "FETCH_POPULAR_MOVIES",
};