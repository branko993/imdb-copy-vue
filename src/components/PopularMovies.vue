<template>
  <b-card
    no-body
    bg-variant="light"
    class="overflow-hidden"
    style="max-width: 150px;position:absolute;left:10px; margin-top:3px; "
  >
    <template v-slot:header>
      <h6 class="mb-0 text-center">Popular</h6>
    </template>
    <b-card-body>
      <div class="form-group text-center">
        <p
          class="text-info"
          v-for="movie in movies"
          :key="movie.id"
          style="cursor:pointer"
          @click="redirectToMovie(movie.id)"
        >{{movie.title}}</p>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { POPULAR_MOVIES_ACTIONS } from "../store/actions/actions";
import { POPULAR_MOVIES_GETTERS } from "../store/getters/getters";
import { mapGetters } from "vuex";

export default {
  name: "PopularMovies",
  methods: {
    loadData() {
      this.$store.dispatch(POPULAR_MOVIES_ACTIONS.FETCH_POPULAR_MOVIES);
    },
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    }
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    ...mapGetters({
      movies: POPULAR_MOVIES_GETTERS.getPopularMovies
    })
  }
};
</script>
