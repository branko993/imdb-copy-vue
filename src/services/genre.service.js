import ApiService from "./api.service";

const genreUrl = {
  getAll: "genre/all",
};

const GenreService = {
  getAllGenres() {
    return ApiService.get(genreUrl.getAll);
  },
};

export default GenreService;
