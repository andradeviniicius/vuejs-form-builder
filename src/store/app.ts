// Utilities
import { defineStore } from "pinia";
import { generateUniqueID } from "../utils";
import { FormState, FormItem } from "./types";
import fakeData from "../assets/fakeData";
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
      list2: [],
    };
  },
  actions: {
    addFieldToForm(name: string) {
      const uniqueId = generateUniqueID(this.list2);

      return {
        id: uniqueId,
        name: name,
      };
    },
    log() {
      console.log(this.list2);
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
