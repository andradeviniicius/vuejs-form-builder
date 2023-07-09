<template>
  <v-btn
    @click="redirectToHomepage"
    class="ma-2"
  >
    <v-icon
      start
      icon="mdi-arrow-left"
    ></v-icon>
    <p>Back</p>
  </v-btn>
</template>

<script lang="ts">
export default {
  name: "404Page",
  methods: {
    redirectToHomepage() {
      this.$router.push(`/`);
    },
  },
};
</script>
