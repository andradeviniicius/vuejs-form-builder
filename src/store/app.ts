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
    log(e) {
      console.log(e);
    },
  },
});

const STORE_NAME = "mainDatabase";

const getRegisteredForms = () => {
  const registeredForms = localStorage.getItem(STORE_NAME);

  return registeredForms ? JSON.parse(registeredForms) : [];
};

export const useLocalStorage = defineStore(STORE_NAME, {
  state: (): FormState => ({
    registeredForms: getRegisteredForms(),
    filteredForms: [],
    query: "",
    hasUnsavedChanges: false,
    dialogConfirmChanges: false,
  }),
  actions: {
    updateRegisteredForm(newForm) {
      this.registeredForms.push(newForm);

      localStorage.setItem(STORE_NAME, JSON.stringify(this.registeredForms));
    },
    deleteRegisteredForm(formId) {
      const itemToDelete = this.registeredForms.findIndex((i) => {
        return i.id === formId;
      });

      this.registeredForms.splice(itemToDelete, 1);
      localStorage.setItem(STORE_NAME, JSON.stringify(this.registeredForms));
    },
    editExistentForm(editedFormId, editedFormData) {
      const objectIndex = this.registeredForms.findIndex(
        (obj) => obj.id === editedFormId
      );

      if (objectIndex !== -1) {
        console.log(editedFormData);
        this.registeredForms[objectIndex] = editedFormData;
      }
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
  },
});
