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
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        >
        </v-text-field>
      </v-col>

      <v-col class="d-flex justify-end">
        <v-btn
          v-if="mdAndUp"
          @click="createNewForm"
          size="large"
          prepend-icon="mdi-plus"
          >Criar novo form</v-btn
        >
        <v-btn
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
import { useRegisteredForms } from "@/store/app";
import { storeToRefs } from "pinia";
export default {
  name: "AppBarHomePage",
  setup() {
    const { mobile, mdAndUp, mdAndDown } = useDisplay();
    const formsStore = useRegisteredForms();
    const { query } = storeToRefs(formsStore);

    return {
      mobile,
      mdAndUp,
      mdAndDown,
      setFilteredForms: formsStore.setFilteredForms,
      query,
      setQueryValue: formsStore.setQueryValue,
      registeredForms: formsStore.registeredForms,
    };
  },
  data: () => ({}),
  methods: {
    updateQueryValue(e: any) {
      this.setQueryValue(e.target.value);
    },
    createNewForm() {
      let id = 0;
      for (let i = 0; i < this.registeredForms.length; i++) {
        if (this.registeredForms[i].id >= id) {
          id = this.registeredForms[i].id + 1;
        }
      }

      this.$router.push("/forms/" + id);


      //   this.registeredForms;
    },
  },
};
</script>
