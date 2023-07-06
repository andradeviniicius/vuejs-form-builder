<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="isDrawerOpen" :permanent="mdAndUp">
                <v-list-item title="Available elements"></v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <draggable class="dragArea list-group" :list="list1"
                        :group="{ name: 'people', pull: 'clone', put: false }" item-key="name">
                        <template #item="{ element }">
                            <div class="list-group-item">
                                {{ element.name }}
                            </div>
                        </template>
                    </draggable>
                </v-list>
            </v-navigation-drawer>


            <v-main style="height: 90vh">
                <div class="d-flex justify-center align-center h-100">
                    <form-editor />
                </div>
            </v-main>


        </v-layout>
    </v-card>
</template>

<script lang="ts">
import { useDraggableStore, useDrawerFormEditor } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import FormEditor from '@/components/FormEditor.vue'
import draggable from 'vuedraggable'

export default {
    setup() {
        const drawerStore = useDrawerFormEditor();
        const { isDrawerOpen } = storeToRefs(drawerStore)
        const { mdAndUp } = useDisplay()
        const draggableStore = useDraggableStore();
        const { list1 } = storeToRefs(draggableStore)
        return { isDrawerOpen, mdAndUp, list1 }
    },
    components: {
        FormEditor,
        draggable
    },
    methods: {
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },

};
</script>