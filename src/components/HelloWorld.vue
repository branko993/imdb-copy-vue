<template>
  <div class="hello">
    <button v-on:click="logOut($event)">logOut</button>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    logOut(event){
      event.preventDefault();
      this.$store.dispatch("LOG_OUT").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
