<template>
  <div class="container">
    <b-table
      striped
      hover
      :items="watchList"
      :fields="fields"
      :table-variant="tableVariant"
      responsive="sm"
    >
      <template v-slot:cell(#)="data">{{ data.index + 1 }}</template>
      <template v-slot:cell(Action)="row">
        <b-button
          v-show="!row.item.watched"
          size="sm"
          variant="outline-primary"
          v-on:click.stop.prevent="markAsWatched(row.item.id)"
        >Mark as watched</b-button>
        <b-button
          v-show="!!row.item.watched"
          size="sm"
          variant="outline-primary"
          v-on:click.stop.prevent="unmarkAsWatched(row.item.id)"
        >Unmark as watched</b-button>
        <b-button
          size="sm"
          variant="outline-danger"
          v-on:click.stop.prevent="remove(row.item.id)"
          style="margin-left:5px"
        >Remove</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { WATCH_LIST_ACTIONS } from "../store/actions/actions";
import { mapGetters } from "vuex";
import { WATCH_LIST_GETTERS } from "../store/getters/getters";

export default {
  name: "WatchList",
  data() {
    return {
      fields: [
        "#",
        { key: "movie.title", sortable: true },
        {
          key: "watched",
          formatter: value => {
            return value !== 0;
          }
        },
        { key: "created_at", formatter: "formatDate", sortable: true },
        "Action"
      ],
      tableVariant: "light"
    };
  },
  methods: {
    loadData() {
      this.$store.dispatch(WATCH_LIST_ACTIONS.FETCH_WATCH_LIST);
    },
    formatDate(date) {
      return this.$moment(date).format("LLLL");
    },
    markAsWatched(id) {
      this.$store.dispatch(WATCH_LIST_ACTIONS.MARK_AS_WATCHED, id);
    },
    unmarkAsWatched(id) {
      this.$store
        .dispatch(WATCH_LIST_ACTIONS.UNMARK_AS_WATCHED, id);
    },
    remove(id) {
      this.$store.dispatch(WATCH_LIST_ACTIONS.REMOVE, id);
    }
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    ...mapGetters({
      watchList: WATCH_LIST_GETTERS.getWatchList
    })
  }
};
</script>
