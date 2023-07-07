<template>
    <v-row>
        <v-col cols="12" class="form">
            <v-container>
                <v-row align="center">
                    <h3>{{ selectedForm.formTitle }}</h3>
                    <v-btn size="small" variant="flat" :icon="isTitleEditing ? 'mdi-check' : 'mdi-pencil'"
                        @click="toggleTitleEditMode"></v-btn>
                </v-row>
            </v-container>
            <v-container>
                <v-row align="center">
                    <h3>{{ selectedForm.formDescription }}</h3>
                    <v-btn size="small" variant="flat" :icon="isDescriptionEditing ? 'mdi-check' : 'mdi-pencil'"
                        @click="toggleDescriptionEditMode"></v-btn>
                </v-row>
            </v-container>
            <draggable class="dragArea list-group formEditContainer" :list="selectedForm.addedFields" group="people"
                @change="draggableStore.log" item-key="id">
                <template #item="{ element }">
                    <div class="list-group-item">
                        <v-btn>
                            {{ element.name }}
                        </v-btn>
                    </div>
                </template>
            </draggable>
        </v-col>
        <v-container>
            <v-row class="justify-end" :style="{ margin: '5%' }" >
                <v-btn prepend-icon="mdi-content-save-edit-outline" color="deep-purple-accent-3">Salvar</v-btn>
            </v-row>
        </v-container>
    </v-row>
</template>
  
<script lang="ts">
import draggable from "vuedraggable";

import { useDraggableStore, useRegisteredForms } from "@/store/app";

export default {
    name: "FormEditor",
    display: "FormEditor",
    order: 2,
    components: {
        draggable
    },
    setup() {
        const draggableStore = useDraggableStore();

        return {
            list1: draggableStore.list1,
            list2: draggableStore.list2,
            draggableStore
        }
    },
    data() {
        const store = useRegisteredForms();
        const check = store.registeredForms.filter(el => {
            return el.id.toString() === this.$route.params.id
        })

        return {
            isTitleEditing: false,
            isDescriptionEditing: false,
            selectedForm: check[0]
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
};
</script>
<style scoped>
.form {
    flex: 3;
    /* width: 500px; */
    background-color: #f3f3f3;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 6px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
    padding: 5%;
    margin: 5%;
}

.formEditContainer {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>