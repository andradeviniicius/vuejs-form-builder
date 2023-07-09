<template>
    <v-row fill-height>
        <v-col class="form pa-8">
            <div class="ma-5 d-flex flex-row align-center">
                <h3 class="mr-3">{{ selectedForm.formTitle }}</h3>
                <v-btn size="small" variant="flat" :icon="isTitleEditing ? 'mdi-check' : 'mdi-pencil'"
                    @click="toggleTitleEditMode"></v-btn>
            </div>
            <div class="ma-5 d-flex flex-row align-center">
                <h3 class="mr-3">{{ selectedForm.formDescription }}</h3>
                <v-btn size="small" variant="flat" :icon="isDescriptionEditing ? 'mdi-check' : 'mdi-pencil'"
                    @click="toggleDescriptionEditMode"></v-btn>
            </div>
            <draggable class="dragArea list-group formEditContainer" :list="selectedForm.addedFields"
                v-model="selectedForm.addedFields" group="people" @change="draggableStore.log" item-key="id">
                <template #item="{ element }">
                    <div class="list-group-item">
                        <v-btn>
                            {{ element.name }}
                        </v-btn>
                    </div>
                </template>
            </draggable>
        </v-col>

    </v-row>
</template>
  
<script lang="ts">
import draggable from "vuedraggable";

import { useDraggableStore, useRegisteredForms } from "../../store/app";
import { defineComponent } from "vue";

export default defineComponent({
    name: "EditorMode",
    display: "EditorMode",
    components: {
        draggable
    },
    setup() {
        const draggableStore = useDraggableStore();

        return {
            availableElements: draggableStore.availableElements,
            addedElements: draggableStore.addedElements,
            draggableStore
        }
    },
    data() {
        const store = useRegisteredForms();
        const checkSelectedForm = store.registeredForms.filter(el => {
            return el.id.toString() === this.$route.params.id
        })

        return {
            isTitleEditing: false,
            isDescriptionEditing: false,
            selectedForm: checkSelectedForm[0]
        }
    },
    methods: {
        toggleTitleEditMode() {
            if (this.isTitleEditing) {
                // save title
            }

            this.isTitleEditing = !this.isTitleEditing;
        },
        toggleDescriptionEditMode() {
            if (this.isDescriptionEditing) {
                // save description
            }

            this.isDescriptionEditing = !this.isDescriptionEditing;
        },
    }
});
</script>
<style>
.form {
    flex: 3;
    width: 70vw;
    background-color: #f3f3f3;
    border: 1px solid rgba(0, 0, 0, .125);
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