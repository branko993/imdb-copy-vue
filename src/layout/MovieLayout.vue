<template>
  <div class="wrapper">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "MovieLayout",
  components: { Navbar },
};
</script>
