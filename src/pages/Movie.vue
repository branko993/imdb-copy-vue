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
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { MOVIES_ACTIONS } from "../store/actions/actions";
import { MOVIES_GETTERS } from "../store/getters/getters";

export default {
  name: "Movie",
  methods: {
    loadData() {
      this.$store.dispatch(
        MOVIES_ACTIONS.FETCH_CURRENT_MOVIE,
        this.$route.params.id
      );
    }
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    currentMovie() {
      return this.$store.getters[MOVIES_GETTERS.getCurrentMovie];
    }
  }
};
</script>
