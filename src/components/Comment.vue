<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="card card-info">
        <div class="card-block">
          <h6 class="cmnt-textarea text-secondary">{{commentHeader}}</h6>
          <h6 style="padding: 20px;">{{comment.description}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      Type: Object
    }
  },
  computed: {
    commentHeader() {
      return `Commented by ${this.comment.user.name} at ${this.$moment(
        this.comment.user.created_at
      ).format("LLLL")}`;
    }
  }
};
</script>
