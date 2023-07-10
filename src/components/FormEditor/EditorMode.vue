<template>
  <v-row fill-height>
    <v-col class="form pa-8">
      <div class="ma-5 d-flex flex-row align-center">
        <h3
          @input="titleChanged"
          v-bind:contenteditable="isTitleEditing"
          class="mr-3"
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
          class="mr-3"
          v-bind:contenteditable="isDescriptionEditing"
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
      <draggable
        class="dragArea list-group formEditContainer"
        v-model="selectedForm!.addedFields"
        group="people"
        item-key="id"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">
            <v-btn-group variant="outlined">
              <v-btn>
                {{ element.name.name }}
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
          </div>
        </template>
      </draggable>
    </v-col>
  </v-row>

  <v-dialog
    v-model="dialogConfirmChanges"
    width="auto"
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
          Sim, preciso salvar!
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

export default defineComponent({
  name: "EditorMode",
  display: "EditorMode",
  components: {
    draggable,
  },
  watch: {
    selectedForm(updatedValue) {
    },
  },

  setup() {
    const route = useRoute();
    const store = useLocalStorage();
    const { dialogConfirmChanges, hasUnsavedChanges } = storeToRefs(store);

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

      // console.log("teo local", this.selectedformFromLocal);
      // console.log("teo seectet", this.selectedForm);

      // console.log("equal", isEditedFormAndStoredFormEqual);

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

      isTitleEditing: false,
      isDescriptionEditing: false,

      selectedForm: selectedForm!,
      selectedformFromLocal: getformFromLocal(),
      formFromLocal: getformFromLocal(),

      formsStore: store,
    };
  },
  data() {},
  methods: {
    toggleTitleEditMode() {
      if (this.isTitleEditing) {
        // save title
      }

      this.isTitleEditing = !this.isTitleEditing;
    },
    titleChanged(e: any) {
      console.log("123", e.target.innerText);
    },
    descriptionChanged(e: any) {
      console.log("123", e.target.innerText);
    },
    toggleDescriptionEditMode() {
      if (this.isDescriptionEditing) {
        // save description
      }

      this.isDescriptionEditing = !this.isDescriptionEditing;
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
</style>
