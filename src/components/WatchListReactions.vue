<template>
  <div class="form-inline">
    <div v-if="watchList" style="right:30px; position:absolute">
      <h6 v-show="watchList.watched === 1" style="color:green">You watched this movie!</h6>
      <h6 v-show="watchList.watched === 0" style="color:red">You did't watch this movie!</h6>
    </div>
    <div v-if="!watchList" style="right:0; position:absolute">
      <input
        class="btn btn-info btn-sm"
        @click="addToWachList"
        type="button"
        value="Add to watch list"
      />
    </div>
  </div>
</template>

<script>
import { WATCH_LIST_ACTIONS } from "../store/actions/actions";

export default {
  name: "WatchListReactions",
  props: {
    watchList: {
      Type: Array
    },
    movieId: {
      Type: Number
    }
  },
  methods: {
    addToWachList() {
      this.$store
        .dispatch(WATCH_LIST_ACTIONS.ADD_TO_WATCH_LIST, this.movieId);
    }
  }
};
</script>
