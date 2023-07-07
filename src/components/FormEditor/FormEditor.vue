<template>
    <v-window v-model="isEditingMode">
        <v-window-item :key="1" :value="1">
            <editor-mode />
        </v-window-item>
        <v-window-item :key="2" :value="2">
            <view-mode />
        </v-window-item>
    </v-window>
</template>

<script lang="ts">
import EditorMode from './EditorMode.vue'
import ViewMode from './ViewMode.vue'
import { useToggleEditModeStore } from '@/store/app'
import { storeToRefs } from 'pinia';
export default {
    name: "FormEditor",
    components: {
        EditorMode,
        ViewMode
    },
    setup() {
        const store = useToggleEditModeStore();
        const { isEditingMode } = storeToRefs(store)

        return {
            isEditingMode
        }
    },
}
</script>