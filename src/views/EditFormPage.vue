<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="isDrawerOpen" :permanent="mdAndUp">
                <v-list-item title="Available elements"></v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <!-- aqui vem os itens disponiveis-->
                    <!-- aqui vem os itens disponiveis-->
                    <!-- aqui vem os itens disponiveis-->
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
import { useDrawerFormEditor } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import FormEditor from '@/components/FormEditor.vue'

export default {
    setup() {
        const store = useDrawerFormEditor();
        const { isDrawerOpen } = storeToRefs(store)
        const { mdAndUp } = useDisplay()

        return { isDrawerOpen, mdAndUp }
    },
    components: {
        FormEditor,
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