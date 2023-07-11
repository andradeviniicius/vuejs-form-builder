<template>
  <v-row fill-height>
    <v-col class="form pa-6 d-flex">
      <v-card
        variant="flat"
        :title="selectedForm?.formTitle"
        :subtitle="selectedForm?.formDescription"
      >
        <v-card-item>
          <div v-for="items in selectedForm!.addedFields" :key="items.id">
            <div v-if="items.name.name === `Campo de texto`">
              <label for="1">
                {{ items.label }}
              </label>
              <v-text-field
                id="1"
                variant="outlined"
              ></v-text-field>
            </div>
            <div v-if="items.name.name === 'Campo de Sim/Não'">
              <v-checkbox :label="items.label"></v-checkbox>
            </div>
          </div>
          <v-alert
            type="info"
            variant="outlined"
            color="gray"
            v-if="selectedForm?.addedFields.length == 0"
          >
            Você não adicionou nenhum componente ao formulário, comece fazendo
            isso na aba de Edição :)
          </v-alert>
        </v-card-item>
        <v-card-actions>
          <v-btn
            class="me-4"
            @click="handleSendForm"
            >Confirmar envio</v-btn
          >
          <v-btn>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useLocalStorage } from "@/store/app";
import { useRoute } from "vue-router";

export default {
  name: "ViewMode",
  setup() {
    const store = useLocalStorage();
    const route = useRoute();

    let selectedForm = store.registeredForms.find(
      (obj: any) => obj.id == route.params.id
    );

    return {
      selectedForm: selectedForm,
    };
  },
  methods: {
    handleSendForm() {
      alert(
        "Respota do seu form: " + JSON.stringify(this.selectedForm, null, 4)
      );
    },
  },
};
</script>
