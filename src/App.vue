<template>
  <div class="wrapper">
    <Navbar v-show="showNavbar" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  computed: {
    showNavbar() {
      return (
        this.$route.fullPath != "/login" && this.$route.fullPath != "/register"
      );
    }
  }
};
</script>
