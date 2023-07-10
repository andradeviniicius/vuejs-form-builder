// Utilities
import { defineStore } from "pinia";
import { generateUniqueID } from "../utils";
import { FormState, FormItem } from "./types";

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
      // console.log(this.addedElements);
    },
  },
});

export const useRegisteredForms = defineStore("registeredForms", {
  state: (): FormState => {
    return {
      registeredForms: [],
      filteredForms: [],
      query: "",
    };
  },
  actions: {
    addNewForm({ formTitle, formDescription, addedFields, id }: FormItem) {
      this.registeredForms.push({
        id: id,
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
    saveForm(desiredId: any, propertyToUpdate: any, newPropertyValue: any) {
      // const desiredId = 2;
      // const propertyToUpdate = "formTitle";
      // const newPropertyValue = "New Form Title";

      // const itemToUpdate = this.registeredForms.find(
      //   (item) => item.id === desiredId
      // );

      // if (itemToUpdate) {
      //   itemToUpdate[propertyToUpdate] = newPropertyValue;
      // }

      console.log(desiredId, propertyToUpdate, newPropertyValue);
    },
  },
});

const STORE_NAME = "mainDatabase";

const getRegisteredForms = () => {
  const registeredForms = localStorage.getItem(STORE_NAME);

  return registeredForms ? JSON.parse(registeredForms) : [];
};

export const useLocalStorage = defineStore(STORE_NAME, {
  state: () => ({
    registeredForms: getRegisteredForms(),
    filteredForms: [],
    query: "",
  }),
  actions: {
    updateRegisteredForm(newForm) {
      this.registeredForms.push(newForm);

      localStorage.setItem(STORE_NAME, JSON.stringify(this.registeredForms));
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
    persist: true,
  },
});
