<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="navbar-brand">
        <router-link to="/" class="nav-link" style="color:white">PocketIMDB</router-link>
      </div>
      <div v-show="!isAuthenticated" class="form-inline my-2 my-lg-0 col-sm-2 offset-md-8">
        <router-link to="/login" class="nav-link" style="color:white">Login</router-link>/
        <router-link to="/register" class="nav-link" style="color:white">Register</router-link>
      </div>
      <div v-show="isAuthenticated" class="col-sm-1 offset-md-9">
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
import { AUTH_ACTIONS } from "../store/actions/actions";
import { AUTH_GETTERS } from "../store/getters/getters";

export default {
  methods: {
    logOut() {
      this.$store
        .dispatch(AUTH_ACTIONS.LOG_OUT)
        .then(() => this.$router.push("/login"));
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters[AUTH_GETTERS.isAuthenticated];
    }
  }
};
</script>
