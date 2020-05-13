<template>
  <div class="text-white create-movie-card col-sm-4 offset-md-4" style="marginTop:25px">
    <div class="card-body">
      <form @submit.stop.prevent="createMovie">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            v-model="title"
            v-validate="'required|max:255'"
            class="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
          />
          <small v-show="errors.has('title')" class="text-danger">{{ errors.first('title') }}</small>
        </div>
        <div class="text-center">
          <span
            v-show="!!message"
            class="badge"
            :class="{'badge-danger': hasErrors, 'badge-success': !hasErrors}"
          >{{ message }}</span>
        </div>
        <div class="text-center">
          <input
            class="btn btn-info btn-lg"
            type="submit"
            value="Submit"
            :disabled="errors.any() || isFormUntouched"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { MOVIES_ACTIONS } from "../store/actions/actions";
import { formMixin } from "../mixins/formMixin";

export default {
  data() {
    return {
      title: "",
      hasErrors: false,
      message: ""
    };
  },
  name: "CreateMovieOmdb",
  mixins: [formMixin],
  methods: {
    createMovie() {
      this.$store
        .dispatch(MOVIES_ACTIONS.CREATE_MOVIE_FROM_OMDB, this.title)
        .then(() => {
          this.hasErrors = false;
          this.message = "Movie created successfully";
        })
        .catch(err => {
          let errorMessage = "Error: " + err.response.data.message;
          this.hasErrors = true;
          this.message = errorMessage;
        });
    }
  }
};
</script>
