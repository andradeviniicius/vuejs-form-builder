<template>
  <v-card>
    <v-card-title>{{ data.formTitle }}</v-card-title>
    <v-card-subtitle>{{ data.formDescription }}</v-card-subtitle>
    <v-card-actions>
      <v-btn @click="redirectToEdit">Editar</v-btn>
      <v-dialog
        v-model="deleteThisForm"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            prepend-icon="mdi-delete"
            color="deep-purple-accent-3"
            v-bind="props"
          >
            Excluir
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Você realmente deseja excluir este formulário?
          </v-card-title>
          <v-card-text
            >Ao clicar em aceitar o formulário será excluído e não terá como
            voltar atrás</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple-accent-5"
              variant="text"
              @click="deleteThisForm = false"
            >
              Recusar
            </v-btn>
            <v-btn
              color="deep-purple-accent-3"
              variant="text"
              @click="handleDeleteForm"
            >
              Aceitar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>

  {{ data }}
</template>

<script lang="ts">
import { useLocalStorage } from "@/store/app";

export default {
  props: ["data"],
  setup() {
    const store = useLocalStorage();
    return {
      deleteRegisteredForm: store.deleteRegisteredForm,
    };
  },
  methods: {
    redirectToEdit() {
      this.$router.push(`/forms/${this.data.id}`);
    },
    handleDeleteForm() {
      this.deleteRegisteredForm(this.data.id);
    },
  },
  data() {
    return {
      deleteThisForm: false,
    };
  },
};
</script>
