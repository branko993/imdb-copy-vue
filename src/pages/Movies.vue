<template>
  <div class="container" style="margin-top:15px">
    <b-card
      no-body
      bg-variant="light"
      class="overflow-hidden"
      style="max-width: 300px;position:absolute;right:10px; margin-top:3px; "
    >
      <template v-slot:header>
        <h6 class="mb-0">Filters</h6>
      </template>
      <b-card-body>
        <div class="form-group text-center">
          <label for="Genre" style="margin-right:5px">Select genre</label>
          <select class="custom-select" id="Genre" v-model="genre_id" required>
            <option
              v-show="genre"
              v-for="genre in genreList"
              :key="genre.id"
              :value="genre.id"
            >{{genre.name}}</option>
          </select>
        </div>
        <div class="text-center">
          <input
            class="btn btn-info btn-sm"
            @click="applyFilter"
            type="button"
            value="Apply"
            style="margin-right:10px"
          />
          <input class="btn btn-danger btn-sm" @click="clearFilter" type="button" value="Clear" />
        </div>
      </b-card-body>
    </b-card>
    <div class="row" v-for="movie in movies" :key="movie.id">
      <b-card no-body class="overflow-hidden offset-md-1" style="max-width: 800px; margin-top:3px;">
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img
              :src="movie.image_url"
              alt="Image"
              class="rounded-0"
              style="cursor:pointer"
              @click="redirectToMovie(movie.id)"
            ></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body :title="movie.title">
              <b-card-text>{{movie.description | truncate(200)}}</b-card-text>
              <MovieReaction v-on:loadData="loadData" :movie="movie" />
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="container">
      <b-pagination
        class="offset-md-3"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
        v-model="currentPage"
        @input="getPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { MOVIES_ACTIONS, GENRE_ACTIONS } from "../store/actions/actions";
import { MOVIES_GETTERS, GENRE_GETTERS } from "../store/getters/getters";
import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";
import MovieReaction from "../components/MovieReaction";

export default {
  name: "Movies",
  data() {
    return {
      genre_id: ""
    };
  },
  components: {
    MovieReaction
  },
  methods: {
    loadData() {
      this.$store.dispatch(GENRE_ACTIONS.FETCH_GENRE_LIST);
      this.$store.dispatch(MOVIES_ACTIONS.FETCH_CURRENT_PAGE, {
        currentPage: this.currentPage,
        filters: this.filters
      });
    },
    getPage(page) {
      this.$store.dispatch(MOVIES_ACTIONS.FETCH_CURRENT_PAGE, {
        currentPage: page,
        filters: this.filters
      });
    },
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
    applyFilter() {
      this.$store.dispatch(MOVIES_ACTIONS.CHANGE_FILTER_GENRE, this.genre_id);
      this.loadData();
    },
    clearFilter() {
      this.genre_id = "";
      this.$store.dispatch(MOVIES_ACTIONS.CHANGE_FILTER_GENRE, this.genre_id);
      this.loadData();
    }
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    ...mapFields(["currentPage"]),
    ...mapGetters({
      movies: MOVIES_GETTERS.getMovies,
      perPage: MOVIES_GETTERS.getPerPage,
      totalRows: MOVIES_GETTERS.getTotalRows,
      filters: MOVIES_GETTERS.getFilters,
      genreList: GENRE_GETTERS.getGenreList
    })
  }
};
</script>
