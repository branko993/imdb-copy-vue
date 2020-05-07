<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="nav-link">
        <router-link to="/" class="nav-link" style="color:white">PocketIMDB</router-link>
      </div>
      <div v-show="isAuthenticated" class="form-inline">
        <router-link to="/movies/create" class="nav-link" style="color:white">Create Movie</router-link>
      </div>
      <div class="form-inline offset-md-6">
        <b-form-input
          size="sm"
          v-model="title"
          v-debounce:750ms="applySearch"
          class="mr-sm-2"
          placeholder="Search"
        ></b-form-input>
      </div>
      <div v-show="!isAuthenticated" class="form-inline my-2 my-lg-0 col-sm-2">
        <router-link to="/login" class="nav-link" style="color:white">Login</router-link>/
        <router-link to="/register" class="nav-link" style="color:white">Register</router-link>
      </div>
      <div v-show="isAuthenticated" class="col-sm-1">
        <b-dropdown id="dropdown-1" variant="link" no-caret right>
          <template slot="button-content">
            <img class="img-fluid p-0" src="../assets/images/profile-avatar.png" style="width:85%" />
          </template>
          <b-dropdown-item>Profile</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item v-on:click.stop.prevent="logOut">Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </nav>
  </div>
</template>

<script>
import { AUTH_ACTIONS, MOVIES_ACTIONS } from "../store/actions/actions";
import { AUTH_GETTERS, MOVIES_GETTERS } from "../store/getters/getters";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    logOut() {
      this.$store
        .dispatch(AUTH_ACTIONS.LOG_OUT)
        .then(() => this.$router.push("/login"));
    },
    applySearch() {
      this.$store.dispatch(MOVIES_ACTIONS.CHANGE_FILTER_TITLE, this.title);
      this.$store.dispatch(MOVIES_ACTIONS.FETCH_CURRENT_PAGE, {
        currentPage: 1,
        filters: this.filters
      });
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: AUTH_GETTERS.isAuthenticated,
      filters: MOVIES_GETTERS.getFilters
    })
  }
};
</script>
