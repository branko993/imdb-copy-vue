<template>
  <div class="hello">
    <button v-on:click.stop.prevent="logOut">logOut</button>
  </div>
</template>

<script>
import { AUTH_ACTIONS } from "../store/actions/actions";

export default {
  name: "HelloWorld",
  methods: {
    logOut() {
      this.$store
        .dispatch(AUTH_ACTIONS.LOG_OUT)
        .then(() => this.$router.push("/login"));
    }
  }
};
</script>
