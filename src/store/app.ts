// Utilities
import { defineStore } from "pinia";

export const useDrawerFormEditor = defineStore("app", {
  state: () => {
    return { isDrawerOpen: true };
  },
  actions: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  },
});
