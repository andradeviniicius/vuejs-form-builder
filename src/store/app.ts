// Utilities
import { defineStore } from "pinia";
import { generateUniqueID } from "../utils";
import { FormState, FormItem } from "./types";
import fakeData from "../assets/fakeData";

export const useDrawerFormEditor = defineStore("drawerStore", {
  state: () => {
    return { isDrawerOpen: true };
  },
  actions: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
  },
});

export const useToggleEditModeStore = defineStore("toggleEditModeStore", {
  state: () => {
    return { isEditingMode: null };
  },
});

export const useDraggableStore = defineStore("draggableStore", {
  state: () => {
    return {
      availableElements: [
        { name: "Campo de texto", id: 1 },
        { name: "Sim/Não", id: 2 },
      ],
      addedElements: [],
    };
  },
  actions: {
    addFieldToForm(name: string) {
      const uniqueId = generateUniqueID(this.addedElements);

      return {
        id: uniqueId,
        name: name,
      };
    },
    log() {
      console.log(this.addedElements);
    },
  },
});

export const useRegisteredForms = defineStore("registeredForms", {
  state: (): FormState => {
    return {
      registeredForms: [...fakeData],
      filteredForms: [],
      query: "",
    };
  },
  actions: {
    addNewForm({ formTitle, formDescription, addedFields }: FormItem) {
      this.registeredForms.push({
        id: Math.random(),
        formTitle,
        formDescription,
        addedFields,
      });
    },
    setFilteredForms(searchTerm: string) {
      this.filteredForms = this.registeredForms.filter((form) => {
        const formTitle = form.formTitle.toLowerCase();
        const formDescription = form.formDescription.toLowerCase();
        return (
          formTitle.includes(searchTerm.toLowerCase()) ||
          formDescription.includes(searchTerm.toLowerCase())
        );
      });
    },
    setQueryValue(value: string) {
      this.query = value;
      this.setFilteredForms(this.query);
    },
  },
});
