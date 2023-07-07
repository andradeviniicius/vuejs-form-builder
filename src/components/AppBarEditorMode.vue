<template>
    <v-container fluid>
        <v-row justify="space-between" align="center">
            <v-col>
                <v-btn v-if="mdAndUp" @click="redirectToHomepage" class="ma-2">
                    <v-icon start icon="mdi-arrow-left"></v-icon>
                    <p>

                        Back
                    </p>
                </v-btn>

                <v-btn v-if="!mdAndUp" @click="redirectToHomepage" icon="mdi-arrow-left"></v-btn>
            </v-col>

            <v-col class="d-flex justify-center">
                <v-sheet class="d-flex justify-start">
                    <v-btn-toggle v-if="mdAndUp" mandatory v-model="toggle_exclusive" rounded="0"
                        color="deep-purple-accent-3">
                        <v-btn value="left">
                            Editar
                        </v-btn>

                        <v-btn value="center">
                            Visualizar
                        </v-btn>
                    </v-btn-toggle>

                    <v-btn-toggle v-if="!mdAndUp" v-model="toggle_exclusive" mandatory>
                        <v-btn>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn>
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </v-btn-toggle>

                </v-sheet>
            </v-col>
            <v-col class="d-flex justify-end">
                <v-btn v-if="!mdAndUp" icon="mdi-menu" color="black" @click="store.toggleDrawer">
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
                       
    
<script lang="ts">
import { useDisplay } from 'vuetify';

import { useDrawerFormEditor } from '@/store/app'
import { storeToRefs } from 'pinia';

export default {
    name: 'AppBarEditorMode',
    setup() {
        const store = useDrawerFormEditor();
        const { isDrawerOpen } = storeToRefs(store)
        const { mdAndUp } = useDisplay()

        return {
            mdAndUp,

            store,
            isDrawerOpen
        }
    },
    methods: {
        redirectToHomepage() {
            this.$router.push(`/`)
        },
    },
    data: () => {
        return {
            text: 'center',
            toggle_exclusive: 0,
        }
    },
};
</script>