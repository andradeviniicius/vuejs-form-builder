<template>
  <v-row>
    <v-col class="form pa-5">
      <div class="ma-5 d-flex flex-row align-center">
        <h3
          @input="titleChanged"
          v-bind:contenteditable="isTitleEditing"
          class="mr-3 pa-1"
          :class="isTitleEditing ? 'isEditingContent' : ''"
        >
          {{ selectedForm.formTitle }}
        </h3>
        <v-btn
          size="small"
          variant="flat"
          :icon="isTitleEditing ? 'mdi-check' : 'mdi-pencil'"
          @click="toggleTitleEditMode"
        ></v-btn>
      </div>
      <div class="ma-5 d-flex flex-row align-center">
        <h3
          @input="descriptionChanged"
          v-bind:contenteditable="isDescriptionEditing"
          class="mr-3 pa-1"
          :class="isDescriptionEditing ? 'isEditingContent' : ''"
        >
          {{ selectedForm.formDescription }}
        </h3>
        <v-btn
          size="small"
          variant="flat"
          :icon="isDescriptionEditing ? 'mdi-check' : 'mdi-pencil'"
          @click="toggleDescriptionEditMode"
        ></v-btn>
      </div>

      <div class="ma-5 d-flex flex-column align-start italic-opacity">
        <div>
          <v-icon
            size="small"
            class="mr-1"
            icon="mdi-drag-variant"
          ></v-icon>

          Arraste e solte os componentes abaixo dessa linha
        </div>

        <v-progress-linear
          color="grey"
          class=""
          model-value="100"
        ></v-progress-linear>
      </div>
      <draggable
        class="dragArea list-group formEditContainer pa-5"
        v-model="selectedForm!.addedFields"
        group="people"
        item-key="id"
      >
        <template #item="{ element, index }">
          <v-card class="list-group-item pa-5">
            <v-text-field
              variant="underlined"
              label="Titulo do item (Clique para editar)"
              @input="handleItemLabelChange($event.target.value, index)"
            ></v-text-field>
            <v-row justify="space-between">
              <v-btn-group variant="outlined">
                <v-btn
                  :ripple="false"
                  :prepend-icon="
                    element.name.name === 'Campo de texto'
                      ? 'mdi-format-text'
                      : 'mdi-check'
                  "
                >
                  {{ mdAndUp ? element.name.name : "" }}
                </v-btn>
                <v-btn
                  size="small"
                  variant="tonal"
                  icon="mdi-delete"
                  color="deep-purple-accent-3"
                  @click="deleteSelectedField(index)"
                >
                </v-btn>
              </v-btn-group>
              <v-btn
                icon="mdi-drag-variant"
                variant="elevated"
                size="large"
              ></v-btn>
            </v-row>
          </v-card>
        </template>
      </draggable>
    </v-col>
    <v-col>
      <pre>
        {{ selectedForm }}
      </pre>
    </v-col>
  </v-row>
  <v-dialog
    v-model="dialogConfirmChanges"
    width="auto"
    :fullscreen="!mdAndUp ? true : false"
  >
    <v-card>
      <v-card-title class="text-h5">
        Você está saindo sem salvar as alterações!
      </v-card-title>
      <v-card-text> Deseja voltar para salvar seu progresso? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="deep-purple-accent-5"
          variant="text"
          @click="handleRejectChanges"
        >
          Não, pode descartar tudo!
        </v-btn>
        <v-btn
          color="deep-purple-accent-3"
          variant="text"
          @click="handleSaveChanges"
        >
          Sim!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import draggable from "vuedraggable";

import { useLocalStorage } from "../../store/app";
import { defineComponent, watch } from "vue";
import { shallowEqual } from "@/utils/index";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";

export default defineComponent({
  name: "EditorMode",
  display: "EditorMode",
  components: {
    draggable,
  },
  watch: {
    selectedForm(updatedValue) {},
  },

  setup() {
    const route = useRoute();
    const store = useLocalStorage();
    const { dialogConfirmChanges, hasUnsavedChanges } = storeToRefs(store);
    const { mdAndUp } = useDisplay();

    let selectedForm = store.registeredForms.find(
      (obj: any) => obj.id == route.params.id
    );
    const getformFromLocal = () => {
      return JSON.parse(localStorage.getItem("mainDatabase")!).find(
        (obj: any) => obj.id == route.params.id
      );
    };
    watch(selectedForm!, (newValue) => {
      let isEditedFormAndStoredFormEqual = shallowEqual(
        getformFromLocal(),
        selectedForm
      );

      if (!isEditedFormAndStoredFormEqual) {
        store.hasUnsavedChanges = true;
      } else {
        store.hasUnsavedChanges = false;
      }
    });
    return {
      isFormModified: false,
      hasUnsavedChanges: hasUnsavedChanges,
      dialogConfirmChanges: dialogConfirmChanges,

      selectedForm: selectedForm!,
      selectedformFromLocal: getformFromLocal(),
      formFromLocal: getformFromLocal(),

      formsStore: store,
      mdAndUp,
    };
  },
  data() {
    return {
      isTitleEditing: false,
      isDescriptionEditing: false,
    };
  },
  methods: {
    toggleTitleEditMode() {
      this.isTitleEditing = !this.isTitleEditing;
    },
    titleChanged(e: any) {
      this.selectedForm.formTitle = e.target.innerText;
    },
    toggleDescriptionEditMode() {
      this.isDescriptionEditing = !this.isDescriptionEditing;
    },
    descriptionChanged(e: any) {
      this.selectedForm.formDescription = e.target.innerText;
      this.selectedForm.formDescription = e.target.innerText;
    },
    deleteSelectedField(index: number) {
      this.$forceUpdate;
      this.selectedForm.addedFields.splice(index, 1);
    },
    handleRejectChanges() {
      this.selectedForm.addedFields = this.selectedformFromLocal.addedFields;

      this.hasUnsavedChanges = false;
      this.dialogConfirmChanges = false;
      this.$router.push("/");
    },
    handleSaveChanges() {
      this.dialogConfirmChanges = false;
    },
    handleItemLabelChange(event: any, id: number) {

      this.selectedForm.addedFields[id].label = event;
    },
  },
});
</script>
<style>
.form {
  flex: 3;
  width: 70vw;
  background-color: #f3f3f3;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 6px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
  padding: 5%;
  margin: 5%;
  flex-direction: column;
}

.formEditContainer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.isEditingContent {
  border: 1px solid blueviolet;
  border-radius: 5px;
}

.customCss {
  border: 1px dotted green;
  background-color: darkgray;
  color: black;
}
</style>
