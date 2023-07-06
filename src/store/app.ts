// Utilities
import { defineStore } from "pinia";

export const useDrawerFormEditor = defineStore("app", {
  state: () => ({
    isDrawerOpen: true,
  }),
  actions: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  },
});
