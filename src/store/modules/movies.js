import { MOVIES_ACTIONS } from "../actions/actions";
import { MOVIES_GETTERS } from "../getters/getters";
import { MOVIES_MUTATIONS } from "../mutations/mutations";
import { getField, updateField } from "vuex-map-fields";
import MoviesService from "../../services/movies.service";
import GenreService from "../../services/genre.service";

const movies = {
  state: {
    moviesList: [],
    currentMovie: {
      title: "",
      description: "",
      image_url: "",
    },
    currentPage: 1,
    totalRows: 1,
    perPage: 1,
    filters: {
      title: "",
      genreId: "",
    },
  },
  mutations: {
    [MOVIES_MUTATIONS.SET_MOVIES_LIST]: (state, response) => {
      state.moviesList = response.data;
      state.totalRows = response.total;
      state.perPage = response.per_page;
    },
    [MOVIES_MUTATIONS.SET_CURRENT_MOVIE]: (state, currentMovie) => {
      state.currentMovie = currentMovie;
    },
    [MOVIES_MUTATIONS.SET_FILTER_TITLE]: (state, title) => {
      state.filters.title = title;
    },
    [MOVIES_MUTATIONS.SET_FILTER_GENRE]: (state, genreId) => {
      state.filters.genreId = genreId;
    },
    [MOVIES_MUTATIONS.ADD_ITEM_TO_WATCH_LIST]: (state, data) => {
      state.moviesList.forEach((element) => {
        if (element.id === data.movieId) {
          element.watch_list = data.item;
        }
      });
    },
    updateField,
  },
  getters: {
    [MOVIES_GETTERS.getMovies]: (state) => state.moviesList,
    [MOVIES_GETTERS.getCurrentMovie]: (state) => state.currentMovie,
    [MOVIES_GETTERS.getCurrentPage]: (state) => state.currentPage,
    [MOVIES_GETTERS.getPerPage]: (state) => state.perPage,
    [MOVIES_GETTERS.getTotalRows]: (state) => state.totalRows,
    [MOVIES_GETTERS.getFilters]: (state) => state.filters,
    getField,
  },
  actions: {
    [MOVIES_ACTIONS.FETCH_CURRENT_PAGE]: (
      context,
      { currentPage, filters }
    ) => {
      return MoviesService.getCurrentPage(currentPage, filters).then((resp) => {
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
    [MOVIES_ACTIONS.CREATE_NEW_MOVIE]: (context, movie) => {
      return MoviesService.createNewMovie(movie);
    },
    [MOVIES_ACTIONS.LIKE_MOVIE]: (context, movieId) => {
      return MoviesService.likeMovie(movieId);
    },
    [MOVIES_ACTIONS.DISLIKE_MOVIE]: (context, movieId) => {
      return MoviesService.dislikeMovie(movieId);
    },
    [MOVIES_ACTIONS.CHANGE_FILTER_TITLE]: (context, title) => {
      context.commit(MOVIES_MUTATIONS.SET_FILTER_TITLE, title);
    },
    [MOVIES_ACTIONS.CHANGE_FILTER_GENRE]: (context, genreId) => {
      context.commit(MOVIES_MUTATIONS.SET_FILTER_GENRE, genreId);
    },
    [MOVIES_ACTIONS.CREATE_MOVIE_FROM_OMDB]: (context, title) => {
      return MoviesService.getMovieFromOmdb(title).then((resp) => {
        let movie = {
          title: null,
          description: null,
          image_url: null,
          genre_id: null,
        };
        GenreService.getGenreByName(resp.data.Genre.split(",")[0])
          .then((resp) => {
            console.log(resp.data)
            movie.genre_id = resp.data.id;
          })
          .then(() => {
            movie.title = resp.data.Title;
            movie.description = resp.data.Plot;
            movie.image_url = resp.data.Poster;
            return MoviesService.createNewMovie(movie);
          });
      });
    },
  },
};
export default movies;
