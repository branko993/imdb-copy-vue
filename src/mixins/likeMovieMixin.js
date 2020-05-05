import { MOVIES_ACTIONS } from "../store/actions/actions";

export const likeMovieMixin = {
  methods: {
    likeMovie(id) {
      this.$store.dispatch(MOVIES_ACTIONS.LIKE_MOVIE, id).then(() => {
        this.loadData();
      });
    },
    dislikeMovie(id) {
      this.$store.dispatch(MOVIES_ACTIONS.DISLIKE_MOVIE, id).then(() => {
        this.loadData();
      });
    },
  },
};
