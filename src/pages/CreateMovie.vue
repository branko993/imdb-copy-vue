<template>
  <div class="text-white create-movie-card col-sm-4 offset-md-4" style="marginTop:25px">
    <div class="card-body">
      <form @submit.stop.prevent="createMovie">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            v-model="movie.title"
            v-validate="'required|max:255'"
            class="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
          />
          <small v-show="errors.has('title')" class="text-danger">{{ errors.first('title') }}</small>
        </div>
        <div class="form-group">
          <label for="imageUrl">Image url</label>
          <input
            type="text"
            v-model="movie.image_url"
            v-validate="{url: {require_protocol: true }}"
            class="form-control"
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image url"
            required
          />
          <small v-show="errors.has('imageUrl')" class="text-danger">{{ errors.first('imageUrl') }}</small>
        </div>
        <div class="form-group">
          <label for="Genre">Genre</label>
          <select class="custom-select" id="Genre" v-model="movie.genre_id" required>
            <option
              v-show="genre"
              v-for="genre in genreList"
              :key="genre.id"
              :value="genre.id"
            >{{genre.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            type="text"
            v-model="movie.description"
            v-validate="'required|max:255'"
            class="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
          />
          <small
            v-show="errors.has('description')"
            class="text-danger"
          >{{ errors.first('description') }}</small>
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
import { GENRE_ACTIONS } from "../store/actions/actions";
import { GENRE_GETTERS } from "../store/getters/getters";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      movie: {
        title: null,
        description: null,
        image_url: null,
        genre_id: null
      },
      hasErrors: false,
      message: ""
    };
  },
  name: "CreateMovie",
  computed: {
    isFormUntouched() {
      return Object.keys(this.fields).some(key => this.fields[key].untouched);
    },
    ...mapGetters({
      genreList: GENRE_GETTERS.getGenreList
    })
  },
  methods: {
    loadData() {
      this.$store.dispatch(GENRE_ACTIONS.FETCH_GENRE_LIST);
    },
    createMovie() {
      this.$store
        .dispatch(MOVIES_ACTIONS.CREATE_NEW_MOVIE, this.movie)
        .then(() => {
          this.hasErrors = false;
          this.message = "Movie created successfully";
        })
        .catch(err => {
          let errorMessage =
            "Error: " + err.response.statusText + " " + err.response.status;
          this.hasErrors = true;
          this.message = errorMessage;
        });
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>
