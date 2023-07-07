

<template>
    <v-card>
        <v-card-title>{{ data.formTitle }}</v-card-title>
        <v-card-subtitle>{{ data.formDescription }}</v-card-subtitle>
        <v-card-actions>
            <v-btn @click="redirectToEdit">Editar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
export default {
    props: ['data'],
    methods: {
        redirectToEdit() {
            this.$router.push(`/forms/${this.data.id}`)
        }
    }
};
</script>   