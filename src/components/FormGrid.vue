<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row v-if="!filteredForms.length">
        <v-col>
          <v-alert
            border="start"
            border-color="deep-purple accent-4"
            elevation="2"
          >
            Os formulários que você criar aparecerão aqui :)
          </v-alert>
        </v-col>
      </v-row>

      <v-dialog
        id="welcomeDialog"
        persistent
        v-if="isFirstVisit"
        v-model="welcomeDialog"
        width="auto"
      >
        <v-card>
          <v-toolbar>
            <v-toolbar-title class="text-h6">
              Welcome to ExpressForms
            </v-toolbar-title>

            <template v-slot:append>
              <v-btn
                @click="handleFirstVisit"
                icon="mdi-close"
              ></v-btn>
            </template>
          </v-toolbar>
          <v-card-text>
            Seja bem-vindo ao ExpressForms. Estamos felizes em tê-lo conosco.
            <br /><br />

            Neste momento, você ainda não possui nenhum formulário registrado.
            Mas não se preocupe, você pode começar a criar o seu primeiro
            formulário agora mesmo. Basta clicar no botão abaixo e você será
            direcionado para a criação do seu formulário personalizado.
            <br /><br />

            Estamos ansiosos para ver o que você vai criar. Não hesite em nos
            contatar caso precise de alguma ajuda ao longo do processo. Vamos
            começar?
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              @click="handleFirstVisit"
              size="large"
              append-icon="mdi-heart"
              >Começar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row>
        <v-col
          v-for="item in filteredForms"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <FormItem
            :key="item.id"
            :item="item"
            :data="item"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import FormItem from "./FormItem.vue";
import { useLocalStorage } from "@/store/app";
import { useDisplay } from "vuetify/lib/framework.mjs";

export default {
  name: "FormGrid",
  components: {
    FormItem,
  },
  beforeMount() {
    const formsStore = useLocalStorage();
    formsStore.filteredForms = formsStore.registeredForms;
  },
  data() {
    return {
      welcomeDialog: true,
    };
  },
  methods: {
    handleFirstVisit() {
      window.localStorage.setItem("FirstVisit", "no");

      this.isFirstVisit === false;
      this.welcomeDialog = false;
    },
  },
  setup() {
    const { mdAndUp } = useDisplay();
    const registeredFormsStore = useLocalStorage();
    const { filteredForms } = storeToRefs(registeredFormsStore);
    let isFirstVisit;
    const { registeredForms } = storeToRefs(registeredFormsStore);

    if (!window.localStorage.getItem("FirstVisit")) {
      isFirstVisit = true;
    } else if (window.localStorage.getItem("FirstVisit") === "no") {
      isFirstVisit = false;
    }

    return {
      formItem: registeredFormsStore.registeredForms,
      filteredForms,
      mdAndUp,
      isFirstVisit,
      registeredForms,
      registeredFormsStore,
    };
  },
};
</script>
