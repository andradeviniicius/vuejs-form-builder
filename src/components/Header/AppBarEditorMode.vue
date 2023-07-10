<template>
    <v-row justify="space-between" align="center">
        <v-col :cols="mdAndUp ? '2' : '2'">
            <v-btn v-if="mdAndUp" @click="redirectToHomepage" class="ma-2">
                <v-icon start icon="mdi-arrow-left"></v-icon>
                <p>

                    Voltar
                </p>
            </v-btn>

            <v-btn v-if="!mdAndUp" @click="redirectToHomepage" icon="mdi-arrow-left"></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
            <v-sheet class="d-flex justify-start">
                <v-card>
                    <v-tabs v-if="mdAndUp" v-model="isEditingMode" color="deep-purple-accent-4" align-tabs="center">
                        <v-tab :value="1">Editar</v-tab>
                        <v-tab :value="2">Visualizar</v-tab>
                    </v-tabs>


                    <v-tabs v-if="!mdAndUp" v-model="isEditingMode" color="deep-purple-accent-4" align-tabs="center">
                        <v-tab :value="1">
                            <v-icon size="small">mdi-pencil</v-icon>
                        </v-tab>
                        <v-tab :value="2">
                            <v-icon size="small">mdi-eye</v-icon>
                        </v-tab>
                    </v-tabs>
                </v-card>
            </v-sheet>
        </v-col>
        <v-col :cols="mdAndUp ? '' : '2'" v-if="!mdAndUp" class="d-flex justify-end">
            <v-btn icon="mdi-menu" color="black" @click="store.toggleDrawer">
            </v-btn>
        </v-col>

    </v-row>
</template>
                       
    
<script lang="ts">
import { useDisplay } from 'vuetify';

import { useDrawerFormEditor, useToggleEditModeStore } from '@/store/app'
import { storeToRefs } from 'pinia';

export default {
    name: 'AppBarEditorMode',
    setup() {
        const store = useDrawerFormEditor();
        const { isDrawerOpen } = storeToRefs(store)

        const toggleEditModeStore = useToggleEditModeStore()
        const { isEditingMode } = storeToRefs(toggleEditModeStore)

        const { mdAndUp } = useDisplay()


        return {
            mdAndUp,

            store,
            isDrawerOpen,

            isEditingMode
        }
    },
    methods: {
        redirectToHomepage() {
            this.$router.push(`/`)
        },
    },
};
</script>