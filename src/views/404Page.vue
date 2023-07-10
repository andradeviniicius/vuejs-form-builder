<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <h1
          class="text-h3"
          color="deep-purple-accent-3"
        >
          Whoops, 404
        </h1>
        <p>A página que você está procurando não existe</p>
        <v-btn
          color="deep-purple"
          variant="outlined"
          @click="redirectToHomepage"
        >
          Me tire daqui D:
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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
