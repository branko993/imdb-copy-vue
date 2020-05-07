<template>
  <div class="container" style="margin-top:15px">
    <b-card no-body class="overflow-hidden offset-md-1">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img :src="currentMovie.image_url" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body :title="currentMovie.title">
            <b-card-text>{{currentMovie.description}}</b-card-text>
            <MovieReaction v-on:loadData="loadData" :movie="currentMovie" />
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  MOVIES_ACTIONS,
  MOVIE_COMMENTS_ACTIONS
} from "../store/actions/actions";
import { MOVIES_GETTERS } from "../store/getters/getters";
import MovieReaction from "../components/MovieReaction";
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "Movie",
  components: {
    MovieReaction
  },
  methods: {
    loadData() {
      this.$store.dispatch(
        MOVIES_ACTIONS.FETCH_CURRENT_MOVIE,
        this.$route.params.id
      );
      this.$store.dispatch(MOVIE_COMMENTS_ACTIONS.FETCH_MOVIE_COMMENTS_LIST, {
        page: this.currentPage,
        id: this.$route.params.id
      });
    }
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    ...mapFields(["currentPage"]),
    ...mapGetters({
      currentMovie: MOVIES_GETTERS.getCurrentMovie
    })
  }
};
</script>
