<template>
  <v-container fluid>
    <v-row
      justify="space-between"
      align="center"
    >
      <v-col class="d-flex">
        <v-app-bar-title>
          <v-sheet class="d-flex align-center">
            <v-icon icon="mdi-clock-fast ma-2" />
            <p v-if="mdAndUp">Express Forms</p>
          </v-sheet>
        </v-app-bar-title>
      </v-col>

      <v-col>
        <v-text-field
          v-model="query"
          @input="updateQueryValue"
          :append-icon="mdAndUp ? 'mdi-magnify' : ''"
          label="Filtrar"
          single-line
          hide-details
          id="filterFormsInput"
        >
        </v-text-field>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn
          v-if="mdAndUp"
          size="large"
          id="createNewFormButton"
          prepend-icon="mdi-plus"
          @click="createNewForm"
          >Criar novo form</v-btn
        >
        <v-btn
          @click="createNewForm"
          v-if="!mdAndUp"
          icon="mdi-plus"
          size="large"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useDisplay } from "vuetify";
import { useLocalStorage } from "@/store/app";
import { storeToRefs } from "pinia";
import { FormItem } from "@/store/types";
import { findNextAvailableId } from "@/utils";
export default {
  name: "AppBarHomePage",
  setup() {
    const { mobile, mdAndUp, mdAndDown } = useDisplay();
    const formsStore = useLocalStorage();
    const { query } = storeToRefs(formsStore);

    return {
      mobile,
      mdAndUp,
      mdAndDown,
      setFilteredForms: formsStore.setFilteredForms,
      query,
      setQueryValue: formsStore.setQueryValue,
      registeredForms: formsStore.registeredForms,
      addNewForm: formsStore.updateRegisteredForm,
    };
  },
  data: () => ({}),
  methods: {
    updateQueryValue(e: any) {
      this.setQueryValue(e.target.value);
    },
    createNewForm() {
      const id = findNextAvailableId(this.registeredForms);

      this.$router.push("/forms/" + id);

      const newForm: FormItem = {
        formTitle: `Novo formulário ${id}`,
        formDescription: `Descrição do formulário ${id}`,
        addedFields: [],
        id: id,
      };

      this.addNewForm(newForm);

      //   this.registeredForms;
    },
  },
};
</script>
