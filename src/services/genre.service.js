import ApiService from "./api.service";

const genreUrl = {
  getAll: "genre/all",
  genreByName: "genre/show?name=%name"
};

const GenreService = {
  getAllGenres() {
    return ApiService.get(genreUrl.getAll);
  },
  getGenreByName(name) {
    let url = genreUrl.genreByName.replace('%name', name)
    return ApiService.get(url);
  },
};

export default GenreService;
