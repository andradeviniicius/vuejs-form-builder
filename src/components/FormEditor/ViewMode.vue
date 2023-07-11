<template>
  <v-row fill-height>
    <v-col class="form pa-6 d-flex">
      <v-card
        variant="flat"
        :title="selectedForm?.formTitle"
        :subtitle="selectedForm?.formDescription"
      >
        <v-card-item>
          <div
            v-for="items in selectedForm!.addedFields"
            :key="items.id"
          >
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
          <v-dialog
            v-model="dialog"
            width="800"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="me-4"
                v-bind="props"
              >
                Confirmar Envio
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Parabéns!!</span>
              </v-card-title>
              <v-card-text> Seu formulário foi enviado :) </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="deep-purple-accent-3"
                  variant="text"
                  @click="dialog = false"
                >
                  Fechar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
