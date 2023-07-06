<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="isDrawerOpen" :permanent="mdAndUp">
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
                    title="John Leider"></v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                    <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
                </v-list>
            </v-navigation-drawer>


            <v-main style="height: 90vh">
                <div class="d-flex justify-center align-center h-100">

                </div>
            </v-main>


        </v-layout>
    </v-card>
</template>

<script lang="ts">
import { useDrawerFormEditor } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify/lib/framework.mjs';

export default {
    setup() {
        const store = useDrawerFormEditor();
        const { isDrawerOpen } = storeToRefs(store)
        const { mdAndUp } = useDisplay()

        return { isDrawerOpen, mdAndUp }
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