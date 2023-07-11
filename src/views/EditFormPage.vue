<template>
  <v-card>
    <v-layout full-height>
      <v-btn
        v-if="mdAndUp && !isDrawerOpen"
        @click="isDrawerOpen = true"
        icon="mdi-menu-open"
      >
      </v-btn>
      <v-navigation-drawer
        v-model="isDrawerOpen"
        permanent
        :location="mdAndUp ? 'left' : 'bottom'"
      >
        <v-list-item title="Componentes disponíveis"></v-list-item>

        <v-list
          density="compact"
          nav
        >
          <draggable
            class="dragArea list-group flexSpacing"
            :list="availableElements"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="draggableStore.addFieldToForm"
            item-key="id"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <v-btn
                  :prepend-icon="handleItemIcon(element.name)"
                  variant="outlined"
                >
                  {{ element.name }}
                </v-btn>
              </div>
            </template>
          </draggable>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <form-editor />
        <v-row
          justify="space-between"
          align="center"
          :style="{ margin: '5%' }"
        >
          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                prepend-icon="mdi-content-save-edit-outline"
                color="deep-purple-accent-3"
                v-bind="props"
                :disabled="hasUnsavedChanges ? false : true"
                id="saveFormButton"
              >
                Salvar
              </v-btn>
              <v-card-text
                v-if="hasUnsavedChanges"
                color="deep-purple-accent-3"
                class="italic-opacity"
              >
                Você alterou o formulário, salve o para não perder nada!
              </v-card-text>
            </template>

            <v-card>
              <v-card-title class="text-h5">
                Deseja confirmar as alterações?
              </v-card-title>
              <v-card-text
                >Ao clicar em aceitar o formulário será salvo e não terá como
                voltar atrás</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="deep-purple-accent-5"
                  variant="text"
                  @click="dialog = false"
                >
                  Recusar
                </v-btn>
                <v-btn
                  color="deep-purple-accent-3"
                  variant="text"
                  @click="handleSaveForm"
                >
                  Aceitar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import {
  useDraggableStore,
  useDrawerFormEditor,
  useLocalStorage,
  useToggleEditModeStore,
} from "@/store/app";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify/lib/framework.mjs";
import FormEditor from "@/components/FormEditor/FormEditor.vue";
import draggable from "vuedraggable";

export default {
  setup() {
    const draggableStore = useDraggableStore();
    const { availableElements } = storeToRefs(draggableStore);

    const drawerStore = useDrawerFormEditor();
    const { isDrawerOpen } = storeToRefs(drawerStore);

    const toggleEditModeStore = useToggleEditModeStore();
    const { isEditingMode } = storeToRefs(toggleEditModeStore);

    const { mdAndUp } = useDisplay();

    return {
      isDrawerOpen,
      mdAndUp,
      availableElements,
      draggableStore,
      isEditingMode,
    };
  },
  mounted() {},
  beforeRouteLeave() {
    const store = useLocalStorage();

    if (store.hasUnsavedChanges) {
      store.dialogConfirmChanges = true;
      return false;
    }
    return true;
  },
  beforeUpdate() {
    const store = useLocalStorage();

    if (store.hasUnsavedChanges) {
      store.dialogConfirmChanges = true;
      return false;
    }
    return true;
  },
  components: {
    FormEditor,
    draggable,
  },
  methods: {
    handleItemIcon(el: string) {
      switch (el) {
        case "Campo de texto":
          return "mdi-format-text";
        case "Campo de Sim/Não":
          return "mdi-check";
        default:
          break;
      }
    },
    handleSaveForm() {
      this.formStore.editExistentForm(this.selectedForm.id, this.selectedForm);
      this.dialog = false;
      this.hasUnsavedChanges = false;
      this.dialogConfirmChanges = false;
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data() {
    const store = useLocalStorage();
    const { dialogConfirmChanges, hasUnsavedChanges } = storeToRefs(store);
    const check = store.registeredForms.filter((el: any) => {
      return el.id.toString() === this.$route.params.id;
    });

    return {
      selectedForm: check[0],
      formStore: store,
      dialog: false,
      hasUnsavedChanges: hasUnsavedChanges,
      dialogConfirmChanges: dialogConfirmChanges,
    };
  },
};
</script>

<style>
.flexSpacing {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.italic-opacity {
  font-style: italic;
  opacity: 0.55;
}
</style>
