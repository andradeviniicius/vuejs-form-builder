<template>
    <h1>Editando {{ id }}</h1>
    <v-btn @click="redirectToHomepage" class="ma-2" color="orange-darken-2">
        <v-icon start icon="mdi-arrow-left"></v-icon>
        Back
    </v-btn>
</template>

<script lang="ts">
export default {
    methods: {
        redirectToHomepage() {
            this.$router.push(`/`)
        }
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },

};
</script>