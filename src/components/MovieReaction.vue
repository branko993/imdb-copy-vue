<template>
  <div>
    <div class="form-inline">
      <span
        @click="likeMovie(movie.id)"
        :style="isAuthenticated? 'cursor:pointer' : 'pointer-events:none'"
      >
        <font-awesome-icon :icon="movie.likes_count > 0 ? ['fa','thumbs-up'] : ['far','thumbs-up']" />
      </span>
      <strong style="margin-left:3px;">{{movie.total_likes}}</strong>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_GETTERS } from "../store/getters/getters";
import { MOVIES_ACTIONS } from "../store/actions/actions";

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
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: AUTH_GETTERS.isAuthenticated
    })
  }
};
</script>
