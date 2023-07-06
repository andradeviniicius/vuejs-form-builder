<template>
    <h1>Editando {{ id }}</h1>
</template>

<script lang="ts">
export default {
    methods: {
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },

};
</script>