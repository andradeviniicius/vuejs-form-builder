<template>
    <v-btn @click="redirectToHomepage" class="ma-2">
        <v-icon start icon="mdi-arrow-left"></v-icon>
        Back
    </v-btn>
</template>
                       
    
<script lang="ts">
export default {
    name: 'AppBarEditorMode',
    methods: {
        redirectToHomepage() {
            this.$router.push(`/`)
        }
    },
};
</script>