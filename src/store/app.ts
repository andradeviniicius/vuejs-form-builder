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

export const useDraggableStore = defineStore("draggableStore", {
  state: () => {
    return {
      list1: [
        { name: "Campo de texto", id: 1 },
        { name: "Sim/Não", id: 2 },
      ],
      list2: [
      ],
    };
  },
  actions: {},
});
