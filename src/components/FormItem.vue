

<template>
    <v-card :text="data.label">
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