<template>
  <div class="container">
    <div class="cmnt-container" v-show="isAuthenticated">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card card-info">
            <div class="card-block">
              <form @submit.stop.prevent="createComment">
                <textarea
                  v-validate="'required|max:500'"
                  placeholder="Write your comment here!"
                  v-model="description"
                  class="cmnt-textarea"
                  name="comment"
                ></textarea>
                <small
                  v-show="errors.has('comment')"
                  class="text-danger"
                >{{ errors.first('comment') }}</small>

                <div class="text-center">
                  <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="errors.any() || isFormUntouched"
                  >Comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-for="comment in comments" :key="comment.id">
      <div class="col-md-6 offset-md-3">
        <div class="card card-info">
          <div class="card-block">
            <h6
              class="cmnt-textarea text-secondary"
            >Commented by {{comment.user.name}} at {{$moment(comment.user.created_at).format("LLLL")}}</h6>
            <h6 style="padding: 20px;">{{comment.description}}</h6>
          </div>
        </div>
      </div>
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
import { MOVIE_COMMENTS_ACTIONS } from "../store/actions/actions";
import { AUTH_GETTERS, MOVIE_COMMENTS_GETTERS } from "../store/getters/getters";
import { mapGetters } from "vuex";
import { formMixin } from "../mixins/formMixin";

export default {
  name: "MovieComments",
  data() {
    return {
      currentPage: 1,
      description: ""
    };
  },
  mixins: [formMixin],

  methods: {
    loadData() {
      this.$store.dispatch(MOVIE_COMMENTS_ACTIONS.FETCH_MOVIE_COMMENTS_LIST, {
        page: this.currentCommentPage,
        id: this.$route.params.id
      });
    },
    getPage(page) {
      this.$store.dispatch(MOVIE_COMMENTS_ACTIONS.FETCH_MOVIE_COMMENTS_LIST, {
        page: page,
        id: this.$route.params.id
      });
    },
    createComment() {
      this.$store
        .dispatch(MOVIE_COMMENTS_ACTIONS.ADD_NEW_COMMENT, {
          id: this.$route.params.id,
          description: this.description
        })
        .then(() => {
          this.description = "";
          this.loadData();
        });
    }
  },
  beforeMount() {
    this.loadData();
  },
  destroyed() {
    this.$store.dispatch(MOVIE_COMMENTS_ACTIONS.INITIALIZE_COMMENTS);
  },
  computed: {
    ...mapGetters({
      isAuthenticated: AUTH_GETTERS.isAuthenticated,
      comments: MOVIE_COMMENTS_GETTERS.getCurrentComments,
      perPage: MOVIE_COMMENTS_GETTERS.getCommentsPerPage,
      totalRows: MOVIE_COMMENTS_GETTERS.getCommentsTotalRows,
      currentCommentPage: MOVIE_COMMENTS_GETTERS.getCommentsCurrentPageNum
    })
  }
};
</script>
