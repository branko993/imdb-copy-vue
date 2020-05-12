export const formMixin = {
  computed: {
    isFormUntouched() {
      return Object.keys(this.veeFields).some((key) => this.veeFields[key].untouched);
    },
  },
};
