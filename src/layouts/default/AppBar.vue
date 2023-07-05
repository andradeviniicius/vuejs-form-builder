<template>
  <v-app-bar flat>
    <v-app-bar-title class="customFont">
      <v-icon icon="mdi-clock-fast " />

      Express Forms
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-text-field v-if="isEditorMode" v-model="search" label="Search"></v-text-field>
    <!-- v-model="search" -->
    <v-spacer></v-spacer>
    <v-btn v-if="isEditorMode" size="large" prepend-icon="mdi-plus">Criar novo form</v-btn>

  </v-app-bar>
</template>

<style></style>

<script lang="ts">

export default {
  data: () => ({
    search: '',
    isEditorMode: false,
  }),
  watch: {
    $route(to) {
      if (to.fullPath.match(/\/forms\/[0-9]+/)) {
        this.isEditorMode = false;
      } else {
        this.isEditorMode = true;
      }
    },
  },
}
</script>

