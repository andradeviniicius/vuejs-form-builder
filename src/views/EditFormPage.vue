<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="isDrawerOpen" :permanent="mdAndUp">
                <v-list-item title="Available elements"></v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <draggable class="dragArea list-group flexSpacing" :list="list1"
                        :group="{ name: 'people', pull: 'clone', put: false }" :clone="draggableStore.addFieldToForm"
                        @change="draggableStore.log" item-key="id">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                <v-btn :prepend-icon="handleItemIcon(element.name)" variant="outlined">
                                    {{ element.name }}aa
                                </v-btn>
                            </div>
                        </template>
                    </draggable>
                </v-list>
            </v-navigation-drawer>


            <v-main style="height: 90vh">
                <v-sheet width="100%" class="d-flex justify-center align-start">
                    <form-editor />
                </v-sheet>
            </v-main>

        </v-layout>
    </v-card>
</template>

<script lang="ts">
import { useDraggableStore, useDrawerFormEditor, useRegisteredForms } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import FormEditor from '@/components/FormEditor.vue'
import draggable from 'vuedraggable'

export default {
    setup() {
        const drawerStore = useDrawerFormEditor();
        const draggableStore = useDraggableStore();

        const { isDrawerOpen } = storeToRefs(drawerStore)
        const { list1 } = storeToRefs(draggableStore)

        const { mdAndUp } = useDisplay()
        return { isDrawerOpen, mdAndUp, list1, draggableStore }
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
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
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