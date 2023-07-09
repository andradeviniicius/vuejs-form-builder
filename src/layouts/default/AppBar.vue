<template>
  <v-app-bar flat>
    <app-bar-home-page v-if="!isEditorMode" />
    <app-bar-editor-mode v-if="isEditorMode" />
  </v-app-bar>
</template>

<style></style>

<script lang="ts">
import AppBarHomePage from '../../components/Header/AppBarHomePage.vue'
import AppBarEditorMode from '../../components/Header/AppBarEditorMode.vue'

export default {
  components: {
    AppBarHomePage,
    AppBarEditorMode
  },
  data: () => ({
    isEditorMode: true,
  }),
  watch: {
    $route(to) {
      this.isEditorMode
      if (to.fullPath.match(/\/forms\/[0-9]+/)) {
        this.isEditorMode = true;
      } else {
        this.isEditorMode = false;
      }
    },
  },
  beforeMount() {
    if (this.$route.fullPath.match(/\/forms\/[0-9]+/)) {
      this.isEditorMode = true;
    } else {
      this.isEditorMode = false;
    }
  }
}
</script>

