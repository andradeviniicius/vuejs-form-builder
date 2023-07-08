<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="isDrawerOpen" :permanent="mdAndUp">
                <v-list-item title="Componentes disponíveis"></v-list-item>

                <v-list density="compact" nav>
                    <draggable class="dragArea list-group flexSpacing" :list="availableElements"
                        :group="{ name: 'people', pull: 'clone', put: false }" :clone="draggableStore.addFieldToForm"
                        @change="draggableStore.log" item-key="id">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <v-btn :prepend-icon="handleItemIcon(element.name)" variant="outlined">
                                    {{ element.name }}
                                </v-btn>
                            </div>
                        </template>
                    </draggable>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 93vh">
                <form-editor />
                <v-row class="justify-end" :style="{ margin: '5%' }">
                    <v-dialog v-model="dialog" width="auto">
                        <template v-slot:activator="{ props }">
                            <v-btn prepend-icon="mdi-content-save-edit-outline" color="deep-purple-accent-3" v-bind="props">
                                Salvar
                            </v-btn>
                        </template>


                        <v-card>
                            <v-card-title class="text-h5">
                                Deseja confirmar as alterações?
                            </v-card-title>
                            <v-card-text>Ao clicar em aceitar o formulário será salvo e não terá como voltar
                                atrás</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="deep-purple-accent-5" variant="text" @click="dialog = false">
                                    Recusar
                                </v-btn>
                                <v-btn color="deep-purple-accent-3" variant="text" @click="handleSaveForm">
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
import { useDraggableStore, useDrawerFormEditor, useRegisteredForms, useToggleEditModeStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import FormEditor from '@/components/FormEditor/FormEditor.vue'
import draggable from 'vuedraggable'

export default {
    setup() {
        const draggableStore = useDraggableStore();
        const { availableElements } = storeToRefs(draggableStore)

        const drawerStore = useDrawerFormEditor();
        const { isDrawerOpen } = storeToRefs(drawerStore)

        const toggleEditModeStore = useToggleEditModeStore();
        const { isEditingMode } = storeToRefs(toggleEditModeStore)

        const { mdAndUp } = useDisplay()

        return {
            isDrawerOpen,
            mdAndUp,
            availableElements,
            draggableStore,
            isEditingMode
        }
    },
    components: {
        FormEditor,
        draggable
    },
    methods: {
        handleItemIcon(el: string) {
            switch (el) {
                case "Campo de texto":
                    return 'mdi-format-text'
                case "Sim/Não":
                    return 'mdi-checkbox-outline'
                default:
                    break;
            }
        },
        handleSaveForm() {
            const store = useRegisteredForms();

            store.saveForm('id', 'n sei oq', 'n')

            this.dialog = false
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    data() {
        return {
            dialog: false,
        }
    },
    beforeMount() {
        const store = useRegisteredForms();
        const check = store.registeredForms.filter(el => {
            return el.id.toString() === this.$route.params.id
        })

        return {
            selectedForm: check[0]
        }
    }

};
</script>

<style>
.flexSpacing {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>