// Utilities
import { defineStore } from "pinia";
import { generateUniqueID } from "../utils";

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
    addFieldToForm({ name }) {
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
  state: () => {
    return {
      registeredForms: [
        {
          id: 1,
          formTitle: "Form teste 1",
          formDescription: "Descricao test 1",
          addedFields: [
            { name: "Campo de texto", id: 1 },
            { name: "Sim/Não", id: 2 },
          ],
        },
        {
          id: 2,
          formTitle: "Form teste 2",
          formDescription: "Descricao test 2",
          addedFields: [
            { name: "Campo de texto", id: 1 },
            { name: "Sim/Não", id: 2 },
            { name: "Sim/Não", id: 3 },
            { name: "Sim/Não", id: 4 },
          ],
        },
        {
          id: 3,
          formTitle: "Form teste 3",
          formDescription: "Descricao test 3",
          addedFields: [
            { name: "Campo de texto", id: 1 },
            { name: "Campo de texto", id: 4 },
            { name: "Campo de texto", id: 6 },
            { name: "Sim/Não", id: 2 },
            { name: "Sim/Não", id: 3 },
            { name: "Sim/Não", id: 4 },
          ],
        },
      ],
    };
  },
  actions: {
    addNewForm(formTitle, formDescription, addedFields) {
      this.registeredForms.push({
        id: Math.random(),
        formTitle,
        formDescription,
        addedFields,
      });
    },
  },
});
