export const formMixin = {
  computed: {
    isFormUntouched() {
      return Object.keys(this.fields).some((key) => this.fields[key].untouched);
    },
  },
};
