<template>
  <div class="container" style="margin-top:15px">
    <div class="row" v-for="movie in movies" :key="movie.id">
      <b-card
        no-body
        class="overflow-hidden offset-md-1"
        style="max-width: 800px; margin-top:3px;cursor:pointer;"
        @click="redirectToMovie(movie.id)"
      >
        <b-row no-gutters>
          <b-col md="4">
            <b-card-img :src="movie.image_url" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="8">
            <b-card-body :title="movie.title">
              <b-card-text>{{movie.description | truncate(300)}}</b-card-text>
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
import { MOVIES_ACTIONS } from "../store/actions/actions";
import { MOVIES_GETTERS } from "../store/getters/getters";
import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

export default {
  name: "Movies",
  methods: {
    loadData() {
      this.$store.dispatch(MOVIES_ACTIONS.FETCH_CURRENT_PAGE, this.currentPage);
    },
    getPage(page) {
      this.$store.dispatch(MOVIES_ACTIONS.FETCH_CURRENT_PAGE, page);
    },
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
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
      totalRows: MOVIES_GETTERS.getTotalRows
    })
  }
};
</script>
