<template>
    <v-app-bar-title class="customFont">
        <v-icon icon="mdi-clock-fast " />

        Express Forms
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-text-field v-model="search" label="Search"></v-text-field>
    <v-spacer></v-spacer>
    <v-btn size="large" prepend-icon="mdi-plus">Criar novo form</v-btn>
</template>
                       
    
<script lang="ts">
export default {
    name: 'AppBarHomePage',
    data: () => ({
        search: '',
    }),
};
</script>