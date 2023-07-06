<template>
    <v-container fluid>
        <v-row justify="space-between" align="center">
            <v-col class="d-flex">
                <v-app-bar-title>
                    <v-sheet class="d-flex">
                        <v-icon icon="mdi-clock-fast " />
                        <p v-if="mdAndUp">
                            Express Forms
                        </p>
                    </v-sheet>

                </v-app-bar-title>
            </v-col>

            <v-col>
                <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
            </v-col>
            <v-col class="d-flex justify-end">
                <v-btn v-if="mdAndUp" size="large" prepend-icon="mdi-plus">Criar novo form</v-btn>
                <v-btn v-if="!mdAndUp" icon="mdi-plus" size="large"></v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>
                       
<script lang="ts">
import { useDisplay } from 'vuetify';
export default {
    name: 'AppBarHomePage',
    setup() {
        const { mobile, mdAndUp, mdAndDown } = useDisplay()
        return { mobile, mdAndUp, mdAndDown }

    },
    data: () => ({
        search: '',
    }),
};
</script>