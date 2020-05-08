<template>
  <div>
    <div class="form-inline">
      <span
        @click="likeMovie(movie.id)"
        :style="isAuthenticated? 'cursor:pointer' : 'pointer-events:none'"
      >
        <font-awesome-icon
          :icon="movie.likes_count > 0 ? ['fa','thumbs-up'] : ['far','thumbs-up']"
        />
      </span>
      <strong style="margin-left:3px;">{{movie.total_likes}}</strong>
      <div
        class="form-inline"
        v-if="movie.watch_list[0]"
        style="right:30px; position:absolute"
      >
        <h6 v-show="movie.watch_list[0].watched === 1">You watched this movie!</h6>
        <h6 v-show="movie.watch_list[0].watched === 0">You did't watch this movie!</h6>
      </div>
      <div
        v-if="!movie.watch_list[0]"
        class="form-inline"
        style="right:0; position:absolute"
      >
        <input
          class="btn btn-info btn-sm"
          @click="addToWachList(movie.id)"
          type="button"
          value="Add to watch list"
        />
      </div>
    </div>
    <div class="form-inline">
      <span
        @click="dislikeMovie(movie.id)"
        :style="isAuthenticated? 'cursor:pointer' : 'pointer-events:none'"
      >
        <font-awesome-icon
          :icon="movie.dislikes_count > 0 ? ['fa','thumbs-down'] : ['far','thumbs-down']"
        />
      </span>
      <strong style="margin-left:3px;">{{movie.total_dislikes}}</strong>
      <div class="form-inline" style="right:30px; position:absolute">
        <font-awesome-icon :icon="['fa','eye']" />
        <strong style="margin-left:3px;">{{movie.views}}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_GETTERS } from "../store/getters/getters";
import { MOVIES_ACTIONS, WATCH_LIST_ACTIONS } from "../store/actions/actions";

export default {
  name: "HelloWorld",
  props: {
    movie: {
      Type: Object
    }
  },
  methods: {
    likeMovie(id) {
      this.$store.dispatch(MOVIES_ACTIONS.LIKE_MOVIE, id).then(() => {
        this.$emit("loadData");
      });
    },
    dislikeMovie(id) {
      this.$store.dispatch(MOVIES_ACTIONS.DISLIKE_MOVIE, id).then(() => {
        this.$emit("loadData");
      });
    },
    addToWachList(movieId) {
      this.$store
        .dispatch(WATCH_LIST_ACTIONS.ADD_TO_WATCH_LIST, movieId)
        .then(() => {
          this.$emit("loadData");
        });
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: AUTH_GETTERS.isAuthenticated
    })
  }
};
</script>
